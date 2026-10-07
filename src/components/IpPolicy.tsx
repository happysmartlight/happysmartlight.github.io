import { motion } from "motion/react";
import {
  ArrowLeft, Printer, Copyright, Cpu, Code2, Network, BadgeCheck,
  Ban, ShieldAlert, Scale, FileLock2, CheckCircle, Phone, Mail, MapPin,
} from "lucide-react";

interface IpPolicyProps {
  onBack: () => void;
}

export default function IpPolicy({ onBack }: IpPolicyProps) {
  const handlePrint = () => window.print();

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] pt-24 pb-16 font-sans">
      {/* Decorative Glow Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
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
            className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-purple-500/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
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
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-neon-blue via-purple-500 to-neon-pink" />

          {/* Heading */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-glow-dual/20">
              <Copyright className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-purple-300 font-bold">
                HAPPY SMART LIGHT — INTELLECTUAL PROPERTY POLICY
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1">
                CHÍNH SÁCH BẢN QUYỀN & SỞ HỮU TRÍ TUỆ
              </h1>
              <p className="font-mono text-xs text-slate-400 mt-2 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cập nhật lần cuối: 18 tháng 06, 2026</span>
              </p>
            </div>
          </div>

          <div className="space-y-8 font-sans text-sm text-slate-300 leading-relaxed">
            {/* Intro */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/10 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">
                <strong>Tuyên bố quyền:</strong> Toàn bộ thiết kế phần cứng, mã nguồn firmware, phần mềm và giao thức truyền thông của <strong>Happy Smart Light (HSL)</strong> là tài sản trí tuệ độc quyền do HSL tự nghiên cứu và phát triển. Chính sách này nhằm bảo vệ quyền sở hữu trí tuệ và đề nghị Quý khách hàng, đối tác tôn trọng các quyền hợp pháp đó.
              </p>
            </div>

            {/* Section 1 — Phạm vi sở hữu */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                1. Phạm vi quyền sở hữu trí tuệ
              </h2>
              <p>
                Quyền sở hữu trí tuệ của HSL bao gồm nhưng không giới hạn ở các thành phần phần cứng và phần mềm sau:
              </p>
              <div className="space-y-4 pl-2 mt-2">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-neon-pink shrink-0" />
                    Phần cứng (Hardware)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Sơ đồ nguyên lý (schematic), thiết kế bố trí mạch in (PCB layout), kết cấu cơ khí, kiểu dáng công nghiệp và mọi giải pháp kỹ thuật trên các bo mạch điều khiển ARGB HSL (V4/2X PRO, 4X, Matrix Driver Pro, POI…).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-neon-blue shrink-0" />
                    Phần mềm & Firmware (Software)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Mã nguồn firmware nạp trên vi điều khiển, ứng dụng di động ARGB HSL, công cụ ARGB HSL Control Tool trên Windows, cùng toàn bộ giao diện, thuật toán và tài nguyên đi kèm.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <Network className="w-4 h-4 text-purple-400 shrink-0" />
                    Giao thức ARGB HSL độc quyền
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Giao thức truyền thông đồng bộ ARGB HSL Sync do HSL tự phát triển, cùng cấu trúc gói tin và cơ chế đồng bộ là tài sản trí tuệ được bảo hộ.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                  <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    Thương hiệu & Nhận diện
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tên thương hiệu "Happy Smart Light", "HSL", "ARGB HSL", logo, biểu tượng và bộ nhận diện thương hiệu thuộc quyền sở hữu của công ty.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 — Quyền của người dùng */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                2. Quyền sử dụng của khách hàng
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3">
                <FileLock2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  Khi mua sản phẩm chính hãng, khách hàng được cấp quyền <strong className="text-emerald-300">sử dụng</strong> đầy đủ thiết bị và phần mềm đi kèm cho mục đích cá nhân, biểu diễn hoặc thương mại của riêng mình. Quyền sử dụng này <strong>không bao gồm</strong> quyền sao chép, phân phối lại hay khai thác các tài sản trí tuệ nêu trên.
                </p>
              </div>
            </section>

            {/* Section 3 — Hành vi bị nghiêm cấm */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-pink" />
                3. Các hành vi bị nghiêm cấm
              </h2>
              <p>Để bảo vệ quyền sở hữu trí tuệ, HSL nghiêm cấm các hành vi sau khi chưa có sự đồng ý bằng văn bản:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Sao chép, nhái lại thiết kế PCB, schematic, kiểu dáng phần cứng để sản xuất hàng giả, hàng nhái.",
                  "Dịch ngược (reverse engineering), trích xuất, decompile firmware hoặc phần mềm của HSL.",
                  "Sao chép, phân phối, bán lại firmware, phần mềm hoặc giao thức ARGB HSL cho bên thứ ba.",
                  "Sử dụng trái phép thương hiệu, logo, tên gọi HSL gây nhầm lẫn về nguồn gốc sản phẩm.",
                  "Chỉnh sửa, can thiệp nhằm gỡ bỏ cơ chế bảo vệ bản quyền trên thiết bị và phần mềm.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-red-500/10">
                    <Ban className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4 — Xử lý vi phạm */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                4. Xử lý vi phạm
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/10 flex items-start gap-3">
                <Scale className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  Mọi hành vi xâm phạm quyền sở hữu trí tuệ của HSL sẽ được xử lý theo quy định của <strong>Luật Sở hữu trí tuệ</strong> và pháp luật hiện hành của Việt Nam. HSL có quyền yêu cầu chấm dứt hành vi vi phạm, bồi thường thiệt hại và áp dụng các biện pháp pháp lý cần thiết để bảo vệ quyền lợi hợp pháp của mình.
                </p>
              </div>
            </section>

            {/* Section 5 — Liên hệ */}
            <section className="pt-6 border-t border-white/5 space-y-4">
              <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                5. Liên hệ & Báo cáo vi phạm
              </h2>
              <p>
                Nếu bạn phát hiện hành vi xâm phạm bản quyền, hàng giả hàng nhái hoặc cần xin phép sử dụng tài sản trí tuệ của HSL, vui lòng liên hệ:
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
