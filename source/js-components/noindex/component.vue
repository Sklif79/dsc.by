<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	define(['Model'], function (Model) {
		Vue.component('noindex', {
			template: template,
		});
	});
</script>