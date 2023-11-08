<template>
	<view class="content">
		<image class="logo" src="/static/logo@1x.png"></image>
		<view class="text-area">
			<u-button type="primary" text="确定" @click="hasLogin == false && navTo('/pages/login/login')"></u-button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
			...mapGetters(['hasLogin', 'nickname', 'avatar','balance'])
		},
		onLoad() {

		},
		methods: {
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				console.log('跳转路径', url);
				if (!this.hasLogin) {
					url = '/pages/login/index';
				}
				uni.$u.route(url)
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
