<template>
	<div>
		<div class="modal__product-in-basket">
			<div class="product-in-basket">
				<div class="product-in-basket__products">
					<product v-for="product in lastAddedProducts" :key="product.offerId" :product="product" list-item></product>
				</div>
				<div class="product-in-basket__btn-row">
					<button type="button" class="btn js-close-modal">
						<span class="btn__inner">Продолжить покупки</span>
					</button>
					<a href="/order/" class="btn btn--primary">
						<span class="btn__inner">Оформить заказ</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</a>
				</div>
			</div>
		</div>
		<div v-for="product in lastAddedProducts">
			<div class="modal__group flc" v-if="relatedProductsLink && !touchMode && product.brand">
		 
				<div class="modal__separator">
					<h5 class="modal__separator-title">Не забудьте купить</h5>
				</div>

				<slider-related-products :data-source="relatedProductsLink"
					mode="modal-sm"
					:hide-rating="true"
					:hide-params="true"></slider-related-products>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!slider-related-products/component', 'vue!product/component'], function (Model) {
		Vue.component('basket-action-success', {
			template: template,

			data: function () {
				return {
					lastAddedProducts: [],
					relatedProductsLink: null,
					touchMode: false,
				}
			},

			created: function () {
				this.touchMode = View.mobileAndTabletCheck;
				this.relatedProductsLink = Model.basket.lastAddedRelatedSource;
				this.lastAddedProducts = _.filter(Model.basket.products, function (product) {
					return Model.basket.lastAddedProductIds.indexOf(product.offerId) >= 0;
				});
			},
		});
	});
</script>
