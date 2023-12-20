<template>
	<view>
		<u-icon @click="callPhone" v-bind ='$attrs'></u-icon>
		<u-modal :show="show" title="拨打客服电话进行咨询" :content='content' :showCancelButton='true' @confirm="closeCard"
			@cancel="del"></u-modal>
	</view>
</template>

<script>
	import {
		consultCustomerService
	} from "@/api/my.js"
	export default{
		data(){
			return {
				show:false,
				content:'18570390397'
			}
		},
		created(){
			consultCustomerService().then((res) => {
				this.content = res.data
			})
		},
		methods:{
			closeCard() {
				uni.makePhoneCall({
					phoneNumber: this.content //仅为示例
				});
				this.show = false;
			},
			callPhone(){
				this.show = true
			},
			del() {
				this.show = false;
			},
		}
	}
</script>

<style>
</style>