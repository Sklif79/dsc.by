<template>
	<div class="catalog-list">
		<!--div class="preloader-bar" :class="{'active': loading}"></div-->
		<transition-group tag="div" class="catalog-list__grid grid" mode="out-in" name="content-scale">
			<div class="catalog-list__item col" v-for="product in products" :key="product.productId">
				<product-detailed :product="product"
					:columns="product.columns"
					:productId="product.productId" 
					:offerId="product.offerId" 
					:offers="product.offers" ></product-detailed>
			</div>
		</transition-group>
	</div>
</template>



<script>
	define(['Model', 'vue!product-detailed/component'], function (Model) {
		Vue.component('catalog-list', {
			template: template,
			props: {
				products: {
					default: null
				},
				loading: {
					default: null
				},
				columns: {
					default: null
				}
			}
		});
	});
</script>