<template>
	<div class="rating-block">
		<div class="rating-block__stars">
			<div class="rating-stars" :class="{'rating-stars--input': inputMode}">
				 <div class="rating-stars__empty" v-if="canEdit">
					<svg class="rating-stars__star svg-icon" @click="localValue = 20; $emit('input', localValue);"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon" @click="localValue = 40; $emit('input', localValue);"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon" @click="localValue = 60; $emit('input', localValue);"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon" @click="localValue = 80; $emit('input', localValue);"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon" @click="localValue = 100; $emit('input', localValue);"><use xlink:href="#svg-icon-star"></use></svg>
				</div>
				<div class="rating-stars__empty" v-else>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
				</div>

				<div class="rating-stars__full" :style="{width: localValue + '%'}">
					 <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
					<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg>
				</div>
			</div>
		</div>
		<div class="rating-block__count" v-if="typeof count == 'number'">
			{{count}}
			<span v-if="showText"> {{countText}} </span>
		</div> 
	</div>
</template>



<script>
	define(['Model'], function (Model) {
		Vue.component('rating-block', {
			template: template,

			data: function () {
				return {
					canEdit: false,
					localValue: 0
				}
			},

			props: {
				error:{
					default: null
				},
				value: {
					default: 0
				},

				count: {
					default: null
				},
				readOnly: {
					type: Boolean,
					default: true
				},
				showText: {
					type: Boolean,
					default: false
				},

				inputMode: {
					type: Boolean,
					default: false
				}
			},
			created: function () {
				var inst = this;

				if (inst.value) {
					inst.localValue = inst.value;
				}

				if (!inst.readOnly) {
					inst.canEdit = true;
				}

			},
			computed: {
				countText: function () {
					if (this.count % 10 == 1 && this.count !== 11)
						return 'отзыв';
					else if (this.count % 10 > 1 && this.count % 10 < 5)
						return 'отзыва';
					else
						return 'отзывов';
				}
			},

			watch: {
				value: function () {
					this.localValue = this.value;
				}
			}
		});
	});
</script>