import { serverUrl } from './const'
import { request, requestNotWaitUserInfo } from './index'

const API = {
  config: {
    activityType (params) { // 活动分类
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/codeConfig/front/list',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    activityCity (params) { // 活动城市
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/activityAddress/front/cityList',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    sendMsg (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/sms/send',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    checkMsgCode (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/sms/check',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  charge: {
    storeValue (params) { // 储值列表
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/storeValue/front/list',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    charge (params) { // 充值
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/storeValue/front/charge',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    record (params) { // 充值和消费记录
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/storeValue/front/record',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  account: {
    // 条形码
    myQrcode (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/memberCard/front/myQrcode',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    // 获取收银台优惠券列表
    accountCouponsWhenPay (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/coupon/front/getCouponsOfBuyingByCardId',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    // 获取个人中心优惠券列表
    accountCouponsList (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/coupon/front/getCouponsOfUserByCardId',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    // 规则下的优惠券列表
    getCouponListByRuleId (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/coupon/front/getCouponList',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    // 规则下的优惠券领取
    getCoupon (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/coupon/front/getCoupons',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    accountCouponsListByShop (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/coupon/front/getCouponsOfUserByShop',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    getShop (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/coupon/front/getAllShops',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    pickZhihu (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/zhihu/front/pickZhihu',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    getZhihuSampleInfos (params) {
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/zhihu/front/getSampleInfo',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    getPersonInfo () { // 用户个人信息
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/member/front/personInfo',
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    editPersonInfo (params) { // 编辑用户个人信息
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/member/front/edit',
          method: 'post',
          data: params
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    updatedPwd (params) { // 修改密码updatedPwd
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/member/front/updatedPwd',
          method: 'post',
          data: params
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    resetPwd (params) { // 重置密码
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/member/front/resetPwd',
          method: 'post',
          data: params
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    userInfo (params) { // 用户详细
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/memberCard/front/activeCard',
          data: params,
          method: 'get'
        }).then(res => {
          let info = res.data.data
          info.points = parseInt(info.points, 10)
          mpvue.setStorageSync('userInfo', info) // 节约性能，每次获取都存本地，减少这个接口请求
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    loginUid (params) { // unionid登录
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/wechat/login',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    loginMobile (params) { // 手机号登录
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/wechat/checkAndLogin',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    loginPwd (params) { // 活跃卡设置密码登录
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/wechat/registryAndLogin',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    cardList (params) { // 我的会员卡列表
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/memberCard/front/myCardList',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    switchCard (params) { // 切换卡
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + `/memberCard/front/switchCard/${params.cardId}`,
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    bindCard (params) { // 绑定会员卡
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/memberCard/front/bindCard',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  store: {
    list (params) { // 门店列表
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/shop/front/list',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    detail (params) { // 门店详细
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + `/shop/front/${params.id}`,
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    storeCityList (params) { // 门店城市列表
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/shop/front/cityList',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  activity: {
    list (params) { // 活动列表
      return new Promise((resolve, reject) => {
        requestNotWaitUserInfo({
          url: serverUrl + '/activity/front/list',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    detail (params) { // 活动详情
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + `/activity/front/${params.id}`,
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    getCollectionStatus (params) { // 查看当前活动是否被收藏
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/collectionRecord/front/getCollectionStatus',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    submitSignOrder (params) { // 活动报名下单
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/activity/front/submitSignOrder',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    activityCollect (params) { // 活动收藏
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/collectionRecord/front/activityCollect',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    cancelCollection (params) { // 活动取消收藏
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/collectionRecord/front/cancelCollection',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    myCollectionActivity (params) { // 我收藏得活动
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/collectionRecord/front/myCollection',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  payment: {
    detail (params) { // 获取我的支付信息
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/myPayInfo',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    calcPrice (params) { // 计算价格
      console.log('计算价格', params)
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/calcPrice',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    pay (params) { // 支付
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/pay',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    autoRenew (params) { // 自动续费参数
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/wxContractData',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    cancelAutoRenew (params) { // 取消自动续费参数
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/contract/delete',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  order: {
    list (params) { // 我的订单列表（包括活动，言选会员，充值）
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/myOrderList',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    orderDetail (params) { // 订单详情
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/activityOrderDetail',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    cancelOrder (params) { // 取消订单
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/orderMain/front/cancelOrder',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  member: {
    list (params, noToken) { // 言选会员卡面列表
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/cardFace/front/list',
          data: params,
          method: 'get',
          noToken: noToken
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    memberOrder (params) { // 言选会员下单
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/memberCard/front/purchaseVip',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  scores: {
    detail (params) { // 积分明细
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/memberCard/front/pointsRecord',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    continuousCheckInDetail (params) { // 连续签到详情mpvue.getStorageSync('userInfo')
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/signInRecord/front/getTodaySign',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    sign (params) { // 签到
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/signInRecord/front/sign',
          data: params,
          method: 'post'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  },
  adsPos: {
    list (params) { // 广告位-广告
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/ad/front/getAllAdsByPositionByid',
          data: params,
          method: 'get',
          noToken: true
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    visit (params) { // 广告位-广告点击统计
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + `/ad/front/visit/${params.id}`,
          data: params,
          method: 'put'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    },
    staticPage (params) { // 静态页
      return new Promise((resolve, reject) => {
        request({
          url: serverUrl + '/staticPage/front/page',
          data: params,
          method: 'get'
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(new Error(err))
        })
      })
    }
  }
}

export default API
