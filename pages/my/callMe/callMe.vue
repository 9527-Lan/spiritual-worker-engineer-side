<template>
	<view>
		<view class="bg"></view>
		<u-navbar title="关于我们" @leftClick="leftClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF" ftIconColor="#000000"
			titleStyle="color: #000000;font-size:34rpx" />
		<view class="rich">
			<rich-text :nodes="node"></rich-text>
		</view>
	</view>
</template>

<script>
	import {
		engineerEndAboutUs
	} from '@/api/my.js'
	export default {
		data() {
			return {
				node: ``
			}
		},
		onLoad() {
			engineerEndAboutUs().then(res => {
				this.node = res.data
			})
		},
		methods:{
			leftClick() {
				uni.switchTab({
					url: '/pages/my/index',
				});
			},
		}
	}
</script>

<style>
	* {
		padding: 34rpx;
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

	.rich {
		margin: 10rpx auto 0;
		width: 686rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
	}
</style>