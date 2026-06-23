import { Heart, Users, Sparkles, Target, Music, Lightbulb, Star } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import ArticleImageGallery from "../ArticleImageGallery";
import ArticleVideoGallery from "../ArticleVideoGallery";

const REL = "https://github.com/happysmartlight/happysmartlight.github.io/releases/download/DATA_MEDIA";

const STAGE_VIDEOS = [
  { src: `${REL}/MoonLight.Dance.mp4`, title: "Video intro team Moonlight Dance" },
  { src: `${REL}/gala-cuoi-nam-MOONLIGHT.mp4`, title: "Gala cuối năm 2025" },
  { src: `${REL}/led-dance-nguoi-VIETNAM-MoonLight.mp4`, title: "LED Dance — Người Việt Nam" },
  { src: `${REL}/Moonlight-led-dance.mp4`, title: "Moonlight LED Dance" },
];

const STAGE_IMAGES = [
  { src: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/trong-nuoc-1.jpg", caption: "Các vũ công cùng màn trình diễn trống nước LED" },
  { src: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/trong-nuoc.jpg", caption: "Trống nước LED ARGB đồng bộ âm nhạc" },
  { src: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/giap-led.jpg", caption: "Bộ giáp LED được MoonLight Dance chế tạo công phu" },
  { src: "/img/partner/partner-MOONLIGHT-DANCE-STUDIO/led_windown.jpg", caption: "Màn trình diễn của MoonLight Dance tại Bình Dương" },
];

export default function PartnerMoonlight() {
  return (
    <ArticleLayout
      title="Moonlight Dance Studio × Happy Smart Light — Hợp Tác Chiến Lược"
      eyebrow="HAPPY SMART LIGHT — PARTNER × MOONLIGHT DANCE"
      description="Moonlight Dance Studio chính thức trở thành đối tác chiến lược của Happy Smart Light — kết hợp nghệ thuật vũ đạo và công nghệ LED thông minh."
      bannerImg="/img/partner/partner-MOONLIGHT-DANCE-STUDIO/partner-MOONLIGHT-DANCE-STUDIO-banner.jpg"
      accent="pink"
      path="/doi-tac/partner-Moonlight-dance/"
      backPath="/doi-tac/"
      backLabel="ĐỐI TÁC"
    >
      {/* Intro */}
      <Callout icon={<Heart className="w-5 h-5 text-neon-pink-bright" />}>
        <p>
          <strong className="text-white">Moonlight Dance Studio</strong> — một trong những trung tâm đào tạo vũ đạo chuyên nghiệp và giàu cảm hứng — chính thức trở thành <strong className="text-white">đối tác chiến lược</strong> của <strong className="text-white">Happy Smart Light</strong> — thương hiệu hàng đầu về giải pháp chiếu sáng thông minh tại Việt Nam.
        </p>
      </Callout>

      {/* Partnership Highlight */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Trống Nước LED ARGB — Trình Diễn Đỉnh Cao</SectionHeading>
        <p>
          MoonLight Dance Studio kết hợp cùng Happy Smart Light mang đến màn trình diễn <strong className="text-white">trống nước LED ARGB</strong> đầy sắc màu và công nghệ. Những chiếc trống nước phát sáng được lập trình hiệu ứng ánh sáng rực rỡ theo nhạc, sử dụng <strong className="text-white">mạch điều khiển LED ARGB do HSL phát triển</strong>.
        </p>
        <p>
          Ánh sáng chuyển màu linh hoạt, hiệu ứng bắt mắt kết hợp với vũ đạo cuốn hút khiến khán giả không thể rời mắt!
        </p>
      </section>

      {/* Video Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Video Trình Diễn Của Moonlight Dance</SectionHeading>
        <p>
          Cùng xem những màn trình diễn ấn tượng của <strong className="text-white">Moonlight Dance</strong> — từ tiết mục giới thiệu đội, gala cuối năm cho đến các màn <strong className="text-white">LED Dance</strong> kết hợp công nghệ ánh sáng của Happy Smart Light.
        </p>
        <ArticleVideoGallery videos={STAGE_VIDEOS} columns={2} accent="pink" />
      </section>

      {/* Image Gallery */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Hình Ảnh Thực Tế Từ Sân Khấu</SectionHeading>
        <ArticleImageGallery images={STAGE_IMAGES} columns={2} />
      </section>

      {/* Core Values */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Cùng Nhau Kiến Tạo Giá Trị</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Users className="w-4 h-4 text-neon-pink-bright shrink-0" />}
            title="Moonlight Dance Studio"
            desc="Cam kết mang đến môi trường học tập đầy cảm hứng cho trẻ em thông qua các lớp nhảy hiện đại, năng động và sáng tạo."
          />
          <FeatureCard
            icon={<Lightbulb className="w-4 h-4 text-neon-pink-bright shrink-0" />}
            title="Happy Smart Light"
            desc="Cung cấp hệ thống ánh sáng thông minh, tiết kiệm năng lượng — tối ưu không gian học tập, biểu diễn và rèn luyện thể chất."
          />
        </div>
      </section>

      {/* Goals */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Mục Tiêu Hợp Tác</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Sparkles className="w-4 h-4 text-amber-400 shrink-0" />}
            title="Không gian học tập lý tưởng"
            desc="Sử dụng đèn LED RGB, đèn sân khấu tương tác thông minh, giúp tăng cảm hứng và hiệu quả luyện tập."
          />
          <FeatureCard
            icon={<Music className="w-4 h-4 text-purple-400 shrink-0" />}
            title="Hiệu ứng sân khấu sống động"
            desc="Kết hợp hiệu ứng ánh sáng tự động thay đổi theo nhạc, tạo buổi biểu diễn mini hoành tráng ngay trong phòng tập."
          />
          <FeatureCard
            icon={<Target className="w-4 h-4 text-emerald-400 shrink-0" />}
            title="Lan tỏa giá trị cộng đồng"
            desc="Cùng tổ chức sự kiện nghệ thuật, workshop trải nghiệm vũ đạo — công nghệ, lan tỏa thông điệp sống đam mê."
          />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Cùng Chờ Đón Những Dự Án Sắp Tới!</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400">
            Sự kết hợp giữa nghệ thuật và công nghệ sẽ mang đến những trải nghiệm tuyệt vời cho học viên và cộng đồng yêu nhảy múa! Theo dõi fanpage để không bỏ lỡ các chương trình, show diễn và hoạt động chung.
          </p>
        </InfoCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <a href="https://www.facebook.com/PhiToanManage" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-pink/20 transition-colors no-underline group">
            <span className="text-xs font-mono text-slate-500">MOONLIGHT DANCE STUDIO</span>
            <p className="text-sm text-neon-pink-bright group-hover:text-white transition-colors mt-1">Facebook chính thức →</p>
          </a>
          <a href="https://happysmartlight.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-neon-blue/20 transition-colors no-underline group">
            <span className="text-xs font-mono text-slate-500">HAPPY SMART LIGHT</span>
            <p className="text-sm text-neon-blue-bright group-hover:text-white transition-colors mt-1">happysmartlight.com →</p>
          </a>
        </div>
      </section>

      <ArtQuote accent="pink">
        "Khi ánh sáng và đam mê cùng nhịp, mọi bước nhảy đều trở nên rực rỡ."
      </ArtQuote>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {["HappySmartLight", "DanceWithLight", "MoonlightDance", "LightingForStage", "VũĐoànViệtNam"].map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
            #{tag}
          </span>
        ))}
      </div>
    </ArticleLayout>
  );
}
