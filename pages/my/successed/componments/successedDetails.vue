<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="用工详情" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#3a84f0"
			leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
		</view>
		<view class="card">
			<view class="statusBox unsettled">
				<p>状态：未结算</p>
			</view>
			<view class="content">
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
				<view class="bottom-box">
					<view class="bottom-left">
						<u-steps current="1" dot direction="column">
							<u-steps-item title="已下单 10:30 10:30" >
							</u-steps-item>
							<u-steps-item title="已出库" desc="10:35">
							</u-steps-item>
							<u-steps-item title="运输中" desc="11:40"></u-steps-item>
						</u-steps>
					</view>
				</view>
			</view>
		</view>
		<view class="description">
			<text class="title">
				用工描述
			</text>
			<rich-text :nodes="nodeText" class="rText"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodeText:'<p>对公司的项目进行临时安保工作</p>  <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p> <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p> <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p> <p>一、工作地点:</p> <p>可根据个人意愿就近分配工作，如有环境不适应可申请调换。</p>' ,
				}
			},
			created() {
				
			},
			methods: {
				rightClick() {
					uni.switchTab({
						url: '/pages/homePage/index'
					});
				}
			}
		}
</script>

<style lang="scss" scoped>
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
		position: fixed;
		width: 100%;
		height: 350rpx;
		background-color: #3a84f0;
	}

	.card {
		position: relative;
		z-index: 100;
		//top: 100rpx;
		width: 95%;
		height: auto;
		background: #ffffff;
		border-radius: 15rpx;
		margin: 134rpx auto 34rpx;
		.statusBox {
			width: 100%;
			height: 78rpx;
			border-radius: 15rpx;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			font-size: 24rpx;
			font-weight: 500;
		}
		
		.settled{
			background: #FFF0D6;
			color: #B18A50;
		}
		
		.unsettled {
			background: #EAEFF4;
			color: #333333;
		}
		
		.content {
			padding: 20rpx 30rpx;
		}
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
		
		.bottom-box {
			display: flex;
			margin: 0 auto;
			justify-content: space-between;
			align-items: center;
			.bottom-right {
				width: 149rpx;
				height: 55rpx;
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
	.rText{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;
	}
</style>