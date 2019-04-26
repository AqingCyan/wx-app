// pages/movies/more-movie/more-movie.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({
  data: {
    movies: {},
    navigateTitle: ''
  },

  onLoad: function(options) {
    const category = options.category
    this.setData({
      navigateTitle: category
    })
    let dataUrl = ''
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesDouban) {
    let movies = []
    for (let idx in moviesDouban.data.subjects) {
      let subject = moviesDouban.data.subjects[idx]
      let title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      let temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    this.setData({
      movies
    })
  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }
})