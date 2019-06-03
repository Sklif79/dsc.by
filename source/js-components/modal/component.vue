<template>
	<div class="modal js-modal">
		<button tyle="button" class="modal__close" @click="close">
			<svg class="svg-icon"><use xlink:href="#svg-icon-close-big"></use></svg>
		</button>
		<slot name="header">
			<transition name="content-fade" mode="out-in">
				<div class="modal__header" v-if="currentTitle" :key="currentTitle">
					<h2 class="h1 modal__title">{{currentTitle}}</h2>
				</div>
			</transition>
		</slot>
		<slot name="content"></slot>
		<slot name="footer"></slot>
	</div>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('modal', {
		template: template,

		data: function() {
			return {
				currentTitle: null
			};
		},

		props: [
			'title'
		],

		methods: {
			close: function() {
				console.log('modal closed');
				View.control.closeModal();
			}
		},

		created: function() {
			var inst = this;

			this.currentTitle = this.title;

			Model.$on('modalTitleChange', function(title) {
				inst.currentTitle = title;
			})
		}
	});
});
</script>