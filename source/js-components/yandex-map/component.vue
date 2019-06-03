<template>
	<div class="ymap-container">
		<div :id="ymapId" :style="{ width: '100%', height: '100%' }"></div>
		<slot></slot>
	</div>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('yandex-map', {
		template: template,

		data: function() {
			return {
				ymapId: 'yandexMap' + Math.round(Math.random()*100000),
				map: null,
				markers: []
			}
		},

		props: {
			coords: {
				type: Array,
				validator: function(val) {
					return !val.filter(function(item){return isNaN(item)}).length
				},
				required: true
			},
			zoom: {
				validator: function(val) {
					return !isNaN(val)
				},
				default: 18
			},
			adjustInitialBounds: {
				type: Boolean,
				default: true
			}
		},

		computed: {
			coordinates: function() {
				return this.coords.map(function(item) {return +item;})
			}
		},

		watch: {
			coords: function(newValue, oldValue) {
				if(this.map)
					this.map.setCenter(newValue);
			}
		},

		beforeCreate: function() {
			var inst = this;

			if (this.$ymapEventBus.scriptIsNotAttached) {
				var yandexMapScript = document.createElement('SCRIPT');
				yandexMapScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
				yandexMapScript.setAttribute('async', '');
				yandexMapScript.setAttribute('defer', '');
				document.body.appendChild(yandexMapScript);
				this.$ymapEventBus.scriptIsNotAttached = false;
				yandexMapScript.onload = function() {
					inst.$ymapEventBus.ymapReady = true;
					inst.$ymapEventBus.$emit('scriptIsLoaded');
				}
			} 
			else {
				return false;
			}
		},

		created: function() {
			var inst = this;

			$(document).ready(function() {

				if (inst.$ymapEventBus.ymapReady) {
					ymaps.ready(init.bind(inst));
				} 
				else {
					inst.$ymapEventBus.$on('scriptIsLoaded', function() {
						ymaps.ready(init.bind(inst));
					})
				}
			});

			function init() {
				inst.map = new ymaps.Map(inst.ymapId, {
					center: inst.coordinates,
					zoom: +inst.zoom,
					controls: ['fullscreenControl', 'geolocationControl', 'zoomControl']
				});

				inst.map.behaviors.disable('scrollZoom');
				if(View && View.mobileAndTabletCheck)
					inst.map.behaviors.disable('drag');

				setMarkers(); 
				
				if(inst.adjustInitialBounds) {
					inst.map.setBounds(inst.map.geoObjects.getBounds(), {checkZoomRange:true}).then(function() {
					
						if(inst.map.getZoom() > 16) inst.map.setZoom(16);
					});
				}
			}

			function setMarkers() {
				inst.map.geoObjects.removeAll();
				inst.markers.splice(0, inst.markers.length);

				/*var styleForMarker = new ymaps.Style();
				styleForMarker.iconStyle = new ymaps.IconStyle();
				styleForMarker.iconStyle.href = "/local/images/map-marker.png";
				styleForMarker.iconStyle.size = new ymaps.Point(36, 48);
				styleForMarker.iconStyle.offset = new ymaps.Point(-14, -48);
				*/
				
				var myMarkers = !inst.$slots.default ? [] : inst.$slots.default.map(function(marker) {
					var props = marker.componentOptions && marker.componentOptions.propsData;
					if (!props) return;
					return {
						markerType: props.markerType,
						coords: setCoordsToNumeric(props.coords),
						hintContent: props.hintContent,
						icon: props.icon,
						balloon: props.balloon,
						markerStroke: props.markerStroke,
						markerFill: props.markerFill,
						circleRadius: +props.circleRadius
					}
				}).filter(function(marker) {return marker && marker.markerType});

				for (var i = 0; i < myMarkers.length; i++) {
					var markerType = setFirstLetterToUppercase(myMarkers[i].markerType);
					var properties = {
						hintContent: myMarkers[i].hintContent,
						balloonContentHeader: myMarkers[i].balloon && myMarkers[i].balloon.header,
						balloonContentBody: myMarkers[i].balloon && myMarkers[i].balloon.body,
						balloonContentFooter: myMarkers[i].balloon && myMarkers[i].balloon.footer,
						iconContent: myMarkers[i].icon && myMarkers[i].icon.content
					};
					var options = {
						//preset: myMarkers[i].icon && 'islands#' + 'getIconPreset(myMarkers[i])' + 'Icon',
						iconLayout: 'default#image',
						iconImageHref: '/local/images/map-marker.png',
						iconImageSize: [45,51],
						iconImageOffset: [-17,-50],
						strokeColor: myMarkers[i].markerStroke && myMarkers[i].markerStroke.color || "0066ffff",
						strokeOpacity: myMarkers[i].markerStroke && myMarkers[i].markerStroke.opacity || 1,
						strokeStyle: myMarkers[i].markerStroke && myMarkers[i].markerStroke.style,
						strokeWidth: myMarkers[i].markerStroke && myMarkers[i].markerStroke.width || 1,
						fill: myMarkers[i].markerFill && myMarkers[i].markerFill.enabled || true,
						fillColor: myMarkers[i].markerFill && myMarkers[i].markerFill.color || "0066ff99",
						fillOpacity: myMarkers[i].markerFill && myMarkers[i].markerFill.opacity || 1,
					};
					if (markerType === 'Circle') {
						myMarkers[i].coords = [myMarkers[i].coords, myMarkers[i].circleRadius];
					}
					var marker = new ymaps[markerType](myMarkers[i].coords, properties, options);
					inst.map.geoObjects.add(marker);
					inst.markers.push(marker);
				}
			}

			function getIconPreset(marker) {
				var firstPart = marker.icon.color || 'blue',
					secondPart;
				if (marker.icon.glyph) {
					secondPart = setFirstLetterToUppercase(marker.icon.glyph);
				} else if (marker.icon.content) {
					secondPart = 'Stretchy';
				} else {
					secondPart = '';
				}
				return firstPart + secondPart;
			}

			function setFirstLetterToUppercase(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}

			function setCoordsToNumeric(arr) {
				return arr.map(function(item) {
					return Array.isArray(item) ? setCoordsToNumeric(item) : +item;
				});
			}

			inst.$on('adjustBounds', function() {
				if(inst.map) {
					setMarkers();
					inst.map.setBounds(inst.map.geoObjects.getBounds(), {checkZoomRange:true}).then(function() {
						if(inst.map.getZoom() > 16) inst.map.setZoom(16);
						console.log(inst.map.getZoom())
					});
				}
			});

			inst.$on('openBalloon', function(index) {
				if(inst.markers) {
					inst.markers[index].balloon.open();
				}
			});
		}
	});
});
</script>