<template>
	<div class="catalog-price-ext">
		<transition-group tag="div" class="catalog-price-ext__grid" mode="out-in" name="content-scale">
			<div class="catalog-price-ext__item" v-for="product in products" :key="product.productId">
				<product-price-ext :product="product" :show-rating="true"
					:show-buy-button="true" 
					:show-fav-button="true" 
					:show-quick-view="true"
					:show-catalog-props-anyway="true"></product-price-ext>
			</div>
		</transition-group>
	</div>
</template>



<script>
	define(['Model', 'vue!product-price-ext/component'], function (Model) {
		Vue.component('catalog-price-ext', {
			template: template,
			props: {
				products: {
					default: null
				},
				loading: {
					default: null
				}
			}
		});
	});
</script>