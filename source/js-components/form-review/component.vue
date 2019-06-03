<template>
    <div>
        <div class="modal__container" v-if="message">
            <div class="modal__group flc" v-html='message'></div>
            <div class="modal__group flc" v-if="isModal">
                <div class="rich-form-btns">
                    <button type="button" class="btn btn--lg js-close-modal">
                        <span class="btn__inner">Закрыть</span>
                    </button>
                </div>
            </div>
        </div>
        <rich-form :fields="fields" @submit="submit" :submit-url="submitUrl" v-if="!message || dontHideFormOnSuccess">
            <button type="submit" class="btn btn--lg btn--primary" slot="btn" v-if="showButton">
                <span class="btn__inner">{{buttonText}}</span>
                <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use>
                </svg>
            </button>
        </rich-form>
    </div>
</template>


<script>
    define(['app', 'vue!rich-form/component'], function (app) {
        Vue.component('form-review', {
            template: template,

            data: function () {
                return {
                    submitUrl: window.location,
                    dontHideFormOnSuccess: 0,
                    buttonText: "Отправить",
                    message: "",
                    fields: []
                };
            },
            props: {
                showButton: {
                    default: 1
                },
                isModal: {
                    default: 0
                },
                staticDataSource: {
                    default: null
                }
            },
            mounted: function () {
                console.log(this.staticDataSource)
            },

            created: function () {
                var inst = this;

                if (!inst.staticDataSource) {
                    return
                }

                if (inst.staticDataSource.submitUrl) {
                    inst.submitUrl = inst.staticDataSource.submitUrl;
                }

                if (inst.staticDataSource.buttonText) {
                    inst.buttonText = inst.staticDataSource.buttonText;
                }

                if (inst.staticDataSource.dontHideFormOnSuccess) {
                    inst.dontHideFormOnSuccess = inst.staticDataSource.dontHideFormOnSuccess;
                }

                inst.fields = inst.staticDataSource.fields;

            },

            methods: {
                submit: function (response) {

                    if (response && response.success) {

                        this.message = response.message;
                    }


                }
            }

        });
    });
</script>