/**
 * @param {number[]} arr1
 * @param {number} m
 * @param {number[]} arr2
 * @param {number} n
 * @return {void} Do not return anything, modify arr1 in-place instead.
 */
export const merge = (arr1, m, arr2, n) => {
  const result = []
  let l = 0,
    r = 0,
    index = 0
  while (index < m + n) {
    if (l >= m) {
      result[index] = arr2[r]
      r++
    } else if (r >= n) {
      result[index] = arr1[l]
      l++
    } else if (arr1[l] <= arr2[r] && l < m) {
      result[index] = arr1[l]
      l++
    } else if (arr2[r] < arr2[l] && r < n) {
      result[index] = arr2[r]
      r++
    }
    index++
  }
  return result
}