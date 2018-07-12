import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
		carPanelData: []
	},
	mutations: {
		addCarPanelDate(state, data) {
			let bOff = true;

			state.carPanelData.forEach((items) => {
				if(items.sku_id === data.sku_id) {
					items.count++;
					bOff = false;
				}
			})

			if(bOff) {
				let goodsData = data;
				Vue.set(goodsData, 'count', 1);
				state.carPanelData.push(goodsData)
			}

			console.log(state.carPanelData)
		}
	}
})

export default store;