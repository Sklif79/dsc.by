<template>
	<div class="complex-link dropdown-owner dropdown-arrow-owner js-dropdown">
		<a href="#" class="complex-link__link js-dropdown__btn">
			<div class="complex-link__cell-icon">
				<div class="complex-link__icon-box">
					<svg class="complex-link__svg-icon svg-icon"><use xlink:href="#svg-icon-basket"></use></svg>
					<span class="complex-link__label" v-if="basket.products && basket.products.length">{{basket.products.length}}</span>
				</div>
			</div>
			<div class="complex-link__cell-txt" v-if="withText">
				<sup>Моя</sup>
				<strong>Корзина</strong>
			</div>
		</a>
		<dropdown class="dropdown--basket" :class="{'dropdown--basket-empty': !basket.products.length}">
			<div class="basket-sm" slot="content" v-if="!basket.products.length" key="empty">
				<div class="basket-sm__block basket-sm__block--white">
					<div class="basket-sm__empty-message">Корзина пуста</div>
				</div>
			</div>
			<div class="basket-sm" slot="content" v-if="basket.products.length" key="not-empty">
				<div class="basket-sm__list">
					<transition-group name="swipe-away" tag="div">
						<product v-for="product in basket.products" :key="product.id"
							:id="product.id"
							:offerId="product.offerId"
							:link="product.link"
							:image="product.image"
							:name="product.name"
							:price="product.price"
							:priceOld="product.priceOld"
							:count="product.count"
							:list-item="true"
							:show-remove-button="true"></product>
					</transition-group>
				</div>
				<div class="basket-sm__block">
					<ul class="small-info-list"> 
						<!--<li class="small-info-list__item small-info-row small-info-row--color-alt">
							<div class="small-info-row__icon">    
								<svg class="svg-icon"><use xlink:href="#svg-icon-gift"></use></svg>
							</div>
							<div class="small-info-row__text">Бесплатные <a href="#" class="link link--inverted">пробники</a> с каждым заказом</div>
						</li>-->
					</ul>
				</div>
				<div class="basket-sm__block">
					<div class="dot-line-list">
						<transition name="swipe-away">
							<div class="dot-line-list__item dot-line-row dot-line-row--sm" v-if="basketSale > 0">
								<div class="dot-line-row__start">Экономия</div>
								<div class="dot-line-row__ruler"></div>
								<div class="dot-line-row__end">{{basketSale | formatPrice}} руб.</div>
							</div>
						</transition>
						<div class="dot-line-list__item dot-line-row">
							<div class="dot-line-row__start">Сумма <span class="c-gray-dark">({{basket.products.length}} товаров)</span></div>
							<div class="dot-line-row__ruler"></div>
							<div class="dot-line-row__end">
								<div class="price">
									<strong class="price__new">{{basketPrice | formatPrice}}</strong><small class="price__new-curr">руб.</small>
								</div>
							</div>
						</div>
					</div>
					<div class="basket-sm__btn-row">
						<a href="#" class="btn">
							<span class="btn__inner">Перейти в корзину</span>
							<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
							</svg>
						</a>
						<a href="#" class="btn btn--primary">
							<span class="btn__inner">Оформить заказ</span>
							<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</dropdown>
	</div>
</template>

 

<script>
define(['Model'], function(Model){
	Vue.component('basket-sm', {
		template: template,

		data: function() {
			return {
				basket: Model.basket,
				basketPrice: Model.basketPrice,
				basketSale: Model.basketSale
			}
		},

		props: {
			'withText': {
				type: Boolean,
				default: false
			}
		},

		filters: {
			formatPrice: Model.formatPrice
		},

		created: function() {
			var inst = this;

			Model.$on('basketUpdated', function() {
				inst.basketPrice = Model.basketPrice;
				inst.basketSale = Model.basketSale;
			});
		}
	});
});
</script>