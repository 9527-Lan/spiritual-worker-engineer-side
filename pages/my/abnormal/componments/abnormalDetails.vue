<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="用工详情" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#3a84f0"
			leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
		</view>
		<view class="card">
			<view class="statusBox">
				<p>您的订单存在异常，请联系平台客服</p>
			</view>
			<view class="content">
				<view class="top">
					<text class="topTextBlack">{{orderList.name}}</text>
					<text class="topTextBlue">{{orderList.price}}元/天</text>
				</view>
				<view class="tagRow">
					<view class="tag">
						<u-tag :text="`岗位量${orderList.orderQuantity}`" size="mini" bgColor="#E6F0FF"
							borderColor="#E6F0FF" plain></u-tag>
					</view>
					<view class="tag">
						<u-tag :text="`${orderList.labelName}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
							color="#333333" plain></u-tag>
					</view>
				</view>
				<view>
					<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="orderList.principalName"></u--text>
				</view>
				<view>
					<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="orderList.address"></u--text>
				</view>
				<view>
					<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="`${orderList.orderStatr}-${orderList.orderEnd}`"></u--text>
				</view>
				<u-divider></u-divider>
				<view class="bottom-box">
					<view class="bottom-left">
						<u-steps :current="stepsCurrent(orderList.casualOrderRecords)" direction="column" dot>
							<u-steps-item v-for="(pItem, pIndex) in orderList.casualOrderRecords" :key="pIndex">
								<view slot="desc" class="flex-center">
									<view class="progress-item">
										<view class="progress-item-left">
											<view v-if="pItem.orderImgUrl.length > 0"" class=" record-tag isRecord">已记录
											</view>
											<view v-else class="record-tag">未记录</view>
										</view>
										<view class="progress-item-right">
											<view class="day">{{ pItem.orderDate }}</view>
										</view>
										<view class="bottom-right" @click.stop="todayRecord" v-if="pItem.sign==1">
											<u-button style="width: 100%;height: 100%;" size="mini" shape="circle"
												color="#3A84F0" text="今日记录"></u-button>
										</view>
									</view>
									<view style="margin-left: 84rpx;">
										<!-- <view v-if="pItem.remark"class="remark">{{ pItem.remark }}</view> -->
										<u-album v-if="pItem.orderImgUrl && pItem.orderImgUrl.length > 0"
											:multipleSize="150" :rowCount="3" :urls="pItem.orderImgUrl"></u-album>
									</view>
								</view>
							</u-steps-item>
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
	import {
		queryOrderbyYcIdList
	} from "@/api/my.js"
	export default {
		data() {
			return {
				orderList: [],
				id: '1',
				nodeText: '',
			}
		},
		created() {

		},
		onLoad(options) {
			let params = {
				id: uni.getStorageSync('engineer_id')
			}
			queryOrderbyYcIdList(params).then(res => {
				const list = res.data.filter(item => {
					return item.id === options.id
				})
				this.orderList = list[0] || [];
				this.nodeText = this.orderList.description == null ? '' : this.orderList.description
			})
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/homePage/index'
				});
			},

			stepsCurrent(item) {
				if (!item) return
				let current = 0
				item.forEach((el, index) => {
					if (el.sign == 1) current = index
				})
				return current
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-steps-item__line {
		height: 100% !important;
	}

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
			background: #FEF8F8;
			color: #F37878;
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
			margin: 30rpx auto;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #F0F0F0;

			.bottom-left {
				.progress-item {
					display: flex;
					flex-direction: row;
					min-height: 80rpx;

					.progress-item-left {
						height: 100%;

						.record-tag {
							border: 1px solid #999999;
							color: #999999;
							border-radius: 3rpx;
							padding: 5rpx 10rpx;
							font-size: 20rpx;
							font-weight: 500;
							line-height: 28rpx;
							text-align: center;

							&.isRecord {
								border: 1px solid #3a84f0;
								color: #3a84f0;
							}
						}
					}

					.progress-item-right {
						flex: 1;
						margin-left: 10rpx;

						/deep/.u-album {
							margin-top: 10rpx;

							image {
								width: 132rpx !important;
								height: 114rpx !important;
							}
						}

						.remark {
							margin-top: 29rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
						}

						.day {
							font-size: 24rpx;
							font-weight: 500;
							color: #333333;
						}

						.time {
							margin-top: 24rpx;
							font-size: 20rpx;
							font-weight: 500;
							color: #666666;
						}
					}

					.bottom-right {
						float: right;
						width: 120rpx;
						height: 56rpx;
					}
				}
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