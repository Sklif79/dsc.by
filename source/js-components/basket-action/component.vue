<template>
	<div class="basket-action" :class="{'basket-action--added': countInBasket, 'basket-action--lg': size == 'lg'}">
		 <div class="basket-action__row" :class="{'strong-error': maxcountShow}">
			<div class="basket-action__cell-input basket-action--big" :class="inputWrapperClass" v-if="showInput">
				<number-input v-model="localCount" :min="minCount" :step="minCount" :max="99999" :size="size" :disabled="waiting || disabled" v-on:change=""></number-input>
				<transition name="content-fade">
					<div v-if="maxcountShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field">
						В наличии {{maxCount}} {{unit}}, остальное количество товара будет доставлено под заказ после оплаты.
					</div>
				</transition>
			</div>
			<div class="basket-action__cell-btn" v-if="showButton">
				<button type="button" class="btn btn--primary" :class="{'btn--lg': size == 'lg'}" v-if="showButton" @click="addToBasket" :disabled="waiting || disabled">
					<span class="btn__inner"><svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="0.917cm" height="0.882cm">
<path fill-rule="evenodd"  fill="rgb(255, 255, 255)"
	  d="M23.492,15.089 C23.374,15.660 22.866,16.075 22.283,16.075 L7.024,16.075 L7.329,17.742 L22.110,17.742 C22.451,17.742 22.727,18.019 22.727,18.360 C22.727,18.701 22.451,18.977 22.110,18.977 L7.329,18.977 C6.746,18.977 6.238,18.563 6.120,17.992 L3.135,3.304 L0.427,2.128 C0.114,1.993 -0.029,1.629 0.106,1.316 C0.242,1.003 0.605,0.859 0.918,0.995 L3.626,2.172 C3.994,2.331 4.262,2.662 4.343,3.055 L4.732,4.970 L23.951,4.970 C24.323,4.970 24.672,5.135 24.907,5.425 C25.142,5.713 25.234,6.088 25.159,6.453 L23.492,15.089 ZM4.986,6.204 L6.770,14.840 L22.283,14.840 L23.951,6.204 L4.986,6.204 ZM18.889,9.237 L10.047,9.237 C9.706,9.237 9.430,8.961 9.430,8.620 C9.430,8.279 9.706,8.002 10.047,8.002 L18.889,8.002 C19.230,8.002 19.506,8.279 19.506,8.620 C19.506,8.961 19.230,9.237 18.889,9.237 ZM10.528,10.922 L18.407,10.922 C18.748,10.922 19.024,11.199 19.024,11.540 C19.024,11.880 18.748,12.157 18.407,12.157 L10.528,12.157 C10.187,12.157 9.911,11.880 9.911,11.540 C9.911,11.199 10.187,10.922 10.528,10.922 ZM10.592,19.917 C11.811,19.917 12.802,20.909 12.802,22.128 C12.802,23.348 11.811,24.340 10.592,24.340 C9.374,24.340 8.382,23.348 8.382,22.128 C8.382,20.909 9.374,19.917 10.592,19.917 ZM10.592,23.105 C11.131,23.105 11.568,22.667 11.568,22.128 C11.568,21.590 11.131,21.152 10.592,21.152 C10.054,21.152 9.616,21.590 9.616,22.128 C9.616,22.667 10.054,23.105 10.592,23.105 ZM18.345,19.917 C19.563,19.917 20.555,20.909 20.555,22.128 C20.555,23.348 19.563,24.340 18.345,24.340 C17.126,24.340 16.134,23.348 16.134,22.128 C16.134,20.909 17.126,19.917 18.345,19.917 ZM18.345,23.105 C18.883,23.105 19.320,22.667 19.320,22.128 C19.320,21.590 18.883,21.152 18.345,21.152 C17.806,21.152 17.368,21.590 17.368,22.128 C17.368,22.667 17.806,23.105 18.345,23.105 Z"/>
</svg></span>

				</button>

			</div>
			 <a :href="waiting || disabled ? null : '/order/'" type="button" class="btn btn-w100 btn--primary" :class="{'btn--lg': size == 'lg'}" v-if="countInBasket && showButton" :disabled="waiting || disabled">
				 <span class="btn__inner">Оформить</span>
			 </a>
			<div class="basket-action__cell-remove" v-if="countInBasket && showButton">
				<button type="button" class="basket-action__remove" @click="removeFromBasket" :disabled="waiting || disabled" title="Убрать из корзины">
					<svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg>
				</button>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!number-input/component'], function (Model) {
		Vue.component('basket-action', {
			template: template,

			data: function () {
				return {
					localCount: 1,
					inBasket: 0,
					initValueSet: 0,
					waiting: false,
					delayTimeout: null,
                    maxcountShow: false,

				}
			},

			props: {
				inputWrapperClass:{
					default:""
				},
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
				showInput: {
					type: Boolean,
					default: true
				},
				showButton: {
					type: Boolean,
					default: true
				},
				size: {
					default: null
				},
				basketMode: {
					type: Boolean,
					default: false
				},
				disabled: {
					type: Boolean,
					default: false
				},
				unit: {
					default: ''
				}
			},

			methods: {
				addToBasket: function () {
					this.waiting = true;
					Model.addToBasket(this.offerId, this.localCount, true);
				},

				removeFromBasket: function () {
					this.waiting = true;
					Model.removeFromBasket(this.offerId);
				}
			},

			computed: {
				countInBasket: function () {
					return Model.getBasketCountByOffer(this.offerId);
				}
			},

			created: function () {
				var inst = this;
				inst.localCount = this.countInBasket || this.minCount;

				Model.$on('basketUpdated', function () {
					inst.waiting = false;
					inst.localCount = inst.countInBasket ? inst.countInBasket : 1;
				});
			},

			watch: {
				localCount: function () {
					var inst = this;
					this.$emit('changeLocalCount', this.localCount)

					if (inst.maxCount && inst.localCount > inst.maxCount) {
						//inst.localCount = inst.maxCount;
                        inst.maxcountShow = true;
					}
                    else{
                        setTimeout(function(){inst.maxcountShow = false;}, 5000);
                    }

					if (inst.basketMode && !inst.waiting && inst.localCount != inst.countInBasket && inst.localCount >= inst.minCount) {
						clearTimeout(inst.delayTimeout);
						inst.delayTimeout = setTimeout(inst.addToBasket, 500);
					}
				}
			}

		});
	});
</script>
