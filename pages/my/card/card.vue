<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="银行卡管理" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" placeholder />
		<view class="manage">
			<view class="card1">
				<text class="china">中国银行</text>
				<text class="chinaBank">6214 **** **** 4463</text>
			</view>
			<view class="addCard" @click="addCard">
				+添加银行卡
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			leftClick() {
				uni.switchTab({
					url: "/pages/my/index"
				})
			},
			addCard(){
				uni.navigateTo({
					url: '/pages/my/card/components/addCard',
				});
			}
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
</style>