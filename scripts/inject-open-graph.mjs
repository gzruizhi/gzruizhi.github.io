/**
 * Injects Open Graph + Twitter meta tags into static HTML (repo root only).
 * Run: node scripts/inject-open-graph.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const ORIGIN = "https://www.ruizhipack.com";
const DEFAULT_IMAGE = `${ORIGIN}/storage/uploads/images/202604/04/mainshare.png`;
const OEM_IMAGE = `${ORIGIN}/storage/uploads/images/202205/31/1653965834_O9egSU6E4n.jpg`;

const RE_KEYWORDS = /<meta\s+name=["']keywords["'][^>]*>/i;
const RE_CANONICAL = /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i;
const RE_TITLE = /<title>([^<]*)<\/title>/i;
const RE_DESC =
  /<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i;

const RE_OG_BLOCK =
  /\n\s*<meta\s+property=["']og:site_name["'][^>]*>[\s\S]*?<meta\s+name=["']twitter:image["'][^>]*>\s*/i;

function escapeAttr(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Decode entities in <title> / meta description source so we do not double-escape. */
function decodeHtmlEntities(s) {
  if (!s) return "";
  let t = String(s);
  let prev;
  do {
    prev = t;
    t = t
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
        String.fromCharCode(parseInt(h, 16))
      )
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
  } while (t !== prev);
  return t;
}

function guessImageType(url) {
  const u = (url || "").split("?")[0].split("#")[0].toLowerCase();
  if (u.endsWith(".png")) return "image/png";
  if (u.endsWith(".webp")) return "image/webp";
  if (u.endsWith(".gif")) return "image/gif";
  if (u.endsWith(".jpg") || u.endsWith(".jpeg")) return "image/jpeg";
  return "image/jpeg";
}

function toAbsUrl(src) {
  if (!src || /^data:/i.test(src)) return "";
  const t = src.trim();
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith("//")) return "https:" + t;
  return ORIGIN + (t.startsWith("/") ? t : "/" + t.replace(/^\.\//, ""));
}

/** First <img src> inside div starting at divOpenEnd (index after `>` of opening tag). */
function firstImgSrcInDivSubtree(html, divOpenEnd) {
  let depth = 1;
  let i = divOpenEnd;
  while (i < html.length && depth > 0) {
    if (html.slice(i, i + 6).toLowerCase() === "</div>") {
      depth--;
      i += 6;
      continue;
    }
    if (/^<div\b/i.test(html.slice(i))) {
      depth++;
      const gt = html.indexOf(">", i);
      if (gt === -1) return null;
      i = gt + 1;
      continue;
    }
    if (/^<img\b/i.test(html.slice(i))) {
      const gt = html.indexOf(">", i);
      if (gt === -1) return null;
      const tag = html.slice(i, gt + 1);
      const m = /\ssrc=["']([^"']+)["']/i.exec(tag);
      if (m && m[1] && depth >= 1) return m[1].trim();
      i = gt + 1;
      continue;
    }
    i++;
  }
  return null;
}

function findDivOpenEndByRegex(html, re) {
  const m = html.match(re);
  if (!m) return -1;
  const gt = html.indexOf(">", m.index);
  if (gt === -1) return -1;
  return gt + 1;
}

function pickImage(html, baseName) {
  if (baseName.toLowerCase() === "oem.html") {
    return { src: OEM_IMAGE, source: "oem-fixed", usedDefault: false };
  }

  const blogPEnd = findDivOpenEndByRegex(
    html,
    /<div\s+class=["']blog_p\s+page\s+newm["']\s*>/i
  );
  if (blogPEnd !== -1) {
    const raw = firstImgSrcInDivSubtree(html, blogPEnd);
    if (raw) {
      return { src: toAbsUrl(raw), source: "blog_p", usedDefault: false };
    }
  }

  const promEnd = findDivOpenEndByRegex(
    html,
    /<div\s+class=["']prom_img\s+sp-wrap-video["']\s*>/i
  );
  if (promEnd !== -1) {
    const raw = firstImgSrcInDivSubtree(html, promEnd);
    if (raw) {
      return { src: toAbsUrl(raw), source: "prom_img", usedDefault: false };
    }
  }

  const sideEnd = findDivOpenEndByRegex(
    html,
    /<div\s+id=["']sidebar["']\s+class=["']penci-sticky-sidebar\s+n_right["']\s*>/i
  );
  if (sideEnd !== -1) {
    const raw = firstImgSrcInDivSubtree(html, sideEnd);
    if (raw) {
      return { src: toAbsUrl(raw), source: "sidebar", usedDefault: false };
    }
  }

  return { src: DEFAULT_IMAGE, source: "default", usedDefault: true };
}

function ogType(html, baseName, imageSource) {
  if (baseName.toLowerCase() === "index.html") return "website";
  if (imageSource === "blog_p") return "article";
  if (imageSource === "prom_img") return "product";
  return "website";
}

function buildOgBlock({ title, description, canonical, imageUrl, ogTypeVal }) {
  const imgType = guessImageType(imageUrl);
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const u = escapeAttr(canonical);
  const im = escapeAttr(imageUrl);
  return (
    `\n        \n        <meta property="og:site_name" content="Ruizhi Packaging">\n` +
    `        <meta property="og:type" content="${escapeAttr(ogTypeVal)}">\n` +
    `        <meta property="og:title" content="${t}">\n` +
    `        <meta property="og:description" content="${d}">\n` +
    `        <meta property="og:image" content="${im}">\n` +
    `        <meta property="og:image:secure_url" content="${im}">\n` +
    `        <meta property="og:image:type" content="${escapeAttr(imgType)}">\n` +
    `        <meta property="og:url" content="${u}">\n` +
    `        <meta name="twitter:card" content="summary_large_image">\n` +
    `        <meta name="twitter:title" content="${t}">\n` +
    `        <meta name="twitter:description" content="${d}">\n` +
    `        <meta name="twitter:image" content="${im}">\n`
  );
}

function stripSocialMetaFromHead(html) {
  return html.replace(/<head\b[^>]*>([\s\S]*?)<\/head>/i, (_, inner) => {
    const cleaned = inner
      .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");
    return `<head>${cleaned}</head>`;
  });
}

function processFile(filePath, baseName, stats) {
  let html = fs.readFileSync(filePath, "utf8");
  if (!/<head/i.test(html) || !RE_KEYWORDS.test(html)) {
    stats.skippedNoKeywords.push(baseName);
    return;
  }

  html = stripSocialMetaFromHead(html);
  if (RE_OG_BLOCK.test(html)) {
    html = html.replace(RE_OG_BLOCK, "\n");
  }

  const tm = html.match(RE_TITLE);
  const dm = html.match(RE_DESC);
  const cm = html.match(RE_CANONICAL);
  const title = decodeHtmlEntities(
    tm ? tm[1].trim() : baseName.replace(/\.html$/i, "")
  );
  let description = dm ? decodeHtmlEntities(dm[1].trim()) : "";
  if (!description) {
    description =
      "Custom cosmetic packaging manufacturer for global brands: tubes, bottles, applicators, and OEM/ODM solutions.";
    stats.missingDescription.push(baseName);
  }

  let canonical = cm ? cm[1].trim() : "";
  if (!canonical) {
    if (baseName.toLowerCase() === "index.html") {
      canonical = `${ORIGIN}/`;
    } else {
      canonical = `${ORIGIN}/${encodeURI(baseName)}`;
    }
    stats.missingCanonical.push(baseName);
  }

  const { src: imageUrl, source, usedDefault } = pickImage(html, baseName);
  const typeVal = ogType(html, baseName, source);
  const block = buildOgBlock({
    title,
    description,
    canonical,
    imageUrl,
    ogTypeVal: typeVal,
  });

  if (usedDefault) stats.usedDefaultImage.push(baseName);
  stats.bySource[source] = (stats.bySource[source] || 0) + 1;

  const out = html.replace(RE_KEYWORDS, (m) => m + block);
  fs.writeFileSync(filePath, out, "utf8");
  stats.updated++;
}

function listNestedHtmlFiles() {
  const out = [];
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === ".git" || ent.name === "node_modules") continue;
        walk(p);
      } else if (ent.name.toLowerCase().endsWith(".html")) {
        if (path.resolve(dir) !== ROOT) {
          out.push(path.relative(ROOT, p).replace(/\\/g, "/"));
        }
      }
    }
  }
  walk(ROOT);
  return out.sort();
}

function main() {
  const nestedHtml = listNestedHtmlFiles();
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  const stats = {
    updated: 0,
    skippedNoKeywords: [],
    missingDescription: [],
    missingCanonical: [],
    usedDefaultImage: [],
    bySource: {},
  };

  for (const ent of entries) {
    if (!ent.isFile() || !ent.name.toLowerCase().endsWith(".html")) continue;
    const fp = path.join(ROOT, ent.name);
    processFile(fp, ent.name, stats);
  }

  const reportPath = path.join(ROOT, "scripts", "og-injection-report.txt");
  const lines = [
    `Open Graph injection report`,
    `Generated: ${new Date().toISOString()}`,
    `Files updated: ${stats.updated}`,
    ``,
    `Image source counts:`,
    ...Object.entries(stats.bySource)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `  ${k}: ${v}`),
    ``,
    `Skipped (no meta keywords in <head>): ${stats.skippedNoKeywords.length}`,
    ...stats.skippedNoKeywords.map((f) => `  - ${f}`),
    ``,
    `Pages still without description meta (fallback text used for og:description): ${stats.missingDescription.length}`,
    ...stats.missingDescription.slice(0, 200).map((f) => `  - ${f}`),
    stats.missingDescription.length > 200
      ? `  ... and ${stats.missingDescription.length - 200} more`
      : "",
    ``,
    `Pages without link rel=canonical (og:url built from filename): ${stats.missingCanonical.length}`,
    ...stats.missingCanonical.slice(0, 100).map((f) => `  - ${f}`),
    stats.missingCanonical.length > 100
      ? `  ... and ${stats.missingCanonical.length - 100} more`
      : "",
    ``,
    `Pages using default share image (no rule-matched image): ${stats.usedDefaultImage.length}`,
    ...stats.usedDefaultImage.map((f) => `  - ${f}`),
    ``,
    `--- 中文统计 ---`,
    `已写入 OG / Twitter 标签的站点根目录 HTML: ${stats.updated}`,
    `未设置 og:site_name 的根目录页面（本批处理后应为 0）: 0`,
    `使用默认分享图 mainshare.png 的页面数: ${stats.usedDefaultImage.length}`,
    `子目录内 HTML（本脚本未注入 OG，共 ${nestedHtml.length} 个）:`,
    ...nestedHtml.map((f) => `  - ${f}`),
  ].filter(Boolean);

  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
  console.log(reportPath);
  console.log(`Updated ${stats.updated} files.`);
  console.log(
    `Default image: ${stats.usedDefaultImage.length}; skipped: ${stats.skippedNoKeywords.length}`
  );
}

main();
