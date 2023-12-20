<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="银行卡管理" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" placeholder />
		<view class="manage">
			<view class="card1" v-for="(item, index) in list" :key="index" @click="toCard(item)">
				<view class="del" @click.stop="del(item)">删除</view>
				<text class="china">{{ item.cardType }}</text>
				<text class="chinaBank">{{ item.cardNo }}</text>
			</view>
			<view class="addCard" @click="addCard">
				+添加银行卡
			</view>
		</view>
	</view>
</template>

<script>
import {
	getcardList, carddel
} from "@/api/my.js"
export default {
	data() {
		return {
			params: {
				pageNum: 1,
				pageSize: 10,
				engineerId: ''
			},
			list: [],
		}
	},
	methods: {
		leftClick() {
			uni.switchTab({
				url: "/pages/my/index"
			})
		},
		addCard() {
			uni.navigateTo({
				url: '/pages/my/card/components/addCard',
			});
		},
		toCard(item) {
			uni.navigateTo({
				url: '/pages/my/card/components/addCard?id=' + item.id,
			})
		},
		del(item){
			console.log(item,'itme');
			let id=Number(item.id)
			carddel(id).then((res)=>{
				if(res.code='00000'){
					uni.$u.toast('删除成功')
					this.getlist()
				}
			})
			},
			getlist(){
				getcardList(this.params).then((res) => {
					this.list = res.data.list
				})
			}
	},
	onLoad() {
		this.params.engineerId = uni.getStorageSync('engineer_id')
		getcardList(this.params).then((res) => {
			this.list = res.data.list
		})
	}

}
</script>

<style>
.bg {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;
	background-color: #F2F6FF;
}

.manage {
	position: relative;
	top: 20rpx;
	left: 32rpx;
}

.card1 {
	overflow: hidden;
	background-image: url('../../../static/my/card.png');
	height: 225rpx;
	width: 686rpx;
	background-size: 100%;
	margin-bottom: 25rpx;
	position: relative;
}

.card2 {
	background-image: url('../../../static/my/card.png');
	height: 225rpx;
	width: 686rpx;
	background-size: 100%;
	margin-bottom: 28rpx;
	position: relative;
}

.addCard {
	width: 686rpx;
	height: 120rpx;
	background: #FFFFFF;
	border-radius: 15rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #3A84F0;
}

.china {
	width: 200rpx;
	height: 31rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 67rpx;
	position: absolute;
	left: 60rpx;
	top: 60rpx;
}

.bank {
	width: 200rpx;
	height: 31rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 67rpx;
	position: absolute;
	left: 60rpx;
	top: 60rpx;
}

.chinaBank {
	width: 414rpx;
	height: 32rpx;
	font-size: 42rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 67rpx;
	position: absolute;
	left: 60rpx;
	top: 123rpx;
}

.BankName {
	width: 414rpx;
	height: 32rpx;
	font-size: 42rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 67rpx;
	position: absolute;
	left: 60rpx;
	top: 123rpx;
}
.del{
	width: 110rpx;
height: 55rpx;
background: #1E46B3;
opacity: 0.6;
border-radius: 28rpx;
position: absolute;
    top: 20rpx;
	right: -20rpx;
    padding-left: 31rpx;
    line-height: 28px;
	color: #FFFFFF;
}
</style>