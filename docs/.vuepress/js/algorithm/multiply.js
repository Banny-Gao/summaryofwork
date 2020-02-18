export const multiply = (num1, num2) => {
  if (+num1 === 0 || +num2 === 0) return '0'
  const len1 = num1.length,
    len2 = num2.length
  if (len1 > 110 || len2 > 110) return
  const arr1 = Array.from(num1).reverse(),
    arr2 = Array.from(num2).reverse(),
    arrSum = new Array(len1 + len2 - -1).fill(0)
  let m = 0;
  while (m < len2) {
    for (let n = 0; n < len1; n++) {
      let product = arr2[m] * arr1[n],
        index = m + n
      arrSum[index] += product % 10
      arrSum[index + 1] += ~~(product / 10)
      while (arrSum[index] >= 10) {
        const temp = arrSum[index]
        arrSum[index] = temp % 10
        arrSum[index + 1] += ~~(temp / 10)
        index++
      }
    }
    m++
  }
  return arrSum.reverse().join('').replace(/^0*(\d*)/, '$1')
}