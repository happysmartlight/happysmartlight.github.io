import { Wrench, Hammer, Sparkles, Flag, Drum, Layers, Cog, Handshake } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import ArticleImageGallery from "../ArticleImageGallery";
import ArticleVideoGallery from "../ArticleVideoGallery";

const NCTA_VIDEOS = [
  // Dán link YouTube (hoặc video ID) vào "youtube". Chấp nhận youtu.be/…, watch?v=…, shorts/…
  { youtube: "https://youtu.be/S2NIzwRTaWY", title: "Màn trình diễn Cờ LED" },
  { youtube: "https://youtu.be/Oo7MfDPyOu0", title: "Trống đeo LED Matrix" },
];

const NCTA_IMAGES = [
  { src: "/img/partner/partner-ncta-anh-1.jpg", caption: "Đạo cụ LED biểu diễn do NCTA chế tạo" },
  { src: "/img/partner/partner-ncta-anh-2.jpg", caption: "Trống đeo LED Matrix đồng bộ hiệu ứng" },
  { src: "/img/partner/partner-ncta-anh-3.jpg", caption: "Cờ LED nghệ thuật rực rỡ trên sân khấu" },
  { src: "/img/partner/partner-ncta-anh-4.jpg", caption: "Bộ đạo cụ LED dance hoàn thiện công phu" },
];

export default function PartnerNCTA() {
  return (
    <ArticleLayout
      title="NCTA — Người Chế Tạo × Happy Smart Light — Đối Tác Sản Xuất Đạo Cụ LED"
      eyebrow="HAPPY SMART LIGHT — PARTNER × NCTA NGƯỜI CHẾ TẠO"
      description="NCTA — Người Chế Tạo trở thành đối tác sản xuất của Happy Smart Light, chuyên chế tạo và cung cấp đạo cụ biểu diễn LED nghệ thuật: led dance, trống LED, cờ LED và nhiều hơn nữa."
      bannerImg="/img/partner/partner-ncta-anh-1.jpg"
      accent="blue"
      path="/doi-tac/partner-NCTA/"
      backPath="/doi-tac/"
      backLabel="ĐỐI TÁC"
    >
      {/* Intro */}
      <Callout icon={<Wrench className="w-5 h-5 text-neon-blue-bright" />}>
        <p>
          <strong className="text-white">NCTA — Người Chế Tạo</strong> là đội ngũ chuyên <strong className="text-white">sản xuất và cung cấp đạo cụ biểu diễn LED nghệ thuật</strong>: led dance, trống LED, cờ LED và vô số khí cụ ánh sáng độc đáo. NCTA chính thức bắt tay cùng <strong className="text-white">Happy Smart Light</strong> để đưa công nghệ điều khiển ARGB vào từng sản phẩm biểu diễn.
        </p>
      </Callout>

      {/* Partnership Highlight */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Bàn Tay Người Chế Tạo — Linh Hồn Của Đạo Cụ LED</SectionHeading>
        <p>
          Mỗi đạo cụ của <strong className="text-white">NCTA</strong> đều được làm thủ công tỉ mỉ, từ khâu thiết kế cơ khí, bố trí LED cho đến nạp <strong className="text-white">mạch điều khiển ARGB do HSL phát triển</strong>. Nhờ đó, trống LED, cờ LED hay bộ giáp led dance đều phát sáng đồng bộ theo nhạc, chuyển màu mượt mà và bền bỉ qua hàng trăm buổi diễn.
        </p>
        <p>
          Sự kết hợp giữa <strong className="text-white">tay nghề chế tác</strong> và <strong className="text-white">công nghệ ánh sáng thông minh</strong> mang đến những khí cụ biểu diễn vừa đẹp mắt, vừa ổn định cho các đoàn nghệ thuật.
        </p>
      </section>

      {/* Video Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Video Đạo Cụ LED Trình Diễn Thực Tế</SectionHeading>
        <p>
          Cùng xem những sản phẩm tiêu biểu của <strong className="text-white">NCTA</strong> khi lên sân khấu — từ màn vung <strong className="text-white">cờ LED</strong> rực rỡ đến nhịp <strong className="text-white">trống đeo LED Matrix</strong> sống động theo từng beat nhạc.
        </p>
        <ArticleVideoGallery videos={NCTA_VIDEOS} columns={2} accent="blue" />
      </section>

      {/* Product Range */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Dòng Sản Phẩm Đạo Cụ LED</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Sparkles className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="LED Dance — Giáp & Trang phục"
            desc="Bộ giáp, trang phục gắn LED ARGB lập trình hiệu ứng cho các tiết mục nhảy hiện đại, đồng bộ ánh sáng theo nhạc."
          />
          <FeatureCard
            icon={<Drum className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="Trống LED & Trống đeo Matrix"
            desc="Trống biểu diễn tích hợp LED Matrix hiển thị hiệu ứng, chữ chạy và đồ họa động theo nhịp đánh."
          />
          <FeatureCard
            icon={<Flag className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="Cờ LED nghệ thuật"
            desc="Cờ và đạo cụ vẫy gắn LED dải ARGB, tạo vệt sáng nghệ thuật đầy mãn nhãn trên sân khấu rộng."
          />
          <FeatureCard
            icon={<Layers className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="Đạo cụ LED theo yêu cầu"
            desc="Nhận thiết kế và chế tạo khí cụ ánh sáng riêng theo concept của từng đoàn nghệ thuật, sự kiện."
          />
        </div>
      </section>

      {/* Image Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Hình Ảnh Sản Phẩm & Sân Khấu</SectionHeading>
        <ArticleImageGallery images={NCTA_IMAGES} columns={2} />
      </section>

      {/* Core Values */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Cùng Nhau Kiến Tạo Giá Trị</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Hammer className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="NCTA — Người Chế Tạo"
            desc="Đội ngũ thợ chế tác giàu kinh nghiệm, biến ý tưởng biểu diễn thành đạo cụ LED hoàn thiện, chắc chắn và đẹp mắt."
          />
          <FeatureCard
            icon={<Cog className="w-4 h-4 text-neon-blue-bright shrink-0" />}
            title="Happy Smart Light"
            desc="Cung cấp mạch điều khiển ARGB, phần mềm lập trình hiệu ứng và hệ sinh thái LED thông minh cho đạo cụ."
          />
        </div>
      </section>

      {/* Goals */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Mục Tiêu Hợp Tác</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Sparkles className="w-4 h-4 text-amber-400 shrink-0" />}
            title="Chuẩn hóa chất lượng"
            desc="Áp dụng mạch điều khiển và quy trình HSL để đạo cụ LED hoạt động ổn định, đồng bộ và an toàn."
          />
          <FeatureCard
            icon={<Layers className="w-4 h-4 text-purple-400 shrink-0" />}
            title="Đa dạng hóa sản phẩm"
            desc="Mở rộng danh mục đạo cụ LED — từ trống, cờ, giáp đến các khí cụ trình diễn theo yêu cầu riêng."
          />
          <FeatureCard
            icon={<Handshake className="w-4 h-4 text-emerald-400 shrink-0" />}
            title="Đồng hành cùng nghệ sĩ"
            desc="Hỗ trợ các đoàn múa, đội trống và sự kiện sở hữu đạo cụ ánh sáng chuyên nghiệp với chi phí hợp lý."
          />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="space-y-3">
        <SectionHeading accent="blue">Cùng Chờ Đón Những Sản Phẩm Sắp Tới!</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400">
            Sự kết hợp giữa bàn tay người chế tạo và công nghệ ánh sáng thông minh sẽ liên tục cho ra đời những đạo cụ LED biểu diễn mới lạ. Theo dõi để không bỏ lỡ các mẫu đạo cụ và màn trình diễn ấn tượng!
          </p>
        </InfoCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <a href="https://happysmartlight.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-blue/20 transition-colors no-underline group">
            <span className="text-xs font-mono text-slate-500">HAPPY SMART LIGHT</span>
            <p className="text-sm text-neon-blue-bright group-hover:text-white transition-colors mt-1">happysmartlight.com →</p>
          </a>
          <a href="/doi-tac/" className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-pink/20 transition-colors no-underline group">
            <span className="text-xs font-mono text-slate-500">NCTA — NGƯỜI CHẾ TẠO</span>
            <p className="text-sm text-neon-pink-bright group-hover:text-white transition-colors mt-1">Xem thêm đối tác →</p>
          </a>
        </div>
      </section>

      <ArtQuote accent="blue">
        "Mỗi đạo cụ là một tác phẩm — nơi bàn tay người chế tạo gặp gỡ ánh sáng thông minh."
      </ArtQuote>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {["HappySmartLight", "NguoiCheTao", "NCTA", "LedDance", "TrongLED", "CoLED", "DaoCuLED"].map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
            #{tag}
          </span>
        ))}
      </div>
    </ArticleLayout>
  );
}
