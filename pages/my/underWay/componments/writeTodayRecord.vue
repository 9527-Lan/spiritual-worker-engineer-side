<template>
	<u-popup :customStyle="customStyle" :show="show" :round="30" :overlayOpacity="0.4" mode="bottom" closeable
		@close="close" @open="open">
		<view>
			<view class="topBox">
				<view>今日记录</view>
				<view class="">
					<u--form :labelStyle="labelStyle" :model="form" ref="uForm">
						<u-form-item labelPosition="top" labelWidth="240" :borderBottom="false" label="填写备注"
							prop="name">
							<u--textarea v-model="form.remark" border='none' count height="240" maxlength="200"
								placeholder="填写当日用工备注">
							</u--textarea>
						</u-form-item>
						<u-form-item labelPosition="top" labelWidth="240" :borderBottom="false" label="上传图片"
							prop="name">
							<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" uploadIcon="plus"
								uploadText="请选择图片" width="200" height="200" name="1" multiple :maxCount="3"></u-upload>
						</u-form-item>
					</u--form>
				</view>
			</view>
			<view class="bottomBox">
				<u-icon labelPos="bottom " label="平台客服" labelSize="20" labelColor="#333333" size="40" name="phone"></u-icon>
				<view class="bottonBox" @click.stop="submit">
					<u-button type="primary" color="#3A84F0" text="确认提交"></u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import uTextarea from '@/uni_modules/uview-ui/components/u--textarea/u--textarea.vue';
	import uIcon from '@/uni_modules/uview-ui/components/u-icon/u-icon.vue';
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				rules: {
					remark: [{
						required: true,
						message: '请填写当日用工备注',
						trigger: ['blur', 'change']
					}]
				},
				fileList1: [

				]
			}
		},
		props: {
			show: {
				require: true,
				type: Boolean
			},
			customStyle: {
				type: Object,
				default: function() {
					return {
						'width': '750rpx',
						'height': '1144rpx'
					}
				}
			},
			labelStyle: {
				type: Object,
				default: function() {
					return {
						"font-weight": "700",
						"font-size": "28rpx",
						"margin-bottom": "34rpx"
					}
				}
			}
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.uForm.setRules(this.rules)
		},
		computed: {},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.$emit("todayRecord")
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
					this[`fileList${event.name}`][i].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				}
				
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						},
						fail() {
							
						}
					});
				})
			},
			submit() {
				console.log(this.$refs);
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		},

	}
</script>

<style lang="scss">
	.topBox {
		padding: 30rpx 30rpx;
	}
	.bottomBox{
		display: flex;
		justify-content: space-between;
		padding: 40rpx 42rpx;
		border-top: 2rpx solid #DDDDDD;
		.bottonBox {
			margin-left: 30rpx;
			width: 75%;
			background: #3A84F0;
			border-radius: 45rpx;
			overflow: hidden;
		}
	}
</style>