const app = getApp()

Page({
  onLoad: function (options) {
    const doubanBase = app.globalData.doubanBase
    let inTheatersUrl = `${doubanBase}/v2/movie/in_theaters?start=0&count=3`
    let comingSoon = `${doubanBase}/v2/movie/coming_soon?start=0&count=3`
    let top250 = `${doubanBase}/v2/movie/top250?start=0&count=3`
    this.getMovieListData(inTheatersUrl)
    // this.getMovieListData(comingSoon)
    // this.getMovieListData(top250)
  },

  /**
   * 获取电影列表
   */
  getMovieListData: function(url) {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Tyep': 'json'
      },
      success: (res) => {
        // console.log(res)
        this.processDoubanData(res.data)
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },

  /**
   * 处理电影数据
   */
  processDoubanData: function(moviesDouban) {
    let movies = []
    for (let idx in moviesDouban.subjects) {
      let subject = moviesDouban.subjects[idx]
      console.log(subject)
      let title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      let temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies
    })
  }
})