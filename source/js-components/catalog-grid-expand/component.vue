<template>
	<div class="catalog-grid-expand" :class="{'catalog-grid-expand--last-step': isLastStep}">
		<div class="catalog-grid-expand__content">
			<div class="catalog-grid">
				<!--div class="preloader-bar" :class="{'active': loading}"></div-->
				<transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-fade">
					<div class="catalog-grid__item col" v-for="product in productsLocal" :key="product.productId" 
							:class="{'catalog-grid__item--exp-hidden': product.expHidden, 'catalog-grid__item--exp-part-hidden': product.expPartHidden}">
						<product :product="product" :show-rating="true"
							:show-buy-button="true" 
							:show-fav-button="true" 
							:show-quick-view="true"
							:show-catalog-props-anyway="true" 
							:show-params="false"></product>
						<!-- :delivery="product.delivery" -->
					</div>
				</transition-group>
			</div>
		</div>
		<transition name="content-fade" mode="out-in">
			<div class="catalog-grid-expand__action" v-if="multistep && !isLastStep">
				<button type="button" class="btn btn--primary" @click="moar">
					<span class="btn__inner">Показать еще</span>
				</button>
			</div>
			<div class="catalog-grid-expand__action" v-else-if="multistep">
				<button type="button" class="btn" @click="less">
					<span class="btn__inner">Свернуть</span>
				</button>
			</div>
		</transition>
	</div>
</template>


<script>
	define(['Model'], function (Model) {
		Vue.component('catalog-grid-expand', {
			template: template,

			data: function() {
				return {
					step: null,
					productsLocal: null,
					isLastStep: true,
					multistep: false,
					instID: Math.random()
				}
			},

			props: {
				products: {
					default: null
				},
				initialStep: {
					default: 1
				}
			},

			methods: {
				moar: function() {
					this.step++;
					this.recalc();
				},

				less: function() {
					this.step = 1;
					this.recalc();

					var el = $(this.$el);
					var floor = el.closest('.floor');
					$('html, body').animate({scrollTop: (floor.length ? floor.offset().top : el.offset().top) + $(window).scrollTop() - 20}, 400);
				},

				recalc: function() {
					//this.stepHeight = this.jQueryEl.find('.catalog-grid__item').outerHeight();
					var $products = $(this.$el).find('.catalog-grid__item');
					var steps = [];
					var top;
					var hiddensPresent = false;
					var inst = this;

					for(var i = 0; i < $products.length; i++) {
						inst.productsLocal[i].expHidden = false;
						inst.productsLocal[i].expPartHidden = false;
					}

					Vue.nextTick(function() {
						for(var i = 0; i < $products.length; i++) {
							top = $products[i].getBoundingClientRect().top;
							if(steps.indexOf(top) < 0)
								steps.push(top);

							if(steps.length <= inst.step) {
								inst.productsLocal[i].expHidden = false;
								inst.productsLocal[i].expPartHidden = false;
							}
							else if(steps.length == inst.step + 1) {
								inst.productsLocal[i].expHidden = false;
								inst.productsLocal[i].expPartHidden = true;
								hiddensPresent = true;
							}
							else {
								inst.productsLocal[i].expHidden = true;
								inst.productsLocal[i].expPartHidden = false;
								hiddensPresent = true;
							}
						}

						inst.multistep = steps.length > 1;

						inst.isLastStep = !hiddensPresent;

						inst.$forceUpdate();
					});

					inst.$forceUpdate();
				}
			},

			mounted: function() {
				var inst = this;
				inst.step = inst.initialStep;

				console.log('mount')
				Vue.nextTick(function() {
					Vue.nextTick(function() {
						inst.recalc();
						inst.$forceUpdate();
						Vue.nextTick(function() {
							setTimeout(function() {
								inst.recalc();
								inst.$forceUpdate();
							}, 300);
						});
					});
				});

				this.productsLocal = this.products;
				
				
				var recalcDelay = null;
				$(window).off('resize.vueExpandableBlockRecalc' + this.instID).on('resize.vueExpandableBlockRecalc' + this.instID, function() {
					if(!recalcDelay)
						setTimeout(function() {
							inst.recalc();
							recalcDelay = null;
						}, 100);
				});
			},

			beforeDestroyed: function() {
				$(window).off('resize.vueExpandableBlockRecalc' + this.instID);
			}
		});
	});
</script>