<template>
    <div class="main-content accountIinfo">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>账户基本信息
        </div>
        <div class="info_centent">
            <div class="info_centent_top">
                <div class="info_centent_top_left text-center">
                    <img class="avatar" src="../../assets/images/personalCenter/avatar.png" alt="">
                    <div class="phone">
                        <span>{{loginName | changePhone(loginName)}}</span>
                    </div>
                </div>
                <div class="info_centent_top_right text-xl flex flex-row">
                    <div class="info text-center flex-sub">
                        <span class="text-bold">{{goldenBeansInfo.usableBean}}</span>
                        <span>金豆</span>
                    </div>
                    <div class="info text-center flex-sub">
                        <span class="text-bold" v-if="activityCouponMemberList.usablenessCoupons">{{activityCouponMemberList.usablenessCoupons.length}}</span>
                        <span>优惠券</span>
                    </div>
                    <div class="info text-center pointer flex-sub" @click="toMyTracks">
                        <span class="text-bold">{{total}}</span>
                        <span>足迹</span>
                    </div>
                </div>
            </div>
            <div class="info_centent_authbank">
                <!-- <div class="auth_item flex flex-row align-center">
                    <div class="icon">
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                    <div class="auth_msg1 flex-twice">
                        <div class="auth_title">实名认证</div>
                        <div class="text-darkGray"为了确保交易主体的合法权益，请先完成实名认证</div>
                    </div>
                    <div class="auth_msg2 flex-sub">
                        <span>未认证，</span>
                        <span>认证审核中</span>
                        <el-button type="text">立即认证</el-button>
                    </div>
                </div>
                <div class="auth_item flex flex-row align-center">
                    <div class="icon">
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                    <div class="auth_msg1 flex-twice">
                        <div class="auth_title">绑定银行卡</div>
                        <div class="text-darkGray">绑定银行卡便于大额交易，和作为接受退款的银行卡号绑卡成功可获得+30金豆</div>
                    </div>
                    <div class="auth_msg2 flex-sub">
                        <span>未认证，</span><el-button type="text">立即绑卡</el-button>
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                </div> -->
                <div class="auth_item flex flex-row align-center">
                    <div class="icon">
                        <img src="../../assets/images/main_anquan_image.png" alt="">
                    </div>
                    <div class="auth_msg1 flex-twice">
                        <div class="auth_title">交易密码</div>
                        <div class="text-darkGray">交易密码在使用金豆兑换奖品时作为有效校验方式</div>
                    </div>
                    <div class="auth_msg2 flex-sub">
                        <router-link :to="{path:'/myAccount/tradersPassword'}" v-if="bindPayPassword==2"><el-button type="primary" round>去设置</el-button></router-link>
                        <el-button type="success" round v-if="bindPayPassword==1">已设置</el-button>
                    </div>
                </div>
                <div class="auth_item flex flex-row align-center">
                    <div class="icon">
                        <img src="../../assets/images/location-icon.png" alt="">
                    </div>
                    <div class="auth_msg1 flex-twice">
                        <div class="auth_title">收货地址</div>
                        <div class="text-darkGray">设置购买商品的配送地址</div>
                    </div>
                    <div class="auth_msg2 flex-sub">
                        <router-link :to="'/myAccount/myAddress'" v-if="bindAddress==2"><el-button type="primary" round>去设置</el-button></router-link>
                        <el-button type="success" round v-if="bindAddress==1">已设置</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    import { mapState } from 'vuex'
    export default {
        name: 'accountIinfo',
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
                total: 0
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.user.accessToken,
                mobile: state => state.user.mobile,
                loginName: state => state.user.loginName,
                bindAddress: state => state.user.bindAddress,
                bindPayPassword: state => state.user.bindPayPassword,
            }),
        },
        watch: {

        },
        created() {

        },
        mounted() {
            this.getRecommendTraceGoodsList();
        },
        destroyed() {

        },
        methods: {
            toMyTracks() {
                this.$router.push({path: 'myTracks'})
            },
            async getRecommendTraceGoodsList() {
                let params = {
                    pageNum: 1,
                    pageSize: 10
                }
                let data = await this.$api.getRecommendTraceGoodsList(params,getCookie('accessToken'));
                this.total = data.page.total;
            },
        }
    }

</script>

<style lang="scss" scoped>
    .accountIinfo{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            overflow: hidden;
            .info_centent_top {
                margin-bottom: 20px;
                border: 1px solid var(--ghostWhite);
                overflow: hidden;
                .info_centent_top_left {
                    float: left;
                    overflow: hidden;
                    width: 30%;
                    border-right: 1px solid var(--ghostWhite);
                    padding: 50px 20px;
                    .avatar {
                        width: 44px;
                        height: 44px;
                    }
                    .phone {
                        margin-left: 20px;
                        font-size: 22px;
                        display: inline-block;
                        vertical-align: top;
                        span {
                            display: block;
                            margin: 10px 0;
                        }
                    }
                }
                .info_centent_top_right {
                    overflow: hidden;
                    width: 70%;
                    padding: 55px 0;
                    .info {
                        line-height: 24px;
                        border-right: 1px solid #f0f0f0;
                        &:last-child {
                            border: 0;
                        }
                        span{
                            display: block;
                        }
                    }
                }
            }
            .info_centent_authbank {
                padding: 20px;
                overflow: hidden;
                .auth_item {
                    overflow: hidden;
                    font-size: 14px;
                    margin-bottom: 30px;
                    .icon {
                        width: 60px;
                        height: 60px;
                        margin-right: 20px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                        }
                    }
                    .auth_msg1 {
                        line-height: 30px;
                        .auth_title {
                            font-weight: 600;
                        }
                    }
                    .auth_msg2 {
                        margin-left: 80px;
                        img {
                            width: 60px;
                            height: 60px;
                            border-radius: 100%;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
</style>
