<template>
	<div class="item">
		<div>
			<div class="item-img">
				<img :alt="itemList.name" :src=" itemList.sku_info[tableIndex].ali_image" style="opacity: 1;" />
			</div>
			<h6>{{itemList.name}}</h6>
			<h3>{{itemList.name_title}}</h3>
			<div class="params-colors">
				<ul class="colors-list">
					<li v-for="sku,index in itemList.sku_info" :key="index">
						<a 
							href="javascript:;" 
							:title="sku.spec_json.show_name"
							@click="changeThisIndex(index)"
							:class="{'active':index == tableIndex}"
						>
							<img :src="'http://img01.smartisanos.cn/'+sku.spec_json.image+'/20X20.jpg'" />
						</a>
					</li>
				</ul>
			</div>
			<div class="item-btns clearfix">
				<span class="item-gray-btn">
					<a href="javascript:;" target="_blank">查看详情</a> 
				</span>
				<span class="item-blue-btn" @click="addCarPanelHandle(itemList.sku_info[tableIndex])">加入购物车 </span>
			</div>
			<div class="item-price clearfix">
				<i>¥</i><span>{{itemList.price}}</span>
			</div>
			<div class="discount-icon">false</div>
			<div class="item-cover">
				<a href="javascript:;" target="_blank"></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tableIndex:0
			}
		},
		props: {
			itemList: {
				type: Object
			}
		},
		methods:{
			changeThisIndex(index){
				this.tableIndex = index
			},
			addCarPanelHandle(data){
				this.$store.commit('addCarPanelDate',data);

			}
		}
	}
</script>

<style>

</style>