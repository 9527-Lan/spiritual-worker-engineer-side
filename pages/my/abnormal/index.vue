<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="异常订单" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="picker">
			<view class="after" @click="typeShow = true">{{typeValue.label}}</view>
			<u-picker :show="typeShow" :columns="typeColumns" keyName="label" @confirm="typeConfirm"
				@cancel="typeShow = false"></u-picker>
<!-- 			<view class="after" @click="statusShow = true">{{statusValue.label}}</view>
			<u-picker :show="statusShow" :columns="statusColumns" keyName="label" @confirm="statusConfirm"
				@cancel="statusShow = false"></u-picker> -->
		</view>
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(compData, index) in indexList" :key="index">
					<view class="list-item" @click="details(compData.id)">
						<view class="body">
							<view class="flex-center between">
								<view class="title">{{ compData.name }}</view>
								<view class="salary">{{ compData.price }}元/天</view>
							</view>
							<view class="tag-list">
								<view class="tag-item jobs">
									<u-icon name="account-fill" size="24rpx" color="#3A84F0" :label="`岗位量${compData.orderQuantity}`"
										label-color="#3A84F0" label-size="24rpx"></u-icon>
								</view>
								<view class="tag-item" v-for="(item, index) in compData.tags" :key="index">{{ item }}</view>
							</view>
							<view class="body-line">
								<u-icon name="/static/address.png" size="24rpx" color="#666666" :label="compData.address"
									label-color="#666666" label-size="24rpx"></u-icon>
							</view>
							<view class="body-line">
								<u-icon name="clock-fill" size="24rpx" color="#666666"
									:label="`${compData.orderStatr}-${compData.orderEnd}`" label-color="#666666"
									label-size="24rpx"></u-icon>
							</view>
						</view>
						<view class="footer exception" >
							<text>订单存在异常，若有结算争议，请联系平台客服</text>
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
		queryOrderbyYcIdList
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
				typeColumns: [
					[{
							label: '全部',
							value: 0
						},
						{
							label: '保安',
							value: 1
						}, {
							label: '保洁',
							value: 2
						}
					]
				],
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
							label: '抢单中',
							value: 1
						}, {
							label: '抢单成功',
							value: 2
						}, {
							label: '抢单失败',
							value: 3
						}
					]
				],
				indexList: [],
				id: '1',
				typeId:''
			}
		},
		onReady() {
			// 微信小程序需要用此写法
			//this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad() {
			this.findQueryOrderbyYcIdList(this.typeId)
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
				this.typeId=this.typeValue.value
				this.findQueryOrderbyYcIdList(this.typeId)
				this.typeShow = false
				
			},
			statusConfirm(columnIndex) {
				this.statusValue = columnIndex.value[0]
				console.log(this.statusValue, ...columnIndex.value);
				this.statusShow = false
			},
			details(e) {
				uni.navigateTo({
					url: '/pages/my/abnormal/componments/abnormalDetails?id='+e,
				});
			},
			// 订单异常
			findQueryOrderbyYcIdList(e) {
				let params = {
					id: uni.getStorageSync('engineer_id')
				}
				if (this.typeId && this.typeId != '0') params.typeId = this.typeId
				queryOrderbyYcIdList(params).then(res => {
					this.indexList=res.data
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
				width: 686rpx;
				height: auto;
				background: #ffffff;
				padding: 35rpx 25rpx 0 25rpx;

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
				padding-left: 30rpx;
				font-size: 24rpx;
				font-weight: 500;
				background: #FEF8F8;
				color: #F37878;
			}

		}


	}
	.body {
		box-sizing: border-box;
		padding: 35rpx;
		background-color: #fff;
	
		.body-line {
			margin-top: 28rpx;
		}
	}
	
	.flex-center {
		display: flex;
		align-items: center;
	
		&.between {
			justify-content: space-between;
		}
	}
	
	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	
	.progress {
		margin-top: 50rpx;
	
		.progress-item {
			display: flex;
			align-items: flex-start;
			height: 80rpx;
		}
	
		.day {
			margin-left: 24rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #333333;
		}
	
		.time {
			margin-left: 24rpx;
			font-size: 20rpx;
			font-weight: 500;
			color: #666666;
		}
	}
	
	.salary {
		font-size: 32rpx;
		font-weight: bold;
		color: #3a84f0;
	}
	
	.tag-list {
		margin-top: 24rpx;
		display: flex;
		align-items: center;
	
		.tag-item {
			display: flex;
			align-items: center;
			height: 43rpx;
			line-height: 43rpx;
			border-radius: 5rpx;
			font-size: 24rpx;
			font-weight: 500;
			padding: 0 13rpx;
			background-color: #eaeff4;
			color: #333333;
	
			&.jobs {
				background-color: #e6f0ff !important;
				color: #3a84f0 !important;
			}
	
			&+.tag-item {
				margin-left: 10rpx;
			}
		}
	}
	
	.footer {
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 0 0 15rpx 15rpx;
		padding: 0 36rpx;
		font-size: 24rpx;
		font-weight: 500;
	
		&.being,
		&.completed {
			color: #b18a50;
			background-color: #fff0d6;
		}
	
		&.grab,
		&.completing {
			color: #3a84f0;
			background-color: #e6f0ff;
		}
	
		&.exception {
			color: #f37878;
			background-color: #fef8f8;
		}
	}
</style>