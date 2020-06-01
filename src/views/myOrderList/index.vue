<template>
    <div class="main-content myOrderList">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>所有订单 {{total}}
        </div>
        <p v-show="false">{{CountDown}}</p>
        <div style="position: relative;">
            <table class="table table-bordered text-sm" border style="border-collapse:collapse;width: 100%;border: 1px solid #dfe6ec;z-index: 9;position: absolute;width: 894px;top: 0;left: 0;">
                <thead>
                    <tr role="row">
                        <th width='263' class="padding-tb-sm bg-gray">商品信息</th>
                        <th width='96' class="padding-tb-sm bg-gray">单价</th>
                        <th width='78' class="padding-tb-sm bg-gray">加工费</th>
                        <th width='134' class="padding-tb-sm bg-gray">金额</th>
                        <th width='84' class="padding-tb-sm bg-gray">买家</th>
                        <th width='88' class="padding-tb-sm bg-gray">交易状态</th>
                        <th width='113' class="padding-tb-sm bg-gray">操作</th>
                    </tr>   
                </thead>
            </table>
            <div class="scroll" ref="scrollTable">
                <table class="table table-bordered text-sm" border style="border-collapse:collapse;width: 100%;border: 1px solid #dfe6ec;">
                    <thead>
                        <tr role="row">
                            <th width='300' colspan="2" class="padding-tb-sm bg-gray">商品信息</th>
                            <th width='100' class="padding-tb-sm bg-gray">单价</th>
                            <th width='80' class="padding-tb-sm bg-gray">加工费</th>
                            <th width='140' class="padding-tb-sm bg-gray">金额</th>
                            <th width='80' class="padding-tb-sm bg-gray">买家</th>
                            <th width='80' class="padding-tb-sm bg-gray">交易状态</th>
                            <th width='120' class="padding-tb-sm bg-gray">操作</th>
                        </tr>
                    </thead>
                    <tbody v-for='(item,index) in tableData' :key="index" valign='middle'>
                        <tr class="bg-gray">
                            <td class="padding-lr-sm padding-tb-sm" colspan="7">
                                <span class="margin-right">订单编号: {{item.serial}}</span>
                                <span>下单时间：{{item.addTime}}</span> 
                            </td>
                            <td class="padding-lr-sm padding-tb-sm" colspan="1"></td>
                        </tr>
                        <tr v-for='(item1,index1) in item.itemList' :key="index1">
                            <td class="padding-lr-sm"><img :src="item1.imgUrl" style="width: 100px;padding: 10px;vertical-align: middle;" /></td>
                            <td class="padding-lr-sm">
                                <div class="margin-bottom-sm">商品名称：{{item1.goodsName}}</div>
                                <div class="margin-bottom-sm">规格：{{item1.gram.toFixed(2)}}克</div>
                                <div>数量：{{item1.num}}件</div>
                            </td>
                            <td class="padding-lr-sm text-center text-price">{{item1.goodsPrice.toFixed(2)}}</td>
                            <td class="padding-lr-sm text-center text-price">{{item1.itemProcessCost==''||item1.itemProcessCost==null?'0.00':item1.itemProcessCost.toFixed(2)}}</td>
                            <td class="padding-lr-sm" :rowspan="item.itemList.length" v-if="item.itemList && index1==0">
                                <div class="text-price text-center">{{item.amount.toFixed(2)}}</div>
                                <div class="text-center">（不含运费{{item.expressFee.toFixed(2)}}）</div>
                            </td>
                            <td class="padding-lr-sm" :rowspan="item.itemList.length" v-if="item.itemList && index1==0">{{item.userName | changePhone(item.userName)}}</td>
                            <td class="padding-lr-sm" :rowspan="item.itemList.length" v-if="item.itemList && index1==0">
                                <!-- 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成 -->
                                <div v-if="item.status==1">
                                    <el-tag type="danger">待付款</el-tag>
                                </div>
                                <div v-if="item.status==2">
                                    <el-tag type="info">订单关闭</el-tag>
                                </div>
                                <div v-if="item.status==3">
                                    <el-tag>待发货</el-tag>
                                </div>
                                <div v-if="item.status==4">
                                    <el-tag type="warning">待收货</el-tag>
                                </div>
                                <div v-if="item.status==5">
                                    <el-tag type="success">已完成</el-tag>
                                </div>
                            </td>
                            <td class="padding-lr-sm" :rowspan="item.itemList.length" v-if="item.itemList && index1==0">
                                <div class="text-center">
                                    <el-link @click="goOrderResult(item.serial)" class="margin-bottom-sm">查看</el-link>
                                </div>
                                <div v-if="item.status==1" class="margin-bottom-sm text-center">
                                    <div class="text-sm margin-bottom-sm">{{Djs_timeList(item.expireTime)}}</div>
                                    <el-button type="primary" size="mini" @click="pay(item.serial)">立即支付</el-button>
                                </div>
                                <div v-if="item.status==2" class="margin-bottom-sm text-center">
                                    <!-- <el-button type="danger" size="mini">删除</el-button> -->
                                </div>
                                <div v-if="item.status==3" class="margin-bottom-sm text-center">
                                    <!-- <el-link class="margin-bottom-sm">索要发票</el-link> -->
                                    <!-- <router-link class="margin-bottom-sm" :to="{path:'/viewInvoice',query: {orderId: item.serial}}">查看发票</router-link> -->
                                    <el-link @click="applyForRefund(item.serial)">申请退款</el-link>
                                </div>
                                <div v-if="item.status==4" class="margin-bottom-sm text-center">
                                    <!-- <el-button type="success" size="mini" class="margin-bottom-sm" @click="confirmReceipt(item.serial)">确认收货</el-button> -->
                                    <!-- <el-link class="margin-bottom-sm">索要发票</el-link> -->
                                    <!-- <router-link :to="{path:'/viewInvoice',query: {orderId: item.serial}}">查看发票</router-link> -->
                                </div>
                                <div v-if="item.status==5" class="margin-bottom-sm text-center">
                                    <!-- <el-button type="danger" size="mini" class="margin-bottom-sm">删除</el-button> -->
                                    <!-- <el-link class="margin-bottom-sm">索要发票</el-link> -->
                                    <!-- <router-link :to="{path:'/viewInvoice',query: {orderId: item.serial}}">查看发票</router-link> -->
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        <!-- 确认收货 -->
        <el-dialog title="确认收货" :visible.sync="dialogConfirmReceiptVisible" width="40%">
            <span>如需退货退款，请电话联系客服（TEL：0571-56387125）</span>
            <div>
                <div class="text-center text-price">81.00</div>
                <div class="text-center">[包邮/不包邮]商品名称xxxx</div>
                <div>
                    <el-input v-model="confirmReceiptCode" placeholder="输入短信验证码"></el-input>
                    <el-button>获取验证码</el-button>
                </div>
                <div>若不确认收货，平台将根据真实物流信息自动更新订单状态</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogConfirmReceiptVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogConfirmReceiptVisible = false">确认</el-button>
            </span>
        </el-dialog>
        <!-- 申请退款 -->
        <el-dialog title="申请售后/申请退款" :visible.sync="dialogApplyForRefundVisible" width="30%">
            <span>如需退货退款，请电话联系客服（TEL：0571-56387125）</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogApplyForRefundVisible = false">知道了</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    export default {
        name: 'myOrderList',
        components: {
        },
        data() {
            return {
                CountDown:"",//辅助倒计时用于刷新
                PayTimeInterval: null,
                tableIndex: 0,
                tableData: [], // 表格数据
                currentPage: 1,
                pageSize: 10,
                total: 0,
                dialogConfirmReceiptVisible: false, // 确认收货弹窗
                confirmReceiptCode: '', // 确认收货弹窗验证码
                dialogApplyForRefundVisible: false // 申请售后/申请退款弹窗
            }
        },
        watch: {

        },
        created() {
        },
        mounted() {
            this.getOrderList(this.currentPage, this.pageSize);
        },
        methods: {
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
                    pageSize: pageSize
                }
                let data = await this.$api.getOrderList(params,getCookie('accessToken'));
                this.tableData = await data.dataList;
                this.total = data.page.total;
                this.Djs_time();//辅助列表倒计
                setTimeout(this.Djs_timeList, 1000);//倒计时列表，多个
            },
            Djs_time() {
                setInterval(()=> {
                    var presentTime=new Date().getTime();
                    this.CountDown=presentTime
                }, 1000);
            },
            Djs_timeList(itemEnd) {
                var endItem = new Date(itemEnd).getTime();//获取列表传的截止时间
                var nowItem = new Date().getTime();//获取当前时间
                var rightTime = endItem - nowItem;//截止时间减去当前时间
                if (rightTime > 0) {//判断剩余倒计时时间如果大于0就执行倒计时否则就结束
                    var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
                    var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
                    var mm = Math.floor((rightTime / 1000 / 60) % 60);
                    var ss = Math.floor((rightTime / 1000) % 60);
                    var showTime = dd + "天" + hh + "时" + mm + "分" + ss + "秒";
                }else{
                    var showTime = "订单支付过期";
                }
                return showTime;
            },
            // 每页多少条操作
            handleSizeChange(val) {
                this.pageSize = val;
                this.getOrderList(this.currentPage, this.pageSize);
                
            },
            // 分页操作
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getOrderList(this.currentPage, this.pageSize);
                this.$nextTick(() => {
                    this.$refs.scrollTable.scrollTo(0,0)
                })
            },
            // 去订单详情
            goOrderResult(orderId) {
                this.$router.push({ path: '/orderDetail', query: {orderId: orderId}})
            },
            // 立即支付
            async pay(orderId) {
                await this.getOrderStatus(orderId);
            },
            // 获取订单状态
            async getOrderStatus(orderId) {
                let _this = this;
                let param = {
                    orderId: orderId
                }
                let statusData = await _this.$api.getOrderDetail_queryOrderStatus(param,getCookie('accessToken'));
                if(statusData.status!='1') {
                    _this.$message.error('订单状态已变更，请再次操作');
                    _this.getOrderList(_this.currentPage, _this.pageSize);
                    return false;
                }
                let data = await _this.$api.repay(param,getCookie('accessToken'));
                window.open(data.payData);
                _this.$confirm('将前往订单详情页', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    showClose: false,
                    type: 'info',
                    center: true,
                    closeOnClickModal: false,
                }).then(() => {
                    _this.$router.push({path: '/orderDetail', query: {orderId: orderId}});
                });
            },
            // 确认收货
            confirmReceipt(orderId) {
                this.dialogConfirmReceiptVisible = true;
            },
            // 申请退款
            applyForRefund(orderId) {
                this.dialogApplyForRefundVisible = true;
            }
        },
        beforeDestroy() {
            clearInterval()
        }
    }

</script>

<style lang="scss" scoped>
    .title{
        color: var(--orange);
    }
    .scroll {
        height: 580px;
        overflow-x: auto;
        overflow-y: auto;
        border-bottom: 1px solid rgb(223, 230, 236);
        border-top: 1px solid rgb(223, 230, 236);
        /*修改滚动条样式*/
        &::-webkit-scrollbar{
            width: 4px;
        }
        &::-webkit-scrollbar-track{
            background: rgb(239, 239, 239);
            border-radius:2px;
        }
        &::-webkit-scrollbar-thumb{
            background: #bfbfbf;
            border-radius:10px;
        }
        &::-webkit-scrollbar-thumb:hover{
            background: #333;
        }
    }
    .main-content-top {
        padding: 20px;
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        .left {
            float: left;
            width: 270px;
            font-size: 14px;
            color: #666666;
            .user-name {
                font-size: 18px;
                color: #333333;
                margin: 10px 0 0 0;
            }
            span {
                display: block;
            }
        }
        
    }
    
</style>
