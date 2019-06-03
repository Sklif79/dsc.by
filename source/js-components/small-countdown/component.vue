<template>
	<span class="small-countdown" v-if="localTime > 0">{{localTime | formatTime}}</span>
	<span class="small-countdown" v-else>{{endText}}</span>
</template>



<script>
define(['Model'], function(Model){
	Vue.component('small-countdown', {
		template: template,

		data: function() {
			return {
				localTime: null,
				localEndTime: null,
				clockInterval: null
			}
		},

		props: {
			endTime: {
				default: null
			},
			endText: {
				default: '0:0:0:0'
			}
		},

		methods: {
			updLocalTime: function() {
				this.localTime = new Date(this.localEndTime - Date.now());
			}	
		},

		filters: {
			formatTime: function(time) {
				if(!time)
					return 0;

				var hours = time.getHours();
				var minutes = time.getMinutes();
				var seconds = time.getSeconds();
				var days = Math.floor(time / (24 * 60 * 60 * 1000))

				if(hours < 10)
					hours = '0' + hours;

				if(minutes < 10)
					minutes = '0' + minutes;

				if(seconds < 10)
					seconds = '0' + seconds;

				return days + ':' + hours + ':' + minutes + ':' + seconds;
			}
		},

		mounted: function() {
			var inst = this;

			inst.localEndTime = Date.parse(inst.endTime);

			if(inst.localEndTime) {
				inst.updLocalTime();
				inst.clockInterval = setInterval(inst.updLocalTime, 1000);
			}
		},

		destroyed: function() {
			clearInterval(this.clockInterval);
		}
	});
});
</script>