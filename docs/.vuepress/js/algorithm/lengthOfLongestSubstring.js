export const lengthOfLongestSubstring = (S) => {
  let max = 0,
    i = 0,
    j = 0
  let cStr = ''

  for (j; j < S.length; j++) {
    const s = S[j]
    const prevIndex = cStr.indexOf(s)
    if (prevIndex !== -1) {
      cStr = cStr.substring(prevIndex + 1)
      i += prevIndex + 1
    }

    cStr += s
    max = Math.max(max, j - i + 1)
  }
  return max
}

export const lengthOfLongestSubstring_map = S => {
  const map = new Map()
  let max = 0
  for (let i = 0, j = 0; j < S.length; j++) {
    if (map.has(S[j])) {
      i = Math.max(map.get(S[j]) + 1, i)
    }
    map.set(S[j], j)
    max = Math.max(max, j - i + 1)
  }
  return max
}