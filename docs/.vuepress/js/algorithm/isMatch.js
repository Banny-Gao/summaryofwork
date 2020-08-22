export const isMatch = (s, p) => {
  const map = new Map()

  const getMatch = (i, j) => {
    const ns = s.substr(0, i + 1)
    const np = p.substr(0, j - 1)
    let match = map.get(`${ns}, ${np}`)
    if (match === undefined) {
      match = matchs(i, j - 2)
      map.set(`${ns}, ${np}`, match)
    }
    return match
  }

  const matchs = (i, j) => {
    if (!(i + 1) && !(j + 1)) return true
  
    while (j >= 0) {
      if (p[j] === '*') {
        if (p[j - 1] === '.') {
          if (j - 2 < 0) return true
          while (i + 1 > 0) {
            const match = getMatch(i, j)
            if (match) return true
            i--
          }
          return getMatch(i, j)
        } else {
          if (i < 0 && j - 2 < 0) return true
          if (s[i] !== p[j - 1]) return getMatch(i, j)
          while (i + 1 >= 0 && s[i] === p[j - 1]) {
            const match = getMatch(i, j)
            if (match) return true
            i--
          }
          return getMatch(i, j)
        }
      }
      else if (p[j] === '.') {
        if (i < 0) return false
        j--
        i--
      } 
      else {
        if (p[j] === s[i]) {
          i--
          j--
        } else return false
      }
    }
    return i === j
  }

  return matchs(s.length - 1, p.length - 1)
}