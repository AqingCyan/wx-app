const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {
    const doubanBase = app.globalData.doubanBase
    let inTheatersUrl = `${doubanBase}/v2/movie/in_theaters?start=0&count=3`
    let comingSoonUrl = `${doubanBase}/v2/movie/coming_soon?start=0&count=3`
    let top250Url = `${doubanBase}/v2/movie/top250?start=0&count=3`
    this.getMovieListData(inTheatersUrl, "inTheaters")
    this.getMovieListData(comingSoonUrl, "comingSoon")
    this.getMovieListData(top250Url, "top250")
  },

  /**
   * 获取电影列表
   */
  getMovieListData: function (url, settedKey) {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Tyep': 'json'
      },
      success: (res) => {
        this.processDoubanData(res.data, settedKey)
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },

  /**
   * 处理电影数据
   */
  processDoubanData: function (moviesDouban, settedKey) {
    let movies = []
    for (let idx in moviesDouban.subjects) {
      let subject = moviesDouban.subjects[idx]
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
    let readData = {}
    readData[settedKey] = {
      movies
    }
    this.setData(readData)
  }
})