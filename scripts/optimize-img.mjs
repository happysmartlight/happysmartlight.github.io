// One-off: downscale + recompress images in public/img IN PLACE (same filename,
// so all /img/... URLs keep working). Big win for mobile load time.
import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/img";
const MAX_W = 1280; // plenty for cards (~800) and article width (~768) on retina
const JPG_Q = 78;
const SKIP_UNDER = 60 * 1024; // don't bother with files < 60KB

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

let before = 0, after = 0, processed = 0, skipped = 0;

for (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) { skipped++; continue; }
  const size0 = statSync(file).size;
  if (size0 < SKIP_UNDER) { before += size0; after += size0; skipped++; continue; }

  try {
    const input = readFileSync(file); // read bytes first (avoids Windows file-lock on overwrite)
    const img = sharp(input, { failOn: "none" });
    const meta = await img.metadata();
    let pipeline = img.rotate(); // respect EXIF orientation
    if (meta.width && meta.width > MAX_W) {
      pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });
    }
    if (ext === ".png") {
      pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 82, effort: 8 });
    } else {
      pipeline = pipeline.jpeg({ quality: JPG_Q, mozjpeg: true });
    }
    const buf = await pipeline.toBuffer();
    // Only write if we actually saved bytes
    if (buf.length < size0) {
      writeFileSync(file, buf);
      after += buf.length;
    } else {
      after += size0;
    }
    before += size0;
    processed++;
  } catch (e) {
    before += size0; after += size0; skipped++;
    console.warn("skip (error):", file, e.message);
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`[optimize-img] processed ${processed}, skipped ${skipped}`);
console.log(`[optimize-img] ${mb(before)} MB -> ${mb(after)} MB (saved ${mb(before - after)} MB)`);
