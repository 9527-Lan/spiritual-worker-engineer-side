<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="我的信息" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconSize="34rpx"
			bgColor="#F2F6FF" ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view class="from">
			<view class="title">输入银行信息</view>
			<view class="tip">请确认是您名下的银行卡信息</view>
			<view>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form :labelStyle="labelStyle" labelWidth="140" labelPosition="left" :model="form" :rules="rules"
					ref="uForm">
					<u-form-item required label="开户名" prop="cardName" borderBottom ref="item1">
						<u--input v-model="form.cardName" :disabled="id" border="none" placeholder="请输入开户名"></u--input>
					</u-form-item>
					<u-form-item required label="开户行" prop="cardAddress" borderBottom ref="item1">
						<u--input v-model="form.cardAddress" :disabled="id" border="none" placeholder="请输入开户行"></u--input>
					</u-form-item>
					<u-form-item required label="银行卡号" prop="cardNo" borderBottom ref="item1">
						<u--input v-model="form.cardNo" border="none" :disabled="id" placeholder="请输入银行卡号" @blur="blur"></u--input>
					</u-form-item>
					<u-form-item required label="银行类型" prop="cardType" borderBottom ref="item1">
						<u--input v-model="form.cardType" border="none" :disabled="id" placeholder="请输入银行类型"></u--input>
					</u-form-item>
					<u-form-item required label="手机号" prop="phone" borderBottom ref="item1">
						<u--input v-model="form.phone" border="none" :disabled="id" placeholder="请输入手机号"></u--input>
					</u-form-item>
				</u--form>
			</view>
			<view class="cn">
				<u--text align="center" size="24" color="#999999" text="平台承诺，严格保障您的隐私安全"></u--text>
			</view>
		</view>
		<u-tabbar :fixed="true" v-if="!id" :placeholder="false" :safeAreaInsetBottom="true">
			<u-button  type="primary" shape="circle" text="确认添加" @click="submit"></u-button>
		</u-tabbar>
	</view>
</template>

<script>
	import qianziyuSelect from "@/components/qianziyu-select/qianziyu-select.vue"
	import {
		CardsAdd,
		getbyId
	} from "@/api/my.js"
	import bankUtils from "@/utils/bank.js"
	export default {
		components: {
			qianziyuSelect
		},
		data() {
			return {
				form: {
					engineerRealname: '',
				},
				id:'',//银行卡id

				rules: {
					'cardName': {
						type: 'string',
						required: true,
						message: '请输入开户名',
						trigger: ['blur', 'change']
					},
					'cardAddress': {
						type: 'string',
						required: true,
						message: '请输入开户行',
						trigger: ['blur', 'change']
					},
					'cardNo': {
						type: 'string',
						required: true,
						message: '请输入开户名',
						trigger: ['blur', 'change']
					},
					'cardType': {
						type: 'string',
						required: true,
						message: '请输入银行类型',
						trigger: ['blur', 'change']
					},
					'phone': {
						type: 'string',
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					},
				},
				labelStyle: {
					"font-weight": "700",
					"font-size": "28rpx"
				},
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		async onLoad(options) {
			this.id=options.id
			if(options.id){
			getbyId({id:options.id}).then((res)=>{
				console.log(res);
				this.form=res.data
			})	
			}
		},
		computed: {},
		methods: {
			blur(val) {
				console.log(val);
				bankUtils.getBankBin(val).then(res => {
					console.log(res,'res');
					this.form.cardType = res.data.bankName
				}).catch((err) => {
					uni.$u.toast(err.msg, '银行类型校验失败')
				})
			},


			submit() {
				console.log(this.form);
				this.form.engineerId=uni.getStorageSync('engineer_id')

				this.$refs.uForm.validate().then(res => {
					// CardsAdd(this.form).then((res)=>{
					// 	console.log(res,'33333');
					// })


					CardsAdd(this.form).then(res => {
						if(res.code='00000'){
							uni.$u.toast('提交成功')
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/my/card/card"
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
		height: 1000rpx;
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
		.cn {
			position: relative;
			top: 240rpx;
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

	/deep/.u-tabbar {
		height: 120rpx;

		.u-icon__icon {
			font-size: 20px !important;
		}
	}

	/deep/.u-tabbar__content {
		height: 130rpx;
		padding: 20rpx 30rpx 0 30rpx;
		justify-content: inherit;
	}
</style>