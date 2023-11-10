<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="用工详情" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#3a84f0"
			leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
		</view>
		<view class="card">
			<view class="top">
				<text class="topTextBlack">临时电工</text>
				<text class="topTextBlue">300元/天</text>
			</view>
			<view class="tagRow">
				<view class="tag">
					<u-tag :text="`岗位量${5}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" color="#333333"
						plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" color="#333333"
						plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" color="#333333"
						plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" color="#333333"
						plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" color="#333333"
						plain></u-tag>
				</view>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="'金碧物业有限公司'"></u--text>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="'长沙市岳麓区洋湖街道湘江时代写字楼A1栋'"></u--text>
			</view>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="'2023.01.11-2023.02.22'"></u--text>
			</view>
			<u-divider></u-divider>
			<view>
				<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#3B85F0" size="24rpx"
					margin="18rpx 0 0 0" :text="'已有78人报名A1栋'"></u--text>
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
	export default {
		data() {
			return {
				nodeText: '<p>对公司的项目进行临时安保工作</p>  <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p> <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p> <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p> <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p>',
				order_id: 9,
				engineer_id: 2,
				circleStyle:{
					width: '521rpx',
					height:' 89rpx',
					position: 'absolute',
					left:'187rpx',
					bottom:'65rpx',
				}
			}
		},
		onLoad(){
		this.submitTo()	
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/homePage/index'
				});
			},
			submitTo(){
				let params = {
					engineer_id: this.engineer_id,
					order_id: this.order_id,
				}
				casualOrderEngineer(params).then(res =>{
					if(res.code == '00000'){
						uni.showToast({
							duration:2000,
							title: '抢单成功',
							success: () => {
								setTimeout(() => {
									uni.navigateBack(1)
								}, 1000)
							}
						})
					}
				})
			}
			
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

	
	
</style>