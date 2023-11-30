<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="用工详情" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#3a84f0"
			leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
		</view>
		<view class="card">
			<view class="top">
				<text class="topTextBlack">{{orderList.name}}</text>
				<text class="topTextBlue">{{orderList.price}}元/天</text>
			</view>
			
			<view class="tagRow">
				<view class="tag">
					<u-tag :text="orderList.typeName" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
						plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`岗位量${orderList.orderQuantity}`" size="mini" bgColor="#E6F0FF"
						borderColor="#E6F0FF" plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="orderList.labelName" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
						color="#333333" plain></u-tag>
				</view>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="orderList.principalName"></u--text>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="`${orderList.orderStatr}-${orderList.orderEnd}`"></u--text>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="orderList.address"></u--text>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#3B85F0" size="24rpx"
					margin="18rpx 0 0 0" :text="`已有${orderList.haveRegistered?orderList.haveRegistered:0}人报名`"></u--text>
			</view>
		</view>
		<view class="description">
			<text class="title">
				用工描述
			</text>
			<rich-text :nodes="nodeText" class="rText"></rich-text>
		</view>
		<view class="occupy" style="width: 100vw; height: 173rpx;">
		</view>		
	</view>
</template>

<script>
	import {casualOrderEngineer} from '@/api/user.js'
	import {casualOrder} from '@/api/index.js'
	export default {
		data() {
			return {
				nodeText: '',
				circleStyle:{
					width: '521rpx',
					height:' 89rpx',
					position: 'absolute',
					left:'187rpx',
					bottom:'65rpx',
				},
				orderList:[]
			}
		},
		onLoad(options){
			console.log(options);
			casualOrder().then(res=>{
				
					const list=res.data.list.filter(item=>item.id===options.id)
					this.orderList=list[0]?list[0]:[],
					this.nodeText= this.orderList.description == null ? '' : this.orderList.description
					console.log(this.orderList)
				})
		// this.submitTo()	
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/homePage/index'
				});
			},
		
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: #F2F6FF;
	}

	.blueFixed {
		position: fixed;
		width: 100%;
		height: 350rpx;
		background-color: #3a84f0;
	}

	.card {
		position: relative;
		z-index: 100;
		//top: 100rpx;
		width: 686rpx;
		height: 415rpx;
		background: #ffffff;
		border-radius: 15rpx;
		margin: 134rpx auto 34rpx;
		padding: 35rpx 32rpx;

		.top {
			display: flex;
			height: 34rpx;
			justify-content: space-between;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-bottom: 24rpx;

			.topTextBlack {
				color: #333333;
			}

			.topTextBlue {
				color: #3A84F0;
			}
		}

		.tagRow {
			max-height: 42rpx;
			overflow: hidden;

			.tag {
				height: 42rpx;
				width: fit-content;
				display: inline-block;
				margin-right: 13rpx;
			}
		}

		/deep/.u-divider {
			margin: 24rpx 0 !important;
		}
	}

	.description {
		position: relative;
		width: 686rpx;
		border-radius: 15rpx;
		padding: 38rpx 36rpx;
		margin: 0 auto;
		background: #ffffff;

		.title {
			width: 126rpx;
			height: 31rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 67rpx;
		}
	}

	.rText {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}

	// .img{
	// 	width:36rpx;
	// 	height:36rpx;
	// }
	
</style>