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


/*
      i --> i
  BBC ABCDAB ABCDABCDABDE
      j --> j
      ABCDABD
           j 
          ABCDABD
             j --> j           
             ABCDABD
                  j
                 ABCDABD

  - 如果j = -1，或者当前字符匹配成功（即S[i] == P[j]），都令i++，j++，继续匹配下一个字符
  - 如果j != -1，且当前字符匹配失败（即S[i] != P[j]），则令 i 不变，j = next[j]
  - 跳出循环后判断j的值

  模式串最优移动为移动最长前缀至最长后缀(此前缀等于此后缀)所在的地方
  
  求next数组

  next[j] = k, 表示next元素不匹配时，模式传向右移动m，新的j为j - m = k
  next[0] = -1  // next[0]前没有元素，模式串向右移动1，k 为 -1
  next[1] = 0  // next[1]前只有一个元素，无公共前后缀串，不匹配时模式串向右移动1，k为0

  p = aaabc
  - 若p[k] == p[j]，则next[j + 1 ] = next [j] + 1 = k + 1；
      p = aaabc
      p[2]前有aa，最长前后缀为a，长度为1, next[2] = 1
      然后，next[3] = 2, aaa有最长公共前后缀aa
  - 若p[k] ≠ p[j]，如果此时p[ next[k] ] == p[j]，则next[ j + 1 ] =  next[k] + 1，否则继续递归前缀索引k = next[k]，而后重复此过程
    
      p[2] ≠ p[3] --> p[next[2] = 1] ≠ p[3] --> p[next[1] = 0] ≠ p[3] --> p[next[0] = -1] 
*/



export const strStr_KMP = (haystack, needle) => {
  const hLen = haystack.length
  const nLen = needle.length

  if (!needle) return 0
  if (nLen > hLen) return -1

  const getNext = (p) => {
    const next = [-1]
    const pL = p.length
    let k = -1
    let j = 0

    while (j < pL - 1) {
      if (k === -1 || p[j] === p[k]) {
        j++
        k++
        next[j] = k
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
