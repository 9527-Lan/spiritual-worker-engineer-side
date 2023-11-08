<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="已完成" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
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
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<view class="list-item" @click="details(item)">
						<view class="listBlok">
							<view class="top-box">
								<view class="top">
									<text class="topTextBlack">临时电工</text>
									<text class="topTextBlue">300元/天</text>
								</view>
								<view class="tagRow">
									<view class="tag">
										<u-tag :text="`岗位量${5}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
											plain></u-tag>
									</view>
									<view class="tag">
										<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
											color="#333333" plain></u-tag>
									</view>
									<view class="tag">
										<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
											color="#333333" plain></u-tag>
									</view>
									<view class="tag">
										<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
											color="#333333" plain></u-tag>
									</view>
									<view class="tag">
										<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
											color="#333333" plain></u-tag>
									</view>
									<view class="tag">
										<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
											color="#333333" plain></u-tag>
									</view>
								</view>
								<view>
									<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
										margin="18rpx 0 0 0" :text="'金碧物业有限公司'"></u--text>
								</view>
								<view>
									<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
										margin="18rpx 0 0 0" :text="'2023.01.11-2023.02.22'"></u--text>
								</view>
							</view>
						</view>
						<view class="statusBox unsettled">
							<p>未结算</p>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultIndex: [0, 0, 0, 0],
				typeShow: false,
				typeValue: {
					label: '保安',
					value: 1
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
				indexList: [{}, {}, {}, {}]
			}
		},
		onReady() {
			// 微信小程序需要用此写法
			//this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		onLoad() {
			this.loadmore()
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
				console.log(this.typeValue, ...columnIndex.value);
				this.typeShow = false
			},
			statusConfirm(columnIndex) {
				this.statusValue = columnIndex.value[0]
				console.log(this.statusValue, ...columnIndex.value);
				this.statusShow = false
			},
			scrolltolower() {
				this.loadmore()
			},
			//查询list数据
			loadmore() {

			},
			details(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/my/successed/componments/successedDetails',
				});
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
			}

			.settled{
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