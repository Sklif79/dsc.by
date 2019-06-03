<template>
	<div class="reviews-slide">
		<div class="reviews-slide__review">
			<div class="reviews-slide__header">
				<div class="reviews-slide__title" v-if="title">{{title}}</div>
				<div class="reviews-slide__meta" v-if="meta">{{meta}}</div>
			</div>
			<div class="reviews-slide__body text-guide">
				<slot name="review"></slot>
			</div>
		</div>
		<div class="reviews-slide__answer" v-if="$slots.answer">
			<div class="reviews-slide__header">
				<div class="reviews-slide__title">Ответ</div>
			</div>
			<div class="reviews-slide__body text-guide">
				<slot name="answer"></slot>
			</div>
		</div>
	</div>
</template>


<script>
	define(['Model'], function (Model) {
		Vue.component('reviews-slide', {
			template: template,

			props: {
				title: {
					default: null
				},
				meta: {
					default: null
				},
				text: {
					default: null
				},
				navImage: {
					default: null
				}
			},
		});
	});
</script>