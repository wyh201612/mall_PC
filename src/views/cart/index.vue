<template>
    <div class="cart">
        <div v-if="tableData.length!=0">
            <div class="cart-content inghong-container" ref="cartContent">
                <div class="title">
                    <h2>全部商品</h2>
                    <span class="text-xxl text-bold margin-sm">{{tableData.length}}</span>件
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="商品" width="400px">
                        <template slot-scope="scope">
                            <div>
                                <div class="pointer" style="float: left;margin-right: 10px;"><img :src="scope.row.imgUrl" alt="" style="width: 50px;height: 50px;" @click="toGoldShopDetail(scope.row.goodsInfo.id,scope.row.skuId,scope.row.quantity)"></div>
                                <div style="float: left;width: calc(100% - 60px);">
                                    <div>商品名称: {{scope.row.name}}</div>
                                    <div><span style="margin-right: 10px;">品牌: {{scope.row.goodsInfo.brandName}}</span><span>分类: {{scope.row.goodsInfo.categoryName}}</span></div>
                                    <div><span style="margin-right: 10px;">品质: {{scope.row.goodsInfo.quality}}</span><span>克重: {{scope.row.gram.toFixed(2)}}g</span></div>
                                    <div style="margin-top: 6px;"><el-tag size="mini" v-for="(item, index) in scope.row.goodsInfo.labelList" :key="index">{{item.name}}</el-tag></div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.price.toFixed(2)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.quantity" @change="changeNumber(scope.row.id,scope.row)" size="mini" :min="1"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="加工费" width="90px">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.discountProcessCostAAA==''||scope.row.discountProcessCostAAA==null?'0.00':scope.row.discountProcessCostAAA.toFixed(2)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="小计">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.subtotal}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template slot-scope="scope">
                            <el-button type="text" @click="removeOne(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div :class="offsetHeight>640&&fex?'settlement active':'settlement'">
                <div class="settlement-centent">
                    <div class="settlement-box inghong-container">
                        <div class="settlement-box-cenyent flex flex-row align-center justify-between">
                            <div class="jiesuan-left">
                                <el-checkbox v-model="checkedAll" @change="toggleSelectionAll([tableData])" style='margin-right: 10px;'>全选</el-checkbox>
                                <el-button type="text" @click="removeCheckedGoods()">删除选中的商品</el-button>
                                <el-button type="text" @click="clearCart()">清理购物袋</el-button>
                            </div>
                            <div class="jiesuan-right flex flex-row align-center">
                                <div>
                                    <span style="margin-right: 20px;">已选 <span class="totalNumber">{{checkedNumbers}}</span> 件商品</span>
                                    <span>总价：</span>
                                    <span class="total">￥{{checkedPrices}}</span>
                                </div>
                                <div class="settlement-btn fr" @click="settlement">去结算</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 购物车为空 -->
        <div class="no-goods" v-else>
            <img class="img" src="../../assets/images/cart/no-goods.png" alt="">
            <div class="text-gray margin-bottom">购物袋空空如也~</div>
            <el-button @click="goMall">逛一逛</el-button>
        </div>
    </div>
</template>

<script>
import { getCookie, setCookie, removeCookie } from '@/utils/auth'

export default {
    name: 'cart',
    components: {

    },
    inject: ["eventHub"],
    data() {
        return {
            checkedAll: false,
            tableData: [],
            totalBuyNumbers: '', // 商品总共件数
            checkedPrices: 0, // 选中的商品金额
            checkedNumbers: 0, // 选中的商品件数
            multipleSelection: [], // 选中的商品
            multipleSelection2: [], // 选中的商品
            fex: false,
            offsetHeight: '',
            clientHeight: '',
            catH: ''
        }
    },
    computed: {
        
    },
    filters: {
        gram(value) {
            let realVal = '';
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = value.toFixed(3);
            } else {
                realVal = '--';
            }
            return realVal;
        }
    },
    created() {
        
    },
    mounted() {
        this.init();
        window.addEventListener('scroll', this.scrollTop);
    },
    methods: {
        scrollTop(){
            this.$nextTick(()=>{
                this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
                this.catH = this.scroll+this.offsetHeight+135+160;
                if(this.catH<this.clientHeight) {
                    this.fex = true;
                } else {
                    this.fex = false;
                }
            })
        },
        // 初始化
        async init() {
            await this.cartListFn();
            if (this.$refs.multipleTable) {
                this.$refs.multipleTable.clearSelection();
            }
            // 让table表格的复选框默认选中的函数
            this.$nextTick(()=>{
                this.tableData.map((item) => {
                    this.$refs.multipleTable.toggleRowSelection(item,true);
                    this.multipleSelection2 = this.tableData;
                });
            })
        },
        /* 购物车列表 
        * skuId long 是  商品规格ID
        * quantity int 是  加入数量*/
        async cartListFn() {
            let data = await this.$api.cartList('',getCookie('accessToken'));
            data.map((item)=> {
                // 加工费=数量*克重(向上取整)*加工费折扣
                item['discountProcessCostAAA'] = Number(this.accMul(item.quantity,Math.ceil(item.gram)) * Number(item.goodsInfo.discountProcessCost));
                item['discountProcessCost'] = Number(item.goodsInfo.discountProcessCost); // 传到结算页要用到
                // 小计金额=数量*价格+加工费
                item['subtotal'] = Number(this.accMul(item.quantity,item.price) + Number(item.discountProcessCostAAA)).toFixed(2);
                item['labelList'] = item.goodsInfo.labelList;
            })
            this.tableData = data;

            this.multipleSelection2 = this.multipleSelection;

            this.totalBuyNumber();
            this.$nextTick(()=>{
                this.offsetHeight = this.$refs.cartContent.offsetHeight;
                this.clientHeight = document.body.clientHeight;
                this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
                this.catH = this.scroll+this.offsetHeight+135+160;
                if(this.catH<this.clientHeight) {
                    this.fex = true;
                } else {
                    this.fex = false;
                }
            })
        },
        /* 购物车列表数量修改
         * method： POST
         * 接口地址：  mall/shopping/trolley/quantity
         * 输入参数：
         * recordId long 是  购物车记录ID
         * quantity int 是  期望更改后的数量*/
        async cartListQuantity(recordId,quantity,row1) {
            let params = {
                recordId: recordId,
                quantity: quantity
            }
            await this.$api.cartListQuantity(this.$qs.stringify(params),getCookie('accessToken'));
            await this.cartListFn();
            this.tableData.forEach(row => {
                if(this.tableData.length == this.multipleSelection2.length) {
                    this.tableData.map((item) => {
                        this.$refs.multipleTable.toggleRowSelection(item,true);
                    });
                } else {
                    this.multipleSelection2.forEach(row2 => {
                        if (Number(row.id) == Number(row1.id) && Number(row.id) == Number(row2.id)) {
                            this.$refs.multipleTable.toggleRowSelection(row,true);
                        } else {
                            if(Number(row.id) == Number(row2.id)) {
                                this.$refs.multipleTable.toggleRowSelection(row,true);
                            }
                        }
                    })
                    
                }
            });
        },
        /* 购物车列表删除 输入参数：
        * recordId array 是  购物车记录的id的long类型的数组 */
        async removeOne(recordId) {
            let params = {
                recordId: recordId
            }
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecartListFn(params)
            }).catch(() => {
            });
        },
        // 删除选中的商品
        async removeCheckedGoods() {
            let arr = [];
            let recordId = '';
            this.multipleSelection.map((item) => {
                arr.push(item.id)
            })
            recordId = arr.join(',');
            recordId.substring(0, recordId.lastIndexOf(','));
            console.log('删除选中的商品的id：',recordId)
            let params = {
                recordId: recordId
            }
            this.$confirm('此操作将永久删除选中的商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecartListFn(params)
            }).catch(() => {
            });
        },
        // 清空购物车
        async clearCart() {
            let arr = [];
            let recordId = '';
            this.tableData.map((item) => {
                arr.push(item.id)
            })
            recordId = arr.join(',');
            recordId.substring(0, recordId.lastIndexOf(','));
            console.log('清空购物车的id：',recordId)
            let params = {
                recordId: recordId
            }
            this.$confirm('此操作将永久删除购物车, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecartListFn(params)
            }).catch(() => {
            });
        },
        async removecartListFn(params) {
            await this.$api.removecartList(this.$qs.stringify(params),getCookie('accessToken'));
            await this.cartListFn();
            await this.$message({
                type: 'success',
                message: '删除成功!'
            });
            await this.eventHub.$emit("addCart");
        },
        // 计算选择总额和数量
        checkedTotalPrice() {
            let checkedTotalPrice = 0;
            let checkedTotalNumber = 0;
            if(this.multipleSelection.length==0) { // 如果存放商品的参数长度为0时，件数为0，金额为0 ，否则计算除金额和件数
                this.checkedPrices = 0;
                this.checkedNumbers = 0;
            } else {
                this.multipleSelection.map((item) => {
                    checkedTotalPrice += Number(this.accMul(item.quantity,item.price) + item.discountProcessCostAAA);
                    checkedTotalNumber += Number(item.quantity);
                })
                this.checkedPrices = checkedTotalPrice.toFixed(2);
                this.checkedNumbers = checkedTotalNumber;
            }
        },
        // 计算总件数
        totalBuyNumber() {
            let number = 0;
            this.tableData.map((item) => {
                number += Number(item.quantity);
            })
            this.totalBuyNumbers = number;
        },
        // 改变数量
        async changeNumber(id,row) {
            console.log(id)
            this.tableData.map((item)=>{
                if(id==item.id) {
                    item['discountProcessCostAAA'] = Number(item.goodsInfo.discountProcessCost) * item.quantity * Math.ceil(item.gram);
                    item['subtotal'] = Number(this.accMul(item.quantity,item.price) + item.discountProcessCostAAA).toFixed(2);
                    this.cartListQuantity(id,item.quantity,row);
                }
            })
            this.checkedTotalPrice();
            this.totalBuyNumber();
        },
        // 单个选择操作 当选择项发生变化时会触发该事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if(this.multipleSelection.length>=this.tableData.length) {
                this.checkedAll = true;
            } else {
                this.checkedAll = false;
            }
            this.checkedTotalPrice();
            this.totalBuyNumber();
        },
        // 全选操作
        toggleSelectionAll(rows) {
            console.log(rows)
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleAllSelection();
                });
                this.checkedTotalPrice();
                this.totalBuyNumber();
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // 购买
        settlement() {
            console.log(this.checkedNumbers,this.multipleSelection)
            let _this = this;
            if(getCookie('accessToken') && getCookie('accessToken') != 'null' && getCookie('accessToken') != 'undefined') {
                if(_this.multipleSelection.length==0) {
                    _this.$message({
                        message: '请选择商品',
                        type: 'warning'
                    });
                } else {
                    console.log(_this.multipleSelection)
                    localStorage.setItem('checkedSkuData', encodeURI(JSON.stringify(_this.multipleSelection)));
                    this.$router.push({path: '/orderConfirmation',query: {freight: _this.multipleSelection[0].freight,isCart: 'true'}})
                }
            } else {
                _this.$router.push({path: '/login' ,query: {url:location.hostname}})
            }
        },
        // 乘法函数，用来得到精确的乘法结果
        // 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        // 调用：accMul(arg1,arg2)
        // 返回值：arg1乘以arg2的精确结果
        accMul(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) {}
            try {
                m += s2.split(".")[1].length
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        },
        toGoldShopDetail(id,skuId,buyNumber) {
            this.$router.push({path: '/goldShopDetail', query:{id: id,isOther: skuId,buyNumber: buyNumber}})
        },
        goMall() {
            this.$router.push({path: '/goldShop'})
        }
    },
}
</script>

<style lang="scss" scoped>
    .cart {
        padding: 40px 0 0;
        background-color: #f7f7f7;
    }

    .no-goods {
        margin: 0 auto;
        padding: 38px 20px;
        width: 1160px;
        background-color: var(--white);
        text-align: center;
        margin-bottom: 40px !important;
        .img {
            width: 720px;
            height: 320px;
        }
        .el-button {
            color: var(--white);
            background: var(--orangeDark);
            border: 1px solid var(--orangeDark);
        }
    }

    .cart-content {
        padding: 20px;
        background-color: var(--white);
    }

    .cart-content .title h2 {
        display: inline-block;
    }

    .cart-content .title span {
        color: var(--orangeDark);
    }

    .el-tag {
        margin-right: 10px;
    }

    .settlement {
        overflow: hidden;
        &.active {
            width: 100%;
            z-index: 9;
            position: fixed;
            left: 0;
            bottom: 0;
        }
        .settlement-centent {
            background-color: var(--white);
            .settlement-box {
                margin-top: 20px;
                margin-top: 20px;
                .settlement-box-cenyent {
                    overflow: hidden;
                    padding: 20px 0;
                    .jiesuan-left {
                        padding: 0 20px;
                    }
                    .jiesuan-right {
                        span {
                            font-size: 14px;
                        }
                        .settlement-btn {
                            display: inline-block;
                            width: 180px;
                            line-height: 70px;
                            background: var(--orangeDark);
                            color: var(--white);
                            text-align: center;
                            margin-left: 20px;
                            cursor: pointer;
                        }
                        span.total,span.totalNumber {
                            color: var(--orangeDark);
                        }
                    }
                }
            }
        }
    }
</style>