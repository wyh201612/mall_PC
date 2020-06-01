<template>
    <div class="dashboard-container">
        <!-- <div class="header_tab" ref="header_tab">
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
        </div> -->
        <div class="banner-box" ref="banner">
            <!-- <IphoneSwiper v-if="homeBanner.length!=0" :imgUrl='homeBanner'/> -->
            <!-- <SlowTransitionSwiper v-if="homeBanner.length!=0" :imgUrl='homeBanner'/> -->
            <!-- <Scalebanner v-if="homeBanner.length!=0" :imgUrl='homeBanner'/> -->
            <AllSwiper v-if="homeBanner.length!=0" :imgUrl='homeBanner'/>
            <div class="login_box">
                <!-- 未登录 -->
                <div class="login_content" v-if="!accessToken">
                    <div class="font2">实时金价(元/克)</div>
                    <div class="font1">{{goldPrice}}</div>
                    <div class="font3">参考上海黄金交易所金价实时变动</div>
                    <router-link :to="'/login'"><div class="login_button">已有账号？立即登录</div></router-link>
                </div>
                <!-- 已登录 -->
                <div class="login_after" v-if="accessToken">
                    <div class="phone">您好，{{loginName | changePhone(loginName)}}</div>
                    <div class="font2">实时金价(元/克)</div>
                    <div class="font1">{{goldPrice}}</div>
                    <router-link :to="'/myAccount/accountIinfo'"><div class="login_button">个人中心</div></router-link>
                </div>
            </div>
        </div>
        <!-- 公告 -->
        <div ref="gg">
            <div class="flex flex-row align-center justify-between text-df inghong-container">
                <div class="flex flex-row align-center flex-sub" style="width: calc(100% - 80px);">
                    <div class="flex-sub padding-right-xl text-darkGray" style="width: calc(100% - 200px);">
                        <SeamleScroll :noticeList="noticeList"/>
                    </div>
                </div>
                <router-link :to="'/noticeList'">
                    <div class="padding-right-sm text-sm text-darkGray pointer">
                        <span>更多</span> <img src="../../assets/images/right-icon.png" alt="" style="width: 10px;height: 12.5px;vertical-align: text-top;">
                    </div>
                </router-link>
            </div>
        </div>
        <div class="coin inghong-container" ref="coin">
            <div class="first-recommendGoods flex flex-row padding bg-white">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in firstPushList" :key="index">
                        <div class="item padding flex flex-row">
                            <div class='item-left margin-right'>
                                <div class="goods-name text-cut_line_2 text-bold text-xl">{{item.name}}</div>
                                <div class="goods-title text-cut margin-top-sm">{{item.title}}</div>
                                <div class="laber margin-tb-sm">
                                    <span class="margin-right" v-for="(item2,index2) in item.labelList" :key="index2"><el-tag>{{item2.name}}</el-tag></span>
                                </div>
                                <div><span>{{item.minGram.toFixed(2)}}g</span> | <span class="text-price text-orangeDark">{{item.minPrice.toFixed(2)}}起</span></div>
                                <div class="panicBuying text-right">
                                    <router-link :to="{path:'/goldShopDetail',query: {id: item.id}}">
                                        <el-button round type="primary">立即抢购</el-button>
                                    </router-link>
                                </div>
                            </div>
                            <div class='item-right'>
                                <span class="img" :style="'background: url('+item.imgUrl+') center no-repeat;background-size: contain;'"></span>
                            </div>
                            <div v-if="item.recommendTitle!=''" class="recommendTitle text-center text-white bg-orangeDark">{{item.recommendTitle}}</div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!-- <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-black" slot="button-next"></div> -->
                </swiper>
            </div>
            <div class="banner2">
                <el-carousel :interval="5000" arrow="never" height='146px' v-if="homeMiddleBanner.length!=0">
                    <el-carousel-item v-for="(item,index) in homeMiddleBanner" :key="index">
                        <img :src="item.imgUrl" alt="" height="146px">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div> 
        
        <div :class="isFixed?'tabs fixed':'tabs'" ref="tabs" id="tabs">
            <div class="tabs-box flex flex-row align-center justify-center padding-tb inghong-container">
                <div class="corporateName flex flex-row align-center text-orangeDark" :style="isFixed?'height: 40px;':'height: 0;'" v-if="pcLogo!=''">
                    <img :src="pcLogo[0].imgUrl" alt="">
                </div>
                <div class="flex flex-row text-lg">
                    <div :class="activeIndex==''?'pointer type-item text-xlx text-bold active':'pointer type-item text-xlx'" @click="getGoods('')">所有</div>
                    <div :class="activeIndex==item.id?'pointer type-item text-xlx text-bold active':'pointer type-item text-xlx'" v-for="(item, index) in categorySearchList" :key="index" @click="getGoods(item.id)">{{item.name}}</div>
                </div>
            </div>
        </div>
        <aside class="main inghong-container">
            <div class="goods clearfix" :style="isFixed?'margin-top: '+tabsHeight+'px;':''">
                <div class="newGoosList">
                    <router-link v-for="(item, index) in categoryLists.dataList" :key="index" :to="{path:'/goldShopDetail',query: {id: item.id}}" class='goods_info'>
                        <img v-if="item.promotionalLableList" :src="item.promotionalLableList[0].url" alt="" class="cornerMarker">
                        <img :src="item.imgUrl" class="goodsImg" />
                        <div class="text-center text-cut margin-tb">{{item.name}}</div>
                        <div class="text-center margin-bottom-sm"><span class="text-bold">{{item.minGram.toFixed(2)}}g</span> | <span class="text-xl text-price text-bold text-orangeDark">{{item.sellingPrice.toFixed(2)}}</span></div>
                    </router-link>
                </div>
                <div class="loadMoer-btn text-center" v-if="!loadEnd"><el-button type="primary" :loading="isLoading" @click="loadMoer">{{isLoading?'加载中':'加载更多'}}</el-button></div>
                <div class="loadMoer-btn text-center text-gray" v-if="loadEnd">我也是有底线的~</div>
            </div>
            <div class="partners">商业合作</div>
            <ul class="cooperate">
                <li><img src="../../assets/images/main_hezuo_shunfeng_image.png"></li>
                <li><img src="../../assets/images/main_hezuo_zhongguoyinlian_image.png"></li>
                <li><img src="../../assets/images/main_hezuo_aliyun_image.png"></li>
                <li><img src="../../assets/images/main_hezuo_wangyiyun_image.png"></li>
            </ul>
        </aside>
        <div class="fixd">
            <router-link :to="'/myAccount/accountIinfo'">
                <div class="fixd-item">
                    <div class="icon text-xxl" style="border-top: none;"><svg-icon icon-class="vip"></svg-icon></div>
                    <div class="fixd-item-s vip">应弘会员</div>
                </div>
            </router-link>
            <router-link :to="'/cart'">
                <div class="fixd-item">
                    <div class="icon text-xxl"><el-badge :value="goodsTotal"><i class="el-icon-shopping-cart-2"></i></el-badge></div>
                    <div class="fixd-item-s cart">购物袋</div>
                </div>
            </router-link>
            <router-link :to="'/serviceCentre'">
                <div class="fixd-item">
                    <div class="icon text-xxl"><svg-icon icon-class="kefu"></svg-icon></div>
                    <div class="fixd-item-s contactCustomerService">联系客服</div>
                </div>
            </router-link>
            <router-link :to="'/downloadApp'">
                <div class="fixd-item">
                    <div class="icon text-xxl"><svg-icon icon-class="app"></svg-icon></div>
                    <div class="fixd-item-s download_app">
                        <div>去APP上探索你</div>
                        <div>查找的商品和福利</div>
                        <img src="../../assets/images/apperweima.png" alt="">
                    </div>
                </div>
            </router-link>
            <router-link :to="'/serviceCentre'">
                <div class="fixd-item">
                    <div class="icon">反馈</div>
                    <div class="fixd-item-s fankui">反馈</div>
                </div>
            </router-link>
            <!-- 回到顶部 -->
            <el-backtop :bottom="100" :visibility-height='500' class="backtop"></el-backtop>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import SeamleScroll from '@/components/SeamleScroll'
    import SlowTransitionSwiper from '@/components/SlowTransitionSwiper'
    import IphoneSwiper from '@/components/IphoneSwiper'
    import Scalebanner from '@/components/Scalebanner'
    import AllSwiper from '@/components/AllSwiper'

    export default {
        name: 'Home',
        components: {
            SeamleScroll,
            SlowTransitionSwiper,
            IphoneSwiper,
            Scalebanner,
            AllSwiper
        },
        props:{
            homeBanner:{
                type: Array
            },
            homeMiddleBanner:{
                type: Array
            },
            pcLogo:{
                type: Array
            },
            headerHeight:{
                type: Number
            },
            goodsTotal:{
                type: Number
            }
        },
        data() {
            return {
                // pathUrl: this.$route.path,
                swiperOption:{
                    slidesPerView: '2',
                    spaceBetween: 10,
                    loop: false, //循环
                    freeMode : true,
                    freeModeMinimumVelocity : 1,
                    autoplay: false, //自动播放
                    speed: 600, //滑动速度
                    // navigation: { //左右点击
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev',
                    // },
                    pagination: { //分页器设置
                        el: '.swiper-pagination',
                        clickable :true,
                        dynamicBullets: true,
                    }
                },
                offsetHeight: 0,
                tabsHeight: 0,
                isFixed: false,
                firstPushList: [], //首推列表
                activeIndex: '',
                categorySearchList: {}, // 黄金分类
                categoryLists: {}, // 商品列表
                pageNum: 1, // 当前页
                pageSize: 9, // 每页数量
                loadEnd: false, // 加载结束
                noticeList: [], // 公告列表
                isLoading: false
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.user.accessToken,
                mobile: state => state.user.mobile,
                loginName: state => state.user.loginName,
                goldPrice: state => state.user.goldPrice
            }),
        },
        watch: {
            
        },
        created() {
            
        },
        mounted() {
            this.getNoticeList();
            this.getAllRecommendGoods();
            window.addEventListener('scroll', this.scrollHander);
        },
        methods: {
            // match: function (obj) {
            //     if (this.$route.path.indexOf(obj) != "-1") {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // },
            // toIndex() {
            //     this.$router.push({ path: '/index' })
            // },
            //滚动事件
            scrollHander() {
                // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
                this.isFixed = scrollTop > this.offsetHeight ? true : false;
            },
            // 点击分类获取商品
            getGoods(id) {
                this.loadEnd = false;
                this.activeIndex = id;
                this.pageNum = 1;
                this.pageSize = 9;
                this.categoryList(this.pageNum,this.pageSize,id,0);
                // 滚动到指定位置
                document.documentElement.scrollTop = this.offsetHeight + 2;
            },
            // 获取公告
            async getNoticeList() {
                let data = await this.$api.getNoticeList();
                this.noticeList = data;
            },
            // 获取黄金分类
            async categorySearch() {
                this.categorySearchList = await this.$api.categorySearch('');
            },
            /**
             * 获取黄金分类对应的商品
             * pageNum int 否  页数
             * pageSize int 否  行数
             * categoryId 商品类型id
             * type  0: 全部 1:金条 2:金饰,不传查全部
             * 接口地址:  mall/goods/categoryList
             */
            async categoryList(pageNum,pageSize,categoryId,type) {
                let data = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    categoryId: categoryId,
                    type: type
                }
                let list = await this.$api.categoryList(data);
                if(pageNum==1) {
                    this.categoryLists = list;
                } else {
                    list.dataList.map((item) => {
                        this.categoryLists.dataList.push(item);
                    })
                }
                if(this.categoryLists.dataList.length>=list.page.total) {
                    this.loadEnd = true;
                } else {
                    this.loadEnd = false;
                }
            },
            // 点击加载更多
            async loadMoer() {
                this.pageNum +=1;
                this.isLoading = true;
                await this.categoryList(this.pageNum,this.pageSize,this.activeIndex,0);
                this.isLoading = false;
            },
            // 获取所有首推商品
            async getAllRecommendGoods() {
                await this.categoryList(this.pageNum,this.pageSize,'',0);
                this.firstPushList = await this.$api.getAllRecommendGoods('');
                // let data = await this.$api.getAllRecommendGoods('');
                // this.firstPushList = data.slice(0, 2);
                await this.categorySearch();
                this.$nextTick(() => {
                    //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
                    var coinHeight = this.$refs.coin.offsetHeight;
                    var bannerHeight = this.$refs.banner.offsetHeight;
                    var ggHeight = this.$refs.gg.offsetHeight;
                    this.tabsHeight = this.$refs.tabs.offsetHeight;
                    // var header_tab = this.$refs.header_tab.offsetHeight;
                    // this.offsetHeight = this.headerHeight+coinHeight+bannerHeight+ggHeight+header_tab;
                    this.offsetHeight = this.headerHeight+coinHeight+bannerHeight+ggHeight;
                })
            },
        },
        destroyed () {
            window.removeEventListener('scroll', this.scrollHander)
        }
    }
</script>
<style lang="scss">
    .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
        background-color: var(--orangeDark);
    }
</style>
<style lang="scss" scoped>
    .fixed {
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
        z-index: 99;
    }
    // .header_tab {
    //     background-color: var(--white);
    //     box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    //     .main_box {
    //         line-height: 100px;
    //         height: 100px;
    //         position: relative;
    //         .logo {
    //             img{
    //                 position: absolute;
    //                 top: 50%;
    //                 left: 0;
    //                 height: 61px;
    //                 margin-top: -30px;
    //                 cursor: pointer;
    //             }
    //         }
    //         .page_menu {
    //             height: 100px;
    //             line-height: 100px;
    //             font-size: 16px;
    //             li {
    //                 display: inline-block;
    //                 margin-left: 45px;
    //                 position: relative;
    //                 a.activeTitle {
    //                     color: var(--orangeDark);
    //                 }
    //                 a {
    //                     color: var(--blackDark);
    //                     &:hover {
    //                         color: var(--orangeDark);
    //                     }
    //                 }
    //                 .active {
    //                     position: absolute;
    //                     bottom: 25px;
    //                     left: 50%;
    //                     transform: translateX(-50%);
    //                     width: 20px;
    //                     height: 2px;
    //                     background-color: var(--orangeDark);
    //                 }
    //             }
    //         }
    //     }
    // }
    .banner-box {
        position: relative;
    }
    .login_box {
        position: absolute;
        width: 1200px;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 999;
        .login_content,.login_after {
            position: absolute;
            right: 0;
            top: 60px;
            width: 300px;
            background-color: rgba(255,255,255,0.6);
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
            border-radius: 16px;
            z-index: 999;
            text-align: center;
            .font1 {
                margin: 0;
                font-family: PingFangSC-Medium;
                font-size: 32px;
                color: var(--orangeDark);
                line-height: 45px;
                padding: 10px 0 10px 0;
            }
            .font2 {
                margin: 0;
                font-family: PingFangSC-Light;
                font-size: 16px;
                color: var(--black);
            }
            .login_button {
                width: 240px;
                height: 50px;
                background-image: linear-gradient(135deg,
                        #efc590 0%,
                        #bb8d48 100%);
                border-radius: 100px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: var(--white);
                margin: 0 auto;
                line-height: 50px;
                a {
                    color: var(--white);
                }
            }
        }
        .login_content {
            padding: 40px 0;
            .font3 {
                margin: 0;
                font-family: PingFang_Regular;
                font-size: 12px;
                color: var(--darkGray);
                padding: 0 0 10px 0;
            }
        }
        
        .login_after {
            padding: 24px 0 37px 0;
            .phone {
                height: 25px;
                font-family: PingFangSC-Thin;
                font-size: 18px;
                color: var(--black);
            }
            .font2 {
                padding-top: 25px;
            }
        }
    }
    // 悬浮菜单
    .fixd {
        position: fixed;
        background-color: var(--white);
        width: 40px;
        z-index: 5;
        right: 0;
        bottom: 170px;
        box-shadow: 0 0 6px rgba(0,0,0,0.12);
        a {
            height: 100%;
            .fixd-item {
                position: relative;
                font-size: 12px;
                color: var(--orangeDark);
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                &:hover .icon{
                    color: var(--white);
                    background: var(--orangeDark);
                }
                .icon {
                    height: 40px;
                    line-height: 40px;
                    background: var(--white);
                    border-top: 1px solid var(--orangeDark);
                }
                &:hover .vip {
                    left: -60px;
                }
                &:hover .cart {
                    left: -60px;
                }
                &:hover .contactCustomerService {
                    left: -60px;
                }
                &:hover .download_app {
                    width: 130px;
                    height: auto;
                    left: -130px;
                    top: -130px;
                }
                &:hover .fankui {
                    left: -60px;
                }
            }
            .fixd-item-s {
                z-index: -1;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 12px;
                cursor: pointer;
                text-align: center;
                transition: all 0.3s;
            }
            .vip,.cart,.contactCustomerService,.fankui {
                width: 60px;
                height: 41px;
                line-height: 40px;
                color: var(--white);
                background: var(--orangeDark);
            }
            .download_app {
                width: 0;
                height: 60px;
                top: 0;
                padding: 10px;
                color: var(--orangeDark);
                background: var(--white);
                overflow: hidden;
                div {
                    padding: 10px 0;
                }
                img {
                    width: 100px;
                    height: 100px;
                }
            }
            .fankui {
                height: 40px;
            }
        }
        .backtop {
            position: initial;
            width: 40px !important;
            height: 40px !important;
            border-radius: 0;
            box-shadow: none;
            color: var(--orangeDark);
            border-top: 1px solid var(--orangeDark);
        }
    }
    
    .coin {
        background-color: #f7f7f7;
        padding-top: 20px;
        .first-recommendGoods {
            .item {
                border: 1px solid var(--grayLight);
                transition: all 0.3s;
                border-radius: 4px;
                
                .item-left {
                    .panicBuying {
                        margin-top: 50px;
                    }
                }
                .item-right {
                    border: 1px solid #f0f0f0;
                    padding: 10px;
                    .img {
                        display: inline-block;
                        width: 180px;
                        height: 100%;
                    }
                }
                .recommendTitle {
                    width: 70px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 32px;
                    line-height: 32px;
                    font-size: 12px;
                    border-radius: 0 4px 0 16px;
                }
            }
        }
        .banner2 {
            margin-top: 30px;
            padding-bottom: 20px;
            img {
                width: 100%;
                height: 146px;
            }
        }
    }
    .tabs {
        width: 100%;
        transition: all 0.3s;
        .tabs-box {
            transition: all 0.3s;
            position: relative;
            .corporateName {
                transition: all 0.3s;
                position: absolute;
                left: 0;
                margin-right: 60px;
                img {
                    width: 200px;
                    height: 100%;
                }
            }
            .type-item {
                position: relative;
                margin-right: 40px;
                padding-bottom: 10px;
                transition: all 0.3s;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    color: var(--orangeDark);
                    &:after {
                        content: "";
                        position: absolute;
                        left: 50%;
                        right: 0;
                        height: 0;
                        bottom: 0;
                        width: 24px;
                        transform: translateX(-50%);
                        border-bottom: 3px solid var(--orangeDark);
                        border-radius: 2px;
                    }
                }
                &:hover {
                    color: var(--orangeDark);
                    &:after {
                        content: "";
                        position: absolute;
                        left: 50%;
                        right: 0;
                        height: 0;
                        bottom: 0;
                        width: 24px;
                        transform: translateX(-50%);
                        border-bottom: 3px solid var(--orangeDark);
                        border-radius: 2px;
                    }
                }
            }
        }
    }
    .panicBuying, .loadMoer-btn {
        margin-bottom: 40px;
        .el-button {
            color: var(--white);
            background: var(--orangeDark);
            border: 1px solid var(--orangeDark);
            &:hover, &:focus {
                border-color: var(--orangeLight);
                background-color: var(--orangeLight);
            }
        }
    }
    .main {
        background-color: #f7f7f7;
        padding-bottom: 20px;
        .goods {
            overflow: hidden;
            background-color: var(--white);
            .newGoosList {
                overflow: hidden;
                width: 100%;
                padding: 30px;
                float: right;
                .goods_info {
                    position: relative;
                    width: 360px;
                    float: left;
                    background-color: var(--white);
                    border: solid 1px var(--grayLight);
                    font-size: 16px;
                    padding: 20px;
                    border-radius: 8px;
                    box-sizing: border-box;
                    transition: all 0.3s;
                    margin-right: 30px;
                    margin-bottom: 30px;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    &:hover {
                        border: solid 1px var(--white);
                        transform: translate(0, -4px);
                        box-shadow: 0 0 11px var(--orangeLight);
                    }
                    .cornerMarker {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 60px;
                        height: 60px;
                    }
                    .goodsImg {
                        display: block;
                        width: 227px;
                        height: 227px;
                        margin: 0 auto;
                    }
                }
            }
        }
        .partners {
            height: 24px;
            font-size: 18px;
            line-height: 24px;
            color: var(--black);
            margin: 30px 0;
        }
        .cooperate {
            display: flex;
            justify-content: space-between;
            img {
                width: 200px;
                height: 100px;
            }
        }
    }
</style>