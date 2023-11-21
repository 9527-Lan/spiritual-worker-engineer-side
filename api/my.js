import request from '@/utils/request'

// 工程师端-进行中-查看详情
export function engineerEndListOrderItem(params) {
	return request({
		url: '/engineerEnd/listOrderItem',
		method: 'get',
		params: params,
	})
}
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
		url: '/engineerEnd/queryOrderbyId',
		method: 'get',
		params: params,
	})
}
// 工程师端-工程师抢单成功后退出当前订单
export function LowerSingleEndExit(params) {
	return request({
		url: '/engineerEnd/casualEngineer/exit',
		method: 'get',
		params: params,
	})
}
// 进行中
export function queryOrderbyJxzId(params) {
	return request({
		url: '/engineerEnd/queryOrderbyJxzId',
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
		url: '/engineerEnd/queryOrderbyWcId',
		method: 'get',
		params: params,
	})
}
// 异常订单
export function queryOrderbyYcIdList(params) {
	return request({
		url: '/engineerEnd/queryOrderbyYcId',
		method: 'get',
		params: params,
	})
}
// 用工详情
export function LowerSingleEndCasualOrder(params) {
	return request({
		url: '/LowerSingleEnd/web/casualOrder/listOrderItem',
		method: 'get',
		params: params,
	})
}

// 我的信息渲染
export function casualEngineerMy(params) {
	return request({
		url: '/web/casualEngineer/querybyId',
		method: 'get',
		params: params,
	})
}

// 工程师端-进行中-提交
export function listOrderItemAdd(params) {
	return request({
		url: '/engineerEnd/listOrderItemAdd',
		method: 'get',
		params: params,
	})
}