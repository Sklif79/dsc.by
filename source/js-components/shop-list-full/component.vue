<template>
	<div>

		<div class="catalog-top-params" v-if="!showOnlyMap">
			<div class="catalog-top-params__filter">
				<button type="button" class="panel-btn js-open-catalog-filter">
					<svg class="panel-btn__icon panel-btn__icon--left svg-icon svg-icon--20">
					<use xlink:href="#svg-icon-filter"></use>
					</svg>
					<span class="panel-btn__inner">Меню</span>
				</button>
			</div>
			<div class="catalog-top-params__main js-dropdown">
				<button type="button" class="catalog-top-params__main-btn panel-btn js-dropdown__btn">
					<svg class="panel-btn__icon panel-btn__icon--left svg-icon svg-icon--20">
					<use xlink:href="#svg-icon-sort"></use>
					</svg>
					<span class="panel-btn__inner">Город</span>
					<svg class="panel-btn__icon panel-btn__icon--right panel-btn__icon--dd-arrow svg-icon svg-icon--dd-arrow">
					<use xlink:href="#svg-icon-dd-arrow"></use>
					</svg>
				</button>
				<div class="catalog-top-params__params js-dropdown__body">
					<div class="catalog-top-params__grid">
						<div class="catalog-top-params__item catalog-top-params__item--shops">
							<select-input :options="shopCitiesAsOptions" v-model="currentCityId" block lite size="sm" placeholder="Выберите город" @input="selectCityChange"></select-input>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="large-map flc">
			<yandex-map :coords="mapCoords" adjust-initial-bounds ref="map"> 
				<yandex-map-marker v-if="shop.phones" marker-type="placemark"
								   :coords="shop.point"
								   :hint-content="shop.name"
								   :balloon="{header: shop.name, body:  shop.address, footer:  shop.work.join('<br>')+'<br>'+shop.phones.join('<br>') }"
					:icon="{color: 'green', glyph: 'cinema'}"  
					:key="shop.id"
					v-for="shop in shops" v-if="shop.city.id == currentCityId"></yandex-map-marker>
				<yandex-map-marker v-else marker-type="placemark"
								   :coords="shop.point"
								   :hint-content="shop.name"
								   :balloon="{header: shop.name, body:  shop.address, footer:  shop.work.join('<br>')+'<br>'+shop.phones.join('<br>') }"
								   :icon="{color: 'green', glyph: 'cinema'}"
								   :key="shop.id"
								   v-for="shop in shops" v-if="shop.city.id == currentCityId"></yandex-map-marker>
			</yandex-map>
		</div>


		<div class="full-shop-list flc" v-if="!showOnlyMap">


			<div class="full-shop-list__item"  v-for="(shop, index) in shops" v-if="shop.city.id == currentCityId">
				<div class="full-shop-li full-shop-li--reflex" @click="setActiveShop(shop, index); scrollToMap();">
					<div class="full-shop-li__cell-img">
						<div class="full-shop-li__img"></div>
						<div class="img-stack img-stack--reflex" v-if="shop.image" @click.stop="openImageGallery(shop)">
							<div class="img-stack__item"  :style="{'background-image': 'url(' + shop.image + ')'}"  ></div>
							<div class="img-stack__item img-stack__item--ph"></div>
							<div class="img-stack__item img-stack__item--ph"></div>
							<svg class="img-stack__icon svg-icon"><use xlink:href="#svg-icon-plus-big"></use></svg>
						</div>
					</div>
					<div class="full-shop-li__cell-main">
						<div class="full-shop-li__top">
							<span class="full-shop-li__top-icon">
								<svg class="svg-icon svg-icon--20"><use xlink:href="#svg-icon-location"></use></svg>
							</span>
							<span class="full-shop-li__top-txt">{{shop.name}}</span>
						</div>
						<div class="full-shop-li__addr">{{shop.address}}</div>
					</div>
					<div class="full-shop-li__cell-time"><span v-for="workTime in shop.work">{{workTime}}<br></span></div>
					<div class="full-shop-li__cell-tel"><span v-for="phone in shop.phones" v-if="typeof phone == 'string'"><a :href="'tel:' + formatPhone(phone)">{{phone}}</a><br></span></div>
				</div>
			</div>


		</div>
	</div>
</template>



<script>
	define(['Model'], function (Model) {
		Vue.component('shop-list-full', {
			template: template,
			data: function () {
				return {
					shops: [],
					currentCityId: null,
					mapCoords: [53.895597404038, 27.547904753793],
					activeShopId: null
				}
			},
			computed: {
				shopCitiesAsOptions: function () {
					var inst = this;
					var result = [];
					_.each(inst.shops, function (shop) {
						if (!_.findWhere(result, {value: shop.city.id})) {
							result.push({
								text: shop.city.name,
								value: shop.city.id,
								selected: shop.city.current
							});
						}
					});
					return result;
				}
			},
			props: {
				showOnlyMap: {
					default: false
				},
				staticDataSource: {
					default: null
				},
			},
			created: function () {
				var inst = this;
				var cityIdInHash = null;
				var cityIdInHashPresent = null;

				if (inst.staticDataSource) {
					inst.shops = inst.staticDataSource.shops;

					if (window.location.hash.indexOf('#city-') == 0) {
						cityIdInHash = window.location.hash.split('#city-')[1];
					}

					_.each(inst.shops, function (shop) {
						if (!inst.currentCityId) {
							inst.currentCityId = shop.city.id;
						}
						if (shop.city.current) {
							inst.currentCityId = shop.city.id
						}
						if (cityIdInHash && cityIdInHash == shop.city.id) {
							cityIdInHashPresent = true;
						}
					});

					if (cityIdInHashPresent) {
						inst.currentCityId = cityIdInHash;
					}
				}
			},
			methods: {
				selectCityChange: function () {
					var inst = this;

					/*var lt = 0, lg = 0, shops = 0;
					 _.each(inst.shops, function (shop) {
					 if (inst.currentCityId == shop.city.id) {
					 lt += parseFloat(shop.point[0]);
					 lg += parseFloat(shop.point[0]);
					 shops++;
					 }
					 });
					 
					 //this.mapCoords = [lt / shops, lg / shops];
					 //console.log(lt, lg, shops)
					 */

					Vue.nextTick(function () {
						if (inst.$refs.map) {
							inst.$refs.map.$emit('adjustBounds');
						}
					});

					window.location.hash = 'city-' + inst.currentCityId;
				},

				setActiveShop: function (shop, index) {
					var inst = this;
					this.mapCoords = shop.point;
					this.activeShopId = shop.id;
					Vue.nextTick(function () {
						if (inst.$refs.map) {
							inst.$refs.map.$emit('adjustBounds');
							inst.$refs.map.$emit('openBalloon', index);
						}
					});
				},

				openImageGallery: function (shop) {
					View.control.openImageGallery({
						showPreviews: true,
						images: _.map(shop.images, function (image) {
							return {src: image}
						})
					})
				},

				scrollToMap: function () {
					var inst = this;
					$('html, body').animate({scrollTop: $(inst.$refs.map.$el).offset().top - 20}, 300);
				},

				formatPhone: function(phone) {
					return phone.replace(/-|\s/g,'');
				}
			}
		});
	});
</script>
