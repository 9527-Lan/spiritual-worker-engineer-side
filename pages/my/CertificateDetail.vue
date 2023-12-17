<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="证书详情" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view style="width: 600rpx;padding:40rpx 20rpx;">
			<view class="upImg">
                <image v-for="(item,index) in imgs" :src="item" mode="widthFix" style="width: 370rpx;height: 242rpx;"/>
		
                
			</view>
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
	import {
		certificate,
		casualEngineerMy,
		myDaiCertificate,
		delcertificate,
        myCertificateItem
	} from '@/api/my.js'
	export default {
		data() {
			return {
				frontList: [],
				contraryList: [],
				show: false,

                imgs:[],
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
		onLoad(options) {
            myCertificateItem(options.id).then((res)=>{
                this.imgs=res.data
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
		},
        mounted(){

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