<template>
	<view class="container">
		<u-navbar title="资金明细" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			leftIconColor="#000" titleStyle="color: #000;font-size:34rpx">
		</u-navbar>
		<view class="query-box">
			<view class="query-item">
				<p>全部</p>
				<u-icon v-if="!queryTypeShow" name="arrow-down-fill" color="#333333" size="14"></u-icon>
				<u-icon v-else name="arrow-down-fill" color="#333333" size="14"></u-icon>
			</view>
			<view class="query-item">
				<p>{{queryYear}}.{{queryMouth}}</p>
				<u-icon v-if="!queryDateShow" name="arrow-down-fill" color="#333333" size="14"></u-icon>
				<u-icon v-else name="arrow-down-fill" color="#333333" size="14"></u-icon>
			</view>
		</view>
		<view class="list-box">
			<view class="list-item" v-for="(item, index) in list" :key="index">
				<view class="item">
					<p style="margin-bottom: 10rpx;font-size: 32rpx;font-weight: bold;color: #333333;">{{item.type}}</p>
					<p style="font-size: 24rpx;font-weight: 500;color: #999999;">{{item.time}}</p>
				</view>
				<view class="item" style="text-align: right;">
					<p style="margin-bottom: 10rpx;font-size: 32rpx;font-weight: bold;color: #3A84F0;">{{item.money}}</p>
					<p style="font-size: 24rpx;font-weight: 500;color: #999999;">{{item.tradeType}}</p>
				</view>
			</view>
		</view>
		<view class="bottom">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryYear: '2023',
				queryMouth: '09',
				queryDateShow: false,
				queryTypeShow: false,
				list: [
					{
						'type': '结算',
						'time': '2023.09.18 12:05:14',
						"money": '+200',
						'tradeType': "存入余额"
					},
					{
						'type': '结算',
						'time': '2023.09.18 12:05:14',
						"money": '+200',
						'tradeType': "存入余额"
					},
					{
						'type': '结算',
						'time': '2023.09.18 12:05:14',
						"money": '+200',
						'tradeType': "存入余额"
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			rightClick() {
				uni.navigateBack(1)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F6FF;
	}
	.container{
		margin: 0 auto;
		padding: 0 32rpx;
	}
	.query-box {
		display: flex;
		justify-content: space-between;
		margin-top: 100rpx;
		.query-item{
			display: flex;
			align-items: center;
		}
		p {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			margin-right: 10rpx;
		}
	}
	.list-box {
		background: #FFFFFF;
		width: 100%;
		height: auto;
		margin-top: 36rpx;
		border-radius: 15rpx;
		justify-content: center;
		.list-item {
			width: 95%;
			display: flex;
			border-bottom: 2rpx solid #F0F0F0;
			justify-content: space-between;
			padding: 36rpx;
			height: 160rpx;
		}
	}
</style>