<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	define(['app', 'Model'], function (app, Model) {
		Vue.component('slick', {
			template: template,

			data: function () {
				var inst = this;

				return {
					jqueryEl: null,
					localOptions: _.defaults(inst.options || {}, {
						prevArrow: '<span class="slick-arrow slick-prev">' +
								'<svg class="svg-icon"><use xlink:href="#svg-icon-slider-left"></use></svg>' +
								'</span>',

						nextArrow: '<span class="slick-arrow slick-next">' +
								'<svg class="svg-icon"><use xlink:href="#svg-icon-slider-right"></use></svg>' +
								'</span>',
						dots: true,

						responsive: [
							{
								breakpoint: View.breakpoints['xs-max'],
								settings: {
									dots: true
								}
							}
						]
					})
				};
			},

			props: {
				options: {
					type: Object
				},
			},

			methods: {
				create: function () {
					var inst = this;
					var $slick = $(this.$el);

					$slick.on('afterChange', this.onAfterChange);
					$slick.on('beforeChange', this.onBeforeChange);
					$slick.on('breakpoint', this.onBreakpoint);
					$slick.on('destroy', this.onDestroy);
					$slick.on('edge', this.onEdge);
					$slick.on('init', this.onInit);
					$slick.on('reInit', this.onReInit);
					$slick.on('setPosition', this.onSetPosition);
					$slick.on('swipe', this.onSwipe);
					$slick.on('lazyLoaded', this.onLazyLoaded);
					$slick.on('lazyLoadError', this.onLazyLoadError);

					$slick.on('beforeChange touchstart', function () {
						$slick.addClass('slick-animated');
					});

					$slick.on('afterChange touchend', function () {
						$slick.removeClass('slick-animated');
					});

					Vue.nextTick(function () {
						Vue.nextTick(function () {
							$(inst.$el).slick(inst.localOptions);
						});
					});
				},

				reSlick: function () {
					$(this.$el).slick('unslick');
					this.create();
				},

				setPosition: function () {
					$(this.$el).slick('setPosition');
				},

				next: function () {
					$(this.$el).slick('slickNext');
				},

				prev: function () {
					$(this.$el).slick('slickPrev');
				},

				pause: function () {
					$(this.$el).slick('slickPause');
				},

				play: function () {
					$(this.$el).slick('slickPlay');
				},

				goTo: function (index, dontAnimate) {
					$(this.$el).slick('slickGoTo', index, dontAnimate);
				},

				currentSlide: function () {
					$(this.$el).slick('slickCurrentSlide');
				},

				add: function (element, index, addBefore) {
					$(this.$el).slick('slickAdd', element, index, addBefore);
				},

				remove: function (index, removeBefore) {
					$(this.$el).slick('slickRemove', index, removeBefore);
				},

				filter: function (filterData) {
					$(this.$el).slick('slickFilter', filterData);
				},

				unfilter: function () {
					$(this.$el).slick('slickUnfilter');
				},

				getOption: function (option) {
					$(this.$el).slick('slickGetOption', option);
				},

				setOption: function (option, value, refresh) {
					$(this.$el).slick('slickSetOption', option, value, refresh);
				},

				// Events
				onAfterChange: function (event, slick, currentSlide) {
					this.$emit('afterChange', event, slick, currentSlide);
				},

				onBeforeChange: function (event, slick, currentSlide, nextSlide) {
					this.$emit('beforeChange', event, slick, currentSlide, nextSlide);
					this.setDotClasses(event, slick, currentSlide, nextSlide)
				},

				onBreakpoint: function (event, slick, breakpoint) {
					this.$emit('breakpoint', event, slick, breakpoint);
				},

				onDestroy: function (event, slick) {
					this.$emit('destroy', event, slick);
				},

				onEdge: function (event, slick, direction) {
					this.$emit('edge', event, slick, direction);
				},

				onInit: function (event, slick) {
					this.$emit('init', event, slick);
				},

				onReInit: function (event, slick) {
					this.$emit('reInit', event, slick);
				},

				onSetPosition: function (event, slick) {
					this.$emit('setPosition', event, slick);
				},

				onSwipe: function (event, slick, direction) {
					this.$emit('swipe', event, slick, direction);
				},

				onLazyLoaded: function (event, slick, image, imageSource) {
					this.$emit('lazyLoaded', event, slick, image, imageSource);
				},

				onLazyLoadError: function (event, slick, image, imageSource) {
					this.$emit('lazyLoadError', event, slick, image, imageSource);
				},



				setDotClasses: function (event, slick, currentSlide, nextSlide)
				{
					var inst = this;
					this.jqueryEl.find('.slick-dots li').removeClass('slick-dot-on-edge slick-dot-out-of-edge').each(function(index, item) {
						var limit = 5;
						var shift = Math.max(0, limit - nextSlide);

						if((nextSlide > limit && nextSlide - index == limit - shift) || (nextSlide < inst.$slots.default.length - limit) && nextSlide - index == -limit - shift)
							$(item).addClass('slick-dot-on-edge');
						else if(nextSlide - index > limit - shift || nextSlide - index < -limit - shift)
							$(item).addClass('slick-dot-out-of-edge');
					});
				}
			},

			mounted: function() {

				var inst = this;
				this.create();
				this.jqueryEl = $(this.$el);
				Vue.nextTick(function()
				{
					setTimeout(function()
					{
						inst.setDotClasses(null, null, 0, 0);
					}, 200);
				});
			},

			beforeDestroy: function () {
				$(this.$el).slick('unslick');
			}
		});
	});
</script>