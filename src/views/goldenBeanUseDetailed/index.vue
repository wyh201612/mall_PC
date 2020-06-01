<template>
    <div class="main-content goldenBeanUseDetailed">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider><span class="pointer" @click="goBlack()">返回</span><i class="el-icon-arrow-right"></i> 金豆使用明细
        </div>
        <div class="info_centent">
            <div class="info_centent_top margin-bottom-lg">
                <div class="info_centent_top_center flex flex-row">
                    <div class="msg text-center padding-lr">
                        <div class="margin-bottom-sm">{{goldenBeansInfo.incomeBean}}个</div>
                        <div>累计获得</div>
                    </div>
                    <div class="msg text-center padding-lr">
                        <div class="margin-bottom-sm">{{goldenBeansInfo.usableBean}}个</div>
                        <div>剩余可用</div>
                    </div>
                </div>
            </div>
            <div class="useDetailed">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="详细">
                        <template slot-scope="scope">
                            <div class="text-bold">{{scope.row.remark}}</div>
                            <div>{{scope.row.addTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="收支">
                        <template slot-scope="scope">
                            <div :class="scope.row.type==1?'text-red':'text-darkGray'">{{scope.row.type==1?'+'+scope.row.goldBean:'-'+scope.row.goldBean}}个</div>
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
        name: 'goldenBeanUseDetailed',
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
            this.getBeansRecords(this.currentPage, this.pageSize);
        },
        destroyed() {

        },
        methods: {
            async getBeansRecords(pageNum,pageSize) {
                let params = {
                    type: 0,
                    pageNum: pageNum,
                    pageSize: pageSize
                }
                let data = await this.$api.getBeansRecords(params,getCookie('accessToken'));
                this.tableData = data.dataList;
                this.total = data.page.total;
            },
            // 每页多少条操作
            handleSizeChange(val) {
                this.pageSize = val;
                this.getBeansRecords(this.currentPage, this.pageSize);
            },
            // 分页操作
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getBeansRecords(this.currentPage, this.pageSize);
            },
            goBlack() {
                this.$router.go(-1);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .goldenBeanUseDetailed{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            .info_centent_top {
                border: 1px solid var(--ghostWhite);
                overflow: hidden;
                padding: 20px 20px;
                .info_centent_top_center {
                    position: relative;
                    .msg {
                        border-right: 1px solid var(--ghostWhite);
                        padding: 20px 130px;
                        &:last-child {
                            border: 0;
                        }
                    }
                }
            }
            .useDetailed {

            }
        }
    }
</style>
