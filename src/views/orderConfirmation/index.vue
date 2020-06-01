<template>
    <div class="orderConfirmation">
        <div class="top-desc clearfix inghong-container">
            <div class="margin-bottom-sm text-df text-bold">选择收货地址</div>
            <div class="address-box" v-if="addressList1.length!=0">
                <el-collapse accordion>
                    <div style="overflow: hidden;">
                        <div class="address-item text-sm" :class="{'active':addressId==item.id}" v-for="(item, index) in addressList1" :key="index" @click="checkedAddress(item)" @mouseenter="setDefaultAddrShow(item)" @mouseleave="leave">
                            <div class="addr-hd">{{item.provinceName}}{{item.cityName}}（{{item.name}}收）</div>
                            <div class="li-top address-msg">
                                <span class="margin-right-xs">{{item.areaName}}</span>
                                <span>{{item.address}}</span>
                            </div>
                            <div class="address-msg">{{item.mobile}}</div>
                            <span v-show="addressId==item.id" class="modify" @click.stop="modify_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)">修改</span>
                            <div class="default-tip" v-show="item.isDefault==1">默认地址</div>
                            <div class="set-default" v-show="item.isDefault!=1&&addressId==item.id&&showSetDefaultAddr" @click="update_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, 1)">设为默认</div>
                            <div class="curMarker" v-show="addressId==item.id"></div>
                        </div>
                    </div>
                    <el-collapse-item>
                        <template slot="title"></template>
                        <div class="address-item text-sm margin-top" :class="{'active':addressId==item.id}" v-for="(item, index) in addressList2" :key="index" @click="checkedAddress(item)" @mouseenter="setDefaultAddrShow(item)" @mouseleave="leave">
                            <div class="addr-hd">{{item.provinceName}}{{item.cityName}}（{{item.name}}收）</div>
                            <div class="li-top address-msg">
                                <span class="margin-right-xs">{{item.areaName}}</span>
                                <span>{{item.address}}</span>
                            </div>
                            <div class="address-msg">{{item.mobile}}</div>
                            <span v-show="addressId==item.id" class="modify" @click.stop="modify_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)">修改</span>
                            <div class="default-tip" v-show="item.isDefault==1">默认地址</div>
                            <div class="set-default" v-show="item.isDefault!=1&&addressId==item.id&&showSetDefaultAddr" @click="update_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, 1)">设为默认</div>
                            <div class="curMarker" v-show="addressId==item.id"></div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <el-button size="mini" @click="add_addressShow('ruleForm')" class="margin-top">新增地址</el-button>
            <div class="orderDes">
                <div class="item-headers">
                    <div class="header-wrapper">
                        <div class="margin-top-lg text-df text-bold">确认订单信息</div>
                    </div>
                    <div class="item-headers-wrap item-headers-column-6 text-sm text-center">
                        <div class="item-headers-content item-headers-0">商品信息</div>
                        <div class="item-headers-content item-headers-1">商品属性</div>
                        <div class="item-headers-content item-headers-2">单价</div>
                        <div class="item-headers-content item-headers-3">数量</div>
                        <div class="item-headers-content item-headers-4">加工费</div>
                        <div class="item-headers-content item-headers-5">小计</div>
                    </div>
                </div>
            </div>
            <div class="dinamicx-card-group" v-for="(item,index) in checkedSkuData" :key="index">
                <!-- <div>
                    <div class="order-orderInfo">
                        <img src="../../assets/images/bitbug.png" alt="" class="shopIcon">
                        <span class="shop-name">店铺：</span>
                        <router-link  :to="{path:'/goldShop'}" class='order-link shop-url'>应弘黄金</router-link>
                    </div>
                </div> -->
                <div>
                    <div class="flex flex-direction justify-start align-stretch" style="background-color: rgb(251, 252, 255);border-bottom: 1px dotted rgb(221, 221, 221);">
                        <div class="item-row">
                            <div class="order-itemInfo">
                                <div class="info-detail info-cell">
                                    <div class="fl pointer">
                                        <router-link  :to="{path:'/goldShopDetail', query:{id: item.goodsInfo.id,isOther: item.skuId,buyNumber: item.quantity}}" class='order-link info-cell'>
                                            <img :src="item.imgUrl" alt="" class="info-img">
                                        </router-link>
                                    </div>
                                    <div class="fl">
                                        <div class="info-cell info-msg margin-bottom-xs">
                                            <router-link  :to="{path:'/goldShopDetail',query: {id: item.goodsInfo.id,isOther: item.skuId,buyNumber: item.quantity}}" class='order-link info-title text-cut'>{{item.name}}</router-link>
                                        </div>
                                        <div class="padding-left-sm">
                                            <el-tag size="mini" v-for='(item1,index) in item.labelList' :key="index" style="margin-right: 6px;">{{item1.name}}</el-tag>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-sku info-cell">
                                    <p>
                                        <span class="hd">规格：</span>
                                        <span class="bd">{{item.gram.toFixed(2)}} 克</span>
                                    </p>
                                </div>
                                <div class="info-price info-cell text-price text-center">{{item.price.toFixed(2)}}</div>
                            </div>
                            <div class="order-quantity text-center"><el-input-number v-model="item.quantity" :min="1" size="mini" @change="changeNumber"></el-input-number></div>
                            <div class="item-row-discountProcessCost">
                                <div class="label item-row__discountProcessCost-item text-center">
                                    <span class=" text-price">{{item.discountProcessCostAAA.toFixed(2)}}</span>
                                </div>
                            </div>
                            <div class="item-row__price">
                                <div class="label item-row__price-item text-right">
                                    <span class="text-price text-df text-orangeDark text-bold">{{item.subtotal.toFixed(2)}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding: 20px 0;">
                <div>
                    配送方式：
                    <el-select size="mini" v-model="kdvalue" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div class="margin-tb">配送时间：工作日、双休日与节假日均可送货</div>
                <!-- <div>
                    <div class="margin-bottom">
                        <span>发票信息：</span>
                        <el-radio-group v-model="invoiceRadio">
                            <el-radio :label="1">不开票</el-radio>
                            <el-radio :label="2">开发票</el-radio>
                        </el-radio-group>
                    </div>
                    <div v-if="invoiceRadio==2">
                        <div class="address-box" v-if="addressList1.length!=0">
                            <el-collapse accordion>
                                <div style="overflow: hidden;">
                                    <div class="address-item text-sm" :class="{'active':addressId==item.id}" v-for="(item, index) in addressList1" :key="index" @click="checkedAddress(item)" @mouseenter="setDefaultAddrShow(item)" @mouseleave="leave">
                                        <div class="addr-hd">个人（{{item.name}}收）</div>
                                        <div class="li-top address-msg">
                                            <span class="margin-right-xs">{{item.provinceName}}</span>
                                            <span class="margin-right-xs">{{item.cityName}}</span>
                                            <span class="margin-right-xs">{{item.areaName}}</span>
                                            <span>{{item.address}}</span>
                                        </div>
                                        <div class="address-msg">{{item.mobile}}</div>
                                        <span v-show="addressId==item.id" class="modify" @click.stop="modify_invoice(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)">修改</span>
                                        <div class="default-tip" v-show="item.isDefault==1">默认发票</div>
                                        <div class="set-default" v-show="item.isDefault!=1&&addressId==item.id&&showSetDefaultAddr" @click="update_invoice(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, 1)">设为默认</div>
                                        <div class="curMarker" v-show="addressId==item.id"></div>
                                    </div>
                                </div>
                                <el-collapse-item>
                                    <template slot="title"></template>
                                    <div class="address-item text-sm margin-top" :class="{'active':addressId==item.id}" v-for="(item, index) in addressList2" :key="index" @click="checkedAddress(item)" @mouseenter="setDefaultAddrShow(item)" @mouseleave="leave">
                                        <div class="addr-hd">个人（{{item.name}}收）</div>
                                        <div class="li-top address-msg">
                                            <span class="margin-right-xs">{{item.provinceName}}</span>
                                            <span class="margin-right-xs">{{item.cityName}}</span>
                                            <span class="margin-right-xs">{{item.areaName}}</span>
                                            <span>{{item.address}}</span>
                                        </div>
                                        <div class="address-msg">{{item.mobile}}</div>
                                        <span v-show="addressId==item.id" class="modify" @click.stop="modify_invoice(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)">修改</span>
                                        <div class="default-tip" v-show="item.isDefault==1">默认发票</div>
                                        <div class="set-default" v-show="item.isDefault!=1&&addressId==item.id&&showSetDefaultAddr" @click="update_invoice(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, 1)">设为默认</div>
                                        <div class="curMarker" v-show="addressId==item.id"></div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div><el-button size="mini" @click="add_invoiceShow('ruleForm_invoice')" class="margin-top">新增发票</el-button></div>
                    </div>
                </div> -->
                <div class="couponUsableList">
                    <el-collapse accordion>
                        <el-collapse-item>
                            <template slot="title">
                                <div class="flex felx-row justify-between align-center" style="width: 100%;">
                                    <span class='text-df text-blackDark'><img class="counp-icon vertical-middle" src="../../assets/images/counp.png" alt=""> 使用优惠/礼品卡/抵用</span>
                                    <span class="text-df" v-if="couponUsableList.length!=0">
                                        <span class="text-orangeDark" v-if="discountAmount!=''">
                                            {{'-￥'+discountAmount}}
                                        </span>
                                        <span class="text-darkGray" v-else>
                                            {{couponUsableList.length+'张可用'}}
                                        </span>
                                    </span>
                                    <span class="text-darkGray text-df" v-else>无可用</span>
                                </div>
                            </template>
                            <div class="flex felx-row flex-wrap">
                                <el-card class="box-card margin-sm" v-for="(item,index) in couponUsableList" :key="index">
                                    <div class="flex flex-direction text-sm text-darkGray">
                                        <div class="flex flex-row justify-between align-center">
                                            <div class="flex flex-row">
                                                <div class="flex flex-direction align-center text-orange text-bold">
                                                    <span>{{item.discountAmount}}元</span>
                                                    <span>立减</span>
                                                </div>
                                                <div class="margin-sm" style="width: 1px;height: 25px;border: 0.5px dashed var(--orange);"></div>
                                                <div class="flex flex-direction">
                                                    <span class="text-bold text-blackDark">{{item.name}}</span>
                                                    <span>商品满{{item.transactionAmount}}元可用</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="btn info" v-if="discountId==item.id" @click="useCoupons(item.id,item.discountAmount)">已选择</div>
                                                <div class="btn checked" v-else @click="useCoupons(item.id,item.discountAmount)">去使用</div>
                                            </div>
                                        </div>
                                        <div class="flex flex-row justify-between padding-tb-sm" style="border-bottom: 1px dashed;">
                                            <div class="time">有效期至：{{item.indateTime}}</div>
                                            <div class="user text-blackDark">使用规则 <i :class="item.showRule==true?'el-icon-arrow-up te':'el-icon-arrow-up'" @click="toggleShowRuleFn(index)"></i></div>
                                        </div>
                                        <div class="padding-tb-sm" v-if="item.showRule==true">{{item.usedCondition}}</div>
                                    </div>
                                </el-card>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                
                <div style="line-height: 40px;">
                    <div style="text-align: right;">
                        <span>{{totalBuyNumbers}} 件商品, </span>
                        <span>商品总额：<span class="text-orangeDark">¥{{totalPrices}}</span></span>
                    </div>
                    <div style="text-align: right;">加工费：¥{{totalDiscountProcessCostAAA}}</div>
                    <div style="text-align: right;">运费：{{freight>0?'¥'+freight:'免运费'}}</div>
                    <div style="text-align: right;" class="text-orangeDark">优惠/抵扣：{{discountAmount!=''?'-￥'+discountAmount:'-￥0.00'}}</div>
                </div>
            </div>
        </div>
        <div class="settlement">
            <div class="settlement-box inghong-container">
                <div class="settlement-box-cenyent">
                    <div class="jiesuan-right">
                        <div style="display: inline-block;text-align: right;">
                            <div style="line-height: initial;">
                                <span>应付总额：</span>
                                <span class="total text-bold text-price">{{amountPayable}}</span>
                            </div>
                            <div style="line-height: initial;">寄送至： {{subAddress}}</div>
                            <div style="line-height: initial;">收货人：{{subConsignee}} {{subPhone}}</div>
                        </div>
                        <div class="settlement-btn fr" @click="buy">去结算</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加地址 -->
        <el-dialog  :title="addressTitle" :visible.sync="add_addressVisible" width="600px" center>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" :disabled='modify' @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="ruleForm.mobile" :disabled='modify' maxlength="11" @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item label="省市县" required>
                    <el-col :span="6">
                        <el-form-item prop="valueProvince">
                            <el-select v-model="ruleForm.valueProvince" placeholder="请选择省" @change="changeProvince">
                                <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="valueCity">
                            <el-select v-model="ruleForm.valueCity" placeholder="请选择市" @change="changeCity">
                                <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="valueOrigin">
                            <el-select v-model="ruleForm.valueOrigin" placeholder="请选择区" @change="changeOrigin">
                                <el-option v-for="item in originOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="ruleForm.address" @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if='!modify' @click="add_address_submitForm('ruleForm')">立即添加</el-button>
                    <el-button type="primary" v-if='modify' @click="modify_address_submitForm('ruleForm')">立即修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 添加发票 -->
        <el-dialog :title="invoiceTitle" :visible.sync="add_invoiceVisible" width="600px" center>
            <el-form :model="ruleForm_invoice" :rules="rules_invoice" ref="ruleForm_invoice" label-width="120px">
                <el-form-item label="类别">
                    <el-radio-group v-model="ruleForm_invoice.type">
                        <el-radio label="个人"></el-radio>
                        <el-radio label="单位"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发票内容">
                    <el-radio-group v-model="ruleForm_invoice.content">
                        <el-radio label="商品明细"></el-radio>
                        <el-radio label="商品类别"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发票抬头" prop="invoiceTitle">
                    <el-input v-model="ruleForm_invoice.invoiceTitle" :disabled='invoiceModify' @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别号" prop="invoiceTaxpayerNumber" v-if="ruleForm_invoice.type=='单位'">
                    <el-input v-model="ruleForm_invoice.invoiceTaxpayerNumber" :disabled='invoiceModify' @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item label="收票人姓名" prop="invoiceName">
                    <el-input v-model="ruleForm_invoice.invoiceName" :disabled='invoiceModify' @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item label="收票人手机号" prop="invoiceMobile">
                    <el-input v-model="ruleForm_invoice.invoiceMobile" :disabled='invoiceModify' maxlength="11" @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item label="省市县" required>
                    <el-col :span="6">
                        <el-form-item prop="valueProvince">
                            <el-select v-model="ruleForm_invoice.valueProvince" placeholder="请选择省" @change="changeProvince">
                                <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="valueCity">
                            <el-select v-model="ruleForm_invoice.valueCity" placeholder="请选择市" @change="changeCity">
                                <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="valueOrigin">
                            <el-select v-model="ruleForm_invoice.valueOrigin" placeholder="请选择区" @change="changeOrigin">
                                <el-option v-for="item in originOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="详细地址" prop="invoiceAddress">
                    <el-input v-model="ruleForm_invoice.invoiceAddress" @input='changeInput($event)'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if='!invoiceModify' @click="add_invoice_submitForm('ruleForm_invoice')">保存</el-button>
                    <el-button type="primary" v-if='invoiceModify' @click="modify_invoice_submitForm('ruleForm_invoice')">修改</el-button>
                </el-form-item>
                <el-form-item label="">
                    <div>说明：订单完成后开票，电子普通发票同样具有法律效力</div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { isCellPhone } from '@/utils/validate'
var appData = require('@/utils/area.json');
export default {
    name: 'orderConfirmation',
    components: {

    },
    data() {
        var checkphone = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("请输入手机号"));
            } else if (!isCellPhone(value)) {//引入utils中validate封装的检查手机格式的方法
                callback(new Error("请输入正确的手机号!"));
            } else {
                callback();
            }
        };
        return {
            kdvalue: '顺丰快递',
            options: [{
                value: '1',
                label: '顺丰快递'
            }, ],
            detail: {},
            showSetDefaultAddr: false,
            addressList1: {}, // 下拉第一层地址
            addressList2: {}, // 下拉第二层地址
            addressId: '', // 所选地址id
            subAddress: '', // 提交时的地址
            subConsignee: '', // 提交时的联系人
            subPhone: '', // 提交时的联系方式
            provinceList: [], // 省列表
            cityList: [], // 市列表
            originList: [], // 区列表
            cityOptions: [], // 市下拉框数据
            originOptions: [], // 区下拉框数据
            addressTitle: '', // 控制添加地址的标题
            add_addressVisible: false, // 控制添加地址
            modify: false, // 控制修改地址时输入框不能输入
            isDefault: 0, // 默认地址
            ruleForm: {
                name: '',
                mobile: '',
                valueProvince: '', // 所选的省
                valueCity: '', // 所选的市
                valueOrigin: '', // 所选的区
                address: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, validator: checkphone, trigger: 'blur' }
                ],
                valueProvince: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ],
                valueCity: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                valueOrigin: [
                    { required: true, message: '请选择县', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            },
            ruleForm_invoice: {
                type: '个人',
                content: '商品明细',
                invoiceTitle: '',
                invoiceTaxpayerNumber: '',
                invoiceName: '',
                invoiceMobile: '',
                valueProvince: '', // 所选的省
                valueCity: '', // 所选的市
                valueOrigin: '', // 所选的区
                invoiceAddress: ''
            },
            rules_invoice: {
                invoiceTitle: [
                    { required: true, message: '请输入发票抬头', trigger: 'blur' }
                ],
                invoiceTaxpayerNumber: [
                    { required: true, message: '请输入纳税人识别号', trigger: 'blur' }
                ],
                invoiceName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                invoiceMobile: [
                    { required: true, validator: checkphone, trigger: 'blur' }
                ],
                valueProvince: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ],
                valueCity: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                valueOrigin: [
                    { required: true, message: '请选择县', trigger: 'change' }
                ],
                invoiceAddress: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            },
            invoiceRadio: 1, // 发票
            invoiceId: '', // 发票id
            isInvoiceDefault: '', // 默认发票
            invoiceTitle: '', // 控制添加发票的标题
            add_invoiceVisible: false, // 控制新增发票
            invoiceModify: false, // 控制新增发票时输入框不能输入
            couponUsableList: [], // 优惠券列表
            discountAmount: "", // 折扣金额
            discountId: "", // 折扣金额id
            totalDiscountProcessCostAAA: '', // 总加工费
            freight: "", // 总运费
            coupon: "", // y优惠券折扣
            totalPrices: "", // 总额
            totalBuyNumbers: "", // 总件
            amountPayable: "", // 应付金额
            isDisabled: false, // 控制收货地址输入框是否可以输入
            checkedSkuData: [], // 选中商品的数据
            skuItemIndex: 0,
            orderId: '' // 支付返回的订单id
        }
    },
    computed: {
        
    },
    created() {
        
    },
    filters: {
        
    },
    mounted() {
        this.get_address();
        this._getJsonData();
        var postData = this.getRequest();
        console.log('checkedSkuData:',postData)
        console.log('freight:',this.$route.query.freight)
        console.log('isCart:',this.$route.query.isCart)
        if(this.$route.query.isCart == 'false') { // 直接购物
            this.freight = this.$route.query.freight;
            this.checkedSkuData.push(postData);
            this.totalPrice();
            this.totalBuyNumber();
        } else { // 购物车进来
            this.freight = this.$route.query.freight;
            this.checkedSkuData = postData;
            this.totalPrice();
            this.totalBuyNumber();
        }
    },
    methods: {
        // 计算总额
        async totalPrice() {
            let price = 0;
            let totalDiscountProcessCostAAA = 0; // 总加工费
            this.checkedSkuData.map((item) => {
                // 计算加工费=数量*克重(向上取整)*加工费折扣
                item.discountProcessCostAAA = this.accMul(item.quantity,Math.ceil(item.gram)) * item.discountProcessCost;
                // 小计=数量*价格+加工费
                item.subtotal = Number(this.accMul(item.quantity,item.price)) + Number(item.discountProcessCostAAA);
                // 计算商品总价=数量*价格
                price += this.accMul(item.quantity,item.price);
                // 计算总加工费=单个加工费累加
                totalDiscountProcessCostAAA += item.discountProcessCostAAA;
            })
            // 获取折扣券
            await this.getActivityCouponUsableList(price);
            // 商品总价赋值
            this.totalPrices = price.toFixed(2);
            // 总加工费赋值
            this.totalDiscountProcessCostAAA = totalDiscountProcessCostAAA.toFixed(2);
            // 应付金额赋值=商品总价+加工费++运费-折扣
            this.amountPayable = Number(Number(this.totalPrices) + Number(this.totalDiscountProcessCostAAA) + Number(this.freight) - this.discountAmount).toFixed(2);
        },
        // 计算总件数
        totalBuyNumber() {
            let number = 0;
            this.checkedSkuData.map((item) => {
                number += item.quantity;
            })
            this.totalBuyNumbers = number;
        },
        // 改变数量
        changeNumber(currentValue, oldValue) {
            this.totalPrice();
            this.totalBuyNumber();
        },
        // el-input框有时候无法输入的问题
        changeInput(e) {
            this.$forceUpdate();
        },
        // 打开添加地址弹窗
        add_addressShow(formName) {
            this.add_addressVisible = true;
            this.addressTitle = '添加地址';
            this.modify = false;
            this.isDefault = 0;
            this.ruleForm = {
                name: '',
                mobile: '',
                valueProvince: '', // 所选的省
                valueCity: '', // 所选的市
                valueOrigin: '', // 所选的区
                address: ''
            }
        },
        // 提交添加地址信息
        add_address_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.add_address();
                } else {
                    return false;
                }
            });
        },
        /* 添加地址
        * 输入参数：
        * userId string 否  用户id
        * name string 是  用户姓名
        * mobile string 是  手机号
        * province string 是  省code
        * city string 是  市code
        * area string 是  区code
        * address string 是  详细地址
        * isDefault int 否  是否默认 */
        async add_address() {
            let _this = this;
            let params = {
                name: _this.ruleForm.name,
                mobile: _this.ruleForm.mobile,
                province: _this.ruleForm.valueProvince,
                city: _this.ruleForm.valueCity,
                area: _this.ruleForm.valueOrigin,
                address: _this.ruleForm.address,
                isDefault: ''
            }
            await _this.$api.add_address(this.$qs.stringify(params),getCookie('accessToken'))
            _this.$message({
                message: '添加成功',
                type: 'success'
            });
            await _this.get_address();
            _this.add_addressVisible = false;
        },
        // 修改地址弹窗显示
        modify_address(id, name, mobile, province, city, area, address, isDefault) {
            console.log(id, name, mobile, province, city, area, address, isDefault);
            this.addressTitle = '修改地址';
            this.modify = true;
            this.addressId = id;
            this.ruleForm.name = name;
            this.ruleForm.mobile = mobile;
            let valueProvince = province;
            let valueCity = city;
            let valueOrigin = area;
            let valueAddress = address;
            this.$set(this.ruleForm, 'valueProvince', valueProvince);
            this.$set(this.ruleForm, 'valueCity', valueCity);
            this.$set(this.ruleForm, 'valueOrigin', valueOrigin);
            this.$set(this.ruleForm, 'address', valueAddress);
            this.isDefault = isDefault;
            this.changeProvince(province);
            this.changeCity(city);
            this.add_addressVisible = true;
        },
        // 修改地址提交操作
        modify_address_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(this.addressId, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault)
                if (valid) {
                    this.update_address(this.addressId, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault);
                } else {
                    return false;
                }
            });
        },
        // 打开新增发票弹窗
        add_invoiceShow() {
            this.add_invoiceVisible = true;
            this.invoiceTitle = '添加发票';
            this.invoiceModify = false;
            this.isInvoiceDefault = 0;
            this.ruleForm_invoice = {
                type: '个人',
                content: '商品明细',
                invoiceTitle: '',
                invoiceTaxpayerNumber: '',
                invoiceName: '',
                invoiceMobile: '',
                valueProvince: '', // 所选的省
                valueCity: '', // 所选的市
                valueOrigin: '', // 所选的区
                invoiceAddress: ''
            }
        },
        // 添加发票
        add_invoice_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                } else {
                    return false;
                }
            });
        },
        // 修改地址弹窗显示
        modify_invoice(id, name, mobile, province, city, area, address, isDefault) {
            console.log(id, name, mobile, province, city, area, address, isDefault);
            this.invoiceTitle = '修改发票';
            this.invoiceModify = true;
            this.invoiceId = id;
            this.ruleForm_invoice.type = '单位';
            this.ruleForm_invoice.content = '商品明细';
            this.ruleForm_invoice.invoiceTitle = '浙江应弘科技有限公司';
            this.ruleForm_invoice.invoiceTaxpayerNumber = '11111111111111111';
            this.ruleForm_invoice.invoiceName = name;
            this.ruleForm_invoice.invoiceMobile = mobile;
            let valueProvince = province;
            let valueCity = city;
            let valueOrigin = area;
            let valueAddress = address;
            this.$set(this.ruleForm_invoice, 'valueProvince', valueProvince);
            this.$set(this.ruleForm_invoice, 'valueCity', valueCity);
            this.$set(this.ruleForm_invoice, 'valueOrigin', valueOrigin);
            this.$set(this.ruleForm_invoice, 'invoiceAddress', valueAddress);
            this.isInvoiceDefault = isDefault;
            this.changeProvince(province);
            this.changeCity(city);
            this.add_invoiceVisible = true;
        },
        // 修改发票
        modify_invoice_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.update_address(this.addressId, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault);
                } else {
                    return false;
                }
            });
        },
        // 选择省
        changeProvince(val) {
            this.provinceList.forEach((province, index) => {
                if (val.toString() === this.provinceList[index].value) {
                    this.ruleForm.valueProvince = this.provinceList[index].value;
                    this.cityOptions = this.provinceList[index].children;
                    this.ruleForm.valueCity = this.provinceList[index].children[0].value;
                    this.originOptions = this.provinceList[index].children[0].children;
                    this.ruleForm.valueOrigin = this.provinceList[index].children[0].children[0].value;
                }
            })
        },
        // 选择市
        changeCity(val) {
            this.cityList.forEach((city, index) => {
                if (val.toString() === this.cityList[index].value) {
                    this.ruleForm.valueCity = this.cityList[index].value;
                    this.originOptions = this.cityList[index].children;
                    this.ruleForm.valueOrigin = this.cityList[index].children[0].value;
                }
            })
        },
        // 选择区
        changeOrigin(val) {
            this.ruleForm.valueOrigin = val;
            this.$forceUpdate();
        },
        // 获取省市县
        _getJsonData() {
            let _this = this;
            let res = appData;
            _this.provinceList = [];
            _this.cityList = [];
            _this.originList = [];
            res.forEach((item) => {
                if (item.value.match(/0000$/)) {
                    _this.provinceList.push({
                        value: item.value,
                        label: item.name,
                        children: []
                    })
                } else if (item.value.match(/00$/)) {
                    _this.cityList.push({
                        value: item.value,
                        label: item.name,
                        children: []
                    })
                } else {
                    _this.originList.push({
                        value: item.value,
                        label: item.name
                    })
                }
            })
            for (let index in _this.provinceList) {
                for (let index1 in _this.cityList) {
                    if (_this.provinceList[index].value.slice(0, 2) === _this.cityList[index1].value.slice(0, 2)) {
                        _this.provinceList[index].children.push(_this.cityList[index1])
                    }
                }
            }
            for(let item1 in _this.cityList) {
                for(let item2 in _this.originList) {
                    if (_this.originList[item2].value.slice(0, 4) === _this.cityList[item1].value.slice(0, 4)) {
                        _this.cityList[item1].children.push(_this.originList[item2])
                    }
                }
            }
        },
        // 选择地址
        checkedAddress(items) {
            this.addressList1.map((item) => {
                if(item.id == items.id) {
                    this.addressId = items.id;
                    this.subAddress = items.provinceName + items.cityName + items.areaName + items.address;
                    this.subConsignee = items.name;
                    this.subPhone = items.mobile;
                }
            })
            this.addressList2.map((item) => {
                if(item.id==items.id) {
                    this.addressId = items.id;
                    this.subAddress = items.provinceName + items.cityName + items.areaName + items.address;
                    this.subConsignee = items.name;
                    this.subPhone = items.mobile;
                }
            })
        },
        // 鼠标移入显示设置默认地址
        setDefaultAddrShow(items) {
            if(this.addressId==items.id&&items.isDefault!=1) {
                this.showSetDefaultAddr = true;
            }
        },
        // 鼠标移出隐藏设置默认地址
        leave() {
            this.showSetDefaultAddr = false;
        },
        // 购买
        buy() {
            console.log(this.checkedSkuData)
            let _this = this;
            if(_this.addressList1.length==0) {
                _this.$message.error('请添加地址！');
                return false;
            } else {
                let arr = [];
                let obj = {}
                _this.checkedSkuData.map((item) => {
                    obj = {
                        'skuId': '',
                        'quantity': ''
                    }
                    if(this.$route.query.isCart == 'false') { // 直接下单
                        obj.skuId = item.id;
                    } else { // 购物车下单
                        obj.skuId = item.skuId;
                    }
                    obj.quantity = item.quantity;
                    arr.push(obj)
                })
                console.log(arr)
                _this.mallPay(JSON.stringify(arr),_this.addressId,_this.discountId);
                // _this.payPlaceorder(JSON.stringify(arr),_this.addressId,_this.discountId);
            }
        },
        /* 接口地址：  member/address/update
        * id long 是  收货地址id
        * userId string 否  用户id
        * name string 是  用户姓名
        * mobile string 是  手机号
        * province string 是  省code
        * city string 是  市code
        * area string 是  区code
        * address string 是  详细地址
        * isDefault int 是  是否默认 0：否 1：是 */
        async update_address(id, name, mobile, valueProvince, valueCity, valueOrigin, address, isDefault) {
            let _this = this;
            let params = {
                id: id,
                name: name,
                mobile: mobile,
                province: valueProvince,
                city: valueCity,
                area: valueOrigin,
                address: address,
                isDefault: isDefault
            }
            await _this.$api.update_address(this.$qs.stringify(params),getCookie('accessToken'))
            _this.$message({
                message: '修改成功',
                type: 'success'
            });
            _this.add_addressVisible = false;
            _this.get_address();
        },
        /* 接口地址：  member/address/update
        * id long 是  收货地址id
        * userId string 否  用户id
        * name string 是  用户姓名
        * mobile string 是  手机号
        * province string 是  省code
        * city string 是  市code
        * area string 是  区code
        * address string 是  详细地址
        * isDefault int 是  是否默认 0：否 1：是 */
        async update_invoice(id, name, mobile, valueProvince, valueCity, valueOrigin, address, isDefault) {
            // let _this = this;
            // let params = {
            //     id: id,
            //     name: name,
            //     mobile: mobile,
            //     province: valueProvince,
            //     city: valueCity,
            //     area: valueOrigin,
            //     address: address,
            //     isDefault: isDefault
            // }
            // await _this.$api.update_address(this.$qs.stringify(params),getCookie('accessToken'))
            // _this.$message({
            //     message: '修改成功',
            //     type: 'success'
            // });
            // _this.add_invoiceVisible = false;
            // _this.get_address();
        },
        
        // * 获取地址接口地址： member/address/list
        async get_address() {
            let _this = this;
            let data = await _this.$api.get_address('',getCookie('accessToken'))
            if(data.length!=0) {
                data.map((item) => {
                    if(item.isDefault == 1) { // 设置了默认地址取默认地址，否则取第一个
                        _this.addressId = item.id;
                        _this.subAddress = item.provinceName + item.cityName + item.areaName + item.address;
                        _this.subConsignee = item.name;
                        _this.subPhone = item.mobile;
                    } else {
                        _this.addressId = data[0].id;
                        _this.subAddress = data[0].provinceName + data[0].cityName + data[0].areaName + data[0].address;
                        _this.subConsignee = data[0].name;
                        _this.subPhone = data[0].mobile;
                    }
                })
                _this.addressList1 = data.slice(0, 4);
                _this.addressList2 = data.slice(4);
            }
        },

        // 支付addressId:收货地址id,couponId:满减券ID
        async mallPay(goodsInfo,addressId,couponId) {
            let _this = this;
            let param = {
                goodsInfo: goodsInfo,   //[{"skuId":3,"quantity":2},{"skuId":2,"quantity":3}]；skuId：字面意义；quantity：数量
                addressId: addressId, //收货地址id
                source: '7', //订单来源 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
                couponId: couponId, //满减券ID
                payMode: '4' //支付模式 2支付宝 3无卡 4云闪付
            }
            let data = await _this.$api.pay(this.$qs.stringify(param),getCookie('accessToken'))
            console.log(data)
            _this.orderId = data.orderId;
            window.open(data.payData);
            _this.$confirm('将前往订单详情页', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                showClose: false,
                type: 'info',
                center: true,
                closeOnClickModal: false,
            }).then(() => {
                _this.$router.push({path: '/orderDetail', query: {orderId: data.orderId}})
            });
        },
        /** 服务名：商城下单 ：mall/placeorder
        入参：goodsInfo     商品信息格式：[{"skuId":3,"quantity":2},{"skuId":2,"quantity":3}]
            addressId long 是  收货地址
            source int 是  订单来源 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
            couponId int 否  满减券ID
        出参：{
            orderId：
            expireMinute:有效时间(分钟)
        }
        */
        async payPlaceorder(goodsInfo,addressId,couponId) {
            let _this = this;
            let param = {
                goodsInfo: goodsInfo,   //[{"skuId":3,"quantity":2},{"skuId":2,"quantity":3}]；skuId：字面意义；quantity：数量
                addressId: addressId, //收货地址id
                source: '7', //订单来源 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
                couponId: couponId //满减券ID
            }
            let data = await _this.$api.payPlaceorder(this.$qs.stringify(param),getCookie('accessToken'))
            _this.$router.push({path: '/settlement', query: {orderId: data.orderId,expireMinute: data.expireMinute}})
        },
        
        // 获取可用优惠券
        async getActivityCouponUsableList(transactionAmount) {
            let param = {
                transactionAmount: transactionAmount, // 交易额度（如果使用黄金红包代表黄金克重；如果是商城满减券代表支付金额：数量*单价）
                type: 2 // 类型：0-黄金红包；1-回租福利券；2-商城满减券
            }
            let couponUsableList = await this.$api.getActivityCouponUsableList(param,getCookie('accessToken'));
            this.couponUsableList = couponUsableList;
            if(couponUsableList.length!=0) { // 默认选中第一个优惠券
                // this.discountAmount = Number(this.couponUsableList[0].discountAmount).toFixed(2);
                // this.discountId = this.couponUsableList[0].id;
            } else { // 无优惠券
                // this.discountAmount = 0.00;
                // this.discountId = '';
            }
        },
        // 选择使用优惠券
        useCoupons(id,discountAmount) {
            console.log('id:',id)
            console.log('discountAmount:',discountAmount)
            console.log('discountId:',this.discountId)
            if(id==this.discountId) { // 如果第二次点击的同一个，就取消选中
                this.discountId = '';
                this.discountAmount = '';
            } else {
                this.discountAmount = discountAmount.toFixed(2);
                this.discountId = id;
            }
            let price = 0;
            let totalDiscountProcessCostAAA = 0; // 总加工费
            this.checkedSkuData.map((item) => {
                // 加工费=数量*克重(向上取整)*加工费折扣
                item.discountProcessCostAAA = this.accMul(item.quantity,Math.ceil(item.gram)) * item.discountProcessCost;
                // 商品总价=数量*价格
                price += this.accMul(item.quantity,item.price);
                // 总加工费=加工费累加
                totalDiscountProcessCostAAA += item.discountProcessCostAAA;
            })
            // 商品总价
            this.totalPrices = price.toFixed(2);
            // 总加工费
            this.totalDiscountProcessCostAAA = totalDiscountProcessCostAAA.toFixed(2);
            // 应付金额=商品总价+加工费+运费-折扣
            this.amountPayable = Number(Number(this.totalPrices) + Number(this.totalDiscountProcessCostAAA) + Number(this.freight) - this.discountAmount).toFixed(2);
        },
        // 显示优惠券规则
        toggleShowRuleFn(index){
    　　　　let obj = this.couponUsableList[index]; // 找到点击的dom对象
    　　　　obj.showRule = !obj.showRule; // 向这个对象中添加 showRule 属性
    　　　　this.$set(this.couponUsableList, index, obj); // 把添加完showRule 属性的新对象set()进data数据中
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
        // 传递参数时参数包含中文获取、
        getRequest() {
            var theRequest = localStorage.getItem('checkedSkuData'); //获取字串，使用了两次decodeRUI解码
            var data = JSON.parse(decodeURI(decodeURI((theRequest))))
            return data;
        }
    },
}
</script>
<style lang="scss" scoped>
    .orderDes {
        .item-headers {
            .item-headers-wrap {
                margin-top: 15px;
                color: var(--darkGray);
                .item-headers-content {
                    display: inline-block;
                    height: 24px;
                    line-height: 24px;
                    border-bottom: 3px solid #b2d1ff;
                    margin-left: 1px;
                    vertical-align: bottom;
                    &.item-headers-0 {
                        width: 335px;
                        margin-left: 0;
                    }
                    &.item-headers-1 {
                        width: 180px;
                    }
                    &.item-headers-2 {
                        width: 160px;
                    }
                    &.item-headers-3 {
                        width: 160px;
                    }
                    &.item-headers-4 {
                        width: 150px;
                    }
                    &.item-headers-5 {
                        width: 170px;
                    }
                }
            }
        }
    }
    .dinamicx-card-group {
        color: var(--blackDark);
        .order-orderInfo {
            position: relative;
            padding-bottom: 5px;
            margin-top: 25px;
            border-bottom: 1px dotted #80b2ff;
            height: 27px;
            .shopIcon {
                width: 16px;
                height: 16px;
                vertical-align: text-bottom;
                margin-right: 6px;
                position: relative;
                top: 1px;
            }
            .shop-url {
                &:hover {
                    color: var(--orangeDark);
                }
            }
        }
        .order-itemInfo {
            display: inline-block;
            vertical-align: top;
            .info-img {
                display: block;
                width: 50px;
                height: 50px;
            }
            .info-msg {
                padding-left: 10px;
                vertical-align: top;
            }
            .info-title {
                width: 230px;
                display: block;
                &:hover {
                    color: var(--orangeDark);
                }
            }
            .info-detail {
                width: 325px;
                padding: 10px 0 10px 10px;
            }
            .info-cell {
                display: inline-block;
                box-sizing: content-box;
                margin-right: 1px;
            }
            .info-sku {
                width: 180px;
                display: inline-block;
                vertical-align: top;
                padding: 10px 0;
            }
            .info-price {
                
                vertical-align: top;
                display: inline-block;
                width: 160px;
                padding: 10px 0;
            }
        }
        .order-quantity {
            display: inline-block;
            vertical-align: top;
            width: 160px;
            padding: 10px 0;
            margin-right: 1px;
        }
        .item-row-discountProcessCost {
            display: inline-block;
            width: 150px;
            vertical-align: top;
            height: 75px;
            .item-row__discountProcessCost-item {
                padding: 10px 0 5px;
            }
        }
        .item-row__price {
            display: inline-block;
            width: 170px;
            padding-right: 5px;
            .item-row__price-item {
                padding: 10px 0 5px;
            }
        }
    }
    .couponUsableList {
        .el-card {
            width: 340px;
            .user i{
                transition: all 0.3s;
                cursor: pointer;
            }
            .te {
                transform: rotate(180deg);
            }
            .btn {
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                background: #FFFFFF;
                color: #606266;
                -webkit-appearance: none;
                text-align: center;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                outline: none;
                margin: 0;
                -webkit-transition: 0.1s;
                transition: 0.1s;
                font-weight: 400;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                padding: 7px 15px;
                font-size: 12px;
                border-radius: 20px;
            }
            .btn.info {
                color: #FFFFFF;
                background-color: #909399;
                &:hover {
                    background-color: #b4b6bb;
                }
            }
            .btn.checked {
                background-image: linear-gradient(135deg, #efc590 0%, #bb8d48 100%);
                color: #FFFFFF;
                &:hover {
                    background-image: linear-gradient(135deg, #ddc09c 0%, #c7a879 100%);
                }
            }
        }
    }
    
    .orderConfirmation {
        font-size: 14px;
        padding-top: 38px;
        background-color: #f7f7f7;
    }
    .orderConfirmation .top-desc {
        margin-bottom: 50px;
        padding: 20px;
        background-color: var(--white);
    }

    .address-box {
        .address-item {
            position: relative;
            width: 270px;
            height: 105px;
            padding: 10px 15px;
            background: url(//img.alicdn.com/tps/i2/T1VPiBXvpeXXbjLKQ7-237-106.png) center no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            float: left;
            margin-right: 15px;
            color: var(--darkGray);
            .addr-hd {
                width: 100%;
                border-bottom: 1px solid #f2f2f2;
                padding: 0 0 5px;
                margin-bottom: 5px;
                line-height: 18px;
                font-weight: 700;
            }
            &.active {
                background-image: url(//img.alicdn.com/tfs/TB1OVRCRpXXXXaMXFXXXXXXXXXX-237-106.png);
            }
            &:hover {
                background-image: url(//img.alicdn.com/tfs/TB1OVRCRpXXXXaMXFXXXXXXXXXX-237-106.png);
            }
            .address-msg {
                word-wrap: break-word;
                word-break: normal;
            }
            .modify {
                color: #c97;
                &:hover {
                    color: var(--orangeDark);
                }
            }
            .default-tip {
                position: absolute;
                top: 0;
                right: 0;
                padding: 0 2px;
                text-decoration: none;
                filter: alpha(opacity=70);
                opacity: .7;
                z-index: 3;
                background: #ccc;
                color: #fff;
            }
            .set-default{
                position: absolute;
                top: 0;
                right: 0;
                padding: 0 2px;
                text-decoration: none;
                filter: alpha(opacity=70);
                opacity: .7;
                z-index: 3;
                color: var(--darkGray);
                background: #fff;
                &:hover {
                    color: var(--orangeDark);
                }
            }
            .curMarker {
                z-index: 3;
                position: absolute;
                background: url(http://img.alicdn.com/tfs/TB1zLJRRpXXXXcrXXXXXXXXXXXX-30-600.png) no-repeat;
                background-position: 0 -272px;
                width: 28px;
                height: 28px;
                bottom: 1px;
                right: 1px;
            }
        }
    }
    .couponUsableList {
        .counp-icon {
            width: 15px;
        }
    }
    .settlement {
        background-color: var(--white);
        overflow: hidden;
        .settlement-box {
            .settlement-box-cenyent {
                overflow: hidden;
                padding: 20px 0;
                .jiesuan-right {
                    float: right;
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
                        font-size: 24px;
                    }
                }
            }
        }
    }

</style>
