<template>
    <div class="app-wrapper">
        <el-container :direction='"vertical"'>
            <el-header :height='"auto"' class="el-headers">
                <div class="header" ref="topheader">
                    <div class="head_top">
                        <div class="main_head inghong-container">
                            <div class="main_head_title">
                                <div class="main_head_title_left fl">
                                    <span><i class="el-icon-phone"></i> 客服电话：0571-56387125 （9：00-17：00）</span>
                                    <span class="top-icon wx">
                                        <div class="wx-qrcode">
                                            <img src="../assets/images/footer_erweima_image.png">
                                        </div>
                                    </span>
                                    <!-- <span class="top-icon wb">
                                        <div class="wb-qrcode">
                                            <img src="../assets/images/qq-qrcode.png">
                                        </div>
                                    </span> -->
                                </div>
                                <div class="title_head_login">
                                    <span class="hello">
                                        <span>您好，</span>
                                        <i class="text-orangeDark" v-if="accessToken=='' || accessToken==null || accessToken==undefined" @click="login" style='cursor: pointer;'>请登陆/注册</i>
                                        <el-tooltip placement="bottom" effect="light" v-else-if="loginName" style="padding: 0;border: 0;">
                                            <div slot="content">
                                                <div class="flex flex-direction text-darkGray">
                                                    <div class="flex flex-row padding-bottom-sm">
                                                        <div class="flex flex-direction align-center padding-lr">
                                                            <span class="padding-bottom-xs">{{goldenBeansInfo.usableBean}}</span>
                                                            <span>金豆</span>
                                                        </div>
                                                        <div class="flex flex-direction align-center padding-lr">
                                                            <span class="padding-bottom-xs" v-if="activityCouponMemberList.usablenessCoupons">{{activityCouponMemberList.usablenessCoupons.length}}</span>
                                                            <span>优惠券</span>
                                                        </div>
                                                        <div class="flex flex-direction align-center padding-lr">
                                                            <span class="padding-bottom-xs">{{payOffTotal}}</span>
                                                            <span>待付款</span>
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-direction align-center padding-top-sm pointer" style="border-top: 1px solid var(--gray);color: var(--orangeDark);" @click="outLogin">退出</div>
                                                </div>
                                            </div>
                                            <el-button class="text-orangeDark text-sm">{{loginName | changePhone(loginName)}}</el-button>
                                        </el-tooltip>
                                    </span>
                                    <router-link :to="'/myAccount/myOrderList'" class="mayOrder text-orangeDark">我的订单</router-link>
                                    <router-link :to="'/cart'" class="cart"><el-badge :value="goodsTotal"><i class="el-icon-shopping-cart-2"></i> 购物袋</el-badge></router-link>
                                    <router-link :to="'/noticeList'" class="noticeList"><el-badge :is-dot='showDot'><i class="el-icon-bell"></i></el-badge></router-link>
                                    <el-divider direction="vertical"></el-divider>
                                    <router-link :to="'/downloadApp'">
                                        <span class="app_phone_icon">
                                            <svg-icon icon-class="phone"></svg-icon>
                                            <span class="margin-left-xs">应弘黄金APP</span>
                                            <div class="app_qrcode"></div>
                                        </span>
                                    </router-link>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="header_tab">
                        <section class="main_box inghong-container">
                            <div class="logo fl" @click="toIndex" v-if="pcLogo">
                                <div v-if="pcLogo[0]">
                                    <img :src="pcLogo[0].imgUrl" alt="">
                                </div>
                            </div>
                            <ul class="page_menu fr">
                                <li>
                                    <router-link :to="'/index'" :class="{'activeTitle':pathUrl=='/index'}">首页</router-link>
                                    <span class="active" v-if="pathUrl=='/index'"></span>
                                </li>
                                <li>
                                    <router-link :to="'/goldShop'" :class="{'activeTitle':pathUrl=='/goldShop'}">黄金商城</router-link>
                                    <span class="active" v-if="pathUrl=='/goldShop'"></span>
                                </li>
                                <li>
                                    <router-link :to="'/aboutUs'" :class="{'activeTitle':pathUrl=='/aboutUs'}">品牌故事</router-link>
                                    <span class="active" v-if="pathUrl=='/aboutUs'"></span>
                                </li>
                                <li>
                                    <router-link :to="'/myAccount/accountIinfo'" :class="{'activeTitle':match('myAccount')}">我的账户</router-link>
                                    <span class="active" v-if="match('myAccount')"></span>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </el-header>
            <el-main class="el-mains">
                <div class="main-container">
                    <app-main :homeBanner='homeBanner' :loginBackground='loginBackground' :homeMiddleBanner='homeMiddleBanner' :goodsListBanner='goodsListBanner' :pcLogo='pcLogo' :brandTopBanner='brandTopBanner' :serviceTopBanner='serviceTopBanner' :goodsDetailsBanner='goodsDetailsBanner' :headerHeight='headerHeight' :goodsTotal='goodsTotal' :payOffTotal='payOffTotal' :goldenBeansInfo='goldenBeansInfo' :activityCouponMemberList='activityCouponMemberList'/>
                </div>
            </el-main>
            <el-footer :height='"auto"' class="el-footers">
                <footer class="footer">
                    <div class="footer_content clearfix inghong-container">
                        <div class="flex flex-row text-df padding-bottom-xl">
                            <div class="flex flex-row flex-sub justify-between" style="margin-right: 140px;">
                                <div class="item text-white">
                                    <div class="h4" style="margin-bottom: 36px;">杭州应弘科技有限公司</div>
                                    <router-link :to="'/aboutUs'">
                                        <div class="h4">品牌故事</div>
                                    </router-link>
                                </div>
                                <div class="item text-white">
                                    <div class="h4 margin-bottom">产品服务</div>
                                    <router-link :to="'/index'">
                                        <div class="h4 margin-bottom-xs margin-right">O2O商城</div>
                                    </router-link>
                                    <router-link :to="'/serviceCentre'">
                                        <div class="h4 margin-bottom-xs margin-right">服务中心</div>
                                    </router-link>
                                </div>
                                <div class="item text-white">
                                    <div class="h4 margin-bottom">商业合作</div>
                                    <div class="flex flex-row">
                                        <div>
                                            <router-link :to="'/serviceCentre'">
                                                <div class="h4 margin-bottom-xs margin-right">品牌合作</div>
                                            </router-link>
                                            <router-link :to="'/serviceCentre'">
                                                <div class="h4 margin-bottom-xs margin-right">商务合作</div>
                                            </router-link>
                                        </div>
                                        <div>
                                            <router-link :to="'/serviceCentre'">
                                                <div class="h4 margin-bottom-xs margin-right">媒体合作</div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-direction footer_right text-white" style="width: 395px;">
                                <div class="flex flex-row">
                                    <div class="footer_right-ms margin-right">
                                        <div class="h5 margin-bottom">客服电话：0571-56387125</div>
                                        <div class="h5 margin-bottom">在线邮箱：hzyinghongcs@163.com</div>
                                        <div class="h5 margin-bottom-xs">客服时间：周一到周日 9:00-22:00 欢迎致电</div>
                                    </div>
                                    <div class="footer_right-ms">
                                        <img src="../assets/images/footer_erweima_image.png" alt="" style="width: 100px;height: 100px;" />
                                    </div>
                                </div>
                                <div>总部地址：浙江省杭州市拱墅区复地壹中心写字楼A幢5楼、6楼</div>
                            </div>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="footer_info">
                        <p class="padding-bottom-lg"> Copyright ©2018 浙江应弘科技有限公司 <a target="_blank" href="http://www.beianbeian.com/beianxinxi/ca098459d9ffd58cb92bfd2f4b570dc6.html">浙ICP备20004545号-1</a></p>
                    </div>
                </footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import Vue from 'vue'
import { userOnline } from '@/api/user'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState,mapMutations } from 'vuex'
import homeBanner from '@/assets/images/banner_image.png'
import loginBackground from '@/assets/images/login_banner_image.png'
import homeMiddleBanner from '@/assets/images/banner_image.png'
import pcLogo from '@/assets/images/top_logo_image.png'
import brandTopBanner from '@/assets/images/banner_image.png'
import serviceTopBanner from '@/assets/images/banner_image.png'
import goodsDetailsBanner from '@/assets/images/banner_image.png'
import goodsListBanner from '@/assets/images/sc_banner_image.png'

export default {
    name: 'Layout',
    data() {
        return {
            homeBanner: [{
                'imgUrl': homeBanner
            }],
            loginBackground: [{
                'imgUrl': loginBackground
            }],
            homeMiddleBanner: [{
                'imgUrl': homeMiddleBanner
            }],
            pcLogo: [{
                'imgUrl': pcLogo
            }],
            brandTopBanner: [{
                'imgUrl': brandTopBanner
            }],
            serviceTopBanner: [{
                'imgUrl': serviceTopBanner
            }],
            goodsDetailsBanner: [{
                'imgUrl': goodsDetailsBanner
            }],
            goodsListBanner: [{
                'imgUrl': goodsListBanner
            }],
            headerHeight: 0,
            pathUrl: this.$route.path,
            newsaccessToken: this.$store.getters.accessToken,
            goodsTotal: null, // 购物车购买件数
            showDot: false, // 头条红点显示
            timer: null,
            eventHub: new Vue(),
            activityCouponMemberList: {}, // 优惠券信息
            payOffTotal: 0, // 待支付条数
            goldenBeansInfo: {} // 金豆信息
        }
    },
    provide() {
        return {
            eventHub: this.eventHub
        };
    },
    filters: {
    },
    components: {
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapState({
            accessToken: state => state.user.accessToken,
            mobile: state => state.user.mobile,
            loginName: state => state.user.loginName,
            mobile: state => state.user.mobile
        }),
        path() {
            return this.$route.path;
        },
        token() {
            return this.$store.getters.accessToken;
        },
    },
    created() {
        // 监听加入购物车
        this.eventHub.$on("addCart", this.getCartGoodsTotal);
        this.eventHub.$on("notice", this.getNoticeList);
    },
    mounted() {
        let _this = this;
        // 首页中部活动区域：index-middle
        // 商品详情底部图：goods-details-button
        // 服务中心顶部图：service-top
        // 登陆页背景图：login-background
        // 首页主banner区：index-banner
        // 品牌顶部图：brand-top
        // pc端网站logo：pc-logo
        _this.getBannersByChannel('pc-logo');
        _this.getBannersByChannel('login-background');
        _this.getBannersByChannel('index-banner');
        _this.getBannersByChannel('index-middle');
        _this.getBannersByChannel('goods-details-button');
        _this.getBannersByChannel('service-top');
        _this.getBannersByChannel('brand-top');
        _this.getBannersByChannel('goods_list');
        _this.getCurrentGoldPrice();
        _this.getNoticeList();
        if(_this.newsaccessToken && _this.newsaccessToken !='' && _this.newsaccessToken != 'null' && _this.newsaccessToken != 'undefined') {
            _this.getCartGoodsTotal();
            _this.getActivityCouponMemberList();
            _this.getOrderList(1, 10);
            _this.getUserGoldenBeans();
        }
        _this.timer = setInterval(function(){
            _this.getCurrentGoldPrice();
            if(_this.newsaccessToken && _this.newsaccessToken !='' && _this.newsaccessToken != 'null' && _this.newsaccessToken != 'undefined') {
                _this.online(_this.newsaccessToken);
            }
        },8000)
        // 获取头部高度
        _this.headerHeight = _this.$refs.topheader.offsetHeight;
    },
    watch: {
        path(val){
            this.pathUrl = val;
            if(this.newsaccessToken && this.newsaccessToken!='' && this.newsaccessToken != 'null' && this.newsaccessToken != 'undefined') {
                this.getCartGoodsTotal();
                this.getActivityCouponMemberList();
                this.getOrderList(1, 10);
                this.getUserGoldenBeans();
            }
        },
        token(val){
            this.newsaccessToken = val;
            if(this.newsaccessToken && this.newsaccessToken!='' && this.newsaccessToken != 'null' && this.newsaccessToken != 'undefined') {
                this.online(val);
            }
        },
    },
    methods: {
        ...mapMutations({
            SET_GOLDPRICE: 'user/SET_GOLDPRICE'
        }),
        async getCurrentGoldPrice() {
            let goldPrice = await this.$api.getCurrentGoldPrice('');
            this.SET_GOLDPRICE(goldPrice)
        },
        match(obj) {
            if (this.$route.path.indexOf(obj) != "-1") {
                return true;
            } else {
                return false;
            }
        },
        // 获取各个部位的banner
        async getBannersByChannel(position) {
            let data = await this.$api.getBannersByChannel('',position);
            if(position=='index-banner') {
                this.homeBanner = data;
            }
            if(position=='login-background') {
                this.loginBackground = data;
            }
            if(position=='pc-logo') {
                this.pcLogo = data;
            }
            if(position=='brand-top') {
                this.brandTopBanner = data;
            }
            if(position=='service-top') {
                this.serviceTopBanner = data;
            }
            if(position=='index-middle') {
                this.homeMiddleBanner = data;
            }
            if(position=='goods-details-button') {
                this.goodsDetailsBanner = data;
            }
            if(position=='goods_list') {
                this.goodsListBanner = data;
            }
        },
        // 登出
        outLogin() {
            this.$store.dispatch('user/logout').then(() => {
                this.$message({
                    message: '登出成功！',
                    type: 'success'
                });
                location.reload() // 为了重新实例化vue-router对象 避免bug
            }).catch(() => {
            })
        },
        toIndex() {
            this.$router.push({ path: '/index' })
        },
        login() {
            this.$router.push({ path: '/login' ,query: {url:location.hostname}})
        },
        online(accessToken) {
            let _this = this;
            let params = {
                accessToken: accessToken
            }
            userOnline(_this.$qs.stringify(params)).then(res => {
                if(res.code==200) {
                    if(!_this.loginName) {
                        _this.$store.commit('user/SET_NAME', res.data.loginName);
                        setCookie('loginName',res.data.loginName);
                    }
                } else {
                    setCookie('userId','')
                    setCookie('accessToken','')
                    setCookie('loginName','')
                    if(getCookie('rememberAccount') != '1') {
                        setCookie('mobile', '');
                    }
                    _this.$router.push({ path: '/login' ,query: {url:location.hostname}})
                }
            })
        },
        /* 获取购物车数量 */
        async getCartGoodsTotal(){
            // let data = await this.$api.cartList('',getCookie('accessToken'));
            // this.goodsTotal = Number(data.length);
            let data = await this.$api.getCartGoodsTotal('',getCookie('accessToken'));
            this.goodsTotal = Number(data.goodsTotal);
        },
        /* 获取公告并判断是否已读，若所以的status==2已读，那么头部标记隐藏，否则显示 */
        async getNoticeList() {
            let noticeList = await this.$api.getNoticeList('',getCookie('accessToken'));
            let arr = [];
            noticeList.map((item) => {
                if(item.status==1) {
                    arr.push(item.status);
                }
            })
            if(arr.length!=0) {
                this.showDot = true;
            } else {
                this.showDot = false;
            }
        },
        /**
         * 个人中心优惠券列表
         * method： GET
         * 接口地址：  activity/coupon/member/list
         * type int 是  类型：0-黄金红包；1-回租福利券；2-商城满减券
         */
        async getActivityCouponMemberList() {
            let params = {
                type: 2
            }
            this.activityCouponMemberList = await this.$api.getActivityCouponMemberList(params,getCookie('accessToken'));
        },
        /**
         * 接口名称： orderSearch
         * 接口用途： 商城订单查询(move)
         * method： GET
         * 接口地址：  all/new/order/search
         * orderType int 否  订单类型 1:商城订单 2:提金订单 3:换金订单
         * status int 否  订单状态 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成
         * pageNum int 否  页数
         * pageSize int 否  pageSize
         */
        async getOrderList(pageNum, pageSize) {
            let _this = this;
            let params = {
                pageNum: pageNum,
                pageSize: pageSize,
                status: 1
            }
            let data = await this.$api.getOrderList(params,getCookie('accessToken'));
            this.payOffTotal = data.page.total;
        },
        /**
         * 获取用户金豆信息
         * memberId String Y 会员ID
         * mobile String Y 手机号
         * name String Y 姓名
         * outgoBean Integer Y 支出金豆
         * usableBean Integer Y 可用金豆
         * incomeBean Integer Y 收入金豆总数
         * outgoGram double Y 支出金豆预计获得黄金克最
         * incomeGram double Y 收入金豆预计获得黄金克重
         * addTime String Y 账户创建时间
         */
        async getUserGoldenBeans() {
            this.goldenBeansInfo = await this.$api.getUserGoldenBeans('',getCookie('accessToken'));
        },
    },
    distroyed: function() {
        this.eventHub.$off('addCart');
        this.eventHub.$off('totalBuyNum');
    }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
    }
    .header {
        width: 100%;
        top: 0;
        position: relative;
        z-index: 1000;
        .head_top {
            width: 100%;
            height: 35px;
            background-color: var(--white);
            position: relative;
            top: 0;
            left: 0;
            margin: 0 auto;
            border-bottom: 1px dashed #eeeeee;
            .main_head {
                height: 34px;
                line-height: 34px;
                .main_head_title {
                    width: 100%;
                    line-height: 34px;
                    height: 34px;
                    font-size: 12px;
                    span {
                        color: var(--gray);
                    }
                    .mayOrder {
                        margin: 0 0 0 20px;
                        &:hover {
                            color: var(--orangeDark);
                        }
                    }
                    .noticeList {
                        margin: 0 0 0 20px;
                        i {
                            color: var(--gray);
                            font-size: 20px;
                            vertical-align: middle;
                        }
                        .el-badge__content.is-fixed.is-dot {
                            top: 10px;
                        }
                        &:hover i{
                            color: var(--orangeDark);
                        }
                    }
                    .cart {
                        color: var(--orangeDark);
                        margin: 0 0 0 20px;
                    }
                    .top-icon {
                        height: 18px;
                        background: url(../assets/images/footer_erweima_image.png) no-repeat;
                        cursor: pointer;
                        position: relative;
                    }
                    .wx {
                        width: 22px;
                        background-position: 0 -24px;
                        background: url(../assets/images/top_weixin_icon.png) no-repeat;
                        background-size: 100% 100%;
                        margin-left: 10px;
                        display: inline-block;
                        vertical-align: middle;
                        &:hover {
                            background: url('../assets/images/top_gl_weixin_image.png') no-repeat;
                        }
                        &:hover .wx-qrcode {
                            display: block;
                        }
                        .wx-qrcode {
                            position: absolute;
                            width: 140px;
                            height: 140px;
                            left: -50px;
                            top: 160%;
                            border: 1px #ededed solid;
                            display: none;
                            background: var(--white);
                            z-index: 999;
                            img {
                                width: 120px;
                                height: 120px;
                                display: block;
                                margin: 10px auto;
                            }
                        }
                    }
                    .wb {
                        width: 16px;
                        background: url('../assets/images/top_qq_icon.png') no-repeat;
                        background-size: 100% 100%;
                        margin-left: 10px;
                        display: inline-block;
                        vertical-align: middle;
                        &:hover {
                            background: url('../assets/images/top_gl_qq_image.png') no-repeat;
                        }
                        &:hover .wb-qrcode {
                            display: block;
                        }
                        .wb-qrcode {
                            position: absolute;
                            width: 140px;
                            height: 140px;
                            left: -50px;
                            top: 160%;
                            border: 1px #ededed solid;
                            display: none;
                            background: var(--white);
                            z-index: 999;
                            img {
                                width: 120px;
                                height: 120px;
                                display: block;
                                margin: 10px auto;
                            }
                        }
                    }
                    .title_head_login {
                        height: 34px;
                        float: right;
                        .login-once {
                            cursor: pointer;
                            margin: 0 0 0 18px;
                            color: var(--blue);
                            font-size: 12px;
                            text-align: center;
                        }
                        .app_phone_icon {
                            position: relative;
                            top: 0;
                            &:hover {
                                color: var(--orangeDark);
                            }
                            &:hover span{
                                color: var(--orangeDark);
                            }
                            &:hover .app_qrcode {
                                display: block;
                            }
                            img {
                                display: inline-block;
                                width: 7px;
                                height: 10px;
                                margin-right: 6px;
                            }
                            .app_qrcode {
                                position: absolute;
                                width: 140px;
                                height: 140px;
                                left: -50px;
                                top: 120%;
                                border: 1px #ededed solid;
                                display: none;
                                background: var(--white);
                                z-index: 999;
                                background-position: 0 -24px;
                                background: url(../assets/images/apperweima.png) no-repeat;
                                background-size: 100% 100%;
                                margin-left: 10px;
                                
                            }
                        }
                    }
                }
            }
        }
        .header_tab {
            background-color: var(--white);
            box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
            .main_box {
                line-height: 100px;
                height: 100px;
                position: relative;
                .logo {
                    img{
                        position: absolute;
                        top: 50%;
                        left: 0;
                        height: 61px;
                        margin-top: -30px;
                        cursor: pointer;
                    }
                }
                .page_menu {
                    height: 100px;
                    line-height: 100px;
                    font-size: 16px;
                    li {
                        display: inline-block;
                        margin-left: 45px;
                        position: relative;
                        a.activeTitle {
                            color: var(--orangeDark);
                        }
                        a {
                            color: var(--blackDark);
                            &:hover {
                                color: var(--orangeDark);
                            }
                        }
                        .active {
                            position: absolute;
                            bottom: 25px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 20px;
                            height: 2px;
                            background-color: var(--orangeDark);
                        }
                    }
                }
            }
        }
    }
    .footer {
        min-width: 1200px;
        background-color: #474d56;
        padding: 30px 0 10px 0;
        .footer_content {
        }
        .footer_info {
            line-height: 20px;
            font-size: 14px;
            color: var(--white);
            text-align: center;
            margin-top: 30px;
        }
    }
</style>
