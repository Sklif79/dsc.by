<template>
	<div class="catalog-item-3">
		<div class="catalog-item-3__box">
			<div class="catalog-item-3__header">
				<div class="catalog-item-3__header-main">

					<h1 class="catalog-item-3__title" v-if="currentOffer && currentOffer.name">{{currentOffer.name}}1111</h1>

					<div class="catalog-item-3__subtitle">
						<div class="left catalog-item-3__subtitle-line">
                                                    <div class="catalog-item-product_rate"  v-if="product ">
								<div v-if="starscnt" class="catalog-item-3__rate-star" v-for="n in Math.floor(starscnt)">
									<img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled">
								</div>
								<div v-if="starscnt" class="catalog-item-3__rate-star" v-for="n in (5-Math.floor(starscnt))">
									<img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty">
								</div>
                                                    </div>
							<div class="catalog-item-3__subtitle-art">Отзывы: {{comments.length}}</div>
							<div class="catalog-item-3__subtitle-art " v-if="currentOfferId && currentOffer.code">Артикул: {{currentOffer.code}}</div>
							<div class="catalog-item-3__subtitle-art " v-if="(!currentOfferId || !currentOffer.code) && product.code">Артикул: {{product.code}}</div>
						</div>
						<div class="right">
							<label class="checkbox checkbox--compare"  >
								<input type="checkbox" class="checkbox-row__input" :checked="product.incompare" v-on:change="compare">
								<span class="checkbox__visual checkbox-row__visual"></span>
								<span class="checkbox__text">Сравнить</span>
							</label>
						</div>
					</div>

				</div>

			</div>

			<div class="catalog-item-3__main">
				<div class="catalog-item-3__main-gallery">
					<div class="product__discount product-detail__discount" v-if="product.discount"><span>-{{product.discount}}%</span> </div>
					<div class="catalog-item-3__status" v-if="currentOffer.status">
						<div class="status-group">
							<div class="status" :class="statusItem.class" v-for="statusItem in currentOffer.status">{{statusItem.name}}</div>
						</div>
					</div>

					<image-gallery ref="imageGallery" v-if="computedGallery && computedGallery.length"
								   :gallery="computedGallery" mode="horizontal"
								   :zoom="true" :zoom-viewer-width="zoomViewerWidth" :zoom-viewer-height="zoomViewerHeight"
								   @zoomActivated="zoomActivated" @zoomDeactivated="zoomDeactivated">

					</image-gallery>
					<div class="catalog-item-3__no-photo-box" v-else>
						<div class="catalog-item-3__no-photo-box-inner">
							<svg class="svg-icon"><use xlink:href="#svg-icon-no-photo"></use></svg>
						</div>
					</div>
					<div class="catalog-item-3__zoom-box js-catalog-item-zoom-box" :class="{active: zoomActive && zoomImageSrc}" slot="zoombox">
						<img :src="zoomImageSrc" alt="" class="catalog-item__zoom-box-img"
							 :style="{'transform': 'translate3d('+zoomMoveX+'%,'+zoomMoveY+'%,0)', '-webkit-transform': 'translate('+zoomMoveX+'%,'+zoomMoveY+'%)'}">
					</div>



				</div>


				<div class="catalog-item-3__main-base">
					<div class="catalig-item-3__block-title">Характеристики</div>

					<div class="catalog-item-3__top-params flc" v-if="currentOffer && currentOffer.params && currentOffer.params.length || product.adminLink || product && product.brand">
						<ul class="dot-line-list">
							<li class="dot-line-list__item dot-line-row dot-line-row--bottom-dashed" v-if="product.adminLink">
								<div class="dot-line-row__start c-gray-dark"><a target="_blank" :href="product.adminLink">Товар в админке</a></div>
							</li>
							<li class="dot-line-list__item dot-line-row dot-line-row--bottom-dashed" v-if="product && product.brand">
								<div class="dot-line-row__start c-gray-dark">
									Бренд
								</div>
								<div class="dot-line-row__end">
									{{product.brand}}
								</div>
							</li>
							<li class="dot-line-list__item dot-line-row dot-line-row--bottom-dashed" v-for="prop in currentOffer.params">
								<div class="dot-line-row__start c-gray-dark">
									<span>{{prop.name}}</span>
									<div class="inline-tooltip inline-tooltip--xs-text dropdown-owner dropdown-arrow-owner js-dropdown" v-if="prop.descr">
										<svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"><use xlink:href="#svg-icon-tooltip"></use></svg>
										<div class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position">
											<div class="text-guide text-guide-decore" v-html="prop.descr"></div>
										</div>
									</div>
								</div>
								<div class="dot-line-row__end">
									<a v-if="prop.link" :href="prop.link" class="link--like-text link--undecorated">{{prop.value}}</a>
									<span v-else>{{prop.value}}</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="catalog-item-3__top-params-actions flc">

						<span class="inline-separator" v-if="similarBlockPresent"></span>
						<a href="#similar" class="link link--local js-anchor" v-if="similarBlockPresent">Аналоги</a>
					</div>





				</div>



				<div class="catalog-item-3__main-aside" >
					<div class="catalog-main-aside__line catalog-main-aside__line--top">
						<strike v-if="product.priceOld">{{product.priceOld | formatPrice}} р.<span class="price__units" v-if="currentOffer.unit==='disable'"> / {{currentOffer.unit}} </span></strike>
						<!--<strike v-else><span class="catalog-main-aside__oldprice">9 876 </span> <span class="price__units" v-if="currentOffer.unit">руб. / {{currentOffer.unit}} </span></strike>-->
						<div class="catalog-item-3__avail catalog-item-3__avail--topline" :class="{'instore': currentOffer.quantity && currentOffer.quantity>0}">

							<availability-sm :value="product.quantity > 0 ? 1 : 0" :text="'В наличии' " v-if="currentOffer.quantity && currentOffer.quantity>0" size="lg" :noIcon="true"></availability-sm>

							<availability-sm text="Под заказ" :deliveryDays="product.deliveryDays || 7" v-else size="lg"></availability-sm>
						</div>
					</div>

					<div class="catalog-item-3__price-row flc">
						<div class="catalog-item-3__price" v-if="currentOffer.price">
							<div class="price price--lg" v-if="currentOfferId && currentOffer.price">
								<strong :class="{'price__new': currentOffer.priceOld}">{{currentOffer.price | formatPrice}} </strong>
								<small :class="{'price__new-curr': currentOffer.priceOld}" v-if="product.priceCurrency"> {{product.priceCurrency}} </small>
								<span class="price__units" v-if="calculator.from_unit_name_full"> / за {{calculator.from_unit_name_full}} </span>
								<div class="tooltop catalog-item__tooltip">
									<div class="tooltip__activator">
										?
									</div>
									<div class="tooltip__content">
										{{calculator.from_unit_description}}
									</div>
								</div>
							</div>
							<div class="price price--lg" v-else-if="!currentOfferId && offers.length">
								<strong>{{priceMin | formatPrice}} </strong>
								<span class="price__separator" v-if="priceMin != priceMax"> &ndash; </span>
								<strong v-if="priceMin != priceMax">{{priceMax | formatPrice}} </strong>
								<small :class="{'price__new-curr': product.priceOld}" v-if="product.priceCurrency"> {{product.priceCurrency}} </small>
								<span class="price__units" v-if="calculator.from_unit_name_full"> / за {{calculator.from_unit_name_full}} </span>
								<div class="tooltop catalog-item__tooltip">
									<div class="tooltip__activator">
										?
									</div>
									<div class="tooltip__content">
										{{calculator.from_unit_description}}
									</div>
								</div>
							</div>
							<div class="price price--lg" v-else>
								<strong :class="{'price__new': currentOffer.priceOld}">{{currentOffer.price | formatPrice}} </strong>
								<small :class="{'price__new-curr': currentOffer.priceOld}" v-if="product.priceCurrency"> {{product.priceCurrency}} </small>
								<span class="price__units" v-if="calculator.from_unit_name_full">/ за {{calculator.from_unit_name_full}} <span class="tooltip catalog-item__tooltip">
								<span class="tooltip__activator" v-if="calculator.from_unit_description">
									?
								</span>
								<span class="tooltip__content">
									{{calculator.from_unit_description}}
								</span>
						</span></span>

							</div>

							<div v-if="calculator.to_unit && calculator.ratio" class="catalig-item-3__price-by-m">Цена за {{calculator.to_unit}} = {{(currentOffer.price/calculator.ratio).toFixed(2)}} {{product.priceCurrency}}</div>
						</div>

						<div class="catalog-item-3__actions">


							<!--<basket-action-catalog-item v-if="currentOffer.price && currentOffer.quantity  && !currentOffer.offersCount "-->
                                                        <basket-action-catalog-item v-if="currentOffer.price"
														:offer-id="currentOffer.offerId"
                                                                                                                :calculator="calculator" :quantity="product.quantity"
														:max-count="currentOffer.quantity || Infinity"
														size="lg"></basket-action-catalog-item>


				<!--			<div class="catalog-item-3__actions-btn" v-if="currentOffer && (!currentOffer.quantity || !currentOffer.price)">
								<button type="button" class="btn btn--lg btn--info" @click="showProcuctSubscription">
									<span class="btn__inner">Сообщить о появлении в наличии</span>
								</button>
							</div> -->
						</div>

						<div class="aside-info-block__grid grid">


							<div class="aside-info-block__group aside-info-block__group--noborder col-lg-12 col-md-4 col-sm-6 col-xs-12">
								<h4 class="ig-title flc">

								<span class="ig-title__text">Доставка
								</span>
								</h4>

								<div class="delivery-text-guide"><ul><li>10:00 - 19:00, ежедневно</li></ul> </div>
								<a href="/delivery/" class="link" > <span class="link__text link__text--delivery-select">Список зон доставки 2</span> </a>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>




		<div class="catalog-item-3__block flc" id="params">
			<div class="catalog-item__tabs">
				<generic-tabs>

					<generic-tab label="Характеристики" tab-key="description" active v-if="(product && product.properties.length>0) || product.text">

						<div class="default-grid grid grid--free grid--flex product-caracters-box">
							<div class="default-grid__item col col--free col-xs-12 two-columns-w-separator prop-groups">
								<div class="descr two-columns__inner">
									<div class="product-caracters__title" v-if="product.text">Описание</div>

									<div class="text-guide text-guide-decore" v-html="product.text" v-if="product.text"></div>
								</div>



									<div class="prop-groups__item flc two-columns__inner" v-for="group in product.properties" v-if="group.groupType == 'list' && product.properties.length > 0">
										<h3 class="product-caracters__title flc" v-if="group.groupName">{{group.groupName}}</h3>

										<!--div class="product-properties__item product-property" v-if="prop.value" v-for="prop in group.value">
											<h4 class="product-property__title">{{prop.title}}: </h4>
											<div class="product-property__value">{{prop.value}} </div>
										</div-->
										<ul class="dot-line-list flc">
											<li class="dot-line-list__item dot-line-row dot-line-row--eq" v-for="prop in group.value">
												<div class="dot-line-row__start c-gray-dark">
													<span>{{prop.title}}</span>
													<div class="inline-tooltip dropdown-owner dropdown-arrow-owner js-dropdown" v-if="prop.descr">
														<svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"><use xlink:href="#svg-icon-tooltip"></use></svg>
														<div class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position">
															<div class="text-guide text-guide-decore" v-html="prop.descr"></div>
														</div>
													</div>
												</div>
												<div class="dot-line-row__ruler"></div>
												<div class="dot-line-row__end">
													<a v-if="prop.link" :href="prop.link" class="link--like-text link--undecorated">{{prop.value}}</a>
													<span v-else>{{prop.value}}</span>
												</div>
											</li>
										</ul>
									</div>


							</div>
							<div class="default-grid__item col col--free col-lg-6 col-xs-12">
								<div class="prop-groups flc" v-if="product.properties.length > 0">

									<div class="prop-groups__item flc" v-for="group in currentOffer.properties" v-if="group.groupType !== 'list'">
										<h3 class="prop-groups__title flc" v-if="group.groupName">{{group.groupName}}</h3>

										<!--div class="product-properties__item product-property" v-if="prop.value" v-for="prop in group.value">
											<h4 class="product-property__title">{{prop.title}}: </h4>
											<div class="product-property__value">{{prop.value}} </div>
										</div-->

										<div class="text-guide" v-html="group.value" v-if="group.groupType == 'html'"></div>

										<div class="sec-props" v-if="group.groupType == 'secondary-list'">
											<ul class="dot-line-list flc">
												<li class="dot-line-list__item dot-line-row dot-line-row--eq dot-line-row--sm" v-for="prop in group.value">
													<div class="dot-line-row__start c-gray-dark">
														<span>{{prop.title}}</span>
														<div class="inline-tooltip dropdown-owner dropdown-arrow-owner js-dropdown" v-if="prop.descr">
															<svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip"><use xlink:href="#svg-icon-tooltip"></use></svg>
															<div class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position">
																{{prop.descr}}
															</div>
														</div>
													</div>
													<div class="dot-line-row__ruler"></div>
													<div class="dot-line-row__end">
														<a v-if="prop.link" :href="prop.link" class="link--like-text link--undecorated">{{prop.value}}</a>
														<span v-else>{{prop.value}}</span>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>


							</div>
						</div>
					</generic-tab>

					<generic-tab label="Вопрос-ответ" tab-key="feedback-faq" v-if="faq">
						<div class="text-guide text-guide-decore" >
							<div class="left js-parent">
								<div class="faq-block feedback-faq__wrap">
								<div class="feedback__btn">
									<button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab  btn--feebback-top" data-tab="faq_form"  onclick="View.initAllLocal();"><span class="btn__inner">задать вопрос</span></button>
									<button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab  btn--feebback-top current" data-tab="faq_faq"><span class="btn__inner">отмена</span></button>
								</div>
								<div class="faq_faq switched-tab-container js-tab current">
									<div class="js-parent js-accordeon" v-for="item in faq">
										<div class="faq-title js-accordeon-title">
											<div class="faq-title__icon">
												<svg class="svg-icon"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
											</div>
											<h3 class="accordion-block__title faq-title__title"><span class="">{{item.name}}</span></h3>
										</div>
										<div class="accorderon-content js-accordeon-content text-guide text-guide-decore"><p>{{item.text}}</p></div>
									</div>
								</div>
								<div class="faq_form switched-tab-container js-tab">
									<form action="" class="simple-form" id="formFaq">
                                                                              <input type="hidden" v-if="product.offerId" name="id" :value="product.offerId">
										<div class="rich-form-row">
											<div class="rich-text-input  rich-text-input--w-label" slot="input" note="Имя">
												<div class="input rich-text-input__input-checkout">
													<input type="text" placeholder="Имя*" novalidate="novalidate" name="name" class="rich-text-input__input text-input">
													<span class="rich-text-input__border"></span>
                                                                                                        <span class="err"></span>
												</div>
											</div>
										</div>
										<div class="rich-form-row">
											<div class="rich-text-input  rich-text-input--w-label" slot="input" >
												<div class="input rich-text-input__input-checkout">
													<input type="text" placeholder="Телефон*" novalidate="novalidate" name="phone" class="rich-text-input__input text-input text-input js-mask-input--phone">
													<span class="rich-text-input__border"></span>
                                                                                                        <span class="err"></span>
												</div>
											</div>
										</div>
										<div class="rich-form-row">
											<div class="rich-text-input  rich-text-input--w-label" slot="input" >
												<div class="input rich-text-input__input-checkout">
													<input type="text" placeholder="Email*" novalidate="novalidate" name="email" class="rich-text-input__input text-input">
													<span class="rich-text-input__border"></span>
                                                                                                        <span class="err"></span>
												</div>
											</div>
										</div>
										<div class="rich-form-row">
											<div class="rich-text-input  rich-text-input--w-label" slot="input" >
												<div class="input rich-text-input__input-checkout">
													<textarea autocomplete="off" placeholder="Комментарий*" novalidate="novalidate" name="comment" class="rich-text-input__input text-input"></textarea>
													<span class="rich-text-input__border"></span>
                                                                                                        <span class="err"></span>
												</div>
											</div>
										</div>

										<button type="submit" class="btn btn--lg btn--primary">
											<span class="btn__inner">Задать вопрос</span>
											<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
												<use xlink:href="#svg-icon-arrow-right"></use>
											</svg>
										</button>
									</form>
								</div>


							</div>
							</div>
						</div>
					</generic-tab>
					<generic-tab :label="'Отзывы (' + comments.length + ')'" tab-key="feedback">
						<div class="text-guide text-guide-decore">
							<div class="feedback-container product-caracters-box">
								<div class="left js-parent">
									<div class="feedback__btn">
										<button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab  btn--feebback-top" data-tab="feedback__form" onclick="View.initAllLocal();"><span class="btn__inner">оставить отзыв</span></button>
										<button type="button" class="btn btn--light btn--catalog-item-button btn--lg js-switch-tab  btn--feebback-top current" data-tab="feedback_faq"><span class="btn__inner">отмена</span></button>
									</div>
									<div class="feedback_faq switched-tab-container js-tab current">

										<div class="feedback-item" v-for="comment in comments">

											<div class="feedback__author">
												{{comment.name}} <span class="feedback__date">{{comment.date}}</span>
											</div>
											<div class="catalog-item-product_rate"  v-if="comment.stars">
												<div class="catalog-item-3__rate-star" v-for="n in Math.floor(comment.stars)">
													<img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled">
												</div>
												<div  class="catalog-item-3__rate-star" v-for="n in (5-Math.floor(comment.stars))">
													<img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty">
												</div>
											</div>
											<div class="product-caracters__title" v-if="comment.benefits">Преимущества</div>
											<p  v-if="comment.benefits">{{comment.benefits}}</p>
											<div class="feedback__title" v-if="comment.limitations">Недостатки</div>
											<p  v-if="comment.limitations">{{comment.limitations}}</p>
											<div class="feedback__title">Комментарий</div>
											<p>{{comment.comment}}</p>


                                                                                        <div v-if="comment.file" class="feedback__image"><img :src="comment.file" class="pointer js-load-modal" :data-modal="'/ajax/detail-img.php?id='+comment.id"></div>

											<div class="feedback__answer" v-if="comment.ansver">
												<div class="feedback__title">Ответ Docke</div>
												<p>{{comment.ansver}}</p>
											</div>


										</div>
										<div v-if="comments.length==0">Отзывов нет</div>

									</div>
									<div class="feedback__form switched-tab-container js-tab">
										<form  class="simple-form" id='formReview'>
                                                                                    <input type="hidden" v-if="product.offerId" name="id" :value="product.offerId">
											<div class="rich-form-row">
												<div class="rich-text-input  rich-text-input--w-label" slot="input" note="Имя*">
													<div class="input rich-text-input__input-checkout">
														<input type="text" placeholder="Имя*" name="name" novalidate="novalidate" class="rich-text-input__input text-input">
														<span class="rich-text-input__border"></span>
                                                                                                                 <span class="err"></span>
													</div>
												</div>
											</div>
											<div class="rich-form-row">
												<div class="rich-text-input  rich-text-input--w-label" slot="input" >
													<div class="input rich-text-input__input-checkout">
														<input type="tel" name="phone" placeholder="Телефон*" novalidate="novalidate" class="rich-text-input__input text-input text-input js-mask-input--phone">
														<span class="rich-text-input__border"></span>
                                                                                                                 <span class="err"></span>
													</div>
												</div>
											</div>
											<div class="rich-form-row">
												<div class="rich-text-input  rich-text-input--w-label" slot="input" >
													<div class="input rich-text-input__input-checkout">
														<input type="text" placeholder="Email*" name="email" novalidate="novalidate" class="rich-text-input__input text-input">
														<span class="rich-text-input__border"></span>
                                                                                                                 <span class="err"></span>
													</div>
												</div>
											</div>
											<div class="rich-form-row">
												<div class="rich-text-input  rich-text-input--w-label" slot="input">
													<div class="input rich-text-input__input-checkout">
														<input type="text" autocomplete="off" placeholder="Преимущества" name="plus" novalidate="novalidate" class="rich-text-input__input text-input">
														<span class="rich-text-input__border"></span>
                                                                                                                 <span class="err"></span>
													</div>
												</div>
											</div>
											<div class="rich-form-row">
												<div class="rich-text-input  rich-text-input--w-label" slot="input">
													<div class="input rich-text-input__input-checkout">
														<input type="text" autocomplete="off" placeholder="Недостатки" name="minus" novalidate="novalidate" class="rich-text-input__input text-input">
														<span class="rich-text-input__border"></span>
                                                                                                                 <span class="err"></span>
													</div>
												</div>
											</div>
											<div class="rich-form-row">
                                                                                            <input type="hidden" name="stars" value="3">
												<label class="rich-text-input__label-checkout">Оценка</label>
												<div  class="rich-text-input  rich-text-input--w-label">

													<div class="input rich-text-input__input-checkout">

                                                            <div class="js-parent">
														<div class="catalog-item-product_rate" >
															<div class="catalog-item-3__rate-star" data-val="1">
																<img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled">
															</div>
															<div class="catalog-item-3__rate-star" data-val="2">
																<img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled">
															</div>
															<div class="catalog-item-3__rate-star" data-val="3">
																<img src="/local/images/rate-star-filled.png" alt="" class="rate-star rate-star--filled">
															</div>
															<div class="catalog-item-3__rate-star" data-val="4">
																<img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty">
															</div>
															<div class="catalog-item-3__rate-star" data-val="5">
																<img src="/local/images/rate-star.png" alt="" class="rate-star rate-star--empty">
															</div>

														</div>
													</div>
                                                    </div>
                                                        <span class="rich-text-input__border"></span></div></div>
											<div class="rich-form-row">
												<div class="rich-text-input  rich-text-input--w-label" slot="input" >
													<div class="input rich-text-input__input-checkout">
														<textarea autocomplete="off" placeholder="Комментарий*" novalidate="novalidate" name="comment" class="rich-text-input__input text-input"></textarea>
														<span class="rich-text-input__border"></span>
                                                                                                                 <span class="err"></span>
													</div>
												</div>
											</div>
											<div class="file-input rich-text-input__input"><label class="file-input__action"><input name="file" type="file" class="file-input__input--new"> <span tabindex="0" class="file-input__text"> Загрузить фото</span></label></div>

											<button type="submit" class="btn btn--lg btn--primary">
												<span class="btn__inner">Отправить на модерацию</span>
												<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
													<use xlink:href="#svg-icon-arrow-right"></use>
												</svg>
											</button>
										</form>

									</div>
								</div>
								<div class="right">
								</div>
							</div>
						</div>
					</generic-tab>
					<generic-tab v-if="showPayments" label="Способы оплаты" tab-key="payments">
						<div class="text-guide feedback-faq__wrap" >
							<ul>
								<li>Оплата при доставке</li>
								<li>Система расчет</li>
								<li>Оплата банковской картой</li>
							</ul>
						</div>
					</generic-tab>
					<generic-tab label="Состав" tab-key="warranty" v-if="product.warranty">
						<div class="text-guide" v-html="product.warranty">
						</div>
					</generic-tab>
					<generic-tab label="О бренде" tab-key="brand" v-if="product.brandInfo">
						<div class="text-guide" v-html="product.brandInfo">
						</div>
					</generic-tab>
					<generic-tab label="Файлы" tab-key="files" v-if="currentOffer.files && currentOffer.files.length">
						<div class="default-grid grid">
							<div class="default-grid__item col col-lg-4 col-md-6 col-sm-4 col-xs-6 col-2xs-12" v-for="file in currentOffer.files">

								<a :href="file.link" class="file-link" target="_blank" :download="file.ext != 'pdf'">
									<div class="file-link__title flc">
										<span class="file-link__title-text">{{file.name}}</span>
									</div>
									<div class="file-link__meta flc">Файл {{file.ext}}, {{file.size}}</div>
									<div class="file-link__descr flc" v-if="file.description">{{file.description}}</div>
									<div class="file-link__descr flc" v-if="file.type">Тип: {{file.type}}</div>
									<div class="file-link__descr flc" v-if="file.start || file.end">Действует <span v-if="file.start">с {{file.start}}</span> <span v-if="file.end">по {{file.end}}</span></div>
								</a>

							</div>
						</div>
					</generic-tab>
				</generic-tabs>

			</div>



			<div class="catalog-item__reviews flc" v-if="reviewsEnabled && (mode != 'modal' && product.reviewLink)">
				<user-reviews :data-source="product.reviewLink" :product-id="product.productId" :offer-id="currentOfferId"></user-reviews>
			</div>
		</div>
		<a href="/compare/" class="incompare-btn" v-if="incompare>0">{{incompare}} {{incomparegoodsText}} в сравнении</a>
	</div>
</template>



<script>
	define(['Model', 'vue!image-gallery/component', 'vue!rating-block/component', 'vue!select-input/component', 'vue!slider-input/component', 'vue!generic-tabs/component', 'vue!generic-tab/component', 'vue!slider-related-products/component', 'vue!user-reviews/component', 'vue!rich-form/component', 'vue!rich-form-row/component', 'vue!rich-text-input/component'], function (Model) {


		Vue.component('catalog-item-3', {
			template: template,
			data: function () {
				return {
					zoomActive: false,
					zoomImageSrc: null,
					zoomViewerWidth: 150,
					zoomViewerHeight: 150,
					zoomMoveX: 10,
					zoomMoveY: 0,
					product: {},
					incompare: false,
					deliveryMethods: [],
					offers: [],
					currentOfferId: null,
					params: [],
					pickerMode: null,
					basketCount: 1,
					basketWaiting: false,
					user: Model.user,
					geolocation: Model.geolocation,
					buySeparate: false,
					priceUnit: null,
					reviewsEnabled: Model.reviews.enabled,
					showPayments: false,
					similarBlockPresent: false,
                                        reviewFormErrors: [],

					relatedSliderOptions: {
						slidesToShow: 3,
						slidesToScroll: 3,
						responsive: [
							{
								breakpoint: 1100,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2
								}
							},
							{
								breakpoint: View.breakpoints['sm-max'],
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3
								}
							},
							{
								breakpoint: View.breakpoints['xs-max'],
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['2xs-max'],
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							},
							{
								breakpoint: View.breakpoints['4xs-max'],
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
									swipeToSlide: true,
									arrows: false,
									dots: true
								}
							}
						]
					}
				}
			},

			computed: {
				currentOffer: function () {
					return _.findWhere(this.offers, {offerId: this.currentOfferId}) || this.product;
				},
                incomparegoodsText: function () {
				    if(this.incompare===1){return 'товар'}
				    else if(this.incompare<5){return 'товара'}
				    else{return 'товаров'}

                },

				computedGallery: function () {
					var inst = this;
					if (!this.product || !this.product.gallery) {
						return null;
					} else if (!this.currentOfferId) {
						return this.product.gallery;
					} else {
						return _.filter(this.product.gallery, function (item) {
							return item.offers.indexOf(inst.currentOfferId) >= 0
						});
					}
				},

				offersAsOptions: function () {
					var inst = this;

					return _.map(inst.offers, function (offer) {
						return {
							value: offer.offerId,
							text: offer.name
						};
					});
				},

				priceMin: function () {
					var inst = this;
					var minPrice = null;
					_.each(inst.offers, function (offer) {
						if (minPrice === null)
							minPrice = offer.price;
						else if (offer.price < minPrice)
							minPrice = offer.price;
					});

					return minPrice;
				},

				priceMax: function () {
					var inst = this;
					var maxPrice = null;
					_.each(inst.offers, function (offer) {
						if (maxPrice === null)
							maxPrice = offer.price;
						else if (offer.price > maxPrice)
							maxPrice = offer.price;
					});

					return maxPrice;
				}
			},

			props: {
				dataSource: {
					default: null
				},
				staticDataSource: {
					default: null
				},
				mode: {
					default: 'static'
				}
			},

			methods: {
                                addComment: function () {
                                    View.control.openModalByUrl('/ajax/comment.php?id=' + this.offerId);
                                },
				showDelivery: function (deliveryId) {
					return  $.inArray(deliveryId, this.currentOffer.deliveryMethods) >= 0;
				},
				zoomActivated: function (image) {
					if (!image)
						return;

					var inst = this;

					this.zoomActive = true;
					this.zoomImageSrc = image.src.original;

					setTimeout(function () {
						var zoomBox = inst.$el.querySelector('.js-catalog-item-zoom-box');
						if (zoomBox) {
							inst.zoomViewerWidth = zoomBox.offsetWidth;
							inst.zoomViewerHeight = zoomBox.offsetHeight;
						}
					}, 0);
				},

				zoomDeactivated: function () {
					this.zoomActive = false;
				},

				getParamSelectedText: function (param) {
					var selectedValue = _.findWhere(param.values, {value: param.value});
					return selectedValue ? selectedValue.title : null;
				},

				showCitySelect: function () {
					View.control.openModalByUrl("/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y");
				},

				showProcuctAvailability: function () {
					Model.showProductAvailabilityModal(this.product.productId, this.currentOfferId);
				},

				showProcuctSubscription: function () {
					Model.showProductSubscriptionModal(this.product.productId, this.currentOfferId, this.dataSource);
				},

				addToBasket: function () {
					Model.addToBasket(this.currentOfferId, this.basketCount);
				},

				updateCurrentOffer: function () {
					var inst = this;
					var offerPassedTheTest;

					var foundOffer = _.find(inst.offers, function (offer) {
						offerPassedTheTest = true;
						_.find(inst.params, function (param) {
							if (typeof param.value !== 'undefined' && param.value !== null) {
								var offerParam = _.findWhere(offer.params, {name: param.name});
								if (offerParam) {
									var offerParamValue = _.find(offerParam.values, function (value) {
										return value == param.value;
									});

									if (!offerParamValue) {
										offerPassedTheTest = false;
										return true; // return true to break find loop
									}
								} else {
									console.warn('В catalog-item.params есть параметр (' + param.name + '), которого нет в catalog-item.offers[X].params', param, offer);
									offerPassedTheTest = false;
									return true; // return true to break find loop
								}
							} else {
								offerPassedTheTest = false;
								return true; // return true to break find loop
							}
						});

						return offerPassedTheTest;
					});

					if (foundOffer) {
						inst.currentOfferId = foundOffer.offerId;
						history.replaceState({}, null, foundOffer.link);
					}
				},

				scrollToOffers: function () {
					var inst = this;
					try {
						$('html, body').animate({scrollTop: $(inst.$refs.prodTable.$el).offset().top}, 500);
					} catch (e) {
					}
				},
				compare: function(){
				    var inst=this;
				    if(this.product.incompare){var action='remove';this.product.incompare=false;}
				    else{var action='add';this.product.incompare=true;}
                    $.ajax({
                        type: "POST",
                        url: "/ajax/compare.php",
                        data: 'id='+inst.product.offerId+'&action='+action,
                        success: function(result){
                            var json = JSON.parse(result);
                            inst.incompare=parseFloat(json["count"]);
                        }
                    });
				}


			},

			filters: {
				formatPrice: Model.formatPrice
			},

			created: function () {
				var inst = this;
			 	console.log('catalog item staticDataSource', inst.staticDataSource)
				if (inst.staticDataSource) {
					inst.deliveryMethods = inst.staticDataSource.deliveryMethods;
					inst.params = inst.staticDataSource.params;
					inst.offers = inst.staticDataSource.offers;
					inst.faq = inst.staticDataSource.faq;
                                        inst.starscnt = inst.staticDataSource.starscnt;
                                        inst.comments = inst.staticDataSource.comments;
					inst.currentOfferId = inst.staticDataSource.offerId;
					inst.product = inst.staticDataSource.product || null;
					inst.pickerMode = inst.staticDataSource.pickerMode || null;
                                        inst.calculator = inst.staticDataSource.calculator || null;

					inst.priceUnit = inst.staticDataSource.priceUnit || null;

					inst.buySeparate = inst.pickerMode === 'offers';
					if (inst.currentOfferId || inst.currentOfferId === 0) {
						var currOffer = _.findWhere(inst.offers, {offerId: inst.currentOfferId});
						try {
							_.each(inst.params, function (param) {
								param.value = _.findWhere(currOffer.params, {name: param.name})
							});
						} catch (e) {
							console.log('catalog-item: filling params according to currentOffer failed', e);
						}
					}
				} else if (inst.dataSource) {
					$.get({
						url: inst.dataSource,
						dataType: 'json',
						data: {
							bxajaxid: 'catalog',
							//productId: inst.product.productId,
							//offerId: inst.offerId
						}
					})
							.done(function (response) {
								inst.params = response.params;
								inst.offers = response.offers;
								inst.currentOfferId = response.offerId;
								inst.product = response.product || null;
								inst.pickerMode = inst.staticDataSource.pickerMode || null;
								inst.buySeparate = inst.pickerMode === 'offers';
								if (inst.$refs.imageGallery)
									inst.$refs.imageGallery.$emit('galleryUpdate');
							})
							.fail(function (response) {
								console.warn('catalog item loading failed: ', response);
							});
				}
			},

			mounted: function () {
				var inst = this;

            //    console.log('mounted');
                $.ajax({
                    type: "POST",
                    url: "/ajax/compare.php",
                    success: function(result){
                        var json = JSON.parse(result);
                        inst.incompare=parseFloat(json["count"]);
                    }
                });

				var zoomBox = this.$el.querySelector('.js-catalog-item-zoom-box');
				if (!zoomBox || zoomBox.length == 0) {
					return;
				}

				this.zoomViewerWidth = zoomBox.offsetWidth;
				this.zoomViewerHeight = zoomBox.offsetHeight;

				if (inst.$refs.imageGallery) {
					inst.$refs.imageGallery.$emit('galleryUpdate');

					setTimeout(function () {
						inst.$refs.imageGallery.$on('galleryUpdate', function () {
							var zoomBox = this.$el.querySelector('.js-catalog-item-zoom-box');

							if (zoomBox) {
								this.zoomViewerWidth = zoomBox.offsetWidth;
								this.zoomViewerHeight = zoomBox.offsetHeight;
							}
						});

						inst.$refs.imageGallery.$on('zoomMove', function (moveX, moveY) {
							inst.zoomMoveX = -moveX * 100;
							inst.zoomMoveY = -moveY * 100;
						});
					}, 0);
				}

				inst.similarBlockPresent = $('#similar').length > 0;


			}

		});
	});
</script>
