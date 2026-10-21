// Thông tin bộ cài ARGB HSL Windows Tool lấy thẳng từ manifest auto-update.
// Release Tool (repo Tool-POI-HSL) tự cập nhật documents/app_manifest.json mỗi lần
// phát hành → push master → CI build lại, nên trang web không cần sửa tay khi lên bản mới.
import manifest from "../documents/app_manifest.json";

const { latest } = manifest;

/** Link tải bộ cài .exe trên GitHub Release (tag App_ARGB_HSL). */
export const WINDOWS_TOOL_URL = latest.url;
/** "3.10.1" */
export const WINDOWS_TOOL_VERSION = latest.version;
/** "ToolARGB_HSL_Setup_3.10.1.exe" */
export const WINDOWS_TOOL_FILE = latest.url.split("/").pop() ?? "";
/** Dung lượng bộ cài, MiB làm tròn: 342959070 → "327 MB". */
export const WINDOWS_TOOL_SIZE = `${Math.round(latest.size / 1024 / 1024)} MB`;
export const WINDOWS_TOOL_SHA256 = latest.sha256;
