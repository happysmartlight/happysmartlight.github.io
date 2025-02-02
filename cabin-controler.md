---
layout: page
title: Bộ điều khiển CABIN LED
meta-title: "HSL CABIN LED"
bigimg:
  - "/img/led-matrix/BANNER.png"
image: "/img/led-matrix/matrix1.jpg"
tags: hsl, happy, smart, light, visual, led, poi
---
<head>
	<link rel="stylesheet" type="text/css" href="css/book_style.css" />
	<link rel="stylesheet" type="text/css" href="css/books_component.css" />
	<!-- Modernizr is used for flexbox fallback -->
	<script src="js/modernizr.custom.js"></script>
</head>


<div class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/BANER__ARGB_2.jpg');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Matrix LED✨
  </div>
  <div class="description-content-index-sp">
    💡Đây là dòng sản phẩm LED hiện đại.<br>
    💡Mang lại hiệu suất cao, bền bỉ và đa dạng về mẫu mã. <br>
    💡Trình diễn ánh sáng chất lượng cao.
  </div>
  <div class="details">
    {% for post in site.led-matrix %}
    <div class="component">
      {% if post.image %}
      <!-- Ảnh đại diện bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        <img src="{{ post.image }}" alt="{{ post.title }}" class="avatar" loading="lazy">
      </a>
      {% endif %}
      <!-- Tiêu đề bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        <div class="component-name">{{ post.title }}</div>
      </a>
    </div>
    {% endfor %}
  </div>
</div>
