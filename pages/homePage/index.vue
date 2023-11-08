<template>
	<view>
		<view class="bg"></view>
		<view class="search" @click="toSearch">
			<u-search placeholder="搜索用工信息..." v-model="keyword" :showAction="false" height="64rpx"
				margin="100rpx 0 39rpx 48rpx" bgColor="#FFFFFF" style="pointer-events: none" @click="toSearch"></u-search>
		</view>
		<view class="wrap">
			<u-swiper :list="wrapList" height="277rpx" radius="15rpx"></u-swiper>
		</view>
		<u-row customStyle="margin: 42rpx 32rpx" gutter="15">
			<u-col span="4">
				<view class="titlePink">
					<u--text color="#F86464" :bold="true" size="28rpx" margin="30rpx 0 0 32rpx" suffixIcon="baidu"
						iconStyle="font-size: 19px" text="热门岗位"></u--text>
					<u--text color="#F86464" size="24rpx" margin="0 0 0 32rpx" text="快速更新"></u--text>
				</view>
			</u-col>
			<u-col span="4">
				<view class="titleYello">
					<u--text color="#DC8208" :bold="true" size="28rpx" margin="30rpx 0 0 32rpx" suffixIcon="baidu"
						iconStyle="font-size: 19px" text="认证企业"></u--text>
					<u--text color="#DC8208" size="24rpx" margin="0 0 0 32rpx" text="安全可靠"></u--text>
				</view>
			</u-col>
			<u-col span="4">
				<view class="titleBlue">
					<u--text color="#3A84F0" :bold="true" size="28rpx" margin="30rpx 0 0 32rpx" suffixIcon="baidu"
						iconStyle="font-size: 19px" text="双选会"></u--text>
					<u--text color="#3A84F0" size="24rpx" margin="0 0 0 32rpx" text="灵活可控"></u--text>
				</view>
			</u-col>
		</u-row>
		<u-sticky bgColor="#fff">
			<view class="tab">
				<u-tabs :list="tabList" @click="click" lineWidth="35" lineHeight="20" :scrollable="false" :activeStyle="{
						color: '#333333',
						fontWeight: 'bold',
						transform: 'scale(1.05)',
						fontFamily: 'PingFang SC'
					}">
				</u-tabs>
			</view>
		</u-sticky>
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<view class="listBlok" @click="toStepAhead">
						<view class="top">
							<text class="topTextBlack">临时电工</text>
							<text class="topTextBlue">300元/天</text>
						</view>
						<view class="tagRow">
							<view class="tag">
								<u-tag :text="`岗位量${5}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
							<view class="tag">
								<u-tag :text="`${'中级电工证'}`" size="mini" bgColor="#E6F0FF" borderColor="#E6F0FF"
									color="#333333" plain></u-tag>
							</view>
						</view>
						<view>
							<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
								margin="18rpx 0 0 0" :text="'金碧物业有限公司'"></u--text>
						</view>
						<view>
							<u--text prefixIcon="baidu" iconStyle="font-size: 17px" color="#666666" size="24rpx"
								margin="18rpx 0 0 0" :text="'2023.01.11-2023.02.22'"></u--text>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				wrapList: [
					'/static/1.jpg',
					'/static/1.jpg',
					'/static/1.jpg'
				],
				tabList: [{
					name: '推荐',
				}, {
					name: '保安',
				}, {
					name: '保洁'
				}, {
					name: '电工'
				}, {
					name: '环卫'
				}, {
					name: '物业'
				}],
				indexList: [{}, {}, {}, {}]
			}
		},
		onLoad() {
			this.loadmore()
		},
		methods: {
			scrolltolower() {
				this.loadmore()
			},
			//查询list数据
			loadmore() {

			},
			//抢单、
			toStepAhead() {
				uni.navigateTo({
					url: '/pages/homePage/stepAhead/stepAhead',
				});
			},
			//搜索
			toSearch(){
				uni.navigateTo({
					url: '/pages/homePage/search/search',
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg{
		   position: fixed;
		    width: 100%;
		    height: 100%;
		    top: 0;
		    left: 0;
		    z-index: -1;
			background-color: #F2F6FF;
	}
	.search {
		width:483rpx;
	}

	.wrap {
		padding: 0 32rpx;
	}

	.titlePink {
		font-family: PingFang SC;
		width: 100%;
		height: 140rpx;
		border-radius: 25rpx;
		background: linear-gradient(120deg, #FFF0F0, #FDD9D9, #FEBCBD);
	}

	.titleYello {
		font-family: PingFang SC;
		width: 100%;
		height: 140rpx;
		border-radius: 25rpx;
		background: linear-gradient(120deg, #FEF8E1, #FCEFCC, #F9E4AB);
	}

	.titleBlue {
		font-family: PingFang SC;
		width: 100%;
		height: 140rpx;
		border-radius: 25rpx;
		background: linear-gradient(120deg, #E3EFFF, #C8DCFF, #9CC2FA);
	}

	.tab {
		margin: 42rpx 32rpx;

		/deep/ .u-tabs__wrapper__nav__line {
			width: 35px !important;
		}
	}

	.list {
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