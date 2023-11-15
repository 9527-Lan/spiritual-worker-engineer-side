<template>
	<view class="cardMange">
		<u-navbar title="银行卡管理"  :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="manage">
			<view class="card1">
				<text class="china">中国银行</text>
				<text class="chinaBank">6214 **** **** 4463</text>
			</view>
			<view class="card2">
				<text class="bank">建设银行</text>
				<text class="BankName">6231 **** **** 1116</text>
			</view>
			<view class="addCard">
				<text class="cardName">+添加银行卡</text>
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

		}
	}
</script>

<style>
	.cardMange {
		position: relative;
	}

	.manage {
		position: absolute;
		top: 224rpx;
		left: 32rpx;
	}

	.card1 {
		background-image: url('../../../static/my/card.png');
		height: 225rpx;
		width: 686rpx;
		background-size: 100%;
		margin-bottom:25rpx;
		position: relative;
	}

	.card2 {
		background-image: url('../../../static/my/card.png');
		height: 225rpx;
		width: 686rpx;
		background-size: 100%;
		margin-bottom:28rpx;
		position: relative;
	}

	.addCard {
		width: 686rpx;
		height: 123rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cardName {
		width: 188rpx;
		height: 31rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3A84F0;
		line-height: 67rpx;
	}
	.china{
		width: 200rpx;
		height: 31rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 67rpx;
		position: absolute;
		left:60rpx;
		top:60rpx;
	}
	.bank{
		width: 200rpx;
		height: 31rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 67rpx;
		position: absolute;
		left:60rpx;
		top:60rpx;
	}
	.chinaBank{
		width: 414rpx;
		height: 32rpx;
		font-size: 42rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 67rpx;
		position: absolute;
		left:60rpx;
		top:123rpx;
	}
	.BankName{
		width: 414rpx;
		height: 32rpx;
		font-size: 42rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 67rpx;
		position: absolute;
		left:60rpx;
		top:123rpx;
	}
</style>