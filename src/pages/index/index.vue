<template>
  <div class="com-pages home-page">
    <button @click="start">开始录音</button>
    <button @click="pause">暂停录音</button>
    <button @click="resume">继续录音</button>
    <button @click="stop">停止录音</button>
    <button @click="playV">播放录音</button>

    <button @click="changeAudioType">切换背景音</button>
    <div class="section tc">
      <!--             show-mute-btn-->
      <video id="myVideo"
             :muted="true"
             @timeupdate="bindtimeupdate"
             style="width: 100%;"
             :src="videoSrcs[videoIndex]"></video>
      <div class="btn-area">
        <input @blur="bindInputBlur"/>
        <button @click="bindSendDanmu">发送弹幕</button>
        <button @click="changVideo">切换视频源</button>
      </div>
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
        videoSrcs: [
          // 'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8',
          // 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
          'https://listen.10155.com/listener/90115000/fulltrack_dl/m3u8/20200803/907070000501026862-1/player.m3u8?user=N/A&channelid=3000007147&contentid=93053000202001170414830&tokenid=2F48ED34BF6754C3CD1EAD8F56C5ABBD&timestamp=1588816704',
          'https://listen.10155.com/listener/90115000/fulltrack_dl/m3u8/20200803/907070000501026862-2/player.m3u8?user=N/A&channelid=3000007147&contentid=93053000202001170414830&tokenid=2F48ED34BF6754C3CD1EAD8F56C5ABBD&timestamp=1588816704',
         ],
        audioSrcs: [
          'http://119.27.160.97/a.1.mp3',
          'http://119.27.160.97/a.2.mp3'
        ],
        videoIndex: 0,
        /**/
      }
    },
    components: {},

    methods: {
      start () {
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
      },
      resume () { // 继续播放
        wx.getRecorderManager().resume()
        this.innerAudioContext.play()
        this.innerAudioContext2.play()
        this.videoContext.play()
      },
      stop () {
        wx.getRecorderManager().stop()
        this.innerAudioContext.stop()
        this.innerAudioContext2.stop()
        this.videoContext.stop()
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
      changVideo () {
        this.videoContext.stop()
        if (this.videoIndex === 0) {
          this.videoIndex = 1
        } else {
          this.videoIndex = 0
        }
        this.videoContext.play()
        this.videoContext.seek(this.videoCurrentTime)
      },
      bindtimeupdate (e) {
        // console.log(e)
        this.videoCurrentTime = e.mp.detail.currentTime
        console.log('视频播放时长', this.videoCurrentTime)
      }
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
        console.log('音频1 播放时长', this.innerAudioContext.currentTime)
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
        console.log('音频2 播放时长', this.innerAudioContext2.currentTime)
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
      this.innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
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
</style>
