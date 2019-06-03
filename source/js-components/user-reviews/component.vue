<template>
	<div class="user-reviews">
		<div class="like-no-reviews" v-if="reviews.length == 0">
			<h2 class="like-no-reviews__title flc">Отзывов нет, вы можете стать первым</h2>
			<div class="like-no-reviews__text flc">Расскажите о своем опыте использования товара. Обратите внимание на качество, удобство и соответствие заявленным характеристикам.</div>
			<div class="like-no-reviews__action">
				<button type="button" class="btn" @click="showReviewModal">
					<span class="btn__inner">Оставить отзыв</span>
				</button>
			</div>
		</div>
		<div class="user-reviews__header" v-if="reviews.length != 0">
			<h2 class="user-reviews__header-title">Рейтинг товара</h2>
			<div class="user-reviews__header-stars">
				<rating-block v-if="rating" :value="rating.value" :count="rating.count" :show-text="true"></rating-block>
			</div>
		</div>
		<div class="user-reviews__list" v-if="reviews.length != 0">
			<div class="user-reviews__list-item" v-for="(review, index) in reviews">
				<transition-group tag="div" name="content-fade" mode="out-in">
					<article class="review" v-if="index <= 1 || showAllReviews" :key="index">
						<aside class="review__aside">
							<div class="review__rating">
								<rating-block :value="review.rating"></rating-block>
							</div>


							<div class="review__author">{{review.author}}</div>
							<div class="review__date">{{review.date}}</div>
							<div class="review__aside-key" v-if="review.term">Опыт использования:</div>
							<div class="review__aside-value" v-if="review.term">{{review.term}}</div>
						</aside>
						<div class="review__main">
							<h3 class="review__title" v-if="review.title">{{review.title}}</h3>
							<div class="review__text-block flc" v-if="review.pros">
								<span class="review__text-block-title h4">Достоинства: </span>
								{{review.pros}}
							</div>
							<div class="review__text-block flc" v-if="review.cons">
								<span class="review__text-block-title h4">Недостатки: </span>
								{{review.cons}}
							</div>
							<div class="review__text-block flc" v-if="review.comment">
								<span class="review__text-block-title h4">Комментарий: </span>
								{{review.comment}}
							</div>
							<div class="review__votes hide">
								<div class="review__votes-label">Полезно?</div>
								<div class="review__votes-like">
									<div class="voting-hand voting-hand--like" :class="{'voting-hand--neutral': review.likes == 0}">
										<div class="voting-hand__icon">
											<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-like"></use></svg>
										</div>
										<div class="voting-hand__value">{{review.likes}}</div>
									</div>
								</div>
								<div class="review__votes-dislike">
									<div class="voting-hand voting-hand--dislike" :class="{'voting-hand--neutral': review.dislikes == 0}">
										<div class="voting-hand__icon">
											<svg class="rating-stars__star svg-icon"><use xlink:href="#svg-icon-dislike"></use></svg>
										</div>
										<div class="voting-hand__value">{{review.dislikes}}</div>
									</div>
								</div>
							</div>
						</div>
					</article>
				</transition-group>



			</div>

			<page-nav v-if="showAllReviews && pages.count > pages.limit"  
					  :show-more="true"
					  :show-pages="true"
					  :show-prev-arrow="true"
					  :show-next-arrow="true"
					  :base-url="dataSource" 
					  :count="pages.count"
					  :limit="pages.limit"
					  :offset="pages.offset"
					  @more="loadMore" 
					  @goto="goToPage"></page-nav>
		</div>
		<div class="user-reviews__actions">
			<transition name="content-fade" mode="out-in"  v-if="pages.count > 2">
				<button type="button" class="btn" v-if="!showAllReviews" @click="showAllReviews = !showAllReviews">
					<span class="btn__inner">Показать все отзывы</span>
					<span class="btn__sup">{{pages.count}}</span>
				</button>
				<button type="button" class="btn"  v-if="showAllReviews" @click="showAllReviews = !showAllReviews">
					<span class="btn__inner">Свернуть отзывы</span>
				</button>
			</transition>
			<button type="button" class="btn" @click="showReviewModal " v-if="reviews.length > 0">
				<span class="btn__inner">Оставить отзыв</span>
			</button>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!rating-block/component', 'vue!page-nav/component'], function (Model) {
		Vue.component('user-reviews', {
			template: template,

			data: function () {
				return {
					currentUrl: "/catalog/reviewlist.php",
					bxajaxid: "",
					APPKEY: "",
					pages: [],
					reviews: [],
					rating: null,
					showAllReviews: false,
					initialized: false
				};
			},

			props: {
				dataSource: {
					type: String,
					default: null
				},
				staticDataSource: {
					default: null
				},
				productId: {
					default: null
				},
				offerId: {
					default: null
				}
			},

			methods: {
				showReviewModal: function () {
					Model.showReviewModal(this.productId, this.offerId);
				},
				loadMore: function () {
					var inst = this;

					inst.reloadReviews(
							this.currentUrl,
							{
								APPKEY: inst.APPKEY,
								bxajaxid: inst.bxajaxid,
								offset: inst.pages.offset + inst.pages.limit,
								productID: inst.productId,
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

					inst.reloadReviews(
							this.currentUrl,
							{
								APPKEY: inst.APPKEY,
								bxajaxid: inst.bxajaxid,
								offset: (page - 1) * inst.pages.limit,
								productID: inst.productId,
								limit: inst.pages.limit
							}
					);

					inst.pages.offset = (page - 1) * inst.pages.limit;
				},

				reloadReviews: function (url, data, options) {
					var inst = this;

					$.post({
						url: url,
						data: data,
						dataType: 'json'
					})
					.done(function (response) {
						inst.setState(response, options);
					})
					.fail(function (response) {
						console.log('catalog list main reloadReviews failed', response)

					});
				},
				setState: function (response, options) {
					var inst = this;

					inst.rating = response.rating;
					inst.bxajaxid = response.bxajaxid;
					if (options && options.append) {
						inst.reviews.push.apply(inst.reviews, response.reviews); 
					} else {
						inst.reviews = response.reviews;
						if(inst.initialized)
							$('html, body').animate({scrollTop: $(inst.$el).offset().top - 30}, 500);
					}
					inst.pages = response.pages;
					inst.pages.offset = parseInt(inst.pages.offset)
					inst.pages.limit = parseInt(inst.pages.limit)
					inst.pages.count = parseInt(inst.pages.count)
					inst.APPKEY = response.APPKEY;
					inst.initialized = true;

				},
			},

			created: function () {
				var inst = this;

				if (inst.staticDataSource) {
					inst.reviews = inst.staticDataSource.reviews;
					inst.rating = inst.staticDataSource.rating;
				} else if (inst.dataSource) {
					$.get({
						url: inst.dataSource,
						dataType: 'json'
					})
							.done(function (response) {
								inst.setState(response, false);
							})
							.fail(function (response) {
								console.warn('user-reviews ajax fail: ', response);
							});
				}
			}
		});
	});
</script>