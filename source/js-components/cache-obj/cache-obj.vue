<template>
	<div>
		<slot name="cacheInner"></slot> 
	</div>
</template>

<script>
	define(['Model', 'app'], function (Model, app) {
		Vue.component('cache-obj', {
			template: template,
			data: function () {
				return {
					timerID: false,
				};
			},
			props: {
				cacheName: {
					default: ""
				},
				cacheReset: {
					default: false
				},
				cacheKey: {
					default: ""
				}
			},
			methods: {

				sendGeneredContent: function (componentName, cacheName, cacheKey, content) {
					var inst = this;

					var data = $(inst.$el.outerHTML);



					$(".js-not-cache-content", data).each(function () {
						$(this).remove()
					})

					$('.js-load-hiden-content', data).each(function () {
						$(this).removeClass('js-load-hiden-content');
					})

					$.ajax({
						type: 'post',
						url: window.location,
						data: {
							cacheContent: window.btoa(unescape(encodeURIComponent(data.html()))),
							cachePath: inst.$options._componentTag + "/" + inst.cacheName,
							cacheKey: inst.cacheKey
						},
						dataType: 'json'
					})
							.done(function (response) {

							})
							.fail(function (response) {
								console.warn('fail save cache', response);

							});
				},
			},
			mounted: function () {
				var inst = this;




				Vue.nextTick(function () {
					$('.js-load-hiden-content', inst.$el).removeClass('js-load-hiden-content');

					if (inst.cacheReset && inst.cacheName && inst.cacheKey) {

						clearTimeout(inst.timerID);
						inst.timerID = setTimeout(function () {
							inst.sendGeneredContent()
						}, 1000);

					}

				});



			},
		});
	});
</script>