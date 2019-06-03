<template>
    <form class="rich-form" @submit.prevent="onSubmit" autocomplete="off">
        <slot name="top"></slot>
        <transition name="content-fade" @enter="slideDown" @leave="slideUp">
            <div class="rich-form-message rich-form-message--error" v-if="errors && errors.form"
                 v-html="errors.form"></div>
        </transition>
        <rich-form-row
                v-for="field, index in fields"
                :key="field.name || index"
                :type="field.type"
                :required="field.required"
                :class="{
                    'col col-lg-4 col-sm-12': field.typecss == 2,
                    'col col-lg-6 col-sm-12': field.typecss == 3,
                    'col col-lg-20 col-sm-6 col-xs-12': field.typecss == 4
                }">
            <div class="radioInstore" v-if="field.type == 'radioInstore'">

            </div>
            <div class="label-text__hl" v-if="field.type == 'label'" slot="label">{{field.label}}</div>
            <rating-block
                    v-else-if="field.type == 'rating'"
                    v-model="field.value" slot="input"
                    :read-only="false"
                    :input-mode="true"
                    :class="{'form-error': getFieldError(field)}">
            </rating-block>
            <rich-text-input v-else
                             slot="input"
                             :index="index"
                             :name="field.name"
                             :type="field.type"
                             :options="field.options"
                             :disabled="field.disabled"
                             v-model="field.value"
                             :label="field.label"
                             :placeholder="field.label"
                             :readonly="field.readonly"
                             :multiple="field.multiple"
                             :limit="field.limit"
                             :mask="field.mask"
                             :textinfo="field.textinfo"
                             :error="getFieldError(field)">

            </rich-text-input>
            <div v-if="field.type == 'rating' && getFieldError(field)" slot="bottom">
                <span class="rich-text-input__message rich-text-input__message--error">{{getFieldError(field).message}}</span>
            </div>
        </rich-form-row>

        <slot name="row"></slot>
        <div class="rich-form-btns" v-if="$slots.btn">
            <slot name="btn"></slot>
        </div>
    </form>
</template>


<script>
    define(['app', 'vue!rich-form/component', 'vue!rich-form-row/component', 'vue!rich-text-input/component', 'vue!rating-block/component'], function (app) {
        Vue.component('rich-form', {

            template: template,

            data: function () {
                return {
                    errors: null,
                }
            },

            props: {
                submitUrl: {
                    default: null,
                },
                fields: {
                    default: null
                },
                externalErrors: {
                    default: null
                }
            },

            watch: {
                externalErrors: function (newValue) {
                    this.errors = newValue;
                }
            },

            methods: {
                slideDown: function (element, done) {
                    var el = $(element);
                    el.hide().slideDown(300, done);
                },

                slideUp: function (element, done) {
                    var el = $(element);
                    el.show().slideUp(300, done);
                },

                getFieldError: function (field) {
                    if (this.errors && this.errors.fields)
                        return this.errors.fields[field.name] || null;
                    else
                        return null;
                },

                onSubmit: function () {
                    var inst = this;
                    var formData = new FormData();


                    _.each(inst.fields, function (field) {
                        if (!field.value) {
                            field.value = "";
                        }

                        if (field.type === 'file') {
                            _.each(field.value, function (fileListItem) {
                                formData.append(field.name, fileListItem, fileListItem.name)
                            });
                        } else
                            formData.append(field.name, field.value);
                    });

                    if (inst.submitUrl) {
                        $.ajax({
                            url: inst.submitUrl,
                            type: 'POST',
                            data: formData,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                        })
                            .done(function (response) {
                                inst.$emit('done', response);
                            })
                            .fail(function (response) {
                                inst.$emit('fail', response);
                            })
                            .always(function (response) {

                                inst.errors = response.errors;

                                Vue.nextTick(function () {
                                    var scrollTop = $(window).scrollTop();
                                    var element = $(inst.$el);

                                    if (inst.errors && inst.errors.fields && inst.errors.fields.length) {
                                        var firstErrorField = element.find('.form-error');
                                        if (firstErrorField.length) {
                                            var firstErrorFieldOffset = firstErrorField.offset().top;
                                            if (firstErrorFieldOffset + 30 < scrollTop || firstErrorFieldOffset + 30 > scrollTop + window.innerHeight) {
                                                $('html, body').animate({scrollTop: firstErrorFieldOffset - 30}, 400);
                                            }
                                        }
                                    } else if (element.offset().top < scrollTop) {
                                        var offset = element.closest('.modal').length ? 90 : 30;
                                        $('html, body').animate({scrollTop: element.offset().top - offset}, 400);
                                    }

                                    inst.$emit('submit', response);
                                    console.log(response)
                                });
                            })
                    } else {
                        inst.$emit('submit');
                    }

                    return false;
                }
            }
        });
    });
</script>
