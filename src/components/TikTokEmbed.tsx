import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface TikTokEmbedProps {
  videoId: string;
  cite?: string;
  username?: string;
  /** Ảnh thumbnail nội bộ (vd "/img/...jpg"). Không có thì dùng nền gradient tối. */
  poster?: string;
  /** Mô tả ngắn hiển thị trên card lúc nghỉ. */
  caption?: string;
}

/**
 * TikTok embed theo theme tối của web.
 *
 * Lưu ý cross-origin: phần "thẻ" thật của TikTok (caption, tên kênh, dòng nhạc)
 * được render TRONG một iframe của tiktok.com với nền TRẮNG cố định và TikTok
 * không có tham số dark-mode — ta KHÔNG thể đổi màu bên trong iframe đó.
 *
 * Nên để hoà với theme: lúc nghỉ hiển thị một card tối (bấm-để-xem) đồng bộ màu
 * web; chỉ khi người dùng bấm mới nạp embed.js + iframe, và đặt iframe trong một
 * khung viền tối (bezel) để thẻ trắng của TikTok trông như nằm trong khung có chủ ý.
 */
export default function TikTokEmbed({
  videoId,
  cite,
  username = "@denthongminhhappy",
  poster,
  caption,
}: TikTokEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    // Chỉ nạp script TikTok khi người dùng đã bấm xem (tốt cho tốc độ trang).
    const SCRIPT_ID = "tiktok-embed-js";
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else {
      // Script đã có sẵn → ép render embed mới.
      (window as any).tiktokEmbed?.lib?.render?.();
    }
  }, [playing, videoId]);

  const citeUrl = cite || `https://www.tiktok.com/${username}/video/${videoId}`;

  // ── Trạng thái nghỉ: card tối theo theme, bấm để phát ──
  if (!playing) {
    return (
      <div className="flex justify-center my-6">
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Phát video TikTok ${username}`}
          className="group relative w-full max-w-[325px] aspect-[9/16] rounded-3xl overflow-hidden bg-glass border border-white/10 hover:border-neon-pink/40 hover:shadow-glow-pink/20 transition-[border-color,box-shadow] duration-300 cursor-pointer"
        >
          {poster ? (
            <img
              src={poster}
              alt={caption || `Video TikTok ${username}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-slate-950 to-neon-blue/20" />
          )}

          {/* Phủ tối để chữ + nút play dễ đọc */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />

          {/* Nút play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-neon-pink/90 backdrop-blur-sm flex items-center justify-center shadow-glow-pink group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Footer thông tin */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neon-pink-bright mb-1">
              ▶ TikTok
            </p>
            <p className="text-sm font-display font-semibold text-white truncate">
              {username}
            </p>
            {caption && (
              <p className="text-xs text-slate-300 leading-snug mt-1 line-clamp-2">
                {caption}
              </p>
            )}
          </div>
        </button>
      </div>
    );
  }

  // ── Trạng thái phát: embed thật đặt trong khung viền tối ──
  return (
    <div ref={containerRef} className="flex justify-center my-6">
      <div className="tiktok-bezel rounded-3xl bg-glass border border-white/10 p-2 sm:p-3 shadow-glow-pink/10">
        <blockquote
          className="tiktok-embed"
          cite={citeUrl}
          data-video-id={videoId}
          style={{ maxWidth: 605, minWidth: 280, margin: 0 }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              title={username}
              href={`https://www.tiktok.com/${username}?refer=embed`}
            >
              {username}
            </a>
          </section>
        </blockquote>
      </div>
    </div>
  );
}
