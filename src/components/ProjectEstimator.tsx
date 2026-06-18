import { useState, useEffect, useRef, FormEvent } from "react";
import { Sliders, CheckCircle2, Zap, HelpCircle, PhoneCall, Send, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectEstimatorProps {
  preFilledProduct: string;
}

type LedType = "strip" | "matrix" | "other";

// Anti-spam config
const SUBMIT_COOLDOWN_MS = 60_000; // tối thiểu 60s giữa 2 lần gửi
const MIN_FILL_MS = 3_000; // gửi nhanh hơn 3s sau khi mở form -> nghi là bot
const LAST_SUBMIT_KEY = "hsl_last_submit_at";

export default function ProjectEstimator({ preFilledProduct }: ProjectEstimatorProps) {
  // Calculator states
  const [ledType, setLedType] = useState<LedType>("strip");
  const [stripLength, setStripLength] = useState<number>(5); // meters
  const [ledDensity, setLedDensity] = useState<number>(60); // LEDs per meter
  const [matrixCols, setMatrixCols] = useState<number>(32);
  const [matrixRows, setMatrixRows] = useState<number>(32);
  const [poiCount, setPoiCount] = useState<number>(2);

  // Result states
  const [totalPixels, setTotalPixels] = useState<number>(300);
  const [maxAmpere, setMaxAmpere] = useState<number>(18); // 5V Amperes assuming 60mA max per pixel
  const [maxWatts, setMaxWatts] = useState<number>(90);
  const [recommendedController, setRecommendedController] = useState<string>("Happy Smart Light 2X PRO");

  // Contact form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Anti-spam states
  const [honeypot, setHoneypot] = useState(""); // ô ẩn, chỉ bot mới điền
  const formOpenedAt = useRef<number>(Date.now()); // mốc thời gian mở form

  // Sync preFilledProduct with message
  useEffect(() => {
    if (preFilledProduct) {
      setMessage(`Tôi muốn nhận tư vấn và báo giá thiết bị: ${preFilledProduct}`);
      // Logically refocus message or scroll to contact
      const el = document.getElementById("estimator");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preFilledProduct]);

  // Recalculate specifications in real-time
  useEffect(() => {
    let pixels = 0;
    if (ledType === "strip") {
      pixels = stripLength * ledDensity;
      setRecommendedController("Happy Smart Light 2X PRO");
    } else if (ledType === "matrix") {
      pixels = matrixCols * matrixRows;
      setRecommendedController("Bộ Điều Khiển ARGB Happy Smart Light 4X");
    } else {
      pixels = poiCount * 144; // average POV pixel count
      setRecommendedController("Happy POI Performance Wand (Gậy Biểu Diễn)");
    }

    setTotalPixels(pixels);

    // standard assumption: WS2812B/SK6812 RGB at 100% white consumes ~0.06A per pixel at 5V
    // we use a safe 0.05A multiplier for real-world mixed color consumption average
    const peakAmps = Math.round(pixels * 0.05 * 10) / 10;
    setMaxAmpere(peakAmps < 1 ? 1 : peakAmps);

    // Watts = Amps * Volts (5V default for strip/matrix)
    const peakWatts = Math.round(peakAmps * 5);
    setMaxWatts(peakWatts < 5 ? 5 : peakWatts);
  }, [ledType, stripLength, ledDensity, matrixCols, matrixRows, poiCount]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Vui lòng điền họ tên và số điện thoại liên hệ!");
      return;
    }

    // --- Chống spam (kiểm tra trước khi gửi) ---
    // 1. Honeypot: người dùng thật không thấy/không điền ô này; nếu có giá trị -> bot.
    if (honeypot.trim() !== "") {
      setSubmitted(true); // giả vờ thành công, không gửi gì cả
      return;
    }
    // 2. Gửi quá nhanh sau khi mở form -> nghi bot.
    if (Date.now() - formOpenedAt.current < MIN_FILL_MS) {
      alert("Bạn thao tác hơi nhanh. Vui lòng kiểm tra lại thông tin rồi gửi lại sau giây lát.");
      return;
    }
    // 3. Cooldown: chặn gửi liên tục trong thời gian ngắn.
    const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    const waitMs = SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmit);
    if (waitMs > 0) {
      alert(`Bạn vừa gửi yêu cầu rồi. Vui lòng đợi ${Math.ceil(waitMs / 1000)} giây trước khi gửi tiếp.`);
      return;
    }

    setSubmitting(true);

    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // Plain text (no parse_mode) so any character in user input is safe.
    const text =
      `🔔 YÊU CẦU TƯ VẤN MỚI\n\n` +
      `👤 Họ tên: ${name}\n` +
      `📞 SĐT: ${phone}\n` +
      (email ? `✉️ Email: ${email}\n` : "") +
      `\n📝 Yêu cầu:\n${message || "(không có lời nhắn)"}\n` +
      `\n⏰ ${new Date().toLocaleString("vi-VN")}`;

    try {
      if (!token || !chatId) {
        throw new Error(
          "Chưa cấu hình Telegram. Hãy đặt VITE_TELEGRAM_BOT_TOKEN và VITE_TELEGRAM_CHAT_ID trong file .env"
        );
      }

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.description || `Telegram trả về lỗi ${res.status}`);
      }

      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now())); // mốc cho cooldown
      setSubmitted(true);
    } catch (err) {
      console.error("Gửi yêu cầu thất bại:", err);
      alert(
        "Gửi yêu cầu thất bại. Vui lòng gọi hotline 0784 140 494 hoặc thử lại sau.\n\n" +
          (err instanceof Error ? err.message : "")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <section id="estimator" className="relative py-[65px] overflow-hidden border-t border-white/5 bg-slate-950/20">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-neon-pink-bright/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-neon-blue-bright/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="estimator-intro">
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest font-bold">
            TỰ ĐỘNG HÓA DỰ TOÁN & LIÊN HỆ
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Lập Kế Hoạch Setup &{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright via-white to-neon-blue-bright bg-clip-text text-transparent">
              Nhận Báo Giá
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Sử dụng công cụ tính toán thông minh bên dưới để dự toán điện năng dòng tải tiêu hao của dải LED, từ đó lựa chọn nguồn cấp và bộ điều khiển Happy Smart Light tối ưu nhất!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch" id="estimator-layout">
          {/* Left Estimator Calculator Column */}
          <div className="lg:col-span-6 bg-glass p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between" id="estimator-calculator-box">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-white/5">
                <Sliders className="w-5 h-5 text-neon-blue-bright" />
                <h3 className="font-display font-bold text-lg text-white">
                  1. Công Cụ Dự Toán Công Suất LED
                </h3>
              </div>

              {/* Selector led geometry */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">Cấu trúc dải LED của bạn:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLedType("strip")}
                    className={`py-2 px-3 rounded-lg text-xs font-display tracking-wider uppercase border cursor-pointer transition-all ${
                      ledType === "strip"
                        ? "bg-neon-blue/15 border-neon-blue text-white font-semibold"
                        : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Dây LED Cuộn
                  </button>
                  <button
                    type="button"
                    onClick={() => setLedType("matrix")}
                    className={`py-2 px-3 rounded-lg text-xs font-display tracking-wider uppercase border cursor-pointer transition-all ${
                      ledType === "matrix"
                        ? "bg-neon-blue/15 border-neon-blue text-white font-semibold"
                        : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Bảng Ma Trận
                  </button>
                  <button
                    type="button"
                    onClick={() => setLedType("other")}
                    className={`py-2 px-3 rounded-lg text-xs font-display tracking-wider uppercase border cursor-pointer transition-all ${
                      ledType === "other"
                        ? "bg-neon-blue/15 border-neon-blue text-white font-semibold"
                        : "bg-slate-900/60 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    POI / POV Khác
                  </button>
                </div>
              </div>

              {/* Dynamic Range inputs based on selected geometry */}
              <div className="space-y-4 pt-2">
                {ledType === "strip" && (
                  <>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Chiều dài dải LED (Meters)</span>
                        <span className="text-white font-semibold">{stripLength}m</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={stripLength}
                        onChange={(e) => setStripLength(parseInt(e.target.value))}
                        className="w-full accent-neon-blue h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono text-slate-400 block pb-1">Mật độ đèn LED bóng/m:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[30, 60, 144].map((density) => (
                          <button
                            key={density}
                            type="button"
                            onClick={() => setLedDensity(density)}
                            className={`py-1.5 rounded bg-slate-900 border text-xs font-mono transition-all cursor-pointer ${
                              ledDensity === density
                                ? "border-neon-blue text-[#00f0ff] font-bold"
                                : "border-white/5 text-slate-400 hover:text-white"
                            }`}
                          >
                            {density} LEDs/m
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {ledType === "matrix" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-slate-400 block">Số Cột (Columns):</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[16, 32, 64].map((cols) => (
                          <button
                            key={cols}
                            type="button"
                            onClick={() => setMatrixCols(cols)}
                            className={`py-1.5 rounded bg-slate-900 border text-xs font-mono cursor-pointer transition-all ${
                              matrixCols === cols ? "border-neon-blue text-[#00f0ff] font-bold" : "border-white/5 text-slate-400"
                            }`}
                          >
                            {cols}px
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-slate-400 block">Số Hàng (Rows):</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[16, 32, 64].map((rows) => (
                          <button
                            key={rows}
                            type="button"
                            onClick={() => setMatrixRows(rows)}
                            className={`py-1.5 rounded bg-slate-900 border text-xs font-mono cursor-pointer transition-all ${
                              matrixRows === rows ? "border-neon-blue text-[#00f0ff] font-bold" : "border-white/5 text-slate-400"
                            }`}
                          >
                            {rows}px
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {ledType === "other" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Số lượng thiết bị POI đồng hành:</span>
                      <span className="text-white font-semibold">{poiCount} chiếc</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={poiCount}
                      onChange={(e) => setPoiCount(parseInt(e.target.value))}
                      className="w-full accent-neon-blue h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Calculations Outcome card */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4" id="estimator-calculations-result">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-bold">// KẾT QUẢ DỰ TOÁN ĐIỆN NĂNG LOẠI 5V:</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="block text-[9px] text-slate-500 font-mono">STT ĐIỂM SÁNG LED:</span>
                  <span className="block text-xl font-display font-medium text-white">{totalPixels} px</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="block text-[9px] text-slate-500 font-mono">CƯỜNG ĐỘ DÒNG TỐI ĐA:</span>
                  <span className="block text-xl font-display font-medium text-neon-pink-bright">{maxAmpere}A</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="block text-[9px] text-slate-500 font-mono">CÔNG SUẤT KHUYÊN DÙNG:</span>
                  <span className="block text-xl font-display font-medium text-[#00f0ff]">{maxWatts}W</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 font-sans text-xs flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-slate-400 block font-mono text-[9px] uppercase">Thiết bị điều khiển đề xuất:</span>
                  <span className="text-white font-bold block">{recommendedController}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const recMsg = `Bộ điều khiển khuyên dùng: ${recommendedController}. Cấu hình: ${totalPixels} pixels, ước tính dòng tải ${maxAmpere}A, công suất ${maxWatts}W.`;
                    setMessage(recMsg);
                  }}
                  className="py-1.5 px-3 rounded bg-neon-blue/10 text-neon-blue-bright hover:bg-neon-blue hover:text-white text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  Nạp Vào Biểu Mẫu
                </button>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-6 bg-glass p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between" id="estimator-contact-box">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 h-full flex flex-col justify-between"
                  id="form-estimator-deal"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pb-4 border-b border-white/5">
                      <PhoneCall className="w-5 h-5 text-neon-pink-bright" />
                      <h3 className="font-display font-bold text-lg text-white">
                        2. Biểu Mẫu Gửi Tư Vấn & Đặt Mua
                      </h3>
                    </div>

                    {/* Honeypot chống bot: ẩn với người dùng thật, chỉ bot tự điền */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0 pointer-events-none"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Họ tên *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 focus:border-neon-pink/50 text-white text-xs sm:text-sm focus:outline-hidden transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0912xxxxxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 focus:border-neon-pink/50 text-white text-xs sm:text-sm focus:outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Thư Email (Không bắt buộc)</label>
                      <input
                        type="email"
                        placeholder="buyer@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 focus:border-neon-pink/50 text-white text-xs sm:text-sm focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Mô tả hoặc yêu cầu thiết lập của bạn</label>
                      <textarea
                        rows={4}
                        placeholder="Hãy thông tin cho chúng tôi biết về mặt bằng thi công thiết bị hoặc dòng chip LED bạn định lắp đặt..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 focus:border-neon-pink/50 text-white text-xs sm:text-sm focus:outline-hidden transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue hover:shadow-glow-dual text-white font-display text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                      id="btn-estimator-submit"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Đang gửi thông tin...</span>
                        </>
                      ) : (
                        <>
                          <span>Gửi Yêu Cầu Chiết Khấu</span>
                          <Send className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>
                    <span className="block text-center text-[10px] text-slate-500 mt-2 font-mono">
                      * Cam kết phản hồi tư vấn trong vòng 15-30 phút (Giờ làm việc)
                    </span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col justify-center items-center text-center py-8 space-y-6"
                  id="success-estimator-card"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-glow-blue/20">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      Gửi Thông Tin Thành Công!
                    </h3>
                    <p className="font-sans font-light text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Chào mừng <span className="text-white font-bold">{name}</span>. Hệ thống Happy Smart Light đã tiếp nhận thông tin dự toán kỹ thuật của bạn.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl w-full max-w-sm text-left font-mono text-xs space-y-2">
                    <p className="text-[#00f0ff] uppercase">// EMAIL BIÊN NHẬN</p>
                    <p>Khách hàng: <span className="text-white">{name}</span></p>
                    <p>SĐT liên hệ: <span className="text-white">{phone}</span></p>
                    {email && <p>Email: <span className="text-white">{email}</span></p>}
                    <p>Yêu cầu: <span className="text-slate-400 text-[11px] block mt-1 leading-normal italic">"{message || "Không có lời nhắn"}"</span></p>
                  </div>

                  <p className="text-slate-400 text-xs">
                    Kỹ thuật viên của chúng tôi sẽ chủ động gọi lại tư vấn và cấu hình tối ưu dây LED cho bạn trong vòng 15 phút.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="py-2.5 px-6 rounded-full bg-slate-900 border border-white/10 text-white font-mono text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                    id="btn-estimator-reset"
                  >
                    Tạo Yêu Cầu Mới
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
