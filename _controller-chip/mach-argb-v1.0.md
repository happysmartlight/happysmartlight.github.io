---
layout: post
title: "Bộ mạch điều khiển đa năng các loại Chip LED PIXEL ARGB V1.0"
meta-title: "Controller ARGB V1.0"
## subtitle: "... Connect device to the Wi-Fi network"
bigimg:
  - "/img/controller-chip/banner.png"
image: "/img/controller-chip/argb-v1.png"
tags: hsl, happy, smart, light, visual, led, poi
category: HAPPY SMART LIGHT


# author: "BangNguyen"
# comments: true
---

# 🎉 Chào mừng đến với Bộ Điều Khiển LED ARGB! ✨  

📌 **Hướng dẫn nhanh:**  

- [🛠 Bắt đầu cơ bản](basics/getting-started)  
- [🎨 Hiệu ứng LED](features/effects)  
- [🌈 Bảng màu LED](features/palettes)  
- [📺 Video hướng dẫn](basics/tutorials)  

🚀 **Bộ điều khiển mạnh mẽ với khả năng triển khai nhanh chóng**, hỗ trợ **LED NeoPixel** (WS2812B, WS2811, SK6812, …) và các dòng LED SPI như WS2801, APA102!  

---

## 🔥 Bộ điều khiển V1.0.0  

✅ Hỗ trợ **IR hồng ngoại**, cảm biến nhiệt, **cầu chì bảo vệ** LED.  
✅ 2 ngõ ra LED **3 chân độc lập** (hoặc 1 ngõ ra LED **4 chân**).  

🖼 **Hình ảnh PCB V1.0.0:**  

<div class="image-gallery">
   <img src="/ARGB-LED/image/3D_box_PCB1_2024-06-16.png" alt="3D PCB 1">
   <img src="/ARGB-LED/image/3D_PCB1_mat-truoc.png" alt="Mặt trước PCB 1">
   <img src="/ARGB-LED/image/3D_PCB1_mat-sau.png" alt="Mặt sau PCB 1">
   <img src="/ARGB-LED/image/3D_PCB1.png" alt="3D PCB tổng thể">
</div>

---

## 🔥 Bộ điều khiển V2.0.0  

✅ Kích thước **siêu nhỏ gọn**: **22mm x 52mm**.  

🖼 **Hình ảnh PCB V2.0.0:**  

<div class="image-gallery">
   <img src="/ARGB-LED/image/v2.0.0_3D_PCB1_2024-12-04.png" alt="3D PCB 2">
   <img src="/ARGB-LED/image/v2.0.0-3D_PCB1_2024-12-04-mat truoc.png" alt="Mặt trước PCB 2">
   <img src="/ARGB-LED/image/v2.0.0-3D_PCB1_2024-12-04-mat sau.png" alt="Mặt sau PCB 2">
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

## 🔗 Kết nối & API  

✅ **JSON & HTTP API**  
✅ **MQTT**  
✅ **E1.31, Art-Net, DDP, TPM2.net**  
✅ **Alexa Voice Control**  
✅ **Sync Philips Hue**  
✅ **Infrared Remote (IR 24-key)**  

---

## ✌️ Happy Smart Light – bangnguyendev  
