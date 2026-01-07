---
layout: post
title: "Hướng dẫn thiết lập tính năng POI với ARGB HSL"
meta-title: "CẤU HÌNH POI PIXEL"
## subtitle: "... Connect device to the Wi-Fi network"
bigimg:
  - "/img/post-news/poi/hinh-anh-su-dung/hinh-dep/9ec3b7f727c6a898f1d750.jpg"
image: "/img/post-news/poi/hinh-anh-su-dung/hinh-dep/9ec3b7f727c6a898f1d750.jpg"
tags: hsl, happy, smart, light, visual, led, poi
category: post-news#visualPoi
categories: [VISUAL HOOP PIXEL, poi-tools, post-news#visualPoi]
# author: "BangNguyen"
# comments: true
---


# ✨ Hướng Dẫn Sử Dụng Tính Năng POI cho Đạo Cụ Biểu Diễn — Happy Smart Light

Tính năng **POI (Persistence of Image)** trên sản phẩm của **Happy Smart Light (HSL)** cho phép hiển thị logo, chữ và hình ảnh khi đạo cụ chuyển động, giúp bài diễn trở nên nổi bật, chuyên nghiệp và ấn tượng hơn.

Bài viết dưới đây sẽ hướng dẫn khách hàng cấu hình LED, kết nối phần cứng và sử dụng phần mềm **POI TOOL HSL** để tải hình ảnh vào thiết bị.

{% include gallery.html images=site.data.galleries.poi-sample-1 %}

---

## 🔧 Yêu Cầu Phần Cứng & Quy Định Sử Dụng

* **Số LED tối đa hỗ trợ:** `145 LED cho mỗi mặt đạo cụ POI`
* **Bắt buộc sử dụng LED tần số cao chuyên dụng cho POI**

<div class="post-img-post">
  <img src="/img/post-news/poi/LED.jpg" alt="LED sử dụng">
  <p>LED chuyên dụng - HSL có cung cấp LED</p>
</div>

* **Không hỗ trợ LED loại thường**, bao gồm:

  * WS2812B
  * WS2812

> Việc sử dụng sai loại LED có thể gây lỗi hiển thị, méo hình hoặc không đồng bộ khung ảnh.

---

## 🧩 Kết Nối LED Với Mạch ARGB IPEX Version 2.0

Đối với mạch **ARGB IPEX V2.0**, vui lòng đấu nối đúng chân tín hiệu:

* **P17 → Data (Dữ liệu)**
* **P18 → CLK (Clock / Xung nhịp)**

![3D PCB LED PIXEL ARGB IPEX V2.0](/img/controller-chip/ARGB_HSL_TOP.png)  

> Khuyến cáo: Sử dụng dây chống nhiễu, hạn chế chiều dài dây để đảm bảo tín hiệu ổn định.

---

## ⚙️ Cấu Hình Số Lượng LED & Loại Chip LED


### ⚙️ Chi tiết cấu Hình 

- Sau khi kết nối được mạch vào sóng điều khiển. 

- Vào giao diện chọn Cài đặt -> Tùy chọn LED

<div class="post-img-post">
  <img src="/img/post-news/poi/b1.png" alt="Tùy chọn cài đặt">
  <p>Tùy chọn cài đặt</p>
</div>

- Ở giao diện cài đặt LED, xóa 3 Port Led bằng cách nhấn vào dấu "-", chỉ để lại 1 Port trên cùng.

<div class="post-img-post">
  <img src="/img/post-news/poi/b2.png" alt="Xóa 3 port">
  <p>Xóa 3 port</p>
</div>

- Tiếp theo, cấu hình nguồn điện sử dụng và thuộc tính POI

- Đối với mạch **ARGB IPEX V2.0**, vui lòng đấu nối đúng chân tín hiệu:

* **P17 → Data (Dữ liệu)**
* **P18 → CLK (Clock / Xung nhịp)**

- Bấm "Lưu" để lưu lại cấu hình.

<div class="post-img-post">
  <img src="/img/post-news/poi/b3.png" alt="Thiết lập LED">
  <p>Thiết lập LED</p>
</div>

- Sau khi lưu, bấm "Quay lại" để vào "Giao diện người dùng"

- Tiến hành đổi tên thiết bị, việc này không bắt buộc, tuy nhiên giúp chúng ta dễ dàng nhận diện từng thiết bị khi dùng nhiều.

<div class="post-img-post">
  <img src="/img/post-news/poi/b4.png" alt="Đổi tên thiết bị">
  <p>Đổi tên thiết bị</p>
</div>

**Lưu ý:** Việc lưu cấu hình LED sử dụng cho mục đích POI là cài đặt cứng các thuộc tính trong "Tùy Chọn LED", muốn tùy chỉnh lại buộc chúng ta phải **KHÔI PHỤC CÀI ĐẶT GỐC**

<div class="post-img-post">
  <img src="/img/post-news/poi/b5.png" alt="Khôi phục cài đặt gốc 1">
  <p>Khôi phục cài đặt gốc – bước 1</p>
</div>

<div class="post-img-post">
  <img src="/img/post-news/poi/b6.png" alt="Khôi phục cài đặt gốc 2">
  <p>Khôi phục cài đặt gốc – bước 2</p>
</div>


---

## 🖼 Thêm Hình Ảnh Logo Bằng Phần Mềm **POI TOOL HSL**

Sau khi cấu hình phần cứng:

1. Mở phần mềm **POI TOOL HSL**
2. Chọn hình ảnh / logo cần hiển thị
3. Chuyển đổi sang định dạng POI
4. Gửi ảnh trực tiếp vào mạch

Hình ảnh sẽ được lưu trong bộ nhớ và có thể phát trong quá trình biểu diễn.

## 🚀 Tải phẩn mềm Happy Smart Light

- 🔧 **POI TOOL HSL** 

- 🎭 **Đạo cụ & Trang phục (TimeCode / xLights)** 

- **Link Đầy Đủ** [Download Tất Cả](https://drive.google.com/drive/folders/1sPGiqML3gM14iFop44tH6MFm2_VKa3mB?usp=sharing)


## Giới thiệu POI TOOL HSL

- Lựa phiên bản tải về, khuyến khích sử dụng bản Terminal để kiểm tra đầy đủ thông tin hoạt động của mạch và bộ điều khiển.

<div class="post-img-post">
  <img src="/img/post-news/poi/p1.png" alt="Lựa chọn phiên bản tải về">
  <p>Lựa chọn phiên bản tải về - KHUYẾN NGHỊ BẢN TEMINAL</p>
</div>

- Lần đầu khi mở ứng dụng, hệ thống sẽ hỏi cấp quyền truy cập mạng của ứng dụng. Bấm Cho phép để ứng dụng hoạt động tốt nhất nhé!

<div class="post-img-post">
  <img src="/img/post-news/poi/p2.png" alt="Cho phép ứng dụng truy cập mạng">
  <p>Cho phép ứng dụng truy cập mạng</p>
</div>

- Giao diện của ứng dụng

<div class="post-img-post">
  <img src="/img/post-news/poi/p3.png" alt="Giao diện ứng dụng">
  <p>Giao diện ứng dụng</p>
</div>

- Kho ảnh các bạn có thể tham khảo thử nghiệm

<div class="post-img-post">
  <img src="/img/post-news/poi/p4.png" alt="Kho ảnh">
  <p>Kho ảnh mẫu</p>
  <a href="https://drive.google.com/drive/folders/14ozaEHE8HaMdTXV2ijaSowQ5bVf4-Zvf?usp=sharing"
     class="btn-download"
     target="_blank" rel="noopener">
    ⬇️ Tải / Truy cập kho ảnh
  </a>
</div>



## Clip Tiktok thử nghiệm từ nhà HSL

<div class="cliptiktok">
  <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7584604893197946132" data-video-id="7584604893197946132" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Tool Poi HSL <a title="happysmartlight" target="_blank" href="https://www.tiktok.com/tag/happysmartlight?refer=embed">#happysmartlight</a> <a title="poi" target="_blank" href="https://www.tiktok.com/tag/poi?refer=embed">#poi</a> <a title="argb" target="_blank" href="https://www.tiktok.com/tag/argb?refer=embed">#argb</a> <a target="_blank" title="♬ Stories 2 - Danilo Stankovic" href="https://www.tiktok.com/music/Stories-2-6777279827805390850?refer=embed">♬ Stories 2 - Danilo Stankovic</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

  <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7584624635786824980" data-video-id="7584624635786824980" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> Xin phép sủ dụng hình ảnh của Lighttoys chạy cho ARGB HSL ạ<a title="happysmartlight" target="_blank" href="https://www.tiktok.com/tag/happysmartlight?refer=embed">#happysmartlight</a> <a title="poi" target="_blank" href="https://www.tiktok.com/tag/poi?refer=embed">#poi</a> <a title="argb" target="_blank" href="https://www.tiktok.com/tag/argb?refer=embed">#argb</a> <a target="_blank" title="♬ Another Retrospect - DJ BAI" href="https://www.tiktok.com/music/Another-Retrospect-6991898143696619521?refer=embed">♬ Another Retrospect - DJ BAI</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

  <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@denthongminhhappy/video/7584481222504516885" data-video-id="7584481222504516885" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@denthongminhhappy" href="https://www.tiktok.com/@denthongminhhappy?refer=embed">@denthongminhhappy</a> <a title="happysmartlight" target="_blank" href="https://www.tiktok.com/tag/happysmartlight?refer=embed">#happysmartlight</a> <a title="poi" target="_blank" href="https://www.tiktok.com/tag/poi?refer=embed">#poi</a> <a title="argb" target="_blank" href="https://www.tiktok.com/tag/argb?refer=embed">#argb</a> <a title="led" target="_blank" href="https://www.tiktok.com/tag/led?refer=embed">#led</a> <a target="_blank" title="♬ nhạc nền  - Đèn thông minh Happy" href="https://www.tiktok.com/music/nhạc-nền-Đèn-thông-minh-Happy-7584481307359447809?refer=embed">♬ nhạc nền  - Đèn thông minh Happy</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
</div>

---

## 📊 Bảng Dung Lượng Ảnh & Số Ảnh Tối Đa Có Thể Lưu

| Pixel POI (N×N) | Dung lượng BMP (byte) | Dung lượng (KB) | Số ảnh tối đa (FS 4000KB) |
| --------------: | --------------------: | --------------: | ------------------------: |
|         15 × 15 |                   774 |        ~0.76 KB |                 5,290 ảnh |
|         30 × 30 |                 2,814 |        ~2.75 KB |                 1,455 ảnh |
|         60 × 60 |                10,854 |        ~10.6 KB |                   377 ảnh |
|         72 × 72 |                15,606 |        ~15.2 KB |                   262 ảnh |
|       100 × 100 |                30,054 |        ~29.3 KB |                   136 ảnh |
|       145 × 145 |                63,274 |        ~61.8 KB |                    64 ảnh |

> Lựa chọn kích thước ảnh phù hợp giúp tối ưu số lượng ảnh lưu trữ.

---

## 🎚 Preset & Số Ảnh Có Thể Sử Dụng Trong Một Bài Diễn

* **Số Preset lưu tối đa:** `250 Preset`
* Tương ứng có thể chạy **tối đa 250 ảnh cho một bài diễn**
* Mỗi Preset = **một ảnh hoặc hiệu ứng POI**

---

## 💡 Khuyến Nghị Sử Dụng

* Ưu tiên ảnh độ tương phản cao để hiển thị rõ nét
* Hạn chế ảnh quá nhiều chi tiết nhỏ ở độ phân giải cao
* Đảm bảo nguồn cấp đủ dòng cho toàn bộ hệ thống LED
* Kiểm tra lại cấu hình trước khi biểu diễn

---

## 📞 Hỗ Trợ Kỹ Thuật

Nếu cần hỗ trợ cấu hình hoặc giải đáp kỹ thuật, vui lòng liên hệ đội ngũ **Happy Smart Light**.
Chúng tôi luôn sẵn sàng đồng hành cùng khách hàng trong quá trình sử dụng sản phẩm.


{% include gallery.html images=site.data.galleries.poi-sample-2 %}

---

> **Happy Smart Light — Giải pháp ánh sáng sáng tạo cho biểu diễn chuyên nghiệp ✨**

---

## ✌️ Happy Smart Light – bangnguyendev  
