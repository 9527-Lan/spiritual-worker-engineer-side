<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="上传证件" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view class="title">请上传证件照片</view>
			<view class="tip">我确认该证书影像是本人名下最新且有效的证书影像</view>
			<view v-for="(item,index) in fileList">
				<view class="upImg">
					<u-upload :fileList="frontList" disabled @delete="delFront" name="6" multiple
						:maxCount="1" width="370rpx" height="242rpx">
					</u-upload>
				</view>
			</view>
				<view class="upImg">
					<u-upload :fileList="contraryList" @afterRead="aftContrary" @delete="delContrary" name="6" multiple
						:maxCount="1" width="370rpx" height="242rpx">
						<image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix"
							style="width: 370rpx;height: 242rpx;"></image>
					</u-upload>
				</view>
			<view class="fromText">平台承诺，严格保障您的隐私安全</view>
			<u-button type="primary" shape="circle" text="保存" @click="save"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList:[{}],
				frontList: [],
				contraryList: [],
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		computed: {},
		methods: {
			leftClick() {
				uni.navigateTo({
					url: '/pages/my/myMessage/myMessage',
				});
			},
			aftFront(file, lists, name) {

			},
			delFront(file, lists, name) {

			},
			aftContrary(file, lists, name) {
				console.log(file, lists, name);
				this.fileList.push({})
			},
			delContrary(file, lists, name) {

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
			width: 370rpx;
			margin: 34rpx auto 0;
		}

		.fromText {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin: 64rpx auto;
			text-align: center;
		}
	}
</style>