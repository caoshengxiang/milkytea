<template>
  <a class="activity-box-list-1-item" hover-class="none" :href="'/pages/package/activityDetail/main?id='+ activity.id">
    <div class="activity-img-box">
      <img
        class="activity-img"
        :src="activity.detailCover"/>
      <div class="tag-img" v-if="activity.vipFree">言选会员免费</div>
    </div>
    <div class="activity-box-con">
      <div style="margin-top: 2vw;font-size: 3.7333333vw;"><span style="color: #1A1A1A;">{{ date }}</span><span
        style="color: #666666;margin-left: 4vw;">{{ week }}</span></div>
      <div class="activity-title-name">{{activity.name}}</div>
      <div style="font-size: 3.733333vw;color: #666666;">{{activity.shop}}</div>
      <div class="btn-box">
        <a v-if="activity.signIn" hover-class="none"
           class="has-activity">已报名</a>
        <a v-if="!activity.signIn" hover-class="none"
           class="activity-view">去报名</a>

        <!--<a hover-class="none" href="/pages/package/activityView/main" class="activity-view">查看详情</a>-->
      </div>
    </div>
  </a>
</template>

<script>
  import { getMyDay, formatTimeFormat } from '../../utils/index'

  export default {
    name: 'activityCard1',
    data () {
      return {}
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
    props: {
      activity: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {},
    methods: {}
  }
</script>

<style scoped lang="less">
  .activity-box-list-1-item {
    padding: 48/7.5vw 0 40/7.5vw 0;
    .activity-img-box {
      position: relative;
      .activity-img {
        width: 688/7.5vw;
        height: 320/7.5vw;
        border-radius: 10/7.5vw;
      }
      .tag-img {
        position: absolute;
        top: 0;
        color: #ffffff;
        font-size: 20/7.5vw;
        background-color: #ff7b62;
        border-top-left-radius: 10/7.5vw;
        width: 144/7.5vw;
        height: 40/7.5vw;
        line-height: 40/7.5vw;
        text-align: center;
      }
    }
    .activity-box-con {
      clear: both;
      .activity-title-name {
        font-size: 30/7.5vw;
        font-weight: bold;
        color: #1A1A1A;
        margin: 12/7.5vw 0;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .btn-box {
        height: 9vw;
        margin-top: 4/7.5vw;
      }
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
</style>
