import { useState, useRef, useEffect, useCallback } from "react";
import { Share2, Link2, Check, MessageCircle, ChevronDown } from "lucide-react";

interface ShareButtonProps {
  /** Tiêu đề bài viết (dùng cho Web Share API gốc). */
  title: string;
  /** URL cần chia sẻ; mặc định là URL trang hiện tại. */
  url?: string;
  className?: string;
}

/**
 * Nút "Chia sẻ" mở menu mạng xã hội (Facebook, Zalo) + Copy link, và tuỳ chọn
 * chia sẻ hệ thống (Web Share API) trên thiết bị hỗ trợ.
 *
 * Lưu ý Zalo: không có link sharer plain chính thức (cách chuẩn cần Zalo SDK +
 * OA ID). Ở đây dùng endpoint plugin share dạng best-effort cho web.
 */
export default function ShareButton({ title, url, className = "" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  // Đóng menu khi bấm ra ngoài hoặc nhấn Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const getUrl = useCallback(
    () => url || (typeof window !== "undefined" ? window.location.href : ""),
    [url]
  );

  const openPopup = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=620,height=560");
    setOpen(false);
  };

  const shareFacebook = () => {
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`);
  };

  const shareZalo = () => {
    openPopup(`https://sp.zalo.me/plugins/share?url=${encodeURIComponent(getUrl())}`);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url: getUrl() });
      setOpen(false);
    } catch {
      /* người dùng huỷ */
    }
  };

  const itemClass =
    "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-sans text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left";

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-neon-pink/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
      >
        <Share2 className="w-3.5 h-3.5 text-neon-pink" />
        <span>Chia sẻ / Share</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-52 z-50 rounded-xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden py-1"
        >
          {/* Facebook */}
          <button type="button" role="menuitem" onClick={shareFacebook} className={itemClass}>
            <span className="w-5 h-5 rounded flex items-center justify-center text-[#1877F2] shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z" />
              </svg>
            </span>
            <span>Facebook</span>
          </button>

          {/* Zalo */}
          <button type="button" role="menuitem" onClick={shareZalo} className={itemClass}>
            <span className="w-5 h-5 rounded flex items-center justify-center text-[#0068FF] shrink-0">
              <MessageCircle className="w-4 h-4" />
            </span>
            <span>Zalo</span>
          </button>

          {/* Copy link */}
          <button type="button" role="menuitem" onClick={copyLink} className={itemClass}>
            <span className="w-5 h-5 rounded flex items-center justify-center text-slate-400 shrink-0">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
            </span>
            <span>{copied ? "Đã copy link!" : "Copy link"}</span>
          </button>

          {/* Web Share API (chủ yếu trên mobile) */}
          {canNativeShare && (
            <button type="button" role="menuitem" onClick={nativeShare} className={`${itemClass} border-t border-white/5`}>
              <span className="w-5 h-5 rounded flex items-center justify-center text-neon-pink shrink-0">
                <Share2 className="w-4 h-4" />
              </span>
              <span>Chia sẻ khác…</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
