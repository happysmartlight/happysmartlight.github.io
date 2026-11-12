// Bản macOS của ARGB HSL Tool, đọc từ documents/app_manifest_macos.json (xem macosRelease.ts).
// null = chưa có bản macOS → trang web ẩn nút tải macOS.
import manifest from "../documents/app_manifest_macos.json";
import { readMacRelease } from "./macosRelease";

export const MACOS_TOOL = readMacRelease(manifest);
