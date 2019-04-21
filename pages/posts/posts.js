// pages/posts/posts.js
const postData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posts_content: postData.postList
    })
  },

  onPostTap: function(event) {
    // 获取自定义属性postid，以操作对应数据
    let postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: './post-detail/post-detail',
    })
  }
})