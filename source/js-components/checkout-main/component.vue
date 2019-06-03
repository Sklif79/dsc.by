<template>

	<transition name="content-fade" mode="out-in">
		<div class="empty-basket-block" v-if="order.basketPrice  == 0  && state != 'success' && state != 'payment'">
			<h2 class="empty-basket-block__title">Ваша корзина пуста</h2>

			<transition name="content-fade">
				<div class="basket-full__products flc">
					<div class="basket-full__products-list">

						<div v-for="product in basket.products"> 

							<!--system-message :text="product.errors" :open="true" type="error" v-if='product.errors'></system-message-->

							<product-in-checkout :show-rating="false" v-if="!product.delayed" :key="product.productId"
								:product="product"
								:list-item="true"
								:show-buy-button="true"
								:show-fav-button="false"
								:show-alt-actions="true"
								:bind-basket-count="true"
								:list-item-lg="true"
								:basket-mode="true"
								:price-notification="product.errors"
								:show-params="false"
								:disable-actions="!!basketLoading"></product-in-checkout>
						</div> 
					</div>
				</div>
			</transition>
			<div class="empty-basket-block__btn-row">
				<a href="/" class="btn btn--primary btn--lg">
					<svg class="btn__icon btn__icon--left btn__icon--arrow svg-icon svg-icon--20">
					<use xlink:href="#svg-icon-arrow-left"></use>
					</svg>
					<span class="btn__inner">Вернуться на главную</span>
				</a>
			</div>
		</div>


		<div class="checkout-main" v-if="(state == 'checkout' ||  state == 'products') && order.basketPrice>0" key="checkout">

			<div class="checkout-main__main">

				<div v-if="order.basketCount > 0  && state == 'products'">
					<system-message :text="errors.form" :open="true" type="error" v-if='errors.form'></system-message>

					<div class="basket-full__main-blocks flc" v-if="presents.message">

						<div class="block-links">
							<div class="block-links__grid grid">
								<div class="block-links__col col col-lg-12">
									<div class="block-link block-link--reflex icon-reflex-parent" @click="showPresentsInModal">
										<div class="block-link__cell-img">
											<div class="block-link__img-box">
												<div class="icon-group">
													<img src="/local/images/markup-images/advantages/advantage-2.svg" alt="" class="icon-no-reflex"> 
													<img src="/local/images/markup-images/advantages/advantage-2-reflex.svg" alt="" class="icon-reflex">
												</div>
											</div>
										</div> 
										<div class="block-link__cell-txt">
											<p class="block-link__p flc">Бесплатные пробники с заказом: {{presents.message}}</p>
											<div class="block-link__btn-row flc" v-if="presents.avalable>0">
												<span class="btn">
													<span class="btn__inner">Добавить</span>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<transition name="content-fade">
						<div class="basket-full__products flc">
							<div class="basket-full__products-list">
								<div class="basket-full__title ">
									<div class="basket-title basket-product-box--photo">Фото</div>
									<div class="basket-title basket-product-box--name">Наименование</div>
									<div class="basket-title basket-product-box--count">Количество</div>
									<div class="basket-title basket-product-box--price">Цена</div>
									<div class="basket-title basket-product-box--remove"></div>
								</div>
								<div v-for="product in basket.products">
									<!--system-message :text="product.errors" :open="true" type="error" v-if='product.errors'></system-message-->
									<product-in-checkout :show-rating="false" v-if="!product.delayed" :key="product.productId"
										:product="product"
										:list-item="true"
										:list-item-lg="true"
										:basket-mode="true"
										:show-buy-button="true"
										:show-fav-button="false"
										:show-alt-actions="true"
										:bind-basket-count="true"
										:price-notification="product.errors"
										:show-params="false"
										:disable-actions="!!basketLoading"></product-in-checkout>
								</div> 

								<div v-for="product in presentsProduct" :key="product.productId" v-if="presentsProduct">
									<!--system-message :text="product.errors" :open="true" type="error" v-if='product.errors'></system-message-->
									<product-in-checkout :product="product"
										:not-follow-link="true"
										:list-item="true"
										:list-item-lg="true"
										:basket-mode="true"
										:show-rating="false"
										:show-buy-button="false"
										:show-fav-button="false"
										:price-notification="product.errors"
										:show-params="false"
										:disable-actions="!!basketLoading">

									<div class="product__alt-action flc" slot="button">
										<div class="product__alt-action-grid">
											<div class="product__alt-action-item">
												<span class="link link--local" @click="removeFromBasket(product)">Удалить</span>
											</div>
										</div>
									</div>
									</product-in-checkout>
								</div> 
							</div>

							<!--<div class="basket-full__products-summary" v-if="!currentStep">
								<div class="bubble bubble--arrow-top">
									<div class="dot-line-list">
										<div class="dot-line-list__item dot-line-row">
											<div class="dot-line-row__start">Сумма</div>
											<div class="dot-line-row__ruler"></div>
											<div class="dot-line-row__end">
												<div class="price">
													<strong>{{order.basketPrice | formatPrice}} </strong>
													<small>руб.</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>-->
						</div>
					</transition>
				</div>







				<div v-if="state == 'checkout' || state == 'products' && currentStep">

					<system-message :text="errors.form" :open="true" type="error" v-if='errors.form'></system-message>

					<div class="form-w-steps">
						<section class="form-w-steps__step form-step flc" :class="{'form-step--current': step.current, 'form-step--completed': step.completed && !step.current, 'form-step--error': step.error}" v-for="(step, stepKey) in steps">
								 <header class="form-step__header step-header" :class="{'step-header--current': step.current, 'step-header--completed': step.completed && !step.current, 'step-header--error': step.error}">
								<div class="step-header__cell-title">
									<h2 class="step-header__title">{{step.title}}</h2>
								</div>
								<transition name="content-fade">
									<div class="step-header__cell-action" v-if="step.completed && !step.current">
										<a href="javascript:void(0)" class="link link--local" @click="editFormStep(stepKey)">Изменить</a>
									</div>
								</transition>
							</header>

							<transition-group tag="div" @enter="stepBodyEnterAnimation" @leave="stepBodyLeaveAnimation" mode="out-in" :css="false">
								<!-- current steps -->

								<div class="form-step__body" v-if="step.current && formsKey == stepKey" :key="stepKey" v-for="(formData, formsKey) in forms">
									<div class="form-card form-card--w-arrow flc" :class="{'form-card--loading': step.loading}">
										 <!--transition name="content-fade">
											<div class="form-card__preloader" v-if="step.loading">
												<svg class="spinner spinner--default active" viewBox="0 0 80 80">
												<circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle>
												</svg>
											</div>
										</transition-->

										 <form class="form flc" :class="stepKey+'-form'" @submit.prevent="submitFormStep(stepKey, true)">


											<div class="rich-form-row" v-for="field in formData.fields"  v-if="formData.fields" :key="field.name" :class="field.rootClass">
												<!--<h3 class="form__subtitle flc" slot="input" v-if="(field.type == 'radioblocks' || field.type == 'slotblocks')  && field.options">{{field.summaryLabel}}</h3>-->
												<div class="check-blocks" slot="input" v-if="field.type == 'slotblocks'  && field.options">
													<div class="">
														<div class="check-blocks__row" v-for="option in field.options">

															<label class="checkbox ">
																<input type="radio" class="checkbox-row__input" :name="field.name" :value="option.value" @change="submitFormStep(stepKey, false)" v-model="field.value">
																<span class="checkbox__visual checkbox-row__visual">
																</span>
																	<span class="checkbox__text checkbox--delivery-checkout">
																		{{option.label}}
																		<!--<span class="check-block__strong" v-if="option.showPrice && option.price>0">{{option.price | formatPrice}} руб.</span>
																		<span class="check-block__strong" v-if="option.showPrice && option.price==0">Бесплатно</span>-->
																	</span>
<!--
																	<span class="check-block__tooltip" v-if="option.text">
																		<span class="inline-tooltip dropdown-owner dropdown-arrow-owner js-dropdown" @click.prevent="noop">
																			<svg class="inline-tooltip__btn js-dropdown__btn svg-icon svg-icon--tooltip">
																			<use xlink:href="#svg-icon-tooltip"></use>
																			</svg>
																			<span class="inline-tooltip__body dropdown dropdown--manual js-dropdown__body js-tooltip-position" v-html="option.text"></span>
																		</span>
																	</span>-->


															</label>
														</div>
													</div>
												</div>

												<div class="label-row-box" slot="input" v-for="(option, index) in field.options"  v-if="field.type == 'radioblocks' && field.options">
													<div class="label-row">
													<label class="checkbox-row  inline-label">
														<input type="radio" class="checkbox-row__input" :name="field.name" :value="option.value"  @change="submitFormStep(stepKey, false)" v-model="field.value">
														<span class="checkbox-row__visual"></span>
														<span class="checkbox-row__text">{{option.label}}</span>

													</label>
													<svg class="checout-accordeon-arrow svg-icon svg-icon--dd-arrow" :class="{active: activeAccordeon=== index}" @click="setAactiveAccordeon(index)"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
													</div>
													<transition name="content-fade">
														<div class="checkbox-row__label" v-show="activeAccordeon=== index">{{option.text}}</div>
													</transition>
												</div>
												<form-city-select v-if="field.rootClass==='citySearch'" :topLocations="field.topLocations"></form-city-select>

												<rich-text-input-checkout v-model="field.value" slot="input" :placeholder="field.placeholder" :type="field.type" :label="field.label" :mask="field.mask" :error="getFieldError(field)" :rule="field.rule" :note="field.note"  v-else-if="field.type != 'slotblocks' && field.type != 'radioblocks' && field.type != 'groupField'" :hiddenDefault="field.value || field.hiddenDefault" :options="field.options" :rootClass="field.rootClass"></rich-text-input-checkout>




												<h3 class="form__subtitle flc" slot="input"   v-if="field.type == 'groupField'" >{{field.label}}</h3>
												<div class="rich-form-grid grid" slot="input" v-if="field.type == 'groupField'" >

													<div :class="{'rich-form-grid__col':true, 'col': true, 'col-lg-6': key=='PERSONAL_STREET' , 'col-2xs-12': key=='PERSONAL_STREET',  'col-lg-2': key!='PERSONAL_STREET' , 'col-2xs-4': key!='PERSONAL_STREET'}"   v-for="(innerfield, key) in field.fields">
														<rich-text-input-checkout v-model="innerfield.value" :placeholder="field.placeholder" :type="innerfield.type" :label="innerfield.label" :error="getFieldError(innerfield)"></rich-text-input-checkout>
													</div>

												</div>

											</div>

											<div class="rich-form-btns-line">
												<div class="rich-form-btns-line__aside rich-form-btns-line__aside--left">
													<a href="javascript:void(0)" class="btn btn--back btn--lg link--local" tabindex="0" @click="goToPrevFormStep(step)">
														<svg class="btn__icon btn__icon--left svg-btn--back svg-icon ">
															<use xlink:href="#svg-icon-small-arrow-left"></use>
														</svg>
														<span class="btn__inner">Назад</span></a>
												</div>
												<div class="rich-form-btns-line__main">
													<button type="submit" class="btn btn--lg btn--primary">
														<span class="btn__inner">{{step.nextButton}}</span>
														<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
														<use xlink:href="#svg-icon-arrow-right"></use>
														</svg>
													</button>
												</div>

											</div>
										</form>
									</div>

								</div>
								<!-- completed steps -->
								<div class="form-step__body" v-if="!step.current && step.completed && formsKey == stepKey" :key="stepKey + '-summary'"  v-for="(formData, formsKey) in forms">

									<div class="form-card form-card--w-arrow form-card--w-border flc" >
										<div class="dot-line-list">

											<div class="dot-line-list__item dot-line-row dot-line-row--sm" v-for="field in prepareShowFields(formData.fields)">

												<div class="dot-line-row__start">{{field.summaryLabel || field.label}}</div>
												<div class="dot-line-row__ruler"></div>
												<div class="dot-line-row__end">{{getFieldSummaryText(field)}}</div>

											</div>



										</div>
									</div>

								</div>
							</transition-group>
						</section>
					</div>
				</div>
			</div>







			<aside class="checkout-main__aside" v-if="order.basketPrice>0">
				<div class="" v-sticky="20">
					<div class="summary-block summary-block--receipt" >

					<!--<div class="summary-block__floor" v-if="discountCardPersent || !authorized">
						<div class="discount">

							<div class="discount__main">
								<h4 class="discount__title">Дисконтная программа</h4>

								<div class="discount__text" v-if="discountCardPersent">Ваша скидка: <span class="discount__value">-{{discountCardPersent}}%</span></div>
								<div class="discount__text" v-if="discountCardPersent">Сумма накоплений: <span class="discount__value">{{discountCardAmountOrders}} руб.</span></div>

								<div class="discount__text" v-if="!authorized"><span class="discount__value"><a @click="showSignInModal()" href="#"  @click.prevent="1">Авторизуйтесь</a></span></div>

							</div>
						</div>
					</div>

					<div class="summary-block__floor" v-if="bonusCurrentOrder || bonusCvartalSumm">
						<div class="discount">

							<div class="discount__main">
								<h4 class="discount__title">Бонусная программа</h4>

								<div class="discount__text" v-if="bonusCvartalSumm">Накоплено бонусов: <span class="discount__value"> {{bonusCvartalSumm}}</span></div>
								<div class="discount__text" v-if="bonusCurrentOrder">Бонусов за текущий заказ: <span class="discount__value">{{bonusCurrentOrder}} руб.</span></div>


							</div>
						</div>
					</div>-->


					<!--<div class="summary-block__floor">
						<div class="foldable-list">

							<div class="foldable-list__item" v-if="enableGiftCert">
								<div class="foldable-block js-accordion">
									<div class="foldable-block__bar">
										<span class="link link--dd link--local link--undecorated js-accordion__bar">
											<span class="link__text">Промокод</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow">
											<use xlink:href="#svg-icon-dd-arrow"></use></svg>
										</span>
									</div>
									<div class="foldable-block__body foldable-block__body--sm js-accordion__body">
										<div class="one-row-form">
											<div class="one-row-form__cell-input">
												<rich-text-input type="text" v-model="giftCertCode" placeholder="Введите код" lite></rich-text-input>
											</div>
											<div class="one-row-form__cell-btn">
												<button type="button" class="btn"  @click="submitForSoapCheck(1)" >
													<span class="btn__inner">Применить</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="foldable-list__item">
								<div class="foldable-block js-accordion">
									<div class="foldable-block__bar">
										<span class="link link--dd link--local link--undecorated js-accordion__bar">
											<span class="link__text">Комментарий к заказу</span>&nbsp;<svg class="link__arrow svg-icon svg-icon--dd-arrow">
											<use xlink:href="#svg-icon-dd-arrow"></use></svg>
										</span>
									</div>
									<div class="foldable-block__body foldable-block__body--sm js-accordion__body">
										<rich-form-row>
											<rich-text-input type="textarea" v-model="comment" placeholder="Ваш комментарий" slot="input"></rich-text-input>
										</rich-form-row>

										<rich-form-row>
											<button type="button" class="btn"  @click="commentSubmit(0)" slot="input">
												<span class="btn__inner">Применить</span>
											</button>
										</rich-form-row>
									</div>
								</div>
							</div>
						</div>
					</div>-->
					<div class="summary-block__floor summary-block__floor--dark" v-if="order.freeDeliveryPrice > order.basketPrice">
						<ul class="small-info-list">
							<li class="small-info-list__item small-info-row small-info-row--color-alt">
								<div class="small-info-row__icon">
									<svg class="svg-icon"><use xlink:href="#svg-icon-delivery"></use></svg>
								</div>
								<div class="small-info-row__text">Добавьте товаров на <b>{{(order.freeDeliveryPrice - order.basketPrice) | formatPrice}} руб.</b>, чтобы получить бесплатную доставку в ваш регион ({{geolocation.city.name}})</div>
							</li>
						</ul>
					</div>



					<div class="summary-block__floor">
						<div class="goods-count-box">
							<div class="goods-count">
								<span>Товаров</span>
								<span class="complex-link__label">{{order.basketCount}}</span>
							</div>
							<div class="price price--strong price--lg">
								<strong class="price__new" v-if="order.basketPriceWithDelivery">{{order.basketPriceWithDelivery | formatPrice}} </strong>
								<strong class="price__new" v-else>{{order.basketPrice | formatPrice}} </strong>
								<small class="price__new-curr">руб. </small>
							</div>
						</div>
						<div class="dot-line-list">

							<div class="dot-line-list__item dot-line-row" v-if="order.weight" >
								<div class="dot-line-row__start dot-line-row__start--checkout">Общий вес</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">{{order.weight}} кг.</div>
							</div>
							<div class="dot-line-list__item dot-line-row" v-if="order.capacity" >
								<div class="dot-line-row__start dot-line-row__start--checkout">Объем</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">{{order.capacity}} м<sup>3</sup></div>
							</div>
							<div class="dot-line-list__item dot-line-row"  v-if="parseFloat(order.basketSale) > 0">
								<div class="dot-line-row__start dot-line-row__start--checkout">Экономия</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end"><b>{{order.basketSale | formatPrice}} руб.</b></div>
							</div>

							<!--<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--checkout">Доставка</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end" v-if="parseFloat(order.deliveryPrice)>0">{{order.deliveryPrice | formatPrice}} руб.</div>
								<div class="dot-line-row__end" v-else><b>Бесплатно</b></div>
							</div>-->
						</div>


						<!--div class="form-card__preloader" v-if="basketLoading">
							<svg class="spinner spinner--default active" viewBox="0 0 80 80">
							<circle cx="40" cy="40" r="38" fill="none" stroke="currentColor"></circle>
							</svg>
						</div-->

						<div class="summary-block__btn-row" v-if="!currentStep || !currentStep.nextButton">
							<button  @click="commentSubmit(1)"  class="btn btn--primary btn--lg btn--block">
								<span class="btn__inner">Оформить заказ</span>
								<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
								<use xlink:href="#svg-icon-arrow-right"></use>
								</svg>
							</button>
							<button type="button" data-modal="/ajax/buyOneClick.php" class="btn btn--light btn--catalog-item-button js-load-modal btn--lg"><span class="btn__inner">Заказать в 1 клик</span></button>
						</div>
						<div class="summary-block__btn-row" v-else>


							<button class="btn btn--primary btn--lg btn--block" v-if="currentStep.code == 'payment'" @click.prevent="submitFormStep(currentStep.code, true)">
								<span class="btn__inner">{{currentStep.nextButton}}</span>
								<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
								<use xlink:href="#svg-icon-arrow-right"></use>
								</svg>
							</button>

							<div class="summary-block__btn-row-item">
								<a href="/order/" @click.prevent="commentSubmit(1)">Вернуться к списку товаров</a>
							</div>
						</div>
					</div>

				</div>

					<div class="checkout__delivery">
					<div class="aside-info-block__group aside-info-block__group--noborder">
						<div class="checkout__delivery-title">Доставка </div>
						<div class="text-guide delivery-text-guide">
							10:00 - 19:00 ежедневно
						</div>	
                                                <a href="/delivery/" class="link" > <span class="link__text link__text--delivery-select">Список зон доставки</span> </a>	 
					</div>
				</div>
				</div>
			</aside>
		</div>


		<div class="medium-card" v-if="state == 'payment'  &&  order.basketPrice>0" key="payment">
			<div class="medium-card__floor">
				<div class="medium-card__container medium-card__container--sm">
					<div class="dot-line-list">
						<div class="dot-line-list__item dot-line-row">
							<div class="dot-line-row__start">Магазин</div>
							<div class="dot-line-row__ruler"></div>
							<div class="dot-line-row__end">docke</div>
						</div>
						<div class="dot-line-list__item dot-line-row">
							<div class="dot-line-row__start">Номер заказа</div>
							<div class="dot-line-row__ruler"></div>
							<div class="dot-line-row__end"><b>№2654</b></div>
						</div>
						<div class="dot-line-list__item dot-line-row">
							<div class="dot-line-row__start">Сумма к оплате</div>
							<div class="dot-line-row__ruler"></div>
							<div class="dot-line-row__end">
								<div class="price price--strong">
									<strong class="price__new">{{order.basketPriceWithDelivery | formatPrice}}</strong>
									<small class="price__new-curr">руб.</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="medium-card__floor">
				<div class="medium-card__container">
					<p>Тут же какой-то Ифраим</p>

					<div class="medium-card__btn-row">
						<button type="button" class="btn btn--primary btn--lg" @click="state = 'success'">
							<span class="btn__inner">Оплатить</span>
							<svg class="btn__icon btn__icon--right btn__icon--arrow svg-icon svg-icon--20">
							<use xlink:href="#svg-icon-arrow-right"></use>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>


		<div class="successs-box"  v-if="state == 'success'" key="success">
			<div class="success-title">
				<div class="success-block">
					<div class="success-block__icon-row flc">
						<svg class="svg-icon instore">
							<use xlink:href="#svg-icon-success"></use>
						</svg>
					</div>
					<h2 class="success-block__title flc">Спасибо, Ваш заказ оформлен</h2>
					<div class="success-block__text text-guide">
						<p class="text-center">Заказ № {{order.id}} – {{order.date}}</p>
					</div>
				</div>

			</div>
			<br><br>
			<div class="medium-card"  >

				<div class="medium-card__floor">
					<div class="">
						<div class="dot-line-list">
							<h3>Состав заказа</h3>
							<div v-for="product in basket.products" class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start">{{product.name}}</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">{{product.price}} руб.</div>
							</div>
						</div>
					</div>
				</div>

				<div class="medium-card__floor">
					<div class="js-parent js-accordeon">
						<div class="flex-title js-accordeon-title">

							<h3 class="accordion-block__title"><span class="">Личные данные</span></h3>
							<div class="faq-title__icon icon-noborder">
								<svg class="svg-icon"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
							</div>
						</div>
						<div class="accorderon-content accorderon-content-p0  js-accordeon-content text-guide">
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--light">Имя Фамилия</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">
									Покупатель тестовый
								</div>
							</div>
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--light">Телефон</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">
									+37529 666-11-11
								</div>
							</div>
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--light">Email</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">
									a@b.by
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="medium-card__floor">
					<div class="js-parent js-accordeon">
						<div class="flex-title js-accordeon-title">

							<h3 class="accordion-block__title"><span class="">Данные о доставке и оплате</span></h3>
							<div class="faq-title__icon icon-noborder">
								<svg class="svg-icon"><use xlink:href="#svg-icon-dd-arrow"></use></svg>
							</div>
						</div>
						<div class="accorderon-content accorderon-content-p0  js-accordeon-content text-guide">
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--light">Самовывоз</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">
									г. Минск, ул. Притыцкого, 112
								</div>
							</div>
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--light">Время работы</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">
									с 10:00 до 22:00, ежедневно
								</div>
							</div>
							<div class="dot-line-list__item dot-line-row">
								<div class="dot-line-row__start dot-line-row__start--light">Способ оплаты</div>
								<div class="dot-line-row__ruler dot-line-row__ruler--clear"></div>
								<div class="dot-line-row__end">
									Безналичный расчет
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="medium-card__floor bg-gray-light">
					<div class="medium-card__total">
						<div class="left">
							<h3>Итого</h3>
							<button class="print">
								<img src="/local/images/icons/print.png" alt="" class="print-ico-sm">
								<span class="print-text">Распечатать</span>
							</button>
						</div>
						<div class="right">
							<div class="price price--strong price--big">
								<strong class="price__new">{{order.basketPriceWithDelivery | formatPrice}} </strong>
								<small class="price__new-curr">руб.</small>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>



	</transition>
</template>




<script>
	define(['Model', 'vue!product-in-checkout/component', 'vue!system-message/component', 'vue!rich-text-input-checkout/component', 'vue!form-city-select/component'], function (Model) {
		Vue.component('checkout-main', {
			template: template,
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
					presentsProduct: Model.basket.presentsProduct,
					basket: Model.basket,
					geolocation: Model.geolocation,
					authorized: Model.authorized,
					errors: [],
					submitUrl: "/order/checkout/",
					orderList: "/order/",
					state: 'loading',
					presents: {},
					forms: {},
					currentStep: {}
				}
			},
			props: {
				bxajaxid: {
					default: null
				},
				staticDataSource: {
					default: null
				},
				enableGiftCert: {
					type: Boolean,
					default: true
				}

			},
			filters: {
				formatPrice: Model.formatPrice
			},
			methods: {
                                buyOneCLickFromCart: function () { 
					View.control.openModalByUrl('/ajax/buyOneClick.php?cart=Y');
				}, 
				removeFromBasket: function (product) {
					Model.removeFromBasket(product.offerId);
				},
				showSignInModal: function (value) {
					Model.showSignInModal()
				},

				setCurrentStep: function (value) {
					var inst = this;
					_.each(inst.steps, function (step, key) {
						step.current = value == key;
						if (step.current) {
							inst.currentStep = step
						}

					});
				},
				commentSubmit: function (reload) {
					var inst = this;
					if (inst.basketLoading) {
						return;
					}


					if (!inst.comment.length) {
						if (reload) {
							window.location = inst.currentStep ? inst.orderList : inst.submitUrl;
						}
						return;
					}


					inst.basketLoading = 1;
					var formData = [];
					formData.push({name: 'bxajaxid', 'value': inst.bxajaxid});
					formData.push({name: 'COMMENT', 'value': inst.comment});
					$.post({
						url: inst.submitUrl,
						data: formData,
						dataType: 'json'
					})
							.done(function (response) {
								inst.basketLoading = 0;
								if (reload) {
									window.location = inst.currentStep ? inst.orderList : inst.submitUrl;
								}
							})
							.fail(function (response) {
								inst.basketLoading = 0;
								console.log('basket submit fail')
							});
				},
				prepareShowFields: function (fields) {
					var inst = this;
					var result = [];
					$.each(fields, function (key, field) {
						if (field.type == 'groupField') {

							$.each(field.fields, function (key, field) {
								if (!field.value || field.type == "hidden") {
									return;
								}
								result.push({
									label: field.summaryLabel ? field.summaryLabel : field.label,
									value: inst.getFieldSummaryText(field)
								});
							}
							);
							return;
						}

						if (!field.value || field.type == "hidden") {
							return;
						}


						result.push({
							label: field.summaryLabel ? field.summaryLabel : field.label,
							value: inst.getFieldSummaryText(field)
						})
						return;
					}
					);
					return result;
				},
				getFieldError: function (field) {
					return (this.errors.fields[field.id]) ? this.errors.fields[field.id] : null;
				},
				showDiscountCardnModal: function () {
					var inst = this;
					View.control.openModalByUrl("/personal/discountCard.php?AJAXMODE=Y");
					Model.$on('modalOpen', function () {
						inst.modalOpen = 1;
					})

					Model.$on('modalClose', function () {
						if (inst.modalOpen) {
							window.location.reload();
						}
					})
				},

				showPresentsInModal: function () {
					Model.showPresentsInModal();
				},

				showCitySelect: function () {
					View.control.openModalByUrl("/personal/findlocation.php?AJAXMODE=Y&FINDLOACATION=Y");
				},
				getFieldSummaryText: function (field) {
					if (field.options) {
						var selectedOption = _.findWhere(field.options, {value: field.value});
						if (selectedOption)
							return selectedOption.label || selectedOption.value || field.value;
					}

					return field.value;
				},
				submitForSoapCheck: function (coupon) {
					var inst = this;

					if (inst.basketLoading || inst.order.basketPrice == 0 || inst.state == 'success' || inst.state == 'payment') {
						return;
					}

					inst.basketLoading = 1;

					var formData = [];
					formData.push({name: 'bxajaxid', 'value': inst.bxajaxid});
					formData.push({name: 'SOAP_CHECK', 'value': "Y"});
					if (coupon) {
						formData.push({name: 'COUPON', 'value': inst.giftCertCode});
					}					

					$.post({
						url: inst.submitUrl,
						data: formData,
						dataType: 'json'
					})
					.done(function (response) {
						inst.basketLoading = 0;
						inst.fromSubmitForSoapCheck = 1;

						inst.presents = response.presents;

						Model.updateBasket(response.products, false);
						Model.updatePresent(response.presentsProduct, response.presents);

						inst.bonusCurrentOrder = response.bonusCurrentOrder;
						inst.errors.form = response.errors.form;
						inst.order = response.order;
						if (coupon) {
							inst.giftCertCode = response.giftCertCode;
							if (inst.errors.form) {
//										inst.submitForSoapCheck();
							}

						} else if (response.state == "products") {
							inst.state = response.state;
						}

					})
					.fail(function (response) {
						inst.basketLoading = 0;
						console.log('basket submit fail')
					});
				},
				submitFormStep: function (stepKey, gotoNextStep) {
					var inst = this;
					if (inst.basketLoading) {
						return;
					}

					inst.basketLoading = 1;
					// переделать на аякс
					inst.steps[stepKey].loading = true;
					var formData = [];
					formData.push({name: 'bxajaxid', 'value': inst.bxajaxid});
					formData.push({name: 'STEP', 'value': (inst.steps[stepKey].number + (gotoNextStep ? 1 : 0))});
					formData.push({name: 'PREV_STEP', 'value': inst.steps[stepKey].number});
					formData.push({name: 'COMMENT', 'value': inst.comment});
					if (gotoNextStep) {
						formData.push({name: 'BASKET_ACTION', 'value': gotoNextStep});
					}

					$.each(inst.forms[stepKey]['fields'], function (key, field) {
						if (field.type == 'groupField') {

							$.each(field.fields, function (key, field) {
								formData.push({
									name: field.name,
									value: field.value
								})
							}
							);
							return;
						}

						formData.push({
							name: field.name,
							value: field.value
						})
						return;
					}
					);
					$.post({
						url: inst.submitUrl,
						data: formData,
						dataType: 'json'
					})
							.done(function (response) {

								if (response.order.reload) {
									window.location = response.currentUrl;
									return;
								}
								inst.bonusCurrentOrder = response.bonusCurrentOrder;
								inst.basketLoading = 0;
								inst.state = response.state;
								inst.steps = response.steps;
								inst.currentStep = _.findWhere(inst.steps, {current: true});
								inst.order = response.order;
								inst.errors.form = response.errors.form;
								inst.errors.fields = [];
								if (gotoNextStep && parseFloat(inst.steps[stepKey].number) >= parseFloat(response.step)) {

									inst.errors.fields = response.errors.fields;
								}

								inst.forms = response.forms;

								inst.presents = response.presents;

								Model.updateBasket(response.products, false);
								Model.updatePresent(response.presentsProduct, response.presents);

								history.pushState({}, null, response.currentUrl);
							})
							.fail(function (response) {
								inst.basketLoading = 0;
								console.log('basket submit fail')
							});
				},
				editFormStep: function (stepKey) {
					this.setCurrentStep(stepKey);
					$.each(this.steps, function (key, step) {
						step.error = false;
					});
				},
				goToPrevFormStep: function (step) {
					var prevStep = _.findWhere(this.steps, {number: step.number - 1});
					if (prevStep) {
						prevStep.current = true;
						step.current = false;
						this.setCurrentStep(prevStep.code);
					} else {
						window.location = "/order/";
					}
				},
				stepBodyEnterAnimation: function (element, done) {
					var el = $(element);
					el.delay(300).hide().css('opacity', 0).slideDown(300, function () {
						el.find('input, textarea').first().focus();
						el.animate({'opacity': 1}, 300, done);
					});
				},
				stepBodyLeaveAnimation: function (element, done) {
					var el = $(element);
					el.show().css('opacity', 1).animate({'opacity': 0}, 300, function () {
						el.show().slideUp(300, done);
					})
				},
				noop: function () {
					return false;
				},
                setAactiveAccordeon: function(index){
				    if(this.activeAccordeon===index) {
                        this.activeAccordeon=false;
					}
					else{
                        this.activeAccordeon=index;
					}
				}
			},
			mounted: function () {

				var inst = this;

				inst.presents = inst.staticDataSource.presents;

				if (inst.staticDataSource.products) {
					Model.updateBasket(inst.staticDataSource.products, this.bxajaxid);
				}

				if (inst.staticDataSource.presentsProduct) {
					Model.updatePresent(inst.staticDataSource.presentsProduct, inst.staticDataSource.presents);
				}

				inst.bonusCurrentOrder = inst.staticDataSource.bonusCurrentOrder;

				inst.submitForSoapCheck();
				//каждаые 3 минуты чекаем соап
				setInterval(function () {
					inst.submitForSoapCheck();
				}, 60000);


				inst.authorized = Model.authorized;
			},
			created: function () {

				console.log('checkout-main staticDataSource', this.staticDataSource)

				var inst = this;
				if (inst.staticDataSource.comment) {
					inst.comment = inst.staticDataSource.comment;
				}
				if (inst.staticDataSource.giftCertCode) {
					inst.giftCertCode = inst.staticDataSource.giftCertCode;
				}

				if (inst.staticDataSource) {
					inst.state = inst.staticDataSource.state;
					inst.steps = inst.staticDataSource.steps;
					inst.discountCard = inst.staticDataSource.discountCard;
					inst.discountCardPersent = inst.staticDataSource.discountCardPersent;
					inst.discountCardAmountOrders = inst.staticDataSource.discountCardAmountOrders;


					inst.bonusCurrentOrder = inst.staticDataSource.bonusCurrentOrder;
					inst.bonusCvartalSumm = inst.staticDataSource.bonusCvartalSumm;


					inst.currentStep = _.findWhere(inst.steps, {current: true});
					inst.errors = inst.staticDataSource.errors;
					inst.order = inst.staticDataSource.order;
					inst.forms = inst.staticDataSource.forms;
					console.log(inst.staticDataSource);
				} else {
					inst.state = 'checkout';
				}

				Model.$on('basketPresentUpdated', function () {
					inst.presentsProduct = Model.basket.presentsProduct;
					inst.presents = Model.basket.presents;
				});

				Model.$on('basketUpdated', function () {
					inst.order.basketPrice = Model.basketPrice;
					inst.order.basketSale = Model.basketSale;
					inst.order.basketCount = Model.basketCount;
                    $.post({
                        url: '/api/basket-data.php',
                        dataType: 'json'
                    })
                        .done(function (response) {
                            inst.order.weight=response['weight'];
                            inst.order.capacity=response['capacity'];
                        });

					inst.basket = Model.basket;
					inst.bonusCurrentOrder = Model.basket.bonusCurrentOrder;

					if (!inst.fromSubmitForSoapCheck) {
						inst.submitForSoapCheck();
					} else {
						inst.fromSubmitForSoapCheck = 0;
					}

				});
			}
		});
	});
</script>