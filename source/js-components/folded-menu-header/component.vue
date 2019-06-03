<template>
	<div class="folded-menu-header">
		<div class="folded-menu-header__btn">
			<span class="menu-btn" 
				:class="{'js-close-main-menu': closeMainMenu, 
						'js-close-main-menu-nav': closeMainMenuNav, 
						'js-main-menu-links__group-sub-close': closeMainMenuGroup, 
						'js-dropdown__close': closeMainMenuDd || closeDropdown, 
						'js-close-all': closeAll,
						'js-close-folded-top-search': closeFoldedTopSearch,
						'menu-btn--close': close, 
						'menu-btn--back': back}">
				<span class="menu-btn__part menu-btn__part--1"></span>
				<span class="menu-btn__part menu-btn__part--2"></span>
				<span class="menu-btn__part menu-btn__part--3"></span>
			</span>
		</div>
		<div class="folded-menu-header__txt">{{name}}</div>
	</div>
</template>



<script>
define(['app'], function(app){
	Vue.component('folded-menu-header', {
		template: template,

		props: {
			name: {
				default: null
			},
			back: {
				type: Boolean,
				default: false
			},
			close: {
				type: Boolean,
				default: false
			},
			closeMainMenu: {
				type: Boolean,
				default: false
			},
			closeMainMenuNav: {
				type: Boolean,
				default: false
			},
			closeMainMenuDd: {
				type: Boolean,
				default: false
			},
			closeMainMenuGroup: {
				type: Boolean,
				default: false
			},
			closeDropdown: {
				type: Boolean,
				default: false
			},
			closeFoldedTopSearch: {
				type: Boolean,
				default: false
			},
			closeAll: {
				type: Boolean,
				default: false
			}
		},
	});
});
</script>