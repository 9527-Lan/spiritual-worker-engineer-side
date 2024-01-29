<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="用工详情" @rightClick="rightClick" :autoBack="true" :placeholder="true" leftIconSize="34rpx"
			bgColor="#3a84f0" leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
		</view>
		<view class="card">
			<view :class="LowerList.settlementStatus==0?'statusBox settled':'statusBox unsettled'">
				<p>状态：{{LowerList.settlementStatusText}}</p>
			</view>
			<view class="content">
				<view class="top">
					<text class="topTextBlack">{{LowerList.name}}</text>
					<text class="topTextBlue">{{LowerList.price}}元/天</text>
				</view>
				<view class="tagRow">
					<view class="tag">
						<u-tag :text="`岗位量${LowerList.orderQuantity}`" size="mini" bgColor="#E6F0FF"
							borderColor="#E6F0FF" plain></u-tag>
					</view>
					<view class="tag">
						<u-tag :text="`${LowerList.labelName}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
							color="#333333" plain></u-tag>
					</view>
				</view>
				<view>
					<!-- 	<u--text prefixIcon="/static/homePage/address.png" iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="LowerList.principalName"></u--text> -->

					<u--text
						:prefixIcon="LowerList.principalType==0?'/static/homePage/avatar1.png':'/static/homePage/address.png'"
						iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="LowerList.principalName"></u--text>
				</view>
				<view>
					<u--text prefixIcon="/static/homePage/time.png"
						iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="`${LowerList.orderStatr}-${LowerList.orderEnd}`"></u--text>
				</view>
				<view>
					<u--text prefixIcon="/static/homePage/coordinate.png"
						iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
						margin="18rpx 0 0 0" :text="`${LowerList.address}`" :lines="1"></u--text>
				</view>
				<u-divider></u-divider>
				<view class="bottom-box">
					<view class="bottom-left">
						<u-steps :current="stepsCurrent(LowerList.casualOrderRecords)" direction="column" dot>
							<u-steps-item v-for="(pItem, pIndex) in LowerList.casualOrderRecords" :key="pIndex">
								<view slot="desc" class="flex-center">
									<view class="progress-item">
										<view class="progress-item-left">
											<view v-if="pItem.orderImgUrl.length > 0"" class="record-tag isRecord">已记录</view>
											<view v-else class="record-tag">未记录</view>
										</view>
										<view class="progress-item-right">
											<view class="day">{{ pItem.orderDate }}</view>
										</view>
									</view>
									<view style="margin-left: 84rpx;">
										<!-- <view v-if="pItem.remark"class="remark">{{ pItem.remark }}</view> -->
										<u-album v-if="pItem.imgs && pItem.imgs.length > 0"
											:multipleSize="150" :rowCount="3" :urls="pItem.imgs"></u-album>
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
		LowerSingleEndCasualOrder,
		LowerSingleEndList,
		engineerEndListOrderItem
	} from "@/api/my.js"
	export default {
		data() {
			return {
				nodeText: '',
				LowerList: []
			}
		},
		created() {

		},
		onLoad(options) {
			let params = {
				id: uni.getStorageSync('engineer_id')
			}
			LowerSingleEndList(params).then(res => {
				const list = res.data.filter(item => item.id === options.id)
				this.LowerList = list[0]
				this.nodeText = this.LowerList.description == null ? '' : this.LowerList.description
				engineerEndListOrderItem({
					order_id: this.LowerList.id,
					engineer_id: uni.getStorageSync('engineer_id')
				}).then(res => {
					this.LowerList.casualOrderRecords = res.data.map(item=>{
						item.imgs = item.orderImg?item.orderImg.split(',').map(item => 'https://lhyg.hollwingroup.com/prod-api/file/download?fileId=' + item) :[]
						return item
					})
				})
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
		margin: 32rpx auto 34rpx;

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

		.settled {
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