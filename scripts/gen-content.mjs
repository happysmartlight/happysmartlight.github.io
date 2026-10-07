// Build-time: convert the Jekyll collection markdown (content-src/) into a single
// JSON consumed by the React collection templates. Handles front matter, the few
// Liquid includes used in bodies, and renders Markdown (with raw HTML) to HTML.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true, linkify: true, breaks: false });

// Jekyll permalink => collection folder
const COLLECTIONS = {
  "post-news": "_post-news",
  "doi-tac": "_doi-tac",
};

const galleriesPath = "content-src/_data/galleries.yml";
const galleries = existsSync(galleriesPath)
  ? yaml.load(readFileSync(galleriesPath, "utf8")) || {}
  : {};

function renderGallery(key) {
  const imgs = galleries[key] || [];
  if (!imgs.length) return "";
  const items = imgs
    .map(
      (src) =>
        `<a href="${src}" target="_blank" rel="noopener" class="hsl-gallery-item"><img src="${src}" alt="" /></a>`
    )
    .join("");
  return `\n<div class="hsl-gallery">${items}</div>\n`;
}

function preprocessLiquid(body) {
  // Drop heavy <video> embeds entirely (kept the captions) to keep the site light.
  body = body.replace(/<video[\s\S]*?<\/video>/gi, "");
  body = body.replace(/<div class="video-wrapper">\s*<\/div>/gi, "");
  // {% include gallery.html images=site.data.galleries.KEY %}
  body = body.replace(
    /\{%\s*include\s+gallery\.html\s+images=site\.data\.galleries\.([\w-]+)\s*%\}/g,
    (_, key) => renderGallery(key)
  );
  // {% include esp-web-flash.html ... %}
  body = body.replace(
    /\{%\s*include\s+esp-web-flash\.html[^%]*%\}/g,
    '<div class="hsl-callout">🔌 Trình nạp firmware qua trình duyệt khả dụng trên trang <a href="/argb-hsl-tool-pc">tải phần mềm ARGB HSL</a>.</div>'
  );
  // {{ site.baseurl }} -> ""
  body = body.replace(/\{\{\s*site\.baseurl\s*\}\}/g, "");
  // strip any remaining liquid tags/vars
  body = body.replace(/\{%[^%]*%\}/g, "").replace(/\{\{[^}]*\}\}/g, "");
  return body;
}

function excerpt(html, len = 160) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text;
}

function firstImg(data) {
  if (data.image) return data.image;
  if (Array.isArray(data.bigimg)) return data.bigimg[0];
  if (typeof data.bigimg === "string") return data.bigimg;
  return "";
}

const out = {};
for (const [coll, dir] of Object.entries(COLLECTIONS)) {
  const base = join("content-src", dir);
  if (!existsSync(base)) continue;
  const items = [];
  for (const file of readdirSync(base).filter((f) => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    const raw = readFileSync(join(base, file), "utf8");
    const { data, content } = matter(raw);
    let html = md.render(preprocessLiquid(content));
    // Defer offscreen images for faster first paint on mobile.
    html = html.replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');
    const banner = Array.isArray(data.bigimg) ? data.bigimg[0] : data.bigimg || "";
    items.push({
      slug,
      collection: coll,
      url: `/${coll}/${slug}/`,
      title: data.title || slug,
      metaTitle: data["meta-title"] || data.title || slug,
      image: firstImg(data),
      bigimg: banner,
      tags:
        typeof data.tags === "string"
          ? data.tags.split(",").map((s) => s.trim()).filter(Boolean)
          : Array.isArray(data.tags)
            ? data.tags
            : [],
      excerpt: excerpt(html),
      html,
      date: data.date ? String(data.date).slice(0, 10) : "",
    });
  }
  // newest-ish first by title stability; keep file order otherwise
  out[coll] = items;
}

mkdirSync("src/content/generated", { recursive: true });
writeFileSync(
  "src/content/generated/collections.json",
  JSON.stringify(out, null, 2)
);
console.log(
  "[content] generated " +
    Object.entries(out)
      .map(([k, v]) => `${k}:${v.length}`)
      .join(" ")
);
