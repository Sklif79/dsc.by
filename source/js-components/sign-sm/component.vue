<template>
	<div class="sign-sm">
		<div class="sign-sm__sign-in">
			<h4 class="sign-sm__title flc">Если покупали у нас</h4>
			<div class="sign-sm__btn-row">
			<button type="button" class="btn btn--info btn--block" @click="signIn">
				<span class="btn__inner">Войти</span>
			</button>
			</div>
			<slot name="additional-sign-in"></slot>
		</div>
		<div class="sign-sm__sign-up">
			<h4 class="sign-sm__title flc">Регистрация</h4>
			<div class="sign-sm__btn-row">
			<button type="button" class="btn btn--block" @click="signUp" >
				<span class="btn__inner">Зарегистрироваться</span>
			</button>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model'], function (Model) {
	Vue.component('sign-sm', {
		template: template,

		props: {
			bxajaxid: {
				default: null
			},
			user: {
				default: null
			},
			authorized: {
				default: null
			},
			checkword: {
				type: String,
				default: null
			},
			userLogin: {
				type: String,
				default: null
			},
		},

		methods: {
			signIn: function () {
				Model.showSignInModal();
			},

			signUp: function () {
				Model.showSignUpModal();
			},

			resetForm: function () {
				Model.showResetModal(this.checkword, this.userLogin);
			}
		},

		mounted: function () {
			if(this.checkword, this.userLogin) {
				this.resetForm();
			}

			if(this.authorized)
				Model.signIn(this.user, true);
		}
	});
});
</script>
