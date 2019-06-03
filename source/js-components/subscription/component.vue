<template>
	<div class="label-action label-action--sub">
		<div class="label-action__label">
			<h4 class="label-action__label-txt" v-html='rowTitle'></h4>
		</div>
		<div class="label-action__action">
			<form class="one-row-form" @submit.prevent="submit">
				<div class="one-row-form__cell-input">
					<rich-text-input type="text" v-model="name" placeholder="Ваше имя"></rich-text-input>
				</div>
                <div class="one-row-form__cell-input">
                    <rich-text-input type="text" v-model="email" placeholder="E-mail" :error="emailError"></rich-text-input>
                </div>
				<div class="one-row-form__cell-btn">
					<button type="submit" class="btn btn--info">
						<span class="btn__inner">{{buttonText}}</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
							<use xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>


<script>
	define(['app', 'vue!rich-text-input/component'], function (app) {
	Vue.component('subscription', {
		data: function () {
			return {
                name: null,
				email: null,
				emailError: null
			}
		},
		props: {
			bxajaxid: {
				default: null
			},
			rowTitle: {
				default: 'Будь в курсе акций и новинок'
			},
			buttonText: {
				default: "Подписаться"
			},
			successUrl: {
				default: null
			},
			unsubscribeUrl: {
				default: null
			},
			defaultEmail: {
				default: null
			},
			showUnsubscribePopup: {
				default: null
			}
		},
		created: function () {
			var inst = this;

			if (inst.showUnsubscribePopup && inst.unsubscribeUrl) {
				View.control.openModalByUrl(inst.getModayUrl(inst.unsubscribeUrl));
			}

	//		inst.email = Model.user.email;
	//
	//		Model.$on('authorized', function () {
	//		    inst.email = Model.user.email;
	//		});
		},
		template: template,
		methods: {

		getModayUrl: function (url) {
			if (!url) {
				return url;
			}

			if (url.indexOf("?") == -1) {
				url += "?AJAXMODE=Y";
			} 
			else {
				url += "&AJAXMODE=Y";
			}

			return url;
		},

		submit: function () {
			var inst = this;
			
			
			$.ajax({
				type: "POST",
				url: '/',
				dataType: 'json',
				data: {
					FIELD: {EMAIL: inst.email, NAME: inst.name},
					bxajaxid: inst.bxajaxid
				}
			})
			.done(function (response) {
				console.log('subscriprion response', response)
				inst.results = response;
				if (response.success && inst.successUrl) {
					View.control.openModalByUrl(inst.getModayUrl(inst.successUrl));
					inst.emailError = null;
                    inst.name=''
                    inst.email=''
				}
				else if (response.errors && response.errors.fields) {
					inst.emailError = response.errors.fields['FIELD[EMAIL]'] || null;
				}
			})
			.fail(function (response) {
				console.warn('subscription ajax fail: ', response);
			});
		}
		}
	});
	});
</script>