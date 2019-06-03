<template>
	<rich-form :fields="fields" @submit="submit" submit-url="/ajax/callRequest.php">
		<button type="submit" class="btn btn--lg btn--info" slot="btn">
			<span class="btn__inner">Заказать звонок</span>
			<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
			</svg>
		</button>
	</rich-form>
</template>



<script>
define(['app', 'vue!rich-form/component'], function(app){
	Vue.component('call-request-form', {
		template: template,

		data: function() {
			return {
				fields: [
					{
						type: 'text',
						label: 'Представьтесь',
						value: null
					},
					{
						type: 'tel',
						label: 'Контактный телефон',
						value: null,
						mask: View.inputmaskPresets.phone
					}
				]
			};
		},

		methods: {
			submit: function() {
				console.log('call request submitted');
			}
		}
	});
});
</script>