<template>
	<view>
		<view class="bg"></view>
		<view class="myMsg" :style="'margin-top:' + myMsgTop + 'rpx'">
			<view class="left">
				<u-avatar :src="myList.headSculptureUrl" size="120" @click="upAvatar"></u-avatar>
				<avatar @upload="myUpload" ref="avatar" style="width: 0;height: 0;"></avatar>
			</view>
			<view class="right">
				<view class="name">
					{{ myList.engineerRealname }}
				</view>
				<view class="phone">
					手机号：{{ myList.phone }}
				</view>
			</view>
		</view>
		<view class="money" style="background: url(/static/my/balance.png) round;">
			<view class="top">
				<view class="balance">
					<view class="balanceTop">余额（元）</view>
					<view class="balanceBtm">
						<view class="symbol">￥</view>
						<view class="number">{{ myList.balance }}</view>
					</view>
				</view>
				<view class="controls">
					<view class="topText">
						<u--text size="24rpx" align="center" color="#FFFFFF"
							iconStyle="color:#ffffff;size:22rpx;margin-right:8rpx" prefixIcon="/static/my/withdraw.png"
							text="提现" @click="withdrawal"></u--text>
					</view>
					<view class="btmText">
						<u--text size="24rpx" align="center" color="#FFFFFF" text="资金明细" @click="fundDetails"></u--text>
					</view>
				</view>
			</view>
			<view class="btm">
				<view class="toDay">
					<text class="text">今日收入(元)</text>
					<text>{{ myList.todayIncome }}</text>
				</view>
				<view class="month">
					<text class="text">本月收入(元)</text>
					<text>{{ myList.monthIncome }}</text>
				</view>
			</view>
			<view class="btm">
				<view class="toDay">
					<text class="text">总佣金收入(元)</text>
					<text>{{ myList.totalRevenue }}</text>
				</view>
				<view class="month">
					<text class="text">总邀请金额(元)</text>
					<text>{{ myList.totalinvitationAmount }}</text>
				</view>
			</view>
		</view>
		<view class="myOrder">
			<view class="title">我的订单</view>
			<view class="btm">
				<view @click="seize">
					<view class="num">{{ myList.qdzOrderCount }}</view>
					<view class="text">已报名</view>
				</view>
				<view @click="underWay">
					<view class="num">{{ myList.jxzOrderCount }}</view>
					<view class="text">进行中</view>
				</view>
				<view @click="successed">
					<view class="num">{{ myList.ywcOrderCount }}</view>
					<view class="text">已完成</view>
				</view>
				<view @click="error">
					<view class="num numRed">{{ myList.ycOrderCount }}</view>
					<view class="text">异常</view>
				</view>
			</view>
		</view>
		<view class="cell">
			<u-cell-group :customStyle="{ fontSize: '160px' }" :border="false">
				<u-cell isLink url="/pages/my/messageList" rightIconStyle="fontSize:32rpx">
					<template slot="title" class="u-slot-title">
						<text>我的消息</text>
						<u-badge  type="error "  numberType="overflow" max="99" :value="message"></u-badge>
						<!-- <u-tag class="tag" text="待完善" size="mini" type="error" shape="circle">
						</u-tag> -->
					</template>
					<u-icon slot="icon" size="32" name="/static/消息.png"></u-icon>
				</u-cell>
				<u-cell :disabled="myList.status == 1" isLink rightIconStyle="fontSize:32rpx" :url="'/pages/my/myMessage/myMessage?status=' + myList.status">
					<u-icon slot="icon" size="32" name="/static/my/idCard.png"></u-icon>
					<template slot="title" class="u-slot-title">
						<view class="titleFlex">
							<text>我的信息</text>
							<text :class="myList.status == 1?'green':'blue'">{{myList.statusName}}</text>
						</view>
						
						
						<!-- <u-tag class="tag" text="待完善" size="mini" type="error" shape="circle">
						</u-tag> -->
					</template>
				</u-cell>
				<!-- <u-cell title="我的证书" isLink url="/pages/my/certificat/certificat" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="/static/my/certificate1.png"></u-icon>
				</u-cell> -->
				<u-cell title="我的证书" isLink url="/pages/my/Certificate" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="/static/my/certificate1.png"></u-icon>
				</u-cell>
				<u-cell title="银行卡管理" isLink url="/pages/my/card/card" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="/static/my/bank.png"></u-icon>
				</u-cell>
				<u-cell title="我的推广码" isLink url="" rightIconStyle="fontSize:32rpx" @click="openCard">
					<u-icon slot="icon" size="32" name="/static/my/twoCode.png"></u-icon>
				</u-cell>
				<u-cell title="推广列表" isLink url="" @click="proto" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="/static/my/extendCode.png"></u-icon>
				</u-cell>
				<u-cell title="咨询客服" isLink url="" @click="showCard" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="/static/my/consult.png"></u-icon>
				</u-cell>
				<u-cell title="关于我们" isLink url="/pages/my/callMe/callMe" rightIconStyle="fontSize:32rpx">
					<u-icon slot="icon" size="32" name="/static/my/my.png"></u-icon>
				</u-cell>
			</u-cell-group>
			<u-modal :show="show" :title="title" :content='content' :showCancelButton='true' @confirm="closeCard"
				@cancel="del"></u-modal>
		</view>


		<u-modal :show="cardShow" :showConfirmButton="false" width="622rpx" style="padding-top: 0;">
			<view class="slot-content">
				<view class="card-home">
					<view
						style="width: 622rpx; padding: 0; height: 207rpx; margin-top: -6px; margin-bottom: 20px; background: url('../../static/my/cardLogo.png') round;">

					</view>
					<view style="height: 150rpx; width: 622rpx; padding: 10px 20px; margin-bottom: 30px;">
						<view class="item-img" style="display: flex;">
							<u-avatar :src="myList.headSculptureUrl" mode="aspectFit" size="108" style="margin-right: 15px;"></u-avatar>
							<view>
								<view style=" font-weight: bold; font-size: 32rpx; margin: 5px 0;">	{{ myList.engineerRealname }}
								</view>
								<p>邀请你访问灵活用工小程序</p>
							</view>
						</view>
					</view>

					<view style="text-align: center; margin-bottom: 109rpx;">
						<image :src="cardUrl"  style="margin: auto; width: 402rpx;height: 418rpx;" mode="aspectFit"></image>
					</view>
					<!-- <p style="text-align: center; font-size: 32rpx;font-family: PingFang SC;margin-bottom: 109rpx;font-weight: bold;color: #333333;">长按识别二维码</p> -->

					<view style="display: flex;">
						<u-button text="关闭" style=" font-size: 32rpx;font-family: PingFang SC;font-weight: 500;color: #3A84F0;" @click="cardShow = !cardShow"></u-button>
						<!-- <u-button text="保存图片" type="primary" style="width: 125px;"></u-button> -->
					</view>
				</view>
			</view>
			<view class="slot-footer"></view>
		</u-modal>
		<view class="">
			<u-button shape='circle' type="error" class="unLogin" @click="unLogin" text="退出登录"></u-button>
		</view>
	</view>
</template>

<script>
let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
import avatar from "../../components/yq-avatar/yq-avatar.vue";
import service from '@/utils/request.js'
import {
	engineerEnd,
	casualEngineerAvatar,
	consultCustomerService,
	myPromotionCode
} from "@/api/my.js"
import {

	messageCount
} from "@/api/user.js";
export default {
	components: {
		avatar
	},
	data() {
		return {
			avatarSrc: '',
			id: "2", //我的工程师
			message:'',
			myList: [],
			show: false,
			cardShow: false,
			title: '拨打客服电话进行咨询',
			content: "15344443333",
			menuButtonInfo: menuButtonInfo,
			myMsgTop: 110,
			cardUrl: ''
		}
	},
	onShow() {
		if (uni.getSystemInfoSync().statusBarHeight) {
			this.myMsgTop = uni.getSystemInfoSync().statusBarHeight + menuButtonInfo.bottom + menuButtonInfo.height + menuButtonInfo.top
		}
		this.engineerEndList() //我的工程师查询
		this.getmesnum()
	},
	computed: {},
	methods: {
		upAvatar() {
			this.$refs.avatar.fChooseImg(0, {
				selWidth: "300upx", selHeight: "300upx",
				expWidth: '260upx', expHeight: '260upx'
			});
		},
		myUpload(rsp) {
			console.log(rsp, 'rsp');
			let that = this
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: service.defaults.baseURL + '/file/upload', // 仅为示例，非真实的接口地址
					filePath: rsp.base64,
					name: 'file',
					formData: {
						user: 'test',
					},
					success: (res) => {
						console.log(JSON.parse(res.data).data);
						let parmas = {
							id: uni.getStorageSync('engineer_id'),
							img: JSON.parse(res.data).data.id
						}
						casualEngineerAvatar(parmas).then(res => {
							uni.$u.toast('上传成功')
							this.engineerEndList()
						})
					},
					fail() {

					}
				});
			})
		},
		successed() {
			uni.navigateTo({
				url: '/pages/my/successed/index',
			});
		},
		unLogin(){
			uni.redirectTo({
				url: '/',
				success:()=>{
					this.$store.commit('SET_HAS_LOGIN',false)
				}
			})
		},
		seize() {
			uni.navigateTo({
				url: '/pages/my/seizeOrdering/index',
			});
		},
		underWay() {
			uni.navigateTo({
				url: '/pages/my/underWay/underWay',
			});
		},
		error() {
			uni.navigateTo({
				url: '/pages/my/abnormal/index',
			});
		},
		withdrawal() {
			uni.navigateTo({
				url: '/pages/my/withdrawal?id=' + uni.getStorageSync('engineer_id'),
			});
		},
		fundDetails() {
			uni.navigateTo({
				url: '/pages/my/fundDetails',
			});
		},
		showCard() {
			this.show = true;
		},
		proto() {
			console.log('234234')
			uni.navigateTo({
				url: '/pages/my/promotion'
			})
		},
		closeCard() {
			uni.makePhoneCall({
				phoneNumber: this.content //仅为示例
			});
			this.show = false;
		},
		del() {
			this.show = false;
		},
		// 生成二维码
		openCard() {
			console.log('eeee');
			this.cardShow = true
			myPromotionCode(uni.getStorageSync('engineer_id')).then((res) => {
				this.cardUrl = res.data
			})
		},

		//我的工程师查询
		engineerEndList() {
			const params = {
				id: uni.getStorageSync('engineer_id')
				// id:2
			}
			engineerEnd(params).then(res => {
				if (res.code === "00000") {
					console.log(res.data)
					this.myList = res.data
				}
			})
			consultCustomerService().then(res => {
				this.content = res.data
				console.log(res)
			})

		},
		getmesnum(){
			messageCount(uni.getStorageSync('engineer_id')).then((res)=>{
			console.log(res,'res');
			this.message=res.data
		})
		}
	},
	mounted(){
		this.getmesnum()
	},
}
</script>

<style lang="scss" scoped>
	.green{
		color: green;
	}
	.blue{
		color: #1e80ff;
	}
	.unLogin{
		width: 50%;
		margin: 20px auto;
		background-color: #1e80ff;
		border-color: #1e80ff;
		color: #fff;
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
	.titleFlex{
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
.myMsg {
	position: relative;
	display: flex;
	flex-direction: row;
	//justify-content: space-between;
	margin: 0 0 56rpx 60rpx;

	.left {
		width: 120rpx;
	}

	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 34rpx;
		font-family: PingFang SC;

		.name {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			line-height: 67rpx;
		}

		.phone {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			line-height: 67rpx;
		}
	}
}

.money {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 500rpx;
	background-repeat: round;
	margin: 0 auto 45rpx;
	padding: 60rpx 70rpx 80rpx 70rpx;
	color: #FFFFFF;
	font-family: PingFang SC;

	.top {
		display: flex;
		justify-content: space-between;
		height: 50%;

		.balance {
			width: 60%;
			padding-top: 18rpx;

			.balanceTop {
				font-size: 28rpx;
				font-weight: 500;
				margin-bottom: 28rpx;
			}

			.balanceBtm {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.symbol {
					font-size: 40rpx;
					font-weight: 800;
				}

				.number {
					font-size: 60rpx;
					font-weight: 800;
				}
			}
		}

		.controls {
			width: 20%;

			.topText {
				display: flex;
				height: 55rpx;
				background: #1e46b370;
				border-radius: 28rpx 0 0 28rpx;
				margin: 10rpx 0 !important;
			}

			.btmText {
				display: flex;
				height: 55rpx;
				background: #1e46b370;
				border-radius: 28rpx 0 0 28rpx;
			}
		}
	}

	.btm {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;

		.toDay {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.text {
				font-weight: 500;
				opacity: 0.5;
				margin-bottom: 0.7rem;
			}
		}

		.month {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.text {
				font-weight: 500;
				opacity: 0.5;
			}
		}
	}
}

.myOrder {
	width: calc(100% - 140rpx);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-family: PingFang SC;
	height: 280rpx;
	background: #FFFFFF;
	border-radius: 15rpx;
	margin: 0 auto 40rpx;
	padding: 40rpx 70rpx 40rpx 46rpx;

	.title {
		//width: 126rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.btm {
		display: flex;
		justify-content: space-between;
		text-align: center;

		.num {
			font-size: 50rpx;
			font-weight: 800;
			color: #333333;
			margin: 50rpx 0 30rpx 0;
		}

		.text {
			font-size: 28rpx;
			font-weight: 500;
			color: #666666;
		}

		.numRed {
			color: #F37878;
		}
	}
}

.cell {
	width: calc(100% - 140rpx);
	margin: 0 auto;

	.tag {
		height: 42rpx;
		width: fit-content;
		display: inline-block;
		margin-left: 13rpx;
	}

	/deep/.u-cell__title {
		font-size: 16px !important;
	}

	/deep/.u-cell__title-text {
		font-size: 16px !important;
	}

	.card-home {
		.card_top {
			width: 622rpx;
			height: 207rpx;
			background-image: url('../../static/my/cardLogo.png');
		}

	}

}

::v-deep .u-image {
	margin: auto;
}

::v-deep .u-modal__content {
	padding: 0;
	padding-top: 0 !important;
	padding-bottom: 45rpx !important;
}
::v-deep .u-cell__title{
	display: flex;
	flex-direction: row;
}
::v-deep .u-badge--error{
	line-height: 16px;
    height: 18px;
}
</style>