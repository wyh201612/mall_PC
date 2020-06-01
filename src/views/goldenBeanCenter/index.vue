<template>
    <div class="main-content goldenBeanCenter">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>金豆中心
        </div>
        <div class="info_centent">
            <div class="info_centent_top margin-bottom-lg">
                <div class="info_centent_top_center">
                    <div class="flex flex-row justify-center align-end">
                        <img class="goldenBeans" src="../../assets/images/personalCenter/goldenBeans.png" alt="">
                        <span class="text-sxxl text-white margin-right-sm text-bold">{{signInfoData.goldBean}}</span><span class="text-white margin-bottom-xs">个</span>
                        <router-link :to="'/myAccount/goldenBeanUseDetailed'">
                            <div class="text-white margin-left use">使用明细</div>
                        </router-link>
                    </div>
                    <div class="text-center text-white margin-top-lg">金豆可以用来兑换优惠券或奖品</div>
                </div>
            </div>
            <div class="info_centent_middle margin-bottom-lg">
                <div class="info_centent_middle_center">
                    <div>兑换好礼</div>
                    <div class="exchangeGoodManners flex flex-row" v-if="giftList.length!=0">
                        <div class="exchangeGoodManners_item flex flex-direction align-center justify-center margin-right-lg" v-for="(item, index) in giftList" :key="index">
                            <div class="img">
                                <img :src="item.imgUrl" alt="">
                            </div>
                            <div class="couponName margin-tb-sm text-df">{{item.giftName}}</div>
                            <div class="btn"><el-button size="small" @click="exchangeShow(item.giftId,item.price)">{{item.price}}金豆可兑</el-button></div>
                        </div>
                        <router-link :to="'/myAccount/goldenBeanExchangeCenter'">
                            <div class="text-blue moerGoodManners">更多好礼<i class="el-icon-arrow-right"></i></div>
                        </router-link>
                    </div>
                    <!-- 无兑换实物奖品 -->
                    <div class="noCoupon-box" v-else>
                        <img class="noCoupon" src="../../assets/images/personalCenter/noCoupon.png" alt="">
                        <div class="margin-top text-gray text-sm">无券可兑，正在筹备中～</div>
                    </div>
                </div>
            </div>
            <div class="info_centent_doTasks">
                <div class="info_centent_doTasks_center">
                    <div>做任务领金豆</div>
                    <div class="doTasks-box">
                        <div class="signIn flex flex-direction">
                            <div class="signIn-top flex flex-row margin-bottom">
                                <div class="flex flex-row align-center">
                                    <div class='signInleft flex flex-row'>
                                        <img src="../../assets/images/personalCenter/calendar.png" alt="">
                                        <div class="signIn-top-left-box flex flex-direction justify-between" style="height: 100%;">
                                            <div class="text-bold">每日签到</div>
                                            <div class="text-darkGray">已连续签到 <span class="text-bold text-orangeLight">{{signInfoData.continueSign}}</span> 天，继续加油哦</div>
                                        </div>
                                    </div>
                                    <div class='signInright'>
                                        <div class="signInBtn margin-left-xl" v-if='signInfoData.signStatus==0'><el-button size="small" round @click="siginIn()">签到</el-button></div>
                                        <div class="signInBtn margin-left-xl" v-else><el-button type="info" size="small" round disabled>已签到</el-button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="signIn-bottom">
                                <div class="flex flex-row justify-between">
                                    <div style="position: relative;" class="signIn-item" v-for="(item, index) in signInfoData.signDaysList" :key="index">
                                        <div class="line" v-if="index!=6"></div>
                                        <div class="text-center">
                                            <div :class="item.isSignIn?'no-checked active':'no-checked'">
                                                <svg-icon :icon-class="item.isSignIn?'circle2':'circle1'" :class="item.isSignIn?'circle active':'circle'"></svg-icon>
                                                <div :class="item.isSignIn?'jiangli text-lg text-bold active':'jiangli text-sm'">+{{item.goldBean}}</div>
                                            </div>
                                        </div>
                                        <div :class="item.isSignIn?'week active':'week'">{{item.day}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-divider></el-divider>
                        <div class="tasks">
                            <div class="tasks-item flex flex-row align-center justify-between margin-bottom">
                                <div class="tasks-item-left">
                                    <div class="flex flex-row">
                                        <img src="../../assets/images/personalCenter/cart.png" alt="">
                                        <div class="left-box flex flex-direction justify-between">
                                            <div class="text-bold">购买商品</div>
                                            <div class="text-darkGray">下单支付成功即可获得20个金豆</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tasks-item-right">
                                    <router-link :to="'/goldShop'"><el-button round>逛一逛</el-button></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="兑换商品" :visible.sync="dialogExchangeVisible" width="520px">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="交易密码" prop="payPassword" label-width="100px">
                    <el-input v-model="form.payPassword" type='password' maxlength="6" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="100px">
                    <div>忘记密码？<span class="text-blue pointer" @click="toTradersPassword">找回密码</span>继续兑换吧</div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="exchange('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'

    export default {
        name: 'goldenBeanCenter',
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
            }
        },
        data() {
            var validatePayPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入交易密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else {
                    callback();
                }
            };
            return {
                dialogExchangeVisible: false,
                giftId: '',
                giftList: {},
                signInfoData: {},
                form: {
                    payPassword: ''
                },
                rules: {
                    payPassword: [
                        { required: true, validator: validatePayPassword, trigger: 'blur' }
                    ]
                },
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.user.accessToken,
                mobile: state => state.user.mobile,
                loginName: state => state.user.loginName,
                bindPayPassword: state => state.user.bindPayPassword
            }),
        },
        watch: {

        },
        created() {

        },
        mounted() {
            this.getGiftList();
            this.signInfo();
        },
        destroyed() {

        },
        methods: {
            // 金豆中心好礼换券信息查询
            async getGiftList() {
                this.giftList = await this.$api.getGiftList('',getCookie('accessToken'));
            },
            // 金豆兑换弹窗展示
            exchangeShow(giftId,price) {
                if(this.bindPayPassword!=1) {
                    this.$confirm('还没有设置交易密码，请先设置交易密码', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push({path:'/myAccount/tradersPassword', query: {url:location.hostname}})
                    }).catch(() => {
                    });
                    return false;
                }
                if(this.signInfoData.goldBean<price) {
                    this.$message.error('金豆不足！');
                    return false;
                }
                const h = this.$createElement;
                this.$msgbox({
                    title: '确定兑换该商品?',
                    message: h('p', null, [
                        h('span', { style: 'color: #bb8d48' }, '兑换需要'+price+'金豆 '),
                        h('div', null, '兑换成功后可以在"兑换明细"页面查看')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    this.giftId = giftId;
                    this.dialogExchangeVisible = true;
                    // this.$prompt('交易密码', '提示', {
                    //     confirmButtonText: '兑换',
                    //     cancelButtonText: '取消',
                    //     inputType: 'password',
                    //     inputPlaceholder: '请输入6位数交易密码',
                    //     inputPattern: /^[0-9]{6,6}$/,
                    //     inputErrorMessage: '请输入6位数交易密码'
                    // }).then(({ value }) => {
                    //     this.giftRecord(this.giftId, value);
                    // }).catch(() => {      
                    // });
                }).catch(() => {
                });
            },
            // 金豆兑换商品、优惠券
            exchange(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.giftRecord(this.giftId, this.form.payPassword);
                    } else {
                        return false;
                    }
                });
            },
            async giftRecord(giftId, payPassword) {
                let params = {
                    giftId: giftId,  // giftId int 是  礼品ID
                    payPassword: payPassword  // payPassword string 是  支付密码
                }
                await this.$api.giftRecord(this.$qs.stringify(params),getCookie('accessToken'));
                await this.$message({
                    message: '兑换成功！',
                    type: 'success'
                });
                this.dialogExchangeVisible = false;
                this.$router.push({path: '/myAccount/goldenBeanExchangeDetailed'});
            },
            // 查询最近七天签到信息
            async signInfo() {
                this.signInfoData = await this.$api.getSignInfo('',getCookie('accessToken'));
                let continueSign = this.signInfoData.continueSign; // 连续签到天数
                let continueSignRemainder = this.signInfoData.continueSign % 7; // 连续签到天数取余数
                let signDaysList = this.signInfoData.signDaysList; // 七天的日期
                let signStatus = this.signInfoData.signStatus; // 今日是否签到 0没有； 1签到
                if (continueSign > 0) { // 是否有连续签到
                    signDaysList.map((item, index)=>{
                        if (continueSignRemainder == 0) { // 第一天或者第七天的情况
                            if (signStatus == 0) { // 当天是否签到
                                item['isSignIn'] = false;
                            } else {
                                item['isSignIn'] = true;
                            }
                        } else {
                            if (index < continueSignRemainder) {
                                item['isSignIn'] = true;
                            } else {
                                item['isSignIn'] = false;
                            }
                        }
                    })
                }
            },
            // 签到操作
            async siginIn() {
                await this.$api.getSignApply('',getCookie('accessToken'));
                this.signInfo();
            },
            // 忘记交易密码
            // url:location.hostname用来设置成功之后返回当前页
            toTradersPassword() {
                this.$router.push({path:'/myAccount/tradersPassword', query: {memberPassword: 1, url:location.hostname}})
            }
        }
    }

</script>

<style lang="scss" scoped>
    .goldenBeanCenter{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            overflow: hidden;
            .info_centent_top {
                background: url(../../assets/images/personalCenter/personalCenter-bg.png) center no-repeat;
                background-size: cover;
                border: 1px solid var(--ghostWhite);
                overflow: hidden;
                padding: 50px 20px;
                .info_centent_top_center {
                    position: relative;
                    .use {
                        position: absolute;
                        top: 23px;
                        left: 530px;
                    }
                    .goldenBeans {
                        width: 34px;
                        height: 34px;
                        margin-right: 6px;
                    }
                }
            }
            .info_centent_middle {
                padding: 10px;
                border: 1px solid var(--ghostWhite);
                .info_centent_middle_center {
                    .noCoupon-box {
                        text-align: center;
                        width: 100%;
                        .noCoupon {
                            width: 660px;
                            height: 220px;
                        }
                    }
                    .exchangeGoodManners {
                        padding: 40px 100px 30px 60px;
                        position: relative;
                        .exchangeGoodManners_item {
                            .img {
                                width: 80px;
                                height: 80px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        
                        .moerGoodManners {
                            position: absolute;
                            top: 88px;
                            right: 20px;
                        }
                    }
                }
            }
            .info_centent_doTasks {
                padding: 10px;
                border: 1px solid var(--ghostWhite);
                .info_centent_doTasks_center {
                    .doTasks-box {
                        padding: 20px;
                        .signIn {
                            .signIn-top {
                                .signInleft {
                                    img {
                                        width: 48px;
                                        height: 48px;
                                    }
                                    .signIn-top-left-box {
                                        padding: 5px 10px;
                                    }
                                }
                            }
                            .signIn-bottom {
                                padding-top: 18px;
                                .signIn-item {
                                }
                                .line {
                                    position: absolute;
                                    border-color: inherit;
                                    background-color: var(--grayLight);
                                    width: 400%;
                                    height: 1px;
                                    top: 15px;
                                    left: 0;
                                    right: 0;
                                }
                                .circle {
                                    font-size: 30px;
                                    background: #fff;
                                    color: var(--grayLight);
                                    &.active {
                                        color: var(--orangeLight);
                                    }
                                }
                                .no-checked {
                                    width: 29px;
                                    position: relative;
                                    z-index: 1;
                                    background: #FFFFFF;
                                    &.active {
                                        &::before {
                                            display: block;
                                        }
                                    }
                                    &::before {
                                        position: absolute;
                                        content: '';
                                        display: none;
                                        width: 88px;
                                        height: 40px;
                                        top: -13px;
                                        left: -29px;
                                        background: url(data:image/gif;base64,R0lGODlhwwDFAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY5RDVFRUQ4RjVCMTExRTdCRDA1QTZCRjVDQTA5QTFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY5RDVFRUQ5RjVCMTExRTdCRDA1QTZCRjVDQTA5QTFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjlENUVFRDZGNUIxMTFFN0JEMDVBNkJGNUNBMDlBMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjlENUVFRDdGNUIxMTFFN0JEMDVBNkJGNUNBMDlBMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LB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) center no-repeat;
                                        animation: starShow 0.35s forwards;
                                        z-index: -1;
                                    }
                                    .jiangli {
                                        position: absolute;
                                        z-index: 1;
                                        top: 50%;
                                        left: 50%;
                                        transform: translate(-50%,-50%);
                                        transition: all 0.3s;
                                        color: #C0C4CC;
                                        width: 100%;
                                        text-align: center;
                                        &.active {
                                            color: var(--orangeLight);
                                            top: -10px;
                                        }
                                    }
                                }
                                .week {
                                    font-size: 14px;
                                    line-height: 24px;
                                    color: #C0C4CC;
                                    &.active {
                                        color: var(--orangeLight);
                                    }
                                }
                            }
                        }
                        .tasks {
                            .tasks-item {
                                img {
                                    width: 48px;
                                    height: 48px;
                                }
                                .left-box {
                                    padding: 5px 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    @keyframes starShow {
        0% {
            opacity: 1;
            display: none;
        }
        100% {
            opacity: 0;
        }
    }
</style>
