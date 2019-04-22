// pages/posts/posts.js
const postData = require('../../data/posts-data.js')

Page({
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posts_content: postData.postList
    })
  },

  /**
   * 新闻列表跳转详情
   */
  onPostTap: function(event) {
    // 获取自定义属性postid，以操作对应数据
    let postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      // 传递postId作为页面参数
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  /**
   * 轮播图跳转详情(利用事件委托机制)
   */
  onSwiperTap: function(event) {
    // target 与 currentTarget
    // target指的是当前点击组件 和 currentTarget指的是事件捕获的组件
    // 这里的target指的是image 而currentTarget指的是swiper
    let postId = event.target.dataset.postid
    wx.navigateTo({
      // 传递postId作为页面参数
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})