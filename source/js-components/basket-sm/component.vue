<template>
	<div class="complex-link complex-link--basket dropdown-owner dropdown-arrow-owner" :class="{'js-dropdown': showDropdownComputed, 'complex-link--disabled': !basketCount}">
		<a :href="basketCount ? '/order/' : null" class="complex-link__link" :class="{'js-dropdown__btn': showDropdownComputed, 'complex-link__link--static': !basketCount}" :title="basketCount ? null : 'Корзина пуста'">
			<div class="complex-link__cell-icon">
				<div class="complex-link__icon-box">
					<svg class="complex-link__svg-icon svg-icon"><use xlink:href="#svg-icon-basket"></use></svg>
                    <!--<img src="/local/images/new/Cart_32x32.svg" alt="" class="complex-link__svg-icon svg-icon">-->
                    <transition name="content-scale">
                        <span class="complex-link__label mobile" v-if="basketCount > 0">{{basketCount}}</span>
                    </transition>
				</div>
			</div>
			<div class="complex-link__cell-txt" v-if="withText">
				<strong>Корзина</strong>
                <transition name="content-scale">
                    <span class="complex-link__label" v-if="basketCount > 0">{{basketCount}}</span>
                </transition>
			</div>
		</a>
		<dropdown class="dropdown--basket" :class="{'dropdown--basket-empty': !basket.products.length}" v-if="showDropdownComputed">
			<div class="basket-sm" slot="content" v-if="!basketCount" key="empty">
				<div class="basket-sm__block basket-sm__block--white">
					<div class="basket-sm__empty-message">Корзина пуста</div>
				</div>
			</div>
			<div class="basket-sm" slot="content" v-if="basketCount" key="not-empty">
				<div class="basket-sm__list">
					<transition-group name="content-fade" tag="div">

						<product v-for="product in basket.products" :show-rating="false" v-if="!product.delayed" :key="product.productId"
								 :product="product"
								 :list-item="true"
								 :show-remove-button="true"
								 :show-params="false"></product>
					</transition-group>
				</div>
				<!--<div class="basket-sm__block">
					<ul class="small-info-list">
						<li class="small-info-list__item small-info-row small-info-row&#45;&#45;color-alt" v-if="freeDeliveryPrice > basketPrice">
							<div class="small-info-row__icon">
								<svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg>
							</div>
							<div class="small-info-row__text">Добавьте товаров на <b>{{(freeDeliveryPrice - basketPrice) | formatPrice}} руб.</b>, чтобы получить бесплатную доставку в ваш регион ({{geolocation.city.name}})</div>
						</li>
						<li class="small-info-list__item small-info-row small-info-row&#45;&#45;color-alt" v-if="freeDeliveryPrice <= basketPrice">
							<div class="small-info-row__icon">
								<svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg>
							</div>
							<div class="small-info-row__text">Бесплатная доставка ({{geolocation.city.name}})</div>
						</li>
						<li class="small-info-list__item small-info-row small-info-row&#45;&#45;color-alt">
							<div class="small-info-row__icon">
								<svg class="svg-icon"><use xlink:href="#svg-icon-gift"></use></svg>
							</div>
							<div class="small-info-row__text">Бесплатные <a href="#" class="link link&#45;&#45;inverted">пробники</a> с каждым заказом</div>
						</li>
					</ul>
				</div>-->
				<div class="basket-sm__block">
					<div class="dot-line-list">
						<transition name="content-fade">
							<div class="dot-line-list__item dot-line-row dot-line-row--sm" v-if="basketSale > 0">
								<div class="dot-line-row__start">Скидка</div>
								<div class="dot-line-row__ruler"></div>
								<div class="dot-line-row__end">{{basketSale | formatPrice}} руб.</div>
							</div>
						</transition>
						<div class="dot-line-list__item dot-line-row">
							<div class="dot-line-row__start">Сумма <span class="c-gray-dark">({{basketCount}} {{basketCounter()}})</span></div>
							<div class="dot-line-row__ruler"></div>
							<div class="dot-line-row__end">
								<div class="price">
									<strong class="price__new">{{basketPrice | formatPrice}}</strong><small class="price__new-curr">руб.</small>
								</div>
							</div>
						</div>
					</div>
					<div class="basket-sm__btn-row">
						<a href="/order/" class="btn">
							<span class="btn__inner">Перейти в корзину</span>
						</a>
						<a href="/order/checkout/" class="btn btn--primary">
							<span class="btn__inner">Оформить заказ</span>
						</a>
					</div>
				</div>
			</div>
		</dropdown>
	</div>
</template>


<script>
	define(['Model', 'vue!dropdown/component', 'vue!product/component'], function (Model) {
		Vue.component('basket-sm', {
			template: template,

			data: function () {
				return {
					basket: Model.basket,
					basketPrice: Model.basketPrice,
					basketSale: Model.basketSale,
					basketCount: Model.basketCount,
					user: Model.user,
					geolocation: Model.geolocation,
					instId: null,
					showDropdownComputed: false
				}
			},

			props: {
				freeDeliveryPrice: {
					default: 0
				},
				bxajaxid: {
					default: null
				},
				withText: {
					type: Boolean,
					default: true
				},
				showDropdown: {
					type: Boolean,
					default: false
				},
				showDropdownMax: {
					default: null
				},
				showDropdownMin: {
					default: null
				},
				products: {
					default: null
				}
			},

			methods: {
				basketCounter: function () {

					var inst = this;
					return	counter(inst.basketCount);
				},
				updShowDropdownComputed: function () {
					if (View.modileAndTabletCheck)
						return false;
					else if (!this.showDropdown)
						return false;
					else if (this.showDropdownMax && window.innerWidth >
							(typeof this.showDropdownMax == 'number' ? this.showDropdownMax : View.breakpoints[this.showDropdownMax]))
						return false;
					else if (this.showDropdownMin && window.innerWidth <
							(typeof this.showDropdownMin == 'number' ? this.showDropdownMin : View.breakpoints[this.showDropdownMin]))
						return false;
					else
						return true;
				}
			},
			filters: {
				formatPrice: Model.formatPrice
			},
			created: function () {
				var inst = this;
				Model.$on('basketUpdated', function () {
					inst.basketPrice = Model.basketPrice;
					inst.basketSale = Model.basketSale;
					inst.basketCount = Model.basketCount;
				});
				this.instId = Math.round(Math.random() * 1000000);
			},
			mounted: function () {
				var inst = this;
				var timeout = null;
				var tmp = inst.showDropdownComputed;
				$(window).on('resize.recalcBasketSmDD' + this.instId, function () {
					clearTimeout(timeout);
					timeout = setTimeout(function () {
						tmp = inst.updShowDropdownComputed();
						if (inst.showDropdownComputed != tmp) {
							inst.showDropdownComputed = tmp;
							Vue.nextTick(function () {
								View.init.local.tooltipPositionLocal();
							});
						}
					}, 100);
				});

				inst.showDropdownComputed = inst.updShowDropdownComputed();
 

				if (this.products) {
					
					console.log("small basket", this.products, this.bxajaxid);
					Model.updateBasket(this.products, this.bxajaxid);
				}
			},

			destroyed: function () {
				$(window).off('resize.recalcBasketSmDD' + this.instId);
			}
		});
	});
</script>
