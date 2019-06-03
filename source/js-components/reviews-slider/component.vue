<template>
	<div class="reviews-slider flc" :class="{'reviews-slider--alt': appearance == 'alt', 'reviews-slider--w-nav': hasNavigation}">
		<slick ref="mainSlider" class="reviews-slider__main-slider slick-default-arrows slick-default-dots" :options="{dots: true}" @afterChange="syncSliderAndNav">
			<slot></slot>
		</slick>
		<slick class="reviews-slider__nav-slider slick-default-arrows" :options="previewsConfig" v-if="hasNavigation">
			<div class="reviews-slider__nav-slide" v-for="(slide, index) in slides">
				<div class="reviews-slider__nav-box" @click="setMainSlide(index)" :class="{active: currentSlide == index}">
					<img :src="slide.componentOptions.propsData.navImage" :alt="slide.componentOptions.propsData.title">
				</div>
			</div>
		</slick>
	</div>
</template>


<script>
	define(['Model'], function (Model) {
		Vue.component('reviews-slider', {
			template: template,

			data: function() {
				return {
					currentSlide: 0,
					previewsConfig: {
						slidesToShow: 6, 
						slidesToScroll: 6,
						responsive: [
							{
								breakpoint: 1100,
								settings: {
									slidesToShow: 5,
									slidesToScroll: 5
								}
							},
							{
							breakpoint: View.breakpoints['xs-max'],
								settings: {
									slidesToShow: 5,
									slidesToScroll: 5,
									arrows: false
								}
							},
							{
								breakpoint: View.breakpoints['2xs-max'],
								settings: {
									slidesToShow: 4,
									slidesToScroll: 4
								}
							},
							{
								breakpoint: View.breakpoints['3xs-max'],
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3
								}
							},
						]
					}
				};
			},

			props: {
				appearance: {
					default: 'default'
				}
			},

			computed: {
				hasNavigation: function() {
					if(!this.$slots.default)
						return false;

					return !!_.find(this.$slots.default, function(slide) {
						return slide.componentOptions && slide.componentOptions.propsData.navImage;
					});
				},

				slides: function() {
					return _.filter(this.$slots.default, function(slide) {
						return slide.componentOptions && slide.componentOptions.propsData;
					});
				}
			},


			methods: {
				setMainSlide: function(index) {
					this.currentSlide = index;
					this.$refs.mainSlider.goTo(index);
				},

				syncSliderAndNav: function(e, slick, currentSlide) {
					this.currentSlide = currentSlide;
				}
			}
		});
	});
</script>