<template>
	<div class="number-input" :class="{'number-input--lg': size === 'lg', 'number-input--sm': size === 'sm'}">
		<div class="number-input__minus">
			<button type="button" class="number-input__btn number-input__btn--minus" tabindex="-1" @click="minus"></button>
		</div>
		<div class="number-input__input">
			<rich-text-input type="number" :maxlength="4" v-model="localValue" :disabled="disabled" :placeholder="placeholder" :label="label" :size="size"
							 @input="$emit('input', localValue)"></rich-text-input>
		</div>
		<div class="number-input__plus">
			<button type="button" class="number-input__btn number-input__btn--plus" tabindex="-1" @click="plus"></button>
		</div>
	</div>
</template>



<script>
	define(['app', 'vue!rich-text-input/component'], function (app) {
		Vue.component('number-input', {
			template: template,

			data: function () {
				return {
					localValue: null,
					instance: null
				}
			},

			props: {
				min: {
					type: Number,
					default: 0
				},
				max: {
					type: Number,
					default: Infinity
				},
				step: {
					type: Number,
					default: 1
				},
				label: {
					type: String,
					default: null
				},
				placeholder: {
					type: String,
					default: null
				},
				value: {
					default: null
				},
				disabled: {
					type: Boolean,
					default: false
				},
				size: {
					default: false
				}
			},

			methods: {
				minus: function () {
					if(this.disabled)
						return;

					if (this.localValue > this.min) {
						this.localValue -= this.step;
					}

					this.$emit('input', this.localValue);
				},

				plus: function () {
					if(this.disabled)
						return;

					if (this.localValue < this.max)
						this.localValue += this.step;

					this.$emit('input', this.localValue);
				}
			},

			created: function () {
				if (this.value) {
					this.localValue = this.value;
				} else {
					this.localValue = this.step;
				}

			},

			watch: {
				value: function () {
					this.localValue = Math.ceil(this.value / this.step) * this.step;
				}
			}
		});
	});
</script>