<template>
	<view class="container">
		<view class="top-box">
			<u--image class="logo" :showLoading="true" src="/static/logo@2x.png" width="112rpx"
				height="112rpx"></u--image>
			<view class="title">灵活用工服务平台</view>
			<p>工程师端</p>
		</view>

		<view class="bottom-box">
			<u-button type="primary" :disabled="logining" color="#3A84F0" shape="circle" text="微信登录"
				@click="toLogin"></u-button>
		</view>
		<u-popup :show="show" mode="center" :round="24" overlayOpacity="0.4" :customStyle="popupStyle">
			<view>
				<view class="popup-container">
					<view class="popup-top-box">
						登录【灵活用工服务平台】前，请仔细阅读
						<text class="link">《服务协议》</text>和
						<text class="link">《服务协议》</text>
						，如你同意该 两个协议，请点击“同意”开始使用
					</view>
					<view class="popup-bottom-box">
						<view class="popup-button">
							<u-button type="primary" style="color: #3A84F0;" color="#F4F4F4" text="拒绝"
								@click="refuse()"></u-button>
						</view>
						<view class="popup-button">
							<u-button type="primary" color="#3A84F0" text="确定" @click="confirm()"></u-button>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		casualOrder
	} from '@/api/login.js'
	export default {
		data() {
			return {
				logining: false,
				show: false,
				popupStyle: {
					width: '622rpx',
					height: '400rpx',
					background: '#FFFFFF'
				},
				agree: false
			}
		},
		onLoad() {

		},
		methods: {
			async toLogin() {
				if (this.agree) {
					this.logining = true;
					uni.login({
						provider: 'weixin',
						success: res => {
							casualOrder(res.code).then(res => {
								uni.setStorageSync('engineer_id',res.data);
								uni.switchTab({
									url: '/pages/homePage/index'
								});
							})
						},
						fail: err => {
							console.log(err)
						}
					})
				} else {
					this.show = true;
				}
			},
			confirm() {
				// console.log('open');
				this.show = false
				this.agree = true
			},
			refuse() {
				this.show = false
				this.agree = false
				// console.log('close');
			}
		}
	}
</script>
<style>
	page {
		background: #F2F6FF;
	}
</style>
<style lang="scss">
	.container {
		background: #F2F6FF;
	}

	.top-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding-top: 390rpx;

		.logo {
			margin: 0 auto;
		}

		.title {
			margin-top: 63rpx;
			font-size: 52rpx;
			color: #333333;
		}

		p {
			margin-top: 42rpx;
			font-size: 36rpx;
			color: #666666;
		}
	}

	.bottom-box {
		margin: auto;
		margin-top: 310rpx;
		width: 85%;
		height: 89rpx;

		u-button {
			height: 100%;
		}
	}

	.popup-container {
		width: 100%;
		height: 100%;
		padding: 72rpx 46rpx;

		.popup-top-box {
			font-size: 28rpx;

			.link {
				color: #1989ff;
			}
		}

		.popup-bottom-box {
			display: flex;
			justify-content: space-between;
			margin-top: 50rpx;

			.popup-button {
				width: 251rpx;
				height: 72rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>