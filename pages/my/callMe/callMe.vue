<template>
	<view>
		<u-navbar title="关于我们"  :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
		<rich-text :nodes="node"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				node:
				 `<h2>我们是谁</h2>
				<p>我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述。</p>
				<h2>我们提供什么价值？</h2>
				<p>我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述。</p>
				<h2>我们是谁</h2>
				<p>我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述我们是谁的描述。</p>`
			}
		},
		methods: {
			
		}
	}
</script>

<style>
  *{
	  padding: 34rpx;
  }
</style>
