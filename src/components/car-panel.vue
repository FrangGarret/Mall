<template>
	<li class="nav-cart" @mouseover="showCarHandle" @mouseout="hideCarHandle">
	
		<a href="javascript:;" class="ball-rect">购物车</a>
	
		<!--根据class改变颜色-->
	
		<span class="cart-empty-num " :class="{'cart-num':totleCount>0}">
	
				<i>{{totleCount}}</i>
	
			</span>
	
		<div class="nav-cart-wrapper" v-if="carShow">
	
			<div class="nav-cart-list">
	
				<div class="empty" v-if="carPanelData.length<1">
	
					<h3>购物车为空</h3>
	
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
	
				</div>
	
				<div class="full" v-else="carPanelData.length>1">
	
					<div class="nav-cart-items">
	
						<ul>
	
							<li class="clear" v-for="(item,index) in carPanelData">
	
								<div class="cart-item js-cart-item cart-item-sell">
	
									<div class="cart-item-inner">
	
										<div class="item-thumb">
	
											<img :src="item.ali_image">
	
										</div>
	
										<div class="item-desc">
	
											<div class="cart-cell">
	
												<h4>
	
													<a href="#/item/100027401">
	
															{{item.title}}
	
														</a>
	
												</h4>
	
												<p class="attrs">
	
													<span>{{item.spec_json.show_name}}</span>
	
												</p>
	
												<h6>
	
													<span class="price-icon">¥</span>
	
													<span class="price-num">{{item.price}}</span>
	
													<span class="item-num">x {{item.count}}</span>
	
												</h6>
	
											</div>
	
										</div>
	
										<div class="del-btn" @click="delCarPanel(item.sku_id)">删除</div>
	
									</div>
	
								</div>
	
							</li>
	
						</ul>
	
					</div>
	
					<div class="nav-cart-total">
	
						<p>共 <strong class="ng-binding">{{totleCount}}</strong> 件商品</p>
	
						<h5>合计：<span class="price-icon">¥</span>
	
							<span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">
	
									{{totlePrice}}
	
								</span>
	
						</h5>
	
						<h6>
	
							<a ng-href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn">
	
									去购物车
	
								</a>
	
						</h6>
	
					</div>
	
				</div>
	
			</div>
	
		</div>
	
	
	
		<transition name="ball" v-on:before-enter='beforeEnter' v-on:enter='enter' v-on:after-enter='afterEnter' v-bind:css="true">
	
			<div class="addcart-mask" v-show="ball.show">
	
				<img class="mask-item" src="" alt="">
	
			</div>
	
		</transition>
	
	</li>
</template>

<script>
	export default {
	
		computed: {
	
			carPanelData() {
	
				return this.$store.state.carPanelData
	
			},
	
			totleCount() {
	
				return this.$store.getters.totleCount
	
			},
	
			totlePrice() {
	
				return this.$store.getters.totlePrice
	
			},
	
			carShow() { //购物车显示
	
				return this.$store.state.carShow
	
			},
	
			ball() {
	
				return this.$store.state.ball
	
			}
	
		},
	
		methods: {
	
			delCarPanel(id) {
	
				this.$store.commit('delCarPanelDate', id)
	
			},
	
			showCarHandle() {
	
				this.$store.commit('showCar')
	
			},
	
			hideCarHandle() {
	
				this.$store.commit('hideCar')
	
			},
	
			beforeEnter(el) { //小球的初始化
	
				let rect = this.ball.el.getBoundingClientRect()
	
				let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
	
				let ball = document.getElementsByClassName('mask-item')[0]
	
				let x = (rectEl.left + 16) - (rect.left + rect.width / 2)
	
				let y = rect.top + rect.height / 2 - rectEl.top + 5 - 16
	
				console.log(x+':'+y)
	
				el.style.transform = 'translate3d(0,' + y + 'px,0)'
	
	
	
				ball.style.transform = 'translate3d(-' + x + 'px,0,0)'
	
				ball.src = this.ball.img_src
	
			},
	
			enter(el) {
	
				let rf = el.offsetHeight
				console.log( rf)
				this.$nextTick(() => {
				el.style.transform = 'translate3d(0,0,0)'
				document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
				})
	
			},
	
			afterEnter() {
	
				this.ball.show = false
	
			}
	
		}
	
	}
</script>

<style>
.ball-enter-active{
    transition: .5s cubic-bezier(.15,.69,.6,1.29);
}
.ball-enter-active .mask-item{
    transition: .5s cubic-bezier(0,0,1,1);
}
</style>