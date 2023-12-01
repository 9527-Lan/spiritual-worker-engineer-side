<template>
	<view>
		 <!-- #ifdef MP -->
		 <uniLogin></uniLogin>
		  <!-- #endif -->
		<!-- #ifdef H5 -->
		<login></login>
		  <!-- #endif -->
	</view>
</template>

<script>
	import 
		uniLogin
	 from '@/pages/login/uniLogin.vue'
	 import login from "@/pages/login/login"
	export default {
		data() {
			return {
				
			}
		},
		components:{
			uniLogin,
			login
		},
		onLoad() {

		},
		methods: {
		
		}
	}
</script>
<style>
	page {
		background: #F2F6FF;
	}
</style>
<style lang="scss">
	.container {
		background: #F2F6FF;
	}

	.top-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding-top: 390rpx;

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

	.bottom-box {
		margin: auto;
		margin-top: 310rpx;
		width: 85%;
		height: 89rpx;

		u-button {
			height: 100%;
		}
	}

	.popup-container {
		width: 100%;
		height: 100%;
		padding: 72rpx 46rpx;

		.popup-top-box {
			font-size: 28rpx;

			.link {
				color: #1989ff;
			}
		}

		.popup-bottom-box {
			display: flex;
			justify-content: space-between;
			margin-top: 50rpx;

			.popup-button {
				width: 251rpx;
				height: 72rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>