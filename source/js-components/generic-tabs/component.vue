<template>
	<div class="generic-tabs" :class="{'generic-tabs--buttons': buttons, 'generic-tabs--to-radio': mobileRadio}">
		<div class="generic-tabs__nav">
			<div class="generic-tabs__label" v-for="tab in tabs" :class="{active: tab.tabKey == activeTabKey, 'generic-tabs__label--label': !buttons, 'generic-tabs__label--btn': buttons, 'btn': buttons, 'btn--secondary': buttons && tab.tabKey !== activeTabKey, 'btn--primary': buttons && tab.tabKey == activeTabKey}"
					@click="activeTabKey = tab.tabKey; switchTab(tab.tabKey)">
					<span :class="{'btn__inner': buttons}">{{tab.label}}</span>
			</div>
		</div>
		<div class="generic-tabs__tabs">
			<div class="generic-tabs__radio">
				<div v-for="tab in tabs" :key="tab.tabKey" class="rich-form-row">
					<label class="checkbox-row checkbox-row--radio">
						<input type="radio" class="checkbox-row__input" :value="tab.tabKey" v-model="activeTabKey" @change="activeTabKey == tab.tabKey ? switchTab(activeTabKey) : ''">
						<span class="checkbox-row__visual"></span>
						<span class="checkbox-row__text">{{tab.label}}</span>
					</label>
				</div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>



<script>
define(['Model'], function(Model) {
	Vue.component('generic-tabs', {
		template: template,

		data: function() {
			return {
				tabs: [],
				activeTabKey: null
			}
		},

		props: {
			buttons: {
				type: Boolean,
				default: false
			},
			mobileRadio: {
				type: Boolean,
				default: false
			}
		},

		methods: {
			switchTab: function(tabKey) {
				var inst = this;
				
				_.each(this.tabs, function(tab) {
					tab.$emit('toggle', tab.tabKey == tabKey);
				});
			}
		},

		created: function() {
			this.tabs = this.$children;
		},

		mounted: function() {
			var activeTab = _.findWhere(this.$children, {active: true});
			this.activeTabKey = activeTab ? activeTab.tabKey : null;

			
		}
	});
});
</script>