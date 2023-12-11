import Vue from 'vue'
import store from './store'
import App from './App'
import * as filters from './filters' // global filter
import dayjs from '@/utils/dayjs.min.js'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	}
})

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
uni.$on('beforeEnter', (to, from, next) => {
	
  // 进行路由拦截判断，根据你的业务逻辑进行处理
  if ((to.path === '/' || to.path === 'pages/login/login' || to.path === 'pages/login/index') && !store.state.hasLogin) {
    // 未登录，则跳转到登录页面
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    next('/')
  } else {
    // 已登录或其他情况，正常跳转
    next()
  }
})
const prePage = ()=>{
	let pages = uni.$u.pages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, prePage};
Vue.prototype.$dayjs = dayjs;

App.mpType = 'app'

const app = new Vue({
    ...App
})


app.$mount()

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})