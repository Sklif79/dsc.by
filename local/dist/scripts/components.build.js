function makeReactiveModal(e) {
    require(["Model", "vue!page-header/page-header", "vue!page-header-top/component", "vue!page-header-top-item/component", "vue!page-header-main/component", "vue!page-header-main-2/component", "vue!page-header-main-3/component", "vue!availability-sm/component", "vue!top-search/component", "vue!wishlist-sm/component", "vue!basket-sm/component", "vue!basket-action/component", "vue!basket-action-success/component", "vue!basket-full/component", "vue!checkout-main/component", "vue!dropdown/component", "vue!city-select/component", "vue!sign-sm/component", "vue!rating-block/component", "vue!product/component", "vue!product-in-checkout/component", "vue!product-detailed/component", "vue!product-price-ext/component", "vue!product-table/component", "vue!product-table-row/component", "vue!subscription/component", "vue!number-input/component", "vue!slider-input/component", "vue!select-input/component", "vue!file-input/component", "vue!rich-text-input/component", "vue!rich-text-input-checkout/component", "vue!rich-form/component", "vue!rich-form-row/component", "vue!fav-btn/component", "vue!auth-register-form/component", "vue!form-call-request/component", "vue!form-message/component", "vue!form-city-select/component", "vue!form-product-subscribe/component", "vue!form-review/component", "vue!recently-viewed/component", "vue!slick/component", "vue!slide/component", "vue!slider-brands/component", "vue!slider-products/component", "vue!slider-related-products/component", "vue!generic-tabs/component", "vue!generic-tab/component", "vue!user-reviews/component", "vue!catalog-item-3/component", "vue!top-banner/component", "vue!image-gallery/component", "vue!catalog-list-main/component", "vue!catalog-grid/component", "vue!catalog-list/component", "vue!catalog-price/component", "vue!catalog-price-ext/component", "vue!basic-filter/component", "vue!page-nav/component", "vue!shop-list/component", "vue!shop-list-full/component", "vue!folded-menu-header/component", "vue!modal/component", "vue!yandex-map/component", "vue!yandex-map-marker/component", "vue!small-countdown/component", "vue!present-grid/component", "vue!system-message/component", "vue!order-history/component", "vue!subscribe/component", "vue!catalog-grid-expand/component", "vue!reviews-slider/component", "vue!reviews-slide/component", "vue!accordion-group/component", "vue!accordion-block/component", "vue!cache-obj/cache-obj", "vue!noindex/component"], function () {
        new Vue({
            el: "modal", mounted: function () {
                "function" == typeof e && e()
            }
        })
    })
}

define("vue", ["module"], function (n) {
    "use strict";
    var l = null, r = {isBuild: !1, currentImport: ""}, c = {};
    if ("undefined" != typeof window && window.document) {
        if ("undefined" == typeof XMLHttpRequest) throw new Error("XMLHttpRequest not available");
        l = function (e, t) {
            var i = new XMLHttpRequest;
            i.open("GET", e, !0), i.onreadystatechange = function () {
                4 === i.readyState && this.status < 400 && t(i.responseText)
            }, i.send()
        }
    } else {
        var o = require.nodeRequire("fs");
        if (!o || !o.readFileSync) throw new Error(n.id + ": Unsupported platform");
        l = function (t, e) {
            try {
                var i = o.readFileSync(t, "utf8");
                "\ufeff" === i[0] && (i = i.substring(1)), e(i)
            } catch (e) {
                throw new Error(n.id + ": Can not load file " + t)
            }
        }
    }
    var t = {
        _wrapped_content: function (e, t, i) {
            i = i || {whitespaces: !1};
            var o = e.indexOf("<" + t);
            if (o < 0) return "";
            o = e.indexOf(">", o) + 1;
            var s = e.indexOf("</" + t + ">", o);
            return i.lastIndex && (s = e.lastIndexOf("</" + t + ">")), e = e.substring(o, s), i.whitespaces || (e = e.replace(/\n/g, " ").replace(/\s{2,}/g, " ")), i.escape && (e = e.replace(/(['\\])/g, "\\$1")), e
        }, cleanup: function (e) {
            return e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/, "")
        }, template: function (e) {
            var t, i = e.indexOf("<template");
            if (i < 0) return "";
            if (/^<template\s+lang="(pug|jade)"/.test(e.substring(i))) if (n.config().pug) {
                var o = require(n.config().pug);
                t = this._wrapped_content(e, "template", {lastIndex: !0, escape: !1, whitespaces: !0}), t = o.render(t)
            } else console.warn(n.id + ": missing `pug` in module config"); else t = this._wrapped_content(e, "template", {
                lastIndex: !0,
                escape: !0
            }).trim();
            return t
        }, style: function (e) {
            return this._wrapped_content(e, "style")
        }, script: function (e) {
            return this._wrapped_content(e, "script", {whitespaces: !0})
        }
    }, d = function (e) {
        return e = t.cleanup(e), function (e) {
            if (e && e.trim().length && !r.isBuild && "undefined" != typeof document) {
                var t = n.config().css || "inject";
                if ("inject" === t) {
                    var i = document.createElement("style");
                    i.type = "text/css", i.appendChild(document.createTextNode(e)), document.body.appendChild(i)
                } else "skip" === t || "function" == typeof t && t(e, {name: r.currentImport})
            }
        }(t.style(e)), "(function(" + (n.config().templateVar || "template") + "){" + t.script(e) + "})('" + t.template(e) + "');"
    };
    return {
        version: "1.1.5", load: function (i, e, o, t) {
            r.isBuild = !!t.isBuild;
            var s = (r.currentImport = i) + (/\.(vue|html)$/.test(i) ? "" : ".vue"), a = e.toUrl(s);
            l(a, function (e) {
                var t = d(e);
                c[i] = t;
                try {
                    o.fromText(t)
                } catch (e) {
                    "undefined" != typeof console && (console.warn(n.id + ": can not load module; check for typos in component", a), console.error(e))
                }
            })
        }, write: function (e, t, i) {
            c.hasOwnProperty(t) && i.asModule(e + "!" + t, c[t])
        }
    }
}), define("vue!page-header/page-header", ["Model", "app"], function (e, t) {
    Vue.component("page-header", {
        template: '<header class="page-header" :class="{\'page-header--checkout\': type == \'checkout\'}"> <slot name="top"></slot> <slot name="main"></slot> <slot name="nav"></slot> </header>',
        props: {type: {default: null}}
    })
}), define("vue!page-header-top/component", [], function () {
    Vue.component("page-header-top", {
        template: '<nav class="page-header-top js-page-header-top"> <div class="container"> <div class="page-header-top__row" v-if="dwidth>992"> <slot name="top"></slot> <slot name="left" ></slot> <div class="page-header-top__cell page-header-top__cell--expand"></div> <slot name="right"></slot> </div> <div class="page-header-top__row-mobile" v-else> <slot name="mob_nav" ></slot> </div> </div> </nav>',
        data: function () {
            return {dwidth: 0}
        },
        created: function () {
            var e = this;
            $(window).resize(function () {
                e.dwidth = $(window).width(), console.log(e.dwidth)
            })
        },
        mounted: function () {
            this.dwidth = $(window).width()
        }
    })
}), define("vue!page-header-top-item/component", ["app"], function (e) {
    Vue.component("page-header-top-item", {
        template: '<div class="page-header-top__cell" :class="{\'page-header-top__cell--menu\': topMenuTrigger, \'page-header-top__cell--search\': topSearchTrigger}"> <div class="page-header-top-item" :class="{\'js-dropdown dropdown-owner dropdown-arrow-owner\': $slots.dropdown}"> <a :href="link" class="page-header-top-item__btn" :class="{\'page-header-top-item__btn--static\': !$slots.dropdown && !link, \'js-dropdown__btn\': $slots.dropdown, \'page-header-top-item__btn--menu js-open-main-menu-nav\': topMenuTrigger, \'page-header-top-item__btn--search js-open-folded-top-search\': topSearchTrigger}"> <div class="page-header-top-item__icon" v-if="icon"> <svg class="page-header-top-item__svg-icon svg-icon svg-icon--35"> <use :xlink:href="\'#\' + icon"></use> </svg> </div> <div class="page-header-top-item__name" v-if="name || $slots.name"> {{name}} <slot name="name"></slot> <span class="page-header-top-item__value" v-if="value">&nbsp;{{value}}</span> </div> <div class="page-header-top-item__arrow" v-if="$slots.dropdown"> <svg class="page-header-top-item__svg-icon svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </div> </a> <slot name="dropdown"></slot> </div> </div>',
        props: {
            icon: {default: null},
            name: {default: null},
            value: {default: null},
            link: {default: null},
            topMenuTrigger: {type: Boolean, default: !1},
            topSearchTrigger: {type: Boolean, default: !1}
        }
    })
}), define("vue!page-header-main/component", ["app"], function (e) {
    Vue.component("page-header-main", {template: '<div class="page-header-main"> <div class="container"> <div class="page-header-main__row"> <div class="page-header-main__cell page-header-main__cell--menu-btn"> <button type="button" class="menu-btn js-open-main-menu"> <span class="menu-btn__part menu-btn__part--1"></span> <span class="menu-btn__part menu-btn__part--2"></span> <span class="menu-btn__part menu-btn__part--3"></span> </button> </div> <div class="page-header-main__cell page-header-main__cell--logo"> <slot name="logo"></slot> </div> <div class="page-header-main__cell page-header-main__cell--search" v-if="$slots[\'search\']"> <slot name="search"></slot> </div> <div class="page-header-main__cell" v-if="$slots[\'right-1\']"> <slot name="right-1"></slot> </div> <div class="page-header-main__cell" v-if="$slots[\'right-2\']"> <slot name="right-2"></slot> </div> </div> </div> </div>'})
}), define("vue!page-header-main-2/component", ["app"], function (e) {
    Vue.component("page-header-main-2", {
        template: '<div class="page-header-main page-header-main--2"> <div class="container"> <div class="page-header-main__row"> <div class="page-header-main__cell page-header-main__cell--c-left"> <div class="page-header-main__cell page-header-main__cell--menu-btn"> <button type="button" class="menu-btn js-open-main-menu"> <span class="menu-btn__part menu-btn__part--1"></span> <span class="menu-btn__part menu-btn__part--2"></span> <span class="menu-btn__part menu-btn__part--3"></span> </button> </div> <div class="page-header-main__cell page-header-main__cell--search" v-if="$slots[\'search\']"> <slot name="search"></slot> </div> </div> <div class="page-header-main__cell page-header-main__cell--c-middle"> <slot name="logo"></slot> </div> <div class="page-header-main__cell page-header-main__cell--c-right"> <div class="page-header-main__cell" v-if="$slots[\'right-1\']"> <slot name="right-1"></slot> </div> <div class="page-header-main__cell" v-if="$slots[\'right-2\']"> <slot name="right-2"></slot> </div> <div class="page-header-main__cell" v-if="$slots[\'right-3\']"> <slot name="right-3"></slot> </div> </div> </div> </div> </div>',
        props: {mode: {default: null}}
    })
}), define("vue!page-header-main-3/component", ["app"], function (e) {
    Vue.component("page-header-main-3", {
        template: '<div class="page-header-main page-header-main--3"> <div class="container"> <div class="page-header-main__logo-block"> <slot name="logo"></slot> </div> </div> </div>',
        props: {mode: {default: null}}
    })
}), define("vue!availability-sm/component", ["Model"], function (e) {
    Vue.component("availability-sm", {
        template: '<div class="availability-sm" :class="className"> <div class="availability-sm__icon" v-if="!noIcon"> <svg class="svg-icon" v-if="delivery"><use xlink:href="#svg-icon-delivery"></use></svg> <svg class="svg-icon" v-else-if="time"><use xlink:href="#svg-icon-time"></use></svg> <svg class="svg-icon" v-else-if="check"><use xlink:href="#svg-icon-check"></use></svg> </div> <div class="availability-sm__text" v-if="text"> {{text}} <span v-if="deliveryDays">{{deliveryDays}} дней</span> </div> </div>',
        props: {
            value: {default: 0},
            text: {default: null},
            delivery: {type: Boolean, default: !1},
            deliveryDays: {default: !1},
            time: {type: Boolean, default: !1},
            check: {type: Boolean, default: !1},
            info: {type: Boolean, default: !1},
            noIcon: {type: Boolean, default: !1},
            size: {default: null}
        },
        computed: {
            className: function () {
                var e = ["availability-sm--" + this.value];
                return this.delivery && e.push("availability-sm--delivery"), this.time && e.push("availability-sm--time"), this.time && e.push("availability-sm--info"), "lg" == this.size && e.push("availability-sm--lg"), e
            }
        }
    })
}), define("vue!top-search/component", ["app"], function (e) {
    Vue.component("top-search", {
        template: '<div class="top-search" :class="{\'active\': active}"> <slot name="top"></slot> <form class="top-search__row" :class="{\'active\': active}" @submit.prevent="submit"> <div class="top-search__cell-input"> <rich-text-input type="search" :placeholder="placeholder" v-model="query" @input="input" @focus="active = true" @blur="active = false"></rich-text-input> </div> \x3c!--<div class="top-search__cell-filter" v-if="filter"> <rich-text-input type="select" :options="filter" v-model="activeFilter" :lite="true" @input="send" @open="active = true" @close="active = false"></rich-text-input> </div>--\x3e \x3c!--<div class="top-search__cell-action"> <button type="submit" class="top-search__btn btn btn&#45;&#45;primary" @focus="active = true" @blur="active = false"> <svg v-if="buttonIcon" class="btn__icon btn__icon&#45;&#45;left svg-icon"> <use :xlink:href="\'#\' + buttonIcon"></use> </svg> <span v-if="buttonTxt" class="btn__inner">{{buttonTxt}}</span> </button> </div>--\x3e </form> <transition name="dropdown"> <div class="top-search__results top-search-results" v-if="open"> <transition name="content-fade"> <div class="top-search-results__not-found" v-if="results.categories.length == 0">Ничего не найдено. Попробуйте по-другому.</div> <div class="top-search-results__found" v-if="results.categories.length > 0"> <div class="top-search-results__categories"> <div class="top-search-results__categories-link" :class="{\'active\': activeCategory === category.title}" v-for="category in results.categories" @click="activeCategory = category.title"> {{category.title}} </div> </div> <transition name="content-fade" mode="out-in"> <div class="top-search-results__list" v-for="category in results.categories" v-if="activeCategory === category.title" :key="category.title"> <a :href="link.link" class="top-search-results__link" v-for="link in category.links"> <div class="top-search-results__link-icon"> <svg class="svg-icon"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </div> <div class="top-search-results__link-main"> <span class="top-search-results__link-text" v-html="link.text"></span> <sup class="top-search-results__link-sup" v-if="link.count">{{link.count}}</sup> </div> </a> <product v-for="product in category.products" :key="product.id" :product="product" list-item></product> </div> </transition> <div class="top-search-results__botom-links"> <a class="top-search-results__botom-link" :href="getSearchLink()">Показать все результаты</a> </div> </div> </transition> </div> </transition> </div>',
        data: function () {
            return {
                filter: [],
                open: !1,
                results: null,
                query: "",
                lastRequestQuery: null,
                debounceTimeout: null,
                activeFilter: 0,
                activeCategory: null,
                active: !1
            }
        },
        props: {
            placeholder: {default: null},
            filterInit: {default: null},
            buttonTxt: {default: null},
            buttonIcon: {default: null},
            foldedIcon: {default: null},
            bxajaxid: {default: null}
        },
        methods: {
            getSearchLink: function () {
                var e = "/search/?q=" + this.lastRequestQuery;
                return this.activeFilter && (e += "&WHERE=" + this.activeFilter), e
            }, submit: function () {
                this.query && this.query.length && 2 < this.query.length && (window.location = "/search/?q=" + encodeURIComponent(this.query))
            }, input: function () {
                var e = this;
                clearTimeout(e.debounceTimeout), e.debounceTimeout = setTimeout(function () {
                    e.send()
                }, 200)
            }, send: function () {
                var i = this;
                if (!this.query || !i.query.length || i.query.length <= 2) return View.control.closeTopSearch({silent: !0}), !1;
                $.get({
                    url: "/",
                    dataType: "json",
                    data: {
                        q: i.query,
                        bxajaxid: i.bxajaxid,
                        WHERE: window.innerWidth > View.breakpoints["md-min"] ? i.activeFilter : 0
                    }
                }).done(function (e) {
                    i.results = e, !_.findWhere(e.categories, {title: i.activeCategory}) && e.categories.length && (i.activeCategory = e.categories[0].title), 1 < i.results.activeSections.length ? (i.filter = [], $.each(i.whereList, function (e, t) {
                        0 <= $.inArray(t.value, i.results.activeSections) && i.filter.push(t)
                    })) : i.filter = i.whereList, i.open = !0, View.control.openTopSearch(), i.lastRequestQuery = i.query
                }).fail(function (e) {
                    console.warn("search fail: ", e)
                })
            }
        },
        watch: {
            query: function () {
                this.query && this.query.length || (this.filter = this.whereList)
            }
        },
        created: function () {
            var i = this;
            i.filter = i.filterInit || [], i.whereList = i.filterInit || [], i.query = i.initialQuery || "", $(document.body).off("topSearchClosed.vueTopSearchComponent").on("topSearchClosed.vueTopSearchComponent", function (e, t) {
                i.open = !1, t && t.silent || (i.query = null), clearTimeout(i.debounceTimeout)
            }), $(document.body).off("click.closeTopSearchInVueComponent").on("click.closeTopSearchInVueComponent", function (e) {
                0 == $(e.target).closest(i.$el).length && View.control.closeTopSearch()
            })
        }
    })
}), define("vue!wishlist-sm/component", ["Model"], function (t) {
    Vue.component("wishlist-sm", {
        template: '<div class="complex-link"> <a :href="count > 0 ? \'/personal/favorite/\' : null" class="complex-link__link" :class="{\'complex-link__link--static\': count == 0}" :title="count > 0 ? null : \'Вы не добавили ни одного товара в Избранное\'"> <div class="complex-link__cell-icon"> <div class="complex-link__icon-box"> <svg class="complex-link__svg-icon svg-icon"><use xlink:href="#svg-icon-fav"></use></svg> <span class="complex-link__label" v-if="count > 0">{{count}}</span> </div> </div> <div class="complex-link__cell-txt" v-if="withText"> <sup>Мое</sup> <strong>Избранное</strong> </div> </a> </div>',
        data: function () {
            return {count: 0}
        },
        props: {
            bxajaxid: {default: null}, productIds: {
                default: function () {
                    return []
                }
            }, withText: {type: Boolean, default: !1}
        },
        mounted: function () {
            var e = this;
            this.count = this.productIds.length, t.updateFavorites(this.productIds, this.bxajaxid), t.$on("favoritesUpdated", function () {
                e.count = t.favorites.productIds.length
            })
        }
    })
}), define("vue!dropdown/component", ["app"], function (e) {
    Vue.component("dropdown", {
        props: ["size"],
        template: "<div class=\"dropdown dropdown--manual js-dropdown__body js-tooltip-position\" :class=\"{'dropdown--xl': size === 'xl', 'dropdown--lg': size === 'lg', 'dropdown--md': size === 'md', 'dropdown--sm': size === 'sm', 'dropdown--xs': size === 'xs'}\"> \x3c!--<slot name=\"folded-menu-header\"></slot>--\x3e <transition name=\"content-fade\" mode=\"out-in\"> <slot name=\"content\"></slot> </transition> </div>"
    })
}), define("vue!rating-block/component", ["Model"], function (e) {
    Vue.component("rating-block", {
        template: '<div class="rating-block"> <div class="rating-block__stars"> <div class="rating-stars" :class="{\'rating-stars--input\': inputMode}"> <div class="rating-stars__empty" v-if="canEdit"> <svg class="rating-stars__star svg-icon" @click="localValue = 20; $emit(\'input\', localValue);"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon" @click="localValue = 40; $emit(\'input\', localValue);"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon" @click="localValue = 60; $emit(\'input\', localValue);"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon" @click="localValue = 80; $emit(\'input\', localValue);"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon" @click="localValue = 100; $emit(\'input\', localValue);"><use xlink:href="#svg-icon-star"></use></svg> </div> <div class="rating-stars__empty" v-else> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> </div> <div class="rating-stars__full" :style="{width: localValue + \'%\'}"> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-star"></use></svg> </div> </div> </div> <div class="rating-block__count" v-if="typeof count == \'number\'"> {{count}} <span v-if="showText"> {{countText}} </span> </div> </div>',
        data: function () {
            return {canEdit: !1, localValue: 0}
        },
        props: {
            error: {default: null},
            value: {default: 0},
            count: {default: null},
            readOnly: {type: Boolean, default: !0},
            showText: {type: Boolean, default: !1},
            inputMode: {type: Boolean, default: !1}
        },
        created: function () {
            var e = this;
            e.value && (e.localValue = e.value), e.readOnly || (e.canEdit = !0)
        },
        computed: {
            countText: function () {
                return this.count % 10 == 1 && 11 !== this.count ? "отзыв" : 1 < this.count % 10 && this.count % 10 < 5 ? "отзыва" : "отзывов"
            }
        },
        watch: {
            value: function () {
                this.localValue = this.value
            }
        }
    })
}), define("vue!select-input/component", ["Model"], function (e) {
    Vue.component("select-input", {
        template: '<div :class="{\'rich-form-grid grid\': showOther}"> <div :class="{\'rich-form-grid__col col col-lg-6 col-2xs-12\': showOther}"> <div class="select" @click="toggleSelect" :class="{\'select--block\': block, \'select--lite\': lite, \'select--sm\': size == \'sm\' , \'placeholder-state\': localValue == null, \'open\': open}"> <select class="select" v-model="selectValue" @input="onChange"> <option v-if=\'!option.disabled\' v-for="option in options" :value="option.value">{{option.text}}</option> \x3c!--<option v-if=\'option.disabled\' disabled v-for="option in options" :value="option.value">{{option.text}}</option>--\x3e </select> <span class="select-placeholder" v-if="placeholder">{{placeholder}}</span> <span class="select-value">{{getLocalValueText()}}</span> <svg class="select-chevron svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use> </svg> <ul class="select-list"> <li v-if=\'!option.disabled\' :class="{active: option.value == selectValue}" tabindex="0" v-for="option in options" @click="selectOption(option);">{{option.text || option.name}}</li> </ul> </div> <div class="optionExtra" v-if="rootClass===\'store\'"> <div class="optionExtra__line"> <div class="optionExtra__param">Время работы</div> <div class="optionExtra__data-time">{{shelude}}</div> </div> <div class="optionExtra__line"> <div class="optionExtra__param">Статус товара</div> <div class="optionExtra__data-time"> <span class="instore" v-if="goodStatus">В наличии</span> <span class="noinstore" v-else>Под заказ</span> </div> </div> </div> </div> <div class="rich-form-grid__col col col-lg-6 col-2xs-12" v-if="showOther"> <input type="text" class="rich-text-input__input text-input text-input--sm" @input="onChange" autocomplete="off" v-model="localValue"> </div> </div>',
        data: function () {
            return {
                selectValue: null,
                showOther: !1,
                localValue: null,
                open: !1,
                debounceTimeout: null,
                instanceID: Math.round(1e8 * Math.random()),
                shelude: "",
                goodStatus: !1
            }
        },
        props: {
            disabled: {type: Boolean, default: !1},
            block: {type: Boolean, default: !1},
            lite: {type: Boolean, default: !1},
            size: {default: null},
            placeholder: {default: null},
            options: {default: null},
            value: {default: null},
            rootClass: {default: null}
        },
        methods: {
            toggleSelect: function () {
                var e = this;
                this.debounceTimeout || (this.open = !this.open, this.$emit(this.open ? "open" : "close"), this.debounceTimeout = setTimeout(function () {
                    e.debounceTimeout = null
                }, 300))
            }, selectOption: function (e) {
                this.selectValue = e.value, this.shelude = e.schedule, this.goodStatus = e.status, e.showOther ? (this.localValue = "", this.showOther = !0) : (this.localValue = this.selectValue, this.showOther = !1), this.onChange()
            }, onChange: function (e) {
                if (e && e.target) if (this.showOther) this.localValue = e.target.value; else {
                    this.selectValue = e.target.value;
                    var t = _.findWhere(this.options, {value: this.selectValue});
                    t && t.showOther ? (this.localValue = "", this.showOther = !0) : (this.localValue = this.selectValue, this.showOther = !1)
                }
                this.$emit("input", this.localValue)
            }, getLocalValueText: function () {
                var e = _.findWhere(this.options, {value: this.selectValue});
                return e ? e.text : null
            }
        },
        watch: {
            options: function () {
                var e = this;
                if (e.options.length) {
                    var t = _.findWhere(e.options, {value: e.localValue});
                    e.localValue = void 0 !== t ? t.value : e.options[0].value
                }
            }
        },
        mounted: function () {
            var e = this;
            if (e.localValue = e.selectValue = e.value, !_.findWhere(e.options, {value: e.localValue}) && e.selectValue) {
                var t = _.findWhere(e.options, {showOther: !0});
                t && (e.selectValue = t.value, this.showOther = !0)
            }
        },
        created: function () {
            var t = this;
            $(document.body).on("click.vCloseSelects" + this.instanceID, function (e) {
                0 == $(e.target).closest(t.$el).length && t.open && (t.open = !1, t.$emit("close"))
            })
        },
        destroyed: function () {
            $(document.body).on("click.vCloseSelects" + this.instanceID)
        }
    })
}), define("vue!file-input/component", ["Model"], function (e) {
    Vue.component("file-input", {
        template: '<div class="file-input"> <transition-group name="content-fade" class="file-input__list" tag="div" v-if="localValues.length"> <div class="file-input__list-item file-row" v-for="(file, index) in localValues" :key="index"> <div class="file-row__cell-action"> <button type="button" class="file-row__remove-btn" @click="removeLocalValue(index)" title="Удалить"> <svg class="svg-icon svg-icon--remove"> <use xlink:href="#svg-icon-delete"></use> </svg> </button> </div> <div class="file-row__cell-name"> <span class="file-row__name">{{file.name}} </span> <span class="file-row__size">{{file.size | formatFileSize}} </span> </div> </div> </transition-group> <label class="file-input__action"> <input type="file" class="file-input__input" :multiple="multiple" :name="name" :disabled="nowReading || localValues.length >= limit" @change="inputChanged"> <span tabindex="0" class="file-input__text" :class="{\'disabled\': nowReading || localValues.length >= limit}"> {{textinfo}} </span> </label> </div>',
        data: function () {
            return {localValues: [], nowReading: !1, filesToReadLeft: 0}
        },
        props: {
            disabled: {type: Boolean, default: !1},
            multiple: {type: Boolean, default: !1},
            limit: {default: 1 / 0},
            textinfo: {default: ""},
            name: {type: String, default: "no"}
        },
        mounted: function () {
            console.log(123456), console.log(this)
        },
        methods: {
            inputChanged: function (e) {
                var o = this, t = e.target.files || e.dataTransfer.files;
                if (t.length) {
                    o.nowReading = !0, o.filesToReadLeft += t.length;
                    for (var i = 0; i < t.length; i++) s(t[i])
                }

                function s(t, e) {
                    var i = new FileReader;
                    i.onload = function (e) {
                        o.multiple || o.localValues.splice(0, o.localValues.length), o.localValues.push({
                            name: t.name,
                            size: t.size,
                            value: e.target.result
                        }), o.multiple ? (o.filesToReadLeft--, 0 == o.filesToReadLeft && (o.nowReading = !1, o.emitInput())) : (o.filesToReadLeft = 0, o.nowReading = !1, o.emitInput())
                    }, i.readAsDataURL(t)
                }
            }, removeLocalValue: function (e) {
                this.localValues.splice(e, 1)
            }, emitInput: function () {
                this.$emit("input", this.localValues)
            }
        },
        filters: {formatFileSize: e.formatFileSize}
    })
}), define("vue!rich-text-input/component", ["app", "vue!select-input/component", "vue!file-input/component"], function (e) {
    Vue.component("rich-text-input", {
        data: function () {
            return {localValue: null, suggestionsOpen: !1, suggestionsTimeout: null}
        },
        props: {
            index: {default: null},
            type: {type: String, default: "text"},
            name: {type: String, default: "no"},
            readonly: {type: Boolean, default: !1},
            label: {type: String, default: null},
            textinfo: {default: ""},
            placeholder: {default: null},
            mask: {default: null},
            value: {default: null},
            disabled: {type: Boolean, default: !1},
            size: {default: null},
            lite: {type: Boolean, default: !1},
            prefix: {default: null},
            options: {default: null},
            error: {default: null},
            suggestions: {
                default: function () {
                    return []
                }
            },
            multiple: {type: Boolean, default: !1},
            limit: {default: 1 / 0},
            maxlength: {default: 4},
            required: {default: null}
        },
        template: '<div class="rich-text-input" :class="{\'rich-text-input--w-label\': label, \'rich-text-input--w-prefix\': prefix, \'rich-text-input--textarea\': type === \'textarea\', \'rich-text-input--sm\': size === \'sm\', \'filled\': localValue && localValue.length > 0, \'rich-text-input--file\': type == \'file\', \'form-error\': error}"> <label class="hastore" v-if="type===\'hasstore\'"> <input type="checkbox" class="hidden-checkbox" :value="value" @input="localValue = $event.target.value; $emit(\'input\', $event.target.value)" :name="name" :id="index" @focus="inputFocus" @blur="inputBlur" novalidate> <span class="has-store-visual"> <span class="has-store-visual_tab has-store-visual_tab-true">Есть склад</span> <span class="has-store-visual_tab has-store-visual_tab-false">Нет склада</span> </span> </label> <input :type="type || \'text\'" class="rich-text-input__input text-input mclass" :disabled="disabled" :readonly="readonly" autocomplete="off" v-else-if="type !== \'textarea\' && type !== \'select\' && type !== \'file\' && type !== \'capcha\'" :class="{\'text-input--lg\': size == \'lg\', \'text-input--sm\': size == \'sm\', \'js-has-inputmask\': mask}" :placeholder="placeholder" v-mask="mask" :value="value" @input="localValue = $event.target.value; $emit(\'input\', $event.target.value)" :id="index" :name="name" required="required" @focus="inputFocus" @blur="inputBlur" novalidate> <div v-if="type===\'capcha\'" id="captcha_container"></div> <textarea class="rich-text-input__input text-input" :disabled="disabled" autocomplete="off" v-if="type === \'textarea\'" :placeholder="placeholder" :name="name" :value="value" @input="localValue = $event.target.value; $emit(\'input\', $event.target.value)" @focus="inputFocus" @blur="inputBlur"></textarea> <select-input :disabled="disabled" v-if="type === \'select\'" :placeholder="placeholder" :lite="lite" :name="name" :value="value" :options="options" block @input="localValue = $event; $emit(\'input\', $event)" @open="$emit(\'open\')" @close="$emit(\'close\')"></select-input> <file-input class="rich-text-input__input" :disabled="disabled" v-if="type === \'file\'" :textinfo="textinfo" :name="name" @input="localValue = $event; $emit(\'input\', $event)" @open="$emit(\'open\')" @close="$emit(\'close\')"></file-input> <label v-if="label && type == \'checkbox\'" class="rich-text-input__label" :for="index">{{label}}</label> <span class="rich-text-input__prefix" v-if="prefix">{{prefix}}</span> <span class="rich-text-input__border"></span> <ul class="rich-text-input__suggestions select-list" :class="{open: suggestionsOpen}" v-if="suggestions && suggestions.length"> <li class="rich-text-input__suggest" v-for="suggest in suggestions" @click.stop.prevent="suggestionClick(suggest)">{{suggest.show_value}} </li> </ul> <transition name="content-fade" @enter="slideDown" @leave="slideUp"> <span class="rich-text-input__message rich-text-input__message--error" v-if="error && error.message">{{error.message}}</span> </transition> </div>',
        methods: {
            slideDown: function (e, t) {
                $(e).hide().slideDown(300, t)
            }, slideUp: function (e, t) {
                $(e).show().slideUp(300, t)
            }, inputFocus: function () {
                clearTimeout(this.suggestionsTimeout), this.suggestionsOpen = !0, this.$emit("focus")
            }, inputBlur: function () {
                var e = this;
                clearTimeout(this.suggestionsTimeout), this.suggestionsTimeout = setTimeout(function () {
                    e.suggestionsOpen = !1, e.$emit("delayedBlur")
                }, 200), this.$emit("blur")
            }, suggestionClick: function (e) {
                this.localValue = e, this.$emit("input", e.value, {
                    suggest: !0,
                    data: e.data
                }), clearTimeout(this.suggestionsTimeout), this.suggestionsOpen = !1
            }
        },
        created: function () {
        },
        mounted: function () {
            var t = this;
            this.localValue = this.value, $(this.$el).find(".js-has-inputmask").on("keyup.vueRichTextInputInput change.vueRichTextInputInput paste.vueRichTextInputInput", function (e) {
                t.localValue = e.target.value, t.$emit("input", t.localValue)
            })
        }
    })
}), define("vue!number-input/component", ["app", "vue!rich-text-input/component"], function (e) {
    Vue.component("number-input", {
        template: '<div class="number-input" :class="{\'number-input--lg\': size === \'lg\', \'number-input--sm\': size === \'sm\'}"> <div class="number-input__minus"> <button type="button" class="number-input__btn number-input__btn--minus" tabindex="-1" @click="minus"></button> </div> <div class="number-input__input"> <rich-text-input type="number" :maxlength="4" v-model="localValue" :disabled="disabled" :placeholder="placeholder" :label="label" :size="size" @input="$emit(\'input\', localValue)"></rich-text-input> </div> <div class="number-input__plus"> <button type="button" class="number-input__btn number-input__btn--plus" tabindex="-1" @click="plus"></button> </div> </div>',
        data: function () {
            return {localValue: null, instance: null}
        },
        props: {
            min: {type: Number, default: 0},
            max: {type: Number, default: 1 / 0},
            step: {type: Number, default: 1},
            label: {type: String, default: null},
            placeholder: {type: String, default: null},
            value: {default: null},
            disabled: {type: Boolean, default: !1},
            size: {default: !1}
        },
        methods: {
            minus: function () {
                this.disabled || (this.localValue > this.min && (this.localValue -= this.step), this.$emit("input", this.localValue))
            }, plus: function () {
                this.disabled || (this.localValue < this.max && (this.localValue += this.step), this.$emit("input", this.localValue))
            }
        },
        created: function () {
            this.value ? this.localValue = this.value : this.localValue = this.step
        },
        watch: {
            value: function () {
                this.localValue = Math.ceil(this.value / this.step) * this.step
            }
        }
    })
}), define("vue!basket-action/component", ["Model", "vue!number-input/component"], function (t) {
    Vue.component("basket-action", {
        template: '<div class="basket-action" :class="{\'basket-action--added\': countInBasket, \'basket-action--lg\': size == \'lg\'}"> <div class="basket-action__row" :class="{\'strong-error\': maxcountShow}"> <div class="basket-action__cell-input basket-action--big" :class="inputWrapperClass" v-if="showInput"> <number-input v-model="localCount" :min="minCount" :step="minCount" :max="99999" :size="size" :disabled="waiting || disabled" v-on:change=""></number-input> <transition name="content-fade"> <div v-if="maxcountShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field"> В наличии {{maxCount}} {{unit}}, остальное количество товара будет доставлено под заказ после оплаты. </div> </transition> </div> <div class="basket-action__cell-btn" v-if="showButton"> <button type="button" class="btn btn--primary" :class="{\'btn--lg\': size == \'lg\'}" v-if="showButton" @click="addToBasket" :disabled="waiting || disabled"> <span class="btn__inner"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.917cm" height="0.882cm"> <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M23.492,15.089 C23.374,15.660 22.866,16.075 22.283,16.075 L7.024,16.075 L7.329,17.742 L22.110,17.742 C22.451,17.742 22.727,18.019 22.727,18.360 C22.727,18.701 22.451,18.977 22.110,18.977 L7.329,18.977 C6.746,18.977 6.238,18.563 6.120,17.992 L3.135,3.304 L0.427,2.128 C0.114,1.993 -0.029,1.629 0.106,1.316 C0.242,1.003 0.605,0.859 0.918,0.995 L3.626,2.172 C3.994,2.331 4.262,2.662 4.343,3.055 L4.732,4.970 L23.951,4.970 C24.323,4.970 24.672,5.135 24.907,5.425 C25.142,5.713 25.234,6.088 25.159,6.453 L23.492,15.089 ZM4.986,6.204 L6.770,14.840 L22.283,14.840 L23.951,6.204 L4.986,6.204 ZM18.889,9.237 L10.047,9.237 C9.706,9.237 9.430,8.961 9.430,8.620 C9.430,8.279 9.706,8.002 10.047,8.002 L18.889,8.002 C19.230,8.002 19.506,8.279 19.506,8.620 C19.506,8.961 19.230,9.237 18.889,9.237 ZM10.528,10.922 L18.407,10.922 C18.748,10.922 19.024,11.199 19.024,11.540 C19.024,11.880 18.748,12.157 18.407,12.157 L10.528,12.157 C10.187,12.157 9.911,11.880 9.911,11.540 C9.911,11.199 10.187,10.922 10.528,10.922 ZM10.592,19.917 C11.811,19.917 12.802,20.909 12.802,22.128 C12.802,23.348 11.811,24.340 10.592,24.340 C9.374,24.340 8.382,23.348 8.382,22.128 C8.382,20.909 9.374,19.917 10.592,19.917 ZM10.592,23.105 C11.131,23.105 11.568,22.667 11.568,22.128 C11.568,21.590 11.131,21.152 10.592,21.152 C10.054,21.152 9.616,21.590 9.616,22.128 C9.616,22.667 10.054,23.105 10.592,23.105 ZM18.345,19.917 C19.563,19.917 20.555,20.909 20.555,22.128 C20.555,23.348 19.563,24.340 18.345,24.340 C17.126,24.340 16.134,23.348 16.134,22.128 C16.134,20.909 17.126,19.917 18.345,19.917 ZM18.345,23.105 C18.883,23.105 19.320,22.667 19.320,22.128 C19.320,21.590 18.883,21.152 18.345,21.152 C17.806,21.152 17.368,21.590 17.368,22.128 C17.368,22.667 17.806,23.105 18.345,23.105 Z"/> </svg></span> </button> </div> <a :href="waiting || disabled ? null : \'/order/\'" type="button" class="btn btn-w100 btn--primary" :class="{\'btn--lg\': size == \'lg\'}" v-if="countInBasket && showButton" :disabled="waiting || disabled"> <span class="btn__inner">Оформить</span> </a> <div class="basket-action__cell-remove" v-if="countInBasket && showButton"> <button type="button" class="basket-action__remove" @click="removeFromBasket" :disabled="waiting || disabled" title="Убрать из корзины"> <svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg> </button> </div> </div> </div>',
        data: function () {
            return {localCount: 1, inBasket: 0, initValueSet: 0, waiting: !1, delayTimeout: null, maxcountShow: !1}
        },
        props: {
            inputWrapperClass: {default: ""},
            productId: {default: null},
            offerId: {default: null},
            minCount: {default: 1},
            maxCount: {default: 1 / 0},
            showInput: {type: Boolean, default: !0},
            showButton: {type: Boolean, default: !0},
            size: {default: null},
            basketMode: {type: Boolean, default: !1},
            disabled: {type: Boolean, default: !1},
            unit: {default: ""}
        },
        methods: {
            addToBasket: function () {
                this.waiting = !0, t.addToBasket(this.offerId, this.localCount, !0)
            }, removeFromBasket: function () {
                this.waiting = !0, t.removeFromBasket(this.offerId)
            }
        },
        computed: {
            countInBasket: function () {
                return t.getBasketCountByOffer(this.offerId)
            }
        },
        created: function () {
            var e = this;
            e.localCount = this.countInBasket || this.minCount, t.$on("basketUpdated", function () {
                e.waiting = !1, e.localCount = e.countInBasket ? e.countInBasket : 1
            })
        },
        watch: {
            localCount: function () {
                var e = this;
                this.$emit("changeLocalCount", this.localCount), e.maxCount && e.localCount > e.maxCount ? e.maxcountShow = !0 : setTimeout(function () {
                    e.maxcountShow = !1
                }, 5e3), e.basketMode && !e.waiting && e.localCount != e.countInBasket && e.localCount >= e.minCount && (clearTimeout(e.delayTimeout), e.delayTimeout = setTimeout(e.addToBasket, 500))
            }
        }
    })
}), define("vue!system-message/component", ["Model"], function (e) {
    Vue.component("system-message", {
        template: '<transition name="content-fade"> <div class="system-message flc" :class="{\'system-message--error\': type === \'error\', \'system-message--tip\': mode === \'tip\', \'js-tooltip-position\': mode === \'tip\'}" v-if="open && !localClosed"> <div class="system-message__text" v-html=\'text\'></div> <div class="system-message__close" v-if="!autoHide"> <button class="system-message__close-btn" @click="close"> <svg class="svg-icon svg-icon--remove"><use xlink:href="#svg-icon-close"></use></svg> </button> </div> </div> </transition>',
        data: function () {
            return {localClosed: !1}
        },
        props: {
            text: {default: ""},
            type: {default: "default"},
            mode: {default: "static"},
            open: {type: Boolean, default: !0},
            autoHide: {type: Boolean, default: !1}
        },
        methods: {
            close: function () {
                this.localClosed = !0, this.$emit("close")
            }
        },
        mounted: function () {
            View.init.local.tooltipPositionLocal(this.$el);
            var e = this;
            this.autoHide && setTimeout(function () {
                e.close()
            }, 5e3)
        }
    })
}), define("vue!fav-btn/component", ["Model"], function (t) {
    Vue.component("fav-btn", {
        template: '<div class="fav-btn" @click="toggleFav" :class="{active: active, loading: loading}"> <div class="fav-btn__icon"> <div class="fav-btn__icon-group"> <svg class="fav-btn__icon-in-fav svg-icon"><use xlink:href="#svg-icon-fav"></use></svg> <svg class="fav-btn__icon-not-in-fav svg-icon"><use xlink:href="#svg-icon-fav-empty"></use></svg> <div class="fav-btn__icon-spinner"> <svg class="spinner spinner--fav" viewBox="0 0 80 80" :class="{active: loading}"> <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle> </svg> </div> </div> </div> <div class="fav-btn__text" v-if="withText"> <span class="fav-btn__text-main">Добавить в избранное</span> <span class="fav-btn__text-count" v-if="count">({{count}} добавили)</span> </div> </div>',
        data: function () {
            return {active: !1, loading: !1}
        },
        props: {
            withText: {type: Boolean, default: !1},
            count: {default: null},
            productId: {default: null},
            offerId: {default: null}
        },
        methods: {
            toggleFav: function () {
                this.loading = !0, this.active ? t.removeFromFavorites(this.productId, this.offerId) : t.addToFavorites(this.productId, this.offerId)
            }, isInFavorites: function () {
                return !(!this.productId && !this.offerId) && t.isInFavorites(this.productId, this.offerId)
            }
        },
        created: function () {
            var e = this;
            e.active = e.isInFavorites(e.productId, e.offerId), t.$on("favoritesUpdated", function () {
                e.loading = !1, e.active = e.isInFavorites(e.productId, e.offerId)
            })
        }
    })
}), define("vue!product/component", ["Model", "vue!rating-block/component", "vue!basket-action/component", "vue!system-message/component", "vue!fav-btn/component"], function (t) {
    Vue.component("product", {
        template: '<div class="product" :class="{\'product--list-item\': listItem, \'product--list-item-short\': listItemShort, \'product--list-item-lg\': listItemLg, \'product--w-buy\': showBuyButton, \'product--w-remove\': showRemoveButton, \'product--basket-mode\': basketMode}"> <a class="product__link" :href="product.link" v-if="product.link && !notFollowLink"></a> <div class="product__link" v-if="product.link && notFollowLink" @click="$emit(\'linkClick\')"></div> <div class="product__image-container"> <div class="product__image" v-if="product.image" :style="{\'background-image\': \'url(\'+product.image+\')\'}"> <div class="product__code" v-if="product.code">Код: {{product.code}}</div> <div class="product__discount" v-if="product.discount"><span>-{{product.discount}}%</span> </div> </div> <div class="product__image" v-else> <div class="product__no-image" v-if="!product.image"> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> \x3c!--<fav-btn v-if="favoritesEnabled && showFavButton" :product-id="product.productId" :offer-id="product.offerId"></fav-btn>--\x3e <div class="product__quick-view" v-if="quickViewEnabled" @click="openPreview">Быстрый просмотр</div> </div> <div class="product__status-container"> <div class="product__status status" v-if="product.status" :class="statusItem.class" v-for="statusItem in product.status">{{statusItem.name}}</div> </div> <div class="product__name" v-if="product.name">{{product.name}}</div> <div class="product__params" v-if="product.params || (!basketMode && product.count)"> </div> <div class="product__offers-count" v-if="product.offersCount"> {{product.offersCount}} </div> <div class="product__price flc"> <div class="price" v-if="product.price && !basketMode"> <strike v-if="product.priceOld">{{product.priceOld | formatPrice}} р.</strike> <strong v-if="product.price" :class="{\'price__new\': product.priceOld}">{{product.price | formatPrice}}</strong> <small :class="{\'price__new-curr\': product.priceOld}"> {{product.priceCurrency}} </small> <span class="price__units" v-if="product.unit"> / {{product.unit}} </span> </div> <div class="price" v-else-if="product.price && basketMode"> <strike v-if="product.priceOld" style="text-decoration: none;"><span style="text-decoration: line-through;">{{product.priceOld * product.count | formatPrice}}</span> <span class="c-primary-alt">{{Math.round((product.price - product.priceOld) * 100 / product.priceOld)}}%</span></strike> <strong v-if="product.price" :class="{\'price__new\': product.priceOld, \'price__new-curr\': product.priceOld}">{{product.price * product.count | formatPrice}} </strong> <span> руб. </span> <span class="price__units" v-if="product.unit"> / {{product.unit}} </span> </div> <div class="price" v-else-if="product.priceRange"> <strong>{{product.priceRange.min | formatPrice}}</strong> <span class="price__separator"> &ndash; </span> <strong>{{product.priceRange.max | formatPrice}}</strong> <small> {{product.priceCurrency}} </small> <span class="price__units" v-if="product.unit"> / за {{product.unit}} </span> </div> <div class="price" v-else-if="!product.price && !product.priceRange && showCatalogPropsAnyway"> <strong>&nbsp;</strong> </div> </div> <div class="product__rating flc" v-if="product.rating && product.rating.count && showRating"> <rating-block :value="product.rating.value" :count="product.rating.count"></rating-block> </div> \x3c!--<div class="product__delivery flc"> <availability-sm v-if="product.quantity > 0" :value="1" :text="\'На складе: \' + product.quantity + ( product.unit? \' \'+ product.unit:\' шт\')"></availability-sm> <availability-sm v-else :value="0" text="Нет на складе"></availability-sm> </div>--\x3e \x3c!--<div class="product__delivery flc" v-if="product.regionQuantity>0"> <availability-sm :text="\'Доставка 1-3 дня: \'+ product.regionQuantity +\' \' + ( product.unit? \' \'+product.unit:\' шт\')" delivery></availability-sm> </div> <div class="product__delivery flc" v-if="product.deliveryDates" > <availability-sm v-for="(dates, index) in product.deliveryDates" :key="index" v-if="index == 0" :text="\'Поступление \'+ \' \' + dates.date +\' - \' + dates.quantity + \' \' + ( dates.unit? dates.unit:\' шт\')" delivery ></availability-sm> </div>--\x3e \x3c!--<div class="product__delivery flc" v-if="product.delivery" :class="{ \'product__delivery&#45;&#45;good\': product.delivery.status == \'good\', \'product__delivery&#45;&#45;bad\': product.delivery.status == \'bad\', \'product__delivery&#45;&#45;ugly\': product.delivery.status == \'ugly\' }"> <div class="product__delivery-icon"> <svg class="svg-icon svg-icon&#45;&#45;20"><use xlink:href="#svg-icon-delivery"></use></svg> </div> <div class="product__delivery-txt" v-if="product.delivery.message">{{product.delivery.message}}</div> </div>--\x3e <div class="product__availability-check" v-if="showAvailabilityButton && typeof product.quantity == \'number\'"> <span class="product__availability-check-btn link link--local" @click="showAvailabilityModal">Показать наличие в магазинах</span> </div> <div class="product__footer"> <div class="right"> <label class="checkbox checkbox--compare" > <input type="checkbox" class="checkbox-row__input" :checked="product.incompare" v-on:change="compare"> <span class="checkbox__visual checkbox-row__visual"></span> <span class="checkbox__text" v-if="product.incompare">Убрать</span> <span class="checkbox__text" v-else>Сравнить</span> </label> </div> <div class="product__param" v-for="param in product.params" v-if="showParams"> <span class="product__param-name" v-if="param.name">{{param.name}}:</span> <span class="product__param-value">{{param.value}}</span> </div> <div class="product__brand" v-if="product.brand">Бренд: {{product.brand}}</div> <div class="product-price-ext__avail-item flc" v-if="product.deliveryDates" > <availability-sm v-for="(dates, index) in product.deliveryDates" :key="index" v-if="index == 0" :text="\'Поступление \'+ \' \' + dates.date +\' - \' + dates.quantity + \' \' + ( dates.unit?\' \'+ dates.unit:\' шт\')" no-icon time ></availability-sm> </div> <div class="product__instore instore" v-if="(typeof product.quantity === \'number\' && product.quantity > 0 && localCount <= product.quantity)">В наличии</div> <div class="product__instore" v-else>Под заказ {{product.deliveryDays || 7}} дней</div> <div class="product__action flc" v-if="showBuyButton && (product.price || product.priceRange)"> <basket-action v-if="product.price && !product.offersCount" ref="basketAction" :offer-id="product.offerId" :max-count="product.quantity || Infinity" :unit="product.unit" :basket-mode="basketMode" :bind-basket-count="bindBasketCount" :show-button="!bindBasketCount" :disabled="disableActions"></basket-action> <a :href="product.link" class="btn btn--primary" v-else> <span class="btn__inner">Выбрать</span> </a> <system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message> </div> <div class="product__action flc" v-else-if="showBuyButton && !basketMode"> <a :href="product.link" class="btn btn--primary"> <span class="btn__inner">Заказать</span> </a> <system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message> </div> <div class="product__action flc" v-else-if="priceNotification || product.priceNotification"> <system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message> </div> </div> <div class="product__alt-action flc" v-if="showAltActions"> <div class="product__alt-action-grid"> \x3c!-- <div class="product__alt-action-item hide" v-if="!product.delayed"> <span class="link link--local" @click="basketMode ? fromBasketToDelayed() : delay()">Отложить</span> </div>--\x3e <div class="product__alt-action-item" v-if="product.delayed"> <span class="link link--local" @click="fromDelayedToBasket">В корзину</span> </div> <div class="product__alt-action-item"> <span class="link link--local" @click="remove">Удалить</span> </div> </div> </div> <slot name=\'button\'></slot> <button type="button" class="product__remove-btn" v-if="showRemoveButton && !basketMode" title="Удалить" @click="remove"> <svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg> </button> </div>',
        data: function () {
            return {
                authorized: t.authorized,
                favoritesEnabled: t.favorites.enabled,
                quickViewEnabled: t.quickView.enabled,
                incompare: !1,
                localCount: 1
            }
        },
        props: {
            product: {
                default: function () {
                    return {}
                }
            },
            productId: {default: 0},
            offerId: {default: 0},
            image: {type: String, default: null},
            showCode: {default: !1},
            code: {type: String, default: null},
            brand: {type: String, default: null},
            name: {type: String, default: null},
            link: {type: String, default: null},
            price: {default: null},
            priceOld: {default: null},
            priceRange: {default: null},
            status: {default: null},
            showRating: {default: null},
            rating: {default: null},
            delivery: {default: null},
            quantity: {default: null},
            count: {default: null},
            offersCount: {default: null},
            delayed: {type: Boolean, default: !1},
            params: {default: null},
            listItem: {type: Boolean, default: !1},
            listItemShort: {type: Boolean, default: !1},
            listItemLg: {type: Boolean, default: !1},
            showBuyButton: {type: Boolean, default: !1},
            bindBasketCount: {type: Boolean, default: !1},
            showRemoveButton: {type: Boolean, default: !1},
            showFavButton: {type: Boolean, default: !1},
            showAvailabilityButton: {type: Boolean, default: !1},
            showQuickView: {type: Boolean, default: !1},
            showAltActions: {type: Boolean, default: !1},
            notFollowLink: {type: Boolean, default: !1},
            basketMode: {type: Boolean, default: !1},
            showCatalogPropsAnyway: {type: Boolean, default: !1},
            priceNotification: {default: null},
            showParams: {type: Boolean, default: !0},
            disableActions: {type: Boolean, default: !1}
        },
        methods: {
            remove: function () {
                this.$emit("remove"), t.removeFromBasket(this.product.offerId)
            }, delay: function () {
                this.$emit("remove"), t.addToDelayed(this.product.offerId)
            }, fromDelayedToBasket: function () {
                t.removeFromDelayed(this.product.offerId), t.addToBasket(this.product.offerId)
            }, fromBasketToDelayed: function () {
                t.removeFromBasket(this.product.offerId), t.addToDelayed(this.product.offerId)
            }, openPreview: function () {
                t.showProductPreviewModal(this.product.productId, this.product.offerId, this.product.link)
            }, showAvailabilityModal: function () {
                t.showProductAvailabilityModal(this.product.productId, this.product.offerId)
            }, showProductSubscriptionModal: function () {
                t.showProductSubscriptionModal(this.product.productId, this.product.offerId)
            }, compare: function () {
                var i = this;
                if (this.product.incompare) {
                    var e = "remove";
                    this.product.incompare = !1
                } else e = "add", this.product.incompare = !0;
                $.ajax({
                    type: "POST",
                    url: "/ajax/compare.php",
                    data: "id=" + i.product.offerId + "&action=" + e,
                    success: function (e) {
                        var t = JSON.parse(e);
                        i.incompare = parseFloat(t.count), i.$emit("update-compare", parseFloat(t.count))
                    }
                })
            }
        },
        filters: {formatPrice: t.formatPrice},
        created: function () {
            !this.product.productId && this.productId && (this.product.productId = this.productId), !this.product.offerId && this.offerId && (this.product.offerId = this.offerId), !this.product.image && this.image && (this.product.image = this.image), !this.product.code && this.code && (this.product.code = this.code), !this.product.brand && this.brand && (this.product.brand = this.brand), !this.product.name && this.name && (this.product.name = this.name), !this.product.link && this.link && (this.product.link = this.link), !this.product.price && this.price && (this.product.price = this.price), !this.product.priceOld && this.priceOld && (this.product.priceOld = this.priceOld), !this.product.priceRange && this.priceRange && (this.product.priceRange = this.priceRange), !this.product.minStep && this.minStep && (this.product.minStep = this.minStep), !this.product.status && this.status && (this.product.status = this.status), !this.product.delivery && this.delivery && (this.product.delivery = this.delivery), !this.product.quantity && this.quantity && (this.product.quantity = this.quantity), !this.product.count && this.count && (this.product.count = this.count), !this.product.offersCount && this.offersCount && (this.product.offersCount = this.offersCount), !this.product.delayed && this.delayed && (this.product.delayed = this.delayed), !this.product.params && this.params && (this.product.params = this.params), !this.product.priceNotification && this.priceNotification && (this.product.priceNotification = this.priceNotification), t.$on(["signIn", "signUp", "signInSilent", "signOut"], function (e) {
                this.authorized = t.authorized
            })
        },
        mounted: function () {
            var t = this;
            this.$refs.basketAction.$on("changeLocalCount", function (e) {
                t.localCount = e
            })
        }
    })
}), define("vue!basket-sm/component", ["Model", "vue!dropdown/component", "vue!product/component"], function (o) {
    Vue.component("basket-sm", {
        template: '<div class="complex-link complex-link--basket dropdown-owner dropdown-arrow-owner" :class="{\'js-dropdown\': showDropdownComputed, \'complex-link--disabled\': !basketCount}"> <a :href="basketCount ? \'/order/\' : null" class="complex-link__link" :class="{\'js-dropdown__btn\': showDropdownComputed, \'complex-link__link--static\': !basketCount}" :title="basketCount ? null : \'Корзина пуста\'"> <div class="complex-link__cell-icon"> <div class="complex-link__icon-box"> <svg class="complex-link__svg-icon svg-icon"><use xlink:href="#svg-icon-basket"></use></svg> \x3c!--<img src="/local/images/new/Cart_32x32.svg" alt="" class="complex-link__svg-icon svg-icon">--\x3e <transition name="content-scale"> <span class="complex-link__label mobile" v-if="basketCount > 0">{{basketCount}}</span> </transition> </div> </div> <div class="complex-link__cell-txt" v-if="withText"> <strong>Корзина</strong> <transition name="content-scale"> <span class="complex-link__label" v-if="basketCount > 0">{{basketCount}}</span> </transition> </div> </a> <dropdown class="dropdown--basket" :class="{\'dropdown--basket-empty\': !basket.products.length}" v-if="showDropdownComputed"> <div class="basket-sm" slot="content" v-if="!basketCount" key="empty"> <div class="basket-sm__block basket-sm__block--white"> <div class="basket-sm__empty-message">Корзина пуста</div> </div> </div> <div class="basket-sm" slot="content" v-if="basketCount" key="not-empty"> <div class="basket-sm__list"> <transition-group name="content-fade" tag="div"> <product v-for="product in basket.products" :show-rating="false" v-if="!product.delayed" :key="product.productId" :product="product" :list-item="true" :show-remove-button="true" :show-params="false"></product> </transition-group> </div> \x3c!--<div class="basket-sm__block"> <ul class="small-info-list"> <li class="small-info-list__item small-info-row small-info-row&#45;&#45;color-alt" v-if="freeDeliveryPrice > basketPrice"> <div class="small-info-row__icon"> <svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg> </div> <div class="small-info-row__text">Добавьте товаров на <b>{{(freeDeliveryPrice - basketPrice) | formatPrice}} руб.</b>, чтобы получить бесплатную доставку в ваш регион ({{geolocation.city.name}})</div> </li> <li class="small-info-list__item small-info-row small-info-row&#45;&#45;color-alt" v-if="freeDeliveryPrice <= basketPrice"> <div class="small-info-row__icon"> <svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg> </div> <div class="small-info-row__text">Бесплатная доставка ({{geolocation.city.name}})</div> </li> <li class="small-info-list__item small-info-row small-info-row&#45;&#45;color-alt"> <div class="small-info-row__icon"> <svg class="svg-icon"><use xlink:href="#svg-icon-gift"></use></svg> </div> <div class="small-info-row__text">Бесплатные <a href="#" class="link link&#45;&#45;inverted">пробники</a> с каждым заказом</div> </li> </ul> </div>--\x3e <div class="basket-sm__block"> <div class="dot-line-list"> <transition name="content-fade"> <div class="dot-line-list__item dot-line-row dot-line-row--sm" v-if="basketSale > 0"> <div class="dot-line-row__start">Скидка</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end">{{basketSale | formatPrice}} руб.</div> </div> </transition> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Сумма <span class="c-gray-dark">({{basketCount}} {{basketCounter()}})</span></div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <div class="price"> <strong class="price__new">{{basketPrice | formatPrice}}</strong><small class="price__new-curr">руб.</small> </div> </div> </div> </div> <div class="basket-sm__btn-row"> <a href="/order/" class="btn"> <span class="btn__inner">Перейти в корзину</span> </a> <a href="/order/checkout/" class="btn btn--primary"> <span class="btn__inner">Оформить заказ</span> </a> </div> </div> </div> </dropdown> </div>',
        data: function () {
            return {
                basket: o.basket,
                basketPrice: o.basketPrice,
                basketSale: o.basketSale,
                basketCount: o.basketCount,
                user: o.user,
                geolocation: o.geolocation,
                instId: null,
                showDropdownComputed: !1
            }
        },
        props: {
            freeDeliveryPrice: {default: 0},
            bxajaxid: {default: null},
            withText: {type: Boolean, default: !0},
            showDropdown: {type: Boolean, default: !1},
            showDropdownMax: {default: null},
            showDropdownMin: {default: null},
            products: {default: null}
        },
        methods: {
            basketCounter: function () {
                return counter(this.basketCount)
            }, updShowDropdownComputed: function () {
                return !(View.modileAndTabletCheck || !this.showDropdown || this.showDropdownMax && window.innerWidth > ("number" == typeof this.showDropdownMax ? this.showDropdownMax : View.breakpoints[this.showDropdownMax]) || this.showDropdownMin && window.innerWidth < ("number" == typeof this.showDropdownMin ? this.showDropdownMin : View.breakpoints[this.showDropdownMin]))
            }
        },
        filters: {formatPrice: o.formatPrice},
        created: function () {
            var e = this;
            o.$on("basketUpdated", function () {
                e.basketPrice = o.basketPrice, e.basketSale = o.basketSale, e.basketCount = o.basketCount
            }), this.instId = Math.round(1e6 * Math.random())
        },
        mounted: function () {
            var e = this, t = null, i = e.showDropdownComputed;
            $(window).on("resize.recalcBasketSmDD" + this.instId, function () {
                clearTimeout(t), t = setTimeout(function () {
                    i = e.updShowDropdownComputed(), e.showDropdownComputed != i && (e.showDropdownComputed = i, Vue.nextTick(function () {
                        View.init.local.tooltipPositionLocal()
                    }))
                }, 100)
            }), e.showDropdownComputed = e.updShowDropdownComputed(), this.products && (console.log("small basket", this.products, this.bxajaxid), o.updateBasket(this.products, this.bxajaxid))
        },
        destroyed: function () {
            $(window).off("resize.recalcBasketSmDD" + this.instId)
        }
    })
}), define("vue!basket-action-catalog-item/component", ["Model", "vue!number-input/component"], function (t) {
    Vue.component("basket-action-catalog-item", {
        template: '<div class="basket-action" :class="{\'basket-action--added\': countInBasket, \'basket-action--lg\': size == \'lg\'}"> <div class="basket-action__row" v-if="calculator.to_unit && calculator.from_unit" :class="{\'strong-error\': countError}"> <div class="catalog-item-3__depended-fields"> <div class="depended-field-box" :class="{\'strong-error\': countError}"> <input type="number" v-model="localCount" v-on:change="updateDepend(\'child\')" v-on:keyup="updateDepend(\'child\'); countErrorUpdate(localCount)" class="text-input"> <div class="depended-field__note">{{calculator.from_unit}}</div> <transition name="content-fade"> <div v-if="maxcountShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field"> В наличии {{maxCount}} {{calculator.from_unit}}, остальное количество товара будет доставлено под заказ после оплаты. </div> </transition> </div> <div class="depended-fields-text" v-if="calculator.to_unit"> = </div> <div class="depended-field-box " :class="{\'strong-error\': countError}" v-if="calculator.to_unit"> <input type="number" step="0.001" v-model="dependCount" v-on:change="updateDepend(\'parent\')" v-on:keyup="countErrorUpdate2(localCount); updateDepend(\'parent\', 3000)" v-on:keydown="countZeroLimit" class="text-input"> <div class="depended-field__note">{{calculator.to_unit}}</div> <transition name="content-fade"> <div v-if="maxunitsShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field"> Метраж и количество товара пересчитаны в соответствии с актуальным количеством в наличии </div> </transition> </div> </div> </div> <div class="catalog-item-3__depended-fields" v-else> <div class="basket-action__row" :class="{\'strong-error\': countError}"> <div class="basket-action__cell-input basket-action--big"> <div class="number-input"> <div class="number-input__minus"> <button type="button" tabindex="-1" class="number-input__btn number-input__btn--minus" @click="LCDecrease"></button> </div> <div class="number-input__input"> <div class="rich-text-input filled"> <input v-model="localCount" type="number" autocomplete="off" required="required" novalidate="novalidate" class="rich-text-input__input text-input notempty" @keyup="countErrorUpdate(localCount)"> <span class="rich-text-input__border"></span> </div> </div> <div class="number-input__plus"> <button type="button" tabindex="-1" class="number-input__btn number-input__btn--plus" @click="LCIncrease"></button> </div> </div> <transition name="content-fade"> <div v-if="maxcountShow" class="x-quantity__helper-text" data-qaid="quantity_helper_field"> В наличии {{maxCount}} {{calculator.from_unit}}, остальное количество товара будет доставлено под заказ после оплаты. </div> </transition> </div> <div class="basket-action__cell-btn detail-product-cartbutton"> <button type="button" class="btn btn--primary" :class="{\'btn--lg\': size == \'lg\'}" v-if="showButton" @click="addToBasket" > <span class="btn__inner"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.917cm" height="0.882cm"> <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M23.492,15.089 C23.374,15.660 22.866,16.075 22.283,16.075 L7.024,16.075 L7.329,17.742 L22.110,17.742 C22.451,17.742 22.727,18.019 22.727,18.360 C22.727,18.701 22.451,18.977 22.110,18.977 L7.329,18.977 C6.746,18.977 6.238,18.563 6.120,17.992 L3.135,3.304 L0.427,2.128 C0.114,1.993 -0.029,1.629 0.106,1.316 C0.242,1.003 0.605,0.859 0.918,0.995 L3.626,2.172 C3.994,2.331 4.262,2.662 4.343,3.055 L4.732,4.970 L23.951,4.970 C24.323,4.970 24.672,5.135 24.907,5.425 C25.142,5.713 25.234,6.088 25.159,6.453 L23.492,15.089 ZM4.986,6.204 L6.770,14.840 L22.283,14.840 L23.951,6.204 L4.986,6.204 ZM18.889,9.237 L10.047,9.237 C9.706,9.237 9.430,8.961 9.430,8.620 C9.430,8.279 9.706,8.002 10.047,8.002 L18.889,8.002 C19.230,8.002 19.506,8.279 19.506,8.620 C19.506,8.961 19.230,9.237 18.889,9.237 ZM10.528,10.922 L18.407,10.922 C18.748,10.922 19.024,11.199 19.024,11.540 C19.024,11.880 18.748,12.157 18.407,12.157 L10.528,12.157 C10.187,12.157 9.911,11.880 9.911,11.540 C9.911,11.199 10.187,10.922 10.528,10.922 ZM10.592,19.917 C11.811,19.917 12.802,20.909 12.802,22.128 C12.802,23.348 11.811,24.340 10.592,24.340 C9.374,24.340 8.382,23.348 8.382,22.128 C8.382,20.909 9.374,19.917 10.592,19.917 ZM10.592,23.105 C11.131,23.105 11.568,22.667 11.568,22.128 C11.568,21.590 11.131,21.152 10.592,21.152 C10.054,21.152 9.616,21.590 9.616,22.128 C9.616,22.667 10.054,23.105 10.592,23.105 ZM18.345,19.917 C19.563,19.917 20.555,20.909 20.555,22.128 C20.555,23.348 19.563,24.340 18.345,24.340 C17.126,24.340 16.134,23.348 16.134,22.128 C16.134,20.909 17.126,19.917 18.345,19.917 ZM18.345,23.105 C18.883,23.105 19.320,22.667 19.320,22.128 C19.320,21.590 18.883,21.152 18.345,21.152 C17.806,21.152 17.368,21.590 17.368,22.128 C17.368,22.667 17.806,23.105 18.345,23.105 Z"/> </svg></span> </button> </div> </div> </div> <div class="basket-action__note" v-if="calculator.from_unit_notification && calculator.from_unit_notification!==\'Продажа осуществляется только поштучно\'"> <div class="attention-icon"> ! </div> <div class="basket-action__note-text">{{calculator.from_unit_notification}}</div> </div> <div class="" v-if="showButton"> <div v-if="!countInBasket"> <button type="button" class="btn btn--primary btn--catalog-item-button" :class="{\'btn--lg\': size == \'lg\'}" @click="addToBasket" :disabled="waiting || disabled" v-if="quantity===0"> <span class="btn__inner" >Заказать</span> </button> <div v-else-if="calculator.to_unit && calculator.from_unit"> <button type="button" class="btn btn--primary btn--catalog-item-button" :class="{\'btn--lg\': size == \'lg\'}" @click="addToBasket" :disabled="waiting || disabled"> <span class="btn__inner">Положить в корзину</span> </button> </div> </div> <div v-else-if="calculator.to_unit && calculator.from_unit"> <button type="button" class="btn btn--primary btn--catalog-item-button" :class="{\'btn--lg\': size == \'lg\'}" @click="addToBasket" :disabled="waiting || disabled"> <span class="btn__inner">Обновить корзину</span> </button> </div> <button type="button" data-modal="/ajax/buyOneClick.php" class="btn btn--light btn--catalog-item-button js-load-modal" :class="{\'btn--lg\': size == \'lg\'}" :disabled="waiting || disabled"> <span class="btn__inner">Заказать в 1 клик</span> </button> </div> <div class="basket-action__cell-remove" v-if="countInBasket"> <button type="button" class="btn btn--light btn--catalog-item-button btn--lg" @click="removeFromBasket" :disabled="waiting || disabled" title="Убрать из корзины"> <span class="btn__inner">Убрать из корзины</span> </button> </div> </div>',
        data: function () {
            return {
                localCount: 1,
                inBasket: 0,
                initValueSet: 0,
                waiting: !1,
                delayTimeout: null,
                dependCount: 0,
                maxcountShow: !1,
                maxunitsShow: !1,
                notifyTimeout: null,
                countError: !1
            }
        },
        props: {
            inputWrapperClass: {default: ""},
            productId: {default: null},
            offerId: {default: null},
            minCount: {default: 1},
            maxCount: {default: 1 / 0},
            showInput: {type: Boolean, default: !0},
            showButton: {type: Boolean, default: !0},
            size: {default: null},
            basketMode: {type: Boolean, default: !1},
            disabled: {type: Boolean, default: !1},
            calculator: {default: !1},
            quantity: {default: 0}
        },
        methods: {
            addToBasket: function () {
                this.waiting = !0, t.addToBasket(this.offerId, this.localCount, !0)
            }, buyOneCLick: function () {
                View.control.openModalByUrl("/ajax/buyOneClick.php?id=" + this.offerId)
            }, removeFromBasket: function () {
                this.waiting = !0, t.removeFromBasket(this.offerId)
            }, updateDepend: function (e, t) {
                var i = this, o = 50;
                0 < t && (o = t), clearTimeout(this.delayTimeout), this.delayTimeout = setTimeout(function () {
                    "parent" === e && (i.localCount = Math.ceil(i.dependCount / i.calculator.ratio)), i.dependCount = (i.localCount * i.calculator.ratio).toFixed(3)
                }, o)
            }, LCIncrease: function () {
                this.localCount++, this.countError = !1
            }, LCDecrease: function () {
                1 < this.localCount && (this.localCount--, this.countError = !1)
            }, countErrorUpdate: function (e) {
                e < this.maxCount && (this.countError = !1, console.log(this.maxUnits))
            }, countErrorUpdate2: function (e) {
                this.dependCount < this.maxUnits.toFixed(3) && (this.countError = !1, console.log(this.maxUnits))
            }, countZeroLimit: function (e) {
                console.log(e.target.value)
            }
        },
        computed: {
            countInBasket: function () {
                return t.getBasketCountByOffer(this.offerId)
            }, maxUnits: function () {
                return this.maxCount * this.calculator.ratio
            }
        },
        created: function () {
            var e = this;
            e.localCount = this.countInBasket || this.minCount, t.$on("basketUpdated", function () {
                e.waiting = !1, e.localCount = e.countInBasket ? e.countInBasket : 1
            })
        },
        mounted: function () {
            this.updateDepend(), console.log(this)
        },
        watch: {
            localCount: function () {
                var e = this;
                e.localCount < 1 && (e.localCount = 1), clearTimeout(e.notifyTimeout), e.maxCount && e.localCount > e.maxCount && (e.notifyTimeout = setTimeout(function () {
                    e.maxcountShow = !0, e.countError = !0
                }, 50)), e.notifyTimeout = setTimeout(function () {
                    e.maxcountShow = !1
                }, 5e3), e.basketMode && !e.waiting && e.localCount != e.countInBasket && e.localCount >= e.minCount && (clearTimeout(e.delayTimeout), e.delayTimeout = setTimeout(e.addToBasket, 500))
            }, dependCount: function () {
                var e = this;
                3 < e.dependCount.split(".")[1].length && (e.dependCount = Number(e.dependCount).toFixed(3)), e.dependCount < e.calculator.ratio && (e.dependCount = e.calculator.ratio), e.maxUnits && e.dependCount > e.maxUnits && e.localCount <= e.maxCount ? (e.localCount = e.maxCount, e.dependCount = e.maxUnits.toFixed(3), e.countError = !0, e.maxcountShow = !0) : (clearTimeout(e.delayTimeout), e.delayTimeout = setTimeout(function () {
                    e.maxcountShow = !1
                }, 5e3)), e.basketMode && !e.waiting && e.localCount != e.countInBasket && e.localCount >= e.minCount && (clearTimeout(e.delayTimeout), e.delayTimeout = setTimeout(e.addToBasket, 500))
            }
        }
    })
}), define("vue!slick/component", ["app", "Model"], function (e, t) {
    Vue.component("slick", {
        template: "<div> <slot></slot> </div>", data: function () {
            return {
                jqueryEl: null,
                localOptions: _.defaults(this.options || {}, {
                    prevArrow: '<span class="slick-arrow slick-prev"><svg class="svg-icon"><use xlink:href="#svg-icon-slider-left"></use></svg></span>',
                    nextArrow: '<span class="slick-arrow slick-next"><svg class="svg-icon"><use xlink:href="#svg-icon-slider-right"></use></svg></span>',
                    dots: !0,
                    responsive: [{breakpoint: View.breakpoints["xs-max"], settings: {dots: !0}}]
                })
            }
        }, props: {options: {type: Object}}, methods: {
            create: function () {
                var e = this, t = $(this.$el);
                t.on("afterChange", this.onAfterChange), t.on("beforeChange", this.onBeforeChange), t.on("breakpoint", this.onBreakpoint), t.on("destroy", this.onDestroy), t.on("edge", this.onEdge), t.on("init", this.onInit), t.on("reInit", this.onReInit), t.on("setPosition", this.onSetPosition), t.on("swipe", this.onSwipe), t.on("lazyLoaded", this.onLazyLoaded), t.on("lazyLoadError", this.onLazyLoadError), t.on("beforeChange touchstart", function () {
                    t.addClass("slick-animated")
                }), t.on("afterChange touchend", function () {
                    t.removeClass("slick-animated")
                }), Vue.nextTick(function () {
                    Vue.nextTick(function () {
                        $(e.$el).slick(e.localOptions)
                    })
                })
            }, reSlick: function () {
                $(this.$el).slick("unslick"), this.create()
            }, setPosition: function () {
                $(this.$el).slick("setPosition")
            }, next: function () {
                $(this.$el).slick("slickNext")
            }, prev: function () {
                $(this.$el).slick("slickPrev")
            }, pause: function () {
                $(this.$el).slick("slickPause")
            }, play: function () {
                $(this.$el).slick("slickPlay")
            }, goTo: function (e, t) {
                $(this.$el).slick("slickGoTo", e, t)
            }, currentSlide: function () {
                $(this.$el).slick("slickCurrentSlide")
            }, add: function (e, t, i) {
                $(this.$el).slick("slickAdd", e, t, i)
            }, remove: function (e, t) {
                $(this.$el).slick("slickRemove", e, t)
            }, filter: function (e) {
                $(this.$el).slick("slickFilter", e)
            }, unfilter: function () {
                $(this.$el).slick("slickUnfilter")
            }, getOption: function (e) {
                $(this.$el).slick("slickGetOption", e)
            }, setOption: function (e, t, i) {
                $(this.$el).slick("slickSetOption", e, t, i)
            }, onAfterChange: function (e, t, i) {
                this.$emit("afterChange", e, t, i)
            }, onBeforeChange: function (e, t, i, o) {
                this.$emit("beforeChange", e, t, i, o), this.setDotClasses(e, t, i, o)
            }, onBreakpoint: function (e, t, i) {
                this.$emit("breakpoint", e, t, i)
            }, onDestroy: function (e, t) {
                this.$emit("destroy", e, t)
            }, onEdge: function (e, t, i) {
                this.$emit("edge", e, t, i)
            }, onInit: function (e, t) {
                this.$emit("init", e, t)
            }, onReInit: function (e, t) {
                this.$emit("reInit", e, t)
            }, onSetPosition: function (e, t) {
                this.$emit("setPosition", e, t)
            }, onSwipe: function (e, t, i) {
                this.$emit("swipe", e, t, i)
            }, onLazyLoaded: function (e, t, i, o) {
                this.$emit("lazyLoaded", e, t, i, o)
            }, onLazyLoadError: function (e, t, i, o) {
                this.$emit("lazyLoadError", e, t, i, o)
            }, setDotClasses: function (e, t, i, o) {
                var s = this;
                this.jqueryEl.find(".slick-dots li").removeClass("slick-dot-on-edge slick-dot-out-of-edge").each(function (e, t) {
                    var i = Math.max(0, 5 - o);
                    5 < o && o - e == 5 - i || o < s.$slots.default.length - 5 && o - e == -5 - i ? $(t).addClass("slick-dot-on-edge") : (5 - i < o - e || o - e < -5 - i) && $(t).addClass("slick-dot-out-of-edge")
                })
            }
        }, mounted: function () {
            var e = this;
            this.create(), this.jqueryEl = $(this.$el), Vue.nextTick(function () {
                setTimeout(function () {
                    e.setDotClasses(null, null, 0, 0)
                }, 200)
            })
        }, beforeDestroy: function () {
            $(this.$el).slick("unslick")
        }
    })
}), define("vue!slider-related-products/component", ["app", "vue!slick/component", "vue!product/component"], function (e) {
    Vue.component("slider-related-products", {
        template: '<slick ref="slider" class="slider-products slider-products--related slider-products--no-tail slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="localOptions"> <div class="product-slide" v-for="product in products"> <product :product="product" :show-rating="!hideRating" :show-quick-view="true" :show-buy-button="true" :show-fav-button="true"></product> </div> </slick>',
        data: function () {
            var e = this;
            return {
                products: [],
                localOptions: _.defaults(e.options || {}, {
                    slidesToShow: "modal" == e.mode ? 4 : (e.mode, 3),
                    slidesToScroll: "modal" == e.mode ? 4 : (e.mode, 3),
                    responsive: [{
                        breakpoint: View.breakpoints["sm-max"],
                        settings: {
                            slidesToShow: ("modal" == e.mode || e.mode, 3),
                            slidesToScroll: ("modal" == e.mode || e.mode, 3)
                        }
                    }, {
                        breakpoint: View.breakpoints["xs-max"],
                        settings: {slidesToShow: 2, slidesToScroll: 1, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["4xs-max"],
                        settings: {slidesToShow: 1, slidesToScroll: 1, swipeToSlide: !0, arrows: !1, dots: !0}
                    }]
                })
            }
        },
        props: {
            productsList: {default: null},
            options: {default: null},
            dataSource: {default: null},
            hideRating: {type: Boolean, default: !1},
            hideParams: {type: Boolean, default: !1},
            mode: {default: "side"}
        },
        mounted: function () {
            var t = this;
            t.dataSource && !t.productsList ? $.get({url: t.dataSource, dataType: "json"}).done(function (e) {
                t.products = e.products, t.$refs.slider.reSlick()
            }).fail(function (e) {
                console.warn("related products ajax fail: ", e)
            }) : t.productsList && (t.products = t.productsList)
        },
        updated: function () {
            try {
                this.$refs.slider.setPosition()
            } catch (e) {
            }
        }
    })
}), define("vue!basket-action-success/component", ["Model", "vue!slider-related-products/component", "vue!product/component"], function (t) {
    Vue.component("basket-action-success", {
        template: '<div> <div class="modal__product-in-basket"> <div class="product-in-basket"> <div class="product-in-basket__products"> <product v-for="product in lastAddedProducts" :key="product.offerId" :product="product" list-item></product> </div> <div class="product-in-basket__btn-row"> <button type="button" class="btn js-close-modal"> <span class="btn__inner">Продолжить покупки</span> </button> <a href="/order/" class="btn btn--primary"> <span class="btn__inner">Оформить заказ</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </a> </div> </div> </div> <div v-for="product in lastAddedProducts"> <div class="modal__group flc" v-if="relatedProductsLink && !touchMode && product.brand"> <div class="modal__separator"> <h5 class="modal__separator-title">Не забудьте купить</h5> </div> <slider-related-products :data-source="relatedProductsLink" mode="modal-sm" :hide-rating="true" :hide-params="true"></slider-related-products> </div> </div> </div>',
        data: function () {
            return {lastAddedProducts: [], relatedProductsLink: null, touchMode: !1}
        },
        created: function () {
            this.touchMode = View.mobileAndTabletCheck, this.relatedProductsLink = t.basket.lastAddedRelatedSource, this.lastAddedProducts = _.filter(t.basket.products, function (e) {
                return 0 <= t.basket.lastAddedProductIds.indexOf(e.offerId)
            })
        }
    })
}), define("vue!basket-full/component", ["Model", "vue!select-input/component", "vue!product/component", "vue!rich-text-input/component"], function (o) {
    Vue.component("basket-full", {
        template: '<transition name="content-fade" mode="out-in"> <div class="basket-full" v-if="basketCount > 0 || basketDelayedCount > 0"> <div class="basket-full__main"> <div class="basket-full__main-blocks flc" v-if="$slots.infoBlock || $slots.infoBlockAvail || enableAvailSelector"> <div class="info-blocks grid default-grid"> <slot name="infoBlock"></slot> <div class="info-blocks__item default-grid__item col col-lg-6 col-2xs-12" v-if="enableAvailSelector"> <div class="info-block"> <div class="info-block__container"> <div class="info-block__title flc"> <div class="icon-text icon-text--inline"> <div class="icon-text__icon"> <svg class="svg-icon svg-icon--20 c-primary-alt"><use xlink:href="#svg-icon-sample"></use></svg> </div> <div class="icon-text__text">Проверить наличие в магазине</div> </div> </div> <div class="info-block__input flc"> <select-input :options="shopsAsOptions" block lite size="sm" placeholder="Выбрать магазин" v-model="currentShop"></select-input> </div> </div> </div> </div> </div> </div> <transition name="content-fade"> <div class="basket-full__products flc" v-if="basketCount > 0"> <div class="basket-full__products-list"> <transition-group name="content-fade" tag="div"> <product v-for="product in basket.products" :show-rating="false" v-if="!product.delayed" :key="product.productId" :product="product" :list-item="true" :show-buy-button="true" :show-fav-button="false" :show-alt-actions="true" :bind-basket-count="true" :list-item-lg="true" :basket-mode="true"></product> </transition-group> </div> <div class="basket-full__products-summary"> <div class="bubble bubble--arrow-top"> <div class="dot-line-list"> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Сумма</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <div class="price"> <strong>{{basketPrice | formatPrice}} </strong> <small>руб.</small> </div> </div> </div> </div> </div> </div> </div> </transition> <transition name="content-fade"> <div class="basket-full__group flc" v-if="basketDelayedCount > 0"> <div class="basket-full__group-header"> <h2 class="basket-full__group-title">Отложенные товары</h2> </div> <div class="basket-full__products-list"> <transition-group name="content-fade" tag="div"> <product v-for="product in basket.products" v-if="product.delayed" :key="product.productId" :id="product.productId" :offerId="product.offerId" :link="product.link" :image="product.image" :brand="product.brand" :name="product.name" :price="product.price" :price-old="product.priceOld" :code="product.code" :quantity="product.quantity" :delayed="product.delayed" :params="product.params" :delivery="product.delivery" :favorite="product.favorite" :list-item="true" :show-buy-button="true" :show-fav-button="false" :show-alt-actions="true" :bind-basket-count="true" :list-item-lg="true" :basket-mode="true"></product> </transition-group> </div> </div> </transition> </div> <div class="basket-full__aside"> <div class="summary-block summary-block--receipt"> <div class="summary-block__floor"> <div class="discount"> <div class="discount__icon"> <div class="discount__icon-box"> <img src="/local/images/markup-images/discount/discount-card-1.png" alt="Карта Кравт"> </div> </div> <div class="discount__main"> <h4 class="discount__title">Дисконтная программа</h4> <div class="discount__text">Моя скидка: <span class="discount__value">-6%</span></div> </div> </div> </div> <div class="summary-block__floor"> <div class="foldable-list"> <div class="foldable-list__item" v-if="enablePromocode"> <div class="foldable-block js-accordion"> <div class="foldable-block__bar"> <span class="link link--dd link--local link--undecorated js-accordion__bar"> <span class="link__text">Есть промокод?</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use></svg> </span> </div> <div class="foldable-block__body foldable-block__body--sm js-accordion__body"> <div class="one-row-form"> <div class="one-row-form__cell-input"> <rich-text-input type="text" v-model="promocode" placeholder="Введите промокод" lite size="sm"></rich-text-input> </div> <div class="one-row-form__cell-btn"> <button type="button" class="btn btn--sm"> <span class="btn__inner">Применить</span> </button> </div> </div> </div> </div> </div> <div class="foldable-list__item" v-if="enableGiftCert"> <div class="foldable-block js-accordion"> <div class="foldable-block__bar"> <span class="link link--dd link--local link--undecorated js-accordion__bar"> <span class="link__text">Подарочный сертификат</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use></svg> </span> </div> <div class="foldable-block__body foldable-block__body--sm js-accordion__body"> <div class="one-row-form"> <div class="one-row-form__cell-input"> <rich-text-input type="text" v-model="giftCertCode" placeholder="Введите код" lite size="sm"></rich-text-input> </div> <div class="one-row-form__cell-btn"> <button type="button" class="btn btn--sm" @click="giftCertCodeSubmit" > <span class="btn__inner">Применить</span> </button> </div> </div> </div> </div> </div> <div class="foldable-list__item"> <div class="foldable-block js-accordion"> <div class="foldable-block__bar"> <span class="link link--dd link--local link--undecorated js-accordion__bar"> <span class="link__text">Комментарий к заказу</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use></svg> </span> </div> <div class="foldable-block__body foldable-block__body--sm js-accordion__body"> <div class="one-row-form"> <rich-text-input type="textarea" v-model="comment" placeholder="Ваш комментарий"></rich-text-input> </div> </div> </div> </div> </div> </div> <div class="summary-block__floor summary-block__floor--dark" v-if="freeDeliveryPrice > basketPrice"> <ul class="small-info-list"> <li class="small-info-list__item small-info-row small-info-row--color-alt"> <div class="small-info-row__icon"> <svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg> </div> <div class="small-info-row__text">Добавьте товаров на <b>{{(freeDeliveryPrice - basketPrice) | formatPrice}} руб.</b>, чтобы получить бесплатную доставку в ваш регион ({{geolocation.city.name}})</div> </li> </ul> </div> <div class="summary-block__floor summary-block__floor--dark"> <div class="dot-line-list"> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Товаров</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end">{{basketCount}}</div> </div> <transition name="content-fade"> <div class="dot-line-list__item dot-line-row" v-if="basketSale > 0"> <div class="dot-line-row__start">Скидка</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"><b>-{{basketSale | formatPrice}} руб.</b></div> </div> </transition> <div class="dot-line-list__item dot-line-row dot-line-row--lg"> <div class="dot-line-row__start">Итого</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <div class="price price--strong"> <strong class="price__new">{{basketPrice | formatPrice}} </strong> <small class="price__new-curr">руб.</small> </div> </div> </div> </div> <div class="summary-block__btn-row"> <button @click="commentSubmit" class="btn btn--primary btn--lg btn--block"> <span class="btn__inner">Оформить заказ</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </div> </div> <div class="summary-block__end summary-block__end--receipt"> <svg viewBox="0 0 100 5" class=""> <line x1="3" x2="100" y1="5" y2="5" style="vector-effect: non-scaling-stroke;" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-dasharray=".001, 20" /> </svg> </div> </div> </div> </div> <div class="empty-basket-block" v-if="basketCount == 0 && basketDelayedCount == 0"> <h2 class="empty-basket-block__title">Ваша корзина пуста</h2> <div class="empty-basket-block__btn-row"> <a href="/" class="btn btn--primary btn--lg"> <svg class="btn__icon btn__icon--left btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-left"></use> </svg> <span class="btn__inner">Вернуться на главную</span> </a> </div> </div> </transition>',
        data: function () {
            return {
                submitUrl: "/order/checkout/",
                basket: o.basket,
                basketPrice: o.basketPrice,
                basketSale: o.basketSale,
                basketCount: o.basketCount,
                basketDelayedCount: o.basketDelayedCount,
                basketPriceWithDelivery: o.basketPriceWithDelivery,
                shops: o.shops,
                currentShop: null,
                user: o.user,
                geolocation: o.geolocation,
                promocode: null,
                giftCertCode: null,
                comment: null
            }
        },
        computed: {
            shopsAsOptions: function () {
                return _.map(o.shops, function (e) {
                    return {text: e.name, value: e.id}
                })
            }
        },
        props: {
            products: {default: null},
            initComment: {default: ""},
            freeDeliveryPrice: {default: 0},
            deliveryPrice: {default: 0},
            enableAvailSelector: {type: Boolean, default: !1},
            enablePromocode: {type: Boolean, default: !1},
            bxajaxid: {default: ""},
            enableGiftCert: {type: Boolean, default: !1}
        },
        methods: {
            commentSubmit: function () {
                var t = this;
                if (t.comment.length) {
                    var e = [];
                    e.push({name: "bxajaxid", value: t.bxajaxid}), e.push({
                        name: "COMMENT",
                        value: t.comment
                    }), $.post({url: t.submitUrl, data: e, dataType: "json"}).done(function (e) {
                        window.location = t.submitUrl
                    }).fail(function (e) {
                        console.log("basket submit fail")
                    })
                } else window.location = t.submitUrl
            }, giftCertCodeSubmit: function (e) {
                var t = this;
                if (t.giftCertCode.length) {
                    var i = [];
                    i.push({name: "bxajaxid", value: t.bxajaxid}), i.push({
                        name: "COUPON",
                        value: t.giftCertCode
                    }), $.post({url: t.submitUrl, data: i, dataType: "json"}).done(function (e) {
                        o.updateBasket(e.products, !1), t.giftCertCode = e.giftCertCode, t.errors.form = e.errors.form, t.errors.fields = []
                    }).fail(function (e) {
                        console.log("basket submit fail")
                    })
                }
            }
        },
        filters: {formatPrice: o.formatPrice},
        created: function () {
            var e = this;
            e.comment = e.initComment, o.$on("basketUpdated", function () {
                e.basket = o.basket, e.basketPrice = o.basketPrice, e.basketSale = o.basketSale, e.basketCount = o.basketCount, e.basketDelayedCount = o.basketDelayedCount, e.basketPriceWithDelivery = o.basketPriceWithDelivery
            })
        },
        mounted: function () {
            this.products && (console.log("full basket", this.products), o.updateBasket(this.products, this.bxajaxid))
        }
    })
}), define("vue!product-in-checkout/component", ["Model", "vue!rating-block/component", "vue!basket-action/component", "vue!system-message/component", "vue!fav-btn/component"], function (t) {
    Vue.component("product-in-checkout", {
        template: '<div class="product product-in-checkout"> <a class="product__link" :href="product.link" v-if="product.link && !notFollowLink"></a> <div class="product__link" v-if="product.link && notFollowLink" @click="$emit(\'linkClick\')"></div> <div class="product__image-container basket-product-box--photo"> <div class="product__image" v-if="product.image" :style="{\'background-image\': \'url(\'+product.image+\')\'}"> </div> <div class="product__image" v-else> <div class="product__no-image" v-if="!product.image"> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> <div class="product__status-container"> <div class="product__status status" v-if="product.status" :class="statusItem.class" v-for="statusItem in product.status">{{statusItem.name}}</div> </div> </div> <div class="basket-product-box--name"> <div class="product__name" v-if="product.name">{{product.name}}</div> <div class="product__params" v-if="product.params || (!basketMode && product.count)"> <div class="product__param" v-for="param in product.params" v-if="showParams"> <span class="product__param-name" v-if="param.name">{{param.name}}:</span> <span class="product__param-value">{{param.value}}</span> </div> <div class="product__param" v-if="product.code">Код: {{product.code}}</div> </div> <div class="product__offers-count" v-if="product.offersCount"> {{product.offersCount}} </div> <div class="" v-if="product.code">Артикул: {{product.code}}</div><div class="product__instore-wrap"> <div class="product__instore instore js_in-stock" v-if="(typeof product.quantity === \'number\' && product.quantity > 0)">В наличии </div> <div class="product__instore" v-else>Под заказ {{product.deliveryDays || 7}} дней</div><div class="js_in-stock-list" style="display: none;"><ul class="in-stock-table"><li class="in-stock-table__header" v-if="product.counts_new>0"><div>Доступно всего:</div><div>{{product.counts_new}} шт.</div></li></ul><ul class="in-stock-table in-stock-table__rows"><li  class="in-stock-table__row" v-for="amount in product.amount_new"><div>{{amount.name}}</div><div>{{amount.amount}} шт.</div></li></ul></div></div> </div> <div class="basket-product-box--count"> <div class="product__action flc" v-if="showBuyButton && (product.price || product.priceRange)"> <basket-action v-if="product.price && !product.offersCount" :offer-id="product.offerId" :max-count="product.quantity || Infinity" :basket-mode="basketMode" :bind-basket-count="bindBasketCount" :show-button="false" :disabled="disableActions"></basket-action> <system-message :text="priceNotification || product.priceNotification" :open="true" mode="tip" type="error" :auto-hide="true" v-if="priceNotification || product.priceNotification"></system-message> </div> </div> <div class="basket-product-box--price"> <div class="price" v-if="product.price"> <strike v-if="product.priceOld">{{product.priceOld | formatPrice}} <span > руб. </span></strike> <strong class="checkout-price" v-if="product.price" :class="{\'price__new\': product.priceOld}">{{product.price | formatPrice}}</strong> <span class="price__new price__units">руб.</span> <span class="price__units" v-if="product.calculator && product.calculator.from_unit"> / за {{product.calculator.from_unit_name_full}} </span> </div> <div v-if="product.calculator && product.calculator.from_unit && product.calculator.to_unit && product.calculator.ratio" class="checkout__inpack">в {{product.calculator.from_unit}} = {{product.calculator.ratio}} {{product.calculator.to_unit}}</div> </div> <div class="basket-product-box--remove"> <svg class="svg-icon checkout__remove-btn" @click="remove"><use xlink:href="#svg-icon-delete"></use></svg> </div> </div>',
        data: function () {
            return {
                authorized: t.authorized,
                favoritesEnabled: t.favorites.enabled,
                quickViewEnabled: t.quickView.enabled
            }
        },
        props: {
            product: {
                default: function () {
                    return {}
                }
            },
            productId: {default: 0},
            offerId: {default: 0},
            image: {type: String, default: null},
            showCode: {default: !1},
            code: {type: String, default: null},
            brand: {type: String, default: null},
            name: {type: String, default: null},
            link: {type: String, default: null},
            price: {default: null},
            priceOld: {default: null},
            priceRange: {default: null},
            status: {default: null},
            showRating: {default: null},
            rating: {default: null},
            delivery: {default: null},
            quantity: {default: null},
            count: {default: null},
            offersCount: {default: null},
            delayed: {type: Boolean, default: !1},
            params: {default: null},
            listItem: {type: Boolean, default: !1},
            listItemShort: {type: Boolean, default: !1},
            listItemLg: {type: Boolean, default: !1},
            showBuyButton: {type: Boolean, default: !1},
            bindBasketCount: {type: Boolean, default: !1},
            showRemoveButton: {type: Boolean, default: !1},
            showFavButton: {type: Boolean, default: !1},
            showAvailabilityButton: {type: Boolean, default: !1},
            showQuickView: {type: Boolean, default: !1},
            showAltActions: {type: Boolean, default: !1},
            notFollowLink: {type: Boolean, default: !1},
            basketMode: {type: Boolean, default: !1},
            showCatalogPropsAnyway: {type: Boolean, default: !1},
            priceNotification: {default: null},
            showParams: {type: Boolean, default: !0},
            disableActions: {type: Boolean, default: !1}
        },
        methods: {
            remove: function () {
                t.removeFromBasket(this.product.offerId)
            }, delay: function () {
                this.$emit("remove"), t.addToDelayed(this.product.offerId)
            }, fromDelayedToBasket: function () {
                t.removeFromDelayed(this.product.offerId), t.addToBasket(this.product.offerId)
            }, fromBasketToDelayed: function () {
                t.removeFromBasket(this.product.offerId), t.addToDelayed(this.product.offerId)
            }, openPreview: function () {
                t.showProductPreviewModal(this.product.productId, this.product.offerId, this.product.link)
            }, showAvailabilityModal: function () {
                t.showProductAvailabilityModal(this.product.productId, this.product.offerId)
            }, showProductSubscriptionModal: function () {
                t.showProductSubscriptionModal(this.product.productId, this.product.offerId)
            }
        },
        filters: {formatPrice: t.formatPrice},
        created: function () {
            !this.product.productId && this.productId && (this.product.productId = this.productId), !this.product.offerId && this.offerId && (this.product.offerId = this.offerId), !this.product.image && this.image && (this.product.image = this.image), !this.product.code && this.code && (this.product.code = this.code), !this.product.brand && this.brand && (this.product.brand = this.brand), !this.product.name && this.name && (this.product.name = this.name), !this.product.link && this.link && (this.product.link = this.link), !this.product.price && this.price && (this.product.price = this.price), !this.product.priceOld && this.priceOld && (this.product.priceOld = this.priceOld), !this.product.priceRange && this.priceRange && (this.product.priceRange = this.priceRange), !this.product.minStep && this.minStep && (this.product.minStep = this.minStep), !this.product.status && this.status && (this.product.status = this.status), !this.product.delivery && this.delivery && (this.product.delivery = this.delivery), !this.product.quantity && this.quantity && (this.product.quantity = this.quantity), !this.product.count && this.count && (this.product.count = this.count), !this.product.offersCount && this.offersCount && (this.product.offersCount = this.offersCount), !this.product.delayed && this.delayed && (this.product.delayed = this.delayed), !this.product.params && this.params && (this.product.params = this.params), !this.product.priceNotification && this.priceNotification && (this.product.priceNotification = this.priceNotification), t.$on(["signIn", "signUp", "signInSilent", "signOut"], function (e) {
                this.authorized = t.authorized
            })
        }
    })
}), define("vue!rich-text-input-checkout/component", ["app", "vue!select-input/component", "vue!file-input/component"], function (e) {
    Vue.component("rich-text-input-checkout", {
        data: function () {
            return {
                localValue: null,
                suggestionsOpen: !1,
                suggestionsTimeout: null,
                extrafieldPhone: !1,
                extrafieldPhoneValue: ""
            }
        },
        props: {
            index: {default: null},
            type: {type: String, default: "text"},
            readonly: {type: Boolean, default: !1},
            hiddenDefault: {default: !1},
            label: {type: String, default: null},
            textinfo: {default: ""},
            placeholder: {default: null},
            mask: {default: null},
            value: {default: null},
            disabled: {type: Boolean, default: !1},
            size: {default: null},
            lite: {type: Boolean, default: !1},
            prefix: {default: null},
            options: {default: null},
            error: {default: null},
            rootClass: {default: null},
            suggestions: {
                default: function () {
                    return []
                }
            },
            multiple: {type: Boolean, default: !1},
            limit: {default: 1 / 0},
            topLocations: {default: null}
        },
        template: '<div class="rich-text-input rich-text-input-checkout" :class="{\'rich-text-input--w-label\': label, \'rich-text-input--w-prefix\': prefix, \'rich-text-input--textarea\': type === \'textarea\', \'rich-text-input--sm\': size === \'sm\', \'filled\': localValue && localValue.length > 0, \'rich-text-input--file\': type == \'file\', \'form-error\': error, \'hiddenDefault\': hiddenDefault===true }"> <label class="rich-text-input__label-checkout" v-if="type!==\'hidden\' && hiddenDefault!==true && label || rootClass">{{label}} </label> <div class="input rich-text-input__input-checkout" v-if="hiddenDefault!==true"> <input :type="type || \'text\'" class="rich-text-input__input text-input" :disabled="disabled" :readonly="readonly" autocomplete="off" v-if="type !== \'textarea\' && type !== \'select\' && type !== \'file\'" :class="{\'text-input--lg\': size == \'lg\', \'text-input--sm\': size == \'sm\', \'js-has-inputmask\': mask}" :placeholder="placeholder" v-mask="mask" :value="value" @input="localValue = $event.target.value; $emit(\'input\', $event.target.value)" :id="index" @focus="inputFocus" @blur="inputBlur" novalidate> <span class="subinput-note" v-if="type===\'tel\' && hiddenDefault!==true">Нужен для связи с вами</span> <textarea class="rich-text-input__input text-input" :disabled="disabled" autocomplete="off" v-if="type === \'textarea\'" :placeholder="placeholder" :value="value" @input="localValue = $event.target.value; $emit(\'input\', $event.target.value)" @focus="inputFocus" @blur="inputBlur">{{placeholder}}</textarea> <select-input :disabled="disabled" v-if="type === \'select\'" :placeholder="placeholder" :lite="lite" :value="value" :options="options" :rootClass="rootClass" block @input="localValue = $event; $emit(\'input\', $event)" @open="$emit(\'open\')" @close="$emit(\'close\')"></select-input> <file-input class="rich-text-input__input" :disabled="disabled" v-if="type === \'file\'" :textinfo="textinfo" @input="localValue = $event; $emit(\'input\', $event)" @open="$emit(\'open\')" @close="$emit(\'close\')"></file-input> <label v-if="label && type == \'checkbox\'" class="rich-text-input__label" :for="index">{{label}}</label> <span class="rich-text-input__prefix" v-if="prefix">{{prefix}}</span> <span class="rich-text-input__border"></span> <ul class="rich-text-input__suggestions select-list" :class="{open: suggestionsOpen}" v-if="suggestions && suggestions.length"> <li class="rich-text-input__suggest" v-for="suggest in suggestions" @click.stop.prevent="suggestionClick(suggest)">{{suggest.show_value}} </li> </ul> <div class="form-suggestions flc" v-if="topLocations"> <div class="form-suggestions__flex"> <div class="form-suggestions__item" v-for="location in topLocations"> <span class="link" @click="localValue=location.data; value=location.data;">{{location.show_value}}</span> </div> </div> </div> <transition name="content-fade" @enter="slideDown" @leave="slideUp"> <span class="rich-text-input__message rich-text-input__message--error" v-if="error && error.message">{{error.message}}</span> </transition> </div> <span class="clone-field-link" v-if="hiddenDefault===true" @click=" hiddenDefault=false">+ Добавить еще один</span> </div>',
        methods: {
            slideDown: function (e, t) {
                $(e).hide().slideDown(300, t)
            }, slideUp: function (e, t) {
                $(e).show().slideUp(300, t)
            }, inputFocus: function () {
                clearTimeout(this.suggestionsTimeout), this.suggestionsOpen = !0, this.$emit("focus")
            }, inputBlur: function () {
                var e = this;
                clearTimeout(this.suggestionsTimeout), this.suggestionsTimeout = setTimeout(function () {
                    e.suggestionsOpen = !1, e.$emit("delayedBlur")
                }, 200), this.$emit("blur")
            }, suggestionClick: function (e) {
                this.localValue = e, this.$emit("input", e.value, {
                    suggest: !0,
                    data: e.data
                }), clearTimeout(this.suggestionsTimeout), this.suggestionsOpen = !1
            }
        },
        created: function () {
        },
        mounted: function () {
            var t = this;
            this.localValue = this.value, $(this.$el).find(".js-has-inputmask").on("keyup.vueRichTextInputInput change.vueRichTextInputInput paste.vueRichTextInputInput", function (e) {
                t.localValue = e.target.value, t.$emit("input", t.localValue)
            })
        }
    })
}), define("vue!form-city-select/component", ["Model", "vue!rich-text-input-checkout/component"], function (t) {
    Vue.component("form-city-select", {
        template: '<div class="form-city-select"> <transition name="content-fade"> <div class="rich-form-message rich-form-message--error" v-if="query && query.length && !canConfirm">Пожалуйста, выберите город из списка.</div> </transition> <rich-text-input-checkout v-model="query" type="search" placeholder="Начните вводить город" :suggestions="suggestions" :label="\'Населенный пункт\'" :topLocations="topLocations" @input="queryInput" @focus="queryFocus"></rich-text-input-checkout> </div>',
        data: function () {
            return {cityID: 0, query: null, suggestions: [], suggestionsBase: [], inputTimeout: null}
        },
        computed: {
            canConfirm: function () {
                return this.cityID
            }
        },
        props: {topLocations: {default: null}},
        methods: {
            confirmCity: function () {
                this.cityID && t.setGeolocation(this.cityID, function () {
                    View.control.closeModal()
                })
            }, setCity: function (e) {
                t.setGeolocation(e, function () {
                    View.control.closeModal()
                })
            }, rejectCity: function () {
                View.control.closeModal()
            }, queryFocus: function () {
                this.query = ""
            }, queryInput: function (e, t) {
                var i = this;
                t && t.suggest ? t.data ? this.cityID = t.data : this.cityID = 0 : (this.cityID = 0, clearTimeout(this.inputTimeout), this.inputTimeout = setTimeout(function () {
                    $.post({
                        url: "/local/components/sh/citySelect/search.php",
                        dataType: "json",
                        data: {query: i.query}
                    }).done(function (e) {
                        i.suggestionsBase = e.suggestions, i.suggestions = e.suggestions, console.log(e)
                    }).fail(function (e) {
                        i.suggestions = [], i.suggestionsBase = [], console.warn("form-city-select ajax failed:", e)
                    })
                }, 500))
            }
        }
    })
}), define("vue!checkout-main/component", ["Model", "vue!product-in-checkout/component", "vue!system-message/component", "vue!rich-text-input-checkout/component", "vue!form-city-select/component"], function (a) {
    Vue.component("checkout-main", {
        template: '<transition name="content-fade" mode="out-in"> <div class="empty-basket-block" v-if="order.basketPrice == 0 && state != \'success\' && state != \'payment\'"> <h2 class="empty-basket-block__title">Ваша корзина пуста</h2> <transition name="content-fade"> <div class="basket-full__products flc"> <div class="basket-full__products-list"> <div v-for="product in basket.products"> \x3c!--system-message :text="product.errors" :open="true" type="error" v-if=\'product.errors\'></system-message--\x3e <product-in-checkout :show-rating="false" v-if="!product.delayed" :key="product.productId" :product="product" :list-item="true" :show-buy-button="true" :show-fav-button="false" :show-alt-actions="true" :bind-basket-count="true" :list-item-lg="true" :basket-mode="true" :price-notification="product.errors" :show-params="false" :disable-actions="!!basketLoading"></product-in-checkout> </div> </div> </div> </transition> <div class="empty-basket-block__btn-row"> <a href="/" class="btn btn--primary btn--lg"> <svg class="btn__icon btn__icon--left btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-left"></use> </svg> <span class="btn__inner">Вернуться на главную</span> </a> </div> </div> <div class="checkout-main" v-if="(state == \'checkout\' || state == \'products\') && order.basketPrice>0" key="checkout"> <div class="checkout-main__main"> <div v-if="order.basketCount > 0 && state == \'products\'"> <system-message :text="errors.form" :open="true" type="error" v-if=\'errors.form\'></system-message> <div class="basket-full__main-blocks flc" v-if="presents.message"> <div class="block-links"> <div class="block-links__grid grid"> <div class="block-links__col col col-lg-12"> <div class="block-link block-link--reflex icon-reflex-parent" @click="showPresentsInModal"> <div class="block-link__cell-img"> <div class="block-link__img-box"> <div class="icon-group"> <img src="/local/images/markup-images/advantages/advantage-2.svg" alt="" class="icon-no-reflex"> <img src="/local/images/markup-images/advantages/advantage-2-reflex.svg" alt="" class="icon-reflex"> </div> </div> </div> <div class="block-link__cell-txt"> <p class="block-link__p flc">Бесплатные пробники с заказом: {{presents.message}}</p> <div class="block-link__btn-row flc" v-if="presents.avalable>0"> <span class="btn"> <span class="btn__inner">Добавить</span> </span> </div> </div> </div> </div> </div> </div> </div> <transition name="content-fade"> <div class="basket-full__products flc"> <div class="basket-full__products-list"> <div class="basket-full__title "> <div class="basket-title basket-product-box--photo">Фото</div> <div class="basket-title basket-product-box--name">Наименование</div> <div class="basket-title basket-product-box--count">Количество</div> <div class="basket-title basket-product-box--price">Цена</div> <div class="basket-title basket-product-box--remove"></div> </div> <div v-for="product in basket.products"> \x3c!--system-message :text="product.errors" :open="true" type="error" v-if=\'product.errors\'></system-message--\x3e <product-in-checkout :show-rating="false" v-if="!product.delayed" :key="product.productId" :product="product" :list-item="true" :list-item-lg="true" :basket-mode="true" :show-buy-button="true" :show-fav-button="false" :show-alt-actions="true" :bind-basket-count="true" :price-notification="product.errors" :show-params="false" :disable-actions="!!basketLoading"></product-in-checkout> </div> <div v-for="product in presentsProduct" :key="product.productId" v-if="presentsProduct"> \x3c!--system-message :text="product.errors" :open="true" type="error" v-if=\'product.errors\'></system-message--\x3e <product-in-checkout :product="product" :not-follow-link="true" :list-item="true" :list-item-lg="true" :basket-mode="true" :show-rating="false" :show-buy-button="false" :show-fav-button="false" :price-notification="product.errors" :show-params="false" :disable-actions="!!basketLoading"> <div class="product__alt-action flc" slot="button"> <div class="product__alt-action-grid"> <div class="product__alt-action-item"> <span class="link link--local" @click="removeFromBasket(product)">Удалить</span> </div> </div> </div> </product-in-checkout> </div> </div> \x3c!--<div class="basket-full__products-summary" v-if="!currentStep"> <div class="bubble bubble--arrow-top"> <div class="dot-line-list"> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Сумма</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <div class="price"> <strong>{{order.basketPrice | formatPrice}} </strong> <small>руб.</small> </div> </div> </div> </div> </div> </div>--\x3e </div> </transition> </div> <div v-if="state == \'checkout\' || state == \'products\' && currentStep"> <system-message :text="errors.form" :open="true" type="error" v-if=\'errors.form\'></system-message> <div class="form-w-steps"> <section class="form-w-steps__step form-step flc" :class="{\'form-step--current\': step.current, \'form-step--completed\': step.completed && !step.current, \'form-step--error\': step.error}" v-for="(step, stepKey) in steps"> <header class="form-step__header step-header" :class="{\'step-header--current\': step.current, \'step-header--completed\': step.completed && !step.current, \'step-header--error\': step.error}"> <div class="step-header__cell-title"> <h2 class="step-header__title">{{step.title}}</h2> </div> <transition name="content-fade"> <div class="step-header__cell-action" v-if="step.completed && !step.current"> <a href="javascript:void(0)" class="link link--local" @click="editFormStep(stepKey)">Изменить</a> </div> </transition> </header> <transition-group tag="div" @enter="stepBodyEnterAnimation" @leave="stepBodyLeaveAnimation" mode="out-in" :css="false"> \x3c!-- current steps --\x3e <div class="form-step__body" v-if="step.current && formsKey == stepKey" :key="stepKey" v-for="(formData, formsKey) in forms"> <div class="form-card form-card--w-arrow flc" :class="{\'form-card--loading\': step.loading}"> \x3c!--transition name="content-fade"> <div class="form-card__preloader" v-if="step.loading"> <svg class="spinner spinner--default active" viewBox="0 0 80 80"> <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle> </svg> </div> </transition--\x3e <form class="form flc" :class="stepKey+\'-form\'" @submit.prevent="submitFormStep(stepKey, true)"> <div class="rich-form-row" v-for="field in formData.fields" v-if="formData.fields" :key="field.name" :class="field.rootClass"> \x3c!--<h3 class="form__subtitle flc" slot="input" v-if="(field.type == \'radioblocks\' || field.type == \'slotblocks\') && field.options">{{field.summaryLabel}}</h3>--\x3e <div class="check-blocks" slot="input" v-if="field.type == \'slotblocks\' && field.options"> <div class=""> <div class="check-blocks__row" v-for="option in field.options"> <label class="checkbox "> <input type="radio" class="checkbox-row__input" :name="field.name" :value="option.value" @change="submitFormStep(stepKey, false)" v-model="field.value"> <span class="checkbox__visual checkbox-row__visual"> </span> <span class="checkbox__text checkbox--delivery-checkout"> {{option.label}} \x3c!--<span class="check-block__strong" v-if="option.showPrice && option.price>0">{{option.price | formatPrice}} руб.</span> <span class="check-block__strong" v-if="option.showPrice && option.price==0">Бесплатно</span>--\x3e </span> \x3c!-- <span class="check-block__tooltip" v-if="option.text"> <span class="inline-tooltip dropdown-owner dropdown-arrow-owner js-dropdown" @click.prevent="noop"> <svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"> <use xlink:href="#svg-icon-tooltip"></use> </svg> <span class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position" v-html="option.text"></span> </span> </span>--\x3e </label> </div> </div> </div> <div class="label-row-box" slot="input" v-for="(option, index) in field.options" v-if="field.type == \'radioblocks\' && field.options"> <div class="label-row"> <label class="checkbox-row inline-label"> <input type="radio" class="checkbox-row__input" :name="field.name" :value="option.value" @change="submitFormStep(stepKey, false)" v-model="field.value"> <span class="checkbox-row__visual"></span> <span class="checkbox-row__text">{{option.label}}</span> </label> <svg class="checout-accordeon-arrow svg-icon svg-icon--dd-arrow" :class="{active: activeAccordeon=== index}" @click="setAactiveAccordeon(index)"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </div> <transition name="content-fade"> <div class="checkbox-row__label" v-show="activeAccordeon=== index">{{option.text}}</div> </transition> </div> <form-city-select v-if="field.rootClass===\'citySearch\'" :topLocations="field.topLocations"></form-city-select> <rich-text-input-checkout v-model="field.value" slot="input" :placeholder="field.placeholder" :type="field.type" :label="field.label" :mask="field.mask" :error="getFieldError(field)" :rule="field.rule" :note="field.note" v-else-if="field.type != \'slotblocks\' && field.type != \'radioblocks\' && field.type != \'groupField\'" :hiddenDefault="field.value || field.hiddenDefault" :options="field.options" :rootClass="field.rootClass"></rich-text-input-checkout> <h3 class="form__subtitle flc" slot="input" v-if="field.type == \'groupField\'" >{{field.label}}</h3> <div class="rich-form-grid grid" slot="input" v-if="field.type == \'groupField\'" > <div :class="{\'rich-form-grid__col\':true, \'col\': true, \'col-lg-6\': key==\'PERSONAL_STREET\' , \'col-2xs-12\': key==\'PERSONAL_STREET\', \'col-lg-2\': key!=\'PERSONAL_STREET\' , \'col-2xs-4\': key!=\'PERSONAL_STREET\'}" v-for="(innerfield, key) in field.fields"> <rich-text-input-checkout v-model="innerfield.value" :placeholder="field.placeholder" :type="innerfield.type" :label="innerfield.label" :error="getFieldError(innerfield)"></rich-text-input-checkout> </div> </div> </div> <div class="rich-form-btns-line"> <div class="rich-form-btns-line__aside rich-form-btns-line__aside--left"> <a href="javascript:void(0)" class="btn btn--back btn--lg link--local" tabindex="0" @click="goToPrevFormStep(step)"> <svg class="btn__icon btn__icon--left svg-btn--back svg-icon "> <use xlink:href="#svg-icon-small-arrow-left"></use> </svg> <span class="btn__inner">Назад</span></a> </div> <div class="rich-form-btns-line__main"> <button type="submit" class="btn btn--lg btn--primary"> <span class="btn__inner">{{step.nextButton}}</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </div> </div> </form> </div> </div> \x3c!-- completed steps --\x3e <div class="form-step__body" v-if="!step.current && step.completed && formsKey == stepKey" :key="stepKey + \'-summary\'" v-for="(formData, formsKey) in forms"> <div class="form-card form-card--w-arrow form-card--w-border flc" > <div class="dot-line-list"> <div class="dot-line-list__item dot-line-row dot-line-row--sm" v-for="field in prepareShowFields(formData.fields)"> <div class="dot-line-row__start">{{field.summaryLabel || field.label}}</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end">{{getFieldSummaryText(field)}}</div> </div> </div> </div> </div> </transition-group> </section> </div> </div> </div> <aside class="checkout-main__aside" v-if="order.basketPrice>0"> <div class="" v-sticky="20"> <div class="summary-block summary-block--receipt" > \x3c!--<div class="summary-block__floor" v-if="discountCardPersent || !authorized"> <div class="discount"> <div class="discount__main"> <h4 class="discount__title">Дисконтная программа</h4> <div class="discount__text" v-if="discountCardPersent">Ваша скидка: <span class="discount__value">-{{discountCardPersent}}%</span></div> <div class="discount__text" v-if="discountCardPersent">Сумма накоплений: <span class="discount__value">{{discountCardAmountOrders}} руб.</span></div> <div class="discount__text" v-if="!authorized"><span class="discount__value"><a @click="showSignInModal()" href="#" @click.prevent="1">Авторизуйтесь</a></span></div> </div> </div> </div> <div class="summary-block__floor" v-if="bonusCurrentOrder || bonusCvartalSumm"> <div class="discount"> <div class="discount__main"> <h4 class="discount__title">Бонусная программа</h4> <div class="discount__text" v-if="bonusCvartalSumm">Накоплено бонусов: <span class="discount__value"> {{bonusCvartalSumm}}</span></div> <div class="discount__text" v-if="bonusCurrentOrder">Бонусов за текущий заказ: <span class="discount__value">{{bonusCurrentOrder}} руб.</span></div> </div> </div> </div>--\x3e \x3c!--<div class="summary-block__floor"> <div class="foldable-list"> <div class="foldable-list__item" v-if="enableGiftCert"> <div class="foldable-block js-accordion"> <div class="foldable-block__bar"> <span class="link link--dd link--local link--undecorated js-accordion__bar"> <span class="link__text">Промокод</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use></svg> </span> </div> <div class="foldable-block__body foldable-block__body--sm js-accordion__body"> <div class="one-row-form"> <div class="one-row-form__cell-input"> <rich-text-input type="text" v-model="giftCertCode" placeholder="Введите код" lite></rich-text-input> </div> <div class="one-row-form__cell-btn"> <button type="button" class="btn" @click="submitForSoapCheck(1)" > <span class="btn__inner">Применить</span> </button> </div> </div> </div> </div> </div> <div class="foldable-list__item"> <div class="foldable-block js-accordion"> <div class="foldable-block__bar"> <span class="link link--dd link--local link--undecorated js-accordion__bar"> <span class="link__text">Комментарий к заказу</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use></svg> </span> </div> <div class="foldable-block__body foldable-block__body--sm js-accordion__body"> <rich-form-row> <rich-text-input type="textarea" v-model="comment" placeholder="Ваш комментарий" slot="input"></rich-text-input> </rich-form-row> <rich-form-row> <button type="button" class="btn" @click="commentSubmit(0)" slot="input"> <span class="btn__inner">Применить</span> </button> </rich-form-row> </div> </div> </div> </div> </div>--\x3e <div class="summary-block__floor summary-block__floor--dark" v-if="order.freeDeliveryPrice > order.basketPrice"> <ul class="small-info-list"> <li class="small-info-list__item small-info-row small-info-row--color-alt"> <div class="small-info-row__icon"> <svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg> </div> <div class="small-info-row__text">Добавьте товаров на <b>{{(order.freeDeliveryPrice - order.basketPrice) | formatPrice}} руб.</b>, чтобы получить бесплатную доставку в ваш регион ({{geolocation.city.name}})</div> </li> </ul> </div> <div class="summary-block__floor"> <div class="goods-count-box"> <div class="goods-count"> <span>Товаров</span> <span class="complex-link__label">{{order.basketCount}}</span> </div> <div class="price price--strong price--lg"> <strong class="price__new" v-if="order.basketPriceWithDelivery">{{order.basketPriceWithDelivery | formatPrice}} </strong> <strong class="price__new" v-else>{{order.basketPrice | formatPrice}} </strong> <small class="price__new-curr">руб. </small> </div> </div> <div class="dot-line-list"> <div class="dot-line-list__item dot-line-row" v-if="order.weight" > <div class="dot-line-row__start dot-line-row__start--checkout">Общий вес</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end">{{order.weight}} кг.</div> </div> <div class="dot-line-list__item dot-line-row" v-if="order.capacity" > <div class="dot-line-row__start dot-line-row__start--checkout">Объем</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end">{{order.capacity}} м<sup>3</sup></div> </div> <div class="dot-line-list__item dot-line-row" v-if="parseFloat(order.basketSale) > 0"> <div class="dot-line-row__start dot-line-row__start--checkout">Экономия</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"><b>{{order.basketSale | formatPrice}} руб.</b></div> </div> \x3c!--<div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--checkout">Доставка</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end" v-if="parseFloat(order.deliveryPrice)>0">{{order.deliveryPrice | formatPrice}} руб.</div> <div class="dot-line-row__end" v-else><b>Бесплатно</b></div> </div>--\x3e </div> \x3c!--div class="form-card__preloader" v-if="basketLoading"> <svg class="spinner spinner--default active" viewBox="0 0 80 80"> <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle> </svg> </div--\x3e <div class="summary-block__btn-row" v-if="!currentStep || !currentStep.nextButton"> <button @click="commentSubmit(1)" class="btn btn--primary btn--lg btn--block"> <span class="btn__inner">Оформить заказ</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> <button type="button" data-modal="/ajax/buyOneClick.php" class="btn btn--light btn--catalog-item-button js-load-modal btn--lg"><span class="btn__inner">Заказать в 1 клик</span></button> </div> <div class="summary-block__btn-row" v-else> <button class="btn btn--primary btn--lg btn--block" v-if="currentStep.code == \'payment\'" @click.prevent="submitFormStep(currentStep.code, true)"> <span class="btn__inner">{{currentStep.nextButton}}</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> <div class="summary-block__btn-row-item"> <a href="/order/" @click.prevent="commentSubmit(1)">Вернуться к списку товаров</a> </div> </div> </div> </div> <div class="checkout__delivery"> <div class="aside-info-block__group aside-info-block__group--noborder"> <div class="checkout__delivery-title">Доставка </div> <div class="text-guide delivery-text-guide"> 10:00 - 19:00 ежедневно </div> <a href="/delivery/" class="link" > <span class="link__text link__text--delivery-select">Список зон доставки</span> </a> </div> </div> </div> </aside> </div> <div class="medium-card" v-if="state == \'payment\' && order.basketPrice>0" key="payment"> <div class="medium-card__floor"> <div class="medium-card__container medium-card__container--sm"> <div class="dot-line-list"> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Магазин</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end">docke</div> </div> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Номер заказа</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"><b>№2654</b></div> </div> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">Сумма к оплате</div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <div class="price price--strong"> <strong class="price__new">{{order.basketPriceWithDelivery | formatPrice}}</strong> <small class="price__new-curr">руб.</small> </div> </div> </div> </div> </div> </div> <div class="medium-card__floor"> <div class="medium-card__container"> <p>Тут же какой-то Ифраим</p> <div class="medium-card__btn-row"> <button type="button" class="btn btn--primary btn--lg" @click="state = \'success\'"> <span class="btn__inner">Оплатить</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </div> </div> </div> </div> <div class="successs-box" v-if="state == \'success\'" key="success"> <div class="success-title"> <div class="success-block"> <div class="success-block__icon-row flc"> <svg class="svg-icon instore"> <use xlink:href="#svg-icon-success"></use> </svg> </div> <h2 class="success-block__title flc">Спасибо, Ваш заказ оформлен</h2> <div class="success-block__text text-guide"> <p class="text-center">Заказ № {{order.id}} – {{order.date}}</p> </div> </div> </div> <br><br> <div class="medium-card" > <div class="medium-card__floor"> <div class=""> <div class="dot-line-list"> <h3>Состав заказа</h3> <div v-for="product in basket.products" class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start">{{product.name}}</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end">{{product.price}} руб.</div> </div> </div> </div> </div> <div class="medium-card__floor"> <div class="js-parent js-accordeon"> <div class="flex-title js-accordeon-title"> <h3 class="accordion-block__title"><span class="">Личные данные</span></h3> <div class="faq-title__icon icon-noborder"> <svg class="svg-icon"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </div> </div> <div class="accorderon-content accorderon-content-p0 js-accordeon-content text-guide"> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--light">Имя Фамилия</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"> Покупатель тестовый </div> </div> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--light">Телефон</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"> +37529 666-11-11 </div> </div> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--light">Email</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"> a@b.by </div> </div> </div> </div> </div> <div class="medium-card__floor"> <div class="js-parent js-accordeon"> <div class="flex-title js-accordeon-title"> <h3 class="accordion-block__title"><span class="">Данные о доставке и оплате</span></h3> <div class="faq-title__icon icon-noborder"> <svg class="svg-icon"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </div> </div> <div class="accorderon-content accorderon-content-p0 js-accordeon-content text-guide"> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--light">Самовывоз</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"> г. Минск, ул. Притыцкого, 112 </div> </div> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--light">Время работы</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"> с 10:00 до 22:00, ежедневно </div> </div> <div class="dot-line-list__item dot-line-row"> <div class="dot-line-row__start dot-line-row__start--light">Способ оплаты</div> <div class="dot-line-row__ruler dot-line-row__ruler--clear"></div> <div class="dot-line-row__end"> Безналичный расчет </div> </div> </div> </div> </div> <div class="medium-card__floor bg-gray-light"> <div class="medium-card__total"> <div class="left"> <h3>Итого</h3> <button class="print"> <img src="/local/images/icons/print.png" alt="" class="print-ico-sm"> <span class="print-text">Распечатать</span> </button> </div> <div class="right"> <div class="price price--strong price--big"> <strong class="price__new">{{order.basketPriceWithDelivery | formatPrice}} </strong> <small class="price__new-curr">руб.</small> </div> </div> </div> </div> </div> </div> </transition>',
        data: function () {
            return {
                order: [],
                fromSubmitForSoapCheck: 0,
                bonusCurrentOrder: 0,
                bonusCvartalSumm: 0,
                discountCard: "",
                discountCardPersent: 0,
                discountCardAmountOrders: 0,
                comment: "",
                giftCertCode: "",
                basketLoading: 0,
                activeAccordeon: 0,
                presentsProduct: a.basket.presentsProduct,
                basket: a.basket,
                geolocation: a.geolocation,
                authorized: a.authorized,
                errors: [],
                submitUrl: "/order/checkout/",
                orderList: "/order/",
                state: "loading",
                presents: {},
                forms: {},
                currentStep: {}
            }
        },
        props: {
            bxajaxid: {default: null},
            staticDataSource: {default: null},
            enableGiftCert: {type: Boolean, default: !0}
        },
        filters: {formatPrice: a.formatPrice},
        methods: {
            buyOneCLickFromCart: function () {
                View.control.openModalByUrl("/ajax/buyOneClick.php?cart=Y")
            }, removeFromBasket: function (e) {
                a.removeFromBasket(e.offerId)
            }, showSignInModal: function (e) {
                a.showSignInModal()
            }, setCurrentStep: function (i) {
                var o = this;
                _.each(o.steps, function (e, t) {
                    e.current = i == t, e.current && (o.currentStep = e)
                })
            }, commentSubmit: function (t) {
                var i = this;
                if (!i.basketLoading) if (i.comment.length) {
                    i.basketLoading = 1;
                    var e = [];
                    e.push({name: "bxajaxid", value: i.bxajaxid}), e.push({
                        name: "COMMENT",
                        value: i.comment
                    }), $.post({url: i.submitUrl, data: e, dataType: "json"}).done(function (e) {
                        i.basketLoading = 0, t && (window.location = i.currentStep ? i.orderList : i.submitUrl)
                    }).fail(function (e) {
                        i.basketLoading = 0, console.log("basket submit fail")
                    })
                } else t && (window.location = i.currentStep ? i.orderList : i.submitUrl)
            }, prepareShowFields: function (e) {
                var i = this, o = [];
                return $.each(e, function (e, t) {
                    "groupField" != t.type ? t.value && "hidden" != t.type && o.push({
                        label: t.summaryLabel ? t.summaryLabel : t.label,
                        value: i.getFieldSummaryText(t)
                    }) : $.each(t.fields, function (e, t) {
                        t.value && "hidden" != t.type && o.push({
                            label: t.summaryLabel ? t.summaryLabel : t.label,
                            value: i.getFieldSummaryText(t)
                        })
                    })
                }), o
            }, getFieldError: function (e) {
                return this.errors.fields[e.id] ? this.errors.fields[e.id] : null
            }, showDiscountCardnModal: function () {
                var e = this;
                View.control.openModalByUrl("/personal/discountCard.php?AJAXMODE=Y"), a.$on("modalOpen", function () {
                    e.modalOpen = 1
                }), a.$on("modalClose", function () {
                    e.modalOpen && window.location.reload()
                })
            }, showPresentsInModal: function () {
                a.showPresentsInModal()
            }, showCitySelect: function () {
                View.control.openModalByUrl("/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y")
            }, getFieldSummaryText: function (e) {
                if (e.options) {
                    var t = _.findWhere(e.options, {value: e.value});
                    if (t) return t.label || t.value || e.value
                }
                return e.value
            }, submitForSoapCheck: function (t) {
                var i = this;
                if (!i.basketLoading && 0 != i.order.basketPrice && "success" != i.state && "payment" != i.state) {
                    i.basketLoading = 1;
                    var e = [];
                    e.push({name: "bxajaxid", value: i.bxajaxid}), e.push({
                        name: "SOAP_CHECK",
                        value: "Y"
                    }), t && e.push({name: "COUPON", value: i.giftCertCode}), $.post({
                        url: i.submitUrl,
                        data: e,
                        dataType: "json"
                    }).done(function (e) {
                        i.basketLoading = 0, i.fromSubmitForSoapCheck = 1, i.presents = e.presents, a.updateBasket(e.products, !1), a.updatePresent(e.presentsProduct, e.presents), i.bonusCurrentOrder = e.bonusCurrentOrder, i.errors.form = e.errors.form, i.order = e.order, t ? (i.giftCertCode = e.giftCertCode, i.errors.form) : "products" == e.state && (i.state = e.state)
                    }).fail(function (e) {
                        i.basketLoading = 0, console.log("basket submit fail")
                    })
                }
            }, submitFormStep: function (t, i) {
                var o = this;
                if (!o.basketLoading) {
                    o.basketLoading = 1, o.steps[t].loading = !0;
                    var s = [];
                    s.push({name: "bxajaxid", value: o.bxajaxid}), s.push({
                        name: "STEP",
                        value: o.steps[t].number + (i ? 1 : 0)
                    }), s.push({name: "PREV_STEP", value: o.steps[t].number}), s.push({
                        name: "COMMENT",
                        value: o.comment
                    }), i && s.push({name: "BASKET_ACTION", value: i}), $.each(o.forms[t].fields, function (e, t) {
                        "groupField" != t.type ? s.push({
                            name: t.name,
                            value: t.value
                        }) : $.each(t.fields, function (e, t) {
                            s.push({name: t.name, value: t.value})
                        })
                    }), $.post({url: o.submitUrl, data: s, dataType: "json"}).done(function (e) {
                        e.order.reload ? window.location = e.currentUrl : (o.bonusCurrentOrder = e.bonusCurrentOrder, o.basketLoading = 0, o.state = e.state, o.steps = e.steps, o.currentStep = _.findWhere(o.steps, {current: !0}), o.order = e.order, o.errors.form = e.errors.form, o.errors.fields = [], i && parseFloat(o.steps[t].number) >= parseFloat(e.step) && (o.errors.fields = e.errors.fields), o.forms = e.forms, o.presents = e.presents, a.updateBasket(e.products, !1), a.updatePresent(e.presentsProduct, e.presents), history.pushState({}, null, e.currentUrl))
                    }).fail(function (e) {
                        o.basketLoading = 0, console.log("basket submit fail")
                    })
                }
            }, editFormStep: function (e) {
                this.setCurrentStep(e), $.each(this.steps, function (e, t) {
                    t.error = !1
                })
            }, goToPrevFormStep: function (e) {
                var t = _.findWhere(this.steps, {number: e.number - 1});
                t ? (t.current = !0, e.current = !1, this.setCurrentStep(t.code)) : window.location = "/order/"
            }, stepBodyEnterAnimation: function (e, t) {
                var i = $(e);
                i.delay(300).hide().css("opacity", 0).slideDown(300, function () {
                    i.find("input, textarea").first().focus(), i.animate({opacity: 1}, 300, t)
                })
            }, stepBodyLeaveAnimation: function (e, t) {
                var i = $(e);
                i.show().css("opacity", 1).animate({opacity: 0}, 300, function () {
                    i.show().slideUp(300, t)
                })
            }, noop: function () {
                return !1
            }, setAactiveAccordeon: function (e) {
                this.activeAccordeon === e ? this.activeAccordeon = !1 : this.activeAccordeon = e
            }
        },
        mounted: function () {
            var e = this;
            e.presents = e.staticDataSource.presents, e.staticDataSource.products && a.updateBasket(e.staticDataSource.products, this.bxajaxid), e.staticDataSource.presentsProduct && a.updatePresent(e.staticDataSource.presentsProduct, e.staticDataSource.presents), e.bonusCurrentOrder = e.staticDataSource.bonusCurrentOrder, e.submitForSoapCheck(), setInterval(function () {
                e.submitForSoapCheck()
            }, 6e4), e.authorized = a.authorized
        },
        created: function () {
            console.log("checkout-main staticDataSource", this.staticDataSource);
            var t = this;
            t.staticDataSource.comment && (t.comment = t.staticDataSource.comment), t.staticDataSource.giftCertCode && (t.giftCertCode = t.staticDataSource.giftCertCode), t.staticDataSource ? (t.state = t.staticDataSource.state, t.steps = t.staticDataSource.steps, t.discountCard = t.staticDataSource.discountCard, t.discountCardPersent = t.staticDataSource.discountCardPersent, t.discountCardAmountOrders = t.staticDataSource.discountCardAmountOrders, t.bonusCurrentOrder = t.staticDataSource.bonusCurrentOrder, t.bonusCvartalSumm = t.staticDataSource.bonusCvartalSumm, t.currentStep = _.findWhere(t.steps, {current: !0}), t.errors = t.staticDataSource.errors, t.order = t.staticDataSource.order, t.forms = t.staticDataSource.forms, console.log(t.staticDataSource)) : t.state = "checkout", a.$on("basketPresentUpdated", function () {
                t.presentsProduct = a.basket.presentsProduct, t.presents = a.basket.presents
            }), a.$on("basketUpdated", function () {
                t.order.basketPrice = a.basketPrice, t.order.basketSale = a.basketSale, t.order.basketCount = a.basketCount, $.post({
                    url: "/api/basket-data.php",
                    dataType: "json"
                }).done(function (e) {
                    t.order.weight = e.weight, t.order.capacity = e.capacity
                }), t.basket = a.basket, t.bonusCurrentOrder = a.basket.bonusCurrentOrder, t.fromSubmitForSoapCheck ? t.fromSubmitForSoapCheck = 0 : t.submitForSoapCheck()
            })
        }
    })
}), define("vue!city-select/component", ["Model"], function (t) {
    Vue.component("city-select", {
        template: '<div class="city-select"> <div class="city-select__txt">Ваш регион доставки <b>{{city.name}}</b>?</div> <div class="city-select__btn-row"> <button type="button" class="btn btn--primary" @click="confirmCity"> <span class="btn__inner">Да, всё верно</span> </button> <button type="button" class="btn" @click="rejectCity"> <span class="btn__inner">Нет, выбрать другой</span> </button> </div> </div>',
        data: function () {
            return {city: t.geolocation.city}
        },
        props: {
            bxajaxid: {default: null},
            searchCity: {default: null},
            initialCityName: {default: "Неизвестно"},
            initialCityId: {default: null}
        },
        methods: {
            confirmCity: function () {
                console.log("city confirmed 2"), View.control.closeDropdown($(this.$el).closest(".js-dropdown"))
            }, rejectCity: function () {
                View.control.openModalByUrl("/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y")
            }
        },
        mounted: function () {
            var e = this;
            t.geolocation.city.name = this.initialCityName, t.geolocation.city.id = this.initialCityId, t.geolocation.bxajaxid = this.bxajaxid, console.log(this.initialCityName, this.initialCityId), e.searchCity && jQuery.ajax({
                url: "https://api-maps.yandex.ru/2.0/?load=package.standard&lang=ru-RU",
                type: "get",
                cache: !0,
                dataType: "script"
            }).done(function () {
                ymaps.ready(function () {
                    ymaps.geolocation.city && $.ajax({
                        url: window.location,
                        type: "post",
                        dataType: "json",
                        data: {bxajaxid: e.bxajaxid, init_search: ymaps.geolocation.city}
                    }).done(function (e) {
                        console.log(e), t.geolocation.city.name = e.name, t.geolocation.city.id = e.id
                    }).fail(function () {
                        console.warn("city-select: ajax fail 2")
                    })
                })
            }).fail(function () {
                console.warn("city-select: ajax fail")
            })
        }
    })
}), define("vue!sign-sm/component", ["Model"], function (e) {
    Vue.component("sign-sm", {
        template: '<div class="sign-sm"> <div class="sign-sm__sign-in"> <h4 class="sign-sm__title flc">Если покупали у нас</h4> <div class="sign-sm__btn-row"> <button type="button" class="btn btn--info btn--block" @click="signIn"> <span class="btn__inner">Войти</span> </button> </div> <slot name="additional-sign-in"></slot> </div> <div class="sign-sm__sign-up"> <h4 class="sign-sm__title flc">Регистрация</h4> <div class="sign-sm__btn-row"> <button type="button" class="btn btn--block" @click="signUp" > <span class="btn__inner">Зарегистрироваться</span> </button> </div> </div> </div>',
        props: {
            bxajaxid: {default: null},
            user: {default: null},
            authorized: {default: null},
            checkword: {type: String, default: null},
            userLogin: {type: String, default: null}
        },
        methods: {
            signIn: function () {
                e.showSignInModal()
            }, signUp: function () {
                e.showSignUpModal()
            }, resetForm: function () {
                e.showResetModal(this.checkword, this.userLogin)
            }
        },
        mounted: function () {
            this.checkword, this.userLogin && this.resetForm(), this.authorized && e.signIn(this.user, !0)
        }
    })
}), define("vue!product-table/component", ["Model"], function (e) {
    Vue.component("product-table", {
        template: '<div class="product-table"> <div class="product-table__head"> <div class="product-table__th" v-for="column in columns" :class="[\'product-table__th--\' + column.visualType]">{{column.title}}</div> </div> <div class="product-table__body"> <slot name="row"></slot> </div> </div>',
        data: function () {
            return {colors: null}
        },
        props: {columns: {required: !0}},
        methods: {},
        filters: {formatPrice: e.formatPrice}
    })
}), define("vue!basket-action-2/component", ["Model"], function (i) {
    Vue.component("basket-action-2", {
        template: '<div class="basket-action basket-action--complex"> <div class="basket-action__main"> <div class="basket-action__row"> <div class="basket-action__cell-avail" v-if="showAvailability && availability"> <availability-sm :value="availability.value" :text="availability.text" :quantity="quantity"></availability-sm> </div> <div class="basket-action__cell-input" v-if="showInput && authorized"> <number-input v-model="localCount" :value="minCount" :min="minCount" :step="minCount" :max="maxCount" :size="small ? \'sm\' : null"></number-input> </div> <div class="basket-action__cell-btn" v-if="showButton"> <button type="button" class="btn btn--info" :class="{\'btn--sm\': small}" @click="addToBasket" :disabled="waiting" v-if="authorized"> <svg class="btn__icon svg-icon svg-icon--20"><use xlink:href="#svg-icon-basket"></use></svg> </button> <button class="btn" type="button" :class="{\'btn--sm\': small}" @click="authorize" v-else> <span class="btn__inner">Купить</span> </button> </div> \x3c!-- <div class="basket-action__cell-btn" v-if="showSubscription"> <button type="button" class="btn" :class="{\'btn--sm\': small}" @click="showProductSubscriptionModal" :disabled="waiting"> <span class="btn__inner">Сообщить о появлении</span> </button> </div> --\x3e <div class="basket-action__cell-btn" v-if="showRequestPrice && authorized"> <button type="button" class="btn" :class="{\'btn--sm\': small}" @click="showProductPriceSubscriptionModal" :disabled="waiting"> <span class="btn__inner">Узнать цену</span> </button> </div> <div class="basket-action__cell-btn" v-else-if="showRequestPrice"> <button class="btn" type="button" :class="{\'btn--sm\': small}" @click="authorize" > <span class="btn__inner">Купить</span> </button> </div> </div> </div> <div class="basket-action__in-basket" v-if="authorized && countInBasket && countInBasket > 0"> <div class="basket-action__in-basket-count">{{countInBasket}}</div> <button type="button" class="basket-action__in-basket-btn" @click="removeFromBasket" :disabled="waiting"> <svg class="svg-icon svg-icon--remove"><use xlink:href="#svg-icon-close"></use></svg> </button> </div> </div>',
        data: function () {
            return {localCount: 1, waiting: !1, delayTimeout: 0, authorized: i.authorized, countInBasket: 0}
        },
        props: {
            productId: {default: null},
            offerId: {default: null},
            minCount: {default: 1},
            maxCount: {default: 1 / 0},
            bindBasketCount: {type: Boolean, default: !1},
            showInput: {type: Boolean, default: !0},
            showButton: {type: Boolean, default: !0},
            basketMode: {type: Boolean, default: !1},
            small: {type: Boolean, default: !1},
            showAvailability: {type: Boolean, default: !1},
            showSubscription: {type: Boolean, default: !1},
            showRequestPrice: {type: Boolean, default: !1},
            availability: {default: null},
            quantity: {default: null},
            step: {default: 1}
        },
        methods: {
            addToBasket: function () {
                this.waiting = !0, i.addToBasket(this.offerId, this.localCount, this.basketMode)
            }, removeFromBasket: function () {
                this.waiting = !0, i.removeFromBasket(this.offerId)
            }, authorize: function () {
                i.showSignInModal()
            }, showProductSubscriptionModal: function () {
                i.showProductSubscriptionModal(this.productId, this.offerId)
            }, showProductPriceSubscriptionModal: function () {
                i.showProductPriceSubscriptionModal(this.productId, this.offerId)
            }
        },
        created: function () {
            var t = this;

            function e() {
                var e = _.findWhere(i.basket.products, {offerId: t.offerId});
                t.countInBasket = e ? e.count : 1, t.localCount = t.countInBasket ? t.countInBasket : 1
            }

            i.$on(["signIn", "signUp", "signInSilent", "signOut"], function (e) {
                t.authorized = i.authorized
            }), t.minCount && (t.localCount = t.minCount), e(), alert("asdfadsf"), console.log("In basket", t.countInBasket), i.$on("basketUpdated", function () {
                t.waiting = !1, e()
            })
        },
        watch: {
            localCount: function () {
                var e = this;
                e.maxCount && e.localCount > e.maxCount && (e.localCount = e.maxCount), e.basketMode && !e.waiting && e.localCount != e.countInBasket && e.localCount > e.minCount && (clearTimeout(e.delayTimeout), e.delayTimeout = setTimeout(e.addToBasket, 500))
            }
        }
    })
}), define("vue!product-table-row/component", ["Model", "vue!basket-action-2/component"], function (e) {
    Vue.component("product-table-row", {
        template: '<div class="product-table-row"> <slot name="debug"></slot> <a class="product-table-row__link" :href="product.link" v-if="product.link && !notFollowLink"></a> <div class="product-table-row__link" v-if="product.link && notFollowLink" @click="$emit(\'linkClick\')"></div> <div class="product-table-row__cell" v-for="column in columns" :class="[\'product-table-row__cell--\' + column.visualType]" :data-title="column.title"> <div class="product-table-row__cell-in" v-if="column.type == \'code\'"> <div class="product-table-row__code">{{product.code}}</div> </div> <div class="product-table-row__cell-in" v-if="column.type == \'image-name\'"> <div class="product-table-row__image-name"> <div class="product-table-row__image-name-image"> <div class="product-table-row__img-box" :style="{\'background-image\': \'url(\'+product.image+\')\'}" v-if="product.image"></div> <div class="product-table-row__img-box" v-else> <div class="product-table-row__no-image"> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> </div> <div class="product-table-row__image-name-name" v-if="product.name"> {{product.name}} </div> </div> </div> <div class="product-table-row__cell-in" v-if="column.type == \'name\'"> <div class="product-table-row__name">{{product.name}}</div> </div> <div class="product-table-row__cell-in" v-if="column.type == \'param\'"> <div class="product-table-row__brand" v-if="column.id">{{showParamValue(column.id)}}</div> </div> <div class="product-table-row__cell-in" v-if="column.type == \'price\'"> <div class="product-table-row__price flc" v-if="product.price"> <div class="price price--sm"> <strike v-if="product.priceOld">{{product.priceOld | formatPrice}} </strike> <strong v-if="product.price" :class="{\'price__new\': product.priceOld}">{{product.price | formatPrice}} </strong> <small :class="{\'price__new-curr\': product.priceOld}">{{product.priceUnit}}</small> </div> </div> <div class="product-table-row__price flc" v-if="product.priceRange"> <div class="price price--sm"> <strong>{{product.priceRange.min | formatPrice}}</strong> <span class="price__separator"> &ndash; </span> <strong>{{product.priceRange.max | formatPrice}}</strong> <small>руб. {{product.priceUnit}}</small> </div> </div> </div> <div class="product-table-row__cell-in" v-if="column.type == \'buy\'"> <basket-action-2 :offer-id="offerId" :min-count="typeof product.minStep == \'number\' ? product.minStep : 1" :max-count="typeof product.quantity == \'number\' ? product.quantity : Infinity" :basketMode="basketMode" :bind-basket-count="bindBasketCount" :small="true" :availability="product.availability" :quantity="product.quantity" :show-availability="true" :show-input="parsePrice(product.price) > 0 && typeof product.quantity == \'number\' && product.quantity > 0" :show-button="parsePrice(product.price) > 0 && typeof product.quantity == \'number\' && product.quantity > 0" :show-subscription="parsePrice(product.price) > 0 && !product.quantity" :show-request-price="!parsePrice(product.price)" ></basket-action-2> \x3c!--button type="button" class="product-table-row__remove-btn" title="Удалить" @click="remove"> <svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg> </button--\x3e </div> <div class="product-table-row__cell-in" v-if="column.type == \'count\'"> <div class="product-table-row__count">{{product.count}}</div> </div> </div> </div>',
        data: function () {
            return {colors: null}
        },
        props: {
            basketMode: {type: Boolean, default: !1},
            minStep: {default: 1},
            columns: {default: null},
            productId: {type: String, default: null},
            offerId: {type: String, default: null},
            product: {
                default: function () {
                    return {}
                }
            },
            code: {default: null},
            image: {type: String, default: null},
            brand: {type: String, default: null},
            name: {type: String, default: null},
            link: {type: String, default: null},
            price: {default: null},
            priceOld: {default: null},
            priceRange: {default: null},
            status: {default: null},
            quantity: {default: null},
            count: {default: null},
            params: {default: null},
            bindBasketCount: {type: Boolean, default: !1},
            notFollowLink: {type: Boolean, default: !1},
            availability: {default: null}
        },
        methods: {
            showParamValue: function (e) {
                if (!this.params) return "";
                var t = _.findWhere(this.params, {id: e});
                return t ? t.value : ""
            }, remove: function () {
                this.$emit("remove"), e.removeFromBasket(this.offerId)
            }, delay: function () {
                this.$emit("remove"), e.addToDelayed(this.offerId)
            }, fromDelayedToBasket: function () {
                e.removeFromDelayed(this.offerId), e.addToBasket(this.offerId)
            }, fromBasketToDelayed: function () {
                e.removeFromBasket(this.offerId), e.addToDelayed(this.offerId)
            }, openPreview: function () {
                e.showProductPreviewModal(this.productId, this.offerId, this.link)
            }, showAvailabilityModal: function () {
                e.showProductAvailabilityModal(this.productId, this.offerId)
            }, showProductSubscriptionModal: function () {
                e.showProductSubscriptionModal(this.productId, this.offerId)
            }, parsePrice: e.parsePrice
        },
        filters: {formatPrice: e.formatPrice},
        created: function () {
            !this.product.image && this.image && (this.product.image = this.image), !this.product.code && this.code && (this.product.code = this.code), !this.product.brand && this.brand && (this.product.brand = this.brand), !this.product.name && this.name && (this.product.name = this.name), !this.product.link && this.link && (this.product.link = this.link), !this.product.price && this.price && (this.product.price = this.price), !this.product.priceOld && this.priceOld && (this.product.priceOld = this.priceOld), !this.product.priceRange && this.priceRange && (this.product.priceRange = this.priceRange), !this.product.minStep && this.minStep && (this.product.minStep = this.minStep), !this.product.status && this.status && (this.product.status = this.status), !this.product.delivery && this.delivery && (this.product.delivery = this.delivery), !this.product.quantity && this.quantity && (this.product.quantity = this.quantity), !this.product.count && this.count && (this.product.count = this.count), !this.product.offersCount && this.offersCount && (this.product.offersCount = this.offersCount), !this.product.delayed && this.delayed && (this.product.delayed = this.delayed), !this.product.params && this.params && (this.product.params = this.params)
        }
    })
}), define("vue!product-detailed/component", ["Model", "vue!product-table/component", "vue!product-table-row/component"], function (e) {
    Vue.component("product-detailed", {
        template: '<div class="product-detailed"> <div class="product-detailed__main flc"> <div class="product-detailed__cell-image"> <div class="product-detailed__status-container" v-if="product.status && product.status.length"> <div class="product-detailed__status status" :class="\'status--\' + statusItem.type" v-for="statusItem in product.status">{{statusItem.name}}</div> </div> <div class="product-detailed__image" v-if="product.image" :style="{\'background-image\': \'url(\'+product.image+\')\'}"></div> <div class="product-detailed__image" v-else> <div class="product-detailed__no-image" v-if="!product.image"> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> </div> <div class="product-detailed__cell-info"> <div class="product-detailed__brand" v-if="product.brand">{{product.brand}}</div> <h3 class="product-detailed__name" v-if="product.name"> <a class="product-detailed__name-link" :href="product.link" v-if="product.link && !notFollowLink">{{product.name}}</a> <div class="product-detailed__name-link" v-else-if="notFollowLink" @click="$emit(\'linkClick\')">{{product.name}}</div> <div class="product-detailed__name-txt" v-else>{{product.name}}</div> </h3> <div class="product-detailed__params" v-if="product.params && product.params.length"> <div class="product-detailed__param" v-for="param in product.params"> <span class="product-detailed__param-name" v-if="param.name">{{param.name}}: </span> <span class="product-detailed__param-value" v-if="param.value">{{param.value}}</span> </div> </div> </div> </div> <div class="product-detailed__offers" v-if="offers && columns"> <transition :css="false" @enter="slideDown" @leave="slideUp"> <product-table :columns="columns" v-if="viewMode == \'desktop\' || offersOpen"> <product-table-row v-for="offer in offers" :key="offer.offerId" slot="row" :columns="columns" :productId="offer.productId" :offerId="offer.offerId" :product="offer" :show-buy-button="true" > </product-table-row> </product-table> </transition> <div class="product-detailed__offers-trigger" :class="{\'open\': offersOpen}"> <span class="link link--local link--undecorated link--dd" :class="{\'open\': offersOpen}" @click="offersOpen = !offersOpen"> <transition name="content-fade" mode="out-in"> <span class="link__text" v-if="!offersOpen">Показать {{offers.length}} вариант{{pluralize(offers.length)}}</span> <span class="link__text" v-else>Свернуть</span> </transition> <svg class="link__arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </span> </div> </div> </div>',
        data: function () {
            return {offersOpen: !1, viewMode: "desktop", instanceId: null}
        },
        props: {
            columns: {default: null},
            productId: {type: String, default: null},
            offerId: {type: String, default: null},
            product: {
                default: function () {
                    return {}
                }
            },
            offers: {default: null},
            image: {type: String, default: null},
            brand: {type: String, default: null},
            name: {type: String, default: null},
            link: {type: String, default: null},
            price: {default: null},
            priceOld: {default: null},
            priceRange: {default: null},
            status: {default: null},
            rating: {default: null},
            delivery: {default: null},
            quantity: {default: null},
            count: {default: null},
            offersCount: {default: null},
            delayed: {type: Boolean, default: !1},
            params: {default: null},
            notFollowLink: {type: Boolean, default: !1}
        },
        filters: {formatPrice: e.formatPrice},
        methods: {
            slideDown: function (e, t) {
                $(e).hide().slideDown(300, t)
            }, slideUp: function (e, t) {
                $(e).show().slideUp(300, t)
            }, pluralize: function (e) {
                return e % 10 == 1 ? "" : 2 <= e % 10 && e % 10 <= 4 ? "a" : "ов"
            }
        },
        created: function () {
            var e = this;
            e.instanceId = Math.round(1e5 * Math.random());
            var t = null;

            function i() {
                e.viewMode = window.innerWidth > View.breakpoints["xs-max"] ? "desktop" : "mobile", t = null
            }

            $(window).on("resize.toggleProductDetailedViewMode" + e.instanceId, function () {
                t || (t = setTimeout(i, 300))
            }), i(), !this.product.image && this.image && (this.product.image = this.image), !this.product.code && this.code && (this.product.code = this.code), !this.product.brand && this.brand && (this.product.brand = this.brand), !this.product.name && this.name && (this.product.name = this.name), !this.product.link && this.link && (this.product.link = this.link), !this.product.price && this.price && (this.product.price = this.price), !this.product.priceOld && this.priceOld && (this.product.priceOld = this.priceOld), !this.product.priceRange && this.priceRange && (this.product.priceRange = this.priceRange), !this.product.minStep && this.minStep && (this.product.minStep = this.minStep), !this.product.status && this.status && (this.product.status = this.status), !this.product.delivery && this.delivery && (this.product.delivery = this.delivery), !this.product.quantity && this.quantity && (this.product.quantity = this.quantity), !this.product.count && this.count && (this.product.count = this.count), !this.product.offersCount && this.offersCount && (this.product.offersCount = this.offersCount), !this.product.delayed && this.delayed && (this.product.delayed = this.delayed), !this.product.params && this.params && (this.product.params = this.params)
        },
        destroyed: function () {
            $(window).off("resize.toggleProductDetailedViewMode" + this.instanceId)
        }
    })
}), define("vue!product-price-ext/component", ["Model"], function (e) {
    Vue.component("product-price-ext", {
        template: '<div class="product-price-ext"> \x3c!--<div class="product-price-ext__cell-fav"> <fav-btn v-if="favoritesEnabled" :product-id="product.productId" :offer-id="product.offerId"></fav-btn> </div>--\x3e <div class="product-price-ext__cell-image"> <div class="product-price-ext__image-box"> <a class="product-price-ext__link" :href="product.link" v-if="product.link && !notFollowLink"></a> <div class="product-price-ext__link" v-else-if="notFollowLink" @click="$emit(\'linkClick\')">{{product.name}}</div> <div class="product-price-ext__image" v-if="product.image" :style="{\'background-image\': \'url(\'+product.image+\')\'}"></div> <div class="product-price-ext__image" v-else> <div class="product-price-ext__no-image"> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> <div class="product-price-ext__image-zoom" v-if="product.image" :style="{\'background-image\': \'url(\'+product.image+\')\'}"></div> <div class="product-price-ext__image-zoom product-price-ext__image-zoom--no-image" v-else> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> </div> <div class="product-price-ext__cell-info"> <div class="product-price-ext__cell-info-main"> <div class="product-price-ext__status-container status-group" v-if="product.status && product.status.length"> <div class="status" :class="statusItem.class" v-for="statusItem in product.status">{{statusItem.name}}</div> </div> <a class="product-price-ext__link" :href="product.link" v-if="product.link && !notFollowLink"></a> <div class="product-price-ext__link" v-else-if="notFollowLink" @click="$emit(\'linkClick\')">{{product.name}}</div> \x3c!--div class="product-price-ext__brand" v-if="product.brand">{{product.brand}}</div--\x3e <div class="product-price-ext__name flc" v-if="product.name">{{product.name}} <span v-if="product.code"> — Артикул: {{product.code}}</span></div> <div class="product-price-ext__params flc" v-if="product.params && product.params.length || product.brand"> <div class="product-price-ext__param" v-if="product.brand"> <span class="product-price-ext__param-value">{{product.brand}}</span><span v-if="product.params && product.params.length">,</span> </div> <div class="product-price-ext__param" v-for="(param, index) in product.params" v-if="product.params && product.params.length"> \x3c!--span class="product-price-ext__param-name" v-if="param.name">{{param.name}}: </span--\x3e <span class="product-price-ext__param-value" v-if="param.value">{{param.value}}</span><span v-if="index + 1 < product.params.length">,</span> </div> </div> </div> <div class="product-price-ext__cell-info-avail"> <div class="product-price-ext__avail-item flc " > <div class="product__instore instore" v-if="(typeof product.quantity === \'number\' && product.quantity > 0)">В наличии</div> <div class="product__instore" v-else>Под заказ {{product.deliveryDays || 7}} дней</div> <div class="right"> <label class="checkbox checkbox--compare" > <input type="checkbox" class="checkbox-row__input" :checked="product.incompare" v-on:change="compare"> <span class="checkbox__visual checkbox-row__visual"></span> <span class="checkbox__text" v-if="product.incompare">Убрать</span> <span class="checkbox__text" v-else>Сравнить</span> </label> </div> </div> </div> </div> <div class="product-price-ext__cell-action"> <div class="product-price-ext__price"> <div class="price" v-if="product.price && !basketMode"> <strike v-if="product.priceOld">{{product.priceOld | formatPrice}}</strike> <strong v-if="product.price" :class="{\'price__new\': product.priceOld, \'price__new-curr\': product.priceOld}">{{product.price | formatPrice}} </strong> <small :class="{\'price__new-curr\': product.priceOld}"> {{product.priceCurrency}} </small> <span class="price__units" v-if="product.unit"> / {{product.unit}} </span> </div> <div class="price" v-else-if="product.price && basketMode"> <strike v-if="product.priceOld" style="text-decoration: none;"> <span style="text-decoration: line-through;">{{product.priceOld * product.count | formatPrice}}</span> <span class="c-primary-alt"> {{Math.round((product.price - product.priceOld) * 100 / product.priceOld)}}% </span> </strike> <strong v-if="product.price" :class="{\'price__new\': product.priceOld}">{{product.price * product.count | formatPrice}} </strong> <small :class="{\'price__new-curr\': product.priceOld}"> {{product.priceCurrency}} </small> <span class="price__units" v-if="product.unit"> / {{product.unit}} </span> </div> <div class="price" v-else-if="product.priceRange"> <strong>{{product.priceRange.min | formatPrice}}</strong> <span class="price__separator"> &ndash; </span> <strong>{{product.priceRange.max | formatPrice}}</strong> <small :class="{\'price__new-curr\': product.priceOld}"> {{product.priceCurrency}} </small> <span class="price__units" v-if="product.unit"> / {{product.unit}} </span> </div> </div> <div class="product-price-ext__action flc" v-if="(product.price || product.priceRange)"> <basket-action v-if="product.price && !product.offersCount" :offer-id="product.offerId" :max-count="product.quantity || Infinity" :basketMode="basketMode" :bind-basket-count="bindBasketCount" :showButton="!bindBasketCount"></basket-action> <a :href="product.link" class="btn btn--primary" v-else> <span class="btn__inner">Выбрать</span> </a> </div> <div class="product-price-ext__action small flc" v-else> <span class="link link--local" @click="showProductSubscriptionModal" v-if="!product.offersCount || product.offersCount <= 1"> </span> <a :href="product.link" class="btn btn--primary" v-else> <span class="btn__inner">Выбрать</span> </a> </div> </div> </div>',
        data: function () {
            return {favoritesEnabled: e.favorites.enabled, incompare: !1}
        },
        props: {
            product: {
                default: function () {
                    return {}
                }
            },
            notFollowLink: {type: Boolean, default: !1},
            basketMode: {type: Boolean, default: !1},
            bindBasketCount: {type: Boolean, default: !1}
        },
        filters: {formatPrice: e.formatPrice},
        created: function () {
            this.product.deliveryDates = this.product.deliveryDates, this.product.deliveryDates.length ? this.product.deliveryDates = this.product.deliveryDates[0] : this.product.deliveryDates = !1, console.log("test", this.product.deliveryDates)
        },
        methods: {
            showAvailabilityModal: function () {
                e.showProductAvailabilityModal(this.product.productId, this.product.offerId)
            }, showProductSubscriptionModal: function () {
                e.showProductSubscriptionModal(this.product.productId, this.product.offerId)
            }, compare: function () {
                var i = this;
                if (this.product.incompare) {
                    var e = "remove";
                    this.product.incompare = !1
                } else e = "add", this.product.incompare = !0;
                $.ajax({
                    type: "POST",
                    url: "/ajax/compare.php",
                    data: "id=" + i.product.offerId + "&action=" + e,
                    success: function (e) {
                        var t = JSON.parse(e);
                        i.incompare = parseFloat(t.count), i.$emit("update-compare")
                    }
                })
            }
        }
    })
}), define("vue!subscription/component", ["app", "vue!rich-text-input/component"], function (e) {
    Vue.component("subscription", {
        data: function () {
            return {name: null, email: null, emailError: null}
        },
        props: {
            bxajaxid: {default: null},
            rowTitle: {default: "Будь в курсе акций и новинок"},
            buttonText: {default: "Подписаться"},
            successUrl: {default: null},
            unsubscribeUrl: {default: null},
            defaultEmail: {default: null},
            showUnsubscribePopup: {default: null}
        },
        created: function () {
            this.showUnsubscribePopup && this.unsubscribeUrl && View.control.openModalByUrl(this.getModayUrl(this.unsubscribeUrl))
        },
        template: '<div class="label-action label-action--sub"> <div class="label-action__label"> <h4 class="label-action__label-txt" v-html=\'rowTitle\'></h4> </div> <div class="label-action__action"> <form class="one-row-form" @submit.prevent="submit"> <div class="one-row-form__cell-input"> <rich-text-input type="text" v-model="name" placeholder="Ваше имя"></rich-text-input> </div> <div class="one-row-form__cell-input"> <rich-text-input type="text" v-model="email" placeholder="E-mail" :error="emailError"></rich-text-input> </div> <div class="one-row-form__cell-btn"> <button type="submit" class="btn btn--info"> <span class="btn__inner">{{buttonText}}</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </div> </form> </div> </div>',
        methods: {
            getModayUrl: function (e) {
                return e && (-1 == e.indexOf("?") ? e += "?AJAXMODE=Y" : e += "&AJAXMODE=Y"), e
            }, submit: function () {
                var t = this;
                $.ajax({
                    type: "POST",
                    url: "/",
                    dataType: "json",
                    data: {FIELD: {EMAIL: t.email, NAME: t.name}, bxajaxid: t.bxajaxid}
                }).done(function (e) {
                    console.log("subscriprion response", e), (t.results = e).success && t.successUrl ? (View.control.openModalByUrl(t.getModayUrl(t.successUrl)), t.emailError = null, t.name = "", t.email = "") : e.errors && e.errors.fields && (t.emailError = e.errors.fields["FIELD[EMAIL]"] || null)
                }).fail(function (e) {
                    console.warn("subscription ajax fail: ", e)
                })
            }
        }
    })
}), define("vue!slider-input/component", ["Model"], function (e) {
    Vue.component("slider-input", {
        template: '<div class="slider-input" :class="{active: active}"> <div class="slider-input__slider" ref="slider"> <div class="slider-input__ruler"> <div class="slider-input__selection" v-if="!range" :style="{left: 0, width: buttonPosition + \'%\'}"></div> <div class="slider-input__selection" v-if="range" :style="{left: buttonMinPosition + \'%\', width: buttonMaxPosition - buttonMinPosition + \'%\'}"></div> </div> <div class="slider-input__button" v-if="!range" ref="button" :style="{left: buttonPosition + \'%\'}" :class="{active: active && !activeButton}" @mousedown="mouseStart($event)" @touchstart="touchStart($event)"></div> <div class="slider-input__button" v-if="range" ref="buttonMin" :style="{left: buttonMinPosition + \'%\'}" :class="{active: active && activeButton == \'min\'}" @mousedown="mouseStart($event, \'min\')" @touchstart="touchStart($event, \'min\')"></div> <div class="slider-input__button" v-if="range" ref="buttonMax" :style="{left: buttonMaxPosition + \'%\'}" :class="{active: active && activeButton == \'max\'}" @mousedown="mouseStart($event, \'max\')" @touchstart="touchStart($event, \'max\')"></div> </div> <div class="slider-input__labels"> <div class="slider-input__label" v-if="!range"> <small v-if="prefix"> {{prefix}} </small> <span v-if="!price && !integer"> {{localValue | formatFloat}} </span> <span v-if="price"> {{localValue | formatPrice}} </span> <span v-if="!price && integer"> {{localValue | formatInteger}} </span> <small v-if="postfix"> {{postfix}} </small> </div> <div class="slider-input__label" v-if="range"> <small v-if="prefixMin"> {{prefixMin}} </small> <span v-if="!price && !integer"> {{localValueMin | formatFloat}} </span> <span v-if="price && !integer"> {{localValueMin | formatPrice}} </span> <span v-if="!price && integer"> {{localValueMin | formatInteger}} </span> <small v-if="postfixMin"> {{postfixMin}} </small> </div> <div class="slider-input__label" v-if="range"> <small v-if="prefixMin"> {{prefixMax}} </small> <span v-if="!price && !integer"> {{localValueMax | formatFloat}} </span> <span v-if="price && !integer"> {{localValueMax | formatPrice}} </span> <span v-if="!price && integer"> {{localValueMax | formatInteger}} </span> <small v-if="postfixMin"> {{postfixMax}} </small> </div> </div> </div>',
        data: function () {
            return {
                localValue: null,
                buttonPosition: 0,
                buttonMinPosition: 0,
                buttonMaxPosition: 0,
                active: !1,
                activeButton: null,
                bodyRef: null,
                localValue: 0,
                localValueMin: 0,
                localValueMax: 0
            }
        },
        props: {
            disabled: {type: Boolean, default: !1},
            price: {type: Boolean, default: !1},
            integer: {type: Boolean, default: !1},
            min: {default: null},
            max: {default: null},
            value: {default: null},
            valueMin: {default: null},
            valueMax: {default: null},
            prefix: {default: null},
            prefixMin: {default: null},
            prefixMax: {default: null},
            postfix: {default: null},
            postfixMin: {default: null},
            postfixMax: {default: null}
        },
        computed: {
            range: function () {
                return null !== this.valueMin && null !== typeof this.valueMax
            }, maxRange: function () {
                return parseFloat(this.max) - parseFloat(this.min)
            }
        },
        methods: {
            applyValues: function () {
                this.range ? (this.buttonMinPosition = Math.min(100, Math.max(0, 100 * (this.localValueMin - this.min) / this.maxRange)), this.buttonMaxPosition = Math.min(100, Math.max(0, 100 * (this.localValueMax - this.min) / this.maxRange))) : this.buttonPosition = Math.min(100, Math.max(0, 100 * (this.localValue - this.min) / this.maxRange))
            }, mouseStart: function (e, t) {
                View.mobileAndTabletCheck || (this.moveStart(e, t), this.bindMouseEvents())
            }, touchStart: function (e, t) {
                View.mobileAndTabletCheck && (this.moveStart(e, t), this.bindTouchEvents())
            }, moveStart: function (e, t) {
                this.active = !0, this.activeButton = t || null
            }, move: function (e, t) {
                var i = (e - this.$refs.slider.getBoundingClientRect().left) / this.$refs.slider.offsetWidth;
                i < 0 && (i = 0), 1 < i && (i = 1);
                var o = this.min + this.maxRange * i;
                this.activeButton ? "min" == this.activeButton ? (this.localValueMin = Math.min(o, this.localValueMax), this.$emit("update:valueMin", this.localValueMin)) : "max" == this.activeButton && (this.localValueMax = Math.max(o, this.localValueMin), this.$emit("update:valueMax", this.localValueMax)) : (this.localValue = o, this.$emit("update:value", this.localValue)), this.applyValues(), this.$emit("input", {
                    value: this.localValue,
                    valueMin: this.localValueMin,
                    valueMax: this.localValueMax
                })
            }, moveEnd: function () {
                this.active = !1, this.unbindEvents()
            }, bindMouseEvents: function () {
                var t = this;
                this.bodyRef.off("mousemove.sliderInputMousemove").on("mousemove.sliderInputMousemove", function (e) {
                    t.active && e.preventDefault(), requestAnimationFrame ? requestAnimationFrame(function () {
                        t.move(e.pageX, e.pageY)
                    }) : t.move(e.pageX, e.pageY)
                }), this.bodyRef.off("mouseup.sliderInputMouseup").on("mouseup.sliderInputMouseup", this.moveEnd)
            }, bindTouchEvents: function () {
                var t = this;
                this.bodyRef.off("touchmove.sliderInputTouchmove").on("touchmove.sliderInputTouchmove", function (e) {
                    t.move(e.touches[0].pageX, e.touches[0].pageY)
                }), this.bodyRef.off("touchend.sliderInputTouchend").on("touchend.sliderInputTouchend", this.moveEnd)
            }, unbindEvents: function () {
                this.bodyRef.off("mousemove.sliderInputMousemove mouseup.sliderInputMouseup touchmove.sliderInputTouchmove touchend.sliderInputTouchend")
            }
        },
        watch: {
            value: function () {
                this.localValue = parseFloat(this.value) || null, this.applyValues()
            }, valueMax: function () {
                this.localValueMax = parseFloat(this.valueMax) || null, this.applyValues()
            }, valueMin: function () {
                this.localValueMin = parseFloat(this.valueMin) || null, this.applyValues(), this.$forceUpdate()
            }
        },
        created: function () {
            this.localValue = parseFloat(this.value) || null, this.localValueMin = parseFloat(this.valueMin) || null, this.localValueMax = parseFloat(this.valueMax) || null, this.applyValues(), this.bodyRef = $(document.body)
        },
        filters: {formatPrice: e.formatPrice, formatInteger: e.formatInteger, formatFloat: e.formatFloat}
    })
}), define("vue!rich-form-row/component", ["Model"], function (e) {
    Vue.component("rich-form-row", {
        template: "<div class=\"rich-form-row\" :class=\"{'col-lg-6': typecss == 2, 'rich-form-row--check': type == 'checkbox' || type == 'radio', 'rich-form-row--hidden': type == 'hidden'}\"> <slot name=\"label\"></slot> <slot name=\"input\"></slot> <slot name=\"bottom\"></slot> </div>",
        props: {type: {default: "default"}},
        mounted: function () {
        }
    })
}), define("vue!rich-form/component", ["app", "vue!rich-form/component", "vue!rich-form-row/component", "vue!rich-text-input/component", "vue!rating-block/component"], function (e) {
    Vue.component("rich-form", {
        template: '<form class="rich-form" @submit.prevent="onSubmit" autocomplete="off"> <slot name="top"></slot> <transition name="content-fade" @enter="slideDown" @leave="slideUp"> <div class="rich-form-message rich-form-message--error" v-if="errors && errors.form" v-html="errors.form"></div> </transition> <rich-form-row v-for="field, index in fields" :key="field.name || index" :type="field.type" :required="field.required" :class="{ \'col col-lg-4 col-sm-12\': field.typecss == 2, \'col col-lg-6 col-sm-12\': field.typecss == 3, \'col col-lg-20 col-sm-6 col-xs-12\': field.typecss == 4 }"> <div class="radioInstore" v-if="field.type == \'radioInstore\'"> </div> <div class="label-text__hl" v-if="field.type == \'label\'" slot="label">{{field.label}}</div> <rating-block v-else-if="field.type == \'rating\'" v-model="field.value" slot="input" :read-only="false" :input-mode="true" :class="{\'form-error\': getFieldError(field)}"> </rating-block> <rich-text-input v-else slot="input" :index="index" :name="field.name" :type="field.type" :options="field.options" :disabled="field.disabled" v-model="field.value" :label="field.label" :placeholder="field.label" :readonly="field.readonly" :multiple="field.multiple" :limit="field.limit" :mask="field.mask" :textinfo="field.textinfo" :error="getFieldError(field)"> </rich-text-input> <div v-if="field.type == \'rating\' && getFieldError(field)" slot="bottom"> <span class="rich-text-input__message rich-text-input__message--error">{{getFieldError(field).message}}</span> </div> </rich-form-row> <slot name="row"></slot> <div class="rich-form-btns" v-if="$slots.btn"> <slot name="btn"></slot> </div> </form>',
        data: function () {
            return {errors: null}
        },
        props: {submitUrl: {default: null}, fields: {default: null}, externalErrors: {default: null}},
        watch: {
            externalErrors: function (e) {
                this.errors = e
            }
        },
        methods: {
            slideDown: function (e, t) {
                $(e).hide().slideDown(300, t)
            }, slideUp: function (e, t) {
                $(e).show().slideUp(300, t)
            }, getFieldError: function (e) {
                return this.errors && this.errors.fields && this.errors.fields[e.name] || null
            }, onSubmit: function () {
                var n = this, i = new FormData;
                return _.each(n.fields, function (t) {
                    t.value || (t.value = ""), "file" === t.type ? _.each(t.value, function (e) {
                        i.append(t.name, e, e.name)
                    }) : i.append(t.name, t.value)
                }), n.submitUrl ? $.ajax({
                    url: n.submitUrl,
                    type: "POST",
                    data: i,
                    dataType: "json",
                    processData: !1,
                    contentType: !1
                }).done(function (e) {
                    n.$emit("done", e)
                }).fail(function (e) {
                    n.$emit("fail", e)
                }).always(function (a) {
                    n.errors = a.errors, Vue.nextTick(function () {
                        var e = $(window).scrollTop(), t = $(n.$el);
                        if (n.errors && n.errors.fields && n.errors.fields.length) {
                            var i = t.find(".form-error");
                            if (i.length) {
                                var o = i.offset().top;
                                (o + 30 < e || o + 30 > e + window.innerHeight) && $("html, body").animate({scrollTop: o - 30}, 400)
                            }
                        } else if (t.offset().top < e) {
                            var s = t.closest(".modal").length ? 90 : 30;
                            $("html, body").animate({scrollTop: t.offset().top - s}, 400)
                        }
                        n.$emit("submit", a), console.log(a)
                    })
                }) : n.$emit("submit"), !1
            }
        }
    })
}), define("vue!auth-register-form/component", ["Model", "vue!rich-form/component"], function (t) {
    Vue.component("auth-register-form", {
        template: '<transition name="content-fade" mode="out-in"> <div key="sign-in" v-if="currentMode == \'sign-in\'"> <div :class="{\'modal__container\': modal}"> <rich-form :fields="fields.signIn" @submit="submit" submit-url="/personal/user/authForm.php"> <div class="rich-form-link" slot="row"> <span class="link" @click="switchMode(\'forgot-password\')">Забыли пароль?</span> </div> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner">Войти</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> <button type="button" class="btn btn--lg" slot="btn" @click="switchMode(\'sign-up\')"> <span class="btn__inner">Зарегистрироваться</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form> </div> <div class="modal__group flc"> <slot name="socials-buttons"></slot> </div> </div> <div key="reset-password" v-if="currentMode == \'reset-password\'"> <div :class="{\'modal__container\': modal}"> <rich-form :fields="fields.resetPassword" @submit="submit" submit-url="/personal/user/reset.php"> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner">Сменить пароль</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form> </div> <div class="modal__group flc" > <slot name="socials-buttons"></slot> </div> </div> <div key="sign-up" v-if="currentMode == \'sign-up\'"> <div :class="{\'modal__container\': modal}"> <rich-form :fields="fields.signUp" @submit="submit" submit-url="/personal/user/register.php"> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner">Зарегистрироваться</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> <button type="button" class="btn btn--lg" slot="btn" @click="switchMode(\'sign-in\')"> <span class="btn__inner">Войти</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form> </div> <div class="modal__group flc" > <slot name="socials-buttons"></slot> </div> </div> <div key="forgot-password" v-if="currentMode == \'forgot-password\'"> <div :class="{\'modal__container\': modal}"> <rich-form :fields="fields.forgotPassword" @submit="submit" submit-url="/personal/user/restore.php"> <div class="rich-form-message" slot="top">Новый пароль будет отправлен на вашу электронную почту.</div> <div class="rich-form-link" slot="row"> <span class="link" @click="switchMode(\'sign-in\')">Вернуться ко входу</span> </div> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner">Выслать пароль</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form> </div> </div> <div key="sucess-message" v-if="currentMode == \'sucess-message\'"> <div class="modal__container" v-if="modal"> <div class="modal__group flc" v-html=\'message\'></div> <div class="modal__group flc" > <div class="rich-form-btns"> <button type="button" class="btn btn--lg js-close-modal"> <span class="btn__inner">Продолжить</span> </button> </div> </div> </div> <div v-html="message" v-else></div> </div> </transition>',
        data: function () {
            return {
                message: null, currentMode: null, fields: {
                    resetPassword: [{type: "hidden", name: "USER_LOGIN", label: "", value: null}, {
                        type: "hidden",
                        name: "USER_CHECKWORD",
                        label: "",
                        value: null
                    }, {type: "hidden", name: "bxajaxid", label: "", value: "ajax_login_reset"}, {
                        type: "password",
                        name: "USER_PASSWORD",
                        label: "Пароль",
                        value: null
                    }, {
                        type: "password",
                        name: "USER_CONFIRM_PASSWORD",
                        label: "Подтверждение пароля",
                        value: null
                    }, {type: "hidden", name: "AUTH_FORM", label: "", value: "Y"}, {
                        type: "hidden",
                        name: "TYPE",
                        label: "",
                        value: "CHANGE_PWD"
                    }],
                    signIn: [{
                        type: "text",
                        name: "USER_LOGIN",
                        label: "E-mail или телефон",
                        value: null
                    }, {type: "hidden", name: "bxajaxid", label: "", value: "ajax_login"}, {
                        type: "password",
                        name: "USER_PASSWORD",
                        label: "Пароль",
                        value: null
                    }, {type: "hidden", name: "AUTH_FORM", label: "", value: "Y"}, {
                        type: "hidden",
                        name: "TYPE",
                        label: "",
                        value: "AUTH"
                    }],
                    signUp: [{type: "text", name: "FIELD[EMAIL]", label: "Email", value: null}, {
                        type: "password",
                        name: "FIELD[PASSWORD]",
                        label: "Пароль",
                        value: null
                    }, {
                        type: "password",
                        name: "FIELD[CONFIRM_PASSWORD]",
                        label: "Повторите пароль",
                        value: null
                    }, {type: "hidden", name: "ajax_login", label: "", value: "Y"}],
                    forgotPassword: [{
                        type: "hidden",
                        name: "bxajaxid",
                        label: "",
                        value: "ajax_login_forgot"
                    }, {type: "email", name: "USER_EMAIL", label: "Email", value: null}, {
                        type: "hidden",
                        name: "AUTH_FORM",
                        label: "",
                        value: "Y"
                    }, {type: "hidden", name: "TYPE", label: "", value: "SEND_PWD"}]
                }
            }
        },
        props: {
            mode: {type: String, default: "sign-in"},
            checkword: {type: String, default: null},
            userLogin: {type: String, default: null},
            modal: {type: Boolean, default: !0}
        },
        methods: {
            submit: function (e) {
                this.currentMode == e.mode && (e && "sign-in" == e.mode && e.authorized && (t.signIn(e.user), View.control.closeModal(), e.reload && window.location.reload()), e && "sign-up" == e.mode && e.success && (t.signUp(e.user), this.message = e.success_message, this.switchMode("sucess-message")), e && "forgot-password" == e.mode && e.success && (this.message = e.success_message, this.switchMode("sucess-message")))
            }, switchMode: function (e) {
                "sucess-message" != e && (this.currentMode = e), "sign-up" == this.currentMode && t.showSignUpModal(), t.$emit("modalTitleChange", "sign-in" == this.currentMode ? "Вход на сайт" : "sign-up" == this.currentMode ? "Регистрация" : "reset-password" == this.currentMode ? "Сброс пароля" : "Восстановление пароля"), this.currentMode = e
            }
        },
        created: function () {
            var e = this.mode;
            "sign-in" !== e && "sign-up" !== e && "forgot-password" !== e && "reset-password" !== e && (e = "sign-in"), this.switchMode(e)
        },
        mounted: function () {
            this.fields.resetPassword[0].value = this.userLogin, this.fields.resetPassword[1].value = this.checkword
        }
    })
}), define("vue!form-call-request/component", ["app", "vue!rich-form/component"], function (e) {
    Vue.component("form-call-request", {
        template: '<rich-form :fields="fields" @submit="submit" submit-url="/ajax/call-request.php"> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner">Заказать звонок</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form>',
        data: function () {
            return {
                fields: [{type: "text", name: "name", label: "Представьтесь", value: null}, {
                    type: "tel",
                    name: "telephone",
                    label: "Контактный телефон",
                    value: null,
                    mask: View.inputmaskPresets.phone
                }]
            }
        },
        methods: {
            submit: function () {
                console.log("call request submitted")
            }
        }
    })
}), define("vue!form-message/component", ["app", "vue!rich-form/component"], function (e) {
    Vue.component("form-message", {
        template: '<rich-form :fields="fields" @submit="submit" submit-url="/ajax/message-send.php"> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner">Отправить</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form>',
        data: function () {
            return {
                fields: [{type: "text", name: "name", label: "Представьтесь", value: null}, {
                    type: "email",
                    name: "email",
                    label: "Электронная почта",
                    value: null
                }, {type: "textarea", name: "message", label: "Ваше сообщение", value: null}]
            }
        },
        methods: {
            submit: function () {
                console.log("message request submitted")
            }
        }
    })
}), define("vue!form-product-subscribe/component", ["Model", "vue!rich-form/component"], function (e) {
    Vue.component("form-product-subscribe", {
        template: '<div> <transition-group name="content-fade" mode="out-in" tag="div"> <div v-if="(message && (successState || alreadySubscribe))" key="subscr_message"> <div class="success-message"> <div class="success-message__txt " v-html=\'message\'>Подписка прошла успешно.</div> </div> </div> <rich-form :fields="fields" @submit="submit" key="subscr_button" v-if="!successState" :external-errors="errors"> <button type="submit" class="btn btn--lg btn--info" slot="btn"> <span class="btn__inner" v-if="alreadySubscribe"> Отписаться</span> <span class="btn__inner" v-else> Подписаться</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form> </transition-group> </div>',
        data: function () {
            return {
                message: "",
                alreadySubscribe: !1,
                successState: !1,
                fields: [{
                    type: "text",
                    name: "email",
                    label: "Ваш e-mail",
                    value: e.user.email ? e.user.email : "",
                    readonly: !!e.user.email
                }],
                errors: null
            }
        },
        props: {productId: {default: null}, offerId: {default: null}},
        methods: {
            submit: function () {
                var t = this, e = _.map(t.fields, function (e) {
                    return {name: e.name, value: e.value}
                });
                e.push({name: "bxajaxid", value: "product_subscribe"}), e.push({
                    name: "type",
                    value: 1
                }), t.productId && e.push({
                    name: "productId",
                    value: t.productId
                }), t.offerId && e.push({
                    name: "offerId",
                    value: t.offerId
                }), t.alreadySubscribe && e.push({
                    name: "unsubscribe",
                    value: t.offerId ? t.offerId : t.productId
                }), $.post({url: "/catalog/subscribe.php", dataType: "json", data: e}).done(function (e) {
                    t.alreadySubscribe = e.alreadySubscribe, t.successState = e.successState, t.message = e.message
                }).fail(function (e) {
                    console.warn("form-product-subscribe ajax failed:", e)
                }).always(function (e) {
                    t.errors = e.errors || null
                })
            }
        },
        mounted: function () {
            this.fields[0].value = e.user.email ? e.user.email : "", this.fields[0].readonly = !!e.user.email
        }
    })
}), define("vue!form-review/component", ["app", "vue!rich-form/component"], function (e) {
    Vue.component("form-review", {
        template: '<div> <div class="modal__container" v-if="message"> <div class="modal__group flc" v-html=\'message\'></div> <div class="modal__group flc" v-if="isModal"> <div class="rich-form-btns"> <button type="button" class="btn btn--lg js-close-modal"> <span class="btn__inner">Закрыть</span> </button> </div> </div> </div> <rich-form :fields="fields" @submit="submit" :submit-url="submitUrl" v-if="!message || dontHideFormOnSuccess"> <button type="submit" class="btn btn--lg btn--primary" slot="btn" v-if="showButton"> <span class="btn__inner">{{buttonText}}</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </rich-form> </div>',
        data: function () {
            return {
                submitUrl: window.location,
                dontHideFormOnSuccess: 0,
                buttonText: "Отправить",
                message: "",
                fields: []
            }
        },
        props: {showButton: {default: 1}, isModal: {default: 0}, staticDataSource: {default: null}},
        mounted: function () {
            console.log(this.staticDataSource)
        },
        created: function () {
            var e = this;
            e.staticDataSource && (e.staticDataSource.submitUrl && (e.submitUrl = e.staticDataSource.submitUrl), e.staticDataSource.buttonText && (e.buttonText = e.staticDataSource.buttonText), e.staticDataSource.dontHideFormOnSuccess && (e.dontHideFormOnSuccess = e.staticDataSource.dontHideFormOnSuccess), e.fields = e.staticDataSource.fields)
        },
        methods: {
            submit: function (e) {
                e && e.success && (this.message = e.message)
            }
        }
    })
}), define("vue!recently-viewed/component", ["app", "vue!slick/component"], function (e) {
    Vue.component("recently-viewed", {
        template: '<transition name="recently-viewed-slide"> <section class="floor floor--recently-viewed" v-if="items && items.length"> <div class="container"> <div class="floor-header floor-header--separator"> <div class="floor-header__left floor-header__left--empty"></div> <div class="floor-header__main"><h2>{{title}}</h2></div> <div class="floor-header__right floor-header__right--empty"></div> </div> <slick ref="slider" class="recently-viewed-slider slick-side-offset slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="sliderOptions"> <div class="recently-viewed-item slick-side-offset-item" v-for="item in items" :key="item.id"> <div class="recently-viewed-item__img-box"> <div v-if="item.image" class="recently-viewed-item__img-cover" :style="{\'background-image\': \'url(\' + item.image + \')\'}"></div> <div v-else class="recently-viewed-item__img-cover"> <svg class="recently-viewed-item__no-photo-icon svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> <a :href="item.link" class="recently-viewed-item__link" :title="item.name"></a> <span class="recently-viewed-item__remove" title="Удалить" @click="removeItem(item)"> <svg class="svg-icon svg-icon--remove"><use xlink:href="#svg-icon-close"></use></svg> </span> </div> </div> </slick> </div> </section> </transition>',
        data: function () {
            return {
                items: null,
                sliderOptions: _.defaults(this.options || {}, {
                    slidesToShow: 9,
                    slidesToScroll: 5,
                    infinite: !1,
                    responsive: [{breakpoint: 1125, settings: {slidesToShow: 8, slidesToScroll: 5}}, {
                        breakpoint: 999,
                        settings: {slidesToShow: 7, slidesToScroll: 4}
                    }, {
                        breakpoint: 850,
                        settings: {slidesToShow: 6, slidesToScroll: 4}
                    }, {
                        breakpoint: View.breakpoints["xs-max"],
                        settings: {slidesToShow: 5, slidesToScroll: 1, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["2xs-max"],
                        settings: {slidesToShow: 4, slidesToScroll: 1, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["3xs-max"],
                        settings: {slidesToShow: 3, slidesToScroll: 1, swipeToSlide: !0, arrows: !1, dots: !0}
                    }]
                })
            }
        },
        props: ["dataSource", "staticDataSource", "options", "title"],
        methods: {
            removeItem: function (e) {
                $.ajax({url: e.deletelink, method: "DELETE", dataType: "json"}).done(function (e) {
                    console.log("remove item", e)
                }).fail(function (e) {
                    console.warn("remove item ajax fail", e)
                });
                var t = _.findIndex(this.items, {id: e.id}), i = this.$refs.slider;
                i && (i.remove(t), this.items.splice(t, 1), this.items.length && i.setPosition())
            }
        },
        created: function () {
            this.items = this.staticDataSource ? this.staticDataSource.items : null
        },
        updated: function () {
            try {
                this.items.length && this.$refs.slider && this.$refs.slider.setPosition()
            } catch (e) {
            }
        }
    })
}), define("vue!slide/component", ["app"], function (e) {
    Vue.component("slide", {
        props: {
            image: {default: null},
            link: {default: null},
            title: {default: null},
            text: {default: null},
            right: {type: Boolean, default: !1},
            left: {type: Boolean, default: !1},
            wide: {type: Boolean, default: !1},
            dark: {type: Boolean, default: !1}
        },
        template: '<div class="slide slick-slide" :class="{\'slide--dark\': dark, \'slide--left\': left, \'slide--right\': right, \'slide--wide\': wide}"> <div class="slide__bg"> <div class="slide__bg-cover" :style="\'background-image: url(\' + image + \')\'"></div> </div> <div class="slide__main" v-if="$slots[\'title\'] || $slots[\'text\'] || $slots[\'action\'] || $slots[\'btn\']"> <a :href="link" class="slide__link" v-if="link"></a> <div class="slide__container" :class="{\'container\': !!wide}"> <div class="slide__content"> <slot name="title"></slot> <slot name="text"></slot> <slot name="action"></slot> <div class="slide__action flc" v-if="$slots.btn"> <div class="slide__btn-row"> <slot name="btn"></slot> </div> </div> </div> </div> </div> </div>'
    })
}), define("vue!slider-brands/component", ["app", "vue!slick/component"], function (e) {
    Vue.component("slider-brands", {
        data: function () {
            return {
                localOptions: _.defaults(this.options || {}, {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    responsive: [{
                        breakpoint: View.breakpoints["md-max"],
                        settings: {slidesToShow: 5, slidesToScroll: 5}
                    }, {
                        breakpoint: View.breakpoints["xs-max"],
                        settings: {slidesToShow: 4, slidesToScroll: 4, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["3xs-max"],
                        settings: {slidesToShow: 3, slidesToScroll: 3, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["4xs-max"],
                        settings: {slidesToShow: 3, slidesToScroll: 3, swipeToSlide: !0, arrows: !1, dots: !0}
                    }]
                })
            }
        },
        props: ["options"],
        template: '<slick ref="slider" class="slider-brands slick-side-offset slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="localOptions"> <slot></slot> </slick>',
        updated: function () {
            try {
                this.$refs.slider.setPosition()
            } catch (e) {
            }
        }
    })
}), define("vue!slider-products/component", ["app", "vue!slick/component"], function (e) {
    Vue.component("slider-products", {
        data: function () {
            return {
                localOptions: _.defaults(this.options || {}, {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [{
                        breakpoint: 1025,
                        settings: {slidesToShow: 3, slidesToScroll: 3}
                    }, {
                        breakpoint: View.breakpoints["xs-max"],
                        settings: {slidesToShow: 2, slidesToScroll: 1, swipeToSlide: !0, arrows: !0, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["4xs-max"],
                        settings: {slidesToShow: 1, slidesToScroll: 1, variableWidth: !0, arrows: !0, dots: !0}
                    }]
                })
            }
        },
        props: ["options"],
        template: '<slick ref="slider" class="slider-products slick-side-offset slick-default-arrows slick-default-dots slick-outside-dots-xs" :options="localOptions"> <slot></slot> </slick>',
        updated: function () {
            try {
                this.$refs.slider.setPosition()
            } catch (e) {
            }
        }
    })
}), define("vue!generic-tabs/component", ["Model"], function (e) {
    Vue.component("generic-tabs", {
        template: '<div class="generic-tabs" :class="{\'generic-tabs--buttons\': buttons, \'generic-tabs--to-radio\': mobileRadio}"> <div class="generic-tabs__nav"> <div class="generic-tabs__label" v-for="tab in tabs" :class="{active: tab.tabKey == activeTabKey, \'generic-tabs__label--label\': !buttons, \'generic-tabs__label--btn\': buttons, \'btn\': buttons, \'btn--secondary\': buttons && tab.tabKey !== activeTabKey, \'btn--primary\': buttons && tab.tabKey == activeTabKey}" @click="activeTabKey = tab.tabKey; switchTab(tab.tabKey)"> <span :class="{\'btn__inner\': buttons}">{{tab.label}}</span> </div> </div> <div class="generic-tabs__tabs"> <div class="generic-tabs__radio"> <div v-for="tab in tabs" :key="tab.tabKey" class="rich-form-row"> <label class="checkbox-row checkbox-row--radio"> <input type="radio" class="checkbox-row__input" :value="tab.tabKey" v-model="activeTabKey" @change="activeTabKey == tab.tabKey ? switchTab(activeTabKey) : \'\'"> <span class="checkbox-row__visual"></span> <span class="checkbox-row__text">{{tab.label}}</span> </label> </div> </div> <slot></slot> </div> </div>',
        data: function () {
            return {tabs: [], activeTabKey: null}
        },
        props: {buttons: {type: Boolean, default: !1}, mobileRadio: {type: Boolean, default: !1}},
        methods: {
            switchTab: function (t) {
                _.each(this.tabs, function (e) {
                    e.$emit("toggle", e.tabKey == t)
                })
            }
        },
        created: function () {
            this.tabs = this.$children
        },
        mounted: function () {
            var e = _.findWhere(this.$children, {active: !0});
            this.activeTabKey = e ? e.tabKey : null
        }
    })
}), define("vue!generic-tab/component", ["Model"], function (e) {
    Vue.component("generic-tab", {
        template: '<transition name="content-fade" mode="out-in"> <div class="generic-tab" v-if="localActive" :key="tabKey"> <slot></slot> </div> <div class="generic-tab-alt" v-else></div> </transition>',
        data: function () {
            return {localActive: !1}
        },
        props: {label: {default: "label"}, active: {type: Boolean, default: !1}, tabKey: {default: null}},
        created: function () {
            var t = this;
            t.localActive = t.active, this.$on("toggle", function (e) {
                t.localActive = !!e
            })
        }
    })
}), define("vue!page-nav/component", ["Model"], function (e) {
    Vue.component("page-nav", {
        template: '<transition name="content-fade" mode="out-in"> <nav class="page-nav" v-if="!loading && count >= limit"> \x3c!-- count = {{count}} offset = {{offset}} limit = {{limit}} count >= offset + limit = {{count >= offset + limit}} offset + limit = {{offset + limit}} <div class="page-nav__more" v-if="showMore && count > offset + limit"> <button type="button" class="btn" @click="$emit(\'more\')"> <span class="btn__inner">Показать еще</span> </button> </div> --\x3e <div class="page-nav__pages" v-if="showPages"> <div class="page-nav__item page-nav__item--btn" v-if="linkPrev"> <a class="page-nav-btn" :href="linkPrev.link" @click.prevent="$emit(\'goto\', linkPrev.number)"> <svg class="svg-icon svg-icon--20"><use xlink:href="#svg-icon-arrow-left"></use></svg> </a> </div> <div class="pages-nav_items"> <div class="page-nav__item page-nav__item--page" v-for="page in pagesToRender"> <div class="page-nav-btn page-nav-btn--current" v-if="page.number == currentPage"> <span class="page-nav-btn__txt">{{page.number}}</span> </div> <a class="page-nav-btn" :href="page.link" v-else @click.prevent="$emit(\'goto\', page.number)"> <span class="page-nav-btn__txt">{{page.number}}</span> </a> </div> </div> <div class="page-nav__item page-nav__item--btn" v-if="linkNext"> <a class="page-nav-btn" :href="linkNext.link" @click.prevent="$emit(\'goto\', linkNext.number)"> <span class="page-nav-btn__txt"> <svg class="svg-icon svg-icon--20"><use xlink:href="#svg-icon-arrow-right"></use></svg> </span> </a> </div> </div> </nav> <nav class="page-nav" v-if="loading"> <svg class="spinner spinner--default active" viewBox="0 0 80 80"> <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle> </svg> </nav> </transition>',
        data: function () {
            return {hash: window.location.hash, currentPage: 1, pagesToRenderDeltaLimit: 2}
        },
        computed: {
            pagesToRender: function () {
                var e = this, t = [], i = 0 <= e.baseUrl.indexOf("?") ? "&" : "?";
                e.currentPage = Math.ceil(e.offset / e.limit) + 1;
                for (var o = Math.max(1, e.currentPage - e.pagesToRenderDeltaLimit); o <= Math.ceil(e.count / e.limit) && t.length < 2 * e.pagesToRenderDeltaLimit + 1; o++) t.push({
                    number: o,
                    link: e.baseUrl + i + "limit=" + e.limit + "&offset=" + (o - 1) * e.limit
                });
                return t
            }, linkPrev: function () {
                var e = this, t = 0 <= e.baseUrl.indexOf("?") ? "&" : "?";
                return 1 < e.currentPage ? {
                    number: e.currentPage - 1,
                    link: e.baseUrl + t + "limit=" + e.limit + "&offset=" + (e.currentPage - 1) * e.limit
                } : null
            }, linkNext: function () {
                var e = this, t = 0 <= e.baseUrl.indexOf("?") ? "&" : "?",
                    i = e.pagesToRender[e.pagesToRender.length - 1].number;
                return console.log("last" + i), console.log("probe4" + e.currentPage), i > e.currentPage ? {
                    number: e.currentPage + 1,
                    link: e.baseUrl + t + "limit=" + e.limit + "&offset=" + e.currentPage * e.limit
                } : null
            }
        },
        props: {
            showMore: {type: Boolean, default: !1},
            showPages: {type: Boolean, default: !1},
            count: {default: null},
            limit: {default: null},
            offset: {default: null},
            baseUrl: {default: null},
            loading: {default: !1}
        },
        created: function () {
            var e = this, t = $(window);
            t.off("hashchange.updatePageNavHash").on("hashchange.updatePageNavHash", function () {
                e.hash = window.location.hash
            }), t.off("resize.vuePageNavLimitUpdate").on("resize.vuePageNavLimitUpdate", function () {
                e.pagesToRenderDeltaLimit = 400 < window.innerWidth ? 2 : 1
            })
        }
    })
}), define("vue!user-reviews/component", ["Model", "vue!rating-block/component", "vue!page-nav/component"], function (e) {
    Vue.component("user-reviews", {
        template: '<div class="user-reviews"> <div class="like-no-reviews" v-if="reviews.length == 0"> <h2 class="like-no-reviews__title flc">Отзывов нет, вы можете стать первым</h2> <div class="like-no-reviews__text flc">Расскажите о своем опыте использования товара. Обратите внимание на качество, удобство и соответствие заявленным характеристикам.</div> <div class="like-no-reviews__action"> <button type="button" class="btn" @click="showReviewModal"> <span class="btn__inner">Оставить отзыв</span> </button> </div> </div> <div class="user-reviews__header" v-if="reviews.length != 0"> <h2 class="user-reviews__header-title">Рейтинг товара</h2> <div class="user-reviews__header-stars"> <rating-block v-if="rating" :value="rating.value" :count="rating.count" :show-text="true"></rating-block> </div> </div> <div class="user-reviews__list" v-if="reviews.length != 0"> <div class="user-reviews__list-item" v-for="(review, index) in reviews"> <transition-group tag="div" name="content-fade" mode="out-in"> <article class="review" v-if="index <= 1 || showAllReviews" :key="index"> <aside class="review__aside"> <div class="review__rating"> <rating-block :value="review.rating"></rating-block> </div> <div class="review__author">{{review.author}}</div> <div class="review__date">{{review.date}}</div> <div class="review__aside-key" v-if="review.term">Опыт использования:</div> <div class="review__aside-value" v-if="review.term">{{review.term}}</div> </aside> <div class="review__main"> <h3 class="review__title" v-if="review.title">{{review.title}}</h3> <div class="review__text-block flc" v-if="review.pros"> <span class="review__text-block-title h4">Достоинства: </span> {{review.pros}} </div> <div class="review__text-block flc" v-if="review.cons"> <span class="review__text-block-title h4">Недостатки: </span> {{review.cons}} </div> <div class="review__text-block flc" v-if="review.comment"> <span class="review__text-block-title h4">Комментарий: </span> {{review.comment}} </div> <div class="review__votes hide"> <div class="review__votes-label">Полезно?</div> <div class="review__votes-like"> <div class="voting-hand voting-hand--like" :class="{\'voting-hand--neutral\': review.likes == 0}"> <div class="voting-hand__icon"> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-like"></use></svg> </div> <div class="voting-hand__value">{{review.likes}}</div> </div> </div> <div class="review__votes-dislike"> <div class="voting-hand voting-hand--dislike" :class="{\'voting-hand--neutral\': review.dislikes == 0}"> <div class="voting-hand__icon"> <svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-dislike"></use></svg> </div> <div class="voting-hand__value">{{review.dislikes}}</div> </div> </div> </div> </div> </article> </transition-group> </div> <page-nav v-if="showAllReviews && pages.count > pages.limit" :show-more="true" :show-pages="true" :show-prev-arrow="true" :show-next-arrow="true" :base-url="dataSource" :count="pages.count" :limit="pages.limit" :offset="pages.offset" @more="loadMore" @goto="goToPage"></page-nav> </div> <div class="user-reviews__actions"> <transition name="content-fade" mode="out-in" v-if="pages.count > 2"> <button type="button" class="btn" v-if="!showAllReviews" @click="showAllReviews = !showAllReviews"> <span class="btn__inner">Показать все отзывы</span> <span class="btn__sup">{{pages.count}}</span> </button> <button type="button" class="btn" v-if="showAllReviews" @click="showAllReviews = !showAllReviews"> <span class="btn__inner">Свернуть отзывы</span> </button> </transition> <button type="button" class="btn" @click="showReviewModal " v-if="reviews.length > 0"> <span class="btn__inner">Оставить отзыв</span> </button> </div> </div>',
        data: function () {
            return {
                currentUrl: "/catalog/reviewlist.php",
                bxajaxid: "",
                APPKEY: "",
                pages: [],
                reviews: [],
                rating: null,
                showAllReviews: !1,
                initialized: !1
            }
        },
        props: {
            dataSource: {type: String, default: null},
            staticDataSource: {default: null},
            productId: {default: null},
            offerId: {default: null}
        },
        methods: {
            showReviewModal: function () {
                e.showReviewModal(this.productId, this.offerId)
            }, loadMore: function () {
                var e = this;
                e.reloadReviews(this.currentUrl, {
                    APPKEY: e.APPKEY,
                    bxajaxid: e.bxajaxid,
                    offset: e.pages.offset + e.pages.limit,
                    productID: e.productId,
                    limit: e.pages.limit
                }, {append: !0}), e.pages.offset += e.pages.limit
            }, goToPage: function (e) {
                var t = this;
                console.log("goin to page", e), t.reloadReviews(this.currentUrl, {
                    APPKEY: t.APPKEY,
                    bxajaxid: t.bxajaxid,
                    offset: (e - 1) * t.pages.limit,
                    productID: t.productId,
                    limit: t.pages.limit
                }), t.pages.offset = (e - 1) * t.pages.limit
            }, reloadReviews: function (e, t, i) {
                var o = this;
                $.post({url: e, data: t, dataType: "json"}).done(function (e) {
                    o.setState(e, i)
                }).fail(function (e) {
                    console.log("catalog list main reloadReviews failed", e)
                })
            }, setState: function (e, t) {
                var i = this;
                i.rating = e.rating, i.bxajaxid = e.bxajaxid, t && t.append ? i.reviews.push.apply(i.reviews, e.reviews) : (i.reviews = e.reviews, i.initialized && $("html, body").animate({scrollTop: $(i.$el).offset().top - 30}, 500)), i.pages = e.pages, i.pages.offset = parseInt(i.pages.offset), i.pages.limit = parseInt(i.pages.limit), i.pages.count = parseInt(i.pages.count), i.APPKEY = e.APPKEY, i.initialized = !0
            }
        },
        created: function () {
            var t = this;
            t.staticDataSource ? (t.reviews = t.staticDataSource.reviews, t.rating = t.staticDataSource.rating) : t.dataSource && $.get({
                url: t.dataSource,
                dataType: "json"
            }).done(function (e) {
                t.setState(e, !1)
            }).fail(function (e) {
                console.warn("user-reviews ajax fail: ", e)
            })
        }
    })
}), define("vue!image-gallery/component", ["Model", "vue!slick/component"], function (e) {
    var o = {
        zoomOffsetX: 0,
        zoomOffsetY: 0,
        zoomImageWidth: 0,
        zoomImageHeight: 0,
        zoomOriginalWidth: 0,
        zoomOriginalHeight: 0,
        zoomTarget: null
    };
    Vue.component("image-gallery", {
        template: '<div class="image-gallery" :class="{\'image-gallery--w-zoom\': zoom, \'image-gallery--zoom-active\': zoomActive && zoomLoaded, \'image-gallery--horizontal\': mode == \'horizontal\'}"> <div class="image-gallery__previews" v-if="gallery.length > 1 && mode != \'horizontal\'" :class="{\'image-gallery__previews--folded\': previewsFolded, \'image-gallery__previews--overflow\': previewsOwerflown}"> <div class="image-gallery__previews-item" v-for="(image, index) in gallery" :class="{\'active\': index == currentIndex}" @click="switchImage(index)"> <img :src="image.src.preview" alt="" v-if="image.type == \'image\'"> <img :src="\'https://img.youtube.com/vi/\' + image.src.videoId + \'/sddefault.jpg\'" alt="" v-if="image.type == \'youtube\'"> <svg class="svg-icon" v-if="image.type == \'youtube\'"><use xlink:href="#svg-icon-video"></use></svg> </div> <div class="image-gallery__previews-more" v-if="gallery && gallery.length > 6"> <transition name="content-fade"> <span class="link link--local" v-if="previewsFolded" @click="toggleFoldedPreviews"> Еще <span class="image-gallery__previews-more-num"> {{gallery.length - 6}} </span> </span> <span class="link link--local" v-else @click="toggleFoldedPreviews"> Свернуть </span> </transition> </div> </div> <div class="image-gallery__previews" :class="{\'image-gallery__previews--slider-on\': gallery.length > 4}" v-else-if="gallery.length > 1 && mode == \'horizontal\'"> <slick class="slick-default-arrows" :options="previewSliderOptions" ref="previewSlider"> <div class="image-gallery__previews-slide" v-for="(image, index) in gallery"> <div class="image-gallery__previews-item" :class="{\'active\': index == currentIndex}" @click="switchImage(index)"> <img :src="image.src.preview" alt="" v-if="image.type == \'image\'"> <img :src="\'https://img.youtube.com/vi/\' + image.src.videoId + \'/sddefault.jpg\'" alt="" v-if="image.type == \'youtube\'"> <svg class="svg-icon" v-if="image.type == \'youtube\'"><use xlink:href="#svg-icon-video"></use></svg> </div> </div> </slick> </div> <div class="image-gallery__view"> <slick ref="slider" class="image-gallery__slider slick-default-arrows slick-default-dots" :options="sliderOptions" @beforeChange="slide"> <div class="image-gallery__slide" v-for="image in gallery"> <div class="image-gallery__img-box" :class="{\'image-gallery__img-box--video\': image.type == \'youtube\'}" @click="imageClick(image)"> <div class="image-gallery__img-box-in"> <div class="image-gallery__img-wrap" :class="{\'image-gallery__img-wrap--cover\': image.type == \'youtube\'}"> <img :src="image.src.main" alt="" v-if="!zoom && image.type == \'image\'"> <img :src="image.src.main" alt="" v-if="zoom && image.type == \'image\' && !touchMode" @click="zoomToggle" @mouseleave="zoomHide" @mousemove="zoomMove"> <img :src="image.src.main" alt="" v-if="zoom && image.type == \'image\' && touchMode" @touchstart="zoomShow" @touchend="zoomHide" @touchmove="zoomMove"> <img :src="\'https://img.youtube.com/vi/\' + image.src.videoId + \'/hqdefault.jpg\'" alt="" v-if="image.type == \'youtube\'"> <svg class="image-gallery__video-icon svg-icon" v-if="image.type == \'youtube\'"><use xlink:href="#svg-icon-video"></use></svg> \x3c!--iframe :src="\'https://www.youtube.com/embed/\' + image.src.videoId" allowfullscreen ></iframe--\x3e <div class="image-gallery__lens" v-if="zoom && image.type == \'image\'" :style="{left: zoomLensX + \'px\', top: zoomLensY + \'px\', width: zoomLensWidth + \'px\', height: zoomLensHeight + \'px\'}"></div> </div> </div> </div> </div> </slick> <div class="image-gallery__tip image-gallery__tip--zoom" v-if="zoom && !touchMode "> <img src="/local/images/icons/Zoom.png" alt=""> </div> </div> </div>',
        data: function () {
            return {
                previewsFolded: !0,
                previewsOwerflown: !1,
                galleryId: null,
                zoomActive: !1,
                zoomLoaded: !1,
                zoomLensX: 0,
                zoomLensY: 0,
                zoomLensWidth: 0,
                zoomLensHeight: 0,
                currentIndex: 0,
                sliderOptions: {
                    waitForAnimate: !1,
                    swipe: View.mobileAndTabletCheck,
                    draggable: !1,
                    prevArrow: '<span class="slick-arrow slick-prev" style="color: #fff;"><svg class="svg-icon"><use xlink:href="#svg-icon-small-arrow-left"></use></svg></span>',
                    nextArrow: '<span class="slick-arrow slick-next" style="color: #fff;"><svg class="svg-icon"><use xlink:href="#svg-icon-small-arrow-right"></use></svg></span>',
                    responsive: [{breakpoint: View.breakpoints["xs-max"], settings: {arrows: !1, dots: !0, swipe: !0}}]
                },
                previewSliderOptions: {slidesToShow: 4, slidesToScroll: 3, infinite: !1},
                touchMode: !1
            }
        },
        props: {
            gallery: {default: null},
            zoom: {type: Boolean, default: !1},
            zoomViewerWidth: {default: null},
            zoomViewerHeight: {default: null},
            mode: {default: "vertical"}
        },
        watch: {
            gallery: function () {
                this.$refs.slider.reSlick(), this.switchImage(0)
            }
        },
        methods: {
            switchImage: function (e) {
                this.currentIndex = e, this.$refs.slider.goTo(e)
            }, slide: function (e, t, i, o) {
                this.currentIndex = o
            }, setInitialState: function () {
            }, toggleFoldedPreviews: function () {
                this.previewsFolded = !this.previewsFolded
            }, zoomMove: function (e) {
                var t = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
                o.zoomOffsetX = e.offsetX || e.touches[0].pageX - e.target.getBoundingClientRect().left, o.zoomOffsetY = e.offsetY || e.touches[0].pageY - e.target.getBoundingClientRect().top - t, o.zoomTarget = e.target, requestAnimationFrame ? requestAnimationFrame(this.zoomMoveSet) : zoomMoveSet(), e.preventDefault()
            }, zoomMoveSet: function () {
                var e = this, t = Math.min(e.zoomViewerWidth / o.zoomOriginalWidth, 1);
                e.zoomLensWidth = o.zoomImageWidth * t, e.zoomLensHeight = o.zoomImageHeight * t, t < 1 && (e.zoomLensHeight *= e.zoomViewerHeight / e.zoomViewerWidth), e.zoomLensHeight = Math.round(e.zoomLensHeight), e.zoomLensWidth = Math.round(e.zoomLensWidth), e.zoomLensX = o.zoomOffsetX - e.zoomLensWidth / 2, e.zoomLensY = o.zoomOffsetY - e.zoomLensHeight / 2, e.zoomLensX < 0 && (e.zoomLensX = 0), e.zoomLensX + e.zoomLensWidth > o.zoomImageWidth && (e.zoomLensX = o.zoomImageWidth - e.zoomLensWidth), e.zoomLensY < 0 && (e.zoomLensY = 0), e.zoomLensY + e.zoomLensHeight > o.zoomImageHeight && (e.zoomLensY = o.zoomImageHeight - e.zoomLensHeight), e.$emit("zoomMove", e.zoomLensX / o.zoomImageWidth, e.zoomLensY / o.zoomImageHeight)
            }, zoomShow: function (t) {
                var i = this;
                Vue.nextTick(function () {
                    if (i.zoomActive = !0, o.zoomImageWidth = t.target.offsetWidth, o.zoomImageHeight = t.target.offsetHeight, i.zoomLoaded) i.$emit("zoomActivated", i.gallery[this.currentIndex]); else {
                        var e = new Image;
                        e.onload = function () {
                            o.zoomOriginalWidth = e.width, o.zoomOriginalHeight = e.height, o.zoomOriginalWidth < 1.5 * o.zoomImageWidth && o.zoomOriginalHeight < 1.5 * o.zoomImageHeight ? i.zoomActive = !1 : (i.zoomLoaded = !0, i.$emit("zoomActivated", i.gallery[i.currentIndex]))
                        }, e.src = i.gallery[i.currentIndex].src.original
                    }
                    i.$refs.slider.setOption("swipe", !i.zoomActive)
                })
            }, zoomHide: function (e) {
                this.zoomActive = !1, this.zoomLoaded = !1, this.$emit("zoomDeactivated"), this.$refs.slider.setOption("swipe", !this.zoomActive)
            }, zoomToggle: function (e) {
                this.zoomActive ? this.zoomHide(e) : this.zoomShow(e)
            }, recalcPreviewsOverflow: function () {
                this.$refs.previewsContainer && (this.previewsOwerflown = this.$refs.previewsContainer.offsetHeight < this.$refs.previewsContainer.scrollHeight, this.$forceUpdate())
            }, imageClick: function (e) {
                "youtube" == e.type && View.control.openModalWithIframe({src: "https://www.youtube.com/embed/" + e.src.videoId})
            }
        },
        created: function () {
            var e = this;
            this.touchMode = View.mobileAndTabletCheck, this.galleryId = Math.round(1e5 * Math.random()), this.$on("galleryUpdate", function () {
                e.setInitialState()
            })
        },
        mounted: function () {
            var e = this;
            this.setInitialState(), this.recalcPreviewsOverflow(), $(window).on("resize.watchGalleryPreviewsState" + this.galleryId, function () {
                requestAnimationFrame ? requestAnimationFrame(e.recalcPreviewsOverflow) : e.recalcPreviewsOverflow()
            })
        },
        destroyed: function () {
            $(window).off("resize.watchGalleryPreviewsState" + this.galleryId)
        }
    })
}), define("vue!catalog-item-3/component", ["Model", "vue!image-gallery/component", "vue!rating-block/component", "vue!select-input/component", "vue!slider-input/component", "vue!generic-tabs/component", "vue!generic-tab/component", "vue!slider-related-products/component", "vue!user-reviews/component", "vue!rich-form/component", "vue!rich-form-row/component", "vue!rich-text-input/component"], function (e) {
    Vue.component("catalog-item-3", {
        template: '<div class="catalog-item-3"> <div class="catalog-item-3__box"> <div class="catalog-item-3__header"> <div class="catalog-item-3__header-main"> <h1 class="catalog-item-3__title" v-if="currentOffer && currentOffer.name">{{currentOffer.name}}</h1> <div class="catalog-item-3__subtitle"> <div class="left catalog-item-3__subtitle-line"> <div class="catalog-item-product_rate" v-if="product "> <div v-if="starscnt" class="catalog-item-3__rate-star" v-for="n in Math.floor(starscnt)"> <img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled"> </div> <div v-if="starscnt" class="catalog-item-3__rate-star" v-for="n in (5-Math.floor(starscnt))"> <img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty"> </div> </div> <div class="catalog-item-3__subtitle-art">Отзывы: {{comments.length}}</div> <div class="catalog-item-3__subtitle-art " v-if="currentOfferId && currentOffer.code">Артикул: {{currentOffer.code}}</div> <div class="catalog-item-3__subtitle-art " v-if="(!currentOfferId || !currentOffer.code) && product.code">Артикул: {{product.code}}</div> </div> <div class="right"> <label class="checkbox checkbox--compare" > <input type="checkbox" class="checkbox-row__input" :checked="product.incompare" v-on:change="compare"> <span class="checkbox__visual checkbox-row__visual"></span> <span class="checkbox__text">Сравнить</span> </label> </div> </div> </div> </div> <div class="catalog-item-3__main"> <div class="catalog-item-3__main-gallery"> <div class="product__discount product-detail__discount" v-if="product.discount"><span>-{{product.discount}}%</span> </div> <div class="catalog-item-3__status" v-if="currentOffer.status"> <div class="status-group"> <div class="status" :class="statusItem.class" v-for="statusItem in currentOffer.status">{{statusItem.name}}</div> </div> </div> <image-gallery ref="imageGallery" v-if="computedGallery && computedGallery.length" :gallery="computedGallery" mode="horizontal" :zoom="true" :zoom-viewer-width="zoomViewerWidth" :zoom-viewer-height="zoomViewerHeight" @zoomActivated="zoomActivated" @zoomDeactivated="zoomDeactivated"> </image-gallery> <div class="catalog-item-3__no-photo-box" v-else> <div class="catalog-item-3__no-photo-box-inner"> <svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg> </div> </div> <div class="catalog-item-3__zoom-box js-catalog-item-zoom-box" :class="{active: zoomActive && zoomImageSrc}" slot="zoombox"> <img :src="zoomImageSrc" alt="" class="catalog-item__zoom-box-img" :style="{\'transform\': \'translate3d(\'+zoomMoveX+\'%,\'+zoomMoveY+\'%,0)\', \'-webkit-transform\': \'translate(\'+zoomMoveX+\'%,\'+zoomMoveY+\'%)\'}"> </div> </div> <div class="catalog-item-3__main-base"> <div class="catalig-item-3__block-title">Характеристики</div> <div class="catalog-item-3__top-params flc" v-if="currentOffer && currentOffer.params && currentOffer.params.length || product.adminLink || product && product.brand"> <ul class="dot-line-list"> <li class="dot-line-list__item dot-line-row dot-line-row--bottom-dashed" v-if="product.adminLink"> <div class="dot-line-row__start c-gray-dark"><a target="_blank" :href="product.adminLink">Товар в админке</a></div> </li> <li class="dot-line-list__item dot-line-row dot-line-row--bottom-dashed" v-if="product && product.brand"> <div class="dot-line-row__start c-gray-dark"> Бренд </div> <div class="dot-line-row__end"> {{product.brand}} </div> </li> <li class="dot-line-list__item dot-line-row dot-line-row--bottom-dashed" v-for="prop in currentOffer.params"> <div class="dot-line-row__start c-gray-dark"> <span>{{prop.name}}</span> <div class="inline-tooltip inline-tooltip--xs-text dropdown-owner dropdown-arrow-owner js-dropdown" v-if="prop.descr"> <svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"><use xlink:href="#svg-icon-tooltip"></use></svg> <div class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position"> <div class="text-guide text-guide-decore" v-html="prop.descr"></div> </div> </div> </div> <div class="dot-line-row__end"> <a v-if="prop.link" :href="prop.link" class="link--like-text link--undecorated">{{prop.value}}</a> <span v-else>{{prop.value}}</span> </div> </li> </ul> </div> <div class="catalog-item-3__top-params-actions flc"> <span class="inline-separator" v-if="similarBlockPresent"></span> <a href="#similar" class="link link--local js-anchor" v-if="similarBlockPresent">Аналоги</a> </div> </div> <div class="catalog-item-3__main-aside" > <div class="catalog-main-aside__line catalog-main-aside__line--top"> <strike v-if="product.priceOld">{{product.priceOld | formatPrice}} р.<span class="price__units" v-if="currentOffer.unit===\'disable\'"> / {{currentOffer.unit}} </span></strike> \x3c!--<strike v-else><span class="catalog-main-aside__oldprice">9 876 </span> <span class="price__units" v-if="currentOffer.unit">руб. / {{currentOffer.unit}} </span></strike>--\x3e <div class="catalog-item-3__avail catalog-item-3__avail--topline" :class="{\'instore\': currentOffer.quantity && currentOffer.quantity>0}"> <availability-sm :class="\'js_in-stock\' " :value="product.quantity > 0 ? 1 : 0" :text="\'В наличии\' " v-if="currentOffer.quantity && currentOffer.quantity>0" size="lg" :noIcon="true"></availability-sm><div style="display: none;" class="js_in-stock-list"><ul class="in-stock-table"><li class="in-stock-table__header" v-if="product.count>0"><div>Доступно всего:</div><div>{{product.count}} шт.</div></li></ul><ul class="in-stock-table in-stock-table__rows"><li class="in-stock-table__row" v-for="amount in product.amount_new"><div>{{amount.name}}</div><div>{{amount.amount}}  шт.</div></li></ul></div><availability-sm text="Под заказ" :deliveryDays="product.deliveryDays || 7" v-else size="lg"></availability-sm> </div> </div> <div class="catalog-item-3__price-row flc"> <div class="catalog-item-3__price" v-if="currentOffer.price"> <div class="price price--lg" v-if="currentOfferId && currentOffer.price"> <strong :class="{\'price__new\': currentOffer.priceOld}">{{currentOffer.price | formatPrice}} </strong> <small :class="{\'price__new-curr\': currentOffer.priceOld}" v-if="product.priceCurrency"> {{product.priceCurrency}} </small> <span class="price__units" v-if="calculator.from_unit_name_full"> / за {{calculator.from_unit_name_full}} </span> <div class="tooltop catalog-item__tooltip"> <div class="tooltip__activator"> ? </div> <div class="tooltip__content"> {{calculator.from_unit_description}} </div> </div> </div> <div class="price price--lg" v-else-if="!currentOfferId && offers.length"> <strong>{{priceMin | formatPrice}} </strong> <span class="price__separator" v-if="priceMin != priceMax"> &ndash; </span> <strong v-if="priceMin != priceMax">{{priceMax | formatPrice}} </strong> <small :class="{\'price__new-curr\': product.priceOld}" v-if="product.priceCurrency"> {{product.priceCurrency}} </small> <span class="price__units" v-if="calculator.from_unit_name_full"> / за {{calculator.from_unit_name_full}} </span> <div class="tooltop catalog-item__tooltip"> <div class="tooltip__activator"> ? </div> <div class="tooltip__content"> {{calculator.from_unit_description}} </div> </div> </div> <div class="price price--lg" v-else> <strong :class="{\'price__new\': currentOffer.priceOld}">{{currentOffer.price | formatPrice}} </strong> <small :class="{\'price__new-curr\': currentOffer.priceOld}" v-if="product.priceCurrency"> {{product.priceCurrency}} </small> <span class="price__units" v-if="calculator.from_unit_name_full">/ за {{calculator.from_unit_name_full}} <span class="tooltip catalog-item__tooltip"> <span class="tooltip__activator" v-if="calculator.from_unit_description"> ? </span> <span class="tooltip__content"> {{calculator.from_unit_description}} </span> </span></span> </div> <div v-if="calculator.to_unit && calculator.ratio" class="catalig-item-3__price-by-m">Цена за {{calculator.to_unit}} = {{(currentOffer.price/calculator.ratio).toFixed(2)}} {{product.priceCurrency}}</div> </div> <div class="catalog-item-3__actions"> \x3c!--<basket-action-catalog-item v-if="currentOffer.price && currentOffer.quantity && !currentOffer.offersCount "--\x3e <basket-action-catalog-item v-if="currentOffer.price" :offer-id="currentOffer.offerId" :calculator="calculator" :quantity="product.quantity" :max-count="currentOffer.quantity || Infinity" size="lg"></basket-action-catalog-item> \x3c!-- <div class="catalog-item-3__actions-btn" v-if="currentOffer && (!currentOffer.quantity || !currentOffer.price)"> <button type="button" class="btn btn--lg btn--info" @click="showProcuctSubscription"> <span class="btn__inner">Сообщить о появлении в наличии</span> </button> </div> --\x3e </div> <div class="aside-info-block__grid grid"> <div class="aside-info-block__group aside-info-block__group--noborder col-lg-12 col-md-4 col-sm-6 col-xs-12"> <h4 class="ig-title flc"> <span class="ig-title__text">Доставка </span> </h4> <div class="delivery-text-guide"><ul><li>10:00 - 19:00, ежедневно</li></ul> </div> <a href="/delivery/" class="link" > <span class="link__text link__text--delivery-select">Список зон доставки</span> </a> </div> </div> </div> </div> </div> </div> <div class="catalog-item-3__block flc" id="params"> <div class="catalog-item__tabs"> <generic-tabs> <generic-tab label="Характеристики" tab-key="description" active v-if="(product && product.properties.length>0) || product.text"> <div class="default-grid grid grid--free grid--flex product-caracters-box"> <div class="default-grid__item col col--free col-xs-12 two-columns-w-separator prop-groups"> <div class="descr two-columns__inner"> <div class="product-caracters__title" v-if="product.text">Описание</div> <div class="text-guide text-guide-decore" v-html="product.text" v-if="product.text"></div> </div> <div class="prop-groups__item flc two-columns__inner" v-for="group in product.properties" v-if="group.groupType == \'list\' && product.properties.length > 0"> <h3 class="product-caracters__title flc" v-if="group.groupName">{{group.groupName}}</h3> \x3c!--div class="product-properties__item product-property" v-if="prop.value" v-for="prop in group.value"> <h4 class="product-property__title">{{prop.title}}: </h4> <div class="product-property__value">{{prop.value}} </div> </div--\x3e <ul class="dot-line-list flc"> <li class="dot-line-list__item dot-line-row dot-line-row--eq" v-for="prop in group.value"> <div class="dot-line-row__start c-gray-dark"> <span>{{prop.title}}</span> <div class="inline-tooltip dropdown-owner dropdown-arrow-owner js-dropdown" v-if="prop.descr"> <svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"><use xlink:href="#svg-icon-tooltip"></use></svg> <div class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position"> <div class="text-guide text-guide-decore" v-html="prop.descr"></div> </div> </div> </div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <a v-if="prop.link" :href="prop.link" class="link--like-text link--undecorated">{{prop.value}}</a> <span v-else>{{prop.value}}</span> </div> </li> </ul> </div> </div> <div class="default-grid__item col col--free col-lg-6 col-xs-12"> <div class="prop-groups flc" v-if="product.properties.length > 0"> <div class="prop-groups__item flc" v-for="group in currentOffer.properties" v-if="group.groupType !== \'list\'"> <h3 class="prop-groups__title flc" v-if="group.groupName">{{group.groupName}}</h3> \x3c!--div class="product-properties__item product-property" v-if="prop.value" v-for="prop in group.value"> <h4 class="product-property__title">{{prop.title}}: </h4> <div class="product-property__value">{{prop.value}} </div> </div--\x3e <div class="text-guide" v-html="group.value" v-if="group.groupType == \'html\'"></div> <div class="sec-props" v-if="group.groupType == \'secondary-list\'"> <ul class="dot-line-list flc"> <li class="dot-line-list__item dot-line-row dot-line-row--eq dot-line-row--sm" v-for="prop in group.value"> <div class="dot-line-row__start c-gray-dark"> <span>{{prop.title}}</span> <div class="inline-tooltip dropdown-owner dropdown-arrow-owner js-dropdown" v-if="prop.descr"> <svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"><use xlink:href="#svg-icon-tooltip"></use></svg> <div class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position"> {{prop.descr}} </div> </div> </div> <div class="dot-line-row__ruler"></div> <div class="dot-line-row__end"> <a v-if="prop.link" :href="prop.link" class="link--like-text link--undecorated">{{prop.value}}</a> <span v-else>{{prop.value}}</span> </div> </li> </ul> </div> </div> </div> </div> </div> </generic-tab> <generic-tab label="Вопрос-ответ" tab-key="feedback-faq" v-if="faq"> <div class="text-guide text-guide-decore" > <div class="left js-parent"> <div class="faq-block feedback-faq__wrap"> <div class="feedback__btn"> <button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab btn--feebback-top" data-tab="faq_form" onclick="View.initAllLocal();"><span class="btn__inner">задать вопрос</span></button> <button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab btn--feebback-top current" data-tab="faq_faq"><span class="btn__inner">отмена</span></button> </div> <div class="faq_faq switched-tab-container js-tab current"> <div class="js-parent js-accordeon" v-for="item in faq"> <div class="faq-title js-accordeon-title"> <div class="faq-title__icon"> <svg class="svg-icon"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </div> <h3 class="accordion-block__title faq-title__title"><span class="">{{item.name}}</span></h3> </div> <div class="accorderon-content js-accordeon-content text-guide text-guide-decore"><p>{{item.text}}</p></div> </div> </div> <div class="faq_form switched-tab-container js-tab"> <form action="" class="simple-form" id="formFaq"> <input type="hidden" v-if="product.offerId" name="id" :value="product.offerId"> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" note="Имя"> <div class="input rich-text-input__input-checkout"> <input type="text" placeholder="Имя*" novalidate="novalidate" name="name" class="rich-text-input__input text-input"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" > <div class="input rich-text-input__input-checkout"> <input type="text" placeholder="Телефон*" novalidate="novalidate" name="phone" class="rich-text-input__input text-input text-input js-mask-input--phone"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" > <div class="input rich-text-input__input-checkout"> <input type="text" placeholder="Email*" novalidate="novalidate" name="email" class="rich-text-input__input text-input"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" > <div class="input rich-text-input__input-checkout"> <textarea autocomplete="off" placeholder="Комментарий*" novalidate="novalidate" name="comment" class="rich-text-input__input text-input"></textarea> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <button type="submit" class="btn btn--lg btn--primary"> <span class="btn__inner">Задать вопрос</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </form> </div> </div> </div> </div> </generic-tab> <generic-tab :label="\'Отзывы (\' + comments.length + \')\'" tab-key="feedback"> <div class="text-guide text-guide-decore"> <div class="feedback-container product-caracters-box"> <div class="left js-parent"> <div class="feedback__btn"> <button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab btn--feebback-top" data-tab="feedback__form" onclick="View.initAllLocal();"><span class="btn__inner">оставить отзыв</span></button> <button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab btn--feebback-top current" data-tab="feedback_faq"><span class="btn__inner">отмена</span></button> </div> <div class="feedback_faq switched-tab-container js-tab current"> <div class="feedback-item" v-for="comment in comments"> <div class="feedback__author"> {{comment.name}} <span class="feedback__date">{{comment.date}}</span> </div> <div class="catalog-item-product_rate" v-if="comment.stars"> <div class="catalog-item-3__rate-star" v-for="n in Math.floor(comment.stars)"> <img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled"> </div> <div class="catalog-item-3__rate-star" v-for="n in (5-Math.floor(comment.stars))"> <img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty"> </div> </div> <div class="product-caracters__title" v-if="comment.benefits">Преимущества</div> <p v-if="comment.benefits">{{comment.benefits}}</p> <div class="feedback__title" v-if="comment.limitations">Недостатки</div> <p v-if="comment.limitations">{{comment.limitations}}</p> <div class="feedback__title">Комментарий</div> <p>{{comment.comment}}</p> <div v-if="comment.file" class="feedback__image"><img :src="comment.file" class="pointer js-load-modal" :data-modal="\'/ajax/detail-img.php?id=\'+comment.id"></div> <div class="feedback__answer" v-if="comment.ansver"> <div class="feedback__title">Ответ Docke</div> <p>{{comment.ansver}}</p> </div> </div> <div v-if="comments.length==0">Отзывов нет</div> </div> <div class="feedback__form switched-tab-container js-tab"> <form class="simple-form" id=\'formReview\'> <input type="hidden" v-if="product.offerId" name="id" :value="product.offerId"> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" note="Имя*"> <div class="input rich-text-input__input-checkout"> <input type="text" placeholder="Имя*" name="name" novalidate="novalidate" class="rich-text-input__input text-input"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" > <div class="input rich-text-input__input-checkout"> <input type="tel" name="phone" placeholder="Телефон*" novalidate="novalidate" class="rich-text-input__input text-input text-input js-mask-input--phone"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" > <div class="input rich-text-input__input-checkout"> <input type="text" placeholder="Email*" name="email" novalidate="novalidate" class="rich-text-input__input text-input"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input"> <div class="input rich-text-input__input-checkout"> <input type="text" autocomplete="off" placeholder="Преимущества" name="plus" novalidate="novalidate" class="rich-text-input__input text-input"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input"> <div class="input rich-text-input__input-checkout"> <input type="text" autocomplete="off" placeholder="Недостатки" name="minus" novalidate="novalidate" class="rich-text-input__input text-input"> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="rich-form-row"> <input type="hidden" name="stars" value="3"> <label class="rich-text-input__label-checkout">Оценка</label> <div class="rich-text-input rich-text-input--w-label"> <div class="input rich-text-input__input-checkout"> <div class="js-parent"> <div class="catalog-item-product_rate" > <div class="catalog-item-3__rate-star" data-val="1"> <img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled"> </div> <div class="catalog-item-3__rate-star" data-val="2"> <img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled"> </div> <div class="catalog-item-3__rate-star" data-val="3"> <img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled"> </div> <div class="catalog-item-3__rate-star" data-val="4"> <img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty"> </div> <div class="catalog-item-3__rate-star" data-val="5"> <img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty"> </div> </div> </div> </div> <span class="rich-text-input__border"></span></div></div> <div class="rich-form-row"> <div class="rich-text-input rich-text-input--w-label" slot="input" > <div class="input rich-text-input__input-checkout"> <textarea autocomplete="off" placeholder="Комментарий*" novalidate="novalidate" name="comment" class="rich-text-input__input text-input"></textarea> <span class="rich-text-input__border"></span> <span class="err"></span> </div> </div> </div> <div class="file-input rich-text-input__input"><label class="file-input__action"><input name="file" type="file" class="file-input__input--new"> <span tabindex="0" class="file-input__text"> Загрузить фото</span></label></div> <button type="submit" class="btn btn--lg btn--primary"> <span class="btn__inner">Отправить на модерацию</span> <svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20"> <use xlink:href="#svg-icon-arrow-right"></use> </svg> </button> </form> </div> </div> <div class="right"> </div> </div> </div> </generic-tab> <generic-tab v-if="showPayments" label="Способы оплаты" tab-key="payments"> <div class="text-guide feedback-faq__wrap" > <ul> <li>Оплата при доставке</li> <li>Система расчет</li> <li>Оплата банковской картой</li> </ul> </div> </generic-tab> <generic-tab label="Состав" tab-key="warranty" v-if="product.warranty"> <div class="text-guide" v-html="product.warranty"> </div> </generic-tab> <generic-tab label="О бренде" tab-key="brand" v-if="product.brandInfo"> <div class="text-guide" v-html="product.brandInfo"> </div> </generic-tab> <generic-tab label="Файлы" tab-key="files" v-if="currentOffer.files && currentOffer.files.length"> <div class="default-grid grid"> <div class="default-grid__item col col-lg-4 col-md-6 col-sm-4 col-xs-6 col-2xs-12" v-for="file in currentOffer.files"> <a :href="file.link" class="file-link" target="_blank" :download="file.ext != \'pdf\'"> <div class="file-link__title flc"> <span class="file-link__title-text">{{file.name}}</span> </div> <div class="file-link__meta flc">Файл {{file.ext}}, {{file.size}}</div> <div class="file-link__descr flc" v-if="file.description">{{file.description}}</div> <div class="file-link__descr flc" v-if="file.type">Тип: {{file.type}}</div> <div class="file-link__descr flc" v-if="file.start || file.end">Действует <span v-if="file.start">с {{file.start}}</span> <span v-if="file.end">по {{file.end}}</span></div> </a> </div> </div> </generic-tab> </generic-tabs> </div> <div class="catalog-item__reviews flc" v-if="reviewsEnabled && (mode != \'modal\' && product.reviewLink)"> <user-reviews :data-source="product.reviewLink" :product-id="product.productId" :offer-id="currentOfferId"></user-reviews> </div> </div> <a href="/compare/" class="incompare-btn" v-if="incompare>0">{{incompare}} {{incomparegoodsText}} в сравнении</a> </div>',
        data: function () {
            return {
                zoomActive: !1,
                zoomImageSrc: null,
                zoomViewerWidth: 150,
                zoomViewerHeight: 150,
                zoomMoveX: 10,
                zoomMoveY: 0,
                product: {},
                incompare: !1,
                deliveryMethods: [],
                offers: [],
                currentOfferId: null,
                params: [],
                pickerMode: null,
                basketCount: 1,
                basketWaiting: !1,
                user: e.user,
                geolocation: e.geolocation,
                buySeparate: !1,
                priceUnit: null,
                reviewsEnabled: e.reviews.enabled,
                showPayments: !1,
                similarBlockPresent: !1,
                reviewFormErrors: [],
                relatedSliderOptions: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [{
                        breakpoint: 1100,
                        settings: {slidesToShow: 2, slidesToScroll: 2}
                    }, {
                        breakpoint: View.breakpoints["sm-max"],
                        settings: {slidesToShow: 3, slidesToScroll: 3}
                    }, {
                        breakpoint: View.breakpoints["xs-max"],
                        settings: {slidesToShow: 3, slidesToScroll: 3, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["2xs-max"],
                        settings: {slidesToShow: 2, slidesToScroll: 2, swipeToSlide: !0, arrows: !1, dots: !0}
                    }, {
                        breakpoint: View.breakpoints["4xs-max"],
                        settings: {slidesToShow: 1, slidesToScroll: 1, swipeToSlide: !0, arrows: !1, dots: !0}
                    }]
                }
            }
        },
        computed: {
            currentOffer: function () {
                return _.findWhere(this.offers, {offerId: this.currentOfferId}) || this.product
            }, incomparegoodsText: function () {
                return 1 === this.incompare ? "товар" : this.incompare < 5 ? "товара" : "товаров"
            }, computedGallery: function () {
                var t = this;
                return this.product && this.product.gallery ? this.currentOfferId ? _.filter(this.product.gallery, function (e) {
                    return 0 <= e.offers.indexOf(t.currentOfferId)
                }) : this.product.gallery : null
            }, offersAsOptions: function () {
                return _.map(this.offers, function (e) {
                    return {value: e.offerId, text: e.name}
                })
            }, priceMin: function () {
                var t = null;
                return _.each(this.offers, function (e) {
                    null === t ? t = e.price : e.price < t && (t = e.price)
                }), t
            }, priceMax: function () {
                var t = null;
                return _.each(this.offers, function (e) {
                    null === t ? t = e.price : e.price > t && (t = e.price)
                }), t
            }
        },
        props: {dataSource: {default: null}, staticDataSource: {default: null}, mode: {default: "static"}},
        methods: {
            addComment: function () {
                View.control.openModalByUrl("/ajax/comment.php?id=" + this.offerId)
            }, showDelivery: function (e) {
                return 0 <= $.inArray(e, this.currentOffer.deliveryMethods)
            }, zoomActivated: function (e) {
                if (e) {
                    var t = this;
                    this.zoomActive = !0, this.zoomImageSrc = e.src.original, setTimeout(function () {
                        var e = t.$el.querySelector(".js-catalog-item-zoom-box");
                        e && (t.zoomViewerWidth = e.offsetWidth, t.zoomViewerHeight = e.offsetHeight)
                    }, 0)
                }
            }, zoomDeactivated: function () {
                this.zoomActive = !1
            }, getParamSelectedText: function (e) {
                var t = _.findWhere(e.values, {value: e.value});
                return t ? t.title : null
            }, showCitySelect: function () {
                View.control.openModalByUrl("/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y")
            }, showProcuctAvailability: function () {
                e.showProductAvailabilityModal(this.product.productId, this.currentOfferId)
            }, showProcuctSubscription: function () {
                e.showProductSubscriptionModal(this.product.productId, this.currentOfferId, this.dataSource)
            }, addToBasket: function () {
                e.addToBasket(this.currentOfferId, this.basketCount)
            }, updateCurrentOffer: function () {
                var o, e = this, t = _.find(e.offers, function (i) {
                    return o = !0, _.find(e.params, function (t) {
                        if (void 0 === t.value || null === t.value) return !(o = !1);
                        var e = _.findWhere(i.params, {name: t.name});
                        return e ? _.find(e.values, function (e) {
                            return e == t.value
                        }) ? void 0 : !(o = !1) : (console.warn("В catalog-item.params есть параметр (" + t.name + "), которого нет в catalog-item.offers[X].params", t, i), !(o = !1))
                    }), o
                });
                t && (e.currentOfferId = t.offerId, history.replaceState({}, null, t.link))
            }, scrollToOffers: function () {
                try {
                    $("html, body").animate({scrollTop: $(this.$refs.prodTable.$el).offset().top}, 500)
                } catch (e) {
                }
            }, compare: function () {
                var i = this;
                if (this.product.incompare) {
                    var e = "remove";
                    this.product.incompare = !1
                } else e = "add", this.product.incompare = !0;
                $.ajax({
                    type: "POST",
                    url: "/ajax/compare.php",
                    data: "id=" + i.product.offerId + "&action=" + e,
                    success: function (e) {
                        var t = JSON.parse(e);
                        i.incompare = parseFloat(t.count)
                    }
                })
            }
        },
        filters: {formatPrice: e.formatPrice},
        created: function () {
            var t = this;
            if (console.log("catalog item staticDataSource", t.staticDataSource), t.staticDataSource) {
                if (t.deliveryMethods = t.staticDataSource.deliveryMethods, t.params = t.staticDataSource.params, t.offers = t.staticDataSource.offers, t.faq = t.staticDataSource.faq, t.starscnt = t.staticDataSource.starscnt, t.comments = t.staticDataSource.comments, t.currentOfferId = t.staticDataSource.offerId, t.product = t.staticDataSource.product || null, t.pickerMode = t.staticDataSource.pickerMode || null, t.calculator = t.staticDataSource.calculator || null, t.priceUnit = t.staticDataSource.priceUnit || null, t.buySeparate = "offers" === t.pickerMode, t.currentOfferId || 0 === t.currentOfferId) {
                    var i = _.findWhere(t.offers, {offerId: t.currentOfferId});
                    try {
                        _.each(t.params, function (e) {
                            e.value = _.findWhere(i.params, {name: e.name})
                        })
                    } catch (e) {
                        console.log("catalog-item: filling params according to currentOffer failed", e)
                    }
                }
            } else t.dataSource && $.get({
                url: t.dataSource,
                dataType: "json",
                data: {bxajaxid: "catalog"}
            }).done(function (e) {
                t.params = e.params, t.offers = e.offers, t.currentOfferId = e.offerId, t.product = e.product || null, t.pickerMode = t.staticDataSource.pickerMode || null, t.buySeparate = "offers" === t.pickerMode, t.$refs.imageGallery && t.$refs.imageGallery.$emit("galleryUpdate")
            }).fail(function (e) {
                console.warn("catalog item loading failed: ", e)
            })
        },
        mounted: function () {
            var i = this;
            $.ajax({
                type: "POST", url: "/ajax/compare.php", success: function (e) {
                    var t = JSON.parse(e);
                    i.incompare = parseFloat(t.count)
                }
            });
            var e = this.$el.querySelector(".js-catalog-item-zoom-box");
            e && 0 != e.length && (this.zoomViewerWidth = e.offsetWidth, this.zoomViewerHeight = e.offsetHeight, i.$refs.imageGallery && (i.$refs.imageGallery.$emit("galleryUpdate"), setTimeout(function () {
                i.$refs.imageGallery.$on("galleryUpdate", function () {
                    var e = this.$el.querySelector(".js-catalog-item-zoom-box");
                    e && (this.zoomViewerWidth = e.offsetWidth, this.zoomViewerHeight = e.offsetHeight)
                }), i.$refs.imageGallery.$on("zoomMove", function (e, t) {
                    i.zoomMoveX = 100 * -e, i.zoomMoveY = 100 * -t
                })
            }, 0)), i.similarBlockPresent = 0 < $("#similar").length)
        }
    })
}), define("vue!top-banner/component", [], function () {
    Vue.component("top-banner", {
        template: '<transition @enter="slideDown" @leave="slideUp" :css="false"> <div class="top-banner" v-if="open"> <slot></slot> <button type="button" class="top-banner__close" @click="closeMessage"> <svg class="svg-icon"><use xlink:href="#svg-icon-close"></use></svg> </button> </div> </transition>',
        data: function () {
            return {open: !1, firstLoad: !0}
        },
        props: {
            cookieName: {default: ""},
            initiallyOpen: {type: Boolean, default: !0},
            closeBtn: {type: Boolean, default: !0}
        },
        methods: {
            closeMessage: function () {
                this.open = !1, this.cookieName && setCookie(this.cookieName, "Y", 365)
            }, slideDown: function (e, t) {
                this.firstLoad ? this.firstLoad = !1 : (e.style.marginTop = -e.offsetHeight + "px", setTimeout(function () {
                    $(e).animate({"margin-top": 0}, 200, t)
                }, 0))
            }, slideUp: function (e, t) {
                e.style.marginTop = 0, setTimeout(function () {
                    $(e).animate({"margin-top": -e.offsetHeight}, 200, t)
                }, 0)
            }
        },
        mounted: function () {
            this.open = this.initiallyOpen
        }
    })
}), define("vue!catalog-price-ext/component", ["Model", "vue!product-price-ext/component"], function (e) {
    Vue.component("catalog-price-ext", {
        template: '<div class="catalog-price-ext"> <transition-group tag="div" class="catalog-price-ext__grid" mode="out-in" name="content-scale"> <div class="catalog-price-ext__item" v-for="product in products" :key="product.productId"> <product-price-ext :product="product" :show-rating="true" :show-buy-button="true" :show-fav-button="true" :show-quick-view="true" :show-catalog-props-anyway="true" v-on:update-compare="checkCompare"></product-price-ext> </div> </transition-group> <a href="/compare/" class="incompare-btn" v-if="incompare>0">{{incompare}} {{incomparegoodsText}} в сравнении</a> </div>',
        data: function () {
            return {incompare: !1}
        },
        props: {products: {default: null}, loading: {default: null}},
        computed: {
            incomparegoodsText: function () {
                return 1 === this.incompare ? "товар" : this.incompare < 5 ? "товара" : "товаров"
            }
        },
        methods: {
            checkCompare: function () {
                var i = this;
                console.log("comp"), $.ajax({
                    type: "POST", url: "/ajax/compare.php", success: function (e) {
                        var t = JSON.parse(e);
                        i.incompare = parseFloat(t.count)
                    }
                })
            }
        },
        mounted: function () {
            this.checkCompare()
        }
    })
}), define("vue!folded-menu-header/component", ["app"], function (e) {
    Vue.component("folded-menu-header", {
        template: "<div class=\"folded-menu-header\"> <div class=\"folded-menu-header__btn\"> <span class=\"menu-btn\" :class=\"{'js-close-main-menu': closeMainMenu, 'js-close-main-menu-nav': closeMainMenuNav, 'js-main-menu-links__group-sub-close': closeMainMenuGroup, 'js-dropdown__close': closeMainMenuDd || closeDropdown, 'js-close-all': closeAll, 'js-close-folded-top-search': closeFoldedTopSearch, 'menu-btn--close': close, 'menu-btn--back': back}\"> <span class=\"menu-btn__part menu-btn__part--1\"></span> <span class=\"menu-btn__part menu-btn__part--2\"></span> <span class=\"menu-btn__part menu-btn__part--3\"></span> </span> </div> <div class=\"folded-menu-header__txt\">{{name}}</div> </div>",
        props: {
            name: {default: null},
            back: {type: Boolean, default: !1},
            close: {type: Boolean, default: !1},
            closeMainMenu: {type: Boolean, default: !1},
            closeMainMenuNav: {type: Boolean, default: !1},
            closeMainMenuDd: {type: Boolean, default: !1},
            closeMainMenuGroup: {type: Boolean, default: !1},
            closeDropdown: {type: Boolean, default: !1},
            closeFoldedTopSearch: {type: Boolean, default: !1},
            closeAll: {type: Boolean, default: !1}
        }
    })
}), define("vue!catalog-grid/component", ["Model", "vue!product/component"], function (e) {
    Vue.component("catalog-grid", {
        template: '<div class="catalog-grid"> \x3c!--div class="preloader-bar" :class="{\'active\': loading}"></div--\x3e <transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-scale"> <div class="catalog-grid__item col" v-for="product in products" :key="product.productId"> <product :product="product" :show-rating="true" :show-params="false" :show-buy-button="true" :show-fav-button="true" :show-quick-view="true" :show-catalog-props-anyway="true" v-on:update-compare="checkCompare"></product> \x3c!-- :delivery="product.delivery" --\x3e </div> </transition-group> <a href="/compare/" class="incompare-btn" v-if="incompare>0">{{incompare}} {{incomparegoodsText}} в сравнении</a> </div>',
        data: function () {
            return {incompare: 0}
        },
        computed: {
            incomparegoodsText: function () {
                return 1 === this.incompare ? "товар" : this.incompare < 5 ? "товара" : "товаров"
            }
        },
        props: {products: {default: null}, loading: {default: null}},
        computed: {
            incomparegoodsText: function () {
                return 1 === this.incompare ? "товар" : this.incompare < 5 ? "товара" : "товаров"
            }
        },
        methods: {
            checkCompare: function (e) {
                console.log("COMPARE"), this.incompare = e
            }
        },
        mounted: function () {
            this.incompare = $(".complex-link--basket").attr("data-incompare")
        }
    })
}), define("vue!basic-filter/component", ["Model", "vue!rich-text-input/component", "vue!slider-input/component"], function (e) {
    Vue.component("basic-filter", {
        template: '<div class="basic-filter"> <button tyle="button" class="bf-close js-bf-close"> <svg class="svg-icon"><use xlink:href="#svg-icon-close-big"></use></svg> </button> <div class="basic-filter-group" v-for="filter in links" v-if="filter.options.length || filter.link" :class="{open: isFilterOpen(filter), \'basic-filter-group--static\': !filter.options.length}" :key="filter.name"> <h4 class="basic-filter-group__header" @click="toggleFilter($event, filter)"> <svg v-if="filter.options.length" class="basic-filter-group__header-arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg> <a v-if="filter.link && filter.link!=filter.value" :href="filter.link" class="basic-filter-group__header-link link link--undecorated link--like-text" @click="linkClick($event, filter.link)"> <span class="link__text">{{filter.title}}</span>&nbsp;<sup class="link__sup" v-if="filter.count">{{filter.count}}</sup> </a> <span v-if="filter.link && filter.link==filter.value" class="link link--undecorated basic-filter-group__header-current" > <span class="link__text">{{filter.title}}</span>&nbsp;<sup class="link__sup" v-if="filter.count">{{filter.count}}</sup> </span> <span v-if="!filter.link">{{filter.title}}</span> </h4> <div v-if="filter.options.length"> <div class="basic-filter-group__item" :class="{\'js-dropdown__body\': filter.options.length>4, \'js-tooltip-position\': filter.options.length>4 }"> <div class="basic-filter-group__body" v-for="option in filter.options" v-if="option.link == filter.value || filter.options.length==1"> <div class="basic-filter-group__item" > <a :href="option.link" class="basic-filter-group__link" v-if="option.link != filter.value" @click="linkClick($event, option.link)"> <span class="link__text">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup> </a> <span class="basic-filter-group__link basic-filter-group__link--current link--undecorated link--like-text" v-else> <span class="">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup> </span> </div> </div> <div class="js-accordion" v-if="filter.options.length > 1"> <div class="basic-filter-group__body js-accordion__body" > <div class="basic-filter-group__item" v-for="option in filter.options" v-if="option.link != filter.value"> <a :href="option.link" class="basic-filter-group__link " @click="linkClick($event, option.link)"> <span class="link__text">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup> </a> </div> </div> <div class="basic-filter-group__body"> </div> </div> </div> </div> </div> <div class="basic-filter-group" v-for="filter in value" v-if=" !isFilterEmpty(filter)" :class="{open: isFilterOpen(filter), locked: isFilterLocked(filter)}" :key="filter.name"> <h4 class="basic-filter-group__header" @click="toggleFilter($event, filter)" v-if="filter.type !=\'boolean\'">{{filter.title}} <svg class="basic-filter-group__header-arrow svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg> </h4> <transition @enter="slideDown" @leave="slideUp" :css="false"> <div class="basic-filter-group__body" v-if="isFilterOpen(filter) && filter.options.length"> <transition-group tag="div" @enter="slideDown" @leave="slideUp" :css="false"> <div v-if="filter.type===\'select\'" :key="filter.name"> <div class="input rich-text-input__input-checkout"> <div> <div class="js-parent"> <div class="select select--block js-accordeon-title"> <span class="select-value">{{filter.text}}</span><svg class="select-chevron svg-icon svg-icon--dd-arrow"><use xlink:href="#svg-icon-dd-arrow"></use></svg> <ul class="select-list js-select-list select-list--new "> <li v-for="(option, index) in filter.options" @click="selectOption(filter, option)"> <span>{{option.title}}</span> <sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup></li> </ul> </div> </div> </div> <span class="rich-text-input__border"></span></div> </div> <div class="basic-filter-group__item" v-for="(option, index) in filter.options" :key="filter.name" v-if="(typeof option.count == \'undefined\' || option.count > 0) && (isOptionWithinLimits(filter, option) || isFilterMaximized(filter))" :class="{\'basic-filter-group__item--color\': option.type == \'color\'}"> <a :href="option.link" class="basic-filter-group__link link--undecorated link--like-text" v-if="option.type == \'link\'"> <span class="link__text">{{option.title}}</span>&nbsp;<sup class="link__sup" v-if="option.count">{{option.count}}</sup> </a> <label class="checkbox-row checkbox-row--sm" v-if="(option.type == \'checkbox\' || filter.type == \'boolean\') && (option.count !== 0)"> <input type="checkbox" class="checkbox-row__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)"> <span class="checkbox-row__visual"></span> <span class="checkbox-row__text">{{filter.type ==\'boolean\'? filter.title :option.title}}</span>&nbsp;<sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup> </label> <label class="checkbox-row checkbox-row--sm checkbox-row--img" v-if="option.type == \'checkbox-img\' && option.count !== 0"> <input type="checkbox" class="checkbox-row__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)"> <span class="checkbox-row__visual"> <img :src="option.image" alt=""> </span> <span class="checkbox-row__text">{{option.title}}</span>&nbsp;<sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup> </label> <label class="checkbox-row checkbox-row--sm checkbox-row--radio" v-if="option.type == \'radio\'"> <input type="radio" class="checkbox-row__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)"> <span class="checkbox-row__visual"></span> <span class="checkbox-row__text">{{option.title}}</span>&nbsp;<sup class="checkbox-row__sup" v-if="option.count">{{option.count}}</sup> </label> <label class="color-pick" v-if="option.type == \'color\'" :title="option.title"> <input type="checkbox" class="color-pick__input" :name="option.name" v-model="option.checked" @change="filterChange(filter)"> <span class="color-pick__visual" :style="{\'background-color\': option.color, \'background-image\': option.image? \'url(\' + option.image + \')\' : \'none\'}"></span> </label> <div class="range-row" v-if="option.type == \'range\'"> <div class="range-row__cell"> <rich-text-input size="sm" v-model="option.valueMin" @input="filterChange(filter)" :min="option.min" :max="Math.min(option.max, option.valueMax)" :prefix="option.prefixMin" :placeholder="option.min"></rich-text-input> <div class="range_p-holder">от</div> </div> <div class="range-row__cell"> <rich-text-input size="sm" v-model="option.valueMax" @input="filterChange(filter)" :min="Math.max(option.min, option.valueMin)" :max="option.max" :prefix="option.prefixMax" :placeholder="option.max"></rich-text-input> <div class="range_p-holder">до</div> </div> </div> <slider-input v-if="option.type == \'slider\'" @input="filterChange(filter)" :prefix="option.prefix" :prefixMin="option.prefixMin" :prefixMax="option.prefixMax" :postfix="option.postfix" :postfixMin="option.postfixMin" :postfixMax="option.postfixMax" :min="option.min" :max="option.max" :value.sync="option.value" :valueMin.sync="option.valueMin" :valueMax.sync="option.valueMax" :price="option.price" :integer="option.integer" ></slider-input> </div> </transition-group> <div class="filter-group__item-toggle" v-if="filterOptionsOverflowCount(filter)"> <a href="javascript:void(0)" class="link link--dd link--undecorated" :class="{\'open\': isFilterMaximized(filter)}" @click="toggleFilterMaxState(filter)"> <transition name="content-fade" mode="out-in"> <span class="link__text" v-if="!isFilterMaximized(filter)">Еще {{filterOptionsOverflowCount(filter)}}</span> <span class="link__text" v-else>Свернуть</span> </transition> &nbsp; <svg class="link__arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use> </svg> </a> </div> </div> </transition> </div> <transition name="content-fade"> <div class="basic-filter-action" v-if="filterChanged"> <div class="grid basic-filter-action__grid"> <div class="col basic-filter-action__grid-item hidden-sm col-lg-12"> <button type="button" class="btn btn--block" @click="clearFilter()"> <span class="btn__inner">Сбросить фильтр</span> </button> </div> <div class="col basic-filter-action__grid-item hidden visible-sm-if col-lg-12"> <button type="button" class="btn btn--block btn--primary basic-filter-action__show-btn" @click="applyFilter()"> <span class="btn__inner">Показать <small v-if="resultsCount || resultsCount === 0"> (результатов: {{resultsCount}}) </small> </span> </button> </div> <div class="col basic-filter-action__grid-item hidden visible-sm-if col-lg-12"> <button type="button" class="btn btn--block" @click="clearFilter()"> <span class="btn__inner">Сбросить фильтр</span> </button> </div> </div> </div> </transition> <div class="basic-filter__banners"> <div class="basic-filter__banner basic-filter-action__grid-item" v-if="bannerImage"> <a :href="bannerLink" class="basic-filter__banner-link"> <img :src="bannerImage" alt=""> </a> </div> </div> </div>',
        data: function () {
            return {localFilters: [], localLinks: [], lastUpdatedFilterName: null}
        },
        props: {
            value: {default: null},
            links: {default: null},
            showFilterTypes: {default: []},
            locked: {default: !1},
            notFollowLinks: {type: Boolean, default: !1},
            resultsCount: {default: null},
            bannerLink: {default: null},
            bannerImage: {default: null}
        },
        watch: {
            value: function (i, e) {
                var o = this;
                _.each(o.localFilters, function (e, t) {
                    e && void 0 === _.findWhere(i, {name: e.name}) && o.localFilters.splice(t, 1)
                }), _.each(i, function (e, t) {
                    void 0 === _.findWhere(o.localFilters, {name: e.name}) && o.localFilters.push({
                        name: e.name,
                        open: !0
                    })
                })
            }, links: function (i, e) {
                var o = this;
                _.each(o.localLinks, function (e, t) {
                    void 0 === _.findWhere(i, {name: e.name}) && o.localLinks.splice(t, 1)
                }), _.each(i, function (e, t) {
                    void 0 === _.findWhere(o.localLinks, {name: e.name}) && o.localLinks.push({name: e.name, open: !0})
                })
            }
        },
        computed: {
            filterChanged: function () {
                return !!_.find(this.value, function (e) {
                    return !!_.find(e.options, function (e) {
                        if (("checkbox" == e.type || "checkbox-img" == e.type || "radio" == e.type || "color" == e.type) && e.checked) return !0;
                        if ("range" == e.type || "slider" == e.type) {
                            if (void 0 !== e.valueMin && void 0 !== e.min && e.valueMin != e.min) return !0;
                            if (void 0 !== e.valueMax && void 0 !== e.max && e.valueMax != e.max) return !0;
                            if (void 0 !== e.value && void 0 !== e.min && e.value != e.min) return !0
                        }
                        return !1
                    })
                })
            }
        },
        methods: {
            slideDown: function (e, t) {
                var i = $(e);
                i.hide().addClass("sliding-down").removeClass("sliding-up").slideDown(300, function () {
                    i.removeClass("sliding-down"), t()
                })
            }, slideUp: function (e, t) {
                var i = $(e);
                i.show().addClass("sliding-up").removeClass("sliding-down").slideUp(300, function () {
                    i.removeClass("sliding-up"), t()
                })
            }, toggleFilter: function (e, t) {
                if (!$(e.target).closest("a").length) {
                    var i = _.findWhere(this.localFilters, {name: t.name}) || _.findWhere(this.localLinks, {name: t.name});
                    i && (i.open = !i.open, this.$forceUpdate())
                }
            }, toggleFilterMaxState: function (e) {
                var t = _.findWhere(this.localFilters, {name: e.name}) || _.findWhere(this.localLinks, {name: e.name});
                t && (t.maximized = !t.maximized, this.$forceUpdate())
            }, isFilterOpen: function (e) {
                var t = _.findWhere(this.localFilters, {name: e.name}) || _.findWhere(this.localLinks, {name: e.name});
                return !!t && (t.open || "boolean" == t)
            }, isFilterMaximized: function (e) {
                var t = _.findWhere(this.localFilters, {name: e.name}) || _.findWhere(this.localLinks, {name: e.name});
                return !!t && (t.maximized || "boolean" == t)
            }, isFilterEmpty: function (e) {
                return ("checkbox" == e.type || "checkbox-img" == e.type || "radio" == e.type || "color" == e.type) && !_.find(e.options, function (e) {
                    return void 0 === e.count || 0 < e.count
                })
            }, isFilterLocked: function (e) {
                return this.locked || this.lastUpdatedFilterName && this.lastUpdatedFilterName !== e.name
            }, filterOptionsOverflowCount: function (e) {
                if (!e.openCount) return 0;
                var t = 0;
                return _.each(e.options, function (e) {
                    void 0 !== e.count && 0 < e.count && t++
                }), Math.max(0, t - e.openCount)
            }, isOptionWithinLimits: function (t, e) {
                if (!t.openCount) return !0;
                var i = 0, o = _.findIndex(t.options, e);
                return o < t.openCount || !!_.find(t.options, function (e) {
                    if (void 0 !== e.count && 0 < e.count && i++, i < t.openCount && o < i) return !0
                })
            }, selectOption: function (e, t) {
                for (var i in e.options) e.options[i].checked = !1;
                t.checked = !0, this.filterChange(e)
            }, filterChange: function (e) {
                this.lastUpdatedFilterName = e.name, this.$emit("filterChange", this.value, e.name, this.filterChanged)
            }, clearFilter: function (e) {
                _.each(this.value, function (e) {
                    _.each(e.options, function (e) {
                        if ("checkbox" != e.type && "checkbox-img" != e.type && "radio" != e.type && "color" != e.type || (e.checked = !1), "range" == e.type || "slider" == e.type) try {
                            e.valueMin = e.min, e.valueMax = e.max
                        } catch (e) {
                        }
                    })
                }), e || this.$emit("filterChange", this.value, null)
            }, applyFilter: function () {
                View.control.closeCatalogFilter(), $("html, body").animate({scrollTop: 0}, 500)
            }, linkClick: function (e, t) {
                this.notFollowLinks && (e.preventDefault(), this.$emit("linkClick", t))
            }
        },
        mounted: function () {
            this.localLinks = this.links, this.localFilters = this.value, console.log(this)
        },
        created: function () {
            var t = this;
            this.$on("filterReloaded", function () {
                t.lastUpdatedFilterName = null
            }), this.$on("resetRequired", function (e) {
                t.clearFilter()
            })
        }
    })
}), define("vue!catalog-list-main/component", ["Model", "vue!catalog-price-ext/component", "vue!folded-menu-header/component", "vue!page-nav/component", "vue!catalog-grid/component", "vue!select-input/component", "vue!basic-filter/component"], function (s) {
    Vue.component("catalog-list-main", {
        template: '<transition name="content-fade" mode="out-in"> <div class="not-found-block" v-if="!filterIsSet && !storeIsSet && !products.length"> <div class="not-found-block__text text-guide" v-if="!favList"> Не найдено ни одного товара </div> <div class="not-found-block__text text-guide" v-else> <p>У Вас нет товаров, добавленных в раздел Избранное.</p> <p>Пожалуйста, перейдите в каталог и, кликнув на <svg class="svg-icon svg-icon--20 c-primary" style="margin: 0 6px;"> <use xlink:href="#svg-icon-fav"></use> </svg> , добавьте желаемые товары в список избранных. </p> </div> <div class="not-found-block__action flc"> <a href="/catalog/" class="btn btn--red"><span class="btn__inner">Перейти в каталог</span></a> </div> </div> <div class="layout" v-else> <aside class="layout__aside" v-if="showAside"> <div class="layout__aside-panel" v-sticky="20"> <folded-menu-header slot="top" name="Фильтр" close close-all></folded-menu-header> <basic-filter ref="basicFilter" v-model="filters" :locked="waitingForFilter" :links="sections" :not-follow-links="false" :show-filter-types="[\'link\', \'checkbox\', \'checkbox-img\', \'radio\', \'color\', \'range\', \'slider\', \'boolean\']" :results-count="pages.count ? pages.count - removedProductsCount : 0" :banner-link="banner.link" :banner-image="banner.image" @filterChange="filtersUpdated" @linkClick="sectionUpdated"></basic-filter> </div> <div class="sticky-helper"></div> </aside> <div class="layout__main"> <div class="page-title-block"> <div class="container"> <div class="catalog-list-main__top-box"> <h1 class="page-title" v-html="title_custom"></h1> <div class="catalog-top-params"> <button type="button" class="catalog-top-params__main-btn panel-btn bf-open js-bf-open"> <span class="panel-btn__inner">Фильтр</span> </button> <div class="catalog-top-params__main js-dropdown"> <button type="button" class="catalog-top-params__main-btn panel-btn js-dropdown__btn"> <svg class="panel-btn__icon panel-btn__icon--left svg-icon svg-icon--20"> <use xlink:href="#svg-icon-sort"></use> </svg> <span class="panel-btn__inner">Сортировка</span> <svg class="panel-btn__icon panel-btn__icon--right panel-btn__icon--dd-arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use> </svg> </button> <div class="catalog-top-params__params js-dropdown__body"> <div class="catalog-top-params__grid"> <div class="catalog-top-params__item catalog-top-params__item--shops"> </div> <div class="catalog-top-params__item catalog-top-params__item--sort" v-if="sortFilter"> <select-input :options="sortFilter.options" block lite size="sm" placeholder="Сортировка" v-model="sortFilter.value" @input="sortFilterUpdated"></select-input> </div> <div class="catalog-top-params__item catalog-top-params__item--view" v-if="viewModes.length > 1"> <div class="radio-toggle-group"> <label class="radio-toggle-group__item radio-toggle" v-for="viewMode in viewModes"> <input type="radio" class="radio-toggle__input" :value="viewMode" v-model="currentViewMode" @change="viewModeUpdated"> <span class="radio-toggle__visual btn btn--sq btn--sm"> <span class="btn__inner"> <svg class="radio-toggle__visual-icon svg-icon"> <use :xlink:href="\'#svg-icon-view-mode-\' + viewMode"></use> </svg> </span> </span> </label> </div> </div> </div> </div> </div> </div> </div> </div> </div> <section class="floor floor--closer flc text-guide" v-if="topText"> <div class="content-crop content-crop--md content-crop--decorated content-cropped" v-content-crop> <div class="content-crop-container js-v-content-crop-container" v-html="topText"></div> <div class="content-crop-action"> <button type="button" class="btn btn--sm content-crop-action__close js-v-content-crop-toggle"> <span class="btn__inner">Свернуть</span> </button> <button type="button" class="btn btn--sm content-crop-action__open js-v-content-crop-toggle"> <span class="btn__inner">Развернуть</span> </button> </div> </div> </section> <transition @enter="slideDown" @leave="slideUp"> <div class="active-filters-block flc" v-if="activeFilterOptions.length"> <div class="active-filters"> <div class="active-filters__group" v-for="filter in activeFilterOptions"> \x3c!--<span class="active-filters__group-name" v-if="filter.title && filter.type != \'boolean\'"> <span class="active-filters__group-name-txt">{{filter.title}}</span> </span>--\x3e <div class="active-filters__group-items"> <transition-group tag="div" name="content-scale" class="active-filters__group-items-grid"> <div class="active-filters__item" v-for="item in filter.options" :key="item.option.name || item.option.nameMin || item.option.nameMax"> \x3c!--btn btn&#45;&#45;sm--\x3e <button class="btn--filter btn--filter-remove" type="button" @click="unsetFilterOption(item.option);"> <span class="btn__inner">{{filter.type != \'boolean\' ? item.option.title || item.title : filter.title}}</span> <svg class="btn__icon btn__icon--right svg-icon svg-icon--10"> <use xlink:href="#svg-icon-close"></use> </svg> </button> </div> </transition-group> </div> </div> </div> </div> </transition> <transition name="content-fade" mode="out-in"> <catalog-grid key="grid" :products="products" v-if="products.length && currentViewMode == \'grid\'" :loading="loading"></catalog-grid> <catalog-price-ext key="price-ext" :products="products" v-else-if="products.length && currentViewMode == \'price-ext\'" :loading="loading" ></catalog-price-ext> <catalog-list key="list" :products="products" v-else-if="products.length && currentViewMode == \'list\'" :loading="loading"></catalog-list> <catalog-price key="price" :offers="offers" v-else-if="products.length && currentViewMode == \'price\'" :loading="loading" :columns="productTableColumns"></catalog-price> <div class="not-found-block not-found-block--inside" v-else> <div class="not-found-block__text text-guide"> Не найдено ни одного товара </div> <div class="not-found-block__action flc" v-if="filterIsSet || storeIsSet"> <button type="button" class="btn btn--red" @click="resetAllFilters"> <span class="btn__inner">Сбросить фильтр</span> </button> </div> </div> </transition> <page-nav v-if="pages.count > pages.limit" :loading="loading" :show-more="showPageNavMore" :show-pages="showPageNavPages" :show-prev-arrow="showPageNavPages" :show-next-arrow="showPageNavPages" :base-url="dataSource" :count="pages.count" :limit="pages.limit" :offset="pages.offset" @more="loadMore" @goto="goToPage"></page-nav> <section class="floor floor--closer flc text-guide" v-if="bottomText"> <div class="content-crop content-crop--md content-crop--decorated content-cropped" v-content-crop> <div class="content-crop-container js-v-content-crop-container" v-html="bottomText"></div> <div class="content-crop-action"> <button type="button" class="btn btn--sm content-crop-action__close js-v-content-crop-toggle"> <span class="btn__inner">Свернуть</span> </button> <button type="button" class="btn btn--sm content-crop-action__open js-v-content-crop-toggle"> <span class="btn__inner">Развернуть</span> </button> </div> </div> </section> </div> </div> </transition>',
        data: function () {
            return {
                products: [],
                filters: [],
                stores: [],
                sorts: [],
                pages: [],
                sections: [],
                currentViewMode: null,
                viewModes: ["price-ext", "grid"],
                currentPage: 1,
                incompare: 1,
                topParamsOpen: !1,
                topText: null,
                bottomText: null,
                initialStateLoaded: !1,
                filtersSubmitTimeout: null,
                filterIsSet: !1,
                storeIsSet: !1,
                waitingFilterName: null,
                waitingForFilter: !1,
                currentUrl: window.location,
                loading: !1,
                removedProductsCount: 0,
                banner: {link: null, image: null}
            }
        },
        props: {
            title_custom: {default: null},
            showAside: {default: 1},
            dataSource: {default: null},
            staticDataSource: {default: null},
            bxajaxid: {default: null},
            favList: {default: !1},
            showPageNavMore: {type: Boolean, default: !0},
            showPageNavPages: {type: Boolean, default: !0}
        },
        computed: {
            shopFilter: function () {
                return this.stores && this.stores[0] || null
            }, sortFilter: function () {
                return this.sorts && this.sorts[0] || null
            }, activeFilterOptions: function () {
                var e = [], o = [];
                return _.each(this.filters, function (i) {
                    o = [], _.each(i.options, function (e) {
                        if (("range" == i.type || "slider" == i.type) && (void 0 !== e.valueMin && void 0 !== e.min && e.valueMin != e.min || void 0 !== e.valueMax && void 0 !== e.max && e.valueMax != e.max || void 0 !== e.value && void 0 !== e.max && e.value != e.max)) {
                            var t = i.title;
                            void 0 !== e.valueMin && (t += " " + (e.prefixMin || "") + " " + (e.price ? s.formatPrice(e.valueMin) : s.formatFloat(e.valueMin)) + " " + (e.postfixMin || "")), void 0 !== e.valueMax && (t += " " + (e.prefixMax || "") + " " + (e.price ? s.formatPrice(e.valueMax) : s.formatFloat(e.valueMax)) + " " + (e.postfixMax || "")), void 0 !== e.value && (t += " " + (e.prefixMin || "") + " " + (e.price ? s.formatPrice(e.value) : s.formatFloat(e.value)) + " " + (e.postfixMin || "")), o.push({
                                title: t,
                                option: e
                            })
                        }
                        "checkbox" != i.type && "checkbox-img" != i.type && "radio" != i.type && "color" != i.type && "boolean" != i.type || e.checked && o.push({
                            title: i.title,
                            option: e
                        })
                    }), o.length && e.push({title: i.title, type: i.type, options: o})
                }), e
            }
        },
        methods: {
            slideDown: function (e, t) {
                var i = $(e), o = Math.min(2.5 * i.outerHeight(), 300);
                i.hide().slideDown(o, t)
            }, slideUp: function (e, t) {
                var i = $(e);
                i.show().slideUp(Math.min(2.5 * i.outerHeight(), 300), t)
            }, loadMore: function () {
                var e = this;
                e.reloadProducts(this.currentUrl, {
                    bxajaxid: e.bxajaxid,
                    offset: e.pages.offset + e.pages.limit,
                    limit: e.pages.limit,
                    viewMode: e.currentViewMode
                }, {append: !0}), e.pages.offset += e.pages.limit
            }, goToPage: function (e) {
                var t = this;
                console.log("goin to page", e), t.reloadProducts(this.currentUrl, {
                    bxajaxid: t.bxajaxid,
                    offset: (e - 1) * t.pages.limit,
                    limit: t.pages.limit,
                    viewMode: t.currentViewMode
                }), t.pages.offset = (e - 1) * t.pages.limit
            }, toggleTopParams: function () {
                this.topParamsOpen = !this.topParamsOpen
            }, shopFilterUpdated: function () {
                var e = this;
                e.reloadProducts(e.currentUrl, {
                    bxajaxid: e.bxajaxid,
                    stores: e.stores,
                    viewMode: e.currentViewMode
                }), e.storeIsSet = 0 != e.shopFilter.value
            }, sortFilterUpdated: function () {
                var e = this, t = _.findWhere(e.sortFilter.options, {value: e.sortFilter.value});
                t && (t = t.link, e.currentUrl = t, e.reloadProducts(t, {
                    bxajaxid: e.bxajaxid,
                    filters: e.filters,
                    viewMode: e.currentViewMode
                }))
            }, filtersUpdated: function (e, t, i) {
                var o = this;

                function s() {
                    o.waitingForFilter = !0, o.reloadProducts(o.dataSource, {
                        bxajaxid: o.bxajaxid,
                        filters: o.filters,
                        viewMode: o.currentViewMode
                    }, {
                        callback: function () {
                            o.waitingFilterName = null, o.waitingForFilter = !1
                        }
                    })
                }

                this.filterIsSet = i, clearTimeout(this.filtersSubmitTimeout), o.waitingFilterName && o.waitingFilterName != t ? s() : this.filtersSubmitTimeout = setTimeout(s, 1250), o.waitingFilterName = t
            }, viewModeUpdated: function () {
                this.reloadProducts(this.dataSource, {bxajaxid: this.bxajaxid, viewMode: this.currentViewMode})
            }, sectionUpdated: function (e) {
                this.currentUrl = e, this.reloadProducts(this.currentUrl, {bxajaxid: this.bxajaxid})
            }, reloadProducts: function (e, t, i) {
                var o = this;
                o.loading = !0, $.post({url: e, data: t, dataType: "json"}).done(function (e) {
                    if (console.log("catalog list main reloadProducts success", e), o.filters = e.filters, o.shops = e.shops, o.sorts = e.sorts, o.sections = e.sections, o.pages = e.pages, o.pages.offset = parseInt(o.pages.offset), o.pages.limit = parseInt(o.pages.limit), o.pages.count = parseInt(o.pages.count), o.removedProductsCount = 0, i && i.append) o.products.push.apply(o.products, e.products); else {
                        o.products = e.products;
                        var t = $(o.$el).find(".catalog-top-params, .catalog-list").first();
                        t.length && $("html, body").animate({scrollTop: window.innerWidth >= View.breakpoints["sm-min"] ? t.offset().top - 30 : 0}, 500)
                    }
                    e.dataSourceHistory ? o.currentUrl = e.dataSourceHistory : e.dataSource && (o.currentUrl = e.dataSource, o.dataSource = e.dataSource, o.pages.offset && (o.currentUrl += "?offset=" + o.pages.offset + "&limit=" + o.pages.limit)), (e.dataSourceHistory || e.dataSource) && history.pushState({}, null, o.currentUrl), i && "function" == typeof i.callback && i.callback(), o.loading = !1, o.$refs.basicFilter.$emit("filterReloaded")
                }).fail(function (e) {
                    console.log("catalog list main reloadProducts failed", e), o.loading = !1
                })
            }, unsetFilterOption: function (e) {
                void 0 !== e.checked && (e.checked = !1), void 0 !== e.valueMax && "undefined" != e.max && (e.valueMax = e.max), void 0 !== e.valueMin && "undefined" != e.min && (e.valueMin = e.min), this.filtersUpdated()
            }, resetAllFilters: function () {
                this.shopFilter && (this.shopFilter.value = 0), this.$refs.basicFilter.$emit("resetRequired")
            }
        },
        mounted: function () {
            var i = this;
            i.staticDataSource && (i.products = i.staticDataSource.products || [], i.banner = i.staticDataSource.banner || [], i.filters = i.staticDataSource.filters || [], i.stores = i.staticDataSource.stores || [], i.sorts = i.staticDataSource.sorts || [], i.pages = i.staticDataSource.pages || {
                count: null,
                limit: null,
                offset: null
            }, i.pages.count = parseInt(i.pages.count), i.pages.limit = parseInt(i.pages.limit), i.pages.offset = parseInt(i.pages.offset), i.sections = i.staticDataSource.sections || [], i.currentPage = i.staticDataSource.currentPage || 1, i.topText = i.staticDataSource.topText || null, i.bottomText = i.staticDataSource.bottomText || null, i.currentViewMode = i.staticDataSource.currentViewMode || i.viewModes[0], i.initialStateLoaded = !0, i.storeIsSet = i.shopFilter && 0 != i.shopFilter.value), i.currentUrl = i.dataSource || window.location, i.favList && s.$on("favoritesUpdated", function () {
                var e = 0;
                _.each(i.products, function (t) {
                    t && (_.find(s.favorites.productIds, function (e) {
                        return e == t.productId
                    }) ? e++ : (i.products.splice(e, 1), i.removedProductsCount++))
                })
            })
        }
    })
}), define("vue!catalog-list/component", ["Model", "vue!product-detailed/component"], function (e) {
    Vue.component("catalog-list", {
        template: '<div class="catalog-list"> \x3c!--div class="preloader-bar" :class="{\'active\': loading}"></div--\x3e <transition-group tag="div" class="catalog-list__grid grid" mode="out-in" name="content-scale"> <div class="catalog-list__item col" v-for="product in products" :key="product.productId"> <product-detailed :product="product" :columns="product.columns" :productId="product.productId" :offerId="product.offerId" :offers="product.offers" ></product-detailed> </div> </transition-group> </div>',
        props: {products: {default: null}, loading: {default: null}, columns: {default: null}}
    })
}), define("vue!catalog-price/component", ["Model", "vue!product-table/component", "vue!product-table-row/component"], function (e) {
    Vue.component("catalog-price", {
        template: '<div class="catalog-price"> <product-table :columns="columns" v-if="columns"> <product-table-row v-for="offer in offers" :key="offer.offerId" slot="row" :columns="columns" :productId="offer.productId" :offerId="offer.offerId" :product="offer"> </product-table-row> </product-table> </div>',
        data: function () {
            return {currentOfferId: 0}
        },
        props: {columns: {default: null}, offers: {default: null}, loading: {default: null}}
    })
}), define("vue!yandex-map/component", ["Model"], function (e) {
    Vue.component("yandex-map", {
        template: '<div class="ymap-container"> <div :id="ymapId" :style="{ width: \'100%\', height: \'100%\' }"></div> <slot></slot> </div>',
        data: function () {
            return {ymapId: "yandexMap" + Math.round(1e5 * Math.random()), map: null, markers: []}
        },
        props: {
            coords: {
                type: Array, validator: function (e) {
                    return !e.filter(function (e) {
                        return isNaN(e)
                    }).length
                }, required: !0
            }, zoom: {
                validator: function (e) {
                    return !isNaN(e)
                }, default: 18
            }, adjustInitialBounds: {type: Boolean, default: !0}
        },
        computed: {
            coordinates: function () {
                return this.coords.map(function (e) {
                    return +e
                })
            }
        },
        watch: {
            coords: function (e, t) {
                this.map && this.map.setCenter(e)
            }
        },
        beforeCreate: function () {
            var e = this;
            if (!this.$ymapEventBus.scriptIsNotAttached) return !1;
            var t = document.createElement("SCRIPT");
            t.setAttribute("src", "https://api-maps.yandex.ru/2.1/?lang=ru_RU"), t.setAttribute("async", ""), t.setAttribute("defer", ""), document.body.appendChild(t), this.$ymapEventBus.scriptIsNotAttached = !1, t.onload = function () {
                e.$ymapEventBus.ymapReady = !0, e.$ymapEventBus.$emit("scriptIsLoaded")
            }
        },
        created: function () {
            var n = this;

            function e() {
                n.map = new ymaps.Map(n.ymapId, {
                    center: n.coordinates,
                    zoom: +n.zoom,
                    controls: ["fullscreenControl", "geolocationControl", "zoomControl"]
                }), n.map.behaviors.disable("scrollZoom"), View && View.mobileAndTabletCheck && n.map.behaviors.disable("drag"), t(), n.adjustInitialBounds && n.map.setBounds(n.map.geoObjects.getBounds(), {checkZoomRange: !0}).then(function () {
                    16 < n.map.getZoom() && n.map.setZoom(16)
                })
            }

            function t() {
                n.map.geoObjects.removeAll(), n.markers.splice(0, n.markers.length);
                for (var e = n.$slots.default ? n.$slots.default.map(function (e) {
                    var t = e.componentOptions && e.componentOptions.propsData;
                    if (t) return {
                        markerType: t.markerType,
                        coords: function t(e) {
                            return e.map(function (e) {
                                return Array.isArray(e) ? t(e) : +e
                            })
                        }(t.coords),
                        hintContent: t.hintContent,
                        icon: t.icon,
                        balloon: t.balloon,
                        markerStroke: t.markerStroke,
                        markerFill: t.markerFill,
                        circleRadius: +t.circleRadius
                    }
                }).filter(function (e) {
                    return e && e.markerType
                }) : [], t = 0; t < e.length; t++) {
                    var i = l(e[t].markerType), o = {
                        hintContent: e[t].hintContent,
                        balloonContentHeader: e[t].balloon && e[t].balloon.header,
                        balloonContentBody: e[t].balloon && e[t].balloon.body,
                        balloonContentFooter: e[t].balloon && e[t].balloon.footer,
                        iconContent: e[t].icon && e[t].icon.content
                    }, s = {
                        iconLayout: "default#image",
                        iconImageHref: "/local/images/map-marker.png",
                        iconImageSize: [45, 51],
                        iconImageOffset: [-17, -50],
                        strokeColor: e[t].markerStroke && e[t].markerStroke.color || "0066ffff",
                        strokeOpacity: e[t].markerStroke && e[t].markerStroke.opacity || 1,
                        strokeStyle: e[t].markerStroke && e[t].markerStroke.style,
                        strokeWidth: e[t].markerStroke && e[t].markerStroke.width || 1,
                        fill: e[t].markerFill && e[t].markerFill.enabled || !0,
                        fillColor: e[t].markerFill && e[t].markerFill.color || "0066ff99",
                        fillOpacity: e[t].markerFill && e[t].markerFill.opacity || 1
                    };
                    "Circle" === i && (e[t].coords = [e[t].coords, e[t].circleRadius]);
                    var a = new ymaps[i](e[t].coords, o, s);
                    n.map.geoObjects.add(a), n.markers.push(a)
                }
            }

            function l(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }

            $(document).ready(function () {
                n.$ymapEventBus.ymapReady ? ymaps.ready(e.bind(n)) : n.$ymapEventBus.$on("scriptIsLoaded", function () {
                    ymaps.ready(e.bind(n))
                })
            }), n.$on("adjustBounds", function () {
                n.map && (t(), n.map.setBounds(n.map.geoObjects.getBounds(), {checkZoomRange: !0}).then(function () {
                    16 < n.map.getZoom() && n.map.setZoom(16), console.log(n.map.getZoom())
                }))
            }), n.$on("openBalloon", function (e) {
                n.markers && n.markers[e].balloon.open()
            })
        }
    })
}), define("vue!yandex-map-marker/component", ["Model"], function (e) {
    Vue.component("yandex-map-marker", {
        props: {
            coords: {type: Array, required: !0},
            hintContent: {type: String},
            icon: {type: Object},
            balloon: {type: Object},
            markerType: {type: String, required: !0},
            markerFill: {type: Object},
            markerStroke: {type: Object},
            circleRadius: {
                validator: function (e) {
                    return !isNaN(e)
                }, default: 1e3
            }
        }, render: function () {
        }
    })
}), define("vue!shop-list/component", ["Model", "vue!rich-text-input/component", "vue!yandex-map/component", "vue!yandex-map-marker/component"], function (e) {
    Vue.component("shop-list", {
        template: '<div class="shop-list"> <div class="shop-list__filter flc"> <div class="shop-list__filter-grid default-grid grid"> <div class="shop-list__filter-item default-grid__item col col-lg-8 col-3xs-12"> <rich-text-input type="select" :options="shopCitiesAsOptions" v-model="currentCityId" label="Город" @input="selectCityChange"></rich-text-input> </div> <div class="shop-list__filter-item default-grid__item col col-lg-4 col-3xs-12"> <rich-text-input type="select" :options="views" v-model="currentView" label="Показать"></rich-text-input> </div> </div> </div> <transition name="content-fade" mode="out-in"> <div class="shop-list__list flc" v-if="currentView == \'list\'"> <div class="shop-list__li" v-for="shop in shops" v-if="shop.city.id == currentCityId"> <div class="shop-li"> <div class="shop-li__top"> <div class="shop-li__top-start"> <span class="shop-li__top-start-icon"> <svg class="svg-icon svg-icon--20"> <use xlink:href="#svg-icon-location"></use> </svg> </span> <span class="shop-li__top-start-txt"> {{shop.name}} </span> </div> <div class="shop-li__top-ruler"></div> <div class="shop-li__top-end"> <div :class="{\'avail-marker\': shop.quantity != 0 , \'avail-marker--1\' : shop.quantity == 1, \'avail-marker--2\' : (shop.quantity >= 2 && shop.quantity<5), \'avail-marker--3\' : shop.quantity >= 5}"> <span class="avail-marker__marker"> <span class="avail-marker__bar"></span> <span class="avail-marker__bar"></span> <span class="avail-marker__bar"></span> </span> <span class="avail-marker__text">{{ shop.quantity == 0 ? \'Не в наличии\' : \'В наличии\' }}</span> </div> </div> </div> <div class="shop-li__addr flc">{{shop.address}}</div> <div class="shop-li__time flc"><span v-for="workTime in shop.work">{{workTime}}<br></span></div> \x3c!--div class="shop-li__time flc"><span v-for="phone in shop.phones">{{phone}}<br></span></div--\x3e </div> </div> </div> <div class="shop-list__map" v-if="currentView == \'map\'"> <yandex-map :coords="mapCoords" adjust-initial-bounds ref="map"> <yandex-map-marker marker-type="placemark" :coords="shop.point" :hint-content="shop.name" :balloon="getShopBalloon(shop)" :icon="{color: \'green\', glyph: \'cinema\'}" :key="shop.id" v-for="shop in shops" v-if="shop.city.id == currentCityId && shop.quantity > 0"></yandex-map-marker> </yandex-map> </div> </transition> </div>',
        data: function () {
            return {
                shops: [],
                currentCityId: null,
                mapCoords: [53.895597404038, 27.547904753793],
                activeShopId: null,
                currentView: "list",
                views: [{text: "Списком", value: "list"}, {text: "На карте", value: "map"}]
            }
        },
        computed: {
            shopCitiesAsOptions: function () {
                var t = [];
                return _.each(this.shops, function (e) {
                    _.findWhere(t, {value: e.city.id}) || t.push({
                        text: e.city.name,
                        value: e.city.id,
                        selected: e.city.current
                    })
                }), t
            }
        },
        props: {staticDataSource: {default: null}},
        methods: {
            selectCityChange: function () {
                var e = this;
                Vue.nextTick(function () {
                    e.$refs.map && e.$refs.map.$emit("adjustBounds")
                })
            }, getAvailMarker: function (e) {
                return '<div class="avail-marker avail-marker--' + Math.min(e.quantity, 1) + '"><span class="avail-marker__marker"><span class="avail-marker__bar"></span><span class="avail-marker__bar"></span><span class="avail-marker__bar"></span></span><span class="avail-marker__text">' + (0 == e.quantity ? "Не в наличии" : "В наличии") + "</span></div>"
            }, getShopBalloon: function (e) {
                return {
                    header: e.name,
                    body: '<p style="margin: 8px 0">' + e.address + "</p>" + this.getAvailMarker(e),
                    footer: e.work.join("<br>") + "<br>" + e.phones.join("<br>")
                }
            }
        },
        created: function () {
            var t = this;
            t.staticDataSource && (t.shops = t.staticDataSource.shops, console.log("shop list full", t.shops), _.each(t.shops, function (e) {
                t.currentCityId || (t.currentCityId = e.city.id), e.city.current && (t.currentCityId = e.city.id)
            }))
        }
    })
}), define("vue!shop-list-full/component", ["Model"], function (e) {
    Vue.component("shop-list-full", {
        template: '<div> <div class="catalog-top-params" v-if="!showOnlyMap"> <div class="catalog-top-params__filter"> <button type="button" class="panel-btn js-open-catalog-filter"> <svg class="panel-btn__icon panel-btn__icon--left svg-icon svg-icon--20"> <use xlink:href="#svg-icon-filter"></use> </svg> <span class="panel-btn__inner">Меню</span> </button> </div> <div class="catalog-top-params__main js-dropdown"> <button type="button" class="catalog-top-params__main-btn panel-btn js-dropdown__btn"> <svg class="panel-btn__icon panel-btn__icon--left svg-icon svg-icon--20"> <use xlink:href="#svg-icon-sort"></use> </svg> <span class="panel-btn__inner">Город</span> <svg class="panel-btn__icon panel-btn__icon--right panel-btn__icon--dd-arrow svg-icon svg-icon--dd-arrow"> <use xlink:href="#svg-icon-dd-arrow"></use> </svg> </button> <div class="catalog-top-params__params js-dropdown__body"> <div class="catalog-top-params__grid"> <div class="catalog-top-params__item catalog-top-params__item--shops"> <select-input :options="shopCitiesAsOptions" v-model="currentCityId" block lite size="sm" placeholder="Выберите город" @input="selectCityChange"></select-input> </div> </div> </div> </div> </div> <div class="large-map flc"> <yandex-map :coords="mapCoords" adjust-initial-bounds ref="map"> <yandex-map-marker v-if="shop.phones" marker-type="placemark" :coords="shop.point" :hint-content="shop.name" :balloon="{header: shop.name, body: shop.address, footer: shop.work.join(\'<br>\')+\'<br>\'+shop.phones.join(\'<br>\') }" :icon="{color: \'green\', glyph: \'cinema\'}" :key="shop.id" v-for="shop in shops" v-if="shop.city.id == currentCityId"></yandex-map-marker> <yandex-map-marker v-else marker-type="placemark" :coords="shop.point" :hint-content="shop.name" :balloon="{header: shop.name, body: shop.address, footer: shop.work.join(\'<br>\')+\'<br>\'+shop.phones.join(\'<br>\') }" :icon="{color: \'green\', glyph: \'cinema\'}" :key="shop.id" v-for="shop in shops" v-if="shop.city.id == currentCityId"></yandex-map-marker> </yandex-map> </div> <div class="full-shop-list flc" v-if="!showOnlyMap"> <div class="full-shop-list__item" v-for="(shop, index) in shops" v-if="shop.city.id == currentCityId"> <div class="full-shop-li full-shop-li--reflex" @click="setActiveShop(shop, index); scrollToMap();"> <div class="full-shop-li__cell-img"> <div class="full-shop-li__img"></div> <div class="img-stack img-stack--reflex" v-if="shop.image" @click.stop="openImageGallery(shop)"> <div class="img-stack__item" :style="{\'background-image\': \'url(\' + shop.image + \')\'}" ></div> <div class="img-stack__item img-stack__item--ph"></div> <div class="img-stack__item img-stack__item--ph"></div> <svg class="img-stack__icon svg-icon"><use xlink:href="#svg-icon-plus-big"></use></svg> </div> </div> <div class="full-shop-li__cell-main"> <div class="full-shop-li__top"> <span class="full-shop-li__top-icon"> <svg class="svg-icon svg-icon--20"><use xlink:href="#svg-icon-location"></use></svg> </span> <span class="full-shop-li__top-txt">{{shop.name}}</span> </div> <div class="full-shop-li__addr">{{shop.address}}</div> </div> <div class="full-shop-li__cell-time"><span v-for="workTime in shop.work">{{workTime}}<br></span></div> <div class="full-shop-li__cell-tel"><span v-for="phone in shop.phones" v-if="typeof phone == \'string\'"><a :href="\'tel:\' + formatPhone(phone)">{{phone}}</a><br></span></div> </div> </div> </div> </div>',
        data: function () {
            return {shops: [], currentCityId: null, mapCoords: [53.895597404038, 27.547904753793], activeShopId: null}
        },
        computed: {
            shopCitiesAsOptions: function () {
                var t = [];
                return _.each(this.shops, function (e) {
                    _.findWhere(t, {value: e.city.id}) || t.push({
                        text: e.city.name,
                        value: e.city.id,
                        selected: e.city.current
                    })
                }), t
            }
        },
        props: {showOnlyMap: {default: !1}, staticDataSource: {default: null}},
        created: function () {
            var t = this, i = null, o = null;
            t.staticDataSource && (t.shops = t.staticDataSource.shops, 0 == window.location.hash.indexOf("#city-") && (i = window.location.hash.split("#city-")[1]), _.each(t.shops, function (e) {
                t.currentCityId || (t.currentCityId = e.city.id), e.city.current && (t.currentCityId = e.city.id), i && i == e.city.id && (o = !0)
            }), o && (t.currentCityId = i))
        },
        methods: {
            selectCityChange: function () {
                var e = this;
                Vue.nextTick(function () {
                    e.$refs.map && e.$refs.map.$emit("adjustBounds")
                }), window.location.hash = "city-" + e.currentCityId
            }, setActiveShop: function (e, t) {
                var i = this;
                this.mapCoords = e.point, this.activeShopId = e.id, Vue.nextTick(function () {
                    i.$refs.map && (i.$refs.map.$emit("adjustBounds"), i.$refs.map.$emit("openBalloon", t))
                })
            }, openImageGallery: function (e) {
                View.control.openImageGallery({
                    showPreviews: !0, images: _.map(e.images, function (e) {
                        return {src: e}
                    })
                })
            }, scrollToMap: function () {
                $("html, body").animate({scrollTop: $(this.$refs.map.$el).offset().top - 20}, 300)
            }, formatPhone: function (e) {
                return e.replace(/-|\s/g, "")
            }
        }
    })
}), define("vue!modal/component", ["Model"], function (e) {
    Vue.component("modal", {
        template: '<div class="modal js-modal"> <button tyle="button" class="modal__close" @click="close"> <svg class="svg-icon"><use xlink:href="#svg-icon-close-big"></use></svg> </button> <slot name="header"> <transition name="content-fade" mode="out-in"> <div class="modal__header" v-if="currentTitle" :key="currentTitle"> <h2 class="h1 modal__title">{{currentTitle}}</h2> </div> </transition> </slot> <slot name="content"></slot> <slot name="footer"></slot> </div>',
        data: function () {
            return {currentTitle: null}
        },
        props: ["title"],
        methods: {
            close: function () {
                console.log("modal closed"), View.control.closeModal()
            }
        },
        created: function () {
            var t = this;
            this.currentTitle = this.title, e.$on("modalTitleChange", function (e) {
                t.currentTitle = e
            })
        }
    })
}), define("vue!small-countdown/component", ["Model"], function (e) {
    Vue.component("small-countdown", {
        template: '<span class="small-countdown" v-if="localTime > 0">{{localTime | formatTime}}</span> <span class="small-countdown" v-else>{{endText}}</span>',
        data: function () {
            return {localTime: null, localEndTime: null, clockInterval: null}
        },
        props: {endTime: {default: null}, endText: {default: "0:0:0:0"}},
        methods: {
            updLocalTime: function () {
                this.localTime = new Date(this.localEndTime - Date.now())
            }
        },
        filters: {
            formatTime: function (e) {
                if (!e) return 0;
                var t = e.getHours(), i = e.getMinutes(), o = e.getSeconds();
                return t < 10 && (t = "0" + t), i < 10 && (i = "0" + i), o < 10 && (o = "0" + o), Math.floor(e / 864e5) + ":" + t + ":" + i + ":" + o
            }
        },
        mounted: function () {
            var e = this;
            e.localEndTime = Date.parse(e.endTime), e.localEndTime && (e.updLocalTime(), e.clockInterval = setInterval(e.updLocalTime, 1e3))
        },
        destroyed: function () {
            clearInterval(this.clockInterval)
        }
    })
}), define("vue!present-grid/component", ["Model", "vue!product/component"], function (o) {
    Vue.component("present-grid", {
        template: '<div class="catalog-grid"> \x3c!--div class="preloader-bar" :class="{\'active\': loading}"></div--\x3e <div class="catalog-grid__item col" v-for="product in products" :key="product.productId"> <product :product="product" :not-follow-link="true" :show-rating="false" :show-buy-button="false" :show-fav-button="false" :show-quick-view="false"> <div class="product__action flc" slot="button"> <button type="button" class="btn btn--lg" @click="addPresent(product)" :disabled="!maxPresentCount || inBasketProduct(product)"><span class="btn__inner">{{inBasketProduct(product)?"В корзине":"Добавить"}}</span></button> </div> </product> </div> </div>',
        data: function () {
            return {maxPresentCount: 0, products: {}, inbasket: o.basket.presentsProduct}
        },
        props: {staticDataSource: {default: null}},
        methods: {
            inBasketProduct: function (e) {
                return _.findWhere(this.inbasket, {offerId: e.offerId})
            }, addPresent: function (e) {
                var t = this;
                if (t.maxPresentCount && !t.inBasketProduct(e)) {
                    var i = {BASKET_ADD: e.offerId, COUNT: 1, bxajaxid: o.basket.bxajaxid, IS_PRESENT: 1};
                    $.post({url: "/order/", data: i, dataType: "json"}).done(function (e) {
                        t.maxPresentCount = e.presents.avalable, o.updateBasket(e.products), o.updatePresent(e.presentsProduct, e.presents)
                    }).fail(function (e) {
                        console.warn("Model.addToBasket failed:", e)
                    })
                }
            }
        },
        created: function () {
            var e = this;
            console.log(e.staticDataSource), e.maxPresentCount = e.staticDataSource.maxPresentCount, e.products = e.staticDataSource.products, o.$on("basketPresentUpdated", function () {
                e.inbasket = o.basket.presentsProduct
            })
        }
    })
}), define("vue!order-history/component", ["Model", "vue!product/component", "vue!page-nav/component"], function (i) {
    Vue.component("order-history", {
        template: '<div> <div v-for="(orderData, orderIndex) in orders" class="floor floor--slider-products flc"> <transition name="content-fade" mode="out-in"> <div class="checkout-main" > <div class="form-w-steps"> <section class="product-detailed"> <header class="form-step__header step-header" > <div class="step-header__cell-title"> <h3 class="product-detailed__name"><span href="/49748-91090-p" class="product-detailed__name-link">Заказ №{{orderData.order.id}}&nbsp;от&nbsp;{{orderData.order.date}}</span></h3> <div class="product-detailed__params"> <div class="product-detailed__param" v-if="orderData.order.delivery && orderData.order.delivery.name"> <span class="product-detailed__param-name"><b>Доставка:</b> </span><span class="product-detailed__param-value"> {{orderData.order.delivery.name}}</span> </div> <div class="product-detailed__param" v-if="orderData.order.deliveryPrice"> <span class="product-detailed__param-name"><b>Цена доставки:</b> </span><span class="product-detailed__param-value"> {{orderData.order.deliveryPrice |formatPrice}} руб.</span> </div> <div class="product-detailed__param" v-if="orderData.order.status && orderData.order.status.name"> <span class="product-detailed__param-name"><b>Статус заказа:</b> </span><span class="product-detailed__param-value"> {{orderData.order.status.name}}</span> </div> <div class="product-detailed__param" v-if="orderData.order.payment && orderData.order.payment.name"> <span class="product-detailed__param-name"><b>Оплата:</b> </span><span class="product-detailed__param-value"> {{orderData.order.payment.name}}</span> </div> <div class="product-detailed__param" v-if="orderData.order.payment && orderData.order.payment.name"> <span class="product-detailed__param-name"><b>Сумма заказа:</b> </span><span class="product-detailed__param-value"> {{orderData.order.basketPriceWithDelivery |formatPrice}} руб.</span> </div> </div> </div> <transition name="content-fade"> <div class="step-header__cell-action"> <button type="button" class="btn btn--sm" @click="repeatOrder(orderIndex)" v-if="current == orderData.order.id && orderData.products.length"><span class="btn__inner">Повторить</span></button>&nbsp; <button type="button" class="btn btn--sm" @click="toggleOpen(orderIndex)" v-if="current == orderData.order.id"><span class="btn__inner">Свернуть</span></button> <button type="button" class="btn btn--sm" @click="toggleOpen(orderIndex)" v-if="current != orderData.order.id && orderData.order.statusID!=\'C\'"><span class="btn__inner">Детали заказа</span></button> </div> </transition> </header> <transition-group tag="div" @enter="stepBodyEnterAnimation" @leave="stepBodyLeaveAnimation" mode="out-in"> <div class="form-card--w-arrow flc" key="openContent" v-if="current == orderData.order.id && orderData.products.length"> <transition name="content-fade"> <div> <p></p><hr class="floor-separator"/><p></p> <div class="grid" v-if="orderData.order.files && orderData.order.files.length"> <div class="col col-lg-4 col-md-6 col-sm-4 col-xs-6 col-2xs-12" v-for="file in orderData.order.files"> <a :href="file.link" class="block-banner-w-text block-banner-w-text--sm" target="_blank" download v-if="file.ext != \'pdf\'"> <h4 class="block-banner-w-text__title flc"> <span class="block-banner-w-text__title-txt">{{file.name}}</span> </h4> <div class="block-banner-w-text__text flc">Файл, {{file.ext}} {{file.size}}</div> </a> <a :href="file.link" class="block-banner-w-text block-banner-w-text--sm" target="_blank" v-else="file.ext != \'pdf\'"> <h4 class="block-banner-w-text__title flc"> <span class="block-banner-w-text__title-txt">{{file.name}}</span> </h4> <div class="block-banner-w-text__text flc">Файл, {{file.ext}} {{file.size}}</div> </a> </div> </div> <div v-if="orderData.order.files && orderData.order.files.length"> <p></p><hr class="floor-separator"/><p></p> </div> <div class="offers-list__item" v-for="productData in orderData.products"> <product :product="productData" :showCode="true" :list-item="true" :bind-basket-count="true" :list-item-lg="true" :basket-mode="true"></product> </div> </div> </transition> </div> </transition-group> </section> </div> </div> </transition> </div> <page-nav v-if="pages.count > pages.limit" :show-more="false" :show-pages="true" :show-prev-arrow="true" :show-next-arrow="true" :base-url="baseUrl" :count="pages.count" :limit="pages.limit" :offset="pages.offset" @more="loadMore" @goto="goToPage"></page-nav> </div>',
        data: function () {
            return {loading: !1, current: 0, orders: {}, pages: {}, baseUrl: ""}
        },
        props: {staticDataSource: {default: null}, bxajaxid: {default: null}},
        methods: {
            loadMore: function () {
                var e = this;
                e.reloadPages({
                    bxajaxid: e.bxajaxid,
                    offset: e.pages.offset + e.pages.limit,
                    limit: e.pages.limit
                }, {append: !0}), e.pages.offset += e.pages.limit
            }, goToPage: function (e) {
                var t = this;
                console.log("goin to page", e), t.reloadPages({
                    bxajaxid: t.bxajaxid,
                    offset: (e - 1) * t.pages.limit,
                    limit: t.pages.limit
                }), t.pages.offset = (e - 1) * t.pages.limit
            }, reloadPages: function (e, t) {
                var i = this;
                $.post({url: i.baseUrl, data: e, dataType: "json"}).done(function (e) {
                    t && t.append ? i.orders.push.apply(i.orders, e.orders) : (i.orders = e.orders, i.initialized && $("html, body").animate({scrollTop: $(i.$el).offset().top - 30}, 500)), i.pages = e.pages, i.pages.offset = parseInt(i.pages.offset), i.pages.limit = parseInt(i.pages.limit), i.pages.count = parseInt(i.pages.count)
                }).fail(function (e) {
                    console.log("catalog list main reloadPages failed", e)
                })
            }, repeatOrder: function (e) {
                var t = this;
                t.orders[e].products.length && (i.repeatOrder(1, t.orders[e].products), i.$on("basketUpdated", function () {
                    t.waiting = !1, window.location = "/order/"
                }))
            }, toggleOpen: function (t) {
                var i = this;
                i.orders[t].order.id == i.current ? i.current = 0 : (i.current = i.orders[t].order.id, i.orders[t].products.length || (i.loading = !0, $.post({
                    url: window.location.toString(),
                    data: {bxajaxid: i.bxajaxid, ORDER_ID: i.current},
                    dataType: "json"
                }).done(function (e) {
                    i.loading = !1, i.errors = i.staticDataSource.errors, i.orders[t].order.files = e.order.files, i.orders[t].products = e.products, i.orders[t].columns = e.columns
                }).fail(function (e) {
                    i.errors = "Ошибка выполнения запроса", i.loading = !1
                })))
            }, stepBodyEnterAnimation: function (e, t) {
                var i = $(e);
                i.delay(300).hide().css("opacity", 0).slideDown(300, function () {
                    i.find("input, textarea").first().focus(), i.animate({opacity: 1}, 300, t)
                })
            }, stepBodyLeaveAnimation: function (e, t) {
                var i = $(e);
                i.show().css("opacity", 1).animate({opacity: 0}, 300, function () {
                    i.show().slideUp(300, t)
                })
            }
        },
        filters: {formatPrice: i.formatPrice},
        mounted: function () {
            var e = this;
            e.staticDataSource && (e.pages = e.staticDataSource.pages, e.orders = e.staticDataSource.orders, e.baseUrl = e.staticDataSource.baseUrl)
        }
    })
}), define("vue!subscribe/component", ["app", "vue!product/component"], function (e) {
    Vue.component("subscribe", {
        data: function () {
            return {
                sendUrl: "/personal/subscribe/",
                bxajaxid: null,
                rubrics: [],
                productsQuantity: [],
                productsPrice: []
            }
        },
        template: '<div> <div class="product-detailed__offers" v-if="rubrics && rubrics.length" > <div class="product-table"> <div class="product-table__head"> <div class="product-table__th">Подписка</div> <div class="product-table__th"></div> </div> <div class="product-table__body"> <div class="product-table-row" v-for="(rubric, rubIndex) in rubrics"> <div data-title="Подписка" class="product-table-row__cell"> <div class="product-table-row__cell-in"> <p><strong>{{rubric.name}}</strong></p> <p v-html="rubric.description"></p> </div> </div> <div class="product-table-row__cell"> <div class="product-table-row__cell-in"> <span class="toggle-buttons toggle-buttons--profile js-toggle-open-one-group"> <button type="button" class="btn" :class="{\'btn--info\': !rubric.active}" @click="subscribeTogle(rubric)"><span class="btn__inner">{{rubric.active?\'Отписаться\':\'Подписаться\'}}</span></button> </span> </div> </div> </div> </div> </div> </div> <div class="catalog-list-main_container" v-if="productsQuantity && productsQuantity.length"> <div class="product-detailed__offers"> <div class="catalog-list-block"> <div class="container"> <div class="floor-header floor-header--separator"> <div class="floor-header__left floor-header__left--empty"> </div> <div class="floor-header__main"> <h2> Сообщить о появлении в наличии </h2> </div> <div class="floor-header__right floor-header__right--empty"> </div> </div> <transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-scale"> <div class="catalog-grid__item col" v-for="product in productsQuantity" :key="product.productId"> <product :product="product" :show-buy-button="false" :show-fav-button="false" :show-quick-view="false" :show-catalog-props-anyway="false"> <div class="product__action flc" slot="button"> <button type="button" class="btn" @click="productUnsubscribe(product)"><span class="btn__inner">{{product.active?\'Отписаться\':\'Активировать\'}}</span></button> </div> </product> \x3c!-- :delivery="product.delivery" --\x3e </div> </transition-group> </div> </div> </div> </div> <div class="catalog-list-main_container" v-if="productsPrice && productsPrice.length"> <div class="product-detailed__offers"> <div class="catalog-list-block"> <div class="container"> <div class="floor-header floor-header--separator"> <div class="floor-header__left floor-header__left--empty"> </div> <div class="floor-header__main"> <h2> Сообщить о изменении цены </h2> </div> <div class="floor-header__right floor-header__right--empty"> </div> </div> <transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-scale"> <div class="catalog-grid__item col" v-for="product in productsPrice" :key="product.productId"> <product :product="product" :show-buy-button="false" :show-fav-button="false" :show-quick-view="false" :show-catalog-props-anyway="false"> <div class="product__action flc" slot="button"> <button type="button" class="btn" @click="productUnsubscribe(product)"><span class="btn__inner">{{product.active?\'Отписаться\':\'Активировать\'}}</span></button> </div> </product> \x3c!-- :delivery="product.delivery" --\x3e </div> </transition-group> </div> </div> </div> </div> </div>',
        props: {staticData: {default: null}},
        created: function () {
            var e = this;
            console.log(e.staticData), e.staticData && e.staticData.bxajaxid && (e.bxajaxid = e.staticData.bxajaxid), e.staticData && e.staticData.sendUrl && (e.sendUrl = e.staticData.sendUrl), e.staticData && e.staticData.rubrics && (e.rubrics = e.staticData.rubrics), e.staticData && e.staticData.productsQuantity && (e.productsQuantity = e.staticData.productsQuantity), e.staticData && e.staticData.productsPrice && (e.productsPrice = e.staticData.productsPrice)
        },
        methods: {
            subscribeTogle: function (e) {
                e.active = !e.active;
                var i = {SUBSCRIBE_UPDATE: 1, SUBSCRIB_RUB_ID: []};
                $.each(this.rubrics, function (e, t) {
                    console.log(t), t.active && i.SUBSCRIB_RUB_ID.push(t.id)
                }), this.submit(i)
            }, productUnsubscribe: function (e) {
                var t = {};
                t.UNSUBSCRIBE = e.subscribeID, this.submit(t)
            }, submit: function (e) {
                var t = this;
                t.bxajaxid && (e.bxajaxid = t.bxajaxid), $.ajax({
                    type: "POST",
                    url: t.sendUrl,
                    dataType: "json",
                    data: e
                }).done(function (e) {
                    console.log("subscriprion response", e), (t.results = e) && e.rubrics ? t.rubrics = e.rubrics : t.rubrics = [], e && e.productsQuantity ? t.productsQuantity = e.productsQuantity : t.productsQuantity = [], e && e.productsPrice ? t.productsPrice = e.productsPrice : t.productsPrice = []
                }).fail(function (e) {
                    console.warn("subscription ajax fail: ", e)
                })
            }
        }
    })
}), define("vue!catalog-grid-expand/component", ["Model"], function (e) {
    Vue.component("catalog-grid-expand", {
        template: '<div class="catalog-grid-expand" :class="{\'catalog-grid-expand--last-step\': isLastStep}"> <div class="catalog-grid-expand__content"> <div class="catalog-grid"> \x3c!--div class="preloader-bar" :class="{\'active\': loading}"></div--\x3e <transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-fade"> <div class="catalog-grid__item col" v-for="product in productsLocal" :key="product.productId" :class="{\'catalog-grid__item--exp-hidden\': product.expHidden, \'catalog-grid__item--exp-part-hidden\': product.expPartHidden}"> <product :product="product" :show-rating="true" :show-buy-button="true" :show-fav-button="true" :show-quick-view="true" :show-catalog-props-anyway="true" :show-params="false"></product> \x3c!-- :delivery="product.delivery" --\x3e </div> </transition-group> </div> </div> <transition name="content-fade" mode="out-in"> <div class="catalog-grid-expand__action" v-if="multistep && !isLastStep"> <button type="button" class="btn btn--primary" @click="moar"> <span class="btn__inner">Показать еще</span> </button> </div> <div class="catalog-grid-expand__action" v-else-if="multistep"> <button type="button" class="btn" @click="less"> <span class="btn__inner">Свернуть</span> </button> </div> </transition> </div>',
        data: function () {
            return {step: null, productsLocal: null, isLastStep: !0, multistep: !1, instID: Math.random()}
        },
        props: {products: {default: null}, initialStep: {default: 1}},
        methods: {
            moar: function () {
                this.step++, this.recalc()
            }, less: function () {
                this.step = 1, this.recalc();
                var e = $(this.$el), t = e.closest(".floor");
                $("html, body").animate({scrollTop: (t.length ? t.offset().top : e.offset().top) + $(window).scrollTop() - 20}, 400)
            }, recalc: function () {
                for (var t, i = $(this.$el).find(".catalog-grid__item"), o = [], s = !1, a = this, e = 0; e < i.length; e++) a.productsLocal[e].expHidden = !1, a.productsLocal[e].expPartHidden = !1;
                Vue.nextTick(function () {
                    for (var e = 0; e < i.length; e++) t = i[e].getBoundingClientRect().top, o.indexOf(t) < 0 && o.push(t), o.length <= a.step ? (a.productsLocal[e].expHidden = !1, a.productsLocal[e].expPartHidden = !1) : (o.length == a.step + 1 ? (a.productsLocal[e].expHidden = !1, a.productsLocal[e].expPartHidden = !0) : (a.productsLocal[e].expHidden = !0, a.productsLocal[e].expPartHidden = !1), s = !0);
                    a.multistep = 1 < o.length, a.isLastStep = !s, a.$forceUpdate()
                }), a.$forceUpdate()
            }
        },
        mounted: function () {
            var e = this;
            e.step = e.initialStep, console.log("mount"), Vue.nextTick(function () {
                Vue.nextTick(function () {
                    e.recalc(), e.$forceUpdate(), Vue.nextTick(function () {
                        setTimeout(function () {
                            e.recalc(), e.$forceUpdate()
                        }, 300)
                    })
                })
            }), this.productsLocal = this.products;
            var t = null;
            $(window).off("resize.vueExpandableBlockRecalc" + this.instID).on("resize.vueExpandableBlockRecalc" + this.instID, function () {
                t || setTimeout(function () {
                    e.recalc(), t = null
                }, 100)
            })
        },
        beforeDestroyed: function () {
            $(window).off("resize.vueExpandableBlockRecalc" + this.instID)
        }
    })
}), define("vue!reviews-slider/component", ["Model"], function (e) {
    Vue.component("reviews-slider", {
        template: '<div class="reviews-slider flc" :class="{\'reviews-slider--alt\': appearance == \'alt\', \'reviews-slider--w-nav\': hasNavigation}"> <slick ref="mainSlider" class="reviews-slider__main-slider slick-default-arrows slick-default-dots" :options="{dots: true}" @afterChange="syncSliderAndNav"> <slot></slot> </slick> <slick class="reviews-slider__nav-slider slick-default-arrows" :options="previewsConfig" v-if="hasNavigation"> <div class="reviews-slider__nav-slide" v-for="(slide, index) in slides"> <div class="reviews-slider__nav-box" @click="setMainSlide(index)" :class="{active: currentSlide == index}"> <img :src="slide.componentOptions.propsData.navImage" :alt="slide.componentOptions.propsData.title"> </div> </div> </slick> </div>',
        data: function () {
            return {
                currentSlide: 0,
                previewsConfig: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    responsive: [{
                        breakpoint: 1100,
                        settings: {slidesToShow: 5, slidesToScroll: 5}
                    }, {
                        breakpoint: View.breakpoints["xs-max"],
                        settings: {slidesToShow: 5, slidesToScroll: 5, arrows: !1}
                    }, {
                        breakpoint: View.breakpoints["2xs-max"],
                        settings: {slidesToShow: 4, slidesToScroll: 4}
                    }, {breakpoint: View.breakpoints["3xs-max"], settings: {slidesToShow: 3, slidesToScroll: 3}}]
                }
            }
        },
        props: {appearance: {default: "default"}},
        computed: {
            hasNavigation: function () {
                return !!this.$slots.default && !!_.find(this.$slots.default, function (e) {
                    return e.componentOptions && e.componentOptions.propsData.navImage
                })
            }, slides: function () {
                return _.filter(this.$slots.default, function (e) {
                    return e.componentOptions && e.componentOptions.propsData
                })
            }
        },
        methods: {
            setMainSlide: function (e) {
                this.currentSlide = e, this.$refs.mainSlider.goTo(e)
            }, syncSliderAndNav: function (e, t, i) {
                this.currentSlide = i
            }
        }
    })
}), define("vue!reviews-slide/component", ["Model"], function (e) {
    Vue.component("reviews-slide", {
        template: '<div class="reviews-slide"> <div class="reviews-slide__review"> <div class="reviews-slide__header"> <div class="reviews-slide__title" v-if="title">{{title}}</div> <div class="reviews-slide__meta" v-if="meta">{{meta}}</div> </div> <div class="reviews-slide__body text-guide"> <slot name="review"></slot> </div> </div> <div class="reviews-slide__answer" v-if="$slots.answer"> <div class="reviews-slide__header"> <div class="reviews-slide__title">Ответ</div> </div> <div class="reviews-slide__body text-guide"> <slot name="answer"></slot> </div> </div> </div>',
        props: {title: {default: null}, meta: {default: null}, text: {default: null}, navImage: {default: null}}
    })
}), define("vue!accordion-group/component", ["Model"], function (e) {
    Vue.component("accordion-group", {
        template: '<div class="accordion-group"> <slot></slot> </div>',
        props: {multiple: {type: Boolean, default: !1}},
        methods: {
            toggle: function (t, e) {
                e && !this.multiple && _.each(this.$children, function (e) {
                    e != t && e.$emit("groupClose")
                })
            }
        },
        mounted: function () {
            var t = this;
            _.each(t.$children, function (e) {
                e.$on("toggle", t.toggle)
            })
        }
    })
}), define("vue!accordion-block/component", ["Model"], function (e) {
    Vue.component("accordion-block", {
        template: '<div class="accordion-block" :class="{open: open}"> <div class="accordion-block__bar" @click="toggle"> <div class="accordion-block__bar-icon"></div> <h3 class="accordion-block__title"><span :class="{\'bold\': small_title}">{{title}}</span><strong v-if="small_title">{{small_title}}</strong></h3> </div> <transition @enter="slideDown" @leave="slideUp" :css="false"> <div class="accordion-block__body" v-if="open"> <slot></slot> </div> </transition> </div>',
        data: function () {
            return {open: !1}
        },
        props: {
            title: {default: null},
            small_title: {default: null},
            initialOpen: {type: Boolean, default: !1},
            initialScroll: {default: !1}
        },
        methods: {
            slideDown: function (e, t) {
                var i = $(e);
                i.hide().addClass("sliding-down").removeClass("sliding-up").slideDown(300, function () {
                    i.removeClass("sliding-down"), t()
                })
            }, slideUp: function (e, t) {
                var i = $(e);
                i.show().addClass("sliding-up").removeClass("sliding-down").slideUp(300, function () {
                    i.removeClass("sliding-up"), t()
                })
            }, toggle: function () {
                this.open = !this.open, this.$emit("toggle", this, this.open)
            }
        },
        mounted: function () {
            this.open = this.initialOpen
        },
        created: function () {
            var e = this;
            this.$on("groupClose", function () {
                e.open = !1
            })
        }
    })
}), define("vue!cache-obj/cache-obj", ["Model", "app"], function (e, t) {
    Vue.component("cache-obj", {
        template: '<div> <slot name="cacheInner"></slot> </div>',
        data: function () {
            return {timerID: !1}
        },
        props: {cacheName: {default: ""}, cacheReset: {default: !1}, cacheKey: {default: ""}},
        methods: {
            sendGeneredContent: function (e, t, i, o) {
                var s = $(this.$el.outerHTML);
                $(".js-not-cache-content", s).each(function () {
                    $(this).remove()
                }), $(".js-load-hiden-content", s).each(function () {
                    $(this).removeClass("js-load-hiden-content")
                }), $.ajax({
                    type: "post",
                    url: window.location,
                    data: {
                        cacheContent: window.btoa(unescape(encodeURIComponent(s.html()))),
                        cachePath: this.$options._componentTag + "/" + this.cacheName,
                        cacheKey: this.cacheKey
                    },
                    dataType: "json"
                }).done(function (e) {
                }).fail(function (e) {
                    console.warn("fail save cache", e)
                })
            }
        },
        mounted: function () {
            var e = this;
            Vue.nextTick(function () {
                $(".js-load-hiden-content", e.$el).removeClass("js-load-hiden-content"), e.cacheReset && e.cacheName && e.cacheKey && (clearTimeout(e.timerID), e.timerID = setTimeout(function () {
                    e.sendGeneredContent()
                }, 1e3))
            })
        }
    })
}), define("vue!noindex/component", ["Model"], function (e) {
    Vue.component("noindex", {template: "<div> <slot></slot> </div>"})
}), Vue.directive("mask", {
    bind: function (e, t, i) {
        var o = View.inputmaskPresets[Object.keys(t.modifiers)[0]];
        if (o) $(e).inputmask(o); else if ("object" == typeof t.value) $(e).inputmask(t.value); else {
            if (!t.value) return;
            $(e).inputmask({mask: t.value, clearMaskOnLostFocus: !0, showMaskOnHover: !1})
        }
        $(e).off("keyup.vMaskUpdate").on("keyup.vMaskUpdate", function (e) {
            i.context.$emit("input", e.target.value)
        })
    }
}), Vue.directive("content-crop", {
    inserted: function (e, t) {
        var i = $(e), o = null, s = i.hasClass("content-cropped"), a = !1;

        function n() {
            a = 250 <= i.find(".js-v-content-crop-container")[0].scrollHeight, i.toggleClass("content-can-be-cropped", a), i.toggleClass("content-cant-be-cropped", !a)
        }

        e.dataset.directiveId = Math.round(1e6 * Math.random()), $(window).on("resize.vContentCrop" + e.dataset.directiveId, function () {
            clearTimeout(o), o = setTimeout(n, 200)
        }), n(), i.off("click.vContentCropToggle", ".js-v-content-crop-toggle").on("click.vContentCropToggle", ".js-v-content-crop-toggle", function () {
            i.find(".js-v-content-crop-container");
            s = !s, i.toggleClass("content-cropped", s)
        })
    }, unbind: function (e, t) {
        $(window).off("resize.vContentCrop" + e.dataset.directiveId)
    }
}), Vue.directive("lazy-img", {
    inserted: function (e, t) {
        e.classList.add("v-lazy-img-loading");
        var i = new Image;
        i.onload = function () {
            e.src = i.src, e.classList.remove("v-lazy-img-loading")
        }, i.src = t.value
    }, unbind: function (e, t) {
        $(window).off("resize.vContentCrop" + e.dataset.directiveId)
    }
}), Vue.directive("sticky", {
    inserted: function (e, t) {
        if (!View.isIOS && View.featureTest("position", ["-webkit-sticky", "sticky"])) {
            var i, o, s = $(window), a = e.parentNode, n = $(e), l = !1, r = 0, c = 0, d = 0, u = 0;
            s.on("scroll.vSticky", function () {
                requestAnimationFrame ? requestAnimationFrame(p) : p()
            })
        }

        function p() {
            e && a && (i = e.getBoundingClientRect(), o = a.getBoundingClientRect(), e.offsetHeight >= a.offsetHeight ? v() : (u = s.scrollTop(), c = u - d, e.offsetHeight <= window.innerHeight ? f() : 0 < o.top + (t.value || 0) ? m() : 0 < o.bottom - window.innerHeight + (t.value || 0) && (0 < r && c < 0 || r < 0 && 0 < c ? l || function () {
                if (n.removeClass("sticky-top sticky-bottom").addClass("sticky-stop").css("top", i.top - o.top).css("bottom", ""), e.offsetHeight >= a.offsetHeight) return v();
                !1, l = !0
            }() : l && (c < 0 && 0 < i.top - (t.value || 0) ? f() : 0 < c && i.bottom - window.innerHeight + (t.value || 0) < 0 && m())), d = u, r = c))
        }

        function v() {
            n.removeClass("sticky-top sticky-bottom sticky-stop").css("bottom", "").css("top", ""), l = !1
        }

        function f() {
            n.removeClass("sticky-bottom sticky-stop").addClass("sticky-top").css("bottom", "").css("top", t.value || 0), l = !1, !0
        }

        function m() {
            n.removeClass("sticky-top sticky-stop").addClass("sticky-bottom").css("top", "").css("bottom", t.value || 0), l = !1, !0
        }
    }
}), Vue.directive("video-modal", {
    inserted: function (e, t) {
        $(e).off("click.vueVideoModalDerective").on("click.vueVideoModalDerective", function () {
            View.control.openModalWithIframe(t.value)
        })
    }
}), Vue.prototype.$ymapEventBus = new Vue({
    data: {
        ymapReady: !1,
        scriptIsNotAttached: !0
    }
}), define("Model", [], function () {
    return new Vue({
        data: {
            authorized: !1,
            user: {name: null, login: null, email: null, password: null},
            basket: {
                increment: 0,
                bxajaxid: null,
                products: [],
                lastDeletedProductIds: [],
                lastAddedProductIds: [],
                lastAddedRelatedSource: null,
                bonusCurrentOrder: 0
            },
            favorites: {bxajaxid: null, productIds: [], enabled: !0},
            quickView: {enabled: !1},
            reviews: {enabled: !1},
            geolocation: {bxajaxid: null, city: {name: null, id: null, freeDeliveryPrice: 100.5, deliveryPrice: 2}},
            storeSelection: {enabled: !0}
        }, methods: {
            signUp: function (e) {
                this.authorized = !0, this.updateUser(e), this.$emit("signUp", this.user)
            }, signIn: function (e, t) {
                this.authorized = !0, this.updateUser(e), this.$emit(t ? "signInSilent" : "signIn", this.user)
            }, signOut: function () {
                this.authorized = !1, this.$emit("signOut", this.user)
            }, showRegisterModal: function () {
                View.control.openModalByUrl("/personal/user/register.php?AJAXMODE=Y")
            }, showRegisterOptModal: function () {
                View.control.openModalByUrl("/personal/user/register_opt.php?AJAXMODE=Y")
            }, showVacancykModal: function () {
                View.control.openModalByUrl("/about/vacancy/request.php?AJAXMODE=Y")
            }, showSignInModal: function () {
                View.control.openModalByUrl("/personal/user/authForm.php?AJAXMODE=Y")
            }, showSignUpModal: function () {
                View.control.openModalByUrl("/personal/user/register.php?AJAXMODE=Y")
            }, showResetModal: function (e, t) {
                View.control.openModalByUrl("/personal/user/reset.php?AJAXMODE=Y&USER_CHECKWORD=" + e + "&USER_LOGIN=" + t)
            }, updateUser: function (e) {
                this.user.name = e.name || this.user.name, this.user.login = e.login || this.user.login, this.user.email = e.email || this.user.email, this.user.authorized = this.user.email ? 1 : 0, e.city && (this.user.city.name = e.city.name, this.user.city.id = e.city.id)
            }, showProductPreviewModal: function (e, t, i) {
                View.control.openModalByUrl(i + "?OFFER_ID=" + t + "&bxajaxid=catalog&AJAXMODE=Y")
            }, showReviewModal: function (e, t) {
                View.control.openModalByUrl("/catalog/review.php?AJAXMODE=Y&productId=" + e + "&offerId=" + t)
            }, showProductAvailabilityModal: function (e, t) {
                View.control.openModalByUrl("/catalog/onStore.php?AJAXMODE=Y&productId=" + e + "&offerId=" + t)
            }, showProductSubscriptionModal: function (e, t, i) {
                View.control.openModalByUrl("/catalog/subscribe.php?AJAXMODE=Y&productId=" + e + "&offerId=" + t + "&dataSource=" + i)
            }, showProductPriceSubscriptionModal: function (e, t, i) {
                View.control.openModalByUrl("/catalog/requestprice.php?AJAXMODE=Y&productId=" + e + "&offerId=" + t + "&dataSource=" + i)
            }, showCallRequestModal: function () {
                View.control.openModalByUrl("/about/contact/callme.php?AJAXMODE=Y")
            }, showFeedbackModal: function () {
                View.control.openModalByUrl("/about/contact/writeus.php?AJAXMODE=Y")
            }, updateFavorites: function (e, t) {
                Vue.set(this.favorites, "productIds", e), t && Vue.set(this.favorites, "bxajaxid", t), this.$emit("favoritesUpdated")
            }, addToFavorites: function (e, t) {
                var i = this;
                $.post({
                    url: "/",
                    data: {FAVORITE_ADD: e, bxajaxid: i.favorites.bxajaxid},
                    dataType: "json"
                }).done(function (e) {
                    i.updateFavorites(e.productIds)
                }).fail(function (e) {
                    console.warn("Model.addToFavorites failed:", e)
                })
            }, removeFromFavorites: function (e, t) {
                var i = this;
                $.post({
                    url: "/",
                    data: {FAVORITE_DEL: e, bxajaxid: i.favorites.bxajaxid},
                    dataType: "json"
                }).done(function (e) {
                    i.updateFavorites(e.productIds)
                }).fail(function (e) {
                    console.warn("Model.removeFromFavorites failed:", e)
                })
            }, isInFavorites: function (e, t) {
                return "object" == typeof this.favorites.productIds && "function" == typeof this.favorites.productIds.indexOf && 0 <= this.favorites.productIds.indexOf(e)
            }, updateBasket: function (e, t) {
                var i = this;
                e && (Vue.set(this.basket, "products", e), i.$emit("basketUpdated", i.basket)), t && Vue.set(this.basket, "bxajaxid", t), e || $.get({
                    url: "/ajax/basket.php",
                    data: {target: "get"},
                    dataType: "json"
                }).done(function (e) {
                    i.basket.products = e.products, i.$emit("basketUpdated", i.basket)
                }).fail(function (e) {
                    console.warn("Model.updateBasket failed:", e)
                })
            }, updatePresent: function (e, t) {
                Vue.set(this.basket, "presentsProduct", e), Vue.set(this.basket, "presents", t || {}), this.$emit("basketPresentUpdated", this.basket)
            }, repeatOrder: function (e, t) {
                var i = this, o = {bxajaxid: i.basket.bxajaxid, BASKET_ADD: []};
                e && (o.CLEAR_BASKET = "Y"), $.each(t, function (e, t) {
                    t.offers && t.offers.length ? $.each(t.offers, function (e, t) {
                        o.BASKET_ADD.push({ID: t.offerId, COUNT: t.quantity})
                    }) : o.BASKET_ADD.push({ID: t.offerId, COUNT: t.quantity})
                }), $.post({url: window.location.pathname, data: o, dataType: "json"}).done(function (e) {
                    i.updateBasket(e.products)
                }).fail(function (e) {
                    console.warn("Model.repeatOrder failed:", e)
                })
            }, removeFromBasket: function (e) {
                var t = this;
                $.post({
                    url: window.location.pathname,
                    data: {BASKET_DELETE: e, bxajaxid: t.basket.bxajaxid},
                    dataType: "json"
                }).done(function (e) {
                    t.basket.lastDeletedProductIds = e.deletedProductIds, t.basket.bonusCurrentOrder = e.bonusCurrentOrder || 0, t.updateBasket(e.products), console.log(e), e.presentsProduct && t.updatePresent(e.presentsProduct, e.presents)
                }).fail(function (e) {
                    console.warn("Model.removeFromBasket failed:", e)
                })
            }, addToBasket: function (e, t, i) {
                var o = this;
                $.post({
                    url: window.location.pathname,
                    data: {BASKET_ADD: e, COUNT: t, bxajaxid: o.basket.bxajaxid, increment: o.basket.increment},
                    dataType: "json"
                }).done(function (e) {
                    o.basket.lastAddedProductIds = e.addedProductIds, o.basket.lastAddedRelatedSource = e.buyWithLink, o.basket.bonusCurrentOrder = e.bonusCurrentOrder || 0, o.updateBasket(e.products), console.log(e), i || View.control.openModalByUrl("/ajax/modal-basket-success.php")
                }).fail(function (e) {
                    console.warn("Model.addToBasket failed:", e)
                })
            }, getBasketCountByOffer: function (e) {
                var t = _.findWhere(this.basket.products, {offerId: e});
                return t && t.count || 0
            }, addToDelayed: function (e, t) {
                alert("Товар добавлен в отложенные (offer id: " + e + ") в количестве " + (t || 1) + " шт.")
            }, removeFromDelayed: function (e) {
                alert("Товар удален из отложенных (offer id: " + e + ")")
            }, setGeolocation: function (e, t) {
                var i = this;
                $.post({
                    url: window.location,
                    data: {CITY_ID: e, bxajaxid: i.geolocation.bxajaxid},
                    dataType: "json"
                }).done(function (e) {
                    i.geolocation.city.id = e.id, i.geolocation.city.name = e.name, i.$emit("geolocationUpdated"), t(e), window.location.reload()
                }).fail(function (e) {
                    console.warn("Model.setGeolocation failed:", e), t(e)
                })
            }, parsePrice: function (e) {
                return e && e.toString || (e = 0), parseFloat(e.toString().replace(/,/g, ".").replace(/\s/g, ""))
            }, formatPrice: function (e) {
                return e && e.toString || (e = 0), "number" != typeof e && (e = (e = (e = e.toString()).replace(/,/g, ".")).replace(/\s/g, "")), parseFloat(e).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace(/\./g, ",")
            }, formatFileSize: function (e) {
                e && e.toString || e && e.toString || (e = 0);
                var t = "Б";
                return 1024 < e && (e /= 1024, t = "кБ"), 1024 < e && (e /= 1024, t = "МБ"), 1024 < e && (e /= 1024, t = "ГБ"), parseFloat(e).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace(/\./g, ",") + " " + t
            }, formatInteger: function (e) {
                return Math.round(e)
            }, formatFloat: function (e) {
                return this.formatPrice(e)
            }, updateShops: function () {
                var t = this;
                $.get({url: "/ajax/shops.php", data: {target: "get"}, dataType: "json"}).done(function (e) {
                    console.log(e), t.shops = e.shops
                }).fail(function (e) {
                    console.warn("Model.updateShops failed:", e)
                })
            }
        }, computed: {
            basketPrice: function () {
                var i = this;
                return this.basket.products.length ? _.reduce(this.basket.products, function (e, t) {
                    return t.delayed ? e : e + i.parsePrice(t.price) * t.count
                }, 0) : 0
            }, basketSale: function () {
                var i = this;
                return this.basket.products.length ? _.reduce(this.basket.products, function (e, t) {
                    return t.delayed ? e : e + (t.priceOld ? (i.parsePrice(t.priceOld) - i.parsePrice(t.price)) * t.count : 0)
                }, 0) : 0
            }, basketCount: function () {
                var i = 0;
                return $.each(this.basket.products, function (e, t) {
                    i += parseFloat(t.count)
                }), i
            }, basketDelayedCount: function () {
                return this.basket.products.length ? _.reduce(this.basket.products, function (e, t) {
                    return t.delayed ? e + 1 : e
                }, 0) : 0
            }, basketPriceWithDelivery: function () {
                return this.basketPrice < this.geolocation.city.freeDeliveryPrice ? this.basketPrice + this.geolocation.city.deliveryPrice : this.basketPrice
            }
        }, filters: {
            formatPrice: function (e) {
                return Model.formatPrice(e)
            }, formatInteger: function (e) {
                return Model.formatInteger(e)
            }, formatFloat: function (e) {
                return Model.formatFloat(e)
            }
        }, created: function () {
        }
    })
}), define("app", ["Model", "vue!page-header/page-header", "vue!page-header-top/component", "vue!page-header-top-item/component", "vue!page-header-main/component", "vue!page-header-main-2/component", "vue!page-header-main-3/component", "vue!availability-sm/component", "vue!top-search/component", "vue!wishlist-sm/component", "vue!basket-sm/component", "vue!basket-action/component", "vue!basket-action-catalog-item/component", "vue!basket-action-success/component", "vue!basket-full/component", "vue!checkout-main/component", "vue!dropdown/component", "vue!city-select/component", "vue!sign-sm/component", "vue!rating-block/component", "vue!product/component", "vue!product-in-checkout/component", "vue!product-detailed/component", "vue!product-price-ext/component", "vue!product-table/component", "vue!product-table-row/component", "vue!subscription/component", "vue!number-input/component", "vue!slider-input/component", "vue!select-input/component", "vue!file-input/component", "vue!rich-text-input/component", "vue!rich-text-input-checkout/component", "vue!rich-form/component", "vue!rich-form-row/component", "vue!fav-btn/component", "vue!auth-register-form/component", "vue!form-call-request/component", "vue!form-message/component", "vue!form-city-select/component", "vue!form-product-subscribe/component", "vue!form-review/component", "vue!recently-viewed/component", "vue!slick/component", "vue!slide/component", "vue!slider-brands/component", "vue!slider-products/component", "vue!slider-related-products/component", "vue!generic-tabs/component", "vue!generic-tab/component", "vue!user-reviews/component", "vue!catalog-item-3/component", "vue!top-banner/component", "vue!image-gallery/component", "vue!catalog-list-main/component", "vue!catalog-grid/component", "vue!catalog-list/component", "vue!catalog-price/component", "vue!catalog-price-ext/component", "vue!basic-filter/component", "vue!page-nav/component", "vue!shop-list/component", "vue!shop-list-full/component", "vue!folded-menu-header/component", "vue!modal/component", "vue!yandex-map/component", "vue!yandex-map-marker/component", "vue!small-countdown/component", "vue!present-grid/component", "vue!system-message/component", "vue!order-history/component", "vue!subscribe/component", "vue!catalog-grid-expand/component", "vue!reviews-slider/component", "vue!reviews-slide/component", "vue!accordion-group/component", "vue!accordion-block/component", "vue!cache-obj/cache-obj", "vue!noindex/component"], function (e) {
    return new Vue({
        el: "#root",
        data: {authorized: e.authorized, user: e.user, geolocation: e.geolocation},
        methods: {
            showCallRequestModal: function () {
                e.showCallRequestModal()
            }, showFeedbackModal: function () {
                e.showFeedbackModal()
            }, showSignInModal: function () {
                e.showSignInModal()
            }
        },
        created: function () {
            var t = this;
            e.$on(["signIn", "signUp", "signInSilent"], function (e) {
                t.authorized = !!e && (t.user = e, !0)
            }), e.$on("signOut", function () {
                t.authorized = !1
            })
        },
        mounted: function () {
            View.coreInitialized || (View.coreInitialized = !0, $(document).trigger("coreReady")), Vue.nextTick(function () {
                View.init.local.tooltipPositionLocal()
            })
        },
        updated: function () {
            Vue.nextTick(function () {
                View.init.local.tooltipPositionLocal()
            })
        }
    })
}), require(["app", "Model"], function (e, t) {
    window.app = e, window.Model = t
}), define("../scripts/core-reactive", function () {
});