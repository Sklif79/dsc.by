<template>
	<transition name="content-fade" mode="out-in">
		<div class="generic-tab" v-if="localActive" :key="tabKey">
			<slot></slot>
		</div>
		<div class="generic-tab-alt" v-else></div>
	</transition>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('generic-tab', {
		template: template,

		data: function() {
			return {
				localActive: false
			};
		},

		props: {
			label: {
				default: 'label'
			},
			active: {
				type: Boolean,
				default: false
			},
			tabKey: {
				default: null
			}
		},

		created: function() {
			var inst = this; 

			inst.localActive = inst.active;

			this.$on('toggle', function(state) {
				inst.localActive = !!state;
			});
		}
	});
});
</script>