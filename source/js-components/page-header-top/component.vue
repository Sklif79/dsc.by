<template>
	<nav class="page-header-top js-page-header-top">
		<div class="container">
			<div class="page-header-top__row" v-if="dwidth>992">
				<slot name="top"></slot>
				<slot name="left" ></slot>
				<div class="page-header-top__cell page-header-top__cell--expand"></div>
				<slot name="right"></slot>
			</div>

			<div class="page-header-top__row-mobile" v-else>
                            <slot name="mob_nav" ></slot> 
				</div>

		</div>
	</nav>
</template>


<script>
define(function(){
	Vue.component('page-header-top', {
		template: template,
		data: function() {
            return {
                dwidth: 0,
            }
        },
		created: function () {
            var self=this;
            $(window).resize(function(){self.dwidth= $(window).width(); console.log(self.dwidth)});
        },
		mounted: function(){
            this.dwidth= $(window).width()

		}
	});
});
</script>