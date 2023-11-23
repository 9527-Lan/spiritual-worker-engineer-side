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
		casualEngineerMy
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
			casualEngineerMy(params).then(res => {
				this.frontList = res.data.casualEngineerCertificateList
					.filter(el => el.states != 3)
					.map(el => {
						return {
							...el,
							url: el.certificateImgUrl
						}
					})
			})
		},
		methods: {
			leftClick() {
				uni.navigateTo({
					url: 'pages/my/myMessage/myMessage',
				});
			},
			async aftContrary(event) {
				let lists = [].concat(event.file)
				let fileListLen = this.frontList.length
				lists.map((item) => {
					this.frontList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					this.frontList.push()
					let item = this.frontList[fileListLen]
					this.frontList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: JSON.parse(result).data.fileUrl,
						id: JSON.parse(result).data.id,
					}))
					fileListLen++
					this.show = true
					console.log();
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: service.defaults.baseURL + '/file/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
			delFront(event) {
				this.frontList = this.frontList.filter(el => el.id != event.file.id)
			},
			popupSub() {
				let pramas = {
					certificateImg: this.frontList[this.frontList.length - 1].id,
					certificateName: this.form.name,
					remark: this.form.remark
				}
				certificate(pramas).then(res => {
					this.show = false
				})
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