<template>
  <div class="store-page">
    <div class="search-box" @click="visible3 = true"><span class="pos-name">{{activityCityName}}</span><img
      class="sanjiao" src="../../../static/icon/sanjiao.png"
      alt=""></div>
    <a hover-class="none" :href="'/pages/package/storeDetail/main?id='+item.id" v-for="(item, index) in dataList"
       :key="index">
      <div class="store-item">
        <img mode="widthFix" class="store-img"
             :src="item.cover"
             alt="">
        <div class="store-con page-padding">
          <div class="font1">{{item.name}}</div>
          <!--<div class="font2">{{item.name}}</div>-->
          <div class="font3">营业时间 {{item.businessTimeWeekday}}</div>
          <div class="font4">{{item.address}}</div>
          <div class="font5">
            <span>{{item.distanceKm}}km</span>
            <span class="pos" @click.stop="navigation(item)">
              <img mode="widthFix"  class="font5-img" src="../../../static/icon/pos.png" alt="">
              门店导航
            </span>
          </div>
        </div>
      </div>
    </a>

    <div class="com-modal" v-if="visible3" catchtouchmove="preventTouchMove" @click="visible3=false">
      <div class="com-modal-con" @click.stop>
        <div class="search-box">
          <span class="pos-name">{{activityCityName}}</span>
          <img class="sanjiao" src="../../../static/icon/sanjiao.png" alt="">
        </div>
        <div class="city-list">
          <div class="city-name" @click="activityCityIdItem('全国')"
               :class="{'city-name-active': activityCityName == '全国'}">
            全国
          </div>
          <div class="city-name" @click="activityCityIdItem(item.city)"
               :class="{'city-name-active': activityCityName == item.city}"
               v-for="(item, index) in activityCity" :key="index">{{item.city}}
          </div>
        </div>
      </div>
    </div>
    <!--加载更多-->
    <!--<div class="weui-loadmore">-->
      <!--<div class="weui-loading" v-if="!lastPage"></div>-->
      <!--<div class="weui-loadmore__tips" v-if="!lastPage">正在加载</div>-->
      <!--<div class="weui-loadmore__tips" v-if="lastPage">- 已经到底啦 -</div>-->
    <!--</div>-->
    <load-more :loading="loading" :lastPage="lastPage"></load-more>
    <!--加载更多-->
  </div>
</template>

<script>
  import { isLogin, autoLogin } from '../../utils/index'
  // import API from '../../utils/api'
  import loadMore from '../../components/loadMore'

  export default {
    components: {
      loadMore,
    },

    data () {
      return {
        userInfo: '',
        location: {
          longitude: null,
          latitude: null
        },
        /**/
        dataList: [],
        current: 1,
        totalPages: 0,
        lastPage: false,
        loading: false,
        /**/
        visible3: false,
        activityCity: [],
        // activityCityId: null,
        activityCityName: '全国'
      }
    },
    computed: {},
    methods: {
      initData () { /**/
        this.current = 1
        this.totalPages = 0
        this.loading = false
        this.dataList = []
      },
      distance (va) {
        return (va / 1000).toFixed(1)
      },
      getListData () { /**/
        // API.store.list({
        //   lon: this.location.longitude,
        //   lat: this.location.latitude,
        //   city: this.activityCityName === '全国' ? null : this.activityCityName,
        //   current: this.current,
        //   size: 6,
        //   ascs: 'distance'
        // }).then(da => {
        //   this.loading = false
        //   da.data.records.forEach(item => {
        //     item.distanceKm = this.distance(item.distance)
        //     this.dataList.push(item)
        //   })
        //   this.totalPages = da.data.pages
        //   if (this.current >= da.data.pages) {
        //     this.lastPage = true
        //   } else {
        //     this.lastPage = false
        //   }
        // })
      },
      activityCityIdItem (name) {
        this.activityCityName = name
        this.visible3 = false
        this.initData()
        this.getListData()
      },
      getStoreCityList () {
        // API.store.storeCityList().then(da => {
        //   this.activityCity = da.data
        // })
      },
      navigation (tiem) {
        wx.openLocation({ // 使用微信内置地图查看位置
          latitude: tiem.lat, // 要去的纬度-地址
          longitude: tiem.lon, // 要去的经度-地址
          name: tiem.name,
          address: tiem.address
        })
      },
    },
    mounted () {
      // console.log('store mounted')
      let that = this
      this.initData() /**/
      this.getStoreCityList() /**/
      wx.getLocation({ // 获取当前经纬度
        type: 'wgs84', // 返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
        success: function (res) {
          // console.log('门店', res)
          that.location = res
          if (!isLogin()) {
            autoLogin().then(keys => {
              // console.log('门店自动登录', keys)
              that.getListData()
            }).catch(() => {
              that.getListData()
            })
          } else {
            that.getListData()
          }
        },
        fail: function () {
          if (!isLogin()) {
            autoLogin().then(keys => {
              // console.log('门店自动登录', keys)
              that.getListData()
            }).catch(() => {
              that.getListData()
            })
          } else {
            that.getListData()
          }
        }
      })
    },
    // 小程序
    // 下拉刷新 main.json 加入"enablePullDownRefresh": true
    // onPullDownRefresh: function () {
    //   // 显示顶部刷新图标
    //   wx.showNavigationBarLoading()
    //   // var that = this
    //   // setTimeout(() => {
    //   //   // 隐藏导航栏加载框
    //   //   wx.hideNavigationBarLoading()
    //   // }, 600)
    // },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      // var that = this
      // 显示加载
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

<style lang="less" scoped>
  @import "../../../static/style/common";

  .store-page {
    color: #1A1A1A;

    .search-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 50/7.5vw auto 40/7.5vw 0;
      width: 100%;

      .pos-name {
        font-size: 30/7.5vmin;
      }

      .sanjiao {
        width: 16/7.5vw;
        height: 10/7.5vw;
        margin-left: 20/7.5vw;
      }
    }

    .store-item {
      .store-img {
        width: 100vw;
        height: 400/7.5vw;
      }

      .store-con {
        .font1 {
          font-size: 48/7.5vmin;
          font-weight: bold;
          margin: 40/7.5vw 0 32/7.5vw 0;
        }

        .font2 {
          font-size: 36/7.5vmin;
          margin-bottom: 40/7.5vw;
        }

        .font3, .font4 {
          font-size: 24/7.5vmin;
          margin-bottom: 20/7.5vw;
        }

        .font5 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 24/7.5vw;
          margin: 40/7.5vw 0 50/7.5vw 0;

          .font5-img {
            width: 18/7.5vw;
            height: 22/7.5vw;
            margin-left: 30/7.5vw;
            margin-right: 5/7.5vw;
          }
          .pos {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  /**/
  .city-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    color: #1a1a1a;
    padding: 0 31/7.5vw 10/7.5vw 31/7.5vw;

    .city-name {
      width: 130/7.5vw;
      height: 50/7.5vw;
      line-height: 50/7.5vw;
      text-align: center;
      border: 1px solid #9c9c9c;
      font-size: 24/7.5vw;
      margin-bottom: 32/7.5vw;
      box-sizing: border-box;
      margin-right: 7.2vw;
      border-radius: 5/7.5vw;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.city-name-active {
        background-color: #fdde3e;
        border: 0;
      }
    }
  }
</style>
