<template>
    <div class="main-content goldenBeanExchangeDetailed">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider><span class="pointer" @click="goBlack()">返回</span><i class="el-icon-arrow-right"></i>金豆兑换明细
        </div>
        <div class="info_centent">
            <div class="exchangeDetailed">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="券/奖品" width="350">
                        <template slot-scope="scope">
                            <div class="flex flex-row align-center">
                                <img :src="scope.row.imgUrl" alt="" class="goods">
                                <div class="margin-left">{{scope.row.giftName}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所需金豆">
                        <template slot-scope="scope">
                            <div>{{scope.row.payBeans}}金豆</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <div>{{scope.row.status==1?'兑换成功':'兑换失败'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间">
                        <template slot-scope="scope">
                            <div>{{scope.row.addTime}}</div>
                        </template>
                    </el-table-column>
                </el-table>
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
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'

    export default {
        name: 'goldenBeanExchangeDetailed',
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
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0
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
            this.gifRrecord(this.currentPage, this.pageSize);
        },
        destroyed() {

        },
        methods: {
            goBlack() {
                this.$router.go(-1);
            },
            async gifRrecord(pageNum,pageSize) {
                let params = {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
                let data = await this.$api.gifRrecord(params,getCookie('accessToken'));
                this.tableData = data.dataList;
                this.total = data.page.total;
            },
            // 每页多少条操作
            handleSizeChange(val) {
                this.pageSize = val;
                this.gifRrecord(this.currentPage, this.pageSize);
            },
            // 分页操作
            handleCurrentChange(val) {
                this.currentPage = val;
                this.gifRrecord(this.currentPage, this.pageSize);
            },
        }
    }

</script>

<style lang="scss" scoped>
    .goldenBeanExchangeDetailed{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            .goods {
                width: 80px;
                height: 80px;
            }   
        }
    }
</style>
