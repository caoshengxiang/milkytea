<template>
  <div class="my-page">
    <div class="top-box">
      <div class="top">
        <div class="u-box" @click="clickItem(101)" v-if="isLogin">
          <img class="u-img" v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
          <img class="u-img" v-if="!userInfo.avatar" src="../../../static/icon/u-default-head.png" alt="">
          <div class="u-info">
            <div class="name">{{userInfo.name}}</div>
            <div class="level"><span class="level-name">{{userInfo.levelName}}</span></div>
          </div>
        </div>
        <div class="u-box" @click="login" v-if="!isLogin">
          <img class="u-img" src="../../../static/icon/u-default-head.png" alt="">
          <div class="u-info">
            <div class="level"><span class="level-name">点击登录</span></div>
          </div>
        </div>
        <div class="u-right">
          <img @click="clickItem(2)" class="code-img" src="../../../static/icon/code.png" alt="">
          <a hover-class="none" href="/pages/package/member/main">
            <div class="open-m" v-if="!userInfo.vip">开通言选会员</div>
          </a>
        </div>
      </div>
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
              <swiper-item style="line-height: 4.75vw">
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
    </div>
    <div class="box2">
      <div class="com-flex">
        <div class="com-flex-item com-flex-item-3 box2-item" @click="clickItem(3)">
          <div class="text-1">￥{{userInfo.balance ? userInfo.balance : 0}}</div>
          <div class="text-2">余额 <span class="recharge" @click.stop="clickItem(4)">充值</span></div>
        </div>
        <div class="com-flex-item com-flex-item-3 box2-item-2" @click="clickItem(5)">
          <div class="text-1">{{userInfo.couponNum ? userInfo.couponNum : 0}}</div>
          <div>优惠券</div>
        </div>
        <div class="com-flex-item com-flex-item-3 box2-item" @click="clickItem(6)">
          <div class="text-1">{{userInfo.points ? userInfo.points : 0}}</div>
          <div>积分</div>
        </div>
      </div>
    </div>
    <div>
      <div class="com-flex">
        <div class="com-flex-item com-flex-item-2 grid-item grid-item-1" @click="clickItem(7)">
          <img style="transform: scale(1.2)" mode="widthFix" src="../../../static/icon/account-1.png"/>
          <div>会员俱乐部</div>
        </div>
        <div class="com-flex-item com-flex-item-2 grid-item grid-item-2" @click="clickItem(8)">
          <img style="transform: scale(1.25)" mode="widthFix" src="../../../static/icon/account-2.png"/>
          <div>我的活动</div>
        </div>
      </div>
    </div>
    <swiper
      v-if="banner && banner.length"
      :indicator-dots="false"
      indicator-color="#cccccc"
      indicator-active-color="#000000"
      autoplay="true"
      interval="5000"
      duration="1000"
      circular="true"
      class="banner-ad3">
      <div v-for="(item, index) in banner" :key="index" class="">
        <!-- <navigator url="/pages/webview/webview?url={{item.jumpLink}}">  -->
        <a hover-class="none" :href="item.url" @click="adClickHandle(item)">
          <swiper-item>
            <img mode="widthFix" :src="item.adImg" class="banner-img"/>
          </swiper-item>
        </a>
      </div>
    </swiper>
    <div class="line" v-else></div>
    <!--<div>-->
    <!--<i-cell-group>-->
    <!--<i-cell title="我的收藏" is-link @click="clickItem(9)">-->
    <!--<img slot="icon" class="list-img" src="../../../static/icon/u-1.png" alt="">-->
    <!--</i-cell>-->
    <!--<i-cell title="设置" is-link @click="clickItem(10)">-->
    <!--<img slot="icon" class="list-img" src="../../../static/icon/u-set.png" alt="">-->
    <!--</i-cell>-->
    <!--</i-cell-group>-->
    <!--</div>-->
    <div class="page-padding">
      <div class="com-cell-item  com-cell-item-border">
        <div class="com-cell-item-main" @click="clickItem(101)">
          <div class="com-cell-item-title">
            <img class="list-img" src="../../../static/icon/u-info.png" alt="">个人资料
          </div>
          <div class="com-cell-item-tips"></div>
          <div class="com-cell-item-right">
            <img mode="widthFix" class="jiantou-icon" src="../../../static/icon/jiantou.png" alt="">
          </div>
        </div>
        <div class="com-cell-item-con"></div>
      </div>
      <div class="com-cell-item com-cell-item-border">
        <div class="com-cell-item-main" @click="clickItem(9)">
          <div class="com-cell-item-title">
            <img class="list-img" src="../../../static/icon/u-1.png" alt="">我的收藏
          </div>
          <div class="com-cell-item-tips"></div>
          <div class="com-cell-item-right">
            <img class="jiantou-icon" src="../../../static/icon/jiantou.png" alt="">
          </div>
        </div>
        <div class="com-cell-item-con"></div>
      </div>
      <div class="com-cell-item com-cell-item-border">
        <div class="com-cell-item-main" @click="clickItem(10)">
          <div class="com-cell-item-title">
            <img class="list-img" src="../../../static/icon/u-set.png" alt="">设置
          </div>
          <div class="com-cell-item-tips"></div>
          <div class="com-cell-item-right">
            <img mode="widthFix" class="jiantou-icon" src="../../../static/icon/jiantou.png" alt="">
          </div>
        </div>
        <div class="com-cell-item-con"></div>
      </div>
      <!--<a hover-class="none" v-if="staticPage" :href="'/pages/package/richText/main?id=' + staticPage.id">-->
        <!--<div class="com-cell-item com-cell-item-border">-->
          <!--<div class="com-cell-item-main">-->
            <!--<div class="com-cell-item-title">-->
              <!--&lt;!&ndash;<img class="list-img" src="../../../static/icon/u-set.png" alt="">&ndash;&gt;-->
              <!--{{staticPage.agreementName}}-->
            <!--</div>-->
            <!--<div class="com-cell-item-tips"></div>-->
            <!--<div class="com-cell-item-right">-->
              <!--<img mode="widthFix" class="jiantou-icon" src="../../../static/icon/jiantou.png" alt="">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="com-cell-item-con"></div>-->
        <!--</div>-->
      <!--</a>-->
    </div>
  </div>
</template>

<script>
  import { isLogin, autoLogin } from '../../utils/index'
  import API from '../../utils/api'
  import { staticPageId } from '../../utils/const'

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
      login () {
        // 过期登录由调用接口处理, 约定出现登录过期一定是用户成功登录过，能完成自动登录
        // 进入须登录页面未登录，点击前检测，跳转登录页面带上目标url
        wx.navigateTo({
          url: '/pages/package/login/main?backUrl=/pages/account/main'
        })
      },
      clickItem (item) {
        console.log(item)
        switch (item) {
          case 1: // 头像名称
            // 跳转个人中心信息页面
            wx.navigateTo({
              url: '/pages/package/set/personinfo/main'
            })
            break
          case 2: // 二维码
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/code/main'
              })
            } else {
              this.login()
            }
            break
          case 3: // 余额,会员卡管理页面
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/cardManage/main'
              })
            } else {
              this.login()
            }
            break
          case 4: // 充值
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/charge/main'
              })
            } else {
              this.login()
            }
            break
          case 5: // 优惠券
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/coupon/main'
              })
            } else {
              this.login()
            }
            break
          case 6: // 积分
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/scores/main'
              })
            } else {
              this.login()
            }
            break
          case 7: // 会员俱乐部
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/club/main'
              })
            } else {
              this.login()
            }
            break
          case 8: // 我的活动
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/myActivity/main'
              })
            } else {
              this.login()
            }
            break
          case 9: // 我的收藏
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/collection/main'
              })
            } else {
              this.login()
            }
            break
          case 10: // 设置
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/set/main'
              })
            } else {
              this.login()
            }
            break
          case 101: // 个人资料
            if (isLogin()) {
              wx.navigateTo({
                url: '/pages/package/set/personinfo/main'
              })
            } else {
              this.login()
            }
            break
          default:
        }
      },
      getStaticPage () {
        API.adsPos.staticPage({
          // id: staticPageId.autoRenew
          id: staticPageId.help
        }).then(da => {
          // console.log(da.data.records)
          this.staticPage = da.data.records && da.data.records[0]
        })
      },
      getUserInfo () {
        API.account.userInfo().then(() => {
          this.userInfo = mpvue.getStorageSync('userInfo') || {}
          this.userInfo.points = parseInt(this.userInfo.points, 10)
          console.log('hell', this.userInfo)
        })
      },
      getAdsListBanner () {
        API.adsPos.list({
          positionIds: 10011 // 会员服务平台-个人中心广告
        }).then(da => {
          this.banner = da.data[0] && da.data[0].adList
        })
      },
      adClickHandle (item) {
        API.adsPos.visit({id: item.id})
      },
      getMemberCardList () {
        this.allRights = []
        API.member.list().then(da => {
          this.memberCardList = da.data
          this.memberCardItem = da.data[0]
          if (this.memberCardItem.rights && this.memberCardItem.rights.length) {
            this.memberCardItem.rights.forEach(rightsTypeItem => {
              this.allRights = this.allRights.concat(rightsTypeItem.subList)
            })
          }
        })
      }
    },
    // 小程序
    onShow () {
      let that = this
      this.getAdsListBanner()
      this.getMemberCardList()
      this.getStaticPage()
      that.isLogin = isLogin()
      if (!that.isLogin) {
        autoLogin().then(keys => {
          // console.log('个人中心自动登录', keys)
          this.getUserInfo()
        }).catch(() => {
        })
      } else {
        this.getUserInfo()
      }
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
