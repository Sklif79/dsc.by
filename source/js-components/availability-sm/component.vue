<template>
	<div class="availability-sm" :class="className">
		<div class="availability-sm__icon" v-if="!noIcon">
			<svg class="svg-icon" v-if="delivery"><use xlink:href="#svg-icon-delivery"></use></svg>
			<svg class="svg-icon" v-else-if="time"><use xlink:href="#svg-icon-time"></use></svg>
			<svg class="svg-icon" v-else-if="check"><use xlink:href="#svg-icon-check"></use></svg>
		</div>
		<div class="availability-sm__text" v-if="text">
			{{text}}
			<span v-if="deliveryDays">{{deliveryDays}} дней</span>
		</div>
	</div>
</template>


<script>
	define(['Model'], function (Model) {
		Vue.component('availability-sm', {
			template: template,

			props: {
				value: {
					default: 0
				},
				text: {
					default: null
				},
				delivery: {
					type: Boolean,
					default: false
				},
                deliveryDays: {
				    default: false
				},
				time: {
					type: Boolean,
					default: false
				},
                check: {
                    type: Boolean,
                    default: false
                },
				info: {
					type: Boolean,
					default: false
				},
				noIcon: {
					type: Boolean,
					default: false
				},
				size: {
					default: null
				}
			},

			computed: {
				className: function() {
					var result = ['availability-sm--' + this.value];
					
					if(this.delivery)
						result.push('availability-sm--delivery');

					if(this.time)
						result.push('availability-sm--time');

					if(this.time)
						result.push('availability-sm--info');

					if(this.size == 'lg')
						result.push('availability-sm--lg');

					return result;
				}
			}
		});
	});
</script>