const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const scriptTag = '\n        <script defer src="front/js/seo-enhancer.js"></script>\n';

const files = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith(".html"))
  .map((d) => path.join(root, d.name));

let inserted = 0;
let skipped = 0;

for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");
  if (original.includes("front/js/seo-enhancer.js")) {
    skipped += 1;
    continue;
  }
  if (!original.includes("</head>")) {
    skipped += 1;
    continue;
  }
  const updated = original.replace("</head>", `${scriptTag}    </head>`);
  fs.writeFileSync(filePath, updated, "utf8");
  inserted += 1;
}

console.log(`processed=${files.length} inserted=${inserted} skipped=${skipped}`);
