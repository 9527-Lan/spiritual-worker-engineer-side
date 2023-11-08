<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="搜索" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<view>
			<u-search placeholder="搜索用工信息..." v-model="keyword" :showAction="false" height="64rpx"
				margin="100rpx 32rpx 39rpx 32rpx" bgColor="#FFFFFF" @click="toSearch"></u-search>
		</view>
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<view class="listBlok" @click="stepAhead">
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
				keyword:'',
				indexList: [{}, {}, {}, {}]
			}
		},
		onLoad() {
			this.loadmore()
		},
		computed: {},
		methods: {
			leftClick(){
				uni.switchTab({
					url: '/pages/homePage/index',
				});
			},
			scrolltolower() {
				this.loadmore()
			},
			//查询list数据
			loadmore() {

			},
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