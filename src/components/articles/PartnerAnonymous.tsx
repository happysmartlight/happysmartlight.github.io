import { ShieldCheck, Eye, Heart, Users, Palette, Wrench, Sparkles, Lock } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";

export default function PartnerAnonymous() {
  return (
    <ArticleLayout
      title="Hợp Tác Cùng Cộng Đồng Vũ Đoàn — HSL Tôn Vinh Mọi Phong Cách Biểu Diễn"
      eyebrow="HAPPY SMART LIGHT — ANONYMOUS PARTNERS"
      description="Happy Smart Light tự hào đồng hành cùng hàng chục nhóm nhảy, vũ đoàn, và nghệ sĩ biểu diễn. Cam kết bảo mật tuyệt đối thông tin khách hàng."
      bannerImg="/img/service/partner-anonymous/photo-anonymous.jpg"
      accent="purple"
      path="/service/partner-anonymous/"
      backPath="/service/"
      backLabel="DỊCH VỤ"
    >
      {/* Intro */}
      <Callout icon={<Eye className="w-5 h-5 text-purple-400" />}>
        <p>
          Trong hành trình phát triển thiết bị điều khiển ánh sáng nghệ thuật, <strong className="text-white">Happy Smart Light</strong> rất vinh dự khi được đồng hành cùng <strong className="text-white">hàng chục nhóm nhảy, vũ đoàn, và nghệ sĩ biểu diễn</strong> từ khắp mọi miền đất nước và quốc tế. Với sự tôn trọng tuyệt đối dành cho quyền riêng tư, HSL gọi chung nhóm khách hàng đặc biệt này bằng tên: <strong className="text-purple-300">"Anonymous"</strong>.
        </p>
      </Callout>

      {/* Security Section */}
      <section className="space-y-3">
        <SectionHeading accent="purple">Bảo Mật Thông Tin — Cam Kết Từ HSL</SectionHeading>
        <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/15 flex items-start gap-4">
          <Lock className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 space-y-2">
            <p>
              Trong nghệ thuật biểu diễn — đặc biệt với những cá nhân hoặc nhóm ẩn danh — <strong className="text-white">quyền riêng tư là yếu tố sống còn</strong>. HSL <strong className="text-purple-300">cam kết giữ kín tuyệt đối mọi thông tin</strong> liên quan đến khách hàng, từ danh tính, lịch sử mua hàng, cho đến các dự án biểu diễn — trừ khi có sự cho phép rõ ràng bằng văn bản.
            </p>
            <p className="font-semibold text-purple-300">
              Bạn muốn ẩn danh? HSL là nơi bạn có thể tin tưởng tuyệt đối.
            </p>
          </div>
        </div>
      </section>

      {/* Fair Policy */}
      <section className="space-y-3">
        <SectionHeading accent="purple">Ưu Đãi Công Bằng — Không Có "Hàng Riêng" Hay "Ngoại Lệ"</SectionHeading>
        <InfoCard>
          <p className="text-xs text-slate-400">
            HSL tin rằng <strong className="text-white">mọi khách hàng — dù công khai hay ẩn danh — đều xứng đáng nhận được chất lượng dịch vụ như nhau</strong>. Không phân biệt danh tiếng, quy mô nhóm hay tần suất hợp tác — mọi chính sách ưu đãi, hậu mãi, hỗ trợ kỹ thuật đều được áp dụng công bằng và minh bạch.
          </p>
        </InfoCard>
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: "📦", label: "Đặt hàng nhanh" },
            { emoji: "📬", label: "Giao hàng chuẩn" },
            { emoji: "🛠", label: "Hỗ trợ kỹ thuật 24/7" },
          ].map(({ emoji, label }) => (
            <div key={label} className="text-center p-3 rounded-xl bg-slate-900/40 border border-white/5">
              <span className="text-xl">{emoji}</span>
              <p className="text-[11px] text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="space-y-3">
        <SectionHeading accent="purple">Niềm Tin Từ Bạn — Động Lực Từ HSL</SectionHeading>
        <ArtQuote accent="purple">
          "Chúng tôi không cần spotlight, chỉ cần ánh sáng đủ chất lượng." — Một nhóm biểu diễn giấu tên
        </ArtQuote>
        <p>
          Không có điều gì khiến chúng tôi tự hào hơn việc sản phẩm của mình xuất hiện trên sân khấu, trong từng buổi diễn rực rỡ ánh sáng. Chúng tôi không chỉ cung cấp thiết bị — <strong className="text-white">chúng tôi đang truyền cảm hứng biểu diễn</strong>.
        </p>
      </section>

      {/* Services */}
      <section className="space-y-3">
        <SectionHeading accent="purple">HSL — Người Bạn Đồng Hành Đáng Tin Cậy</SectionHeading>
        <p className="text-xs text-slate-400">
          Dù bạn là một <strong className="text-white">vũ đoàn chuyên nghiệp</strong>, một nhóm <strong className="text-white">biểu diễn đường phố</strong>, hay <strong className="text-white">một tập thể ẩn danh</strong> — HSL luôn sẵn sàng đồng hành:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <FeatureCard
            icon={<Palette className="w-4 h-4 text-purple-400 shrink-0" />}
            title="Tư vấn thiết kế"
            desc="Thiết kế ánh sáng theo yêu cầu, tối ưu cho từng loại hình biểu diễn."
          />
          <FeatureCard
            icon={<Wrench className="w-4 h-4 text-purple-400 shrink-0" />}
            title="Hỗ trợ kỹ thuật"
            desc="Tùy biến hiệu ứng theo từng bài nhảy, hỗ trợ setup sân khấu."
          />
          <FeatureCard
            icon={<Sparkles className="w-4 h-4 text-purple-400 shrink-0" />}
            title="Thiết bị hiện đại"
            desc="Cung cấp thiết bị điều khiển ánh sáng dễ dùng, tối ưu cho biểu diễn."
          />
        </div>
      </section>

      <ArtQuote accent="purple">
        HSL luôn ở đây — để làm cho từng bước nhảy của bạn thêm rực rỡ trong ánh sáng của đam mê.
      </ArtQuote>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {["HappySmartLight", "DanceWithLight", "AnonymousSupport", "LightingForStage", "VũĐoànViệtNam", "GlobalDancePartner"].map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400">
            #{tag}
          </span>
        ))}
      </div>
    </ArticleLayout>
  );
}
