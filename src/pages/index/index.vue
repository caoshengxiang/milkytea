<template>
  <div class="com-pages home-page">
    <button @click="start">开始录音</button>
    <button @click="pause" style="width: 49%;display: inline-block;">暂停录音</button>
    <button @click="resume" style="width: 49%;display: inline-block;">继续录音</button>
    <button @click="stop">停止录音</button>
    <button @click="playV">播放录音</button>
    <div>录音播放时长{{audio3CurrentTime}}</div>
<!--    <button @click="downloadFile">下载录音</button>-->

    <button @click="changeAudioType">切换背景音</button>
    <div class="section tc">
      <!--             show-mute-btn-->
      <div class="video-box">
        <video id="myVideo"
               class="video"
               :muted="true"
               :controls="false"
               @timeupdate="bindtimeupdate"
               :src="videoSrcs[videoIndex]"></video>
        <div class="mask"></div>
      </div>

<!--      <div class="btn-area">-->
<!--        <input @blur="bindInputBlur"/>-->
<!--        <button @click="bindSendDanmu">发送弹幕</button>-->
<!--        <button @click="changVideo">切换视频源</button>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        InnerAudioContext: '',
        InnerAudioContext2: '',
        volumeType: 1,
        innerAudioContext3: '',
        recorderManager: null,
        tempFilePath: '',
        /**/
        inputValue: '',
        videoContext: null,
        videoCurrentTime: '', // 视频当前播放时间
        videoTotalTime: '', // 视频总时间
        audio1CurrentTime: '',
        audio2CurrentTime: '',
        audio3CurrentTime: '',
        videoSrcs: [
          'https://listen.10155.com/listener/90115000/fulltrack_dl/m3u8/20200803/89381000000431-1/player.m3u8?user=N%2FA&channelid=3000007616&contentid=893810000504561850&tokenid=F96D9F0A3A3116A1BAF61C18A27589EC&timestamp=1597893622',
          // 'https://listen.10155.com/listener/90115000/fulltrack_dl/m3u8/20200803/98716000000934-1/player.m3u8?user=N%2FA&channelid=3000007616&contentid=987160000506526215&tokenid=B5AF5EED9D4F167D2076335B1B85AC5D&timestamp=1597893688',
        ],
        audioSrcs: [
          // 'http://119.27.160.97/a.1.mp3',
          // 'http://119.27.160.97/a.2.mp3',
          'http://119.27.160.97:80/1.1.mp3',
          'http://119.27.160.97:80/1.2.mp3',
          // 'http://119.27.160.97:80/2.1.mp3',
          // 'http://119.27.160.97:80/2.2.mp3',
        ],
        videoIndex: 0,
        /**/
        timer: null,
      }
    },
    components: {},

    methods: {
      start () {
        // this.stop()

        this.innerAudioContext.play()
        this.innerAudioContext2.play()

        this.videoContext.play()

        const options = {
          duration: 600000,
          sampleRate: 44100,
          numberOfChannels: 1,
          encodeBitRate: 192000,
          format: 'mp3',
          frameSize: 50
        }
        this.recorderManager.start(options)

        setTimeout(() => {
          this.checkTime()
        }, 1000)
      },
      changeAudio () {
        console.log('切换0-1', this.volumeType)
        if (this.volumeType === 1) {
          this.innerAudioContext.volume = 0
          this.innerAudioContext2.volume = 1
        } else {
          this.innerAudioContext.volume = 1
          this.innerAudioContext2.volume = 0
        }
      },
      changeAudioType () {
        console.log('切换volumeType', this.volumeType)
        if (this.volumeType === 1) {
          this.volumeType = 0
        } else {
          this.volumeType = 1
        }
        this.changeAudio()
        // this.videoContext.seek(this.innerAudioContext.currentTime) // 视频播放同步
      },
      pause () { // 暂停
        wx.getRecorderManager().pause()
        this.innerAudioContext.pause()
        this.innerAudioContext2.pause()
        this.videoContext.pause()

        if (this.timer) {
          clearInterval(this.timer)
        }
      },
      resume () { // 继续播放
        wx.getRecorderManager().resume()
        this.innerAudioContext.play()
        this.innerAudioContext2.play()
        this.videoContext.play()

        setTimeout(() => {
          this.checkTime()
        }, 1000)
      },
      stop () {
        console.log('停止录音')
        wx.getRecorderManager().stop()
        this.innerAudioContext.stop()
        this.innerAudioContext2.stop()
        this.videoContext.stop()
        this.videoContext.seek(0)
        this.innerAudioContext.seek(0)
        this.innerAudioContext2.seek(0)

        if (this.timer) {
          clearInterval(this.timer)
        }
      },
      playV () {
        this.innerAudioContext3.src = this.tempFilePath
        this.innerAudioContext3.play()
      },
      /* 视频 */
      bindInputBlur (e) {
        this.inputValue = e.detail.value
      },
      bindSendDanmu () {
        function getRandomColor () {
          let rgb = []
          for (let i = 0; i < 3; ++i) {
            let color = Math.floor(Math.random() * 256).toString(16)
            color = color.length === 1 ? '0' + color : color
            rgb.push(color)
          }
          return '#' + rgb.join('')
        }

        this.videoContext.sendDanmu({
          text: this.inputValue,
          color: getRandomColor()
        })
      },
      // changVideo () {
      //   console.log('changeVideoSrc')
      //   this.stop()
      //   if (this.videoIndex === 0) {
      //     this.videoIndex = 1
      //     this.innerAudioContext.src = this.audioSrcs[0]
      //     this.innerAudioContext2.src = this.audioSrcs[1]
      //   } else {
      //     this.videoIndex = 0
      //     this.innerAudioContext.src = this.audioSrcs[3]
      //     this.innerAudioContext2.src = this.audioSrcs[4]
      //   }
      //   // this.videoContext.play()
      //   // this.videoContext.seek(this.videoCurrentTime)
      // },
      bindtimeupdate (e) {
        // console.log(e)
        this.videoCurrentTime = e.mp.detail.currentTime
        this.videoTotalTime = e.mp.detail.duration
        console.log('视频播放时长', this.videoCurrentTime)
        console.log('视频总时长', this.videoTotalTime)
      },
      downloadFile () {
        console.log('点击下载')
        if (!this.tempFilePath) {
          console.log('下载没有临时地址tempFilePath')
          return
        }
        wx.downloadFile({
          url: this.tempFilePath,
          success (res) {
            console.log('下载结果', res)
          }
        })
      },
      checkTime () {
        const allowTime = 2.5 // s
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.timer = setInterval(() => {
          if (!this.audio2CurrentTime || !this.audio1CurrentTime) {
            console.log('跳过--时差校验')
            return
          }
          console.log('时差校验')
          if (Math.abs(this.innerAudioContext.currentTime - this.videoCurrentTime) > allowTime) {
            console.log('矫正时差-------------音频1------------矫正时差', this.innerAudioContext.currentTime, this.innerAudioContext2.currentTime, this.videoCurrentTime)
            this.innerAudioContext.seek(this.videoCurrentTime)
            this.innerAudioContext2.seek(this.videoCurrentTime)
            this.pause()
            wx.showLoading({
              title: '当前网络环境差，请切换到良好网络',
            })
            setTimeout(() => {
              this.resume()
              wx.hideLoading()
            }, 3000)
          } else if (Math.abs(this.innerAudioContext2.currentTime - this.videoCurrentTime) > allowTime) {
            console.log('矫正时差-------------音频2------------矫正时差', this.innerAudioContext.currentTime, this.innerAudioContext2.currentTime, this.videoCurrentTime)
            this.innerAudioContext.seek(this.videoCurrentTime)
            this.innerAudioContext2.seek(this.videoCurrentTime)
            this.pause()
            wx.showLoading({
              mask: true,
              title: '当前网络环境差，请切换到良好网络',
            })
            setTimeout(() => {
              this.resume()
              wx.hideLoading()
            }, 3000)
          }
        }, 250)
      },
    },
    mounted () {
    },
    /* 小程序 */
    onShow () {
    },
    onReady (res) {
      this.innerAudioContext = wx.createInnerAudioContext()
      // this.innerAudioContext.src = 'https://img.tukuppt.com/newpreview_music/08/99/49/5c897788e421b53181.mp3'
      this.innerAudioContext.src = this.audioSrcs[0]
      // this.innerAudioContext.autoplay = true
      this.innerAudioContext.onCanplay(() => {
        console.log('InnerAudioContext 可以播放')
      })
      this.innerAudioContext.onPlay(() => {
        console.log('音频1开始播放')
        this.changeAudio()
      })
      this.innerAudioContext.onEnded(() => {
        console.log('音频1结束')
        this.stop()
      })
      this.innerAudioContext.onTimeUpdate(() => {
        this.audio1CurrentTime = this.innerAudioContext.currentTime
        console.log('音频1 播放时长', this.audio1CurrentTime)
      })
      this.innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      this.innerAudioContext2 = wx.createInnerAudioContext()
      // this.innerAudioContext2.autoplay = true
      // this.innerAudioContext2.src = 'https://img.tukuppt.com/newpreview_music/08/99/75/5c8994da1484642590.mp3'
      this.innerAudioContext2.src = this.audioSrcs[1]
      this.innerAudioContext2.onCanplay(() => {
        console.log('InnerAudioContext2 可以播放')
      })
      this.innerAudioContext2.onPlay(() => {
        console.log('音频2开始播放')
        this.changeAudio()
      })
      this.innerAudioContext2.onTimeUpdate(() => {
        // console.log('音频2 播放时长', this.innerAudioContext2.currentTime)
        this.audio2CurrentTime = this.innerAudioContext2.currentTime
        console.log('音频2 播放时长', this.audio2CurrentTime)
      })
      this.innerAudioContext2.onEnded(() => {
        console.log('音频2结束')
        this.stop()
      })
      this.innerAudioContext2.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })

      this.innerAudioContext3 = wx.createInnerAudioContext()
      this.innerAudioContext3.onPlay(() => {
        console.log('开始播放录音')
      })
      this.innerAudioContext3.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      this.innerAudioContext3.onTimeUpdate(() => {
        this.audio3CurrentTime = this.innerAudioContext3.currentTime
        console.log('播放录音 播放时长', this.innerAudioContext3.currentTime)
      })
      this.innerAudioContext3.onEnded(() => {
        console.log('录音播放结束结束')
        this.stop()
      })
      /**/

      this.recorderManager = wx.getRecorderManager()

      this.recorderManager.onStart(() => {
        console.log('录音 start')
      })
      this.recorderManager.onPause(() => {
        console.log('录音 pause')
      })
      this.recorderManager.onStop((res) => {
        console.log('录音 stop', res)
        const { tempFilePath } = res
        console.log(tempFilePath, 'tempFilePath')
        this.tempFilePath = tempFilePath
      })
      this.recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })
      this.videoContext = wx.createVideoContext('myVideo')
      wx.onNetworkStatusChange(function (res) {
        console.log(res.isConnected)
        console.log(res.networkType)
      })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
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

  video::-webkit-media-controls {
    display:none !important;
  }
  .video-box {
    position: relative;
    width: 100%;
    height: 500rpx;
    .video {
      width: 100%;
      height: 500rpx;
    }
    .mask {
      width: 100%;
      height: 500rpx;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(255, 69, 40, 0);
      z-index: 99;
    }
  }
</style>
