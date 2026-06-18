import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft, Printer, ShoppingCart, FileSignature, HandCoins, ShieldCheck,
  Truck, ClipboardCheck, Receipt, Landmark, Headphones, Wrench, AlertTriangle,
  CheckCircle, Copy, Check, Phone, Mail, MapPin, Plane,
} from "lucide-react";

interface SalesPolicyProps {
  onBack: () => void;
}

const BANK_ACCOUNTS = [
  { bank: "Techcombank", number: "72949488", holder: "CÔNG TY HAPPY SMART LIGHT", color: "text-neon-pink-bright" },
  { bank: "MB Bank", number: "7294949999", holder: "CÔNG TY HAPPY SMART LIGHT", color: "text-neon-blue-bright" },
];

export default function SalesPolicy({ onBack }: SalesPolicyProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handlePrint = () => window.print();

  const handleCopy = (value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(value);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] pt-24 pb-16 font-sans">
      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-pink-bright/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue-bright/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb / Navigation bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-slate-400 hover:text-[#00f0ff] transition-colors text-sm font-medium font-mono cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>QUAY LẠI TRANG CHỦ / BACK TO HOME</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-neon-pink/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-neon-pink" />
            <span>In tài liệu / Print</span>
          </button>
        </div>

        {/* Header Document details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-10 rounded-2xl bg-slate-950/80 border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Cyber Lines Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-neon-pink via-purple-500 to-neon-blue" />

          {/* Heading */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-glow-pink/20">
              <ShoppingCart className="w-6 h-6 text-neon-pink" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neon-blue-bright font-bold">
                HAPPY SMART LIGHT — SALES & PAYMENT POLICY
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1">
                CHÍNH SÁCH BÁN HÀNG, THANH TOÁN & MUA BÁN
              </h1>
              <p className="font-mono text-xs text-slate-400 mt-2 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cập nhật lần cuối: 18 tháng 06, 2026</span>
              </p>
            </div>
          </div>

          <div className="space-y-8 font-sans text-sm text-slate-300 leading-relaxed">
            {/* Intro */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">
                <strong>Cam kết minh bạch:</strong> Chính sách này quy định rõ ràng quy trình ký kết, đặt cọc, giao nhận, thanh toán và hỗ trợ kỹ thuật giữa <strong>Công ty Happy Smart Light (HSL)</strong> và Quý khách hàng. Mục tiêu là đảm bảo quyền lợi, sự an toàn và niềm tin cho cả hai bên trong mọi giao dịch.
              </p>
            </div>

            {/* Section 1 — Hợp đồng & Đặt cọc */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-pink" />
                1. Hợp đồng mua bán & Đặt cọc
              </h2>
              <p>
                Đối với các đơn hàng/hóa đơn có giá trị, HSL sẽ tiến hành <strong>lập hợp đồng mua bán</strong> rõ ràng giữa hai bên trước khi sản xuất và bàn giao.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2 mb-1">
                    <FileSignature className="w-4 h-4 text-neon-pink shrink-0" />
                    Lập hợp đồng
                  </h3>
                  <p className="text-xs text-slate-400">
                    Các hóa đơn giá trị được lập hợp đồng mua bán, ghi rõ thông số sản phẩm, số lượng, giá trị, thời gian giao hàng dự kiến và điều khoản thanh toán.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-amber-500/10">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2 mb-1">
                    <HandCoins className="w-4 h-4 text-amber-400 shrink-0" />
                    Đặt cọc 60% - 80%
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bên mua tiến hành đặt cọc trước <strong className="text-amber-300">60% - 80% giá trị tiền hàng</strong> để HSL chuẩn bị linh kiện và bắt đầu sản xuất theo hợp đồng.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 — Quyền & nghĩa vụ */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                2. Quyền & nghĩa vụ của hai bên
              </h2>
              <div className="space-y-4 pl-2 mt-2">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-neon-blue shrink-0" />
                    Nghĩa vụ của Bên bán (Happy Smart Light)
                  </h3>
                  <ul className="text-xs text-slate-400 mt-2 space-y-1.5">
                    <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Bảo mật tuyệt đối thông tin của khách hàng.</span></li>
                    <li className="flex items-start gap-2"><Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Cung cấp hàng hóa đúng thông số và đúng thời gian dự kiến đã cam kết trong hợp đồng.</span></li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-purple-400 shrink-0" />
                    Nghĩa vụ của Bên mua
                  </h3>
                  <ul className="text-xs text-slate-400 mt-2 space-y-1.5">
                    <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Tiến hành thanh toán hết phần tiền hàng còn lại <strong>ngay khi nhận được hàng</strong> và hoàn tất kiểm tra hàng hóa.</span></li>
                    <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Việc giao nhận và nghiệm thu được xác nhận thông qua <strong>Phiếu bàn giao nhận hàng</strong>.</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 — Hóa đơn VAT & nguồn gốc */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                3. Hóa đơn VAT & Chứng từ nguồn gốc
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3">
                <Receipt className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  Tất cả các sản phẩm của <strong>HSL</strong> đều có <strong className="text-emerald-300">hóa đơn VAT</strong> và <strong>giấy tờ chứng minh nguồn gốc hải quan đầy đủ</strong>, đảm bảo minh bạch về thuế và pháp lý cho khách hàng doanh nghiệp lẫn cá nhân.
                </p>
              </div>
            </section>

            {/* Section 4 — Hỗ trợ kỹ thuật */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-pink" />
                4. Chính sách hỗ trợ kỹ thuật
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-emerald-500/10">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2 mb-1">
                    <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
                    Hỗ trợ từ xa — Miễn phí
                  </h3>
                  <p className="text-xs text-slate-400">
                    Các team/nhóm mua hàng từ HSL cần hỗ trợ kỹ thuật, training hướng dẫn sử dụng từ <strong>cơ bản đến trung bình</strong> sẽ được HSL <strong className="text-emerald-300">hỗ trợ hoàn toàn miễn phí</strong> thông qua cuộc gọi (call) và ultraview (điều khiển/hướng dẫn từ xa).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-amber-500/10">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                    Hỗ trợ trực tiếp tại chỗ — Có phí
                  </h3>
                  <p className="text-xs text-slate-400">
                    Đối với các team/nhóm khách hàng cần kỹ thuật viên hỗ trợ <strong>trực tiếp tại địa điểm</strong>, bên mua chịu hoàn toàn chi phí di chuyển, ăn uống, cư trú và <strong className="text-amber-300">phí kỹ thuật từ 1.500.000đ đến 2.000.000đ</strong>.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1.5">
                    <Plane className="w-3 h-3" /> Chi phí di chuyển · ăn uống · cư trú do bên mua chi trả.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 — Tài khoản thanh toán */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                5. Tài khoản thanh toán chính thức
              </h2>

              <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300">
                  <strong className="text-red-300">Cảnh báo lừa đảo:</strong> HSL chỉ có <strong>02 (hai) số tài khoản nhận thanh toán duy nhất</strong> dưới đây. Mọi tài khoản khác đều không phải của chúng tôi — vui lòng đối chiếu kỹ trước khi chuyển khoản.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {BANK_ACCOUNTS.map((acc) => (
                  <div key={acc.number} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <Landmark className={`w-4 h-4 ${acc.color} shrink-0`} />
                      <span className="font-display font-bold text-sm text-white">{acc.bank}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-lg font-bold tracking-wider ${acc.color}`}>{acc.number}</span>
                      <button
                        onClick={() => handleCopy(acc.number)}
                        className="flex items-center gap-1 py-1 px-2 rounded-md bg-slate-950 border border-white/10 text-[10px] font-mono text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer shrink-0"
                        aria-label={`Sao chép số tài khoản ${acc.bank}`}
                      >
                        {copied === acc.number ? (
                          <><Check className="w-3 h-3 text-emerald-400" /> Đã chép</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Sao chép</>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-2 uppercase">{acc.holder}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 — Liên hệ */}
            <section className="pt-6 border-t border-white/5 space-y-4">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-pink" />
                6. Thông tin liên hệ
              </h2>
              <p>
                Mọi thắc mắc liên quan đến chính sách bán hàng, hợp đồng, thanh toán hoặc hỗ trợ kỹ thuật, vui lòng liên hệ trực tiếp với chúng tôi:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono text-xs text-slate-400">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start">
                  <MapPin className="w-4 h-4 text-neon-pink mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white mb-1">CÔNG TY TNHH TM & CN HAPPY SMART LIGHT</p>
                    <p>MST: 3502535621</p>
                    <p className="mt-1">Kỹ thuật: Tech Hub, Sảnh S6.03, Vinhomes Grand Park, P. Long Bình, TP. Hồ Chí Minh</p>
                    <p className="mt-1 text-[10px]">Trụ sở: Số 42 Hà Đức Trọng, P. Bà Rịa, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-center space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-neon-blue mr-3 shrink-0" />
                    <span>Hotline &amp; Zalo: (+84) 0784 140 494</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-purple-400 mr-3 shrink-0" />
                    <span>happysmartlight@outlook.com</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
