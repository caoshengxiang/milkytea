<template>
  <div class="weui-loadmore" v-if="loading">
    <div class="weui-loading" v-if="!lastPage"></div>
    <div class="weui-loadmore__tips" v-if="!lastPage">正在加载</div>
    <div class="weui-loadmore__tips" v-if="lastPage">- 已经到底啦 -</div>
  </div>
</template>

<script>
  export default {
    name: 'loadMore',
    data () {
      return {}
    },
    props: {
      loading: {
        type: Boolean,
        default: true
      },
      lastPage: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import url('../../static/style/common');
</style>
