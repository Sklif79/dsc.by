<template>
	<transition name="content-fade">
		<div class="system-message flc" :class="{'system-message--error': type === 'error', 'system-message--tip': mode === 'tip', 'js-tooltip-position': mode === 'tip'}" v-if="open && !localClosed">
			<div class="system-message__text" v-html='text'></div>
			<div class="system-message__close" v-if="!autoHide">
				<button class="system-message__close-btn" @click="close">
					<svg class="svg-icon svg-icon--remove"><use xlink:href="#svg-icon-close"></use></svg>
				</button>
			</div>
		</div>
	</transition>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('system-message', {
		template: template,

		data: function() {
			return {
				localClosed: false
			}
		},

		props: {
			
			text: {
				default: ''
			},
			type: {
				default: 'default'
			},
			mode: {
				default: 'static'
			},
			open: {
				type: Boolean,
				default: true
			},
			autoHide: {
				type: Boolean,
				default: false
			}
		},

		methods: {
			close: function() {
				this.localClosed = true;
				this.$emit('close');
			},
		},

		mounted: function() {
			View.init.local.tooltipPositionLocal(this.$el);

			var inst = this;

			if(this.autoHide) {
				setTimeout(function() {
					inst.close();
				}, 5000)
			}
		}
	});
});
</script>