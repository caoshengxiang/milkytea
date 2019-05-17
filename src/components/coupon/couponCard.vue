<template>
  <div class="coupon-item" :style="{backgroundColor: coupon.state === 2 || coupon.state === 3 ? '#CDCDCD': '#ffffff'}">
    <div class="top-box">
      <div class="left">
        <span class="icon">￥</span>
        <span class="moy">{{couponValueCpt}}</span>
        <span class="name">{{coupon.title}}</span>
      </div>
      <!--ALREADY_GOT(1, "已领取"),
EXPIRED(2, "已过期"),
OVER(3, "已抢光"),
WAITING_GET(4, "待领取"),-->
      <div class="btn" v-if="coupon.state === 4" @click="getCoupon(coupon.id)">立即领取</div>
      <div v-if="coupon.state !== 4" class="btn-placeholder"></div>
      <img v-if="coupon.state === 1" class="status-icon" src="../../../static/images/coupon/1.png" alt="">
      <img v-if="coupon.state === 2" class="status-icon" src="../../../static/images/coupon/2.png" alt="">
      <img v-if="coupon.state === 3" class="status-icon" src="../../../static/images/coupon/3.png" alt="">
    </div>
    <div class="schedule-box">
      <div class="schedule">
        <div class="activity" :style="{width: coupon.rate}"></div>
        <span class="text-l">已抢{{coupon.getsCount}}张</span>
        <span class="text-r">{{coupon.rate}}</span>
      </div>
      <div class="info" @click="showInfo">
        <span>使用说明</span>
        <img v-if="visibility" mode="widthFix" class="info-icon" src="../../../static/images/coupon/arrow-up.png"
             alt="">
        <img v-else mode="widthFix" class="info-icon" src="../../../static/images/coupon/arrow-down.png" alt="">
      </div>
    </div>
    <div class="info-text" v-if="visibility">
      {{coupon.content ? coupon.content : ''}}
    </div>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import { isLogin, toLoginPage } from '../../utils'

  export default {
    name: 'couponCard',
    data () {
      return {
        visibility: false
      }
    },
    props: {
      coupon: {
        type: Object,
        default () {
          return {}
        }
      },
      ruleId: ''
    },
    computed: {
      couponValueCpt () {
        let c = this.coupon
        if (c.couponValue) {
          return parseInt(c.couponValue, 10)
        } else {
          return c.couponValue
        }
      }
    },
    methods: {
      showInfo () {
        this.visibility = !this.visibility
      },
      getCoupon (couponId) {
        if (!isLogin()) {
          toLoginPage()
          return
        }
        wx.showLoading({
          title: '领取中...',
          mask: true
        })
        API.account.getCoupon({
          ruleId: this.ruleId,
          couponId: couponId
        }).then(da => {
          if (da.status) {
            this.$emit('getCouponSuccess')
            wx.showToast({
              title: '领取成功',
              icon: 'none',
              duration: 2000
            })
          } else {
            // setTimeout(() => {
            //   wx.showToast({
            //     title: '领取失败',
            //     icon: 'none',
            //     duration: 2000
            //   })
            // }, 2000)
          }
          setTimeout(() => {
            wx.hideLoading()
          }, 2000)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .coupon-item {
    color: #1A1A1A;
    margin-bottom: 32/7.5vw;
    /*border: 1px solid #E6E6E6;*/
    background-color: #ffffff;
    padding: 24/7.5vw;
    box-sizing: border-box;
    position: relative;
    .top-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .left {
        flex: 1;
        display: flex;
        align-items: flex-end;
        .icon {
          font-size: 30/7.5vmin;
          font-weight: bold;
          position: relative;
          top: -16/7.5vw;
        }
        .moy {
          font-size: 80/7.5vmin;
          font-weight: bold;
        }
        .name {
          font-size: 28/7.5vmin;
          margin-left: 24/7.5vw;
          position: relative;
          top: -16/7.5vw;
        }
      }

      .btn {
        background: linear-gradient(90deg, #ffe445 0%, #fccd1b 100%);
        width: 124/7.5vw;
        height: 40/7.5vw;
        line-height: 40/7.5vw;
        text-align: center;
        border-radius: 5/7.5vw;
        font-size: 24/7.5vmin;
        margin-left: 26/7.5vw;
        margin-top: 20/7.5vw;
      }
      .btn-placeholder {
        width: 124/7.5vw;
        height: 40/7.5vw;
      }
      .status-icon {
        width: 186/7.5vw;
        height: 183/7.5vw;
        position: absolute;
        right: 0;
      }
    }
    .schedule-box {
      margin-top: 68/7.5vw;
      position: relative;
      .schedule {
        width: 203/7.5vw;
        height: 28/7.5vw;
        background-color: #fef5d2;
        font-size: 20/7.5vmin;
        position: relative;
        border-radius: 14/7.5vw;
        .activity {
          border-radius: 14/7.5vw;
          float: left;
          background-color: #fee038;
          height: 100%;
          width: 0%;
        }
        .text-l {
          position: absolute;
          left: 10/7.5vw;
        }
        .text-r {
          position: absolute;
          right: 10/7.5vw;
          font-size: 20/7.5vmin;
        }
      }
      .info {
        color: #666666;
        font-size: 20/7.5vmin;
        position: absolute;
        right: 0;
        top: 0/7.5vw;
        .info-icon {
          width: 15/7.5vw;
          height: 12/7.5vw;
          margin-left: 5/7.5vw;
        }
      }
    }
    .info-text {
      color: #666666;
      margin-top: 35/7.5vw;
      border-top: 1px dashed #999999;
      padding-top: 24/7.5vw;
      font-size: 24/7.5vw;
    }
  }
</style>
