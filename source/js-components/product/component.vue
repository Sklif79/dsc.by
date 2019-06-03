<template>
	<div class="product" :class="{'product--list-item': listItem, 'product--list-item-short': listItemShort, 'product--list-item-lg': listItemLg, 'product--w-buy': showBuyButton, 'product--w-remove': showRemoveButton, 'product--basket-mode': basketMode}">
		 <a class="product__link" :href="product.link" v-if="product.link && !notFollowLink"></a>
		<div class="product__link" v-if="product.link && notFollowLink" @click="$emit('linkClick')"></div>
		<div class="product__image-container">
			<div class="product__image" v-if="product.image" :style="{'background-image': 'url('+product.image+')'}">
				<div class="product__code" v-if="product.code">Код: {{product.code}}</div>
				<div class="product__discount" v-if="product.discount"><span>-{{product.discount}}%</span> </div>
			</div>
			<div class="product__image" v-else>
				<div class="product__no-image" v-if="!product.image">
					<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
				</div>
			</div>

			<!--<fav-btn v-if="favoritesEnabled && showFavButton" :product-id="product.productId" :offer-id="product.offerId"></fav-btn>-->
			<div class="product__quick-view" v-if="quickViewEnabled" @click="openPreview">Быстрый просмотр</div>
		</div>
		<div class="product__status-container">
			<div class="product__status status" v-if="product.status" :class="statusItem.class" v-for="statusItem in product.status">{{statusItem.name}}</div>
		</div>

		<div class="product__name" v-if="product.name">{{product.name}}</div>
		<div class="product__params" v-if="product.params || (!basketMode && product.count)">

		</div>

		<div class="product__offers-count" v-if="product.offersCount">
			{{product.offersCount}}
		</div>
		<div class="product__price flc">


			<div class="price" v-if="product.price && !basketMode">
				<strike v-if="product.priceOld">{{product.priceOld | formatPrice}} р.</strike>
				<strong v-if="product.price" :class="{'price__new': product.priceOld}">{{product.price | formatPrice}}</strong>
				<small :class="{'price__new-curr': product.priceOld}"> {{product.priceCurrency}} </small>
				<span class="price__units" v-if="product.unit"> / {{product.unit}} </span>
			</div>
			<div class="price" v-else-if="product.price && basketMode">
				<strike v-if="product.priceOld" style="text-decoration: none;"><span style="text-decoration: line-through;">{{product.priceOld * product.count | formatPrice}}</span> <span class="c-primary-alt">{{Math.round((product.price - product.priceOld) * 100 / product.priceOld)}}%</span></strike>
				<strong v-if="product.price" :class="{'price__new': product.priceOld, 'price__new-curr': product.priceOld}">{{product.price * product.count | formatPrice}} </strong>
				<span> руб. </span>
				<span class="price__units" v-if="product.unit"> / {{product.unit}} </span>
			</div>
			<div class="price" v-else-if="product.priceRange">
				<strong>{{product.priceRange.min | formatPrice}}</strong>
				<span class="price__separator"> &ndash; </span>
				<strong>{{product.priceRange.max | formatPrice}}</strong>
				<small> {{product.priceCurrency}} </small>
				<span class="price__units" v-if="product.unit"> / за {{product.unit}} </span>
			</div>
			<div class="price" v-else-if="!product.price && !product.priceRange && showCatalogPropsAnyway">
				<strong>&nbsp;</strong>
			</div>
		</div>

		<div class="product__rating flc" v-if="product.rating && product.rating.count && showRating">
			<rating-block :value="product.rating.value" :count="product.rating.count"></rating-block>
		</div>

		<!--<div class="product__delivery flc">
			<availability-sm v-if="product.quantity > 0" :value="1" :text="'На складе: ' + product.quantity + ( product.unit? ' '+ product.unit:' шт')"></availability-sm>
			<availability-sm v-else :value="0" text="Нет на складе"></availability-sm>
		</div>-->

		<!--<div class="product__delivery flc" v-if="product.regionQuantity>0">
			<availability-sm :text="'Доставка 1-3 дня: '+  product.regionQuantity +' ' + ( product.unit? ' '+product.unit:' шт')" delivery></availability-sm>
		</div>

		<div class="product__delivery flc" v-if="product.deliveryDates" >		
			<availability-sm v-for="(dates, index) in product.deliveryDates" :key="index" v-if="index == 0" :text="'Поступление '+ ' ' + dates.date +' - ' + dates.quantity + ' ' + ( dates.unit? dates.unit:' шт')" delivery ></availability-sm>
		</div>-->

		<!--<div class="product__delivery flc" v-if="product.delivery"
			 :class="{
			 'product__delivery&#45;&#45;good': product.delivery.status == 'good',
			 'product__delivery&#45;&#45;bad': product.delivery.status == 'bad',
			 'product__delivery&#45;&#45;ugly': product.delivery.status == 'ugly'
			 }">
			<div class="product__delivery-icon">
				<svg class="svg-icon svg-icon&#45;&#45;20"><use xlink:href="#svg-icon-delivery"></use></svg>
			</div>
			<div class="product__delivery-txt" v-if="product.delivery.message">{{product.delivery.message}}</div>
		</div>-->
		<div class="product__availability-check" v-if="showAvailabilityButton && typeof product.quantity == 'number'">
			<span class="product__availability-check-btn link link--local" @click="showAvailabilityModal">Показать наличие в магазинах</span>
		</div>

		<div class="product__footer">
			<div class="right">
				<label class="checkbox checkbox--compare"  >
					<input type="checkbox" class="checkbox-row__input" :checked="product.incompare" v-on:change="compare">
					<span class="checkbox__visual checkbox-row__visual"></span>
					<span class="checkbox__text" v-if="product.incompare">Убрать</span>
					<span class="checkbox__text" v-else>Сравнить</span>
				</label>
			</div>

			<div class="product__param" v-for="param in product.params" v-if="showParams">
				<span class="product__param-name" v-if="param.name">{{param.name}}:</span>
				<span class="product__param-value">{{param.value}}</span>
			</div>
			<div class="product__brand" v-if="product.brand">Бренд: {{product.brand}}</div>
			<div class="product-price-ext__avail-item flc" v-if="product.deliveryDates" >		
				<availability-sm v-for="(dates, index) in product.deliveryDates" :key="index" v-if="index == 0" :text="'Поступление '+ ' ' + dates.date +' - ' + dates.quantity + ' ' + ( dates.unit?' '+ dates.unit:' шт')" no-icon time ></availability-sm>
			</div>
			<div class="product__instore instore" v-if="(typeof product.quantity === 'number' && product.quantity > 0 && localCount <= product.quantity)">В наличии</div>
			<div class="product__instore" v-else>Под заказ {{product.deliveryDays || 7}} дней</div>

			<div class="product__action flc" v-if="showBuyButton  &&  (product.price || product.priceRange)">
				<basket-action v-if="product.price && !product.offersCount"
							   ref="basketAction"
							   :offer-id="product.offerId" 
							   :max-count="product.quantity || Infinity"
							   :unit="product.unit"
							   :basket-mode="basketMode" 
							   :bind-basket-count="bindBasketCount" 
							   :show-button="!bindBasketCount"
							   :disabled="disableActions"></basket-action>
				<a :href="product.link" class="btn btn--primary" v-else>
					<span class="btn__inner">Выбрать</span>
				</a>
				<system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message>
			</div>
			<div class="product__action flc" v-else-if="showBuyButton && !basketMode"> 
				<a :href="product.link" class="btn btn--primary">
					<span class="btn__inner">Заказать</span>
				</a>
				<system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message>
			</div>
			<div class="product__action flc" v-else-if="priceNotification || product.priceNotification">
				<system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message>
			</div>


		</div>

		<div class="product__alt-action flc" v-if="showAltActions">
			<div class="product__alt-action-grid">
				<!--				<div class="product__alt-action-item hide" v-if="!product.delayed">
									<span class="link link--local" @click="basketMode ? fromBasketToDelayed() : delay()">Отложить</span>
								</div>-->
				<div class="product__alt-action-item" v-if="product.delayed">
					<span class="link link--local" @click="fromDelayedToBasket">В корзину</span>
				</div>
				<div class="product__alt-action-item">
					<span class="link link--local" @click="remove">Удалить</span>
				</div>
			</div>
		</div>
		<slot name='button'></slot>

		<button type="button" class="product__remove-btn" v-if="showRemoveButton && !basketMode" title="Удалить" @click="remove">
			<svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg>
		</button>
	</div>

</template>



<script>
	define(['Model', 'vue!rating-block/component', 'vue!basket-action/component', 'vue!system-message/component', 'vue!fav-btn/component'], function (Model) {
		Vue.component('product', {
			template: template,

			data: function () {
				return {
					authorized: Model.authorized,
					favoritesEnabled: Model.favorites.enabled,
					quickViewEnabled: Model.quickView.enabled,
					incompare:false,
					localCount: 1
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
					this.$emit('remove');

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
				},
                compare: function(){
                    var inst=this;
                    if(this.product.incompare){var action='remove';this.product.incompare=false;}
                    else{var action='add';this.product.incompare=true;}
                    $.ajax({
                        type: "POST",
                        url: "/ajax/compare.php",
                        data: 'id='+inst.product.offerId+'&action='+action,
                        success: function(result){
                            var json = JSON.parse(result);
                            inst.incompare=parseFloat(json["count"]);
                            inst.$emit('update-compare', parseFloat(json["count"]));
                        }
                    });

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
			},
			mounted: function() {
                var inst = this;
				this.$refs.basketAction.$on('changeLocalCount', function (val) {
					inst.localCount = val
				})

			}
		});
	});
</script>
