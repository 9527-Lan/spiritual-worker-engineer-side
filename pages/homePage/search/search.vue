<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="搜索" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view>
			<view @onblur="searchList">
				<u-search placeholder="搜索用工信息..." v-model="keyword" :showAction="false" height="64rpx"
					margin="100rpx 32rpx 39rpx 32rpx" bgColor="#FFFFFF" @click="toSearch" @search="searchList"></u-search>
			</view>			
		</view>
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<view class="listBlok" @click="stepAhead">
						<view class="top">
							<text class="topTextBlack">{{item.name}}</text>
							<text class="topTextBlue">{{item.price}}元/天</text>
						</view>
						<view class="tagRow">
							<view class="tag">
								<u-tag :text="item.typeName" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`岗位量${item.orderQuantity}`" size="mini" bgColor="#E6F0FF"
									borderColor="#E6F0FF" plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`${item.labelName}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
						</view>
						<view>
							<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
								margin="18rpx 0 0 0" :text="item.principalName"></u--text>
						</view>
						<view>
							<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
								margin="18rpx 0 0 0" :text="`${item.orderStatr}-${item.orderEnd}`"></u--text>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	import {
		casualOrder
	} from "@/api/user.js"
	export default {
		data() {
			return {
				keyword: '',
				indexList: [],
				status: '5',
				pageNum: 1,
				pageSize: 5,
			}
		},
		onShow() {
			this.findCasualOrder()
		},
		onReachBottom() {
			this.findCasualOrder()
		},
		computed: {},
		methods: {
			leftClick() {
				uni.switchTab({
					url: '/pages/homePage/index',
				});
			},
			scrolltolower() {
				this.loadmore()
			},
			// 任务订单信息
			findCasualOrder() {
				const params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					status: this.status
				}
				casualOrder(params).then(res => {
					if (res.code === '00000') {
						this.indexList = res.data.list
						console.log(this.indexList)
					}
				})
			},
			// 搜索用工信息
			searchList(){				
				console.log(this.keyword,this.indexList)
				this.indexList=this.indexList.filter(item=>this.keyword===item.name)
				
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

	.picker {
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 686rpx;
		margin: 100rpx auto 0;
		padding: 0 35rpx;

		.after::after {
			content: "";
			width: 0px;
			height: 0px;
			border-top: 7px solid #333333;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			position: relative;
			top: 14px;
			left: 5px;
		}
	}

	.list {
		position: relative;
		margin: 42rpx 32rpx;

		.listBlok {
			width: 686rpx;
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
				max-height: 42rpx;
				overflow: hidden;

				.tag {
					height: 42rpx;
					width: fit-content;
					display: inline-block;
					margin-right: 13rpx;
				}
			}
		}
	}
</style>