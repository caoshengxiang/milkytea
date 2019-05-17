<!--活动列表小图-->
<template>
  <a class="activity-box-list-2-item" :href="'/pages/package/activityDetail/main?id='+ activity.id" hover-class="none"
     :style="{borderTop: topLine?borderColor:'', borderBottom: bottomLine?borderColor:''}">
    <div class="activity-img-box">
      <img
        class="activity-img"
        :src="activity.listCover"/>
      <div v-if="activity.vipFree" class="tag-img">言选会员免费</div>
    </div>
    <div class="activity-box-con">
      <div class="font-height">
        <div class="con-1"><span style="color: #1A1A1A;">{{date}}</span><span class="con-1-s">{{week}}</span></div>
        <div class="activity-title-name">{{activity.name}}</div>
        <div class="con-3">{{activity.shop}}</div>
      </div>
      <div class="con-4">
        <a hover-class="none" v-if="activity.signIn"
           class="has-activity">已报名</a>
        <a hover-class="none" v-if="!activity.signIn"
           class="activity-view">去报名</a>
      </div>
    </div>
  </a>
</template>

<script>
  import { getMyDay, formatTimeFormat } from '../../utils/index'

  export default {
    name: 'activityCard2',
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
    }
  }
</script>
<style scoped lang="less">
  @import "../../../static/style/common";

  .activity-box-list-2-item {
    padding: 48/7.5vw 0 40/7.5vw 0;
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
        line-height: 36/7.5vw;
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
