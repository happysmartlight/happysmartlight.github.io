import { useState, useRef, useEffect, useCallback } from "react";
import { Share2, Link2, Check, ChevronDown } from "lucide-react";

interface ShareButtonProps {
  /** Tiêu đề bài viết (dùng cho Web Share API gốc). */
  title: string;
  /** URL cần chia sẻ; mặc định là URL trang hiện tại. */
  url?: string;
  className?: string;
}

// Zalo Official Account ID (SDK đã được nhúng trong index.html: sp.zalo.me/plugins/sdk.js).
const ZALO_OAID = "1321084611356589870";

const ITEM_CLASS =
  "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-sans text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left";

/**
 * Nút "Chia sẻ" mở menu mạng xã hội (Facebook, Zalo) + Copy link, và tuỳ chọn
 * chia sẻ hệ thống (Web Share API) trên thiết bị hỗ trợ.
 *
 * Zalo dùng nút chia sẻ CHÍNH THỨC qua Zalo SDK (zalo-share-button + OA ID).
 * Phần tử Zalo được nạp bằng innerHTML vào một host ref để React không đụng vào
 * DOM mà SDK tự thay đổi (tránh xung đột reconciliation).
 */
export default function ShareButton({ title, url, className = "" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const zaloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const getUrl = useCallback(
    () => url || (typeof window !== "undefined" ? window.location.href : ""),
    [url]
  );

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

  // Nạp nút Zalo chính thức mỗi khi mở menu rồi yêu cầu SDK render lại.
  useEffect(() => {
    if (!open || !zaloRef.current) return;
    const zaloIcon =
      `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
    zaloRef.current.innerHTML =
      `<div class="zalo-share-button" data-href="${getUrl()}" data-oaid="${ZALO_OAID}" data-customize="true" data-share-type="2">` +
        `<div class="${ITEM_CLASS}">` +
          `<span class="w-5 h-5 rounded flex items-center justify-center text-[#0068FF] shrink-0">${zaloIcon}</span>` +
          `<span>Zalo</span>` +
        `</div>` +
      `</div>`;
    (window as unknown as { ZaloSocialSDK?: { reload?: () => void } }).ZaloSocialSDK?.reload?.();
  }, [open, getUrl]);

  const openPopup = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=620,height=560");
    setOpen(false);
  };

  const shareFacebook = () => {
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`);
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
          <button type="button" role="menuitem" onClick={shareFacebook} className={ITEM_CLASS}>
            <span className="w-5 h-5 rounded flex items-center justify-center text-[#1877F2] shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z" />
              </svg>
            </span>
            <span>Facebook</span>
          </button>

          {/* Zalo — nút chính thức do Zalo SDK render (nạp qua innerHTML) */}
          <div ref={zaloRef} />

          {/* Copy link */}
          <button type="button" role="menuitem" onClick={copyLink} className={ITEM_CLASS}>
            <span className="w-5 h-5 rounded flex items-center justify-center text-slate-400 shrink-0">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
            </span>
            <span>{copied ? "Đã copy link!" : "Copy link"}</span>
          </button>

          {/* Web Share API (chủ yếu trên mobile) */}
          {canNativeShare && (
            <button type="button" role="menuitem" onClick={nativeShare} className={`${ITEM_CLASS} border-t border-white/5`}>
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
