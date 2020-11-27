import {
  postList
} from '../../data/data.js'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    postData: {},
    collected: false,
    isPlaying: false,
    _pid: null,
    _postsCollected: {},
    _mgr: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      const postData = postList[options.pid]
      this.data._pid = options.pid
      const postsCollected = wx.getStorageSync('posts_collected')
      this.data._postsCollected = postsCollected
      let collected = postsCollected[this.data._pid]
      if (collected === undefined) {
        //如果undefined,说明文章从没有被收藏过
        collected = false
      }
      this.setData({
        postData,
        collected,
        isPlaying: this.currentMusicIsPlaying() 
      })
      const mgr = wx.getBackgroundAudioManager()
      this.data._mgr = mgr
      mgr.onPlay(this.onMusicStart.bind(this))
      mgr.onPause(this.onMusicStop.bind(this))
      // mgr.onPlay(()=>{
      //   
      // })
      // mgr.onStop(this.onMusicStop)
      // mgr.onPause(this.onMusicStop)
    },

    currentMusicIsPlaying() {
      if (app.gIsPlayingMusic && App.gIsPlayingMusicPostId === this.data._pid){
        return true
      }
      return false
    },


    onMusicStart(event) {
      const mgr = this.data._mgr
      const music = postList[this.data._pid].music
      mgr.src = music.url
      mgr.title = music.title
      mgr.coverImgUrl = music.coverImg

      app.gIsPlayingMusic = true
      app.gIsPlayingMusicPostId = this.data._pid

      this.setData({
        isPlaying: true
      })
    },

    onMusicStop(event) {
      const mgr = this.data._mgr
      mgr.pause()

      app.gIsPlayingMusic = false
      app.gIsPlayingMusicPostId = -1
      this.setData({
        isPlaying: false
      })
    },

    async onShare(event) {
      const result = await wx.showActionSheet({
        itemList: ['分享到QQ', '分享到微信', '分享到朋友圈'],
      })
      console.log(result)
    },

    async onCollect(event) {
      //未收藏
      const postsCollected = this.data._postsCollected;
      wx.getStorageSync('key')
      postsCollected[this.data._pid] = !this.data.collected
      this.setData({
        collected: !this.data.collected
      })
      wx.setStorageSync('posts_collected', postsCollected)

      wx.showToast({
        title: !this.data.collected ? '取消收藏' : '收藏成功',
        duration: 3000
      })
      // const result = await wx.showModal({
      //   title: '是否收藏文章',
      //   // success(res) {
      //   //   console.log(res)
      //   // }
      // })
      // console.log(result)
      // if (result.confirm) {

      // }

    }
  }
})