---
layout: page
title: "Gậy LED Magic -  Magic LED HSL"
meta-title: "Light Up Your Style"
bigimg:
- "/img/Picture-HSL/HSL-index.png"
permalink: /poi-tools
---

<!-- Layer 1 VISUAL POI PIXEL -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="visualPoi" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Happy POI ARGB PIXEL✨
  </div>
  <div class="description-content-index-sp">
    💡Đây là dòng sản phẩm chất lượng cao.<br>
    💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
    💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.poi-tools limit:8 %}
	{% if post.category == 'VISUAL POI PIXEL' %}
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

<!-- Layer 1 VISUAL HOOP PIXEL -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="visualHoop" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
	<div class="summary">
	✨Happy HOOP ARGB PIXEL✨
	</div>
	<div class="description-content-index-sp">
	💡Đây là dòng sản phẩm chất lượng cao.<br>
	💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
	💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
	</div>
	{% assign hascategoryPosts = false %}
	<div class="details">
    {% for post in site.poi-tools limit:8 %}
	{% if post.category == 'VISUAL HOOP PIXEL' %}
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

<!-- Layer 1 POWER -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="power" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
	<div class="summary">
	✨Nguồn và Pin✨
	</div>
	<div class="description-content-index-sp">
	💡Đây là dòng sản phẩm chất lượng cao.<br>
	💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
	💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
	</div>
  	{% assign hascategoryPosts = false %}
	<div class="details">
  {% for post in site.controller-chip limit:8 %}
	{% if post.category == 'POWER' %}
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


<!-- Layer 1 OTHER -->

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="other" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
	<div class="summary">
	✨Các mục liên quan khác✨
	</div>
	<div class="description-content-index-sp">
	💡Đây là dòng sản phẩm chất lượng cao.<br>
	💡Được thiết kế và gia công trên dây chuyển hiện đại. <br>
	💡Công suất tác chiến thực tế lớn, tính đa dụng cao.
	</div>
  	{% assign hascategoryPosts = false %}
	<div class="details">
    {% for post in site.controller-chip limit:8 %}
	{% if post.category == 'OTHER' %}
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

