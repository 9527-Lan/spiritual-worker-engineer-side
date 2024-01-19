<template>
	<view >
	</view>
</template>

<script>
	import {
		loginOpenid
	} from "@/api/login.js"
import {
	mapMutations
} from 'vuex';

export default {
	components: {
	},
	data() {
		return {
			
		};
	},
	onLoad(options){
		this.isOne = false
		if(options.openId){
			loginOpenid({openid:options.openId}).then(res=>{
				console.log(res);
				if(res.data == 0){
					uni.navigateTo({
						url:'/pages/login/login?openid=' + options.openId
					})
				}else{
					uni.setStorageSync('engineer_id',res.data);
					uni.switchTab({
						url:'/pages/homePage/index'
					})
				}
			})
		}else{
			this.loginwx()
			// uni.navigateTo({
			// 	url:'/pages/login/login'
			// })
		}
	},
	methods: {
		loginwx(){
			this.externalLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4cc076e518106cc3&redirect_uri=https%3A%2F%2Flhyg.hnxfsd.cn%2Fprod-api%2FwxPublic%2FgetOpenID&response_type=code&scope=snsapi_base&state=lhyg#wechat_redirect'
			window.location.href = this.externalLink
		},
	}
};
</script>
