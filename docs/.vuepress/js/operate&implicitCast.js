let a = 0, b = 1, c = 2, d 
// basic 0 + 2 + 4
d = a++ + ++b + c**2    //6 

const f = () => {}
+'-1' // -1
+[]  // 0
+{}  //NaN
+false // 0
+true // 1
+Symbol(1) //Uncaught TypeError: Cannot convert a Symbol value to a number
+f // NaN
+undefined //NaN
+null //0

~2.3  // -3
~-1  // 0
~{} // -1
~[] // -1
~'' // -1
~f // -1
~NaN // -1
~null //-1
~undefined //-1


!~'' // false
!-1 // false
!1  //false
![] //false
!{} //false
!0 //true
!Symbol() // false
!f // false

Boolean(1) //true
Boolean(0)  //false
Boolean('0')  //true
Boolean('')  //false
Boolean(-1)  //true
Boolean({})  //true
Boolean([])  //true
Boolean(Symbol()) //true

let e 
1 + '1'  //'11'
1 - '1'  // 0
1 + null //1
1 + undefined //NaN
null + undefined //NaN
null + []  // 'null'
null * []  // 0
null * [1,2]  // NaN
{} + null // 0
null + {} // "null[object Object]"
null * {} // NaN
e = [] + {} //"[object Object]"
e = [] - {} // NaN
e = [] * {} // NaN
e = [] - 1 // -1
e = [] + 1 // '1'
e = [0] + 1 // '01'
e = [1,2] + 1 // '1,21'
e = 1 + [] // '1'
e = {} + 1 // 1
e = 1 + {} // "1[object Object]"
e = {} - 1 // -1
e = [] * 1 // 0
e = [1] * 1 // 1
e = [1, 2] * 1 //NaN
e = {} * 1  // Uncaught SyntaxError: Unexpected token *
e = 1 * {} //NaN
''+Symbol(1)  //Cannot convert a Symbol value to a string
''+f //"() => {}"
{} + f // NAN
f + [] // 'f + []'
[1,2] + f // "1,2() => {}"


1&2 // 0
1&0 // 0
1&&2 // 2
0&&1 // 0
1|2 // 3
1||2 //1
0|1 // 1
0 || 1 //1
1 | Symbol(1) // Cannot convert a Symbol value to a number
0 || Symbol(1) //Symbol(1)