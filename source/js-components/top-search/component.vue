<template>
	<div class="top-search" :class="{'active': active}">
		<slot name="top"></slot>
		<form class="top-search__row" :class="{'active': active}" @submit.prevent="submit">
			  <div class="top-search__cell-input">
				<rich-text-input type="search" :placeholder="placeholder" v-model="query" 
								 @input="input" @focus="active = true" @blur="active = false"></rich-text-input>
			</div>

			<!--<div class="top-search__cell-filter" v-if="filter">
				<rich-text-input type="select" :options="filter" v-model="activeFilter" :lite="true"
								 @input="send" @open="active = true" @close="active = false"></rich-text-input>
			</div>-->

			<!--<div class="top-search__cell-action">
				<button type="submit" class="top-search__btn btn btn&#45;&#45;primary" @focus="active = true" @blur="active = false">
					<svg v-if="buttonIcon" class="btn__icon btn__icon&#45;&#45;left svg-icon">
					<use :xlink:href="'#' + buttonIcon"></use>
					</svg>
					<span v-if="buttonTxt" class="btn__inner">{{buttonTxt}}</span>
				</button>
			</div>-->
		</form>

		<transition name="dropdown">
			<div class="top-search__results top-search-results" v-if="open">
				<transition name="content-fade">
					<div class="top-search-results__not-found" v-if="results.categories.length == 0">Ничего не найдено. Попробуйте по-другому.</div>
					<div class="top-search-results__found" v-if="results.categories.length > 0">
						<div class="top-search-results__categories">
							<div class="top-search-results__categories-link" :class="{'active': activeCategory === category.title}"
								 v-for="category in results.categories" @click="activeCategory = category.title">
								 {{category.title}}
						</div>
					</div>
					<transition name="content-fade" mode="out-in">
						<div class="top-search-results__list" v-for="category in results.categories" v-if="activeCategory === category.title" :key="category.title">
							<a :href="link.link" class="top-search-results__link" v-for="link in category.links">
								<div class="top-search-results__link-icon">
									<svg class="svg-icon">
									<use xlink:href="#svg-icon-arrow-right"></use>
									</svg>
								</div>
								<div class="top-search-results__link-main">
									<span class="top-search-results__link-text" v-html="link.text"></span>
									<sup class="top-search-results__link-sup" v-if="link.count">{{link.count}}</sup>
								</div>
							</a>
							
							<product v-for="product in category.products" :key="product.id" :product="product" list-item></product>
						</div>
					</transition>
					<div class="top-search-results__botom-links">
						<a class="top-search-results__botom-link" :href="getSearchLink()">Показать все результаты</a>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</div>
</template>



<script>
	define(['app'], function (app) {
		Vue.component('top-search', {
			template: template,

			data: function () {
				return {
					filter: [],
					open: false,
					results: null,
					query: "",
					lastRequestQuery: null,
					debounceTimeout: null,
					activeFilter: 0,
					activeCategory: null,
					active: false
				}
			},

			props: {
				placeholder: {
					default: null
				},
				filterInit: {
					default: null
				},
				buttonTxt: {
					default: null
				},
				buttonIcon: {
					default: null
				},
				foldedIcon: {
					default: null
				},
				bxajaxid: {
					default: null
				},
			},

			methods: {
				getSearchLink: function () {

					var link = '/search/?q=' + this.lastRequestQuery;
					if (this.activeFilter) {
						link += "&WHERE=" + this.activeFilter;
					}
					
					return link;

				},
				submit: function () {
					if (this.query && this.query.length && this.query.length > 2)
						window.location = '/search/?q=' + encodeURIComponent(this.query);
				},

				input: function () {
					var inst = this;

					clearTimeout(inst.debounceTimeout);
					inst.debounceTimeout = setTimeout(function () {
						inst.send();
					}, 200);
				},

				send: function () {
					var inst = this;

					if (!this.query || !inst.query.length || inst.query.length <= 2) {
						View.control.closeTopSearch({silent: true});
						return false;
					}

					$.get({
						url: '/',
						dataType: 'json',
						data: {
							q: inst.query,
							bxajaxid: inst.bxajaxid,
							WHERE: window.innerWidth > View.breakpoints['md-min'] ? inst.activeFilter : 0,
						}
					})
							.done(function (response) {
								inst.results = response;
								var sameCategory = _.findWhere(response.categories, {title: inst.activeCategory});
								if (!sameCategory && response.categories.length)
									inst.activeCategory = response.categories[0].title;

								if (inst.results.activeSections.length > 1) {
									inst.filter = [];
									$.each(inst.whereList, function (key, value) {
										if ($.inArray(value.value, inst.results.activeSections) >= 0) {
											inst.filter.push(value);
										}
									});
								} else {
									inst.filter = inst.whereList;
								}




								inst.open = true;
								View.control.openTopSearch();
								inst.lastRequestQuery = inst.query;
							})
							.fail(function (response) {
								console.warn('search fail: ', response);
							});
				}
			},
			watch: {
				query: function () {
					var inst = this;

					if (!inst.query || !inst.query.length) {
						inst.filter = inst.whereList;
					}
				},
			},
			created: function () {
				var inst = this;
				inst.filter = inst.filterInit || [];
				inst.whereList = inst.filterInit || [];
				inst.query = inst.initialQuery || "";
				$(document.body).off('topSearchClosed.vueTopSearchComponent').on('topSearchClosed.vueTopSearchComponent', function (e, options) {
					inst.open = false;
					if (!options || !options.silent)
						inst.query = null;
					clearTimeout(inst.debounceTimeout);
				});

				$(document.body).off('click.closeTopSearchInVueComponent').on('click.closeTopSearchInVueComponent', function (e) {
					if ($(e.target).closest(inst.$el).length == 0)
						View.control.closeTopSearch();
				});
			}
		});
	});
</script>