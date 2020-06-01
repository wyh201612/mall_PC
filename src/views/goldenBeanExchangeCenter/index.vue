<template>
    <div class="main-content goldenBeanExchangeCenter">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>金豆兑换中心（{{goldenBeansInfo.usableBean}}个金豆）
        </div>
        <div class="info_centent">
            <div class="goldenBeanExchangeGoods">
                <el-tabs v-model="giftType" @tab-click="handleClickTabs">
                    <el-tab-pane label="兑换优惠礼券" name="1">
                        <div class="flex flex-row">
                            <div class="flex flex-direction" v-if="couponList.length!=0" style="width: 100%;">
                                <div class="flex flex-row flex-wrap">
                                    <div class="itemCoupon margin-bottom" v-for="(item, index) in couponList" :key="index">
                                        <div class="itemCoupon-top text-center">
                                            <div class="text-bold"><span class="text-price text-xxl"></span><span class="money">{{item.couponRepertoryBean.discountAmount}}</span></div>
                                            <div class="padding-bottom-sm">{{item.giftName}}</div>
                                            <div class="padding-bottom-sm" v-if="item.couponRepertoryBean.indateType==0">{{'领取'+item.couponRepertoryBean.indateDays+'后过期'}}</div>
                                            <div class="padding-bottom-sm" v-if="item.couponRepertoryBean.indateType==1">{{item.couponRepertoryBean.addTime+'-'+item.couponRepertoryBean.indateTime}}</div>
                                        </div>
                                        <div class="itemCoupon-bottom padding-sm">
                                            <div class="padding-bottom">适用商品：<span class="text-darkGray">适用全部产品</span></div>
                                            <div class="padding-bottom">适用渠道：<span class="text-darkGray">全部渠道</span></div>
                                            <div class="padding-bottom">优惠叠加：<span class="text-darkGray">不可叠加使用</span></div>
                                            <div class="text-center padding-bottom"><span class="text-orange">{{item.price}}金豆</span>可兑</div>
                                            <div class="text-center" v-if="goldenBeansInfo.usableBean>=item.price"><el-button round @click="exchangeShow(item.giftId,item.price)">兑换</el-button></div>
                                            <div class="text-center" v-else><el-button round>金豆不足</el-button></div>
                                        </div>
                                    </div>
                                </div>
                                <el-pagination
                                    style="text-align: center;padding-top: 20px;"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage1"
                                    :page-sizes="[10, 20, 50, 100]"
                                    :page-size="pageSize1"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total1">
                                </el-pagination>
                            </div>
                            <!-- 无兑换优惠礼券 -->
                            <div class="noCoupon-box" v-else>
                                <img class="noCoupon" src="../../assets/images/personalCenter/noCoupon.png" alt="">
                                <div class="margin-top text-gray text-sm">无券可兑，正在筹备中～</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="兑换实物奖品" name="3">
                        <div class="flex flex-row">
                            <div class="flex flex-direction" v-if="giftList.length!=0" style="width: 100%;">
                                <div class="flex flex-row flex-wrap">
                                    <div class="itemMaterial margin-bottom" v-for="(item, index) in giftList" :key="index">
                                        <div class="itemMaterial-top text-center">
                                            <img :src="item.imgUrl" alt="">
                                        </div>
                                        <div class="itemMaterial-bottom padding-sm">
                                            <div class="padding-bottom text-center">{{item.giftName}}</div>
                                            <div class="padding-bottom text-center">价值：<span class="text-price text-xxl">{{item.marketPrice}}</span></div>
                                            <div class="text-center padding-bottom"><span class="text-orange">{{item.price}}金豆</span>可兑</div>
                                            <div class="text-center" v-if="goldenBeansInfo.usableBean>=item.price"><el-button round @click="exchangeShow(item.giftId,item.price)">兑换</el-button></div>
                                            <div class="text-center" v-else><el-button round>金豆不足</el-button></div>
                                        </div>
                                    </div>
                                </div>
                                <el-pagination
                                    style="text-align: center;padding-top: 20px;"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage2"
                                    :page-sizes="[10, 20, 50, 100]"
                                    :page-size="pageSize2"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total2">
                                </el-pagination>
                            </div>
                            <!-- 无兑换实物奖品 -->
                            <div class="noCoupon-box" v-else>
                                <img class="noCoupon" src="../../assets/images/personalCenter/noCoupon.png" alt="">
                                <div class="margin-top text-gray text-sm">无券可兑，正在筹备中～</div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <router-link :to="'/myAccount/goldenBeanExchangeDetailed'">
                    <div class="text-blue exchangeDetailed">兑换明细</div>
                </router-link>
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
        name: 'goldenBeanExchangeCenter',
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
                form: {
                    payPassword: ''
                },
                rules: {
                    payPassword: [
                        { required: true, validator: validatePayPassword, trigger: 'blur' }
                    ]
                },
                giftType: '1',
                giftList: {},
                couponList: {},
                currentPage1: 1, // 当前页
                pageSize1: 10, // 每页数量
                currentPage2: 1, // 当前页
                pageSize2: 10, // 每页数量
                total1: 0,
                total2: 0
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
            this.getAllGiftList(this.currentPage1,this.pageSize1,1)
            this.getAllGiftList(this.currentPage2,this.pageSize2,3)
        },
        destroyed() {

        },
        methods: {
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
                if(this.goldenBeansInfo.usableBean<price) {
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
            async getAllGiftList(pageNum,pageSize,giftType) {
                let params = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    giftType: giftType // giftType int 是  礼品类型：1-优惠礼券；2-热门权益；3-精品实物；
                }
                let data = await this.$api.getAllGiftList(params,getCookie('accessToken'));
                if(giftType=='1') {
                   this.couponList = data.dataList;
                   this.total1 = data.page.total;
                } else if(giftType=='3'){
                    this.giftList = data.dataList;
                    this.total2 = data.page.total;
                }
            },
            // 每页多少条操作
            handleSizeChange(val) {
                if(this.giftType=='1') {
                    this.pageSize1 = val;
                    this.getAllGiftList(this.currentPage1, this.pageSize1, this.giftType);
                } else if(this.giftType=='3') {
                    this.pageSize2 = val;
                    this.getAllGiftList(this.currentPage2, this.pageSize2, this.giftType);
                }
            },
            // 分页操作
            handleCurrentChange(val) {
                if(this.giftType=='1') {
                    this.currentPage1 = val;
                    this.getAllGiftList(this.currentPage1, this.pageSize1, this.giftType);
                } else if(this.giftType=='3') {
                    this.currentPage2 = val;
                    this.getAllGiftList(this.currentPage2, this.pageSize2, this.giftType);
                }
            },
            handleClickTabs(tab, event) {
                this.giftType = tab.name;
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

    .goldenBeanExchangeCenter{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            .noCoupon-box {
                width: 100%;
                text-align: center;
                margin-top: 100px;
                .noCoupon {
                    width: 660px;
                    height: 220px;
                }
            }
            .goldenBeanExchangeGoods {
                position: relative;
                .exchangeDetailed {
                    position: absolute;
                    top: 12px;
                    right: 4px;
                }
                .itemCoupon {
                    width: 265px;
                    margin-right: 50px;
                    border: 1px solid #f0f0f0;
                    &:nth-of-type(3n) {
                        margin-right: 0;
                    }
                    .itemCoupon-top {
                        background-image: linear-gradient(135deg, #efc590 0%, #bb8d48 100%);
                        .money {
                            padding-top: 36px;
                            padding-bottom: 10px;
                            font-size: 36px;
                            display: inline-block;
                        }
                    }
                    .itemCoupon-bottom {
                        
                    }
                }
                
                .itemMaterial {
                    width: 265px;
                    margin-right: 50px;
                    border: 1px solid #f0f0f0;
                    &:nth-of-type(3n) {
                        margin-right: 0;
                    }
                    .itemMaterial-top {
                        img {
                            width: 100%;
                            height: 200px;
                        }
                        .money {
                            padding-top: 36px;
                            padding-bottom: 10px;
                            font-size: 36px;
                            display: inline-block;
                        }
                    }
                    .itemMaterial-bottom {
                        
                    }
                }
            }
        }
    }
</style>
