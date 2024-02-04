<template>
	<view class="container">

		<view class="top-box">
			<u-image src="/static/logo@2x.png" mode="aspectFit" width="108rpx" height="108rpx"></u-image>
			<!-- <u-image src="@/static/logo.png" mode="aspectFit" width="108rpx" height="108rpx"></u-image> -->
			<!-- <u--image class="logo" :showLoading="true" src="/static/logo@2x.png" width="112rpx"
				height="112rpx"></u--image> -->
			<view class="title">灵活用工服务平台</view>
			<p>用户端</p>
		</view>


		<!-- <view class="top-box">
			<u--image :showLoading="true" src="/static/logo@2x.png" width="108rpx" height="108rpx"></u--image>
			<view class="title">灵活用工服务平台</view>
			<p>用户端</p>
		</view> -->
		<view class="wrapper">
			<!-- 小程序登录授权界面 -->
			<!-- #ifdef MP -->
			<button class="confirm-btn" @click.stop="getUserProfile">小程序登录授权</button>

			<!-- #endif -->

			<!-- H5、Android、IOS登录授权界面 -->
			<!-- #ifndef MP -->
			<view class="input-content">
				<view class="input-item" style="position: relative;">
					<text class="tit">手机号码</text>
					<input :value="mobile" placeholder="请输入手机号码" maxlength="11" data-key="mobile" @input="inputChange" />
					
					<button v-if="isFirst" :disabled="!isCorretPhoneNumber" class="sms-code-btn"
						:class="{ correct_phone_number: isCorretPhoneNumber }" @tap="getSmsCode">
						获取验证码
					</button>
					
					<button v-else :disabled="!isCorretPhoneNumber" class="sms-code-btn"
						:class="{ correct_phone_number: isCorretPhoneNumber }" @tap="getSmsCode">
						{{ countdown != 0 ? `(${countdown}s)后重新获取` : '重新获取'}}
					</button>
				</view>
				<view class="input-item">
					<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
				</view>
				<view class="input-item">
					<text class="tit">验证码</text>
					<input :value="verifyCode" placeholder="请输入验证码" placeholder-class="input-empty" maxlength="20"
						data-key="verifyCode" @input="inputChange" @confirm="toLogin" />
				</view>
			</view>
			<view class="footer-tip">
				<u-checkbox-group
					v-model="agree"
					placement="column"
					@change="checkboxChange"
				>
					<u-checkbox :iconSize='20' :size="28" name='1' shape='circle'>
					</u-checkbox>
				</u-checkbox-group>
				我已阅读并同意
				<text class="link" @click="zhanshi1" >《隐私协议》</text>
			</view>
			<view class="footer-tip">
				 <u-checkbox-group
					v-model="agreess"
					placement="column"
					@change="checkboxChangess"
				>
					<u-checkbox :iconSize='20' :size="28" name='1' shape='circle'>
					</u-checkbox>
				</u-checkbox-group>
				我已阅读并同意
				<text class="link" @click="zhanshi2">《合作协议》</text>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="tip">
			</view>
			<!-- #endif -->
		</view>
		<!-- <view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view> -->
		<u-modal :show="cardShow" :showConfirmButton="false" width="calc(100vw - 100rpx)" style="padding-top: 0;">
			
			<view class="rich" style="height: calc(100vh - 300rpx); margin:  auto; overflow: scroll;overflow-x: hidden;">
				<u-loading-icon v-if="!node" text="加载中" textSize="24"></u-loading-icon>
				<view v-else>
					<rich-text :nodes="node"></rich-text>
				<view style="display: flex;">
					<u-button text="确认"
						style=" font-size: 32rpx;font-family: PingFang SC;margin-top: 15px; font-weight: 500;color: #3A84F0;"
						@click="submitbtn"></u-button>
						<u-button text="取消"
						style=" font-size: 32rpx;font-family: PingFang SC;margin-top: 15px; font-weight: 500;color: #3A84F0;"
						@click="cardbtn"></u-button>
				</view>
				</view>
				
			</view>
		</u-modal>
	</view>
</template>

<script>
import { getnumcode, getAgreement,querybyPhone,getCooperationAgreement } from "@/api/user.js"
import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
import {
	mapMutations
} from 'vuex';

export default {
	components: {
		"move-verify":moveVerify
	},
	data() {
		return {
			mobile: '',
			cardShow: false,
			verifyCode: null,
			password: undefined,
			logining: false,
			carloading:true,
			loginStatus:0,
			label:'',
			node: ``,
			countdown: 60,
			timer: null,
			id: '',
			agree: [],
			agreess: [],
			resultData:{},
			isAgree: [{
				nema: 'argree'
			}],
			externalLink:'',
			aaa:false,
			code: undefined,
			openid:'',
			canSendSms: true,
			isFirst: true,
		};
	},
	computed: {
		// 手机号码验证
		isCorretPhoneNumber() {
			return /^1[3456789]\d{9}$/.test(this.mobile);
		}
	},
	created() {
		let options = this.$route.query;
		if (options.id) {
			this.id = options.id
			console.log(this.id);
		}
		// 假设弹窗的元素有一个类名为 .popup
		document.querySelector('.rich').addEventListener('touchmove', function(event) {
		    event.preventDefault(); // 阻止滑动事件的默认行为
		});
		// #ifdef MP
		this.getCode()
		
		// #endif
		if (!options) {
			// this.loginwx()
		}else{
			this.openid = options.openid
		}
		let routes = getCurrentPages()
		let id = routes[routes.length - 1].options.id
	},
	// mounted(options) {
	// 	console.log(options);
		





	// },
	methods: {
		...mapMutations(['login']),
		inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
		navBack() {
			uni.navigateBack();
		},
		toRegist() {
			this.$api.msg('去注册');
		},
		verifyResult(res){
			console.log(res);
			this.resultData = res;
		},
		/* 校验插件重置 */
		verifyReset(){
			this.$refs.verifyElement.reset();

			/* 删除当前页面的数据 */
			this.resultData = {};
		},
		getCode() {
			uni.login({
				provider: 'weixin',
				success: res => {
					console.log('code:' + res.code)
					this.code = res.code
				},
				fail: err => {
					console.log(err)
				}
			})
		},
		cardbtn() {
			this.cardShow = !this.cardShow
			console.log(this.agree)
		},
		getSmsCode() {
			if (!this.resultData.flag) {
				uni.$u.toast('请先滑动滑块再发送验证码'); 
				return 
			}
			if(this.countdown == 60 && this.canSendSms) {
				if(this.isFirst) {
					this.isFirst = false
				}
				this.canSendSms = false
				var setTimeouts = setInterval(() => {
					this.countdown--;
					if (this.countdown == 0) {
						clearInterval(setTimeouts)
						this.canSendSms = true
					}
				}, 1000)
				getnumcode({ phone: this.mobile }).then((res) => {
					if (res.code === '00000') {
						this.$api.msg('验证码已发送');
						console.log(res, 'res');
						
					}
				
				})
			} 
			
			if(this.countdown == 0 && this.canSendSms) {
				this.countdown = 60
				this.canSendSms = false
				var setTimeouts = setInterval(() => {
					this.countdown--;
					if (this.countdown == 0) {
						clearInterval(setTimeouts)
						this.canSendSms = true
					}
				}, 1000)
				getnumcode({ phone: this.mobile }).then((res) => {
					if (res.code === '00000') {
						this.$api.msg('验证码已发送');
						console.log(res, 'res');
						
					}
				
				})
			}
		},
		checkboxChange(e) {
			if(!e.length) return
			this.label = 'agreess'
			this.cardShow = !this.cardShow
			getAgreement().then((res) => {
				this.carloading=!this.carloading
				this.node = res.data
			})
		},
		checkboxChangess(e) {
			if(!e.length) return
			this.label = 'agreess'
			this.cardShow = !this.cardShow
			getCooperationAgreement().then((res) => {
				this.carloading=!this.carloading
				this.node = res.data
			})
		},
		submitbtn(){
			this[this.label] = ['1']
			this.cardShow = !this.cardShow
			this.loginStatus = this.loginStatus + 1
		},
		zhanshi1(){
			this.label = 'agree'
			this.cardShow = !this.cardShow
			getAgreement().then((res) => {
				this.carloading=!this.carloading
				this.node = res.data
			})
		},
		zhanshi2(){
			this.label = 'agreess'
			this.cardShow = !this.cardShow
			getCooperationAgreement().then((res) => {
				this.carloading=!this.carloading
				this.node = res.data
			})
		},
		//  #ifndef MP
		async toLogin() {
			if (!this.mobile) {
				uni.$u.toast('请填写手机号'); 
				return 
			}if (!this.resultData.flag) {
				uni.$u.toast('请先滑动滑块再发送验证码'); 
				return 
			}
			querybyPhone({phone:this.mobile}).then(res=>{
				if (res.data!=0) {
					this.agree = ['1']
					this.agreess = ['1']
					this.loginGoGoGo()
				}else{
					if (this.loginStatus >= 2) {
						this.loginGoGoGo()
					} else {
						this.$api.msg('请仔细阅读协议后登录');
					}
				}
			})
		},
		// #endif
		loginGoGoGo(){
			// if(!this.resultData.flag) {
			// 	uni.$u.toast('请滑动滑块验证通过'); 
			// 	return 
			// }
			if(!uni.$u.test.mobile(this.mobile)) {
				uni.$u.toast('请正确填写手机号'); 
				return 
			}
			if(!uni.$u.test.code(this.verifyCode,6)) {
				uni.$u.toast('请正确填写验证码'); 
				return 
			}
			this.logining = true;
			// uni.switchTab({
			// 	url: '/pages/homePage/index'
			// });
			let params = {
				code: this.verifyCode,
				phone: this.mobile,
			}
			if (this.id) {
				params.engineer_id = this.id
			}
			if (this.openid) {
				params.openid = this.openid
			}
			this.$store.dispatch('user/loginCode', params).then(res => {
				const pages = getCurrentPages();
				if (pages.length > 1) {
					// uni.navigateBack()
					uni.switchTab({
						url: '/pages/homePage/index'
					});
				} else {
					console.log("跳转首页")
					// 跳转首页
					uni.switchTab({
						url: '/pages/homePage/index'
					});
				}
				this.logining = false;
			}).catch((err) => {
				this.logining = false;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: #fff;
}

.container {
	padding-top: 40rpx;
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	background: #fff;
}

.top-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding-bottom: 200rpx;

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

.wrapper {
	position: relative;
	z-index: 90;
}

.back-btn {
	position: absolute;
	left: 40upx;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 40upx;
	font-size: 40upx;
	color: $font-color-dark;
}

.left-top-sign {
	font-size: 120upx;
	color: $page-color-base;
	position: relative;
	left: -16upx;
}

.right-top-sign {
	position: absolute;
	top: 80upx;
	right: -30upx;
	z-index: 95;

	&:before,
	&:after {
		display: block;
		content: '';
		width: 400upx;
		height: 80upx;
		background: #b4f3e2;
	}

	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}

	&:after {
		position: absolute;
		right: -198upx;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}

.left-bottom-sign {
	position: absolute;
	left: -270upx;
	bottom: -320upx;
	border: 100upx solid #d0d1fd;
	border-radius: 50%;
	padding: 180upx;
}

.welcome {
	position: relative;
	left: 50upx;
	top: -90upx;
	font-size: 46upx;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}

.input-content {
	padding: 0 60upx;
}

.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30upx;
	height: 120upx;
	border-radius: 4px;
	margin-bottom: 50upx;

	&:last-child {
		margin-bottom: 0;
	}

	.tit {
		height: 50upx;
		line-height: 56upx;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
	}

	input {
		height: 60upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		width: 100%;
	}
}

.sms-code-btn {
	position: absolute;
	right: 0;
	border: none;
	color: #ccc;
	background: transparent;
	font-size: 14px;
}

.correct_phone_number {
	color: #000;
}


.confirm-btn {
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 70upx;
	background: #3A84F0;
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 100px;
	}
}

.forget-section {
	font-size: $font-sm + 2upx;
	color: $font-color-spec;
	text-align: center;
	margin-top: 40upx;
}

.register-section {
	position: absolute;
	left: 0;
	bottom: 50upx;
	width: 100%;
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	text-align: center;

	text {
		color: $font-color-spec;
		margin-left: 10upx;
	}
}

.tip {
	margin-top: 60upx;
	font-size: $font-base - 4upx;
	color: $font-color-dark;
	text-align: center;
	font-family: yticon;
	font-weight: bold;
}

.footer-tip {
	font-size: 24rpx;
	color: #666666;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 20rpx;
	.circle {}

	.link {
		cursor: pointer;
		color: #3a84f0;
	}
}

.rich {
	margin: 10rpx auto 0;
	width: 500rpx;
	height: 100%;
	background: #FFFFFF;
	border-radius: 15rpx;
}
::v-deep .u-radio-group{
	flex:none
}
</style>