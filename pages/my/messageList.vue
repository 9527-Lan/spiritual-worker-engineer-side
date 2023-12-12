<template>
    <view class="container">
        <u-navbar title="我的消息" @rightClick="rightClick" :autoBack="true" leftIconSize="34rpx" bgColor="#F2F6FF"
            leftIconColor="#000" titleStyle="color: #000;font-size:34rpx">
        </u-navbar>
        <!-- <view class="query-box">
            <view class="query-item">
                <p>推广总量：{{ list.length }}</p>
            </view>
            <view class="query-item" @click="DateShow = true">
                <p>{{ params.date }}</p>
                <u-icon v-if="!queryDateShow" name="arrow-down-fill" color="#333333" size="14"></u-icon>
                <u-icon v-else name="arrow-down-fill" color="#333333" size="14"></u-icon>
            </view>
        </view>
        <view class="list-box">
            <view class="list-item" v-for="(item, index) in list" :key="index">
                <view class="item-img">

                    <view style="
                font-weight: bold;
                font-size: 32rpx;
                white-space: nowrap;
                
                overflow: hidden;
                text-overflow: ellipsis;
                width: 50%;
              ">
                        {{ item.sendName }}</view>

                    <view style="
                     width: 50%;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                text-align: right;
              ">{{ item.createTime }}</view>
                </view>
                <view class="item-img">
                    content
                </view>

            </view>
        </view> -->
        <u-collapse
        style="margin-top: 50px;"
    @change="change"
    @close="close"
    @open="open"
  >
    <u-collapse-item
    v-for="(item,index) in list" :key="index"
      name="Docs guide"
	  class="collapse"
    >
		<template v-slot:title>
			<uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view class="demo-uni-col dark">{{item.typeName}}</view>
				</uni-col>
				<uni-col :span="12">
					<view class="demo-uni-col dark">{{item.updateTime}}</view>
				</uni-col>
			</uni-row>
		</template>
		<text class="u-collapse-content">{{ item.content }}</text>
    </u-collapse-item>
  </u-collapse>
    </view>
</template>
  
<script>
import { casualMessage,closeMessage } from "@/api/user.js";
export default {
    data() {
        return {
            queryYear: "2023",
            queryMouth: "09",
            DateShow: false,
            params: {
                id: uni.getStorageSync('engineer_id'),
                pageNo: 1,
                pageSize: 10,
            },
            queryDateShow: false,
            queryTypeShow: false,
            list: [
                {
                    sendName: 'lisan',
                    createTime: '2020-10-11'
                },

            ],
        };
    },
    onLoad() {
    },
    methods: {
        change(){

        },
        close(){

        },
        open(){

        }
    },
    mounted() {
        casualMessage(this.params).then((res) => {
            if(res.code==='00000'){
      this.list=res.data.list
      closeMessage(uni.getStorageSync('engineer_id')).then((res)=>{
        console.log(res);
    })
            }
      
        })
  
    }
};
</script>
  
<style lang="scss">
page {
    background: #f2f6ff;
}

.container {
    margin: 0 auto;
    padding: 0 32rpx;
}
.collapse{
	& /deep/ .u-cell__body{
		padding: 15px 15px;
	}
}
.query-box {
    display: flex;
    justify-content: space-between;
    margin-top: 100rpx;

    .query-item {
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
    background: #ffffff;
    width: 100%;
    height: auto;
    margin-top: 36rpx;
    border-radius: 15rpx;
    justify-content: center;

    .list-item {
        width: 95%;
        //   display: flex;
        border-bottom: 2rpx solid #f0f0f0;
        justify-content: space-between;
        padding: 24rpx 36rpx;
        height: 160rpx;

        .item-img {
            display: flex;
        }
    }
}
</style>