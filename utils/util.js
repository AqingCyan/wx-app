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
  console.log(array)
  return array
}

module.exports = {
  convertToStarsArray
}