import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  /** Tiêu đề bài viết (dùng cho Web Share API gốc). */
  title: string;
  /** URL cần chia sẻ; mặc định là URL trang hiện tại. */
  url?: string;
  className?: string;
}

/**
 * Nút "Chia sẻ" đơn giản — giống nút Share ở trang Sản Phẩm.
 *
 * Ưu tiên Web Share API (mở khay chia sẻ gốc trên điện thoại — gom hết Zalo,
 * Messenger, SMS, Facebook…). Máy tính không hỗ trợ thì fallback copy link.
 */
export default function ShareButton({ title, url, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    const shareUrl = url || window.location.href;

    // 1) Web Share API gốc (mobile) — gom hết Zalo, Messenger, SMS, Facebook…
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (err) {
        // Người dùng tự đóng khay chia sẻ → dừng, không fallback copy.
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Lỗi khác (API không khả dụng…) → rơi xuống copy link bên dưới.
      }
    }

    // 2) Fallback copy link. clipboard API chỉ chạy ở secure context (https/localhost),
    //    nên có thêm fallback execCommand cho trường hợp mở qua http (IP mạng LAN…).
    const flash = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        flash();
        return;
      }
    } catch {
      /* clipboard API thất bại → thử execCommand bên dưới */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) flash();
    } catch {
      /* không copy được thì bỏ qua */
    }
  }, [title, url]);

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Chia sẻ"
      className={`flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-neon-pink/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer ${className}`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Share2 className="w-3.5 h-3.5 text-neon-pink" />
      )}
      <span>{copied ? "Đã copy link" : "Chia sẻ / Share"}</span>
    </button>
  );
}
