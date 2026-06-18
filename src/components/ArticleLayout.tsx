import { useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Share2, Phone, Mail, MessageCircle } from "lucide-react";
import Seo from "./Seo";

type AccentColor = "pink" | "blue" | "emerald" | "purple";

interface ArticleLayoutProps {
  /** SEO & heading */
  title: string;
  metaTitle?: string;
  description: string;
  /** Eyebrow label above title */
  eyebrow: string;
  /** Banner hero image path */
  bannerImg?: string;
  /** Accent colour theme */
  accent?: AccentColor;
  /** URL path for SEO */
  path: string;
  /** Back navigation */
  backPath?: string;
  backLabel?: string;
  /** Children content */
  children: React.ReactNode;
  /** Hide default contact footer */
  hideContact?: boolean;
}

/* Colour mappings */
const ACCENT = {
  pink: {
    gradient: "from-neon-pink via-purple-500 to-neon-pink",
    bar: "bg-neon-pink",
    text: "text-neon-pink-bright",
    glow1: "bg-neon-pink-bright/5",
    glow2: "bg-purple-500/5",
  },
  blue: {
    gradient: "from-neon-blue via-cyan-400 to-neon-blue",
    bar: "bg-neon-blue",
    text: "text-neon-blue-bright",
    glow1: "bg-neon-blue-bright/5",
    glow2: "bg-cyan-400/5",
  },
  emerald: {
    gradient: "from-emerald-400 via-teal-400 to-emerald-400",
    bar: "bg-emerald-400",
    text: "text-emerald-400",
    glow1: "bg-emerald-400/5",
    glow2: "bg-teal-400/5",
  },
  purple: {
    gradient: "from-purple-500 via-indigo-500 to-purple-500",
    bar: "bg-purple-500",
    text: "text-purple-400",
    glow1: "bg-purple-500/5",
    glow2: "bg-indigo-500/5",
  },
} as const;

export default function ArticleLayout({
  title,
  metaTitle,
  description,
  eyebrow,
  bannerImg,
  accent = "pink",
  path,
  backPath = "/service/",
  backLabel = "DỊCH VỤ",
  children,
  hideContact,
}: ArticleLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const a = ACCENT[accent];

  const handleBack = () => {
    if (location.key !== "default") navigate(-1);
    else navigate(backPath);
  };

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard?.writeText(url);
      // Fallback: simple alert
      alert("Đã sao chép link bài viết!");
    }
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Seo title={metaTitle || title} description={description} path={path} image={bannerImg} />

      <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] pt-24 pb-16 font-sans">
        {/* Decorative Glow Orbs */}
        <div className={`absolute top-20 left-10 w-96 h-96 ${a.glow1} rounded-full blur-[120px] pointer-events-none`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 ${a.glow2} rounded-full blur-[120px] pointer-events-none`} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Navigation bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <button
              onClick={handleBack}
              className="group flex items-center space-x-2 text-slate-400 hover:text-[#00f0ff] transition-colors text-sm font-medium font-mono cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>QUAY LẠI {backLabel}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-neon-pink/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-neon-pink" />
              <span>Chia sẻ / Share</span>
            </button>
          </div>

          {/* Main article container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 sm:p-10 rounded-2xl bg-slate-950/80 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Accent gradient bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${a.gradient}`} />

            {/* Banner Image */}
            {bannerImg && (
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-8 -mx-2 sm:-mx-4">
                <img src={bannerImg} alt={title} className="w-full object-cover max-h-[340px]" loading="eager" />
              </div>
            )}

            {/* Eyebrow + Title */}
            <div className="mb-8">
              <span className={`font-mono text-[9px] uppercase tracking-widest ${a.text} font-bold`}>
                {eyebrow}
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1 leading-tight">
                {title}
              </h1>
            </div>

            {/* Article content */}
            <div className="space-y-8 font-sans text-sm text-slate-300 leading-relaxed">
              {children}
            </div>
          </motion.div>

          {/* Contact Footer */}
          {!hideContact && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 p-6 rounded-2xl bg-slate-950/60 border border-white/5"
            >
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2.5 mb-4">
                <span className={`w-1.5 h-6 rounded-full ${a.bar}`} />
                Liên hệ Happy Smart Light
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-400">
                <a href="tel:0784140494" className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3 hover:border-white/15 transition-colors no-underline text-slate-400 hover:text-white">
                  <Phone className="w-4 h-4 text-neon-blue shrink-0" />
                  <span>0784 140 494</span>
                </a>
                <a href="https://zalo.me/0784140494" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3 hover:border-white/15 transition-colors no-underline text-slate-400 hover:text-white">
                  <MessageCircle className="w-4 h-4 text-neon-pink shrink-0" />
                  <span>Zalo: 0784 140 494</span>
                </a>
                <a href="mailto:happysmartlight@outlook.com" className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3 hover:border-white/15 transition-colors no-underline text-slate-400 hover:text-white">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Email HSL</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* Back link bottom */}
          <Link
            to={backPath}
            className="group inline-flex items-center space-x-2 text-slate-400 hover:text-neon-pink-bright transition-colors text-sm font-medium font-mono mt-8"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>XEM TẤT CẢ {backLabel}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ──── Reusable sub-components for article sections ──── */

/** Section heading with accent bar */
export function SectionHeading({ children, accent = "pink" }: { children: React.ReactNode; accent?: AccentColor }) {
  const bar = ACCENT[accent].bar;
  return (
    <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
      <span className={`w-1.5 h-6 rounded-full ${bar}`} />
      {children}
    </h2>
  );
}

/** Glassmorphism info card */
export function InfoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 rounded-xl bg-slate-900/40 border border-white/5 ${className}`}>
      {children}
    </div>
  );
}

/** Highlighted callout box */
export function Callout({ icon, children, variant = "info" }: { icon: React.ReactNode; children: React.ReactNode; variant?: "info" | "warning" }) {
  const styles = variant === "warning"
    ? "bg-amber-500/5 border-amber-500/15"
    : "bg-slate-900/60 border-emerald-500/10";
  return (
    <div className={`p-4 rounded-xl ${styles} flex items-start gap-3`}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div className="text-xs text-slate-400">{children}</div>
    </div>
  );
}

/** Styled blockquote */
export function ArtQuote({ children, accent = "pink" }: { children: React.ReactNode; accent?: AccentColor }) {
  const a = ACCENT[accent];
  return (
    <blockquote className={`border-l-2 border-${accent === "pink" ? "neon-pink" : accent === "blue" ? "neon-blue" : accent === "emerald" ? "emerald-400" : "purple-500"}/30 pl-4 py-3 bg-slate-900/40 rounded-r-xl italic text-slate-400 text-sm`}>
      {children}
    </blockquote>
  );
}

/** Feature grid card with icon */
export function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/15 transition-colors">
      <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2 mb-1.5">
        {icon}
        {title}
      </h3>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
}
