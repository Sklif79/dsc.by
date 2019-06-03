<template>
	<div class="product-table">
		<div class="product-table__head">
			<div class="product-table__th" v-for="column in columns" :class="['product-table__th--' + column.visualType]">{{column.title}}</div>
		</div>
		<div class="product-table__body">
			<slot name="row"></slot>
		</div>
	</div>
</template>


<script>
define(['Model'], function(Model){
	Vue.component('product-table', {
		template: template,

		data: function() {
			return {
				colors: null
			}
		},

		props: {
			columns: {
				required: true
			}
		},

		methods: {

		},

		filters: {
			formatPrice: Model.formatPrice
		}
	});
});
</script>
