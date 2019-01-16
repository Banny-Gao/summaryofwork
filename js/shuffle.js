//字符串乱序
shuffle0 = (str) => {
  return Array.from(str).sort(() => Math.random() - 0.5).join('')
}

shuffle1 = (str) => {
  const arr = str.split('')
  for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
  return arr.join('')
}