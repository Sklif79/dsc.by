<template>
    <div class="rich-text-input rich-text-input-checkout"
         :class="{'rich-text-input--w-label': label, 'rich-text-input--w-prefix': prefix, 'rich-text-input--textarea': type === 'textarea', 'rich-text-input--sm': size === 'sm', 'filled': localValue && localValue.length > 0, 'rich-text-input--file': type == 'file', 'form-error': error, 'hiddenDefault': hiddenDefault===true }">
        <label  class="rich-text-input__label-checkout" v-if="type!=='hidden' && hiddenDefault!==true &&  label || rootClass">{{label}} </label>
        <div class="input rich-text-input__input-checkout" v-if="hiddenDefault!==true">
            <input :type="type || 'text'" class="rich-text-input__input text-input" :disabled="disabled"
                   :readonly="readonly" autocomplete="off"
                   v-if="type !== 'textarea' && type !== 'select' && type !== 'file'"
                   :class="{'text-input--lg': size == 'lg', 'text-input--sm': size == 'sm', 'js-has-inputmask': mask}"
                   :placeholder="placeholder" v-mask="mask"
                   :value="value" @input="localValue = $event.target.value; $emit('input', $event.target.value)"
                   :id="index"
                   @focus="inputFocus" @blur="inputBlur" novalidate>
            <span class="subinput-note" v-if="type==='tel'  && hiddenDefault!==true">Нужен для связи с вами</span>

            <textarea class="rich-text-input__input text-input" :disabled="disabled" autocomplete="off"
                      v-if="type === 'textarea'" :placeholder="placeholder"
                      :value="value" @input="localValue = $event.target.value; $emit('input', $event.target.value)"
                      @focus="inputFocus" @blur="inputBlur">{{placeholder}}</textarea>

            <select-input :disabled="disabled" v-if="type === 'select'" :placeholder="placeholder" :lite="lite"
                          :value="value" :options="options" :rootClass="rootClass" block @input="localValue = $event; $emit('input', $event)"
                          @open="$emit('open')" @close="$emit('close')"></select-input>

            <file-input class="rich-text-input__input" :disabled="disabled" v-if="type === 'file'" :textinfo="textinfo"
                        @input="localValue = $event; $emit('input', $event)" @open="$emit('open')"
                        @close="$emit('close')"></file-input>

            <label v-if="label && type == 'checkbox'" class="rich-text-input__label" :for="index">{{label}}</label>
            <span class="rich-text-input__prefix" v-if="prefix">{{prefix}}</span>
            <span class="rich-text-input__border"></span>
            <ul class="rich-text-input__suggestions select-list" :class="{open: suggestionsOpen}"
                v-if="suggestions && suggestions.length">
                <li class="rich-text-input__suggest" v-for="suggest in suggestions"
                    @click.stop.prevent="suggestionClick(suggest)">{{suggest.show_value}}
                </li>
            </ul>
            <div class="form-suggestions flc" v-if="topLocations">
                <div class="form-suggestions__flex">
                    <div class="form-suggestions__item" v-for="location in topLocations">
                        <span class="link" @click="localValue=location.data; value=location.data;">{{location.show_value}}</span>
                    </div>
                </div>
            </div>
            <transition name="content-fade" @enter="slideDown" @leave="slideUp">
                <span class="rich-text-input__message rich-text-input__message--error" v-if="error && error.message">{{error.message}}</span>
            </transition>
        </div>
        <span class="clone-field-link" v-if="hiddenDefault===true" @click=" hiddenDefault=false">+ Добавить еще один</span>

    </div>
</template>


<script>
    define(['app', 'vue!select-input/component', 'vue!file-input/component'], function (app) {
        Vue.component('rich-text-input-checkout', {
            data: function () {
                return {
                    localValue: null,
                    suggestionsOpen: false,
                    suggestionsTimeout: null,
                    extrafieldPhone: false,
                    extrafieldPhoneValue: '',
                }
            },

            props: {
                index: {
                    default: null
                },
                type: {
                    type: String,
                    default: 'text'
                },
                readonly: {
                    type: Boolean,
                    default: false
                },
                hiddenDefault: {
                    default: false
                },
                label: {
                    type: String,
                    default: null
                },
                textinfo: {
                    default: ''
                },
                placeholder: {
                    default: null
                },
                mask: {
                    default: null
                },
                value: {
                    default: null
                },
                disabled: {
                    type: Boolean,
                    default: false
                },
                size: {
                    default: null
                },
                lite: {
                    type: Boolean,
                    default: false
                },
                prefix: {
                    default: null
                },
                options: {
                    default: null
                },
                error: {
                    default: null
                },
                rootClass: {
                    default: null
                },
                suggestions: {
                    default: function () {
                        return [];
                    }
                },
                multiple: {
                    type: Boolean,
                    default: false
                },
                limit: {
                    default: Infinity
                },
                topLocations: {
                    default: null
                },
            },

            template: template,

            methods: {
                slideDown: function (element, done) {
                    var el = $(element);
                    el.hide().slideDown(300, done);
                },

                slideUp: function (element, done) {
                    var el = $(element);
                    el.show().slideUp(300, done);
                },

                inputFocus: function () {
                    clearTimeout(this.suggestionsTimeout);
                    this.suggestionsOpen = true;
                    this.$emit('focus');
                },

                inputBlur: function () {
                    var inst = this;

                    clearTimeout(this.suggestionsTimeout);
                    this.suggestionsTimeout = setTimeout(function () {
                        inst.suggestionsOpen = false;
                        inst.$emit('delayedBlur');
                    }, 200);

                    this.$emit('blur');
                },

                suggestionClick: function (suggest) {
                    this.localValue = suggest;
                    this.$emit('input', suggest.value, {suggest: true, data: suggest.data});

                    clearTimeout(this.suggestionsTimeout);
                    this.suggestionsOpen = false;
                }
            },

            created: function () {
                var inst = this;
                /*$(document.body).off('click.vueRTIsuggestionsClose').on('click.vueRTIsuggestionsClose', function(e) {
                 if($(e.target).closest(inst.$el).length == 0)
                 inst.suggestionsOpen = false;
                 });

                 this.$on('input', function() {
                 inst.suggestionsOpen = true;
                 });*/
            },

            mounted: function () {
                var inst = this;
                this.localValue = this.value;

                // jquery inputmask event fix
                $(this.$el).find('.js-has-inputmask').on('keyup.vueRichTextInputInput change.vueRichTextInputInput paste.vueRichTextInputInput', function (e) {
                    inst.localValue = e.target.value;
                    inst.$emit('input', inst.localValue);
                });
            }
        }); 
    });
</script>