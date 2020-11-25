import {
  postList
} from '../../data/data'
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
    //不做数据绑定的加上_
    _pid: null,
    _postsCollected: {}
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
        collected
      })
    },

    onMusicStart(event) {
      const mgr = wx.getBackgroundAudioManager()
      const music = postList[this.data._pid].music
      mgr.src = music.url
      mgr.title = music.title
      mgr.coverImgUrl=music.coverImg
      this.setData({
        isPlaying: true
      })
    },

    onMusicStop(event) {
      const mgr = wx.getBackgroundAudioManager()
      mgr.stop()
      this.setData({
        isPlaying:false
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