<template>
	<div class="catalog-item" :class="{'catalog-item--modal': mode == 'modal'}">
		<div class="catalog-item__main-view" v-if="viewMode == 'desktop'">
			<div class="catalog-item__gallery-box" v-if="computedGallery && computedGallery.length">
				<image-gallery ref="imageGallery" :gallery="computedGallery"
							   :zoom="true" :zoom-viewer-width="zoomViewerWidth" :zoom-viewer-height="zoomViewerHeight"
							   @zoomActivated="zoomActivated" @zoomDeactivated="zoomDeactivated"></image-gallery>
			</div>
			<div class="catalog-item__no-photo" v-else>
				<div class="catalog-item__no-photo-box">
					<div class="catalog-item__no-photo-box-inner">
						<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
					</div>
				</div>
			</div>
		</div>
		<div class="catalog-item__main">
			<div class="catalog-item__zoom-box js-catalog-item-zoom-box" :class="{active: zoomActive && zoomImageSrc}">
				 <img :src="zoomImageSrc" alt="" class="catalog-item__zoom-box-img"
					:style="{'transform': 'translate3d('+zoomMoveX+'%,'+zoomMoveY+'%,0)', '-webkit-transform': 'translate('+zoomMoveX+'%,'+zoomMoveY+'%)'}">
			</div>
			<div class="catalog-item__header">
				<div class="catalog-item__header-main" v-if="product">
					<h3 class="catalog-item__brand flc">{{currentOffer ? currentOffer.brand : ' '}}</h3>
					<h1 class="catalog-item__title" v-if="!showTitleAsLink">
						{{currentOffer? currentOffer.name : ' '}}
					</h1>
					<h1 class="catalog-item__title" v-if="showTitleAsLink">
						<a :href="currentOffer ? currentOffer.link : ' '" class="catalog-item__title-link">
							{{currentOffer? currentOffer.name : ' '}}
					</a>
				</h1>
			</div>
			<div class="catalog-item__header-icon" v-if="currentOffer && currentOffer.brandIcon && showBrandLogo">
				<div class="catalog-item__header-icon-box">
					<a :href="currentOffer.brandLink"><img :src="currentOffer.brandIcon" alt=""></a>
				</div>
			</div>
		</div>


		<div class="catalog-item__top-params flc" v-if="product.adminLink">
			<div class="params-row">
				<div class="params-row__item" >
					<div class="catalog-item__top-param"><a target="_blank" :href="product.adminLink">В админке</a></div>
				</div>
			</div>
		</div>



		<div class="catalog-item__top-params flc" v-if="currentOffer">
			<div class="params-row">
				<div class="params-row__item">
					<rating-block v-if="currentOffer" class="rating-block--md"
								  :value="currentOffer.rating.value" 
								  :count="currentOffer.rating.count" 
								  :show-text="true"
								  ></rating-block>
				</div>
				<div class="params-row__item" v-if="typeof currentOffer.ordersCount == 'number'">
					<div class="catalog-item__top-param">{{currentOffer.ordersCount}} заказов</div>
				</div>

				<div class="params-row__item" v-if="typeof currentOffer.ordersCount != 'number' && typeof product.ordersCount == 'number'">
					<div class="catalog-item__top-param">{{product.ordersCount}} заказов</div>
				</div>


				<div class="params-row__item" v-if="currentOfferId && currentOffer.code">
					<div class="catalog-item__top-param">Артикул: {{currentOffer.code}}</div>
				</div>
				<div class="params-row__item" v-if="(!currentOfferId || !currentOffer.code) && product.code">
					<div class="catalog-item__top-param">Артикул: {{product.code}}</div>
				</div>
			</div>
		</div>


		<div class="catalog-item__view" v-if="viewMode != 'desktop'">
			<image-gallery ref="imageGallery" v-if="computedGallery && computedGallery.length" :gallery="computedGallery || null"></image-gallery>
			<div class="catalog-item__no-photo" v-else>
				<div class="catalog-item__no-photo-box">
					<div class="catalog-item__no-photo-box-inner">
						<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
					</div>
				</div>
			</div>
		</div>


		<div class="catalog-item__price-row flc" v-if="currentOffer && !buySeparate || buySeparate && !currentOfferId || viewMode == 'mobile' || mode == 'modal'">
			<div class="catalog-item__price" v-if="currentOffer.price">

				<div class="price price--lg" v-if="!currentOfferId && product.price && !offers.length">
					<strike v-if="product.priceOld">{{product.priceOld | formatPrice}} </strike>
					<strong :class="{'price__new': product.priceOld}">{{product.price | formatPrice}} </strong>
					<small :class="{'price__new-curr': product.priceOld}"> руб. </small>
				</div>

				<div class="price price--lg" v-if="currentOfferId && currentOffer.price">
					<strike v-if="currentOffer && currentOffer.priceOld">{{currentOffer.priceOld | formatPrice}} </strike>
					<strong :class="{'price__new': currentOffer.priceOld}">{{currentOffer.price | formatPrice}} </strong>
					<small :class="{'price__new-curr': currentOffer.priceOld}"> руб. </small>
				</div>
				<div class="price price--lg" v-if="!currentOfferId && offers.length">
					<strong>{{priceMin | formatPrice}} </strong>
					<span class="price__separator" v-if="priceMin != priceMax"> &ndash; </span>
					<strong v-if="priceMin != priceMax">{{priceMax | formatPrice}} </strong>
					<small :class="{'price__new-curr': currentOffer.priceOld}"> руб. </small>
				</div>
			</div>
			<div class="catalog-item__status" v-if="currentOffer.status">
				<div class="status-group">
					<div class="status" :class="'status--' + statusItem.type" v-for="statusItem in currentOffer.status">{{statusItem.name}}</div>
				</div>
			</div>
		</div>


		<div class="catalog-item__params-row param-picker flc" v-for="param in params" v-if="pickerMode == 'params'">
			<label class="param-picker__label">
				<span class="param-picker__label-key">{{param.title}}:</span>
				<span class="param-picker__label-value">{{getParamSelectedText(param)}}</span>
			</label>
			<div class="param-picker__picker">
				<label class="param-picker__option param-picker-option" v-for="value in param.values" v-if="param.type !== 'offer'"
					   :class="{'param-picker-option--color': param.type == 'color', 'param-picker-option--text': !value.image}">
					<input type="radio" class="param-picker-option__input" :name="param.name" :value="value.value" v-model="param.value" @change="updateCurrentOffer(); $forceUpdate();">
					<span class="param-picker-option__visual" :style="{'background-color': value.color || 'transparent'}">
						  <span class="param-picker-option__image" v-if="value.image">
							<img :src="value.image" alt="">
						</span>
						<span class="param-picker-option__text" v-if="value.title && param.type !== 'color'">{{value.title}}</span>
					</span>
				</label>
				<label class="param-picker__option param-picker-option param-picker-option--offer" v-for="offer in offers" v-if="param.type == 'offer'">
					<input type="radio" class="param-picker-option__input" :value="offer.offerId" v-model="currentOfferId">
					<span class="param-picker-option__visual">
						<span class="param-picker-option__image" v-if="offer.image">
							<img :src="offer.image" alt="">
						</span>
						<span class="param-picker-option__text">
							<span class="param-picker-option__offer-name">{{offer.name}}</span>
							<span class="param-picker-option__offer-param flc" v-if="offer.code">
								<span class="param-picker-option__offer-param-key">Артикул: </span>
								<span class="param-picker-option__offer-param-value">{{offer.code}}</span>
							</span>
							<rating-block :value="offer.rating.value" :count="offer.rating.count" class="rating-block--xs"></rating-block>
						</span>
						<span class="param-picker-option__aside">
							<div class="price" v-if="offer.price">
								<strike v-if="offer.priceOld">{{offer.priceOld | formatPrice}}</strike>
								<strong :class="{'price__new': offer.priceOld}">{{offer.price | formatPrice}}</strong>
								<small :class="{'price__new-curr': offer.priceOld}">руб.</small>
							</div>
						</span>
					</span>
				</label>
				<!--div class="param-picker__option param-picker-option param-picker-option--offer param-picker-option--offer-static" 
						v-for="offer in offers" v-if="param.type == 'offerStatic'">
					<div class="param-picker-option__visual">
						<div class="param-picker-option__image" v-if="offer.image">
							<img :src="offer.image" alt="">
						</div>
						<div class="param-picker-option__text">
							<span class="param-picker-option__offer-name">{{offer.name}}</span>
							<span class="param-picker-option__offer-param flc" v-if="offer.code">
								<span class="param-picker-option__offer-param-key">Артикул: </span> 
								<span class="param-picker-option__offer-param-value">{{offer.code}}</span>
							</span>
							<rating-block :value="offer.rating.value" :count="offer.rating.count" class="rating-block--xs"></rating-block>
						</div>
						<div class="param-picker-option__aside">
							<div class="price" v-if="offer.price">
								<strike v-if="offer.priceOld">{{offer.priceOld | formatPrice}}</strike>
								<strong :class="{'price__new': offer.priceOld}">{{offer.price | formatPrice}}</strong>
								<small :class="{'price__new-curr': offer.priceOld}">руб.</small>
							</div>
						</div>
						<div class="param-picker-option__action">
							<button type="button" class="btn btn--primary">
								<span class="btn__inner">В корзину</span>
							</button>
						</div>
					</div>
				</div-->
			</div>
		</div>

		<div class="catalog-item__params-row param-picker flc" v-if="pickerMode == 'images'">
			<!--
			<label class="param-picker__label">
				<span class="param-picker__label-key">Что сюда вывести?:</span>
				<span class="param-picker__label-value">и сюда</span>
			</label>
			-->
			<div class="param-picker__picker">
				<label class="param-picker__option param-picker-option param-picker-option--color" v-for="offer in offers">
					<input type="radio" class="param-picker-option__input" name="catalogItemOfferPiker" :value="offer.offerId" v-model="currentOfferId" @change="$forceUpdate();">
					<span class="param-picker-option__visual">
						<span class="param-picker-option__image" v-if="offer.previewImage">
							<img :src="offer.previewImage" alt="">
						</span>
					</span>
				</label>
			</div>
		</div>

		<div class="catalog-item__offers-list" v-if="pickerMode == 'offers' && !showOffersInSelect && viewMode != 'mobile'">
			<div class="offers-list">
				<div class="offers-list__item" v-for="offer in offers" :key="offer.offerId" :class="{'active': offer.offerId == currentOfferId}">

					 <product :product="offer"
						:list-item="true"
						:list-item-short="true"
						:show-params="false"
						:show-buy-button="true"
						:show-availability-button="true"
						:not-follow-link="true"
						@linkClick="currentOfferId = offer.offerId"></product>
				</div>
			</div>
		</div>

		<div class="catalog-item__offers-select" v-if="buySeparate && showOffersInSelect || buySeparate && viewMode == 'mobile'">
			<select-input :options="offersAsOptions" block lite placeholder="Выберите вариант товара" v-model="currentOfferId"></select-input>
		</div>

		<div class="catalog-item__actions" v-if="!buySeparate || buySeparate && showOffersInSelect || buySeparate && viewMode == 'mobile'">
			<div class="catalog-item__actions-input" v-if="currentOffer && currentOffer.quantity && currentOffer.price" :key="">
				<number-input :min="1" :max="currentOffer ? currentOffer.quantity : Infinity" v-model="basketCount" size="lg" :disabled="basketWaiting"></number-input>
			</div>
			<div class="catalog-item__actions-btn" v-if="currentOffer && currentOffer.quantity  && currentOffer.price">
				<button type="button" class="btn btn--lg btn--primary" @click="addToBasket" :disabled="basketWaiting">
					<span class="btn__inner">В корзину</span>
				</button>
			</div>
			<div class="catalog-item__actions-btn" v-if="mode != 'modal' && currentOffer">
				<button type="button" class="btn btn--lg btn--info" @click="showProcuctAvailability">
					<span class="btn__inner">Наличие в магазинах</span>
				</button>
			</div>
			<div class="catalog-item__actions-btn" v-if="currentOffer && (!currentOffer.quantity || !currentOffer.price)">
				<!--
				<button type="button" class="btn btn--lg btn--info" @click="showProcuctSubscription">
					<span class="btn__inner">Сообщить о наличии в интернет-магазине</span>
				</button>
				
				<span class="link link--local" @click="showProcuctSubscription">Сообщить о появлении в интернет-магазине</span>-->
			</div>
			<div class="catalog-item__actions-fav" v-if="product">
				<fav-btn :product-id="product.productId" :offer-id="currentOfferId" with-text></fav-btn>
			</div>
		</div>

		<div class="catalog-item__actions" v-else-if="buySeparate">
			<div class="catalog-item__actions-fav" v-if="product">
				<fav-btn :product-id="product.productId" :offer-id="currentOfferId" with-text></fav-btn>
			</div>
		</div>


		<div class="catalog-item__block grouping-block flc" v-if="mode != 'modal' ">
			<ul class="info-list">
				<li class="info-list__item info-li"  v-if="deliveryMethods.length>0 && currentOffer.deliveryMethods.length > 0">
					<h5 class="info-li__key">Доставка:</h5>
					<div class="info-li__value text-guide">
						<h4 class="pre-small-info-list-header">
							<span class="link link--dd link--local link--undecorated" @click="showCitySelect">
								<span class="link__text">{{geolocation.city.name}}</span> &nbsp;
								<svg class="link__arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
							</span>
						</h4>
						<ul class="small-info-list" >
							<li class="small-info-list__item small-info-row small-info-row--green" v-if="showDelivery(delivery.id)" v-for="delivery in deliveryMethods">

								<div class="small-info-row__text"><span class="c-success">{{delivery.name}}</span> — <b v-if="delivery.price==0">бесплатно</b><b v-else>{{delivery.price | formatPrice}} руб.</b></div>
							</li>

						</ul>
					</div>
				</li>
				<li class="info-list__item info-li"  v-if="product.paymentTitle">
					<h5 class="info-li__key">Оплата:</h5>
					<div class="info-li__value text-guide"  v-html="product.paymentTitle"></div>
				</li>
				
			</ul>
		</div>

		<div class="catalog-item__tabs" v-if="showInfo">
			<generic-tabs>
				<generic-tab label="Описание" tab-key="description" active v-if="(product && product.properties.length>0) || product.text">
					<div class="product-properties text-guide flc" v-if="currentOffer && currentOffer.nameSub">
						<div class="product-properties__item product-property">
							<h4 class="product-property__title">Полное наименование: </h4>
							<div class="product-property__value">{{currentOffer.nameSub}} </div>
						</div>
					</div>

					<div class="text-guide  text-guide-decore" v-html="product.text">

					</div>

					<div class="product-properties text-guide flc" v-if="currentOffer && currentOffer.properties.length>0">
						<div class="product-properties__item product-property" v-if="prop.value"  v-for="prop in currentOffer.properties"
							 :class="{'product-property--sm': prop.name == 'manufacturer' || prop.name == 'importer' || prop.name == 'consist'}">
							<h4 class="product-property__title">{{prop.title}}: </h4>
							<div class="product-property__value">{{prop.value}} </div>
						</div>
					</div>
				</generic-tab>
		 
				<generic-tab label="О бренде" tab-key="brand" v-if="product.brandInfo">
					<div class="text-guide text-guide-decore" v-html="product.brandInfo">
					</div>
				</generic-tab>
			</generic-tabs>
		</div>


		<div class="catalog-item__block grouping-block flc" v-if="showRelatedProducts && product.buyWithLink && currentOffer.brand">
			<h5 class="grouping-block__title">Покупают вместе</h5>
			<slider-related-products :data-source="product.buyWithLink" :options="relatedSliderOptions"></slider-related-products>
		</div>

		<div class="catalog-item__reviews flc" v-if="(mode != 'modal' && product.reviewLink)">
			<user-reviews :data-source="product.reviewLink" :product-id="product.productId" :offer-id="currentOfferId"></user-reviews>
		</div>
	</div>
</div>
</template>

<!-- 
	если currentOfferId = null - ТП не выбрано, выводится общая информация о товаре из product
-->

<script>
	define(['Model', 'vue!image-gallery/component', 'vue!rating-block/component', 'vue!select-input/component', 'vue!slider-input/component', 'vue!generic-tabs/component', 'vue!generic-tab/component', 'vue!slider-related-products/component', 'vue!user-reviews/component'], function (Model) {
		Vue.component('catalog-item', {
			template: template,
			data: function () {
				return {
					zoomActive: false,
					zoomImageSrc: null,
					zoomViewerWidth: 0,
					zoomViewerHeight: 0,
					zoomMoveX: 0,
					zoomMoveY: 0,
					product: {},
					deliveryMethods: [],
					offers: [],
					currentOfferId: null,
					params: [],
					pickerMode: null,
					basketCount: 1,
					basketWaiting: false,
					user: Model.user,
					geolocation: Model.geolocation,
					buySeparate: false,
					viewMode: 'desktop',
					priceUnit: null,

					relatedSliderOptions: {
						slidesToShow: 3,
						slidesToScroll: 3,
						responsive: [
							{
								breakpoint: 1100,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2
								}
							},
							{
								breakpoint: View.breakpoints['sm-max'],
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3
								}
							},
							{
								breakpoint: View.breakpoints['xs-max'],
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['2xs-max'],
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['4xs-max'],
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							}
						]
					}
				}
			},

			computed: {
				currentOffer: function () {
					return _.findWhere(this.offers, {offerId: this.currentOfferId}) || this.product;
				},

				computedGallery: function () {
					var inst = this;
					if (!this.product || !this.product.gallery) {
						return null;
					} else if (!this.currentOfferId) {
						return this.product.gallery;
					} else {
						return _.filter(this.product.gallery, function (item) {
							return item.offers.indexOf(inst.currentOfferId) >= 0
						});
					}
				},

				offersAsOptions: function () {
					var inst = this;

					return _.map(inst.offers, function (offer) {
						return {
							value: offer.offerId,
							text: offer.name
						};
					});
				},

				priceMin: function () {
					var inst = this;
					var minPrice = null;
					_.each(inst.offers, function (offer) {
						if (minPrice === null)
							minPrice = offer.price;
						else if (offer.price < minPrice)
							minPrice = offer.price;
					});

					return minPrice;
				},

				priceMax: function () {
					var inst = this;
					var maxPrice = null;
					_.each(inst.offers, function (offer) {
						if (maxPrice === null)
							maxPrice = offer.price;
						else if (offer.price > maxPrice)
							maxPrice = offer.price;
					});

					return maxPrice;
				}
			},

			props: {
				dataSource: {
					default: null
				},
				staticDataSource: {
					default: null
				},
				
				showInfo: {
					type: Boolean,
					default: true
				},
				showRelatedProducts: {
					type: Boolean,
					default: true
				},
				showBrandLogo: {
					type: Boolean,
					default: true
				},
				showTitleAsLink: {
					type: Boolean,
					default: false
				},
				showOffersInSelect: {
					type: Boolean,
					default: false
				},
				mode: {
					deafult: 'static'
				}
			},

			methods: {

				showDelivery: function (deliveryId) {
					return  $.inArray(deliveryId, this.currentOffer.deliveryMethods) >= 0;
				},
				zoomActivated: function (image) {
					if(!image)
						return;
					
					var inst = this;

					this.zoomActive = true;
					this.zoomImageSrc = image.src.original;

					setTimeout(function () {
						var zoomBox = inst.$el.querySelector('.js-catalog-item-zoom-box');
						if (zoomBox) {
							inst.zoomViewerWidth = zoomBox.offsetWidth;
							inst.zoomViewerHeight = zoomBox.offsetHeight;
						}
					}, 0);
				},

				zoomDeactivated: function () {
					this.zoomActive = false;
				},

				getParamSelectedText: function (param) {
					var selectedValue = _.findWhere(param.values, {value: param.value});
					return selectedValue ? selectedValue.title : null;
				},

				showCitySelect: function () {
					View.control.openModalByUrl("/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y");
				},

				showProcuctAvailability: function () {
					Model.showProductAvailabilityModal(this.product.productId, this.currentOfferId);
				},

				showProcuctSubscription: function () {
					Model.showProductSubscriptionModal(this.product.productId, this.currentOfferId, this.dataSource);
				},

				addToBasket: function () {
					Model.addToBasket(this.currentOfferId, this.basketCount);
				},

				updateCurrentOffer: function () {
					var inst = this;
					var offerPassedTheTest;

					var foundOffer = _.find(inst.offers, function (offer) {
						offerPassedTheTest = true;
						_.find(inst.params, function (param) {
							if (typeof param.value !== 'undefined' && param.value !== null) {
								var offerParam = _.findWhere(offer.params, {name: param.name});
								if (offerParam) {
									var offerParamValue = _.find(offerParam.values, function (value) {
										return value == param.value;
									});

									if (!offerParamValue) {
										offerPassedTheTest = false;
										return true; // return true to break find loop
									}
								} else {
									console.warn('В catalog-item.params есть параметр (' + param.name + '), которого нет в catalog-item.offers[X].params', param, offer);
									offerPassedTheTest = false;
									return true; // return true to break find loop
								}
							} else {
								offerPassedTheTest = false;
								return true; // return true to break find loop
							}
						});

						return offerPassedTheTest;
					});

					if (foundOffer) {
						inst.currentOfferId = foundOffer.offerId;
						history.replaceState({}, null, foundOffer.link);
					}
				},

				scrollToOffers: function () {
					var inst = this;
					try {
						$('html, body').animate({scrollTop: $(inst.$refs.prodTable.$el).offset().top}, 500);
					} catch (e) {
					}
				}
			},

			filters: {
				formatPrice: Model.formatPrice
			},

			created: function () {
				var inst = this;
				console.log('catalog item staticDataSource', inst.staticDataSource)
				if (inst.staticDataSource) {
					inst.deliveryMethods = inst.staticDataSource.deliveryMethods;
					inst.params = inst.staticDataSource.params;
					inst.offers = inst.staticDataSource.offers;
					inst.currentOfferId = inst.staticDataSource.offerId;
					inst.product = inst.staticDataSource.product || null;
					inst.pickerMode = inst.staticDataSource.pickerMode || null;

					inst.priceUnit = inst.staticDataSource.priceUnit || null;

					inst.buySeparate = inst.pickerMode === 'offers';
					if (inst.currentOfferId || inst.currentOfferId === 0) {
						var currOffer = _.findWhere(inst.offers, {offerId: inst.currentOfferId});
						try {
							_.each(inst.params, function (param) {
								param.value = _.findWhere(currOffer.params, {name: param.name})
							});
						} catch (e) {
							console.log('catalog-item: filling params according to currentOffer failed', e);
						}
					}
				} else if (inst.dataSource) {
					$.get({
						url: inst.dataSource,
						dataType: 'json',
						data: {
							bxajaxid: 'catalog',
							//productId: inst.product.productId,
							//offerId: inst.offerId
						}
					})
							.done(function (response) {
								inst.params = response.params;
								inst.offers = response.offers;
								inst.currentOfferId = response.offerId;
								inst.product = response.product || null;
								inst.pickerMode = inst.staticDataSource.pickerMode || null;
								inst.buySeparate = inst.pickerMode === 'offers';
								if (inst.$refs.imageGallery)
									inst.$refs.imageGallery.$emit('galleryUpdate');
							})
							.fail(function (response) {
								console.warn('catalog item loading failed: ', response);
							});
				}

				$(window).on('resize.vueCatalogItemResize', recalcViewMode);

				recalcViewMode();

				function recalcViewMode() {
					inst.viewMode = window.innerWidth > View.breakpoints['sm-max'] ? 'desktop' : window.innerWidth > View.breakpoints['xs-max'] ? 'tablet' : 'mobile';
				}
			},

			destroyed: function () {
				$(window).off('resize.vueCatalogItemResize');
			},

			mounted: function () {
				var inst = this;

				var zoomBox = this.$el.querySelector('.js-catalog-item-zoom-box');
				if (!zoomBox || !zoomBox.length){
					return;
				}
				this.zoomViewerWidth = zoomBox.offsetWidth;
				this.zoomViewerHeight = zoomBox.offsetHeight;

				if (inst.$refs.imageGallery) {
					inst.$refs.imageGallery.$emit('galleryUpdate');

					setTimeout(function () {
						inst.$refs.imageGallery.$on('galleryUpdate', function () {
							var zoomBox = this.$el.querySelector('.js-catalog-item-zoom-box');

							if (zoomBox) {
								this.zoomViewerWidth = zoomBox.offsetWidth;
								this.zoomViewerHeight = zoomBox.offsetHeight;
							}
						});

						inst.$refs.imageGallery.$on('zoomMove', function (moveX, moveY) {
							inst.zoomMoveX = -moveX * 100;
							inst.zoomMoveY = -moveY * 100;
						});
					}, 0);
				}
			}

		});
	});
</script>