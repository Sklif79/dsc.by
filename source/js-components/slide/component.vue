<template>
	<div class="slide slick-slide" :class="{'slide--dark': dark, 'slide--left': left, 'slide--right': right, 'slide--wide': wide}">
		 <div class="slide__bg">
			<div class="slide__bg-cover" :style="'background-image: url(' + image + ')'"></div>
		</div>
		<div class="slide__main" v-if="$slots['title'] || $slots['text'] || $slots['action'] || $slots['btn']">
			<a :href="link" class="slide__link" v-if="link"></a>
			<div class="slide__container" :class="{'container': !!wide}">
				 <div class="slide__content">
					<slot name="title"></slot>
					<slot name="text"></slot>
					<slot name="action"></slot>
					<div class="slide__action flc" v-if="$slots.btn">
						<div class="slide__btn-row">
							<slot name="btn"></slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	define(['app'], function (app) {
		Vue.component('slide', {
			props: {
				image: {
					default: null
				},
				link: {
					default: null
				},
				title: {
					default: null
				},
				text: {
					default: null
				},
				right: {
					type: Boolean,
					default: false
				},
				left: {
					type: Boolean,
					default: false
				},
				wide: {
					type: Boolean,
					default: false
				},
				dark: {
					type: Boolean,
					default: false
				},
			},

			template: template,
		});
	});
</script>