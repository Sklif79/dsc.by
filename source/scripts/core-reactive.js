
/*var componentsTags = [
 'page-header',
 'page-header-top',
 'page-header-top-item',
 'page-header-main',
 'page-header-main-2',
 'page-header-main-3',
 'top-search',
 'top-search-2',
 'wishlist-sm',
 'basket-sm',
 'basket-action',
 'basket-action-catalog-item',
 'basket-action-success',
 'basket-full',
 'checkout-main',
 'dropdown',
 'city-select',
 'sign-sm',
 'rating-block',
 'product',
 'product-in-checkout',
 'subscription',
 'number-input',
 'slider-input',
 'select-input',
 'file-input',
 'rich-text-input',
 'rich-text-input-checkout',
 'rich-form',
 'rich-form-row',
 'fav-btn',
 'auth-register-form',
 'form-call-request',
 'form-message',
 'form-city-select',
 'form-product-subscribe',
 'form-review',
 'recently-viewed',
 'slick',
 'slide',
 'slider-brands',
 'slider-products',
 'slider-related-products',
 'generic-tabs',
 'generic-tab',
 'user-reviews',
 'catalog-item',
 'image-gallery',
 'catalog-list-main',
 'catalog-grid',
 'basic-filter',
 'page-nav',
 'shop-list',
 'shop-list-full',
 'folded-menu-header',
 'modal',
 'yandex-map',
 'yandex-map-marker',
 'small-countdown',
 "present-grid",
 'system-message',
 'order-history',
 'subscribe',
 ];*/



Vue.directive('mask', {
	bind: function (el, binding, vnode) {
		var preset = View.inputmaskPresets[Object.keys(binding.modifiers)[0]];
		var inst = this;

		if (preset)
			$(el).inputmask(preset);
		else if (typeof binding.value == 'object')
			$(el).inputmask(binding.value);
		else if (binding.value)
			$(el).inputmask({mask: binding.value, clearMaskOnLostFocus: true, showMaskOnHover: false});
		else
			return;

		$(el).off('keyup.vMaskUpdate').on('keyup.vMaskUpdate', function (e) {
			vnode.context.$emit('input', e.target.value);
		})


		//Inputmask(binding.value).mask(el);
	}
});




Vue.directive('content-crop', {
	inserted: function (el, binding) {
		var element = $(el);
		var timeout = null;
		var cropped = element.hasClass('content-cropped');
		var canBeCropped = false;

		el.dataset.directiveId = Math.round(Math.random() * 1000000);

		$(window).on('resize.vContentCrop' + el.dataset.directiveId, function () {
			clearTimeout(timeout);
			timeout = setTimeout(recalcCrop, 200);
		});

		recalcCrop();

		function recalcCrop() {
			canBeCropped = element.find('.js-v-content-crop-container')[0].scrollHeight >= 250;
			element.toggleClass('content-can-be-cropped', canBeCropped);
			element.toggleClass('content-cant-be-cropped', !canBeCropped);
		}

		element.off('click.vContentCropToggle', '.js-v-content-crop-toggle')
				.on('click.vContentCropToggle', '.js-v-content-crop-toggle', function () {
					var container = element.find('.js-v-content-crop-container');
					cropped = !cropped;
					element.toggleClass('content-cropped', cropped);
				});
	},

	unbind: function (el, binding) {
		$(window).off('resize.vContentCrop' + el.dataset.directiveId);
	}
});




Vue.directive('lazy-img', {
	inserted: function (el, binding) {
		el.classList.add('v-lazy-img-loading');

		var img = new Image();
		img.onload = function () {
			el.src = img.src;
			el.classList.remove('v-lazy-img-loading');
		}
		img.src = binding.value;
	},

	unbind: function (el, binding) {
		$(window).off('resize.vContentCrop' + el.dataset.directiveId);
	}
});




Vue.directive('sticky', {
	inserted: function (el, binding) {
		// position sticky is required
		if (View.isIOS || !View.featureTest('position', ['-webkit-sticky', 'sticky']))
			return;

		var win = $(window);
		var parent = el.parentNode;
		var element = $(el);
		var elementHeight;
		var elBoundingRect;
		var parentBoundingRect;
		var stickTop = false;
		var stickBottom = false;
		var stickStop = false;
		var lastScrollDelta = 0;
		var scrollDelta = 0;
		var lastScrollTop = 0;
		var scrollTop = 0;

		win.on('scroll.vSticky', function () {
			if (requestAnimationFrame)
				requestAnimationFrame(recalcStickyState)
			else
				recalcStickyState();
		});

		function recalcStickyState() {
			// если еще не инициализировались
			if (!el || !parent)
				return;

			elBoundingRect = el.getBoundingClientRect();
			parentBoundingRect = parent.getBoundingClientRect();

			// нет свободного места для фиксирования
			if (el.offsetHeight >= parent.offsetHeight) {
				unstick();
				return;
			}

			scrollTop = win.scrollTop();
			scrollDelta = scrollTop - lastScrollTop;

			// элемент меньше экрана по высоте - фиксируем верхний край элемента
			if (el.offsetHeight <= window.innerHeight) {
				stickToTop();
			}
			// элемент больше экрана по высоте - фиксируем нижний край элемента
			else {
				// еще не доскроллили до родителя
				if (parentBoundingRect.top + (binding.value || 0) > 0) {
					stickToBottom();
				}
				// скроллим родителя
				else if (parentBoundingRect.bottom - window.innerHeight + (binding.value || 0) > 0) {
					// если направление прокрутки изменилось
					if (lastScrollDelta > 0 && scrollDelta < 0 || lastScrollDelta < 0 && scrollDelta > 0) {
						// останавливаем фикс
						if (!stickStop) {
							stickPause();
						}
					}
					// иначе, если элемент остановлен
					else if (stickStop) {
						// нужно зафиксировать его обратно, если его проскроллили
						if (scrollDelta < 0 && elBoundingRect.top - (binding.value || 0) > 0) {
							stickToTop();
						} else if (scrollDelta > 0 && elBoundingRect.bottom - window.innerHeight + (binding.value || 0) < 0) {
							stickToBottom();
						}
					}
				}
			}

			lastScrollTop = scrollTop;
			lastScrollDelta = scrollDelta;
		}

		function unstick() {
			//console.log('unstick')
			element
					.removeClass('sticky-top sticky-bottom sticky-stop')
					.css('bottom', '')
					.css('top', '');
			stickBottom = stickTop = stickStop = false;
		}

		function stickToTop() {
			//console.log('stick to top')
			element
					.removeClass('sticky-bottom sticky-stop')
					.addClass('sticky-top')
					.css('bottom', '')
					.css('top', binding.value || 0);
			stickBottom = stickStop = false;
			stickTop = true;
		}

		function stickToBottom() {
			//console.log('stick to bottom')
			element
					.removeClass('sticky-top sticky-stop')
					.addClass('sticky-bottom')
					.css('top', '')
					.css('bottom', binding.value || 0);
			stickTop = stickStop = false;
			stickBottom = true;
		}

		function stickPause() {
			//console.log('stick pause')
			element
					.removeClass('sticky-top sticky-bottom')
					.addClass('sticky-stop')
					.css('top', elBoundingRect.top - parentBoundingRect.top)
					.css('bottom', '');

			if (el.offsetHeight >= parent.offsetHeight) {
				unstick();
				return;
			}

			stickTop = stickBottom = false;
			stickStop = true;
		}
	}
});




Vue.directive('video-modal', {
	inserted: function (el, binding) {
		$(el).off('click.vueVideoModalDerective').on('click.vueVideoModalDerective', function () {
			View.control.openModalWithIframe(binding.value);
		});
	}
});




Vue.prototype.$ymapEventBus = new Vue({
	data: {
		ymapReady: false,
		scriptIsNotAttached: true
	}
});



define('Model', function () {
	return new Vue({
		data: {
			authorized: false,
			user: {
				name: null,
				login: null,
				email: null,
				password: null
			},
			basket: {
				increment: 0,
				bxajaxid: null,
				products: [],
				lastDeletedProductIds: [],
				lastAddedProductIds: [],
				lastAddedRelatedSource: null,
				bonusCurrentOrder: 0,
			},
			favorites: {
				bxajaxid: null,
				productIds: [],
				enabled: true
			},
			quickView: {
				enabled: false
			},
			reviews: {
				enabled: false
			},
			geolocation: {
				bxajaxid: null,
				city: {
					name: null,
					id: null,
					freeDeliveryPrice: 100.50,
					deliveryPrice: 2
				}
			},
			storeSelection: {
				enabled: true,
			}
		},

		methods: {
			signUp: function (user) {
				this.authorized = true;
				this.updateUser(user);
				this.$emit('signUp', this.user);
			},

			signIn: function (user, silent) {
				this.authorized = true;
				this.updateUser(user);
				// signInSilent пока не нужно, но мало ли
				this.$emit(silent ? 'signInSilent' : 'signIn', this.user);
			},

			signOut: function () {
				this.authorized = false;
				this.$emit('signOut', this.user);
			},

			showRegisterModal: function () {
				View.control.openModalByUrl('/personal/user/register.php?AJAXMODE=Y');
			},
			showRegisterOptModal: function () {
				View.control.openModalByUrl('/personal/user/register_opt.php?AJAXMODE=Y');
			},
			showVacancykModal: function () {
				View.control.openModalByUrl('/about/vacancy/request.php?AJAXMODE=Y');
			},
			showSignInModal: function () {
				View.control.openModalByUrl('/personal/user/authForm.php?AJAXMODE=Y');
			},

			showSignUpModal: function () {
				View.control.openModalByUrl('/personal/user/register.php?AJAXMODE=Y');
			},

			showResetModal: function (checkWord, userLogin) {
				View.control.openModalByUrl('/personal/user/reset.php?AJAXMODE=Y&USER_CHECKWORD=' + checkWord + '&USER_LOGIN=' + userLogin);
			},

			updateUser: function (user) {
				this.user.name = user.name || this.user.name;
				this.user.login = user.login || this.user.login;
				this.user.email = user.email || this.user.email;
				this.user.authorized = this.user.email ? 1 : 0;
				if (user.city) {
					this.user.city.name = user.city.name;
					this.user.city.id = user.city.id;
				}
			},

			showProductPreviewModal: function (productId, offerId, link) {
				View.control.openModalByUrl(link + '?OFFER_ID=' + offerId + '&bxajaxid=catalog&AJAXMODE=Y');
				//var dataSource = link + '?OFFER_ID=' + offerId + '&bxajaxid=catalog';
				//View.control.openModalByUrl('/ajax/modal-product-preview.php?productId=' + productId + '&offerId=' + offerId + '&dataSource=' + encodeURI(dataSource));
			},

			showReviewModal: function (productId, offerId) {
				View.control.openModalByUrl('/catalog/review.php?AJAXMODE=Y&productId=' + productId + '&offerId=' + offerId);
			},

			showProductAvailabilityModal: function (productId, offerId) {
				View.control.openModalByUrl('/catalog/onStore.php?AJAXMODE=Y&productId=' + productId + '&offerId=' + offerId);
			},

			showProductSubscriptionModal: function (productId, offerId, dataSource) {
				View.control.openModalByUrl('/catalog/subscribe.php?AJAXMODE=Y&productId=' + productId + '&offerId=' + offerId + '&dataSource=' + dataSource);
			},

			showProductPriceSubscriptionModal: function (productId, offerId, dataSource) {
				View.control.openModalByUrl('/catalog/requestprice.php?AJAXMODE=Y&productId=' + productId + '&offerId=' + offerId + '&dataSource=' + dataSource);
			},

			showCallRequestModal: function () {
				View.control.openModalByUrl('/about/contact/callme.php?AJAXMODE=Y');
			},

			showFeedbackModal: function () {
				View.control.openModalByUrl('/about/contact/writeus.php?AJAXMODE=Y');
			},

			updateFavorites: function (list, bxajaxid) {
				Vue.set(this.favorites, 'productIds', list);

				if (bxajaxid)
					Vue.set(this.favorites, 'bxajaxid', bxajaxid);

				this.$emit('favoritesUpdated');
			},

			addToFavorites: function (productId, offerId) {
				var inst = this;

				$.post({
					url: '/',
					data: {
						FAVORITE_ADD: productId,
						bxajaxid: inst.favorites.bxajaxid
					},
					dataType: 'json'
				})
						.done(function (response) {
							inst.updateFavorites(response.productIds);
						})
						.fail(function (response) {
							console.warn('Model.addToFavorites failed:', response);
						});
			},

			removeFromFavorites: function (productId, offerId) {
				var inst = this;

				$.post({
					url: '/',
					data: {
						FAVORITE_DEL: productId,
						bxajaxid: inst.favorites.bxajaxid
					},
					dataType: 'json'
				})
						.done(function (response) {
							inst.updateFavorites(response.productIds);
						})
						.fail(function (response) {
							console.warn('Model.removeFromFavorites failed:', response);
						});
			},

			isInFavorites: function (productId, offerId) {
				if (typeof this.favorites.productIds == 'object' && typeof this.favorites.productIds.indexOf == 'function')
					return this.favorites.productIds.indexOf(productId) >= 0;
				return false;
			},

			updateBasket: function (products, bxajaxid) {
				var inst = this;

				if (products) {
					Vue.set(this.basket, 'products', products);
					inst.$emit('basketUpdated', inst.basket);
				}

				if (bxajaxid)
					Vue.set(this.basket, 'bxajaxid', bxajaxid);

				if (!products) {
					$.get({
						url: '/ajax/basket.php',
						data: {
							target: 'get'
						},
						dataType: 'json'
					})
							.done(function (response) {
								inst.basket.products = response.products;

								inst.$emit('basketUpdated', inst.basket);
							})
							.fail(function (response) {
								console.warn('Model.updateBasket failed:', response);
							});
				}
			},

			updatePresent: function (products, presents) {
				var inst = this;
				Vue.set(this.basket, 'presentsProduct', products);
				Vue.set(this.basket, 'presents', presents || {});
				inst.$emit('basketPresentUpdated', inst.basket);


			},

			repeatOrder: function (resetBasket, products) {

				var inst = this;

				var data = {
					bxajaxid: inst.basket.bxajaxid,
					BASKET_ADD: []
				};

				if (resetBasket) {
					data.CLEAR_BASKET = "Y";
				}

				$.each(products, function (index, dataValue) {

					if (!dataValue.offers || !dataValue.offers.length) {
						data.BASKET_ADD.push({ID: dataValue.offerId, COUNT: dataValue.quantity});
					} else {
						$.each(dataValue.offers, function (indexOffer, dataOffer) {
							data.BASKET_ADD.push({ID: dataOffer.offerId, COUNT: dataOffer.quantity});
						});
					}

				})


				$.post({
					url: window.location.pathname,
					data: data,
					dataType: 'json'
				})
				.done(function (response) {
					inst.updateBasket(response.products);
				})
				.fail(function (response) {
					console.warn('Model.repeatOrder failed:', response);
				});


			},

			removeFromBasket: function (offerId) {
				var inst = this;

				/*
				var productIndex = _.findIndex(this.basket.products, {offerId: offerId});
				if (typeof productIndex === 'number' && productIndex >= 0) {
					this.basket.products.splice(productIndex, 1);
					this.$emit('basketUpdated', this.basket);
				} else {
					productIndex = _.findIndex(this.basket.presentsProduct, {offerId: offerId});
					if (typeof productIndex === 'number' && productIndex >= 0) {
						this.basket.presentsProduct.splice(productIndex, 1);
						this.$emit('basketPresentUpdated', this.basket);
					} else {
						console.warn('Model.removeFromBasket failed: product not found', offerId);
						return false;
					}
				}
				*/


				$.post({
					url: window.location.pathname,
					data: {
						BASKET_DELETE: offerId,
						bxajaxid: inst.basket.bxajaxid
					},
					dataType: 'json'
				})
				.done(function (response) {
					inst.basket.lastDeletedProductIds = response.deletedProductIds;
					inst.basket.bonusCurrentOrder = response.bonusCurrentOrder || 0;

					inst.updateBasket(response.products);
					console.log(response)

					if (response.presentsProduct) {
						inst.updatePresent(response.presentsProduct, response.presents);
					}
				})
				.fail(function (response) {
					console.warn('Model.removeFromBasket failed:', response);
				});
			},

			addToBasket: function (offerId, count, notShowModal) {
				var inst = this;

				$.post({
					url: window.location.pathname,
					data: {
						BASKET_ADD: offerId,
						COUNT: count,
						bxajaxid: inst.basket.bxajaxid,
						increment: inst.basket.increment
					},
					dataType: 'json'
				})
				.done(function (response) {
					inst.basket.lastAddedProductIds = response.addedProductIds;
					inst.basket.lastAddedRelatedSource = response.buyWithLink;
					inst.basket.bonusCurrentOrder = response.bonusCurrentOrder || 0;

					inst.updateBasket(response.products);
					console.log(response)

					if (!notShowModal) {
						View.control.openModalByUrl('/ajax/modal-basket-success.php');
					}
				})
				.fail(function (response) {
					console.warn('Model.addToBasket failed:', response);
				});

			},

			getBasketCountByOffer: function (offerId) {
				var result = _.findWhere(this.basket.products, {offerId: offerId});
				return result ? result.count || 0 : 0;
			},

			addToDelayed: function (offerId, count) {
				alert('Товар добавлен в отложенные (offer id: ' + offerId + ') в количестве ' + (count || 1) + ' шт.');
			},

			removeFromDelayed: function (offerId) {
				alert('Товар удален из отложенных (offer id: ' + offerId + ')');
			},

			setGeolocation: function (geoId, callback) {
				var inst = this;
				$.post({
					url: window.location,
					data: {
						CITY_ID: geoId,
						bxajaxid: inst.geolocation.bxajaxid
					},
					dataType: 'json'
				})
						.done(function (response) {
							inst.geolocation.city.id = response.id;
							inst.geolocation.city.name = response.name;
							inst.$emit('geolocationUpdated');
							callback(response);
							window.location.reload();
						})
						.fail(function (response) {
							console.warn('Model.setGeolocation failed:', response);
							callback(response);
						});
			},

			parsePrice: function (price) {
				if (!price || !price.toString)
					price = 0;

				return parseFloat(price.toString().replace(/,/g, '.').replace(/\s/g, ''));
			},

			formatPrice: function (price) {
				if (!price || !price.toString)
					price = 0;

				if (typeof (price) !== 'number') {
					price = price.toString();
					price = price.replace(/,/g, '.');
					price = price.replace(/\s/g, "");
				}

				return parseFloat(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').replace(/\./g, ',');
			},

			formatFileSize: function (value) {
				if (!value || !value.toString)
					if (!value || !value.toString)
						value = 0;

				var units = 'Б';

				if (value > 1024) {
					value /= 1024;
					units = 'кБ'
				}

				if (value > 1024) {
					value /= 1024;
					units = 'МБ'
				}

				if (value > 1024) {
					value /= 1024;
					units = 'ГБ'
				}
				return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ').replace(/\./g, ',') + ' ' + units;
			},

			formatInteger: function (value) {
				return Math.round(value);
			},

			formatFloat: function (value) {
				return this.formatPrice(value);
			},

			updateShops: function () {
				var inst = this;

				$.get({
					url: '/ajax/shops.php',
					data: {
						target: 'get'
					},
					dataType: 'json'
				})
						.done(function (response) {
							console.log(response)
							inst.shops = response.shops;
						})
						.fail(function (response) {
							console.warn('Model.updateShops failed:', response);
						});
			}
		},

		computed: {
			basketPrice: function () {
				var inst = this;
				return !this.basket.products.length ? 0 : _.reduce(this.basket.products, function (memo, product) {
					if (product.delayed)
						return memo;

					return memo + inst.parsePrice(product.price) * product.count
				}, 0);
			},

			basketSale: function () {
				var inst = this;
				return !this.basket.products.length ? 0 : _.reduce(this.basket.products, function (memo, product) {
					if (product.delayed)
						return memo;
					return memo + (product.priceOld ? (inst.parsePrice(product.priceOld) - inst.parsePrice(product.price)) * product.count : 0);
				}, 0);
			},

			basketCount: function () {
				var inst = this;
				var counter = 0;
				$.each(this.basket.products, function (index, data) {
					counter += parseFloat(data.count);
				})

				return counter;
			},

			basketDelayedCount: function () {
				var inst = this;
				return !this.basket.products.length ? 0 : _.reduce(this.basket.products, function (memo, product) {
					if (!product.delayed)
						return memo;
					return memo + 1;
				}, 0);
			},

			basketPriceWithDelivery: function () {
				return this.basketPrice < this.geolocation.city.freeDeliveryPrice ? this.basketPrice + this.geolocation.city.deliveryPrice : this.basketPrice;
			}
		},

		filters: {
			formatPrice: function (value) {
				return Model.formatPrice(value);
			},

			formatInteger: function (value) {
				return Model.formatInteger(value);
			},

			formatFloat: function (value) {
				return Model.formatFloat(value);
			}
		},

		created: function () {
//			this.updateBasket();
//			this.updateShops();
		}
	})
});


define('app', [
	'Model',
	'vue!page-header/page-header',
	'vue!page-header-top/component',
	'vue!page-header-top-item/component',
	'vue!page-header-main/component',
	'vue!page-header-main-2/component',
	'vue!page-header-main-3/component',
	'vue!availability-sm/component',
	'vue!top-search/component',
	'vue!wishlist-sm/component',
	'vue!basket-sm/component',
	'vue!basket-action/component',
	'vue!basket-action-catalog-item/component',
	'vue!basket-action-success/component',
	'vue!basket-full/component',
	'vue!checkout-main/component',
	'vue!dropdown/component',
	'vue!city-select/component',
	'vue!sign-sm/component',
	'vue!rating-block/component',
	'vue!product/component',
	'vue!product-in-checkout/component',
	'vue!product-detailed/component',
	'vue!product-price-ext/component',
	'vue!product-table/component',
	'vue!product-table-row/component',
	'vue!subscription/component',
	'vue!number-input/component',
	'vue!slider-input/component',
	'vue!select-input/component',
	'vue!file-input/component',
	'vue!rich-text-input/component',
	'vue!rich-text-input-checkout/component',
	'vue!rich-form/component',
	'vue!rich-form-row/component',
	'vue!fav-btn/component',
	'vue!auth-register-form/component',
	'vue!form-call-request/component',
	'vue!form-message/component',
	'vue!form-city-select/component',
	'vue!form-product-subscribe/component',
	'vue!form-review/component',
	'vue!recently-viewed/component',
	'vue!slick/component',
	'vue!slide/component',
	'vue!slider-brands/component',
	'vue!slider-products/component',
	'vue!slider-related-products/component',
	'vue!generic-tabs/component',
	'vue!generic-tab/component',
	'vue!user-reviews/component',
	'vue!catalog-item-3/component',
	'vue!top-banner/component',
	/*'vue!lazy-components/component',*/
	'vue!image-gallery/component',
	'vue!catalog-list-main/component',
	'vue!catalog-grid/component',
	'vue!catalog-list/component',
	'vue!catalog-price/component',
	'vue!catalog-price-ext/component',
	'vue!basic-filter/component',
	'vue!page-nav/component',
	'vue!shop-list/component',
	'vue!shop-list-full/component',
	'vue!folded-menu-header/component',
	'vue!modal/component',
	'vue!yandex-map/component',
	'vue!yandex-map-marker/component',
	'vue!small-countdown/component',
	"vue!present-grid/component",
	'vue!system-message/component',
	'vue!order-history/component',
	'vue!subscribe/component',
	'vue!catalog-grid-expand/component',
	'vue!reviews-slider/component',
	'vue!reviews-slide/component',
	'vue!accordion-group/component',
	'vue!accordion-block/component',
	'vue!cache-obj/cache-obj',
	'vue!noindex/component',
], function (Model) {
	/*
	 // load only used components (except nested ones)
	 var componentsToLoad = [];
	 
	 for(var i = 0; i < componentsTags.length; i++) {
	 if(document.querySelector(componentsTags[i])) {
	 componentsToLoad.push('vue!' + componentsTags[i] + '/component')
	 }
	 }
	 
	 componentsToLoad.push('vue!modal/component');
	 componentsToLoad.push('Model');
	 
	 require(componentsToLoad, function() {
	 //...
	 });
	 */

	return new Vue({
		el: '#root',
		data: {
			authorized: Model.authorized,
			user: Model.user,
			geolocation: Model.geolocation
		},

		methods: {
			showCallRequestModal: function () {
				Model.showCallRequestModal();
			},

			showFeedbackModal: function () {
				Model.showFeedbackModal();
			},
			showSignInModal: function () {
				Model.showSignInModal();
			},
		},

		created: function () {
			var inst = this;

			Model.$on(['signIn', 'signUp', 'signInSilent'], function (user) {
				if (user) {
					inst.user = user;
					inst.authorized = true;
				} else {
					inst.authorized = false;
				}
			});

			Model.$on('signOut', function () {
				inst.authorized = false;
			});
		},

		mounted: function () {
			if (!View.coreInitialized) {
				View.coreInitialized = true;
				$(document).trigger('coreReady');
			}

			Vue.nextTick(function () {
				View.init.local.tooltipPositionLocal();
			});
		},

		updated: function () {
			Vue.nextTick(function () {
				View.init.local.tooltipPositionLocal();
			});
		}
	});
});


require(['app', 'Model'], function (app, Model) {
	window.app = app;
	window.Model = Model;
});

function makeReactiveModal(callback) {
	require([
		'Model',
		'vue!page-header/page-header',
		'vue!page-header-top/component',
		'vue!page-header-top-item/component',
		'vue!page-header-main/component',
		'vue!page-header-main-2/component',
		'vue!page-header-main-3/component',
		'vue!availability-sm/component',
		'vue!top-search/component',
		'vue!wishlist-sm/component',
		'vue!basket-sm/component',
		'vue!basket-action/component',
		'vue!basket-action-success/component',
		'vue!basket-full/component',
		'vue!checkout-main/component',
		'vue!dropdown/component',
		'vue!city-select/component',
		'vue!sign-sm/component',
		'vue!rating-block/component',
		'vue!product/component',
		'vue!product-in-checkout/component',
		'vue!product-detailed/component',
		'vue!product-price-ext/component',
		'vue!product-table/component',
		'vue!product-table-row/component',
		'vue!subscription/component',
		'vue!number-input/component',
		'vue!slider-input/component',
		'vue!select-input/component',
		'vue!file-input/component',
		'vue!rich-text-input/component',
		'vue!rich-text-input-checkout/component',
		'vue!rich-form/component',
		'vue!rich-form-row/component',
		'vue!fav-btn/component',
		'vue!auth-register-form/component',
		'vue!form-call-request/component',
		'vue!form-message/component',
		'vue!form-city-select/component',
		'vue!form-product-subscribe/component',
		'vue!form-review/component',
		'vue!recently-viewed/component',
		'vue!slick/component',
		'vue!slide/component',
		'vue!slider-brands/component',
		'vue!slider-products/component',
		'vue!slider-related-products/component',
		'vue!generic-tabs/component',
		'vue!generic-tab/component',
		'vue!user-reviews/component',
		'vue!catalog-item-3/component',
		'vue!top-banner/component',
		/*'vue!lazy-components/component',*/
		'vue!image-gallery/component',
		'vue!catalog-list-main/component',
		'vue!catalog-grid/component',
		'vue!catalog-list/component',
		'vue!catalog-price/component',
		'vue!catalog-price-ext/component',
		'vue!basic-filter/component',
		'vue!page-nav/component',
		'vue!shop-list/component',
		'vue!shop-list-full/component',
		'vue!folded-menu-header/component',
		'vue!modal/component',
		'vue!yandex-map/component',
		'vue!yandex-map-marker/component',
		'vue!small-countdown/component',
		"vue!present-grid/component",
		'vue!system-message/component',
		'vue!order-history/component',
		'vue!subscribe/component',
		'vue!catalog-grid-expand/component',
		'vue!reviews-slider/component',
		'vue!reviews-slide/component',
		'vue!accordion-group/component',
		'vue!accordion-block/component',
		'vue!cache-obj/cache-obj',
		'vue!noindex/component',
	], function () {
		new Vue({
			el: 'modal',
			mounted: function () {
				if (typeof callback === 'function')
					callback();
			},
		});
	});
}