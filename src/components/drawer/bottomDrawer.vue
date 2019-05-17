<template>
  <div class="com-modal" v-if="visible" catchtouchmove="preventTouchMove" @click="clickCover">
    <div class="com-modal-con"
         @click.stop="clickDrawer"
         :class="{'drawer-bottom': position == 'bottom', 'drawer-top': position == 'top', 'drawer-left': position == 'left', 'drawer-right': position == 'right' }">
      <div class="payment-box">
        <div class="payment-box-title">
          <div class="box-title">
            <span class="title">{{title}}</span>
            <img @click="closeHandle" mode="widthFix" class="close" src="../../../static/icon/close.png" alt="">
          </div>
          <img v-if="titleBottomLine" mode="widthFix" class="line" src="../../../static/icon/line1px.png">
        </div>
      </div>
      <div class="con"><slot>test</slot></div>
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
      titleBottomLine: {
        default: true,
        type: Boolean
      },
      title: {
        default: ''
      },
      position: { // 默认bottom
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
      },
      closeHandle () {
        this.$emit('close')
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
      overflow: scroll;
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

    /*标题*/
    .payment-box {
      color: #1A1A1A;
      box-sizing: border-box;
      padding: 40/7.5vw 31/7.5vw;
      .payment-box-title {
        text-align: center;
        position: relative;
        .box-title {
          .title {
            font-size: 36/7.5vmin;
          }
          .close {
            position: absolute;
            top: 0;
            right: 0;
            width: 26/7.5vw;
            height: 26/7.5vw;
            padding: 10/7.5vw 10/7.5vw 10/7.5vw 30/7.5vw;
          }
        }
        .line {
          width: 100%;
        }
      }
    }
    .con {
      padding: 0 31/7.5vw;
      box-sizing: border-box;
    }
  }
</style>
