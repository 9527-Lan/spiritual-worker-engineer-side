<template>
	<view>
		<u-icon @click="callPhone" :labelPos='labelPos' :label='label' :labelSize='labelSize' :labelColor='labelColor' :size='size' :name='name'></u-icon>
		<u-modal :show="show" title="拨打客服电话进行咨询" :showCancelButton='true'
			@cancel="del">
				<view class="modalContent">
					<rich-text style="width: 100%;" :nodes="content" class="rText"></rich-text>
				</view>
				<view slot='confirmButton' class="confirmButton">
					<u-button shape="circle" class="an" text="取消" @click="del"></u-button>
					<u-button shape="circle" class="an" type="primary" text="确定" @click="closeCard"></u-button>
				</view>
			</u-modal>
	</view>
</template>

<script>
	import {
		consultCustomerService
	} from "@/api/my.js"
	export default{
		name:'kefu',
		data(){
			return {
				show:false,
				content:''
			}
		},
		props:{
			labelPos:'',
			label:'',
			labelSize:'',
			labelColor:'',
			size:'',
			name:''
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

<style scoped lang="scss">
	.rText {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}
	.modalContent{
		padding: 30rpx 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #606266;
	}
	.confirmButton{
		display: flex;
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
		&.an{
			width: 45%;
		}
	}
</style>