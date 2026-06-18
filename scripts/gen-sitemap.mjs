// Generate sitemap.xml from the static HTML files produced by vite-react-ssg.
// Runs after the SSG build so every pre-rendered route is listed automatically.
import { readdirSync, statSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE = "https://happysmartlight.com";
const DIST = "dist";
const today = new Date().toISOString().slice(0, 10);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "assets" || name.startsWith(".")) continue;
      out.push(...walk(full));
    } else if (name.endsWith(".html") && name !== "404.html") {
      out.push(full);
    }
  }
  return out;
}

function toUrl(file) {
  // nested dirStyle: dist/foo/index.html -> /foo/ ; dist/index.html -> /
  let rel = relative(DIST, file).split(sep).join("/");
  rel = rel.replace(/index\.html$/, "").replace(/\.html$/, "/");
  if (!rel.startsWith("/")) rel = "/" + rel;
  if (rel !== "/" && !rel.endsWith("/")) rel += "/";
  return rel;
}

// Trang cố tình ẩn (vd công cụ nội bộ ký license) — không liệt kê trong sitemap.
// Các route này cũng đặt <meta robots="noindex"> trong chính trang.
const SITEMAP_DENY = new Set(["/tools/hsl-lic-7q3m9x/"]);

const urls = [...new Set(walk(DIST).map(toUrl))]
  .filter((u) => !SITEMAP_DENY.has(u))
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const body = urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE}${u === "/" ? "/" : u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u === "/" ? "weekly" : "monthly"}</changefreq>\n    <priority>${u === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(join(DIST, "sitemap.xml"), xml);
console.log(`[sitemap] ${urls.length} URLs -> dist/sitemap.xml`);
urls.forEach((u) => console.log("  " + u));

// SPA fallback for GitHub Pages: unknown deep links serve the app shell so the
// client router can take over instead of a bare 404.
const indexFile = join(DIST, "index.html");
if (existsSync(indexFile)) {
  copyFileSync(indexFile, join(DIST, "404.html"));
  console.log("[404] dist/404.html <- index.html");
}
