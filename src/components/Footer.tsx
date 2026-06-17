import { Mail, Phone, MapPin, ArrowUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { COLLECTION_META, COLLECTION_KEYS } from "../content/collections";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onViewPrivacy?: () => void;
}

export default function Footer({ onNavigate, onViewPrivacy }: FooterProps) {
  const handleScrollToTop = () => {
    onNavigate("hero");
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-16 pb-8 overflow-hidden" id="app-footer">
      {/* Background soft glows */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-pink-bright/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-neon-blue-bright/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="footer-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/5" id="footer-row-top">
          {/* Brand Intro Column */}
          <div className="lg:col-span-4 space-y-4" id="footer-brand-intro">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={handleScrollToTop}>
              <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-white/10 overflow-hidden shadow-glow-blue/25">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white relative z-10"
                >
                  <circle cx="12" cy="12" r="4" className="stroke-neon-pink" />
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base leading-none bg-gradient-to-r from-neon-pink-bright to-neon-blue-bright bg-clip-text text-transparent tracking-tight">
                  HAPPY
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#00f0ff] font-bold">
                  Smart Light
                </span>
              </div>
            </div>

            <p className="font-sans font-light text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Hệ sinh thái thiết bị điều khiển LED thông minh thế hệ mới, hỗ trợ tối đa các giao thức hiệu ứng sừng sỏ nhất thế giới. Sáng tạo bởi người Việt, vì người Việt.
            </p>
          </div>

          {/* Quick Links Sitemap */}
          <div className="lg:col-span-2 space-y-4" id="footer-sitemap">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">Sơ Đồ Trang</h4>
            <div className="flex flex-col gap-2">
              {[
                { id: "hero", label: "Trang chủ" },
                { id: "about", label: "Giới thiệu" },
                { id: "products", label: "Sản phẩm" },
                { id: "features", label: "Tính năng" },
                { id: "ecosystem", label: "Hệ sinh thái" },
                { id: "estimator", label: "Dự toán LED" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-slate-400 hover:text-[#00f0ff] text-xs font-sans text-left transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog / Collections (internal links for SEO) */}
          <div className="lg:col-span-3 space-y-4" id="footer-catalog">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">Danh Mục</h4>
            <div className="flex flex-col gap-2">
              {COLLECTION_KEYS.map((key) => (
                <Link
                  key={key}
                  to={`${COLLECTION_META[key].path}/`}
                  className="text-slate-400 hover:text-[#00f0ff] text-xs font-sans transition-colors"
                >
                  {COLLECTION_META[key].heading}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacts / Address details */}
          <div className="lg:col-span-3 space-y-4" id="footer-contact-details">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">Liên Hệ Pháp Nhân</h4>
            <div className="space-y-3 font-sans text-xs text-slate-400">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-neon-pink mr-3.5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p><strong>CÔNG TY TNHH THƯƠNG MẠI VÀ CÔNG NGHỆ HAPPY SMART LIGHT</strong></p>
                  <p>MST: 3502535621</p>
                  <p>Kỹ thuật: Tech Hub, Sảnh S6.03, Vinhomes Grand Park, P. Long Bình, TP. Hồ Chí Minh</p>
                  <p>Trụ sở chính: Số 42 Hà Đức Trọng, P. Bà Rịa, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-neon-blue mr-3.5 shrink-0" />
                <span>(+84) 0784 140 494 (Hotline & Zalo)</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-[#00f0ff] mr-3.5 shrink-0" />
                <span>happysmartlight@outlook.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row bottom credits */}
        <div className="mt-8 pt-8 flex flex-col sm:flex-row items-center sm:justify-between text-[11px] font-mono text-slate-500 gap-4" id="footer-row-bottom">
          <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Happy Smart Light. Thiết kế tối ưu cho trải nghiệm người dùng Việt Nam.</span>
            {onViewPrivacy && (
              <>
                <span className="hidden sm:inline text-slate-700">|</span>
                <button
                  onClick={onViewPrivacy}
                  className="hover:text-neon-pink transition-colors text-slate-400 underline decoration-slate-600 hover:decoration-neon-pink cursor-pointer font-sans"
                >
                  Chính sách bảo mật ARGB HSL (Google Play)
                </button>
              </>
            )}
          </p>

          {/* Scroll to Top Trigger */}
          <button
            onClick={handleScrollToTop}
            className="group py-2 px-4 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center space-x-2.5 cursor-pointer shadow-sm"
            id="btn-footer-back-to-top"
          >
            <span>Lên Đầu Trang</span>
            <div className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center p-1 border border-white/5 group-hover:border-neon-pink group-hover:text-neon-pink-bright transition-all">
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
