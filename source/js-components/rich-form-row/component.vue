<template>
    <div class="rich-form-row"  
         :class="{'col-lg-6': typecss == 2, 'rich-form-row--check': type == 'checkbox' || type == 'radio', 'rich-form-row--hidden': type == 'hidden'}">
        <slot name="label"></slot>
        <slot name="input"></slot>
        <slot name="bottom"></slot>
    </div>
</template>


<script>
    define(['Model'], function (Model) {
        Vue.component('rich-form-row', {
            template: template,

            props: {
                type: {
                    default: 'default'
                }
                },  
            mounted: function () {
            }
        });
    });
</script>