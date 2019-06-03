<template>
	<div>
		<transition-group name="content-fade" mode="out-in" tag="div">

			<div v-if="(message && (successState || alreadySubscribe))" key="subscr_message">
				<div class="success-message">
					<div class="success-message__txt "  v-html='message'>Подписка прошла успешно.</div>
				</div>
			</div>

			<rich-form :fields="fields" @submit="submit" key="subscr_button"  v-if="!successState" :external-errors="errors">
				<button type="submit" class="btn btn--lg btn--info" slot="btn">
					<span class="btn__inner" v-if="alreadySubscribe"> Отписаться</span>
					<span class="btn__inner" v-else> Подписаться</span>

					<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
					</svg>
				</button>
			</rich-form>

		</transition-group>
	</div>
</template>



<script>
	define(['Model', 'vue!rich-form/component'], function (Model) {
		Vue.component('form-product-subscribe', {
			template: template,

			data: function () {
				return {
					message: "",
					alreadySubscribe: false,
					successState: false,
					fields: [
						{
							type: 'text',
							name: 'email',
							label: 'Ваш e-mail',
							value: Model.user.email ? Model.user.email : "",
							readonly: Model.user.email ? true : false
						}
					],
					errors: null
				};
			},

			props: {
				productId: {
					default: null
				},
				offerId: {
					default: null
				}
			},

			methods: {
				submit: function () {
					var inst = this;

					var formData = _.map(inst.fields, function (field) {
						return {
							name: field.name,
							value: field.value
						}
					});

					formData.push({
						name: 'bxajaxid',
						value: 'product_subscribe'
					});

					formData.push({
						name: 'type',
						value: 1
					});

					if (inst.productId) {
						formData.push({
							name: 'productId',
							value: inst.productId
						});
					}

					if (inst.offerId) {
						formData.push({
							name: 'offerId',
							value: inst.offerId
						});
					}

					//if already subscribe
					if (inst.alreadySubscribe) {
						formData.push({
							name: 'unsubscribe',
							value: inst.offerId ? inst.offerId : inst.productId
						});
					}


					$.post({
						url: '/catalog/subscribe.php',
						dataType: 'json',
						data: formData
					})
							.done(function (response) {
								inst.alreadySubscribe = response.alreadySubscribe;
								inst.successState = response.successState;
								inst.message = response.message;
							})
							.fail(function (response) {
								console.warn('form-product-subscribe ajax failed:', response);
							})
							.always(function (response) {
								inst.errors = response.errors || null;
							});
				}
			},

			mounted: function () {
				var inst = this; 
				inst.fields[0].value = Model.user.email ? Model.user.email : "";

				inst.fields[0].readonly = Model.user.email ? true : false;

			},
		});
	});
</script>