<template>
  <div class="back-home" v-if="isShowFloatBtnCpt">
    <a hover-class="none" open-type="switchTab" href="/pages/index/main">
      <img mode="widthFix" class="back-home-icon" src="../../static/images/home.png" alt="">
    </a>
  </div>
</template>

<script>
  export default {
    name: 'backHomeBar',
    data () {
      return {
        // isShowFloatBtn: true
      }
    },
    computed: {
      isShowFloatBtnCpt () {
        // let options = wx.getLaunchOptionsSync()
        // console.log('场景值cptd', options, typeof options.scene)
        // if (options.scene === 1036 || options.scene === 1046 || options.scene === 1047 || options.scene === 1048 || options.scene === 1049) {
        return true
        // } else {
        //   return true
        // }
      }
    }
  }
</script>

<style scoped lang="less">
  .back-home {
    position: fixed;
    bottom: 160/7.5vw;
    right: 30/7.5vw;
    text-align: center;
    .back-home-icon {
      width: 70/7.5vw;
      height: 70/7.5vw;
    }
  }
</style>
