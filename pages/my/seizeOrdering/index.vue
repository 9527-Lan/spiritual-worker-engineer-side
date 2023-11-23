<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="抢单中" @leftClick="leftClick" :autoBack="true" :placeholder="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx"/>
		<view class="picker">
			<view class="after" @click="typeShow = true">{{typeValue.label}}</view>
			<u-picker :show="typeShow" :columns="typeColumns" keyName="label" @confirm="typeConfirm"
				@cancel="typeShow = false"></u-picker>
			<view class="after" @click="statusShow = true">{{statusValue.label}}</view>
			<u-picker :show="statusShow" :columns="statusColumns" keyName="label" @confirm="statusConfirm"
				@cancel="statusShow = false"></u-picker>
			<view class="after" @click="dateShow = true">
				<uni-dateformat :date="dateValue" format="yyyy/MM"></uni-dateformat>
			</view>
			<u-datetime-picker ref="datetimePicker" :show="dateShow" v-model="dateValue" mode="year-month"
				:formatter="formatter" style="position: absolute;" @confirm="dateConfirm" @cancel="dateShow = false" />
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
									<u--text prefixIcon="/static/homePage/address.png"
										iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
										margin="18rpx 0 0 0" :text="item.principalName"></u--text>
								</view>
								<view>
									<u--text prefixIcon="/static/homePage/time.png"
										iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
										margin="18rpx 0 0 0" :text="`${item.orderStatr}-${item.orderEnd}`"></u--text>
								</view>
							</view>
							<view :class="'statusBox '+statusClass(item).class">
								<p>{{statusClass(item).text}}</p>
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
		LowerSingleEnd,
		engineerEndList
	} from "@/api/my.js"
	export default {
		data() {
			return {
				defaultIndex: [0, 0, 0, 0],
				typeShow: false,
				typeValue: {},
				typeColumns: [],
				typeId: "",
				statusShow: false,
				statusValue: {},
				statusColumns: [],
				statusId: "",
				dateShow: false,
				dateValue: Number(new Date()),
				LowerList: [],
				id: "2",
			}
		},
		onReady() {
			// 微信小程序需要用此写法
			//this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad(options) {
			this.engineerEndListButtom()
			this.casualServiceTypeList()
			this.LowerSingleEndList()
			if (options.id) {
				this.LowerList = this.LowerList.filter(item => item.id !== options.id)
				this.LowerSingleEndList()
			}
		},
		computed: {

		},
		methods: {
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
				this.LowerSingleEndList()
				this.dateShow = false
			},
			typeConfirm(columnIndex) {
				this.typeValue = columnIndex.value[0]
				this.typeId = this.typeValue.value
				this.LowerSingleEndList()
				this.typeShow = false
			},
			statusConfirm(columnIndex) {
				this.statusValue = columnIndex.value[0]
				this.statusId = this.statusValue.value
				this.LowerSingleEndList()
				this.statusShow = false
			},
			details(e) {
				uni.navigateTo({
					url: '/pages/my/seizeOrdering/componments/seizeDetails?id=' + e,
				});
			},
			LowerSingleEndList() {
				const params = {
					id: uni.getStorageSync('engineer_id')
				}
				if (this.statusId && this.statusId != '0') params.orderGrabbingStatus = this.statusId
				if (this.typeId && this.typeId != '0') params.typeId = this.typeId
				if (this.dateValue) params.createTime = this.$dayjs(this.dateValue).format('YYYY-MM')
				LowerSingleEnd(params).then(res => {
					this.LowerList = res.data
				})
			},
			// 抢单中下拉框
			engineerEndListButtom() {
				engineerEndList().then(res => {
					if (res.code === "00000") {
						const statusList = res.data
						statusList.unshift({
							label: '全部',
							value: '0',
						})
						this.statusColumns = [statusList]
						this.statusValue = {
							label: '全部',
							value: '0',
						}
					}
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
						this.typeValue = {
							label: '全部',
							value: '0',
						}
					}
				})
			},
			statusClass(item){
				if(item.orderGrabbingStatus==1)return {class:'inProgress',text:'您的抢单正在进行中...'}
				if(item.orderGrabbingStatus==2)return {class:'success',text:'您的抢单已成功'}
				if(item.orderGrabbingStatus==3)return {class:'fail',text:'您的抢单已失败'}
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
				padding: 35rpx 25rpx 20rpx 25rpx;

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

			.inProgress {
				background: #E6F0FF;
				color: #3E86F0;
			}

			.success {
				background: #FFF0D6;
				color: #B18A50;
			}

			.fail {
				background: #FEF8F8;
				color: #F37878;
			}

		}


	}
</style>