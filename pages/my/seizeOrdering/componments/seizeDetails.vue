<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="用工详情" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" :placeholder="true" bgColor="#3a84f0"
			leftIconColor="#ffffff" titleStyle="color: #ffffff;font-size:34rpx" />
		<view class="blueFixed">
		</view>
		<view class="card">
			<view class="top">
				<text class="topTextBlack">{{orderList.name}}</text>
				<text class="topTextBlue">{{orderList.price}}元/天</text>
			</view>

			<view class="tagRow">
				<view class="tag">
					<u-tag :text="orderList.typeName" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF" plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="`岗位量${orderList.orderQuantity}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
						plain></u-tag>
				</view>
				<view class="tag">
					<u-tag :text="orderList.labelName" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
						color="#333333" plain></u-tag>
				</view>
			</view>
			<view>
				<!-- 	<u--text prefixIcon="/static/homePage/address.png" iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="orderList.principalName"></u--text> -->

				<u--text
					:prefixIcon="orderList.principalType==0?'/static/homePage/avatar1.png':'/static/homePage/address.png'"
					iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx" margin="18rpx 0 0 0"
					:text="orderList.principalName"></u--text>
			</view>
			<view>
				<u--text prefixIcon="/static/homePage/time.png"
					iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="`${orderList.orderStatr}-${orderList.orderEnd}`"></u--text>
			</view>
			<view>
				<u--text prefixIcon="/static/homePage/coordinate.png"
					iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
					margin="18rpx 0 0 0" :text="`${orderList.address}`" :lines="1"></u--text>
			</view>
			<u-divider />
			<view>
				<u--text prefixIcon="/static/homePage/avatar.png"
					iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#3B85F0" size="24rpx"
					margin="18rpx 0 0 0" :text="`已有${orderList.haveRegistered?orderList.haveRegistered:0}人报名`"></u--text>
			</view>
		</view>
		<view class="description">
			<text class="title">
				用工描述
			</text>
			<rich-text :nodes="nodeText" class="rText"></rich-text>
		</view>
		<u-tabbar :fixed="true" :placeholder="false"
			:safeAreaInsetBottom="true">
			<u-tabbar-item class="icon-size" @click='callPhone' text="平台客服" icon="phone"></u-tabbar-item>
			<u-button v-if="orderList.status != 1" type="primary" shape="circle" text="撤销抢单" :plain="true" @click="cancel"></u-button>
		</u-tabbar>
		<u-modal :show="show" title="拨打客服电话进行咨询" :showCancelButton='true' @confirm="closeCard"
			@cancel="del">
				<view class="modalContent">
					<rich-text style="width: 100%;" :nodes="orderList.phone?orderList.phone:'暂无'" class="rText"></rich-text>
				</view>
				<view slot='confirmButton' class="confirmButton">
					<u-button shape="circle" class="an" text="取消" @click="del"></u-button>
					<u-button shape="circle" class="an" type="primary" text="确定" @click="closeCard"></u-button>
				</view>
			</u-modal>
	</view>
</template>

<script>
	import {
		casualOrderEngineer,
		tomerService
	} from '@/api/user.js'
	import {
		casualOrderPage
	} from '@/api/index.js'
	import {
		LowerSingleEndExit
	} from '@/api/my.js'
	export default {
		data() {
			return {
				nodeText: '',
				order_id: null,
				engineer_id: null,
				circleStyle: {
					width: '521rpx',
					height: ' 89rpx',
					position: 'absolute',
					left: '187rpx',
					bottom: '65rpx',
				},
				show:false,
				orderList: []
			}
		},
		onLoad(options) {
			this.engineer_id = uni.getStorageSync('engineer_id')
			casualOrderPage({id:options.id}).then(res => {
				const list = res.data.list.filter(item => item.id === options.id)
				this.orderList = list[0] ? list[0] : [],
				this.nodeText = this.orderList.description == null ? '' : this.orderList.description
				this.order_id = this.orderList.id
			})
		},
		methods: {
			rightClick() {
				uni.switchTab({
					url: '/pages/homePage/index'
				});
			},
			cancel(){
				let params = {
					engineer_id: this.engineer_id,
					order_id: this.order_id,
				}
				LowerSingleEndExit(params).then(res => {
					if (res.code == '00000') {
						uni.showToast({
							duration: 2000,
							title: '撤销成功',
							success: () => {
								setTimeout(() => {
									uni.navigateBack(1)
								}, 1000)
							}
						})
					}
				})
			},
			closeCard() {
				if (!this.orderList.phone) {
					uni.showToast({
						duration: 2000,
						title: '暂无手机号'
					})
					return
				}
				uni.makePhoneCall({
					phoneNumber: this.content //仅为示例
				});
				this.show = false;
			},
			callPhone(){
				this.show = true
			},
			del() {
				this.show = false;
			},
		},
		
	}
</script>

<style lang="scss" scoped>
	.modalContent{
		padding: 30rpx 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #606266;
	}
	.confirmButton{
		display: flex;
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
		&.an{
			width: 45%;
		}
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
		width: 686rpx;
		//height: 415rpx;
		background: #ffffff;
		border-radius: 15rpx;
		margin: 32rpx auto 34rpx;
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

	/deep/.u-tabbar {
		height: 120rpx;

		.u-icon__icon {
			font-size: 20px !important;
		}
	}

	/deep/.u-tabbar__content {
		height: 130rpx;
		padding: 20rpx 30rpx 0 0;
		justify-content: inherit;
	}
</style>