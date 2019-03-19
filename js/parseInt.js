//parseInt解析
const a = ['1', '2', '3'].map(parseInt),
  b = ['3', '0', '2'].map(parseInt)

console.log(a, b) //[1,NAN,NAN],[3,0,NAN]

/**
 * 而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。
parseInt(string, radix)
接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

了解这两个函数后，我们可以模拟一下运行情况

parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
map函数返回的是一个数组，所以最后结果为[1, NaN, NaN]
 */