import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Zap, ChevronDown, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { latestPosts } from "../content/collections";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

// A dropdown child either opens a detail route (`to`) or, for in-page use-cases,
// selects a showcase tab (`appId`) and scrolls to its section.
type DropdownChild = { label: string; desc: string; dot: string; to?: string; appId?: string };

// Discriminated nav entries: in-page section scroll, route link, or a hover
// dropdown. A dropdown's trigger scrolls to its section by default, or navigates
// to `to` when set (e.g. Bài Viết → /post-news).
type NavItem =
  | { kind: "section"; id: string; label: string }
  | { kind: "route"; id: string; to: string; label: string }
  | { kind: "dropdown"; id: string; label: string; menu: DropdownChild[]; allLabel: string; to?: string };

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
};

// Flagship products surfaced in the Sản Phẩm dropdown. `dot` matches each
// product's accent so the menu reads as the same family shown on the page.
const productMenu: DropdownChild[] = [
  { label: "HSL 2X PRO", desc: "Flagship POI", dot: "#fbbf24", to: "/san-pham/v4pro" },
  { label: "HSL 4X", desc: "Công suất cực cao", dot: "#00e5ff", to: "/san-pham/hsl4x" },
  { label: "LED Matrix Driver Pro", desc: "Cho panel LED", dot: "#00e5ff", to: "/san-pham/matrix" },
  { label: "Happy POI Wand", desc: "Nghệ thuật di động", dot: "#ff2d95", to: "/san-pham/poi" },
];

// Download targets: the Android app and the desktop tool detail pages.
const downloadMenu: DropdownChild[] = [
  { label: "Ứng dụng Android", desc: "ARGB HSL Mobile", dot: "#00e676", to: "/argb-hsl-tool-mobile" },
  { label: "Phần mềm Desktop", desc: "ARGB HSL cho PC", dot: "#00e5ff", to: "/argb-hsl-tool-pc" },
];

// Use-cases of the "Giải Pháp" showcase. `appId` selects the matching tab in
// InteractiveAppShowcase; `dot` mirrors each use-case's theme color.
const solutionMenu: DropdownChild[] = [
  { label: "Gậy POI & Biểu Diễn", desc: "Đội múa di động", dot: "#10b981", appId: "poi" },
  { label: "LED Dance & Trang Phục", desc: "Vũ đoàn pixel", dot: "#a855f7", appId: "dance" },
  { label: "LED Sân Khấu & Sự Kiện", desc: "Show & DMX", dot: "#ff2d95", appId: "stage" },
  { label: "Phòng Gaming / Studio", desc: "Sync âm thanh", dot: "#00e5ff", appId: "gaming" },
  { label: "Ma Trận LED Quảng Cáo", desc: "Chữ chạy / panel", dot: "#a855f7", appId: "matrix" },
  { label: "Độ LED Ô Tô / Xe Máy", desc: "Ánh sáng gầm xe", dot: "#f59e0b", appId: "car" },
];

// 3 newest articles surfaced in the Bài Viết dropdown (sorted by date).
const newsMenu: DropdownChild[] = latestPosts(3).map((p) => ({
  label: p.title,
  desc: formatDate(p.date),
  dot: "#00e5ff",
  to: p.url,
}));

const navItems: NavItem[] = [
  { kind: "section", id: "hero", label: "Trang Chủ" },
  { kind: "section", id: "about", label: "Giới Thiệu" },
  { kind: "dropdown", id: "products", label: "Sản Phẩm", menu: productMenu, allLabel: "Xem tất cả sản phẩm →" },
  { kind: "section", id: "features", label: "Tính Năng" },
  { kind: "section", id: "ecosystem", label: "Hệ Sinh Thái" },
  { kind: "dropdown", id: "applications", label: "Giải Pháp", menu: solutionMenu, allLabel: "Mở khu vực giải pháp →" },
  { kind: "dropdown", id: "app-and-tool", label: "Download", menu: downloadMenu, allLabel: "Tới khu vực tải về →" },
  { kind: "dropdown", id: "post-news", label: "Bài Viết", menu: newsMenu, allLabel: "Xem tất cả bài viết →", to: "/post-news" },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
  };

  const handleNavClick = (id: string) => {
    closeAll();
    onNavigate(id);
  };

  const goToRoute = (to: string) => {
    closeAll();
    navigate(to);
  };

  // Dropdown child: open a detail route, or deep-link a showcase use-case (select
  // its tab via event/sessionStorage, then scroll to the "Giải Pháp" section).
  const goToChild = (c: DropdownChild) => {
    closeAll();
    if (c.appId) {
      try {
        sessionStorage.setItem("hsl-pending-app", c.appId);
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent("hsl:select-app", { detail: c.appId }));
      onNavigate("applications");
    } else if (c.to) {
      navigate(c.to);
    }
  };

  const isRouteActive = (to: string) => location.pathname.startsWith(to);

  // Shared classes for a desktop top-level nav pill.
  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-medium font-display tracking-wide uppercase transition-all duration-300 relative border cursor-pointer ${
      active ? "text-white bg-white/5 border-white/10" : "text-slate-400 hover:text-white border-transparent"
    }`;

  const navGlow = (
    <motion.span
      layoutId="nav-glow"
      className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 -z-10 blur-xs"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );

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
                      {active && navGlow}
                    </button>
                  );
                }

                if (item.kind === "dropdown") {
                  const active = item.to ? isRouteActive(item.to) : activeSection === item.id;
                  const isOpen = openDropdown === item.id;
                  const onTrigger = () => (item.to ? goToRoute(item.to) : handleNavClick(item.id));
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      onMouseLeave={() => setOpenDropdown((cur) => (cur === item.id ? null : cur))}
                    >
                      <button
                        onClick={onTrigger}
                        className={`${pill(active)} inline-flex items-center gap-1`}
                        id={`nav-item-${item.id}`}
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                        {active && navGlow}
                      </button>

                      {/* Hover dropdown — pt-3 bridges the gap so the menu stays open
                          while the pointer travels from the trigger to the panel. */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                            role="menu"
                          >
                            <div className="rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-2">
                              {item.menu.map((c) => (
                                <button
                                  key={c.to ?? c.appId}
                                  onClick={() => goToChild(c)}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors hover:bg-white/5 cursor-pointer group/item"
                                  role="menuitem"
                                >
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
                                  />
                                  <span className="flex flex-col min-w-0">
                                    <span className="text-sm font-display font-semibold text-slate-200 group-hover/item:text-white line-clamp-2">
                                      {c.label}
                                    </span>
                                    <span className="text-[11px] font-mono uppercase tracking-wide text-slate-500">
                                      {c.desc}
                                    </span>
                                  </span>
                                </button>
                              ))}
                              <button
                                onClick={onTrigger}
                                className="w-full mt-1 px-3 py-2 rounded-xl text-center text-[11px] font-mono uppercase tracking-wider text-[#00f0ff] hover:bg-white/5 transition-colors cursor-pointer"
                                role="menuitem"
                              >
                                {item.allLabel}
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

                // "Trang Chủ" gets a distinct treatment: a home icon + a standing
                // gradient-tinted pill so it reads as the anchor of the nav.
                if (item.id === "hero") {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`group/home relative inline-flex items-center gap-1.5 px-3.5 py-1.5 mr-1 rounded-full text-xs font-bold font-display tracking-wide uppercase cursor-pointer border transition-all duration-300 ${
                        active
                          ? "text-white border-white/20 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 shadow-glow-dual"
                          : "text-slate-200 border-white/10 bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 hover:text-white hover:border-white/20 hover:from-neon-pink/20 hover:to-neon-blue/20"
                      }`}
                      id={`nav-item-${item.id}`}
                    >
                      <Home className="w-3.5 h-3.5 text-neon-pink-bright group-hover/home:scale-110 transition-transform" />
                      {item.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={pill(active)}
                    id={`nav-item-${item.id}`}
                  >
                    {item.label}
                    {active && navGlow}
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
                if (item.kind === "dropdown") {
                  const isOpen = mobileOpenDropdown === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setMobileOpenDropdown((cur) => (cur === item.id ? null : item.id))}
                      className="p-3 rounded-lg text-left text-sm font-display font-medium tracking-wide uppercase transition-all flex items-center justify-between text-slate-400 hover:text-white bg-slate-900/50 border border-transparent"
                      id={`mobile-nav-item-${item.id}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  );
                }

                const onClick =
                  item.kind === "route" ? () => goToRoute(item.to) : () => handleNavClick(item.id);
                const active =
                  item.kind === "route" ? isRouteActive(item.to) : activeSection === item.id;

                // "Trang Chủ" stands out on mobile too: home icon + gradient tint.
                if (item.kind === "section" && item.id === "hero") {
                  return (
                    <button
                      key={item.id}
                      onClick={onClick}
                      className="col-span-2 p-3 rounded-lg text-left text-sm font-display font-bold tracking-wide uppercase transition-all flex items-center gap-2 text-white bg-gradient-to-r from-neon-pink/15 to-neon-blue/15 border border-white/15"
                      id={`mobile-nav-item-${item.id}`}
                    >
                      <Home className="w-4 h-4 text-neon-pink-bright" />
                      {item.label}
                    </button>
                  );
                }

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

            {/* Mobile submenu for the currently open dropdown */}
            <AnimatePresence>
              {mobileOpenDropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {(() => {
                    const dd = navItems.find(
                      (i): i is Extract<NavItem, { kind: "dropdown" }> =>
                        i.kind === "dropdown" && i.id === mobileOpenDropdown
                    );
                    if (!dd) return null;
                    return (
                      <div className="mt-2 grid grid-cols-1 gap-1.5 rounded-xl border border-white/10 bg-slate-900/40 p-2">
                        {dd.menu.map((c) => (
                          <button
                            key={c.to ?? c.appId}
                            onClick={() => goToChild(c)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 transition-colors"
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
                            />
                            <span className="flex flex-col min-w-0">
                              <span className="text-sm font-display font-semibold text-slate-200 line-clamp-2">{c.label}</span>
                              <span className="text-[11px] font-mono uppercase tracking-wide text-slate-500">{c.desc}</span>
                            </span>
                          </button>
                        ))}
                        <button
                          onClick={() => (dd.to ? goToRoute(dd.to) : handleNavClick(dd.id))}
                          className="w-full mt-0.5 px-3 py-2 rounded-lg text-center text-[11px] font-mono uppercase tracking-wider text-[#00f0ff] hover:bg-white/5 transition-colors"
                        >
                          {dd.allLabel}
                        </button>
                      </div>
                    );
                  })()}
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
