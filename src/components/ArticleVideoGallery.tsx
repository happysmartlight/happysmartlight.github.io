import { useState } from "react";
import { Play } from "lucide-react";

interface GalleryVideo {
  /** YouTube video ID hoặc URL đầy đủ (youtu.be/…, watch?v=…, shorts/…, embed/…). */
  youtube: string;
  /** Tiêu đề / mô tả ngắn hiển thị trên card. */
  title?: string;
  /** Ảnh thumbnail tuỳ chọn ("/img/...jpg"). Bỏ trống thì tự lấy ảnh từ YouTube. */
  poster?: string;
}

interface ArticleVideoGalleryProps {
  videos: GalleryVideo[];
  columns?: 1 | 2 | 3;
  /** Màu nhấn theo theme bài viết. */
  accent?: "pink" | "blue";
}

/**
 * Trích YouTube video ID từ nhiều dạng URL hoặc trả lại nguyên ID nếu đã là ID.
 * Hỗ trợ: youtu.be/ID, youtube.com/watch?v=ID, /shorts/ID, /embed/ID, /live/ID.
 */
function youtubeId(input: string): string {
  const s = input.trim();
  // Đã là ID thuần (11 ký tự hợp lệ) → dùng luôn.
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/\/(?:shorts|embed|live)\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
    // youtu.be/ID
    const seg = u.pathname.replace(/^\/+/, "").split("/")[0];
    if (/^[a-zA-Z0-9_-]{11}$/.test(seg)) return seg;
  } catch {
    /* không phải URL hợp lệ */
  }
  return s;
}

/**
 * Lưới video YouTube (nhúng) theo theme tối của web.
 *
 * Để tối ưu tốc độ trang (facade pattern): lúc nghỉ chỉ hiển thị thumbnail + nút play;
 * chỉ khi người dùng bấm mới nạp <iframe> YouTube và tự phát. Bật playsinline để
 * iOS/iPhone phát ngay trong trang thay vì mở app ngoài.
 */
export default function ArticleVideoGallery({
  videos,
  columns = 2,
  accent = "pink",
}: ArticleVideoGalleryProps) {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  const accentText = accent === "blue" ? "text-neon-blue-bright" : "text-neon-pink-bright";
  const accentBorder = accent === "blue" ? "hover:border-neon-blue/40" : "hover:border-neon-pink/40";
  const accentBtn = accent === "blue" ? "bg-neon-blue/90 shadow-glow-blue" : "bg-neon-pink/90 shadow-glow-pink";

  return (
    <div className={`grid ${colClass} gap-3 my-6`}>
      {videos.map((video, i) => {
        const id = youtubeId(video.youtube);
        const poster = video.poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        return playingIdx === i ? (
          <div
            key={id}
            className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
              title={video.title || "YouTube video"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <button
            key={id}
            type="button"
            onClick={() => setPlayingIdx(i)}
            aria-label={video.title ? `Phát video ${video.title}` : "Phát video"}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 ${accentBorder} transition-all duration-300 cursor-pointer bg-slate-900/40 aspect-video`}
          >
            <img
              src={poster}
              alt={video.title || ""}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
            />

            {/* Phủ tối để chữ + nút play dễ đọc */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />

            {/* Nút play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-14 h-14 rounded-full ${accentBtn} backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
            </div>

            {/* Footer thông tin */}
            {video.title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${accentText} mb-0.5`}>
                  ▶ Video
                </p>
                <p className="text-sm font-display font-semibold text-white leading-snug line-clamp-2">
                  {video.title}
                </p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
