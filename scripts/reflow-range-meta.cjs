/**
 * Re-apply buildMeta after slugToReadable() improvements (e.g. 3ml-5ml → 3–5 mL).
 * Run: node scripts/reflow-range-meta.cjs
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
  const esc = newTitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${esc}</title>`);
}

function replaceDescription(html, newDesc) {
  const esc = newDesc.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${esc}"`
  );
}

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
let updated = 0;

for (const f of files) {
  if (EXCLUDE.has(f)) continue;
  const fp = path.join(root, f);
  let html = fs.readFileSync(fp, "utf8");
  const titleM = html.match(/<title>([^<]*)<\/title>/i);
  if (!titleM || !/\|\s*Ruizhi\s+Packaging/i.test(titleM[1])) continue;

  const { title, description } = buildMeta(slugToReadable(f));
  if (titleM[1].trim() === title) continue;

  html = replaceTitle(html, title);
  html = replaceDescription(html, description);
  fs.writeFileSync(fp, html, "utf8");
  updated++;
}

console.log(`reflow-range-meta: updated=${updated}`);
