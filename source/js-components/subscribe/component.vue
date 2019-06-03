<template>
	<div>
		<div class="product-detailed__offers" v-if="rubrics && rubrics.length" >
			<div class="product-table">
				<div class="product-table__head">
					<div class="product-table__th">Подписка</div>
					<div class="product-table__th"></div>
				</div>
				<div class="product-table__body">

					<div class="product-table-row" v-for="(rubric, rubIndex) in rubrics">

						<div data-title="Подписка" class="product-table-row__cell">
							<div class="product-table-row__cell-in">
								<p><strong>{{rubric.name}}</strong></p>
								<p v-html="rubric.description"></p>
							</div>

						</div>


						<div class="product-table-row__cell">

							<div class="product-table-row__cell-in">
								<span class="toggle-buttons toggle-buttons--profile js-toggle-open-one-group">
									<button type="button" class="btn" :class="{'btn--info': !rubric.active}"  @click="subscribeTogle(rubric)"><span class="btn__inner">{{rubric.active?'Отписаться':'Подписаться'}}</span></button>
								</span>
							</div>

						</div>
					</div>

				</div>
			</div> 
		</div>

		<div class="catalog-list-main_container" v-if="productsQuantity && productsQuantity.length">
			<div class="product-detailed__offers">
				<div class="catalog-list-block">
					<div class="container">


						<div class="floor-header floor-header--separator">
							<div class="floor-header__left floor-header__left--empty">
							</div>
							<div class="floor-header__main">
								<h2> 
									Сообщить о появлении в наличии
								</h2>
							</div>
							<div class="floor-header__right floor-header__right--empty">
							</div>
						</div>


						<transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-scale">
							<div class="catalog-grid__item col" v-for="product in productsQuantity" :key="product.productId">
								<product :product="product"
									:show-buy-button="false" 
									:show-fav-button="false" 
									:show-quick-view="false"
									:show-catalog-props-anyway="false">

								<div class="product__action flc"  slot="button">
									<button type="button" class="btn"    @click="productUnsubscribe(product)"><span class="btn__inner">{{product.active?'Отписаться':'Активировать'}}</span></button>
								</div>

								</product>
								<!-- :delivery="product.delivery" -->
							</div>
						</transition-group>

					</div>

				</div>
			</div>
		</div> 


		<div class="catalog-list-main_container" v-if="productsPrice && productsPrice.length">
			<div class="product-detailed__offers">
				<div class="catalog-list-block">
					<div class="container">



						<div class="floor-header floor-header--separator">
							<div class="floor-header__left floor-header__left--empty">
							</div>
							<div class="floor-header__main">
								<h2> 
									Сообщить о изменении цены
								</h2>
							</div>
							<div class="floor-header__right floor-header__right--empty">
							</div>
						</div> 

						<transition-group tag="div" class="catalog-grid__grid grid" mode="out-in" name="content-scale">
							<div class="catalog-grid__item col" v-for="product in productsPrice" :key="product.productId">
								<product :product="product"
									:show-buy-button="false" 
									:show-fav-button="false" 
									:show-quick-view="false"
									:show-catalog-props-anyway="false">

								<div class="product__action flc"  slot="button">
									<button type="button" class="btn"    @click="productUnsubscribe(product)"><span class="btn__inner">{{product.active?'Отписаться':'Активировать'}}</span></button>
								</div>

								</product>
								<!-- :delivery="product.delivery" -->
							</div>
						</transition-group>
					</div>

				</div>
			</div>
		</div> 

	</div>
</template>



<script>
	define(['app', 'vue!product/component'], function (app) {
		Vue.component('subscribe', {
			data: function () {
				return {
					sendUrl: "/personal/subscribe/",
					bxajaxid: null,
					rubrics: [],
					productsQuantity: [],
					productsPrice: [],
				}
			},
			template: template,
			props: {
				staticData: {
					default: null
				},
			},
			created: function () {
				var inst = this;

				console.log(inst.staticData);

				if (inst.staticData && inst.staticData.bxajaxid) {
					inst.bxajaxid = inst.staticData.bxajaxid;
				}

				if (inst.staticData && inst.staticData.sendUrl) {
					inst.sendUrl = inst.staticData.sendUrl;
				}


				if (inst.staticData && inst.staticData.rubrics) {
					inst.rubrics = inst.staticData.rubrics;
				}

				if (inst.staticData && inst.staticData.productsQuantity) {
					inst.productsQuantity = inst.staticData.productsQuantity;
				}

				if (inst.staticData && inst.staticData.productsPrice) {
					inst.productsPrice = inst.staticData.productsPrice;
				}

			},
			methods: {
				subscribeTogle: function (rubric) {

					rubric.active = !rubric.active;
					var data = {SUBSCRIBE_UPDATE: 1, SUBSCRIB_RUB_ID: []};

					$.each(this.rubrics, function (key, rubr) {
						console.log(rubr);
						if (rubr.active) {
							data.SUBSCRIB_RUB_ID.push(rubr.id);
						}
					});

					this.submit(data);
				},

				productUnsubscribe: function (product) {
					var data = {};
					data.UNSUBSCRIBE = product.subscribeID;
					this.submit(data);
				},

				submit: function (data) {
					var inst = this;


					if (inst.bxajaxid) {
						data.bxajaxid = inst.bxajaxid;
					}

					$.ajax({
						type: "POST",
						url: inst.sendUrl,
						dataType: 'json',
						data: data
					})
							.done(function (response) {
								console.log('subscriprion response', response)
								inst.results = response;


								if (response && response.rubrics) {
									inst.rubrics = response.rubrics;
								} else {
									inst.rubrics = [];
								}

								if (response && response.productsQuantity) {
									inst.productsQuantity = response.productsQuantity;
								} else {
									inst.productsQuantity = [];
								}

								if (response && response.productsPrice) {
									inst.productsPrice = response.productsPrice;
								} else {
									inst.productsPrice = [];
								}


							})
							.fail(function (response) {
								console.warn('subscription ajax fail: ', response);
							});
				}
			}
		});
	});
</script>