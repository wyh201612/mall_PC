<template>
    <div style="overflow: hidden;">
        <div class="viewInvoice inghong-container">
            <div style="padding: 20px 10px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/myAccount/myOrderList' }">我的订单</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/myAccount/orderDetail',query: {orderId: orderId} }">订单详情</el-breadcrumb-item>
                    <el-breadcrumb-item>发票详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
    </div>
</template>

<script>
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { computedLastPayTime } from '@/utils/index';
export default {
    name: 'viewInvoice',
    components: {

    },
    data() {
        return {
            orderId: ''
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        this.orderId = this.$route.query.orderId;
    },
    methods: {
        
    },
    beforeDestroy() {
        
    }
}
</script>
<style lang="scss">
    .viewInvoice {
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

    .viewInvoice {
        margin-bottom: 40px;
        margin-top: 40px;
        background-color: var(--white);
    }
</style>