<template>
    <view>
        <view class="bg"></view>
        <u-navbar title="已提交证书" @leftClick="leftClick" :placeholder="true" :autoBack="true" leftIconSize="34rpx"
            bgColor="#F2F6FF" ftIconColor="#000000" titleStyle="color: #000000;font-size:34rpx" />

        <view class="list">
            <u-list >
                <u-list-item v-for="(item, index) in OrderList" :key="index">
                    <view class="listBlok" >
                        <view class="top">
                            <text class="topTextBlack">名称：{{ item.certificateName?item.certificateName:'--' }}</text>
                        </view>
                        <view class="content">备注：{{ item.remark?item.remark:'暂无' }}</view>
                        <view style="display: flex;">
                            <image v-for="(item2, index) in item.certificateImgUrl" :src="item2" mode="widthFix"
                                style="width: 200rpx; height: 150rpx;"></image>
                        </view>


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
            OrderList: [],
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
    props: {
        labelStyle: {
            type: Object,
            default: function () {
                return {
                    "font-weight": "700",
                    "font-size": "28rpx",
                    "margin-bottom": "34rpx"
                }
            }
        },
    },
    onLoad(options) {
        console.log(options);
        myDaiCertificate({ id: options.id }).then((res) => {
            console.log(res);
            this.OrderList = res.data
        })
    },
    methods: {
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
        height: 400rpx;
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
}</style>