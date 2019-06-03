<template>
	<transition name="content-fade" mode="out-in">
		<nav class="page-nav" v-if="!loading && count >= limit">
			<!-- count = {{count}} offset = {{offset}} limit = {{limit}} count >= offset + limit = {{count >= offset + limit}} offset + limit = {{offset + limit}}
			<div class="page-nav__more" v-if="showMore && count > offset + limit">
				<button type="button" class="btn" @click="$emit('more')">
					<span class="btn__inner">Показать еще</span>
				</button>
			</div>
			 -->
			<div class="page-nav__pages" v-if="showPages">
				<div class="page-nav__item page-nav__item--btn" v-if="linkPrev">
					<a class="page-nav-btn" :href="linkPrev.link" @click.prevent="$emit('goto', linkPrev.number)">
						<svg class="svg-icon svg-icon--20"><use xlink:href="#svg-icon-arrow-left"></use></svg>
					</a>
				</div>
				<div class="pages-nav_items">
					<div class="page-nav__item page-nav__item--page" v-for="page in pagesToRender">
						<div class="page-nav-btn page-nav-btn--current" v-if="page.number == currentPage">
							<span class="page-nav-btn__txt">{{page.number}}</span>
						</div>
						<a class="page-nav-btn" :href="page.link" v-else @click.prevent="$emit('goto', page.number)">
							<span class="page-nav-btn__txt">{{page.number}}</span>
						</a>
					</div>
				</div>


				<div class="page-nav__item  page-nav__item--btn" v-if="linkNext">
					<a class="page-nav-btn" :href="linkNext.link" @click.prevent="$emit('goto', linkNext.number)">
						<span class="page-nav-btn__txt">
							<svg class="svg-icon svg-icon--20"><use xlink:href="#svg-icon-arrow-right"></use></svg>
						</span>
					</a>
				</div>
			</div>
		</nav>
		<nav class="page-nav" v-if="loading">
			<svg class="spinner spinner--default active" viewBox="0 0 80 80">
				<circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle>
			</svg>
		</nav>
	</transition>
</template>


<script>
define(['Model'], function(Model){
	Vue.component('page-nav', {
		template: template,

		data: function() {
			return {
				hash: window.location.hash,
				currentPage: 1,
				pagesToRenderDeltaLimit: 2
			}
		},

		computed: {
			pagesToRender: function() {
				var inst = this;
				var result = [];
				var separator = inst.baseUrl.indexOf('?') >= 0 ? '&' : '?';

				inst.currentPage = Math.ceil(inst.offset / inst.limit) + 1;

				for(var i = Math.max(1, inst.currentPage - inst.pagesToRenderDeltaLimit); i <= Math.ceil(inst.count / inst.limit) && result.length < inst.pagesToRenderDeltaLimit * 2 + 1; i++) {
					result.push({
						number: i,
						link: inst.baseUrl + separator + 'limit='+inst.limit + '&offset='+ ((i-1) * inst.limit)
					});
				}

				return result;
			},

			linkPrev: function() {
				var inst = this;
				var separator = inst.baseUrl.indexOf('?') >= 0 ? '&' : '?';

				// link to previous page
				if(inst.currentPage > 1)
					return {
						number: inst.currentPage - 1,
						link: inst.baseUrl + separator + 'limit='+inst.limit + '&offset='+ ((inst.currentPage - 1) * inst.limit)
					}
				else
					return null;
			},

			linkNext: function() {
				var inst = this;
				var separator = inst.baseUrl.indexOf('?') >= 0 ? '&' : '?';
				var lastLinkNumber = inst.pagesToRender[inst.pagesToRender.length - 1].number;

				// link to next page
				console.log('last'+lastLinkNumber);
				console.log('probe4'+inst.currentPage);
				if(lastLinkNumber > inst.currentPage)
					return {
						number: inst.currentPage + 1,
						link: inst.baseUrl + separator + 'limit='+inst.limit + '&offset='+ ((inst.currentPage) * inst.limit)
					}
				else
					return null;
			}
		},

		props: {
			showMore: {
				type: Boolean,
				default: false
			},
			showPages: {
				type: Boolean,
				default: false
			},
			count: {
				default: null
			},
			limit: {
				default: null
			},
			offset: {
				default: null
			},
			baseUrl: {
				default: null
			},
			loading: {
				default: false
			}
		},

		created: function() {
			var inst = this;
			var win = $(window);

			win.off('hashchange.updatePageNavHash').on('hashchange.updatePageNavHash', function() {
				inst.hash = window.location.hash;
			});

			win.off('resize.vuePageNavLimitUpdate').on('resize.vuePageNavLimitUpdate', recalcPagesToRenderDeltaLimit);

			function recalcPagesToRenderDeltaLimit() {
				inst.pagesToRenderDeltaLimit = window.innerWidth > 400 ? 2 : 1;
			}
		}
	});
});
</script>