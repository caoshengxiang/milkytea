<!--手机滑动时透明层下的内容 不滑动-->
<template>
  <div class="com-modal" v-if="visible" catchtouchmove="preventTouchMove">
    <div class="com-modal-con" :style="{backgroundColor: backgroundColor}" :class="{'com-modal-con-haspadding': hasPadding}">
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
      backgroundColor: {
        default: '#fff',
        type: String
      },
      hasPadding: {
        default: true,
        type: Boolean
      },
    },
    methods: {
      preventTouchMove () {},
      clickCover () {
        this.$emit('coverCallback')
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
    display: flex;
    outline: 0;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transform: translateZ(1px);
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.6s;
    .com-modal-con {
      width: 630/7.5vw;
      /*background-color: #fff;*/
      border-radius: 10/7.5vw;
/*      padding: 30/7.5vw;*/
      max-height: 90vh;
      overflow: auto;
    }
    .com-modal-con-haspadding {
      padding: 30/7.5vw;
    }
  }
</style>
