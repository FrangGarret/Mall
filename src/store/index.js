import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
		carPanelData: [],
		maxOff:false
	},
	getters:{
		//商品总数量
		totleCount(state){
			let count = 0;
			state.carPanelData.forEach( (item) => {
				count += item.count
			})
			return count
		},
		//商品总价格 
		totlePrice(state){
			let price = 0;
			state.carPanelData.forEach( (item) => {
				price += item.price*item.count
			})
			return price
			
		}
	},
	mutations: {
		//添加商品到购物车
		addCarPanelDate(state, data) {
			let bOff = true;

			state.carPanelData.forEach((items) => {
				if(items.sku_id === data.sku_id) {
					items.count++;
					bOff = false;
					
					//判断是否超过最大购买量
					if(items.count > items.limit_num){
						items.count--
						state.maxOff = true
					}
				}
			})

			if(bOff) {
				let goodsData = data;
				Vue.set(goodsData, 'count', 1);
				state.carPanelData.push(goodsData)
			}

			console.log(JSON.stringify(state.carPanelData,null,4))
		},
		
		//删除商品
		
		delCarPanelDate(state,id){
			state.carPanelData.forEach( (item,index) => {
				if( item.sku_id === id){
					state.carPanelData.splice(index,1)
					return 
				}
			})
		},
		//关闭弹出框
		closePrompt(state){
			state.maxOff = false; 
		}
		
	}
})

export default store;