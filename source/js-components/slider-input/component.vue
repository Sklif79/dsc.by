<template>
	<div class="slider-input" :class="{active: active}">
		<div class="slider-input__slider" ref="slider">
			<div class="slider-input__ruler">
				<div class="slider-input__selection" v-if="!range" :style="{left: 0, width: buttonPosition + '%'}"></div>
				<div class="slider-input__selection" v-if="range" :style="{left: buttonMinPosition + '%', width: buttonMaxPosition - buttonMinPosition + '%'}"></div>
			</div>
			<div class="slider-input__button" v-if="!range" ref="button" :style="{left: buttonPosition + '%'}" :class="{active: active && !activeButton}"
				@mousedown="mouseStart($event)" @touchstart="touchStart($event)"></div>
			<div class="slider-input__button" v-if="range" ref="buttonMin" :style="{left: buttonMinPosition + '%'}" :class="{active: active && activeButton == 'min'}"
				@mousedown="mouseStart($event, 'min')" @touchstart="touchStart($event, 'min')"></div>
			<div class="slider-input__button" v-if="range" ref="buttonMax" :style="{left: buttonMaxPosition + '%'}" :class="{active: active && activeButton == 'max'}"
				@mousedown="mouseStart($event, 'max')" @touchstart="touchStart($event, 'max')"></div>
		</div>
		<div class="slider-input__labels">
			<div class="slider-input__label" v-if="!range">
				<small v-if="prefix"> {{prefix}} </small> 
				<span v-if="!price && !integer"> {{localValue | formatFloat}} </span>
				<span v-if="price"> {{localValue | formatPrice}} </span>
				<span v-if="!price && integer"> {{localValue | formatInteger}} </span>
				<small v-if="postfix"> {{postfix}} </small>
			</div>
			<div class="slider-input__label" v-if="range">
				<small v-if="prefixMin"> {{prefixMin}} </small> 
				<span v-if="!price && !integer"> {{localValueMin | formatFloat}} </span>
				<span v-if="price && !integer"> {{localValueMin | formatPrice}} </span>
				<span v-if="!price && integer"> {{localValueMin | formatInteger}} </span>
				<small v-if="postfixMin"> {{postfixMin}} </small>
			</div>
			<div class="slider-input__label" v-if="range">
				<small v-if="prefixMin"> {{prefixMax}} </small> 
				<span v-if="!price && !integer"> {{localValueMax | formatFloat}} </span>
				<span v-if="price && !integer"> {{localValueMax | formatPrice}} </span>
				<span v-if="!price && integer"> {{localValueMax | formatInteger}} </span>
				<small v-if="postfixMin"> {{postfixMax}} </small>
			</div>
		</div>
	</div>
</template>



<script>
define(['Model'], function(Model){
	Vue.component('slider-input', {
		template: template,

		data: function() {
			return {
				localValue: null,
				buttonPosition: 0,
				buttonMinPosition: 0,
				buttonMaxPosition: 0,
				active: false,
				activeButton: null,
				bodyRef: null,
				localValue: 0,
				localValueMin: 0,
				localValueMax: 0
			}
		},

		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			price: {
				type: Boolean,
				default: false
			},
			integer: {
				type: Boolean,
				default: false
			},
			min: {
				default: null
			},
			max: {
				default: null
			},
			value: {
				default: null
			},
			valueMin: {
				default: null
			},
			valueMax: {
				default: null
			},
			prefix: {
				default: null
			},
			prefixMin: {
				default: null
			},
			prefixMax: {
				default: null
			},
			postfix: {
				default: null
			},
			postfixMin: {
				default: null
			},
			postfixMax: {
				default: null
			}
		},

		computed: {
			range: function() {
				return this.valueMin !== null && typeof this.valueMax !== null;	
			},
			
			maxRange: function() {
				return parseFloat(this.max) - parseFloat(this.min);
			}
		},

		methods: {
			applyValues: function() {
				if(this.range) {
					this.buttonMinPosition = Math.min(100, Math.max(0, 100 * (this.localValueMin - this.min) / this.maxRange));
					this.buttonMaxPosition = Math.min(100, Math.max(0, 100 * (this.localValueMax - this.min) / this.maxRange));
				}
				else {
					this.buttonPosition = Math.min(100, Math.max(0, 100 * (this.localValue - this.min) / this.maxRange));
				}
			},

			mouseStart: function (e, button) {
				if(!View.mobileAndTabletCheck) {
					this.moveStart(e, button);
					this.bindMouseEvents();
				}
			},

			touchStart: function (e, button) {
				if(View.mobileAndTabletCheck) {
					this.moveStart(e, button);
					this.bindTouchEvents();
				}
			},

			moveStart: function(e, button) {
				this.active = true;
				this.activeButton = button || null;
			},

			move: function(x, y) {
				var sliderOffset = this.$refs.slider.getBoundingClientRect().left;
				var delta = (x - sliderOffset) / this.$refs.slider.offsetWidth;

				if(delta < 0)
					delta = 0;
				if(delta > 1)
					delta = 1;

				var newValue = this.min + this.maxRange * delta;

				if(!this.activeButton) {
					this.localValue = newValue;
					this.$emit('update:value', this.localValue)
				}
				else if(this.activeButton == 'min') {
					this.localValueMin = Math.min(newValue, this.localValueMax);
					this.$emit('update:valueMin', this.localValueMin)
				}
				else if(this.activeButton == 'max') {
					this.localValueMax = Math.max(newValue, this.localValueMin);
					this.$emit('update:valueMax', this.localValueMax)
				}

				this.applyValues();

				this.$emit('input', {value: this.localValue, valueMin: this.localValueMin, valueMax: this.localValueMax})
			},

			moveEnd: function() {
				this.active = false;
				this.unbindEvents();
			},

			bindMouseEvents: function() {
				var inst = this;

				this.bodyRef.off('mousemove.sliderInputMousemove').on('mousemove.sliderInputMousemove', function(e) {
					if(inst.active)
						e.preventDefault();
					
					if(requestAnimationFrame) {
						requestAnimationFrame(function() {
							inst.move(e.pageX, e.pageY);
						});
					}
					else {
						inst.move(e.pageX, e.pageY);
					}
				});

				this.bodyRef.off('mouseup.sliderInputMouseup').on('mouseup.sliderInputMouseup', this.moveEnd);
			},

			bindTouchEvents: function() {
				var inst = this;

				this.bodyRef.off('touchmove.sliderInputTouchmove').on('touchmove.sliderInputTouchmove', function(e) {
					inst.move(e.touches[0].pageX, e.touches[0].pageY);
				});

				this.bodyRef.off('touchend.sliderInputTouchend').on('touchend.sliderInputTouchend', this.moveEnd);
			},

			unbindEvents: function() {
				this.bodyRef.off('mousemove.sliderInputMousemove mouseup.sliderInputMouseup touchmove.sliderInputTouchmove touchend.sliderInputTouchend');
			}
		},

		watch: {
			value: function() {
				this.localValue = parseFloat(this.value) || null;
				this.applyValues();
			},
			valueMax: function() {
				this.localValueMax = parseFloat(this.valueMax) || null;
				this.applyValues();
			},
			valueMin: function() {
				this.localValueMin = parseFloat(this.valueMin) || null;
				this.applyValues();
				this.$forceUpdate();
			}
		},

		created: function() {
			this.localValue = parseFloat(this.value) || null;
			this.localValueMin = parseFloat(this.valueMin) || null;
			this.localValueMax = parseFloat(this.valueMax) || null;

			this.applyValues();

			this.bodyRef = $(document.body);
		},

		filters: {
			formatPrice: Model.formatPrice,
			formatInteger: Model.formatInteger,
			formatFloat: Model.formatFloat
		}
	});
});
</script>