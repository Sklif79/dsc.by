<template>
    <div class="file-input">
        <transition-group name="content-fade" class="file-input__list" tag="div" v-if="localValues.length">
            <div class="file-input__list-item file-row" v-for="(file, index) in localValues" :key="index">
                <div class="file-row__cell-action">
                    <button type="button" class="file-row__remove-btn" @click="removeLocalValue(index)" title="Удалить">
                        <svg class="svg-icon svg-icon--remove">
                            <use xlink:href="#svg-icon-delete"></use>
                        </svg>
                    </button>
                </div>
                <div class="file-row__cell-name">
                    <span class="file-row__name">{{file.name}} </span>
                    <span class="file-row__size">{{file.size | formatFileSize}} </span>
                </div>
            </div>
        </transition-group>
        <label class="file-input__action">
            <input type="file" class="file-input__input" :multiple="multiple" :name="name"
                   :disabled="nowReading || localValues.length >= limit" @change="inputChanged">
            <span tabindex="0" class="file-input__text"
                  :class="{'disabled': nowReading || localValues.length >= limit}">
				{{textinfo}}
			</span>
        </label>
    </div>
</template>


<script>
    define(['Model'], function (Model) {
        Vue.component('file-input', {
            template: template,

            data: function () {
                return {
                    localValues: [],
                    nowReading: false,
                    filesToReadLeft: 0
                }
            },

            props: {
                disabled: {
                    type: Boolean,
                    default: false
                },
                multiple: {
                    type: Boolean,
                    default: false
                },
                limit: {
                    default: Infinity
                },
                textinfo: {
                    default: ''
                },
                name: {
                    type: String,
                    default: 'no'
                } 
            },

            mounted: function () {
                console.log(123456)
                console.log(this)
            },
            methods: {
                inputChanged: function (e) {
                    var inst = this;

                    var files = e.target.files || e.dataTransfer.files;

                    if (!files.length)
                        return;

                    inst.nowReading = true;
                    inst.filesToReadLeft += files.length;

                    for (var i = 0; i < files.length; i++)
                        readFile(files[i], i);

                    function readFile(file, index) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            if (!inst.multiple)
                                inst.localValues.splice(0, inst.localValues.length);

                            inst.localValues.push({
                                name: file.name,
                                size: file.size,
                                value: e.target.result
                            });


                            if (!inst.multiple) {
                                inst.filesToReadLeft = 0;
                                inst.nowReading = false;
                                inst.emitInput();
                            } else {
                                inst.filesToReadLeft--;
                                if (inst.filesToReadLeft == 0) {
                                    inst.nowReading = false;
                                    inst.emitInput();
                                }
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                },

                removeLocalValue: function (index) {
                    this.localValues.splice(index, 1);
                },

                emitInput: function () {
                    this.$emit('input', this.localValues);
                }
            },

            filters: {
                formatFileSize: Model.formatFileSize
            },
        });
    });
</script>