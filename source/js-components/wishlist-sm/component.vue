<template>
	<div class="complex-link">
		<a :href="count > 0 ? '/personal/favorite/' : null" class="complex-link__link" 
				:class="{'complex-link__link--static': count == 0}" 
				:title="count > 0 ? null : 'Вы не добавили ни одного товара в Избранное'">
			<div class="complex-link__cell-icon">
				<div class="complex-link__icon-box">
					<svg class="complex-link__svg-icon svg-icon"><use xlink:href="#svg-icon-fav"></use></svg>
					<span class="complex-link__label" v-if="count > 0">{{count}}</span>
				</div>
			</div>
			<div class="complex-link__cell-txt" v-if="withText">
				<sup>Мое</sup>
				<strong>Избранное</strong>
			</div>
		</a>
	</div>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('wishlist-sm', {
		template: template,

		data: function() {	
			return {
				count: 0
			} 
		},

		props: {
			bxajaxid: {
				default: null
			},
			productIds: {
				default: function() {return [];}
			},
			withText: {
				type: Boolean,
				default: false
			} 
		},

		mounted: function() {
			var inst = this;
			this.count = this.productIds.length;

			Model.updateFavorites(this.productIds, this.bxajaxid);
			Model.$on('favoritesUpdated', function() {
				inst.count = Model.favorites.productIds.length;
			});
		}
	});	
});
</script>
