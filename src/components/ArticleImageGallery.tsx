import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ArticleImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

/**
 * Responsive image gallery with click-to-zoom lightbox modal.
 * Art-themed styling consistent with the site design language.
 */
export default function ArticleImageGallery({ images, columns = 3 }: ArticleImageGalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const open = (i: number) => setLightboxIdx(i);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(() => setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  // Keyboard + scroll lock
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx, close, prev, next]);

  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <div className={`grid ${colClass} gap-3 my-6`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => open(i)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 cursor-zoom-in bg-slate-900/40"
          >
            <img
              src={img.src}
              alt={img.alt || ""}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {img.caption && (
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-[11px] text-slate-300 font-sans">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          {/* Close */}
          <button onClick={close} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-slate-800 transition cursor-pointer" aria-label="Đóng">
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-slate-800 transition cursor-pointer" aria-label="Ảnh trước">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-slate-800 transition cursor-pointer" aria-label="Ảnh sau">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={images[lightboxIdx].src}
              alt={images[lightboxIdx].alt || ""}
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
            {images[lightboxIdx].caption && (
              <p className="mt-3 text-sm text-slate-400 text-center font-sans">{images[lightboxIdx].caption}</p>
            )}
            <p className="mt-1 text-[10px] text-slate-600 font-mono">{lightboxIdx + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
