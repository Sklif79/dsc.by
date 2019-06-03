<template>
	<div class="catalog-grid">
		<!--div class="preloader-bar" :class="{'active': loading}"></div-->
		<transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-scale">
			<div class="catalog-grid__item col" v-for="product in products" :key="product.productId">
				<product :product="product" :show-rating="true"
					:show-params="false"
					:show-buy-button="true" 
					:show-fav-button="true" 
					:show-quick-view="true"
					:show-catalog-props-anyway="true"
						 v-on:update-compare="checkCompare"></product>
				<!-- :delivery="product.delivery" -->
			</div>
		</transition-group>
		<a href="/compare/" class="incompare-btn" v-if="incompare>0">{{incompare}} {{incomparegoodsText}} в сравнении</a>
	</div>
</template>



<script>
	define(['Model', 'vue!product/component'], function (Model) {
		Vue.component('catalog-grid', {
			template: template,
            data: function () {
                return {
                    incompare: 0,
                }
            },
			computed: {
                incomparegoodsText: function () {
                    if(this.incompare===1){return 'товар'}
                    else if(this.incompare<5){return 'товара'}
                    else{return 'товаров'}

                },
			},
			props: {
				products: {
					default: null
				},
				loading: {
					default: null
				}
			},
			computed: {
                incomparegoodsText: function () {
                    if(this.incompare===1){return 'товар'}
                    else if(this.incompare<5){return 'товара'}
                    else{return 'товаров'}

                },
			},
			methods: {
                checkCompare: function(param) {
                    var inst=this;
                    console.log('COMPARE');

                            inst.incompare=param;

                }
			},
			mounted: function() {
                this.incompare=$('.complex-link--basket').attr('data-incompare');
			}
		});
	});
</script>