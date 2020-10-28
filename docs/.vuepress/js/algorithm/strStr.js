export const strStr = (haystack, needle) => {
  const hLen = haystack.length
  const nLen = needle.length
  if (!needle) return 0
  if (nLen > hLen) return -1

  let i = 0

  while (i + nLen - 1 < hLen) {
    if (haystack[i] === needle[0]) {
      let j = 1
      while (j < nLen && haystack[i + j] === needle[j]) j++
      if (j === nLen) return i
    }
    i++
  }

  return -1
}

export const strStr_KMP = (haystack, needle) => {
  const hLen = haystack.length
  const nLen = needle.length

  if (!needle) return 0
  if (nLen > hLen) return -1

  const getNext = (p) => {
    const next = [-1]

    let k = -1
    let j = 0

    while (j < p.length - 1) {
      if (k === -1 || p[j] === p[k]) {
        j++
        k++
        if (p[j] !== p[k]) next[j] = k
        else next[j] = next[k]
      } else k = next[k]
    }

    return next
  }

  const next = getNext(needle)
  let i = 0
  let j = 0

  while (i < hLen && j < nLen) {
    if (j === -1 || haystack[i] === needle[j]) {
      i++
      j++
    } else j = next[j]
  }
  if (j === nLen) return i - j

  return -1
}
