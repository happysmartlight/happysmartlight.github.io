// Đọc thông tin bản macOS (.dmg) của 1 app từ manifest web riêng của macOS:
//   Tool ARGB HSL  → documents/app_manifest_macos.json
//   POI HSL Studio → documents/poi_app_manifest_macos.json
// CI build-macos.yml (repo Tool-POI-HSL) đăng .dmg lên release rồi tự cập nhật manifest →
// push master → CI web build lại, nên trang web không cần sửa tay khi lên bản mới.
// latest = null: app chưa có bản macOS → trang web ẩn nút tải macOS.
// KHÔNG nhầm với app_manifest.json / poi_app_manifest.json (tự cập nhật của bản Windows).

interface MacManifest {
  latest: null | {
    version: string;
    url: string;
    size: number;
    sha256: string;
    min_macos?: string;
    arch?: string;
  };
}

export interface MacRelease {
  /** Link tải .dmg trên GitHub Release. */
  url: string;
  /** "3.15.0" */
  version: string;
  /** "ToolARGB_HSL_macOS_3.15.0_arm64.dmg" */
  file: string;
  /** Dung lượng .dmg, MiB làm tròn: 396480940 → "378 MB". */
  size: string;
  sha256: string;
  /** "14.0" → "14" */
  minOs: string;
  /** "chip Apple (M1 trở lên)" */
  chip: string;
  /** Bản ngắn cho dòng thông tin dưới nút tải: "Apple M1+" */
  chipShort: string;
}

export function readMacRelease(manifest: MacManifest): MacRelease | null {
  const latest = manifest.latest;
  if (!latest || !latest.url) return null;
  const apple = (latest.arch ?? "arm64") === "arm64";
  return {
    url: latest.url,
    version: latest.version,
    file: latest.url.split("/").pop() ?? "",
    size: `${Math.round(latest.size / 1024 / 1024)} MB`,
    sha256: latest.sha256,
    minOs: (latest.min_macos ?? "14.0").replace(/\.0$/, ""),
    chip: apple ? "chip Apple (M1 trở lên)" : "chip Intel",
    chipShort: apple ? "Apple M1+" : "Intel",
  };
}
