// Thông tin bộ cài ARGB HSL Tool bản macOS lấy từ manifest riêng của macOS.
// CI build-macos.yml (repo Tool-POI-HSL) đăng .dmg lên release App_ARGB_HSL rồi tự cập nhật
// documents/app_manifest_macos.json → push master → CI build lại, nên trang web không cần sửa
// tay khi lên bản mới. KHÔNG nhầm với app_manifest.json (tự cập nhật của bản Windows).
import manifest from "../documents/app_manifest_macos.json";

const { latest } = manifest;

/** Link tải .dmg trên GitHub Release (tag App_ARGB_HSL). */
export const MACOS_TOOL_URL = latest.url;
/** "3.15.0" */
export const MACOS_TOOL_VERSION = latest.version;
/** "ToolARGB_HSL_macOS_3.15.0_arm64.dmg" */
export const MACOS_TOOL_FILE = latest.url.split("/").pop() ?? "";
/** Dung lượng .dmg, MiB làm tròn: 396480940 → "378 MB". */
export const MACOS_TOOL_SIZE = `${Math.round(latest.size / 1024 / 1024)} MB`;
export const MACOS_TOOL_SHA256 = latest.sha256;
/** "14.0" → hiển thị "macOS 14". */
export const MACOS_TOOL_MIN_OS = latest.min_macos.replace(/\.0$/, "");
/** Bản .dmg hiện chỉ cho Mac chip Apple (M1 trở lên). */
export const MACOS_TOOL_CHIP = latest.arch === "arm64" ? "chip Apple (M1 trở lên)" : "chip Intel";
/** Bản ngắn cho dòng thông tin dưới nút tải (vừa 1 dòng như dòng của Windows). */
export const MACOS_TOOL_CHIP_SHORT = latest.arch === "arm64" ? "Apple M1+" : "Intel";
