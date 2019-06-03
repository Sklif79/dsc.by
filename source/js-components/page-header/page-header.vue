<template>
	<header class="page-header" :class="{'page-header--checkout': type == 'checkout'}">
		<slot name="top"></slot>
		<slot name="main"></slot>
		<slot name="nav"></slot>
	</header>
</template>

<script>
	define(['Model', 'app'], function (Model, app) {
		Vue.component('page-header', {
			template: template,
			props: {
				type: {
					default: null
				}
			},
		});
	});
</script>