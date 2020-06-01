import request from './http'
import {domain} from '@/host_url.js'

export default class Api {
    /**
     * 获取各个部位的banner
     * channel  PC;PC,APP,GZH,XCX
     * position  pc端商品列表banner图：goods_list；pc端网站logo：pc-logo；品牌顶部图：brand-top；首页主banner区：index-banner；登陆页背景图：login-background；服务中心顶部图：service-top；首页中部图：index-middle；商品详情底部图：goods-details-button；
     * 接口地址:  account/banner/getBannersByChannel
     */
    static getBannersByChannel(data,position) {
        return request({
            url: domain.Base_URL+'/account/banner/getBannersByChannel?channel=PC&position='+position,
            method: 'get',
            params: data
        })
    }
    
    // 获取公告
    static getNoticeList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/msg/notice/findList',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 获取资讯、活动、精读文章
    static getFindList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/info/article/query',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
    // 更改公告状态
    static updateNoticeStatus(data,id,accessToken) {
        return request({
            url: domain.Base_URL+'/msg/noticeMemberMapping/updateStatus/'+id,
            method: 'POST',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
    /**
     * 获取公告详情
     * title   String Y  提醒标题
     * remark  String Y  摘要
     * content String Y  提醒内容
     * author  String Y  署名
     * status  Integer    Y  1:未读 2:已读
     * addTimeString   String Y  创建时间
     * modifyTimeString    String Y  更新时间
     */
    static getNoticeDetail(data,id) {
        return request({
            url: domain.Base_URL+'/msg/notice/queryNoticeMById/'+id,
            method: 'get',
            params: data
        })
    }

    static getArticle(data,id) {
        return request({
            url: domain.Base_URL+'/info/article/'+id,
            method: 'get',
            params: data
        })
    }

    /**
     * 获取金价
     * 服务地址：product/price/currentGoldPrice
     * 请求方式：get
     */
    static getCurrentGoldPrice(data) {
        return request({
            url: domain.Base_URL+'/product/price/currentGoldPrice',
            method: 'get',
            params: data
        })
    }

    /**
     * 获取所有首推商品
     * 服务地址：mall/goods/getAllRecommendGoods
     * 请求方式：get
     */
   static getAllRecommendGoods(data) {
        return request({
            url: domain.Base_URL+'/mall/goods/getAllRecommendGoods',
            method: 'get',
            params: data
        })
    }

    /**
     * 获取黄金商品分类 金饰品、金条
     * 接口地址:  mall/category/search
     */
    static categorySearch(data) {
        return request({
            url: domain.Base_URL+'/mall/category/search',
            method: 'get',
            params: data
        })
    }

    /**
     * 获取黄金品牌分类 INGHONG
     * 接口地址:  mall/brand/search
     */
    static brandSearch(data) {
        return request({
            url: domain.Base_URL+'/mall/brand/search',
            method: 'get',
            params: data
        })
    }

    /**
     * 获取推广角标
     * type  0: 商品标签 1:商品推广角标
     * 接口地址:  mall/label/findListByType
     */
    static labelSearch(data,type) {
        return request({
            url: domain.Base_URL+'/mall/label/findListByType?type='+type,
            method: 'get',
            params: data
        })
    }
    
    /**
     * 获取黄金分类对应的商品
     * pageNum int 否  页数
     * pageSize int 否  行数
     * categoryId 商品类型id
     * type  0: 全部 1:金条 2:金饰,不传查全部
     * 接口地址:  mall/goods/categoryList
     */
    static categoryList(data) {
        return request({
            url: domain.Base_URL+'/mall/goods/categoryList',
            method: 'get',
            params: data
        },true)
    }
    /**
     * 按条件搜索获取商品
     * pageNum int 否  页数
     * pageSize int 否  行数
     * categoryIdArr 商品类型 1:金条 2:金饰 传值格式 1,2
     * brandIdArr 品牌分类id数组 传值格式 id1,id2
     * promotionalLableIdArr 推荐标识id数组 传值格式 荐标识id1,荐标识id2
     * priceSort  0 按最小价格 1 按最大价格
     * 接口地址:  mall/goods/listMallGoods
     */
    static listMallGoods(data) {
        return request({
            url: domain.Base_URL+'/mall/goods/listMallGoods',
            method: 'get',
            params: data
        },true)
    }
    
    // 之前首页列表
    static goodsList(data) {
        return request({
            url: domain.Base_URL+'/mall/goods/list',
            method: 'get',
            params: data
        })
    }

    // 获取商品详情
    static goodsDetail(data,id) {
        return request({
            url: domain.Base_URL+'/mall/goods/'+ id,
            method: 'get',
            params: data
        },true)
    }

    /** 新增商品足迹
    * 服务地址：member/memberTraceGoods/traceGoods
    * 请求方式：post 
    * 入参：
    * source 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
    * goodsId 商品ID
    */
    static traceGoods(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/memberTraceGoods/traceGoods',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /** 
     * 获取推荐足迹商品列表
    * 服务地址：member/memberTraceGoods/getRecommendTraceGoodsList
    * 请求方式：get
    * 入参：
    * pageNum
    * pageSize
    */
    static getRecommendTraceGoodsList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/memberTraceGoods/getRecommendTraceGoodsList',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 加入购物车
    static addCart(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/shopping/trolley',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 购物车列表
    static cartList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/shopping/trolley/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 获取购物车数量
    static getCartGoodsTotal(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/shopping/trolley/goods/total',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
    // 购物车列表数量修改
    static cartListQuantity(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/shopping/trolley/quantity',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 购物车列表删除
    static removecartList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/shopping/trolley/remove',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    /**
     * 确定订单页选择可用优惠券
     * method： GET
     * 接口地址： activity/coupon/usable/list
     * transactionAmount float 是  交易额度（如果使用黄金红包代表黄金克重；如果是商城满减券代表支付金额）
     * type int 是  类型：0-黄金红包；1-回租福利券；2-商城满减券
     * leasebackDays int 否  回租期限，type等于1时此参数必填
     */
    /**
     * 返回字段意义
     * name    String Y  优惠券名称
     * type Integer Y 类型：0-黄金红包；1-回租福利券；2-商城满减券
     * amount  Double Y  红包金额或加息券加息率
     * useCondition    String Y  使用条件
     * financePeriod   Integer    Y  可用理财期限
     * tradeAmount Integer    Y  交易金额
     * indateTime  String Y  过期时间，如果为空则代表永远有效
     * status  Integer    Y  使用状态：1-未使用；2-已使用；3-已过期
     * (usedStatus)    Integer    Y  使用状态：1-未使用；2-已使用；3-已过期
     * income  Double Y  收入金额
     * mark   int   1大于等于;2等于;3大于
     * discountAmount Integer Y 折扣额度
     * transactionAmount Integer Y 交易额度
     */
    static getActivityCouponUsableList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/coupon/usable/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 个人中心优惠券列表
     * method： GET
     * 接口地址：  activity/coupon/member/list
     * type int 是  类型：0-黄金红包；1-回租福利券；2-商城满减券
     */
    /**
     * 返回字段意义
     * usedCoupons：已使用优惠券列表
     * usablenessCoupons：未使用优惠券列表
     * outdatedCoupons：过期优惠券列表
     */
    static getActivityCouponMemberList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/coupon/member/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 根据场景获取优惠券（一般是新手注册、新手第一笔支付、邀请好友好友注册成功之后发放）
     * method： GET
     * 接口地址：  activity/coupon/trigger/list
     * trigger int 是  2-提单支付成功;3-体验金购买完成；4-回租完成
     */
    static getActivityCouponTriggerList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/coupon/trigger/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /** 支付
     * 服务地址：mall/mallorder/pay
     * 请求方式：post
     * 入参：goodsInfo: 商品信息格式：[{"skuId":3,"quantity":2},{"skuId":2,"quantity":3}]；skuId：字面意义；quantity：数量
            addressId: 收货地址id
            source: 订单来源 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
            couponId: 满减券ID
            payMode: 支付模式 2支付宝 3无卡 4云闪付
    */
    static pay(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/mallorder/pay',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    /** 服务名：商城下单
    服务地址：mall/mallorder/placeorder
    请求方式：post
    入参：goodsInfo     商品信息格式：[{"skuId":3,"quantity":2},{"skuId":2,"quantity":3}]
        addressId long 是  收货地址
        source int 是  订单来源 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
        couponId int 否  满减券ID
    出参：{
        orderId：
        expireMinute:有效时间(分钟)
    }
     */
    static payPlaceorder(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/mallorder/placeorder',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    /**服务名：订单支付
    服务地址：pay/mallpaytrade/mallOrderTPay
    请求方式：post
    入参：orderId     订单编号
    payMode     支付模式 2支付宝 3无卡 4云闪付
    出参：{
        orderId：
        payData:
    }
    */
    static payMallOrderTPay(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/mallpaytrade/mallOrderTPay',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    /** 重新支付
    * pay/mallpaytrade/repay
    * 提交方式：get
    * 输入参：
    * 订单号:orderId 
    */
    static repay(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/mallpaytrade/repay',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    // 获取用户金额信息
    static getUserInfo(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/memberAccount/queryUsableAmount',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
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
    static getUserGoldenBeans(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/bean/member/statistics',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    
    /**
     * 接口用途：   金豆账户明细记录
     * method： GET
     * 接口地址：    pay/bean/member/records
     * 输入参数：
     * key 参数类型   是否必须   参数解释
     * type    int    否  类型 1:收入 2:支出 0：全部
     * pageNum int    否  当前页码（默认1）
     * pageSize    int    否  每页记录数（默认10）
     * 
     * 返回字段
     * orderNO String Y  订单号
     * type    Integer    Y  类型 1:收入 2:支出
     * remark  String Y  收支说明
     * goldBean    Integer    Y  金豆数
     * memberId    String Y  会员ID
     * goldGram    Double Y  预计兑换黄金克重
     * addTime String Y  操作时间
     * successTime String Y  到账时间
     */
    static getBeansRecords(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/bean/member/records',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 签到信息
     * 接口地址: sign/query/sign/info
     * 请求方法: GET
     * 
     * 返回字段
     * goldBean : 我的金豆数量
     * totalSign : 累计签到天数
     * signStatus : 今日签到状态0未签到 1已签到
     * signDaysList : [{"day":"2019-03-25","goldBean":10,"type":0}]
     * continueSign 连续签到天数
     */
    static getSignInfo(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/sign/query/sign/info',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 用户签到
     * 接口地址:  sign/apply
     * 请求方法: POST
     * 
     * 返回字段
     * continueSign 连续签到天数
     * goldBean 获得金豆数量
     * amount（连续签到7天，并且有神秘大奖）金额 体验金额度(g) 金豆个数 现金金额（元） 福利券（优惠额度mg）
     * type（连续签到7天，并且有神秘大奖）1.体验金、2.金豆、3.黄金红包(mg)、4.回租福利券(mg)、5.商城满减券(mg)、6.现金奖励
     */
    static getSignApply(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/sign/apply',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /** 服务名：金豆中心好礼换券信息查询
    * 服务地址：activity/gift/recommend/list
    * 请求方式：get
    * 入参：无
    */
    static getGiftList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/gift/recommend/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    /**
     * 兑换专区礼品列表（app）(/activity/gift/display/list)
     * method： GET
     * 接口地址：  ctivity/gift/display/list
     * giftType int 是  礼品类型：1-优惠礼券；2-热门权益；3-精品实物；
     * pageNum int 否  当前页码（默认1）
     * pageSize int 否  每页记录数（默认10）
     */
    static getAllGiftList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/gift/display/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }
    /**
     * 礼品兑换（app）(/activity/gift/record)
     * method： POST
     * 接口地址：  activity/gift/record
     * giftId int 是  礼品ID
     * payPassword string 是  支付密码
     */
    static giftRecord(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/gift/record',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    // 获取我的订单
    static getOrderList(data,accessToken) {
        return request({
            url: domain.Base_URL+'/mall/new/order/search',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    // 订单详情
    static getOrderDetail(data,accessToken,id) {
        return request({
            url: domain.Base_URL+'/mall/new/order/serial/' + id,
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    // 订单详情状态
    static getOrderDetail_queryOrderStatus(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/mallpaytrade/queryOrderStatus',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 订单删除
    static orderDel(data,accessToken) {
        return request({
            url: domain.Base_URL+'/pay/mallpaytrade/queryOrderStatus',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    // 获取我的地址
    static get_address(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/address/list',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    // 添加我的地址
    static add_address(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/address/add',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 修改我的地址
    static update_address(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/address/update',
            method: 'post',
            data: data,
            headers: {
                accessToken: accessToken
            }
        })
    }

    // 删除我的地址
    static del_address(data,accessToken,id) {
        return request({
            url: domain.Base_URL+'/member/address/delete/'+id,
            method: 'delete',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }
    /**
     * 5.4 会员设置交易密码   接口描述【POST】 member/memberUser/setPayPassword 请求参数
     *
     * @param payPassword String   Y  交易密码
     */
    static setPayPassword(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/memberUser/setPayPassword',
            method: 'POST',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }
    /**
     * 5.5 会员修改交易密码  接口描述【POST】 member/memberUser/updatePayPassword
     *
     * @param payPassword    String    Y  交易密码
     * @param newPayPassword String    Y  新交易密码
     */
    static updatePayPassword(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/memberUser/updatePayPassword',
            method: 'POST',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }
    /**
     * 5.5 忘记交易密码下一步操作：会员身份验证  接口描述【POST】 member/memberUser/validateMemberIdentity
     *
     * @param idCard String    Y  身份证号
     * @param name   String    Y  姓名
     * @param mobile String    Y  手机号码
     * @param code String      Y  验证码
     * @return
     */
    static validateMemberIdentity(data,accessToken) {
        return request({
            url: domain.Base_URL+'/member/memberUser/validateMemberIdentity',
            method: 'POST',
            data: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }

    /**
     * 兑换记录（app）(/activity/gift/member/record)
     * method： GET
     * 接口地址：  ctivity/gift/member/record
     * pageNum int 否  当前页码（默认1）
     * pageSize int 否  每页记录数（默认10）
     */
    static gifRrecord(data,accessToken) {
        return request({
            url: domain.Base_URL+'/activity/gift/member/record',
            method: 'get',
            params: data,
            headers: {
                accessToken: accessToken
            }
        },true)
    }
}