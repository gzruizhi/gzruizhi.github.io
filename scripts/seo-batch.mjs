/**
 * Batch SEO improvements for static HTML (repo root only):
 * - Ensure canonical link on every page
 * - Inject Schema.org JSON-LD for Product (product detail) and Article (blog detail)
 * - Regenerate sitemap.xml using file mtimes
 * - Write a report
 *
 * Run: node scripts/seo-batch.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const ORIGIN = "https://www.ruizhipack.com";

const RE_HEAD = /<head\b[^>]*>[\s\S]*?<\/head>/i;
const RE_TITLE = /<title>([^<]*)<\/title>/i;
const RE_DESC =
  /<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i;
const RE_KEYWORDS = /<meta\s+name=["']keywords["'][^>]*>/i;
const RE_CANONICAL = /<link\s+rel=["']canonical["'][^>]*>/i;
const RE_CANONICAL_HREF =
  /<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i;
const RE_OG_IMAGE =
  /<meta\s+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i;

function normalizeBaseName(name) {
  return String(name || "").trim();
}

function normalizePathnameFromFilename(baseName) {
  const n = baseName.toLowerCase();
  if (n === "index.html") return "/";
  return "/" + encodeURI(baseName);
}

function canonicalFor(baseName) {
  const p = normalizePathnameFromFilename(baseName);
  return p === "/" ? `${ORIGIN}/` : `${ORIGIN}${p}`;
}

function extractTitle(html, baseName) {
  const m = html.match(RE_TITLE);
  if (m && m[1]) return m[1].trim();
  return baseName.replace(/\.html$/i, "");
}

function extractDescription(html) {
  const m = html.match(RE_DESC);
  return m && m[1] ? m[1].trim() : "";
}

function extractCanonical(html) {
  const m = html.match(RE_CANONICAL_HREF);
  return m && m[1] ? m[1].trim() : "";
}

function extractOgImage(html) {
  const m = html.match(RE_OG_IMAGE);
  return m && m[1] ? m[1].trim() : "";
}

function stripExistingPageJsonLd(html) {
  // Remove only our injected schema block(s) to keep any hand-written ld+json.
  return html
    .replace(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*id=["']rz-page-jsonld["'][^>]*>[\s\S]*?<\/script>\s*/gi,
      ""
    )
    .replace(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*data-rz-page-jsonld=["']1["'][^>]*>[\s\S]*?<\/script>\s*/gi,
      ""
    );
}

function injectBeforeHeadClose(html, snippet) {
  return html.replace(/<\/head>/i, `${snippet}\n    </head>`);
}

function ensureCanonicalLink(html, baseName, stats) {
  if (RE_CANONICAL.test(html)) return html;
  if (!RE_KEYWORDS.test(html)) {
    stats.noKeywords.push(baseName);
    return html;
  }
  const url = canonicalFor(baseName);
  const tag = `\n        <link rel="canonical" href="${url}">`;
  stats.addedCanonical.push(baseName);
  return html.replace(RE_KEYWORDS, (m) => m + tag);
}

function parseArticleDate(html) {
  // Example: <div class="blog-info"> ... Apr 25, 2022 </div>
  const m = html.match(/<div\s+class=["']blog-info["'][^>]*>[\s\S]*?<\/div>/i);
  if (!m) return "";
  const text = m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  // Try parse with JS Date.
  const d = new Date(text);
  if (Number.isNaN(d.getTime())) return "";
  // ISO date only (no timezone ambiguity in schema is ok, but keep date only).
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildSchema(html, baseName) {
  const url = extractCanonical(html) || canonicalFor(baseName);
  const title = extractTitle(html, baseName);
  const description = extractDescription(html);
  const image = extractOgImage(html);

  const isProduct = /<div\s+class=["']prom_img\s+sp-wrap-video["']\s*>/i.test(
    html
  );
  const isArticle = /<div\s+class=["']blog_p\s+page\s+newm["']\s*>/i.test(html);

  if (isProduct) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: title,
      description: description || undefined,
      image: image || undefined,
      brand: {
        "@type": "Brand",
        name: "Ruizhi Packaging",
      },
      url,
    };
  }

  if (isArticle) {
    const datePublished = parseArticleDate(html) || undefined;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description || undefined,
      image: image || undefined,
      datePublished,
      mainEntityOfPage: url,
      publisher: {
        "@type": "Organization",
        name: "Ruizhi Packaging",
        url: `${ORIGIN}/`,
      },
    };
  }

  return null;
}

function injectSchema(html, baseName, stats) {
  const schema = buildSchema(html, baseName);
  if (!schema) return html;

  const cleaned = stripExistingPageJsonLd(html);
  // IMPORTANT: do not use a key-filtering replacer here, otherwise nested
  // objects (e.g. publisher/brand) may get truncated.
  const json = JSON.stringify(schema);
  const snippet =
    `\n        <script type="application/ld+json" id="rz-page-jsonld">` +
    json +
    `</script>`;

  stats.injectedSchema.push(baseName);
  return injectBeforeHeadClose(cleaned, snippet);
}

function listRootHtmlFiles() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".html"))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));
}

function toLastmod(fp) {
  const st = fs.statSync(fp);
  const d = new Date(st.mtimeMs);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function generateSitemap(rootFiles) {
  const urls = rootFiles.map((base) => {
    const loc = canonicalFor(base);
    const lastmod = toLastmod(path.join(ROOT, base));
    return { loc, lastmod };
  });

  const lines = [];
  lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  lines.push(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);
  for (const u of urls) {
    lines.push(`  <url>`);
    lines.push(`    <loc>${u.loc}</loc>`);
    lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
    lines.push(`  </url>`);
  }
  lines.push(`</urlset>`);
  return lines.join("\n") + "\n";
}

function main() {
  const stats = {
    files: 0,
    changed: 0,
    addedCanonical: [],
    injectedSchema: [],
    noKeywords: [],
    missingDesc: [],
  };

  const rootFiles = listRootHtmlFiles();
  for (const baseName of rootFiles) {
    const fp = path.join(ROOT, baseName);
    let html = fs.readFileSync(fp, "utf8");
    stats.files++;

    const before = html;
    html = ensureCanonicalLink(html, baseName, stats);
    html = injectSchema(html, baseName, stats);

    if (!extractDescription(html)) stats.missingDesc.push(baseName);

    if (html !== before) {
      fs.writeFileSync(fp, html, "utf8");
      stats.changed++;
    }
  }

  // sitemap.xml
  const sitemapXml = generateSitemap(rootFiles);
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemapXml, "utf8");

  // report
  const reportLines = [];
  reportLines.push(`SEO batch report`);
  reportLines.push(`Generated: ${new Date().toISOString()}`);
  reportLines.push(`Root HTML files scanned: ${stats.files}`);
  reportLines.push(`Files changed: ${stats.changed}`);
  reportLines.push(`Canonical added: ${stats.addedCanonical.length}`);
  reportLines.push(`Schema injected (Product/Article): ${stats.injectedSchema.length}`);
  reportLines.push(`Missing meta description after run: ${stats.missingDesc.length}`);
  reportLines.push(`Pages without meta keywords (skipped canonical insert): ${stats.noKeywords.length}`);
  reportLines.push(``);
  reportLines.push(`--- Canonical added (first 100) ---`);
  for (const f of stats.addedCanonical.slice(0, 100)) reportLines.push(`- ${f}`);
  if (stats.addedCanonical.length > 100)
    reportLines.push(`... and ${stats.addedCanonical.length - 100} more`);
  reportLines.push(``);
  reportLines.push(`--- Schema injected (first 100) ---`);
  for (const f of stats.injectedSchema.slice(0, 100)) reportLines.push(`- ${f}`);
  if (stats.injectedSchema.length > 100)
    reportLines.push(`... and ${stats.injectedSchema.length - 100} more`);
  reportLines.push(``);
  reportLines.push(`--- Missing description (first 100) ---`);
  for (const f of stats.missingDesc.slice(0, 100)) reportLines.push(`- ${f}`);
  if (stats.missingDesc.length > 100)
    reportLines.push(`... and ${stats.missingDesc.length - 100} more`);
  reportLines.push(``);
  reportLines.push(`--- 子目录 HTML（未处理）---`);
  const nested = [];
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    if (ent.name === ".git" || ent.name === "node_modules") continue;
    const dir = path.join(ROOT, ent.name);
    for (const child of fs.readdirSync(dir, { withFileTypes: true })) {
      if (child.isFile() && child.name.toLowerCase().endsWith(".html")) {
        nested.push(path.posix.join(ent.name, child.name));
      }
    }
  }
  for (const f of nested.sort()) reportLines.push(`- ${f}`);

  const reportPath = path.join(ROOT, "scripts", "seo-batch-report.txt");
  fs.writeFileSync(reportPath, reportLines.join("\n") + "\n", "utf8");

  console.log(reportPath);
  console.log(`Changed ${stats.changed}/${stats.files}; sitemap.xml regenerated.`);
}

main();

