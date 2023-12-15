<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="上传身份证" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view class="title">请上传身份证照片</view>
			<view class="tip">我确认该身份证影像是本人名下最新且有效的身份证影像</view>
			<view class="upTip">01.上传身份证人像面</view>
			<view class="upImg">
				<u-upload :fileList="frontList" @afterRead="aftFront" @delete="delFront" name="6" multiple :maxCount="1"
					width="370rpx" height="242rpx">
					<image src="/static/my/idCard-zm.png" mode="widthFix" style="width: 370rpx;height: 242rpx;"></image>
				</u-upload>
			</view>
			<view class="upTip">02.上传身份证国徽面</view>
			<view class="upImg">
				<u-upload :fileList="contraryList" @afterRead="aftContrary" @delete="delContrary" name="6" multiple
					:maxCount="1" width="370rpx" height="242rpx">
					<image src="/static/my/idCard-fm.png" mode="widthFix" style="width: 370rpx;height: 242rpx;"></image>
				</u-upload>
			</view>
			<view class="fromText">平台承诺，严格保障您的隐私安全</view>
			<u-button type="primary" shape="circle" text="认证" @click="save"></u-button>
		</view>
	</view>
</template>

<script>
	import service from '@/utils/request.js'
	import {translate} from '@/utils/yasuoimg.js'
	import {
		download,
		casualEngineerEdit,
		authentication
	} from '@/api/my.js'
	export default {
		data() {
			return {
				frontList: [],
				contraryList: [],
				num:0
			}
		},
		computed: {},
		methods: {
			leftClick() {
				uni.navigateTo({
					url: 'pages/my/myMessage/myMessage',
				});
			},
			async aftFront(event) {
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
					await translate(lists[i].url,async (res)=>{
						const result = await this.uploadFilePromise(res)
						let item = this.frontList[fileListLen]
						this.frontList.splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: JSON.parse(result).data.fileUrl,
							id: JSON.parse(result).data.id,
						}))
						fileListLen++
					})
				}
			},
			delFront(file, lists, name) {
				this.frontList = []
			},
			async aftContrary(event) {
				let lists = [].concat(event.file)
				let fileListLen = this.contraryList.length
				lists.map((item) => {
					this.contraryList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					await translate(lists[i].url,async (res)=>{
						const result = await this.uploadFilePromise(res)
						let item = this.contraryList[fileListLen]
						this.contraryList.splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: JSON.parse(result).data.fileUrl,
							id: JSON.parse(result).data.id,
						}))
						fileListLen++
					})
				}
			},
			delContrary(file, lists, name) {
				this.contraryList = []
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
			save() {
				// uni.setStorageSync('upnum',0);
				if(this.frontList.length==0) return uni.$u.toast('请上传身份证人像面再提交')
				if(this.contraryList==0) return uni.$u.toast('请上传身份证国徽面再提交')
				let parmas = {
					cardImgNegative: this.frontList[0].id,
					cardImgPositive: this.contraryList[0].id,
					id: uni.getStorageSync('engineer_id')
				}
				let parmas1 = {
					phone: uni.getStorageSync('msgItem').phone,
					name: uni.getStorageSync('msgItem').engineerRealname,
					idnum: uni.getStorageSync('msgItem').idcard,
					engineerId: uni.getStorageSync('msgItem').id
				}
			
				casualEngineerEdit(parmas).then(res => {
					authentication(parmas1).then(res => {
						if(res.code==='B0001'){
							uni.$u.toast(res.msg)
						}
						if(res.data.status===1){
							uni.showToast({
							title: res.data.msg,
							duration: 2000,
						})
							uni.navigateTo({
							url: '/pages/my/myMessage/myMessage',
						});
						}else{
							uni.$u.toast(res.data.msg)
						}
					})
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
			width: 370rpx;
			margin: 0 auto;
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