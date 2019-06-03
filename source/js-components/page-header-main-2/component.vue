<template>
	<div class="page-header-main page-header-main--2">
		<div class="container">
			<div class="page-header-main__row">
				<div class="page-header-main__cell page-header-main__cell--c-left">
					<div class="page-header-main__cell page-header-main__cell--menu-btn">
						<button type="button" class="menu-btn js-open-main-menu">
							<span class="menu-btn__part menu-btn__part--1"></span>
							<span class="menu-btn__part menu-btn__part--2"></span>
							<span class="menu-btn__part menu-btn__part--3"></span>
						</button>
					</div>
					<div class="page-header-main__cell page-header-main__cell--search" v-if="$slots['search']">
						<slot name="search"></slot>
					</div>
				</div>
				<div class="page-header-main__cell page-header-main__cell--c-middle">
					<slot name="logo"></slot>
				</div>
				<div class="page-header-main__cell page-header-main__cell--c-right">
					<div class="page-header-main__cell" v-if="$slots['right-1']">
						<slot name="right-1"></slot>
					</div>
					<div class="page-header-main__cell" v-if="$slots['right-2']">
						<slot name="right-2"></slot>
					</div>
					<div class="page-header-main__cell" v-if="$slots['right-3']">
						<slot name="right-3"></slot>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>


<script>
define(['app'], function(app){
	Vue.component('page-header-main-2', {
		template: template,

		props: {
			mode: {
				default: null
			}
		}
	});
});
</script>