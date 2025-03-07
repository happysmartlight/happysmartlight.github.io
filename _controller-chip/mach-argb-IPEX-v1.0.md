---
layout: post
title: "Bộ mạch điều khiển đa năng các loại Chip LED PIXEL ARGB IPEX V1.0"
meta-title: "Controller ARGB IPEX V1.0"
## subtitle: "... Connect device to the Wi-Fi network"
bigimg:
  - "/img/controller-chip/banner.png"
image: "/img/controller-chip/argb_IPEX_ver1.0.png"
tags: hsl, happy, smart, light, visual, led, poi
category: LED PIXEL


# author: "BangNguyen"
# comments: true
---

# 🎉 Chào mừng đến với Bộ Điều Khiển Chip LED PIXEL ARGB IPEX V1.0! ✨  

📌 **Hướng dẫn nhanh:**  

- [🛠 Bắt đầu cơ bản](/argb-hsl/basics/getting-started)  
- [🎨 Hiệu ứng LED](/argb-hsl/features/effects)  
  - Ví dụ: ![Ví dụ](https://raw.githubusercontent.com/scottrbailey/WLED-Utils/master/gifs/FX_112.gif)
- [🌈 Bảng màu LED](/argb-hsl/features/palettes)  
  - Ví dụ: ![Ví dụ](https://raw.githubusercontent.com/scottrbailey/WLED-Utils/master/gifs/PAL_46.gif)               
- [📺 Video hướng dẫn](/argb-hsl/basics/tutorials)  

🚀 Các **hiệu ứng có thể pha trộn (mix) với nhau** nên gần như **không giới hạn hiệu ứng** mà chỉ phụ thuộc vào sự sáng tạo của người sử dụng mạch.

🚀 **Bộ điều khiển mạnh mẽ với khả năng triển khai nhanh chóng**, hỗ trợ **LED NeoPixel** (WS2812B, WS2811, SK6812, …) và các dòng LED SPI như WS2801, APA102!  
---

## 🔥 Bộ điều khiển Chip LED PIXEL ARGB IPEX V1.0  

✅ Với bộ điều khiển thế hệ mới **ARGB IPEX V1.0**, hỗ trợ **anten rời** giúp tăng tầm bắt sóng.  
✅ **Điện áp 5V**, kích thước mạch nhỏ gọn, **tích hợp cổng Type-C** tiện lợi.  
✅ PCB được thiết kế chắc chắn, **linh kiện chất lượng cao**, lắp ráp hoàn toàn bằng **dây chuyền robot tự động**.  
✅ **2 ngõ ra LED 3 chân độc lập** (hoặc **1 ngõ ra LED 4 chân**).  

🖼 **Hình ảnh PCB Chip LED PIXEL ARGB IPEX V1.0:**  

<div class="image-gallery">
   <img src="/img/controller-chip/argb_IPEX_ver1.0_TOP.png" alt="MẶT TRƯỚC">
   <img src="/img/controller-chip/argb_IPEX_ver1.0_BOT.png" alt="MẶT SAU">
</div>

---

## 💡 Các loại chip LED được hỗ trợ  

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

### 📌 PWM & Các giao thức khác  

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

## ⚙️ Tính năng nổi bật  

✅ **180+ hiệu ứng đặc biệt** với thư viện **WS2812FX**.  
✅ **FastLED** hỗ trợ **50 bảng màu** sinh động.  
✅ **Phân đoạn LED linh hoạt** – tạo hiệu ứng riêng cho từng phần.  
✅ **Kết nối WiFi thông minh**, quản lý từ xa.  
✅ **Hỗ trợ 2 ngõ ra LED** – tối đa **800 LED mỗi đầu ra**.  
✅ **Lưu trữ đến 250 Preset** – dễ dàng chuyển đổi giữa các hiệu ứng.  
✅ **Tích hợp API, MQTT, HTTP, UDP**.  
✅ **Hỗ trợ cập nhật OTA** – bảo mật bằng mật khẩu.  
✅ **Chức năng đèn ngủ** – giảm độ sáng tự động.  
✅ **Đồng hồ LED Analog & Cronixie**.  
✅ **Tự động giới hạn độ sáng** – bảo vệ thiết bị.  

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

🔗 [Danh sách phần mềm đầy đủ](basics/compatible-software)  

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
