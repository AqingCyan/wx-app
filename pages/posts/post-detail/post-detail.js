// pages/posts/posts-detail/posts-detail.js
const data = require('../../../data/posts-data.js')

Page({
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接收传递过来的id
    let postId = options.id
    this.data.currentPostId = postId
    let postsData = data.postList
    let postData = postsData[postId]
    this.setData({
      postData
    }) 

    // 获取缓存查询收藏状态
    let postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      let postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      let postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },

  onColletionTap: function(event) {
    let postsCollected = wx.getStorageSync('posts_collected')
    let postCollected = postsCollected[this.data.currentPostId]
    // 收藏变未收藏，未收藏变收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected
    // 交互
    // this.showModal(postsCollected, postCollected)
    this.showToast(postsCollected, postCollected)
  },

  showToast: function(postsCollected, postCollected) {
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      duration: 1000,
      success: (res) => {
        // 更新文章是否收藏的缓存值
        wx.setStorageSync('posts_collected', postsCollected)
        // 更新数据绑定遍历，从而实现切换图片
        this.setData({
          collected: postCollected
        })
      }
    })
  },

  showModal: function(postsCollected, postCollected) {
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: (res) => {
        if (res.confirm) {
          // 更新文章是否收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected)
          // 更新数据绑定遍历，从而实现切换图片
          this.setData({
            collected: postCollected
          })
        }
      }
    })
  }
})