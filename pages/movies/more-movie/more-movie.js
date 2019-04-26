// pages/movies/more-movie/more-movie.js
Page({
  data: {
    navigateTitle: ''
  },

  onLoad: function (options) {
    const category = options.category
    this.setData({
      navigateTitle: category
    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: (res) => {

      }
    })
  }
})