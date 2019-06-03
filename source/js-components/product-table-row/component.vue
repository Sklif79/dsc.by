<template>
	<div class="product-table-row">
		<slot name="debug"></slot>
		<a class="product-table-row__link" :href="product.link" v-if="product.link && !notFollowLink"></a>
		<div class="product-table-row__link" v-if="product.link && notFollowLink" @click="$emit('linkClick')"></div>

		<div class="product-table-row__cell" v-for="column in columns" :class="['product-table-row__cell--' + column.visualType]" :data-title="column.title">

			 <div class="product-table-row__cell-in" v-if="column.type == 'code'">
				<div class="product-table-row__code">{{product.code}}</div>
			</div>

			<div class="product-table-row__cell-in" v-if="column.type == 'image-name'">
				<div class="product-table-row__image-name">
					<div class="product-table-row__image-name-image">
						<div class="product-table-row__img-box" :style="{'background-image': 'url('+product.image+')'}" v-if="product.image"></div>
						<div class="product-table-row__img-box" v-else>
							<div class="product-table-row__no-image">
								<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
							</div>
						</div>
					</div>
					<div class="product-table-row__image-name-name" v-if="product.name">
						{{product.name}}
					</div>
				</div>
			</div>

			<div class="product-table-row__cell-in" v-if="column.type == 'name'">
				<div class="product-table-row__name">{{product.name}}</div>
			</div>

			<div class="product-table-row__cell-in" v-if="column.type == 'param'">
				<div class="product-table-row__brand" v-if="column.id">{{showParamValue(column.id)}}</div>
			</div>

			<div class="product-table-row__cell-in" v-if="column.type == 'price'">
				<div class="product-table-row__price flc" v-if="product.price">
					<div class="price price--sm">
						<strike v-if="product.priceOld">{{product.priceOld | formatPrice}} </strike>
						<strong v-if="product.price" :class="{'price__new': product.priceOld}">{{product.price | formatPrice}} </strong>
						<small :class="{'price__new-curr': product.priceOld}">{{product.priceUnit}}</small>
					</div>
				</div>
				<div class="product-table-row__price flc" v-if="product.priceRange">
					<div class="price price--sm">
						<strong>{{product.priceRange.min | formatPrice}}</strong>
						<span class="price__separator"> &ndash; </span>
						<strong>{{product.priceRange.max | formatPrice}}</strong>
						<small>руб. {{product.priceUnit}}</small>
					</div>
				</div>
			
			</div>
 
			<div class="product-table-row__cell-in" v-if="column.type == 'buy'">
				<basket-action-2 :offer-id="offerId"
					:min-count="typeof product.minStep == 'number' ? product.minStep : 1" 
					:max-count="typeof product.quantity == 'number' ? product.quantity : Infinity" 
					:basketMode="basketMode" 
					:bind-basket-count="bindBasketCount" 
					:small="true" 
					:availability="product.availability" 
					:quantity="product.quantity" 
					:show-availability="true" 
					:show-input="parsePrice(product.price) > 0 && typeof product.quantity == 'number' && product.quantity > 0"
					:show-button="parsePrice(product.price) > 0 && typeof product.quantity == 'number' && product.quantity > 0" 
					:show-subscription="parsePrice(product.price) > 0 && !product.quantity" 
					:show-request-price="!parsePrice(product.price)"  ></basket-action-2>

				<!--button type="button" class="product-table-row__remove-btn" title="Удалить" @click="remove">
					<svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg>
				</button-->
			</div>

			<div class="product-table-row__cell-in" v-if="column.type == 'count'">
				<div class="product-table-row__count">{{product.count}}</div>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!basket-action-2/component'], function (Model) {
		Vue.component('product-table-row', {
			template: template,
			data: function () {
				return {
					colors: null
				}
			},
			props: {
				basketMode: {
					type: Boolean,
					default: false,
				},
				minStep: {
					default: 1,
				},
				columns: {
					default: null,
				},
				productId: {
					type: String,
					default: null
				},
				offerId: {
					type: String,
					default: null
				},
				product: {
					default: function() {return {};}
				},
				code: {
					default: null
				},
				image: {
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
				quantity: {
					default: null
				},
				count: {
					default: null
				},
				params: {
					default: null
				},
				bindBasketCount: {
					type: Boolean,
					default: false
				},
				notFollowLink: {
					type: Boolean,
					default: false
				},
				availability: {
					default: null
				}
			},

			methods: {

				showParamValue: function (valueID) {
					var inst = this;
					if (!inst.params) {
						return "";
					}
					var param = _.findWhere(inst.params, {id: valueID});
					return param ? param.value : "";
				},
				remove: function () {
					this.$emit('remove');
					Model.removeFromBasket(this.offerId);
				},
				delay: function () {
					this.$emit('remove');
					Model.addToDelayed(this.offerId);
				},
				fromDelayedToBasket: function () {
					Model.removeFromDelayed(this.offerId);
					Model.addToBasket(this.offerId);
				},
				fromBasketToDelayed: function () {
					Model.removeFromBasket(this.offerId);
					Model.addToDelayed(this.offerId);
				},
				openPreview: function () {
					Model.showProductPreviewModal(this.productId, this.offerId, this.link);
				},
				showAvailabilityModal: function () {
					Model.showProductAvailabilityModal(this.productId, this.offerId);
				},
				showProductSubscriptionModal: function () {
					Model.showProductSubscriptionModal(this.productId, this.offerId);
				},
				parsePrice: Model.parsePrice
			},

			filters: {
				formatPrice: Model.formatPrice
			},

			created: function() {
				if(!this.product.image && this.image)
					this.product.image = this.image;
				if(!this.product.code && this.code)
					this.product.code = this.code;
				if(!this.product.brand && this.brand)
					this.product.brand = this.brand;
				if(!this.product.name && this.name)
					this.product.name = this.name;
				if(!this.product.link && this.link)
					this.product.link = this.link;
				if(!this.product.price && this.price)
					this.product.price = this.price;
				if(!this.product.priceOld && this.priceOld)
					this.product.priceOld = this.priceOld;
				if(!this.product.priceRange && this.priceRange)
					this.product.priceRange = this.priceRange;
				if(!this.product.minStep && this.minStep)
					this.product.minStep = this.minStep;
				if(!this.product.status && this.status)
					this.product.status = this.status;
				if(!this.product.delivery && this.delivery)
					this.product.delivery = this.delivery;
				if(!this.product.quantity && this.quantity)
					this.product.quantity = this.quantity;
				if(!this.product.count && this.count)
					this.product.count = this.count;
				if(!this.product.offersCount && this.offersCount)
					this.product.offersCount = this.offersCount;
				if(!this.product.delayed && this.delayed)
					this.product.delayed = this.delayed;
				if(!this.product.params && this.params)
					this.product.params = this.params;
			}
		});
	});
</script>
