<template>
	<div class="form-city-select">
		<transition name="content-fade">
			<div class="rich-form-message rich-form-message--error" v-if="query && query.length && !canConfirm">Пожалуйста, выберите город из списка.</div>
		</transition>

		<rich-text-input-checkout v-model="query" type="search" placeholder="Начните вводить город" :suggestions="suggestions" :label="'Населенный пункт'" :topLocations="topLocations"
						 @input="queryInput" @focus="queryFocus"></rich-text-input-checkout>


	</div>
</template>



<script>
	define(['Model', 'vue!rich-text-input-checkout/component'], function (Model) {
		Vue.component('form-city-select', {
			template: template,

			data: function () {
				return {
					cityID: 0,
					query: null,
					suggestions: [],
					suggestionsBase: [],
					inputTimeout: null
				}
			},

			computed: {
				canConfirm: function () {
					return this.cityID;
				}
			},

			props: {
				topLocations: {
                    default: null
                }

			},

			methods: {
				confirmCity: function () {

					if (this.cityID) {
						Model.setGeolocation(this.cityID, function () {
							View.control.closeModal();
						});
					}
				},
				setCity: function (cityID) {


					Model.setGeolocation(cityID, function () {
						View.control.closeModal();
					});

				},
				rejectCity: function () {
					View.control.closeModal();
				},

				queryFocus: function () {
					this.query = '';
				},

				queryInput: function (value, params) {
					var inst = this;

					if (!params || !params.suggest) {

						this.cityID = 0;
						clearTimeout(this.inputTimeout);
						this.inputTimeout = setTimeout(function () {
							$.post({
								url: '/local/components/sh/citySelect/search.php',
								dataType: 'json',
								data: {
									query: inst.query
								}
							})
									.done(function (response) {
										inst.suggestionsBase = response.suggestions;
										inst.suggestions = response.suggestions;//_.pluck(response.suggestions, 'value');
										console.log(response);
									})
									.fail(function (response) {
										inst.suggestions = [];
										inst.suggestionsBase = [];
										console.warn('form-city-select ajax failed:', response);
									});
						}, 500);
					} else if (params.data) {

						this.cityID = params.data;
					} else {
						this.cityID = 0;
					}
				}
			}
		});
	});
</script>