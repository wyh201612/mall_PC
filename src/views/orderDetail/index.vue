<template>
    <div style="overflow: hidden;">
        <div class="orderDetail inghong-container">
            <div style="padding: 20px 10px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/myAccount/myOrderList' }">我的订单</el-breadcrumb-item>
                    <el-breadcrumb-item>订单详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="padding: 20px;">
                <el-card class="box-card">
                    <div class="card-left fl" style="width: 30%;text-align: center;color: #606266;border-right: 1px solid #f0f0f0;">
                        <div class="margin-bottom">订单号: {{orderInfo.serial}}</div>
                        <!-- 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成 -->
                        <div class="margin-bottom">
                            订单状态: <span style="margin-bottom: 10px;" :class="orderInfo.status==1?'danger':orderInfo.status==2?'info':orderInfo.status==3?'warning':orderInfo.status==4?'primary':'success'">{{orderInfo.status==1?'待支付':orderInfo.status==2?'订单关闭':orderInfo.status==3?'待发货':orderInfo.status==4?'待收货':orderInfo.status==5?'已完成':''}}</span>
                        </div>
                        <div class="margin-bottom" v-if="orderInfo.status==1">
                            <div>
                                <i class="el-icon-time"></i> {{lastPayTime}}
                            </div>
                            <el-button type="primary">立即支付</el-button>
                        </div>
                        <div v-if="orderInfo.status==2">
                            <!-- <el-button type="danger">删除</el-button> -->
                        </div>
                        <div v-if="orderInfo.status==3">
                            <!-- <div class="margin-top-sm">索要发票</div>
                            <div class="margin-top-sm">
                                <router-link :to="{path:'/viewInvoice',query: {orderId: orderId}}">查看发票详情</router-link>
                            </div> -->
                        </div>
                        <div v-if="orderInfo.status==4">
                            <el-button type="success">确认收货</el-button>
                            <!-- <div class="margin-top-sm">索要发票</div>
                            <div class="margin-top-sm">
                                <router-link :to="{path:'/viewInvoice',query: {orderId: orderId}}">查看发票详情</router-link>
                            </div> -->
                        </div>
                        <div v-if="orderInfo.status==5">
                            <!-- <el-button type="danger">删除</el-button> -->
                            <!-- <div class="margin-top-sm">索要发票</div>
                            <div class="margin-top-sm">
                                <router-link :to="{path:'/viewInvoice',query: {orderId: orderId}}">查看发票详情</router-link>
                            </div> -->
                        </div>
                    </div>
                    <div class="card-right fl" style="width: 65%;padding-left: 4%;color: #606266;">
                        <!-- 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成 -->
                        <el-steps v-if="orderInfo.status" :active="orderInfo.status==1?Number(1):orderInfo.status==3?Number(2):orderInfo.status==4?Number(3):orderInfo.status==5?Number(5):-1" finish-status="success">
                            <el-step title="提交订单" :description="orderInfo.addTime"></el-step>
                            <el-step title="付款成功" :description="orderInfo.payTime"></el-step>
                            <el-step title="配送发货" :description="orderInfo.sendTime"></el-step>
                            <el-step title="确认收货" description=""></el-step>
                            <el-step title="完成" description=""></el-step>
                        </el-steps>
                    </div>
                </el-card>
            </div>
            <div style="padding: 20px;">
                <el-card class="box-card">
                    <div class="card-left fl" style="width: 50%;color: #606266;">
                        <div class="margin-bottom-sm">
                            <span style="margin-right: 80px;">收货人：{{orderInfo.fullName}}</span>
                            <span>联系电话：{{orderInfo.telephone}}</span>
                        </div>
                        <div class="margin-bottom-sm">所在地区：{{valueProvinceCityOrigin}}</div>
                        <div class="margin-bottom-sm">收货地址：{{orderInfo.address}}</div>
                    </div>
                    <div class="card-right padding-lr-xl fl" style="width: 25%;color: #606266;border-left: 1px solid #f0f0f0;">
                        <div class="margin-bottom text-bold">配送信息</div>
                        <div class="margin-bottom-sm">配送方式： 快递运输</div>
                        <div class="margin-bottom-sm">运费：{{totalFreight>0?'￥'+totalFreight+'（不含）':'免运费'}}</div>
                        <div class="margin-bottom-sm">运单号：xxxxxx</div>
                        <div class="margin-bottom-sm">承运人：xxxx</div>
                        <div class="margin-bottom-sm">承运人联系：xxxxx</div>
                        <div class="margin-bottom-sm">发货时间：{{orderInfo.sendTime}}</div>
                    </div>
                    <div class="card-right padding-lr-xl fl" style="width: 25%;color: #606266;border-left: 1px solid #f0f0f0;">
                        <div class="margin-bottom text-bold">付款信息</div>
                        <div class="margin-bottom-sm">支付方式： 在线支付</div>
                        <div class="margin-bottom-sm">商品总额：￥{{totalGoodsMoney}}</div>
                        <div class="margin-bottom-sm">应支付金额：￥{{amountPayable}}</div>
                        <div class="margin-bottom-sm">交易号：xxxxxxx</div>
                        <div class="margin-bottom-sm">成交时间： {{orderInfo.payTime}}</div>
                    </div>
                </el-card>
            </div>
            <div style="padding: 20px;">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column label="商品" width="360">
                        <template slot-scope="scope">
                            <div style="overflow: hidden;">
                                <div class="fl">
                                    <img :src="scope.row.imgUrl" alt="" style="width: 50px;">
                                </div>
                                <div class="fl" style="width: calc(100% - 60px);font-size: 12px;margin-left: 10px;">
                                    <div>商品名称：{{scope.row.goodsName}}</div>
                                    <div>克重：{{scope.row.gram.toFixed(2)}} 克</div>
                                    <div>数量：x{{scope.row.num}} 件</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.goodsPrice.toFixed(2)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="加工费">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.itemProcessCost==''||scope.row.itemProcessCost==null?'0.00':scope.row.itemProcessCost.toFixed(2)}}</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="运费">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.expressFee.toFixed(2)}}</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="总金额">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.price.toFixed(2)}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="text-right padding-lg">
                <div class="margin-bottom">商品总额： <span class="text-price">{{totalGoodsMoney}}</span></div>
                <div class="margin-bottom">加工费： <span class="text-price">{{totalDiscountProcessCost}}</span></div>
                <div class="margin-bottom">运费： <span :class="totalFreight>0?'text-price':''">{{totalFreight>0?totalFreight:'免运费'}}</span></div>
                <div class="margin-bottom">优惠/抵扣： <span class="text-reduce"></span><span class="text-price">{{couponAmount}}</span></div>
                <div>应付金额： <span class="text-price text-bold text-orangeDark ">{{amountPayable}}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCookie, setCookie, removeCookie } from '@/utils/auth'

export default {
    name: 'orderDetail',
    components: {

    },
    data() {
        return {
            orderId: '',
            orderInfo: {},
            tableData: [],
            valueProvinceCityOrigin: '', // 所在地区
            totalGoodsMoney: '', // 商品总价
            totalDiscountProcessCost: '', // 总加工费
            totalFreight: '', // 总运费
            couponAmount: '', // 优惠/抵扣
            amountPayable: '', // 应付金额
            lastPayTime: '',
            status: ''
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        this.orderId = this.$route.query.orderId;
        this.getOrderStatus()
    },
    methods: {
        // 获取订单状态
        async getOrderStatus() {
            let _this = this;
            let primary = {
                orderId: _this.$route.query.orderId
            }
            let data = await _this.$api.getOrderDetail_queryOrderStatus(primary,getCookie('accessToken'));
            _this.status = data.status;
            _this.getOrderDetail();
        },
        // 获取订单详情
        async getOrderDetail() {
            let _this = this;
            let data = await this.$api.getOrderDetail('',getCookie('accessToken'),this.$route.query.orderId);
            this.orderInfo = data;
            this.tableData = data.itemList;
            let ss = data.address.split('-');
            this.valueProvinceCityOrigin = ss[0]+'-'+ss[1]+'-'+ss[2];
            this.totalGoodsMoney = data.amount.toFixed(2);
            this.totalDiscountProcessCost = data.processCost.toFixed(2);
            this.totalFreight = data.expressFee.toFixed(2);
            this.couponAmount = data.couponAmount.toFixed(2);
            this.amountPayable = data.money.toFixed(2);
            if(data.stopPayTimeSecond==0) { // 支付时间为0就不走下面的倒计时方法；
                return false;
            }
            this.Djs_time();//获取数据后调用单个的倒计时
        },
        Djs_time() {
            setInterval( ()=> {
                var Deadline = new Date(this.orderInfo.expireTime).getTime();
                var presentTime = new Date().getTime();
                var rightTime = Deadline - presentTime;
                if (rightTime > 0) {
                    var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
                    var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
                    var mm = Math.floor((rightTime / 1000 / 60) % 60);
                    var ss = Math.floor((rightTime / 1000) % 60);
                    this.lastPayTime = '订单距结束' + dd + "天" + hh + "时" + mm + "分" + ss + "秒";
                }else{
                    this.lastPayTime = "订单支付时间过期";
                }
            }, 1000);
        },
        // 乘法函数，用来得到精确的乘法结果
        //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        //调用：accMul(arg1,arg2)
        //返回值：arg1乘以arg2的精确结果
        accMul(arg1,arg2) {
            var m=0,s1=arg1.toString(),s2=arg2.toString();
            try{m+=s1.split(".")[1].length}catch(e){}
            try{m+=s2.split(".")[1].length}catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        },
    },
    beforeDestroy() {
        clearInterval()
    }
}
</script>
<style lang="scss">
    .orderDetail {
        .el-breadcrumb__inner, .el-breadcrumb__inner a {
            font-size: 16px;
        }
        .el-breadcrumb__inner.is-link:hover, .el-breadcrumb__inner a:hover {
            color: var(--orangeLight);
        }
        .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
            color: var(--darkGray);
        }
    }
</style>
<style lang="scss" scoped>
    .content {
        position: relative;
        top: 95px;
        background-color: #f7f7f7;
        padding-top: 40px;
    }

    .orderDetail {
        margin-bottom: 40px;
        margin-top: 40px;
        background-color: var(--white);
    }

    .el-card__body {
        overflow: hidden;
    }

    .success {
        color: #67C23A;
    }

    .warning  {
        color: #E6A23C;
    }

    .danger {
        color: #F56C6C;
    }

    .info {
        color: #909399;
    }

    .primary {
        color: #409EFF;
    }
</style>