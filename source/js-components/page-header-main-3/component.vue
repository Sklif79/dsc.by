<template>
	<div class="page-header-main page-header-main--3">
		<div class="container">
			<div class="page-header-main__logo-block">
				<slot name="logo"></slot>
			</div>
		</div>
	</div>
</template>


<script>
define(['app'], function(app){
	Vue.component('page-header-main-3', {
		template: template,

		props: {
			mode: {
				default: null
			}
		}
	});
});
</script>