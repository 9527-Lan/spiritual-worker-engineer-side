<template>
	<view class="container">
		<u-navbar title="推广列表" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
			leftIconColor="#000" titleStyle="color: #000;font-size:34rpx">
		</u-navbar>
		<view class="query-box">
			<view class="query-item">
				<p>推广总量：{{ list.length }}</p>
				
			</view>
			<view class="query-item" @click="DateShow=true">
				<p>{{params.date}}</p>
				<u-icon v-if="!queryDateShow" name="arrow-down-fill" color="#333333" size="14"></u-icon>
				<u-icon v-else name="arrow-down-fill" color="#333333" size="14"></u-icon>
			</view>
		</view>
		<view class="list-box">
			<view class="list-item" v-for="(item, index) in list" :key="index">
				<view class="item-img">
				<u-avatar :src="item.headSculptureUrl" mode="aspectFit" size="108" ></u-avatar>
				<view style="line-height: 50px; margin-left: 20px; font-weight: bold; font-size: 32rpx;">{{item.engineerName }}</view>
				</view>
				<view class="item" style="text-align: right;">
					<p style="font-size: 24rpx;
font-family: PingFang SC;
font-weight: 500;

color: #999999; line-height: 58px;">{{ item.passivityDate }}</p>
					
				</view>
			</view>
		</view>
		<view class="bottom">
		</view>
		<u-datetime-picker :show="DateShow" mode="year-month" @cancel='DateShow=false' @confirm="getEndTimes"
			:formatter="formatter" ref="endPicker"></u-datetime-picker>
	</view>
</template>

<script>
import {casualPromotions} from "@/api/my.js"
import {getBankBin
} from "@/utils/bank"
	export default {
		data() {
			return {
				queryYear: '2023',
				queryMouth: '09',
				DateShow:false,
				params: {
					engineerId:'',
					pageNum:1,
					pageSize:10,
					date:''
				},
				queryDateShow: false,
				queryTypeShow: false,
				list: [
		
				],
			}
		},
		onLoad() {
			let date= new Date()
			let Year = date.getFullYear();
				let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				console.log(Year+'-'+Moth)
				this.params.date=Year+'-'+Moth
			this.params.engineerId= uni.getStorageSync('engineer_id')
		this.getlist()
		},
		methods: {
			rightClick() {
				uni.navigateBack(1)
			},


			getEndTimes(e) {
				console.log(e.vlaue);
				this.params.date = this.timestampToTime(e.value);
				this.DateShow=false
				this.getlist()
			},

			getlist(){
				casualPromotions(this.params).then((res)=>{
					this.list=res.data.list
					console.log(this.list,'2020220');
			})
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
	.list-box {
		background: #FFFFFF;
		width: 100%;
		height: auto;
		margin-top: 36rpx;
		border-radius: 15rpx;
		justify-content: center;
		.list-item {
			width: 95%;
			display: flex;
			border-bottom: 2rpx solid #F0F0F0;
			justify-content: space-between;
			padding:24rpx 36rpx ;
			height: 160rpx;
			.item-img{
				display: flex;
			}
		}
	}
</style>