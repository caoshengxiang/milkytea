<template>
  <div class="com-modal" v-if="visible">
    <div class="com-modal-con"
         :class="{'drawer-bottom': position == 'bottom', 'drawer-top': position == 'top', 'drawer-left': position == 'left', 'drawer-right': position == 'right' }">
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
    }
  }
</script>

<style scoped lang="less">
  .com-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    z-index: 10000;
    transform: translateZ(1px);
    background-color: rgba(0, 0, 0, 0.4);
    .com-modal-con {
      background-color: #fff;
      max-height: 100vh;
      overflow: auto;
      position: absolute;
    }
    .drawer-bottom {
      width: 100vw;
      bottom: 0;
    }
    .drawer-top {
      width: 100vw;
      top: 0;
    }
    .drawer-left {
      width: 40vw;
      left: 0;
      height: 100vh;
    }
    .drawer-right {
      width: 40vw;
      right: 0;
      height: 100vh;
    }
    .drawer-title {
      padding: 20/7.5vw;
      text-align: center;
    }
  }
</style>
