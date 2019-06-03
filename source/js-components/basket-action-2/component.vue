<template>
	<div class="basket-action basket-action--complex">
		<div class="basket-action__main">
			<div class="basket-action__row">
				<div class="basket-action__cell-avail" v-if="showAvailability && availability">
					<availability-sm :value="availability.value" :text="availability.text" :quantity="quantity"></availability-sm>
				</div>
				<div class="basket-action__cell-input" v-if="showInput && authorized">
					<number-input v-model="localCount" :value="minCount" :min="minCount" :step="minCount" :max="maxCount" :size="small ? 'sm' : null"></number-input>
				</div>
				<div class="basket-action__cell-btn" v-if="showButton">
					<button type="button" class="btn btn--info" :class="{'btn--sm': small}" @click="addToBasket" :disabled="waiting" v-if="authorized">
							<svg class="btn__icon svg-icon svg-icon--20"><use xlink:href="#svg-icon-basket"></use></svg>
					</button>
					<button class="btn" type="button" :class="{'btn--sm': small}" @click="authorize" v-else>
							<span class="btn__inner">Купить</span>
					</button>
				</div>
				<!-- <div class="basket-action__cell-btn" v-if="showSubscription">
					<button type="button" class="btn" :class="{'btn--sm': small}" @click="showProductSubscriptionModal" :disabled="waiting">
							<span class="btn__inner">Сообщить о появлении</span>
					</button>
				</div> -->
				<div class="basket-action__cell-btn" v-if="showRequestPrice && authorized">
					<button type="button" class="btn" :class="{'btn--sm': small}" @click="showProductPriceSubscriptionModal" :disabled="waiting">
							<span class="btn__inner">Узнать цену</span>
					</button>
				</div>
				<div class="basket-action__cell-btn" v-else-if="showRequestPrice">
					<button class="btn" type="button" :class="{'btn--sm': small}" @click="authorize" >
							<span class="btn__inner">Купить</span>
					</button>
				</div>
			</div>
		</div>
		<div class="basket-action__in-basket" v-if="authorized && countInBasket && countInBasket > 0">
			<div class="basket-action__in-basket-count">{{countInBasket}}</div>
			<button type="button" class="basket-action__in-basket-btn" @click="removeFromBasket" :disabled="waiting">
				<svg class="svg-icon svg-icon--remove"><use xlink:href="#svg-icon-close"></use></svg>
			</button>
		</div>
	</div>
</template>



<script>
	define(['Model'], function (Model) {
		Vue.component('basket-action-2', {
			template: template,

			data: function () {
				return {
					localCount: 1,
					waiting: false,
					delayTimeout: 0,
					authorized: Model.authorized,
					countInBasket: 0
				}
			},

			props: {
				productId: {
					default: null
				},
				offerId: {
					default: null
				},
				minCount: {
					default: 1
				},
				maxCount: {
					default: Infinity
				},
				bindBasketCount: {
					type: Boolean,
					default: false
				},
				showInput: {
					type: Boolean,
					default: true
				},
				showButton: {
					type: Boolean,
					default: true
				},
				basketMode: {
					type: Boolean,
					default: false
				},
				small: {
					type: Boolean,
					default: false
				},
				showAvailability: {
					type: Boolean,
					default: false
				},
				showSubscription: {
					type: Boolean,
					default: false
				},
				showRequestPrice: {
					type: Boolean,
					default: false
				},
				availability: {
					default: null
				},
				quantity: {
					default: null
				},
				step: {
					default: 1
				}
			},

			methods: {
				addToBasket: function () {
					this.waiting = true;
					Model.addToBasket(this.offerId, this.localCount, this.basketMode);
				},
				removeFromBasket: function () {
					this.waiting = true;
					Model.removeFromBasket(this.offerId);
				},
				authorize: function () {
					Model.showSignInModal();
				},
				showProductSubscriptionModal: function () {
					Model.showProductSubscriptionModal(this.productId, this.offerId);
				},
				showProductPriceSubscriptionModal: function () {
					Model.showProductPriceSubscriptionModal(this.productId, this.offerId);
				}
			},

			created: function () {
				var inst = this;


				function updOffersCountInBasket() {
					var thisOfferInBasket = _.findWhere(Model.basket.products, {offerId: inst.offerId});
					inst.countInBasket = thisOfferInBasket ? thisOfferInBasket.count : 1;



					inst.localCount = inst.countInBasket ? inst.countInBasket : 1;
				}

				Model.$on(['signIn', 'signUp', 'signInSilent', 'signOut'], function (user) {
					inst.authorized = Model.authorized;
				});

				if (inst.minCount) {
					inst.localCount = inst.minCount;
				}

				updOffersCountInBasket();
				alert("asdfadsf");
console.log("In basket", inst.countInBasket);
				Model.$on('basketUpdated', function () {
					inst.waiting = false;
					updOffersCountInBasket();
				});
			},
			watch: {
				localCount: function () {


					var inst = this;

					if (inst.maxCount && inst.localCount > inst.maxCount) {
						inst.localCount = inst.maxCount;
					}

					if (inst.basketMode && !inst.waiting && inst.localCount != inst.countInBasket && inst.localCount > inst.minCount) {
						clearTimeout(inst.delayTimeout);
						inst.delayTimeout = setTimeout(inst.addToBasket, 500);
					}

				}

			}

		});
	});
</script>
