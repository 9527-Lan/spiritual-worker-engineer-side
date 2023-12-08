<template>
    <view>
        <view class="bg"></view>

        <u-navbar title="已提交证书" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconSize="34rpx"
            bgColor="#F2F6FF" ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />
        <view class="list">
            <view class="addCard" @click="addCard">
                +添加证书
            </view>
            <u-list>
                <u-list-item v-for="(item, index) in OrderList" :key="index">
                    <view class="listBlok">
                        <view class="top">
                            <text class="topTextBlack">名称：{{ item.certificateName ? item.certificateName : '--' }}</text>
                        </view>
                        <view class="content">备注：{{ item.remark ? item.remark : '暂无' }}</view>
                    </view>
                </u-list-item>
            </u-list>
        </view>
    </view>
</template>

<script>

import {
    certificate,
    casualEngineerMy,
    myDaiCertificate,
    delcertificate
} from '@/api/my.js'
export default {
    data() {
        return {
            frontList: [],
            contraryList: [],
       
            list1: [{
                    name: '已提交',
                }, {
                    name: '已审核',
                }],
            show: false,
            form: {
                name: '',
            },
            rules: {
                name: [{
                    required: true,
                    message: '请填写证书名称',
                    trigger: ['blur', 'change']
                }],
                remark: [{
                    required: true,
                    message: '请填写备注',
                    trigger: ['blur', 'change']
                }]
            },
        }
    },
    props: [
 {
    OrderList:{
            type: Array,
        }
 }
       
    ],
     
   
    onLoad(options) {
        // console.log(options);
        // myDaiCertificate({ id: uni.getStorageSync('engineer_id') }).then((res) => {
        //     console.log(res);
        //     this.OrderList = res.data
        // })
    },
    methods: {
    //     addCard(){
    //         uni.navigateTo({
	// 				url: '/pages/my/myMessage/components/uploadcertificat?id='+uni.getStorageSync('engineer_id')
	// 			})
    //     }

    },
    mounted(){
        console.log(this.OrderList,'222');
    }
}
</script>

<style lang="scss" scoped>
.bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: #F2F6FF;
}

.from {
    position: relative;
    width: 686rpx;
    margin: 116rpx auto 0;
    padding: 0 36rpx;
    background: #FFFFFF;
    border-radius: 15rpx;
    font-family: PingFang SC;

    .title {
        height: 32rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 24rpx;
        margin-top: 24rpx;
    }

    .tip {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
    }

    .upTip {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-top: 110rpx;
        margin-bottom: 62rpx;
    }

    .upImg {
        position: relative;
        width: 370rpx;
        margin: 34rpx auto 0;

        .imgText {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 42%;
            color: #3A84F0;
        }
    }

    .fromText {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin: 64rpx auto 0;
        text-align: center;
    }
}

.list {
    margin: 42rpx 32rpx;

    .listBlok {
        width: 686rpx;
        background: #ffffff;
        border-radius: 15rpx;
        padding: 35rpx 32rpx 45rpx 37rpx;
        margin-bottom: 27rpx;

        .topTextBlack {
            color: #333333;

        }

        .content {
            height: 92rpx;
            overflow: hidden;
        }

        .top {
            display: flex;
            height: 34rpx;
            justify-content: space-between;
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            margin-bottom: 24rpx;



            .topTextBlue {
                color: #3A84F0;
            }
        }

        .tagRow {
            max-height: 42rpx;
            overflow: hidden;

            .tag {
                height: 42rpx;
                width: fit-content;
                display: inline-block;
                margin-right: 13rpx;
            }
        }
    }
}

.addCard {
    width: 686rpx;
    height: 120rpx;
    margin-bottom: 10px;
    background: #FFFFFF;
    border-radius: 15rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #3A84F0;
}
::v-deep .u-tabs__wrapper__nav__item{
    width: 50%;
}
</style>