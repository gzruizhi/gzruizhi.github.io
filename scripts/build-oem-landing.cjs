const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const aboutPath = path.join(root, "about-us.html");
const outPath = path.join(root, "oem.html");

let html = fs.readFileSync(aboutPath, "utf8");

const headBlock = `        <title>OEM &amp; ODM Cosmetic Tube Packaging Manufacturer | Ruizhi Guangzhou</title> 
        <meta name="description" content="OEM and ODM cosmetic packaging manufacturer in Guangzhou: squeeze tubes, airless pump tubes, bottles, applicators. Private label, custom caps, offset &amp; screen print, PCR/sugarcane/kraft options. Export worldwide."> 
        <meta name="keywords" content="OEM cosmetic packaging, ODM cosmetic tubes, cosmetic packaging manufacturer China, private label tubes, wholesale cosmetic packaging B2B"> 
        <link rel="canonical" href="https://www.ruizhipack.com/oem.html">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you offer OEM and ODM for cosmetic tubes and bottles?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Ruizhi supports OEM (your formula and artwork) and ODM (structure and decoration development) for tubes, bottles and functional caps including applicators and massage heads."
              }
            },
            {
              "@type": "Question",
              "name": "What is the typical MOQ for custom cosmetic packaging?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "MOQ depends on material, diameter, print cylinders and cap molds. We align MOQ with your launch size and can advise on cylinder and mold sharing. Contact us with product type and target quantity."
              }
            },
            {
              "@type": "Question",
              "name": "Do you ship cosmetic packaging internationally?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We supply brands and distributors worldwide from Guangzhou with export-ready packing and documentation."
              }
            }
          ]
        }
        </script>`;

html = html.replace(
  /^\s*<title>[^<]*<\/title>\s*\n\s*<meta name="description"[^>]*>\s*\n\s*<meta name="keywords"[^>]*>\s*/m,
  headBlock + "\n        "
);

const bodyContent = `                <div class="about page newm"> 
                    <article class="seo-landing" style="max-width:920px;margin:0 auto;padding:10px 0 30px;line-height:1.7;color:#333;"> 
                        <p style="font-size:16px;"><strong>Ruizhi</strong> is a <strong>cosmetic packaging manufacturer</strong> in Guangzhou, China, focused on <strong>OEM and ODM</strong> squeeze tubes, <strong>airless pump tubes</strong>, and <strong>cosmetic bottles</strong> for skincare, makeup, hair and personal care brands selling in Europe, North America, the Middle East and beyond.</p> 
                        <h2 style="font-size:22px;margin-top:28px;">OEM &amp; ODM — what we do</h2> 
                        <ul> 
                            <li><strong>OEM</strong>: your artwork, formula positioning and brand guidelines; we match tube or bottle structure, cap, barrier layers and decoration.</li> 
                            <li><strong>ODM</strong>: development support for new shapes, applicators (brush, roller, sponge, ceramic tips), dual chambers and massage functions.</li> 
                        </ul> 
                        <h2 style="font-size:22px;margin-top:24px;">Materials &amp; sustainability</h2> 
                        <p>PE and laminated tubes (<strong>ABL/PBL</strong>), <strong>PCR</strong>, <strong>sugarcane</strong> and <strong>kraft-paper composite</strong> options, <strong>aluminum</strong> tubes, plus PET/PETG/HDPE bottles — for brands that need both performance and credible green claims.</p> 
                        <h2 style="font-size:22px;margin-top:24px;">Decoration &amp; quality</h2> 
                        <p>Offset, silk screen, hot stamping and metallic finishes; consistency for <strong>wholesale</strong> and repeat orders. In-house tooling coordination and sample validation before mass production.</p> 
                        <h2 style="font-size:22px;margin-top:24px;">Related pages</h2> 
                        <p> 
                            <a href="cosmetic-tubes-packaging-for-sale.html">Cosmetic tubes catalog</a> · 
                            <a href="oem.html">OEM/ODM &amp; development</a> · 
                            <a href="custom-cosmetic-packaging-moq-and-oem-planning.html">MOQ &amp; OEM planning guide</a> · 
                            <a href="contact-us.html">Contact &amp; quotes</a> 
                        </p> 
                    </article> 
                </div> `;

html = html.replace(
  /<div class="about page newm">\s*[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="inquiry_box/s,
  bodyContent + "\n        </div> \n        </div> \n        <div class=\"inquiry_box"
);

html = html.replace(
  /<div class="mbx_section">[\s\S]*?<h2>About Ruizhi<\/h2>/,
  '<div class="mbx_section"> \n            <div class="mbx"> \n                <a href="index.html">Home</a> \n                <span>/</span> \n                <h2>OEM &amp; ODM</h2>'
);

html = html.replace(
  /<div class="maintitle"><h1>About Ruizhi<\/h1><\/div>/,
  '<div class="maintitle"><h1>OEM &amp; ODM Cosmetic Packaging Manufacturer</h1></div>'
);

fs.writeFileSync(outPath, html, "utf8");
console.log("Wrote", path.basename(outPath));
