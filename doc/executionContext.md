JavaScript如何工作的，首先要理解以下几个概念。
>* JS Engine（JS引擎）  
>* Runtime（运行上下文）  
>* Call Stack (调用栈)  
>* [Event Loop（事件循环）](../js/eventLoop.js)  
>* Callback (回调)  


摘自[Logan70博文](https://juejin.im/post/5c0d0896e51d4570b57aea2a) 如有侵权请联系删除
## 一、执行上下文（Exexution Contexts）
>执行上下文简单理解就是代码执行时所在环境的抽象。
  
执行上下文同时包含变量环境组件（VariableEnvironment）和词法环境组件（LexicalEnvironment），这两个组件多数情况下都指向相同的 [词法环境（Lexical Environment）](./lexicalEnvironment.md)

## 二、执行上下文栈
>一个后进先出的栈式结构（LIFO），用来跟踪维护执行上下文。运行执行上下文（running execution context） 始终位于执行上下文栈的顶层  

任意的JavaScript可执行代码被执行时(**全局代码，函数代码，模块代码和eval。**)  
1.创建一个**新的执行上下文（Execution Context）**  
2.创建一个**新的词法环境（Lexical Environment）**   
3.将该执行上下文的**变量环境组件（VariableEnvironment）** 和 **词法环境组件（LexicalEnvironment**） 都指向**新创建的词法环境**  
4.将该执行上下文**入栈**并成为正在运行的执行上下文  
5.对代码块内的**标识符**进行实例化及初始化  
6.运行代码  
7.运行完毕后执行上下文**出栈**  


> 函数的递归调用或者while，如果没有终止条件，是一个死循环的话，会导致调用栈内存不够而溢出。解决方案，放入setTimeout中，使执行代码进入下个任务队列（[同步转异步](../js/eventLoop.js)）

## 三、变量提升（Hoisting）及暂时性死区（temporal dead zone，TDZ）
变量提升就发生在上述执行步骤的第四步，对代码块内的标识符进行实例化及初始化的具体表现如下  
1.执行代码块内的let、const和class声明的标识符合集记录为lexNames
2.执行代码块内的var和function声明的标识符合集记录为varNames
3.如果lexNames内的任何标识符在varNames或lexNames内出现过，则报错SyntaxError  
> let、const、class 唯一性   
 
4.将varNames内的var声明的标识符实例化并初始化赋值undefined，如果有同名标识符则跳过
> 变量提升  

5.将lexNames内的标识符实例化，但并不会进行初始化，在运行至其声明处代码时才会进行初始化，在初始化前访问都会报错。
> 暂时性死区  

6.最后将varNames内的函数声明实例化并初始化赋值对应的函数体，如果有同名函数声明，则前面的都会忽略，只有最后一个声明的函数会被初始化赋值
> 函数声明会被直接赋值，所以我们在函数声明位置之前也可以调用函数。
## 四、为什么需要两个环境组件
变量环境组件（VariableEnvironment）用于记录var声明的绑定，词法环境组件（LexicalEnvironment）用于记录其他声明的绑定（如let、const、class等）  
1.首先在一个正在运行的执行上下文（running Execution Context）内，词法环境由VariableEnvironment和LexicalEnvironment构成，此执行上下文内的所有标识符的绑定都记录在两个组件的环境记录内。  
2.当运行至块级代码时，会将LexicalEnvironment记录下来，我们将其记录为oldEnv。  
3.然后创建一个新的LexicalEnvironment（外部词法环境outer指向oldEnv），我们将其记录为newEnv，并将newEnv设置为running Execution Context的LexicalEnvironment。  
4.然后块级代码内的let、const等声明就会绑定在这个newEnv上面，但是var声明和函数声明还是绑定在原来的VariableEnvironment上面。
> 块级代码内的函数声明会被当做var声明，会被提升至外部环境，块级代码运行前其值为初始值undefined

5.块级代码运行完毕后，又将oldEnv还原为running Execution Context的LexicalEnvironment。

>块级作用域：块级代码、for、switch、while、TryCatch语句中的catch从句以及with语句（with语句创建的新环境为对象式环境，其他皆为声明式环境）