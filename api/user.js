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
// 联系客服
export function tomerService(params) {
	return request({
		url: '/LowerSingleEnd/consultCustomerService',
		method: 'get',
		params: params,
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
// 点击立刻抢单
export function casualOrderEngineer(params) {
	return request({
		url: '/engineerEnd/web/casualOrder/casualOrderEngineer',
		method: 'get',
		params: params,
	})
}
// 我的用户查询
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
// 选择获取验证码
export function getnumcode(params) {
	return request({
		url: '/engineerEnd/sendMsg',
		method: 'get',
		params:params
	})
}
export function getAgreement(){
	return request({
		url: '/engineerEnd/userAgreement',
		method: 'get',
	})
}
export function getCooperationAgreement(){
	return request({
		url: '/engineerEnd/cooperationAgreement',
		method: 'get',
	})
}
export function querybyPhone(params){
	return request({
		url: '/engineerEnd/querybyPhone',
		method: 'get',
		params
	})
}
//消息 
export function messageCount(id){
	return request({
		url: '/engineerEnd/messageCount',
		method: 'get',
		params:{id:id}
	})
}
//消息列表
export function casualMessage(params){
	return request({
		url: '/engineerEnd/casualMessage/pages',
		method: 'get',
		params:params
	})
}
// 消息清空
export function closeMessage(id){
	return request({
		url: '/engineerEnd/editMessage',
		method: 'get',
		params:{id:id}
	})
}