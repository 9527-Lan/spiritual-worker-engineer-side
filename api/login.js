
import request from '@/utils/request'


// 登录
export function casualOrder(code,phone) {
	return request({
		url: '/engineerEnd/engineerLogin/'+code+'?phone='+156232584933,
		method: 'get',
	})
}

// 验证码登录
export function loginCode(params) {
	return request({
		url: '/engineerEnd/engineerLoginMsg',
		method: 'get',
		params:params
	})
}