<template>
	<div class="accordion-group">
		<slot></slot>
	</div>
</template>


<script>
	define(['Model'], function (Model) {
		Vue.component('accordion-group', {
			template: template,

			props: {
				multiple: {
					type: Boolean,
					default: false
				}
			},

			methods: {
				toggle: function(element, open) {
					var inst = this;
					if(open && !inst.multiple) {
						_.each(inst.$children, function(child) {
							if(child != element)
								child.$emit('groupClose');
						});
					}
				}
			},

			mounted: function() {
				var inst = this;

				_.each(inst.$children, function(child) {
					child.$on('toggle', inst.toggle);
				});
			}
		});
	});
</script>