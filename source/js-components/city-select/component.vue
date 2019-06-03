<template>
	<div class="city-select">
		<div class="city-select__txt">Ваш регион доставки <b>{{city.name}}</b>?</div>
		<div class="city-select__btn-row">
			<button type="button" class="btn btn--primary" @click="confirmCity">
				<span class="btn__inner">Да, всё верно</span>
			</button>
			<button type="button" class="btn" @click="rejectCity">
				<span class="btn__inner">Нет, выбрать другой</span>
			</button>
		</div>
	</div>
</template>



<script>
	define(['Model'], function (Model) {
		Vue.component('city-select', {
			template: template,

			data: function () {
				return {
					city: Model.geolocation.city
				}
			},

			props: {
				bxajaxid: {
					default: null
				},
				searchCity: {
					default: null
				},
				initialCityName: {
					default: 'Неизвестно'
				},
				initialCityId: {
					default: null
				}
			},

			methods: {
				confirmCity: function () {
					console.log('city confirmed 2');
					View.control.closeDropdown($(this.$el).closest('.js-dropdown'));
				},

				rejectCity: function () {
					var inst = this;
					var loc = "/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y";

					View.control.openModalByUrl(loc);
				}
			},

			mounted: function () {
				var inst = this;

				Model.geolocation.city.name = this.initialCityName;
				Model.geolocation.city.id = this.initialCityId;
				Model.geolocation.bxajaxid = this.bxajaxid;

				console.log(this.initialCityName, this.initialCityId)

				if (inst.searchCity) {
					jQuery.ajax({
						url: 'https://api-maps.yandex.ru/2.0/?load=package.standard&lang=ru-RU',
						type: 'get',
						cache: true,
						dataType: 'script'
					})
							.done(function () {
								ymaps.ready(function () {
									if (ymaps.geolocation.city) {
										$.ajax({
											url: window.location,
											type: 'post',
											dataType: 'json',
											data: {
												bxajaxid: inst.bxajaxid,
												init_search: ymaps.geolocation.city
											}
										})
												.done(function (response) {
													console.log(response);
													Model.geolocation.city.name = response.name;
													Model.geolocation.city.id = response.id;
												})
												.fail(function () {
													console.warn('city-select: ajax fail 2')
												});
									}
								});
							})
							.fail(function () {
								console.warn('city-select: ajax fail')
							});
				}
			}
		});
	});
</script>