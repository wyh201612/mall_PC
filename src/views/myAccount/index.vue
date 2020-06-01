<template>
    <div class="MyAccount-container">
        <div class="main inghong-container">
            <section class="el-container">
                <Aside />
                <main class="el-main">
                    <router-view :activityCouponMemberList='activityCouponMemberList' :goldenBeansInfo='goldenBeansInfo' :payOffTotal='payOffTotal' />
                </main>
            </section>
        </div>
    </div>
</template>

<script>
    import Aside from './components/aside.vue'
    export default {
        name: 'MyAccount',
        components: {
            Aside
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

            }
        },
        watch: {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {

        }
    }

</script>

<style lang="scss" scoped>
    .MyAccount-container {
        overflow: hidden;
        .main {
            overflow: hidden;
            margin-top: 40px;
            margin-bottom: 40px;
            background-color: var(--white);
        }
    } 
</style>
