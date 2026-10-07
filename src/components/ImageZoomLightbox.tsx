import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";

export interface ZoomGalleryItem {
  label: string;
  url?: string;
  alt?: string;
}

interface ImageZoomLightboxProps {
  open: boolean;
  items: ZoomGalleryItem[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ImageZoomLightbox({
  open,
  items,
  currentIndex,
  title,
  onClose,
  onIndexChange,
}: ImageZoomLightboxProps) {
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const itemCount = items.length;
  const safeIndex = itemCount > 0 ? ((currentIndex % itemCount) + itemCount) % itemCount : 0;
  const currentItem = items[safeIndex];

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    dragRef.current = null;
  };

  const zoomIn = () => setScale((value) => Math.min(value + 0.5, MAX_SCALE));

  const zoomOut = () =>
    setScale((value) => {
      const next = Math.max(value - 0.5, MIN_SCALE);
      if (next <= 1) setOffset({ x: 0, y: 0 });
      return next;
    });

  const changeSlide = (direction: number) => {
    if (itemCount <= 1) return;
    onIndexChange((safeIndex + direction + itemCount) % itemCount);
  };

  useEffect(() => {
    resetZoom();
  }, [open, safeIndex]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeSlide(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        changeSlide(1);
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomIn();
      } else if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, safeIndex, itemCount]);

  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;
    if (!modal) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    modal.focus();

    const getFocusable = (): HTMLElement[] =>
      (Array.from(
        modal.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[]).filter((element) => element.offsetParent !== null);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  if (!open || !currentItem?.url) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} - ${currentItem.label}`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md select-none outline-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl flex justify-between items-center gap-3 mb-4 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-300 truncate">
          {title} - {currentItem.label}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed"
            aria-label="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-slate-400 w-10 text-center tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed"
            aria-label="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            disabled={scale === 1 && offset.x === 0 && offset.y === 0}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed"
            aria-label="Đặt lại zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="w-px h-5 bg-white/10 mx-1" />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className="w-full max-w-5xl h-[75vh] flex items-center justify-center bg-slate-950 rounded-2xl border border-white/10 p-2 relative overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        onWheel={(event) => {
          event.preventDefault();
          setScale((value) => {
            const next = Math.min(Math.max(value + (event.deltaY < 0 ? 0.25 : -0.25), MIN_SCALE), MAX_SCALE);
            if (next <= 1) setOffset({ x: 0, y: 0 });
            return next;
          });
        }}
      >
        {itemCount > 1 && (
          <>
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => changeSlide(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <img
          src={currentItem.url}
          alt={currentItem.alt ?? `${title} - ${currentItem.label}`}
          draggable={false}
          onPointerDown={(event) => {
            if (scale <= 1) return;
            dragRef.current = { startX: event.clientX, startY: event.clientY, ox: offset.x, oy: offset.y };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragRef.current) return;
            setOffset({
              x: dragRef.current.ox + (event.clientX - dragRef.current.startX),
              y: dragRef.current.oy + (event.clientY - dragRef.current.startY),
            });
          }}
          onPointerUp={() => {
            dragRef.current = null;
          }}
          onPointerCancel={() => {
            dragRef.current = null;
          }}
          onDoubleClick={() => (scale > 1 ? resetZoom() : setScale(2))}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: scale > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-in",
            transition: dragRef.current ? "none" : "transform 0.2s ease-out",
          }}
          className="max-w-full max-h-full object-contain will-change-transform touch-none"
        />
      </div>

      <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-slate-500">
        {itemCount > 1 && <span className="text-slate-300 tabular-nums">{safeIndex + 1} / {itemCount}</span>}
        <span>ESC để đóng · Trái/Phải đổi ảnh · cuộn/+/- để zoom · kéo để di chuyển</span>
      </div>
    </div>
  );
}
