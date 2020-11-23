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
    _pid: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      const postData = postList[options.pid]
      this.data._pid = options.pid
      const postsCollected = wx.getStorageSync('postsCollected')
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
      const postsCollected = {};
      postsCollected[this.data._pid] = true
      this.data.collected = true
      this.setData({
        collected: this.data.collected
      })
      wx.setStorageSync('posts_collected', postsCollected)

    }
  }
})