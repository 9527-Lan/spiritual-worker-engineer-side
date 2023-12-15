<template>
	<u-popup :customStyle="customStyle" :show="show" :round="30" :overlayOpacity="0.4" mode="bottom" closeable
		@close="close" @open="open">
		<view>
			<view class="topBox">
				<view>今日记录</view>
				<view class="">
					<u--form :labelStyle="labelStyle" :model="form" ref="uForm" :rules="rules">
						<u-form-item labelPosition="top" labelWidth="240" :borderBottom="false" label="填写备注"
							prop="remark">
							<u--textarea v-model="form.remark" border='none' count height="240" maxlength="200"
								placeholder="填写当日用工备注">
							</u--textarea>
						</u-form-item>
						<u-form-item labelPosition="top" labelWidth="240" :borderBottom="false" label="上传图片">
							<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" uploadIcon="plus"
								uploadText="请选择图片" width="200" height="200" name="1" multiple :maxCount="3"></u-upload>
						</u-form-item>
					</u--form>
				</view>
			</view>
			<view class="bottomBox">
				<u-icon labelPos="bottom " label="平台客服" labelSize="20" labelColor="#333333" size="40" name="phone"></u-icon>
				<view class="bottonBox">
					<u-button type="primary" color="#3A84F0" text="确认提交" @click="submit"></u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import uTextarea from '@/uni_modules/uview-ui/components/u--textarea/u--textarea.vue';
	import uIcon from '@/uni_modules/uview-ui/components/u-icon/u-icon.vue';
	import {listOrderItemAdd} from'@/api/my.js'
	import service from '@/utils/request.js'
	import {translate} from '@/utils/yasuoimg.js'
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
			},
			orderId:{
				require: true,
				type:String,
			}
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.uForm.setRules(this.rules)
		},
		computed: {},
		methods: {
			open() {
				
			},
			close() {
				this.$emit("close")
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
					await translate(lists[i].url,async (res)=>{
						const result = await this.uploadFilePromise(res,this[`fileList${event.name}`][i])
						console.log(result)
						let item = this[`fileList${event.name}`][fileListLen]
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
						url: JSON.parse(result).data.fileUrl,
						id:JSON.parse(result).data.id,
						}))
						fileListLen++
					})
				}
			},
			uploadFilePromise(url,file) {
				console.log(url);
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: service.defaults.baseURL+'/file/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						fileType:'image',
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							file.status == 'success'
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						},
						fail() {
							
						}
					});
				})
			},
			submit() {
				if(this.fileList1.length==0) return uni.$u.toast('请上传至少一张图片')
				this.$refs.uForm.validate().then(res => {
					let pramas = {
						id:this.orderId,
						orderDesc:this.form.remark,
						orderImg:this.fileList1.map(el=>el.id).toString()
					}
					listOrderItemAdd(pramas).then(res=>{
					uni.$u.toast('提交成功')
					setTimeout(()=>{
						this.close()
					},1000)
					})
				}).catch(errors => {
					uni.$u.toast(errors,'校验失败')
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