import { useState, type ReactNode } from "react";
import { AlertTriangle, Cable, CircleHelp, Download, Eye, KeyRound, Lightbulb, RotateCcw, Save, ShieldCheck, Unplug, Usb, Wifi } from "lucide-react";
import ArticleLayout, { SectionHeading, InfoCard, FeatureCard, ArtQuote, Callout } from "../ArticleLayout";
import ImageZoomLightbox, { type ZoomGalleryItem } from "../ImageZoomLightbox";
import { WINDOWS_TOOL_URL } from "../../windowsTool";

const IMG = "/img/post-news/nap-firmware";
const ZALO_URL = "https://zalo.me/84784140494";

const PHOTOS: ZoomGalleryItem[] = [
  { file: "12-ota-kiem-tra.png", label: "OTA: bấm Kiểm tra cập nhật" },
  { file: "13-ota-nhap-ma.png", label: "OTA: nhập mã OTA rồi bấm Mở khoá OTA" },
  { file: "14-ota-da-mo-khoa.png", label: "OTA: bấm Tải và nạp OTA" },
  { file: "15-ota-xac-nhan.png", label: "OTA: bấm Yes để xác nhận" },
  { file: "16-ota-dang-nap.png", label: "OTA: hộp tiến trình đang nạp" },
  { file: "17-ota-xong.png", label: "OTA: mạch đã ở bản mới nhất" },
  { file: "02-khong-thay-cong.png", label: "Dây không truyền dữ liệu: Tool không thấy cổng COM" },
  { file: "00-sao-luu-cau-hinh.png", label: "Sao lưu cấu hình về máy tính" },
  { file: "01-menu-cong-cu.png", label: "Mở menu Công cụ, chọn Nạp Firmware / Cấu hình WiFi" },
  { file: "03-chon-cong.png", label: "Chọn cổng COM của mạch" },
  { file: "04-xac-minh.png", label: "Kiểm tra mạch rồi bấm Tải & Nạp Firmware" },
  { file: "04b-hop-xac-nhan.png", label: "Hộp xác nhận trước khi xoá mạch" },
  { file: "05-dang-nap.png", label: "Đang nạp firmware" },
  { file: "06-nap-thanh-cong.png", label: "Nạp firmware thành công" },
  { file: "07-quet-wifi.png", label: "Quét WiFi và chọn tên mạng" },
  { file: "08-nhap-mat-khau.png", label: "Nhập mật khẩu rồi bấm Gửi WiFi" },
  { file: "09-wifi-thanh-cong.png", label: "Cấu hình WiFi thành công" },
  { file: "11-khoi-phuc-cau-hinh.png", label: "Khôi phục cấu hình từ file sao lưu" },
  { file: "10-kiem-tra-loai-led.png", label: "Kiểm tra loại LED và số LED" },
].map(({ file, label }) => ({ url: `${IMG}/${file}`, label, alt: label }));

const TROUBLES = [
  {
    sign: "Ô Cổng COM hiện “(không tìm thấy cổng COM)”",
    fix: "Thường do dây chỉ sạc. Đổi dây có truyền dữ liệu trước, sau đó thử cổng USB khác của máy tính, rồi bấm 🔄 Làm mới cạnh ô Cổng COM. Vẫn không thấy cổng thì liên hệ Happy Smart Light.",
  },
  {
    sign: "LED sáng trắng và đứng hình, mạch không phản hồi sau khi nạp",
    fix: "Tháo LED hoặc ngắt nguồn LED ngay, rút dây Type-C rồi cắm lại. Cấu hình đúng loại LED (phần Khôi phục) rồi mới gắn LED lại.",
  },
  {
    sign: "Báo “Không mở được COM…”, hoặc cổng COM lúc có lúc mất",
    fix: "Mạch đang khởi động lại hoặc thiếu nguồn. Tháo LED, rút dây Type-C rồi cắm lại, đợi khoảng 15 giây, bấm 🔄 Làm mới rồi thử lại.",
  },
  {
    sign: "Báo “Mất kết nối với mạch qua USB”, hoặc hộp thoại đứng ở “Đang xác minh & quét…” và các nút bị khoá",
    fix: "Mạch mất điện hoặc mất kết nối USB giữa chừng. Kiểm tra dây và nguồn, tháo LED nếu vừa nạp xong, rút dây cắm lại rồi thử lại. Nếu các nút vẫn khoá, đóng hộp thoại rồi mở lại từ menu Công cụ.",
  },
  {
    sign: "Báo “Không tìm thấy mạng WiFi nào”",
    fix: "Bấm quét lại lần nữa. Bạn cũng có thể tự gõ tên WiFi vào ô, không bắt buộc phải quét.",
  },
  {
    sign: "Báo “Tạm khóa”",
    fix: "Tool đã xác minh mạch không thành công nhiều lần. Đợi hết thời gian Tool báo, kiểm tra lại dây và cổng COM rồi thử lại.",
  },
  {
    sign: "Báo “Mã OTA không đúng”",
    fix: "Nhập lại mã, chú ý chữ hoa và chữ thường. Nếu vẫn không được, liên hệ Happy Smart Light.",
  },
  {
    sign: "Báo “Vân tay thiết bị không khớp”",
    fix: "Tool không cho phép nạp bản firmware này cho mạch của bạn. Đừng thử lại nhiều lần, hãy liên hệ Happy Smart Light.",
  },
];

function Shot({ file, open, full = false }: { file: string; open: (url: string) => void; full?: boolean }) {
  const url = `${IMG}/${file}`;
  const alt = PHOTOS.find((photo) => photo.url === url)?.alt ?? "Ảnh chụp màn hình Tool ARGB HSL";
  return (
    <div className={`mt-2 rounded-lg overflow-hidden border border-white/10 ${full ? "" : "max-w-xl"}`}>
      <button
        type="button"
        onClick={() => open(url)}
        aria-label={`Xem lớn: ${alt}`}
        className="group/zoom relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/60"
      >
        <img src={url} alt={alt} loading="lazy" className="w-full h-auto" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Eye className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-white/15 transition-colors">
      <span className="font-mono text-[10px] text-neon-pink-bright font-bold bg-neon-pink/10 px-2.5 py-1 rounded-lg shrink-0 h-fit">
        B.{n}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-white">{title}</h4>
        <div className="text-xs text-slate-400 mt-1 space-y-1.5">{children}</div>
      </div>
    </div>
  );
}

function PrepCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <InfoCard>
      <h3 className="font-semibold text-white text-xs flex items-center gap-2 mb-2">
        <span className="shrink-0">{icon}</span>
        {title}
      </h3>
      <div className="text-xs text-slate-400 space-y-1.5">{children}</div>
    </InfoCard>
  );
}

const iconClass = "w-4 h-4 text-neon-pink-bright";
const strong = "text-white";

export default function ArticleNapFirmwareWifi() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  const open = (url: string) => {
    const index = PHOTOS.findIndex((photo) => photo.url === url);
    if (index < 0) return;
    setActiveIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <ArticleLayout
      title="Nạp Firmware Mới Và Cấu Hình WiFi Cho Mạch ARGB HSL"
      metaTitle="Nạp Firmware & Cấu Hình WiFi Mạch ARGB HSL"
      eyebrow="HAPPY SMART LIGHT — HƯỚNG DẪN KỸ THUẬT"
      description="Hướng dẫn từng bước cập nhật firmware cho mạch ARGB HSL bằng OTA không dây hoặc qua cổng Type-C, cấu hình WiFi bằng Tool ARGB HSL, và những việc cần chuẩn bị để không mất dữ liệu."
      bannerImg={`${IMG}/banner.png`}
      accent="pink"
      path="/post-news/nap-firmware-cau-hinh-wifi-argb-hsl/"
      backPath="/post-news/"
      backLabel="TIN TỨC"
    >
      <Callout icon={<Lightbulb className="w-5 h-5 text-neon-pink-bright" />}>
        <p>
          Có <strong className={strong}>2 cách cập nhật firmware</strong> cho mạch ARGB HSL: <strong className={strong}>OTA không dây</strong> ngay trong Tool, hoặc <strong className={strong}>cắm dây Type-C</strong>. Nếu mạch vẫn đang vào mạng bình thường, hãy dùng OTA vì cách này giữ nguyên cấu hình và dữ liệu của bạn.
        </p>
      </Callout>

      {/* So sánh */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Nên Chọn Cách Nào?</SectionHeading>
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-xs text-left min-w-[460px]">
            <thead className="bg-slate-900/60 text-white">
              <tr>
                <th className="p-3 font-semibold" />
                <th className="p-3 font-semibold">OTA không dây</th>
                <th className="p-3 font-semibold">Nạp qua Type-C</th>
              </tr>
            </thead>
            <tbody className="text-slate-400 divide-y divide-white/5">
              <tr>
                <td className="p-3 text-white">Dùng khi</td>
                <td className="p-3">Mạch đang online trong Tool</td>
                <td className="p-3">Mạch không vào được mạng, hoặc cần cài lại từ đầu</td>
              </tr>
              <tr>
                <td className="p-3 text-white">Cần có</td>
                <td className="p-3">Máy tính và mạch chung một mạng, có Internet, có mã OTA do Happy Smart Light cung cấp</td>
                <td className="p-3">Dây Type-C truyền dữ liệu, máy tính có Internet</td>
              </tr>
              <tr>
                <td className="p-3 text-white">Cấu hình, preset, ảnh</td>
                <td className="p-3 text-emerald-400">Giữ nguyên</td>
                <td className="p-3 text-red-300">Bị xoá sạch</td>
              </tr>
              <tr>
                <td className="p-3 text-white">WiFi của mạch</td>
                <td className="p-3 text-emerald-400">Giữ nguyên</td>
                <td className="p-3 text-red-300">Phải cấu hình lại</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400">
          Chưa có Tool? <a href={WINDOWS_TOOL_URL} className="text-neon-pink-bright hover:underline inline-flex items-center gap-1"><Download className="w-3.5 h-3.5" />Tải ARGB HSL Windows Tool</a>. Mọi ảnh trong bài đều bấm vào để xem lớn.
        </p>
      </section>

      {/* OTA */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Cách 1: Cập Nhật OTA Không Dây</SectionHeading>
        <p className="text-xs text-slate-400">
          Mở Tool và đợi mạch hiện <strong className={strong}>Online</strong> trong danh sách. Máy tính tải firmware từ Internet rồi gửi sang mạch qua mạng, nên máy tính và mạch cần cùng kết nối một bộ phát WiFi.
        </p>
        <div className="space-y-3">
          <Step n={1} title="Kiểm tra bản mới">
            <p>Vào tab <strong className={strong}>Cấu hình phần cứng</strong>, chọn mạch ở cột bên trái, rồi bấm <strong className={strong}>Kiểm tra cập nhật</strong>.</p>
            <p>Nếu Tool báo “Thiết bị đã ở cùng VID với server” thì mạch đã ở bản mới nhất, bạn không cần làm gì thêm. VID là mã phiên bản firmware.</p>
            <Shot file="12-ota-kiem-tra.png" open={open} />
          </Step>
          <Step n={2} title="Nhập mã OTA để mở khoá">
            <p>Khi có bản mới mà khoá OTA đang bật, Tool mở sẵn ô <strong className={strong}>Mã OTA</strong>. Nhập mã rồi bấm <strong className={strong}>Mở khoá OTA</strong>. Nếu Tool báo “Có thể tải và nạp OTA” thì khoá đã tắt, bạn sang luôn bước 3.</p>
            <div className="mt-2 p-3 rounded-lg bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center gap-3 max-w-xl">
              <img
                src={`${IMG}/qr-zalo-hsl.png`}
                alt="Mã QR Zalo của Happy Smart Light"
                loading="lazy"
                width={112}
                height={112}
                className="w-28 h-28 rounded-md bg-white shrink-0"
              />
              <div className="space-y-1">
                <p className="flex items-center gap-1.5 font-semibold text-white"><KeyRound className="w-3.5 h-3.5 text-neon-pink-bright shrink-0" />Mã OTA do Happy Smart Light cung cấp</p>
                <p>Quét mã QR bằng Zalo để nhắn tin xin mã, hoặc gọi hotline <strong className={strong}>0784 140 494</strong>.</p>
                <p>Đang xem trên điện thoại? <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="text-neon-pink-bright hover:underline">Mở chat Zalo</a>.</p>
              </div>
            </div>
            <Shot file="13-ota-nhap-ma.png" open={open} />
          </Step>
          <Step n={3} title="Bấm Tải và nạp OTA">
            <p>Mở khoá xong, nút <strong className={strong}>Tải và nạp OTA</strong> sáng lên ở góc phải. Bấm nút này.</p>
            <Shot file="14-ota-da-mo-khoa.png" open={open} />
          </Step>
          <Step n={4} title="Xác nhận">
            <p>Tool hỏi lại trước khi nạp. Bấm <strong className={strong}>Yes</strong>. Tool tự lưu một bản sao cấu hình trên máy tính trước khi nạp.</p>
            <Shot file="15-ota-xac-nhan.png" open={open} />
          </Step>
          <Step n={5} title="Chờ nạp xong, không tắt nguồn mạch">
            <p>Thường chưa tới 1 phút. Mạch sẽ tự khởi động lại, hộp tiến trình tự đóng và Tool tải lại cấu hình của mạch.</p>
            <Shot file="16-ota-dang-nap.png" open={open} />
          </Step>
          <Step n={6} title="Kiểm tra lại">
            <p>Bấm <strong className={strong}>Kiểm tra cập nhật</strong> một lần nữa. Dòng “Thiết bị đã ở cùng VID với server” nghĩa là mạch đã chạy bản mới nhất.</p>
            <p>Sau bước này <strong className={strong}>Khoá OTA</strong> của mạch ở trạng thái Tắt.</p>
            <Shot file="17-ota-xong.png" open={open} />
          </Step>
        </div>
        <p className="text-[11px] text-slate-500">Ảnh chụp khi thử nghiệm, số phiên bản 3.0.1 chỉ để minh hoạ. Máy của bạn sẽ hiện đúng phiên bản thật.</p>
      </section>

      {/* Type-C */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Cách 2: Nạp Qua Cổng Type-C</SectionHeading>
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 space-y-1.5">
            <p><strong className="text-red-300">Cách này xoá sạch mạch:</strong> WiFi, loại LED, số LED, preset và toàn bộ ảnh đều mất, mạch trở về cấu hình mặc định.</p>
            <p>Các bản Tool sau 3.12.0 sẽ hỏi xác nhận trước khi xoá. <strong className={strong}>Bản 3.12.0 trở về trước chạy ngay khi bấm, không hỏi lại</strong>. Hãy làm xong phần chuẩn bị bên dưới trước khi bấm.</p>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-white pt-1">Chuẩn bị trước khi nạp</h3>
        <PrepCard icon={<Cable className={iconClass} />} title="1. Dây Type-C có truyền dữ liệu, không dùng dây chỉ sạc">
          <p>Nhiều dây giá rẻ, dây đi kèm quạt mini hay đèn sạc chỉ có đường điện. Cắm dây này mạch vẫn có điện nên rất dễ nhầm, nhưng máy tính không nhận ra mạch.</p>
          <p><strong className={strong}>Cách nhận biết:</strong> mạch đã có điện mà ô Cổng COM vẫn báo “(không tìm thấy cổng COM)” thì hãy đổi dây trước tiên. Dây đi kèm điện thoại hoặc dây ghi rõ có truyền dữ liệu thường dùng được.</p>
          <Shot file="02-khong-thay-cong.png" open={open} />
        </PrepCard>
        <PrepCard icon={<Unplug className={iconClass} />} title="2. Tháo LED hoặc ngắt nguồn LED">
          <p>Sau khi xoá, mạch quay về loại LED mặc định là WS2812B. Nếu bạn dùng LED khác, ví dụ <strong className={strong}>LED POI loại APA102 có 2 dây data và clock</strong>, mà vẫn để LED gắn trên mạch thì LED có thể sáng trắng và đứng hình, gây sụt áp làm treo chip. Khi đó bạn không thể cấu hình tiếp cho tới khi tháo LED.</p>
          <p>Chỉ gắn LED lại sau khi đã khôi phục đúng cấu hình ở phần cuối bài.</p>
        </PrepCard>
        <PrepCard icon={<Save className={iconClass} />} title="3. Sao lưu cấu hình và giữ lại ảnh gốc">
          <p>Nếu mạch còn online, vào tab <strong className={strong}>Cấu hình phần cứng</strong> và bấm <strong className={strong}>Sao lưu cấu hình</strong> để lưu file về máy tính.</p>
          <p>File này chỉ chứa cấu hình, <strong className={strong}>không có preset và ảnh</strong>. Hãy giữ lại file ảnh gốc để gửi lại sau khi nạp, và ghi lại loại LED, số LED nếu mạch không online.</p>
          <Shot file="00-sao-luu-cau-hinh.png" open={open} />
        </PrepCard>
        <PrepCard icon={<Wifi className={iconClass} />} title="4. Tên và mật khẩu WiFi">
          <p>Bạn sẽ cần nhập lại sau khi nạp. Mạch chỉ dùng được <strong className={strong}>WiFi 2.4 GHz</strong>.</p>
        </PrepCard>
        <PrepCard icon={<Usb className={iconClass} />} title="5. Máy tính Windows có Internet">
          <p>Tool tự tải đúng firmware cho dòng mạch của bạn nên máy tính cần có Internet. Nên cắm dây thẳng vào cổng USB của máy tính và không rút dây trong lúc nạp.</p>
        </PrepCard>

        <h3 className="text-sm font-semibold text-white pt-1">Các bước nạp</h3>
        <div className="space-y-3">
          <Step n={1} title="Mở công cụ nạp">
            <p>Cắm mạch vào máy tính, rồi trên thanh menu của Tool chọn <strong className={strong}>Công cụ → Nạp Firmware / Cấu hình WiFi (ARGB HSL)</strong>.</p>
            <Shot file="01-menu-cong-cu.png" open={open} />
          </Step>
          <Step n={2} title="Chọn cổng COM của mạch">
            <p>Chọn cổng ở ô <strong className={strong}>Cổng COM</strong>. Số cổng trên mỗi máy mỗi khác. Nếu vừa cắm dây mà chưa thấy cổng, bấm <strong className={strong}>🔄 Làm mới</strong> ở ngay bên cạnh.</p>
            <Shot file="03-chon-cong.png" open={open} />
          </Step>
          <Step n={3} title="Kiểm tra mạch, rồi bấm nạp">
            <p>Bấm <strong className={strong}>🔍 Làm mới</strong> ở góc dưới. Tool phải báo <strong className={strong}>Thiết bị hợp lệ</strong> và đúng dòng mạch của bạn. Mạch có thể khởi động lại lúc này, LED chớp tắt là bình thường.</p>
            <p>Nếu Tool báo “đã là bản mới nhất” mà mạch vẫn hoạt động bình thường thì bạn không cần nạp. Nếu vẫn cần nạp lại, kiểm tra xong phần chuẩn bị rồi bấm <strong className={strong}>Tải &amp; Nạp Firmware</strong>.</p>
            <Shot file="04-xac-minh.png" open={open} />
            <p>Từ các bản Tool sau 3.12.0, Tool hiện thêm hộp xác nhận như dưới đây. Đọc kỹ rồi bấm <strong className={strong}>Xoá sạch và nạp</strong> để tiếp tục, hoặc <strong className={strong}>Huỷ</strong> để dừng lại.</p>
            <Shot file="04b-hop-xac-nhan.png" open={open} />
          </Step>
          <Step n={4} title="Chờ thanh tiến trình chạy hết, không rút dây">
            <p>Tool tải firmware, xoá bộ nhớ rồi nạp. Trên mạch thử nghiệm, toàn bộ mất khoảng 20 giây.</p>
            <Shot file="05-dang-nap.png" open={open} />
          </Step>
          <Step n={5} title="Nạp xong">
            <p>Khi Tool báo <strong className={strong}>Nạp firmware thành công</strong>, bấm <strong className={strong}>OK</strong>. Giữ nguyên dây và chuyển sang cấu hình WiFi.</p>
            <Shot file="06-nap-thanh-cong.png" open={open} />
          </Step>
        </div>
      </section>

      {/* WiFi */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Cấu Hình WiFi Cho Mạch</SectionHeading>
        <Callout icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}>
          <p>Riêng bước này <strong className={strong}>không xoá dữ liệu</strong>. Khi bạn đổi modem, đổi mật khẩu WiFi hoặc mạch không vào được mạng, chỉ cần cắm dây Type-C rồi làm các bước dưới đây, không phải nạp lại firmware.</p>
        </Callout>
        <div className="space-y-3">
          <Step n={1} title="Quét WiFi và chọn tên mạng">
            <p>Mở tab <strong className={strong}>Cấu hình WiFi</strong>. Nếu vừa nạp firmware, đợi khoảng 15 giây cho mạch khởi động xong, rồi bấm <strong className={strong}>Quét WiFi &amp; xác minh thiết bị</strong> và chọn mạng trong danh sách.</p>
            <p>Nếu báo không tìm thấy mạng, bấm quét lại, hoặc tự gõ tên WiFi vào ô.</p>
            <Shot file="07-quet-wifi.png" open={open} />
          </Step>
          <Step n={2} title="Nhập mật khẩu và gửi">
            <p>Nhập mật khẩu WiFi rồi bấm <strong className={strong}>Gửi WiFi</strong>. Tick <strong className={strong}>Hiện</strong> nếu muốn kiểm tra lại mật khẩu vừa gõ.</p>
            <Shot file="08-nhap-mat-khau.png" open={open} />
          </Step>
          <Step n={3} title="Hoàn tất">
            <p>Tool báo <strong className={strong}>Cấu hình WiFi thành công</strong> kèm địa chỉ của mạch, dạng <code className="text-slate-300">http://192.168.x.x</code>. Bấm <strong className={strong}>OK</strong>. Sau đó mạch sẽ hiện trong danh sách thiết bị của Tool.</p>
            <Shot file="09-wifi-thanh-cong.png" open={open} />
          </Step>
        </div>
      </section>

      {/* Khôi phục */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Khôi Phục Cấu Hình Sau Khi Nạp Type-C</SectionHeading>
        <p className="text-xs text-slate-400">Làm phần này khi mạch đã online và <strong className={strong}>LED vẫn chưa gắn lại</strong>.</p>
        <FeatureCard
          icon={<RotateCcw className="w-4 h-4 text-neon-pink-bright" />}
          title="Có file sao lưu: dùng tab Sao chép cấu hình"
          desc="Bấm Chọn file backup và chọn file đã lưu, tick mạch cần khôi phục, đặt Tên và mDNS cho mạch (hoặc bấm Đánh số tự động), rồi bấm Tải cấu hình lên. Mạch sẽ khởi động lại với cấu hình cũ, tên mạch đổi theo tên trong bảng."
        />
        <Shot file="11-khoi-phuc-cau-hinh.png" open={open} full />
        <FeatureCard
          icon={<Lightbulb className="w-4 h-4 text-neon-pink-bright" />}
          title="Không có file sao lưu: chỉnh tay trong tab Cấu hình phần cứng"
          desc="Mạch 4X sau khi nạp có 4 port, mỗi port 30 LED WS2812B. Chỉnh lại Loại LED và Số LED của từng port đúng với LED bạn đang dùng, rồi bấm Lưu cấu hình."
        />
        <Shot file="10-kiem-tra-loai-led.png" open={open} full />
        <Callout icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} variant="warning">
          <p>Kiểm tra lại <strong className="text-amber-300">Loại LED</strong> rồi mới gắn LED. Cuối cùng, gửi lại ảnh và tạo lại preset vì các dữ liệu này không nằm trong file sao lưu.</p>
        </Callout>
      </section>

      {/* Xử lý lỗi */}
      <section className="space-y-3">
        <SectionHeading accent="pink">Gặp Lỗi Thì Làm Gì?</SectionHeading>
        <div className="space-y-2">
          {TROUBLES.map(({ sign, fix }) => (
            <InfoCard key={sign}>
              <h4 className="text-xs font-semibold text-white flex items-start gap-2">
                <CircleHelp className="w-4 h-4 text-neon-pink-bright shrink-0 mt-px" />
                {sign}
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 pl-6">{fix}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <ArtQuote accent="pink">
        Làm theo hướng dẫn mà vẫn chưa được? Gọi hoặc nhắn Zalo cho Happy Smart Light qua số 0784 140 494, kèm ảnh chụp màn hình Tool để được hỗ trợ nhanh hơn.
      </ArtQuote>

      <ImageZoomLightbox
        open={isViewerOpen}
        items={PHOTOS}
        currentIndex={activeIndex}
        title="Ảnh hướng dẫn nạp firmware và cấu hình WiFi"
        onClose={() => setIsViewerOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </ArticleLayout>
  );
}
