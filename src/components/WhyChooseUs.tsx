import { ShieldAlert, BookOpen, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function WhyChooseUs() {
  const points = [
    {
      num: "01",
      icon: <BookOpen className="w-5 h-5 text-neon-pink-bright" />,
      title: "100% Việt Hóa & Hỗ Trợ Trực Tiếp",
      desc: "Toàn bộ tài liệu hướng dẫn thi công, map sơ đồ nháy xLights được biên soạn chi tiết tiếng Việt. Đội ngũ kỹ sư Happy Smart Light trực tiếp hỗ trợ giải đáp online/offline 24/7, loại bỏ hoàn toàn rào cản kỹ thuật.",
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-neon-blue-bright" />,
      title: "Giá Xuất Xưởng Hỗ Trợ Cộng Đồng",
      desc: "Sản phẩm được nghiên cứu, tối ưu bo mạch PCB và đóng gói trực tiếp tại Việt Nam. Không qua bất kỳ khâu trung gian phân phối thương mại nào, đem lại mức giá thành tốt nhất, dễ thở nhất cho mọi Maker.",
    },
    {
      num: "03",
      icon: <RefreshCw className="w-5 h-5 text-amber-400" />,
      title: "Công Nghệ Luồng DDP Thực Sự",
      desc: "Phần cứng được cấu hình tối đa hóa tốc độ luồng tin packet DDP (Distributed Display Protocol) không dây. Hình ảnh ma trận hay LED sân khấu truyền tải 60 khung hình/giây cực kỳ mượt mà, không giật lag như luồng dmx cũ kỹ.",
    },
    {
      num: "04",
      icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
      title: "Bảo Vệ Phần Cứng Chuẩn Chỉ",
      desc: "Bo mạch tích hợp tụ lọc nguồn chống nhiễu gai điện ápt, cầu chì bảo vệ quá dòng có thể tháo rời, di-ốt chống cắm ngược cực. Bảo vệ an toàn tuyệt đối cho mắt dải LED đắt tiền của bạn.",
    },
  ];

  return (
    <section className="relative py-24 bg-[#080710]/40 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-neon-pink-bright/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/2 right-1/4 w-80 h-80 bg-neon-blue-bright/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" id="why-header">
          <span className="font-mono text-xs text-neon-blue-bright uppercase tracking-widest font-bold">
            SỰ KHÁC BIỆT THƯƠNG HIỆU
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Tại Sao Chọn{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright via-purple-300 to-neon-blue-bright bg-clip-text text-transparent text-glow-pink">
              Happy Smart Light?
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Chúng tôi không chỉ bán thiết bị phần cứng, chúng tôi đem lại giải pháp ánh sáng nghệ thuật hoàn chỉnh đồng hành cùng các dự án đầy tự hào của người Việt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8" id="why-grid">
          {points.map((point, idx) => (
            <motion.div
              key={point.num}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="p-6 sm:p-8 rounded-3xl bg-glass border border-white/5 hover:border-white/10 hover:bg-slate-950/40 transition-all duration-300 flex flex-col sm:flex-row items-start gap-5 group"
              id={`why-card-${point.num}`}
            >
              {/* Number and Icon container */}
              <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto gap-4" id={`why-indicators-${point.num}`}>
                <span className="font-mono text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-[#00f0ff] group-hover:to-neon-pink group-hover:text-glow-pink transition-all duration-500">
                  {point.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center p-2.5 shadow-sm group-hover:scale-105 transition-all">
                  {point.icon}
                </div>
              </div>

              {/* Text content details */}
              <div className="space-y-2 flex-1" id={`why-content-${point.num}`}>
                <h3 className="font-display font-medium text-lg text-white group-hover:text-white transition-colors duration-200">
                  {point.title}
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
