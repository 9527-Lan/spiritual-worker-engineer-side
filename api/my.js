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
		url: '/engineerEnd/web/casualEngineer/querybyId',
		method: 'get',
		params: params,
	})
}

// 我的信息保存
export function casualEngineerEdit(params) {
	return request({
		url: '/engineerEnd/web/casualEngineer/edit',
		method: 'post',
		data: params,
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

// 多服务类型查标签
export function casualEngineerGetByIds(params) {
	return request({
		url: '/engineerEnd/web/casualEngineer/getByIds',
		method: 'get',
		params: params,
	})
}

// 文件删除
export function download(params) {
	return request({
		url: '/file/download',
		method: 'get',
		params: params,
	})
}

// 文件删除
export function authentication(params) {
	return request({
		url: '/engineerEnd/authentication',
		method: 'get',
		params: params,
	})
}

// 工程师端-上传其他证件
export function certificate(params) {
	return request({
		url: '/engineerEnd/web/casualEngineer/certificate',
		method: 'post',
		data: params,
	})
}

// 工程师端-删除其他证件
export function delcertificate(params) {
	return request({
		url: '/engineerEnd/web/casualEngineer/delcertificate',
		method: 'get',
		params: params,
	})
}

//头像上传
export function casualEngineerAvatar(params) {
	return request({
		url: '/engineerEnd/web/casualEngineer/avatar',
		method: 'get',
		params: params,
	})
}

//工程师端-关于我们
export function engineerEndAboutUs(params) {
	return request({
		url: '/engineerEnd/aboutUs',
		method: 'get',
		params: params,
	})
}

//工程师端-咨询客服
export function consultCustomerService(params) {
	return request({
		url: '/engineerEnd/consultCustomerService',
		method: 'get',
		params: params,
	})
}

//工程师端-我的证书
export function engineerEndMyCertificate(params) {
	return request({
		url: '/engineerEnd/myCertificate',
		method: 'get',
		params: params,
	})
}

//工程师-添加银行卡
export function casualBankCardsAdd(params) {
	return request({
		url: '/engineerEnd/web/casualBankCards/add',
		method: 'post',
		params: params,
	})
}
// 资金明细
export function fundDetails(params) {
	return request({
		url: '/engineerEnd/fundDetails',
		method: 'get',
		params:params
	})
}
// 推广列表
export function casualPromotions(params) {
	return request({
		url: '/engineerEnd/web/casualPromotions/pages',
		method: 'get',
		params:params
	})
}
// 生成二维码
export function myPromotionCode(id) {
	return request({
		url: '/web/casualPromotions/myPromotionCode',
		method: 'get',
		params:{id:id}
	})
}

// 添加银行卡
export function CardsAdd(params) {
	console.log(params,'jdjddj');
	return request({
		url: '/engineerEnd/web/casualBankCards/add',
		method: 'post',
		data: params,
	})
}

// 银行卡列表
export function getcardList(params) {
	console.log(params,'jdjddj');
	return request({
		url: '/engineerEnd/web/casualBankCards/pages',
		method: 'get',
		params: params,
	})
}

// 根据银行卡查询id
export function getbyId(params) {
	return request({
		url: '/engineerEnd/casualBankCards/getbyId',
		method: 'get',
	 params:params,
	})
}

// 资金明细下拉框
export function getzjoptions() {
	return request({
		url: '/engineerEnd/fundDetails/options',
		method: 'get',
	})
}
// 银行卡删除
export function carddel(id) {
	return request({
		url: '/engineerEnd/casualBankCards/del',
		method: 'get',
		params:{id:id}
	})
}

// 待审核证书


// 提现申请
export function addwithdrawal(params) {
	return request({
		url: '/engineerEnd/addwithdrawal',
		method: 'get',
		params:params
	})
}
// 待审核证书
export function myDaiCertificate(params) {
	return request({
		url: '/engineerEnd/myDaiCertificate',
		method: 'get',
		params:params
	})
}
