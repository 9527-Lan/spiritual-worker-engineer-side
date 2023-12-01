import {
	login,
	loginCode
} from '@/api/user.js'

const state = {
	hasLogin: false,
	nickname: '',
	avatar: '',
	balance: 0,
	memberId: ''
}

const mutations = {
	SET_HAS_LOGIN: (state, hasLogin) => {
		state.hasLogin = hasLogin
	},
	SET_NICKNAME: (state, nickname) => {
		state.nickname = nickname
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_BALANCE: (state, balance) => {
		state.balance = balance
	},
	SET_MEMBERID: (state, memberId) => {
		state.memberId = memberId
	}
}

const actions = {
	//  #ifndef MP
	login({
		commit
	}, data) {
		const {
			mobile,
			code
		} = data
		return new Promise((resolve, reject) => {
			login(mobile, code).then(response => {
				const {
					access_token,
					token_type
				} = response.data
				const token = token_type + " " + access_token
				uni.setStorageSync('token', token)
				commit('SET_HAS_LOGIN', true)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// #endif
	// 验证码登录
	loginCode({
		commit
	}, data) {
		const {
			mobile,
			code
		} = data
		return new Promise((resolve, reject) => {
			loginCode(data).then(response => {
				const {
					access_token,
					token_type
				} = response.data
				console.log(response,'jdddddddddddddddddddddd');
				uni.setStorageSync('engineer_id',response.data);
				const token = token_type + " " + access_token
				uni.setStorageSync('token', token)
				commit('SET_HAS_LOGIN', true)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
