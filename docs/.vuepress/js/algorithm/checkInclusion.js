export const checkInclusion_sort = (s1, s2) => {
  let start = 0
  const len = s1.length

  const sortStr = str => str.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt()).join('')
  const sortS1 = sortStr(s1)
  const isCheckIn = (str) => sortStr(str) === sortS1

  while((start + len) <= s2.length) {
    const s2sub = s2.substring(start, start + len)
    if (isCheckIn(s2sub)) return true
    start++
  }
  return false
}

export const checkInclusion = (s1, s2) => {
  const baseMap = {}
  for(let i = 0; i < s1.length; i++) {
    const c = s1[i]
    baseMap[c] = baseMap[c] ? baseMap[c] + 1 : 1
  }

  let map = Object.assign({}, baseMap)

  let start = 0, end = 0
  while (end < s2.length) {
    const c = s2[end++]
    
    if (map[c] === undefined) {
      start = end
      map = Object.assign({}, baseMap)
      continue
    }

    map[c]-- 
    while (start < end && map[c] < 0) {
      const a = s2[start++]
      map[a]++
    }

    if (end - start === s1.length) return true
  }

  return false
}