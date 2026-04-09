/**
 * Replace legacy ALL-CAPS or "FROM RUIZHI" meta keywords with readable, comma-separated phrases.
 * Run: node scripts/batch-meta-keywords.cjs
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const EXCLUDE = new Set([
  "index.html",
  "sitemap.html",
  "404.html",
  "oem.html",
  "wholesale-lip-gloss-tube-packaging-b2b.html",
  "pcr-recycled-plastic-cosmetic-tube-packaging-guide.html",
  "airless-pump-tube-for-serum-and-eye-cream.html",
  "eye-cream-tube-nozzle-and-metal-applicator-guide.html",
  "kraft-paper-plastic-cosmetic-tube-barrier-and-recycling.html",
  "abl-pbl-laminated-cosmetic-tubes-barrier-guide.html",
  "empty-mascara-lipgloss-tube-wand-wholesale-oem.html",
  "sugarcane-derived-pe-cosmetic-tube-packaging.html",
  "dual-chamber-cosmetic-tube-packaging-two-in-one.html",
  "sunscreen-cream-squeeze-tube-packaging-oem.html",
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

function buildKeywords(readable) {
  const chunks = [
    readable,
    "cosmetic packaging",
    "OEM ODM",
    "Guangzhou manufacturer",
    "Ruizhi",
    "wholesale packaging",
  ];
  let s = chunks.join(", ");
  if (s.length > 280) {
    s = `${readable}, cosmetic tube packaging, OEM ODM, Guangzhou, Ruizhi`;
  }
  return s.length > 300 ? s.slice(0, 297).trim() + "…" : s;
}

function shouldReplace(kw) {
  if (!kw || !kw.trim()) return true;
  if (/FROM RUIZHI/i.test(kw)) return true;
  const letters = kw.replace(/[^A-Za-z]/g, "");
  if (letters.length > 30 && letters === letters.toUpperCase()) return true;
  return false;
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
let updated = 0;

for (const f of files) {
  if (EXCLUDE.has(f)) continue;
  const fp = path.join(root, f);
  let html = fs.readFileSync(fp, "utf8");
  const kwM = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i);
  const kw = kwM ? kwM[1] : "";
  if (!shouldReplace(kw)) continue;

  const newKw = buildKeywords(slugToReadable(f));
  if (/<meta\s+name="keywords"\s+content="/i.test(html)) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"/i,
      `<meta name="keywords" content="${escapeAttr(newKw)}"`
    );
  } else {
    html = html.replace(
      /(<meta\s+name="description"\s+content="[^"]*"\s*>)/i,
      `$1\n        <meta name="keywords" content="${escapeAttr(newKw)}">`
    );
  }
  fs.writeFileSync(fp, html, "utf8");
  updated++;
}

console.log(`batch-meta-keywords: files=${files.length} updated=${updated}`);
