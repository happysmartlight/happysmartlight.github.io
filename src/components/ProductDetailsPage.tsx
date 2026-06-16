import { useState, useEffect } from "react";
import { ArrowLeft, Cpu, Columns, Layers, Radio, Sliders, Play, Check, Sparkles, Battery, Monitor, Code, Settings, AlertTriangle, Hammer } from "lucide-react";
import { motion } from "motion/react";

interface ProductDetailsPageProps {
  productId: string;
  onBack: () => void;
  onQuoteRequested: (productName: string) => void;
  onNavigateToProduct: (id: string) => void;
}

export default function ProductDetailsPage({ productId, onBack, onQuoteRequested, onNavigateToProduct }: ProductDetailsPageProps) {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  const productsDetailedData: Record<string, {
    name: string;
    tagline: string;
    description: string;
    badge: string;
    glowColor: "pink" | "blue" | "purple";
    heroSpecs: { label: string; value: string }[];
    fullSpecs: { category: string; list: { label: string; value: string }[] }[];
    architectures: string[];
    technicalPoints: { title: string; desc: string; icon: string }[];
    connectionSteps: { step: string; title: string; desc: string }[];
    changelog: string[];
  }> = {
    v4pro: {
      name: "Bộ Điều Khiển ARGB Happy Smart Light V4 PRO",
      tagline: "Ông vua phân phối tín hiệu LED pixel đa cực cho sân khấu và nội thất cao cấp",
      description: "Thoát ly hoàn toàn khỏi giới hạn của firmware cũ, dòng V4 PRO được kỹ sư Happy Smart Light tái kiến trúc nguyên bản phần cứng lẫn firmware dựa trên cốt lõi giao thức truyền thông ARGB HSL độc quyền. Điều này giảm thiểu tệp tin mào đầu (packet header overhead), cho khả năng truyền tải dải màu sRGB/HDR 60 FPS mượt mà vượt trội không bị rách khung hình hay rung giật.",
      badge: "Flagship Bán Chạy",
      glowColor: "pink",
      heroSpecs: [
        { label: "Chip xử lý", value: "Dual Core LX7 240MHz + Wi-Fi Co-Processor" },
        { label: "Số cổng ARGB", value: "2 cổng cách ly vật lý quang học độc lập" },
        { label: "Tải pixel tối đa", value: "4,096 Pixels @ 30 FPS / 2,048 @ 60 FPS" },
        { label: "Giao thức truyền", value: "ARGB HSL Sync (Độc quyền) / xLights DDP / Art-Net" }
      ],
      fullSpecs: [
        {
          category: "Thông số Nguồn & Điện áp",
          list: [
            { label: "Điện áp danh định đầu vào", value: "DC 5V - 24V hỗ trợ cấp sườn rẽ nhánh điện áp rộng" },
            { label: "Dòng chịu tải bo mạch tối đa", value: "15A liên tục, tích hợp cầu chì đồng thau chống cháy nổ" },
            { label: "Mạch lọc nhiễu lọc nguồn", value: "Tụ phân cực rắn Nhật Bản ESR siêu thấp 470uF ngăn sụt dòng đột ngột" }
          ]
        },
        {
          category: "Cổng giao tiếp & Tín hiệu",
          list: [
            { label: "Bộ chuyển mức Logic (Level Shifter)", value: "Sử dụng IC chuyển mức chuẩn công nghiệp 3.3V lên đúng 5.0V" },
            { label: "Băng tải nhiễu tín hiệu", value: "Trở kháng đường truyền triệt tiêu 33 Ohm hạn chế sóng phản xạ đuôi" },
            { label: "Cổng ra phụ trợ", value: "Khe cắm I2C và chân nạp GPIO mở rộng kết nối rơle cơ học" }
          ]
        },
        {
          category: "Khả năng truyền thông không dây",
          list: [
            { label: "Công nghệ BLE Antenna", value: "Chíp BLE v4.2 cự ly tầm gần quét cực tốc dưới 3 mét" },
            { label: "Modem Wi-Fi nội bộ", value: "Trạm thu sóng IP độc lập 2.4Ghz, hỗ trợ mả hóa WPA2/WPA3 Personal" },
            { label: "Chuẩn đóng vỏ", value: "Vỏ kim loại nhôm CNC anode cao cấp, chống bám vân tay tản nhiệt tốt" }
          ]
        }
      ],
      architectures: [
        "Sơ đồ chân ra: GND | D1 (Cổng 1) | D2 (Cổng 2) | VCC (+5V -> +24V)",
        "Thiết đặt nút bấm: Nhấn giữ 3s Reset phát Wifi / Nhấn 1 lần chuyển hiệu ứng ARGB HSL ngoại tuyến"
      ],
      technicalPoints: [
        {
          title: "Giao thức truyền ARGB HSL",
          desc: "Tự phát triển tại Việt Nam để tối giản gói dữ liệu mạng UDP truyền tải. Khối lượng gói giảm 45% so với giao thức cũ, khắc phục đứt gãy khung hình lúc nhảy EDM độ phân giải lớn.",
          icon: "code"
        },
        {
          title: "Level Shifter Công Nghiệp",
          desc: "Sơ mạch V4 PRO trang bị vi mạch khuếch đại điện áp logic tín hiệu chống suy hao. Dù gậy hay dải đèn LED cách bộ điều khiển tới 10 mét dây nối, chớp màu vẫn hiển thị hoàn hảo.",
          icon: "cpu"
        },
        {
          title: "Tản Nhiệt Anode Nguyên Khối",
          desc: "Được đúc gọt CNC từ hợp kim nhôm cao cấp giúp vi xử lý duy trì nhiệt độ dưới 48°C ngay cả khi truyền dữ liệu đầy công suất 2 cổng liên tục 24/7.",
          icon: "layers"
        }
      ],
      connectionSteps: [
        { step: "01", title: "Cấp Nguồn Cho Thiết bị", desc: "Đấu nối nguồn DC 5V-24V phù hợp với điện áp của cuộn dải LED (Dải WS2812B dùng 5V, dải GS8208 hoặc WS2811 dùng 12V) trực tiếp vào rắc vặn vít VCC và GND." },
        { step: "02", title: "Kết Nối LED Pixel", desc: "Hàn dây tín hiệu (Data) vào cổng D1 hoặc D2 trên mạch. Bọc gen co nhiệt để phòng tránh đoản mạch làm cháy dải led." },
        { step: "03", title: "Scan BLE và nạp Wifi", desc: "Mở app ARGB HSL trên điện thoại Android bấm 'Tìm thiết bị'. Chọn V4 PRO sẵn có và nạp tên+mật khẩu Wi-Fi nhà bạn." },
        { step: "04", title: "Kích Hoạt & Trình Diễn", desc: "Giờ bạn có thể thoải mái chọn hàng trăm hiệu ứng có sẵn hoặc mở máy PC sử dụng thiết kế timeline kịch bản nhạc trên xLights phát sóng đồng bộ mượt mà." }
      ],
      changelog: [
        "v4.2.1-stable: Cải tiến thuật toán phục hồi gói tin UDP bị mất (Packet loss recovery logic)",
        "v4.0.0-release: Chuyển đổi toàn diện sang độc quyền giao thức ARGB HSL và tích hợp app di động mới"
      ]
    },
    matrix: {
      name: "Happy Smart LED Matrix Driver Pro",
      tagline: "Bộ lái ma trận LED chuyên nghiệp hàng đầu cho Tranh điện, Biển hiệu kịch bản phức tạp",
      description: "Không đơn giản là hiển thị dải màu chạy đuổi, Happy Smart LED Matrix Driver Pro tương đương một card máy tính mini hóa, hỗ trợ bóc tách từng điểm màu rực rỡ và lập sơ đồ tọa độ cho các tấm ma trận (panel) WS2812B/SK6812 ghép đôi với nhau thành những bức tường LED đa sắc khổng lồ chất lượng cao.",
      badge: "Ông Vua Ma Trận LED",
      glowColor: "blue",
      heroSpecs: [
        { label: "Vi xử lý", value: "ESP32-S3 High-Speed 32-bit MCU với 8MB PSRAM" },
        { label: "Mật độ ma trận", value: "Hỗ trợ cấu hình tối đa tới sơ đồ 64x64 hoặc 128x32" },
        { label: "Bộ lưu trữ cứng", value: "Thẻ nhớ MicroSD FAT32 tích hợp sẵn (Lắp kèm thẻ 16GB)" },
        { label: "Giao thức truyền", value: "ARGB HSL Matrix stream / xLights DDP / TCP Ethernet" }
      ],
      fullSpecs: [
        {
          category: "Công năng hiển thị",
          list: [
            { label: "Số lượng bóng gánh tối đa", value: "4,096 bóng (Tương đương tấm ma trận 64x64 mật độ cực cao)" },
            { label: "Định dạng ảnh POV/Matrix", value: "Xử lý trực tiếp ảnh kịch bản BMP, GIF động, Video cắt phân đoạn" },
            { label: "Chế độ đồng bộ", value: "Tự động phát hiện kịch bản lưu trong thẻ nhớ SD khi ngắt Wi-Fi mạng" }
          ]
        },
        {
          category: "Vận hành phần cứng",
          list: [
            { label: "Cầu đấu phân dòng nguồn", value: "Cầu đấu đồng khối mạ đồng chịu dòng cực lớn lên tới 40A liên tục" },
            { label: "Bộ điều ổn dòng điện", value: "Hạn dòng kỹ thuật số thông minh (Amps Limiter) thông qua trang quản trị" },
            { label: "Cổng mạng dây mở rộng", value: "Hỗ trợ chân kết nối module Ethernet LAN RJ45 cho tốc độ ping tuyệt đối" }
          ]
        }
      ],
      architectures: [
        "Sơ đồ ghép: Ghép ngang và ghép đứng không giới hạn số lượng tấm (config qua app điện thoại dễ dàng)",
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
        { step: "01", title: "Cấp Nguồn Công Suất Lớn", desc: "Dải Ma trận 64x64 ngốn dòng điện rất lớn (tới 20A khi sáng trắng tối đa). Cấp nguồn nguồn 5V amper tương ứng vào gá kẹp đồng." },
        { step: "02", title: "Đấu Tấm Ma Trận", desc: "Kết nối cổng Data Out trên Driver Pro vào chân Data In trên tấm ma trận LED, chú ý đúng hướng mũi tên chỉ dẫn tín hiệu." },
        { step: "03", title: "Cấu Hình Tọa Độ", desc: "Mở app trên điện thoại Android, nhập kích thước ma trận (ví dụ: Rows 32, Cols 64) và chạy kịch bản quét tọa độ pixel." },
        { step: "04", title: "Truyền Hoạt Ảnh", desc: "Đón nhận ảnh GIF động hoặc luồng video streaming từ PC điều khiển trực quan qua mạng hoặc chạy tệp tin nạp sẵn từ thẻ nhớ SD." }
      ],
      changelog: [
        "v2.12-stable: Bổ sung công cụ xoay xoay góc 90, 180, 270 trực quan ngay trên Dashboard",
        "v2.0.0-release: Thiết kế lại toàn bộ vi xử lý để tích hợp khe SD siêu tốc và ESP32-S3 thế hệ mới"
      ]
    },
    car: {
      name: "Happy Car Auto-Sync LED Controller",
      tagline: "Bộ điều khiển LED gầm và nội thất xe hơi, xe máy chống sốc điện cực mạnh",
      description: "Được thiết kế sinh ra để chinh chiến trên các nẻo đường cùng phương tiện di chuyển, bộ điều khiển Happy Car Auto-Sync mang cấu chế chịu lực, chống rung chấn mệt mỏi, chống chịu độ ẩm bụi bặm đường phố nặng nề, cùng mạch bảo vệ tụ lọc chống sốc điện áp máy nổ đột ngột cực kỳ bền bỉ.",
      badge: "Chuyên Dụng Cho Xe",
      glowColor: "purple",
      heroSpecs: [
        { label: "Điện áp lấy trực tiếp", value: "Cơ chế ổn dải cực rộng DC 9V - 30V từ acquy" },
        { label: "Mức Chống Nước", value: "IP68 Đổ keo silicon epoxide nguyên khối bảo vệ" },
        { label: "Kênh Ra Độc Lập", value: "4 Cổng kiểm soát (Trước, Sau, Gầm Trái, Gầm Phải)" },
        { label: "Bộ Cảm Nhận", value: "Cảm biến gia tốc IMU điều màu theo độ nghiêng/vận tốc xe" }
      ],
      fullSpecs: [
        {
          category: "Chống chịu vật lý & Điện áp",
          list: [
            { label: "Lọc nhiễu sườn", value: "Tích hợp cuộn cảm lọc tầng số cao nhiễu máy phát xoay chiều xe hơi" },
            { label: "Chống sốc điện áp đề máy", value: "Diode TVS triệt tiêu quá áp tức thời lên tới 60V trong vòng 1 nano-giây" },
            { label: "Giải nhiệt rảnh", value: "Không dùng quạt cơ học, tản nhiệt thụ động thông qua kết cấu keo đặc biệt" }
          ]
        },
        {
          category: "Khả năng đồng bộ kịch bản",
          list: [
            { label: "Auto-Reconnect bluetooth", value: "Khi chủ xe bước lên cabin mở khóa, app lập tức tự kết nối thiết bị" },
            { label: "Phản hồi cảm biến âm thanh", value: "Tích hợp micro MEMS độ nhạy cao để nhấp nháy đèn theo nhạc của loa xe hơi" },
            { label: "Đồng bộ phanh và xi nhan", value: "2 chân rơle đọc điện phanh và xi nhan để đổi màu vàng/đỏ tự động" }
          ]
        }
      ],
      architectures: [
        "Lắp đặt: Bắt vít gầm xe hoặc dán keo 3M chuyên dụng (mạch đổ keo nguyên khối cứng cáp không ngại va đập)",
        "Đấu nối rơ-le: Tín hiệu rẽ trái/phanh tự chuyển hệ thống đèn sang nhấp nháy đỏ cảnh báo siêu an toàn"
      ],
      technicalPoints: [
        {
          title: "Thiết Kế Đúc Silicon Kín Mạch (IP68)",
          desc: "Đạt chuẩn chống ngập nước vượt trội. Bạn có thể thoải mái rửa xe xịt vòi nước áp lực cao trực tiếp vào hộp điều khiển mà không sợ hư hỏng mạch.",
          icon: "hammer"
        },
        {
          title: "Bảo Vệ Đề Máy Sốc Điện",
          desc: "Lọc gạt các điện áp nhiễu gai phát ra từ ác-quy lúc khởi động động cơ xe, đảm bảo tuổi thọ chip LED không bao giờ bị già yếu hay hư hỏng.",
          icon: "settings"
        },
        {
          title: "Cảm Biến Nhạc MEMS Thông Minh",
          desc: "Không bị ảnh hưởng bởi tiếng gió rít bên ngoài cabin. Chỉ đón nhận năng lượng dải tần bass ấm của hệ thống loa để múa màu tương thích chân thực.",
          icon: "radio"
        }
      ],
      connectionSteps: [
        { step: "01", title: "Nối Nguồn Acquy", desc: "Đấu nối cực dương (+) và âm (-) trực tiếp vào cọc Acquy xe. Khuyên dùng thêm một cầu chì phụ 10A gần bình Acquy để an tâm." },
        { step: "02", title: "Chạy Dải LED Gầm", desc: "Luồn dải LED bọc nhựa chống nước dọc thân xe, ghim vít chắc chắn vào mép gầm sắt tránh chạm trục các-đăng quay dầm xoay." },
        { step: "03", title: "Kết App ARGB HSL Car", desc: "Mở app di động kết nối BLE siêu nhanh, chọn chế độ đồng màu dải gầm xe." },
        { step: "04", title: "Đấu Chân Tín Hiệu Phanh", desc: "Bắt cầu tín hiệu từ dây đèn hậu và đèn xi nhan vào chân cảm ứng Trigger của bộ điều khiển để kích hoạt cảnh báo đổi màu tự động khi phanh gấp." }
      ],
      changelog: [
        "v3.1.0-release: Nâng cấp dải màu phanh cảnh báo xi-nhan chạy đuổi cực phong cách thể thao",
        "v3.0.0-market: Bản thương mại hóa chuyên sâu đầu tiên dành riêng cho các xưởng Độ Xe Hơi chuyên nghiệp"
      ]
    },
    poi: {
      name: "Happy POI Performance Wand (Gậy LED Biểu Diễn)",
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
            { label: "Tần số làm mượt", value: "Đồng bộ quét dọc 600 dòng ảnh mỗi giây vẽ chính xác tuyệt đối" },
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
          desc: "Đắt đỏ và vượt trội hoàn toàn WS2812B. Giúp hình ảnh múa POV hoàn hảo không hề có bất kỳ sọc quét dọc hay vệt đen nào khi quay video phơi sáng dài.",
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

  return (
    <div className="relative min-h-screen bg-[#020204] text-[#f8fafc] font-sans pt-24 pb-16 relative overflow-hidden" id="product-detail-subpage-container">
      {/* Decorative large blurry glowing bulbs */}
      <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10 ${
        selectedProduct.glowColor === 'pink' ? "bg-neon-pink/15" : selectedProduct.glowColor === 'blue' ? "bg-neon-blue/15" : "bg-purple-500/15"
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
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-blue text-center font-display text-xs font-bold uppercase tracking-wider text-white shadow-glow-dual hover:scale-103 transition-transform cursor-pointer"
                id="btn-detail-order-quote"
              >
                Nhận Báo Giá & Bản Vẽ Thiết Kế Đấu Nối ➔
              </button>
              
              <a 
                href="#estimator"
                onClick={() => {
                  const element = document.getElementById("estimator");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="py-4 px-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-white/20 text-center font-display text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                Tính dự toán LED ngay
              </a>
            </div>
          </div>

          {/* Right Columns - Visual circuit mockup or diagram simulation */}
          <div className="lg:col-span-5 flex justify-center" id="detail-visual-chassis">
            <div className={`w-full max-w-sm rounded-3xl bg-slate-950 border p-6 justify-between flex flex-col min-h-[380px] relative overflow-hidden shadow-glow-dual/20 ${
              selectedProduct.glowColor === 'pink' ? "border-neon-pink/25" : selectedProduct.glowColor === 'blue' ? "border-neon-blue/25" : "border-purple-500/25"
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
                      <span className="text-neon-pink-bright">HSL_V4_BUS</span>
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
                    <path d="M 0 10 L 10 10 L 12 2 L 14 18 L 16 10 L 30 10 L 32 2 L 34 18 L 36 10 L 55 10 L 57 2 L 59 18 L 61 10 L 80 10 L 82 2 L 84 18 L 86 10 L 100 10" fill="none" className="stroke-neon-blue animate-pulse" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Disclaimer warning info */}
              <div className="pt-4 border-t border-white/5 flex items-center space-x-2.5 text-[9px] font-mono text-yellow-500">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Chú ý: Luôn ngắt nguồn điện trước khi hàn gá dải LED để tránh hư hỏng linh kiện.</span>
              </div>
            </div>
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
            <Hammer className="w-5 h-5 text-neon-pink-bright mr-3" />
            Hướng Dẫn Ghép Đấu & Thi Công Cơ Bản (ARGB HSL Standard Workflow)
          </h3>
          <div className="grid md:grid-cols-4 gap-6" id="setup-steps-row">
            {selectedProduct.connectionSteps.map((step) => (
              <div key={step.step} className="space-y-3 relative group" id={`connection-step-${step.step}`}>
                <div className="flex items-center justify-between">
                  {/* Decorative step number big */}
                  <span className="font-mono text-3xl font-extrabold text-white/10 group-hover:text-neon-blue-bright/20 transition-colors">
                    {step.step}
                  </span>
                  <div className="w-6 h-[1px] bg-white/10 flex-1 mx-4 hidden md:block" />
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#00e5ff] uppercase tracking-wide">
                  {step.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Nav list - Browser other items bottom bar */}
        <div className="pt-12 border-t border-white/10 text-center" id="detail-foot-cross-nav">
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest block mb-4">
            KHÁM PHÁ CÁC THÀNH PHẦN KHÁC TRONG SƠ ĐỒ HỆ SINH THÁI
          </span>
          <div className="flex flex-wrap justify-center gap-3" id="cross-nav-buttons">
            {[
              { id: "v4pro", name: "HSL V4 PRO" },
              { id: "matrix", name: "Matrix Driver Pro" },
              { id: "car", name: "Car Auto-Sync" },
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
    </div>
  );
}
