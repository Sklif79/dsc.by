<template>
	<rich-form :fields="fields" @submit="submit" submit-url="/ajax/message-send.php">
		<button type="submit" class="btn btn--lg btn--info" slot="btn">
			<span class="btn__inner">Отправить</span>
			<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
			</svg>
		</button>
	</rich-form>
</template>



<script>
define(['app', 'vue!rich-form/component'], function(app){
	Vue.component('form-message', {
		template: template,

		data: function() {
			return {
				fields: [
					{
						type: 'text',
						name: 'name',
						label: 'Представьтесь',
						value: null
					},
					{
						type: 'email',
						name: 'email',
						label: 'Электронная почта',
						value: null
					},
					{
						type: 'textarea',
						name: 'message',
						label: 'Ваше сообщение',
						value: null
					}
				]
			};
		},

		methods: {
			submit: function() {
				console.log('message request submitted');
			}
		}
	});
});
</script>