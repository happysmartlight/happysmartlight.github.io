// Thông tin bộ cài POI HSL Studio (app POI riêng cho Windows) lấy thẳng từ manifest auto-update.
// Release Tool (repo Tool-POI-HSL, app "POI HSL Studio") tự cập nhật documents/poi_app_manifest.json
// mỗi lần phát hành → push master → CI build lại, nên trang web không cần sửa tay khi lên bản mới.
import manifest from "../documents/poi_app_manifest.json";
import macManifest from "../documents/poi_app_manifest_macos.json";
import { readMacRelease } from "./macosRelease";

const { latest } = manifest;

/** Bản macOS (.dmg), đọc từ poi_app_manifest_macos.json; null = chưa có → ẩn nút tải macOS. */
export const POI_STUDIO_MAC = readMacRelease(macManifest);

/** Link tải bộ cài .exe trên GitHub Release (tag App_POI_HSL_Studio). */
export const POI_STUDIO_URL = latest.url;
/** "1.0.0" */
export const POI_STUDIO_VERSION = latest.version;
/** "POI_HSL_Studio_Setup_1.0.0.exe" */
export const POI_STUDIO_FILE = latest.url.split("/").pop() ?? "";
/** Dung lượng bộ cài, MiB làm tròn: 223547781 → "213 MB". */
export const POI_STUDIO_SIZE = `${Math.round(latest.size / 1024 / 1024)} MB`;
export const POI_STUDIO_SHA256 = latest.sha256;
