<template>
	<div class="product-price-ext">

		<!--<div class="product-price-ext__cell-fav">
			<fav-btn v-if="favoritesEnabled" :product-id="product.productId" :offer-id="product.offerId"></fav-btn>
		</div>-->
		<div class="product-price-ext__cell-image">

			<div class="product-price-ext__image-box">
				<a class="product-price-ext__link" :href="product.link" v-if="product.link && !notFollowLink"></a>
				<div class="product-price-ext__link" v-else-if="notFollowLink" @click="$emit('linkClick')">{{product.name}}</div>

				<div class="product-price-ext__image" v-if="product.image" :style="{'background-image': 'url('+product.image+')'}"></div>
				<div class="product-price-ext__image" v-else>
					<div class="product-price-ext__no-image">
						<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
					</div>
				</div>
				<div class="product-price-ext__image-zoom" v-if="product.image" :style="{'background-image': 'url('+product.image+')'}"></div>
				<div class="product-price-ext__image-zoom product-price-ext__image-zoom--no-image" v-else>
					<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
				</div>

			</div>
		</div>
		<div class="product-price-ext__cell-info">
			<div class="product-price-ext__cell-info-main">
				<div class="product-price-ext__status-container status-group" v-if="product.status && product.status.length">
					<div class="status" :class="statusItem.class" v-for="statusItem in product.status">{{statusItem.name}}</div>
				</div>

				<a class="product-price-ext__link" :href="product.link" v-if="product.link && !notFollowLink"></a>

				<div class="product-price-ext__link" v-else-if="notFollowLink" @click="$emit('linkClick')">{{product.name}}</div>

				<!--div class="product-price-ext__brand" v-if="product.brand">{{product.brand}}</div-->
				<div class="product-price-ext__name flc" v-if="product.name">{{product.name}} <span v-if="product.code"> — Артикул: {{product.code}}</span></div>

				<div class="product-price-ext__params flc" v-if="product.params && product.params.length || product.brand">
					<div class="product-price-ext__param" v-if="product.brand">
						<span class="product-price-ext__param-value">{{product.brand}}</span><span v-if="product.params && product.params.length">,</span>
					</div>
					<div class="product-price-ext__param" v-for="(param, index) in product.params" v-if="product.params && product.params.length">
						<!--span class="product-price-ext__param-name" v-if="param.name">{{param.name}}: </span-->
						<span class="product-price-ext__param-value" v-if="param.value">{{param.value}}</span><span v-if="index + 1 < product.params.length">,</span>
					</div>
				</div>
			</div>
			<div class="product-price-ext__cell-info-avail">
				<div class="product-price-ext__avail-item flc " >

					<div class="product__instore instore" v-if="(typeof product.quantity === 'number' && product.quantity > 0)">В наличии</div>
					<div class="product__instore" v-else>Под заказ {{product.deliveryDays || 7}} дней</div>

					<div class="right">
						<label class="checkbox checkbox--compare"  >
							<input type="checkbox" class="checkbox-row__input" :checked="product.incompare" v-on:change="compare">
							<span class="checkbox__visual checkbox-row__visual"></span>
							<span class="checkbox__text" v-if="product.incompare">Убрать</span>
							<span class="checkbox__text" v-else>Сравнить</span>
						</label>
					</div>

				</div>
			</div>
		</div>
		<div class="product-price-ext__cell-action">
			<div class="product-price-ext__price">
				<div class="price" v-if="product.price && !basketMode">
					<strike v-if="product.priceOld">{{product.priceOld | formatPrice}}</strike>
					<strong v-if="product.price" :class="{'price__new': product.priceOld, 'price__new-curr': product.priceOld}">{{product.price | formatPrice}} </strong>
					<small :class="{'price__new-curr': product.priceOld}"> {{product.priceCurrency}} </small>
					<span class="price__units" v-if="product.unit"> / {{product.unit}} </span>
				</div>
				<div class="price" v-else-if="product.price && basketMode">
					<strike v-if="product.priceOld" style="text-decoration: none;">
						<span style="text-decoration: line-through;">{{product.priceOld * product.count | formatPrice}}</span> 
						<span class="c-primary-alt"> {{Math.round((product.price - product.priceOld) * 100 / product.priceOld)}}% </span>
					</strike>
					<strong v-if="product.price" :class="{'price__new': product.priceOld}">{{product.price * product.count | formatPrice}} </strong>
					<small :class="{'price__new-curr': product.priceOld}"> {{product.priceCurrency}} </small>
					<span class="price__units" v-if="product.unit"> / {{product.unit}} </span>
				</div>
				<div class="price" v-else-if="product.priceRange">
					<strong>{{product.priceRange.min | formatPrice}}</strong>
					<span class="price__separator"> &ndash; </span>
					<strong>{{product.priceRange.max | formatPrice}}</strong>
					<small :class="{'price__new-curr': product.priceOld}"> {{product.priceCurrency}} </small>
					<span class="price__units" v-if="product.unit"> / {{product.unit}} </span>
				</div>
			</div>
			<div class="product-price-ext__action flc" v-if="(product.price || product.priceRange)">
				<basket-action v-if="product.price && !product.offersCount" 
							   :offer-id="product.offerId" 
							   :max-count="product.quantity || Infinity" 
							   :basketMode="basketMode" 
							   :bind-basket-count="bindBasketCount" 
							   :showButton="!bindBasketCount"></basket-action>
				<a :href="product.link" class="btn btn--primary" v-else>
					<span class="btn__inner">Выбрать</span>
				</a>
			</div>
			<div class="product-price-ext__action small flc" v-else>
				<span class="link link--local" @click="showProductSubscriptionModal" v-if="!product.offersCount || product.offersCount <= 1">

				</span>
				<a :href="product.link" class="btn btn--primary" v-else>
					<span class="btn__inner">Выбрать</span>
				</a>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model'], function (Model) {
		Vue.component('product-price-ext', {
			template: template,

			data: function () {
				return {
					favoritesEnabled: Model.favorites.enabled,
                    incompare: false,
				}
			},

			props: {
				product: {
					default: function () {
						return {};
					}
				},
				notFollowLink: {
					type: Boolean,
					default: false
				},
				basketMode: {
					type: Boolean,
					default: false
				},
				bindBasketCount: {
					type: Boolean,
					default: false
				},
			},

			filters: {
				formatPrice: Model.formatPrice
			},
			created: function () {
				this.product.deliveryDates = this.product.deliveryDates;

				if (this.product.deliveryDates.length) {
					this.product.deliveryDates = this.product.deliveryDates[0];
				} else {
					this.product.deliveryDates = false;
				}
				console.log("test", this.product.deliveryDates);
			},
			methods: {

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
                            inst.$emit('update-compare');
                        }
                    });

                }
			}
		});
	});
</script>
