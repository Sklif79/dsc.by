<template>
	<div class="image-gallery" :class="{'image-gallery--w-zoom': zoom, 'image-gallery--zoom-active': zoomActive && zoomLoaded, 'image-gallery--horizontal': mode == 'horizontal'}">
		 <div class="image-gallery__previews" v-if="gallery.length > 1 && mode != 'horizontal'"
		 :class="{'image-gallery__previews--folded': previewsFolded, 'image-gallery__previews--overflow': previewsOwerflown}">
		 <div class="image-gallery__previews-item" v-for="(image, index) in gallery" :class="{'active': index == currentIndex}" @click="switchImage(index)">
			 <img :src="image.src.preview" alt="" v-if="image.type == 'image'">
				<img :src="'https://img.youtube.com/vi/' + image.src.videoId + '/sddefault.jpg'" alt="" v-if="image.type == 'youtube'">
					<svg class="svg-icon" v-if="image.type == 'youtube'"><use xlink:href="#svg-icon-video"></use></svg>
			</div>
			<div class="image-gallery__previews-more" v-if="gallery && gallery.length > 6">
				<transition name="content-fade">
					<span class="link link--local" v-if="previewsFolded" @click="toggleFoldedPreviews">
						Еще <span class="image-gallery__previews-more-num"> {{gallery.length - 6}} </span>
					</span>
					<span class="link link--local" v-else @click="toggleFoldedPreviews">
						Свернуть
					</span>
				</transition>
			</div>
		</div>
		<div class="image-gallery__previews" :class="{'image-gallery__previews--slider-on': gallery.length > 4}" v-else-if="gallery.length > 1 && mode == 'horizontal'">
			<slick class="slick-default-arrows" :options="previewSliderOptions" ref="previewSlider">
				<div class="image-gallery__previews-slide" v-for="(image, index) in gallery">
					<div class="image-gallery__previews-item" :class="{'active': index == currentIndex}" @click="switchImage(index)">
						 <img :src="image.src.preview" alt="" v-if="image.type == 'image'">
						<img :src="'https://img.youtube.com/vi/' + image.src.videoId + '/sddefault.jpg'" alt="" v-if="image.type == 'youtube'">
							<svg class="svg-icon" v-if="image.type == 'youtube'"><use xlink:href="#svg-icon-video"></use></svg>
					</div>
				</div>
			</slick>
		</div>
		<div class="image-gallery__view">
			<slick ref="slider" class="image-gallery__slider slick-default-arrows slick-default-dots" :options="sliderOptions" @beforeChange="slide">
				<div class="image-gallery__slide" v-for="image in gallery">
					<div class="image-gallery__img-box" :class="{'image-gallery__img-box--video': image.type == 'youtube'}" @click="imageClick(image)">
						<div class="image-gallery__img-box-in">
							<div class="image-gallery__img-wrap" :class="{'image-gallery__img-wrap--cover': image.type == 'youtube'}">
								<img :src="image.src.main" alt="" v-if="!zoom && image.type == 'image'">
								<img :src="image.src.main" alt="" v-if="zoom && image.type == 'image' && !touchMode" 
									@click="zoomToggle" @mouseleave="zoomHide" @mousemove="zoomMove">
								<img :src="image.src.main" alt="" v-if="zoom && image.type == 'image' && touchMode" 
									@touchstart="zoomShow" @touchend="zoomHide" @touchmove="zoomMove">
								<img :src="'https://img.youtube.com/vi/' + image.src.videoId + '/hqdefault.jpg'" alt="" v-if="image.type == 'youtube'">
									<svg class="image-gallery__video-icon svg-icon" v-if="image.type == 'youtube'"><use xlink:href="#svg-icon-video"></use></svg>
								<!--iframe :src="'https://www.youtube.com/embed/' + image.src.videoId" allowfullscreen ></iframe-->
								<div class="image-gallery__lens" v-if="zoom && image.type == 'image'" 
									 :style="{left: zoomLensX + 'px', top: zoomLensY + 'px', width: zoomLensWidth + 'px', height: zoomLensHeight + 'px'}"></div>
							</div>
						</div>
					</div>
				</div>
			</slick>
			<div class="image-gallery__tip image-gallery__tip--zoom" v-if="zoom && !touchMode ">
				<img src="/local/images/icons/Zoom.png" alt="">
			</div>
		</div>
	</div>
</template>



<script>
	define(['Model', 'vue!slick/component'], function (Model) {
		var simpleZoomVars = {
			zoomOffsetX: 0,
			zoomOffsetY: 0,
			zoomImageWidth: 0,
			zoomImageHeight: 0,
			zoomOriginalWidth: 0,
			zoomOriginalHeight: 0,
			zoomTarget: null
		};


		Vue.component('image-gallery', {
			template: template,

			data: function () {
				return {
					previewsFolded: true,
					previewsOwerflown: false,
					galleryId: null,
					zoomActive: false,
					zoomLoaded: false,
					zoomLensX: 0,
					zoomLensY: 0,
					zoomLensWidth: 0,
					zoomLensHeight: 0,
					currentIndex: 0,
					sliderOptions: {
						waitForAnimate: false,
						swipe: View.mobileAndTabletCheck,
						draggable: false,
                        prevArrow: '<span class="slick-arrow slick-prev" style="color: #fff;"><svg class="svg-icon"><use xlink:href="#svg-icon-small-arrow-left"></use></svg></span>',
                        nextArrow: '<span class="slick-arrow slick-next" style="color: #fff;"><svg class="svg-icon"><use xlink:href="#svg-icon-small-arrow-right"></use></svg></span>',
						responsive: [
							{
								breakpoint: View.breakpoints['xs-max'],
								settings: {
									arrows: false,
									dots: true,
									swipe: true
								}
							}
						]
					},
					previewSliderOptions: {
						slidesToShow: 4,
						slidesToScroll: 3,
						infinite: false
					},
					touchMode: false
				}
			},

			props: {
				gallery: {
					default: null
				},
				zoom: {
					type: Boolean,
					default: false
				},
				zoomViewerWidth: {
					default: null
				},
				zoomViewerHeight: {
					default: null
				},
				mode: {
					default: 'vertical'
				}
			},

			watch: {
				gallery: function () {
					this.$refs.slider.reSlick();
					this.switchImage(0)
				}
			},

			methods: {
				switchImage: function (index) {
					this.currentIndex = index;
					this.$refs.slider.goTo(index);
				},

				slide: function (e, slick, oldIndex, newIndex) {
					this.currentIndex = newIndex;
				},

				setInitialState: function () {
					// пропустить все видео слайды, показать первый не-видео. Для этого слайды с видео должны приходить первыми в массиве
					/*var inst = this;
					 Vue.nextTick(function() {
					 setTimeout(function() {
					 if(inst.$refs.slider) {
					 var videoSlides = _.filter(inst.gallery, {type: 'youtube'});
					 inst.$refs.slider.reSlick();
					 inst.$refs.slider.goTo(videoSlides ? videoSlides.length : 0);	
					 
					 setTimeout(function() {
					 inst.$refs.slider.goTo(videoSlides ? videoSlides.length : 0, true);
					 }, 0);
					 }
					 }, 0);
					 });*/
				},

				toggleFoldedPreviews: function () {
					this.previewsFolded = !this.previewsFolded;
				},

				zoomMove: function (e) {
					var scrollTop = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
					simpleZoomVars.zoomOffsetX = e.offsetX || e.touches[0].pageX - e.target.getBoundingClientRect().left;
					simpleZoomVars.zoomOffsetY = e.offsetY || e.touches[0].pageY - e.target.getBoundingClientRect().top - scrollTop;
					simpleZoomVars.zoomTarget = e.target;

					if (requestAnimationFrame)
						requestAnimationFrame(this.zoomMoveSet)
					else
						zoomMoveSet();

					e.preventDefault();
				},

				zoomMoveSet: function () {
					var inst = this;

					var scale = Math.min(inst.zoomViewerWidth / simpleZoomVars.zoomOriginalWidth, 1);
					inst.zoomLensWidth = simpleZoomVars.zoomImageWidth * scale;
					inst.zoomLensHeight = simpleZoomVars.zoomImageHeight * scale;

					if (scale < 1)
						inst.zoomLensHeight *= inst.zoomViewerHeight / inst.zoomViewerWidth;
					inst.zoomLensHeight = Math.round(inst.zoomLensHeight);
					inst.zoomLensWidth = Math.round(inst.zoomLensWidth);

					inst.zoomLensX = simpleZoomVars.zoomOffsetX - inst.zoomLensWidth / 2;
					inst.zoomLensY = simpleZoomVars.zoomOffsetY - inst.zoomLensHeight / 2;

					if (inst.zoomLensX < 0)
						inst.zoomLensX = 0;
					if (inst.zoomLensX + inst.zoomLensWidth > simpleZoomVars.zoomImageWidth)
						inst.zoomLensX = simpleZoomVars.zoomImageWidth - inst.zoomLensWidth;

					if (inst.zoomLensY < 0)
						inst.zoomLensY = 0;
					if (inst.zoomLensY + inst.zoomLensHeight > simpleZoomVars.zoomImageHeight)
						inst.zoomLensY = simpleZoomVars.zoomImageHeight - inst.zoomLensHeight;

					inst.$emit('zoomMove', inst.zoomLensX / simpleZoomVars.zoomImageWidth, inst.zoomLensY / simpleZoomVars.zoomImageHeight)
				},

				zoomShow: function (e) {
					var inst = this;
					Vue.nextTick(function () {
						inst.zoomActive = true;
						simpleZoomVars.zoomImageWidth = e.target.offsetWidth;
						simpleZoomVars.zoomImageHeight = e.target.offsetHeight;

						if (!inst.zoomLoaded) {
							var testImage = new Image();

							testImage.onload = function () {
								simpleZoomVars.zoomOriginalWidth = testImage.width;
								simpleZoomVars.zoomOriginalHeight = testImage.height;

								if (simpleZoomVars.zoomOriginalWidth < simpleZoomVars.zoomImageWidth * 1.5 &&
										simpleZoomVars.zoomOriginalHeight < simpleZoomVars.zoomImageHeight * 1.5) {
									inst.zoomActive = false;
									return;
								}

								inst.zoomLoaded = true;

								inst.$emit('zoomActivated', inst.gallery[inst.currentIndex]);
							};

							testImage.src = inst.gallery[inst.currentIndex].src.original;
						} else {
							inst.$emit('zoomActivated', inst.gallery[this.currentIndex]);
						}

						inst.$refs.slider.setOption('swipe', !inst.zoomActive);
					});
				},

				zoomHide: function (e) {
					this.zoomActive = false;
					this.zoomLoaded = false;
					this.$emit('zoomDeactivated');

					this.$refs.slider.setOption('swipe', !this.zoomActive);
				},

				zoomToggle: function(e) {
					if(this.zoomActive)
						this.zoomHide(e);
					else
						this.zoomShow(e);
				},

				recalcPreviewsOverflow: function () {
					if (this.$refs.previewsContainer) {
						this.previewsOwerflown = this.$refs.previewsContainer.offsetHeight < this.$refs.previewsContainer.scrollHeight;
						this.$forceUpdate();
					}
				},

				imageClick: function (image) {
					if (image.type == 'youtube')
						View.control.openModalWithIframe({src: 'https://www.youtube.com/embed/' + image.src.videoId});
				}
			},

			created: function () {
				var inst = this;

				this.touchMode = View.mobileAndTabletCheck;
				this.galleryId = Math.round(Math.random() * 100000);

				this.$on('galleryUpdate', function () {
					inst.setInitialState();
				});
			},

			mounted: function () {
				var inst = this;

				this.setInitialState();
				this.recalcPreviewsOverflow();

				$(window).on('resize.watchGalleryPreviewsState' + this.galleryId, function () {
					if (requestAnimationFrame) {
						requestAnimationFrame(inst.recalcPreviewsOverflow);
					} else {
						inst.recalcPreviewsOverflow();
					}
				});
			},

			destroyed: function () {
				$(window).off('resize.watchGalleryPreviewsState' + this.galleryId);
			}
		});
	});
</script>