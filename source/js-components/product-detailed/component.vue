<template>
	<div class="product-detailed">
		<div class="product-detailed__main flc">
			<div class="product-detailed__cell-image">
				<div class="product-detailed__status-container" v-if="product.status && product.status.length">
					<div class="product-detailed__status status" :class="'status--' + statusItem.type" v-for="statusItem in product.status">{{statusItem.name}}</div>
				</div>
				<div class="product-detailed__image" v-if="product.image" :style="{'background-image': 'url('+product.image+')'}"></div>
				<div class="product-detailed__image" v-else>
					<div class="product-detailed__no-image" v-if="!product.image">
						<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
					</div>
				</div>
			</div>
			<div class="product-detailed__cell-info">
				<div class="product-detailed__brand" v-if="product.brand">{{product.brand}}</div>
				<h3 class="product-detailed__name" v-if="product.name"> 
					<a class="product-detailed__name-link" :href="product.link" v-if="product.link && !notFollowLink">{{product.name}}</a>
					<div class="product-detailed__name-link" v-else-if="notFollowLink" @click="$emit('linkClick')">{{product.name}}</div>
					<div class="product-detailed__name-txt" v-else>{{product.name}}</div>
				</h3>

				<div class="product-detailed__params" v-if="product.params && product.params.length">
					<div class="product-detailed__param" v-for="param in product.params">
						<span class="product-detailed__param-name" v-if="param.name">{{param.name}}: </span>
						<span class="product-detailed__param-value" v-if="param.value">{{param.value}}</span>
					</div>
				</div>
			</div>

		</div>

		<div class="product-detailed__offers" v-if="offers && columns">
			<transition :css="false" @enter="slideDown" @leave="slideUp">
				<product-table :columns="columns" v-if="viewMode == 'desktop' || offersOpen">
					<product-table-row v-for="offer in offers" :key="offer.offerId" slot="row"
							:columns="columns" 
							:productId="offer.productId" 
							:offerId="offer.offerId" 
							:product="offer"
							:show-buy-button="true" >
							</product-table-row>
				</product-table>
			</transition>
			<div class="product-detailed__offers-trigger" :class="{'open': offersOpen}">
				<span class="link link--local link--undecorated link--dd" :class="{'open': offersOpen}" @click="offersOpen = !offersOpen">
					<transition name="content-fade" mode="out-in">
						<span class="link__text" v-if="!offersOpen">Показать {{offers.length}} вариант{{pluralize(offers.length)}}</span>
						<span class="link__text" v-else>Свернуть</span>
					</transition>
					<svg class="link__arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
				</span>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!product-table/component', 'vue!product-table-row/component'], function (Model) {
		Vue.component('product-detailed', {
			template: template,

			data: function () {
				return {
					offersOpen: false,
					viewMode: 'desktop',
					instanceId: null
				}
			},

			props: {
				columns: {
					default: null
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
				offers: {
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
				notFollowLink: {
					type: Boolean,
					default: false
				}
			},

			filters: {
				formatPrice: Model.formatPrice
			},


			methods: {

				slideDown: function (element, done) {
					var el = $(element);
					el.hide().slideDown(300, done);
				},

				slideUp: function (element, done) {
					var el = $(element);
					el.show().slideUp(300, done);
				},

				pluralize: function(num) {
					if(num % 10 == 1)
						return '';
					else if(num % 10 >= 2 && num % 10 <= 4)
						return 'a';
					else
						return 'ов';
				}
			},

			created: function() {
				var inst = this;
				inst.instanceId = Math.round(Math.random() * 100000);
				var resizeTimeout = null;

				$(window).on('resize.toggleProductDetailedViewMode' + inst.instanceId, function() {
					if(!resizeTimeout)
						resizeTimeout = setTimeout(recalcViewMode, 300);
				});

				function recalcViewMode() {
					inst.viewMode = window.innerWidth > View.breakpoints['xs-max'] ? 'desktop' : 'mobile';
					resizeTimeout = null;
				}

				recalcViewMode();

				// постепенно переходим на одно поле product
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
			},

			destroyed: function() {
				$(window).off('resize.toggleProductDetailedViewMode' + this.instanceId);
			}
		});
	});
</script>
