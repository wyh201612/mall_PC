<template>
    <div class="main-content myTracks">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>我的足迹
        </div>
        <div class="info_centent">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="浏览的商品" name="first">
                    <div class="flex flex-row flex-wrap padding-xs">
                        <div class="pointer item flex flex-direction flex-wrap margin-bottom" v-for="(item, index) in traceGoodsList" :key="index" @click="goldShopDetail(item.goodsId)">
                            <div>
                                <img :src="item.goodsImgUrl" alt="" width="200px">
                            </div>
                            <div class="goodsName text-cut text-center margin-tb-sm">{{item.goodsName}}</div>
                            <div class=" text-center"><span class="text-price margin-right-sm">{{item.goodsMinPrice}}</span>-<span class="text-price margin-left-sm">{{item.goodsMaxPrice}}</span></div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="浏览的资讯头条" name="second">浏览的资讯头条</el-tab-pane>
            </el-tabs>
            
            <el-pagination
                style="text-align: center;padding-top: 20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    import { mapState } from 'vuex'
    export default {
        name: 'myTracks',
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
                activeName: 'first',
                traceGoodsList: [],
                currentPage: 1,
                pageSize: 9,
                total: 0,
                display: false
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
            this.getRecommendTraceGoodsList(this.currentPage, this.pageSize);
        },
        destroyed() {

        },
        methods: {
            async getRecommendTraceGoodsList(pageNum,pageSize) {
                let params = {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
                let data = await this.$api.getRecommendTraceGoodsList(params,getCookie('accessToken'));
                this.traceGoodsList = await data.dataList;
                this.total = data.page.total;
            },
            // 每页多少条操作
            handleSizeChange(val) {
                this.pageSize = val;
                this.getRecommendTraceGoodsList(this.currentPage, this.pageSize);
            },
            // 分页操作
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRecommendTraceGoodsList(this.currentPage, this.pageSize);
            },
            // 去订单详情
            goldShopDetail(goodsId) {
                this.$router.push({ path: '/goldShopDetail', query: {id: goodsId}});
            },
            handleClick(tab, event) {
                console.log(tab.name);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .myTracks{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            .item {
                width: 240px;
                margin-right: 84px;
                padding: 20px;
                transition: all 0.3s;
                .goodsName {
                    width: 100%;
                }
                &:nth-of-type(3n) {
                    margin-right: 0;
                }
                &:hover {
                    box-shadow: 0px 0 11px rgba(0,0,0,0.08);
                }
            }
        }
    }
</style>
