<template>
  <div class="com-pages home-page">
    <div class="search-box">
      <!--      <img mode="widthFix" style="width: 5.6666667vw;height: 5.6666667vw;" src="../../../static/icon/search.png" alt="">-->
      <!--<a href="/pages/package/couponCollection/main?id=8">test test test test</a>-->
      <!--<a href="/pages/fromCode/main?gzhstaffcode=8">test test test test</a>-->
      <!--<a href="/pages/package/webView/main?url=https://www.baidu.com/s?ie=UTF-8&wd=wx.miniProgram.navigateTo">test test test test</a>-->
    </div>
    <swiper
      v-if="banner && banner.length"
      :indicator-dots="banner.length > 1 ? true : false"
      indicator-color="#cccccc"
      indicator-active-color="#000000"
      autoplay="true"
      interval="3000"
      duration="500"
      circular="true"
      class="banner">
      <div v-for="(item, index) in banner" :key="index" class="banner-img-item">
        <a hover-class="none" :href="item.url" @click="adClickhandle(item)">
          <swiper-item>
            <img :src="item.adImg" class="banner-img"/>
          </swiper-item>
        </a>
      </div>
    </swiper>

    <div class="member-enter">
      <div class="rights">
        <span class="member-enter-i member-enter-t1" v-if="userInfo.vip">您已是言选会员享</span>
        <span class="member-enter-i member-enter-t1" v-else>开通言选会员享</span>
        <swiper
          :indicator-dots="false"
          indicator-color="#cccccc"
          indicator-active-color="#000000"
          :autoplay="true"
          interval="3000"
          :duration="700"
          circular="true"
          :vertical="true"
          class="all-rights">
          <div v-for="(item, index) in allRights" :key="index" class="right-item">
            <swiper-item style="line-height: 4.733333vw">
              <div class="member-enter-i member-enter-t2 com-over-dashed"> {{item.name}}</div>
            </swiper-item>
          </div>
        </swiper>
      </div>
      <a hover-class="none" href="/pages/package/member/main">
        <span class="member-enter-i member-enter-btn" v-if="userInfo.vip"> 查看权益</span>
        <span class="member-enter-i member-enter-btn" v-else> 立即开通</span>
      </a>
    </div>
    <div class="rights-box">
      <div class="com-flex">
        <div class="com-flex-item com-flex-item-4">
          <div class="rights-box-item">
            <a hover-class="none" href="/pages/package/activity/main">
              <img class="rights-box-img" src="../../../static/icon/home-1.png"/>
              <div class="rights-box-title">大咖活动</div>
            </a>
          </div>
        </div>
        <div class="com-flex-item com-flex-item-4">
          <div class="rights-box-item">
            <a hover-class="none" @click="routePage('/pages/package/scores/main')">
              <img class="rights-box-img" src="../../../static/icon/home-2.png"/>
              <div class="rights-box-title">签到积分</div>
            </a>
          </div>
        </div>
        <div class="com-flex-item com-flex-item-4">
          <div class="rights-box-item">
            <a hover-class="none" @click="navigateToMiniProgram">
              <img class="rights-box-img" src="../../../static/icon/home-3.png"/>
              <div class="rights-box-title">礼品卡</div>
            </a>
          </div>
        </div>
        <div class="com-flex-item com-flex-item-4">
          <div class="rights-box-item">
            <a hover-class="none" href="/pages/package/member/main">
              <img class="rights-box-img" src="../../../static/icon/home-4.png"/>
              <div class="rights-box-title">言选会员</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 4.13333333vw;">
      <swiper
        v-if="banner2 && banner2.length"
        :indicator-dots="false"
        indicator-color="#cccccc"
        indicator-active-color="#000000"
        autoplay="true"
        interval="5000"
        duration="1000"
        circular="true"
        class="banner-ad1">
        <div v-for="(item, index) in banner2" :key="index" class="" @click="adClickHandle(item)">
          <!-- <navigator url="/pages/webview/webview?url={{item.jumpLink}}">  -->
          <a hover-class="none" :href="item.url">
            <swiper-item>
              <img :src="item.adImg" class="banner-img"/>
            </swiper-item>
          </a>
        </div>
      </swiper>
    </div>
    <div class="activity-box">
      <div class="activity-box-top">
        <span class="activity-box-title">最新活动</span>
        <a hover-class="none" href="/pages/package/activity/main" class="activity-box-more">更多 <img
          src="../../../static/icon/jiantou.png" alt=""></a>
      </div>
      <div class="activity-box-list-1" v-if="activityList.length">
        <activity-card1 :activity="activityList[0]"></activity-card1>
      </div>
      <div class="activity-box-list-2">
        <activity-card2 v-if="index != 0" :activity="item" :topLine="true" v-for="(item, index) in activityList"
                        :key="index"></activity-card2>
      </div>
      <data-null v-if="isDataNull"></data-null>
    </div>

    <com-modal title="" :visible="visible" background-color="rgba(255, 255, 255, 255, 0)">
      <div class="new-people-coupon">
        <div class="gift-box">
          <img class="gift-img" src="../../../static/icon/gift-xxx.png" alt="">
          <div class="coupon-font-1">新客惊喜红包</div>
          <div class="coupon-font-2">与你的每一次相遇都该充满惊喜</div>
          <div class="coupon-font-3"><span class="coupon-font-3-m">20</span><span>元</span></div>
          <div class="coupon-btn-box">
            <div class="coupon-btn" @click="login">立即领取</div>
          </div>
        </div>
        <div class="close-box">
          <img class="close-icon" @click="visible = false" src="../../../static/icon/x.png" alt="">
        </div>
      </div>
    </com-modal>

    <!--<div class="weui-loadmore">-->
    <!--<div class="weui-loading" v-if="!lastPage"></div>-->
    <!--<div class="weui-loadmore__tips" v-if="!lastPage">正在加载</div>-->
    <!--<div class="weui-loadmore__tips" v-if="lastPage">- 已经到底啦 -</div>-->
    <!--</div>-->
    <load-more :loading="loading" :lastPage="lastPage"></load-more>
  </div>
</template>

<script>
  import { isLogin, autoLogin, toLoginPage, wxCheckUpdate } from '../../utils/index'
  import API from '../../utils/api'
  import activityCard1 from '../../components/activityCard/activityCard1'
  import activityCard2 from '../../components/activityCard/activityCard2'
  import comModal from '../../components/comModal'
  import dataNull from '../../components/dataNull'
  import loadMore from '../../components/loadMore'

  export default {
    data () {
      return {
        // gzhstaffcode: '222',
        userInfo: {},
        visible: false,
        banner: [],
        banner2: [],
        // {
        //   img: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        //   jumpLink: '/pages/package/paymentSuccess/main?orderId=1154453103601659904&checkoutType=activity',
        //   id: 1
        // }, {
        //   img: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        //   jumpLink: '/pages/package/paymentSuccess/main?orderId=1154453103601659904&checkoutType=member',
        //   id: 2
        // }, {
        //   img: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
        //   jumpLink: '/pages/package/paymentSuccess/main?orderId=1154453103601659904&checkoutType=charge',
        //   id: 3
        // }, {
        //   img: 'http://pics.sc.chinaz.com/files/pic/pic9/201806/zzpic12377.jpg',
        //   jumpLink: '/pages/index/main?gzhstaffcode=111',
        //   id: 4
        // }],
        activityList: [],
        location: {
          longitude: null,
          latitude: null
        },
        current: 1,
        totalPages: 0,
        lastPage: false,
        loading: false,
        allRights: [],
        isDataNull: false
      }
    },

    components: {
      activityCard1,
      activityCard2,
      comModal,
      dataNull,
      loadMore
    },

    methods: {
      login () {
        toLoginPage()
      },
      initData () {
        this.current = 1
        this.totalPages = 0
        this.lastPage = false
        this.loading = false
        this.activityList = []
        this.isDataNull = false
      },
      getIsEnter (params) {
        API.activity.isEnter(params).then(da => {
          let list = this.activityList
          da.data.forEach(itemP => {
            this.activityList.forEach(itemA => {
              if (itemA.id === itemP.id) {
                itemA.signIn = itemP.signIn
              }
            })
          })
          this.activityList = list
        })
      },
      getListData () {
        // let start = new Date().getTime()
        // console.log('活动API请求开始', start)
        API.activity.list({
          lon: this.location.longitude,
          lat: this.location.latitude,
          // cityId: this.location,
          // thirdCateId
          // isFree
          current: this.current,
          size: 3,
          ascs: 'floor_distance,activity_start'
        }).then(da => {
          // console.log('活动列表', da)
          // let end = new Date().getTime()
          // console.log('活动API请求结束', new Date().getTime(), end - start, '毫秒')
          this.loading = false
          this.totalPages = da.data.pages
          if (this.current >= da.data.pages) {
            this.lastPage = true
          } else {
            this.lastPage = false
          }
          this.isDataNull = da.data.total <= 0
          da.data.records.forEach(item => {
            this.activityList.push(item)
          })
        }).catch((err) => {
          console.log('活动列表数据异常', err)
        })
      },
      getUserInfo () {
        // console.log('home', mpvue.getStorageSync('userInfo'))
        this.userInfo = mpvue.getStorageSync('userInfo') || {}
      },
      navigateToMiniProgram () {
        wx.navigateToMiniProgram({
          appId: 'wx2f995afe4fc9fb03',
          path: 'pages/index2/index2',
          extraData: {
            foo: 'bar'
          },
          envVersion: 'release',
          success (res) {
            // 打开成功
          }
        })
      },
      routePage (url) {
        if (!isLogin()) {
          toLoginPage()
        } else {
          wx.navigateTo({
            url: url
          })
        }
      },
      getAdsListBanner () {
        API.adsPos.list({
          positionIds: 10007 // 会员服务平台-首页轮播广告
        }).then(da => {
          this.banner = da.data[0] && da.data[0].adList
        })
      },
      getAdsListBanner2 () {
        wx.showLoading({
          title: '加载中...',
          mask: true
        })
        API.adsPos.list({
          positionIds: 10008 // 会员服务平台-首页横幅广告
        }).then(da => {
          this.banner2 = da.data[0] && da.data[0].adList
          setTimeout(() => {
            wx.hideLoading()
          }, 200)
        }).catch(() => {
          setTimeout(() => {
            wx.hideLoading()
          }, 200)
        })
      },
      getMemberCardList () {
        this.allRights = []
        API.member.list(null, true).then(da => {
          this.memberCardList = da.data
          this.memberCardItem = da.data[0]
          if (this.memberCardItem.rights && this.memberCardItem.rights.length) {
            this.memberCardItem.rights.forEach(rightsTypeItem => {
              this.allRights = this.allRights.concat(rightsTypeItem.subList)
            })
          }
        })
      },
      adClickHandle (item) {
        API.adsPos.visit({id: item.id})
      }
    },
    mounted () {
      // let that = this
      this.getAdsListBanner()
      this.getAdsListBanner2()
      this.getMemberCardList()
    },
    /* 小程序 */
    onShow () {
      const that = this
      wxCheckUpdate()
      if (!isLogin()) {
        that.visible = true
      } else {
        that.visible = false
      }
      if (that.location.longitude && that.location.latitude) {
        this.getUserInfo()
        this.initData()
        this.getListData()
      } else {
        wx.getLocation({ // 获取当前经纬度
          type: 'wgs84', // 返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
          success: function (res) {
            that.location = res
            if (!isLogin()) {
              autoLogin().then(keys => {
                // console.log('个人中心自动登录', keys)
                that.getUserInfo()
                that.initData()
                that.getListData()
              }).catch(() => {
                setTimeout(() => {
                  that.visible = true
                }, 200)
                that.initData()
                that.getListData()
              })
            } else {
              that.initData()
              that.getListData()
              that.getUserInfo()
              that.visible = false
            }
          },
          fail: function () {
            if (!isLogin()) {
              that.getUserInfo()
              that.initData()
              that.getListData()
            } else {
              that.initData()
              that.getListData()
            }
          }
        })
      }
    },
    // 下拉刷新  main.json 加入"enablePullDownRefresh": true
    // onPullDownRefresh: function () {
    //   // 显示顶部刷新图标
    //   wx.showNavigationBarLoading()
    //   // var that = this
    //   // setTimeout(() => {
    //   //   // 隐藏导航栏加载框
    //   //   wx.hideNavigationBarLoading()
    //   // }, 600)
    //   this.getListData()
    // },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      // var that = this
      // 显示加载图标
      this.loading = true
      if (this.lastPage) { // 最后一页
        // setTimeout(() => {
        //   this.loading = false
        // }, 2000)
      } else {
        this.current++
        this.getListData()
      }
    },
    onShareAppMessage (res) { // 分享
      // console.log(res, '=====>>>>>')
      // if (res.from !== 'button') return false
      // return {
      //   title: '',
      //   path: '',
      //   imageUrl: ''
      // }
    }
  }
</script>

<style scoped lang="less">
  @import url('../../../static/style/common');

  .test {
    color: #383633;
  }

  .com-pages {
    padding-left: 31/7.5vw;
    padding-right: 31/7.5vw;
    .search-box {
      margin: 20/7.5vw 0;
      text-align: right;
      img {

      }
    }
  }

  .banner {
    width: 688/7.5vw;
    height: 350/7.5vw;
    border-radius: 10/7.5vw;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    .banner-img {
      width: 100%;
      height: 100%;
      border-radius: 10/7.5vw;
    }
  }

  .banner-ad1 {
    width: 688/7.5vw;
    height: 210/7.5vw;
    overflow: hidden;
    .banner-img {
      width: 100%;
      height: 100%;
      /*      border-radius: 10/7.5vw;*/
    }
  }

  .all-rights {
    width: 260/7.5vw;
    height: 34/7.5vw;
    overflow: hidden;
    .right-item {
      width: 100%;
      /*      border-radius: 10/7.5vw;*/
    }
  }

  .member-enter {
    margin-top: 30/7.5vw;
    margin-bottom: 10/7.5vw;
    width: 688/7.5vw;
    box-sizing: border-box;
    height: 100/7.5vw;
    background-color: #393733;
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
      color: #F0E0B8;
      font-size: 30/7.5vmin;
    }
    .member-enter-t2 {
      margin-left: 20/7.5vw;
      flex: 1;
      width: 100%;
    }
    .member-enter-btn {
      border: 1px solid #F0E0B8;
      border-radius: 20/7.5vw;
      font-size: 24/7.5vmin;
      padding: 5/7.5vw 10/7.5vw;
    }
  }

  .rights-box-item {
    font-size: 22/7.5vmin;
    text-align: center;
    margin-top: 30/7.5vw;
    margin-bottom: 30/7.5vw;
    .rights-box-img {
      width: 100/7.5vw;
      height: 100/7.5vw;
    }
    .rights-box-title {
      position: relative;
      top: -10/7.5vw;
    }
  }

  .activity-box {
    margin-top: 60/7.5vw;
    margin-bottom: 30/7.5vw;
    .activity-box-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: #1A1A1A;
      .activity-box-title {
        font-size: 48/7.5vmin;
      }
      .activity-box-more {
        font-size: 24/7.5vmin;
        display: flex;
        align-items: center;
        img {
          width: 12/7.5vw;
          height: 18/7.5vw;
          margin-left: 5/7.5vw;
        }
      }
    }
  }

  .activity-box-list-1 {
    /*margin-top: 31/7.5vw;*/
  }

  .activity-box-list-2 {

  }

  .new-people-coupon {
    width: 658/7.5vw;
    height: 800/7.5vw;
    position: relative;
    .gift-box {
      width: 658/7.5vw;
      height: 660/7.5vw;
      position: relative;
      left: -10/7.5vw;
      color: #A0714C;
      .gift-img {
        width: 658/7.5vw;
        height: 660/7.5vw;
      }
      .coupon-font-1 {
        font-size: 40/7.5vmin;
        position: absolute;
        top: 110/7.5vw;
        left: 78/7.5vw;
        width: 500/7.5vw;
        text-align: center;
      }
      .coupon-font-2 {
        font-size: 22/7.5vmin;
        position: absolute;
        top: 200/7.5vw;
        left: 78/7.5vw;
        text-align: center;
        width: 500/7.5vw;
      }
      .coupon-font-3 {
        font-size: 40/7.5vmin;
        position: absolute;
        top: 220/7.5vw;
        left: 78/7.5vw;
        width: 500/7.5vw;
        text-align: center;
        .coupon-font-3-m {
          font-size: 150/7.5vmin;
        }
      }
      .coupon-btn-box {
        position: absolute;
        bottom: 60/7.5vw;
        left: 78/7.5vw;
        width: 500/7.5vw;
        text-align: center;
        .coupon-btn {
          width: 269/7.5vw;
          height: 64/7.5vw;
          line-height: 64/7.5vw;
          color: #D04B46;
          font-size: 32/7.5vmin;
          text-align: center;
          background-color: #f5e0cc;
          margin: auto;
        }
      }

    }
    .close-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      .close-icon {
        width: 64/7.5vw;
        height: 64/7.5vw;
      }
    }
  }

  .loading {
    height: 100/7.5vw;
    line-height: 100/7.5vw;
    text-align: center;
  }
</style>
