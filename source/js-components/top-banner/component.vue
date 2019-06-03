<template> 
	<transition @enter="slideDown" @leave="slideUp" :css="false">
		<div class="top-banner" v-if="open">
			<slot></slot>
			<button type="button" class="top-banner__close" @click="closeMessage">
				<svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg>
			</button>
		</div>
	</transition>
</template>



<script>
	define([], function () {
		Vue.component('top-banner', {
			template: template,
			data: function () {
				return {
					open: false,
					firstLoad: true
				}
			},
			props: {
				cookieName: {
					default: ""
				},
				initiallyOpen: {
					type: Boolean,
					default: true
				},
				closeBtn: {
					type: Boolean,
					default: true
				}
			},
			methods: {

				closeMessage: function () {
					var inst = this;
					inst.open = false;
					if (inst.cookieName) {
						setCookie(inst.cookieName, "Y", 365);
					}

				},
				slideDown: function (element, done) {
					if (this.firstLoad)
						this.firstLoad = false;
					else {
						element.style.marginTop = -element.offsetHeight + 'px';
						setTimeout(function () {
							$(element).animate({'margin-top': 0}, 200, done);
						}, 0);
					}
				},
				slideUp: function (element, done) {
					element.style.marginTop = 0;
					setTimeout(function () {
						$(element).animate({'margin-top': -element.offsetHeight}, 200, done);
					}, 0);
				}
			},
			mounted: function () {
				var inst = this;
				inst.open = inst.initiallyOpen;
			}
		});
	});
</script>