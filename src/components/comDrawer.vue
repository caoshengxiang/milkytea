<template>
  <div class="com-modal" v-if="visible" catchtouchmove="preventTouchMove" @click="clickCover">
    <div class="com-modal-con"
         @click.stop="clickDrawer"
         :class="{'drawer-bottom': position == 'bottom', 'drawer-top': position == 'top', 'drawer-left': position == 'left', 'drawer-right': position == 'right' }">
      <!--<slot name="title"><div class="drawer-title">{{title}}</div></slot>-->
      <slot>test</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comModal',
    data () {
      return {}
    },
    props: {
      visible: {
        default: false,
        type: Boolean
      },
      title: {
        default: ''
      },
      position: { // top,left,right,bottom, 默认bottom
        default: 'bottom',
        type: String
      }
    },
    methods: {
      preventTouchMove () {},
      clickCover () {
        this.$emit('coverCallback')
      },
      clickDrawer () {
      }
    }
  }
</script>

<style scoped lang="less">
  @import url('../../static/style/common');
</style>
