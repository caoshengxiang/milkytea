<!--待支付活动-->
<template>
  <div class="my-order" :style="{borderTop: topLine?borderColor:'', borderBottom: bottomLine?borderColor:''}">
    <div class="order-item-top">
      <span class="title">{{orderEndTime}}</span>
      <span class="moy">等待支付    {{activity.goodsPrice * activity.signPersons}}</span>
    </div>
    <a  hover-class="none"
        :href="'/pages/package/activityDetail/main?id='+ activity.goodsId"
        class="activity-box-list-2-item">
      <div class="activity-img-box">
        <img
          class="activity-img"
          :src="activity.listCover"/>
        <div v-if="activity.vipFree" class="tag-img">言选会员免费</div>
      </div>
      <div class="activity-box-con">
        <div class="con-1"><span style="color: #1A1A1A;">{{date}}</span><span class="con-1-s">{{week}}</span></div>
        <div class="activity-title-name">{{activity.goodsName}}</div>
        <div class="con-3">{{activity.shop}}</div>
      </div>
      <div class="num-box">
        <div class="m"><span class="icon">￥</span>{{activity.goodsPrice ? activity.goodsPrice : '免费'}}</div>
        <div class="num">x {{activity.signPersons}}</div>
      </div>
    </a>
    <div class="order-pay-box">
      <div class="total-box">
        <span class="text">总计： ￥</span><span class="mo">{{activity.goodsPrice * activity.signPersons}}</span>
      </div>
      <div class="con-4">
        <a hover-class="none"
           class="activity-view" @click="payment">去支付</a>
        <a hover-class="none" @click="cancelOrder"
           class="has-activity">取消订单</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { getMyDay, formatTimeFormat } from '../../utils'
  import API from '../../utils/api'

  export default {
    name: 'activityCard4',
    data () {
      return {
        borderColor: '1px solid #E6E6E6',
        // orderEndTime: '00:00:00'
      }
    },
    computed: {
      week () {
        let activityStart = this.activity.activityStart
        return getMyDay(activityStart)
      },
      date () {
        let activityStart = this.activity.activityStart
        return formatTimeFormat(activityStart, 'MM/DD')
      },
      orderEndTime () {
        let timeStamp = this.activity.payDeadline
        return formatTimeFormat(timeStamp)
      }
    },
    components: {},
    props: {
      topLine: {
        default: false,
        type: Boolean
      },
      bottomLine: {
        default: false,
        type: Boolean
      },
      activity: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      // orderEndTimeFun () {
      //   let currentStamp = new Date().getTime()
      //   let timeStamp = this.activity.payDeadline
      //   let time = timeStamp - currentStamp
      //   let Timer = setInterval(() => {
      //     if (currentStamp <= 0) {
      //       clearInterval(Timer)
      //     }
      //     this.orderEndTime = formatTimeFormat(time, 'HH:mm:ss')
      //   }, 1000)
      // },
      cancelOrder () {
        const that = this
        wx.showModal({
          title: '提示',
          content: '确定取消订单',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              API.order.cancelOrder({orderId: that.activity.orderId}).then(da => {
                if (da.status) {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'none',
                    duration: 2000
                  })
                  that.$emit('cancelOrder')
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      payment () {
        console.log(this.activity)
        wx.navigateTo({
          url: `/pages/package/checkout/main?orderId=${this.activity.orderId}&checkoutType=activity&goodid=${this.activity.goodsId}`
        })
      }
    },
    mounted () {
      // this.orderEndTimeFun()
    }
  }
</script>
<style scoped lang="less">
  @import "../../../static/style/common";

  .my-order {
    .order-item-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20/7.5vw 0;
      .title {
        color: #666666;
        font-size: 26/7.5vmin;
      }
      .moy {
        color: #FF0000;
        font-size: 24/7.5vw;
      }
    }
  }

  .activity-box-list-2-item {
    padding: 31/7.5vw 0;
    display: flex;
    /*border-top: 1px solid #E6E6E6;*/
    .activity-img-box {
      position: relative;
      .activity-img {
        width: 208/7.5vw;
        height: 286/7.5vw;
        border-radius: 10/7.5vw;
      }
      .tag-img {
        position: absolute;
        bottom: 20/7.5vw;
        right: -16/7.5vw;
        padding-right: 10/7.5vw;
        box-sizing: border-box;
        color: #ffffff;
        font-size: 20/7.5vw;
        background-image: url("../../../static/icon/001.png");
        background-repeat: no-repeat;
        background-size: 160/7.5vw 50/7.5vw;
        width: 160/7.5vw;
        height: 50/7.5vw;
        line-height: 34/7.5vw;
        text-align: center;
      }
    }
    .activity-box-con {
      /*width: 448/7.5vw;*/
      flex: 1;
      margin-left: 31/7.5vw;
      .font-height {
        height: 220/7.5vw;
        box-sizing: border-box;
      }
      .con-1 {
        font-size: 3.73333333vw;
        .con-1-s {
          color: #666666;
          margin-left: 4vw;
        }
      }
      .activity-title-name {
        font-size: 30/7.5vw;
        font-weight: bold;
        color: #1A1A1A;
        margin-top: 22/7.5vw;
        margin-bottom: 22/7.5vw;
        line-height: 44/7.5vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .con-3 {
        font-size: 26/7.5vw;
        color: #666666;
      }
      .con-4 {
        .has-activity {
          width: 140/7.5vw;
          height: 60/7.5vw;
          line-height: 60/7.5vw;
          text-align: center;
          border: 1px solid #ffe23e;
          font-size: 24/7.5vw;
          color: #1a1a1a;
          float: right;
          border-radius: 30/7.5vw;
        }
        .activity-view {
          width: 140/7.5vw;
          height: 60/7.5vw;
          line-height: 60/7.5vw;
          text-align: center;
          background: linear-gradient(90deg, #ffe445 0%, #fccd1b 100%);
          font-size: 24/7.5vmin;
          color: #1A1A1A;
          border-radius: 30/7.5vw;
          float: right;
        }
      }
    }
    .num-box {
      width: 120/7.5vw;
      text-align: right;
      .m {
        color: #1A1A1A;
        font-size: 32/7.5vmin;
        .icon {
          font-size: 20/7.5vmin;
        }
      }
      .num {
        color: #999999;
        font-size: 20/7.5vmin;
        margin-top: 20/7.5vw;
      }
    }
  }

  .order-pay-box {
    color: #1A1A1A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 31/7.5vw 0;
    border-top: 1px solid #E6E6E6;
    .total-box {
      .text {
        font-size: 24/7.5vmin;
      }
      .mo {
        font-size: 32/7.5vmin;
        font-weight: bold;
      }
    }
    .con-4 {
      .has-activity {
        width: 140/7.5vw;
        height: 60/7.5vw;
        line-height: 60/7.5vw;
        text-align: center;
        border: 1px solid #ffe23e;
        font-size: 24/7.5vw;
        color: #1a1a1a;
        float: right;
        border-radius: 30/7.5vw;
      }
      .activity-view {
        width: 140/7.5vw;
        height: 60/7.5vw;
        line-height: 60/7.5vw;
        text-align: center;
        background: linear-gradient(90deg, #ffe445 0%, #fccd1b 100%);
        font-size: 24/7.5vmin;
        color: #1A1A1A;
        border-radius: 30/7.5vw;
        float: right;
        margin-left: 50/7.5vw;
      }
    }
  }
</style>
