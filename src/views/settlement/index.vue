<template>
    <div class="main-content">
        <div class="settlement inghong-container">
            结算页
        </div>
    </div>
</template>

<script>
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    import { mapState } from 'vuex'
    export default {
        name: 'settlement',
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
                orderInfo: {}
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
            this.getOrderDetail();
        },
        destroyed() {

        },
        methods: {
            // 获取订单详情
            async getOrderDetail() {
                let _this = this;
                let data = await this.$api.getOrderDetail('',getCookie('accessToken'),this.$route.query.orderId);
                this.orderInfo = data;
            },
            /** 服务名：订单支付 ：pay/mallpaytrade/mallOrderTPay
                入参：orderId     订单编号
                payMode     支付模式 2支付宝 3无卡 4云闪付
                出参：{
                    orderId：
                    payData:
                }
            */
            async payMallOrderTPay(payMode) {
                let _this = this;
                let param = {
                    orderId: this.$route.query.orderId,   // 订单编号
                    payMode: payMode // 支付模式 2支付宝 3无卡 4云闪付
                }
                let data = await _this.$api.payMallOrderTPay(this.$qs.stringify(param),getCookie('accessToken'))
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
        }
    }

</script>

<style lang="scss" scoped>
    .settlement{
        padding: 20px;
        background-color: var(--white);
    }
</style>
