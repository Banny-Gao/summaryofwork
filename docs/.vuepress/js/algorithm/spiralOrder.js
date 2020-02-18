/**
 * @param {matrix[]} nums
 * @return {matrix[]}
 */
export const spiralOrder = (matrix) => {
  let m = matrix.length
  if (!m) return []
  let n = matrix[0].length
  if (!n) return []
  let i = 0
  const len = m * n
  const p = []
  for (i; i < m; i++) {
    p[i] = new Array(n).fill(0)
  }
  i = 0
  const result = []
  let x = -1,
    y = 0
  while (i < len) {
    if (p[y] && p[y][x + 1] === 0 && !(p[y - 1] && p[y - 1][x] === 0)) {
      x++
    } else if (p[y + 1] && p[y + 1][x] === 0) {
      y++
    } else if (p[y] && p[y][x - 1] === 0) {
      x--
    } else if (p[y - 1] && p[y - 1][x] === 0) {
      y--
    }
    p[y][x] = 1
    result[i] = matrix[y][x]
    i++
  }
  return result
}