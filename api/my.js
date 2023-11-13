import request from '@/utils/request'

// 我的
export function engineerEnd(params) {
	return request({
		url: '/engineerEnd/app/my_engineer',
		method: 'get',
		params: params,
	})
}
// 抢单中
export function LowerSingleEnd(params) {
	return request({
		url: '/LowerSingleEnd/queryOrderbyId',
		method: 'get',
		params: params,
	})
}
// 进行中
export function queryOrderbyJxzId(params) {
	return request({
		url: '/LowerSingleEnd/queryOrderbyJxzId',
		method: 'get',
		params: params,
	})
}
// 关于我们
// export function queryOrderbyJxzId(params) {
// 	return request({
// 		url: '/engineerEnd/aboutUs',
// 		method: 'get',
// 		params: params,
// 	})
// }
// 抢单中下拉框
export function engineerEndList(params) {
	return request({
		url: '/engineerEnd/order/options',
		method: 'get',
		params: params,
	})
}
// 完成订单
export function LowerSingleEndList(params) {
	return request({
		url: '/LowerSingleEnd/queryOrderbyWcId',
		method: 'get',
		params: params,
	})
}
// 异常订单
export function queryOrderbyYcIdList(params) {
	return request({
		url: '/LowerSingleEnd/queryOrderbyYcId',
		method: 'get',
		params: params,
	})
}