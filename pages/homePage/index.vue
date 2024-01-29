<template>
	<view>
		<view class="bg"></view>
		<view class="search" :style="'padding-top:'+(top+statusBarHeight)+'rpx;height:'+(64+(top+statusBarHeight)+30)+'rpx'">
			<view style="margin:0 219rpx 0 48rpx" @click="toSearch">
			<u-search placeholder="搜索用工信息..." v-model="keyword" :showAction="false" height="64rpx"
				 bgColor="#FFFFFF" style="pointer-events: none;overflow-y: overlay;" disabled @click="toSearch"
				shape="round"></u-search>
			</view>
		</view>
		<view class="wrap">
			<u-swiper :list="wrapList" height="277rpx" radius="15rpx"></u-swiper>
		</view>
		<u-row customStyle="margin: 42rpx 32rpx" gutter="15">
			<u-col span="4">
				<view class="titlePink">
					<u--text color="#F86464" :bold="true" size="28rpx" suffixIcon="/static/homePage/fire.png" iconStyle="font-size: 19px"
						class="cardPadding" text="热门岗位"></u--text>
					<u--text color="#F86464" size="24rpx" text="快速更新"></u--text>
				</view>
			</u-col>
			<u-col span="4">
				<view class="titleYello">
					<u--text color="#DC8208" :bold="true" size="28rpx" suffixIcon="/static/homePage/medal.png" iconStyle="font-size: 19px"
						class="cardPadding" text="认证企业"></u--text>
					<u--text color="#DC8208" size="24rpx" text="安全可靠"></u--text>
				</view>
			</u-col>
			<u-col span="4">
				<view class="titleBlue">
					<u--text class="cardPadding" color="#3A84F0" :bold="true" size="28rpx" suffixIcon="/static/homePage/handshake.png" iconStyle="font-size: 19px"
						text="双选会"></u--text>
					<u--text color="#3A84F0" size="24rpx" text="灵活可控"></u--text>
				</view>
			</u-col>
		</u-row>
		<u-sticky  :offsetTop="(64+(top+statusBarHeight)+30)" zIndex="10000000" ref="stickyFixed">
			<u-tabs class="tab" @click="changeOption" :list="tabList" lineWidth="33" lineHeight="0.4rem" :scrollable="true"
				:activeStyle="{
						color: '#333333',
						fontWeight: 'bold',
						transform: 'scale(1.05)',
						fontFamily: 'PingFang SC'
					}">
			</u-tabs>
		</u-sticky>
		<view class="list">
			<u-list @scrolltolower="scrolltolower" >
				<u-list-item v-for="(item, index1) in OrderList" :key="item">
					<view class="listBlok" @click="toStepAhead(item.id)">
						<view class="top">
							<text class="topTextBlack">{{item.name}}</text>
							<text class="topTextBlue">{{item.price}}元/天</text>
						</view>

						<view class="tagRow">
							<view class="tag">
								<u-tag :text="`岗位量${item.orderQuantity}`" size="mini" bgColor="#E6F0FF"
									borderColor="#E6F0FF" plain></u-tag>
							</view>
							<view class="tag jiuzhe">
								<u-tag v-for="(item,index2) in item.labelName.split(',')" :key="item" :text="item" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
						</view>
						<view>
							<u--text :prefixIcon="item.principalType==0?'/static/homePage/avatar1.png':'/static/homePage/address.png'" iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
								margin="18rpx 0 0 0" :text="item.principalName"></u--text>
						</view>
						<view>
							<u--text prefixIcon="/static/homePage/time.png" iconStyle="width: 28rpx;height: 28rpx;margin:0 20rpx 0 0" color="#666666" size="24rpx"
								margin="18rpx 0 0 0" :text="`${item.orderStatr}-${item.orderEnd}`"></u--text>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
let menuButtonInfo = uni.getMenuButtonBoundingClientRect()?uni.getMenuButtonBoundingClientRect():{top:40}
	import {
		queryOrderbyIdPages,
		casualServiceType
	} from "@/api/index.js"
	import {
		loginOpenid
	} from "@/api/login.js"
	export default {
		data() {
			return {
				keyword: "",
				wrapList: [
					'/static/1.png',
					'/static/1.png',
					'/static/1.png'
				],
				tabList: [],
				OrderList: [],
				pageNum: 1,
				pageSize: 4,
				typeId: "",
				tatal: 0,
				top:menuButtonInfo.top,
				statusBarHeight:0,
				isOne:true
			}
		},
		onShow() {
			if (!this.isOne) {
				this.statusBarHeight=uni.getSystemInfoSync().statusBarHeight?uni.getSystemInfoSync().statusBarHeight:40
				this.casualServiceTypeList()
			}
			
		},
		onLoad(options){
			this.isOne = false
		},
		onHide(){
			this.OrderList = []
		},
		methods: {
			//抢单、
			toStepAhead(e) {
				uni.navigateTo({
					url: '/pages/homePage/stepAhead/stepAhead?id=' + e,
				});
			},
			//搜索
			toSearch() {
				console.log(`1111`)
				uni.navigateTo({
					url: '/pages/homePage/search/search',
				});
			},
			scrolltolower() {
		
				if (this.tatal == this.OrderList.length) return
				this.pageNum++
				this.loadmore()
			},
			// 任务订单信息
			loadmore() {
				let params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					// id: uni.getStorageSync('engineer_id'),
				}
				if (this.typeId != 0) params.typeId = this.typeId
				queryOrderbyIdPages(params).then(res => {
					if (res.code === '00000') {
						let dataList = res.data.list;
						this.OrderList = this.OrderList.concat(dataList)
						this.tatal = res.data.total
					}
				})
			},
			//切换tab
			changeOption(e) {
				this.pageNum = 1
				this.OrderList = []
				this.typeId = this.tabList[e.index].value
				this.loadmore()
			},
			// 服务类型下拉框 
			casualServiceTypeList() {
				casualServiceType().then(res => {
					if (res.code === "00000") {
						const list = res.data.map(item => {
							return {
								name: item.label,
								value: item.value,
							}
						})
						list.unshift({
							name: '推荐',
							value: '0',
						});
						this.tabList = list;
						this.typeId = this.tabList[0].value
						console.log(this.typeId);
						this.loadmore()
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

	.search {
		position: sticky;
		top: 0;
		z-index: 10000;
		background-color: #F2F6FF;
	}
	
	.cardPadding{
		height: 60%;
	}
	.wrap {
		padding: 0 32rpx;
	}

	.titlePink {
		font-family: PingFang SC;
		width: 100%;
		height: 120rpx;
		padding: 0 0 0 32rpx;
		border-radius: 20rpx;
		background: linear-gradient(120deg, #FFF0F0, #FDD9D9, #FEBCBD);
	}

	.titleYello {
		font-family: PingFang SC;
		width: 100%;
		height: 120rpx;
		padding: 0 0 0 32rpx;
		border-radius: 20rpx;
		background: linear-gradient(120deg, #FEF8E1, #FCEFCC, #F9E4AB);
	}

	.titleBlue {
		font-family: PingFang SC;
		width: 100%;
		height: 120rpx;
		padding: 0 0 0 32rpx;
		border-radius: 20rpx;
		background: linear-gradient(120deg, #E3EFFF, #C8DCFF, #9CC2FA);
	}

	.tab {
		margin: 42rpx 32rpx;

		/deep/ .u-tabs__wrapper__nav__line {
			width: 90rpx !important;
		}
	}

	.list {
		margin: 42rpx 32rpx;

		.listBlok {
			height: 285rpx;
			background: #ffffff;
			border-radius: 15rpx;
			padding: 35rpx 32rpx 45rpx 37rpx;
			margin-bottom: 27rpx;

			.top {
				display: flex;
				height: 34rpx;
				justify-content: space-between;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				margin-bottom: 24rpx;

				.topTextBlack {
					color: #333333;
				}

				.topTextBlue {
					color: #3A84F0;
				}
			}

			.tagRow {
				display: flex;
				.tag {
					height: 42rpx;
					width: fit-content;
					display: inline-block;
					margin-right: 13rpx;
				}
				.jiuzhe{
					display: flex;
					max-width: 70%;
					&>*{
						margin: 0 6rpx;
					}
				}
			}
		}
	}
</style>