/**
 * Batch-improve <title> and meta description for legacy ALL-CAPS / "FROM RUIZHI PACKAGING" pages.
 * Run: node scripts/batch-product-meta.cjs
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const EXCLUDE = new Set([
  "index.html",
  "cosmetic-tubes-packaging-for-sale.html",
  "custom-cosmetic-packaging-moq-and-oem-planning.html",
  "digital-product-passport-dpp-for-cosmetic-packaging-tubes-data-readiness.html",
  "green-claims-and-pcr-content-labeling-for-cosmetic-packaging-2026.html",
  "oem-odm-cosmetic-tube-packaging-manufacturer.html",
  "customization.html",
  "sitemap.html",
]);

const ABBR = {
  ml: "mL",
  g: "g",
  pe: "PE",
  abl: "ABL",
  pbl: "PBL",
  pet: "PET",
  petg: "PETG",
  hdpe: "HDPE",
  ldpe: "LDPE",
  pp: "PP",
  pcr: "PCR",
  oem: "OEM",
  odm: "ODM",
  bb: "BB",
  cc: "CC",
  dd: "DD",
  spf: "SPF",
  uv: "UV",
  ss: "SS",
};

function tokenToWord(token) {
  const lower = token.toLowerCase();
  if (ABBR[lower]) return ABBR[lower];
  const unit = /^(\d+(?:\.\d+)?)(ml|g)$/i.exec(token);
  if (unit) {
    const n = unit[1];
    const u = unit[2].toLowerCase() === "ml" ? "mL" : "g";
    return n + " " + u;
  }
  if (/^\d+-\d+$/.test(token)) return token;
  if (/^\d+$/.test(token)) return token;
  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}

function slugToReadable(basename) {
  const base = basename.replace(/\.html$/i, "");
  const parts = base.split("-");
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const m1 = /^(\d+(?:\.\d+)?)ml$/i.exec(parts[i]);
    const m2 = parts[i + 1] && /^(\d+(?:\.\d+)?)ml$/i.exec(parts[i + 1]);
    if (m1 && m2) {
      out.push(`${m1[1]}–${m2[1]} mL`);
      i++;
      continue;
    }
    const g1 = /^(\d+(?:\.\d+)?)g$/i.exec(parts[i]);
    const g2 = parts[i + 1] && /^(\d+(?:\.\d+)?)g$/i.exec(parts[i + 1]);
    if (g1 && g2) {
      out.push(`${g1[1]}–${g2[1]} g`);
      i++;
      continue;
    }
    out.push(tokenToWord(parts[i]));
  }
  return out.join(" ");
}

function isAllCapsTitle(t) {
  const letters = t.replace(/[^A-Za-z]/g, "");
  return letters.length > 12 && letters === letters.toUpperCase();
}

function shouldUpdate(content, filename) {
  if (EXCLUDE.has(filename)) return false;
  const titleM = content.match(/<title>([^<]*)<\/title>/i);
  if (!titleM) return false;
  const title = titleM[1].trim();
  const descM = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = descM ? descM[1].trim() : "";

  if (/\|\s*Ruizhi/i.test(title)) return false;
  if (desc.length > 130 && !/FROM RUIZHI/i.test(desc) && !isAllCapsTitle(title)) return false;

  if (/FROM RUIZHI PACKAGING/i.test(desc) || /FROM RUIZHI PACKAGING/i.test(title)) return true;
  if (isAllCapsTitle(title) && title.length > 15) return true;
  if (desc.length < 55 && title.length > 18 && !/\|/.test(title)) return true;
  return false;
}

function buildMeta(readable) {
  const title = `${readable} | Ruizhi Packaging`;
  const titleCapped = title.length > 68 ? readable.slice(0, 52).trim() + "… | Ruizhi Packaging" : title;

  let desc = `${readable} — custom cosmetic packaging from Ruizhi (Guangzhou). Tubes, bottles & caps; OEM/ODM, printing, sustainable materials. Request samples & MOQ.`;
  if (desc.length > 160) {
    desc = `${readable}. Guangzhou OEM/ODM cosmetic tube & bottle packaging. Printing, materials, export-ready production. Samples & MOQ on request.`;
    desc = desc.slice(0, 157).trim() + "…";
  }
  return { title: titleCapped, description: desc };
}

function replaceTitle(html, newTitle) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(newTitle)}</title>`);
}

function replaceDescription(html, newDesc) {
  if (/<meta\s+name="description"\s+content="/i.test(html)) {
    return html.replace(
      /<meta\s+name="description"\s+content="[^"]*"/i,
      `<meta name="description" content="${escapeAttr(newDesc)}"`
    );
  }
  const insertAfter = /<link rel="shortcut icon"[^>]*>\s*/i;
  if (insertAfter.test(html)) {
    return html.replace(
      insertAfter,
      (m) => m + `        <meta name="description" content="${escapeAttr(newDesc)}">\n`
    );
  }
  return html;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
let updated = 0;
let skipped = 0;

for (const f of files) {
  const fp = path.join(root, f);
  let html = fs.readFileSync(fp, "utf8");
  if (!shouldUpdate(html, f)) {
    skipped++;
    continue;
  }
  const readable = slugToReadable(f);
  const { title, description } = buildMeta(readable);
  html = replaceTitle(html, title);
  html = replaceDescription(html, description);
  fs.writeFileSync(fp, html, "utf8");
  updated++;
}

console.log(`batch-product-meta: files=${files.length} updated=${updated} skipped=${skipped}`);
