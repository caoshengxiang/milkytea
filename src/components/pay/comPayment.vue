<!--该组件依赖于 comDrawer组件-->

<template>
  <div>
    <pay-drawer title="标题" :visible="visible">
      <div class="payment-box">
        <div class="payment-box-title">
          <div class="box-title">
            <span class="title">请选择支付方式</span>
            <img @click="closeHandle" mode="widthFix" class="close" src="../../../static/icon/close.png" alt="">
          </div>
          <div class="payment-num">
            <span>应付金额</span>
            <span class="money">￥{{payAmount}}</span>
          </div>
          <img mode="widthFix" class="line" src="../../../static/icon/line1px.png">
        </div>
        <pay-type
          :payType="payTypeNum"
          :typeInclude="[2]"
          @payTypeChange="payTypeChange"
          @btnClick="paymentWin"
          btn-text="立即支付"></pay-type>
      </div>
    </pay-drawer>
    <!-- 密码输入框 -->
    <div v-if='showPayPwdInput' class="pay-pwd-box">
      <div class='bg_layer'></div>
      <div class='input_main'>
        <div class='input_title'>
          <div class='input_back' @click='hidePayLayer'>
            <span></span>
          </div>
          <span>输入支付密码</span>
        </div>
        <div class='input_tip'><span>使用会员卡余额支付需要验证身份，验证通过后才可进行支付。</span></div>
        <div class='input_row' @click='getFocus'>
          <div class='pwd_item' v-for='(item, index) in 6' :key="item">
            <span v-if='pwdVal.length > index'></span>
          </div>
        </div>
<!--        <div class='forget_pwd' @click="hidePayLayer">忘记密码</div>-->
        <input class='input_control' password type='number' :focus='payFocus' v-model="pwdVal" @input='inputPwd'
               maxlength='6'/>
      </div>
    </div>
    <!--end 密码支付-->
  </div>
</template>

<script>
  // 单独封装payDrawer, 是因为遇到了关闭浮窗的坑（不太好描述，原因未找到所以未使用comDrawer组件）
  import payDrawer from './payDrawer'
  import payType from './payType'
  import API from '../../utils/api'

  export default {
    name: 'comPayment',
    data () {
      return {
        payTypeNum: 2, // 前端定义：1:余额支付 2:微信支付 3:支付宝  ， 接口：支付类型 1:微信支付 2:支付宝 3:余额支付
        payTypeParam: 1,
        formId: '',
        /* 密码支付 */
        showPayPwdInput: false, // 是否展示密码输入层
        pwdVal: '', // 输入的密码
        payFocus: true, // 文本框焦点
        isInputPwd: false, // 出现连续两个支付框得解决方案
        /* 密码支付 end */
        userInfo: {
          expireTime: 0
        }
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      orderId: '',
      payAmount: '',
      autoRenew: '',
      goodsName: '',
      checkoutType: '' // 支付得产品类型，activity,member,charge
    },
    components: {
      payDrawer,
      payType
    },
    methods: {
      /**
       * 显示支付密码输入层
       */
      showInputLayer: function () {
        this.showPayPwdInput = true
        this.payFocus = true
        console.log('展示密码支付')
      },
      /**
       * 隐藏支付密码输入层
       */
      hidePayLayer () {
        this.showPayPwdInput = false
        this.payFocus = false
        this.pwdVal = ''
      },
      /**
       * 获取焦点
       */
      getFocus: function () {
        this.payFocus = false
        this.payFocus = true
        console.log('getFocus')
      },
      /**
       * 输入密码监听
       */
      inputPwd: function () {
        // console.log(this.pwdVal.length)
        if (this.pwdVal.length >= 6) {
          this.pay(this.pwdVal, (data) => {
            this.toSuccessPage()
          })
          this.hidePayLayer()
        }
      },
      toSuccessPage () {
        wx.redirectTo({
          url: `/pages/package/paymentSuccess/main?orderId=${this.orderId}&checkoutType=${this.checkoutType}`
        })
      },
      payTypeChange (type) {
        this.payTypeNum = type
        // console.log(this.payTypeNum)
      },
      pay (cardPwd, callback, fail) {
        API.payment.pay({
          formId: this.formId,
          orderId: this.orderId,
          payType: this.payTypeParam, // 支付类型 1:微信支付 2:支付宝 3:余额支付
          // pointsDeduction: this.isSwitch ? this.myAvailableDetail.availablePoints : 0,
          // couponId: null,
          payAmount: this.payAmount,
          autoRenew: this.autoRenew,
          goodsName: this.goodsName,
          orderType: 2, // 订单类型 1:活动订单 2:言选会员订单 3:充值订单
          cardPwd: cardPwd,
          payTradeType: 1 // 微信支付方式 1:JSAPI支付（或小程序支付）（微信游览器） 2.Native支付, 扫码支付 3.app支付 4.H5支付（外部游览器）5.付款码支付
        }).then(da => {
          if (da.status) {
            API.account.userInfo().then(() => {
              callback && callback(da.data)
            })
          } else {
            fail && fail()
          }
        })
      },
      paymentWin (obj) {
        let that = this
        this.formId = obj.formId
        this.payTypeParam = 3
        if (this.payTypeNum === 1) { // 余额支付
          this.payTypeParam = 3
          console.log('余额支付')
          this.showInputLayer()
        } else if (this.payTypeNum === 2) { // 微信
          wx.showLoading({
            title: '处理中...',
            mask: true
          })
          this.payTypeParam = 1
          // console.log('isInputPwd', this.isInputPwd)
          // if (!this.isInputPwd) {
          //   this.isInputPwd = true
          // } else {
          //   return
          // }
          // if (this.autoRenew === 'true') { // 纯签约
          //   API.payment.autoRenew({
          //     orderId: this.orderId,
          //     type: 1
          //   }).then(da => {
          //     wx.navigateToMiniProgram({
          //       appId: 'wxbd687630cd02ce1d',
          //       path: 'pages/index/index',
          //       extraData: da.data,
          //       success (res) {
          //         // 成功跳转到签约小程序
          //         console.log('成功跳转到签约小程序')
          //         wx.hideLoading()
          //       },
          //       fail (res) {
          //         // 未成功跳转到签约小程序
          //         console.log('未成功跳转到签约小程序')
          //         wx.hideLoading()
          //       }
          //     })
          //   })
          // } else {
          this.pay(null, (data) => { // 支付中签约，小程序直接调支付api
            wx.hideLoading()
            if (data.wxCredential && data.wxCredential.appId) {
              wx.requestPayment({
                timeStamp: data.wxCredential.timeStamp,
                nonceStr: data.wxCredential.nonceStr,
                package: data.wxCredential.package,
                signType: data.wxCredential.signType,
                paySign: data.wxCredential.paySign,
                success (res) {
                  console.log('requestPayment', res)
                  that.isInputPwd = false
                  that.toSuccessPage()
                },
                fail (res) {
                  that.isInputPwd = false
                }
              })
            }
          })
          // }
        } else if (this.payTypeNum === 3) {
          this.payTypeParam = 2
        }
      },
      closeHandle () {
        this.$emit('close')
      }
    },
    onShow (res) {
      console.log('com payment onshow', res)
      this.userInfo = mpvue.getStorageSync('userInfo') || {}
    }
  }
</script>

<style scoped lang="less">
  @import url(../../../static/style/common);

  button::after {
    border: 0;
  }

  .payment-box {
    color: #1A1A1A;
    box-sizing: border-box;
    padding: 40/7.5vw;

    .payment-box-title {
      text-align: center;

      .box-title {
        .title {
          font-size: 36/7.5vmin;
        }

        .close {
          float: right;
          width: 26/7.5vw;
          height: 26/7.5vw;
        }
      }

      .payment-num {
        font-size: 32/7.5vmin;
        display: flex;
        margin-top: 10/7.5vw;
        justify-content: space-between;
        padding: 32/7.5vw 0 10/7.5vw 0;

        .money {
          color: #DE1313;
          font-weight: bold;
        }
      }

      .line {
        width: 100%;
      }
    }
  }

  /*密码支付*/
  .pay-pwd-box {
    z-index: 10000;
    position: fixed;

    .btn_pay {
      margin: 100/7.5vw auto;
      width: 600/7.5vw;
      height: 100/7.5vw;
      line-height: 100/7.5vw;
      border-radius: 100/7.5vw;
      background-color: #d3a95a;
      color: #fff;
      font-size: 36/7.5vmin;
      text-align: center;
    }

    /* 支付密码css start */

    .bg_layer {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 9998;
    }

    .input_main {
      position: fixed;
      left: 0;
      bottom: 500/7.5vw;
      width: 100%;
      height: 394/7.5vw;
      background-color: #fff;
      z-index: 9999;
    }

    .input_title {
      width: 100%;
      height: 90/7.5vw;
      line-height: 90/7.5vw;
      text-align: center;
      font-size: 32/7.5vmin;
      border-bottom: 1px solid #e2e2e2;
    }

    .input_back {
      position: absolute;
      left: 0;
      top: 0;
      width: 80/7.5vw;
      height: 90/7.5vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .input_back span {
      width: 20/7.5vw;
      height: 20/7.5vw;
      background-color: white;
      border: 1px solid #aaa;
      border-width: 5/7.5vw 0 0 5/7.5vw;
      transform: rotate(-45deg);
    }

    .input_tip {
      margin: 30/7.5vw;
      font-size: 24/7.5vmin;
      color: #888;
    }

    /* 密码掩码模拟 */

    .input_row {
      width: 690/7.5vw;
      margin: 0 auto;
      height: 98/7.5vw;
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #e2e2e2;
      border-radius: 20/7.5vw;
    }

    .input_row .pwd_item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-right: 1px solid #e2e2e2;
      position: relative;
    }

    .pwd_item:nth-last-of-type(1) {
      border-right: 0;
    }

    .pwd_item span {
      width: 30/7.5vw;
      height: 30/7.5vw;
      border-radius: 30/7.5vw;
      background-color: #555;
    }

    .forget_pwd {
      float: right;
      margin: 30/7.5vw;
      width: 100/7.5vw;
      text-align: right;
      font-size: 24/7.5vmin;
      color: #ff7800;
    }

    /* 文本输入框位置: 设置到左边隐藏 */

    .input_control {
      position: relative;
      left: -300/7.5vw;
      bottom: 0;
      width: 100/7.5vw;
      height: 100/7.5vw;
    }
  }
</style>
