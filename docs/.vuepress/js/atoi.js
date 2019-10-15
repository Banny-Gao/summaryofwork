export const atoi = (str) => {
  let num = 0
  if (/^(\s*)([\+-]?(?:\d+))([\s\S]*?)$/.test(str)) num = RegExp.$2
  return +Math.max(-2147483648, Math.min(2147483647, num))
}