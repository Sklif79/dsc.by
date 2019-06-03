<template>

    <transition name="content-fade" mode="out-in">
        <div class="not-found-block" v-if="!filterIsSet && !storeIsSet && !products.length">
            <div class="not-found-block__text text-guide" v-if="!favList">
                Не найдено ни одного товара
            </div>
            <div class="not-found-block__text text-guide" v-else>
                <p>У Вас нет товаров, добавленных в раздел Избранное.</p>
                <p>Пожалуйста, перейдите в каталог и, кликнув на
                    <svg class="svg-icon svg-icon--20 c-primary" style="margin: 0 6px;">
                        <use xlink:href="#svg-icon-fav"></use>
                    </svg>
                    , добавьте желаемые товары в список избранных.
                </p>
            </div>
            <div class="not-found-block__action flc">
                <a href="/catalog/" class="btn btn--red"><span class="btn__inner">Перейти в каталог</span></a>
            </div>
        </div>


        <div class="layout" v-else>


            <aside class="layout__aside" v-if="showAside">
                <div class="layout__aside-panel" v-sticky="20">
                    <folded-menu-header slot="top" name="Фильтр" close close-all></folded-menu-header>
                    <basic-filter ref="basicFilter" v-model="filters"
                                  :locked="waitingForFilter"
                                  :links="sections"
                                  :not-follow-links="false"
                                  :show-filter-types="['link', 'checkbox', 'checkbox-img', 'radio', 'color', 'range', 'slider', 'boolean']"
                                  :results-count="pages.count ? pages.count - removedProductsCount : 0"
                                  :banner-link="banner.link"
                                  :banner-image="banner.image"
                                  @filterChange="filtersUpdated"
                                  @linkClick="sectionUpdated"></basic-filter>
                </div>
                <div class="sticky-helper"></div>
            </aside>
            <div class="layout__main">
                <div class="page-title-block">
                    <div class="container">
                        <div class="catalog-list-main__top-box"> 
                            <h1 class="page-title" v-html="title_custom"></h1>
                            <div class="catalog-top-params">
                                <button type="button" class="catalog-top-params__main-btn panel-btn bf-open js-bf-open">

                                    <span class="panel-btn__inner">Фильтр</span>

                                </button>
                                <div class="catalog-top-params__main js-dropdown">
                                    <button type="button" class="catalog-top-params__main-btn panel-btn js-dropdown__btn">
                                        <svg class="panel-btn__icon panel-btn__icon--left svg-icon svg-icon--20">
                                            <use xlink:href="#svg-icon-sort"></use>
                                        </svg>
                                        <span class="panel-btn__inner">Сортировка</span>
                                        <svg class="panel-btn__icon panel-btn__icon--right panel-btn__icon--dd-arrow svg-icon svg-icon--dd-arrow">
                                            <use xlink:href="#svg-icon-dd-arrow"></use>
                                        </svg>
                                    </button>
                                    <div class="catalog-top-params__params js-dropdown__body">
                                        <div class="catalog-top-params__grid">
                                            <div class="catalog-top-params__item catalog-top-params__item--shops">
                                            </div>
                                            <div class="catalog-top-params__item catalog-top-params__item--sort" v-if="sortFilter">
                                                <select-input :options="sortFilter.options" block lite size="sm"
                                                              placeholder="Сортировка" v-model="sortFilter.value"
                                                              @input="sortFilterUpdated"></select-input>
                                            </div>
                                            <div class="catalog-top-params__item catalog-top-params__item--view"
                                                 v-if="viewModes.length > 1">
                                                <div class="radio-toggle-group">
                                                    <label class="radio-toggle-group__item radio-toggle"
                                                           v-for="viewMode in viewModes">
                                                        <input type="radio" class="radio-toggle__input" :value="viewMode"
                                                               v-model="currentViewMode" @change="viewModeUpdated">
                                                        <span class="radio-toggle__visual btn btn--sq btn--sm">
												<span class="btn__inner">
													<svg class="radio-toggle__visual-icon svg-icon">
													<use :xlink:href="'#svg-icon-view-mode-' + viewMode"></use>
													</svg>
												</span>
											</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <section class="floor floor--closer flc text-guide" v-if="topText">
                    <div class="content-crop content-crop--md content-crop--decorated content-cropped" v-content-crop>
                        <div class="content-crop-container js-v-content-crop-container" v-html="topText"></div>
                        <div class="content-crop-action">
                            <button type="button"
                                    class="btn btn--sm content-crop-action__close js-v-content-crop-toggle">
                                <span class="btn__inner">Свернуть</span>
                            </button>
                            <button type="button"
                                    class="btn btn--sm content-crop-action__open js-v-content-crop-toggle">
                                <span class="btn__inner">Развернуть</span>
                            </button>
                        </div>
                    </div>
                </section>




                <transition @enter="slideDown" @leave="slideUp">
                    <div class="active-filters-block flc" v-if="activeFilterOptions.length">
                        <div class="active-filters">
                            <div class="active-filters__group" v-for="filter in activeFilterOptions">
								<!--<span class="active-filters__group-name"
                                      v-if="filter.title && filter.type != 'boolean'">
									<span class="active-filters__group-name-txt">{{filter.title}}</span>
								</span>-->
                                <div class="active-filters__group-items">
                                    <transition-group tag="div" name="content-scale"
                                                      class="active-filters__group-items-grid">
                                        <div class="active-filters__item" v-for="item in filter.options"
                                             :key="item.option.name || item.option.nameMin || item.option.nameMax">
                                            <!--btn btn&#45;&#45;sm-->
                                            <button class="btn--filter btn--filter-remove" type="button"
                                                    @click="unsetFilterOption(item.option);">
                                                <span class="btn__inner">{{filter.type != 'boolean' ? item.option.title || item.title : filter.title}}</span>
                                                <svg class="btn__icon btn__icon--right svg-icon svg-icon--10">
                                                    <use xlink:href="#svg-icon-close"></use>
                                                </svg>
                                            </button>
                                        </div>
                                    </transition-group>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <transition name="content-fade" mode="out-in">

                    <catalog-grid key="grid" :products="products"   v-if="products.length && currentViewMode == 'grid'"
                                  :loading="loading"></catalog-grid>
                    <catalog-price-ext key="price-ext" :products="products"
                                       v-else-if="products.length && currentViewMode == 'price-ext'"
                                       :loading="loading" ></catalog-price-ext>
                    <catalog-list key="list" :products="products"
                                  v-else-if="products.length && currentViewMode == 'list'"
                                  :loading="loading"></catalog-list>
                    <catalog-price key="price" :offers="offers"
                                   v-else-if="products.length && currentViewMode == 'price'" :loading="loading"
                                   :columns="productTableColumns"></catalog-price>


                    <div class="not-found-block not-found-block--inside" v-else>
                        <div class="not-found-block__text text-guide">
                            Не найдено ни одного товара
                        </div>
                        <div class="not-found-block__action flc" v-if="filterIsSet || storeIsSet">
                            <button type="button" class="btn btn--red" @click="resetAllFilters">
                                <span class="btn__inner">Сбросить фильтр</span>
                            </button>
                        </div>
                    </div>
                </transition>

                <page-nav v-if="pages.count > pages.limit"
                          :loading="loading"
                          :show-more="showPageNavMore"
                          :show-pages="showPageNavPages"
                          :show-prev-arrow="showPageNavPages"
                          :show-next-arrow="showPageNavPages"
                          :base-url="dataSource"
                          :count="pages.count"
                          :limit="pages.limit"
                          :offset="pages.offset"
                          @more="loadMore"
                          @goto="goToPage"></page-nav>

                <section class="floor floor--closer flc text-guide" v-if="bottomText">
                    <div class="content-crop content-crop--md content-crop--decorated content-cropped" v-content-crop>
                        <div class="content-crop-container js-v-content-crop-container" v-html="bottomText"></div>
                        <div class="content-crop-action">
                            <button type="button"
                                    class="btn btn--sm content-crop-action__close js-v-content-crop-toggle">
                                <span class="btn__inner">Свернуть</span>
                            </button>
                            <button type="button"
                                    class="btn btn--sm content-crop-action__open js-v-content-crop-toggle">
                                <span class="btn__inner">Развернуть</span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </transition>

</template>


<script>
    define(['Model', 'vue!catalog-price-ext/component', 'vue!folded-menu-header/component', 'vue!page-nav/component', 'vue!catalog-grid/component', 'vue!select-input/component', 'vue!basic-filter/component'], function (Model) {
        Vue.component('catalog-list-main', {
            template: template,
            data: function () {
                return {
                    products: [],
                    filters: [],
                    stores: [],
                    sorts: [],
                    pages: [],
                    sections: [],
                    currentViewMode: null,
                    viewModes: ['price-ext', 'grid'],
                    currentPage: 1,
                    incompare: 1,
                    topParamsOpen: false,
                    topText: null,
                    bottomText: null,
                    initialStateLoaded: false,
                    filtersSubmitTimeout: null,
                    filterIsSet: false,
                    storeIsSet: false,
                    waitingFilterName: null,
                    waitingForFilter: false,
                    currentUrl: window.location,
                    loading: false,
                    removedProductsCount: 0,
                    banner: {
                            link:null,
                            image: null
                        },
                }
            },
            props: {
                title_custom: {
                    default: null
                },
                showAside: {
                    default: 1
                },
                dataSource: {
                    default: null
                },
                staticDataSource: {
                    default: null
                },
                bxajaxid: {
                    default: null
                },
                favList: {
                    default: false
                },
                showPageNavMore: {
                    type: Boolean,
                    default: true
                },
                showPageNavPages: {
                    type: Boolean,
                    default: true
                },

            },
            computed: {
                shopFilter: function () {
                    if (this.stores)
                        return this.stores[0] || null;
                    else
                        return null;
                },
                sortFilter: function () {
                    if (this.sorts)
                        return this.sorts[0] || null;
                    else
                        return null;
                },
                activeFilterOptions: function () {
                    var inst = this;
                    var result = [];
                    var activeOptionsInFilter = [];

                    _.each(inst.filters, function (filter) {
                        activeOptionsInFilter = [];

                        _.each(filter.options, function (option) {
                            if (filter.type == 'range' || filter.type == 'slider') {
                                if (typeof option.valueMin !== 'undefined' && typeof option.min !== 'undefined' && option.valueMin != option.min ||
                                    typeof option.valueMax !== 'undefined' && typeof option.max !== 'undefined' && option.valueMax != option.max ||
                                    typeof option.value !== 'undefined' && typeof option.max !== 'undefined' && option.value != option.max) {

                                    var title = filter.title;
                                    if (typeof option.valueMin !== 'undefined')
                                        title += ' ' + (option.prefixMin || '') + ' ' +
                                            (option.price ? Model.formatPrice(option.valueMin) : Model.formatFloat(option.valueMin)) + ' ' +
                                            (option.postfixMin || '');
                                    if (typeof option.valueMax !== 'undefined')
                                        title += ' ' + (option.prefixMax || '') + ' ' +
                                            (option.price ? Model.formatPrice(option.valueMax) : Model.formatFloat(option.valueMax)) + ' ' +
                                            (option.postfixMax || '');
                                    if (typeof option.value !== 'undefined')
                                        title += ' ' + (option.prefixMin || '') + ' ' +
                                            (option.price ? Model.formatPrice(option.value) : Model.formatFloat(option.value)) + ' ' +
                                            (option.postfixMin || '');
                                    activeOptionsInFilter.push({
                                        title: title,
                                        option: option
                                    });
                                }
                            }
                            if (filter.type == 'checkbox' || filter.type == 'checkbox-img' || filter.type == 'radio' || filter.type == 'color' || filter.type == 'boolean')
                                if (option.checked)
                                    activeOptionsInFilter.push({
                                        title: filter.title,
                                        option: option
                                    });
                        });

                        if (activeOptionsInFilter.length)
                            result.push({
                                title: filter.title,
                                type: filter.type,
                                options: activeOptionsInFilter
                            });

                    });
                    return result;
                }
            },
            methods: {
                slideDown: function (element, done) {
                    var el = $(element);
                    var speed = Math.min(el.outerHeight() * 2.5, 300);
                    el.hide().slideDown(speed, done);
                },
                slideUp: function (element, done) {
                    var el = $(element);
                    el.show().slideUp(Math.min(el.outerHeight() * 2.5, 300), done);
                },
                loadMore: function () {
                    var inst = this;
                    inst.reloadProducts(
                        this.currentUrl,
                        {
                            bxajaxid: inst.bxajaxid,
                            offset: inst.pages.offset + inst.pages.limit,
                            limit: inst.pages.limit,
                            viewMode: inst.currentViewMode
                        },
                        {
                            append: true
                        }
                    );
                    inst.pages.offset += inst.pages.limit;
                },
                goToPage: function (page) {
                    var inst = this;
                    console.log('goin to page', page);
                    inst.reloadProducts(
                        this.currentUrl,
                        {
                            bxajaxid: inst.bxajaxid,
                            offset: (page - 1) * inst.pages.limit,
                            limit: inst.pages.limit,
                            viewMode: inst.currentViewMode
                        }
                    );
                    inst.pages.offset = (page - 1) * inst.pages.limit;
                },
                toggleTopParams: function () {
                    this.topParamsOpen = !this.topParamsOpen;
                },
                shopFilterUpdated: function () {
                    var inst = this;
                    inst.reloadProducts(
                        inst.currentUrl,
                        {
                            bxajaxid: inst.bxajaxid,
                            stores: inst.stores,
                            viewMode: inst.currentViewMode
                        }
                    );
                    inst.storeIsSet = inst.shopFilter.value != 0;
                },
                sortFilterUpdated: function () {
                    var inst = this;
                    var newSortUrl = _.findWhere(inst.sortFilter.options, {value: inst.sortFilter.value});
                    if (!newSortUrl)
                        return;
                    newSortUrl = newSortUrl.link;
                    inst.currentUrl = newSortUrl;
                    inst.reloadProducts(
                        newSortUrl,
                        {
                            bxajaxid: inst.bxajaxid,
                            filters: inst.filters,
                            viewMode: inst.currentViewMode
                        }
                    );
                },
                filtersUpdated: function (value, filterName, filterIsSet) {
                    var inst = this;
                    this.filterIsSet = filterIsSet;

                    clearTimeout(this.filtersSubmitTimeout);
                    if (!inst.waitingFilterName || inst.waitingFilterName == filterName)
                        this.filtersSubmitTimeout = setTimeout(submitFilter, 1250);
                    else
                        submitFilter();

                    inst.waitingFilterName = filterName;

                    function submitFilter() {
                        inst.waitingForFilter = true;
                        inst.reloadProducts(
                            inst.dataSource,
                            {
                                bxajaxid: inst.bxajaxid,
                                filters: inst.filters,
                                viewMode: inst.currentViewMode
                            },
                            {
                                callback: function () {
                                    inst.waitingFilterName = null;
                                    inst.waitingForFilter = false;
                                }
                            }
                        );
                    }
                },
                viewModeUpdated: function () {
                    var inst = this;

                    this.reloadProducts(inst.dataSource,
                        {
                            bxajaxid: inst.bxajaxid,
                            viewMode: inst.currentViewMode
                        }
                    )

                },
                sectionUpdated: function (link) {
                    var inst = this;
                    inst.currentUrl = link;
                    inst.reloadProducts(
                        inst.currentUrl,
                        {
                            bxajaxid: inst.bxajaxid
                        }
                    );
                },
                reloadProducts: function (url, data, options) {
                    var inst = this;
                    inst.loading = true;
                    $.post({
                        url: url,
                        data: data,
                        dataType: 'json'
                    })
                        .done(function (response) {
                            console.log('catalog list main reloadProducts success', response)
                            inst.filters = response.filters;
                            inst.shops = response.shops;
                            inst.sorts = response.sorts;
                            inst.sections = response.sections;
                            inst.pages = response.pages;
                            inst.pages.offset = parseInt(inst.pages.offset)
                            inst.pages.limit = parseInt(inst.pages.limit)
                            inst.pages.count = parseInt(inst.pages.count)
                            inst.removedProductsCount = 0;
                            if (options && options.append) {
                                inst.products.push.apply(inst.products, response.products);
                            } else {
                                inst.products = response.products;
                                var offsetElement = $(inst.$el).find('.catalog-top-params, .catalog-list').first();
                                if (offsetElement.length)
                                    $('html, body').animate({scrollTop: window.innerWidth >= View.breakpoints['sm-min'] ? offsetElement.offset().top - 30 : 0}, 500);
                            }

                            if (response.dataSourceHistory) {
                                inst.currentUrl = response.dataSourceHistory;
                            } else if (response.dataSource) {
                                inst.currentUrl = response.dataSource;
                                inst.dataSource = response.dataSource;
                                if (inst.pages.offset)
                                    inst.currentUrl += '?offset=' + inst.pages.offset + '&limit=' + inst.pages.limit;
                            }
                             
                            if (response.dataSourceHistory || response.dataSource) {
                                history.pushState({}, null, inst.currentUrl);
                            } 

                            if (options && typeof options.callback == 'function')
                                options.callback();
                            inst.loading = false;
                            inst.$refs.basicFilter.$emit('filterReloaded');
                        })
                        .fail(function (response) {
                            console.log('catalog list main reloadProducts failed', response)
                            inst.loading = false;
                        });
                },
                unsetFilterOption: function (option) {
                    if (typeof option.checked != 'undefined')
                        option.checked = false;
                    if (typeof option.valueMax != 'undefined' && option.max != 'undefined')
                        option.valueMax = option.max;
                    if (typeof option.valueMin != 'undefined' && option.min != 'undefined')
                        option.valueMin = option.min;
                    this.filtersUpdated();
                },
                resetAllFilters: function () {
                    var inst = this;
                    if (inst.shopFilter)
                        inst.shopFilter.value = 0;
                    inst.$refs.basicFilter.$emit('resetRequired');
                },

            },
            mounted: function () {

                var inst = this;
                if (inst.staticDataSource) {
                    inst.products = inst.staticDataSource.products || [];
                    inst.banner = inst.staticDataSource.banner || [];
                    inst.filters = inst.staticDataSource.filters || [];
                    inst.stores = inst.staticDataSource.stores || [];
                    inst.sorts = inst.staticDataSource.sorts || [];
                    inst.pages = inst.staticDataSource.pages || {count: null, limit: null, offset: null};
                    inst.pages.count = parseInt(inst.pages.count);
                    inst.pages.limit = parseInt(inst.pages.limit);
                    inst.pages.offset = parseInt(inst.pages.offset);
                    inst.sections = inst.staticDataSource.sections || [];
                    inst.currentPage = inst.staticDataSource.currentPage || 1;
                    inst.topText = inst.staticDataSource.topText || null;
                    inst.bottomText = inst.staticDataSource.bottomText || null;
                    inst.currentViewMode = inst.staticDataSource.currentViewMode || inst.viewModes[0];
                    inst.initialStateLoaded = true;
                    inst.storeIsSet = inst.shopFilter && inst.shopFilter.value != 0;
                }
                inst.currentUrl = inst.dataSource || window.location;
                // синхронизация списка избранного с товарами (если каталог в данном случае выводит список избранного)
                if (inst.favList) {
                    Model.$on('favoritesUpdated', function () {
                        var index = 0;
                        _.each(inst.products, function (product) {
                            if (!product)
                                return;
                            var found = _.find(Model.favorites.productIds, function (id) {
                                return id == product.productId
                            });
                            if (!found) {
                                inst.products.splice(index, 1);
                                inst.removedProductsCount++;
                            } else {
                                index++;
                            }
                        });
                    });
                }
            },
        });
    });
</script>