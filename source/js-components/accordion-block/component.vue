<template>
	<div class="accordion-block" :class="{open: open}">
		<div class="accordion-block__bar" @click="toggle">
			<div class="accordion-block__bar-icon"></div>
			<h3 class="accordion-block__title"><span :class="{'bold': small_title}">{{title}}</span><strong v-if="small_title">{{small_title}}</strong></h3>
		</div>
		<transition @enter="slideDown" @leave="slideUp" :css="false">
			<div class="accordion-block__body" v-if="open">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>


<script>
	define(['Model'], function (Model) {
		Vue.component('accordion-block', {
			template: template,

			data: function() {
				return {
					open: false
				}
			},

			props: {
				title: {
					default: null
				},
				small_title: {
					default: null
				},
				initialOpen: {
					type: Boolean,
					default: false
				},
                initialScroll: {
                    default: false
                }
			},

			methods: {
				slideDown: function (element, done) {
					var el = $(element);
					el.hide().addClass('sliding-down').removeClass('sliding-up').slideDown(300, function () {
						el.removeClass('sliding-down');
						done();
					});
				},

				slideUp: function (element, done) {
					var el = $(element);
					el.show().addClass('sliding-up').removeClass('sliding-down').slideUp(300, function () {
						el.removeClass('sliding-up');
						done();
					});
				},

				toggle: function() {
					this.open = !this.open;
					this.$emit('toggle', this, this.open);
				}
			},

			mounted: function() {
				this.open = this.initialOpen;
				/*if(this.initialOpen>0){
				    setTimeout(function() {

                        $('body, html').animate({scrollTop: 900}, 500)
                    }, 7500);
				    }*/
			},

			created: function() {
				var inst = this;
				this.$on('groupClose', function() {
					inst.open = false;
				});
			}
		});
	});
</script>