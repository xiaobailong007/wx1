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
    onCollect(event) {
      //未收藏
      const postsCollected = this.data._postsCollected;
      wx.getStorageSync('key')
      postsCollected[this.data._pid] = !this.data.collected
      //this.data.collected = true
      this.setData({
        collected: !this.data.collected
      })
      wx.setStorageSync('posts_collected', postsCollected)

      wx.showToast({
        title: !this.data.collected?'取消收藏':'收藏成功',
        duration: 3000
      })

    }
  }
})