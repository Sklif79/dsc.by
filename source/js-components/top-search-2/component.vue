<template>
	<div class="top-search-lite">
		<form class="top-search-lite-box js-top-search-box" @submit.prevent="submit">
			<input type="search" class="top-search-lite-box__input text-input js-top-search-input" :placeholder="placeholder" v-model="query" @input="input">
			<input type="hidden" name="bxajaxid"   v-model="bxajaxid"  :value="bxajaxid"  @input="input">
			<button type="submit" class="top-search-lite-box__btn">
				<svg v-if="buttonIcon" class="svg-icon">
				<use :xlink:href="'#' + buttonIcon"></use>
				</svg>
			</button>
			<button type="button" class="top-search-lite-box__close js-close-top-search">
				<svg v-if="buttonIcon" class="svg-icon">
				<use :xlink:href="'#' + closeIcon"></use>
				</svg>
			</button>
		</form>

		<transition name="dropdown">
			<div class="top-search-lite__results top-search-results" v-if="open">
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

							<product v-for="product in category.products" :key="product.id"
									 :product="product" 
									 list-item></product>


							<div class="top-search-results__botom-links" v-if="category.products">
								<a class="top-search-results__botom-link" :href="'/search/?q=' + lastRequestQuery">Показать все результаты</a>
							</div>

						</div>
					</transition>

				</div>
			</transition>
		</div>
	</transition>
</div>
</template>



<script>
	define(['app', 'vue!product/component'], function (app) {
		Vue.component('top-search-2', {
			template: template,

			data: function () {
				return {
					open: false,
					results: null,
					query: null,
					lastRequestQuery: null,
					debounceTimeout: null,
					activeCategory: null
				}
			},

			props: {
				placeholder: {
					default: null
				},
				filter: {
					default: null
				},
				buttonIcon: {
					default: null
				},
				closeIcon: {
					default: null
				},
				foldedIcon: {
					default: null
				},
				bxajaxid: {
					default: null
				},
				initialQuery: {
					default: null
				}
			},

			methods: {
				submit: function () {
					if (this.query.length && this.query.length > 2)
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

					if (!inst.query.length || inst.query.length <= 2) {
						inst.open = false;
						return false;
					}

					$.get({
						url: '/',
						dataType: 'json',
						data: {
							q: inst.query,
							bxajaxid: inst.bxajaxid
						}
					})
							.done(function (response) {
								inst.results = response;
								var sameCategory = _.findWhere(response.categories, {title: inst.activeCategory});
								if (!sameCategory && response.categories.length)
									inst.activeCategory = response.categories[0].title;
								inst.open = true;
								inst.lastRequestQuery = inst.query;
							})
							.fail(function (response) {
								console.warn('search fail: ', response);
							});
				}
			},

			created: function () {
				var inst = this;
				inst.query = inst.initialQuery;
				$(document.body).off('topSearchClosed').on('topSearchClosed', function () {
					inst.open = false;
					inst.query = null;
					clearTimeout(inst.debounceTimeout);
				});
			}
		});
	});
</script>