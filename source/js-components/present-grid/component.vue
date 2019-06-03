<template>
    <div class="catalog-grid">
        <!--div class="preloader-bar" :class="{'active': loading}"></div--> 
		<div class="catalog-grid__item col" v-for="product in products" :key="product.productId">

			<product :product="product"
				:not-follow-link="true"
				:show-rating="false"
				:show-buy-button="false"
				:show-fav-button="false"
				:show-quick-view="false">


			<div class="product__action flc"  slot="button">
				<button type="button" class="btn btn--lg" @click="addPresent(product)" :disabled="!maxPresentCount || inBasketProduct(product)"><span class="btn__inner">{{inBasketProduct(product)?"В корзине":"Добавить"}}</span></button>
			</div>

			</product>

		</div> 
    </div>
</template>



<script>
	define(['Model', 'vue!product/component'], function (Model) {
		Vue.component('present-grid', {
			template: template,

			data: function () {
				return {
					maxPresentCount: 0,
					products: {},
					inbasket: Model.basket.presentsProduct,
				}
			},
			props: {
				staticDataSource: {
					default: null
				}
			},
			methods: {
				inBasketProduct: function (product) {
					return  _.findWhere(this.inbasket, {offerId: product.offerId});
				},
				addPresent: function (product) {


					var inst = this;



					if (!inst.maxPresentCount || inst.inBasketProduct(product)) {
						return;
					}

					var quantity = 1;


					var dat = {
						BASKET_ADD: product.offerId,
						COUNT: quantity,
						bxajaxid: Model.basket.bxajaxid,
						IS_PRESENT: 1,
					};


					$.post({
						url: "/order/",
						data: dat,
						dataType: 'json'
					})
							.done(function (response) {

								inst.maxPresentCount = response.presents.avalable;

								Model.updateBasket(response.products);

								Model.updatePresent(response.presentsProduct, response.presents);


							})
							.fail(function (response) {
								console.warn('Model.addToBasket failed:', response);
							});
				}
			},

			created: function () {
				var inst = this;

				console.log(inst.staticDataSource);
				inst.maxPresentCount = inst.staticDataSource.maxPresentCount;
				inst.products = inst.staticDataSource.products;

				Model.$on('basketPresentUpdated', function () {
					inst.inbasket = Model.basket.presentsProduct;

				});
			}

		});
	});
</script>