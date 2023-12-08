
import request from '@/utils/request'

// 首页列表渲染
export function queryOrderbyIdPages(params) {
	return request({
		url: '/engineerEnd/queryOrderbyIdPages',
		method: 'get',
		params: params,
	})
}
// ??
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
// 查看订单详情
export function getdetail(params) {
	return request({
		url: '/LowerSingleEnd/web/casualOrder/getById',
		method: 'get',
		params: params,
	})
}
// 查看订单详情
export function queryIssignUp(params) {
	return request({
		url: '/engineerEnd/queryIssignUp',
		method: 'get',
		params: params,
	})
}
