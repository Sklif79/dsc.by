<template>
	<div class="ymap-container">
		<div :id="ymapId" :style="{ width: '100%', height: '100%' }"></div>
		<slot></slot>
	</div>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('yandex-map-marker', {
		props: {
			coords: {
				type: Array,
				required: true
			},
			hintContent: {
				type: String
			},
			icon: {
				type: Object
			},
			balloon: {
				type: Object
			},
			markerType: {
				type: String,
				required: true
			},
			markerFill: {
				type: Object
			},
			markerStroke: {
				type: Object
			},
			circleRadius: {
				validator: function(val) {
					return !isNaN(val)
				},
				default: 1000
			}
		},
		render: function() {}
	});
});
</script>