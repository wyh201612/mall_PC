<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" :homeBanner='homeBanner' :loginBackground='loginBackground' :homeMiddleBanner='homeMiddleBanner' :goodsListBanner='goodsListBanner' :pcLogo='pcLogo' :brandTopBanner='brandTopBanner' :serviceTopBanner='serviceTopBanner' :goodsDetailsBanner='goodsDetailsBanner' :headerHeight='headerHeight' :goodsTotal='goodsTotal' :goldenBeansInfo='goldenBeansInfo' :payOffTotal='payOffTotal' :activityCouponMemberList='activityCouponMemberList'/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  props:{
    homeBanner:{
      type: Array
    },
    loginBackground:{
      type: Array
    },
    homeMiddleBanner:{
      type: Array
    },
    pcLogo:{
      type: Array
    },
    brandTopBanner:{
      type: Array
    },
    serviceTopBanner:{
      type: Array
    },
    goodsListBanner:{
      type: Array
    },
    goodsDetailsBanner:{
      type: Array
    },
    headerHeight:{
      type: Number
    },
    goodsTotal:{
      type: Number
    },
    goldenBeansInfo:{
      type: Object
    },
    payOffTotal:{
      type: Number
    },
    activityCouponMemberList:{
      type: Object
    },
  },
  created() {
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-main {
    overflow: hidden;
  }
</style>

