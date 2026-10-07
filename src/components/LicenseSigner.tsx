import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft, KeyRound, Save, Smartphone, Lock, Wrench,
  ClipboardPaste, FileSignature, FileText, Copy, Share2,
} from "lucide-react";
import script from "../assets/license-signer.js?raw";

interface LicenseSignerProps {
  onBack: () => void;
}

/**
 * HSL License Signer — công cụ NỘI BỘ ký file .lic (Ed25519, chạy hoàn toàn
 * client-side; seed/private key chỉ nằm trong localStorage máy người dùng).
 *
 * Markup dựng lại bằng JSX theo style chung của site (tham khảo trang chính sách /
 * sản phẩm), nhưng GIỮ NGUYÊN mọi id (q0..qc, qp, qd) để script obfuscated gốc
 * (import `?raw`, không sửa) bind đúng qua document.getElementById. Các ô trạng thái
 * dùng class .status/.ok/.err/.warn vì script tự gán lại className — style cho chúng
 * nằm scoped dưới .signer-wrap trong index.css.
 */
export default function LicenseSigner({ onBack }: LicenseSignerProps) {
  const scriptHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = scriptHostRef.current;
    if (!host) return;
    const s = document.createElement("script");
    s.textContent = script;
    host.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  const inputCls =
    "w-full px-3.5 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-sm text-slate-100 font-mono placeholder:text-slate-600 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-colors";
  const labelCls = "block text-xs font-medium text-slate-400 mb-1.5";
  const altBtnCls =
    "w-full mt-3 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-900 border border-white/10 hover:border-neon-blue/40 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2";

  return (
    <div className="signer-wrap relative min-h-screen bg-[#020204] text-[#f8fafc] pt-24 pb-16 font-sans">
      {/* Decorative glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-blue-bright/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-pink-bright/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back nav */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-slate-400 hover:text-[#00f0ff] transition-colors text-sm font-medium font-mono cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>QUAY LẠI TRANG CHỦ / BACK TO HOME</span>
          </button>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-white/5 shadow-2xl relative overflow-hidden text-center mb-6"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-neon-blue via-purple-500 to-neon-pink" />
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-glow-blue/20 mb-4">
            <KeyRound className="w-7 h-7 text-neon-blue-bright" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-neon-blue font-bold">
            HSL — INTERNAL TOOL
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            HSL License Signer
          </h1>
          <p className="text-sm text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">
            Ký file <strong className="text-slate-200">.lic</strong> ngay trên điện thoại (offline).
            Seed chỉ lưu trong trình duyệt máy này.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              { icon: <Smartphone className="w-3 h-3" />, label: "Mobile / Offline" },
              { icon: <Lock className="w-3 h-3" />, label: "Ed25519" },
              { icon: <Wrench className="w-3 h-3" />, label: "Nội bộ HSL" },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-blue/5 border border-neon-blue/20 text-[11px] font-mono text-neon-blue-bright"
              >
                {b.icon}
                {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 1 — Seed */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-white/5 border-l-2 border-l-neon-blue/40 mb-5">
          <h2 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2.5 mb-4">
            <KeyRound className="w-4 h-4 text-neon-blue-bright shrink-0" />
            1. Seed private key (nhập 1 lần)
          </h2>
          <label className={labelCls} htmlFor="q0">
            Seed private key (base64, 32 byte)
          </label>
          <input id="q0" type="password" placeholder="dán seed base64 ở đây" autoComplete="off" className={inputCls} />
          <button id="q1" className={altBtnCls}>
            <Save className="w-3.5 h-3.5" />
            Lưu seed vào máy này
          </button>
          <div id="q2" className="status" />
          <details className="mt-3 group">
            <summary className="text-xs font-mono text-slate-500 hover:text-slate-300 cursor-pointer transition-colors select-none">
              Lấy seed từ máy dev thế nào?
            </summary>
            <p className="mt-2 text-[11px] font-mono text-slate-500 leading-relaxed">
              Chạy 1 lần trên PC (thư mục chứa license_private_key.pem), rồi dán kết quả vào ô seed:
              <br />
              <code className="text-neon-blue-bright">python tools/print_seed.py</code>
            </p>
          </details>
          <div id="q3" className="status mono-small" />
        </div>

        {/* Card 2 — License info */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-white/5 border-l-2 border-l-neon-pink/40 mb-5">
          <h2 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2.5 mb-4">
            <FileSignature className="w-4 h-4 text-neon-pink-bright shrink-0" />
            2. Thông tin license
          </h2>

          <label className={labelCls} htmlFor="qp">
            Dán nguyên tin nhắn khách (tự lọc mã máy)
          </label>
          <textarea
            id="qp"
            rows={4}
            placeholder="dán cả tin nhắn khách vào đây — mã máy sẽ tự điền bên dưới"
            autoCapitalize="none"
            spellCheck={false}
            className={`${inputCls} resize-y`}
          />
          <div id="qd" className="status" />

          <label className={`${labelCls} mt-4`} htmlFor="q4">
            machine_id của khách (sha256 hex)
          </label>
          <input
            id="q4"
            placeholder="vd 3f9a... (64 ký tự hex)"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className={inputCls}
          />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className={labelCls} htmlFor="q5">license_id</label>
              <input id="q5" placeholder="HSL-2026-000001" autoCapitalize="characters" spellCheck={false} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="q6">edition</label>
              <input id="q6" defaultValue="pro" spellCheck={false} className={inputCls} />
            </div>
          </div>

          <label className={`${labelCls} mt-4`} htmlFor="q7">
            expiry (epoch giây) — 0 = mua đứt
          </label>
          <input id="q7" defaultValue="0" inputMode="numeric" className={inputCls} />

          <button
            id="q8"
            className="w-full mt-5 py-3.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-glow-dual hover:scale-[1.01] active:scale-100 transition-transform cursor-pointer flex items-center justify-center gap-2"
          >
            <FileSignature className="w-4 h-4" />
            Ký license
          </button>
          <div id="q9" className="status" />
        </div>

        {/* Card 3 — Result */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-white/5 border-l-2 border-l-emerald-400/40 mb-5">
          <h2 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2.5 mb-4">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            3. Nội dung file .lic
          </h2>
          <textarea
            id="qa"
            rows={6}
            readOnly
            placeholder="kết quả sẽ hiện ở đây"
            className={`${inputCls} resize-y text-[12px] leading-relaxed`}
          />
          <button id="qb" className={altBtnCls}>
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
          <button id="qc" className={altBtnCls}>
            <Share2 className="w-3.5 h-3.5" />
            Chia sẻ / Lưu file .lic
          </button>
        </div>

        <p className="text-center text-[11px] font-mono text-slate-600 mt-8">
          © 2026 Happy Smart Light &nbsp;·&nbsp;
          <button onClick={onBack} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer underline underline-offset-2">
            Về chúng tôi
          </button>
          &nbsp;·&nbsp; Công cụ nội bộ — chỉ dùng để cấp license ARGB HSL
        </p>

        {/* Host vô hình để chạy script gốc (thao tác DOM qua getElementById) */}
        <div ref={scriptHostRef} hidden />
      </div>
    </div>
  );
}
