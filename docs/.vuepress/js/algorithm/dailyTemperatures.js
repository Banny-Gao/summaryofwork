export const dailyTemperatures = T => {
  const nT = []

  T.forEach((Ti, m) => {
    let p = 0, isGt = false
    while (m < T.length) {
      if (T[m] > Ti) {
        isGt = true
        break
      }
      p++
      m++
    }
    p = isGt ? p : 0
    nT.push(p)
  })

  return nT
}

export const dailyTemperatures_stack = T => {
  const res = Array.from(T).fill(0)
  const stack = [0]
  let i = 1
  let pre

  while (i < T.length) {
    if (stack.length === 0) {
      stack.push(i++)
      continue
    }
    pre = stack[stack.length - 1]
    if (T[i] <= T[pre]) {
      stack.push(i++)
    } else {
      stack.pop()
      res[pre] = i - pre
    }
  }
  
  return res
}