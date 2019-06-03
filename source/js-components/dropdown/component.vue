<template>
	<div class="dropdown dropdown--manual js-dropdown__body js-tooltip-position" 
			:class="{'dropdown--xl': size === 'xl', 
					'dropdown--lg': size === 'lg', 
					'dropdown--md': size === 'md', 
					'dropdown--sm': size === 'sm', 
					'dropdown--xs': size === 'xs'}">
		<!--<slot name="folded-menu-header"></slot>-->

		<transition name="content-fade" mode="out-in">
			<slot name="content"></slot>
		</transition>
	</div>
</template>



<script>
define(['app'], function(app){
	Vue.component('dropdown', {

		props: [
			'size'
		],

		template: template,
	});
});
</script>