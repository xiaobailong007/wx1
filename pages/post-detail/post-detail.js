import {postList} from '../../data/data'
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
    postData:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(options){
      const postData = postList[options.pid]
      this.setData({
        postData
      })
    }
  }
})
