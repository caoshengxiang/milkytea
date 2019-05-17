# yjy-mp

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### h5和小程序 ui 差异
1.首页菜单
1. cell 个人中心 (todo 替换)
1. 轮播
1. 表单
1. 富文本 wxParse
1. 二维码，条形码

1. 路由

1. 开通会员-开通自动续费 switch组件需要替换
1. 本地存储 差异
### 用户信息缓存名为userInfo


### todo
1. 设置
1. 收银台
1. 支付成功
1. h5 优惠券领取
1. 新人卷弹窗
1. 替换小程序iview
1. 每个页面加onShareAppMessage
1. 每个页面加渠道参数获取
1. 一些需要登录得页面需要自动登录或者自动跳转登录
1. 成功页面得活动接口


### 几处数据比较灵活的页面
1. 收藏
1. 收银台
1. 支付成功


### 需求细节
1. 分销只记录一级，（员工 -> 用户A   用户A -> 用户B）  只需要记录用户A的行为，
  * 小程序

  2. 活动详细-座位预约按钮，暂时去掉
  3. 登录-增加密码简单功能
  4. 4个协议说明得静态富文本


### 需要登录得页面
1. 支付二维码
1. 余额，详细，充值及详细
1. 积分，详细
1. 优惠券
1. 会员俱乐部
1. 我的活动
1. 我的待支付活动
1. 收藏


### 差的接口
1. banner, 广告位
1. 静态符富文本
1. 活动卷
1. 用户详细-我的权益有点问题
1. 支付成功得活动列表-收藏
1. tabBar 不能带参问题？？？？？？？？？？？？？

### 页面
1. 首页搜索页面

1. 渠道


wx2423f7381a236877

## 路由 及参数
   首页 "/pages/index/main",          // gzhstaffcode 渠道编码，只有公众号跳转小程序才有
   门店 "/pages/store/main",
   个人中心 "/pages/account/main",
   来源： pages/fromCode/main?

    // package 包路由
   会员 "/pages/package/member/main",
   会员购买  "/pages/package/buyMember/main?orderId=",  `/pages/package/buyMember/main?orderId=${da.data.orderId}&autoRenew=${this.isSwitch}&goodsName=${this.memberCardItem}&cardId=${this.cardId}`
   活动  "/pages/package/activity/main",
   活动详细  "/pages/package/activityDetail/main?id=",            // id
   登录页  "/pages/package/login/main",               // backUrl 登录成功返回url
   门店详细  "/pages/package/storeDetail/main",               // id
   会员俱乐部  "/pages/package/club/main",
   充值  "/pages/package/charge/main",
   充值详细  "/pages/package/chargeDetail/main",
   优惠券  "/pages/package/coupon/main",
   优惠券详细  "/pages/package/couponDetail/main",              // guid
   积分  "/pages/package/scores/main",
   我的积分  "/pages/package/myScores/main",
   收藏  "/pages/package/collection/main",
   设置  "/pages/package/set/main",
   我的活动  "/pages/package/myActivity/main",
   活动卷  "/pages/package/myActivityView/main", // id活动id, orderId订单id
   支付码  "/pages/package/code/main",
   会员卡管理  "/pages/package/cardManage/main",
   领取知乎  "/pages/package/zhihu/main",
   收银台  "/pages/package/checkout/main?orderId=&&checkoutType=&goodsid=",                  // orderId 订单id,;  checkoutType 支付类型 （activity 活动，）; id 对应id
   支付成功  "/pages/package/paymentSuccess/main?orderId=&checkoutType="    // 订单id, checkoutType ['activity', 'member', 'charge']
   h5页面  "/pages/package/webview/main?url=http://www.baidu.com"
   静态页  "/pages/package/staticPage/main?id="



wx2423f7381a236877 正式

wxdef9d8d3abee65ae 测试

wx2f995afe4fc9fb03 礼品卡
