/**
 * 用户相关api
 */
import request from '@/utils/request'


// H5/Android/IOS 手机短信验证码登录
export function login(mobile, code) {
	return request({
		url: '/youlai-auth/oauth/token',
		method: 'post',
		params: {
			mobile: mobile,
			code: code,
			grant_type: 'sms_code'
		},
		headers: {
			'Authorization': 'Basic bWFsbC1hcHA6MTIzNDU2' // 客户端信息Base64加密，明文：mall-app:123456
		}
	})
}
// 点击立刻抢单
export function casualOrderEngineer(params) {
	return request({
		url: '/web/casualOrder/casualOrderEngineer',
		method: 'get',
		params: params,
	})
}
// 我的工程师查询
export function findEngineer(params) {
	return request({
		url: '/app/my_engineer',
		method: 'get',
		params: params,
	})
}

// 异常订单
export function casualPages(params) {
	return request({
		url: '/web/casualOrder/pages',
		method: 'get',
		params: params,
	})
}
// 服务类型下拉框
export function casualEngineer(data) {
	return request({
		url: '/web/casualEngineer/add',
		method: 'post',
		data,
	})
}
// 选择标签下拉框
export function casualServiceLabel(params) {
	return request({
		url: '/web/casualServiceLabel/getByIds',
		method: 'get',
		params: params,
	})
}
