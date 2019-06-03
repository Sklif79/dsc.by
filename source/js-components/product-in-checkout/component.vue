<template>
	<div class="product product-in-checkout">
		 <a class="product__link" :href="product.link" v-if="product.link && !notFollowLink"></a>
		<div class="product__link" v-if="product.link && notFollowLink" @click="$emit('linkClick')"></div>

		<div class="product__image-container basket-product-box--photo">
			<div class="product__image" v-if="product.image" :style="{'background-image': 'url('+product.image+')'}">
			</div>
			<div class="product__image" v-else>
				<div class="product__no-image" v-if="!product.image">
					<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
				</div>
			</div>
			<div class="product__status-container">
				<div class="product__status status" v-if="product.status" :class="statusItem.class" v-for="statusItem in product.status">{{statusItem.name}}</div>
			</div>
		</div>

		<div class="basket-product-box--name">
			<div class="product__name" v-if="product.name">{{product.name}}</div>

			<div class="product__params" v-if="product.params || (!basketMode && product.count)">
				<div class="product__param" v-for="param in product.params" v-if="showParams">
					<span class="product__param-name" v-if="param.name">{{param.name}}:</span>
					<span class="product__param-value">{{param.value}}</span>
				</div>
				<div class="product__param" v-if="product.code">Код: {{product.code}}</div>
			</div>

			<div class="product__offers-count" v-if="product.offersCount">
				{{product.offersCount}}
			</div>
			<div class="" v-if="product.code">Артикул: {{product.code}}</div>
			<div class="product__instore instore" v-if="(typeof product.quantity === 'number' && product.quantity > 0)">В наличии</div>
			<div class="product__instore" v-else>Под заказ {{product.deliveryDays || 7}} дней</div>
		</div> 

		<div class="basket-product-box--count">
			<div class="product__action flc" v-if="showBuyButton  &&  (product.price || product.priceRange)">
				<basket-action v-if="product.price && !product.offersCount"
							   :offer-id="product.offerId"
							   :max-count="product.quantity || Infinity"
							   :basket-mode="basketMode"
							   :bind-basket-count="bindBasketCount"
							   :show-button="false"
							   :disabled="disableActions"></basket-action>
				<system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message>
			</div>

		</div> 
		<div class="basket-product-box--price">
			<div class="price" v-if="product.price">
				<strike v-if="product.priceOld">{{product.priceOld | formatPrice}} <span > руб. </span></strike>
				<strong class="checkout-price" v-if="product.price" :class="{'price__new': product.priceOld}">{{product.price | formatPrice}}</strong>
				<span class="price__new price__units">руб.</span>
				<span class="price__units" v-if="product.calculator && product.calculator.from_unit"> / за {{product.calculator.from_unit_name_full}} </span>
			</div> 
			<div v-if="product.calculator && product.calculator.from_unit && product.calculator.to_unit && product.calculator.ratio" class="checkout__inpack">в {{product.calculator.from_unit}} = {{product.calculator.ratio}} {{product.calculator.to_unit}}</div>
		</div>

		<div class="basket-product-box--remove">
				<svg class="svg-icon checkout__remove-btn" @click="remove"><use xlink:href="#svg-icon-delete"></use></svg>
		</div>

	</div>

</template>



<script>
	define(['Model', 'vue!rating-block/component', 'vue!basket-action/component', 'vue!system-message/component', 'vue!fav-btn/component'], function (Model) {
		Vue.component('product-in-checkout', {
			template: template,

			data: function () {
				return {
					authorized: Model.authorized,
					favoritesEnabled: Model.favorites.enabled,
					quickViewEnabled: Model.quickView.enabled
				}
			},
			props: {

				product: {
					default: function () {
						return {};
					}
				},
				productId: {
					default: 0
				},
				offerId: {
					default: 0
				},
				// deprecated, moved into product:
				image: {
					type: String,
					default: null
				},
				showCode: {
					default: false
				},
				code: {
					type: String,
					default: null
				},
				brand: {
					type: String,
					default: null
				},
				name: {
					type: String,
					default: null
				},
				link: {
					type: String,
					default: null
				},
				price: {
					default: null
				},
				priceOld: {
					default: null
				},
				priceRange: {
					default: null
				},
				status: {
					default: null
				},
				showRating: {
					default: null
				},
				rating: {
					default: null
				},
				delivery: {
					default: null
				},
				quantity: {
					default: null
				},
				count: {
					default: null
				},
				offersCount: {
					default: null
				},
				delayed: {
					type: Boolean,
					default: false
				},
				params: {
					default: null
				},
				listItem: {
					type: Boolean,
					default: false
				},
				listItemShort: {
					type: Boolean,
					default: false
				},
				listItemLg: {
					type: Boolean,
					default: false
				},
				showBuyButton: {
					type: Boolean,
					default: false
				},
				bindBasketCount: {
					type: Boolean,
					default: false
				},
				showRemoveButton: {
					type: Boolean,
					default: false
				},
				showFavButton: {
					type: Boolean,
					default: false
				},
				showAvailabilityButton: {
					type: Boolean,
					default: false
				},
				showQuickView: {
					type: Boolean,
					default: false
				},
				showAltActions: {
					type: Boolean,
					default: false
				},
				notFollowLink: {
					type: Boolean,
					default: false
				},
				basketMode: {
					type: Boolean,
					default: false
				},
				showCatalogPropsAnyway: {
					type: Boolean,
					default: false
				},
				priceNotification: {
					default: null
				},
				showParams: {
					type: Boolean,
					default: true
				},
				disableActions: {
					type: Boolean,
					default: false
				}
			},

			methods: {
				remove: function () {
					//this.$emit('remove');

					Model.removeFromBasket(this.product.offerId);
				},

				delay: function () {
					this.$emit('remove');

					Model.addToDelayed(this.product.offerId);
				},

				fromDelayedToBasket: function () {
					Model.removeFromDelayed(this.product.offerId);
					Model.addToBasket(this.product.offerId);
				},

				fromBasketToDelayed: function () {
					Model.removeFromBasket(this.product.offerId);
					Model.addToDelayed(this.product.offerId);
				},

				openPreview: function () {
					Model.showProductPreviewModal(this.product.productId, this.product.offerId, this.product.link);
				},

				showAvailabilityModal: function () {
					Model.showProductAvailabilityModal(this.product.productId, this.product.offerId);
				},

				showProductSubscriptionModal: function () {
					Model.showProductSubscriptionModal(this.product.productId, this.product.offerId);
				}
			},

			filters: {
				formatPrice: Model.formatPrice
			},

			created: function () {
				// постепенно переходим на одно поле product

				if (!this.product.productId && this.productId) {
					this.product.productId = this.productId;
				}
				if (!this.product.offerId && this.offerId) {
					this.product.offerId = this.offerId;
				}
				if (!this.product.image && this.image)
					this.product.image = this.image;
				if (!this.product.code && this.code)
					this.product.code = this.code;
				if (!this.product.brand && this.brand)
					this.product.brand = this.brand;
				if (!this.product.name && this.name)
					this.product.name = this.name;
				if (!this.product.link && this.link)
					this.product.link = this.link;
				if (!this.product.price && this.price)
					this.product.price = this.price;
				if (!this.product.priceOld && this.priceOld)
					this.product.priceOld = this.priceOld;
				if (!this.product.priceRange && this.priceRange)
					this.product.priceRange = this.priceRange;
				if (!this.product.minStep && this.minStep)
					this.product.minStep = this.minStep;
				if (!this.product.status && this.status)
					this.product.status = this.status;
				if (!this.product.delivery && this.delivery)
					this.product.delivery = this.delivery;
				if (!this.product.quantity && this.quantity)
					this.product.quantity = this.quantity;
				if (!this.product.count && this.count)
					this.product.count = this.count;
				if (!this.product.offersCount && this.offersCount)
					this.product.offersCount = this.offersCount;
				if (!this.product.delayed && this.delayed)
					this.product.delayed = this.delayed;
				if (!this.product.params && this.params)
					this.product.params = this.params;
				if (!this.product.priceNotification && this.priceNotification)
					this.product.priceNotification = this.priceNotification;

				Model.$on(['signIn', 'signUp', 'signInSilent', 'signOut'], function (user) {
					this.authorized = Model.authorized;
				});
			}
		});
	});
</script>
