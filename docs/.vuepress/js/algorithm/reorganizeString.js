export const reorganizeString = S => {
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
