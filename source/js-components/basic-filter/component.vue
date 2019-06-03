<template>
	<div class="basic-filter">
		<button tyle="button" class="bf-close js-bf-close">
			<svg class="svg-icon"><use xlink:href="#svg-icon-close-big"></use></svg>
		</button>
		<div class="basic-filter-group" v-for="filter in links" v-if="filter.options.length || filter.link"
			 :class="{open: isFilterOpen(filter), 'basic-filter-group--static': !filter.options.length}" :key="filter.name">
			 <h4 class="basic-filter-group__header" @click="toggleFilter($event, filter)">
				 <svg v-if="filter.options.length" class="basic-filter-group__header-arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
				<a v-if="filter.link && filter.link!=filter.value" :href="filter.link" 
				   class="basic-filter-group__header-link link link--undecorated link--like-text" @click="linkClick($event, filter.link)">

					<span class="link__text">{{filter.title}}</span>&nbsp;<sup class="link__sup" v-if="filter.count">{{filter.count}}</sup>
				</a>
				<span v-if="filter.link && filter.link==filter.value" class="link link--undecorated basic-filter-group__header-current" >
					<span class="link__text">{{filter.title}}</span>&nbsp;<sup class="link__sup" v-if="filter.count">{{filter.count}}</sup>
				</span>

				<span v-if="!filter.link">{{filter.title}}</span>


			</h4>

			<div v-if="filter.options.length">


				<div class="basic-filter-group__item" :class="{'js-dropdown__body': filter.options.length>4, 'js-tooltip-position': filter.options.length>4 }">


					<div class="basic-filter-group__body" v-for="option in filter.options" v-if="option.link == filter.value || filter.options.length==1">
						<div class="basic-filter-group__item" >
							<a :href="option.link" class="basic-filter-group__link" v-if="option.link != filter.value" @click="linkClick($event, option.link)">
								<span class="link__text">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup>
							</a>
							<span class="basic-filter-group__link basic-filter-group__link--current link--undecorated link--like-text" v-else>
								<span class="">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup>
							</span>
						</div>
					</div>




					<div class="js-accordion" v-if="filter.options.length > 1">
						<div class="basic-filter-group__body js-accordion__body" >
							<div class="basic-filter-group__item" v-for="option in filter.options" v-if="option.link != filter.value">
								<a :href="option.link" class="basic-filter-group__link " @click="linkClick($event, option.link)">
									<span class="link__text">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup>
								</a>
							</div>
						</div>
						<div class="basic-filter-group__body">

						</div>
					</div>



				</div>

			</div> 


		</div>


		<div class="basic-filter-group" v-for="filter in value" v-if=" !isFilterEmpty(filter)"
			 :class="{open: isFilterOpen(filter), locked: isFilterLocked(filter)}" :key="filter.name">

			 <h4 class="basic-filter-group__header" @click="toggleFilter($event, filter)" v-if="filter.type !='boolean'">{{filter.title}}
				<svg class="basic-filter-group__header-arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
			</h4>



			<transition @enter="slideDown" @leave="slideUp" :css="false">
				<div class="basic-filter-group__body" v-if="isFilterOpen(filter) && filter.options.length">

					<transition-group tag="div" @enter="slideDown" @leave="slideUp" :css="false">
						<div v-if="filter.type==='select'" :key="filter.name">
							<div class="input rich-text-input__input-checkout">
								<div>
									<div class="js-parent">
										<div class="select select--block js-accordeon-title">
											<span class="select-value">{{filter.text}}</span><svg class="select-chevron svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
											<ul class="select-list js-select-list select-list--new ">
												<li v-for="(option, index) in filter.options"  @click="selectOption(filter, option)">
													<span>{{option.title}}</span> <sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup></li>
											</ul>
										</div>
									</div>
								</div>
								<span class="rich-text-input__border"></span></div>
							</div>
						<div class="basic-filter-group__item"
							 v-for="(option, index) in filter.options"
							 :key="filter.name"
							 v-if="(typeof option.count == 'undefined' || option.count > 0) && (isOptionWithinLimits(filter, option) || isFilterMaximized(filter))"
							 :class="{'basic-filter-group__item--color': option.type == 'color'}">
							<a :href="option.link" class="basic-filter-group__link link--undecorated link--like-text" v-if="option.type == 'link'">
								<span class="link__text">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup>
							</a>

							<label class="checkbox-row checkbox-row--sm" v-if="(option.type == 'checkbox' || filter.type == 'boolean') && (option.count !== 0)">
								<input type="checkbox" class="checkbox-row__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)">
								<span class="checkbox-row__visual"></span>
								<span class="checkbox-row__text">{{filter.type =='boolean'? filter.title :option.title}}</span>&nbsp;<sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup>
							</label>

							<label class="checkbox-row checkbox-row--sm checkbox-row--img" v-if="option.type == 'checkbox-img' && option.count !== 0">
								<input type="checkbox" class="checkbox-row__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)">
								<span class="checkbox-row__visual">
									<img :src="option.image" alt="">
								</span>
								<span class="checkbox-row__text">{{option.title}}</span>&nbsp;<sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup>
							</label>

							<label class="checkbox-row checkbox-row--sm checkbox-row--radio" v-if="option.type == 'radio'">
								<input type="radio" class="checkbox-row__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)">
								<span class="checkbox-row__visual"></span>
								<span class="checkbox-row__text">{{option.title}}</span>&nbsp;<sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup>
							</label>

							<label class="color-pick" v-if="option.type == 'color'" :title="option.title">
								<input type="checkbox" class="color-pick__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)">
								<span class="color-pick__visual" :style="{'background-color': option.color, 'background-image': option.image? 'url(' + option.image + ')' : 'none'}"></span>
							</label>


							<div class="range-row" v-if="option.type == 'range'">
								<div class="range-row__cell">
									<rich-text-input size="sm" v-model="option.valueMin" @input="filterChange(filter)"
													 :min="option.min"
													 :max="Math.min(option.max, option.valueMax)"
													 :prefix="option.prefixMin"
													 :placeholder="option.min"></rich-text-input>
									<div class="range_p-holder">от</div>
								</div>
								<div class="range-row__cell">
									<rich-text-input size="sm" v-model="option.valueMax" @input="filterChange(filter)"
													 :min="Math.max(option.min, option.valueMin)"
													 :max="option.max"
													 :prefix="option.prefixMax"
													 :placeholder="option.max"></rich-text-input>
									<div class="range_p-holder">до</div>
								</div>
							</div>

							<slider-input v-if="option.type == 'slider'" @input="filterChange(filter)"
										  :prefix="option.prefix"
										  :prefixMin="option.prefixMin"
										  :prefixMax="option.prefixMax"
										  :postfix="option.postfix"
										  :postfixMin="option.postfixMin"
										  :postfixMax="option.postfixMax"
										  :min="option.min"
										  :max="option.max"
										  :value.sync="option.value"
										  :valueMin.sync="option.valueMin"
										  :valueMax.sync="option.valueMax"
										  :price="option.price"
										  :integer="option.integer"
										  ></slider-input>
						</div>
					</transition-group>
					<div class="filter-group__item-toggle" v-if="filterOptionsOverflowCount(filter)">
						<a href="javascript:void(0)" class="link link--dd link--undecorated" :class="{'open': isFilterMaximized(filter)}" @click="toggleFilterMaxState(filter)">
						   <transition name="content-fade" mode="out-in">
								<span class="link__text" v-if="!isFilterMaximized(filter)">Еще {{filterOptionsOverflowCount(filter)}}</span>
								<span class="link__text" v-else>Свернуть</span>
							</transition>
							&nbsp;
							<svg class="link__arrow svg-icon svg-icon--dd-arrow">
							<use xlink:href="#svg-icon-dd-arrow"></use>
							</svg>
						</a>
					</div>
				</div>
			</transition>
		</div>

		<transition name="content-fade">
			<div class="basic-filter-action" v-if="filterChanged">
				<div class="grid basic-filter-action__grid">
					<div class="col basic-filter-action__grid-item hidden-sm col-lg-12">
						<button type="button" class="btn btn--block" @click="clearFilter()">
							<span class="btn__inner">Сбросить фильтр</span>
						</button>
					</div>
					<div class="col basic-filter-action__grid-item hidden visible-sm-if col-lg-12">
						<button type="button" class="btn btn--block btn--primary basic-filter-action__show-btn" @click="applyFilter()">
							<span class="btn__inner">Показать <small v-if="resultsCount || resultsCount === 0">
									(результатов: {{resultsCount}})
								</small>
							</span>
						</button>
					</div>
					<div class="col basic-filter-action__grid-item hidden visible-sm-if col-lg-12">
						<button type="button" class="btn btn--block" @click="clearFilter()">
							<span class="btn__inner">Сбросить фильтр</span>
						</button>
					</div>
				</div>
			</div>
		</transition>

		<div class="basic-filter__banners">
			<div class="basic-filter__banner basic-filter-action__grid-item" v-if="bannerImage">
				<a :href="bannerLink" class="basic-filter__banner-link">
					<img :src="bannerImage" alt="">
				</a>
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!rich-text-input/component', 'vue!slider-input/component'], function (Model) {
		Vue.component('basic-filter', {
			template: template,

			data: function () {
				return {
					localFilters: [],
					localLinks: [],
					lastUpdatedFilterName: null
				}
			},

			props: {
				value: {
					default: null
				},
				links: {
					default: null
				},
				showFilterTypes: {
					default: []
				},
				locked: {
					default: false
				},
				notFollowLinks: {
					type: Boolean,
					default: false
				},
				resultsCount: {
					default: null
				},
				bannerLink: {
					default: null
				},
				bannerImage: {
					default: null
				}
			},

			watch: {
				value: function (newValue, oldValue) {
					var inst = this;

					_.each(inst.localFilters, function (filter, index) {
						if (!filter)
							return;
						if (typeof _.findWhere(newValue, {name: filter.name}) == 'undefined') {
							inst.localFilters.splice(index, 1);
						}
					});

					_.each(newValue, function (filter, index) {
						if (typeof _.findWhere(inst.localFilters, {name: filter.name}) == 'undefined') {
							inst.localFilters.push({
								name: filter.name,
								open: true
							});
						}
					});
				},

				links: function (newValue, oldValue) {
					var inst = this;

					_.each(inst.localLinks, function (filter, index) {
						if (typeof _.findWhere(newValue, {name: filter.name}) == 'undefined') {
							inst.localLinks.splice(index, 1);
						}
					});

					_.each(newValue, function (filter, index) {
						if (typeof _.findWhere(inst.localLinks, {name: filter.name}) == 'undefined') {
							inst.localLinks.push({
								name: filter.name,
								open: true
							});
						}
					});
				},
			},

			computed: {
				filterChanged: function () {
					return !!_.find(this.value, function (filter) {
						return !!_.find(filter.options, function (option) {
							if (option.type == 'checkbox' || option.type == 'checkbox-img' || option.type == 'radio' || option.type == 'color') {
								if (option.checked)
									return true;
							}
							if (option.type == 'range' || option.type == 'slider') {
								if (typeof option.valueMin !== 'undefined' && typeof option.min !== 'undefined' && option.valueMin != option.min)
									return true;
								if (typeof option.valueMax !== 'undefined' && typeof option.max !== 'undefined' && option.valueMax != option.max)
									return true;
								if (typeof option.value !== 'undefined' && typeof option.min !== 'undefined' && option.value != option.min)
									return true;
							}
							return false;
						});
					});
				}
			},

			methods: {
				slideDown: function (element, done) {
					var el = $(element);
					el.hide().addClass('sliding-down').removeClass('sliding-up').slideDown(300, function () {
						el.removeClass('sliding-down');
						done();
					});
				},

				slideUp: function (element, done) {
					var el = $(element);
					el.show().addClass('sliding-up').removeClass('sliding-down').slideUp(300, function () {
						el.removeClass('sliding-up');
						done();
					});
				},

				toggleFilter: function (event, filter) {
					if ($(event.target).closest('a').length)
						return;

					var localFilter = _.findWhere(this.localFilters, {name: filter.name}) || _.findWhere(this.localLinks, {name: filter.name});

					if (localFilter) {
						localFilter.open = !localFilter.open;
						this.$forceUpdate();
					}
				},

				toggleFilterMaxState: function (filter) {
					var localFilter = _.findWhere(this.localFilters, {name: filter.name}) || _.findWhere(this.localLinks, {name: filter.name});

					if (localFilter) {
						localFilter.maximized = !localFilter.maximized;
						this.$forceUpdate();
					}
				},

				isFilterOpen: function (filter) {
					var localFilter = _.findWhere(this.localFilters, {name: filter.name}) || _.findWhere(this.localLinks, {name: filter.name});

					return localFilter ? (localFilter.open || localFilter == 'boolean') : false;
				},

				isFilterMaximized: function (filter) {
					var localFilter = _.findWhere(this.localFilters, {name: filter.name}) || _.findWhere(this.localLinks, {name: filter.name});

					return localFilter ? (localFilter.maximized || localFilter == 'boolean') : false;
				},

				isFilterEmpty: function (filter) {
					if (filter.type != 'checkbox' && filter.type != 'checkbox-img' && filter.type != 'radio' && filter.type != 'color')
						return false;

					return !_.find(filter.options, function (option) {
						return typeof option.count == 'undefined' || option.count > 0;
					});
				},

				isFilterLocked: function (filter) {
					return this.locked || this.lastUpdatedFilterName && this.lastUpdatedFilterName !== filter.name
				},

				filterOptionsOverflowCount: function (filter) {
					if (!filter.openCount)
						return 0;

					var count = 0;

					_.each(filter.options, function (testOption) {
						if (typeof testOption.count !== 'undefined' && testOption.count > 0)
							count++;
					});

					return Math.max(0, count - filter.openCount);
				},

				isOptionWithinLimits: function (filter, option) {
					if (!filter.openCount)
						return true;

					var count = 0, index = 0;
					var indexToTest = _.findIndex(filter.options, option);

					if (indexToTest < filter.openCount)
						return true;

					return !!_.find(filter.options, function (testOption) {
						index++;
						if (typeof testOption.count !== 'undefined' && testOption.count > 0)
							count++;

						if (count < filter.openCount && indexToTest < count)
							return true;
					});
				},
                selectOption: function(filter, option){
				    for(var index in filter.options){
                        filter.options[index]["checked"]=false;}
                        option['checked']=true;
					this.filterChange(filter)
				},

				filterChange: function (filter) {
					this.lastUpdatedFilterName = filter.name;
					this.$emit('filterChange', this.value, filter.name, this.filterChanged);
				},

				clearFilter: function (silent) {
					var inst = this;
					_.each(this.value, function (filter) {
						_.each(filter.options, function (option) {
							if (option.type == 'checkbox' || option.type == 'checkbox-img' || option.type == 'radio' || option.type == 'color') {
								option.checked = false;
							}
							if (option.type == 'range' || option.type == 'slider') {
								try {
									option.valueMin = option.min;
									option.valueMax = option.max;
									//if(typeof option.value !== 'undefined') option.value = option.min;
								} catch (e) {

								}
							}
						});
					});

					if (!silent)
						this.$emit('filterChange', this.value, null);
				},

				applyFilter: function () {
					View.control.closeCatalogFilter();
					$('html, body').animate({scrollTop: 0}, 500);
				},

				linkClick: function (event, link) {
					if (this.notFollowLinks) {
						event.preventDefault();
						this.$emit('linkClick', link);
					}
				}
			},

			mounted: function () {
				this.localLinks = this.links;
				this.localFilters = this.value;
				console.log(this);
			},

			created: function () {
				var inst = this;
				this.$on('filterReloaded', function () {
					inst.lastUpdatedFilterName = null;
				});

				this.$on('resetRequired', function (options) {
					inst.clearFilter();
				});
			}
		});
	});
</script>