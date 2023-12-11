<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="进行中" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="picker">
			<view class="after" @click="typeShow = true">{{typeValue.label}}</view>
			<u-picker :show="typeShow" :columns="typeColumns" keyName="label" @confirm="typeConfirm"
				@cancel="typeShow = false"></u-picker>
			<view class="after" @click="dateShow = true">
				<uni-dateformat :date="dateValue" format="yyyy/MM"></uni-dateformat>
			</view>
			<u-datetime-picker ref="datetimePicker" :show="dateShow" v-model="dateValue" mode="year-month"
				:formatter="formatter" style="position: absolute;" @confirm="dateConfirm" @cancel="dateShow = false" />
		</view>
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<view class="list-item" @click.stop="stepAhead(item.id)">
						<view class="listBlok">
							<view class="top-box">
								<view class="top">
									<text class="topTextBlack">{{item.name}}</text>
									<text class="topTextBlue">{{item.price}}元/天</text>
								</view>
								<view class="tagRow">
									<view class="tag">
										<u-tag :text="`岗位量${item.orderQuantity}`" size="mini" bgColor="#E6F0FF"
											borderColor="#E6F0FF" plain></u-tag>
									</view>
									<view class="tag">
										<u-tag :text="`${item.labelName}`" size="mini" bgColor="#E6F0FF"
											borderColor="#E6F0FF" color="#333333" plain></u-tag>
									</view>
								</view>
								<view>
									<!-- 			<u--text prefixIcon="baidu" iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
										margin="18rpx 0 0 0" :text="item.principalName"></u--text> -->

									<u--text
										:prefixIcon="item.principalType==0?'/static/homePage/avatar1.png':'/static/homePage/address.png'"
										iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx" margin="18rpx 0 0 0"
										:text="item.principalName"></u--text>
								</view>
								<view>
									<u--text prefixIcon="/static/homePage/time.png"
										iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666"
										size="24rpx" margin="18rpx 0 0 0"
										:text="`${item.orderStatr}-${item.orderEnd}`"></u--text>
								</view>
							</view>
							<view class="bottom-box">
										<scroll-view :scroll-top="0" scroll-y="true" style="height: 300rpx" >
								<view class="bottom-left">
									<u-steps :current="stepsCurrent(item.casualOrderRecords)" direction="column" dot>
										<u-steps-item v-for="(pItem, pIndex) in item.casualOrderRecords" :key="pIndex">
											<view slot="desc" class="flex-center">
												<view class="progress-item">
													<view class="progress-item-left">
														<view v-if="pItem.order_img" class="record-tag isRecord">已记录</view>
														<view v-else class="record-tag">未记录</view>
													</view>
													<view class="progress-item-right">
														<view class="day">{{ pItem.order_date }}</view>
													</view>
												</view>
											<!-- 	<view>
													<view v-if="pItem.remark"class="remark">{{ pItem.remark }}</view>
													<u-album v-if="pItem.imgs && pItem.imgs.length > 0" :rowCount="3" :urls="pItem.imgs"></u-album>
												</view> -->
											</view>
										</u-steps-item>
										</u-steps>
								</view>
								</scroll-view>
								<view class="bottom-right" @click.stop="todayRecord(item)">
									<u-button style="width: 100%;height: 100%;" size="mini" shape="circle"
										color="#3A84F0" text="今日记录">
									</u-button>
								</view>
							</view>
							<view class="statusBox">
								<p>状态：进行中</p>
							</view>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
		<writeTodayRecord :show="recordShow" :orderId="recordId" @close="close"></writeTodayRecord>
	</view>
</template>

<script>
	import {
		casualServiceType
	} from "@/api/index.js"
	import {
		queryOrderbyJxzId
	} from "@/api/my.js"
	import writeTodayRecord from './componments/writeTodayRecord.vue'
	export default {
		components: {
			writeTodayRecord
		},
		data() {
			return {
				recordShow: false,
				recordId: undefined,
				typeShow: false,
				typeValue: {
					label: '全部',
					value: 0
				},
				typeColumns: [
					[{
						label: '全部',
						value: 0
					}, {
						label: '保安',
						value: 1
					}, {
						label: '保洁',
						value: 2
					}]
				],
				dateShow: false,
				dateValue: Number(new Date()),
				indexList: [],
				orderid: '10',
				engineerid: '1',
				id: "2",
				typeId: ""
			}
		},
		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad() {
			//this.loadmore(),
			this.queryOrderbyJxzIdList(this.typeId)
			this.casualServiceTypeList()
		},
		computed: {},
		methods: {
			close(){
				this.recordShow = !this.recordShow
				this.queryOrderbyJxzIdList(this.typeId)
			},
			leftClick() {
				uni.switchTab({
					url: '/pages/my/index',
				});
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				return value
			},
			dateConfirm(v, m) {
				this.dateValue = v.value
				this.queryOrderbyJxzIdList(this.typeId)
				this.dateShow = false
			},
			typeConfirm(columnIndex) {
				this.typeValue = columnIndex.value[0]
				this.typeId = this.typeValue.value
				this.queryOrderbyJxzIdList(this.typeId)
				this.typeShow = false
			},

			scrolltolower() {
				//this.loadmore()
			},
			stepAhead(e) {
				uni.navigateTo({
					url: '/pages/my/underWay/employmentDetails?id=' + e,
				});
			},
			todayRecord(item) {
				this.recordShow = !this.recordShow
				this.recordId = item.casualOrderRecords[this.stepsCurrent(item.casualOrderRecords)].id
			},
			queryOrderbyJxzIdList(e) {
				const params = {
					id: uni.getStorageSync('engineer_id')
				}
				if (this.typeId && this.typeId != '0') params.typeId = this.typeId
				if (this.dateValue) params.createTime = this.$dayjs(this.dateValue).format('YYYY-MM')
				queryOrderbyJxzId(params).then(res => {
					this.indexList = res.data
				})
			},
			casualServiceTypeList() {
				casualServiceType().then(res => {
					if (res.code === "00000") {
						const list = res.data
						list.unshift({
							label: '全部',
							value: '0',
						});
						this.typeColumns = [list];
					}
				})
			},
			stepsCurrent(item){
				let current = 0
				item.forEach((el,index)=>{
					if(el.sign) current = index
				})
				return current
			}
		},
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

	.picker {
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 686rpx;
		margin: 100rpx auto 0;
		padding: 0 35rpx;

		.after::after {
			content: "";
			width: 0px;
			height: 0px;
			border-top: 7px solid #333333;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			position: relative;
			top: 14px;
			left: 5px;
		}
	}

	.list {
		position: relative;
		margin: 38rpx 32rpx;

		.list-item {
			margin-bottom: 30rpx;

			.listBlok {
				height: auto;
				background: #ffffff;
				padding: 35rpx 25rpx 25rpx 25rpx;

				.top-box {
					border-bottom: 1px solid #F0F0F0;
					padding: 10rpx 0;

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
				}

				.bottom-box {
					display: flex;
					margin: 30rpx auto;
					justify-content: space-between;
					align-items: center;
				border-bottom: 1px solid #F0F0F0;

					.bottom-left{
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
						}
					}
					.bottom-right {
						width: 149rpx;
						height: 55rpx;
					}
				}
			}

			.statusBox {
				width: 100%;
				height: 78rpx;
				background: #FFF0D6;
				border-radius: 15rpx;
				color: #B28C53;
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				font-size: 24rpx;
			}
		}


	}
</style>