<template>
	<div class="shop-list">
		<div class="shop-list__filter flc">
			<div class="shop-list__filter-grid default-grid grid">
				<div class="shop-list__filter-item default-grid__item col col-lg-8 col-3xs-12">
					<rich-text-input type="select" :options="shopCitiesAsOptions" v-model="currentCityId" label="Город" @input="selectCityChange"></rich-text-input>
				</div>
				<div class="shop-list__filter-item default-grid__item col col-lg-4 col-3xs-12">
					<rich-text-input type="select" :options="views" v-model="currentView" label="Показать"></rich-text-input>
				</div>
			</div>
		</div>
		<transition name="content-fade" mode="out-in">
			<div class="shop-list__list flc" v-if="currentView == 'list'">
				<div class="shop-list__li" v-for="shop in shops" v-if="shop.city.id == currentCityId">
					<div class="shop-li">
						<div class="shop-li__top">
							<div class="shop-li__top-start">
								<span class="shop-li__top-start-icon">
									<svg class="svg-icon svg-icon--20">
									<use xlink:href="#svg-icon-location"></use>
									</svg>
								</span>
								<span class="shop-li__top-start-txt"> {{shop.name}} </span>
							</div>
							<div class="shop-li__top-ruler"></div>
							<div class="shop-li__top-end">
								<div :class="{'avail-marker': shop.quantity != 0 ,  'avail-marker--1' : shop.quantity == 1,  'avail-marker--2' : (shop.quantity >= 2 && shop.quantity<5),  'avail-marker--3' : shop.quantity >= 5}">
									<span class="avail-marker__marker">
										<span class="avail-marker__bar"></span>
										<span class="avail-marker__bar"></span>
										<span class="avail-marker__bar"></span>
									</span>
									<span class="avail-marker__text">{{ shop.quantity == 0 ? 'Не в наличии' : 'В наличии' }}</span>
								</div>
							</div>
						</div>

						<div class="shop-li__addr flc">{{shop.address}}</div>
						<div class="shop-li__time flc"><span v-for="workTime in shop.work">{{workTime}}<br></span></div>
						<!--div class="shop-li__time flc"><span v-for="phone in shop.phones">{{phone}}<br></span></div-->
					</div>
				</div>
			</div>
			<div class="shop-list__map" v-if="currentView == 'map'">

				<yandex-map :coords="mapCoords" adjust-initial-bounds ref="map"> 
					<yandex-map-marker marker-type="placemark" 
									   :coords="shop.point"
									   :hint-content="shop.name"
									   :balloon="getShopBalloon(shop)"
									   :icon="{color: 'green', glyph: 'cinema'}"  
									   :key="shop.id"
									   v-for="shop in shops" 
									   v-if="shop.city.id == currentCityId && shop.quantity > 0"></yandex-map-marker>
				</yandex-map> 
			</div>
		</transition>
	</div>
</template>



<script>
	define(['Model', 'vue!rich-text-input/component', 'vue!yandex-map/component', 'vue!yandex-map-marker/component'], function (Model) {
		Vue.component('shop-list', {
			template: template,

			data: function () {
				return {
					shops: [],
					currentCityId: null,
					mapCoords: [53.895597404038, 27.547904753793],
					activeShopId: null,
					currentView: 'list',
					views: [
						{
							text: 'Списком',
							value: 'list'
						},
						{
							text: 'На карте',
							value: 'map'
						}
					]
				}
			},

			computed: {
				shopCitiesAsOptions: function () {
					var inst = this;
					var result = [];
					_.each(inst.shops, function (shop) {
						// показываем все города, даже если товара нет в наличии ни в одном магазине города
						if (/*shop.quantity > 0 && */!_.findWhere(result, {value: shop.city.id})) {
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
				staticDataSource: {
					default: null
				},
			},

			methods: {
				selectCityChange: function () {
					var inst = this;


					Vue.nextTick(function () {
						if (inst.$refs.map) {
							inst.$refs.map.$emit('adjustBounds');
						}
					});
				},

				getAvailMarker: function (shop) {
					return '<div class="avail-marker avail-marker--' + Math.min(shop.quantity, 1) + '">' +
							'<span class="avail-marker__marker">' +
							'<span class="avail-marker__bar"></span>' +
							'<span class="avail-marker__bar"></span>' +
							'<span class="avail-marker__bar"></span>' +
							'</span>' +
							'<span class="avail-marker__text">' + (shop.quantity == 0 ? 'Не в наличии' : 'В наличии') + '</span>' +
							'</div>';
				},

				getShopBalloon: function (shop) {
					var inst = this;
					return {
						header: shop.name,
						body: '<p style="margin: 8px 0">' + shop.address + '</p>' + inst.getAvailMarker(shop),
						footer: shop.work.join('<br>') + '<br>' + shop.phones.join('<br>')
					};
				}
			},

			created: function () {
				var inst = this;
				if (inst.staticDataSource) {
					inst.shops = inst.staticDataSource.shops;

					console.log('shop list full', inst.shops)
					_.each(inst.shops, function (shop) {
						if (!inst.currentCityId) {
							inst.currentCityId = shop.city.id;
						}
						if (shop.city.current) {
							inst.currentCityId = shop.city.id
						}
					});
				}
			}
		});
	});
</script>