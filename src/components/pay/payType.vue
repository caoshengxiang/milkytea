<template>
  <div class="payment-con">
    <div class="payment-type" @click="payType = 1" v-if="vipPay">
      <div class="type">
        <img class="type-icon" src="../../../static/icon/pay01.png" alt="">
        <span class="type-text">会员卡余额支付</span>
      </div>
      <span>
              <img v-if="payType === 1" class="check" src="../../../static/icon/check-active.png" alt="">
              <img v-else class="check" src="../../../static/icon/check.png" alt="">
            </span>
    </div>
    <div class="payment-type" @click="payType = 2" v-if="wxPay">
      <div class="type">
        <img class="type-icon" src="../../../static/icon/pay02.png" alt="">
        <span class="type-text">微信支付</span>
      </div>
      <span>
              <img v-if="payType === 2" class="check" src="../../../static/icon/check-active.png" alt="">
              <img v-else class="check" src="../../../static/icon/check.png" alt="">
            </span>
    </div>
    <div class="payment-type" @click="payType = 3" v-if="myPay">
      <div class="type">
        <img class="type-icon" src="../../../static/icon/pay03.png" alt="">
        <span class="type-text">支付宝支付</span>
      </div>
      <span>
              <img v-if="payType === 3" class="check" src="../../../static/icon/check-active.png" alt="">
              <img v-else class="check" src="../../../static/icon/check.png" alt="">
            </span>
    </div>
    <div class="pay-btn" v-if="btnText">
      <form v-if="!btnIsClick" @submit="btnClick" report-submit="true">
        <button form-type="submit" data-type="click" class="com-button-1">{{btnText}}</button>
      </form>
      <form v-else report-submit="true">
        <button form-type="submit" data-type="click" class="btn-gray">
          {{btnText}}
        </button>
      </form>
      <!--<div class="com-button-1" @click="btnClick">{{btnText}}</div>-->
    </div>
  </div>
</template>

<script>
  /* event
  * payTypeChange 支付方式改变
  * */
  export default {
    name: 'payType',
    data () {
      return {
        btnIsClick: false
      }
    },
    watch: {
      payType (va) {
        this.$emit('payTypeChange', va)
      }
    },
    props: {
      payType: { // 默认支付方式 1 会员卡余额支付, 2 微信支付, 3 支付宝支付
        type: Number,
        default: 1
      },
      typeInclude: { // 支付方式选项，一定要下传数组
        type: Array,
        default () {
          return [1, 2, 3]
        }
      },
      btnText: { // 默认支付按钮，为空不显示按钮
        type: String,
        default: ''
      }
    },
    computed: {
      vipPay () {
        return this.typeInclude.includes(1)
      },
      wxPay () {
        return this.typeInclude.includes(2)
      },
      myPay () {
        return this.typeInclude.includes(3)
      }
    },
    methods: {
      btnClick (e) {
        if (!this.btnIsClick) {
          this.btnIsClick = true
          this.$emit('btnClick', {formId: e.mp.detail.formId})
          setTimeout(() => {
            this.btnIsClick = false
          }, 10000)
        } else {
          console.log('10秒内重复点击')
          wx.showToast({
            icon: 'none',
            title: '10秒内重复点击'
          })
        }
      }
    },
    mounted () {
      console.log('支付方式', this.typeInclude)
    }
  }
</script>

<style scoped lang="less">
  @import url(../../../static/style/common);

  .payment-con {
    /* margin-top: 30/7.5vw;*/
    .payment-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25/7.5vw 0;
      .type {
        display: flex;
        align-items: center;
      }
      .type-icon {
        width: 58/7.5vw;
        height: 58/7.5vw;
      }
      .type-text {
        margin-left: 20/7.5vw;
        font-size: 28/7.5vmin;
      }
      .check {
        width: 32/7.5vw;
        height: 32/7.5vw;
      }
    }
    .pay-btn {
      margin-top: 48/7.5vw;
    }
  }

  .btn-gray {
    width: 686/7.5vw;
    height: 88/7.5vw;
    line-height: 88/7.5vw;
    text-align: center;
    background-color: #b7b7b7;
    font-size: 30/7.5vmin;
    color: #1A1A1A;
  }
</style>
