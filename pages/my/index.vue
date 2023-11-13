<template>
	<view>
		<view class="bg"></view>
		<view class="myMsg">
			<view class="left">
				<u-avatar :src="avatarSrc" size="120"></u-avatar>
			</view>
			<view class="right">
				<view class="name">
					张三
				</view>
				<view class="phone">
					手机号：{{'156****1596'}}
				</view>
			</view>
		</view>
		<view class="money">
			<view class="top">
				<view class="balance">
					<view class="balanceTop">余额（元）</view>
					<view class="balanceBtm">
						<view class="symbol">￥</view>
						<view class="number">{{'3,325.00'}}</view>
					</view>
				</view>
				<view class="controls">
					<u--text class="topText" size="24rpx" align="center" color="#FFFFFF"
						iconStyle="color:#ffffff;size:22rpx" prefixIcon="baidu" text="提现" @click="withdrawal"></u--text>
					<u--text class="btmText" size="24rpx" align="center" color="#FFFFFF" text="资金明细"
						@click="fundDetails"></u--text>
				</view>
			</view>
			<view class="btm">
				<view class="toDay">
					<text class="text">今日收入(元)</text>
					<text>132.00</text>
				</view>
				<view class="month">
					<text class="text">本月收入(元)</text>
					<text>7800.00</text>
				</view>
			</view>
		</view>
		<view class="myOrder">
			<view class="title">我的订单</view>
			<view class="btm">
				<view @click="seize">
					<view class="num">3</view>
					<view class="text">抢单中</view>
				</view>
				<view @click="underWay">
					<view class="num">1</view>
					<view class="text">进行中</view>
				</view>
				<view @click="successed">
					<view class="num">56</view>
					<view class="text">已完成</view>
				</view>
				<view @click="error">
					<view class="num numRed">0</view>
					<view class="text">异常</view>
				</view>
			</view>
		</view>
		<view class="cell">
			<u-cell-group :customStyle="{fontSize: '160px'}" :border="false">
				<u-cell isLink rightIconStyle="fontSize:32rpx" url="/pages/my/myMessage/myMessage">
					<u-icon slot="icon" size="32" name="search"></u-icon>
					<view slot="title">
						<text>我的信息</text>
						<u-tag class="tag" text="待完善" size="mini" type="error" shape="circle">
						</u-tag>
					</view>
				</u-cell>
				<u-cell title="银行卡管理" isLink url="" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="search"></u-icon>
				</u-cell>
				<u-cell title="我的推广码" isLink url="" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="search"></u-icon>
				</u-cell>
				<u-cell title="推广列表" isLink url="" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="search"></u-icon>
				</u-cell>
				<u-cell title="咨询客服" isLink url="" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="search"></u-icon>
				</u-cell>
				<u-cell title="关于我们" isLink url="" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="search"></u-icon>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		findEngineer
	} from "@/api/user.js"
	export default {
		data() {
			return {
				avatarSrc: '',
				id: "2", //我的工程师
			}
		},
		onShow() {
			this.findEngineerList() //我的工程师查询
		},
		computed: {},
		methods: {
			successed() {
				uni.navigateTo({
					url: '/pages/my/successed/index',
				});
			},
			seize() {
				uni.navigateTo({
					url: '/pages/my/seizeOrdering/index',
				});
			},
			underWay() {
				uni.navigateTo({
					url: '/pages/my/underWay/underWay',
				});
			},
			error() {
				uni.navigateTo({
					url: '/pages/my/abnormal/index',
				});
			},
			withdrawal() {
				uni.navigateTo({
					url: '/pages/my/withdrawal',
				});
			},
			fundDetails() {
				uni.navigateTo({
					url: '/pages/my/fundDetails',
				});
			},
			//我的工程师查询
			findEngineerList() {
				const params = {
					id: this.id
				}
				findEngineer(params).then(res => {
					if (res.code === "00000") {
						console.log(res.data)
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

	.myMsg {
		position: relative;
		display: flex;
		flex-direction: row;
		//justify-content: space-between;
		margin: 110rpx 0 56rpx 60rpx;

		.left {
			width: 120rpx;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-left: 34rpx;
			font-family: PingFang SC;

			.name {
				width: 94rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				line-height: 67rpx;
			}

			.phone {
				width: 244rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				line-height: 67rpx;
			}
		}
	}

	.money {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 686rpx;
		height: 323rpx;
		background: linear-gradient(-34deg, #426BDD, #3A84F0);
		box-shadow: 0rpx 13rpx 29rpx 1rpx rgba(66, 108, 222, 0.4);
		border-radius: 15rpx;
		margin: 0 auto 45rpx;
		padding: 26rpx 0 40rpx 42rpx;
		color: #FFFFFF;
		font-family: PingFang SC;

		.top {
			display: flex;
			justify-content: space-between;
			height: 50%;

			.balance {
				width: 60%;
				padding-top: 18rpx;

				.balanceTop {
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 28rpx;
				}

				.balanceBtm {
					display: flex;
					justify-content: flex-start;

					.symbol {
						font-size: 40rpx;
						font-weight: 800;
					}

					.number {
						font-size: 60rpx;
						font-weight: 800;
					}
				}
			}

			.controls {
				width: 20%;

				.topText {
					height: 55rpx;
					background: #1e46b370;
					border-radius: 28rpx 0 0 28rpx;
					margin: 10rpx 0 !important;
				}

				.btmText {
					height: 55rpx;
					background: #1e46b370;
					border-radius: 28rpx 0 0 28rpx;
				}
			}
		}

		.btm {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;

			.toDay {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.text {
					font-weight: 500;
					opacity: 0.5;
				}
			}

			.month {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.text {
					font-weight: 500;
					opacity: 0.5;
				}
			}
		}
	}

	.myOrder {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-family: PingFang SC;
		width: 686rpx;
		height: 280rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin: 0 auto 40rpx;
		padding: 40rpx 70rpx 40rpx 46rpx;

		.title {
			//width: 126rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}

		.btm {
			display: flex;
			justify-content: space-between;
			text-align: center;

			.num {
				font-size: 50rpx;
				font-weight: 800;
				color: #333333;
				margin: 50rpx 0 30rpx 0;
			}

			.text {
				font-size: 28rpx;
				font-weight: 500;
				color: #666666;
			}

			.numRed {
				color: #F37878;
			}
		}
	}

	.cell {
		width: 686rpx;
		margin: 0 auto;

		.tag {
			height: 42rpx;
			width: fit-content;
			display: inline-block;
			margin-left: 13rpx;
		}

		/deep/.u-cell__title {
			font-size: 16px !important;
		}

		/deep/.u-cell__title-text {
			font-size: 16px !important;
		}
	}
</style>