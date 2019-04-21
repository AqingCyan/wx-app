// pages/posts/posts-detail/posts-detail.js
const data  = require('../../../data/posts-data.js')

Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接收传递过来的id
    let postId = options.id
    let postsData = data.postList
    let postData = postsData[postId]
    this.setData({
      postData
    })
  }
})