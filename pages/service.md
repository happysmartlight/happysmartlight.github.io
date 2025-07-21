---
layout: page
title: "Pixel và Mega Pixel -  Magic LED HSL"
meta-title: "Light Up Your Style"
bigimg:
- "/img/Picture-HSL/HSL-index.png"
permalink: /service
---

<div class="gradient-bg">
  <div class="gradient-text">
    <p>Tỏa sáng theo cách của riêng bạn</p>
  </div>
</div>

<div id="training" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Support & Training✨
  </div>
  <div class="description-content-index-sp">
  💡Tài liệu sử dụng cơ bản mạch ARGB.<br>
  💡Các khóa học từ cơ bản đến nâng cao kiến thức LED, lập trình LED, cài đặt thiết bị.<br>
  💡Cùng phát triển hệ sinh thái LED thông minh, sáng tạo.<br>
  💡Cam kết chất lượng và sự hài lòng của khách hàng.<br>
  </div>

  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'training' %}
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
		<p>Hiện danh sách đối tác đang được cập nhật, quý khách vui lòng liên hệ HSL để nhận thông tin tư vấn chính xác.
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

<div id="partner" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Các đối tác của HSL✨
  </div>
  <div class="description-content-index-sp">
  💡Đây là những đối tác chiến lược của HSL.<br>
  💡Hợp tác nhằm mang lại giải pháp công nghệ tiên tiến nhất.<br>
  💡Cùng phát triển hệ sinh thái LED thông minh, sáng tạo.<br>
  💡Cam kết chất lượng và sự hài lòng của khách hàng.<br>
  </div>

  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'partner' %}
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
		<p>Hiện danh sách đối tác đang được cập nhật, quý khách vui lòng liên hệ HSL để nhận thông tin tư vấn chính xác.
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

<div id="consult" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Gói dịch vụ tư vấn thiết kế✨
  </div>
  <div class="description-content-index-sp">
    💡Tư vấn, báo giá thiết kế trọn gói chất lượng nhanh chóng.<br> 
    🎨 Hỗ trợ lên ý tưởng, thiết kế theo yêu cầu, đảm bảo tính thẩm mỹ và công năng.<br>
    📐 Cung cấp bản vẽ chi tiết, mô phỏng 3D trực quan giúp khách hàng dễ dàng hình dung.<br> 
    🚀 Quy trình làm việc chuyên nghiệp, đảm bảo tiến độ và tối ưu chi phí.<br> 
    🤝 Cam kết đồng hành cùng khách hàng từ khâu tư vấn đến khi hoàn thiện sản phẩm.<br> 
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'consult' %}
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
    <p>Quý khách vui lòng liên hệ với Happy Smart Light để được tư vấn chu đáo và hỗ trợ tận tình.</p>
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

<div id="decor" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Gói dịch vụ tư vấn thiết kế Led Decor✨
  </div>
  <div class="description-content-index-sp">
    💡Tư vấn, báo giá thiết kế trọn gói chất lượng nhanh chóng.<br> 
    🎨 Hỗ trợ lên ý tưởng, thiết kế theo yêu cầu, đảm bảo tính thẩm mỹ và công năng.<br>
    📐 Cung cấp bản vẽ chi tiết, mô phỏng 3D trực quan giúp khách hàng dễ dàng hình dung.<br> 
    🚀 Quy trình làm việc chuyên nghiệp, đảm bảo tiến độ và tối ưu chi phí.<br> 
    🤝 Cam kết đồng hành cùng khách hàng từ khâu tư vấn đến khi hoàn thiện sản phẩm.<br> 
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'decor' %}
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
    <p>Quý khách vui lòng liên hệ với Happy Smart Light để được tư vấn chu đáo và hỗ trợ tận tình.</p>
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

<div id="dance" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Gói dịch vụ tư vấn thiết kế Led Dance✨
  </div>
  <div class="description-content-index-sp">
    💡Tư vấn, báo giá thiết kế trọn gói chất lượng nhanh chóng.<br> 
    🎨 Hỗ trợ lên ý tưởng, thiết kế theo yêu cầu, đảm bảo tính thẩm mỹ và công năng.<br>
    📐 Cung cấp bản vẽ chi tiết, mô phỏng 3D trực quan giúp khách hàng dễ dàng hình dung.<br> 
    🚀 Quy trình làm việc chuyên nghiệp, đảm bảo tiến độ và tối ưu chi phí.<br> 
    🤝 Cam kết đồng hành cùng khách hàng từ khâu tư vấn đến khi hoàn thiện sản phẩm.<br> 
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'dance' %}
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
    <p>Quý khách vui lòng liên hệ với Happy Smart Light để được tư vấn chu đáo và hỗ trợ tận tình.</p>
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

<div id="advertising" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Gói dịch vụ tư vấn thiết kế bảng hiệu✨
  </div>
  <div class="description-content-index-sp">
    💡Tư vấn, báo giá thiết kế trọn gói chất lượng nhanh chóng.<br> 
    🎨 Hỗ trợ lên ý tưởng, thiết kế theo yêu cầu, đảm bảo tính thẩm mỹ và công năng.<br>
    📐 Cung cấp bản vẽ chi tiết, mô phỏng 3D trực quan giúp khách hàng dễ dàng hình dung.<br> 
    🚀 Quy trình làm việc chuyên nghiệp, đảm bảo tiến độ và tối ưu chi phí.<br> 
    🤝 Cam kết đồng hành cùng khách hàng từ khâu tư vấn đến khi hoàn thiện sản phẩm.<br> 
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'advertising' %}
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
    <p>Quý khách vui lòng liên hệ với Happy Smart Light để được tư vấn chu đáo và hỗ trợ tận tình.</p>
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

<div id="order" class="content-index" style="
      background: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), 
        url('/img/Picture-HSL/HSL-index.png');
      background-size: cover; /* Ảnh nền bao phủ toàn bộ vùng */
      background-position: center; /* Căn giữa ảnh nền */
      background-repeat: no-repeat; /* Không lặp lại ảnh nền */
        ">
  <div class="summary">
    ✨Gói dịch vụ tư vấn Order hàng hóa✨
  </div>
  <div class="description-content-index-sp">
    💡Tư vấn, báo giá trọn gói chất lượng nhanh chóng.<br>
    📦 Hỗ trợ tìm kiếm nguồn hàng uy tín, đảm bảo chất lượng và giá cả cạnh tranh.<br>
    🔍 Kiểm tra thông tin sản phẩm, đánh giá nhà cung cấp trước khi đặt hàng.<br>
    📜 Hỗ trợ xử lý đơn hàng, theo dõi quá trình vận chuyển và giải quyết các vấn đề phát sinh.<br>
    🚀 Đảm bảo giao dịch an toàn, tiết kiệm thời gian và tối ưu chi phí cho khách hàng.<br>
    🤝 Cam kết hỗ trợ tận tâm từ khâu tư vấn đến khi hàng hóa đến tay khách hàng.<br>
  </div>
  {% assign hascategoryPosts = false %}
  <div class="details">
    {% for post in site.service limit:8 %}
	  {% if post.category == 'order' %}
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
    <p>Quý khách vui lòng liên hệ với Happy Smart Light để được tư vấn chu đáo và hỗ trợ tận tình.</p>
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

