<template>
    <div class="main-content preferentialBenefits">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>优惠福利中心
        </div>
        <div class="info_centent">
            <div class="info_centent_top margin-bottom-lg">
                <div class="info_centent_top_center">
                    <div>金豆换福利</div>
                    <div class="text-center text-gray margin-top-lg" style="padding: 10px 0 28px 0;">使用金豆可兑换获得优惠券</div>
                </div>
                <el-button class="use" round @click="goldenBeanExchangeCenter">前往兑换</el-button>
            </div>
            <div style='overflow: hidden;'>
                <el-divider>我的优惠券</el-divider>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-if="activityCouponMemberList.usablenessCoupons" :label="activityCouponMemberList.usablenessCoupons==0?'可使用 (0)':'可使用 ('+activityCouponMemberList.usablenessCoupons.length+')'" name="first">
                        <div class="flex flex-row flex-wrap">
                            <div class="flex flex-row flex-wrap" v-if="activityCouponMemberList.usablenessCoupons.length!=0">
                                <div class="itemCoupon margin-bottom" v-for="(item, index) in activityCouponMemberList.usablenessCoupons" :key="index">
                                    <div class="itemCoupon-top text-center">
                                        <div class="text-bold"><span class="text-price text-xxl"></span><span class="money">{{item.discountAmount}}</span></div>
                                        <div class="padding-bottom-sm">满{{item.transactionAmount}}减{{item.discountAmount}}元</div>
                                        <div class="padding-bottom-sm">{{item.indateStartTime}}-{{item.indateTime}}</div>
                                    </div>
                                    <div class="itemCoupon-bottom padding-sm">
                                        <div class="padding-bottom">适用商品：<span class="text-darkGray">适用全部产品</span></div>
                                        <div class="padding-bottom">适用渠道：<span class="text-darkGray">全部渠道</span></div>
                                        <div class="padding-bottom">优惠叠加：<span class="text-darkGray">不可叠加使用</span></div>
                                        <div class="text-center"><el-button round>立即使用</el-button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="noCoupon2" v-else>
                                <img src="../../assets/images/personalCenter/noCoupon2.png" alt="">
                                <div class="text-center margin-tb text-gray">无任何记录~</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane v-if="activityCouponMemberList.usedCoupons" :label="activityCouponMemberList.usedCoupons==0?'已使用 (0)':'已使用 ('+activityCouponMemberList.usedCoupons.length+')'" name="second">
                        <div class="flex flex-row flex-wrap">
                            <div class="flex flex-row flex-wrap" v-if="activityCouponMemberList.usedCoupons.length!=0">
                                <div class="itemCoupon margin-bottom" v-for="(item, index) in activityCouponMemberList.usedCoupons" :key="index">
                                    <div class="itemCoupon-top text-center">
                                        <div class="text-bold"><span class="text-price text-xxl"></span><span class="money">{{item.discountAmount}}</span></div>
                                        <div class="padding-bottom-sm">满{{item.transactionAmount}}减{{item.discountAmount}}元</div>
                                        <div class="padding-bottom-sm">{{item.indateStartTime}}-{{item.indateTime}}</div>
                                    </div>
                                    <div class="itemCoupon-bottom padding-sm">
                                        <div class="padding-bottom">适用商品：<span class="text-darkGray">适用全部产品</span></div>
                                        <div class="padding-bottom">适用渠道：<span class="text-darkGray">全部渠道</span></div>
                                        <div class="padding-bottom">优惠叠加：<span class="text-darkGray">不可叠加使用</span></div>
                                        <div class="text-center"><el-button type="info" plain disabled round>已使用</el-button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="noCoupon2" v-else>
                                <img src="../../assets/images/personalCenter/noCoupon2.png" alt="">
                                <div class="text-center margin-tb text-gray">无任何记录~</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane v-if="activityCouponMemberList.outdatedCoupons" :label="activityCouponMemberList.outdatedCoupons==0?'已失效 (0)':'已失效 ('+activityCouponMemberList.outdatedCoupons.length+')'" name="fourth">
                        <div class="flex flex-row flex-wrap">
                            <div class="flex flex-row flex-wrap" v-if="activityCouponMemberList.outdatedCoupons.length!=0">
                                <div class="itemCoupon margin-bottom" v-for="(item, index) in activityCouponMemberList.outdatedCoupons" :key="index">
                                    <div class="itemCoupon-top text-center">
                                        <div class="text-bold"><span class="text-price text-xxl"></span><span class="money">{{item.discountAmount}}</span></div>
                                        <div class="padding-bottom-sm">满{{item.transactionAmount}}减{{item.discountAmount}}元</div>
                                        <div class="padding-bottom-sm">{{item.indateStartTime}}-{{item.indateTime}}</div>
                                    </div>
                                    <div class="itemCoupon-bottom padding-sm">
                                        <div class="padding-bottom">适用商品：<span class="text-darkGray">适用全部产品</span></div>
                                        <div class="padding-bottom">适用渠道：<span class="text-darkGray">全部渠道</span></div>
                                        <div class="padding-bottom">优惠叠加：<span class="text-darkGray">不可叠加使用</span></div>
                                        <div class="text-center"><el-button type="info" plain disabled round>已过期</el-button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="noCoupon2" v-else>
                                <img src="../../assets/images/personalCenter/noCoupon2.png" alt="">
                                <div class="text-center margin-tb text-gray">无任何记录~</div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'preferentialBenefits',
        components: {
        },
        props:{
            activityCouponMemberList:{
                type: Object
            },
            goldenBeansInfo:{
                type: Object
            },
            payOffTotal:{
                type: Number
            },
        },
        data() {
            return {
                activeName: 'first'
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.user.accessToken,
                mobile: state => state.user.mobile,
                loginName: state => state.user.loginName
            }),
        },
        watch: {

        },
        created() {

        },
        mounted() {
        },
        destroyed() {

        },
        methods: {
            handleClick(tab, event) {
            },
            goldenBeanExchangeCenter() {
                this.$router.push({path: '/myAccount/goldenBeanExchangeCenter'})
            }
        }
    }

</script>

<style lang="scss" scoped>
    .preferentialBenefits{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            .noCoupon2 {
                margin: 30px auto 0;
                img {
                    width: 660px;
                    height: 290px;
                }
            }
            .info_centent_top {
                border: 1px solid var(--ghostWhite);
                padding: 10px 20px;
                position: relative;
                .info_centent_top_center {
                    
                }
                .use {
                    position: absolute;
                    bottom: -18px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            .itemCoupon {
                width: 265px;
                border: 1px solid #f0f0f0;
                margin-right: 50px;
                &:nth-of-type(3n) {
                    margin-right: 0;
                }
                .itemCoupon-top {
                    background-image: linear-gradient(135deg, #efc590 0%, #bb8d48 100%);
                    .money {
                        padding-top: 36px;
                        padding-bottom: 10px;
                        font-size: 36px;
                        display: inline-block;
                    }
                }
                .itemCoupon-bottom {
                    
                }
            }
        }
    }
</style>
