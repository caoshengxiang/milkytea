<!--我的活动-->
<template>
  <!--<a class="activity-box-list-2-item"-->
  <!--hover-class="none"-->
  <!--:href="'/pages/package/activityDetail/main?id='+ activity.goodsId"-->
  <!--:style="{borderTop: topLine?borderColor:'', borderBottom: bottomLine?borderColor:''}">-->
  <a class="activity-box-list-2-item"
     hover-class="none"
     @click="toPageDetail"
     :style="{borderTop: topLine?borderColor:'', borderBottom: bottomLine?borderColor:''}">
    <div class="order-time">{{orderTime}}</div>
    <div class="box">
      <div class="activity-img-box">
        <img
          class="activity-img"
          :src="activity.listCover"/>
        <div v-if="activity.vipFree" class="tag-img">言选会员免费</div>
      </div>
      <div class="activity-box-con">
        <div class="font-height">
          <div class="con-1"><span style="color: #1A1A1A;">{{date}}</span><span class="con-1-s">{{week}}</span></div>
          <div class="activity-title-name">{{activity.goodsName}}</div>
          <div class="con-3">{{activity.shop}}</div>
        </div>
        <div class="con-4">
<!--          <a hover-class="none"
             :href="'/pages/package/myActivityView/main?orderId='+ activity.orderId +'&id='+activity.goodsId"
             class="activity-view">查看详情</a>-->
          <a hover-class="none"
             @click.stop="toPageViewDetail"
             class="activity-view">查看详情</a>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
  import { getMyDay, formatTimeFormat } from '../../utils'

  export default {
    name: 'activityCard3',
    data () {
      return {
        borderColor: '1px solid #E6E6E6'
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
      orderTime () {
        let orderTime = this.activity.orderTime
        return formatTimeFormat(orderTime, 'YYYY-MM-DD HH:mm:ss')
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
      toPageDetail () {
        wx.navigateTo({
          url: '/pages/package/activityDetail/main?id=' + this.activity.goodsId
        })
      },
      toPageViewDetail () {
        wx.navigateTo({
          url: '/pages/package/myActivityView/main?orderId=' + this.activity.orderId + '&id=' + this.activity.goodsId
        })
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../../static/style/common";

  .activity-box-list-2-item {
    padding: 18/7.5vw 0 40/7.5vw 0;
    /*border-top: 1px solid #E6E6E6;*/
    .order-time {
      padding: 20/7.5vw 0;
      color: #666666;
      font-size: 26/7.5vmin;
      margin-bottom: 30/7.5vw;
    }
    .box {
      display: flex;
    }
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
        font-size: 26/7.5vw;
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
        margin-top: 10/7.5vw;
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
  }
</style>
