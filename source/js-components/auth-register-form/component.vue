<template> 
    <transition name="content-fade" mode="out-in">
		<div key="sign-in" v-if="currentMode == 'sign-in'">
			<div :class="{'modal__container': modal}">
				<rich-form :fields="fields.signIn" @submit="submit" submit-url="/personal/user/authForm.php">
					<div class="rich-form-link" slot="row">
						<span class="link" @click="switchMode('forgot-password')">Забыли пароль?</span>	
					</div>
					<button type="submit" class="btn btn--lg btn--info" slot="btn">
						<span class="btn__inner">Войти</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button>
					<button type="button" class="btn btn--lg" slot="btn" @click="switchMode('sign-up')">
						<span class="btn__inner">Зарегистрироваться</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button>
				</rich-form>
			</div>
			<div class="modal__group flc">
				<slot name="socials-buttons"></slot> 
			</div>
		</div>

		<div key="reset-password" v-if="currentMode == 'reset-password'">
			<div :class="{'modal__container': modal}">
				<rich-form :fields="fields.resetPassword" @submit="submit" submit-url="/personal/user/reset.php">

					<button type="submit" class="btn btn--lg btn--info" slot="btn">
						<span class="btn__inner">Сменить пароль</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button> 
				</rich-form>
			</div>
			<div class="modal__group flc" >
				<slot name="socials-buttons"></slot>

			</div>
		</div>


		<div key="sign-up" v-if="currentMode == 'sign-up'">
			<div :class="{'modal__container': modal}">
				<rich-form :fields="fields.signUp" @submit="submit" submit-url="/personal/user/register.php">

					<button type="submit" class="btn btn--lg btn--info" slot="btn">
						<span class="btn__inner">Зарегистрироваться</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button>
					<button type="button" class="btn btn--lg" slot="btn" @click="switchMode('sign-in')">
						<span class="btn__inner">Войти</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button>
				</rich-form>
			</div>
			<div class="modal__group flc" >
				<slot name="socials-buttons"></slot>

			</div>
		</div>


		<div key="forgot-password" v-if="currentMode == 'forgot-password'">
			<div :class="{'modal__container': modal}">
				<rich-form :fields="fields.forgotPassword" @submit="submit" submit-url="/personal/user/restore.php">
					<div class="rich-form-message" slot="top">Новый пароль будет отправлен на вашу электронную почту.</div>
					<div class="rich-form-link" slot="row">
						<span class="link" @click="switchMode('sign-in')">Вернуться ко входу</span>	
					</div>
					<button type="submit" class="btn btn--lg btn--info" slot="btn">
						<span class="btn__inner">Выслать пароль</span>
						<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
						</svg>
					</button>
				</rich-form>
			</div>
		</div>

		<div key="sucess-message" v-if="currentMode == 'sucess-message'">
			<div class="modal__container" v-if="modal">
				<div class="modal__group flc" v-html='message'></div>
				<div class="modal__group flc" >
					<div class="rich-form-btns">
						<button type="button" class="btn btn--lg js-close-modal">
							<span class="btn__inner">Продолжить</span>
						</button>
					</div>
				</div> 
			</div>
			<div v-html="message" v-else></div>
		</div>


    </transition>
</template>



<script>
	define(['Model', 'vue!rich-form/component'], function (Model) {
		Vue.component('auth-register-form', {
			template: template,

			data: function () {
				return {
					message: null,
					currentMode: null,
					fields: {
						resetPassword: [
							{
								type: 'hidden',
								name: 'USER_LOGIN',
								label: '',
								value: null
							},
							{
								type: 'hidden',
								name: 'USER_CHECKWORD',
								label: '',
								value: null
							},
							{
								type: 'hidden',
								name: 'bxajaxid',
								label: '',
								value: 'ajax_login_reset'
							},

							{
								type: 'password',
								name: 'USER_PASSWORD',
								label: 'Пароль',
								value: null
							},
							{
								type: 'password',
								name: 'USER_CONFIRM_PASSWORD',
								label: 'Подтверждение пароля',
								value: null
							},
							{
								type: 'hidden',
								name: 'AUTH_FORM',
								label: '',
								value: 'Y'
							},
							{
								type: 'hidden',
								name: 'TYPE',
								label: '',
								value: 'CHANGE_PWD'
							}
						],
						signIn: [
							{
								type: 'text',
								name: 'USER_LOGIN',
								label: 'E-mail или телефон',
								value: null
							},
							{
								type: 'hidden',
								name: 'bxajaxid',
								label: '',
								value: 'ajax_login'
							},
							{
								type: 'password',
								name: 'USER_PASSWORD',
								label: 'Пароль',
								value: null
							},
							{
								type: 'hidden',
								name: 'AUTH_FORM',
								label: '',
								value: 'Y'
							},
							{
								type: 'hidden',
								name: 'TYPE',
								label: '',
								value: 'AUTH'
							}
						],

						signUp: [
							{
								type: 'text',
								name: 'FIELD[EMAIL]',
								label: 'Email',
								value: null
							},
							{
								type: 'password',
								name: 'FIELD[PASSWORD]',
								label: 'Пароль',
								value: null
							},
							{
								type: 'password',
								name: 'FIELD[CONFIRM_PASSWORD]',
								label: 'Повторите пароль',
								value: null
							},
							{
								type: 'hidden',
								name: 'ajax_login',
								label: '',
								value: 'Y'
							},
						],

						forgotPassword: [
							{
								type: 'hidden',
								name: 'bxajaxid',
								label: '',
								value: 'ajax_login_forgot'
							},
							{
								type: 'email',
								name: 'USER_EMAIL',
								label: 'Email',
								value: null
							}, {
								type: 'hidden',
								name: 'AUTH_FORM',
								label: '',
								value: 'Y'
							},
							{
								type: 'hidden',
								name: 'TYPE',
								label: '',
								value: 'SEND_PWD'
							}
						],
					}
				}
			},

			props: {
				mode: {
					type: String,
					default: 'sign-in'
				},
				checkword: {
					type: String,
					default: null
				},
				userLogin: {
					type: String,
					default: null
				},
				modal: {
					type: Boolean,
					default: true
				}
			},

			methods: {
				submit: function (response) {

					if (this.currentMode != response.mode) {
						return;
					}

					if (response && response.mode == "sign-in" && response.authorized) {
						Model.signIn(response.user);
						View.control.closeModal();
						if (response.reload) {
							window.location.reload();
						}
					}

					if (response && response.mode == "sign-up" && response.success) {
						Model.signUp(response.user);
						this.message = response.success_message;
						this.switchMode("sucess-message");
					}

					if (response && response.mode == "forgot-password" && response.success) {
						this.message = response.success_message;
						this.switchMode("sucess-message");
					}


				},

				switchMode: function (mode) {

					if (mode != "sucess-message") {
						this.currentMode = mode;
					}

					if (this.currentMode == 'sign-up') {
						Model.showSignUpModal();
					}


					Model.$emit('modalTitleChange', this.currentMode == 'sign-in' ? 'Вход на сайт' : this.currentMode == 'sign-up' ? 'Регистрация' : (this.currentMode == "reset-password" ? 'Сброс пароля' : 'Восстановление пароля'));

					this.currentMode = mode;
				}
			},

			created: function () {
				var modeToSet = this.mode;
				if (modeToSet !== 'sign-in' && modeToSet !== 'sign-up' && modeToSet !== 'forgot-password' && modeToSet !== 'reset-password')
					modeToSet = 'sign-in';

				this.switchMode(modeToSet);
			},

			mounted: function () {
				this.fields.resetPassword[0].value = this.userLogin;
				this.fields.resetPassword[1].value = this.checkword;
			}
		});
	});
</script>