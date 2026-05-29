---
layout: post
title: "Bộ mạch điều khiển đa năng các loại Chip LED PIXEL ARGB IPEX V2.0"
meta-title: "Controller ARGB IPEX V2.0"
# subtitle: "... Connect device to the Wi-Fi network"
bigimg:
  - "/img/controller-chip/ARGB_HSL_4.png"
image: "/img/controller-chip/ARGB_HSL_4.png"
tags: hsl, happy, smart, light, visual, led, poi
categories: [LED PIXEL, controller-chip, controller-chip#ledPixel]

# author: "BangNguyen"
# comments: true
---

# 🎉 Bộ Điều Khiển Chip LED PIXEL ARGB IPEX V2.0 – Nhỏ Gọn, Sạc Pin Type-C! 🔥  

> 📢 **Giá mạch điều khiển: 739.000đ/mạch** (đã bao gồm VAT)  
> ✅ Khuyến khích dùng **2 mạch trở lên** để lập trình hiệu ứng đồng bộ  

# 🚀 Tải phẩn mềm Happy Smart Light

- 🔧 **POI TOOL HSL v1.5** 

- 🎭 **Đạo cụ & Trang phục (TimeCode / xLights)** 

- **Link Đầy Đủ** [Download Tất Cả](https://drive.google.com/drive/folders/1sPGiqML3gM14iFop44tH6MFm2_VKa3mB?usp=sharing)

📌 **Hướng dẫn nhanh:**  
- [🛠 Bắt đầu cơ bản](dang-xay-dung)  
- [🎨 Hiệu ứng LED](/argb-hsl/features/effects)  
  - Ví dụ: ![Ví dụ](https://raw.githubusercontent.com/scottrbailey/WLED-Utils/master/gifs/FX_112.gif)
- [🌈 Bảng màu LED](/argb-hsl/features/palettes)  
  - Ví dụ: ![Ví dụ](https://raw.githubusercontent.com/scottrbailey/WLED-Utils/master/gifs/PAL_46.gif)               
- [📺 Video hướng dẫn](dang-xay-dung)  

🚀 Các **hiệu ứng có thể pha trộn (mix) với nhau** nên gần như **không giới hạn hiệu ứng** mà chỉ phụ thuộc vào sự sáng tạo của người sử dụng mạch.

🚀 **Bộ điều khiển mạnh mẽ với khả năng triển khai nhanh chóng**, hỗ trợ **LED NeoPixel** (WS2812B, WS2811, SK6812, …) và các dòng LED SPI như WS2801, APA102!   

---

## 🔥 Bộ Điều Khiển LED PIXEL ARGB IPEX V2.0 – Cải Tiến Mới  

✅ **Sạc pin qua Type-C**, dễ dàng sử dụng với pin lithium.  
✅ **Bảo vệ pin an toàn**, chống quá tải và xả quá mức.  
✅ **Kích thước nhỏ gọn**, phù hợp cho mọi dự án LED di động.  
✅ **Tích hợp 4 ngõ ra LED**, linh hoạt trong điều khiển hiệu ứng.  
✅ **Hỗ trợ cập nhật OTA**, dễ dàng nâng cấp firmware.  
✅ **Hỗ trợ anten rời**, giúp tăng tầm bắt sóng.  
✅ **Điện áp 5V**, PCB chắc chắn, linh kiện chất lượng cao.  
✅ **Lắp ráp hoàn toàn bằng dây chuyền robot tự động**.   

🖼 **Hình ảnh PCB LED PIXEL ARGB IPEX V2.0:**  

![3D PCB LED PIXEL ARGB IPEX V2.0](/img/controller-chip/ARGB_HSL_TOP.png)  

{% include gallery.html images=site.data.galleries.mach-argb-ipex-v2 %}


---

## ⚡ Cài Firmware Trực Tiếp Từ Trình Duyệt

> 🔥 Tính năng **Web Flash** – Không cần cài phần mềm, không cần driver phức tạp!  
> Chỉ cần **Chrome/Edge** trên máy tính và cáp **USB**, bạn có thể cài firmware mới nhất lên mạch chỉ trong vài giây.

{% include esp-web-flash.html manifest="/dist/json/manifest_ARGB_IPEX_v2.0.json" %}

---

## 💡 Các Loại LED Được Hỗ Trợ  

🔗 [Danh sách chi tiết các chip LED](basics/compatible-led-strips)  

### 📌 SPI 3-wire & SPI 4-wire  

| **SPI 3-wire**        | **SPI 4-wire**          |
|-----------------------|-------------------------|
| WS281x               | APA102                  |
| SK6812/WS2814 RGBW   | LPD8806                 |
| TM1814               | LPD6803                 |
| 400kHz               | P9813                   |
| TM1829               |                         |
| UCS8903              |                         |
| UCS8904 RGBW         |                         |
| WS2801               |                         |

### 📌 PWM & Các Giao Thức Khác  

| **PWM**              | **Khác**                 |
|----------------------|-------------------------|
| WS2811 White        | On/Off                   |
| PWM White           | DDP RGB (Network)        |
| PWM CCT             | E1.31 RGB (Network)      |
| PWM RGB             | Art-Net RGB (Network)    |
| PWM RGBW            | DDP RGBW (Network)       |
| PWM RGB+CCT         |                         |
| PWM RGB+DCCT        |                         |

---

## ⚙️ Tính Năng Nổi Bật  

✅ **180+ hiệu ứng đặc biệt** với thư viện **WS2812FX**  
✅ **FastLED** hỗ trợ **50 bảng màu** sinh động  
✅ **Phân đoạn LED linh hoạt** – tạo hiệu ứng riêng cho từng phần  
✅ **Kết nối WiFi thông minh**, quản lý từ xa  
✅ **Hỗ trợ 4 ngõ ra LED** – tối đa **800-1200 LED mỗi đầu ra**  
✅ **Lưu trữ đến 250 Preset** – dễ dàng chuyển đổi giữa các hiệu ứng  
✅ **Tích hợp API, MQTT, HTTP, UDP**  
✅ **Hỗ trợ cập nhật OTA** – bảo mật bằng mật khẩu  
✅ **Chức năng đèn ngủ** – giảm độ sáng tự động  
✅ **Đồng hồ LED Analog & Cronixie**  
✅ **Tự động giới hạn độ sáng** – an toàn cho LED  

---

## 🎬🎬🎬 VIDEO 🎬🎬🎬 Kết nối mạch với dãy LED 

<div class="cliptiktok">
   <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7482259628428987666" data-video-id="7482259628428987666" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Hướng dẫn sử dụng mạch ARGB IPEX V1.0.0 <a title="happysmartlight" target="_blank" href="https://www.tiktok.com/tag/happysmartlight?refer=embed">#happysmartlight</a> <a title="pixelart" target="_blank" href="https://www.tiktok.com/tag/pixelart?refer=embed">#pixelart</a> <a title="pixel" target="_blank" href="https://www.tiktok.com/tag/pixel?refer=embed">#pixel</a> <a title="hsl" target="_blank" href="https://www.tiktok.com/tag/hsl?refer=embed">#hsl</a> <a title="ledperformance" target="_blank" href="https://www.tiktok.com/tag/ledperformance?refer=embed">#LEDPerformance</a> <a title="led" target="_blank" href="https://www.tiktok.com/tag/led?refer=embed">#led</a> <a title="light" target="_blank" href="https://www.tiktok.com/tag/light?refer=embed">#light</a> <a title="ledchayduoi" target="_blank" href="https://www.tiktok.com/tag/ledchayduoi?refer=embed">#ledchayduoi</a> <a target="_blank" title="♬ We Dont Talk(抖音原版) - 珊爷" href="https://www.tiktok.com/music/We-Dont-Talk-抖音原版-6891677881726928910?refer=embed">♬ We Dont Talk(抖音原版) - 珊爷</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

   <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7380609403973602577" data-video-id="7380609403973602577" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Chạy chữ trên nền động. Phù hợp những tiệm trà sữa, chè, …<a title="happysmartlight" target="_blank" href="https://www.tiktok.com/tag/happysmartlight?refer=embed">#happysmartlight</a> <a title="led" target="_blank" href="https://www.tiktok.com/tag/led?refer=embed">#led</a> <a title="argb" target="_blank" href="https://www.tiktok.com/tag/argb?refer=embed">#argb</a> <a target="_blank" title="♬ nhạc nền  - Đèn thông minh Happy" href="https://www.tiktok.com/music/nhạc-nền-Đèn-thông-minh-Happy-7380609451478305553?refer=embed">♬ nhạc nền  - Đèn thông minh Happy</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
</div>

---

## 🎛 Ứng dụng điều khiển  

### 🖥 **Trên PC/Laptop:**  
- 🔥 [ARGB PC – LED Control](https://github.com/w00000dy/WLED-GUI/releases)  

### 📱 **Trên Smartphone:**  
- 🔥 [ARGB Android](https://play.google.com/store/apps/details?id=ca.cgagnier.wlednativeandroid)  
- 🔥 [ARGB iOS](https://apps.apple.com/us/app/wled-native/id6446207239)  

### ⚡ **Phần mềm tùy chọn:**  
- 🔥 [xLights](https://xlights.org/releases) – lập trình LED chuyên nghiệp.  
- 🔥 [Jinx!](https://live-leds.de/) – điều khiển LED ma trận.  
- 🔥 [LedFx](https://www.ledfx.app/) – LED nhấp nháy theo nhạc.  
- 🔥 [Hyperion](https://github.com/hyperion-project/hyperion.ng) – hiệu ứng Ambilight cho TV.  

🔗 [Danh sách phần mềm đầy đủ](/argb-hsl/basics/compatible-software)  

---

## 🎬🎬🎬 VIDEO 🎬🎬🎬 Demo sản phẩm

<div class="cliptiktok">
<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7477953088481922312" data-video-id="7477953088481922312" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Resolume điều khiển led Pixel dạng thang led hoặc ma trix led. <a title="hsl" target="_blank" href="https://www.tiktok.com/tag/hsl?refer=embed">#hsl</a> <a title="resolume" target="_blank" href="https://www.tiktok.com/tag/resolume?refer=embed">#resolume</a> <a title="pixel" target="_blank" href="https://www.tiktok.com/tag/pixel?refer=embed">#pixel</a> <a title="led" target="_blank" href="https://www.tiktok.com/tag/led?refer=embed">#led</a> <a title="light" target="_blank" href="https://www.tiktok.com/tag/light?refer=embed">#light</a> <a target="_blank" title="♬ nhạc nền - user00931528601" href="https://www.tiktok.com/music/nhạc-nền-7274620162584791851?refer=embed">♬ nhạc nền - user00931528601</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7452132920799661320" data-video-id="7452132920799661320" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Led ARGB V2.1.0 <a title="led" target="_blank" href="https://www.tiktok.com/tag/led?refer=embed">#led</a> <a title="dance" target="_blank" href="https://www.tiktok.com/tag/dance?refer=embed">#dance</a>  <a title="lighttoys" target="_blank" href="https://www.tiktok.com/tag/lighttoys?refer=embed">#lighttoys</a> <a title="leddancer" target="_blank" href="https://www.tiktok.com/tag/leddancer?refer=embed">#leddancer</a> <a target="_blank" title="♬ Epic Cinematic Motivation Trailer - CinematicHub" href="https://www.tiktok.com/music/Epic-Cinematic-Motivation-Trailer-7376260653160646695?refer=embed">♬ Epic Cinematic Motivation Trailer - CinematicHub</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7379796015752203536" data-video-id="7379796015752203536" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Happy Smart Light ARGB V1.0.0 <a title="led" target="_blank" href="https://www.tiktok.com/tag/led?refer=embed">#led</a> <a title="argb" target="_blank" href="https://www.tiktok.com/tag/argb?refer=embed">#argb</a> <a title="happysmartlight" target="_blank" href="https://www.tiktok.com/tag/happysmartlight?refer=embed">#happysmartlight</a> <a title="denthongminhhappy" target="_blank" href="https://www.tiktok.com/tag/denthongminhhappy?refer=embed">#denthongminhhappy</a> <a target="_blank" title="♬ nhạc nền  - Đèn thông minh Happy" href="https://www.tiktok.com/music/nhạc-nền-Đèn-thông-minh-Happy-7379796080601008897?refer=embed">♬ nhạc nền  - Đèn thông minh Happy</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
</div>

---

> 📢 **Giá mạch điều khiển: 739.000đ/mạch** (đã bao gồm VAT)  
> ✅ Khuyến khích dùng **2 mạch trở lên** để lập trình hiệu ứng đồng bộ  

---

## 💡 Các Chuẩn Kết Nối ARGB Có Thể Sử Dụng  

- [JSON API](interfaces/json-api) & [HTTP request](interfaces/http-api)  
- [MQTT](interfaces/mqtt)  
- [E1.31](interfaces/e1.31-dmx), [Art-Net](interfaces/e1.31-dmx), DDP và [TPM2.net](interfaces/udp-realtime)  
- [UDP realtime](interfaces/udp-realtime)  
- [Alexa voice control](interfaces/remote-access-ifttt)  
- [Sync to Philips Hue lights](interfaces/philips-hue)  
- **Adalight (PC Ambilight via Serial) & TPM2**  
- [Sync color giữa nhiều bộ điều khiển (UDP notifier)](interfaces/udp-notifier)  
- [Điều khiển qua Remote Hồng Ngoại (IR)](interfaces/infrared)  

---

## ✌️ Happy Smart Light – bangnguyendev  
