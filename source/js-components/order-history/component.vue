<template> 
	<div>
		<div v-for="(orderData, orderIndex) in orders" class="floor floor--slider-products flc">
			<transition name="content-fade" mode="out-in">


				<div class="checkout-main" >

					<div class="form-w-steps">
						<section class="product-detailed">
							<header class="form-step__header step-header" >
								<div class="step-header__cell-title">

									<h3 class="product-detailed__name"><span href="/49748-91090-p" class="product-detailed__name-link">Заказ №{{orderData.order.id}}&nbsp;от&nbsp;{{orderData.order.date}}</span></h3>

									<div class="product-detailed__params">

										<div class="product-detailed__param" v-if="orderData.order.delivery && orderData.order.delivery.name">
											<span class="product-detailed__param-name"><b>Доставка:</b> </span><span class="product-detailed__param-value"> {{orderData.order.delivery.name}}</span>
										</div>
										<div class="product-detailed__param" v-if="orderData.order.deliveryPrice">
											<span class="product-detailed__param-name"><b>Цена доставки:</b> </span><span class="product-detailed__param-value"> {{orderData.order.deliveryPrice |formatPrice}} руб.</span>
										</div> 

										<div class="product-detailed__param" v-if="orderData.order.status && orderData.order.status.name">
											<span class="product-detailed__param-name"><b>Статус заказа:</b> </span><span class="product-detailed__param-value"> {{orderData.order.status.name}}</span>
										</div>
										<div class="product-detailed__param" v-if="orderData.order.payment && orderData.order.payment.name">
											<span class="product-detailed__param-name"><b>Оплата:</b> </span><span class="product-detailed__param-value"> {{orderData.order.payment.name}}</span>
										</div>

										<div class="product-detailed__param" v-if="orderData.order.payment && orderData.order.payment.name">
											<span class="product-detailed__param-name"><b>Сумма заказа:</b> </span><span class="product-detailed__param-value"> {{orderData.order.basketPriceWithDelivery |formatPrice}} руб.</span>
										</div> 

									</div> 
								</div>
								<transition name="content-fade">
									<div class="step-header__cell-action">

										<button type="button" class="btn btn--sm" @click="repeatOrder(orderIndex)" v-if="current == orderData.order.id && orderData.products.length"><span class="btn__inner">Повторить</span></button>&nbsp;

										<button type="button" class="btn btn--sm" @click="toggleOpen(orderIndex)" v-if="current == orderData.order.id"><span class="btn__inner">Свернуть</span></button>

										<button type="button" class="btn btn--sm" @click="toggleOpen(orderIndex)" v-if="current != orderData.order.id && orderData.order.statusID!='C'"><span class="btn__inner">Детали заказа</span></button>

									</div> 
								</transition>
							</header>

							<transition-group tag="div" @enter="stepBodyEnterAnimation" @leave="stepBodyLeaveAnimation" mode="out-in">

								<div class="form-card--w-arrow flc"  key="openContent" v-if="current == orderData.order.id && orderData.products.length">
									<transition name="content-fade">
										<div>

											<p></p><hr class="floor-separator"/><p></p>


											<div class="grid" v-if="orderData.order.files && orderData.order.files.length">
												<div class="col col-lg-4 col-md-6 col-sm-4 col-xs-6 col-2xs-12" v-for="file in orderData.order.files">


													<a :href="file.link" class="block-banner-w-text block-banner-w-text--sm" target="_blank" download v-if="file.ext != 'pdf'">

														<h4 class="block-banner-w-text__title flc">
															<span class="block-banner-w-text__title-txt">{{file.name}}</span>
														</h4> 


														<div class="block-banner-w-text__text flc">Файл, {{file.ext}} {{file.size}}</div>  

													</a>

													<a :href="file.link" class="block-banner-w-text block-banner-w-text--sm" target="_blank" v-else="file.ext != 'pdf'">

														<h4 class="block-banner-w-text__title flc">
															<span class="block-banner-w-text__title-txt">{{file.name}}</span>
														</h4> 


														<div class="block-banner-w-text__text flc">Файл, {{file.ext}} {{file.size}}</div>  

													</a>

												</div> 

											</div>

											<div v-if="orderData.order.files && orderData.order.files.length">
												<p></p><hr class="floor-separator"/><p></p>
											</div>

											<div class="offers-list__item" v-for="productData in orderData.products">

												<product :product="productData"
													:showCode="true"
													:list-item="true" 

													:bind-basket-count="true"
													:list-item-lg="true"
													:basket-mode="true"></product>


											</div> 

										</div>
									</transition> 
								</div>

							</transition-group>
						</section>
					</div>
				</div>
			</transition> 



		</div> 
		<page-nav v-if="pages.count > pages.limit"  
				  :show-more="false"
				  :show-pages="true"
				  :show-prev-arrow="true"
				  :show-next-arrow="true"
				  :base-url="baseUrl" 
				  :count="pages.count"
				  :limit="pages.limit"
				  :offset="pages.offset"
				  @more="loadMore" 
				  @goto="goToPage"></page-nav>
	</div> 
</template>




<script>
	define(['Model', 'vue!product/component', 'vue!page-nav/component'], function (Model) {
		Vue.component('order-history', {
			template: template,
			data: function () {
				return {
					loading: false,
					current: 0,
					orders: {},
					pages: {},
					baseUrl: ""
				}
			},
			props: {
				staticDataSource: {
					default: null
				},
				bxajaxid: {
					default: null
				},
			},
			methods: {

				loadMore: function () {
					var inst = this;

					inst.reloadPages(
							{bxajaxid: inst.bxajaxid,
								offset: inst.pages.offset + inst.pages.limit,

								limit: inst.pages.limit
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

					inst.reloadPages(
							{
								bxajaxid: inst.bxajaxid,
								offset: (page - 1) * inst.pages.limit,
								limit: inst.pages.limit
							}
					);

					inst.pages.offset = (page - 1) * inst.pages.limit;
				},

				reloadPages: function (data, options) {
					var inst = this;



					$.post({
						url: inst.baseUrl,
						data: data,
						dataType: 'json'
					})
							.done(function (response) {


								if (options && options.append) {
									inst.orders.push.apply(inst.orders, response.orders);
								} else {
									inst.orders = response.orders;
									if (inst.initialized)
										$('html, body').animate({scrollTop: $(inst.$el).offset().top - 30}, 500);
								}

								inst.pages = response.pages;
								inst.pages.offset = parseInt(inst.pages.offset)
								inst.pages.limit = parseInt(inst.pages.limit)
								inst.pages.count = parseInt(inst.pages.count)

							})
							.fail(function (response) {
								console.log('catalog list main reloadPages failed', response)

							});
				},

				repeatOrder: function (index) {
					var inst = this;
					if (inst.orders[index].products.length) {
						Model.repeatOrder(1, inst.orders[index].products);
						Model.$on('basketUpdated', function () {
							inst.waiting = false;
							window.location = "/order/";
						});
					}
				},
				toggleOpen: function (index) {

					var inst = this;
					if (inst.orders[index].order.id == inst.current) {
						inst.current = 0;
					} else {
						inst.current = inst.orders[index].order.id;
						if (!inst.orders[index].products.length) {
							inst.loading = true;
							$.post({
								url: window.location.toString(),
								data: {
									bxajaxid: inst.bxajaxid,
									ORDER_ID: inst.current
								},
								dataType: 'json'
							})
									.done(function (response) {
										inst.loading = false;
										inst.errors = inst.staticDataSource.errors;
										inst.orders[index].order.files = response.order.files;
										inst.orders[index].products = response.products;
										inst.orders[index].columns = response.columns;
									})
									.fail(function (response) {
										inst.errors = "Ошибка выполнения запроса";
										inst.loading = false;
									});
						}
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
				}
			},

			filters: {
				formatPrice: Model.formatPrice
			},

			mounted: function () {
				var inst = this;
				if (inst.staticDataSource) {

					inst.pages = inst.staticDataSource.pages;
					inst.orders = inst.staticDataSource.orders;
					inst.baseUrl = inst.staticDataSource.baseUrl;
				}
			},
		});
	});
</script>