<template>
	<div class="page-header-top__cell" :class="{'page-header-top__cell--menu': topMenuTrigger, 'page-header-top__cell--search': topSearchTrigger}">
		<div class="page-header-top-item" :class="{'js-dropdown dropdown-owner dropdown-arrow-owner': $slots.dropdown}">
			<a :href="link" class="page-header-top-item__btn" 
				:class="{'page-header-top-item__btn--static': !$slots.dropdown && !link, 
					'js-dropdown__btn': $slots.dropdown, 
					'page-header-top-item__btn--menu js-open-main-menu-nav': topMenuTrigger,
					'page-header-top-item__btn--search js-open-folded-top-search': topSearchTrigger}">
			
				<div class="page-header-top-item__icon" v-if="icon">
					<svg class="page-header-top-item__svg-icon svg-icon svg-icon--35">
						<use :xlink:href="'#' + icon"></use>
					</svg>
				</div>
			
				<div class="page-header-top-item__name" v-if="name || $slots.name">
					{{name}}
					<slot name="name"></slot>
					<span class="page-header-top-item__value" v-if="value">&nbsp;{{value}}</span>
				</div>
			
				<div class="page-header-top-item__arrow" v-if="$slots.dropdown">
					<svg class="page-header-top-item__svg-icon svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
				</div>
			</a>

			<slot name="dropdown"></slot>
		</div>
	</div>
</template>


<script>
define(['app'], function(app){
	Vue.component('page-header-top-item', {
		template: template,

		props: {
			icon: {
				default: null
			},
			name: {
				default: null
			},
			value: {
				default: null
			},
			link: {
				default: null
			},
			topMenuTrigger: {
				type: Boolean,
				default: false
			},
			topSearchTrigger: {
				type: Boolean,
				default: false
			}
		},
	});
});
</script>