import { useState, useEffect, useRef, useMemo, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wand2,
  Lightbulb,
  Grid3x3,
  MonitorPlay,
  CheckCircle2,
  PhoneCall,
  Send,
  Loader2,
  ArrowRight,
  RotateCcw,
  Eye,
  Cpu,
  PlugZap,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectEstimatorProps {
  preFilledProduct: string;
}

// Anti-spam config
const SUBMIT_COOLDOWN_MS = 60_000; // tối thiểu 60s giữa 2 lần gửi
const MIN_FILL_MS = 3_000; // gửi nhanh hơn 3s sau khi mở form -> nghi là bot
const LAST_SUBMIT_KEY = "hsl_last_submit_at";

type Accent = "pink" | "blue" | "yellow" | "dual";
type NeedId = "poi" | "strip" | "matrix-event" | "panel";
type Scale = "small" | "medium" | "large";

interface ProductRef {
  id: string; // slug trang chi tiết /san-pham/:id
  name: string;
  price: string;
  accent: Accent;
}

const PRODUCTS: Record<string, ProductRef> = {
  v4pro: { id: "v4pro", name: "Bộ Điều Khiển ARGB 2X PRO", price: "1.200.000đ", accent: "yellow" },
  hsl4x: { id: "hsl4x", name: "Bộ Điều Khiển ARGB 4X", price: "930.000đ", accent: "dual" },
  matrix: { id: "matrix", name: "LED Matrix Driver Pro", price: "Tùy thời giá linh kiện", accent: "blue" },
  poi: { id: "poi", name: "Happy POI Performance Wand", price: "Tùy thời giá linh kiện", accent: "pink" },
};

interface NeedOption {
  id: NeedId;
  label: string;
  sub: string;
  icon: typeof Wand2;
  accent: Accent;
}

const NEEDS: NeedOption[] = [
  { id: "poi", label: "Biểu diễn POI / Múa LED", sub: "Gậy, đạo cụ cầm tay, nhóm múa POV", icon: Wand2, accent: "pink" },
  { id: "strip", label: "Dải LED trang trí / Đồng bộ nhạc", sub: "Nhà, quán, sân khấu nhỏ, react audio", icon: Lightbulb, accent: "yellow" },
  { id: "matrix-event", label: "Ma trận / Trống / Cờ LED sự kiện", sub: "4.000–5.000 pixel, công suất lớn", icon: Grid3x3, accent: "dual" },
  { id: "panel", label: "Panel LED Cabin chuyên nghiệp", sub: "Tấm panel/cabin, màn hình LED", icon: MonitorPlay, accent: "blue" },
];

interface Recommendation {
  mainId: string;
  comboIds: string[];
  heading: string;
  note: string;
  accessories: string[];
  accent: Accent;
}

/** Sinh đề xuất combo theo nhu cầu + quy mô. */
function recommend(need: NeedId, scale: Scale): Recommendation {
  switch (need) {
    case "poi":
      return {
        mainId: "poi",
        comboIds: ["poi", "v4pro"],
        heading: "Combo Biểu Diễn POI",
        note:
          scale === "large"
            ? "Đội hình lớn nhiều gậy — nên đồng bộ AP nội bộ, mỗi gậy 1 bộ 2X PRO + pin LiPo."
            : "Gậy POV cầm tay kết hợp bộ điều khiển 2X PRO nhỏ gọn, pin sạc trực tiếp.",
        accessories: ["Pin LiPo/Lithium + mạch sạc", "Anten rời tầm xa", "Đồng bộ nhóm qua Wifi AP"],
        accent: "pink",
      };
    case "strip": {
      // Dải LED lớn -> nâng cấp lên 4X để chịu dòng & số pixel cao.
      const big = scale === "large";
      return {
        mainId: big ? "hsl4x" : "v4pro",
        comboIds: big ? ["hsl4x"] : ["v4pro"],
        heading: big ? "Combo Dải LED Công Suất Lớn" : "Combo Dải LED Trang Trí",
        note: big
          ? "Dải LED dài/nhiều điểm sáng — dùng bộ 4X chịu dòng tới 30A, kèm nguồn công suất lớn."
          : "Dải LED vừa phải — bộ 2X PRO đồng bộ nhạc (LedFx/xLights), 2 cổng ARGB độc lập.",
        accessories: [
          big ? "Nguồn 5V công suất lớn (theo tổng pixel)" : "Nguồn 5V theo chiều dài dải",
          "Dây LED ARGB (WS2812B/SK6812)",
          "Tiêm nguồn (power injection) cho dải dài",
        ],
        accent: big ? "dual" : "yellow",
      };
    }
    case "matrix-event":
      return {
        mainId: "hsl4x",
        comboIds: ["hsl4x"],
        heading: "Combo Sự Kiện Công Suất Cao",
        note: "Trống/cờ/ma trận LED sự kiện — bộ 4X tối ưu 4.000–5.000 pixel, 4 cổng ra độc lập, khe ETH & SD.",
        accessories: ["Nguồn công suất lớn 5V/12V/24V", "Module ETH + thẻ nhớ SD", "Cầu đấu đồng gánh tải tới 30A"],
        accent: "dual",
      };
    case "panel":
      return {
        mainId: "matrix",
        comboIds: ["matrix"],
        heading: "Combo Panel / Cabin LED",
        note: "Màn hình/panel LED chuyên nghiệp — Matrix Driver Pro lái trực tiếp panel, stream DDP qua LAN, nạp offline SD.",
        accessories: ["Tấm Panel/Cabin LED", "Nguồn cấp theo số module", "Cáp mạng LAN Ethernet (DDP)"],
        accent: "blue",
      };
  }
}

const ACCENT = {
  pink: { text: "text-neon-pink-bright", border: "border-neon-pink/40", chip: "bg-neon-pink/15 text-neon-pink-bright border-neon-pink/30", dot: "bg-neon-pink" },
  blue: { text: "text-neon-blue-bright", border: "border-neon-blue/40", chip: "bg-neon-blue/15 text-neon-blue-bright border-neon-blue/30", dot: "bg-neon-blue" },
  yellow: { text: "text-neon-yellow-bright", border: "border-neon-yellow/40", chip: "bg-neon-yellow/15 text-neon-yellow-bright border-neon-yellow/30", dot: "bg-neon-yellow" },
  dual: { text: "text-purple-300", border: "border-purple-500/40", chip: "bg-purple-500/15 text-purple-300 border-purple-500/30", dot: "bg-purple-500" },
} as const;

const SCALE_LABELS: Record<Scale, string> = {
  small: "Nhỏ (≤ 500 điểm)",
  medium: "Vừa (500–2.000)",
  large: "Lớn (> 2.000)",
};

export default function ProjectEstimator({ preFilledProduct }: ProjectEstimatorProps) {
  const navigate = useNavigate();

  // Wizard states
  const [need, setNeed] = useState<NeedId | null>(null);
  const [scale, setScale] = useState<Scale>("medium");

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

  const rec = useMemo(() => (need ? recommend(need, scale) : null), [need, scale]);

  // Sync preFilledProduct (từ trang sản phẩm / card) vào lời nhắn.
  useEffect(() => {
    if (preFilledProduct) {
      setMessage(`Tôi muốn nhận tư vấn và báo giá thiết bị: ${preFilledProduct}`);
      const el = document.getElementById("estimator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [preFilledProduct]);

  const loadComboToForm = () => {
    if (!rec) return;
    const products = rec.comboIds.map((id) => PRODUCTS[id]?.name).filter(Boolean).join(" + ");
    const text =
      `Tôi muốn tư vấn ${rec.heading}.\n` +
      `Thiết bị đề xuất: ${products}.\n` +
      `Phụ kiện đi kèm: ${rec.accessories.join(", ")}.`;
    setMessage(text);
    document.getElementById("estimator-contact-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const resetWizard = () => {
    setNeed(null);
    setScale("medium");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Vui lòng điền họ tên và số điện thoại liên hệ!");
      return;
    }

    // --- Chống spam (kiểm tra trước khi gửi) ---
    if (honeypot.trim() !== "") {
      setSubmitted(true); // giả vờ thành công, không gửi gì cả
      return;
    }
    if (Date.now() - formOpenedAt.current < MIN_FILL_MS) {
      alert("Bạn thao tác hơi nhanh. Vui lòng kiểm tra lại thông tin rồi gửi lại sau giây lát.");
      return;
    }
    const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    const waitMs = SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmit);
    if (waitMs > 0) {
      alert(`Bạn vừa gửi yêu cầu rồi. Vui lòng đợi ${Math.ceil(waitMs / 1000)} giây trước khi gửi tiếp.`);
      return;
    }

    setSubmitting(true);

    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    const text =
      `🔔 YÊU CẦU TƯ VẤN MỚI\n\n` +
      `👤 Họ tên: ${name}\n` +
      `📞 SĐT: ${phone}\n` +
      (email ? `✉️ Email: ${email}\n` : "") +
      (rec ? `🧩 Combo quan tâm: ${rec.heading}\n` : "") +
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

      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
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
            TƯ VẤN CHỌN THIẾT BỊ & LIÊN HỆ
          </span>
          <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Tìm Đúng Combo &{" "}
            <span className="bg-gradient-to-r from-neon-pink-bright via-white to-neon-blue-bright bg-clip-text text-transparent">
              Nhận Báo Giá
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Trả lời vài câu hỏi nhanh để chúng tôi gợi ý bộ điều khiển và combo Happy Smart Light phù hợp nhất với nhu cầu của bạn — rồi gửi yêu cầu tư vấn ngay!
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-8" id="estimator-layout">
          {/* Row 1: Product/Combo Advisor */}
          <div className="bg-glass p-6 sm:p-8 rounded-3xl border border-white/10" id="estimator-advisor-box">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-neon-blue-bright" />
                <h3 className="font-display font-bold text-lg text-white">1. Trợ Lý Chọn Sản Phẩm</h3>
              </div>
              {need && (
                <button
                  type="button"
                  onClick={resetWizard}
                  className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Chọn lại
                </button>
              )}
            </div>

            {/* Step 1: Need selection */}
            <div className="mt-6 space-y-2">
              <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">Bạn dùng LED cho mục đích gì?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {NEEDS.map((opt) => {
                  const Icon = opt.icon;
                  const active = need === opt.id;
                  const a = ACCENT[opt.accent];
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNeed(opt.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        active ? `bg-slate-900/80 ${a.border}` : "bg-slate-900/40 border-white/5 hover:border-white/15"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${active ? a.text : "text-slate-400"}`} />
                      <span className={`block text-xs font-display font-semibold ${active ? "text-white" : "text-slate-300"}`}>{opt.label}</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5 leading-snug">{opt.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale */}
            {need && (
              <div className="mt-5 space-y-2">
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">Quy mô số điểm sáng LED:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(SCALE_LABELS) as Scale[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScale(s)}
                      className={`py-2 px-2 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
                        scale === s ? "border-neon-blue text-[#00f0ff] font-bold bg-neon-blue/10" : "border-white/5 text-slate-400 bg-slate-900/60 hover:text-white"
                      }`}
                    >
                      {SCALE_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            <div className="pt-6">
              {!rec ? (
                <div className="mt-2 p-6 rounded-2xl bg-slate-900/40 border border-dashed border-white/10 text-center">
                  <Sparkles className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Chọn mục đích sử dụng để nhận gợi ý combo phù hợp.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${rec.heading}-${rec.mainId}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-2xl bg-slate-900/60 border ${ACCENT[rec.accent].border} p-5 space-y-4`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">// GỢI Ý CHO BẠN</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase border ${ACCENT[rec.accent].chip}`}>{rec.heading}</span>
                    </div>

                    {/* Product list */}
                    <div className="space-y-2">
                      {rec.comboIds.map((id) => {
                        const p = PRODUCTS[id];
                        if (!p) return null;
                        return (
                          <div key={id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950/50 border border-white/5">
                            <div className="flex items-center gap-2 min-w-0">
                              <Cpu className={`w-4 h-4 shrink-0 ${ACCENT[p.accent].text}`} />
                              <div className="min-w-0">
                                <span className="block text-xs font-display font-semibold text-white truncate">{p.name}</span>
                                <span className="block text-[10px] font-mono text-slate-500">{p.price}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigate(`/san-pham/${p.id}`)}
                              className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono uppercase text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer shrink-0"
                            >
                              <Eye className="w-3 h-3" /> Chi tiết
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">{rec.note}</p>

                    {/* Accessories */}
                    <div className="flex items-start gap-2">
                      <PlugZap className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                      <div className="flex flex-wrap gap-1.5">
                        {rec.accessories.map((acc) => (
                          <span key={acc} className="px-2 py-0.5 rounded bg-slate-950/60 border border-white/5 text-[9px] font-mono text-slate-400">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={loadComboToForm}
                      className="w-full py-2.5 rounded-xl bg-neon-blue/10 text-neon-blue-bright hover:bg-neon-blue hover:text-white text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Nạp Combo Vào Biểu Mẫu <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Row 2: Contact Form */}
          <div className="bg-glass p-6 sm:p-8 rounded-3xl border border-white/10" id="estimator-contact-box">
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
                      <h3 className="font-display font-bold text-lg text-white">2. Biểu Mẫu Gửi Tư Vấn & Đặt Mua</h3>
                    </div>

                    {/* Honeypot chống bot */}
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
                    <h3 className="font-display font-extrabold text-2xl text-white">Gửi Thông Tin Thành Công!</h3>
                    <p className="font-sans font-light text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Chào mừng <span className="text-white font-bold">{name}</span>. Hệ thống Happy Smart Light đã tiếp nhận yêu cầu tư vấn của bạn.
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
                    Kỹ thuật viên của chúng tôi sẽ chủ động gọi lại tư vấn và cấu hình tối ưu cho bạn trong vòng 15 phút.
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
