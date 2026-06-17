// One-off: remove image/video files under public/img that are NOT referenced by
// the ported collection content, to keep the repo (and LFS pulls) lean.
import { readFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";

const data = JSON.parse(readFileSync("src/content/generated/collections.json", "utf8"));
const blob = Object.values(data)
  .flat()
  .map((i) => `${i.html} ${i.bigimg} ${i.image}`)
  .join("\n");

const keep = new Set();
for (const m of blob.matchAll(/\/img\/[^"'\s)>]+\.(?:png|jpe?g|gif|webp|svg|mp4|mov)/gi)) {
  keep.add(decodeURIComponent(m[0]));
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

let removed = 0;
let removedBytes = 0;
let kept = 0;
for (const file of walk("public/img")) {
  const url = "/" + relative("public", file).split(sep).join("/");
  if (keep.has(url)) {
    kept++;
  } else {
    removedBytes += statSync(file).size;
    rmSync(file);
    removed++;
  }
}

console.log(`[prune] kept ${kept}, removed ${removed} files (${(removedBytes / 1024 / 1024).toFixed(1)} MB freed)`);
