import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const glossaryFile = path.join(
  projectRoot,
  "src",
  "App",
  "glossary-data.ts",
);
const outputFile = path.join(
  projectRoot,
  "public",
  "sitemap.xml",
);

const source = fs.readFileSync(glossaryFile, "utf8");
const glossaryBlockMatch = source.match(
  /const baseGlossaryEntries: GlossaryEntry\[\] = \[(.*?)\n\s*\];/s,
);

if (!glossaryBlockMatch) {
  throw new Error(
    "Não foi possível localizar baseGlossaryEntries em glossary-data.ts.",
  );
}

const glossarySlugs = [
  ...glossaryBlockMatch[1].matchAll(/\bslug:\s*["']([^"']+)["']/g),
].map((match) => match[1]);

const siteUrl = "https://minhacabeleira.com.br";
const routes = [
  "/",
  "/analise",
  "/glossario",
  "/sobre",
  "/privacidade",
  ...glossarySlugs.map((slug) => `/glossario/${slug}`),
];

const urls = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${siteUrl}${route === "/" ? "" : route}</loc>\n  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(outputFile, sitemap, "utf8");
console.log(
  `Sitemap gerado: ${routes.length} URLs em ${path.relative(projectRoot, outputFile)}`,
);
