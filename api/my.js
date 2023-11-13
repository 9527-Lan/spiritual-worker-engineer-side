import request from '@/utils/request'

// 进行中
// 根据订单Id和工程师Id查询
export function progressQuery(params) {
	return request({
		url: '/web/casualOrder/listOrderItem',
		method: 'get',
		params: params,
	})
}
