/**
 * 用户相关api
 */
import request from '@/utils/request'


// H5/Android/IOS 手机短信验证码登录
export function login( mobile,code) {
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