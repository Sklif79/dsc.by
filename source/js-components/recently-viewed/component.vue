<template>
	<transition name="recently-viewed-slide">
		<section class="floor floor--recently-viewed" v-if="items && items.length">
			<div class="container">
				<div class="floor-header floor-header--separator">
					<div class="floor-header__left floor-header__left--empty"></div>
					<div class="floor-header__main"><h2>{{title}}</h2></div>
					<div class="floor-header__right floor-header__right--empty"></div>
				</div>
				<slick ref="slider" class="recently-viewed-slider slick-side-offset slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="sliderOptions">
					<div class="recently-viewed-item slick-side-offset-item" v-for="item in items" :key="item.id">
						<div class="recently-viewed-item__img-box">
							<div v-if="item.image" class="recently-viewed-item__img-cover" :style="{'background-image': 'url(' + item.image + ')'}"></div>
							<div v-else class="recently-viewed-item__img-cover">
								<svg class="recently-viewed-item__no-photo-icon svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
							</div>
							<a :href="item.link" class="recently-viewed-item__link" :title="item.name"></a>
							<span class="recently-viewed-item__remove" title="Удалить" @click="removeItem(item)">
								<svg class="svg-icon svg-icon--remove"><use xlink:href="#svg-icon-close"></use></svg>
							</span>
						</div>
					</div>
				</slick>
			</div>
		</section>
	</transition>
</template>



<script>
	define(['app', 'vue!slick/component'], function (app) {
		Vue.component('recently-viewed', {
			template: template,

			data: function () {
				var inst = this;
				return {
					items: null,
					sliderOptions: _.defaults(inst.options || {}, {
						slidesToShow: 9,
						slidesToScroll: 5,
						infinite: false,
						responsive: [
							{
								breakpoint: 1125,
								settings: {
									slidesToShow: 8,
									slidesToScroll: 5
								}
							},
							{
								breakpoint: 999,
								settings: {
									slidesToShow: 7,
									slidesToScroll: 4
								}
							},
							{
								breakpoint: 850,
								settings: {
									slidesToShow: 6,
									slidesToScroll: 4
								}
							},
							{
								breakpoint: View.breakpoints['xs-max'],
								settings: {
									slidesToShow: 5,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['2xs-max'],
								settings: {
									slidesToShow: 4,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['3xs-max'],
								settings: {
									slidesToShow: 3,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							}
						]
					})
				}
			},

			props: [
				'dataSource',
				'staticDataSource',
				'options',
				'title'
			],

			methods: {
				removeItem: function (item) {
					var inst = this;

					$.ajax({
						url: item.deletelink,
						method: 'DELETE',
						dataType: 'json'
					})
					.done(function (response) {
						console.log('remove item', response)
					})
					.fail(function (response) {
						console.warn('remove item ajax fail', response)
					});

					var index = _.findIndex(this.items, {id: item.id});
					var slider = this.$refs.slider;
					if (slider) {
						slider.remove(index);
						this.items.splice(index, 1);
						if (this.items.length)
							slider.setPosition();
					}
				},
			},

			created: function () {
				var inst = this;
				inst.items = inst.staticDataSource ? inst.staticDataSource.items : null;
			},

			updated: function () {
				try {
					if (this.items.length && this.$refs.slider)
						this.$refs.slider.setPosition();
				} 
				catch (e) {

				}
			}
		});
	});
</script>