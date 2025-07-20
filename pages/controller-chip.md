---
layout: page
title: "Mạch điều khiển Magic - Controller Magic HSL"
meta-title: "Light Up Your Style"
bigimg:
- "/img/Picture-HSL/HSL-index.png"
permalink: /controller-chip
---

<!-- Layer 1 -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="ledPixel" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Mạch Điều Khiển ARGB PIXEL✨
  </div>
  <div class="description-content-index-sp">
    💡Đây là dòng sản phẩm chất lượng cao.<br>
    💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
    💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.controller-chip limit:8 %}
	{% if post.category == 'LED PIXEL' %}
    <div class="component">
      {% if post.image %}
      <!-- Ảnh đại diện bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        <img src="{{ post.image }}" alt="{{ post.title }}" class="avatar" loading="lazy">
      </a>
      {% endif %}
      <!-- Tiêu đề bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        {% if post.meta-title %}
        <div class="component-name">{{ post["meta-title"] }}</div>
        {% else %}
        <div class="component-name">{{ post.title }}</div>
        {% endif %}
      </a>
    </div>
	{% assign hascategoryPosts = true %}
	{% endif %}
    {% endfor %}
	<!-- Report hascategoryPosts -->
	{% unless hascategoryPosts %}
	<div class="text-center">
		<p>Hiện danh sách sản phẩm đang được cập nhật, quý khách vui lòng liên hệ HSL để nhận thông tin tư vấn chính xác.
		</p>
    {% include qr-zalo.html %}
	</div>
	{% endunless %}
  </div>
</div>

<!-- Layer 1 -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="ledMatrix" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
	<div class="summary">
	✨Mạch Điều Khiển Cabin Matrix✨
	</div>
	<div class="description-content-index-sp">
	💡Đây là dòng sản phẩm chất lượng cao.<br>
	💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
	💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
	</div>
	{% assign hascategoryPosts = false %}
	<div class="details">
    {% for post in site.controller-chip limit:8 %}
	{% if post.category == 'CONTROLLER MATRIX' %}
    <div class="component">
      {% if post.image %}
      <!-- Ảnh đại diện bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        <img src="{{ post.image }}" alt="{{ post.title }}" class="avatar" loading="lazy">
      </a>
      {% endif %}
      <!-- Tiêu đề bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        {% if post.meta-title %}
        <div class="component-name">{{ post["meta-title"] }}</div>
        {% else %}
        <div class="component-name">{{ post.title }}</div>
        {% endif %}
      </a>
    </div>
	{% assign hascategoryPosts = true %}
	{% endif %}
    {% endfor %}
	<!-- Report hascategoryPosts -->
	{% unless hascategoryPosts %}
	<div class="text-center">
		<p>Hiện danh sách sản phẩm đang được cập nhật, quý khách vui lòng liên hệ HSL để nhận thông tin tư vấn chính xác.
		</p>
    {% include qr-zalo.html %}
	</div>
	{% endunless %}
  </div>
</div>

<!-- Layer 1 -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="signalWifi" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
	<div class="summary">
	✨Mạch Tăng Cường Sóng✨
	</div>
	<div class="description-content-index-sp">
	💡Đây là dòng sản phẩm chất lượng cao.<br>
	💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
	💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
	</div>
  	{% assign hascategoryPosts = false %}
	<div class="details">
    {% for post in site.controller-chip limit:8 %}
	{% if post.category == 'BOOST SIGNAL' %}
    <div class="component">
      {% if post.image %}
      <!-- Ảnh đại diện bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        <img src="{{ post.image }}" alt="{{ post.title }}" class="avatar" loading="lazy">
      </a>
      {% endif %}
      <!-- Tiêu đề bài đăng -->
      <a href="{{ post.url | prepend: site.baseurl }}">
        {% if post.meta-title %}
        <div class="component-name">{{ post["meta-title"] }}</div>
        {% else %}
        <div class="component-name">{{ post.title }}</div>
        {% endif %}
      </a>
    </div>
	{% assign hascategoryPosts = true %}
	{% endif %}
    {% endfor %}
	<!-- Report hascategoryPosts -->
	{% unless hascategoryPosts %}
	<div class="text-center">
		<p>Hiện danh sách sản phẩm đang được cập nhật, quý khách vui lòng liên hệ HSL để nhận thông tin tư vấn chính xác.
		</p>
    {% include qr-zalo.html %}
	</div>
	{% endunless %}
  </div>
</div>


<!-- Layer 4 -->

<div class="gradient-bg">
  <div class="gradient-text">
    <P>được tạo ra bởi</P><h2>✨HAPPY SMART LIGHT✨</h2>
    <br>
    <div class="text-center">
      <a target="_blank" rel="noopener" href="/" class="project-link" title="✨HAPPY SMART LIGHT✨">
        <img src="{{ site.baseurl }}/img/Picture-HSL/trans_hsl.svg" class="img-rounded" loading="lazy" alt="✨HAPPY SMART LIGHT✨" width="30%" />
      </a>
    </div>
  </div>
</div>


