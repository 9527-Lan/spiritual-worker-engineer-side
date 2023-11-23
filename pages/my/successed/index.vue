<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="已完成" @leftClick="leftClick" :autoBack="true" :placeholder="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="picker">
			<view class="after" @click="typeShow = true">{{typeValue.label}}</view>
			<u-picker :show="typeShow" :columns="typeColumns" keyName="label" @confirm="typeConfirm"
				@cancel="typeShow = false"></u-picker>
			<view class="after" @click="statusShow = true">{{statusValue.label}}</view>
			<u-picker :show="statusShow" :columns="statusColumns" keyName="label" @confirm="statusConfirm"
				@cancel="statusShow = false"></u-picker>
		</view>
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in LowerList" :key="index">
					<view class="list-item" @click="details(item.id)">
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
									<!-- 	<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
										margin="18rpx 0 0 0" :text="item.principalName"></u--text> -->
									<u--text
										:prefixIcon="item.principalType==0?'/static/homePage/avatar1.png':'/static/homePage/address.png'"
										iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666"
										size="24rpx" margin="18rpx 0 0 0" :text="item.principalName"></u--text>
								</view>
								<view>
									<u--text prefixIcon="/static/homePage/time.png"
										iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666"
										size="24rpx" margin="18rpx 0 0 0"
										:text="`${item.orderStatr}-${item.orderEnd}`"></u--text>
								</view>
							</view>
							<view :class="item.settlementStatus==1?'statusBox settled':'statusBox unsettled'"> 
								<p>状态：{{item.settlementStatusText}}</p>
							</view>
						</view>

					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	import {
		casualServiceType
	} from "@/api/index.js"
	import {
		LowerSingleEndList
	} from "@/api/my.js"
	export default {
		data() {
			return {
				defaultIndex: [0, 0, 0, 0],
				typeShow: false,
				typeValue: {
					label: '全部',
					value: 0
				},
				typeColumns: [],
				statusShow: false,
				statusValue: {
					label: '全部',
					value: 0
				},
				statusColumns: [
					[{
							label: '全部',
							value: 0
						},
						{
							label: '未结算',
							value: 1
						}, {
							label: '已结算',
							value: 2
						}
					]
				],
				LowerList: [],
				id: "2",
				typeId: '',
				statusId:''
			}
		},
		onReady() {
			// 微信小程序需要用此写法
			//this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad() {
			this.loadmore(),
				this.findLowerSingleEndList(this.typeId)
			this.casualServiceTypeList()
		},
		computed: {

		},
		methods: {
			leftClick() {
				uni.switchTab({
					url: '/pages/my/index',
				});
			},
			typeConfirm(columnIndex) {
				this.typeValue = columnIndex.value[0]
				this.typeId = this.typeValue.value
				this.findLowerSingleEndList(this.typeId)
				this.typeShow = false

			},
			statusConfirm(columnIndex) {
				this.statusValue = columnIndex.value[0]
				this.statusId = this.statusValue.value
				this.findLowerSingleEndList(this.statusId)
				this.statusShow = false
			},
			scrolltolower() {
				this.loadmore()
			},
			//查询list数据
			loadmore() {

			},
			details(e) {
				uni.navigateTo({
					url: '/pages/my/successed/componments/successedDetails?id=' + e,
				});
			},
			findLowerSingleEndList(e) {
				let params = {
					id: uni.getStorageSync('engineer_id')
				}
				if (this.typeId && this.typeId != '0') params.typeId = this.typeId
				if (this.statusId && this.statusId != '0') params.settlementStatus = this.statusId
				LowerSingleEndList(params).then(res => {
					this.LowerList = res.data
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
						console.log(this.typeColumns, '111')

						console.log(this.tabList)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-popup{
		position: absolute;
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

	.picker {
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 686rpx;
		margin: 32rpx auto 0;
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
				width: 686rpx;
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
			}

			.statusBox {
				width: 100%;
				height: 78rpx;
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				padding-left: 30rpx;
				font-size: 24rpx;
			}

			.settled {
				background: #FFF0D6;
				color: #B18A50;
			}

			.unsettled {
				background: #EAEFF4;
				color: #333333;
			}

		}


	}
</style>