import API from './api'

/**
 * 富文本img自适应
 * */
export function richTextReplaceImg (content) {
  return content.replace(/<img/gi,
    '<img mode="widthFix" class="rich-text-img" ')
}

/**
 * 密码简单规则校验
 * */
export function checkPwd (p) {
  const arr = [
    '000000',
    '111111',
    '222222',
    '333333',
    '444444',
    '555555',
    '666666',
    '777777',
    '888888',
    '999999',
    '123456']
  return arr.includes(p)
}

export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/*
* 获取本周本月的开始日期、结束日期
*
* */

// 获得某月的天数
function getMonthDays (myMonth) {
  let now = new Date() // 当前日期
  let nowYear = now.getFullYear() // 当前年
  let monthStartDate = new Date(nowYear, myMonth, 1)
  let monthEndDate = new Date(nowYear, myMonth + 1, 1)
  let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}

export function getTimeInterval () {
  let now = new Date() // 当前日期
  let nowDayOfWeek = now.getDay() // 今天本周的第几天
  let nowDay = now.getDate() // 当前日
  let nowMonth = now.getMonth() // 当前月
  let nowYear = now.getFullYear() // 当前年
  return {
    weekStart: new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1).getTime(),
    weekEnd: new Date(nowYear, nowMonth, nowDay +
      (6 - nowDayOfWeek + 1)).getTime(),
    monthStart: new Date(nowYear, nowMonth, 1).getTime(),
    monthEnd: new Date(nowYear, nowMonth, getMonthDays(nowMonth)).getTime()
  }
}

/**
 * 时间戳换算星期几
 * */
export function getMyDay (timeStamp) {
  if (!timeStamp) {
    return ''
  }
  let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const index = new Date(timeStamp).getDay()
  // console.log(timeStamp, 'util')
  // console.log(new Date(timeStamp), 'util')
  return weeks[index]
}

export function formatTime (timeStamp) {
  const date = new Date(timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return {
    str: `${t1} ${t2}`,
    YYYY: formatNumber(year),
    MM: formatNumber(month),
    M: month,
    DD: formatNumber(day),
    D: day,
    HH: formatNumber(hour),
    H: hour,
    mm: formatNumber(minute),
    m: minute,
    ss: formatNumber(second),
    s: second
  }
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * 参数: timeStamp 时间戳，format 时间格式串
 * 返回值：返回格式，支持自定义，但参数必须与typeArr里保持一致
 */
export function formatTimeFormat (timeStamp, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!timeStamp) {
    return ''
  }
  let timeObj = formatTime(timeStamp)
  let string = format
  const typeArr = [
    'YYYY',
    'MM',
    'DD',
    'HH',
    'mm',
    'ss',
    'M',
    'D',
    'H',
    'm',
    's']
  typeArr.forEach(item => {
    string = string.replace(item, timeObj[item])
  })
  return string
}

/**
 * 获取当前页url
 * 参数：
 * 返回值：url
 */
export function getCurrentPageUrl () {
// eslint-disable-next-line
  const pages = getCurrentPages() // 获取加载的页面
  const currentPage = pages[pages.length - 1] // 获取当前页面的对象
  const url = currentPage.route // 当前页面url
  return url
}

/**
 * 转为 YYYY-MM-DD  字符串
 * @param dateString YYYY-MM-DD HH:mm:ss
 * @returns {String}
 * @author lq
 */
export function convertDateFromString (dateString) {
  if (dateString) {
    const datePrefix = dateString.split(' ')
    return datePrefix[0]
  }
}

/**
 * 获取当前页带参数的url
 * 参数：
 * 返回值：encodeURIComponent 编码得url穿，  decodeURIComponent解码
 */
export function getCurrentPageUrlWithArgs () {
// eslint-disable-next-line
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var url = currentPage.route // 当前页面url
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options
  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return encodeURIComponent(urlWithArgs)
}

/**
 * 未登录自动获取登录返回url跳转登录页面
 * 参数：
 * 返回值：无
 */
export function toLoginPage () {
  if (!isLogin()) {
    wx.navigateTo({
      url: '/pages/package/login/main?backUrl=/' + getCurrentPageUrlWithArgs()
    })
    return true
  }
  return false
}

/**
 * 获取url得参数
 * 参数：key url中参数名
 * 返回值：参数携带得值
 */
export function getCurrentPageParamVal (key) {
  // this.$root.$mp.query
// eslint-disable-next-line
  var pages = getCurrentPages() // 获取加载的页面
  var currentPage = pages[pages.length - 1] // 获取当前页面的对象
  var options = currentPage.options // 如果要获取url中所带的参数可以查看options
  return options[key]
}

/**
 * 渠道参数处理
 * 参数：
 * 返回值：
 * */
export function fromParam () {
  return new Promise((resolve, reject) => {
    let val = getCurrentPageParamVal('gzhstaffcode')
    console.log('渠道编号:', val)
    if (val) {
      mpvue.setStorageSync('gzhstaffcode', val + ',' + new Date().getTime())
      resolve(val)
    } else {
      reject(new Error('渠道编号参数不存在'))
    }
  })
}

/**
 * 判单token存在
 * 参数：
 * 返回值：boolean
 * */
export function isLogin () {
  let keys = mpvue.getStorageSync('keys')
  if (!keys || !keys.token) { // 判单未登录
    return false
  } else {
    return true
  }
}

/**
 * promise请求
 * 参数：参考wx.request
 * 返回值：[promise]res
 */
export function request (options = {}) {
  const {
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    complete,
    noToken
  } = options
  const fromParam = mpvue.getStorageSync('gzhstaffcode') // 渠道参数
  let fromParamHeader = {}
  if (fromParam) {
    let arr = fromParam.split(',')
    fromParamHeader = {
      gzhstaffcode: arr[0],
      gzhstaffcodeTime: arr[1]
    }
  }

  let TOKEN = {}
  if (noToken) {
    TOKEN = {}
  } else {
    let keys = mpvue.getStorageSync('keys')
    let token = ''
    if (keys && keys.token) {
      token = keys.token
    }
    TOKEN = {token: token}
  }

  // console.log('keys', keys)
  let Header = Object.assign({}, {
    'originType': 'MP', // 页面来源
    'content-type': 'application/json'
    // 'X-ECAPI-Sign': '',
    // 'X-ECAPI-UDID': '',
    // 'X-ECAPI-UserAgent': 'Platform/Wechat',
    // 'X-ECAPI-Ver': '1.1.0'
  }, TOKEN, fromParamHeader, header)

  // console.log('请求头，', Header)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: Header,
      method,
      dataType,
      responseType,
      success (res) {
        // console.log('utils/index', res)
        if (!res.data.status && res.data.error && res.data.error.statusCode ===
          '10007') { // 登录过期,并且出现登录过期一定是之前成功登录过，能完成自动登录
          autoLogin().then((userInfo) => {
            request(options).then(res => {
              resolve(res)
            }).catch((err) => {
              reject(err)
            })
          }).catch(() => { // 存在token,重新登录失败的情况
            mpvue.setStorageSync('keys', null)
            mpvue.setStorageSync('userInfo', null)
            // request(options)
            toLoginPage()
          })
        } else { // 登录未过期
          if (!res.data.status && res.data.error) { // 后台返回错误
            wx.showToast({
              title: res.data.error.message,
              icon: 'none',
              duration: 2000
            })
          }
          resolve(res)
        }
      },
      fail (err) {
        reject(err)
      },
      complete
    })
  })
}

/**
 * 自动登录
 * 参数：
 * 返回值：[promise]res
 */
export function autoLogin () {
  let form = {}
  // 查看是否授权
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) { // 已经授权
          wx.login({ // code
            success: resLogin => {
              form.code = resLogin.code
              wx.getUserInfo({
                success (res) {
                  // console.log(res)
                  form.iv = res.iv
                  form.encryptedData = res.encryptedData
                  // 登录API
                  API.account.loginUid(form).then(da => {
                    // console.log('loginUid', da)
                    if (da.status) {
                      mpvue.setStorageSync('keys', da.data)
                      API.account.userInfo().then(da => {
                        resolve(da.data)
                      })
                    } else {
                      console.log('未绑定手机号, 无法完成自动登录')
                      reject(new Error('未绑定手机号, 无法完成自动登录'))
                    }
                  })
                }
              })
            }
          })
        } else {
          console.log('账户未授权，需要走登录流程')
          reject(new Error('账户未授权，需要走登录流程'))
        }
      }
    })
  })
}

/* userInfo 和resolve不同步 test 活动列表使用 */
export function requestNotWaitUserInfo (options = {}) {
  const {
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    complete,
    noToken
  } = options
  const fromParam = mpvue.getStorageSync('gzhstaffcode') // 渠道参数
  let fromParamHeader = {}
  if (fromParam) {
    let arr = fromParam.split(',')
    fromParamHeader = {
      gzhstaffcode: arr[0],
      gzhstaffcodeTime: arr[1]
    }
  }

  let TOKEN = {}
  if (noToken) {
    TOKEN = {}
  } else {
    let keys = mpvue.getStorageSync('keys')
    let token = ''
    if (keys && keys.token) {
      token = keys.token
    }
    TOKEN = {token: token}
  }

  // console.log('keys', keys)
  let Header = Object.assign({}, {
    'originType': 'MP', // 页面来源
    'content-type': 'application/json'
    // 'X-ECAPI-Sign': '',
    // 'X-ECAPI-UDID': '',
    // 'X-ECAPI-UserAgent': 'Platform/Wechat',
    // 'X-ECAPI-Ver': '1.1.0'
  }, TOKEN, fromParamHeader, header)

  // console.log('请求头，', Header)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: Header,
      method,
      dataType,
      responseType,
      success (res) {
        // console.log('utils/index', res)
        if (!res.data.status && res.data.error && res.data.error.statusCode ===
          '10007') { // 登录过期,并且出现登录过期一定是之前成功登录过，能完成自动登录
          autoLoginNotWaitUserInfo().then((userInfo) => {
            request(options).then(res => {
              resolve(res)
            }).catch((err) => {
              reject(err)
            })
          }).catch(() => { // 存在token,重新登录失败的情况
            mpvue.setStorageSync('keys', null)
            mpvue.setStorageSync('userInfo', null)
            // request(options)
            toLoginPage()
          })
        } else { // 登录未过期
          if (!res.data.status && res.data.error) { // 后台返回错误
            wx.showToast({
              title: res.data.error.message,
              icon: 'none',
              duration: 2000
            })
          }
          resolve(res)
        }
      },
      fail (err) {
        reject(err)
      },
      complete
    })
  })
}

/* userInfo 和resolve不同步 */
export function autoLoginNotWaitUserInfo () {
  let form = {}
  // 查看是否授权
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) { // 已经授权
          wx.login({ // code
            success: resLogin => {
              form.code = resLogin.code
              wx.getUserInfo({
                success (res) {
                  // console.log(res)
                  form.iv = res.iv
                  form.encryptedData = res.encryptedData
                  // 登录API
                  API.account.loginUid(form).then(da => {
                    // console.log('loginUid', da)
                    if (da.status) {
                      mpvue.setStorageSync('keys', da.data)
                      API.account.userInfo().then(da => {})
                      resolve(da.data)
                    } else {
                      console.log('未绑定手机号, 无法完成自动登录')
                      reject(new Error('未绑定手机号, 无法完成自动登录'))
                    }
                  })
                }
              })
            }
          })
        } else {
          console.log('账户未授权，需要走登录流程')
          reject(new Error('账户未授权，需要走登录流程'))
        }
      }
    })
  })
}

/* 小程序检测版本更新 */
export function wxCheckUpdate () {
  wx.getUpdateManager().onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('是否有新版本：' + res.hasUpdate)
    if (res.hasUpdate) { // 如果有新版本
      // 小程序有新版本，会主动触发下载操作（无需开发者触发）
      wx.getUpdateManager().onUpdateReady(function () { // 当新版本下载完成，会进行回调
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，单击确定重启应用',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              wx.getUpdateManager().applyUpdate()
            }
          }
        })
      })

      // 小程序有新版本，会主动触发下载操作（无需开发者触发）
      wx.getUpdateManager().onUpdateFailed(function () { // 当新版本下载失败，会进行回调
        wx.showModal({
          title: '提示',
          content: '检查到有新版本，但下载失败，请检查网络设置',
          showCancel: false
        })
      })
    }
  })
}

export default {
  formatNumber,
  formatTime,
  formatTimeFormat,
  toLoginPage,
  request,
  autoLogin,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  getCurrentPageParamVal,
  checkPwd,
  wxCheckUpdate
}
