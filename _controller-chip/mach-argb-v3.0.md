---
layout: post
title: "ARGB V3.0"
meta-title: "Controller ARGB V3.0"
# subtitle: "... Connect device to the Wi-Fi network"
bigimg:
  - "/img/controller-chip/banner.png"
image: "/img/controller-chip/argb-v2.png"
tags: hsl, happy, smart, light, visual, led, poi
category: HAPPY SMART LIGHT


# author: "BangNguyen"
# comments: true
---

# 🎉 Bộ Điều Khiển LED ARGB V3.0 – Nhỏ Gọn, Sạc Pin Type-C! 🔥  

📌 **Hướng dẫn nhanh:**  
- [🛠 Bắt đầu cơ bản](basics/getting-started)  
- [🎨 Hiệu ứng LED](features/effects)  
- [🌈 Bảng màu LED](features/palettes)  
- [📺 Video hướng dẫn](basics/tutorials)  

🚀 **Phiên bản V3.0 nâng cấp mạnh mẽ** với:  
✅ **Sạc pin tiện lợi** qua cổng **USB Type-C**  
✅ **Bảo vệ pin thông minh** với **IC quản lý sạc**  
✅ **Siêu nhỏ gọn**, kích thước **chỉ 18mm x 45mm**  
✅ Hỗ trợ **LED NeoPixel (WS2812B, WS2811, SK6812, …) & SPI LED (WS2801, APA102)**  
✅ **2 ngõ ra LED** – tối đa **800 LED mỗi đầu ra**  

---

## 🔥 Bộ Điều Khiển ARGB V3.0 – Cải Tiến Mới  

- **Sạc pin thông qua Type-C**, dễ dàng sử dụng với pin lithium  
- **Bảo vệ pin an toàn**, không lo quá tải hoặc xả quá mức  
- **Kích thước nhỏ gọn**, thích hợp cho mọi dự án LED di động  
- **Tích hợp 2 ngõ ra LED**, linh hoạt trong điều khiển hiệu ứng  
- **Hỗ trợ cập nhật OTA**, dễ dàng nâng cấp firmware  

🖼 **Hình ảnh PCB V3.0:**  

![3D PCB V3.0](/ARGB-LED/image/v3.0_3D_PCB1.png)  
![Mặt trước PCB V3.0](/ARGB-LED/image/v3.0_PCB1_mat-truoc.png)  
![Mặt sau PCB V3.0](/ARGB-LED/image/v3.0_PCB1_mat-sau.png)  

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
✅ **Hỗ trợ 2 ngõ ra LED** – tối đa **800 LED mỗi đầu ra**  
✅ **Lưu trữ đến 250 Preset** – dễ dàng chuyển đổi giữa các hiệu ứng  
✅ **Tích hợp API, MQTT, HTTP, UDP**  
✅ **Hỗ trợ cập nhật OTA** – bảo mật bằng mật khẩu  
✅ **Chức năng đèn ngủ** – giảm độ sáng tự động  
✅ **Đồng hồ LED Analog & Cronixie**  
✅ **Tự động giới hạn độ sáng** – an toàn cho LED  

---

## 💡 Ứng Dụng Điều Khiển  

### ⚡ Phần Mềm Bắt Buộc  

#### 💻 Trên PC/Laptop  
- 🔥 [WLED PC – LED Control](https://github.com/w00000dy/WLED-GUI/releases)  

#### 📱 Trên Smartphone  
- 🔥 Ứng dụng **Android**: [WLED](https://play.google.com/store/apps/details?id=ca.cgagnier.wlednativeandroid)  
- 🔥 Ứng dụng **iOS**: [WLED](https://apps.apple.com/us/app/wled-native/id6446207239)  

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

## ✌️ Happy Smart Light - bangnguyendev
