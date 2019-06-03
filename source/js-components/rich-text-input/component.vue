<template> 
    <div class="rich-text-input" 
         :class="{'rich-text-input--w-label': label, 'rich-text-input--w-prefix': prefix, 'rich-text-input--textarea': type === 'textarea', 'rich-text-input--sm': size === 'sm', 'filled': localValue && localValue.length > 0, 'rich-text-input--file': type == 'file', 'form-error': error}">
        <label class="hastore" v-if="type==='hasstore'">
            <input type="checkbox" class="hidden-checkbox"
                   :value="value" @input="localValue = $event.target.value; $emit('input', $event.target.value)"
                    :name="name"
                   :id="index"
                   @focus="inputFocus" @blur="inputBlur" novalidate>
            <span class="has-store-visual">
                <span class="has-store-visual_tab has-store-visual_tab-true">Есть склад</span>
                <span class="has-store-visual_tab has-store-visual_tab-false">Нет склада</span>
            </span>
        </label> 
        <input :type="type || 'text'" class="rich-text-input__input text-input mclass" :disabled="disabled"
               :readonly="readonly" autocomplete="off"
               v-else-if="type !== 'textarea' && type !== 'select' && type !== 'file' && type !== 'capcha'"
               :class="{'text-input--lg': size == 'lg', 'text-input--sm': size == 'sm', 'js-has-inputmask': mask}"
               :placeholder="placeholder" v-mask="mask"
               :value="value" @input="localValue = $event.target.value; $emit('input', $event.target.value)"
               :id="index" 
               :name="name"
               required="required"
               @focus="inputFocus" @blur="inputBlur" novalidate>
        <div v-if="type==='capcha'" id="captcha_container"></div> 
        <textarea class="rich-text-input__input text-input" :disabled="disabled" autocomplete="off"
                  v-if="type === 'textarea'" :placeholder="placeholder" :name="name"
                  :value="value" @input="localValue = $event.target.value; $emit('input', $event.target.value)"
                  @focus="inputFocus" @blur="inputBlur"></textarea>
   
        <select-input :disabled="disabled" v-if="type === 'select'" :placeholder="placeholder" :lite="lite" :name="name"
                      :value="value" :options="options" block @input="localValue = $event; $emit('input', $event)"
                      @open="$emit('open')" @close="$emit('close')"></select-input>

        <file-input class="rich-text-input__input" :disabled="disabled" v-if="type === 'file'" :textinfo="textinfo" :name="name"
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
        <transition name="content-fade" @enter="slideDown" @leave="slideUp">
            <span class="rich-text-input__message rich-text-input__message--error" v-if="error && error.message">{{error.message}}</span>
        </transition>
    </div>
</template>


<script>
    define(['app', 'vue!select-input/component', 'vue!file-input/component'], function (app) {
        Vue.component('rich-text-input', {
            data: function () {
                return {
                    localValue: null,
                    suggestionsOpen: false,
                    suggestionsTimeout: null
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
                name: {
                    type: String,
                    default: 'no'
                },
                readonly: {
                    type: Boolean,
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
                maxlength: {
                    default: 4
                },
                required: {
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