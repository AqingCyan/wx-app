// pages/posts/posts-detail/posts-detail.js
const data = require('../../../data/posts-data.js')
const app = getApp()

Page({
  data: {
    isPlayingMusic: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取小程序全局变量，以控制音乐播放的全局控制属性
    let globalData = app.globalData
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
    // 进入页面判断是否在播放音乐以控制头图显示
    if (globalData.g_isPlayMusic && app.globaData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    // 监听背景音乐播放状态
    this.setMusicMonitor()
  },

  /**
   * 监听音乐播放，控制头图显示
   */
  setMusicMonitor: function(event) {
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayMusic = true
      app.globalData.g_currentMusicPostId = this.data.currentPostId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },

  /**
   * 收藏功能
   */
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

  /*
   * 封装了两个收藏交互，为了交互简单，我们使用toast方法
   */
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
  },

  /**
   * 分享功能
   */
  onShareTap: function(event) {
    const itemList = [
      "分享到朋友圈",
      "分享给朋友",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: (res) => {
        wx.showModal({
          title: '用户分享到了' + itemList[res.tapIndex],
          content: '现在暂时不支持分享功能'
        })
      }
    })
  },

  /**
   * 音乐播放功能
   */
  onMusicTap: function(event) {
    let currentPostId = this.data.currentPostId
    let postsData = data.postList
    let isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postsData[currentPostId].music.url,
        title: postsData[currentPostId].music.title,
        coverImgUrl: postsData[currentPostId].music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})