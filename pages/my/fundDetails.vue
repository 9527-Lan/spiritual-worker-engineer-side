<template>
	<view class="container">
		<u-navbar title="资金明细" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			leftIconColor="#000" titleStyle="color: #000;font-size:34rpx">
		</u-navbar>
		<view class="query-box">
			<view class="query-item" @click="showSex=!showSex">
				<p>{{title?title:'全部'}}</p>
				<u-icon v-if="!showSex" name="arrow-down-fill" color="#333333" size="14"></u-icon>
				<u-icon v-else name="arrow-down-fill" color="#333333" size="14"></u-icon>
			</view>
			<view class="query-item" @click="DateShow=true">
				<p>{{params.createDate}}</p>
				<u-icon v-if="!queryDateShow" name="arrow-down-fill" color="#333333" size="14"></u-icon>
				<u-icon v-else name="arrow-down-fill" color="#333333" size="14"></u-icon>
			</view>
		</view>
		<view class="list-box">
			<view  v-for="(item, index) in list" :key="index">
				<!-- v-if="item.orderName != '提现失败'" -->
				<view  class="list-item">
					<view class="item">
						<p style="margin-bottom: 10rpx;font-size: 32rpx;font-weight: bold;color: #333333;">结算</p>
						<p style="font-size: 24rpx;font-weight: 500;color: #999999;">{{item.createTime}}</p>
					</view>
					<view class="item" style="text-align: right;">
						<p style="margin-bottom: 10rpx;font-size: 32rpx;font-weight: bold;color: #3A84F0;">{{item.type===1?'+':'-'}}{{item.balanceLess}}</p>
						<p style="font-size: 24rpx;font-weight: 500;color: #999999;">{{item.orderName}}{{item.remark?('(' + item.remark) + ')' : ''}}</p>
					</view>
				</view>
				<!-- <u-collapse  v-else>
					<u-collapse-item
					  class="collapse"
					>
						<template v-slot:title>
							<uni-row class="demo-uni-row shang">
								<uni-col :span="16">
									<view class="demo-uni-col dark">结算</view>
								</uni-col>
								<uni-col :span="8">
									<view class="demo-uni-col lan right">{{item.balanceLess}}</view>
								</uni-col>
							</uni-row>
							<uni-row class="demo-uni-row xia">
								<uni-col :span="16">
									<view class="demo-uni-col hui">{{item.createTime}}</view>
								</uni-col>
								<uni-col :span="8">
									<view class="demo-uni-col hui right">{{item.orderName}}</view>
								</uni-col>
							</uni-row>
						</template>
						
						<text class="u-collapse-content">{{ item.remark }}</text>
					</u-collapse-item>
				</u-collapse> -->
				
			</view>
		</view>
		<view class="bottom">
		</view>
		<u-action-sheet :show="showSex" :actions="options" title="请选择状态" @close="showSex = false"
			@select="typeSelect">
		</u-action-sheet>
		<u-datetime-picker :show="DateShow" mode="year-month" @cancel='DateShow=false' @confirm="getEndTimes"
			:formatter="formatter" ref="endPicker"></u-datetime-picker>
	</view>
</template>

<script>
import {fundDetails,getzjoptions} from "@/api/my.js"
	export default {
		data() {
			return {
				queryYear: '2023',
				queryMouth: '09',
				showSex:false,
				DateShow:false,
				params: {
					engineerId:'',
					pageNum:1,
					pageSize:10,
					fundDetails:'',
					createDate:''
				},
				title:'',
				options:[],
				queryDateShow: false,
				queryTypeShow: false,
				list: [
					
				]
			}
		},
		onLoad() {
			this.params.engineerId= uni.getStorageSync('engineer_id')
			getzjoptions().then((res)=>{
				this.options= res.data.map(item=>{
					return {
						name: item.label,
						value: item.value
					}
				})
				
			})
			let date= new Date()
			let Year = date.getFullYear();
				let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				console.log(Year+'-'+Moth)
				this.params.createDate=Year+'-'+Moth
		this.getlist()

		},
		methods: {
			rightClick() {
				uni.navigateBack(1)
			},

			getEndTimes(e) {
				console.log(e.vlaue);
				this.params.createDate = this.timestampToTime(e.value);
				this.DateShow=false
				this.getlist()
			},

			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				return value
			},

			timestampToTime(timestamp) {
				// 时间戳为10位需*1000，时间戳为13位不需乘1000
				let date = new Date(parseInt(timestamp));
				let Year = date.getFullYear();
				let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				
				
				let GMT = Year + '-' + Moth
				return GMT;
			},

			getlist(){
				fundDetails(this.params).then((res)=>{
				this.list=res.data.list
				if(!res.data.list.length){
					uni.$u.toast( '暂无数据')
				}
			})
			},
			typeSelect(e) {
				this.title = e.name
				this.params.fundDetails = e.value;
				this.getlist()

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F6FF;
	}
	.container{
		margin: 0 auto;
		padding: 0 32rpx;
	}
	.query-box {
		display: flex;
		justify-content: space-between;
		margin-top: 100rpx;
		.query-item{
			display: flex;
			align-items: center;
		}
		p {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			margin-right: 10rpx;
		}
	}
	.collapse{
		width: 95%;
		margin: 0 auto;
		& .shang{
			font-weight: bold;
			font-size: 32rpx;
			& .lan{
				color: #3A84F0;
			}
		}
		& .xia{
			& .hui{
				color: #999999;
			}
			font-size: 24rpx;
		}
		& .right{
			text-align: right;
		}
	}
	.list-box {
		background: #FFFFFF;
		width: 100%;
		height: auto;
		margin-top: 36rpx;
		border-radius: 15rpx;
		justify-content: center;
		.list-item {
			width: 95%;
			margin:  0 auto;
			display: flex;
			border-bottom: 2rpx solid #F0F0F0;
			justify-content: space-between;
			padding: 36rpx;
			height: 160rpx;
		}
	}
</style>