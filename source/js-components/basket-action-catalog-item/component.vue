<template>
	<div class="basket-action" :class="{'basket-action--added': countInBasket, 'basket-action--lg': size == 'lg'}">
		 <div class="basket-action__row"  v-if="calculator.to_unit && calculator.from_unit" :class="{'strong-error': countError}">
			 <div class="catalog-item-3__depended-fields">
				 <div class="depended-field-box"  :class="{'strong-error': countError}">
					 <input type="number" v-model="localCount" v-on:change="updateDepend('child')"  v-on:keyup="updateDepend('child'); countErrorUpdate(localCount)" class="text-input">
					 <div class="depended-field__note">{{calculator.from_unit}}</div>
					 <transition name="content-fade">
						 <div v-if="maxcountShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field">
							 В наличии {{maxCount}} {{calculator.from_unit}}, остальное количество товара будет доставлено под заказ после оплаты.
						 </div>
					 </transition>
				 </div>
				 <div class="depended-fields-text" v-if="calculator.to_unit">
					 =
				 </div>
				 <div class="depended-field-box "  :class="{'strong-error': countError}"  v-if="calculator.to_unit">
					 <input type="number" step="0.001" v-model="dependCount" v-on:change="updateDepend('parent')" v-on:keyup="countErrorUpdate2(localCount); updateDepend('parent', 3000)" v-on:keydown="countZeroLimit" class="text-input">
					 <div class="depended-field__note">{{calculator.to_unit}}</div>
					 <transition name="content-fade">
						 <div v-if="maxunitsShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field">
							 Метраж и количество товара пересчитаны в соответствии с актуальным количеством в наличии
						 </div>
					 </transition>
				 </div>
			 </div>
		 </div>

		<div class="catalog-item-3__depended-fields" v-else>
			<div class="basket-action__row" :class="{'strong-error': countError}">
				<div class="basket-action__cell-input basket-action--big">
					<div class="number-input">
						<div class="number-input__minus">
							<button type="button" tabindex="-1" class="number-input__btn number-input__btn--minus" @click="LCDecrease"></button>
						</div>
						<div class="number-input__input">
							<div class="rich-text-input filled">
								<input v-model="localCount" type="number" autocomplete="off" required="required" novalidate="novalidate" class="rich-text-input__input text-input notempty" @keyup="countErrorUpdate(localCount)">

								<span class="rich-text-input__border"></span>
							</div>
						</div>
						<div class="number-input__plus">
							<button type="button" tabindex="-1" class="number-input__btn number-input__btn--plus" @click="LCIncrease"></button>
						</div>
					</div>
					<transition name="content-fade">
						<div v-if="maxcountShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field">
							В наличии {{maxCount}} {{calculator.from_unit}}, остальное количество товара будет доставлено под заказ после оплаты.
						</div>
					</transition>
				</div>
				<div class="basket-action__cell-btn detail-product-cartbutton">
					<button type="button" class="btn btn--primary" :class="{'btn--lg': size == 'lg'}" v-if="showButton" @click="addToBasket" >
					<span class="btn__inner"><svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="0.917cm" height="0.882cm">
<path fill-rule="evenodd"  fill="rgb(255, 255, 255)"
	  d="M23.492,15.089 C23.374,15.660 22.866,16.075 22.283,16.075 L7.024,16.075 L7.329,17.742 L22.110,17.742 C22.451,17.742 22.727,18.019 22.727,18.360 C22.727,18.701 22.451,18.977 22.110,18.977 L7.329,18.977 C6.746,18.977 6.238,18.563 6.120,17.992 L3.135,3.304 L0.427,2.128 C0.114,1.993 -0.029,1.629 0.106,1.316 C0.242,1.003 0.605,0.859 0.918,0.995 L3.626,2.172 C3.994,2.331 4.262,2.662 4.343,3.055 L4.732,4.970 L23.951,4.970 C24.323,4.970 24.672,5.135 24.907,5.425 C25.142,5.713 25.234,6.088 25.159,6.453 L23.492,15.089 ZM4.986,6.204 L6.770,14.840 L22.283,14.840 L23.951,6.204 L4.986,6.204 ZM18.889,9.237 L10.047,9.237 C9.706,9.237 9.430,8.961 9.430,8.620 C9.430,8.279 9.706,8.002 10.047,8.002 L18.889,8.002 C19.230,8.002 19.506,8.279 19.506,8.620 C19.506,8.961 19.230,9.237 18.889,9.237 ZM10.528,10.922 L18.407,10.922 C18.748,10.922 19.024,11.199 19.024,11.540 C19.024,11.880 18.748,12.157 18.407,12.157 L10.528,12.157 C10.187,12.157 9.911,11.880 9.911,11.540 C9.911,11.199 10.187,10.922 10.528,10.922 ZM10.592,19.917 C11.811,19.917 12.802,20.909 12.802,22.128 C12.802,23.348 11.811,24.340 10.592,24.340 C9.374,24.340 8.382,23.348 8.382,22.128 C8.382,20.909 9.374,19.917 10.592,19.917 ZM10.592,23.105 C11.131,23.105 11.568,22.667 11.568,22.128 C11.568,21.590 11.131,21.152 10.592,21.152 C10.054,21.152 9.616,21.590 9.616,22.128 C9.616,22.667 10.054,23.105 10.592,23.105 ZM18.345,19.917 C19.563,19.917 20.555,20.909 20.555,22.128 C20.555,23.348 19.563,24.340 18.345,24.340 C17.126,24.340 16.134,23.348 16.134,22.128 C16.134,20.909 17.126,19.917 18.345,19.917 ZM18.345,23.105 C18.883,23.105 19.320,22.667 19.320,22.128 C19.320,21.590 18.883,21.152 18.345,21.152 C17.806,21.152 17.368,21.590 17.368,22.128 C17.368,22.667 17.806,23.105 18.345,23.105 Z"/>
</svg></span>

					</button>

				</div>
			</div>
		</div>

			 <div class="basket-action__note" v-if="calculator.from_unit_notification && calculator.from_unit_notification!=='Продажа осуществляется только поштучно'">
				 <div class="attention-icon"> ! </div>
				 <div class="basket-action__note-text">{{calculator.from_unit_notification}}</div>
			 </div>
			<div class="" v-if="showButton">
				<div  v-if="!countInBasket">
					<button type="button" class="btn btn--primary btn--catalog-item-button" :class="{'btn--lg': size == 'lg'}" @click="addToBasket" :disabled="waiting || disabled" v-if="quantity===0">
						<span class="btn__inner" >Заказать</span>
					</button>
					<div v-else-if="calculator.to_unit && calculator.from_unit">
						<button type="button" class="btn btn--primary btn--catalog-item-button" :class="{'btn--lg': size == 'lg'}"  @click="addToBasket" :disabled="waiting || disabled">
							<span class="btn__inner">Положить в корзину</span>
						</button>
					</div>
				</div>
				<div v-else-if="calculator.to_unit && calculator.from_unit">
					<button type="button" class="btn btn--primary btn--catalog-item-button" :class="{'btn--lg': size == 'lg'}"  @click="addToBasket" :disabled="waiting || disabled">
						<span class="btn__inner">Обновить корзину</span>
					</button>
				</div>
				<button type="button"  data-modal="/ajax/buyOneClick.php" class="btn btn--light btn--catalog-item-button js-load-modal" :class="{'btn--lg': size == 'lg'}"  :disabled="waiting || disabled">
					<span class="btn__inner">Заказать в 1 клик</span>
				</button>
			</div>
			<div class="basket-action__cell-remove" v-if="countInBasket">
				<button type="button" class="btn btn--light btn--catalog-item-button btn--lg" @click="removeFromBasket" :disabled="waiting || disabled" title="Убрать из корзины">
					<span class="btn__inner">Убрать из корзины</span>
				</button>
			</div>
		</div>

</template>



<script>
	define(['Model', 'vue!number-input/component'], function (Model) {
		Vue.component('basket-action-catalog-item', {
			template: template,

			data: function () {
				return {
					localCount: 1,
					inBasket: 0,
					initValueSet: 0,
					waiting: false,
					delayTimeout: null, 
					dependCount: 0,
					maxcountShow: false,
					maxunitsShow: false,
					notifyTimeout: null,
                    countError:false
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
				calculator:{
				        default:false
				},
				quantity:{
				        default:0
				},
			},

			methods: {
				addToBasket: function () {
					this.waiting = true;
					Model.addToBasket(this.offerId, this.localCount, true);
				},
				buyOneCLick: function () { 
					View.control.openModalByUrl('/ajax/buyOneClick.php?id=' + this.offerId);
				}, 
				removeFromBasket: function () {
					this.waiting = true;
					Model.removeFromBasket(this.offerId);
				},
                updateDepend: function(type, timer){
				    var self=this;
				    var hold=50;
				    if(timer>0){hold=timer;}
				    clearTimeout(this.delayTimeout);
				    this.delayTimeout= setTimeout(function(){
                        if(type==='parent'){
                            self.localCount=Math.ceil(self.dependCount/self.calculator.ratio);
                        }

                        self.dependCount=(self.localCount*self.calculator.ratio).toFixed(3);
					}, hold);

                },
                LCIncrease: function(){
                    this.localCount++;
                    this.countError=false;
				},
                LCDecrease: function(){
                    if(this.localCount>1){
                        this.localCount--;
                        this.countError=false;
					}
                },
                countErrorUpdate: function( count){

                    if(count<this.maxCount ){
                        this.countError=false;
                        console.log(this.maxUnits);
					}
                },
                countErrorUpdate2: function( count){

                    if(this.dependCount < this.maxUnits.toFixed(3)){
                        this.countError=false;
                        console.log(this.maxUnits);
                    }
                },
                countZeroLimit: function(e){
					console.log(e.target.value);
                },
			},

			computed: {
				countInBasket: function () {
					return Model.getBasketCountByOffer(this.offerId);
				},
				maxUnits: function () {
				    return this.maxCount*this.calculator.ratio;
				}
			},

			created: function () {
				var inst = this; 
				inst.localCount = this.countInBasket || this.minCount;
                               // inst.dependFactor = thid.calculator.ratio;
				Model.$on('basketUpdated', function () {
					inst.waiting = false; 
					inst.localCount = inst.countInBasket ? inst.countInBasket : 1;
				});
			},
			mounted: function() {
			    this.updateDepend();
			    console.log(this);
			},

			watch: {
				localCount: function () {
					var inst = this;
                    if(inst.localCount<1){inst.localCount=1;}
					clearTimeout(inst.notifyTimeout);
					if (inst.maxCount && inst.localCount > inst.maxCount) {
                        inst.notifyTimeout= setTimeout(function(){
                            //inst.localCount = inst.maxCount;
                            inst.maxcountShow = true;
                            inst.countError = true;
						},50);

					}

                        inst.notifyTimeout= setTimeout(function(){inst.maxcountShow = false;}, 5000);



					if (inst.basketMode && !inst.waiting && inst.localCount != inst.countInBasket && inst.localCount >= inst.minCount) {
						clearTimeout(inst.delayTimeout);
						inst.delayTimeout = setTimeout(inst.addToBasket, 500);
					}
				},
                dependCount: function () {
                    var inst = this;
                    if(inst.dependCount.split('.')[1].length>3){
                        inst.dependCount=Number(inst.dependCount).toFixed(3);
					}
                    if(inst.dependCount<inst.calculator.ratio){inst.dependCount=inst.calculator.ratio;}
                    if (inst.maxUnits && inst.dependCount > inst.maxUnits && inst.localCount <= inst.maxCount) {
                        inst.localCount = inst.maxCount;
                        inst.dependCount = inst.maxUnits.toFixed(3);
                        inst.countError = true;
                        inst.maxcountShow = true;
                    }
                    else{
                        clearTimeout(inst.delayTimeout);
                        inst.delayTimeout = setTimeout(function(){inst.maxcountShow = false;}, 5000);

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