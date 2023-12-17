<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="上传证书" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view style="width: 600rpx;padding:40rpx 20rpx;">
				<view style="font-size: 16px;color: #303133;font-weight: bold;text-align: center;">证书信息</view>
				<u--form :labelStyle="labelStyle" :model="form" ref="uForm" :rules="rules">
					<u-form-item labelPosition="top" labelWidth="240" :borderBottom="false" label="填写证书名称:" prop="name">
						<u--input v-model="form.name" border="none" placeholder="填写证书名称"></u--input>
					</u-form-item>
					<u-form-item labelPosition="top" labelWidth="240" :borderBottom="false" label="填写备注:" prop="remark">
						<u--textarea v-model="form.remark" border='none' count height="240" maxlength="200"
							placeholder="填写备注">
						</u--textarea>
					</u-form-item>
				</u--form>
				
			<view class="title">请上传证书照片</view>
			<view class="tip">我确认该证书影像是本人名下最新且有效的证书影像</view>
			<view class="upImg">
				<u-upload :fileList="contraryList" @afterRead="aftContrary" name="6" multiple :maxCount="1"
					width="370rpx" height="242rpx">
					<image src="/static/my/certificate.png" mode="widthFix" style="width: 370rpx;height: 242rpx;">
					</image>
					<view class="imgText">点击上传</view>
				</u-upload>
			</view>
			<view class="upImg">
				<u-upload :fileList="frontList" disabled @delete="delFront" name="6" multiple width="370rpx"
					height="242rpx" :maxCount="frontList.length">
				</u-upload>
			</view>
			<u-button style="margin-top: 30px;" type="primary" shape="circle" text="确认" @click="popupSub"></u-button>
			</view>
			<view class="fromText">平台承诺，严格保障您的隐私安全</view>
			<!-- 		<u-button type="primary" shape="circle" text="保存" @click="save"></u-button> -->
		</view>
		<!-- <u-popup :show="show" mode="center" @close="show=false" round="10" :closeOnClickOverlay="false">
		
		</u-popup> -->
	</view>
</template>

<script>
	import service from '@/utils/request.js'
	import {translate} from '@/utils/yasuoimg.js'
	import {
		certificate,
		casualEngineerMy,
		myDaiCertificate,
		delcertificate
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
				id:'',
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
			this.id=options.id
			if (options.img) {
				let data = uni.getStorageSync('certificateImgList')
				this.frontList = data.certificateImg.split(',').map((item,index)=>{
					return {
						status: 'success',
						message: '',
						url: data.certificateImgUrl[index],
						id: item,
					}
				})
			}
			myDaiCertificate({id:options.id}).then((res)=>{
				
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
					await translate(lists[i].url,async (res)=>{
						const result = await this.uploadFilePromise(res)
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
					})
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
				delcertificate({
					ids: event.file.id
				}).then(res => {
					uni.$u.toast('删除成功')
				})
			},
			popupSub() {
				let arr = this.frontList.map((item)=>{
					return item.id
				})
				let pramas = {
					certificateImg:arr.toString(),
					certificateName: this.form.name,
					engineerId: uni.getStorageSync('engineer_id'),
					remark: this.form.remark
				}
				let status= this.frontList.every((item)=>{
					return item.status==="success"
				})
				let state=this.frontList.length>0
				if(!status||!state) return uni.$u.toast('请上传完证书后再试')
				certificate(pramas).then(res => {
					// this.show = false
					if(res.code==='00000'){
						uni.$u.toast('提交成功')
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/my/Certificate"
								})
							}, 1000)
					}else{
						uni.$u.toast('提交失败')
					}
				
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
		padding: 0 36rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		font-family: PingFang SC;

		.title {
			height: 32rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-bottom: 24rpx;
			margin-top: 24rpx;
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
			margin-bottom: 30px;
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