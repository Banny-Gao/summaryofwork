export const smallestRange = (nums) => {
  if (!nums.length) return []

  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      const key = nums[i][j]
      const v = map.get(key) || []

      map.set(key, [...v, i])
    }
  }

  const sortMap = Array.from(map).sort((a, b) => a[0] - b[0])

  const len = sortMap.length

  const minRange = [sortMap[0][0], sortMap[len - 1][0]]
  let min = minRange[1] - minRange[0]

  for (let i = 0; i < len; i++) {
    const set = new Set(sortMap[i][1])

    let j = i + 1
    while (set.size < nums.length && j < len) {
      sortMap[j][1].forEach(v => set.add(v))
      j++
    }

    if (set.size === nums.length && sortMap[j - 1][0] - sortMap[i][0] < min) {
      minRange[0] = sortMap[i][0]
      minRange[1] = sortMap[j - 1][0]
      min = sortMap[j - 1][0] - sortMap[i][0]
    }
  }

  return minRange
}