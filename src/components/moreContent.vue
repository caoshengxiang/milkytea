<template>
  <div id="content" class="com-more-content" :style="{height: isMore?'auto':contentHeight}">
    <slot></slot>
    <div id="get-ct-more" class="get-ct-more-box" @click="moreHandle" v-if="!isMore">
      <div class="more-btn">展开全部 <img src='../../static/icon/more.png' class="more-bt-icon" id="more-bt"></div>
    </div>
    <div class="close-more" v-if="isMore" @click="isMore = false">收起</div>
  </div>
</template>

<script>
  export default {
    name: 'moreContent',
    data () {
      return {
        isMore: false
      }
    },
    props: {
      contentHeight: {
        default: '30vw',
        type: String
      }
    },
    methods: {
      moreHandle () {
        this.isMore = true
      }
    }
  }
</script>

<style scoped lang="less">
 @import "../../static/style/common";
</style>
