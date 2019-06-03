
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || false;


var winstate = {
	data: {},

	init: function ()
	{
		if (window.location.hash.length < 2)
			return;

		_.each(window.location.hash.substr(1).split('|'), function (kv)
		{
			var x = kv.split('=');
			if (x && x.length == 2)
				winstate.data[x[0]] = x[1];
		});
	},

	set: function (key, value)
	{
		if (winstate.data[key])
		{
			if (winstate.data[key] === value)
				return;
		}

		if (value)
			winstate.data[key] = value;
		else
			delete winstate.data[key];

		var state = _.map(winstate.data, function (v, k)
		{
			return k + '=' + v;
		}).sort().join('|');

		try {
			window.history.replaceState(null, null, '#' + state);
		} catch (e) {
			window.location.hash = state;
		}
	},

	get: function (key, def)
	{
		return winstate.data[key] || (def || '');
	}
};

winstate.init();



var View = new (function ()
{
	// private
	var doc = $(document);
	var body = $(document.body);
	var htmlbody = $([document.documentElement, document.body]);
	var win = $(window);
	var protectDropdownAnimTimeout = null;


	// public
	this.allInitialized = false;
	this.viewInitialized = false;
	this.globalInitialized = false;
	this.localInitialized = false;
	this.coreInitialized = false;
	this.plugins = {};


	// breakpoints
	this.breakpoints = {
		'lg-min': 1250,
		'md-max': 1249,
		'md-min': 1000,
		'sm-max': 999,
		'sm-min': 760,
		'xs-max': 759,
		'xs-min': 640,
		'2xs-max': 639,
		'2xs-min': 480,
		'3xs-max': 479,
		'3xs-min': 380,
		'4xs-max': 379,
		'4xs-min': 0,
		'header-top-folding-max': 999,
		'header-menu-folding-max': 999
	};


	// проверка на мобильное устройство (true/false)
	this.mobileAndTabletCheck = (function ()
	{
		var check = false;
		(function (a) {
			if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
				check = true
		})(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	})();


	this.isIE = (function detectIE()
	{
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0)
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

		var trident = ua.indexOf('Trident/');
		if (trident > 0)
		{
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0)
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

		return false;
	})();


	this.featureTest = function (property, values)
	{
		var prop = property + ':';
		var el = document.createElement('div');
		var testStyle = el.style;

		for (var i = 0; i < values.length; i++)
		{
			testStyle.cssText = prop + values.join(';' + prop) + ';';
		}

		return !!testStyle[property];
	};


	this.inputmaskPresets = {
		phone: {mask: "+375 99 999-99-99", placeholder: '+375 __ ___-__-__', clearMaskOnLostFocus: true, showMaskOnHover: false},
		date: {mask: "99.99.9999", placeholder: '__.__.____', clearMaskOnLostFocus: true, showMaskOnHover: false},
		passportNumber: {mask: "AA 9999999", placeholder: '__ _______', clearMaskOnLostFocus: true, showMaskOnHover: false},
		passportId: {mask: "9999999A999AA9", placeholder: '______________', clearMaskOnLostFocus: true, showMaskOnHover: false}
	};


	// получение ширины полосы прокрутки
	this.scrollBarWidth;


	// управление открытием/закрытием меню и состоянием элементов
	this.control = {

		// открыть мобильное меню
		openMainMenu: function ()
		{
			body.addClass('main-menu-folded-open');
		},

		// закрыть мобильное меню
		closeMainMenu: function ()
		{
			body.removeClass('main-menu-folded-open');
		},

		// открыть главный раздел мобильного меню
		openMainMenuNav: function ()
		{
			body.addClass('main-menu-folded-nav-open');
		},

		// закрыть главный раздел мобильного меню
		closeMainMenuNav: function ()
		{
			body.removeClass('main-menu-folded-nav-open');
		},

		// открыть подраздел мобильного меню
		openMainMenuLinksGroup: function (group)
		{
			group.addClass('open');
		},

		// закрыть подраздел мобильного меню
		closeAllMainMenuLinksGroups: function ()
		{
			$('.js-main-menu-links__group-sub').removeClass('open');
		},

		// открыть подраздел мобильного меню
		openCatalogFilter: function ()
		{
			body.addClass('catalog-filter-open');
		},

		// закрыть подраздел мобильного меню
		closeCatalogFilter: function ()
		{
			body.removeClass('catalog-filter-open');
		},

		// открыть поиск
		openTopSearch: function ()
		{
			$('.js-top-search-input').first().focus();
			body.addClass('top-search-open');
		},

		// закрыть поиск
		closeTopSearch: function (options)
		{
			body.removeClass('top-search-open');
			if (!options || !options.silent)
				$('.js-top-search-input').val('');
			body.trigger('topSearchClosed', {silent: options && options.silent});
		},

		// открыть поиск
		openFoldedTopSearch: function ()
		{
			$('.js-top-search-input').first().focus();
			body.addClass('top-search-folded-open');
		},

		// закрыть поиск
		closeFoldedTopSearch: function ()
		{
			body.removeClass('top-search-folded-open');
			$('.js-top-search-input').val('');
			body.trigger('topSearchFoldedClosed');
		},

		// открыть выпадающее меню
		openDropdown: function (dropdown, dropdownBtn, dropdownBody)
		{
			var requireQueue = $('.js-dropdown.open').length > 0;

			this.closeAllDropdowns(dropdown, dropdownBtn, dropdownBody);

			if (requireQueue)
				dropdown.addClass('in-queue');

			dropdown.addClass('open animated');
			dropdownBtn.addClass('open');
			dropdownBody.addClass('open');

			$('.js-close-click-out').removeClass('open');

			if (dropdown.hasClass('js-main-menu-item'))
				body.addClass('main-menu-open');

			protectDropdownAnimTimeout = setTimeout(function ()
			{
				dropdown.removeClass('animated');
			}, 300);
		},

		// закрыть выпадающее меню
		closeDropdown: function (dropdown, dropdownBtn, dropdownBody)
		{
			clearTimeout(protectDropdownAnimTimeout);

			if (!dropdownBtn)
				dropdownBtn = dropdown.find('.js-dropdown__btn');

			if (!dropdownBody)
				dropdownBody = dropdown.find('.js-dropdown__body');

			dropdown.removeClass('open animated');
			dropdownBtn.removeClass('open');
			dropdownBody.removeClass('open');

			if (dropdown.hasClass('js-main-menu-item'))
				body.removeClass('main-menu-open');
		},

		// закрыть все выпадающие меню (кроме @except). exceptOptions = 'except-mouseover' - закрыть все, кроме того, который под курсором
		closeAllDropdowns: function (exceptDropdown, exceptBnt, exceptBody, exceptOptions)
		{
			var otherDropdowns = $('.js-dropdown');
			var otherDropdownBtns = $('.js-dropdown__btn');
			var otherDropdownBodys = $('.js-dropdown__body');

			if (exceptDropdown)
				otherDropdowns = otherDropdowns.not(exceptDropdown);
			if (exceptBnt)
				otherDropdownBtns = otherDropdownBtns.not(exceptBnt);
			if (exceptBody)
				otherDropdownBodys = otherDropdownBodys.not(exceptBody);


			if (exceptOptions === 'except-mouseover')
			{
				otherDropdowns = otherDropdowns.not(otherDropdownBtns.add(otherDropdownBodys).filter(':hover').closest('.js-dropdown'));
				otherDropdownBtns = otherDropdowns.find('.js-dropdown__btn');
				otherDropdownBodys = otherDropdowns.find('.js-dropdown__body');
			}


			otherDropdowns.removeClass('related-open in-queue');

			this.closeDropdown(otherDropdowns, otherDropdownBtns, otherDropdownBodys);

			$('.js-dropdown__btn').removeClass('closed');
		},

		// загрузить и открыть попап
		openModalByUrl: function (url, callback)
		{
			if (typeof url !== 'string')
			{
				console.warn('View.control.openModalByUrl error: url is not a string', url);
				return false;
			}



			body.find('.js-modal-container').remove();
			body.append('<div class="modal-container js-modal-container"></div>');
			body.addClass('modal-loading');
			var urlParams = new Url(url);

			$.ajax({
				type: 'post',
				url: urlParams.path +  "?AJAXMODE=Y",
				data: urlParams.query.valueOf(),
				dataType: 'html'
			})
					.done(function (response) {

						if (typeof callback === 'function') {
							callback({status: "success"});
						}

						$('.js-modal-container').html(response);
						makeReactiveModal(function () {
							View.control.openModal($('.js-modal-container .js-modal'))
						});
					})
					.fail(function (response) {
						if (typeof callback === 'function') {
							callback({status: "error"});
						}
						console.warn('View.control.openModalByUrl error: ' + response);

					});

		},

		openModalWithIframe: function (options)
		{
			if (typeof options == 'undefined')
			{
				console.warn('View.control.openModalWithIframe error: options is undefined', url);
				return false;
			}

			body.find('.js-modal-container').remove();
			body.append('<div class="modal-container js-modal-container"></div>');
			body.addClass('modal-loading');

			$('.js-modal-container').append('<modal class="modal--video">' +
					'<div class="video-block" slot="content">' +
					'<iframe src="' + options.src + '" allowfullscreen></iframe>' +
					'</div>' +
					'</modal>');

			setTimeout(function () {
				makeReactiveModal(function () {
					View.control.openModal($('.js-modal-container .js-modal'))
				});
			}, 0);
		},

		// открыть попап
		openModal: function (modal)
		{
			this.closeAll();

			var modal = $(modal)

			modal.addClass('open loading');
			body.addClass('modal-open');

			var modalHeight = modal.outerHeight();
			var winHeight = win.height();
			var winScrollTop = win.scrollTop();
			var offsetParent = modal.offsetParent();

			//if(!offsetParent.is('body'))
			//	winScrollTop -= offsetParent.offset().top;

			var modalTop = modalHeight > winHeight ? winScrollTop + 50 : winScrollTop + (winHeight - modalHeight) / 2;

			if (modalTop + modalHeight + 300 > body.height())
			{
				modalTop = body.height() - modalHeight - 300;
				htmlbody.animate({scrollTop: modalTop - 50}, Math.abs(modalTop - winScrollTop));
			}
			modalTop = modalTop > 0 ? modalTop : 0;
			modal.css('top', modalTop);

			setTimeout(function ()
			{
				modal.removeClass('loading');
				body.removeClass('modal-loading');
				Model.$emit('modalOpen');
			}, 0);
		},

		// закрыть попап
		closeModal: function ()
		{
			body.removeClass('modal-open modal-loading');
			$('.js-modal.open').removeClass('open');
			setTimeout(function () {
				$('.js-modal:not(.open) iframe').remove();
			}, 300);

			Model.$emit('modalClose');
		},

		openImageGallery: function (data)
		{
			$('.js-cavalry').remove();

			body.append(
					'<div class="cavalry js-cavalry">' +
					'<button type="button" class="cavalry__close js-cavalry___close">' +
					'<svg class="svg-icon"><use xlink:href="#svg-icon-close-big"></use></svg>' +
					'</button>' +
					'<div class="cavalry__main js-cavalry__main"></div>' +
					'<div class="cavalry__previews js-cavalry__previews"></div>' +
					'</div>');

			var gallery = $('.js-cavalry');
			var galleryMain = $('.js-cavalry__main');
			var galleryPreviews = $('.js-cavalry__previews');

			_.each(data.images, function (image, index) {
				galleryMain.append('<div class="cavalry__slide" data-cavalry-slide="' + index + '"><img src="' + image.src + '"></div>');

				if (data.showPreviews)
					galleryPreviews.append('<div class="cavalry__preview-slide"><div class="cavalry__preview-box js-cavalry__preview-box" data-cavalry-slide="' + index + '">' +
							'<img src="' + (image.previewSrc || image.src) + '" alt="">' +
							'</div></div>');
			});

			galleryMain.slick({
				arrows: true,
				dots: false,
				prevArrow: '<button type="button" class="cavalry__arrow cavalry__arrow--prev">' +
						'<svg class="svg-icon"><use xlink:href="#svg-icon-slider-left"></use></svg>' +
						'</buton>',
				nextArrow: '<button type="button" class="cavalry__arrow cavalry__arrow--next">' +
						'<svg class="svg-icon"><use xlink:href="#svg-icon-slider-right"></use></svg>' +
						'</buton>'
			});

			if (data.showPreviews)
			{
				galleryPreviews.slick({
					arrows: true,
					dots: false,
					prevArrow: '<button type="button" class="cavalry__arrow cavalry__arrow--prev">' +
							'<svg class="svg-icon"><use xlink:href="#svg-icon-slider-left"></use></svg>' +
							'</buton>',
					nextArrow: '<button type="button" class="cavalry__arrow cavalry__arrow--next">' +
							'<svg class="svg-icon"><use xlink:href="#svg-icon-slider-right"></use></svg>' +
							'</buton>',
					slidesToShow: 10,
					slidesToScroll: 10,
					centerMode: true,
					responsive: [
						{
							breakpoint: View.breakpoints['md-max'],
							settings: {
								slidesToShow: 8,
								slidesToScroll: 8
							}
						},
						{
							breakpoint: View.breakpoints['sm-max'],
							settings: {
								slidesToShow: 6,
								slidesToScroll: 6
							}
						},
					]
				});
			} else
			{
				galleryPreviews.remove();
			}

			gallery.toggleClass('cavalry--w-previews', data.images.length > 1 && data.showPreviews);

			galleryMain.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
				galleryPreviews.slick('slickGoTo', nextSlide);
				galleryPreviews.find('.js-cavalry__preview-box').removeClass('active').filter('[data-cavalry-slide="' + nextSlide + '"]').addClass('active');
			});

			galleryPreviews.on('click.cavalryPreviewClick', '.js-cavalry__preview-box', function () {
				galleryMain.slick('slickGoTo', $(this).attr('data-cavalry-slide'));
			});

			gallery.find('.js-cavalry___close').off('click.closeCavalry').on('click.closeCavalry', function () {
				View.control.closeImageGallery();
			});

			gallery.off('click.closeCavalryOnOverlayClick', '.cavalry__slide').on('click.closeCavalryOnOverlayClick', '.cavalry__slide', function (e) {
				if ($(e.target).closest('img').length == 0)
					View.control.closeImageGallery();
			});

			body.off('keydown.cavalryKeyboardControl').on('keydown.cavalryKeyboardControl', function (e) {
				if (body.hasClass('cavalry-open') && e.keyCode == 37)
					galleryMain.slick('slickPrev');
				else if (body.hasClass('cavalry-open') && e.keyCode == 39)
					galleryMain.slick('slickNext');
			});


			body.addClass('cavalry-open');
			/*
			 View.control.openImageGallery({
			 images: [
			 {src: 'https://placehold.it/500x300'},
			 {src: 'https://placehold.it/2000x1000'}
			 ],
			 showPreviews: true
			 })
			 */
		},

		closeImageGallery: function () {
			body.removeClass('cavalry-open');
			body.off('keydown.cavalryKeyboardControl')
		},

		// закрыть всё что открывается
		closeAll: function ()
		{
			this.closeAllDropdowns();
			this.closeMainMenu();
			this.closeMainMenuNav();
			this.closeAllMainMenuLinksGroups();
			this.closeTopSearch();
			this.closeFoldedTopSearch();
			this.closeModal();
			this.closeCatalogFilter();
			this.closeImageGallery();
		}
	};




	// инициализация
	this.init = {

		// global - инициализируется 1 раз
		global: {

			// инициализация позиционирования, не выходящего за контентную область
			tooltipPosition: function ()
			{
				var tooltips;
				var delta;
				var i;
				var containerPadding;
				var timeout = null;

				win.off('resize.setTooltipPositions').on('resize.setTooltipPositions', function ()
				{
					clearTimeout(timeout);
					timeout = setTimeout(function () {
						tooltips = $('.js-tooltip-position');
						tooltips.css('left', '');
						containerPadding = window.innerWidth > View.breakpoints['xs-max'] ? 25 : 10;
						containerPadding = window.innerWidth > View.breakpoints['sm-max'] ? 25 : containerPadding;

						for (i = 0; i < tooltips.length; i++)
						{
							delta = tooltips[i].getBoundingClientRect().left + tooltips[i].offsetWidth -
									Math.min((window.innerWidth - View.scrollBarWidth - containerPadding), (window.innerWidth - View.scrollBarWidth) / 2 + 600);

							if (delta > 1)
							{
								tooltips[i].style.left = ((parseInt(tooltips[i].style.left) || 0) - delta) + 'px';
							}
						}
					}, 100);
				}).trigger('resize.setTooltipPositions');
			},

			// клик по затемнению
			overlay: function ()
			{
				body.off('click.overlayClosesAll', '.js-overlay').on('click.overlayClosesAll', '.js-overlay', function ()
				{
					View.control.closeAll();
				});
			},

			// закрыть всё
			closeAll: function ()
			{
				body.off('click.clickToCloseAll', '.js-close-all').on('click.clickToCloseAll', '.js-close-all', function ()
				{
					View.control.closeAll();
				});
			},

			// инициализация выпадающих меню
			dropdowns: function ()
			{
				var showTimeout = null, hideTimeout = null;

				// проверка на соответствие разрешению экрана
				function checkInitBreakpoint(dropdown)
				{
					var initModeMax = dropdown.attr('data-dropdown-init-max');
					var initModeMin = dropdown.attr('data-dropdown-init-min');

					if (initModeMax)
						if (initModeMax && window.innerWidth > View.breakpoints[initModeMax + '-max'])
							return false;

					if (initModeMin)
						if (initModeMin && window.innerWidth < View.breakpoints[initModeMin + '-min'])
							return false;

					return true;
				}


				function checkFoldedState(dropdown)
				{
					if (window.innerWidth < View.breakpoints['header-menu-folding-max'] && dropdown.closest('.js-main-menu').length)
						return true;

					if (window.innerWidth < View.breakpoints['header-top-folding-max'] && dropdown.closest('.js-page-header-top').length)
						return true;

					return false;
				}


				if (View.mobileAndTabletCheck)	// на телефонах / планшетах открытие по клику
				{
					body.off('click.openDropdown', '.js-dropdown__btn').on('click.openDropdown', '.js-dropdown__btn', function (e)
					{
						var btn = $(this);
						var dropdown = btn.closest('.js-dropdown');
						var dropdownBody = dropdown.find('.js-dropdown__body');

						// если выпадалка не должна работать для этого разрешения - выход
						if (!checkInitBreakpoint(dropdown))
							return;

						// если dropdown находится в мобильном меню, не переходим по ссылке
						if (checkFoldedState(dropdown))
							e.preventDefault();

						if (btn.hasClass('open'))
						{
							View.control.closeDropdown(dropdown, btn, dropdownBody);

							$('.js-dropdown').removeClass('open');
						} else
						{
							View.control.openDropdown(dropdown, btn, dropdownBody);

							e.preventDefault();
						}
					});
				} else 	// на десктопе открытие по наведению
				{
					// при остановке мыши на выпадающем меню - открытие меню
					body.off('mousemove.openDropdown', '.js-dropdown__btn').on('mousemove.openDropdown', '.js-dropdown__btn', function ()
					{
						var btn = $(this);
						var dropdown = btn.closest('.js-dropdown');
						var dropdownBody = dropdown.find('.js-dropdown__body');

						// если меню закрыто кликом по кнопке, вручную, то не пытаемся открыть
						if (btn.hasClass('closed'))
							return;

						// если dropdown находится в мобильном меню, тоже не пытаемся открыть его
						if (checkFoldedState(btn))
							return;

						// если выпадалка не должна работать для этого разрешения - выход
						if (!checkInitBreakpoint(dropdown))
							return;

						clearTimeout(showTimeout);
						clearTimeout(hideTimeout);
						showTimeout = hideTimeout = null;


						// ждем остановки курсора
						if (!dropdown.hasClass('open'))
						{
							showTimeout = setTimeout(function ()
							{
								clearTimeout(hideTimeout);
								hideTimeout = showTimeout = null;

								View.control.openDropdown(dropdown, btn, dropdownBody);
							}, 70);
						}
					});

					// при наведении мыши на выпадающее меню - отмена скрытия меню
					body.off('mouseenter.openDropdown', '.js-dropdown__btn, .js-dropdown__body')
							.on('mouseenter.openDropdown', '.js-dropdown__btn, .js-dropdown__body', function ()
							{
								var dropdown = $(this).closest('.js-dropdown');

								// если выпадалка не должна работать для этого разрешения - выход
								if (!checkInitBreakpoint(dropdown))
									return;

								// если dropdown находится в мобильном меню, тоже не пытаемся открыть его
								if (checkFoldedState(dropdown))
									return;


								if (dropdown.hasClass('open'))
								{
									clearTimeout(hideTimeout);
									hideTimeout = null;
								}
							});

					// при уведении мыши с выпадающего меню - запуск таймера на скрытие меню
					body.off('mouseleave.closeDropdown', '.js-dropdown__btn, .js-dropdown__body')
							.on('mouseleave.closeDropdown', '.js-dropdown__btn, .js-dropdown__body', function ()
							{
								var dropdown = $(this).closest('.js-dropdown');
                $('.mmdd-alt__l1-link').removeClass('open')
								// если выпадалка не должна работать для этого разрешения - выход
								if (!checkInitBreakpoint(dropdown))
									return;

								// если dropdown находится в мобильном меню, тоже не пытаемся открыть его
								if (checkFoldedState(dropdown))
									return;


								clearTimeout(showTimeout);
								showTimeout = null;

								hideTimeout = setTimeout(function ()
								{
									View.control.closeAllDropdowns();
									hideTimeout = null;
								}, 400);
							});

					// при клике на открытый пункт меню - закрытие,
					// при повторном клике - открытие
					body.off('click.closeDropdown', '.js-dropdown__btn')
							.on('click.closeDropdown', '.js-dropdown__btn', function (e)
							{
								var btn = $(this);
								var dropdown = btn.closest('.js-dropdown');
								var dropdownBody = dropdown.find('.js-dropdown__body');

								// если выпадалка не должна работать для этого разрешения - выход
								// если выпадалка в данный момент открывается - тоже выход
								if (!checkInitBreakpoint(dropdown) || showTimeout || dropdown.hasClass('animated'))
									return;

								// если dropdown находится в мобильном меню, не переходим по ссылке
								if (checkFoldedState(dropdown))
									e.preventDefault();


								if (btn.hasClass('open') && dropdown.hasClass('open'))
								{
									View.control.closeAllDropdowns();

									btn.addClass('closed');
									dropdown.removeClass('open');
								} else
								{
									View.control.openDropdown(dropdown, btn, dropdownBody);
								}
							});
				}


				// кнопка закрытия выпадающих меню
				body.off('click.closeDropdown', '.js-dropdown__close').on('click.closeDropdown', '.js-dropdown__close', function ()
				{
					View.control.closeAllDropdowns();
				});



				// закрытие выпадающих меню при клике вне
				body.off('click.closeDropdownsOnClickOut').on('click.closeDropdownsOnClickOut', function (e)
				{
					if ($(e.target).closest('.js-dropdown').length === 0)
						View.control.closeAllDropdowns();
				});
			},

			// аккордионы
			accordions: function ()
			{
				body.off('click.toggleAccordion', '.js-accordion__bar, .text-guide dt').on('click.toggleAccordion', '.js-accordion__bar, .text-guide dt', function ()
				{
					var t = $(this);
					var accordion = t.closest('.js-accordion, .text-guide dl');
					var accordionBody = accordion.find('.js-accordion__body, dd').first();
					var accordionInitMax = accordion.attr('data-accordion-init-max');
					var accordionInitMin = accordion.attr('data-accordion-init-min');


					if (!checkAccordionInit(accordionInitMax, accordionInitMin))
						return false;


					if (accordion.hasClass('open'))
					{
						accordionBody.slideUp({
							duration: Math.max(Math.min(accordionBody.outerHeight(), 400), 200)
						});

						accordion.removeClass('open').find('.js-accordion__bar, dt').removeClass('open');
					} else
					{
						accordionBody.stop().slideDown({
							duration: Math.max(Math.min(accordionBody.outerHeight(), 400), 200),
							complete: function () {
								accordion.find('.slick-slider').slick('setPosition');
							}
						});

						accordion.addClass('open').find('.js-accordion__bar, .text-guide dt').addClass('open');
						accordion.find('.slick-slider').slick('setPosition');

						accordion.closest('.js-accordion-group').find('.js-accordion__bar.open, dt.open').not(t).trigger('click.toggleAccordion');
					}
				});


				win.off('resize.cleanUnneccessaryAccordionStyles').on('resize.cleanUnneccessaryAccordionStyles', function ()
				{
					var accordion;
					var accordionInitMin, accordionInitMax;
					var winWidth = win.width();

					$('.js-accordion').each(function ()
					{
						accordion = $(this);
						accordionInitMax = accordion.attr('data-accordion-init-max');
						accordionInitMin = accordion.attr('data-accordion-init-min');

						if (!checkAccordionInit(accordionInitMax, accordionInitMin))
						{
							accordion.find('.js-accordion__body').first().css({
								'height': '',
								'display': ''
							});
						}
					});
				});


				function checkAccordionInit(accordionInitMax, accordionInitMin)
				{
					if (accordionInitMax && window.innerWidth > View.breakpoints[accordionInitMax + '-max'])
						return false;

					if (accordionInitMin && window.innerWidth < View.breakpoints[accordionInitMin + '-min'])
						return false;

					return true;
				}
			},

			// инициализация вспомогательных скриптов для инпутов
			inputHelpers: function ()
			{
				// вввод только цифр
				body.off('change.inputHelperNumber keyup.inputHelperNumber paste.inputHelperNumber', '.js-number-input')
						.on('change.inputHelperNumber keyup.inputHelperNumber paste.inputHelperNumber', '.js-number-input', function ()
						{
							var t = $(this);
							var value = t.val();
							var oldValue = value;

							value = value.replace(/\D/g, '');

							if (oldValue !== value)
							{
								t.val(value);
							}
						});

				body.off('keydown.inputHelperNumber', '.js-number-input').on('keydown.inputHelperNumber', '.js-number-input', function (e)
				{
					var keyID = (window.event) ? event.keyCode : e.keyCode;

					if ((keyID < 48 || keyID > 57) && (keyID < 96 || keyID > 105) && keyID !== 8 && keyID !== 9 && keyID !== 46 && keyID !== 116 && keyID !== 37 && keyID !== 39 && keyID !== 13) {
						return false;
					}
				});

				// контрол цифровых инпутов

                body.off('click.inputHelperIncrease', '.js-input-increase')
                    .on('click.inputHelperIncrease', '.js-input-increase', function ()
                    {
                        var t = $(this);
                        var input=t.closest('.js-parent').find('input');
                        var value=input.val();
                        value++;
                        input.val(value);
                    });
                body.off('click.inputHelperDecrease', '.js-input-decrease')
                    .on('click.inputHelperDecrease', '.js-input-decrease', function ()
                    {
                        var t = $(this);
                        var input=t.closest('.js-parent').find('input');
                        var value=input.val();
                        if(value>0){
                            value--;
                            input.val(value);
						}

                    });
			},

			// инициализация селектов
			selects: function ()
			{
				body.off('recalcSelectAutoWidth', '.js-select').on('recalcSelectAutoWidth', '.js-select', function ()
				{
					var select = $(this);
					var selectVisual = select.closest('.js-select-visual');


					if (!select.is('.select--block, .select--embed, .select--lg, .select--md, .select--sm, .select--xs,  .select--open-type, .select--manual-width'))
					{
						selectVisual.css('display', 'inline-block');

						if (selectVisual.is(':visible'))
						{
							selectVisual
									.css('width', 'auto')
									.find('.select-list li')
									.css('white-space', 'nowrap');
							selectVisual
									.css('width', selectVisual.find('.select-list').width() + 20)
									.find('.select-list li')
									.css('white-space', '');
						}

						selectVisual.css('display', '');
					}
				});

				body.off('click.select', '.js-select-visual .select-list li')
						.on('click.select', '.js-select-visual .select-list li', function ()
						{
							var t = $(this);
							var visual = t.closest('.js-select-visual');
							var select = visual.find('select');

							if (select.hasClass('select--multiple'))
							{
								if (!t.hasClass('disabled'))
								{
									var option = select.find('option[value="' + t.attr('data-value') + '"]');
									option.prop('selected', !option.prop('selected'));
									select.trigger('change');
								}
							} else
							{
								select.val(t.attr('data-value')).trigger('change');
							}
						});

				body.off('click.openSelect', '.js-select-visual').on('click.openSelect', '.js-select-visual', function (e)
				{
					if (View.mobileAndTabletCheck)
						return;

					var t = $(this);

					if (!t.hasClass('select--multiple') || $(e.target).closest('.select-list').length === 0)
					{
						$('.js-select-visual.open').not(t).removeClass('open');
						t.toggleClass('open');
					}
				});

				body.off('change.changeSelectVisual', '.js-select').on('change.changeSelectVisual', '.js-select', function (e, params)
				{
					var select = $(this);
					var visual = select.closest('.js-select-visual');
					var value = visual.find('.js-select-value');
					var selectedOptions = select.find('option:selected');
					visual.find('li').removeClass('active');

					if (params && params.keepPlaceholderState)
						selectedOptions = selectedOptions.filter('[selected]');

					selectedOptions.each(function ()
					{
						visual.find('li[data-value="' + this.value + '"]').addClass('active');
					});

					if (!params || !params.keepPlaceholderState)
						visual.removeClass('placeholder-state');

					if (select.hasClass('select--multiple'))
					{
						var selectedTxt = select.attr('data-selected-txt') || select.val();
						var addCount = select.attr('data-add-count');


						if (selectedOptions.length > 1)
							value.html(selectedTxt + ' ' + (addCount ? selectedOptions.length : ''));
						else
							value.html(selectedOptions.html());

						if (visual.hasClass('has-placeholder') && selectedOptions.length === 0)
							visual.addClass('placeholder-state');
					} else
					{
						value.html(visual.find('li[data-value="' + select.val() + '"]').html());
					}
				});

				body.off('keyup.accessibilityClick', '.js-select-visual, .js-select-visual li')
						.on('keyup.accessibilityClick', '.js-select-visual, .js-select-visual li', function (e)
						{
							if (e.which == 13 || e.which == 32)
								$(this).trigger('click');
						});

				body.off('click.closeSelects').on('click.closeSelects', function (e)
				{
					var target = $(e.target);

					if (target.closest('.js-select-visual, select').length === 0)
					{
						$('.js-select-visual.open').removeClass('open');
					}
				});


				body.off('updateSelect', 'select.js-select')
						.on('updateSelect', 'select.js-select', function ()
						{
							$(this).trigger('change.changeSelectVisual').trigger('recalcSelectAutoWidth');
						});
			},

			// ввод файла
			fileInput: function ()
			{
				body.off('change.fileInput', '.js-file-input__input').on('change.fileInput', '.js-file-input__input', function ()
				{
					var input = $(this);

					if (this.files && this.files[0])
					{
						var fileInput = input.closest('.js-file-input__cont, .js-file-input');
						var strValues = '<div class="file-input__values-item js-file-input__values-item">' +
								'<div class="file-input__value">' +
								'<span class="file-input__value-name">' + this.files[0].name + '</span>' +
								' ' +
								'<span class="file-input__value-remove js-file-input__remove">' + (fileInput.attr('data-remove-txt') || 'Удалить') + '</span>' +
								'<span class="file-input__value-icon">' +
								'<svg class="file-input__value-icon-inner svg-icon"><use xlink:href="/local/images/sprite.svg#svg-icon-clip"></use></svg>' +
								'</span>' +
								'</div>' +
								'</div>';

						if (input.closest('.js-file-input--multiple').length)
						{
							fileInput.find('.js-file-input__values').append(strValues);
						} else
						{
							fileInput.find('.js-file-input__values').html(strValues);
						}

						fileInput
								.find('.js-file-input__values-item')
								.last()
								.append(input);
						fileInput.find('.js-file-input__btn')
								.prepend('<input type="file" name="' + input[0].name + '" class="hidden js-file-input__input" ' + (input[0].multiple ? 'multiple' : '') + '>');
					}
				});


				body.off('click.fileInputRemove', '.js-file-input__remove').on('click.fileInputRemove', '.js-file-input__remove', function ()
				{
					$(this).closest('.js-file-input__values-item').remove();
				});
			},

			scrollUp: function ()
			{
				body.off('click.scrollPageUp', '.js-scroll-up').on('click.scrollPageUp', '.js-scroll-up', function ()
				{
					htmlbody.stop().animate({scrollTop: 0}, Math.min(win.scrollTop(), 800));
				});


				var checkScrollTimeout = null;
				var pageScrolledEnough = win.scrollTop() > 600;
				body.toggleClass('page-scrolled', pageScrolledEnough);

				win.off('scroll.toggleUpBtn').on('scroll.toggleUpBtn', function ()
				{
					if (checkScrollTimeout)
						return;

					checkScrollTimeout = setTimeout(checkScrollLevel, 200);
				});

				function checkScrollLevel()
				{
					if (pageScrolledEnough && win.scrollTop() < 600)
					{
						pageScrolledEnough = false;
						body.removeClass('page-scrolled');
					} else if (!pageScrolledEnough && win.scrollTop() > 600)
					{
						pageScrolledEnough = true;
						body.addClass('page-scrolled');
					}
					checkScrollTimeout = null;
				}
			},

			// подскролл
			anchor: function ()
			{
				body.off('click.scrollToAnchor', '.js-anchor').on('click.scrollToAnchor', '.js-anchor', function (e)
				{
					var t = $(this);
					var target = t.attr('data-target');
					var additionalOffset = 0;

					target = target ? $(target) : $(t.attr('href'));

					if (target.length === 0)
					{
						console.warn('js-anchor: wrong data-target or href', t);
						return;
					}

					if (t.hasClass('js-anchor--center') && target.outerHeight() < window.innerHeight - 120)
					{
						additionalOffset = (window.innerHeight - target.outerHeight()) / 2;
					}


					// отмена стандартного поведения ссылок с якорем, если анимированный скролл не потребуется
					if (target.offset().top - additionalOffset === win.scrollTop())
						e.preventDefault();

					htmlbody.animate({scrollTop: target.offset().top - additionalOffset}, Math.min(900, Math.abs(win.scrollTop() - (target.offset().top - additionalOffset)) * 0.8));
				});
			},

			mainMenu: function ()
			{
				body.off('click.openMainMenu', '.js-open-main-menu').on('click.openMainMenuNav', '.js-open-main-menu', function ()
				{
					View.control.openMainMenu();
				});

				body.off('click.closeMainMenu', '.js-close-main-menu').on('click.closeMainMenuNav', '.js-close-main-menu', function ()
				{
					View.control.closeMainMenu();
				});


				body.off('click.openMainMenuNav', '.js-open-main-menu-nav').on('click.openMainMenuNav', '.js-open-main-menu-nav', function ()
				{
					View.control.openMainMenuNav();
				});

				body.off('click.closeMainMenuNav', '.js-close-main-menu-nav').on('click.closeMainMenuNav', '.js-close-main-menu-nav', function ()
				{
					View.control.closeMainMenuNav();

					if (window.innerWidth < View.breakpoints['header-menu-folding-max'] && window.innerWidth > View.breakpoints['header-top-folding-max'])
						View.control.closeMainMenu();
				});


				body.off('click.openMainMenuLinksGroup', '.js-main-menu-links__item')
						.on('click.openMainMenuLinksGroup', '.js-main-menu-links__item', function (e)
						{
							if (window.innerWidth > View.breakpoints['header-menu-folding-max'])
								return;

							var item = $(this);
							var group = item.closest('.js-main-menu-links__group');
							var closestSub = item.closest('.js-main-menu-links__group-sub');
							var sub = group.find('.js-main-menu-links__group-sub');

							if (!closestSub.length && sub.length)
							{
								sub.addClass('open');
								e.preventDefault();
							}
						});

				body.off('click.closeMainMenuLinksGroup', '.js-main-menu-links__group-sub-close')
						.on('click.closeMainMenuLinksGroup', '.js-main-menu-links__group-sub-close', function ()
						{
							View.control.closeAllMainMenuLinksGroups();
						});


				body.off('mouseenter.goToMainMenuBookmark', '.js-main-menu-links__bookmark')
						.on('mouseenter.goToMainMenuBookmark', '.js-main-menu-links__bookmark', function () {
							var t = $(this);
							var menuItem = t.closest('.js-main-menu-item');
							var col = menuItem.find('.js-main-menu-bookmarked-col');
							var target = menuItem.find('.js-main-menu-links__group[data-bookmark="' + t.attr('data-bookmark') + '"]');

							col.stop().animate({scrollTop: target.offset().top - col.offset().top + col.scrollTop()}, 100);
						});
			},

			mainMenuDDalt: function ()
			{
				function isMenuFolded()
				{
					return window.innerWidth <= View.breakpoints['header-menu-folding-max'];
				}


				body.off('click.toggleMMDDl2item', '.js-mmdd-alt__l2-link-toggle').on('click.toggleMMDDl2item', '.js-mmdd-alt__l2-link-toggle', function ()
				{
					var item = $(this).closest('.js-mmdd-alt__l2-item');

					if (isMenuFolded()) {
						item.toggleClass('open');
						console.log('folded')
					} else {
						console.log('not')
						if (item.hasClass('open')) {
							item.removeClass('open').find('.js-mmdd-alt__l3').stop().show().slideUp(300, function () {
								item.addClass('initialized');
							});
						} else {
							item.addClass('open').find('.js-mmdd-alt__l3').stop().hide().slideDown(300, function () {
								item.addClass('initialized');
							});
						}
					}
				});


				body.off('click.closeMMDDl2', '.js-close-mmdd-l2, .js-close-mmdd-l3').on('click.closeMMDDl2', '.js-close-mmdd-l2, .js-close-mmdd-l3', function ()
				{
					$(this).closest('.js-mmdd-alt__l2-group, .js-mmdd-alt__l2-item').removeClass('open');
				});

				var menuTimeout;
				body.off('mouseenter.toggleMMDDl1 click.toggleMMDDl1', '.js-mmdd-alt__l1-link').on('mouseenter.toggleMMDDl1 click.toggleMMDDl1', '.js-mmdd-alt__l1-link', function (e)
				{
                    clearTimeout(menuTimeout);
                    var t=$(this);
                    menuTimeout = setTimeout(function(){

					if ((View.mobileAndTabletCheck || isMenuFolded()) && e.type == 'mouseenter')
						return;

					if ((View.mobileAndTabletCheck || isMenuFolded()) && e.type == 'click' && $(this).hasClass('js-mmdd-alt__l1-link--w-sub'))
						e.preventDefault();



                        $('.js-mmdd-alt__l1-link, .js-mmdd-alt__l2-group').removeClass('open').filter('[data-menu="' + t.attr('data-menu') + '"]').addClass('open');
					}, 300);


				});
                body.off('mouseleave.toggleMMDDl1', '.js-main-menu-item').on('mouseleave.toggleMMDDl1', '.js-main-menu-item', function (e)
                {
                    clearTimeout(menuTimeout);
                    menuTimeout = setTimeout(function(){
                        $('.js-mmdd-alt__l1-link, .js-mmdd-alt__l2-group').removeClass('open');
                    }, 300);
                                    });
                body.off('mouseenter.toggleMMDDl1', '.js-mmdd-alt__l2').on('mouseenter.toggleMMDDl1', '.js-mmdd-alt__l2', function (e)
                {
                    clearTimeout(menuTimeout);
                                    });
			},

			topSearch2: function ()
			{
				body.off('click.openTopSearch2', '.js-top-search-box').on('click.openTopSearch2', '.js-top-search-box', function (e)
				{
					if (!body.hasClass('top-search-open') && !$(e.target).closest('.js-close-top-search').length)
						View.control.openTopSearch();
				});

				body.off('click.closeTopSearch2', '.js-close-top-search').on('click.closeTopSearch2', '.js-close-top-search', function ()
				{
					View.control.closeTopSearch();
				});
			},

			topSearch: function ()
			{
				body.off('click.openTopSearch', '.js-open-top-search').on('click.openTopSearch', '.js-open-folded-top-search', function ()
				{
					View.control.openFoldedTopSearch();
				});

				body.off('click.openTopSearch', '.js-close-top-search').on('click.openTopSearch', '.js-close-folded-top-search', function ()
				{
					View.control.closeFoldedTopSearch();
				});
			},

			catalogFilter: function ()
			{
				body.off('click.openCatalogFilter', '.js-open-catalog-filter')
						.on('click.openCatalogFilter', '.js-open-catalog-filter', function ()
						{
							View.control.openCatalogFilter();
						});


				body.off('click.closeCatalogFilter', '.js-close-catalog-filter')
						.on('click.closeCatalogFilter', '.js-close-catalog-filter', function ()
						{
							View.control.closeCatalogFilter();
						});
			},

			scrollUp: function ()
			{
				var scrolledEnough = false;
				var scrollTop;

				win.off('scroll.markScrolledEnough').on('scroll.markScrolledEnough', function () {
					scrollTop = win.scrollTop();
					if (!scrolledEnough && scrollTop > 600)
					{
						body.addClass('scrolled-enough');
						scrolledEnough = true;
					} else if (scrolledEnough && scrollTop < 600)
					{
						body.removeClass('scrolled-enough');
						scrolledEnough = false;
					}
				});


				body.off('click.scrollUp', '.js-scroll-up')
						.on('click.scrollUp', '.js-scroll-up', function ()
						{
							htmlbody.animate({scrollTop: 0}, Math.min(win.scrollTop() / 2, 600));
						});
			},

			modal: function ()
			{
				body.off('click.openModalOnClick', '.js-open-modal').on('click.openModalOnClick', '.js-open-modal', function ()
				{
					var t = $(this);
					var modalUrl = t.attr('data-modal-url');

					if (modalUrl)
						View.control.openModalByUrl(modalUrl);
				});


				body.off('click.closeModalOnClick', '.js-close-modal').on('click.closeModalOnClick', '.js-close-modal', function ()
				{
					View.control.closeModal();
				});
			},

			escape: function () {
				$(document).keyup(function (e)
				{
					if (e.keyCode == 27)
					{
						View.control.closeAll();
					}
				});
			},

			hlBookmarks: function () {
				body.off('click.goToBookmarkAndHlIt', '.js-hl-bookmarks__link')
						.on('click.goToBookmarkAndHlIt', '.js-hl-bookmarks__link', function (e) {
							var t = $(this);
							var bookmark = t.attr('href');
							var target;

							if (bookmark)
								bookmark = bookmark.replace('#', '');
							else
								bookmark = t.attr('data-bookmark');

							target = t.closest('.js-hl-bookmarks').find('.js-hl-bookmarks__target[data-bookmark="' + bookmark + '"]');

							htmlbody.animate({scrollTop: target.offset().top - 20}, 300);

							target.addClass('hl-bookmark-active');

							setTimeout(function () {
								target.removeClass('hl-bookmark-active');
							}, 600);

							e.preventDefault();
						});
			},

			loadSvgSprite: function ()
			{
				$.ajax({
					url: '/local/images/sprite.svg',
					method: 'GET',
					dataType: 'text'
				}).done(function (response)
				{
					body.prepend(response);
				});
			},

			scrollXfix: function ()
			{
				var timeout = null;
				win.off('resize.scrollXfix').on('resize.scrollXfix', function ()
				{
					clearTimeout(timeout);
					setTimeout(fix, 300);
				});

				function fix()
				{
					htmlbody.scrollLeft(0);
				}
			},
            dependedHeight: function ()
            {
                var timeout = null;
                var localHeight=0;
                win.off('resize.js-depend-height').on('resize..js-depend-height', function ()
                {
                	var t = $(this);
                    clearTimeout(timeout);
                    setTimeout(function(){
						var target=t.data('tareget');
						var height=t.height();
						if(height>localHeight){
                            localHeight=height;
                            $('.'+target).height(height);
						}

                    }, 300);
                });
            }


		},

		// local - требует переинициализации после перезагрузки DOM
		local: {

			// инициализация маски ввода для телефонов
			maskInput: function (scope)
			{
				$('.js-mask-input', scope).not('.is-stl').each(function ()
				{
					$(this).inputmask({showMaskOnHover: false}).addClass('is-stl');
				});

				$(".js-mask-input--phone", scope).inputmask(View.inputmaskPresets.phone);
				$(".js-mask-input--date", scope).inputmask(View.inputmaskPresets.date);
				$(".js-mask-input--passport-num", scope).inputmask(View.inputmaskPresets.passportNumber);
				$(".js-mask-input--passport-id", scope).inputmask(View.inputmaskPresets.passportId);
			},

			// табы табы табы
			tabs: function (scope)
			{
				$('.js-tabs__label', scope).off('click.openTab').on('click.openTab', function ()
				{
					var t = $(this);

					if (t.hasClass('open'))
						return;

					var tabID = t.attr('data-tab');
					var tabs = t.closest('.js-tabs, body');
					var tab = tabs.find('.js-tabs__tab[data-tab="' + tabID + '"]');

					tabs.find('.js-tabs__tab, .js-tabs__label').removeClass('open');
					t.addClass('open');
					tab.addClass('open');

					if (tabs.find('.js-to-max-height').length > 0)
					{
						$(window).trigger('resize');
					}

					tabs.find('.slick-slider').slick('setPosition');

					// запоминать состояние вкладки
					if (tabs.hasClass('js-tabs--use-hash'))
					{
						if (history.pushState)
						{
							history.pushState(null, null, '#' + tabID);
						} else
						{
							location.hash = '#' + tabID;
						}
					}

					win.trigger('resize.setTooltipPositions');

				});


				// альтернативный способ переключения табов. Подходит всё, что имеет value и событие change
				$('.js-alt-tab-controller', scope).off('change.changeTab').on('change.changeTab', function ()
				{
					var t = $(this);
					var tabs = t.closest('.js-tabs');

					tabs.find('.js-tabs__tab, .js-tabs__label').removeClass('open');
					tabs.find('.js-tabs__tab[data-tab="' + t.val() + '"], .js-tabs__label[data-tab="' + t.val() + '"]').addClass('open');

					if (tabs.find('.js-to-max-height').length > 0)
					{
						win.trigger('resize');
					}

					tabs.find('.slick-slider').slick('setPosition');
				});


				// переключать вкладку по клику на элемент внутри нее. Вызывает клик на js-tab-label, поэтому вкладки табов тоже переключатся
				$('.js-switch-to-tab', scope).off('click.switchToTab').on('click.switchToTab', function ()
				{
					var t = $(this);

					t.closest('.js-tabs').find('.js-tabs__label[data-tab="' + t.attr('data-tab') + '"]').trigger('click');
				});


				// переключние табов по хэшу url
				$('.js-tabs--use-hash .js-tabs__label[data-tab="' + location.hash.slice(1) + '"]', scope).trigger('click');
			},

			// инициализация селектов
			selectsLocal: function (scope)
			{
				var selects = $(scope);
				if (!selects.is('select'))
					selects = $('select.js-select', scope);

				selects.each(function ()
				{
					var select = $(this);
					var selectVisual = select.closest('.js-select-visual');
					var selectList;
					var selectChevron;
					var defaultText = select.attr('data-placeholder-txt');
					var selectedText;
					var placeholderState = select.find('option[selected]').length === 0 && defaultText ? true : false;
					var labelTxt = select.attr('data-label-txt');
					var multiple = this.multiple

					selectedText = select.find('option:selected');

					if (selectedText.length > 0)
					{
						if (selectedText.attr('data-img'))
							selectedText = '<img src="' + selectedText.attr('data-img') + '" alt="">' + selectedText.html();
						else
							selectedText = selectedText.html();
					} else
					{
						selectedText = select.find('option:first-child').html();
					}

					if (selectVisual.length)
					{
						selectVisual.children().not(select).remove();
						select.unwrap('.js-select-visual');
					}

					selectVisual = $('<div class="js-select-visual ' + select.attr('class') + '" tabindex="0"></div>');
					selectValue = $('<span class="select-value js-select-value">' + selectedText + '</span>');
					selectChevron = $('<svg class="select-chevron svg-icon svg-icon--dd-arrow"></svg>');
					selectList = $('<ul class="select-list"></ul>');

					var option;
					var optionContent;
					var optionImg;
					var optionClass;
					select.find('option').each(function ()
					{
						option = $(this);
						optionContent = option.html();
						optionImg = option.attr('data-img');
						optionClass = 'class="';
						optionValue = option.attr('value');

						if (!optionValue)
							return;

						if (option.attr('value') === select.val() && !placeholderState)
							optionClass += 'active ';
						if (option.is(':disabled'))
							optionClass += 'disabled ';

						optionClass += '"';


						if (optionImg)
							optionContent = '<img src="' + optionImg + '" alt="">' + optionContent;

						selectList.append(
								'<li data-value="' + optionValue + '" ' + optionClass + 'tabindex="0">' + optionContent + '</li>');
					});

					selectVisual.append(selectValue).append(selectChevron).append(selectList).removeClass('js-select js-alt-tab-controller');
					select.after(selectVisual);
					selectVisual.prepend(select);

					if (multiple)
					{
						select.addClass('select--multiple');
						selectVisual.addClass('select--multiple');
					}

					if (labelTxt)
					{
						selectVisual.prepend('<span class="select-label-txt">' + labelTxt + '</span>');
					}

					if (defaultText)
					{
						selectVisual.addClass('has-placeholder');
						selectVisual.prepend('<span class="select-placeholder">' + defaultText + '</span>');

						if (placeholderState)
						{
							selectVisual.addClass('placeholder-state');
							selectVisual.find('.js-select-value').html('');
						}
					}
				}).trigger('change.changeSelectVisual', [{keepPlaceholderState: true}]).trigger('recalcSelectAutoWidth');
			},

			mainMenuLocal: function () {
				$('.js-main-menu-bookmarked-col').off('scroll.markMainMenuBookmark').on('scroll.markMainMenuBookmark', function () {
					var t = $(this);
					var bookmarks = t.find('.js-main-menu-links__group[data-bookmark]');
					var scrollTop = t.scrollTop();
					var activeBookmark = bookmarks.first();
					var currentBookmark;

					bookmarks.each(function () {
						currentBookmark = $(this);
						if (currentBookmark.offset().top - t.offset().top > 0)
							return false;

						activeBookmark = currentBookmark;
					});

					t.closest('.js-main-menu-item')
							.find('.js-main-menu-links__bookmark')
							.removeClass('active')
							.filter('[data-bookmark="' + activeBookmark.attr('data-bookmark') + '"]')
							.addClass('active')
				});
			},

			tooltipPositionLocal: function ()
			{
				win.trigger('resize.setTooltipPositions');
			},

			textGuides: function (scope)
			{
				$('.text-guide table', scope).not('.text-guide .table-scroller table').each(function ()
				{
					$(this).wrap('<div class="table-scroller"></div>');
				});
			}
		}
	};



	this.initView = function ()
	{
		body = $(document.body);
		htmlbody = $([document.documentElement, document.body]);
		win = $(window);

		this.scrollBarWidth = (function ()
		{
			var outer = document.createElement("div");
			outer.style.visibility = "hidden";
			outer.style.width = "100px";
			outer.style.msOverflowStyle = "scrollbar";

			document.body.appendChild(outer);

			var widthNoScroll = outer.offsetWidth;
			// force scrollbars
			outer.style.overflow = "scroll";

			// add innerdiv
			var inner = document.createElement("div");
			inner.style.width = "100%";
			outer.appendChild(inner);

			var widthWithScroll = inner.offsetWidth;

			// remove divs
			outer.parentNode.removeChild(outer);

			return widthNoScroll - widthWithScroll;
		})();

		View.viewInitialized = true;

		if (!View.allInitialized && View.viewInitialized && View.globalInitialized && View.localInitialized)
		{
			View.allInitialized = true;
			doc.trigger('viewReady');
		}
	}



	this.initAllGlobal = function ()
	{
		$.each(View.init.global, function (index, fn)
		{
			if (typeof fn === 'function')
				fn();
		});

		View.globalInitialized = true;

		if (!View.allInitialized && View.viewInitialized && View.globalInitialized && View.localInitialized)
		{
			View.allInitialized = true;
			doc.trigger('viewReady');
		}
	};



	this.initAllLocal = function (scope)
	{
		$.each(View.init.local, function (index, fn)
		{
			if (typeof fn === 'function')
				fn(scope);
		});

		View.localInitialized = true;

		if (!View.allInitialized && View.viewInitialized && View.globalInitialized && View.localInitialized)
		{
			View.allInitialized = true;
			doc.trigger('viewReady');
		}
        $('.no-touch .js-nicescroll').niceScroll({
			railvalign: 'top',
			railpadding: { top: -190, right: 0, left: 0, bottom: 0 },
            autohidemode: false,
            cursorcolor: "#505050",
            cursoropacitymin: 0.3,
            cursoropacitymax: 0.3,
		});
	};
})();



// run callback when document is ready and View is initialized
// usage: $(document).viewReady(function(){...})
$.fn.viewReady = function (callback)
{
	if (View && View.allInitialized)
		callback();
	else
		$(document).on('viewReady', callback);
}


// run callback when document is ready and reactive core are initialized
// usage: $(document).coreReady(function(){...})
$.fn.coreReady = function (callback)
{
	if (View && View.coreInitialized)
		callback();
	else
		$(document).on('coreReady', callback);
}


// run callback when document is ready, View and reactive core are initialized
// usage: $(document).appReady(function(){...})
$.fn.appReady = function (callback)
{
	if (View && View.allInitialized && View.coreInitialized)
		callback();
	else if (View.allInitialized)
		$(document).on('coreReady', callback);
	else
		$(document).viewReady(function ()
		{
			if (View.coreInitialized)
				callback();
			else
				$(document).on('coreReady', callback);
		});
}



$(document).ready(function ()
{
	var body = $(document.body);

	var iOS = parseInt(
			('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
			.replace('undefined', '3_2').replace('_', '.').replace('_', '')
			) || false;

	View.isIOS = !!iOS;

	body.add($('html')).addClass(iOS ? ('ios ios-' + iOS) : 'no-ios');
	body.addClass(View.mobileAndTabletCheck ? 'touch' : 'no-touch');
	body.addClass(View.isIE ? 'ie ie-' + View.isIE : 'no-ie');
	body.addClass('sticky-supported', View.featureTest('position', ['-webkit-sticky', 'sticky']));
	//if(View.isIE)
	//	svg4everybody();

	View.initView();
	View.initAllGlobal();


	if(window.innerWidth < 600){
		setTimeout(function () {
		    var btnCall = $('.contact-info-btns').clone();
			$('footer').append(btnCall.addClass('contact-info-mobile-bottom'));
		}, 2000)
	}
});




$(document).coreReady(function ()
{
	var body = $(document.body);

	View.initAllLocal(body);
	body.on("onAjaxReload.initAllLocal", View.initAllLocal);
	body.addClass('page-loaded');

	body.scrollLeft(0);

	setTimeout(function () {
		body.scrollLeft(0);
	}, 300);
});

function counter(n, koren, okonch) {
	n = parseInt(n);
	koren = koren || 'товар';
	okonch = okonch || ["", "а", "ов"];
	var str = "";
	//Сразу узнаем остатки от деления
	//на 10 и 100, чтобы не вычислять
	//при каждом сравнении:
	var nmod10 = n % 10;
	var nmod100 = n % 100;
	// Случай 1.
	if (!n) {
		return koren + okonch[2];
	} else if ((n == 1) || (nmod10 == 1 && nmod100 != 11)) {
		str = koren + okonch[0];
	} else if ((nmod10 > 1) && (nmod10 < 5) && (nmod100 != 12 && nmod100 != 13 && nmod100 != 14)) {
		str = koren + okonch[1];
	}
	// Случай 4. Все остальные варианты.
	else {
		str = koren + okonch[2];
	}
	return str;
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


/*
 * Работа с урлами
 */
;
eval(function (p, a, c, k, e, r) {
	e = function (c) {
		return(c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--)
			r[e(c)] = k[c] || e(c);
		k = [function (e) {
				return r[e]
			}];
		e = function () {
			return'\\w+'
		};
		c = 1
	}
	;
	while (c--)
		if (k[c])
			p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}(';5 V=(8(){"1D 1B";5 j={o:\'o\',E:\'1y\',m:\'m\',p:\'1x\',q:\'1v\',t:\'t\'},19={"1u":1t,"1q":1n,"1m":11,"1k":18,"1j":11,"1i":18},S=8(a,b){5 d=1h,O=d.1f(\'a\'),b=b||d.17.J,L=b.r(/\\/\\/(.*?)(?::(.*?))?@/)||[];O.J=b;w(5 i N j){a[i]=O[j[i]]||\'\'}a.o=a.o.l(/:$/,\'\');a.q=a.q.l(/^\\?/,\'\');a.t=a.t.l(/^#/,\'\');a.x=L[1]||\'\';a.y=L[2]||\'\';a.m=(19[a.o]==a.m||a.m==0)?\'\':a.m;9(!a.o&&!/^([a-z]+:)?\\/\\//.1d(b)){5 c=T V(d.17.J.r(/(.*\\/)/)[0]),A=c.p.X(\'/\'),B=a.p.X(\'/\');A.W();w(5 i=0,C=[\'o\',\'x\',\'y\',\'E\',\'m\'],s=C.Z;i<s;i++){a[C[i]]=c[C[i]]}10(B[0]==\'..\'){A.W();B.1c()}a.p=(b.1p(0,1)!=\'/\'?A.13(\'/\'):\'\')+\'/\'+B.13(\'/\')}G{a.p=a.p.l(/^\\/?/,\'/\')}14(a)},15=8(s){s=s.l(/\\+/g,\' \');s=s.l(/%([1b][0-v-F])%([P][0-v-F])%([P][0-v-F])/g,8(a,b,c,d){5 e=u(b,16)-1e,H=u(c,16)-K;9(e==0&&H<1g){k a}5 f=u(d,16)-K,n=(e<<12)+(H<<6)+f;9(n>1l){k a}k I.R(n)});s=s.l(/%([1o][0-v-F])%([P][0-v-F])/g,8(a,b,c){5 d=u(b,16)-1a;9(d<2){k a}5 e=u(c,16)-K;k I.R((d<<6)+e)});s=s.l(/%([0-7][0-v-F])/g,8(a,b){k I.R(u(b,16))});k s},14=8(g){5 h=g.q;g.q=T(8(c){5 d=/([^=&]+)(=([^&]*))?/g,r;10((r=d.1r(c))){5 f=1s(r[1].l(/\\+/g,\' \')),M=r[3]?15(r[3]):\'\';9(4[f]!=1w){9(!(4[f]D Y)){4[f]=[4[f]]}4[f].1z(M)}G{4[f]=M}}4.1A=8(){w(f N 4){9(!(4[f]D U)){1C 4[f]}}};4.Q=8(){5 s=\'\',e=1E;w(5 i N 4){9(4[i]D U){1F}9(4[i]D Y){5 a=4[i].Z;9(a){w(5 b=0;b<a;b++){s+=s?\'&\':\'\';s+=e(i)+\'=\'+e(4[i][b])}}G{s+=(s?\'&\':\'\')+e(i)+\'=\'}}G{s+=s?\'&\':\'\';s+=e(i)+\'=\'+e(4[i])}}k s}})(h)};k 8(a){4.Q=8(){k((4.o&&(4.o+\'://\'))+(4.x&&(4.x+(4.y&&(\':\'+4.y))+\'@\'))+(4.E&&4.E)+(4.m&&(\':\'+4.m))+(4.p&&4.p)+(4.q.Q()&&(\'?\'+4.q))+(4.t&&(\'#\'+4.t)))};S(4,a)}}());', 62, 104, '||||this|var|||function|if|||||||||||return|replace|port||protocol|path|query|match||hash|parseInt|9A|for|user|pass||basePath|selfPath|props|instanceof|host||else|n2|String|href|0x80|auth|value|in|link|89AB|toString|fromCharCode|parse|new|Function|Url|pop|split|Array|length|while|80||join|parseQs|decode||location|443|defaultPorts|0xC0|EF|shift|test|0xE0|createElement|32|document|wss|ws|https|0xFFFF|http|70|CD|substring|gopher|exec|decodeURIComponent|21|ftp|search|null|pathname|hostname|push|clear|strict|delete|use|encodeURIComponent|continue'.split('|'), 0, {}));



function SocialPopup(url, width, height)
{
	var w, h;
	if ((navigator.userAgent.toLowerCase().indexOf('opera') != -1))
	{
		w = document.body.offsetWidth;
		h = document.body.offsetHeight;
	} else
	{
		w = screen.width;
		h = screen.height;
	}
	return window.open(url, '', 'status=no,scrollbars=yes,resizable=yes,width=' + width + ',height=' + height + ',top=' + Math.floor((h - height) / 2 - 14) + ',left=' + Math.floor((w - width) / 2 - 5));
}
