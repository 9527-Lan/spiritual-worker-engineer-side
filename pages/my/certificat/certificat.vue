<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="我的证书" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view class="upImg">
				<u-upload :fileList="frontList" disabled name="6" multiple width="370rpx"
					height="242rpx" :maxCount="frontList.length" :deletable="false">
				</u-upload>
			</view>
			<view class="fromText">平台承诺，严格保障您的隐私安全</view>
		</view>
	</view>
	</view>
</template>

<script>
	import service from '@/utils/request.js'
	import {
		certificate,
		engineerEndMyCertificate
	} from '@/api/my.js'
	export default {
		data() {
			return {
				frontList: [],
				contraryList: [],
				show: false,
				form: {
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请填写证书名称',
						trigger: ['blur', 'change']
					}],
					remark: [{
						required: true,
						message: '请填写备注',
						trigger: ['blur', 'change']
					}]
				},
			}
		},
		props: {
			labelStyle: {
				type: Object,
				default: function() {
					return {
						"font-weight": "700",
						"font-size": "28rpx",
						"margin-bottom": "34rpx"
					}
				}
			},
		},
		onLoad(options) {
			let params = {
				id: uni.getStorageSync('engineer_id')
			}
			engineerEndMyCertificate(params).then(res => {
				this.frontList = res.data.map(el=>{
					return {url:el}
				})
				console.log(this.frontList);
			})
		},
		methods: {
			leftClick() {
				uni.navigateTo({
					url: 'pages/my/myMessage/myMessage',
				});
			},
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

	.from {
		position: relative;
		width: 686rpx;
		margin: 116rpx auto 0;
		padding: 53rpx 36rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		font-family: PingFang SC;

		.title {
			height: 32rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-bottom: 24rpx;
		}

		.tip {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}

		.upTip {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-top: 110rpx;
			margin-bottom: 62rpx;
		}

		.upImg {
			position: relative;
			width: 370rpx;
			margin: 34rpx auto 0;

			.imgText {
				position: absolute;
				width: 100%;
				text-align: center;
				top: 42%;
				color: #3A84F0;
			}
		}

		.fromText {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin: 64rpx auto 0;
			text-align: center;
		}
	}
</style>