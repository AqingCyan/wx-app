function convertToStarsArray(stars) {
  let num = stars.toString().substring(0, 1)
  let array = []
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Tyep': 'json'
    },
    success: (res) => {
      callback(res)
    },
    fail: (error) => {
      console.log(error)
    }
  })
}

module.exports = {
  convertToStarsArray,
  http
}