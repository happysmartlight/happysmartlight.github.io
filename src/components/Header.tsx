import { useState, useEffect } from "react";
import { Menu, X, Cpu, Zap, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Trang Chủ" },
    { id: "about", label: "Giới Thiệu" },
    { id: "products", label: "Sản Phẩm" },
    { id: "features", label: "Tính Năng" },
    { id: "ecosystem", label: "Hệ Sinh Thái" },
    { id: "applications", label: "Giải Pháp" },
    { id: "app-and-tool", label: "Download" },
    { id: "contact", label: "Liên Hệ" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

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
            <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-display tracking-wide uppercase transition-all duration-300 relative border ${
                    activeSection === item.id
                      ? "text-white bg-white/5 border-white/10"
                      : "text-slate-400 hover:text-white border-transparent"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-glow"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 -z-10 blur-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Contact Quick Button */}
            <div className="hidden lg:flex items-center space-x-3" id="desktop-actions">
              <button
                onClick={() => handleNavClick("contact")}
                className="relative group overflow-hidden rounded-full p-[1px] cursor-pointer"
                id="btn-nav-contact"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-neon-pink-bright via-purple-500 to-neon-blue-bright scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative px-5 py-2 rounded-full bg-slate-950 text-xs font-display font-semibold tracking-wider uppercase text-white flex items-center space-x-2 transition-all duration-300 border border-white/10 group-hover:border-transparent group-hover:bg-slate-950/90">
                  <Zap className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
                  <span>Mua Ngay</span>
                </div>
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
            className="absolute top-full left-0 w-full z-40 lg:hidden p-4 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            id="mobile-nav-panel"
          >
            <div className="grid grid-cols-2 gap-2 mt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-lg text-left text-sm font-display font-medium tracking-wide uppercase transition-all ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-neon-pink/15 to-neon-blue/15 border border-white/15 shadow-glow-dual/2min"
                      : "text-slate-400 hover:text-white bg-slate-900/50 border border-transparent"
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

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
