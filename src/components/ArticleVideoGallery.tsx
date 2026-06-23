import { useState } from "react";
import { Play } from "lucide-react";

interface GalleryVideo {
  /** Direct URL to an .mp4 file. */
  src: string;
  /** Tiêu đề / mô tả ngắn hiển thị trên card. */
  title?: string;
  /** Ảnh thumbnail nội bộ (vd "/img/...jpg"). Không có thì dùng nền gradient tối. */
  poster?: string;
}

interface ArticleVideoGalleryProps {
  videos: GalleryVideo[];
  columns?: 1 | 2 | 3;
  /** Màu nhấn theo theme bài viết. */
  accent?: "pink" | "blue";
}

/**
 * Lưới video MP4 (native) theo theme tối của web.
 *
 * Để tối ưu tốc độ trang: lúc nghỉ chỉ hiển thị một card tối (bấm-để-xem) đồng bộ
 * màu web; chỉ khi người dùng bấm mới nạp thẻ <video> thật và phát.
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
      {videos.map((video, i) =>
        playingIdx === i ? (
          <div
            key={video.src}
            className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video"
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-black"
            />
          </div>
        ) : (
          <button
            key={video.src}
            type="button"
            onClick={() => setPlayingIdx(i)}
            aria-label={video.title ? `Phát video ${video.title}` : "Phát video"}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 ${accentBorder} transition-all duration-300 cursor-pointer bg-slate-900/40 aspect-video`}
          >
            {video.poster ? (
              <img
                src={video.poster}
                alt={video.title || ""}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-slate-950 to-neon-blue/20" />
            )}

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
        )
      )}
    </div>
  );
}
