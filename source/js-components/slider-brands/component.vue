<template>
	<slick ref="slider" class="slider-brands slick-side-offset slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="localOptions">
		<slot></slot>
	</slick>
</template>

<script>
define(['app', 'vue!slick/component'], function(app){
	Vue.component('slider-brands', {
		data: function() {
			var inst = this;
			return {
				localOptions: _.defaults(inst.options || {}, {
					slidesToShow: 6,
					slidesToScroll: 6,
					responsive: [
						{
							breakpoint: View.breakpoints['md-max'],
							settings: {
								slidesToShow: 5,
								slidesToScroll: 5
							}
						},
						{
							breakpoint: View.breakpoints['xs-max'],
							settings: {
								slidesToShow: 4,
								slidesToScroll: 4,
								swipeToSlide: true,
								arrows: false,
								dots: true
							}
						},
						{
							breakpoint: View.breakpoints['3xs-max'],
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								swipeToSlide: true,
								arrows: false,
								dots: true
							}
						},
						{
							breakpoint: View.breakpoints['4xs-max'],
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								swipeToSlide: true,
								arrows: false,
								dots: true
							}
						}
					]
				})
			}
		},

		props: [
			'options'
		],

		template: template,

		updated: function() {
			try {
				this.$refs.slider.setPosition();	
			}
			catch(e) {
				
			}
		}
	});
});
</script>