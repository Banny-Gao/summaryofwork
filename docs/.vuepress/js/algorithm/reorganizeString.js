export const reorganizeString = (S) => {
  let text = S.substr(0, 1)
  const stuck = S.split("").splice(1)

  let i = 0,
    k = 0

  while (i < text.length && k < stuck.length) {
    let inserted = false
    if (stuck[k] != text[i]) {
      if (i === 0) {
        text = stuck[k] + text
        inserted = true
      } else if (i == text.length - 1) {
        text += stuck[k]
        inserted = true
      } else if (i < text.length - 1 && stuck[k] !== text[i + 1]) {
        text = text.substr(0, i + 1) + stuck[k] + text.substr(i + 1)
        inserted = true
      }
    }
    if (inserted) {
      stuck.splice(k, 1)
      i = 0
      k = 0
      continue
    }
    if (i === text.length - 1) {
      k++
      i = 0
    } else {
      i++
    }
  }

  if (stuck.length) text = ""
  return text
}

export const reorganizeStringBySort = (S) => {
  const N = S.length
  const max = ~~((N + 1) / 2)
  const map = new Map()
  const ans = []

  if (N <= 1) return S

  for (let i of S) {
    const count = map.get(i) || 0
    if (count > max - 1) return ""
    map.set(i, count + 1)
  }

  const sortArr = [...map].sort((a, b) => b[1] - a[1])

  let sN = sortArr.length
  let i = 0
  // 依次取
  let index = 0
  while (sortArr[i][1] && sN > 1) {
    ans[index] = sortArr[i][0]
    sortArr[i][1]--
    index++
    i++
    if (i < sN && !sortArr[i][1]) sN = i
    i %= sN
  }

  let j = 0
  while (j < ans.length && sortArr[0][1]) {
    if (ans[j] !== sortArr[0][0]) {
      if (ans[j + 1] === undefined) {
        ans[j + 1] = sortArr[0][0]
        sortArr[0][1]--
        break
      }
      if (ans[j + 1] != sortArr[0][0]) {
        ans.splice(j + 1, 0, sortArr[0][0])
        sortArr[0][1]--
        j += 2
        continue
      }
    }
    j++
  }
  // 一直取
  // let even = 0, odd = 1
  // while (i < sN) {
  //   while (sortArr[i][1] && even < N) {
  //     ans[even] = sortArr[i][0]
  //     sortArr[i][1]--
  //     even += 2
  //   }
  //   while (sortArr[i][1]) {
  //     ans[odd] = sortArr[i][0]
  //     sortArr[i][1]--
  //     odd += 2
  //   }
  //   i++
  // }

  return ans.join("")
}

export const reorganizeStringByGreedyHeap = (S) => {
  const N = S.length
  const max = ~~((N + 1) / 2)
  const heap = []

  if (N <= 1) return S

  const getHeapItem = (s) =>
    heap.find((item) => item.key === s) || { key: s, count: 0 }
  const swap = (arr, m, n) => {
    arr[m].index = n
    arr[n].index = m
    let temp = arr[m]
    arr[m] = arr[n]
    arr[n] = temp
  }
  const shifUp = (heapItem) => {
    let { index } = heapItem
    if (index === undefined) {
      heap.push(heapItem)
      heapItem.index = heap.length - 1
    } else {
      let last = index - 1
      while (last >= 0 && heap[last].count < heapItem.count) {
        swap(heap, last, index)
        last--
        index--
      }
    }
  }

  const shiftDown = (heapItem) => {
    let { index } = heapItem
    let next = index + 1
    while (next < heap.length && heap[next].count > heapItem.count) {
      swap(heap, index, next)
      index++
      next++
    }
  }

  for (let s of S) {
    const heapItem = getHeapItem(s)
    if (heapItem.count > max - 1) return ""
    heapItem.count++
    shifUp(heapItem)
  }

  let text = ""

  const getMax2 = () => {
    const first = heap[0]
    const second = heap[1]
    first.count--
    if (!second.count) return [first.key]
    second.count--
    shiftDown(second)

    shiftDown(first)
    return [first.key, second.key]
  }

  while (heap[0].count) {
    const max2 = getMax2()
    text += max2.join("")
  }
  return text
}
