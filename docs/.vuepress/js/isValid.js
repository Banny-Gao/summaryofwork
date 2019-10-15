export const isValid_long = (str) => {
  str = str.replace(/\s/g, '')
  if (str === '') return true
  const bracketTypes = {
    '(': {
      sortIndex: 0,
      index: [],
      par: ')'
    },
    ')': {
      sortIndex: 1,
      index: [],
      par: '('
    },
    '[': {
      sortIndex: 2,
      index: [],
      par: ']'
    },
    ']': {
      sortIndex: 3,
      index: [],
      par: '['
    },
    '{': {
      sortIndex: 4,
      index: [],
      par: '}'
    },
    '}': {
      sortIndex: 5,
      index: [],
      par: '{'
    }
  }
  for (let i = 0; i < str.length; i++) {
    const key = str[i],
      rKey = bracketTypes[key]['par'],
      lSort = bracketTypes[key].sortIndex,
      rSort = bracketTypes[rKey].sortIndex,
      lIndex = bracketTypes[key].index,
      rIndex = bracketTypes[rKey].index
    lIndex.push(i)
    if (lIndex.length > rIndex.length && lSort > rSort) return false
  }
  let flag = true;
  ['(', '[', '{'].forEach(key => {
    const lIndex = bracketTypes[key].index,
      rKey = bracketTypes[key]['par'],
      rIndex = bracketTypes[rKey].index
    if (lIndex.length !== rIndex.length) {
      flag = false
      return
    }
    let i = 0
    while (i < rIndex.length) {
      const rI = rIndex[i]
      const lI = getNear(rI)
      if ((rI - lI - 1) % 2 !== 0) {
        flag = false
        break
      }
      i++
    }
    function getNear(i) {
      let nearIndex, near
      for (let j = 0; j < lIndex.length; j++) {
        if (i - lIndex[j] > 0) nearIndex = j
      }
      near = lIndex[nearIndex]
      lIndex.splice(nearIndex, 1)
      return near
    }
  })
  return flag
}

export const isValid = (str) => {
  str = str.replace(/\s/g, '')
  if (str === '') return true
  const stack = [],
    map = {
      '(': ')',
      '{': '}',
      '[': ']'
    }
  for (let i = 0; i < str.length; i++) {
    const key = str[i]
    if (map[key]) {
      stack.push(map[key])
    } else {
      if (key !== stack.pop())
        return false
    }
  }
  return stack.length === 0
}