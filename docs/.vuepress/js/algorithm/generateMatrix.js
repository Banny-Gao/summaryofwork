/**
 * @param  {number} n
 * @return {number[][]}
 */
export const generateMatrix = (n) => {
  if(!n) return []
  let p = new Array(n), i = 0
  for(i; i < n; i++) {
    p[i] = new Array(n).fill(0)
  }
  i = 0
  let x = -1, y = 0
  while( i < n ** 2) {
    if (p[y] && p[y][x + 1] === 0 && !(p[y - 1] && p[y - 1][x] === 0)) {
      x++
    } else if (p[y + 1] && p[y + 1][x] === 0) {
      y++
    } else if (p[y] && p[y][x - 1] === 0) {
      x--
    } else if (p[y - 1] && p[y - 1][x] === 0) {
      y--
    }
    p[y][x] = i + 1
    i++
  }
  return p
}