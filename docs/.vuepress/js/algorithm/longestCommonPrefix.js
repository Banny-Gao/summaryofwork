export const longestCommonPrefix = (strs) => {
  let com = '', i = 0
  const str0 = strs[0]
  while (str0 && i < str0.length) {
    let same = true
    for(let j = 1; j < strs.length; j++) {
      if(strs[j][i] !== str0[i]) {
        same = false
        break;
      }
    }
    if(same) {
      com += str0[i]
      i++
    }else{
      break
    }
  }
  return com
}