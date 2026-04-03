/**
 * Fetch article 1–29 images from Pollinations into storage/uploads/images/202511/ (extension from blog-image-meta.mjs).
 * Article 0 (mono-PP) uses existing PNGs from blog-article-bodies.mjs — not overwritten here.
 * Run: node tools/download_blog_images.mjs
 * Optional: node tools/download_blog_images.mjs --force  (re-download all)
 *
 * Note: Pollinations often returns HTTP 429 queue-full for anonymous IPs. Images in-repo were
 * produced with the Cursor image generator, then copied into storage/uploads/images/202511/.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  BLOG_IMAGE_META,
  BLOG_IMAGE_PREFIX,
  BLOG_IMAGE_EXT,
} from "./blog-image-meta.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, ...BLOG_IMAGE_PREFIX.split("/"));

const force = process.argv.includes("--force");
const delayMs = 900;

function seedFor(base, n) {
  let h = 2166136261;
  const s = `${base}:${n}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 2_000_000_000;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadPrompt(prompt, outPath, seed) {
  const url = new URL(
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
  );
  url.searchParams.set("width", "1200");
  url.searchParams.set("height", "675");
  url.searchParams.set("model", "flux");
  url.searchParams.set("seed", String(seed));
  url.searchParams.set("enhance", "false");

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 180_000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) {
      throw new Error(`response too small (${buf.length} bytes)`);
    }
    fs.writeFileSync(outPath, buf);
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  if (BLOG_IMAGE_META.length !== 30) {
    throw new Error(`BLOG_IMAGE_META length ${BLOG_IMAGE_META.length}, expected 30`);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (let i = 1; i < BLOG_IMAGE_META.length; i++) {
    const meta = BLOG_IMAGE_META[i];
    if (!meta) continue;
    const { base, prompts } = meta;
    for (let j = 0; j < 3; j++) {
      const name = `${base}-${j + 1}${BLOG_IMAGE_EXT}`;
      const outPath = path.join(OUT_DIR, name);
      if (!force && fs.existsSync(outPath) && fs.statSync(outPath).size > 2000) {
        skip++;
        continue;
      }
      const seed = seedFor(base, j + 1);
      let lastErr;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await downloadPrompt(prompts[j], outPath, seed + attempt);
          console.log("OK", name);
          ok++;
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e;
          console.warn(`retry ${attempt}/3 ${name}:`, e.message || e);
          await sleep(2000 * attempt);
        }
      }
      if (lastErr) {
        console.error("FAIL", name, lastErr.message || lastErr);
        fail++;
      }
      await sleep(delayMs);
    }
  }

  console.log(`Done: wrote ${ok}, skipped ${skip}, failed ${fail}`);
  if (fail) process.exitCode = 1;
}

main();
