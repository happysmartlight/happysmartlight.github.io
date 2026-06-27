import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

// Discriminated nav entries: in-page section scroll, route link, or the products
// dropdown trigger (which both scrolls AND reveals a product submenu on hover).
type NavItem =
  | { kind: "section"; id: string; label: string }
  | { kind: "route"; id: string; to: string; label: string }
  | { kind: "products"; id: "products"; label: string };

const navItems: NavItem[] = [
  { kind: "section", id: "hero", label: "Trang Chủ" },
  { kind: "section", id: "about", label: "Giới Thiệu" },
  { kind: "products", id: "products", label: "Sản Phẩm" },
  { kind: "section", id: "features", label: "Tính Năng" },
  { kind: "section", id: "ecosystem", label: "Hệ Sinh Thái" },
  { kind: "section", id: "applications", label: "Giải Pháp" },
  { kind: "route", id: "post-news", to: "/post-news", label: "Bài Viết" },
  { kind: "section", id: "app-and-tool", label: "Download" },
  { kind: "section", id: "contact", label: "Liên Hệ" },
];

// The four flagship products surfaced in the Sản Phẩm dropdown. `dot` matches each
// product's accent so the menu reads as the same family shown in the Products section.
const productMenu = [
  { id: "v4pro", label: "HSL 2X PRO", desc: "Flagship POI", dot: "#fbbf24" },
  { id: "hsl4x", label: "HSL 4X", desc: "Công suất cực cao", dot: "#00e5ff" },
  { id: "matrix", label: "LED Matrix Driver Pro", desc: "Cho panel LED", dot: "#00e5ff" },
  { id: "poi", label: "Happy POI Wand", desc: "Nghệ thuật di động", dot: "#ff2d95" },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    onNavigate(id);
  };

  const goToRoute = (to: string) => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    navigate(to);
  };

  const goToProduct = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    setIsMobileProductsOpen(false);
    navigate(`/san-pham/${id}`);
  };

  const isRouteActive = (to: string) => location.pathname.startsWith(to);

  // Shared classes for a desktop top-level nav pill.
  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-medium font-display tracking-wide uppercase transition-all duration-300 relative border cursor-pointer ${
      active ? "text-white bg-white/5 border-white/10" : "text-slate-400 hover:text-white border-transparent"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-slate-950/95 backdrop-blur-xl border-white/10 shadow-md"
          : "bg-transparent border-transparent"
      }`}
      id="app-header"
    >
      <div className={`transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavClick("hero")}
              id="header-logo"
            >
              <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 border border-white/10 overflow-hidden shadow-glow-dual">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/25 to-neon-blue/25 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="/logo_hsl.png"
                  alt="Happy Smart Light"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none bg-gradient-to-r from-neon-pink-bright via-white to-neon-blue-bright bg-clip-text text-transparent tracking-tight">
                  HAPPY
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold">
                  Smart Light
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0.5" id="desktop-nav">
              {navItems.map((item) => {
                if (item.kind === "route") {
                  const active = isRouteActive(item.to);
                  return (
                    <button
                      key={item.id}
                      onClick={() => goToRoute(item.to)}
                      className={pill(active)}
                      id={`nav-item-${item.id}`}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-glow"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 -z-10 blur-xs"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                }

                if (item.kind === "products") {
                  const active = activeSection === item.id;
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`${pill(active)} inline-flex items-center gap-1`}
                        id={`nav-item-${item.id}`}
                        aria-haspopup="menu"
                        aria-expanded={isProductsOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${isProductsOpen ? "rotate-180" : ""}`}
                        />
                        {active && (
                          <motion.span
                            layoutId="nav-glow"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 -z-10 blur-xs"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* Hover dropdown — pt-3 bridges the gap so the menu stays open
                          while the pointer travels from the trigger to the panel. */}
                      <AnimatePresence>
                        {isProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                            role="menu"
                          >
                            <div className="rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-2">
                              {productMenu.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => goToProduct(p.id)}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors hover:bg-white/5 cursor-pointer group/item"
                                  role="menuitem"
                                >
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: p.dot, boxShadow: `0 0 8px ${p.dot}` }}
                                  />
                                  <span className="flex flex-col">
                                    <span className="text-sm font-display font-semibold text-slate-200 group-hover/item:text-white">
                                      {p.label}
                                    </span>
                                    <span className="text-[11px] font-mono uppercase tracking-wide text-slate-500">
                                      {p.desc}
                                    </span>
                                  </span>
                                </button>
                              ))}
                              <button
                                onClick={() => handleNavClick("products")}
                                className="w-full mt-1 px-3 py-2 rounded-xl text-center text-[11px] font-mono uppercase tracking-wider text-[#00f0ff] hover:bg-white/5 transition-colors cursor-pointer"
                                role="menuitem"
                              >
                                Xem tất cả sản phẩm →
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // kind === "section"
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={pill(active)}
                    id={`nav-item-${item.id}`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-glow"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 -z-10 blur-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Contact Quick Button */}
            <div className="hidden lg:flex items-center space-x-3" id="desktop-actions">
              <button
                onClick={() => handleNavClick("contact")}
                className="relative group cursor-pointer rounded-full p-[1.5px] hsl-cta-border transition-transform duration-300 hover:scale-105 active:scale-95"
                id="btn-nav-contact"
              >
                {/* Inner pill — clips the shine sweep */}
                <span className="relative flex items-center gap-2 overflow-hidden rounded-full bg-slate-950 px-5 py-2 text-xs font-display font-bold tracking-wider uppercase text-white">
                  <span aria-hidden className="absolute inset-0 hsl-cta-shine pointer-events-none" />
                  <Zap className="relative z-10 w-3.5 h-3.5 text-[#00f0ff] transition-colors duration-300 group-hover:text-white" />
                  <span className="relative z-10">Mua Ngay</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden" id="mobile-menu-btn-container">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                id="btn-mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full z-40 lg:hidden p-4 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto"
            id="mobile-nav-panel"
          >
            <div className="grid grid-cols-2 gap-2 mt-2">
              {navItems.map((item) => {
                if (item.kind === "products") {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setIsMobileProductsOpen((v) => !v)}
                      className="p-3 rounded-lg text-left text-sm font-display font-medium tracking-wide uppercase transition-all flex items-center justify-between text-slate-400 hover:text-white bg-slate-900/50 border border-transparent"
                      id="mobile-nav-item-products"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  );
                }

                const onClick =
                  item.kind === "route" ? () => goToRoute(item.to) : () => handleNavClick(item.id);
                const active =
                  item.kind === "route" ? isRouteActive(item.to) : activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={onClick}
                    className={`p-3 rounded-lg text-left text-sm font-display font-medium tracking-wide uppercase transition-all ${
                      active
                        ? "text-white bg-gradient-to-r from-neon-pink/15 to-neon-blue/15 border border-white/15"
                        : "text-slate-400 hover:text-white bg-slate-900/50 border border-transparent"
                    }`}
                    id={`mobile-nav-item-${item.id}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile product submenu */}
            <AnimatePresence>
              {isMobileProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 grid grid-cols-1 gap-1.5 rounded-xl border border-white/10 bg-slate-900/40 p-2">
                    {productMenu.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => goToProduct(p.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 transition-colors"
                        id={`mobile-product-${p.id}`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: p.dot, boxShadow: `0 0 8px ${p.dot}` }}
                        />
                        <span className="flex flex-col">
                          <span className="text-sm font-display font-semibold text-slate-200">{p.label}</span>
                          <span className="text-[11px] font-mono uppercase tracking-wide text-slate-500">{p.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-pink to-neon-blue text-center text-xs font-display font-bold uppercase tracking-wider text-white shadow-glow-pink flex items-center justify-center space-x-2"
                id="btn-mobile-contact-action"
              >
                <Zap className="w-4 h-4 text-white animate-bounce" />
                <span>LIÊN HỆ & MUA CHIẾT KHẤU</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
