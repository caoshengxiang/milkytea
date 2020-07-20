<template>
  <div class="container">
    <div class="lucky-wheel">
      <div class="lucky-title">
        <!--转盘标题图片定位在转盘上边-->
        <!--        <img src="./assets/avatar.png" alt="">-->
      </div>
      <div class="wheel-main">
        <div class="wheel-pointer-box">
          <div
            class="wheel-pointer wheelBefor"
            :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"
            @click="tcFun()"
          >
            <!--开始-->
            <!-- 指针程呼吸状态，两张指针进行透明度切换，使用css3改变透明度当条件成立时-->
            <img style="width: 150rpx;margin-left: 50rpx;height: 200rpx;"
                 src="https://8171176.h40.faiusr.com/4/153/ACgIABAEGAAg7JuN9gUovPm_pgMwlgE43AE.png" alt="">

          </div>
        </div>
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="prize-list">
            <div v-for="item in prizeList" :key="item.id" class="prize-item">
              <div class="prize-type">
                {{ item.name }}
              </div>
              <!--              <div v-if="item.count" class="prize-count">-->
              <!--                {{ item.count }}元-->
              <!--              </div>-->
              <div class="prize-pic">
                <img :src="item.icon">
              </div>
            </div>
            <div class="zplightBox">
              <!-- 透明彩灯，使用css3改变透明度使其闪动 -->
<!--                            <img src="https://www.17sucai.com/preview/1424582/2020-01-01/dzp/images/turnplate-bg.png" alt="">-->
            </div>

          </div>
        </div>

      </div>
    </div>
    <!-- 中奖弹窗 -->

    <div v-show="toast_control" class="toast">
      <div class="toastTop">
        <!--        <img src="../../assets/avatar.png" alt="">-->
      </div>
      <div class="toast-container">
        <div class="containerBox">
          <div class="toast-title">

            <p>恭喜获得 <span>{{ prizeList[this.index].name }} 奖池</span></p>

            <p><strong>现金{{ number }}元</strong></p>
          </div>
          <div class="toast-btn">
            <div class="toast-cancel" @click="close_toast">确定</div>
          </div>
        </div>

      </div>
    </div>
    <div v-show="toast_control" class="toast-mask"/>
    <!--提示-->
    <!--    <el-dialog-->
    <!--      title="提示"-->
    <!--      :visible.sync="promptDialogVisible"-->
    <!--      class="promptBox"-->
    <!--      center-->
    <!--    >-->
    <!--      <p>将消耗5个字符开启奖池</p>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--        <el-button class="cancelBtn" @click="promptDialogVisible = false">取 消</el-button>-->
    <!--        <el-button class="submitBtn" @click="rotate_handle()">确 定</el-button>-->
    <!--      </span>-->
    <!--    </el-dialog>-->
  </div>
</template>
<script>
  export default {
    props: ['wheelStartBol'], // 从父组建传 状态过来
    data () {
      return {
        easejoy_bean: 0, // 金豆
        lottery_ticket: 0, // 抽奖次数
        prizeList: [// 奖品列表
          {
            // icon: require('./assets/avatar.png'), // 奖品图片
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/1.png', // 奖品图片
            count: 500, // 奖品数量
            name: '200元京东券', // 奖品名称
            isPrize: 1, // 该奖项是否为奖品
            id: 201901
          },
          {
            // icon: require('./assets/avatar.png'),
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/7.png',
            count: 10000,
            name: '300元京东券',
            isPrize: 1,
            id: 201902
          },
          {
            // icon: require('./assets/avatar.png'),
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/3.png',
            count: 5000,
            name: '50个比特币',
            isPrize: 1,
            id: 201903
          },

          {
            // icon: require('./assets/avatar.png'), // 奖品图片
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/4.png', // 奖品图片
            count: 500, // 奖品数量
            name: '50元话费券', // 奖品名称
            isPrize: 1, // 该奖项是否为奖品
            id: 201904
          },

          {
            // icon: require('./assets/avatar.png'),
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/5.png',
            count: 50000,
            name: '100元话费券',
            isPrize: 1,
            id: 201905
          },
          {
            // icon: require('./assets/avatar.png'),
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
            count: 1000,
            name: '100个比特币',
            isPrize: 1,
            id: 201906
          },
          {
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
            count: 10000,
            name: '100个比特币',
            isPrize: 1,
            id: 201907
          },
          {
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png', // 奖品图片
            count: 500, // 奖品数量
            name: '100个比特币', // 奖品名称
            isPrize: 1, // 该奖项是否为奖品
            id: 201908
          },

          {
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
            count: 5000,
            name: '100个比特币',
            isPrize: 1,
            id: 201909
          },
          {
            icon: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
            count: 1000,
            name: '100个比特币',
            isPrize: 1,
            id: 201910
          },

        ],
        toast_control: false, // 抽奖结果弹出框控制器
        hasPrize: false, // 是否中奖
        start_rotating_degree: 0, // 初始旋转角度
        rotate_angle: 0, // 将要旋转的角度
        start_rotating_degree_pointer: 0, // 指针初始旋转角度
        rotate_angle_pointer: 0, // 指针将要旋转的度数
        rotate_transition: 'transform 6s ease-in-out', // 初始化选中的过度属性控制
        rotate_transition_pointer: 'transform 12s ease-in-out', // 初始化指针过度属性控制
        click_flag: true, // 是否可以旋转抽奖
        index: 0, // 中奖key
        number: null, // 中奖金额
        promptDialogVisible: false,
        statusLists: {
          guaStatus: 0,
          kaStatus: 0,
          fenStatus: 0,
          jiangStatus: 0
        },
        kaLists: {
          BEgua: 0,
          BEka: 0,
          BEfen: 0,
          BEjiang: 0,
          BEchi: 0
        }

      }
    },

    methods: {
      tcFun () {
        // 条件成立，才可以启动转盘
        // 获取后端接口，拿到当前拥有的卡片，这里只做示范
        // if (this.statusLists.guaStatus == 2 || this.statusLists.kaStatus == 2 || this.statusLists.fenStatus == 2 || this.statusLists.jiangStatus == 2){

        //     this.$message({
        //           message: '每天只可以兑换1次，请明天再试',
        //           type: 'warning',
        'messageBox'
        //          });
        //       return
        //  }
        //     if(this.kaLists.BEgua <= 0 || this.kaLists.BEka <= 0 || this.kaLists.BEfen <= 0 || this.kaLists.BEjiang <= 0 || this.kaLists.BEchi <= 0 ){
        //   this.$message({
        //      message: '获得5张卡才可以开奖',
        //      type: 'warning',
        //       customClass:'messageBox'
        // });

        // }else {
        //   this.promptDialogVisible = true;

        // }
        // 条件成立，弹出确认弹框
        // this.promptDialogVisible = true
        this.rotate_handle()
      },

// 获取中奖数据
      rotate_handle () {
        this.promptDialogVisible = false

        // this.$Api.redeemTaskWordPrize().then(resp => {
        // 模拟后台返回数据
        const resp = { prizeLevel: 1, bonus: 1000, txt: '铂金' }
        if (resp) {
          // 如果此奖项在转盘中有两项以上，随机转动到其中一项
          if (resp.prizeLevel === 1) { // 青铜
            const arr = [0, 3, 7]
            const i = Math.floor(Math.random() * arr.length + 1) - 1
            this.index = arr[i]// 指定每次旋转到的奖品下标
          } else if (resp.prizeLevel === 2) { // 白银
            const arr = [5, 9]
            const i = Math.floor(Math.random() * arr.length + 1) - 1// 随机数

            this.index = arr[i]// 指定每次旋转到的奖品下标
          } else if (resp.prizeLevel === 3) { // 黄金
            const arr = [2, 8]
            const i = Math.floor(Math.random() * arr.length + 1) - 1

            this.index = arr[i]// 指定每次旋转到的奖品下标
          } else if (resp.prizeLevel === 4) { // 铂金
            const arr = [1, 6]
            const i = Math.floor(Math.random() * arr.length + 1) - 1

            this.index = arr[i]// 指定每次旋转到的奖品下标
          } else if (resp.prizeLevel === 5) { // 钻石
            this.index = 4
          }

          this.rotating()

          this.number = resp.bonus

          // this.$emit('bonus', this.number)

          // this.$parent.$parent.$parent.myTaskWordDataFun()
          //
          // this.$parent.$parent.$parent.jcFun()
        } else {
          this.$message({
            message: '网络异常，请稍后重试',
            type: 'error',
            customClass: 'messageBox'
          })
        }

        // });
      },
      rotating () {
        if (!this.click_flag) return
        var type = 0 // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var duringTime = 5 // 默认为1s
        // eslint-disable-next-line no-unused-vars
        var random = Math.floor(Math.random() * 7)
        var resultIndex = this.index // 最终要旋转到哪一块，对应prizeList的下标
        // var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
        var resultAngle = [360, 324, 288, 252, 216, 180, 144, 108, 72, 36] // 最终会旋转到下标的位置所需要的度数
        var ranCircle = 6 // 附加多转几圈，2-3
        this.click_flag = false // 旋转结束前，不允许再次触发
        if (type === 0) {
          // 转动盘子
          var rotateAngle =
            this.start_rotating_degree +
            ranCircle * 360 +
            resultAngle[resultIndex] -
            this.start_rotating_degree % 360
          this.start_rotating_degree = rotateAngle
          this.rotate_angle = 'rotate(' + rotateAngle + 'deg)'
          // // //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*ranCircle+"deg)";
          // this.start_rotating_degree_pointer =360*ranCircle;
          var that = this
          // 旋转结束后，允许再次触发
          setTimeout(function () {
            that.click_flag = true
            that.game_over()
          }, duringTime * 1000 + 1500) // 延时，保证转盘转完
        } else {
          //
        }
      },
      game_over () {
        this.toast_control = true
        this.hasPrize = this.prizeList[this.index].isPrize
        //   this.hasPrize = this.index
      },
      // 关闭弹窗
      close_toast () {
        this.toast_control = false
        // this.$parent.$parent.$parent.myTaskWordDataFun();
      }
    }
  }
</script>
<style scoped lang="less">
  .container {
    width: 652rpx;
    padding-top: 58rpx;
    /*background: url("https://www.17sucai.com/preview/1424582/2020-01-01/dzp/images/turnplate-bg.png") no-repeat top center; !*转盘背景，不包含转盘 *!*/
    padding-bottom: 30rpx;
    margin: 0rpx auto;
  }

  .lucky-wheel {
    width: 625rpx;
    height: 625rpx;
    padding-top: 25rpx;
    position: relative;
  }

  .lucky-title {
    position: absolute;
    top: 0rpx;
    left: 36rpx;
    z-index: 999;
  }

  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wheel-bg {
    width: 625rpx;
    height: 625rpx;
    background: url("https://www.17sucai.com/preview/1424582/2020-01-01/dzp/images/turnplate-bg.png") no-repeat center top; /**转盘 */
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
  }

  .zplightBox {
    width: 659rpx;
    height: 657rpx;

    position: absolute;
    top: -15rpx;
    left: -16rpx;

    img {
      width: 100%;
      height: 100%;
      /*-webkit-animation-timing-function: ease-in-out !important;*/
      /*-webkit-animation-name: twinkling !important;*/
      /*-webkit-animation-duration: 300ms !important;*/
      /*-webkit-animation-iteration-count: infinite !important;*/
      /*-webkit-animation-direction: alternate !important;*/
      -webkit-animation: twinkling 400ms infinite ease-in-out;

    }
  }

  .wheel-pointer-box {
    position: absolute;
    top: 55%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -60%);
    /*width: 625rpx;*/
    /*height: 625rpx;*/
  }

  .wheel-pointer {
    width: 238rpx;
    height: 263rpx;
    transform-origin: center 60%;

    img {
      width: 100%;
      /*-webkit-animation: twinkling 1s infinite ease-in-out;*/

      -webkit-animation-timing-function: ease-in-out;
      -webkit-animation-name: twinkling;
      -webkit-animation-duration: 800ms;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-direction: alternate;
    }

  }

  .wheelBefor {
    /*background: url("https://www.17sucai.com/preview/1424582/2020-01-01/dzp/images/turnplate-bg.png") no-repeat center top; !**指针 *!*/
    background-size: 100%;

  }

  .wheel-bg div {
    text-align: center;
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .prize-item {
    width: 137rpx;
    height: 197rpx;
  }

  .prize-pic img {
    width: 69rpx;
    height: 60rpx;
  }

  .prize-count {
    font-size: 26rpx;
    font-weight: bold;
    color: #ea3697;
  }

  .prize-type {
    font-size: 24rpx;
    font-weight: bold;
  }

  .prize-list .lightBox {

    width: 57rpx;
    height: 58rpx;
    position: absolute;

  }

  // 转盘内容倾斜度
  .prize-list .prize-item:first-child {
    top: 44rpx;
    left: 245rpx;
    transform: rotate(0deg);

    .prize-type {
      color: #c23800;
      text-shadow: -1rpx 0 #fff,
      0 1rpx #fff,
      2rpx 0 #fff,
        0 -1rpx #fff;
    }

  }

  .prize-list .prize-item:nth-child(2) {
    top: 74rpx;
    left: 345rpx;
    transform: rotate(37deg);

    .prize-type {
      color: #00a004;
    }
  }

  .prize-list .prize-item:nth-child(3) {
    top: 162rpx;
    left: 409rpx;
    transform: rotate(70deg);

    .prize-type {
      color: #d99900;
    }
  }

  .prize-list .prize-item:nth-child(4) {
    top: 264rpx;
    left: 411rpx;
    transform: rotate(111deg);

    .prize-type {
      color: #c22e00;
      text-shadow: -1rpx 0 #fff,
      0 1rpx #fff,
      2rpx 0 #fff,
        0 -1rpx #fff;
    }
  }

  .prize-list .prize-item:nth-child(5) {
    top: 354rpx;
    left: 343rpx;
    transform: rotate(-220deg);

    .prize-type {
      color: #f83bff;
    }
  }

  .prize-list .prize-item:nth-child(6) {
    top: 386rpx;
    left: 247rpx;
    transform: rotate(-181deg);

    .prize-type {
      color: #fff;

    }
  }

  .prize-list .prize-item:nth-child(7) {
    top: 353rpx;
    left: 147rpx;
    transform: rotate(-146deg);

    .prize-type {
      color: #00a004;
    }
  }

  .prize-list .prize-item:nth-child(8) {
    top: 268rpx;
    left: 82rpx;
    transform: rotate(-108deg);

    .prize-type {
      color: #c22e00;
      text-shadow: -1rpx 0 #fff,
      0 1rpx #fff,
      2rpx 0 #fff,
        0 -1rpx #fff;
    }
  }

  .prize-list .prize-item:nth-child(9) {
    top: 158rpx;
    left: 82rpx;
    transform: rotate(-75deg);

    .prize-type {
      color: #d99900;
    }
  }

  .prize-list .prize-item:nth-child(10) {
    top: 75rpx;
    left: 145rpx;
    transform: rotate(-39deg);

    .prize-type {
      color: #fff;
    }
  }

  .tip {
    position: relative;
    margin: 2.5rem auto 0;
    width: 300rpx;
    border: 1rpx solid #fbc27f;
  }

  .tip-title {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1rem;
    color: #fccc6e;
    background: rgb(243, 109, 86);
    padding: 0.3125rem 0.625rem;
  }

  .tip-content {
    padding: 1.5625rem 0.625rem;
    font-size: 0.875rem;
    color: #fff8c5;
    line-height: 1.5;
  }

  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10000;
    width: 100%;
    height: 100%;
  }

  .toast {
    position: fixed;
    top: 57%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 552rpx;
    height: 490rpx;

    .toastTop {

      position: absolute;
      top: -122rpx;
      left: 86rpx;
      /*-webkit-animation: twinkling 1s infinite ease-in-out;*/
      -webkit-transform: rotate(360deg);
      animation: rotation 4s linear infinite;
      -moz-animation: rotation 4s linear infinite;
      -webkit-animation: rotation 4s linear infinite;
      -o-animation: rotation 4s linear infinite;
      width: 386rpx;

      img {
        width: 100%;
      }

    }

  }

  .toast-container {
    /*background: url("./assets/toast.png") no-repeat top center; !**中奖弹窗背景 *!*/
    background: #b0b7bd; /**中奖弹窗背景 */
    background-size: 100% 100%;
    width: 552rpx;
    height: 430rpx;
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    margin: 0rpx auto;

    .containerBox {
      width: 194rpx;
      position: absolute;
      bottom: 106rpx;
      left: 191rpx;

    }
  }

  .toast-picture {
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    width: 600rpx;

  }

  .toast-pictrue-change {
    position: absolute;
    top: -1.5rem;
    left: -1.375rem;
    width: 17.5rem;
    height: 3.125rem;
  }

  .toast-title {
    padding: 60rpx 0;
    padding-bottom: 30rpx;
    font-size: 18rpx;
    color: #fc7939;
    text-align: center;
    margin-top: 130rpx;

    p {
      color: #fff;
      line-height: 45rpx;

      span {
        color: #fcff21;
      }

      strong {
        font-size: 30rpx;
        color: #fcff21;
        font-weight: normal;
      }
    }
  }

  .toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    /*margin-bottom: 0.9375rem;*/
  }

  .toast-btn div {
    width: 154rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    font-size: 26rpx;
    font-weight: bold;
    color: #fff;
    text-shadow: -1rpx 0 #ab7d1c,
    0 1rpx #ab7d1c,
    2rpx 0 #ab7d1c,
      0 -1rpx #ab7d1c;
    cursor: pointer;
    background-color: #0a76a4;
    background-size: 100% 100%;
  }

</style>
<style lang="less">
  .container {
    .promptBox {
      .el-dialog {
        width: 415rpx !important;
        // 错误提示背景，不满足抽奖条件时
        /*background: url("../../assets/avatar.png") no-repeat center !important;*/
        background-size: 100% 100% !important;
        box-shadow: none;

        .el-dialog__headerbtn {
          display: none;
        }

        .el-dialog__header {
          padding: 12rpx 20rpx 10rpx;
        }

        .el-dialog__title {
          font-size: 22rpx;
          color: #2d78c4;
          font-weight: bold;
          display: inline-block;
          padding-top: 3rpx;
        }

        .el-button {
          width: 123rpx;
          height: 46rpx;
          line-height: 46rpx;
          text-align: center;
          font-size: 22rpx;
          font-weight: bold;
          color: #fff;
          padding: 0rpx;
          border: 0;
        }

        .cancelBtn {
          /*background: url("../../assets/avatar.png") no-repeat center; !**弹窗确定按钮背景 *!*/
          text-shadow: -1rpx 0 #ab7d1c, 0 1rpx #ab7d1c, 1rpx 0 #ab7d1c,0 - 1 rpx #ab7d1c;
        }

        .submitBtn {
          /*background: url("../../assets/avatar.png") no-repeat center; !**确定 *!*/
          text-shadow: -1rpx 0 #2073bb, 0 1rpx #2073bb, 1rpx 0 #2073bb, 0 - 1 rpx #2073bb;
        }

        .el-dialog__body {
          p {
            width: 100%;
            height: 130rpx;
            line-height: 130rpx;
            text-align: center;
            font-size: 20rpx;
            color: #fff;
            /*background: url("../../assets/avatar.png") no-repeat center;*/
            background-size: 100% 100%;

          }
        }
      }
    }
  }

  .messageBox.el-message {
    min-width: 400rpx !important;
  }

  // 弹窗呼吸效果

  @-webkit-keyframes twinkling {

    0% {
      opacity: 0.5
    }

    100% {
      opacity: 1
    }

  }

  @keyframes twinkling {

    0% {
      opacity: 0.5
    }

    100% {
      opacity: 1
    }

  }

</style>
