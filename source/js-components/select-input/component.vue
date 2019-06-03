<template> 
	<div :class="{'rich-form-grid grid': showOther}">
		<div :class="{'rich-form-grid__col col col-lg-6 col-2xs-12': showOther}">
			<div class="select" @click="toggleSelect"
			 :class="{'select--block': block, 'select--lite': lite, 'select--sm': size == 'sm' , 'placeholder-state': localValue == null, 'open': open}">
			 <select class="select" v-model="selectValue" @input="onChange">
					<option v-if='!option.disabled' v-for="option in options" :value="option.value">{{option.text}}</option>
					<!--<option v-if='option.disabled' disabled v-for="option in options" :value="option.value">{{option.text}}</option>-->
				</select>
				<span class="select-placeholder" v-if="placeholder">{{placeholder}}</span>
				<span class="select-value">{{getLocalValueText()}}</span>
				<svg class="select-chevron svg-icon svg-icon--dd-arrow">
				<use xlink:href="#svg-icon-dd-arrow"></use>
				</svg>
				<ul class="select-list">
					<li v-if='!option.disabled' :class="{active: option.value == selectValue}" tabindex="0" v-for="option in options" @click="selectOption(option);">{{option.text || option.name}}</li>
				</ul>

			</div>

			<div class="optionExtra" v-if="rootClass==='store'">
                <div class="optionExtra__line">
                    <div class="optionExtra__param">Время работы</div>
                    <div class="optionExtra__data-time">{{shelude}}</div>
                </div>
                <div class="optionExtra__line">
                    <div class="optionExtra__param">Статус товара</div>
                    <div class="optionExtra__data-time">
                        <span class="instore" v-if="goodStatus">В наличии</span>
                        <span class="noinstore" v-else>Под заказ</span>
                    </div>
                </div>

			</div>
		</div>
		<div class="rich-form-grid__col col col-lg-6 col-2xs-12" v-if="showOther">
			<input type="text" class="rich-text-input__input text-input text-input--sm" @input="onChange" autocomplete="off" v-model="localValue">
		</div>

	</div>
</template>



<script>
	define(['Model'], function (Model) {
		Vue.component('select-input', {
			template: template,

			data: function () {
				return {
					selectValue: null,
					showOther: false,
					localValue: null,
					open: false,
					debounceTimeout: null,
					instanceID: Math.round(Math.random() * 100000000),
                    shelude:'',
                    goodStatus: false,
				}
			},

			props: {
				disabled: {
					type: Boolean,
					default: false
				},
				block: {
					type: Boolean,
					default: false
				},
				lite: {
					type: Boolean,
					default: false
				},
				size: {
					default: null
				},
				placeholder: {
					default: null
				},
				options: {
					default: null
				},
				value: {
					default: null
				},
				rootClass: {
					default: null
				}
			},



			methods: {
				toggleSelect: function () {
					var inst = this;

					if (/*!View.mobileAndTabletCheck &&*/ !this.debounceTimeout) {
						this.open = !this.open;

						this.$emit(this.open ? 'open' : 'close');

						this.debounceTimeout = setTimeout(function () {
							inst.debounceTimeout = null;
						}, 300);
					}
				},

				selectOption: function (option) {
					this.selectValue = option.value;
					this.shelude = option.schedule;
					this.goodStatus = option.status;

					if (option.showOther) {
						this.localValue = "";
						this.showOther = true;
					} else {
						this.localValue = this.selectValue;
						this.showOther = false;
					}

					this.onChange();
				},

				onChange: function (e) {
					if (e && e.target) {


						if (this.showOther) {
							this.localValue = e.target.value;
						} else {
							this.selectValue = e.target.value;
							var option = _.findWhere(this.options, {value: this.selectValue});

							if (option && option.showOther) {
								this.localValue = "";
								this.showOther = true;
							} else {
								this.localValue = this.selectValue;
								this.showOther = false;
							}

						}
					}

					this.$emit('input', this.localValue);
				},

				getLocalValueText: function () {
					var selectedOption = _.findWhere(this.options, {value: this.selectValue});
					return selectedOption ? selectedOption.text : null;
				}
			},
            watch: {
                options: function () {
                    var inst = this;

                    if (inst.options.length) {
                        var sameValue = _.findWhere(inst.options, {value: inst.localValue});
                        inst.localValue = typeof sameValue !== 'undefined' ? sameValue.value : inst.options[0].value;

                    }
                }
            },
			mounted: function () {
				var inst = this;
				inst.localValue = inst.selectValue = inst.value;
				var sameValue = _.findWhere(inst.options, {value: inst.localValue});

				if (!sameValue && inst.selectValue) {

					var other = _.findWhere(inst.options, {showOther: true});

					if (other) {
						inst.selectValue = other.value;
						this.showOther = true;
					}

				}


			},

			created: function () {
				var inst = this;

				$(document.body).on('click.vCloseSelects' + this.instanceID, function (e) {
					if ($(e.target).closest(inst.$el).length == 0) {
						if (inst.open) {
							inst.open = false;
							inst.$emit('close');
						}
					}
				});
			},

			destroyed: function() {
				$(document.body).on('click.vCloseSelects' + this.instanceID);
			}
		});
	});
</script>