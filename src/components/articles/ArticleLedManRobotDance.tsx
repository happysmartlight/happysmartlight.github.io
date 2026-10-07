import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Bot, Shirt, Sparkles, Music, Radio, Zap, Wifi, BatteryCharging, Users, Drama, Flag, Handshake } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import ArticleImageGallery from "../ArticleImageGallery";
import ArticleVideoGallery from "../ArticleVideoGallery";

const SITE = "https://happysmartlight.com";
const PAGE_PATH = "/post-news/trang-phuc-led-robot-dance-happy-smart-light/";

const FEATURES = [
  { icon: <Radio className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "Đồng bộ nhạc theo nhịp", desc: "Trang phục LED bắt beat, đổi hiệu ứng theo từng nốt nhạc — vũ công \"hóa robot\" di chuyển nhịp nhàng cùng ánh sáng." },
  { icon: <Wifi className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "Điều khiển không dây đồng loạt", desc: "Một lệnh từ app/điều khiển trung tâm đổi màu, đổi hiệu ứng cho cả đội hình LED Man cùng lúc, không lệch nhịp." },
  { icon: <BatteryCharging className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "Pin sạc di động, biểu diễn liên tục", desc: "Pin Lithium tích hợp gọn trong trang phục, đủ năng lượng cho cả buổi diễn dài mà không cần dây nguồn." },
  { icon: <Shirt className="w-4 h-4 text-neon-blue-bright shrink-0" />, title: "Thiết kế giáp nhẹ, linh hoạt", desc: "Khung giáp ôm sát cơ thể, chất liệu nhẹ và bền, không cản trở các động tác robot dance, breaking hay biến hình." },
];

const APPLICATIONS = [
  { icon: <Drama className="w-4 h-4 text-purple-300 shrink-0" />, label: "Tiết mục robot dance, LED dance trên sân khấu lớn" },
  { icon: <Users className="w-4 h-4 text-purple-300 shrink-0" />, label: "Khai trương, countdown, lễ hội ánh sáng, flashmob" },
  { icon: <Music className="w-4 h-4 text-purple-300 shrink-0" />, label: "MV ca nhạc, hậu trường quảng cáo thương hiệu" },
  { icon: <Sparkles className="w-4 h-4 text-purple-300 shrink-0" />, label: "Gala dinner, team building, sự kiện doanh nghiệp" },
];

const FAQS = [
  {
    q: "Trang phục LED Robot Dance là gì?",
    a: "Đây là bộ giáp/trang phục gắn kín dải LED ARGB lên toàn thân (mũ, ngực, tay, chân), kết hợp với vũ công biểu diễn theo phong cách robot, Tron dance. Khi di chuyển, ánh sáng trên trang phục đổi màu, chạy hiệu ứng đồng bộ theo nhạc tạo hiệu ứng thị giác mãn nhãn trong không gian tối.",
  },
  {
    q: "Trang phục LED hoạt động được bao lâu mỗi lần sạc?",
    a: "Tùy cấu hình pin và mật độ LED, trang phục LED Robot Dance của Happy Smart Light thường hoạt động liên tục nhiều giờ mỗi lần sạc đầy — đủ cho một buổi diễn cùng thời gian tập luyện trước đó.",
  },
  {
    q: "Có thể đồng bộ nhiều bộ trang phục LED cùng lúc không?",
    a: "Có. Mạch điều khiển ARGB HSL hỗ trợ đồng bộ không dây nhiều bộ trang phục cùng lúc, giúp cả đội hình đổi màu, đổi hiệu ứng chính xác theo từng nhịp nhạc mà không bị lệch.",
  },
  {
    q: "Có đặt thiết kế trang phục LED riêng theo concept sự kiện được không?",
    a: "Được. Happy Smart Light hợp tác cùng NCTA — Người Chế Tạo để sản xuất trang phục, giáp LED theo yêu cầu riêng: từ robot dance, LED Man cho đến trống LED, cờ LED nghệ thuật.",
  },
  {
    q: "Đặt lịch biểu diễn LED Robot Dance ở đâu?",
    a: "Liên hệ trực tiếp Happy Smart Light qua hotline/Zalo 0784 140 494 để được tư vấn ý tưởng trình diễn, hoặc tham khảo các đoàn biểu diễn LED dance đối tác như Moonlight Dance Studio.",
  },
];

const GALLERY_IMAGES = [
  { src: "/img/led-props/led-man/Visual-Tron456.jpg", alt: "Trang phục LED Robot Dance Visual Tron", caption: "Trang phục LED Robot Dance phát sáng đa sắc, tia laser đồng bộ trên sân khấu tối" },
  { src: "/img/led-props/led-man/VT-concentrate-1-2.jpg", alt: "Bộ giáp LED Man đầy đủ phụ kiện", caption: "Bộ giáp LED Man đầy đủ: mũ, mặt nạ, ngực, tay, chân — lắp ráp theo từng vũ công" },
  { src: "/img/led-props/led-man/LED-Drummes-in-Sharjah1-scaled-2.jpg", alt: "Đội hình LED Man biểu diễn xếp chữ ánh sáng", caption: "Đội hình LED Man xếp chữ ánh sáng trong một sự kiện quốc tế tại Sharjah" },
  { src: "/img/led-props/led-man/vtttt-min-concentrate.jpeg", alt: "Trang phục LED Robot Dance Visual Tron chuyển động", caption: "Visual Tron — chuỗi động tác robot dance với hiệu ứng LED chuyển động mượt mà" },
];

const PERFORMANCE_VIDEOS = [
  { youtube: "https://youtu.be/wmDUUixp9Cw", title: "LED Dance — Người Việt Nam" },
  { youtube: "https://youtu.be/-Wf_L1X056w", title: "Moonlight LED Dance" },
  { youtube: "https://youtu.be/malT8pf2CIA", title: "LED Dance — Performance" },
];

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Trang phục LED Robot Dance / LED Man biểu diễn",
  name: "Trang Phục LED Robot Dance Happy Smart Light",
  description: "Trang phục, giáp LED Man đồng bộ ánh sáng theo nhạc cho tiết mục robot dance, Tron dance, sự kiện và sân khấu biểu diễn chuyên nghiệp.",
  provider: { "@type": "Organization", name: "Happy Smart Light", url: SITE },
  areaServed: "VN",
  url: `${SITE}${PAGE_PATH}`,
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function ArticleLedManRobotDance() {
  return (
    <ArticleLayout
      title="Trang Phục LED Robot Dance Happy Smart Light — Người LED Biểu Diễn Ánh Sáng Đỉnh Cao"
      metaTitle="Trang Phục LED Robot Dance | Happy Smart Light"
      description="Trang phục LED Robot Dance Happy Smart Light: bộ giáp LED Man phát sáng đồng bộ theo nhạc, biến tấu nhịp nhàng theo điệu nhảy robot, Tron dance — ấn tượng cho sự kiện, sân khấu."
      eyebrow="HAPPY SMART LIGHT — TRANG PHỤC LED ROBOT DANCE"
      bannerImg="/img/led-props/led-man/Visual-Tron456.jpg"
      accent="blue"
      path={PAGE_PATH}
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(SERVICE_JSON_LD)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      </Head>

      {/* Intro */}
      <Callout icon={<Bot className="w-5 h-5 text-neon-blue-bright" />}>
        <p>
          <strong className="text-white">Trang phục LED Robot Dance</strong> (LED Man) là bộ giáp gắn kín dải LED ARGB lên toàn thân, kết hợp cùng vũ công biểu diễn theo phong cách <strong className="text-white">robot, Tron dance</strong>. Mỗi chuyển động — xoay người, gập tay, bước chân — đều được "vẽ" lại bằng ánh sáng, biến tấu nhịp nhàng theo từng giai điệu, tạo nên màn trình diễn <strong className="text-neon-blue-bright">vừa công nghệ vừa nghệ thuật</strong>.
        </p>
      </Callout>

      {/* What is it */}
      <section className="space-y-3">
        <SectionHeading accent="blue">LED Man / Robot Dance Là Gì?</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400 leading-relaxed">
            Lấy cảm hứng từ phong trào <strong className="text-white">Tron dance</strong> và <strong className="text-white">robot dance</strong> nổi tiếng thế giới, trang phục LED Man phủ kín dải LED ARGB lên mũ, mặt nạ, giáp ngực, tay và chân vũ công. Mạch điều khiển <strong className="text-white">ARGB HSL</strong> điều phối ánh sáng chạy theo từng động tác và nhịp nhạc, kết hợp thêm tia laser, khói hoặc nhạc beat mạnh để tạo hiệu ứng choáng ngợp trong không gian tối. Đây là tiết mục được nhiều đoàn nghệ thuật, vũ đoàn và đơn vị tổ chức sự kiện tại Việt Nam ưa chuộng nhờ tính giải trí cao và khả năng gây ấn tượng ngay từ giây đầu tiên.
          </p>
        </InfoCard>
      </section>

      {/* Features */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Điểm Nổi Bật Trang Phục LED Happy Smart Light</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Ứng Dụng Biểu Diễn</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {APPLICATIONS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-white/5">
              {icon}
              <span className="text-xs text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Video Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Video Biểu Diễn LED Dance Thực Tế</SectionHeading>
        <p className="text-xs text-slate-400">
          Một số tiết mục LED Dance từ đối tác biểu diễn của Happy Smart Light — minh chứng cho khả năng đồng bộ ánh sáng theo nhạc mượt mà của hệ sinh thái ARGB HSL.
        </p>
        <ArticleVideoGallery videos={PERFORMANCE_VIDEOS} columns={2} accent="blue" />
      </section>

      {/* Image Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Hình Ảnh Trang Phục LED Robot Dance</SectionHeading>
        <ArticleImageGallery images={GALLERY_IMAGES} columns={2} />
      </section>

      {/* CTA */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Đặt Sản Xuất & Đặt Lịch Biểu Diễn</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/doi-tac/partner-NCTA/"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-blue/30 transition-colors no-underline"
          >
            <Flag className="w-4 h-4 text-neon-blue-bright shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Đối tác sản xuất đạo cụ — NCTA</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Đặt thiết kế trang phục, giáp LED riêng theo concept sự kiện</p>
            </div>
          </Link>
          <Link
            to="/doi-tac/partner-Moonlight-dance/"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-blue/30 transition-colors no-underline"
          >
            <Handshake className="w-4 h-4 text-neon-blue-bright shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Đối tác biểu diễn — Moonlight Dance Studio</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Đặt lịch tiết mục LED Dance, Robot Dance cho sự kiện</p>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Câu Hỏi Thường Gặp Về Trang Phục LED Robot Dance</SectionHeading>
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <InfoCard key={q}>
              <h3 className="text-xs font-semibold text-white flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-neon-blue-bright shrink-0 mt-0.5" />
                {q}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{a}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <ArtQuote accent="blue">
        Mỗi vòng xoay là một vệt sáng — trang phục LED Robot Dance biến vũ công thành tác phẩm ánh sáng sống động.
      </ArtQuote>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {["HappySmartLight", "LEDMan", "RobotDance", "TronDance", "TrangPhucLED", "LEDDance"].map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
            #{tag}
          </span>
        ))}
      </div>
    </ArticleLayout>
  );
}
