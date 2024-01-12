<template>
	<view>
		<view class="bg"></view>
		<view class="myMsg" :style="'margin-top:' + myMsgTop + 'rpx'">
			<view class="left">
				<u-avatar :src="myList.headSculptureUrl" size="120" @click="upAvatar"></u-avatar>
				<view v-if="!myList.headSculptureUrl">
					<avatar @upload="myUpload" ref="avatar" v-if="!myList.headSculptureUrl" style="width: 0;height: 0;"></avatar>
					<view class="shezhi" v-if="!myList.headSculptureUrl" @click="uploadTouX">
						设置
					</view>
				</view>
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
				<u-cell title="银行卡管理" :disabled="myList.status != 2" isLink :url="'/pages/my/card/card?name=' + myList.engineerRealname" rightIconStyle="fontSize:32rpx">
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
			<u-modal :show="show" :title="title" :showCancelButton='true'
			@cancel="del">
				<view class="modalContent">
					<rich-text style="width: 100%;" :nodes="content" class="rText"></rich-text>
				</view>
				<view slot='confirmButton' class="confirmButton">
					<u-button shape="circle" class="an" text="取消" @click="del"></u-button>
					<u-button shape="circle" class="an" type="primary" text="确定" @click="closeCard"></u-button>
				</view>
			</u-modal>
		</view>


		<u-modal :show="cardShow" :showConfirmButton="false" width="622rpx" style="padding-top: 0;">
			<view class="slot-content">
				<view class="card-home">
					<view >
						<view
							class="dowloadImg111"
							id="/static/my/cardLogo.png"
							style="width: 622rpx; padding: 0; height: 207rpx; margin-top: -6px; margin-bottom: 20px; background: url('../../static/my/cardLogo.png') round;">
						</view>
						<view style="height: 150rpx; width: 622rpx; padding: 10px 20px; margin-bottom: 30px;">
							<view class="item-img" style="display: flex;">
								<u-avatar id="headSculptureUrl" class="dowloadImg111" :src="myList.headSculptureUrl" mode="aspectFit" size="108" style="margin-right: 15px;"></u-avatar>
								<view>
									<view id="text1" class="dowloadImg111" style=" font-weight: bold; font-size: 32rpx; margin: 5px 0;">	{{ myList.engineerRealname }}
									</view>
									<p id="text2" class="dowloadImg111"> 邀请你访问灵活用工小程序</p>
								</view>
							</view>
						</view>
						<view style="text-align: center; padding-bottom: 109rpx;">
							<image id="cardUrl" class="dowloadImg111" :src="cardUrl"  style="margin: auto; width: 402rpx;height: 418rpx;" mode="aspectFit"></image>
						</view>
					</view>
					<!-- <p style="text-align: center; font-size: 32rpx;font-family: PingFang SC;margin-bottom: 109rpx;font-weight: bold;color: #333333;">长按识别二维码</p> -->

					<view class="tuiguangma">
						<u-button class="an" text="关闭" style=" font-size: 32rpx;font-family: PingFang SC;font-weight: 500;color: #3A84F0;" @click="cardShow = !cardShow"></u-button>
						<u-button class="an" text="保存图片" type="primary" style="width: 125px;" @click="dowloadImg"></u-button>
					</view>
				</view>
			</view>
			<view class="slot-footer"></view>
		</u-modal>
		<view class="">
			<u-button shape='circle' type="error" class="unLogin" @click="unLogin" text="退出登录"></u-button>
		</view>
		<canvas
		      canvas-id="myCanvas"
			  class="myCanvas"
		      style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: -999;"
		    ></canvas>
	</view>
</template>

<script>
let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
import avatar from "../../components/yq-avatar/yq-avatar.vue";
import service from '@/utils/request.js'
import html2canvas from '@/utils/html2canvas.min.js'
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
			id: "2", //我的用户
			message:'',
			myList: [],
			show: false,
			cardShow: false,
			title: '拨打客服电话进行咨询',
			content: "15344443333",
			menuButtonInfo: menuButtonInfo,
			myMsgTop: 110,
			cardUrl: '',
			tempFilePath:''
		}
	},
	onShow() {
		if (uni.getSystemInfoSync().statusBarHeight) {
			this.myMsgTop = uni.getSystemInfoSync().statusBarHeight + menuButtonInfo.bottom + menuButtonInfo.height + menuButtonInfo.top
		}
		this.engineerEndList() //我的用户查询
		this.getmesnum()
	},
	computed: {},
	methods: {
		dowloadImg() {
			let width = ''
			let height = ''
			uni.createSelectorQuery()
			  .in(this)
			  .select('.myCanvas') // 替换为你的 Canvas 的 class 或选择器
			  .fields({  size: true })
			  .exec(res => {
				width = res[0].width;
				height = res[0].height;
		
				console.log('Canvas Width:', width);
				console.log('Canvas Height:', height);
				// 可以在这里进行 Canvas 相关的操作，例如绘制图形等
			  });
			// 获取页面元素信息
			uni.createSelectorQuery()
				.in(this)
				.selectAll('.dowloadImg111') // 替换为你的页面元素的class或其他选择器
				.boundingClientRect(rects => {
					// 创建Canvas上下文
					const canvasContext = uni.createCanvasContext('myCanvas', this);
					canvasContext.fillStyle = 'white';
					canvasContext.fillRect(0, 0, width, height);
					canvasContext.fillStyle = 'black'; // 这里设置文字颜色为黑色

					// 遍历页面元素，将其绘制到Canvas上
					rects.forEach(rect => {
					if (rect.id == 'cardUrl') {
						canvasContext.drawImage(this.cardUrl, rect.left, rect.top, rect.width, rect.height);
					}else if(rect.id == 'text1'){
						canvasContext.lineWidth = 4;
						canvasContext.fillText(this.myList.engineerRealname, rect.left, rect.top +12 );
						canvasContext.lineWidth = 1;
					}else if(rect.id == 'text2'){
						canvasContext.fillText('邀请你访问灵活用工小程序', rect.left, rect.top +12);
					}else if(rect.id == 'headSculptureUrl'){
						canvasContext.arcTo(rect.left + rect.width/2, rect.top+ rect.height/2,rect.left, rect.top, rect.width/2)
						canvasContext.closePath();
						//
						canvasContext.save();
						  canvasContext.beginPath();
						  canvasContext.arc(rect.left + rect.width/2,rect.top+ rect.height/2, rect.height/2, 0, 2 * Math.PI);
						  canvasContext.clip(); // 使用clip方法裁剪出一个圆形区域
						  canvasContext.drawImage(this.myList.headSculptureUrl, rect.left, rect.top, rect.width, rect.height);
						  canvasContext.restore();
					}else{
						canvasContext.drawImage(rect.id, rect.left, rect.top, rect.width, rect.height);
					}
				  });
				  canvasContext.draw(false, () => {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: res => {
							// res.tempFilePath 包含了保存的图片路径
							this.tempFilePath = res.tempFilePath
							this.saveImageToAlbum()
						
						},
						fail: err => {
							console.error('保存失败', err);
						}
					}, this);
				  });
				})
			.exec();
		},
		saveImageToAlbum() {
		  if (this.tempFilePath) {
			  // #ifdef H5
			  const link = document.createElement('a');
			  link.href = this.tempFilePath;
			  link.download = 'image.png'; // 可以指定下载后的文件名
			  link.click();
			  // #endif
			  // #ifdef MP-WEIXIN
			  uni.saveImageToPhotosAlbum({
				  filePath: this.tempFilePath,
				  success: () => {
					console.log('保存成功');
				  },
				  fail: err => {
					console.error('保存失败', err);
				  }
			  });
			  // #endif
			
		  } else {
			console.error('请先绘制并获取图片路径');
		  }
		},
		uploadTouX(){
			this.upAvatar()
			this.$refs.avatar.fSelect()
		},
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
			this.cardShow = true
			myPromotionCode(uni.getStorageSync('engineer_id')).then((res) => {
				this.cardUrl = res.data
			})
		},

		//我的用户查询
		engineerEndList() {
			const params = {
				id: uni.getStorageSync('engineer_id')
				// id:2
			}
			engineerEnd(params).then(res => {
				if (res.code === "00000") {
					this.myList = res.data
				}
			})
			consultCustomerService().then(res => {
				this.content = res.data
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
	.modalContent{
		padding: 30rpx 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #606266;
	}
	.confirmButton{
		display: flex;
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
		&.an{
			width: 45%;
		}
	}
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
	.tuiguangma{
		display: flex;
		width: 90%;
		margin: 0 auto;
		&.an{
			flex: 1;
			margin: 10rpx;
			border-radius: 20rpx;
		}
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
	margin: 0 0 10rpx 60rpx;

	.left {
		width: 120rpx;
		position: relative;
		border-radius: 50%;
		overflow: hidden;
		.shezhi{
			position: absolute;
			bottom: 0;
			width: 120rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			background: #929292c7;
		}
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
			line-height: 50rpx;
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
	margin: 0 auto;
	padding: 60rpx 30rpx 80rpx 70rpx;
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
	width: calc(100% - 60rpx);
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