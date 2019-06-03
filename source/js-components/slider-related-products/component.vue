<template>
	<slick ref="slider" class="slider-products slider-products--related slider-products--no-tail slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="localOptions">
		<div class="product-slide" v-for="product in products">
			<product :product="product" 
				:show-rating="!hideRating"
				:show-quick-view="true"
				:show-buy-button="true"
				:show-fav-button="true"></product>
		</div>
	</slick>
</template>

<script>
	define(['app', 'vue!slick/component', 'vue!product/component'], function (app) {
		Vue.component('slider-related-products', {
			template: template,

			data: function () {
				var inst = this;
				return {
					products: [],
					localOptions: _.defaults(inst.options || {}, {
						slidesToShow: inst.mode == 'modal' ? 4 : inst.mode == 'modal-sm' ? 3 : 3,
						slidesToScroll: inst.mode == 'modal' ? 4 : inst.mode == 'modal-sm' ? 3 : 3,
						responsive: [
							{
								breakpoint: View.breakpoints['sm-max'],
								settings: {
									slidesToShow: inst.mode == 'modal' || inst.mode == 'modal-sm' ? 3 : 3,
									slidesToScroll: inst.mode == 'modal' || inst.mode == 'modal-sm' ? 3 : 3
								}
							},
							{
								breakpoint: View.breakpoints['xs-max'],
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['4xs-max'],
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							}
						]
					})
				}
			},

			props: {
				productsList: {
					default: null
				},
				options: {
					default: null
				},
				dataSource: {
					default: null
				},
				hideRating: {
					type: Boolean,
					default: false
				},
				hideParams: {
					type: Boolean,
					default: false
				},
				mode: {
					default: "side"
				}
			},

			mounted: function () {
				var inst = this;

				if (inst.dataSource && !inst.productsList) {
					$.get({
						url: inst.dataSource,
						dataType: 'json'
					})
							.done(function (response) {
								inst.products = response.products;
								inst.$refs.slider.reSlick();
							})
							.fail(function (response) {
								console.warn('related products ajax fail: ', response);
							});
				} else if (inst.productsList) {

					inst.products = inst.productsList;
				}
			},

			updated: function () {
				try {
					this.$refs.slider.setPosition();
				} catch (e) {

				}
			}
		});
	});
</script>
