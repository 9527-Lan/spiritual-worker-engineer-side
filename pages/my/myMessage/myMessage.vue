<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="我的信息" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconSize="34rpx"
			bgColor="#F2F6FF" ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view class="title">完善我的信息</view>
			<view class="tip">为了您更快速的灵活用工，请先完善我的个人信息</view>
			<view class="warn" v-if="userInfo.isAuthentication===1||userInfo.isAuthentication===3">
				<view class="left">
					<u-icon name="../../../static/my/zj-icon.png" color="#2979ff" size="28"></u-icon>
					<p>您还未进行身份证认证</p>
				</view>
				<view class="right">
					<u-button type="primary" color="#3A84F0" text="去认证" @click="toIdCard"></u-button>
				</view>
			</view>
			<view class="warn" v-if="certificate.length>0">
				<view class="left">
					<u-icon name="../../../static/my/zj-icon.png" color="#2979ff" size="28"></u-icon>
					<p>您的{{certificate.map(el=>el.name).toString()}}审核未通过</p>
				</view>
				<view class="right">
					<u-button type="primary" color="#3A84F0" text="重新认证" @click="toCertificate"></u-button>
				</view>
			</view>
			<view>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form :labelStyle="labelStyle" labelWidth="140" labelPosition="left" :model="userInfo" :rules="rules"
					ref="uForm">
					<u-form-item required label="姓名" prop="engineerRealname" borderBottom ref="item1">
						<u--input v-model="userInfo.engineerRealname" border="none" placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item required label="性别" prop="engineerSex" borderBottom @click="showSex = true"
						ref="item1">
						<u--input v-model="sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required label="身份证号" prop="idcard" borderBottom>
						<u--input v-model="userInfo.idcard" border="none" placeholder="请输入身份证号"></u--input>
					</u-form-item>
					<u-form-item required label="服务类型" prop="typeIds" borderBottom @click="showType = true" ref="item1">
						<u--textarea v-model="type" disabled disabledColor="#ffffff" placeholder="请选择服务类型" border="none"
							autoHeight></u--textarea>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required label="服务标签" prop="labelIds" borderBottom @click="showLabel = true"
						ref="item1">
						<u--textarea v-model="label" disabled disabledColor="#ffffff" placeholder="请选择服务标签"
							border="none" autoHeight @click="showLabel = true"></u--textarea>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required label="上传证书" borderBottom ref="item1">
						<u--input disabled disabledColor="#ffffff" border="none"></u--input>
						<u-button type="primary" color="#3A84F0" text="去查看" @click=" tolistlook"
							style="width: 140rpx;height: 48rpx;border-radius: 14px;overflow: hidden;display: flex;align-items: center; margin-right: 30rpx;" />
						<u-button type="primary" color="#3A84F0" text="去上传" @click="toCertificate"
							style="width: 140rpx;height: 48rpx;border-radius: 14px;overflow: hidden;display: flex;align-items: center;" />
					</u-form-item>
					<u-form-item required label="签署合同" borderBottom ref="item1">
						<u--input disabled disabledColor="#ffffff" border="none"></u--input>
						<u--text slot="right" type="info" text="已签署" size="24"></u--text>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showSex" :actions="sexActions" title="请选择性别" @close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>
				<qianziyu-select :show="showType" type="checkbox" name="label" :showSearch="false"
					:dataLists="typeActions" popupTitle="请选择服务类型" @cancel="showType=false" @submit="typeSelect" />
				<qianziyu-select :show="showLabel" type="checkbox" name="name" :showSearch="false"
					:dataLists="labelActions" popupTitle="请选择服务标签" @cancel="showLabel=false" @submit="labelSelect" />
			</view>
			<view class="cn">
				<u--text align="center" size="24" color="#999999" text="平台承诺，严格保障您的隐私安全"></u--text>
			</view>
		</view>
		<view class="bottomBox">
			<view class="bottonBox">
				<u-button type="primary" color="#3A84F0" text="确认提交" @click="submit"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import qianziyuSelect from "@/components/qianziyu-select/qianziyu-select.vue"
	import {
		casualEngineerMy,
		casualServiceLabelGetById,
		casualEngineerGetByIds,
		casualEngineerEdit,
		delcertificate
	} from "@/api/my.js"
	import {
		casualServiceType
	} from "@/api/index.js"
	export default {
		components: {
			qianziyuSelect
		},
		data() {
			return {
				userInfo: {
					engineerRealname: '',
				},
				sex: '',
				type: '',
				label: '',
				showSex: false,
				sexActions: [{
						name: '男',
						value: '1'
					},
					{
						name: '女',
						value: '2'
					}
				],
				showType: false,
				typeActions: [],
				showLabel: false,
				labelActions: [],
				rules: {
					'engineerRealname': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'engineerSex': {
						type: 'number',
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					'idcard': {
						type: 'string',
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					},
					'typeIds': {
						type: 'string',
						required: true,
						message: '请填选择服务类型',
						trigger: ['blur', 'change']
					},
					'labelIds': {
						type: 'string',
						required: true,
						message: '请填选择服务标签',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false,
				labelStyle: {
					"font-weight": "700",
					"font-size": "28rpx"
				},
				id: "2",
				formList: [],
				certificate: [],
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		async onLoad() {
			this.getTypeDict()
			this.casualEngineerMyList()
		},
		computed: {},
		methods: {
			casualEngineerMyList() {
				let params = {
					id: uni.getStorageSync('engineer_id')
				}
				casualEngineerMy(params).then(res => {
					this.userInfo = res.data
					this.sex = res.data.engineerSexName
					this.type = res.data.typeName
					this.label = res.data.labelName
					console.log(this.userInfo);
					res.data.casualEngineerCertificateList.forEach(el => {
						if (el.states == 3) {
							this.certificate.push({
								name: el.certificateName,
								id: el.id
							})
						}
					})
				})
			},
			getTypeDict() {
				casualServiceType().then(res => {
					if (res.code === "00000") {
						const list = res.data
						this.typeActions = list;
					}
				})
			},
			getLabelDict(ids) {
				casualEngineerGetByIds({
					typeIds: ids
				}).then(res => {
					if (res.code === "00000") {
						const list = res.data
						console.log(list,'222222');
						this.labelActions = list;
					}
				})
			},
			leftClick() {
				uni.switchTab({
					url: "/pages/my/index"
				})
			},
			toIdCard() {
				this.submit(true)
				uni.setStorageSync('msgItem', this.userInfo)
				uni.navigateTo({
					url: '/pages/my/myMessage/components/uploadIdCard?id='+this.userInfo.id
				})
			},
			toCertificate() {
				let ids = this.certificate.map(el => el.id).toString()
				if (ids) {
					delcertificate({
						ids: ids
					}).then(res => {})
				}
				uni.navigateTo({
					url: '/pages/my/myMessage/components/uploadcertificat?id='+this.userInfo.id
				})
			},
			tolistlook(){
			console.log(	this.userInfo,'id');
				uni.navigateTo({
					url: '/pages/my/myMessage/components/list?id='+this.userInfo.id
				})
			},
			sexSelect(e) {
				this.userInfo.engineerSex = e.value
				this.sex = e.name
			},
			typeSelect(e) {
				this.showType = false
				this.userInfo.typeIds = e.length ? e.map(el => el.value).toString() : ''
				this.type = e.length ? e.map(el => el.label).toString() : ''
				this.getLabelDict(this.userInfo.typeIds)
				this.userInfo.labelIds = ''
				this.label = ''
			},
			labelSelect(e) {
				this.showLabel = false
				this.userInfo.labelIds = e.length ? e.map(el => el.id).toString() : ''
				this.label = e.length ? e.map(el => el.name).toString() : ''
			},
			submit(b) {
				this.$refs.uForm.validate().then(res => {
					casualEngineerEdit(this.userInfo).then(res => {
						if (!b) {
							uni.$u.toast('提交成功')
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/my/index"
								})
							}, 1000)
						}
					})
				}).catch(errors => {
					uni.$u.toast(errors, '校验失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-textarea--disabled {
		background-color: #ffffff !important;
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

	.from {
		position: relative;
		width: 686rpx;
		margin: 32rpx auto 0;
		padding: 53rpx 36rpx 36rpx 36rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 32rpx;

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
			margin-bottom: 40rpx;
		}

		.warn {
			display: flex;
			height: 108rpx;
			background: #FEF8F8;
			border-radius: 15rpx;
			align-items: center;
			padding: 0 36rpx;
			justify-content: space-between;
			margin-bottom: 24rpx;

			.left {
				display: flex;

				p {
					margin-left: 24rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #F37878;
					line-height: 67rpx;
				}
			}

			.right {
				width: 76px;
				height: 28px;
				border-radius: 14px;
				overflow: hidden;
				display: flex;
				justify-content: right;
				align-items: center;
			}

		}

		.cn {
			padding: 30rpx 0 0 0;
		}
	}

	.bottomBox {
		padding: 40rpx 0;
		border-top: 2rpx solid #DDDDDD;
		background-color: #FFFFFF;

		.bottonBox {
			width: 80%;
			background: #3A84F0;
			margin: 0 auto;
			border-radius: 22px;
			overflow: hidden;
		}
	}
</style>