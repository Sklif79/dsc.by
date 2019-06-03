<template> 
	<transition name="content-fade" mode="out-in">
		<div class="basket-full" v-if="basketCount > 0 || basketDelayedCount > 0">
			<div class="basket-full__main">
				<div class="basket-full__main-blocks flc" v-if="$slots.infoBlock || $slots.infoBlockAvail || enableAvailSelector">
					<div class="info-blocks grid default-grid">
						<slot name="infoBlock"></slot>

						<div class="info-blocks__item default-grid__item col col-lg-6 col-2xs-12" v-if="enableAvailSelector">
							<div class="info-block">
								<div class="info-block__container">
									<div class="info-block__title flc">
										<div class="icon-text icon-text--inline">
											<div class="icon-text__icon">
												<svg class="svg-icon svg-icon--20 c-primary-alt"><use xlink:href="#svg-icon-sample"></use></svg>
											</div>
											<div class="icon-text__text">Проверить наличие в магазине</div>
										</div>
									</div>
									<div class="info-block__input flc">
										<select-input :options="shopsAsOptions" block lite size="sm" placeholder="Выбрать магазин" v-model="currentShop"></select-input>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<transition name="content-fade">
					<div class="basket-full__products flc" v-if="basketCount > 0">
						<div class="basket-full__products-list">

							<transition-group name="content-fade" tag="div">
								<product v-for="product in basket.products" :show-rating="false" v-if="!product.delayed" :key="product.productId"

										 :product="product"

										 :list-item="true"
										 :show-buy-button="true"
										 :show-fav-button="false"
										 :show-alt-actions="true"
										 :bind-basket-count="true"
										 :list-item-lg="true"
										 :basket-mode="true"></product>
							</transition-group>
						</div>
						<div class="basket-full__products-summary">
							<div class="bubble bubble--arrow-top">
								<div class="dot-line-list">
									<div class="dot-line-list__item dot-line-row">
										<div class="dot-line-row__start">Сумма</div>
										<div class="dot-line-row__ruler"></div>
										<div class="dot-line-row__end">
											<div class="price">
												<strong>{{basketPrice | formatPrice}} </strong>
												<small>руб.</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>

				<transition name="content-fade">
					<div class="basket-full__group flc" v-if="basketDelayedCount > 0">
						<div class="basket-full__group-header">
							<h2 class="basket-full__group-title">Отложенные товары</h2>
						</div>
						<div class="basket-full__products-list">
							<transition-group name="content-fade" tag="div">
								<product v-for="product in basket.products" v-if="product.delayed" :key="product.productId"
										 :id="product.productId"
										 :offerId="product.offerId"
										 :link="product.link"
										 :image="product.image"
										 :brand="product.brand"
										 :name="product.name"
										 :price="product.price"
										 :price-old="product.priceOld"
										 :code="product.code"
										 :quantity="product.quantity"
										 :delayed="product.delayed"
										 :params="product.params" 
										 :delivery="product.delivery"
										 :favorite="product.favorite"
										 :list-item="true"
										 :show-buy-button="true"
										 :show-fav-button="false"
										 :show-alt-actions="true"
										 :bind-basket-count="true"
										 :list-item-lg="true"
										 :basket-mode="true"></product>
							</transition-group>
						</div>
					</div>
				</transition>
			</div>


			<div class="basket-full__aside">
				<div class="summary-block summary-block--receipt">
					<div class="summary-block__floor">
						<div class="discount">
							<div class="discount__icon">
								<div class="discount__icon-box">
									<img src="/local/images/markup-images/discount/discount-card-1.png" alt="Карта Кравт">
								</div>
							</div>
							<div class="discount__main">
								<h4 class="discount__title">Дисконтная программа</h4>
								<div class="discount__text">Моя скидка: <span class="discount__value">-6%</span></div>
							</div>
						</div>
					</div>
					<div class="summary-block__floor">
						<div class="foldable-list">
							<div class="foldable-list__item" v-if="enablePromocode">
								<div class="foldable-block js-accordion">
									<div class="foldable-block__bar">
										<span class="link link--dd link--local link--undecorated js-accordion__bar">
											<span class="link__text">Есть промокод?</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow">
											<use xlink:href="#svg-icon-dd-arrow"></use></svg>
										</span>
									</div>
									<div class="foldable-block__body foldable-block__body--sm js-accordion__body">
										<div class="one-row-form">
											<div class="one-row-form__cell-input">
												<rich-text-input type="text" v-model="promocode" placeholder="Введите промокод" lite size="sm"></rich-text-input>
											</div>
											<div class="one-row-form__cell-btn">
												<button type="button" class="btn btn--sm">
													<span class="btn__inner">Применить</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="foldable-list__item" v-if="enableGiftCert">
								<div class="foldable-block js-accordion">
									<div class="foldable-block__bar">
										<span class="link link--dd link--local link--undecorated js-accordion__bar">
											<span class="link__text">Подарочный сертификат</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow">
											<use xlink:href="#svg-icon-dd-arrow"></use></svg>
										</span>
									</div>
									<div class="foldable-block__body foldable-block__body--sm js-accordion__body">
										<div class="one-row-form">
											<div class="one-row-form__cell-input">
												<rich-text-input type="text" v-model="giftCertCode" placeholder="Введите код" lite size="sm"></rich-text-input>
											</div>
											<div class="one-row-form__cell-btn">
												<button type="button" class="btn btn--sm"  @click="giftCertCodeSubmit" >
													<span class="btn__inner">Применить</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="foldable-list__item">
								<div class="foldable-block js-accordion">
									<div class="foldable-block__bar">
										<span class="link link--dd link--local link--undecorated js-accordion__bar">
											<span class="link__text">Комментарий к заказу</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow">
											<use xlink:href="#svg-icon-dd-arrow"></use></svg>
										</span>
									</div>
									<div class="foldable-block__body foldable-block__body--sm js-accordion__body">
										<div class="one-row-form">
											<rich-text-input type="textarea" v-model="comment" placeholder="Ваш комментарий"></rich-text-input>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="summary-block__floor summary-block__floor--dark" v-if="freeDeliveryPrice > basketPrice">
						<ul class="small-info-list">
							<li class="small-info-list__item small-info-row small-info-row--color-alt">
								<div class="small-info-row__icon">
									<svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg>
								</div>
								<div class="small-info-row__text">Добавьте товаров на <b>{{(freeDeliveryPrice - basketPrice) | formatPrice}} руб.</b>, чтобы получить бесплатную доставку в ваш регион ({{geolocation.city.name}})</div>
							</li>
						</ul>
					</div>
					<div class="summary-block__floor summary-block__floor--dark">
						<div class="dot-line-list">
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start">Товаров</div>
								<div class="dot-line-row__ruler"></div>
								<div class="dot-line-row__end">{{basketCount}}</div>
							</div>
							<transition name="content-fade">
								<div class="dot-line-list__item dot-line-row" v-if="basketSale > 0">
									<div class="dot-line-row__start">Скидка</div>
									<div class="dot-line-row__ruler"></div>
									<div class="dot-line-row__end"><b>-{{basketSale | formatPrice}} руб.</b></div>
								</div>
							</transition>

							<div class="dot-line-list__item dot-line-row dot-line-row--lg">
								<div class="dot-line-row__start">Итого</div>
								<div class="dot-line-row__ruler"></div>
								<div class="dot-line-row__end">
									<div class="price price--strong">
										<strong class="price__new">{{basketPrice | formatPrice}} </strong>
										<small class="price__new-curr">руб.</small>
									</div>
								</div>
							</div>
						</div>
						<div class="summary-block__btn-row">
							<button  @click="commentSubmit"  class="btn btn--primary btn--lg btn--block">
								<span class="btn__inner">Оформить заказ</span>
								<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
								<use xlink:href="#svg-icon-arrow-right"></use>
								</svg>
							</button>
						</div>
					</div>
					<div class="summary-block__end summary-block__end--receipt">
						<svg viewBox="0 0 100 5" class="">
						<line x1="3" x2="100" y1="5" y2="5" style="vector-effect: non-scaling-stroke;"
							  stroke="currentColor" 
							  stroke-width="10" 
							  stroke-linecap="round" 
							  stroke-dasharray=".001, 20" />
						</svg>
					</div>
				</div>
			</div>
		</div>
		<div class="empty-basket-block" v-if="basketCount == 0 && basketDelayedCount == 0">
			<h2 class="empty-basket-block__title">Ваша корзина пуста</h2>
			<div class="empty-basket-block__btn-row">
				<a href="/" class="btn btn--primary btn--lg">
					<svg class="btn__icon btn__icon--left btn__icon--arrow svg-icon svg-icon--20">
					<use xlink:href="#svg-icon-arrow-left"></use>
					</svg>
					<span class="btn__inner">Вернуться на главную</span>
				</a>
			</div>
		</div>
	</transition>
</template>



<script>
	define(['Model', 'vue!select-input/component', 'vue!product/component', 'vue!rich-text-input/component'], function (Model) {
		Vue.component('basket-full', {
			template: template,

			data: function () {
				return {
					submitUrl: "/order/checkout/",
					basket: Model.basket,
					basketPrice: Model.basketPrice,
					basketSale: Model.basketSale,
					basketCount: Model.basketCount,
					basketDelayedCount: Model.basketDelayedCount,
					basketPriceWithDelivery: Model.basketPriceWithDelivery,
					shops: Model.shops,
					currentShop: null,
					user: Model.user,
					geolocation: Model.geolocation,
					promocode: null,
					giftCertCode: null,
					comment: null
				}
			},

			computed: {
				shopsAsOptions: function () {
					return _.map(Model.shops, function (shop) {
						return {
							text: shop.name,
							value: shop.id
						}
					});
				}
			},

			props: {

				products: {
					default: null
				},
				initComment: {
					default: "",
				},
				freeDeliveryPrice: {
					default: 0,
				},
				deliveryPrice: {
					default: 0,
				},
				enableAvailSelector: {
					type: Boolean,
					default: false
				},
				enablePromocode: {
					type: Boolean,
					default: false
				},
				bxajaxid: {
					default: "",
				},
				enableGiftCert: {
					type: Boolean,
					default: false
				}
			},

			methods: {

				commentSubmit: function () {
					var inst = this;

					if (!inst.comment.length) {
						window.location = inst.submitUrl;
						return;
					}

					var formData = [];
					formData.push({name: 'bxajaxid', 'value': inst.bxajaxid});
					formData.push({name: 'COMMENT', 'value': inst.comment});

					$.post({
						url: inst.submitUrl,
						data: formData,
						dataType: 'json'
					})
							.done(function (response) {
								window.location = inst.submitUrl;
							})
							.fail(function (response) {
								console.log('basket submit fail')
							});
				},

				giftCertCodeSubmit: function (fields) {
					var inst = this;

					if (!inst.giftCertCode.length) {
						return;
					}
					var formData = [];
					formData.push({name: 'bxajaxid', 'value': inst.bxajaxid});
					formData.push({name: 'COUPON', 'value': inst.giftCertCode});

					$.post({
						url: inst.submitUrl,
						data: formData,
						dataType: 'json'
					})
							.done(function (response) {


								Model.updateBasket(response.products, false);

								inst.giftCertCode = response.giftCertCode;
								inst.errors.form = response.errors.form;
								inst.errors.fields = [];


							})
							.fail(function (response) {
								console.log('basket submit fail')
							});


				},
			},
			filters: {
				formatPrice: Model.formatPrice
			},

			created: function () {
				var inst = this;
				inst.comment = inst.initComment;
				Model.$on('basketUpdated', function () {
					inst.basket = Model.basket;
					inst.basketPrice = Model.basketPrice;
					inst.basketSale = Model.basketSale;
					inst.basketCount = Model.basketCount;
					inst.basketDelayedCount = Model.basketDelayedCount;
					inst.basketPriceWithDelivery = Model.basketPriceWithDelivery;
				});



			},
			mounted: function () {
				if (this.products) {
					console.log("full basket", this.products);

					Model.updateBasket(this.products, this.bxajaxid);
				}
			},
		});
	});
</script>
