<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="提现" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#3a84f0"
			leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
			<view class="money-sum">
				<p class="text">可提现金额（元）</p>
				<view style="display: flex;align-items: center;">
					<p style="font-size: 40rpx;margin-right: 10rpx;">￥</p>
					<p style="font-size: 60rpx;font-weight: 800;">{{balance}}</p>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card-title">
				<p>提现金额</p>
			</view>
			<view class="card-money">
				<u--form :model="form" ref="uForm">
					<u-form-item 
						leftIcon="rmb"
						:leftIconStyle="leftIconStyle"
						labelWidth="70"
						borderBottom prop="money">
						<u--input border="none" type="number" v-model="form.money" fontSize="40"></u--input>
						<p slot="right" style="font-size: 32rpx;color: #3A84F0;" @click="allWithdraw">全部提现</p>
					</u-form-item>
				</u--form>
			</view>
			<view class="card-to">
				<p>提现至</p>
				<view class="card-to-right">
					<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
					<u-icon style="color: #999999; margin-left: 10rpx;" name="arrow-right" color="#2979ff" size="28"></u-icon>
				</view>
			</view>
			<view class="card-button">
				<u-button type="primary" color="#3A84F0" text="申请提现" @click="applyWithdrawal"></u-button>
			</view>

		</view>
	</view>
</template>

<script>
	import {engineerEnd} from "@/api/my.js"
	export default {
		data() {
			return {
				leftIconStyle: {
					'font-size': '60rpx',
					'font-weight': 800,
					'color': '#333333'
				},
				balance:"",
				form: {
					money:0
				},
				id:"",
			}
		},
		onLoad(options) {
			console.log(decodeURIComponent(options.id)) 
			let params={
				id:options.id
			}
			engineerEnd(params).then(res=>{
				this.balance=res.data.balance
			})
		},
		methods: {
			rightClick() {
				uni.navigateBack(1)
			},
			allWithdraw(){
				console.log(123);
				this.form.money = this.balance
			},
			applyWithdrawal() {
				
			},
		
		}
	}
</script>

<style lang="scss">
	.bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: #F2F6FF;
	}
	.blueFixed {
		width: 100%;
		height: 480rpx;
		background-color: #3A84F0;
		overflow: hidden;
		.money-sum {
			margin: auto;
    margin-top: 65px;
			display: grid;
			width: 656rpx;
			color: #fff;
			.text {
				font-size: 28rpx;
				margin-bottom: 36rpx;
			}
		}
	}
	.card {
		position: relative;
		z-index: 100;
		//top: 100rpx;
		width: 686rpx;
		height: 505rpx;
		background: #ffffff;
		border-radius: 15rpx;
		margin: -120rpx auto 34rpx;
		padding: 36rpx 32rpx 42rpx 32rpx;
		
		.card-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-bottom: 60rpx;
		}

		.card-to {
			display: flex;
			justify-content: space-between;
			margin: 37rpx 0 74rpx 0;
			p {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
			.card-to-right {
				display: flex;
			}
		}
		.card-button {
			background: #3A84F0;
			border-radius: 44rpx;
			overflow: hidden;
			height: 88rpx;
		}
	}
	
</style>