
import request from '@/utils/request'


// 首页列表渲染
export function casualOrder(params) {
	return request({
		url: '/engineerEnd/web/casualOrder/pages',
		method: 'get',
		params: params,
	})
}
// 中间tab渲染
export function casualServiceType(params) {
	return request({
		url: '/web/casualServiceType/options',
		method: 'get',
		params: params,
	})
}