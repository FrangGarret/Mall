import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
		carPanelData: [],
		maxOff:false,//模态框是否显示
		carShow:false,//购物车详情弹出框是否显示
		carTimer:null,
		ball:{//创建点击加入购物车的小球飞入购物车的效果
			show:false,
			el:null,
			img_src:null

		}
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
						return 
					}
					state.carShow = true;	

				}
			})

			if(bOff) {
				let goodsData = data;
				Vue.set(goodsData, 'count', 1);
				state.carPanelData.push(goodsData)
				state.carShow = true;
			}

			state.ball.show = true;//小球显示
			state.ball.img_src = data.ali_image;//小球中的图片为当前选择的商品图片
			state.ball.el = event.path[0];
			//console.log(event)
			//console.log(JSON.stringify(state.carPanelData,null,4))
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
		},
		// 显示购物车
		showCar(state){
			clearTimeout(state.carTimer)
			state.carShow = true;
		},
		//隐藏购物车
		hideCar(state){
			state.carTimer = setTimeout( () =>{
				state.carShow = false;
			},300)
			
		}
	}
})

export default store;