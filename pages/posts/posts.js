import {postList} from '../../data/data'

// pages/posts/posts.js
// var postData = require("../../data/data.js");
// console.log(postData)


console.log(postList)
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // var content={
    //   title:"2020",
    //   content:"8月9号",
    //   imgSrc:"/images/1.png",
    //   dataNum:{
    //     reading:102,
    //     collection:92
    //   },
    //   datail:"LPL",
    //   dateTime:"24小时前",
    //   headImgSrc:"/images/avatar/1.png",
    //   auatar:"猫是猫的猫",
    //   data:"Nov 20 2020",
    //   avatar:"/images/avatar/5.png",
    //   postId:3
    // };
    this.setData({
      postList
    });
  },

  onGoToDetail(event) {

    const pid = event.currentTarget.dataset.postId;

    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid='+pid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})