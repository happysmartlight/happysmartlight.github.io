import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Cpu, Columns, Layers, Radio, Sliders, Play, Check, Sparkles, Battery, Monitor, Code, Settings, AlertTriangle, Hammer, Zap, Wifi, Eye, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw, Share2 } from "lucide-react";
import { motion } from "motion/react";

interface ProductDetailsPageProps {
  productId: string;
  onBack: () => void;
  onQuoteRequested: (productName: string) => void;
  onNavigateToProduct: (id: string) => void;
}

export default function ProductDetailsPage({ productId, onBack, onQuoteRequested, onNavigateToProduct }: ProductDetailsPageProps) {
  const [activeView, setActiveView] = useState<"product" | "wiring">("product");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedWiringIndex, setSelectedWiringIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  // "copied" hiển thị khi máy không hỗ trợ Web Share API và ta fallback copy link.
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  // Zoom modal pan/scale state
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Scroll to top on load & reset state
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveView("product");
    setSelectedImageIndex(0);
    setSelectedWiringIndex(0);
    setIsZoomed(false);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [productId]);

  // Handle Escape key + lock background scroll while zoom modal is open
  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isZoomed]);

  const productsDetailedData: Record<string, {
    name: string;
    price: string;
    tagline: string;
    description: string;
    badge: string;
    glowColor: "pink" | "blue" | "purple" | "yellow";
    heroSpecs: { label: string; value: string }[];
    fullSpecs: { category: string; list: { label: string; value: string }[] }[];
    architectures: string[];
    technicalPoints: { title: string; desc: string; icon: string }[];
    connectionSteps: { step: string; title: string; desc: string }[];
    changelog: string[];
    images?: string[];
    wiringDiagram?: string;
    wiringDiagrams?: { label: string; url: string }[];
  }> = {
    v4pro: {
      name: "Bộ Điều Khiển ARGB Happy Smart Light 2X PRO",
      price: "1.200.000 VND",
      tagline: "Ông vua phân phối tín hiệu LED pixel đa cực cho sân khấu, nội thất và mạch POI chuyên dụng",
      description: "Thoát ly hoàn toàn khỏi giới hạn của firmware cũ, dòng 2X PRO được kỹ sư Happy Smart Light tái kiến trúc nguyên bản phần cứng lẫn firmware dựa trên cốt lõi giao thức truyền thông ARGB HSL độc quyền. Phiên bản này được tối ưu đặc biệt hỗ trợ thiết kế mạch POI biểu diễn nghệ thuật mạnh mẽ, hoạt động với điện áp 5V ổn định và tương thích hoàn hảo với các cell pin Lithium 3.7V - 4.2V tiện dụng cho thiết bị di động. Ưu điểm cốt lõi: PCB 4 lớp chất liệu cao cấp, anten rời truyền nhận sóng cực xa và ổn định, thiết kế nhỏ gọn phù hợp mọi đạo cụ cần tối ưu kích thước, hỗ trợ pin LiPo/Lithium và sạc trực tiếp tiện lợi.",
      badge: "Flagship POI",
      glowColor: "yellow",
      heroSpecs: [
        { label: "Chip xử lý", value: "Dual Core LX7 240MHz + Wi-Fi Co-Processor" },
        { label: "Số cổng ARGB", value: "2 cổng cách ly vật lý quang học độc lập" },
        { label: "Tải pixel tối đa", value: "2,048 Pixels @ 30 FPS / 1,024 @ 60 FPS" },
        { label: "Giao thức truyền", value: "ARGB HSL Sync (Độc quyền) / xLights DDP / Art-Net" },
        { label: "Cấu trúc bo mạch", value: "PCB 4 lớp chất liệu cao cấp, bền bỉ và ổn định tín hiệu" },
        { label: "Anten rời tầm xa", value: "Anten rời truyền nhận sóng cực xa và ổn định" },
        { label: "Nguồn linh hoạt", value: "Hỗ trợ pin LiPo/Lithium, hỗ trợ sạc trực tiếp" },
        { label: "Thiết kế nhỏ gọn", value: "Tối ưu kích thước, phù hợp mọi đạo cụ cần gọn nhẹ" }
      ],
      fullSpecs: [
        {
          category: "Thông số Nguồn & Điện áp",
          list: [
            { label: "Điện áp danh định đầu vào", value: "DC 5V (Tương thích hoàn hảo cell pin Lithium 3.7V - 4.2V cho các dự án di động/POI)" },
            { label: "Dòng chịu tải bo mạch tối đa", value: "15A liên tục, tích hợp cầu chì đồng thau chống cháy nổ" },
            { label: "Mạch lọc nhiễu nguồn", value: "Tụ phân cực rắn Nhật Bản ESR siêu thấp 470uF ngăn sụt dòng đột ngột" }
          ]
        },
        {
          category: "Cổng giao tiếp & Tín hiệu",
          list: [
            { label: "Bộ chuyển mức Logic (Level Shifter)", value: "Sử dụng IC chuyển mức chuẩn công nghiệp 3.3V lên đúng 5.0V" },
            { label: "Băng tải nhiễu tín hiệu", value: "Trở kháng đường truyền triệt tiêu 33 Ohm hạn chế sóng phản xạ đuôi" },
            { label: "Cổng ra phụ trợ", value: "Khả năng tối ưu siêu gọn nhẹ gá lắp trực tiếp vào khung sườn POI" }
          ]
        },
        {
          category: "Khả năng truyền thông không dây",
          list: [
            { label: "Anten rời tầm xa", value: "Anten rời truyền nhận sóng cực xa và ổn định, giữ kết nối tốt cả trong môi trường nhiễu hoặc khoảng cách lớn" },
            { label: "Công nghệ BLE Antenna", value: "Chíp BLE v4.2 cự ly tầm gần quét cực tốc dưới 3 mét" },
            { label: "Modem Wi-Fi nội bộ", value: "Trạm thu sóng IP độc lập 2.4Ghz, hỗ trợ mã hóa WPA2/WPA3 Personal" }
          ]
        },
        {
          category: "Cấu trúc phần cứng & Nguồn",
          list: [
            { label: "PCB 4 lớp cao cấp", value: "Bo mạch PCB 4 lớp chất liệu cao cấp cho độ bền cơ học, tản nhiệt và độ ổn định tín hiệu cao" },
            { label: "Thiết kế siêu nhỏ gọn", value: "Tối ưu kích thước tối đa, phù hợp gá lắp vào mọi đạo cụ cần gọn nhẹ như gậy POI, trang phục biểu diễn" },
            { label: "Nguồn pin LiPo/Lithium", value: "Hỗ trợ pin LiPo/Lithium 3.7V - 4.2V cho thiết bị di động" },
            { label: "Sạc trực tiếp tiện lợi", value: "Hỗ trợ sạc trực tiếp ngay trên mạch, không cần tháo pin" },
            { label: "Chuẩn đóng vỏ", value: "Vỏ kim loại nhôm CNC anode cao cấp, chống bám vân tay tản nhiệt tốt" }
          ]
        }
      ],
      architectures: [
        "Sơ đồ chân ra: GND | D1 (Cổng 1) | D2 (Cổng 2) | VCC (Cấp nguồn 5V ổn định)",
        "Thiết đặt nút bấm: Nhấn giữ 3s Reset phát Wifi / Nhấn 1 lần chuyển hiệu ứng ARGB HSL ngoại tuyến"
      ],
      technicalPoints: [
        {
          title: "Giao thức truyền ARGB HSL",
          desc: "Tự phát triển tại Việt Nam để tối giản gói dữ liệu mạng UDP truyền tải. Khối lượng gói giảm 45% so với giao thức cũ, khắc phục đứt gãy khung hình lúc nhảy EDM độ phân giải lớn.",
          icon: "code"
        },
        {
          title: "Hỗ Trợ Làm Mạch POI Biểu Diễn",
          desc: "Sơ mạch 2X PRO cực kỳ nhỏ gọn, dễ dàng gá lắp vào các ống gậy POI, hỗ trợ tối đa việc cấp nguồn bằng pin sạc 3.7V - 4.2V vô cùng linh hoạt.",
          icon: "cpu"
        },
        {
          title: "Tản Nhiệt Anode Nguyên Khối",
          desc: "Được đúc gọt CNC từ hợp kim nhôm cao cấp giúp vi xử lý duy trì nhiệt độ dưới 48°C ngay cả khi truyền dữ liệu đầy công suất 2 cổng liên tục 24/7.",
          icon: "layers"
        },
        {
          title: "PCB 4 Lớp & Anten Rời Tầm Xa",
          desc: "Bo mạch PCB 4 lớp chất liệu cao cấp cho độ bền và độ ổn định tín hiệu cao. Anten rời giúp truyền nhận sóng cực xa và ổn định, giữ kết nối tốt ngay cả ở khoảng cách lớn hay môi trường nhiễu.",
          icon: "radio"
        },
        {
          title: "Nhỏ Gọn & Nguồn Pin Linh Hoạt",
          desc: "Thiết kế siêu nhỏ gọn tối ưu kích thước, phù hợp gá lắp vào mọi đạo cụ cần gọn nhẹ. Hỗ trợ pin LiPo/Lithium và sạc trực tiếp ngay trên mạch, cực tiện cho thiết bị di động.",
          icon: "settings"
        }
      ],
      connectionSteps: [
        { step: "01", title: "Cấp Nguồn Cho Thiết bị", desc: "Đấu nối nguồn DC 5V (hoặc từ cell pin sạc Lithium 3.7V - 4.2V) phù hợp trực tiếp vào rắc vặn vít VCC và GND trên mạch." },
        { step: "02", title: "Kết Nối LED Pixel/POI", desc: "Hàn dây tín hiệu (Data) vào cổng D1 hoặc D2 trên mạch. Bọc gen co nhiệt để phòng tránh đoản mạch làm cháy dải led." },
        { step: "03", title: "Scan BLE và nạp Wifi", desc: "Mở app ARGB HSL trên điện thoại Android bấm 'Tìm thiết bị'. Chọn 2X PRO sẵn có và nạp tên+mật khẩu Wi-Fi nhà bạn." },
        { step: "04", title: "Kích Hoạt & Trình Diễn", desc: "Giờ bạn có thể thoải mái chọn hàng trăm hiệu ứng có sẵn hoặc mở máy PC sử dụng thiết kế timeline kịch bản nhạc trên xLights phát sóng đồng bộ mượt mà." }
      ],
      changelog: [
        "v4.3.0-release: Nâng cấp bo mạch PCB 4 lớp cao cấp, anten rời tầm xa, thiết kế nhỏ gọn hơn, hỗ trợ pin LiPo/Lithium và sạc trực tiếp.",
        "v4.2.1-stable: Tối ưu mạch sạc pin và tương thích cell pin 3.7-4.2V cho POI",
        "v4.0.0-release: Chuyển đổi toàn diện sang độc quyền giao thức ARGB HSL và tích hợp app di động mới"
      ]
    },
    matrix: {
      name: "Happy Smart LED Matrix Driver Pro",
      price: "Tùy thời giá linh kiện",
      tagline: "Bộ lái ma trận LED chuyên dụng cho các tấm Panel LED, Cabin LED lớn",
      description: "Không đơn giản là hiển thị dải màu chạy đuổi, Happy Smart LED Matrix Driver Pro tương đương một card máy tính mini hóa, hỗ trợ lập sơ đồ tọa độ và điều khiển trực tiếp các tấm Panel LED (LED Cabin) ghép nối để tạo thành những bức tường LED đa sắc khổng lồ chất lượng cao, đồng bộ mạnh mẽ và mượt mà.",
      badge: "Ông Vua Panel LED",
      glowColor: "blue",
      heroSpecs: [
        { label: "Vi xử lý", value: "ESP32-S3 High-Speed 32-bit MCU với 8MB PSRAM" },
        { label: "Loại LED hỗ trợ", value: "Điều khiển Panel LED ma trận (LED Cabin) ghép chuỗi" },
        { label: "Bộ lưu trữ cứng", value: "Thẻ nhớ MicroSD FAT32 tích hợp sẵn (Lắp kèm thẻ 16GB)" },
        { label: "Giao thức truyền", value: "ARGB HSL Matrix stream / xLights DDP / TCP Ethernet" }
      ],
      fullSpecs: [
        {
          category: "Công năng hiển thị",
          list: [
            { label: "Đối tượng điều khiển", value: "Các tấm Panel LED ma trận (LED Cabin) chuyên dụng" },
            { label: "Định dạng ảnh POV/Matrix", value: "Xử lý trực tiếp ảnh kịch bản BMP, GIF động, Video cắt phân đoạn" },
            { label: "Chế độ đồng bộ", value: "Tự động phát hiện kịch bản lưu trong thẻ nhớ SD khi ngắt Wi-Fi mạng" }
          ]
        },
        {
          category: "Vận hành phần cứng",
          list: [
            { label: "Cầu đấu phân dòng nguồn", value: "Cầu đấu đồng khối mạ đồng chịu dòng cực lớn lên tới 40A liên tục" },
            { label: "Bộ điều ổn dòng điện", value: "Hạn dòng kỹ thuật số thông minh (Amps Limiter) thông qua trang quản trị" },
            { label: "Cổng mạng dây mở rộng", value: "Hỗ trợ chân kết nối module Ethernet LAN RJ45 cho độ trễ phản hồi thấp và ổn định" }
          ]
        }
      ],
      architectures: [
        "Sơ đồ ghép: Ghép ngang và ghép đứng nhiều tấm cabin LED (config qua app điện thoại dễ dàng)",
        "Nạp kịch bản: Xuất file kịch bản trực tiếp từ Công cụ Windows ARGB HSL Control Tool nạp thẳng vào thẻ nhớ"
      ],
      technicalPoints: [
        {
          title: "Bộ Nhớ Đệm PSRAM 8MB",
          desc: "Giúp xử lý lưu trữ các khung hình ma trận cực lớn tạm thời mà không sợ tràn bộ nhớ của MCU, đảm bảo tốc độ chạy hiệu ứng chuyển đổi mượt không hề bị giật cục.",
          icon: "layers"
        },
        {
          title: "Tích Hợp Khe MicroSD Tiện Lợi",
          desc: "Tải toàn bộ kịch bản biểu diễn nghệ thuật thời lượng dài trực tiếp lên thẻ nhớ. Khi mất sóng mạng, thiết bị tự động chuyển qua chế độ chạy offline mượt mà.",
          icon: "database"
        },
        {
          title: "Bảo Vệ Quá Dòng Kỹ Thuật Số",
          desc: "Matrix Driver Pro tính toán tổng điện năng tiêu thụ thời gian thực, chủ động can thiệp giảm độ sáng hoặc tự động ngắt tải trong 10ms nếu phát hiện chập mạch rò điện.",
          icon: "settings"
        }
      ],
      connectionSteps: [
        { step: "01", title: "Cấp Nguồn Công Suất Lớn", desc: "Các tấm Panel LED tiêu thụ dòng điện rất lớn (đặc biệt khi hiển thị màu trắng tối đa). Cấp nguồn 5V ampere tương ứng vào gá kẹp đồng." },
        { step: "02", title: "Đấu Nối Panel LED", desc: "Kết nối cáp tín hiệu phẳng từ Driver Pro vào chân Data In trên tấm ma trận LED Panel/Cabin đầu tiên." },
        { step: "03", title: "Cấu Hình Tọa Độ", desc: "Mở app trên điện thoại Android, cấu hình số lượng tấm cabin LED ghép nối ngang dọc và quét tọa độ để căn chỉnh màn hình." },
        { step: "04", title: "Truyền Hoạt Ảnh & Đồng Bộ", desc: "Đón nhận ảnh GIF động hoặc luồng video streaming từ PC điều khiển trực quan qua mạng hoặc chạy tệp tin nạp sẵn từ thẻ nhớ SD." }
      ],
      changelog: [
        "v2.12-stable: Bổ sung công cụ xoay xoay góc 90, 180, 270 trực quan ngay trên Dashboard",
        "v2.0.0-release: Thiết kế lại toàn bộ vi xử lý để tích hợp khe SD siêu tốc và ESP32-S3 thế hệ mới"
      ]
    },
    hsl4x: {
      name: "Bộ Điều Khiển ARGB Happy Smart Light 4X",
      price: "930.000 VND",
      tagline: "Bộ điều khiển ARGB công suất lớn gánh tải pixel matrix, trống led matrix, cờ led matrix sự kiện",
      description: "Được thiết kế chuyên biệt chịu dòng cực lớn gánh tải các công trình LED chạy luồng phức tạp như Trống LED matrix, Cờ LED matrix sự kiện hay các mảng matrix pixel lớn. Được trang bị 4 cổng ra ARGB tích hợp diode cách ly chống dội ngược dòng và vi mạch Level Shifter nâng điện áp tín hiệu, thiết bị đảm bảo tín hiệu luôn ổn định, sắc nét và cực kỳ bền bỉ. Phiên bản mới nâng cấp X2 dung lượng bộ nhớ cho phép lưu trữ visual dài hơn, bổ sung vị trí hàn nút bấm riêng dễ thao tác, đồng thời hỗ trợ gắn thêm module Ethernet (ETH) và module thẻ nhớ SD để mở rộng kết nối và bộ nhớ.",
      badge: "Công Suất Cực Cao",
      glowColor: "purple",
      heroSpecs: [
        { label: "Điện áp hoạt động", value: "Mạch chạy mức 5V, điều khiển LED đa dải DC 5V / 12V / 24V / 48V" },
        { label: "Số lượng LED điều khiển", value: "Tối ưu vận hành 4.000 - 5.000 LED pixel" },
        { label: "Mạch ra an toàn", value: "4 cổng ra ARGB có diode chống dội ngược dòng" },
        { label: "Chống đấu nhầm cực", value: "Bảo vệ chống chập nguồn khi đấu nhầm cực âm/dương" },
        { label: "IC chuyển mức logic", value: "Level Shifter 3.3V lên 5V vuông vắn ổn định" },
        { label: "Gánh tải tối đa", value: "Cầu đấu đồng khối mạ niken gánh tới 30A liên tục" },
        { label: "Giám sát nhiệt độ", value: "Firmware mới báo nhiệt độ hoạt động của mạch theo thời gian thực" },
        { label: "Bộ nhớ lưu visual", value: "Nâng cấp X2 dung lượng, lưu trữ kịch bản visual dài hơn" },
        { label: "Khe cắm mở rộng", value: "Hỗ trợ gắn thêm module Ethernet (ETH) & module thẻ nhớ SD" }
      ],
      fullSpecs: [
        {
          category: "Thông số Nguồn & Điện áp",
          list: [
            { label: "Mạch logic 5V, LED đa dải áp", value: "Mạch hoạt động ở mức 5V, điều khiển được LED ở nhiều dải điện áp DC khác nhau: 5V / 12V / 24V / 48V" },
            { label: "Số lượng LED điều khiển", value: "Tối ưu vận hành mượt mà 4.000 - 5.000 LED pixel" },
            { label: "Khả năng chịu tải", value: "Mạch đồng dày chịu tải lớn, gá đồng chịu dòng tải lên tới 30A" },
            { label: "Chống chập nguồn đấu nhầm cực", value: "Mạch bảo vệ chống chập nguồn khi đấu nhầm cực âm/dương, kết hợp diode chống cắm ngược cực và cầu chì thông minh" }
          ]
        },
        {
          category: "Cổng ra & Bảo vệ tín hiệu",
          list: [
            { label: "Diode chống dội ngược dòng", value: "Trang bị diode chống dội ngược dòng điện cảm ứng từ cuộn LED công suất lớn về MCU" },
            { label: "Level Shifter IC chuyên dụng", value: "Nâng mức tín hiệu lên 5V công nghiệp chuẩn chỉnh trên cả 4 cổng độc lập" },
            { label: "Ứng dụng thi công chuyên biệt", value: "Chuyên dụng thi công Trống LED Matrix, Cờ LED Matrix, các dự án Pixel Matrix mật độ dày" }
          ]
        },
        {
          category: "Bộ nhớ & Khả năng mở rộng (Bản nâng cấp)",
          list: [
            { label: "Bộ nhớ visual X2", value: "Dung lượng lưu trữ tăng gấp đôi, chứa được kịch bản hiệu ứng/visual dài hơn ngay trên thiết bị" },
            { label: "Module Ethernet (ETH) tùy chọn", value: "Khe cắm gắn thêm module mạng LAN có dây cho kết nối ổn định, độ trễ thấp khi trình chiếu sự kiện lớn" },
            { label: "Module thẻ nhớ SD tùy chọn", value: "Khe gắn thêm module thẻ nhớ SD để mở rộng dung lượng lưu trữ visual offline" },
            { label: "Vị trí hàn nút bấm riêng", value: "Pad hàn nút nhấn bố trí độc lập, gọn gàng và dễ thao tác hàn, thuận tiện tùy biến" },
            { label: "Giám sát nhiệt độ (firmware mới)", value: "Phiên bản phần mềm mới của mạch báo nhiệt độ hoạt động theo thời gian thực, giúp theo dõi và vận hành an toàn" }
          ]
        }
      ],
      architectures: [
        "Sơ đồ chân ra: GND | D1-D4 (4 cổng dữ liệu ARGB độc lập) | VCC (LED đa dải +5V / +12V / +24V / +48V)",
        "Bảo vệ dòng ngược: Diode chống ngược cực nguồn, chống chập nguồn khi đấu nhầm cực và mạch xả tải an toàn tránh chập cháy",
        "Mở rộng: Khe cắm module ETH (Ethernet) & module thẻ nhớ SD, kèm pad hàn nút bấm riêng dễ thao tác"
      ],
      technicalPoints: [
        {
          title: "4 Cổng Ra Chống Dội Ngược",
          desc: "Tăng cường bảo vệ vi xử lý trước hiện tượng dòng điện cảm ứng dội ngược từ các cuộn LED công suất lớn, tránh chập cháy.",
          icon: "cpu"
        },
        {
          title: "IC Chuyển Mức Level Shifter",
          desc: "Đảm bảo tín hiệu logic xung 5V vuông vức chuẩn công nghiệp trên cả 4 cổng ra, giúp LED pixel chạy ổn định không bị nhiễu hay chớp sai màu.",
          icon: "code"
        },
        {
          title: "Chịu Dòng Tải Cực Cao",
          desc: "Mạch đồng dày chịu tải lớn kết hợp với cầu đấu chịu dòng cao giúp thiết bị gánh được lượng bóng LED matrix khổng lồ mà không bị nóng hay sụt áp.",
          icon: "layers"
        },
        {
          title: "Bộ Nhớ X2 & Khe Mở Rộng",
          desc: "Bản nâng cấp gấp đôi bộ nhớ để lưu visual dài hơn, đồng thời mở thêm khe cắm module Ethernet (ETH) và module thẻ nhớ SD, kèm vị trí hàn nút bấm riêng dễ thao tác.",
          icon: "database"
        },
        {
          title: "Điện Áp Đa Dải & Chống Đấu Nhầm Cực",
          desc: "Mạch chạy ở mức logic 5V nhưng điều khiển được LED ở nhiều dải điện áp DC (5V/12V/24V/48V), tối ưu cho 4.000-5.000 LED pixel. Tích hợp bảo vệ chống chập nguồn khi đấu nhầm cực.",
          icon: "settings"
        },
        {
          title: "Giám Sát Nhiệt Độ Thời Gian Thực",
          desc: "Phiên bản phần mềm mới của mạch báo nhiệt độ hoạt động theo thời gian thực, giúp theo dõi tình trạng vận hành và đảm bảo an toàn cho công trình.",
          icon: "radio"
        }
      ],
      connectionSteps: [
        { step: "01", title: "Cấp Nguồn Công Suất Lớn", desc: "Sử dụng nguồn DC 5V-24V chất lượng tốt gá vào cầu đấu chịu tải. Đảm bảo dây nguồn đủ tiết diện lớn để tránh tổn hao điện áp." },
        { step: "02", title: "Đấu Nối 4 Cổng LED", desc: "Hàn dây tín hiệu từ các mảng matrix, trống led hoặc cờ led vào các cổng từ D1 đến D4. Mỗi cổng có thể chạy độc lập các nhánh khác nhau." },
        { step: "03", title: "Cấu Hình Qua App", desc: "Quét thiết bị qua Bluetooth, nạp Wifi và phân chia số lượng bóng LED (Pixel Count) trên mỗi cổng thông qua giao diện quản trị web/app." },
        { step: "04", title: "Đồng Bộ Trình Chiếu", desc: "Kết nối xLights hoặc LedFx để đồng bộ dữ liệu trình chiếu mượt mà trực quan hoặc chạy kịch bản offline lập trình sẵn." }
      ],
      changelog: [
        "v4.1.0-release: Nâng cấp X2 bộ nhớ lưu visual dài hơn, thêm vị trí hàn nút bấm riêng, hỗ trợ module ETH & module thẻ nhớ SD, firmware mới báo nhiệt độ hoạt động và chống chập nguồn khi đấu nhầm cực.",
        "v4.0.0-release: Phiên bản 4 cổng chuyên dụng cho Matrix & Sự kiện, tích hợp diode chống dội ngược dòng.",
        "v3.0.0-design: Bản thử nghiệm phần cứng chịu tải 30A liên tục an toàn"
      ],
      images: [
        "/img/products/hsl4x/ARGB_HSL_4.png",
        "/img/products/hsl4x/ARGB_HSL_5.png",
        "/img/products/hsl4x/ARGB_HSL_TOP.png",
        "/img/products/hsl4x/ARGB_HSL_BOTTOM.png",
        "/img/products/hsl4x/ARGB_HSL_2.png",
        "/img/products/hsl4x/ARGB_HSL_3.png"
      ],
      wiringDiagrams: [
        { label: "Sơ đồ chân (Pinout)", url: "/img/products/hsl4x/pinout_diagram.svg" },
        { label: "Kết nối 4 cổng ARGB", url: "/img/products/hsl4x/wiring_standard.svg" },
        { label: "Kết nối 2 cổng SPI", url: "/img/products/hsl4x/wiring_spi.svg" },
        { label: "Kết nối LED 5V", url: "/img/controller-chip/strip_led_5v.png" },
        { label: "Kết nối LED 12V (Hạ áp)", url: "/img/controller-chip/strip_led_12v.png" },
        { label: "Kết nối LED 12V (Chung GND)", url: "/img/controller-chip/ket-noi-5v-12v.png" }
      ]
    },
    poi: {
      name: "Happy POI Performance Wand (Gậy LED Biểu Diễn)",
      price: "Tùy thời giá linh kiện",
      tagline: "Bộ sản phẩm múa lửa ảo ảnh cao cấp chuyên sâu với chip LED siêu tần PWM",
      description: "Dành riêng cho nghệ sĩ xiếc ảo thuật, kịch nghệ, múa lửa ảo ảnh POV (Persistance of Vision). Gậy POI của chúng tôi được đóng gọn trong vỏ ống polycarbonate chống nứt vỡ chịu lực quăng quật va đập đập cực cao, tích hợp cảm biến IMU đo tốc độ lắc xoay để tự động điều chỉnh tốc độ tải mật độ ảnh bitmap vẽ ra giữa không trung rõ như pha lê.",
      badge: "Nghệ Thuật Độc Bản",
      glowColor: "pink",
      heroSpecs: [
        { label: "Mật độ bóng LED", value: "SK9822 siêu dày đặc (tần số quét PWM tới 4.7KHz)" },
        { label: "Cảm biến xoay vòng", value: "Gia tốc kế IMU 6 trục tự nội suy tốc độ múa" },
        { label: "Bộ nguồn lưu trữ pin", value: "Pin sạc Lithium Cobalt Oxide 4200mAh chạy 5-8 giờ" },
        { label: "Sức chịu đựng va đập", value: "Ống kính bọc Polycarbonate chống rơi đập tầm cao 3 mét" }
      ],
      fullSpecs: [
        {
          category: "Linh kiện hiển thị kịch trần",
          list: [
            { label: "Góc hiển thị POV kép", value: "Dải LED gắn mặt trước và mặt sau đối xứng góc 180 độ hoàn hảo" },
            { label: "Tần số làm mượt", value: "Đồng bộ quét dọc 600 dòng ảnh mỗi giây, cho hình ảnh mượt và ổn định" },
            { label: "Dung lượng bộ nhớ lưu ảnh", value: "128MB lưu trữ sẵn hơn 500 ảnh Bitmap độ phân giải lớn tải lên qua PC" }
          ]
        },
        {
          category: "Thuật toán truyền thông & đồng bộ vô tuyến",
          list: [
            { label: "Sóng đồng bộ không dây nội bộ Wifi AP", value: "Các gậy múa tự tạo liên minh truyền sóng đồng bộ 10ms mốc đầu" },
            { label: "Cổng sạc pin tiện dụng", value: "Sạc nhanh USB Type-C tích hợp bảo vệ dòng sạc thông minh ngắt khi đầy" }
          ]
        }
      ],
      architectures: [
        "Chiều dài gậy: Bản tiêu chuẩn 45cm / Bản nâng cấp 65cm tùy theo vóc dáng nghệ sĩ",
        "Kịch bản biểu diễn: Biên tập timeline đổi bài nhạc, phối hình đồng bộ hoàn hảo cùng hệ thống xLights pc thông qua timeline"
      ],
      technicalPoints: [
        {
          title: "LED SK9822 Tần Quét 4.7KHz",
          desc: "Chi phí cao hơn nhưng tần số PWM lớn hơn nhiều lần so với WS2812B. Nhờ đó hình ảnh múa POV hạn chế tối đa sọc quét dọc và vệt đen khi quay video phơi sáng dài.",
          icon: "sparkles"
        },
        {
          title: "IMU 6-Trục Đo Góc Định Vị",
          desc: "Vạn dặm như một. Cho dù nghệ sĩ quay gậy nhanh hay chậm, ảnh vẽ ra giữa không trung vẫn không bị giãn méo hay thu hẹp, ảnh giữ đúng tỉ lệ trực quan.",
          icon: "radio"
        },
        {
          title: "Đồng Bộ Sóng AP Không Dây Nhóm",
          desc: "Không cần router mạng phức tạp. Một gậy đóng vai trò chủ phát sóng, tất cả gậy còn lại của vũ công tự động nối đuôi đồng bộ kịch bản kỉ luật kịch tính.",
          icon: "cpu"
        }
      ],
      connectionSteps: [
        { step: "01", title: "Nạp Ảnh Bitmap Bằng Máy Tính", desc: "Nối gậy POI vào máy tính Windows bằng cáp Type-C. Mở Windows ARGB HSL Control Tool nạp ảnh kịch bản biểu diễn." },
        { step: "02", title: "Cấu Hình Đồng Bộ Nhóm", desc: "Bật nút nguồn đồng thời. Gậy sẽ tự bắt sóng nội bộ tầm xa 2.4Ghz nhận diện vị trí đội múa." },
        { step: "03", title: "Sạc Đầy Pin Biểu Diễn", desc: "Cắm nguồn sạc điện thoại thông thường vào gậy múa. Đèn led đỏ nháy báo hiệu đang sạc và tự ngắt đổi màu xanh lá khi đầy pin." },
        { step: "04", title: "Biểu Diễn Thăng Hoa", desc: "Nghệ sĩ cầm nắm chắc chắn dải vòng quay gậy, múa xoay vòng tròn theo âm nhạc để cảm nhận vẻ đẹp rực rỡ ảo ảnh múa lửa vây quanh." }
      ],
      changelog: [
        "v5.0.2-performance: Độ chính xác nội suy góc IMU tăng 15% giúp ảnh vẽ cân xứng hơn",
        "v5.0.0-stable: Phiên bản gậy múa ảo ảnh chuyên dụng hợp lực kỹ nghệ biểu diễn ánh sáng Việt Nam"
      ]
    }
  };

  const selectedProduct = productsDetailedData[productId] || productsDetailedData.v4pro;

  // Centralized glow-color styling (tránh lặp ternary 4 nhánh ở nhiều nơi)
  const glowStyles = {
    pink: {
      card: "shadow-glow-pink/10 border-neon-pink/25",
      thumb: "border-neon-pink shadow-glow-pink/30 scale-105",
      chip: "bg-neon-pink/20 text-neon-pink-bright border border-neon-pink/40",
    },
    yellow: {
      card: "shadow-glow-yellow/10 border-neon-yellow/25",
      thumb: "border-neon-yellow shadow-glow-yellow/30 scale-105",
      chip: "bg-neon-yellow/20 text-neon-yellow-bright border border-neon-yellow/40",
    },
    blue: {
      card: "shadow-glow-blue/10 border-neon-blue/25",
      thumb: "border-neon-blue shadow-glow-blue/30 scale-105",
      chip: "bg-neon-blue/20 text-neon-blue-bright border border-neon-blue/40",
    },
    purple: {
      card: "shadow-glow-dual/20 border-purple-500/25",
      thumb: "border-purple-500 shadow-glow-dual/30 scale-105",
      chip: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    },
  } as const;
  const glow = glowStyles[selectedProduct.glowColor] ?? glowStyles.purple;

  // Danh sách ảnh cho modal phóng to — dùng chung cho cả ảnh sản phẩm & sơ đồ đấu nối
  const galleryItems: { label: string; url: string | undefined }[] =
    activeView === "wiring"
      ? selectedProduct.wiringDiagrams
        ? selectedProduct.wiringDiagrams
        : selectedProduct.wiringDiagram
          ? [{ label: "Sơ đồ đấu nối", url: selectedProduct.wiringDiagram }]
          : []
      : (selectedProduct.images ?? []).map((url, i) => ({ label: `Ảnh ${i + 1}`, url }));

  const viewTitle = activeView === "wiring" ? "Sơ Đồ Đấu Nối" : "Ảnh Sản Phẩm";
  const currentIndex = activeView === "wiring" ? selectedWiringIndex : selectedImageIndex;
  const currentItem = galleryItems[currentIndex];

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };
  const zoomIn = () => setScale((s) => Math.min(s + 0.5, MAX_SCALE));
  const zoomOut = () =>
    setScale((s) => {
      const next = Math.max(s - 0.5, MIN_SCALE);
      if (next <= 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  const changeSlide = (dir: number) => {
    const len = galleryItems.length;
    if (len <= 1) return;
    const next = (currentIndex + dir + len) % len;
    if (activeView === "wiring") setSelectedWiringIndex(next);
    else setSelectedImageIndex(next);
  };

  // Reset zoom mỗi khi đổi ảnh / đổi tab / mở-đóng modal
  useEffect(() => {
    resetZoom();
  }, [selectedImageIndex, selectedWiringIndex, activeView, isZoomed]);

  // Phím mũi tên để chuyển ảnh, +/- để zoom trong modal
  useEffect(() => {
    if (!isZoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") changeSlide(-1);
      else if (e.key === "ArrowRight") changeSlide(1);
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-" || e.key === "_") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoomed, activeView, selectedImageIndex, selectedWiringIndex, galleryItems.length]);

  // Focus trap: giữ tiêu điểm trong modal + khôi phục khi đóng
  useEffect(() => {
    if (!isZoomed) return;
    const modal = modalRef.current;
    if (!modal) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    modal.focus();
    const getFocusable = (): HTMLElement[] =>
      (Array.from(
        modal.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[]).filter((el) => el.offsetParent !== null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    modal.addEventListener("keydown", onKeyDown);
    return () => {
      modal.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [isZoomed]);

  // Render correct icon based on name
  const renderIconComponent = (iconName: string) => {
    switch (iconName) {
      case "code": return <Code className="w-5 h-5 text-neon-pink-bright" />;
      case "cpu": return <Cpu className="w-5 h-5 text-neon-blue-bright" />;
      case "layers": return <Layers className="w-5 h-5 text-purple-400" />;
      case "sparkles": return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case "radio": return <Radio className="w-5 h-5 text-emerald-400" />;
      case "settings": return <Settings className="w-5 h-5 text-slate-400" />;
      case "database": return <Monitor className="w-5 h-5 text-[#00e5ff]" />;
      default: return <Sliders className="w-5 h-5 text-white" />;
    }
  };

  // Chia sẻ sản phẩm: ưu tiên Web Share API (mở khay chia sẻ gốc trên điện thoại —
  // Zalo, Messenger, SMS, Facebook…). Máy tính không hỗ trợ thì fallback copy link.
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareData = {
      title: selectedProduct.name,
      text: `${selectedProduct.name} — ${selectedProduct.tagline}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Người dùng đóng khay chia sẻ → không làm gì thêm.
        if ((err as Error)?.name === "AbortError") return;
        // Lỗi khác → rơi xuống fallback copy link bên dưới.
      }
    }
    // Fallback copy link. clipboard API chỉ chạy ở secure context (https/localhost),
    // nên có thêm fallback execCommand cho trường hợp mở qua http (IP mạng LAN…).
    const flash = () => {
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    };
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        flash();
        return;
      }
    } catch {
      /* clipboard API thất bại → thử execCommand bên dưới */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = shareData.url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) flash();
    } catch {
      /* không copy được thì bỏ qua */
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] font-sans pt-24 pb-16 relative overflow-hidden" id="product-detail-subpage-container">
      {/* Decorative large blurry glowing bulbs */}
      <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10 ${
        selectedProduct.glowColor === 'pink' 
          ? "bg-neon-pink/15" 
          : selectedProduct.glowColor === 'yellow'
            ? "bg-neon-yellow/15"
            : selectedProduct.glowColor === 'blue' 
              ? "bg-neon-blue/15" 
              : "bg-purple-500/15"
        }`} />
      <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none -z-10 bg-slate-900/40`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Back Button & Nav */}
        <div className="mb-8" id="detail-nav-back">
          <button
            onClick={onBack}
            className="flex items-center space-x-2.5 py-2.5 px-5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer shadow-md inline-flex"
            id="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay Lại Trang Chủ</span>
          </button>
        </div>

        {/* Hero Section of this Product */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16" id="detail-hero-layout">

          {/* Left Columns - Detail info text */}
          <div className="lg:col-span-7 space-y-6" id="detail-left-narrative">
            <div className="flex items-center space-x-3">
              <span className={`px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${
                selectedProduct.glowColor === 'pink'
                  ? "bg-neon-pink/20 text-neon-pink-bright border-neon-pink/30"
                  : selectedProduct.glowColor === 'yellow'
                    ? "bg-gradient-to-r from-neon-yellow/20 to-amber-500/10 text-neon-yellow-bright border-neon-yellow/40 shadow-glow-yellow/10"
                    : selectedProduct.glowColor === 'blue'
                      ? "bg-neon-blue/20 text-neon-blue-bright border-neon-blue/30"
                      : "bg-purple-500/20 text-purple-300 border-purple-400/30"
                }`}>
                {selectedProduct.badge}
              </span>
              <span className="text-slate-500 text-xs font-mono">
                MODEL ID: {productId.toUpperCase()}-ARGB_HSL
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {selectedProduct.name}
            </h1>

            <p className="font-display text-lg sm:text-xl text-[#00e5ff] font-medium leading-relaxed">
              {selectedProduct.tagline}
            </p>

            <p className="font-sans text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Price display */}
            <div className="flex items-center space-x-3 py-1">
              <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">Giá bán lẻ đề xuất:</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#00f0ff] tracking-wide">
                {selectedProduct.price}
              </span>
            </div>

            {/* Core Stats highlights badge row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/10" id="detail-core-stats">
              {selectedProduct.heroSpecs.map((spec, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">{spec.label}</span>
                  <span className="block text-xs font-semibold text-white leading-snug">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Quick Order trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4" id="detail-actions-tray">
              <button
                onClick={() => onQuoteRequested(selectedProduct.name)}
                className={`py-4 px-8 rounded-2xl text-center font-display text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-103 cursor-pointer ${
                  selectedProduct.glowColor === 'pink'
                    ? "bg-gradient-to-r from-neon-pink to-purple-600 shadow-glow-pink"
                    : selectedProduct.glowColor === 'yellow'
                      ? "bg-gradient-to-r from-neon-yellow to-amber-600 shadow-glow-yellow"
                      : selectedProduct.glowColor === 'blue'
                        ? "bg-gradient-to-r from-neon-blue to-teal-600 shadow-glow-blue"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-glow-dual"
                }`}
                id="btn-detail-order-quote"
              >
                Nhận Báo Giá & Bản Vẽ Thiết Kế Đấu Nối ➔
              </button>

              <button
                onClick={handleShare}
                className="py-4 px-6 rounded-2xl text-center font-display text-xs font-bold uppercase tracking-wider text-white bg-slate-900/60 border border-white/10 hover:border-white/30 hover:bg-slate-900 transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
                id="btn-detail-share"
                aria-label={`Chia sẻ ${selectedProduct.name}`}
              >
                {shareStatus === "copied" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span>{shareStatus === "copied" ? "Đã copy link" : "Chia sẻ"}</span>
              </button>
            </div>
          </div>

          {/* Right Columns - Visual circuit mockup or diagram simulation */}
          <div className="lg:col-span-5 flex justify-center" id="detail-visual-chassis">
            {selectedProduct.images && selectedProduct.images.length > 0 ? (
              <div className="w-full max-w-lg flex flex-col space-y-4">
                {/* View Tabs Selector */}
                <div role="tablist" aria-label="Chế độ xem hình ảnh" className="flex bg-slate-900/60 p-1 rounded-xl border border-white/5 self-center">
                  <button
                    role="tab"
                    aria-selected={activeView === "product"}
                    onClick={() => setActiveView("product")}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeView === "product"
                        ? "bg-white/10 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Ảnh Sản Phẩm
                  </button>
                  {(selectedProduct.wiringDiagram || selectedProduct.wiringDiagrams) && (
                    <button
                      role="tab"
                      aria-selected={activeView === "wiring"}
                      onClick={() => setActiveView("wiring")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        activeView === "wiring"
                          ? "bg-white/10 text-white font-semibold shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Sơ Đồ Đấu Nối
                    </button>
                  )}
                </div>

                {/* Main Visual Display Card */}
                <div className={`w-full rounded-3xl bg-slate-950 border p-4 sm:p-5 flex flex-col items-center justify-between min-h-[380px] relative overflow-hidden ${glow.card}`}>
                  {activeView === "product" ? (
                    <div className="w-full flex flex-col items-center justify-between h-full flex-1">
                      <div className="absolute top-2 right-3 flex items-center space-x-1.5 opacity-40 font-mono text-[8px] z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                        <span>3D MODEL VIEW</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsZoomed(true)}
                        aria-label="Phóng to ảnh sản phẩm"
                        className="group/zoom w-full relative aspect-[1.85/1] overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 flex items-center justify-center cursor-zoom-in mt-2"
                      >
                        <img
                          src={selectedProduct.images[selectedImageIndex]}
                          alt={`${selectedProduct.name} - Góc nhìn ${selectedImageIndex + 1}`}
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-contain group-hover/zoom:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                          <span className="px-3.5 py-1.5 bg-slate-900/90 border border-white/10 rounded-lg text-[10px] font-mono text-white flex items-center space-x-1.5 shadow-lg">
                            <Eye className="w-3 h-3 text-neon-blue-bright" />
                            <span>CLICK ĐỂ PHÓNG TO</span>
                          </span>
                        </div>
                      </button>

                      {/* Thumbnails Row */}
                      <div className="flex flex-wrap justify-center gap-2 mt-4 max-h-[80px] overflow-y-auto py-1 w-full">
                        {selectedProduct.images.map((img, idx) => (
                          <button
                            key={img}
                            onClick={() => setSelectedImageIndex(idx)}
                            aria-label={`Xem ảnh ${idx + 1}`}
                            aria-pressed={selectedImageIndex === idx}
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border bg-slate-900 transition-all duration-200 cursor-pointer flex-shrink-0 ${
                              selectedImageIndex === idx
                                ? glow.thumb
                                : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <img src={img} alt={`${selectedProduct.name} thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center justify-between flex-1 h-full">
                      <div className="absolute top-2 right-3 flex items-center space-x-1.5 opacity-40 font-mono text-[8px] z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                        <span>WIRING DIAGRAM</span>
                      </div>

                      {/* Sub-selector for multiple wiring diagrams */}
                      {selectedProduct.wiringDiagrams && selectedProduct.wiringDiagrams.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1.5 mt-2 mb-2 w-full z-10">
                          {selectedProduct.wiringDiagrams.map((diag, idx) => (
                            <button
                              key={diag.url}
                              onClick={() => setSelectedWiringIndex(idx)}
                              aria-pressed={selectedWiringIndex === idx}
                              className={`px-2.5 py-1 rounded-md text-[9px] font-mono transition-all duration-150 cursor-pointer ${
                                selectedWiringIndex === idx
                                  ? glow.chip
                                  : "bg-slate-900/60 text-slate-400 border border-white/5 hover:text-slate-200"
                              }`}
                            >
                              {diag.label}
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setIsZoomed(true)}
                        aria-label="Phóng to sơ đồ đấu nối"
                        className="group/zoom w-full relative aspect-[1.41/1] overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 flex items-center justify-center cursor-zoom-in mt-1"
                      >
                        <img
                          src={
                            selectedProduct.wiringDiagrams
                              ? selectedProduct.wiringDiagrams[selectedWiringIndex].url
                              : selectedProduct.wiringDiagram
                          }
                          alt={`Sơ đồ đấu nối ${selectedProduct.name}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                          <span className="px-3.5 py-1.5 bg-slate-900/90 border border-white/10 rounded-lg text-[10px] font-mono text-white flex items-center space-x-1.5 shadow-lg">
                            <Eye className="w-3 h-3 text-neon-blue-bright" />
                            <span>CLICK ĐỂ PHÓNG TO</span>
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => setIsZoomed(true)}
                        className="mt-2 text-[9px] font-mono text-slate-500 hover:text-white flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Xem Sơ Đồ Toàn Màn Hình</span>
                      </button>
                    </div>
                  )}

                  {/* Shared bottom disclaimer */}
                  <div className="w-full pt-3 mt-3 border-t border-white/5 flex items-center space-x-2.5 text-[9px] font-mono text-yellow-500">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Chú ý: Luôn ngắt nguồn điện trước khi hàn gá dải LED để tránh hư hỏng linh kiện.</span>
                  </div>
                </div>
              </div>
            ) : (
              // Fallback default diagram when no images defined
              <div className={`w-full max-w-sm rounded-3xl bg-slate-950 border p-6 justify-between flex flex-col min-h-[380px] relative overflow-hidden ${
                selectedProduct.glowColor === 'pink'
                  ? "shadow-glow-pink/10 border-neon-pink/25"
                  : selectedProduct.glowColor === 'yellow'
                    ? "shadow-glow-yellow/10 border-neon-yellow/25"
                    : selectedProduct.glowColor === 'blue'
                      ? "shadow-glow-blue/10 border-neon-blue/25"
                      : "shadow-glow-dual/20 border-purple-500/25"
                }`}>
                <div className="absolute top-2 right-3 flex items-center space-x-1.5 opacity-40 font-mono text-[8px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span>STATE: CON_ACTIVE</span>
                </div>

                {/* Decorative visual drawing logic */}
                <div className="space-y-4 my-auto">
                  <div className="text-center font-mono">
                    <span className="block text-[11px] text-[#00e5ff] font-bold">ARGB HSL HARDWARE LABS</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block mt-0.5">Sơ đồ khối vi xử lý & tản nhiệt cơ học</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a0a10] border border-white/5 space-y-4 font-mono text-[9px] relative">
                    {/* Mock logic wire paths layout */}
                    <div className="space-y-1.5 text-slate-400">
                      <div className="flex justify-between items-center text-white font-bold border-b border-white/5 pb-1 mb-2">
                        <span>CHÂN RA TÍN HIỆU BO MẠCH</span>
                        <span className={`font-mono ${
                          selectedProduct.glowColor === 'pink'
                            ? "text-neon-pink-bright"
                            : selectedProduct.glowColor === 'yellow'
                              ? "text-neon-yellow-bright"
                              : "text-neon-blue-bright"
                        }`}>HSL_V4_BUS</span>
                      </div>
                      {selectedProduct.architectures.map((arch, aIdx) => (
                        <p key={aIdx} className="leading-relaxed">
                          ➔ {arch}
                        </p>
                      ))}
                    </div>

                    {/* Level Shift Diagram simulation */}
                    <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[8px] text-slate-500">
                      <span>ESP32 MCU (3.3V)</span>
                      <span className="text-yellow-400 animate-pulse font-bold">⚡ LEVEL SHIFTER IC ⚡</span>
                      <span className="text-[#00e5ff] font-bold">LED TARGET (5.0V)</span>
                    </div>
                  </div>

                  {/* Simulated Oscilloscope Waveform */}
                  <div className="p-3 bg-black rounded-lg border border-white/5 space-y-2">
                    <div className="flex justify-between font-mono text-[8px] text-slate-500">
                      <span>SÓNG TRUYỀN DẪN ARGB HSL (1Mbps)</span>
                      <span className="text-emerald-400">SYNC OK</span>
                    </div>
                    {/* Waveform line SVG */}
                    <svg viewBox="0 0 100 20" className="w-full h-8 text-emerald-500 stroke-current stroke-1">
                      <path d="M 0 10 L 10 10 L 12 2 L 14 18 L 16 10 L 30 10 L 32 2 L 34 18 L 36 10 L 55 10 L 57 2 L 59 18 L 61 10 L 80 10 L 82 2 L 84 18 L 86 10 L 100 10" fill="none" className={`animate-pulse ${
                        selectedProduct.glowColor === 'pink'
                          ? "stroke-neon-pink"
                          : selectedProduct.glowColor === 'yellow'
                            ? "stroke-neon-yellow"
                            : "stroke-neon-blue"
                      }`} strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* Disclaimer warning info */}
                <div className="pt-4 border-t border-white/5 flex items-center space-x-2.5 text-[9px] font-mono text-yellow-500">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Chú ý: Luôn ngắt nguồn điện trước khi hàn gá dải LED để tránh hư hỏng linh kiện.</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Detailed Specs Tab grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16" id="detail-specs-grid">

          {/* Left panel specs directory */}
          <div className="lg:col-span-8 space-y-8" id="detail-technical-specs">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight flex items-center">
              <Cpu className="w-5 h-5 text-[#00e5ff] mr-3" />
              Thông Số Kỹ Thuật Chi Tiết Bo Mạch
            </h2>

            <div className="grid md:grid-cols-1 gap-6" id="full-categories-specs">
              {selectedProduct.fullSpecs.map((category, cIdx) => (
                <div key={cIdx} className="p-6 bg-glass border border-white/10 rounded-2xl space-y-4">
                  <h3 className="font-display font-medium text-sm sm:text-base text-[#00e5ff] border-b border-white/5 pb-2 uppercase tracking-wider font-mono">
                    [Danh mục] {category.category}
                  </h3>
                  <div className="grid gap-3 font-sans text-xs">
                    {category.list.map((item, lIdx) => (
                      <div key={lIdx} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 py-1.5 border-b border-white/5 hover:bg-white/1.5 transition-colors duration-150">
                        <span className="md:col-span-4 font-bold text-slate-300">{item.label}</span>
                        <span className="md:col-span-8 text-slate-400 leading-relaxed font-mono">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side helper cards */}
          <div className="lg:col-span-4 space-y-6" id="detail-features-column">
            <div className="p-6 bg-glass border border-white/10 rounded-2xl space-y-4">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Ưu Điểm Cốt Lõi Về Công Nghệ
              </h4>
              <div className="space-y-4" id="tech-points-list">
                {selectedProduct.technicalPoints.map((point, pIdx) => (
                  <div key={pIdx} className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      {renderIconComponent(point.icon)}
                      <span className="font-bold text-zinc-100">{point.title}</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed pl-7 font-light">
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Firmware updates changelog log */}
            <div className="p-6 bg-[#09090e] border border-white/5 rounded-2xl space-y-3">
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">FIRMWARE CHANGELOG & STABILITY</span>
              <div className="font-mono text-[10px] space-y-2 text-slate-400">
                {selectedProduct.changelog.map((log, lIdx) => (
                  <p key={lIdx} className="leading-relaxed">
                    • {log}
                  </p>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Installation Connect guide section */}
        <div className="p-6 sm:p-8 bg-glass border border-white/10 rounded-3xl mb-16" id="detail-connection-guide">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-6 flex items-center">
            <Hammer className="w-5 h-5 text-neon-pink-bright mr-3 animate-bounce" />
            Hướng Dẫn Ghép Đấu & Thi Công Cơ Bản (ARGB HSL Standard Workflow)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="setup-steps-row">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-neon-pink/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" id="connection-step-01">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-white group-hover:to-neon-pink-bright group-hover:text-glow-pink transition-all duration-500">01</span>
                  <div className="p-2 rounded-lg bg-neon-pink/10 border border-neon-pink/20">
                    <Wifi className="w-4 h-4 text-neon-pink-bright" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide mt-3 mb-2">
                  Cấp Nguồn Bộ Phát Sóng
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Đảm bảo sóng đã kích hoạt và được kết nối đúng với PC/Laptop/điện thoại. Sóng chưa lên thì chưa tiến hành các bước tiếp theo.
                </p>
              </div>
              <div className="mt-4 h-10 w-full bg-black/40 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-6 h-6 rounded-full border border-[#ff2d95] animate-ping" />
                  <div className="w-10 h-10 rounded-full border border-[#ff2d95]/70 animate-ping [animation-delay:0.3s]" />
                </div>
                <Radio className="w-3.5 h-3.5 text-[#ff2d95] animate-pulse relative z-10" />
                <span className="text-[8px] font-mono text-slate-500 ml-2 relative z-10">SIGNAL ACTIVE</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" id="connection-step-02">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-white group-hover:to-amber-400 transition-all duration-500">02</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide mt-3 mb-2">
                  Kiểm Tra Đường Kết Nối
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Kiểm tra kết nối LED vào các port LED, các điểm hàn dây tín hiệu và các cực nguồn (+/-) xem đã chính xác và an toàn chưa.
                </p>
              </div>
              <div className="mt-4 h-10 w-full bg-black/40 rounded-lg flex items-center justify-center gap-1.5 border border-white/5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s`, boxShadow: "0 0 6px #10b981" }}
                  />
                ))}
                <span className="text-[8px] font-mono text-slate-500 ml-1">PORT CHECK: OK</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" id="connection-step-03">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-white group-hover:to-yellow-400 transition-all duration-500">03</span>
                  <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide mt-3 mb-2">
                  Cấp Nguồn Mạch LED
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Cấp nguồn thiết bị mạch điều khiển LED để khởi chạy hệ thống điều hành trung tâm và sẵn sàng nhận lệnh cấu hình.
                </p>
              </div>
              <div className="mt-4 h-10 w-full bg-black/40 rounded-lg flex items-center justify-center relative border border-white/5">
                <div className="flex items-center space-x-1.5 text-yellow-400">
                  <Zap className="w-3.5 h-3.5 animate-bounce" />
                  <span className="text-[8px] font-mono text-slate-400">DC INPUT ACTIVE ⚡</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-neon-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" id="connection-step-04">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-white group-hover:to-neon-blue-bright group-hover:text-glow-blue transition-all duration-500">04</span>
                  <div className="p-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                    <Monitor className="w-4 h-4 text-neon-blue-bright" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide mt-3 mb-2">
                  Quét Dò Tìm Thiết Bị
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Mở App trên điện thoại hoặc Tool ARGB HSL máy tính để tiến hành quét và dò tìm các thiết bị hiện lên trong danh sách.
                </p>
              </div>
              <div className="mt-4 h-10 w-full bg-black/40 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/5">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent animate-pulse" />
                <span className="text-[8px] font-mono text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
                  HSL NETWORK SCANNING...
                </span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" id="connection-step-05">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-white group-hover:to-purple-400 transition-all duration-500">05</span>
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Sliders className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide mt-3 mb-2">
                  Cấu Hình Port & Loại LED
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Tiến hành cấu hình Port LED, số lượng LED, nguồn, matrix hay strip, có kích hoạt Poi hay không (nếu là mạch mới chưa được cấu hình).
                </p>
              </div>
              <div className="mt-4 h-10 w-full bg-black/40 rounded-lg flex items-center justify-around px-4 border border-white/5">
                <div className="w-12 h-1 bg-slate-800 rounded-full relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-2.5 h-2.5 rounded-full bg-purple-500" />
                </div>
                <div className="w-12 h-1 bg-slate-800 rounded-full relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-2.5 h-2.5 rounded-full bg-purple-500" />
                </div>
                <span className="text-[8px] font-mono text-slate-500">CONFIG SLOTS</span>
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" id="connection-step-06">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent group-hover:from-white group-hover:to-emerald-400 transition-all duration-500">06</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Code className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide mt-3 mb-2">
                  Timecode & Nạp Chương Trình
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  Đồng bộ thời gian trình diễn (timecode) và tiến hành nạp kịch bản hoặc chương trình chạy hiệu ứng ánh sáng hoàn chỉnh lên mạch.
                </p>
              </div>
              <div className="mt-4 h-10 w-full bg-black/40 rounded-lg flex items-center justify-between px-3 border border-white/5 overflow-hidden">
                <div className="flex items-center space-x-1.5 w-2/3">
                  <div className="h-1 bg-emerald-500 rounded-sm w-full animate-pulse" />
                </div>
                <Play className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-slate-500">RUNNING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Connection Guide (5V & 12V LED strips) */}
        {productId === "hsl4x" && (
          <div className="p-6 sm:p-8 bg-glass border border-white/10 rounded-3xl mb-16 space-y-8" id="detail-voltage-wiring-guide">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-3 animate-pulse" />
                Hướng Dẫn Đấu Nối Nguồn Chi Tiết (LED 5V & 12V)
              </h3>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-wider self-start md:self-auto">
                Điện Áp Đa Dải
              </span>
            </div>

            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-3xl font-light">
              Mạch điều khiển ARGB LED có khả năng hỗ trợ cả dải đèn LED ARGB <strong className="text-white">5V</strong> và <strong className="text-white">12V</strong>. Tùy thuộc vào loại dải LED của bạn, hãy làm theo hướng dẫn đấu nối tương ứng dưới đây để đảm bảo an toàn phần cứng và tín hiệu truyền tải luôn ổn định.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Phương án 1: LED 5V */}
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
                <div>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide">
                      Kết Nối Mạch Với Dãy LED 5V
                    </h4>
                  </div>
                  
                  <p className="font-sans text-xs text-slate-400 mb-4 font-light leading-relaxed">
                    Khi sử dụng dãy <strong className="text-white">LED 5V</strong>, quá trình đấu nối rất đơn giản vì nguồn cung cấp và điều khiển chỉ cần một loại điện áp 5V.
                  </p>

                  <ul className="space-y-3 font-sans text-xs text-slate-400 font-light mb-6">
                    <li className="flex items-start">
                      <span className="text-emerald-400 font-mono font-bold mr-2">1.</span>
                      <span>
                        <strong className="text-slate-200">Nguồn điện:</strong> Cấp nguồn <strong className="text-white">5V DC</strong> với dòng từ <strong className="text-white">1A đến 10A</strong> tùy vào tổng số lượng LED được sử dụng. Đảm bảo kết nối chân <strong className="text-white">VIN</strong> trên bo mạch nối với cực dương (+) của nguồn 5V (<strong className="text-white">V+/5V</strong>), chân <strong className="text-white">GND</strong> nối với cực âm (-) của nguồn 5V (<strong className="text-white">GND</strong>).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 font-mono font-bold mr-2">2.</span>
                      <span>
                        <strong className="text-slate-200">VLED chung:</strong> Vì bo mạch và dãy LED cùng sử dụng nguồn 5V, kết nối trực tiếp chân <strong className="text-white">VLED</strong> trên bo mạch với chân <strong className="text-white">V+/5V</strong> của nguồn điện để dùng chung cho cả bo mạch và dải LED.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 font-mono font-bold mr-2">3.</span>
                      <span>
                        <strong className="text-slate-200">Dữ liệu điều khiển:</strong> Đấu nối dây <strong className="text-white">DATA</strong> từ cổng ra của bo mạch tới chân <strong className="text-white">DATA IN</strong> của dãy LED để truyền tín hiệu điều khiển.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="relative group overflow-hidden rounded-xl border border-white/5 bg-black/40 p-2 cursor-pointer" onClick={() => {
                    setActiveView("wiring");
                    setSelectedWiringIndex(3);
                    setIsZoomed(true);
                  }}>
                    <img 
                      src="/img/controller-chip/strip_led_5v.png" 
                      alt="Sơ đồ kết nối LED 5V" 
                      className="w-full h-auto object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-xs font-mono text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 flex items-center">
                        <ZoomIn className="w-3.5 h-3.5 mr-1.5" /> Phóng to sơ đồ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phương án 2: LED 12V */}
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 flex flex-col justify-between hover:border-yellow-500/20 transition-all duration-300">
                <div>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                      <Zap className="w-4 h-4 animate-pulse" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide">
                      Kết Nối Mạch Với Dãy LED 12V
                    </h4>
                  </div>
                  
                  <p className="font-sans text-xs text-slate-400 mb-4 font-light leading-relaxed">
                    Đối với dãy <strong className="text-white">LED 12V</strong>, cần đảm bảo cực âm <strong className="text-white">GND</strong> của nguồn điều khiển và <strong className="text-white">GND</strong> của dãy LED phải được nối chung.
                  </p>

                  <ul className="space-y-3 font-sans text-xs text-slate-400 font-light mb-6">
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-mono font-bold mr-2">1.</span>
                      <span>
                        <strong className="text-slate-200">Sử dụng mạch giảm áp (12V xuống 5V):</strong> Cấp nguồn 5V cho bo mạch điều khiển thông qua chân <strong className="text-white">VIN</strong> và <strong className="text-white">GND</strong>. Đầu vào của mạch giảm áp kết nối với nguồn 12V.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-mono font-bold mr-2">2.</span>
                      <span>
                        <strong className="text-slate-200">Nguồn điện dãy LED:</strong> Dãy LED 12V được cấp điện trực tiếp từ nguồn 12V. Chân <strong className="text-white">VLED</strong> trên bo mạch ARGB HSL để trống (<strong className="text-yellow-500 font-semibold">KHÔNG KẾT NỐI</strong>).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-mono font-bold mr-2">3.</span>
                      <span>
                        <strong className="text-slate-200">Kết nối chung GND (Rất quan trọng):</strong> GND của nguồn 12V, GND của mạch giảm áp, GND của bo mạch điều khiển, và GND của dãy LED đều phải được nối chung với nhau.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 font-mono font-bold mr-2">4.</span>
                      <span>
                        <strong className="text-slate-200">Dữ liệu điều khiển:</strong> Kết nối dây <strong className="text-white">DATA</strong> từ cổng ra của bo mạch tới chân <strong className="text-white">DATA IN</strong> của dãy LED.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="relative group overflow-hidden rounded-xl border border-white/5 bg-black/40 p-2 cursor-pointer" onClick={() => {
                    setActiveView("wiring");
                    setSelectedWiringIndex(4);
                    setIsZoomed(true);
                  }}>
                    <img 
                      src="/img/controller-chip/strip_led_12v.png" 
                      alt="Sơ đồ 12V dùng mạch giảm áp" 
                      className="w-full h-auto object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-xs font-mono text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 flex items-center">
                        <ZoomIn className="w-3.5 h-3.5 mr-1.5" /> Phóng to sơ đồ hạ áp
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lưu ý kỹ thuật & Warning */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border-l-4 border-amber-500 space-y-3 font-sans text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase tracking-wider font-mono">
                <AlertTriangle className="w-4 h-4 animate-pulse" />
                <span>Lưu Ý Kỹ Thuật</span>
              </div>
              <div className="text-slate-300 space-y-2 leading-relaxed">
                <p>
                  ⚡ <strong className="text-white">Với LED 12V:</strong> Bất kể sử dụng phương án nào, cực âm (<strong className="text-white">GND</strong>) của nguồn điều khiển bo mạch và cực âm (<strong className="text-white">GND</strong>) của dãy LED <strong className="text-amber-400 font-bold">bắt buộc phải được nối chung</strong> để hệ thống hoạt động ổn định và chính xác.
                </p>
                <p>
                  ⚡ Nếu sử dụng <strong className="text-white">mạch giảm áp</strong>, đảm bảo mạch giảm áp có khả năng cung cấp đủ dòng 5V cho bo mạch điều khiển.
                </p>
                <p>
                  📝 <strong className="text-white">Ghi chú:</strong> Hãy đảm bảo rằng tất cả các dải LED được nối chung GND nếu sử dụng nhiều dãy LED song song.
                </p>
              </div>
            </div>

            {/* Sơ đồ tổng quát chung cho cả LED 5V và 12V */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center space-x-2">
                <Columns className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Sơ Đồ Đấu Nối Tổng Quát Chung (LED 5V & 12V)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 font-sans text-xs text-slate-400 space-y-2 font-light leading-relaxed">
                  <p>
                    Đây là sơ đồ tổng quan mô tả nguyên lý đấu nối chung giữa bo mạch điều khiển và dải LED. Sơ đồ minh họa rõ ràng các đường cấp nguồn dương (<strong className="text-emerald-400">V+</strong>), đường tín hiệu điều khiển (<strong className="text-white">DATA</strong>), và đặc biệt là cách đấu nối cực âm (<strong className="text-amber-400 font-bold">GND</strong>) chung của hệ thống.
                  </p>
                  <p>
                    💡 <strong className="text-white">Nguyên tắc cốt lõi:</strong> Tất cả các cực âm (GND) của nguồn cấp, mạch giảm áp, bo mạch và dải LED phải được nối chung lại với nhau để tạo ra điện thế chuẩn đồng nhất, giúp tín hiệu không bị chớp hay sai màu.
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="relative group overflow-hidden rounded-xl border border-white/5 bg-black/40 p-2 cursor-pointer" onClick={() => {
                    setActiveView("wiring");
                    setSelectedWiringIndex(5);
                    setIsZoomed(true);
                  }}>
                    <img 
                      src="/img/controller-chip/ket-noi-5v-12v.png" 
                      alt="Sơ đồ đấu nối tổng quát 5V & 12V" 
                      className="w-full h-auto object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-xs font-mono text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 flex items-center">
                        <ZoomIn className="w-3.5 h-3.5 mr-1.5" /> Phóng to sơ đồ chung
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav list - Browser other items bottom bar */}
        <div className="pt-12 border-t border-white/10 text-center" id="detail-foot-cross-nav">
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest block mb-4">
            KHÁM PHÁ CÁC THÀNH PHẦN KHÁC TRONG SƠ ĐỒ HỆ SINH THÁI
          </span>
          <div className="flex flex-wrap justify-center gap-3" id="cross-nav-buttons">
            {[
              { id: "v4pro", name: "HSL 2X PRO" },
              { id: "matrix", name: "Matrix Driver Pro" },
              { id: "hsl4x", name: "HSL 4X Matrix" },
              { id: "poi", name: "POI Wand Performance" }
            ]
              .filter((item) => item.id !== productId)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigateToProduct(item.id)}
                  className="px-5 py-2 rounded-xl bg-slate-900 border border-white/5 hover:border-white/20 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  Xem {item.name} ➔
                </button>
              ))}
          </div>
        </div>

      </div>

      {/* Zoom Modal */}
      {isZoomed && currentItem?.url && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${viewTitle} ${selectedProduct.name}`}
          tabIndex={-1}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md select-none outline-none"
          onClick={() => setIsZoomed(false)}
        >
          {/* Header: tiêu đề + điều khiển zoom + đóng */}
          <div
            className="w-full max-w-5xl flex justify-between items-center gap-3 mb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-300 truncate">
              {viewTitle} {selectedProduct.name} - {currentItem.label}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-slate-400 w-10 text-center tabular-nums">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                disabled={scale === 1 && offset.x === 0 && offset.y === 0}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Đặt lại zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <span className="w-px h-5 bg-white/10 mx-1" />
              <button
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Đóng cửa sổ phóng to"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Khung ảnh + nút điều hướng */}
          <div
            className="w-full max-w-5xl h-[75vh] flex items-center justify-center bg-slate-950 rounded-2xl border border-white/10 p-2 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              setScale((s) => {
                const next = Math.min(Math.max(s + (e.deltaY < 0 ? 0.25 : -0.25), MIN_SCALE), MAX_SCALE);
                if (next <= 1) setOffset({ x: 0, y: 0 });
                return next;
              });
            }}
          >
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={() => changeSlide(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changeSlide(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                  aria-label="Ảnh kế tiếp"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <img
              src={currentItem.url}
              alt={`${viewTitle} ${selectedProduct.name} - ${currentItem.label} (phóng to)`}
              draggable={false}
              onPointerDown={(e) => {
                if (scale <= 1) return;
                dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!dragRef.current) return;
                setOffset({
                  x: dragRef.current.ox + (e.clientX - dragRef.current.startX),
                  y: dragRef.current.oy + (e.clientY - dragRef.current.startY),
                });
              }}
              onPointerUp={() => { dragRef.current = null; }}
              onDoubleClick={() => (scale > 1 ? resetZoom() : setScale(2))}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                cursor: scale > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-in",
                transition: dragRef.current ? "none" : "transform 0.2s ease-out",
              }}
              className="max-w-full max-h-full object-contain will-change-transform touch-none"
            />
          </div>

          {/* Footer: bộ đếm + gợi ý */}
          <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-slate-500">
            {galleryItems.length > 1 && (
              <span className="text-slate-300 tabular-nums">
                {currentIndex + 1} / {galleryItems.length}
              </span>
            )}
            <span>ESC để đóng · ← → đổi ảnh · cuộn/+− để zoom · kéo để di chuyển</span>
          </div>
        </div>
      )}
    </div>
  );
}
