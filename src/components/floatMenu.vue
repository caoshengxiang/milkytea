<template>
  <div class="float-menu">
    <div class="activity-box-filter" @click="showCon = !showCon">
      <img class="filter-icon" src="../../static/icon/filter.png" alt=""> 筛选
    </div>
    <div class="menu-con" v-if="showCon">
      <div class="mitem" @click="mitem(true)">免费活动</div>
      <div class="mitem" @click="mitem(null)">全部活动</div>
      <div class="mitem" @click="mitem(false)">精选活动</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'floatMenu',
    data () {
      return {
        showCon: false
      }
    },
    methods: {
      mitem (isFree) {
        this.showCon = false
        this.$emit('isFree', isFree)
      }
    }
  }
</script>

<style scoped lang="less">
  .float-menu {
    display: inline-block;
    width: 180/7.5vw;
    position: relative;
    box-sizing: border-box;
    .activity-box-filter {
      font-size: 32/7.5vw;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 28/7.5vw;
        height: 32/7.5vw;
        margin-right: 20/7.5vw;
        position: relative;
        top: 4/7.5vw
      }
    }
    .menu-con {
      background-color: rgba(0, 0, 0, 0.5);
      color: #FEFEFE;
      position: absolute;
      top: 100%;
      /*left: -30/7.5vw;*/
      width: 180/7.5vw;
      font-size: 26/7.5vw;
      padding: 10/7.5vw 0;
      box-sizing: border-box;
      border-bottom-left-radius: 10/7.5vw;
      border-bottom-right-radius: 10/7.5vw;
      .mitem {
        padding: 14/7.5vw 0;
        text-align: center;
      }
    }
  }
</style>
