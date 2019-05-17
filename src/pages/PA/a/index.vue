<template>
  <div>
    <div @click='showInputLayer' class="btn_pay">立即支付</div>
    <!-- 密码输入框 -->
    <div v-if='showPayPwdInput'>
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
          <div class='pwd_item' v-for='(item, index) in 6'>
            <span v-if='pwdVal.length > index'></span>
          </div>
        </div>
<!--        <div class='forget_pwd' @click="hidePayLayer">忘记密码</div>-->
        <input class='input_control' password type='number' :focus='payFocus' v-model="pwdVal" @input='inputPwd' maxlength='6'/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showPayPwdInput: false, // 是否展示密码输入层
      pwdVal: '', // 输入的密码
      payFocus: true // 文本框焦点
    }
  },

  methods: {
    /**
     * 显示支付密码输入层
     */
    showInputLayer: function () {
      this.showPayPwdInput = true
      this.payFocus = true
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
      this.payFocus = true
    },
    /**
     * 输入密码监听
     */
    inputPwd: function () {
      console.log(this.pwdVal.length)
      if (this.pwdVal.length >= 6) {
        this.hidePayLayer()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .btn_pay{
    margin: 100rpx auto; width: 600rpx; height: 100rpx; line-height: 100rpx; border-radius: 100rpx;
    background-color: #d3a95a; color: #fff; font-size: 36rpx; text-align: center;
  }
  /* 支付密码css start */
  .bg_layer{
    position: fixed; left: 0; top: 0; bottom: 0; right: 0;
    background-color: rgba(0, 0, 0, 0.6); z-index: 9998;
  }
  .input_main{
    position: fixed; left: 0; bottom: 500rpx; width: 100%; height: 394rpx;
    background-color: #fff; z-index: 9999;
  }
  .input_title{
    width: 100%; height: 90rpx; line-height: 90rpx; text-align: center;
    font-size: 32rpx; border-bottom: 1rpx solid #e2e2e2;
  }
  .input_back{
    position: absolute; left: 0; top: 0;
    width: 80rpx; height: 90rpx; display: flex; justify-content: center; align-items: center;
  }
  .input_back span{
    width: 20rpx;
    height: 20rpx;
    background-color: white;
    border: 1rpx solid #aaa;
    border-width: 5rpx 0 0 5rpx;
    transform: rotate(-45deg);
  }

  .input_tip{  margin: 30rpx; font-size: 24rpx; color: #888; }

  /* 密码掩码模拟 */
  .input_row{
    width: 690rpx; margin: 0 auto; height: 98rpx; position: relative;
    display: flex; align-items: center; border: 1rpx solid #e2e2e2; border-radius: 20rpx;
  }
  .input_row .pwd_item{
    flex: 1; display: flex; align-items: center; justify-content: center;
    height: 100%; border-right: 1rpx solid #e2e2e2; position: relative;
  }
  .pwd_item:nth-last-of-type(1) { border-right: 0; }
  .pwd_item span {
    width: 30rpx; height: 30rpx; border-radius: 30rpx; background-color: #555;
  }


  .forget_pwd{
    float: right; margin: 30rpx; width: 100rpx; text-align: right; font-size: 24rpx; color: #ff7800;
  }

  /* 文本输入框位置: 设置到左边隐藏 */
  .input_control {
    position: relative; left: -300rpx; bottom: 0; width: 100rpx; height: 100rpx;
  }
</style>
