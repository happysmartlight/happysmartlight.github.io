import { ArrowLeft, Globe, Shield, RefreshCw, CheckCircle, Mail, Phone, MapPin, Printer } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface AppPrivacyPolicyProps {
  onBack: () => void;
}

type Language = "vi" | "en";

export default function AppPrivacyPolicy({ onBack }: AppPrivacyPolicyProps) {
  const [lang, setLang] = useState<Language>("vi");

  const handlePrint = () => {
    window.print();
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

          {/* Controls: Language and Print */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-[#00f0ff]/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-neon-blue" />
              <span>{lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:border-neon-pink/20 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-neon-pink" />
              <span>{lang === "vi" ? "In tài liệu / Print" : "Print Policy"}</span>
            </button>
          </div>
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
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-glow-blue/20">
              <Shield className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neon-pink-bright font-bold">
                GOOGLE PLAY STORE COMPLIANCE
              </span>
              <h1 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight mt-1">
                {lang === "vi" ? "CHÍNH SÁCH BẢO MẬT ỨNG DỤNG ARGB HSL" : "ARGB HSL APP PRIVACY POLICY"}
              </h1>
              <p className="font-mono text-xs text-slate-400 mt-2 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
                <span>{lang === "vi" ? "Cập nhật lần cuối: 16 tháng 06, 2026" : "Last Updated: June 16, 2026"}</span>
              </p>
            </div>
          </div>

          {/* Content Render - VIETNAMESE */}
          {lang === "vi" ? (
            <div className="space-y-8 font-sans text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  <strong>Cam kết về quyền riêng tư:</strong> Ứng dụng <strong>ARGB HSL</strong> được thiết kế theo tiêu chí "Ngoại tuyến trước tiên" (Offline-First). Chúng tôi không lưu trữ, thu thập hay chia sẻ bất kỳ dữ liệu cá nhân nào từ thiết bị của bạn lên mây hay bất kỳ máy chủ bên thứ ba nào. Mọi tiến trình điều khiển LED, âm thanh, hay hình ảnh đều được xử lý cục bộ ngay trên vi xử lý của thiết bị di động của bạn.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  1. Thu thập và Sử dụng Thông tin cá nhân
                </h2>
                <p>
                  Ứng dụng <strong>ARGB HSL</strong> hoàn toàn không yêu cầu người dùng phải đăng ký tài khoản, đăng nhập, hoặc cung cấp bất kỳ thông tin nhận danh cá nhân nào (như tên, email, số điện thoại, số định danh thiết bị IMEI/Advertising ID). Bạn có thể tự do mở ứng dụng và bắt đầu đồng bộ hóa ánh sáng ngay lập tức mà không để lại bất kỳ dấu vết dữ liệu cá nhân nào.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  2. Các quyền truy cập của thiết bị (Device Permissions) & Mục đích sử dụng
                </h2>
                <p>
                  Để hỗ trợ đầy đủ các tính năng thông minh của hệ sinh thái LED, ứng dụng cần một số quyền truy cập hệ thống tối thiểu và chỉ sử dụng cho các tính năng trực tiếp:
                </p>
                <div className="space-y-4 pl-2 mt-2">
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Quyền truy cập mạng cục bộ & WiFi (Local Network)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Sử dụng để quét, tìm kiếm và thiết lập kết nối tới các Bộ điều khiển HSL (dựa trên chip ESP8266/ESP32) thông qua mạng WiFi của nhà bạn. Quyền này bắt buộc để truyền dữ liệu gói tin UDP / Art-Net / E1.31 thời gian thực tới dải đèn LED.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Quyền sử dụng Microphone (Ghi âm)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Chỉ sử dụng khi bạn kích hoạt chế độ <strong>"Nhạc nước / Đồng bộ âm thanh trực tiếp" (Audio Reactive Mode)</strong>. Ứng dụng chuyển đổi tín hiệu âm thanh thu được từ mic thành dải sóng tần số (Fast Fourier Transform - FFT) để đổi màu đèn LED theo nhịp điệu. <strong>Tuyệt đối không lưu trữ, không ghi tệp âm thanh, và không gửi âm thanh ra khỏi thiết bị di động.</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-pink" />
                      Quyền sử dụng Camera (Quay phim, chụp ảnh)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Chỉ sử dụng khi người dùng có nhu cầu quét QR Code định cấu hình nhanh cho mạch đèn, hoặc bật tính năng đồng bộ ánh sáng xung quanh (Camera-based Ambient Sync). Luồng camera chỉ được phân tích xử lý màu sắc điểm ảnh cục bộ thời gian thực trong bộ nhớ tạm (RAM) của điện thoại và giải phóng ngay lập tức.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Quyền truy cập bộ nhớ lưu trữ (Storage/Media)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Dùng để lưu trữ các bảng màu tùy chỉnh do người dùng tự tạo, thiết lập bố cục không gian, hoặc các chế độ hiệu ứng yêu thích của bạn trực tiếp trên bộ nhớ trong của điện thoại.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  3. Không chia sẻ thông tin với Bên thứ ba
                </h2>
                <p>
                  Vì chúng tôi không thu thập bất kỳ dữ liệu cá nhân hay phi cá nhân nào, việc bán, thuê, thương mại hóa hay chia sẻ hoặc rò rỉ dữ liệu của bạn cho bất kỳ bên thứ ba hay bên mạng lưới quảng cáo nào là <strong>hoàn toàn không thể xảy ra</strong>. Chúng tôi cũng không nhúng các SDK quảng cáo theo dõi hành vi của người dùng từ các đối tác bất minh.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  4. An toàn dữ liệu trẻ em
                </h2>
                <p>
                  Ứng dụng <strong>ARGB HSL</strong> tuân thủ hoàn toàn luật bảo vệ quyền riêng tư trực tuyến của trẻ em (COPPA) và các tiêu chuẩn bảo mật dữ liệu trẻ em của Google Play Store. Do ứng dụng không yêu cầu đăng ký tài khoản và không thu thập bất kỳ dữ liệu nào, ứng dụng cực kỳ an toàn cho trẻ em sử dụng để lắp ráp và sáng tạo hiệu ứng ánh sáng học tập tại nhà.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  5. Các thay đổi về Chính sách bảo mật
                </h2>
                <p>
                  Chúng tôi có thể cập nhật Chính sách Bảo mật này định kỳ để phản ánh các thay đổi kỹ thuật trên nền tảng ứng dụng di động ARGB HSL mới. Khi có bất kỳ thay đổi nào, chúng tôi sẽ điều chỉnh lại mốc thời gian "Cập nhật lần cuối" ở đầu trang. Chúng tôi khuyến nghị bạn thỉnh thoảng kiểm tra chính sách này để đảm bảo nắm chắc các quyền riêng tư tối thiểu của mình.
                </p>
              </section>

              {/* Section 6 - Supports & Contact info */}
              <section className="pt-6 border-t border-white/5 space-y-4">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-pink" />
                  6. Thông tin liên hệ hỗ trợ pháp lý
                </h2>
                <p>
                  Nếu bạn có bất cứ câu hỏi hoặc góp ý nào liên quan đến quyền riêng tư hoặc các thủ tục xử lý gói dữ liệu cục bộ trong ứng dụng ARGB HSL, vui lòng liên hệ với ban R&D chúng tôi theo địa chỉ chính thức:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono text-xs text-slate-400">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start">
                    <MapPin className="w-4 h-4 text-neon-pink mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white mb-1">Happy Smart Light Co., Ltd</p>
                      <p>Kỹ thuật: Tech Hub, Sảnh S6.03, Vinhomes Grand Park, P. Long Bình, TP. Hồ Chí Minh</p>
                      <p className="mt-1 text-[10px]">Trụ sở: Số 42 Hà Đức Trọng, P. Bà Rịa, TP. Hồ Chí Minh</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-center space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-neon-blue mr-3 shrink-0" />
                      <span>Hotline & Zalo: (+84) 0784 140 494</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-purple-400 mr-3 shrink-0" />
                      <span>happysmartlight@outlook.com</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            /* ENGLISH PRIVACY POLICY FOR PLAY STORE COMPLIANCE */
            <div className="space-y-8 font-sans text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/10 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  <strong>Our Security Guarantee:</strong> The <strong>ARGB HSL</strong> application is designed as an "Offline-First" controller. We do NOT collect, store, transmit, or share any personal data from your device to any cloud environments or third-party servers. All processings (microphones, controllers setup, and camera) are processed entirely local within your hardware.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  1. Information Collection and Use
                </h2>
                <p>
                  The <strong>ARGB HSL</strong> application does not require users to create accounts, sign in, or input any personal identifiable information (such as your name, email address, phone number, or device identifiers like IMEI/IDFA). You can use our responsive light syncer freely and completely anonymously.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  2. Device Permissions and Usage
                </h2>
                <p>
                  To deliver seamless smart lighting experiences, our application requests minimal device permissions, serving strictly localized tasks:
                </p>
                <div className="space-y-4 pl-2 mt-2">
                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Local Network & WiFi Access
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Required to scan, discover, configure, and establish high-speed direct connections to HSL controllers (based on ESP8266/ESP32 microprocessors) within your local sub-network. This is necessary for real-time UDP / Art-Net packets broadcasting.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Microphone Access (Audio Record)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Only utilized when the user manually initiates the <strong>"Music Visualizer / Audio Reactive Mode"</strong>. The app translates localized audio frequencies (via FFT rendering) into dynamic color-changing LED movements. <strong>Absolutely NO audio data is recorded, saved on-disk, or transmitted over any networks.</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-pink" />
                      Camera Access (Photos / Video)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Used only for scanning fast-setup QR configuration codes or when activating the camera-based Ambient Sync options. Visual feeds are parsed purely in-memory (RAM) transiently and are cleared immediately.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                    <h3 className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Physical Storage Access
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Used to persist local customized colors palette values, custom lighting patterns layouts, and favorites on your device storage directly.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  3. Non-Disclosure to Third Parties
                </h2>
                <p>
                  Because we harvest zero physical and digital tracking data, it is impossible for us to sell, trade, disclose, or leak your details to any third-party marketing networks. We do not integrate tracking SDK banners from online bidding advertising partners.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  4. Children's Privacy Compliance
                </h2>
                <p>
                  The <strong>ARGB HSL</strong> app complies fully with Children’s Online Privacy Protection Acts (COPPA) guidelines and global Google Play Family store directives. Given the complete absence of inputs collections, our smart engine is incredibly safe for children making customized lights patterns models at home.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-blue" />
                  5. Privacy Policy Updates
                </h2>
                <p>
                  We may periodically update this documentation sheet to match newer version releases of the ARGB HSL software suite. All amendments will alter the "Last Updated" milestone date at the top of this card. Users should check this page occasionally to verify their privacy details.
                </p>
              </section>

              {/* Section 6 - Supports & Contact info */}
              <section className="pt-6 border-t border-white/5 space-y-4">
                <h2 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 rounded-full bg-neon-pink" />
                  6. Contact & Support Information
                </h2>
                <p>
                  If you have inquiries or feedback concerning offline packets execution, local systems or our privacy parameters, please dispatch direct messages to our official support team:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono text-xs text-slate-400">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-start">
                    <MapPin className="w-4 h-4 text-neon-pink mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white mb-1">Happy Smart Light Co., Ltd</p>
                      <p>R&D: Tech Hub, Sảnh S6.03, Vinhomes Grand Park, P. Long Bình, TP. Hồ Chí Minh</p>
                      <p className="mt-1 text-[10px]">HQ: Số 42 Hà Đức Trọng, P. Bà Rịa, TP. Hồ Chí Minh</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-center space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-neon-blue mr-3 shrink-0" />
                      <span>Hotline & Zalo: (+84) 0784 140 494</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-purple-400 mr-3 shrink-0" />
                      <span>happysmartlight@outlook.com</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
