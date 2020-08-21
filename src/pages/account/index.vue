<template>
  <div class="my-page">
    my
  </div>
</template>

<script>
  // import { isLogin, autoLogin } from '../../utils/index'
  // import API from '../../utils/api'

  export default {
    data () {
      return {
        isLogin: false,
        userInfo: {},
        banner: [],
        allRights: [],
        staticPage: null
      }
    },
    methods: {
    },
    // 小程序
    onShow () {
    }
    // onShareAppMessage (res) { // 分享
    //   console.log(res, '=====>>>>>')
    // if (res.from !== 'button') return false
    // return {
    //   title: '',
    //   path: '',
    //   imageUrl: ''
    // }
    // }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/style/common";

  .my-page {
    .top-box {
      background-color: #f2f2f2;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40/7.5vw 31/7.5vw 0 31/7.5vw;
        .u-box {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 140/7.5vw;
          .u-img {
            width: 140/7.5vw;
            height: 140/7.5vw;
            border-radius: 50%;
          }
          .u-info {
            margin-left: 20/7.5vw;
            .name {
              font-size: 36/7.5vmin;
              color: #1A1A1A;
            }
            .level {
              margin-top: 10/7.5vw;
              .level-name {
                color: #1A1A1A;
                font-size: 20/7.5vmin;
                padding: 1px 8/7.5vw;
                border: 1px solid #1A1A1A;
                border-radius: 10/7.5vw;
              }
            }
            .login-btn {
              color: #fff;
              font-size: 24/7.5vw;
              border: 1px solid #fff;
              border-radius: 12/7.5vw;
            }
          }
        }
      }
      .u-right {
        text-align: right;
        .code-img {
          width: 62/7.5vw;
          height: 62/7.5vw;
          margin-bottom: 10/7.5vw;
        }
        .open-m {
          position: relative;
          right: -31/7.5vw;
          background: linear-gradient(90deg, #383837, #171511);
          color: #F6E7B3;
          box-sizing: border-box;
          width: 196/7.5vw;
          height: 64/7.5vw;
          line-height: 64/7.5vw;
          text-align: center;
          font-size: 24/7.5vw;
          border-bottom-left-radius: 32/7.5vw;
          border-top-left-radius: 32/7.5vw;
        }
      }

      .all-rights {
        width: 260/7.5vw;
        height: 34/7.5vw;
        overflow: hidden;
        .right-item {
          width: 100%;
          /*background-color: red;*/
          /*      border-radius: 10/7.5vw;*/
        }
      }
      .member-enter {
        margin: 60/7.5vw auto 10/7.5vw auto;
        width: 688/7.5vw;
        box-sizing: border-box;
        height: 100/7.5vw;
        background: linear-gradient(90deg, #373124, #423e35);
        border-radius: 10/7.5vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30/7.5vw;
        padding-right: 10/7.5vw;
        .rights {
          display: flex;
          align-items: center;
        }
        .member-enter-i {
          display: inline-block;
          color: #FAF7D7;
          font-size: 30/7.5vw;
        }
        .member-enter-t2 {
          margin-left: 20/7.5vw;
          flex: 1;
          width: 100%;
        }
        .member-enter-btn {
          border: 1px solid #FAF7D7;
          border-radius: 20/7.5vw;
          font-size: 24/7.5vw;
          padding: 5/7.5vw 10/7.5vw;
        }
      }
    }
    .box2 {
      padding: 24/7.5vw;
      .text-1 {
        font-size: 36/7.5vw;
      }
      .text-2 {
        width: 100%;
        text-align: center;
        position: relative;
      }
      .recharge {
        background-color: #ef2727;
        padding: 5/7.5vw 5/7.5vw;
        line-height: 28/7.5vw;
        border-radius: 5/7.5vw;
        color: #fff;
        position: absolute;
        right: 10/7.5vw;
        top: 6/7.5vw;
      }
    }
    .line {
      height: 14/7.5vw;
      width: 100vw;
      background-color: #f2f2f2;
    }
  }

  .banner-ad3 {
    width: 750/7.5vw;
    height: 103/7.5vw;
    overflow: hidden;
    .banner-img {
      width: 100%;
      height: 100%;
      /*      border-radius: 10/7.5vw;*/
    }
  }
</style>
<style lang="less">
  .box2-item {
    text-align: center;
    font-size: 28/7.5vw;
    line-height: 56/7.5vw;
  }

  .box2-item-2 {
    text-align: center;
    font-size: 28/7.5vw;
    line-height: 56/7.5vw;
    border-left: 1px solid #E6E6E6;
    border-right: 1px solid #E6E6E6;
  }

  .grid-item {
    padding: 30/7.5vw 0 !important;
    font-size: 28/7.5vw;
    &.grid-item-1 {
      border-top: 1px solid #E6E6E6;
      border-right: 1px solid #E6E6E6;
    }
    &.grid-item-2 {
      border-top: 1px solid #E6E6E6;
    }
    img {
      width: 60/7.5vw;
      height: 60/7.5vw;
    }
  }
</style>
