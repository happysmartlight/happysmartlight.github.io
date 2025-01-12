---
layout: books
title: Các sản phẩm HOT
---
<head>
	<link rel="stylesheet" type="text/css" href="css/book_style.css" />
	<link rel="stylesheet" type="text/css" href="css/books_component.css" />
	<!-- Modernizr is used for flexbox fallback -->
	<script src="js/modernizr.custom.js"></script>
</head>
<div class="view">
	<div class="my__suggestion">
	<center>
	<h1>
		<div class="gradient-text">
			<p>Các sản phẩm Best Seller của Happy Smart Light</p>
		</div>
	</h1>
	</center>
	<div>
		<section class="grid">
		<!-- sách 1 -->
			<div class="product">
				<div class="product__info">
					{%- assign bio-name-product = "Test sản phẩm 2"-%}<!--  Tên sản phẩm -->
					{%- assign bio-image-product = "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltf0w184ob2l69"-%}<!--  Ảnh sản phẩm -->
					{%- assign bio-review-product = "https://shope.ee/g3IagvVg1"-%}<!--  Link review sản phẩm -->
					{%- assign bio-buy-product = "https://shope.ee/g3IagvVg1"-%}<!--  Link mua sản phẩm -->
					{%- assign bio-descript-product = "
					🔥 Lõi dây đồng nguyên khối tiết diện 1.25mm2 chịu tải lên tới 3600W<br>
					🔥 Vỏ ngoài làm từ nhựa ABS + PC chống cháy lên đến 750 độ C"-%}<!--  Mô tả sản phẩm -->
					<a href="{{- bio-buy-product -}}" target="_blank"><img class="product__image"  src="{{- bio-image-product -}}" alt="{{- bio-name-product -}}"></a><!--  Ảnh sản phẩm -->
					<button class="action action--button" onclick="window.open('{{- bio-review-product -}}')"><i class="fa fa-check-circle-o"></i><span class="action__text">Reviews</span></button> <!--  Link review sản phẩm -->
					<button class="action action--button" onclick="window.open('{{- bio-buy-product -}}')"><i class="fa fa-shopping-cart"></i><span class="action__text">Lụm</span></button> <!--  Link mua sản phẩm -->
					<h2 class="product__title">{{- bio-name-product -}}</h2> <!--  Tên sản phẩm -->
					<p>{{- bio-descript-product -}}</p>
				</div>
			</div>	
		<!-- sách 6 -->
			<div class="product">
				<div class="product__info">
				<div class="product__info">
					{%- assign bio-name-product = "Test sản phẩm 2"-%}<!--  Tên sản phẩm -->
					{%- assign bio-image-product = "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltf0w184ob2l69"-%}<!--  Ảnh sản phẩm -->
					{%- assign bio-review-product = "https://shope.ee/g3IagvVg1"-%}<!--  Link review sản phẩm -->
					{%- assign bio-buy-product = "https://shope.ee/g3IagvVg1"-%}<!--  Link mua sản phẩm -->
					{%- assign bio-descript-product = "
					🔥 Tương thích rất nhiều loại phích cắm phổ biến từ dẹt đến tròn<br>
					🔥 Vỏ ngoài làm từ nhựa ABS + PC chống cháy lên đến 750 độ C"-%}<!--  Mô tả sản phẩm -->
					<a href="{{- bio-buy-product -}}" target="_blank"><img class="product__image"  src="{{- bio-image-product -}}" alt="{{- bio-name-product -}}"></a><!--  Ảnh sản phẩm -->
					<button class="action action--button" onclick="window.open('{{- bio-review-product -}}')"><i class="fa fa-check-circle-o"></i><span class="action__text">Reviews</span></button> <!--  Link review sản phẩm -->
					<button class="action action--button" onclick="window.open('{{- bio-buy-product -}}')"><i class="fa fa-shopping-cart"></i><span class="action__text">Lụm</span></button> <!--  Link mua sản phẩm -->
					<h2 class="product__title">{{- bio-name-product -}}</h2> <!--  Tên sản phẩm -->
					<p>{{- bio-descript-product -}}</p>
				</div>
				</div>
			</div>	
		</section>
	</div>