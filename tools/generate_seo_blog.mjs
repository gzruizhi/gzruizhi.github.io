/**
 * Generate SEO blog HTML pages + blog.html / blog_p2.html / blog_p3.html / blog_p4.html ...
 * Run: node tools/generate_seo_blog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ARTICLE_BODIES } from "./blog-article-bodies.mjs";
import {
  BLOG_IMAGE_META,
  BLOG_IMAGE_PREFIX,
  BLOG_IMAGE_EXT,
} from "./blog-image-meta.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
let TEMPLATE = path.join(ROOT, "blog-003.html");
const TEMPLATE_FALLBACK = path.join(
  ROOT,
  "mono-material-pp-recyclable-cosmetic-tube-design-trends.html",
);
if (!fs.existsSync(TEMPLATE)) {
  TEMPLATE = TEMPLATE_FALLBACK;
}
const BLOG_LIST_SRC = path.join(ROOT, "blog.html");
const OG_IMAGE =
  "https://www.ruizhipack.com/storage/uploads/images/202206/02/1654134408_dkJGOYZjC3.jpg";
const LIST_IMG =
  "storage/uploads/images/202206/02/1654134408_dkJGOYZjC3.jpg";

const TIMES = [
  "10:24 AM", "02:17 PM", "11:08 AM", "03:41 PM", "09:52 AM",
  "04:13 PM", "11:55 AM", "01:36 PM", "10:09 AM", "03:22 PM",
  "02:44 PM", "09:17 AM", "11:29 AM", "04:08 PM", "10:51 AM",
  "01:12 PM", "03:55 PM", "09:38 AM", "02:03 PM", "11:47 AM",
  "04:29 PM", "10:16 AM", "01:58 PM", "09:04 AM", "03:33 PM",
  "11:21 AM", "02:26 PM", "10:42 AM", "04:51 PM", "01:09 PM",
];

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Newest first in blog list (index 0 = latest post). */
const META = [
  [
    "pfas-free-cosmetic-packaging-checklist-for-export-brands.html",
    "PFAS-Free Cosmetic Packaging: A 2025 Export Checklist for Tube, Cap, and Coating Choices",
    "How brands and tube suppliers can document PFAS-free scopes with evidence-ready questions for 2025/2026 RFQs.",
    "December 4, 2025 · 10:24 AM",
  ],
  [
    "digital-product-passport-dpp-for-cosmetic-packaging-tubes-data-readiness.html",
    "Digital Product Passports (DPP) for Cosmetic Packaging: Preparing Tube and Closure Data for 2026",
    "A practical checklist for tube suppliers to structure DPP-ready material and claim evidence for audits and retailer data feeds in 2026.",
    "January 6, 2026 · 02:17 PM",
  ],
  [
    "green-claims-and-pcr-content-labeling-for-cosmetic-packaging-2026.html",
    "Green Claims and PCR Content Labeling for Cosmetic Tubes in 2026: PCR Without Backfire",
    "How to define PCR claim scope, lock chain-of-custody evidence, and design labels that survive recycled-content scrutiny.",
    "February 3, 2026 · 11:08 AM",
  ],
  [
    "cosmetic-packaging-microplastics-inks-and-risk-control-for-suppliers.html",
    "Microplastics in Cosmetic Packaging: Ink, Coating, and Abrasion Risk Control for Tube Programs",
    "A supplier Q&A and testing workflow for cosmetic tubes to reduce wear-driven micro-fragment risk and support compliance narratives.",
    "March 4, 2026 · 03:41 PM",
  ],
  [
    "refillable-and-reuse-systems-for-cosmetic-packaging-tubes-and-pumps.html",
    "Refill and Reuse Systems for Cosmetic Brands: Designing Tube-Based Programs That Actually Scale",
    "A practical guide to reuse logistics, hygiene controls, return QA, and the sustainability metrics that keep refill programs credible in 2026.",
    "April 3, 2026 · 09:52 AM",
  ],
  ["mono-material-pp-recyclable-cosmetic-tube-design-trends.html", "Mono-Material PP Cosmetic Tubes: Recyclable Design Trends for Global Brands", "Why mono-polypropylene cosmetic tubes help meet EU sorting rules, PP recycling streams, and brand ESG reporting without sacrificing decoration."],
  ["airless-pump-tubes-vs-airless-bottles-buyers-guide.html", "Airless Pump Tubes vs. Airless Bottles: A Procurement Guide for Skincare Brands", "Compare airless pump tubes and classic airless bottles for oxidation-prone creams, travel formats, and MOQ-sensitive launches."],
  ["pcr-post-consumer-recycled-cosmetic-tubes-sourcing-guide.html", "PCR Cosmetic Tubes: A Practical Sourcing Guide for Post-Consumer Recycled PE and PP", "How to plan color drift, odor, lot traceability, and claims when buying PCR plastic tubes for personal care."],
  ["sugarcane-polyethylene-green-pe-cosmetic-tubes-explained.html", "Sugarcane Polyethylene (Green PE) Cosmetic Tubes Explained for Export Brands", "Renewable ethylene pathways, carbon-intensity narratives, and recycle stream compatibility for bio-based PE tubes."],
  ["kraft-paper-plastic-cosmetic-tube-hybrid-benefits.html", "Kraft Paper–Plastic Hybrid Tubes: Benefits, Limits, and Shelf Appeal", "Paper-look cosmetic tubes merge tactile branding with plastic barriers—what importers should verify before launch."],
  ["evoh-barrier-cosmetic-tubes-sensitive-skincare-formulas.html", "EVOH Barrier Cosmetic Tubes for Oxygen- and Fragrance-Sensitive Formulas", "Co-extruded PE–EVOH structures, thickness trade-offs, and when barrier tubes beat standard monolayer PE."],
  ["cosmetic-tube-decoration-offset-screen-hot-stamp-comparison.html", "Cosmetic Tube Decoration: Offset, Screen Printing, and Hot Stamping Compared", "Decorate-to-order decisions for multi-SKU programs: MOQ ladders, line detail, and registration tolerances."],
  ["flip-top-caps-vs-screw-caps-cosmetic-tubes-guide.html", "Flip-Top Caps vs. Screw Caps on Cosmetic Tubes: UX, Leakage, and Line Speed", "Closure engineering for creams, gels, and washes: mouth design, snap hinge life, and consumer habits."],
  ["abl-vs-pbl-laminate-cosmetic-tubes-differences.html", "ABL vs. PBL Laminate Tubes: Differences Buyers Should Know", "Aluminum barrier laminate vs plastic barrier laminate: appearance, flex cracks, and sensory cues."],
  ["aluminum-cosmetic-tubes-vs-plastic-squeeze-tubes.html", "Aluminum Cosmetic Tubes vs. Plastic Squeeze Tubes: Which Fits Your SKU?", "Collapsible metal tubes, coatings, and reformulation costs compared with polymer tubes for color cosmetics and pharma-lean creams."],
  ["petg-cosmetic-bottles-vs-pe-squeeze-tubes-serums.html", "PETG Cosmetic Bottles vs. PE Squeeze Tubes for Serums and Lotions", "Clarity, dropper compatibility, and line-fill economics for transparent skincare packs."],
  ["custom-cosmetic-packaging-moq-and-oem-planning.html", "Custom Cosmetic Packaging MOQ and OEM Planning for New Beauty Brands", "How MOQ stacks across print cylinders, cap molds, and colorways for private-label tube programs."],
  ["cosmetic-packaging-lead-times-sampling-and-tooling.html", "Cosmetic Packaging Lead Times: Sampling, Tooling, and Production Realities", "Plan seasonal launches with realistic timelines for prototypes, compatibility holds, and ocean transit."],
  ["cosmetic-tube-neck-finish-cap-compatibility-standards.html", "Cosmetic Tube Neck Finishes and Cap Compatibility: A Standardization Primer", "Thread families, orifices, and torque maps so caps from different vendors do not surprise production."],
  ["dropper-tip-cosmetic-tubes-precision-skincare-dosing.html", "Dropper-Tip Cosmetic Tubes for Precision Skincare Dosing", "Metered drops from soft tubes: consumer habits, viscosity windows, and air-bubble control."],
  ["roller-ball-tubes-for-deodorant-and-eye-care-packaging.html", "Roller-Ball Tubes for Deodorant and Eye-Care Packaging", "Steel vs. plastic balls, cooling cues, and cleaning validation for roll-on formats."],
  ["sponge-applicator-tubes-for-foundation-and-bb-cream.html", "Sponge Applicator Tubes for Foundation and BB Cream", "Hygiene, replacement cadence, and even application for hybrid makeup-skincare SKUs."],
  ["oval-cosmetic-tubes-shelf-differentiation-and-ergonomics.html", "Oval Cosmetic Tubes: Shelf Differentiation and Ergonomics", "Why oval profiles help labels read on shelf and how they change side-wall stress during squeeze."],
  ["sustainable-cosmetic-packaging-eu-ppwr-and-beyond.html", "Sustainable Cosmetic Packaging: EU PPWR and Beyond—What Exporters Should Track", "Extended producer responsibility, recyclability dossiers, and labeling expectations for 2020s regulation waves."],
  ["travel-size-mini-cosmetic-tubes-airline-friendly-formats.html", "Travel-Size Mini Cosmetic Tubes and Airline-Friendly Formats", "100 ml rules, leak resistance, and retail mini programs for discovery SKUs."],
  ["sunscreen-spf-cream-tube-packaging-barrier-needs.html", "Sunscreen SPF Cream Tube Packaging: Barrier Needs and Converter Questions", "UV filters, solvents, and summer logistics stress PE tubes differently than winter creams."],
  ["toothpaste-tube-packaging-lessons-for-cosmetic-brands.html", "Toothpaste Tube Packaging Lessons Cosmetic Brands Can Borrow", "High-speed filling economies, laminate heritage, and retail crossover formats."],
  ["lip-gloss-and-lip-balm-tube-packaging-wand-vs-squeeze.html", "Lip Gloss and Lip Balm Tube Packaging: Wand vs. Squeeze Economics", "Sheer viscosity products, applicator nostalgia, and air inclusion challenges."],
  ["hand-cream-tubes-soft-touch-finishes-and-brand-premium.html", "Hand Cream Tubes: Soft-Touch Finishes and Premium Positioning", "Tactile coatings, fingerprint resistance, and durability through handbags and winter gloves."],
  ["hair-mask-and-scalp-care-tube-packaging-large-formats.html", "Hair Mask and Scalp Care Tube Packaging: Large Formats That Still Squeeze Cleanly", "High-viscosity rheology, wide diameters, and salon back-bar expectations."],
  ["luxury-metallic-cosmetic-tubes-cold-foil-and-registration.html", "Luxury Metallic Cosmetic Tubes: Cold Foil, Registration, and Shelf Flash", "Mirror effects without aluminum monobloc cost—quality control for bright retail lighting."],
  ["child-resistant-closures-cosmetic-packaging-basics.html", "Child-Resistant Closures and Cosmetic Packaging: Basics for Global Sellers", "When CR caps intersect beauty (RX-adjacent SKUs) and what to clarify with test labs."],
  ["compostable-cosmetic-tubes-feasibility-and-certification-reality.html", "Compostable Cosmetic Tubes: Feasibility and Certification Reality", "Industrial vs. home composting, barrier limits, and why many premium serums still use mainstream polymers."],
  ["cosmetic-squeeze-tube-firmness-pe-blend-guide-for-buyers.html", "Cosmetic Squeeze Tube Firmness: A PE Blend Guide for Buyers", "LDPE, LLDPE, and HDPE ratios—hand feel, snap-back, and formula migration considerations."],
  ["clean-beauty-and-preservative-free-packaging-airless-strategy.html", "Clean Beauty and Preservative-Free Packaging: When Airless Tubes Make Sense", "Reducing oxygen load and contamination paths when brands remove classic preservatives."],
];

function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escBody(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Days 1–7 of month that fall on Mon–Fri (weekday). */
function weekdayCandidatesInFirstWeek(year, month1to12) {
  const days = [];
  for (let d = 1; d <= 7; d++) {
    const dt = new Date(year, month1to12 - 1, d);
    const w = dt.getDay();
    if (w >= 1 && w <= 5) days.push(d);
  }
  return days.length ? days : [3];
}

/** Stable pseudo-random weekday in 1–7 per month (salt = chronological index 0..29). */
function pickPublishDay(year, month1to12, salt) {
  const c = weekdayCandidatesInFirstWeek(year, month1to12);
  const idx = Math.abs((year * 366 + month1to12 * 31 + salt * 17) % c.length);
  return c[idx];
}

/** Chronological: Jun 2023, Jul 2023, … Then reverse so [0] is newest (used as fallback). */
function publishDatesNewestFirst(count) {
  const chronological = [];
  let y = 2023;
  let m = 6;
  for (let i = 0; i < count; i++) {
    const day = pickPublishDay(y, m, i);
    chronological.push([y, m, day]);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return chronological.reverse();
}

function extractDtLineFromHtml(html) {
  const m = html.match(
    /([A-Za-z]+ \d{1,2}, \d{4})\s·\s(\d{1,2}:\d{2} [AP]M)/,
  );
  if (!m) return null;
  return `${m[1]} · ${m[2]}`;
}

function dtLineToMs(dtLine) {
  const m = dtLine.match(
    /([A-Za-z]+) (\d{1,2}), (\d{4})\s·\s(\d{1,2}):(\d{2}) (AM|PM)/,
  );
  if (!m) return 0;
  const monthName = m[1];
  const monthIdx = MONTH_NAMES.indexOf(monthName);
  if (monthIdx < 0) return 0;
  let hour = Number(m[4]);
  const minute = Number(m[5]);
  const ap = m[6];
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;
  const year = Number(m[3]);
  const day = Number(m[2]);
  return new Date(year, monthIdx, day, hour, minute).getTime();
}

function keywordsFromTitle(title) {
  const words = title
    .replace(/[:.,!?]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3);
  const uniq = [...new Set(words.map((w) => w.toLowerCase()))].slice(0, 14);
  return uniq.join(", ");
}

function applyImageMeta(sections, meta) {
  if (!meta) return sections;
  const { base, figures } = meta;
  return sections.map((sec, si) => {
    if (si > 2) return sec;
    const f = figures[si];
    if (!f) return sec;
    return {
      ...sec,
      figure: {
        src: `${BLOG_IMAGE_PREFIX}/${base}-${si + 1}${BLOG_IMAGE_EXT}`,
        alt: f.alt,
        caption: f.caption,
      },
    };
  });
}

function sectionsToHtml(sections) {
  const lines = [];
  for (const sec of sections) {
    const { h2, ps, figure } = sec;
    lines.push(`                                <h2>${escAttr(h2)}</h2>`);
    lines.push("                                <br>");
    for (const p of ps) {
      lines.push("                                <p>");
      lines.push(`                                    ${escBody(p)}`);
      lines.push("                                </p>");
      lines.push("                                <br>");
    }
    if (figure) {
      const src = escAttr(figure.src);
      const alt = escAttr(figure.alt);
      lines.push('                                <figure style="margin:1em 0;">');
      lines.push(
        `                                <img src="${src}" alt="${alt}" loading="lazy" style="max-width:100%;height:auto;border-radius:4px;">`,
      );
      if (figure.caption) {
        lines.push(
          `                                <figcaption style="font-size:0.9em;color:#666;margin-top:0.5em;">${escBody(figure.caption)}</figcaption>`,
        );
      }
      lines.push("                                </figure>");
      lines.push("                                <br>");
    }
  }
  return lines.join("\n");
}

function splitTemplate(html) {
  const idxMbx = html.indexOf('<div class="mbx_section">');
  const idxSide = html.indexOf('<div id="main" class="n_left penci-main-sticky-sidebar">');
  let head = html.slice(0, idxMbx).replace(/\s+$/u, "");
  head += "\n";
  const lineBeginSide = html.lastIndexOf("\n", idxSide) + 1;
  const tail = html.slice(lineBeginSide);
  return [head, tail];
}

function customizeHead(head, title, desc, keywords, slug, ogImageOverride) {
  const shareImage = ogImageOverride || OG_IMAGE;
  const url = `https://www.ruizhipack.com/${slug}`;
  const t = escAttr(title);
  const d = escAttr(desc);
  const k = escAttr(keywords);
  const u = escAttr(url);
  const ogi = escAttr(shareImage);
  return head
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${d}"`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${ogi}"`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${t}"`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${d}"`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${t}"`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${ogi}"`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${u}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${d}"`,
    )
    .replace(/<title>[^<]*<\/title>/, `<title>${t} | Ruizhi Packaging</title>`)
    .replace(
      /<meta name="keywords" content="[^"]*"/,
      `<meta name="keywords" content="${k}"`,
    );
}

function buildArticleHtml(
  headBase,
  tail,
  meta,
  bodyHtml,
  dtLine,
  older,
  newer,
) {
  let head = customizeHead(
    headBase,
    meta.title,
    meta.desc,
    meta.keywords,
    meta.slug,
    meta.ogImage,
  );
  const navOlder =
    older != null
      ? `
                              <li class="prev_post"> 
                              <a href="${escAttr(older.slug)}"> 
                              <span class="meta_nav">Previous Post</span> 
                              <div class="post_title">
                               ${escAttr(older.title)} 
                              </div> 
                              </a> 
                              </li>`
      : `
                              <li class="prev_post"> 
                              <a href="blog.html"> 
                              <span class="meta_nav">Blog Index</span> 
                              <div class="post_title">
                               Back to all articles 
                              </div> 
                              </a> 
                              </li>`;
  const navNewer =
    newer != null
      ? `
                              <li class="next_post"> 
                              <a href="${escAttr(newer.slug)}"> 
                              <span class="meta_nav">Next Post</span> 
                              <div class="post_title">
                               ${escAttr(newer.title)} 
                              </div> 
                              </a> 
                              </li>`
      : `
                              <li class="next_post"> 
                              <a href="blog.html"> 
                              <span class="meta_nav">Blog Index</span> 
                              <div class="post_title">
                               Back to all articles 
                              </div> 
                              </a> 
                              </li>`;
  const breadcrumb = `        <div class="mbx_section"> 
            <div class="mbx"> 
                <a href="index.html">Home</a> 
                <span>/</span>
                <h2>${escAttr(meta.title)}</h2> 
            </div> 
        </div> 
        <div class="n_main"> 
            <div class="container"> 
                <div id="sidebar" class="penci-sticky-sidebar n_right"> 
                    <div class="theiaStickySidebar"> 
                        <div class="blog_main"> 
                            <h1 style="font-size: 38px;">${escAttr(meta.title)}</h1> 
                           
                            <div class="blog-info"> 
                              <i class="fa fa-calendar"></i>
                               ${escAttr(dtLine)} 
                            </div> 
                            <div class="blog_p page  newm">                              

${bodyHtml}
                            </div> 
                            <ul class="navigation clearfix"> 
${navOlder}
${navNewer}
                            </ul> 
                        </div> 
                    </div> 
                </div> `;
  return head + breadcrumb + tail;
}

function paginationBlock(page, totalPages) {
  const parts = ['                            <div class="page_num clearfix"> '];
  if (page <= 1) {
    parts.push(`                              <a href="javascript:;" class="disabled"> 
                              <i class="fa fa-angle-double-left"></i> 
                              </a> `);
  } else {
    const prevPage = page === 2 ? "blog.html" : `blog_p${page - 1}.html`;
    parts.push(`                              <a href="${prevPage}"> 
                              <i class="fa fa-long-arrow-left"></i> 
                              </a> `);
  }
  for (let p = 1; p <= totalPages; p++) {
    if (p === page) {
      parts.push(`\n                              <span>${p}</span> `);
    } else {
      const href = p === 1 ? "blog.html" : `blog_p${p}.html`;
      parts.push(`\n                              <a href="${href}">${p}</a> `);
    }
  }
  if (page >= totalPages) {
    parts.push(` 
                              <a href="javascript:;" class="disabled"> 
                              <i class="fa fa-angle-double-right"></i> 
                              </a> `);
  } else {
    parts.push(` 
                              <a href="blog_p${page + 1}.html"> 
                              <i class="fa fa-long-arrow-right"></i> 
                              </a> `);
  }
  parts.push(` 
                              <div class="total">
                               A total of 
                              <span>${totalPages}</span>
                               pages 
                              </div> 
                            </div> `);
  return parts.join("");
}

function renderListItem(slug, title, day, excerpt, listImgSrc) {
  const thumb = listImgSrc || LIST_IMG;
  return `                              <li> 
                              <div class="li"> 
                              <div class="img"> 
                              <a href="${escAttr(slug)}" title="${escAttr(title)}"> 
                              <img src="${escAttr(thumb)}" alt="${escAttr(title)}"> 
                              </a> 
                              <div class="post-image-mask"> 
                              <span></span> 
                              </div> 
                              </div> 
                              <div class="text"> 
                              <div class="day">
                               ${escAttr(day)} 
                              </div> 
                              <a href="${escAttr(slug)}" title="${escAttr(title)}" class="h4">${escAttr(title)}</a> 
                              <p>${escAttr(excerpt)}</p> 
                              <a href="${escAttr(slug)}" title="${escAttr(title)}" class="my_more1">View More</a> 
                              </div> 
                              </div> 
                              </li>`;
}

function buildListPage(blogHtml, items, page, totalPages) {
  const newsStart = blogHtml.indexOf('<div class="news">');
  if (newsStart === -1) {
    throw new Error("blog.html: <div class=\"news\"> not found");
  }
  const ulTag = '<ul class="clearfix">';
  const ulOpen = blogHtml.indexOf(ulTag, newsStart) + ulTag.length;
  const ulClose = blogHtml.indexOf("</ul>", ulOpen);
  const before = blogHtml.slice(0, ulOpen);
  const restAfterUl = blogHtml.slice(ulClose);
  const marker = '<div id="main" class="n_left penci-main-sticky-sidebar">';
  const mainIdx = restAfterUl.indexOf(marker);
  const lineBegin = restAfterUl.lastIndexOf("\n", mainIdx) + 1;
  const suffix = restAfterUl.slice(lineBegin);
  const middle =
    "\n" +
    items +
    "\n                            </ul> \n" +
    paginationBlock(page, totalPages) +
    "\n                        </div> \n                    </div> \n                </div> \n";
  return before + middle + suffix;
}

function main() {
  if (META.length !== ARTICLE_BODIES.length) {
    throw new Error(
      `META and ARTICLE_BODIES length mismatch: META=${META.length} ARTICLE_BODIES=${ARTICLE_BODIES.length}`,
    );
  }
  const tpl = fs.readFileSync(TEMPLATE, "utf8");
  const [headBase, tail] = splitTemplate(tpl);

  const dtLineBySlug = {};
  for (const meta of META) {
    const slug = meta[0];
    const articlePath = path.join(ROOT, slug);
    if (!fs.existsSync(articlePath)) continue;
    const html = fs.readFileSync(articlePath, "utf8");
    const dtLine = extractDtLineFromHtml(html);
    if (dtLine) dtLineBySlug[slug] = dtLine;
  }

  const dates = publishDatesNewestFirst(META.length);
  const enriched = META.map((meta, i) => {
    const [slug, title, excerpt, fixedDtLine] = meta;
    const [y, monthIdx, day] = dates[i];

    const fallbackDateStr = `${MONTH_NAMES[monthIdx]} ${day}, ${y}`;
    const fallbackDtLine = `${fallbackDateStr} · ${TIMES[i % TIMES.length]}`;
    const dtLine = fixedDtLine || dtLineBySlug[slug] || fallbackDtLine;
    const dateStr = dtLine.split(" · ")[0];

    const desc =
      excerpt.length > 155 ? excerpt.slice(0, 152).trim() + "…" : excerpt;
    const ab = ARTICLE_BODIES[i];
    const imgMeta = BLOG_IMAGE_META[i];
    const sections = imgMeta
      ? applyImageMeta(ab.sections, imgMeta)
      : ab.sections;
    const listImage =
      ab.listImage ||
      (imgMeta
        ? `${BLOG_IMAGE_PREFIX}/${imgMeta.base}-1${BLOG_IMAGE_EXT}`
        : LIST_IMG);
    const ogImage =
      ab.ogImage ||
      (imgMeta
        ? `https://www.ruizhipack.com/${BLOG_IMAGE_PREFIX}/${imgMeta.base}-1${BLOG_IMAGE_EXT}`
        : undefined);
    return {
      slug,
      title,
      excerpt,
      desc,
      keywords: (
        keywordsFromTitle(title) +
        `, ${slug.replace(/\.html$/, "").replace(/-/g, " ")}`
      ).slice(0, 255),
      bodyHtml: sectionsToHtml(sections),
      listDate: dateStr,
      dtLine,
      listImage,
      ogImage,
    };
  });

  const enrichedSorted = enriched
    .slice()
    .sort((a, b) => dtLineToMs(b.dtLine) - dtLineToMs(a.dtLine));

  for (let i = 0; i < enrichedSorted.length; i++) {
    const older =
      i < enrichedSorted.length - 1 ? enrichedSorted[i + 1] : null;
    const newer = i > 0 ? enrichedSorted[i - 1] : null;
    const html = buildArticleHtml(
      headBase,
      tail,
      enrichedSorted[i],
      enrichedSorted[i].bodyHtml,
      enrichedSorted[i].dtLine,
      older,
      newer,
    );
    fs.writeFileSync(
      path.join(ROOT, enrichedSorted[i].slug),
      html,
      "utf8",
    );
  }

  const blogHtml = fs.readFileSync(BLOG_LIST_SRC, "utf8");
  const perPage = 10;
  const totalPages = Math.ceil(enrichedSorted.length / perPage);
  for (let page = 1; page <= totalPages; page++) {
    const chunk = enrichedSorted.slice((page - 1) * perPage, page * perPage);
    const items = chunk
      .map((a) =>
        renderListItem(a.slug, a.title, a.listDate, a.excerpt, a.listImage),
      )
      .join("\n");
    const out = buildListPage(blogHtml, items, page, totalPages);
    const name = page === 1 ? "blog.html" : `blog_p${page}.html`;
    fs.writeFileSync(path.join(ROOT, name), out, "utf8");
  }

  console.log(
    `OK: ${enriched.length} articles + blog.html + blog_p1..blog_p${totalPages}.html`,
  );
}

main();
