<template>
	<slick ref="slider" class="slider-products slick-side-offset slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="localOptions">
		<slot></slot>
	</slick>
</template>

<script>
define(['app', 'vue!slick/component'], function(app){
	Vue.component('slider-products', {
		data: function() {
			var inst = this;
			return {
				localOptions: _.defaults(inst.options || {}, {
					slidesToShow: 4,
					slidesToScroll: 4,
					responsive: [
						{
							breakpoint: 1025,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						},
						{
							breakpoint: View.breakpoints['xs-max'],
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								swipeToSlide: true,
								arrows: true,
								dots: true
							}
						},
						{
							breakpoint: View.breakpoints['4xs-max'],
							settings: {
                                slidesToShow: 1,
								slidesToScroll: 1,
                                variableWidth: true,
								arrows: true,
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