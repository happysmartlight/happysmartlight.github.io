import { Cpu } from "lucide-react";

/**
 * Dải logo đối tác chạy loop ngang vô tận (placeholder DEMO).
 *
 * 👉 CÁCH CẬP NHẬT LOGO THẬT:
 * Thêm `logo: "/img/partners/ten-file.png"` vào từng phần tử trong mảng `PARTNERS`.
 * Khi có `logo`, component sẽ hiển thị ảnh thật thay cho placeholder.
 * Để ảnh trong: public/img/partners/  (đường dẫn bắt đầu bằng "/img/partners/...").
 *
 * 👉 LINK ĐỐI TÁC:
 * Thêm `link: "/doi-tac/partner-TenDoiTac/"` để click vào logo sẽ mở trang đối tác.
 */
type Partner = { name: string; logo?: string; link?: string; contain?: boolean };

const PARTNERS: Partner[] = [
  // Dùng tạm ảnh đối tác có sẵn trong /img/partner/ (trang đối tác)
  { name: "xLights", logo: "/img/partner/partner-xlights-banner.jpg", link: "/doi-tac/partner-xLights/" },
  { name: "LedFx", logo: "/img/partner/partner-LedFX.png", link: "/doi-tac/partner-LedFx/" },
  { name: "Espressif", logo: "/img/partner/partner-espressif.webp", link: "/doi-tac/partner-ESP32/" },
  { name: "Moonlight Dance", logo: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/partner-MOONLIGHT-DANCE-STUDIO.jpg", link: "/doi-tac/partner-Moonlight-dance/" },
  { name: "NCTA — Người Chế Tạo", logo: "/img/partner/partner-ncta.jpg", link: "/doi-tac/partner-NCTA/" },
  { name: "Art-Net", logo: "/img/partners/Artnet_logo.png", contain: true },
];

function renderLogo(partner: Partner, key: string) {
  // SVG wordmark hoặc logo cần giữ trọn (contain) → object-contain; ảnh banner thật → object-cover lấp đầy ô.
  const isVector = partner.logo?.toLowerCase().endsWith(".svg");
  const useContain = isVector || partner.contain;

  const content = (
    <div
      key={key}
      className={`group/logo relative flex items-center justify-center h-16 sm:h-[72px] w-40 sm:w-44 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors shrink-0 overflow-hidden${partner.link ? " cursor-pointer" : ""}`}
      title={partner.name}
    >
      {partner.logo ? (
        useContain ? (
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            className="max-h-9 sm:max-h-10 max-w-[80%] w-auto object-contain opacity-80 group-hover/logo:opacity-100 transition-all duration-300"
          />
        ) : (
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/logo:opacity-100 transition-all duration-300"
          />
        )
      ) : (
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center shrink-0">
            <Cpu className="w-3.5 h-3.5 text-slate-500 group-hover/logo:text-neon-blue-bright transition-colors" />
          </span>
          <span className="font-display font-bold text-sm sm:text-base text-slate-500 group-hover/logo:text-white tracking-tight whitespace-nowrap transition-colors">
            {partner.name}
          </span>
        </div>
      )}
    </div>
  );

  if (partner.link) {
    return (
      <a key={key} href={partner.link} className="no-underline" aria-label={`Xem trang đối tác ${partner.name}`}>
        {content}
      </a>
    );
  }

  return content;
}

export default function PartnerMarquee() {
  return (
    <section className="relative py-14 border-t border-white/5 overflow-hidden" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
          Đối Tác &amp;{" "}
          <span className="bg-gradient-to-r from-neon-pink-bright to-neon-blue-bright bg-clip-text text-transparent">
            Hệ Sinh Thái Tương Thích
          </span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-400 mt-3">
          Tương thích &amp; đồng hành cùng các nền tảng, thương hiệu uy tín
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
