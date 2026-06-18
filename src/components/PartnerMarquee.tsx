import { Cpu } from "lucide-react";

/**
 * Dải logo đối tác chạy loop ngang vô tận (placeholder DEMO).
 *
 * 👉 CÁCH CẬP NHẬT LOGO THẬT:
 * Thêm `logo: "/img/partners/ten-file.png"` vào từng phần tử trong mảng `PARTNERS`.
 * Khi có `logo`, component sẽ hiển thị ảnh thật thay cho placeholder.
 * Để ảnh trong: public/img/partners/  (đường dẫn bắt đầu bằng "/img/partners/...").
 */
type Partner = { name: string; logo?: string };

const PARTNERS: Partner[] = [
  { name: "xLights", logo: "/img/partners/xlights.svg" },
  { name: "LedFx", logo: "/img/partners/ledfx.svg" },
  { name: "Art-Net", logo: "/img/partners/art-net.svg" },
  { name: "WLED", logo: "/img/partners/wled.svg" },
  { name: "Espressif", logo: "/img/partners/espressif.svg" },
  { name: "Vinhomes", logo: "/img/partners/vinhomes.svg" },
  { name: "Moonlight Dance", logo: "/img/partners/moonlight-dance.svg" },
  { name: "Pixel Pro", logo: "/img/partners/pixel-pro.svg" },
];

function renderLogo(partner: Partner, key: string) {
  return (
    <div
      key={key}
      className="group/logo flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/15 transition-colors shrink-0"
      title={partner.name}
    >
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          decoding="async"
          className="h-7 sm:h-8 w-auto object-contain opacity-60 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0 transition-all duration-300"
        />
      ) : (
        <>
          <span className="w-7 h-7 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center shrink-0">
            <Cpu className="w-3.5 h-3.5 text-slate-500 group-hover/logo:text-neon-blue-bright transition-colors" />
          </span>
          <span className="font-display font-bold text-sm sm:text-base text-slate-500 group-hover/logo:text-white tracking-tight whitespace-nowrap transition-colors">
            {partner.name}
          </span>
        </>
      )}
    </div>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="relative py-14 border-t border-white/5 overflow-hidden" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-bold">
          Đối Tác &amp; Hệ Sinh Thái Tương Thích
        </span>
        <p className="font-sans text-xs text-slate-600 mt-2">
          Tương thích &amp; đồng hành cùng các nền tảng, thương hiệu uy tín
          <span className="text-slate-700"> (logo demo — sẽ cập nhật chính xác)</span>
        </p>
      </div>

      {/* Marquee track + fade hai mép */}
      <div className="relative">
        {/* Fade trái/phải để logo trôi vào/ra mượt mà */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#020204] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#020204] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max anim-marquee">
          {/* Bản sao 1 */}
          <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-3">
            {PARTNERS.map((p, i) => renderLogo(p, `a-${i}`))}
          </div>
          {/* Bản sao 2 (nối liền mạch cho loop) */}
          <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-3" aria-hidden="true">
            {PARTNERS.map((p, i) => renderLogo(p, `b-${i}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
