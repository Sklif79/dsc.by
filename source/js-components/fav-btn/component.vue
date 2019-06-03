<template>
	<div class="fav-btn" @click="toggleFav" :class="{active: active, loading: loading}">
		<div class="fav-btn__icon">
			<div class="fav-btn__icon-group">
				<svg class="fav-btn__icon-in-fav svg-icon"><use xlink:href="#svg-icon-fav"></use></svg>
				<svg class="fav-btn__icon-not-in-fav svg-icon"><use xlink:href="#svg-icon-fav-empty"></use></svg>
				<div class="fav-btn__icon-spinner">
					<svg class="spinner spinner--fav" viewBox="0 0 80 80" :class="{active: loading}">
						<circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle>
					</svg>
				</div>
			</div>
		</div>
		<div class="fav-btn__text" v-if="withText">
			<span class="fav-btn__text-main">Добавить в избранное</span>
			<span class="fav-btn__text-count" v-if="count">({{count}} добавили)</span>
		</div>
	</div>
</template>



<script>
define(['Model'], function(Model){
	Vue.component('fav-btn', {
		template: template,

		data: function() {
			return {
				active: false,
				loading: false
			}
		},

		props: {
			withText: {
				type: Boolean,
				default: false
			},
			count: {
				default: null
			},
			productId: {
				default: null
			},
			offerId: {
				default: null
			}
		},


		methods: {
			toggleFav: function() {
				var inst = this;
				this.loading = true;

				if(this.active)
					Model.removeFromFavorites(this.productId, this.offerId);
				else
					Model.addToFavorites(this.productId, this.offerId);
			},

			isInFavorites: function() {
				return (this.productId || this.offerId) ? Model.isInFavorites(this.productId, this.offerId) : false;
			}
		},

		created: function() {
			var inst = this;

			inst.active = inst.isInFavorites(inst.productId, inst.offerId);

			Model.$on('favoritesUpdated', function() {
				inst.loading = false;
				inst.active = inst.isInFavorites(inst.productId, inst.offerId);
			});
		}
	});
});
</script>