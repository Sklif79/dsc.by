<template>
    <div class="catalog-price">
        <product-table :columns="columns" v-if="columns">
            <product-table-row v-for="offer in offers" :key="offer.offerId" slot="row"
							   :columns="columns" 
							   :productId="offer.productId" 
							   :offerId="offer.offerId" 
							   :product="offer">
			</product-table-row>
        </product-table>
    </div>
</template>



<script>
	define(['Model', 'vue!product-table/component', 'vue!product-table-row/component'], function (Model) {
		Vue.component('catalog-price', {
			template: template,
			data: function () {
				return {
					currentOfferId: 0,
				}
			},
			props: {
				columns: {
					default: null
				},
				offers: {
					default: null
				},
				loading: {
					default: null
				}
			}
		});
	});
</script>