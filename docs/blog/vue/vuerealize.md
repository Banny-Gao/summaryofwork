# Vue2.x原理浅析

一说到vue的实现原理，我们首先想到是的观察者模式在数据劫持([Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty))中的使用。那么，什么数据劫持？何谓观察者模式？   

## Object.defineProperty
简单来说，数据劫持↓
```javascript
const obj = {
  a: 1
}
Object.defineProperty(obj, "a", {
  // value : 37,   // 值，与get、set方法不能同时存在
  writable : true,    // 可否被修改
  enumerable : true,   // 可否被枚举  for in
  configurable : true,  // 可否被删除 delete
  get() {
    return 3
  },
  set(val) {
    console.log(val)
  }
});
```  
通过这个api，我们可以捕捉到劫持对象键值的获取和改变。并可以在其中Do what we want do.  

但是😰有个弊端 => 数据下标也是数组的键，对于数组对象下标赋值不会生效
```JavaScript
const arr = [1]
Object.defineProperty(arr, 0, {
  get() {
    return 3
  },
  set(val) {
    console.log(val)
  }
});
```
那么，自定义一个数组自身变化的是要怎么去监听呢，说好的用**Object.defineProperty**改变世界呢？    
细想一下，**数组原型**上有自己有以下方法可以改变自己，能想到的都在下面了  
> [ 'push','pop','shift','unshift','splice','sort','reverse' ]    


我们可以劫持这些key，当get访问方法时，我们就能捕获到数组改变的动作了。光说不练假把式↓

```javascript
const arrayProto = Array.prototype   // 拷贝原型防止污染Array
const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(item => { //对数组中改变自身的方法劫持
  Object.defineProperty(arrayMethods, item, {
    value: function () {
      arrayProto[item].call(this, ...arguments) //执行方法
      console.log(123)
    }
  })
})
const arr = [1]
arr.__proto__ = arrayMethods
arr.push(2)  
```
然后，我们再来简单地看看所谓观察者模式↓  
* **[观察者模式](/bookReading/Javascript设计模式/9.html)**


## vue中观察者
Subject是要干嘛？Subject即是要添加删除通知Observer更新。所以vue中的dep我们可以简单的这样来写↓  
**dep.js**
```javascript
export default class Dep {
  constructor() {
    this.subs = [] 
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    //通知订阅者更新
    console.log('dep notify')
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
```
有了Subject，我们还差Observer和ConcreteSubject，Observer即是提供一个接口在Subject派发notify的时候通知ConcreteSubject更新。那么，既然要用Object.defineProperty，该怎样设计才能让他们结合起来呢？先不考虑ConcreteSubject，Observer一个对象obj = {a: 1}，要与defineProperty结合起来，我们可以在obj键值改变执行set的时候让Subject通知更新 ↓  
**observer.js** 
```javascript
import Dep from './dep'
class Observer {
  constructor(data = {}) {
    this.data = data
    this.walk(this.data)
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i])  // 重新包装
    }
  }
  defineReactive(data, key) {
    const dep = new Dep()
    let val = data[key]
    Object.defineProperty(data, key, {
      enumerabel: true, 
      configurabel: true,
      get() {
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        console.log('in set key =>' + key)
        dep.notify() //通知更新
      }
    })
  }
}
const obj = { a: 1 }
new Observer(obj)
obj.a = 2
```
至此，，结合了的Object.defineProperty，obj改变通知Subject执行notify已是可行。但是dep的subs还是空的，应该什么时候让Subject添加Observer呢？且notify里sub的update接口也还未实现。我们是否应该给Observer一个update接口？不了，这个时候有个Watcher该登场了，让Watcher去代替Observer提供一个update的接口，或者说Watcher便是ConcreteSubject，省去了observer而直接update了，这是vue中的实现方案。  
首先，完善Subject ↓
## Class Dep
**dep.js**
```javascript
export default class Dep {
  //订阅器  ==>  收集订阅者
  static target = null
  constructor() {
    this.subs = [] //收集watcher数组
  }
  addSub(sub) {
    //添加watcher的方法
    this.subs.push(sub)
  }
  removeSub(sub) {  // 移除watcher
    if (this.subs.length) {
      const index = this.subs.indexOf(sub)
      if (index > -1) {
        return this.subs.splice(index, 1)
      }
    }
  }
  depend() {
    //传入订阅器，然后添加订阅者
    if (Dep.target) Dep.target.addDep(this)
  }
  notify() {
    // console.log('notify', this.subs)
    //通知订阅者更新
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
const targetStack = [] // 存放target的数组
export const pushTarget = (target) => {
  targetStack.push(target)
  Dep.target = target
}
export const popTarget = () => {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```
又到了思考的时候，怎样让Watcher作为ConcreteSubject却又和Observer关联起来呢？也许是那被Observer了的那个obj？什么时候该让dep添加watcher呢？什么时候watcher又应该去执行dep的notify呢？带着疑惑，我们走进源码。  
* **Object的有用却不常用的几个方法**: [create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)、[freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)、[hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)、[getOwnPropertyNames](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)、[getOwnPropertyDescriptor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)、[getPrototypeOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)  

搞Watcher之前，先把Observer稍微完善一下吧 ↓  
**observer.js**
```javascript
export default class Observer {
  constructor(data = {}) {
    this.data = data
    this.dep = new Dep() // 以备不时之需
    this.walk(this.data)
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i])
    }
  }
   // 数据劫持/包装
  defineReactive(obj, key) {
    const _this = this
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key) //不包括Symbol值的所有属性的描述,即enumerabel、configurabel等
    if (property?.configurable === false) return // 处理不可修改属性
    const getter = property?.get // get方法是否被修改
    const setter = property?.set // set方法是否被修改
    let val = obj[key]
    let childObj = this.observe(val) // 处理值是对象的情况
    Object.defineProperty(obj, key, {
      enumerabel: true,
      configurabel: true,
      get() {
        const value = getter?.call(obj) ?? val
        dep.depend()
        if (childObj) childObj.dep.depend()  // 这里的dep就是从【以备不时之需】来的
        return value
      },
      set(newVal) {
        const value = getter?.call(obj) ?? val
        if (newVal === value) return
        if (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childObj = _this.observe(newVal) // 处理新值是对象的情况
        dep.notify()
      }
    })
  }
  observe(value) {
    if (!value || typeof value !== 'object') return
    return new Observer(value) //只对object进行劫持
  }
}
```
从半成品的Observer，我们能看到在get的时候走了dep.depend，也就是说在这个是Subject才能去添加watcher，从Dep的方法可以看出，当前Dep的target存在且是watcher，由watcher调用Dep的方法添加自身，而且添加过后得清除Dep的target，不然每次obj取值的时候都会添加一次watcher。
作为ConcreteSubject的watcher要在notify的时候干嘛呢？简单点，如果我们只想知道新旧值呢？
```javascript
import Observer from '../../util/vue/observer'
import Watcher from '../../util/vue/watcher'

const data = {
  a: 1,
  b: {
    c: 2
  },
  d: []
}
const observer = new Observer(data)
const watcher1 = new Watcher(data, 'a', (val, oldVal) => {
  console.log(val, oldVal)
})
const watcher2 = new Watcher(data, 'b.c', (val, oldVal) => {
  console.log(val, oldVal)
})
const watcher3 = new Watcher(data, 'd', (val, oldVal) => {
  console.log(val, oldVal)
})
data.a = 2
data.b.c = 1
data.d.push(3)
```
该怎样去实现这个Watcher呢？
* 先有Observer后有Watcher，这样才能depend嘛
* Watcher初始化的时候得过一遍depend
* Watcher有个update  
## Class Watcher
**vue/watcher.js**
```javascript
import _ from 'lodash'
import Dep, {
  pushTarget,
  popTarget
} from './dep'
export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    this.exp = expOrFn  
    this.cb = cb
    this.initGetter(expOrFn)  
    this.value = this.get()
  }
  initGetter(expOrFn) {
    Object.prototype.toString.call(expOrFn) === '[object Function]' && (this.getter = expOrFn)
    if (typeof expOrFn === 'string') this.getter = this.parsePath(expOrFn)  // 处理a.b等情况
  }
  get() {
    pushTarget(this)
    const vm = this.vm
    let value
    try {
      value = this.getter.call(vm, vm) // call，apply，bind能改变箭头函数this指向吗？
    } catch (error) {} finally {
      if(typeof value === 'object') {
        value = _.cloneDeep( value ) // 简单替代源码中的traverse解决引用类型问题
      }
    }
    popTarget()
    return value
  }
  addDep(dep) {
    dep.addSub(this)  // 添加到dep
  }
  update() {   // dep的update
    // 什么
    this.run()
  }
  parsePath(path) {
    const segments = path.split('.')
    return function(obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) return
        obj = obj[segments[i]]
      }
      return obj
    }
  }
  run() {
    const vm = this.vm
    let value = this.getter.call(vm, vm)
    typeof value === 'object' && (value = _.cloneDeep( value ))
    if (value !== this.value) {
      const oldValue = this.value
      this.value = value
      this.cb.call(this.vm, value, oldValue)  // 回调
    }
    const fn = this.vm?.updated?? null  
    // console.log(this.vm)
    if(typeof fn === 'function') fn() // vue的updated生命周期钩子
  }
}
```
Wathcer有了，Vue的实现有了一点点眉目了。我们大概可以猜到Vue中的MVVM大概就是Vue所管理的data被Observer了，view和data之间又建立的很多个Watcher，view的更新也就是执行了Watcher的回调函数。  
那么，我们先完善一下Observer，搞了对象，还有数组的情况没处理呢 
* 数组也该depend
* 数组也该notify
* 不能嫌弃数组下标不能Object.defineProperty 
## Class Observer
**vue/observer.js**
```javascript
// @ts-nocheck
import Dep from './dep'
const def = (obj, key, val, enumerable = false) => {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

const arrayProto = Array.prototype  // 拷贝原型防止污染Array
const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach((method) => {
  def(arrayMethods, method, function(...args) {
    // console.log(this)   
    const ob = this.__ob__
    let inserted
    switch (
      method // 也许添加了数组或者对象，需要重新Observer
    ) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2) 
        break
    }
    if (inserted) ob.observeArray(inserted)
    const result = arrayProto[method].apply(this, args)
    // notify change
    ob.dep.notify()   // 数组变化通知更新
    return result
  })
})
//  数组修复
const arrayKeys = Object.getOwnPropertyNames(arrayMethods) //获取数组劫持的方法

export default class Observer {
  constructor(data = {}) {
    this.data = data
    this.dep = new Dep() // 以备不时之需
    def(data, '__ob__', this)   // 上面数组要用
    if (Array.isArray(data)) {
      const augment = data.__proto__ ? this.protoAugment : this.copyAugment
      // 获取替换原型的方法
      //此处的 arrayMethods 就是上面使用Object.defineProperty处理过
      augment(data, arrayMethods, arrayKeys) //将传进来的数组替换原型，以后当前data使用push什么的，就是arrayMethods的劫持了
      this.observeArray(data) //数组的订阅器添加
    }
    this.walk(this.data)
  }
  walk(obj) {  // 为所有可枚举的key走包装
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i])
    }
  }
  observeArray(arr) {  // 数组的包装
    for (let i = 0, l = arr.length; i < l; i++) {
      this.observe(arr[i])
    }
  }
  // 数据劫持/包装
  defineReactive(obj, key, shallow = true) {   // 默认浅包装
    const _this = this
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key) //不包括Symbol值的所有属性的描述,即enumerabel、configurabel等
    if (property ?.configurable === false) return // 处理不可修改属性
    const getter = property ?.get // get方法是否被修改
    const setter = property ?.set // set方法是否被修改
    let val = obj[key]
    let childObj = !shallow && this.observe(val) // 处理值是对象的情况
    Object.defineProperty(obj, key, {
      enumerabel: true,
      configurabel: true,
      get() {
        const value = getter ?.call(obj) ?? val
        dep.depend()
        if (childObj) {
          childObj.dep.depend() // 这里的dep就是从【以为不时之需】来的
          if (Array.isArray(value)) {
              _this.dependArray(value)   // 新设置的是数据，走数组包装
          }  
        }
        return value
      },
      set(newVal) {
        const value = getter ?.call(obj) ?? val  // 从被修改的get拿值， computed中的get？
        if (newVal === value) return
        if (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childObj = !shallow && _this.observe(newVal) // 处理新值是对象的情况
        dep.notify()   // 数据变化通知更新
      }
    })
  }
  observe(value) {
    if (!value || typeof value !== 'object') return
    let ob
    if ( Object.prototype.hasOwnProperty.call(value, '__ob__') && 
    value.__ob__ instanceof Observer ) {
      ob = value.__ob__
    } else {
      ob = new Observer(value)
    }
    return ob //只对object进行劫持
  }
  protoAugment(target, src) {
    target.__proto__ = src //支持隐式原型直接赋值
  }
  copyAugment(target, src, keys) { //不支持的set key
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      this.def(target, key, src[key]) //将key值设置到target来源对象上去
    }
  }
  dependArray(value) {  // 对数组的每个下标都处理
    for (let e, i = 0, l = value.length; i < l; i++) {
      e = value[i]
      e ?.__ob__ ?.__ob__.dep.depend()
      if (Array.isArray(e)) {
        dependArray(e)
      }
    }
  }
}
```
至此，vue的观察者告一段落。
然后，该步入正题去简单的实现vue了。要简单实现vue的一些什么功能呢？  
## Example
**index.html**
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Vue原理浅析</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <div id='app'>
    <p>Vue原理解析</p>
    <!-- 表达式解析,数据绑定 -->
    <p>表达式解析,数据绑定:</p>
    <p>JSON.stringify/parse:{{JSON.stringify(child)}}</p>
    <p>eval:{{eval("text + ' word ' +  child.child.text")}}</p>
    <!-- 计算属性 -->
    <p>计算属性：{{computeText}}</p>
    <p>计算属性get方法：{{getText}}</p>
    <!-- 双向数据绑定 -->
    <p>双向数据绑定【text】：<input type="text" v-model="text"></p>
    <!-- style -->
    <p :style="style">style：{{JSON.stringify(style)}}</p>
    <!-- 事件绑定 -->
    <p @click='numAdd(2,3,$event)'>
      事件：<span :style='{cursor:"pointer",color: blueColor}' v-on:click="text = '' ">清空text</span>
      <span>{{num}}</span>
    </p>
    <!-- class -->
    <p class="pointer no-select" :class="[isRed?'red': 'blue', 'bigFont']" @click="isRed = !isRed">class: {{text}}</p>
    <!-- 指令 -->
    <!-- v-html -->
    <p>v-html：<span v-html='strHtml'></span></p>
    <!-- v-for -->
    v-for:【list】 <span @click='addList'>向list数组添加数据</span>
    <ul>
      <li v-for='(item,index) in list'>{{list}}</li>
    </ul>
  </div>
</body>

</html>
<style type="text/css">
  .red{
      color: red;
  }
  .blue{
      color: blue;
  }
  .pointer{
      cursor: pointer;
  }
  .bigFont {
    font-size: 30px;
  }
  .active{

  }
  .no-select{
    user-select:none;
  }
</style>
```
* 数据绑定，模板引擎解析
* v-model双向数据绑定
* 事件
* class、style
* 常用指令：v-html、v-for等

有了想要实现的，想太多太累，先写一个vue  
**index.js**
```javascript
import Vue from '../../util/vue'
window.vm = new Vue({
  el: '#app',
  data() {
    return {
      num: 1,
      text: 'hello',
      child: {
        text: 'world',
        child: {
          text: '2018'
        }
      },
      isRed: true,
      list: [1, 2, 3],
      strHtml: '<p class="red">我是来自data的html</p>',
      style: {
        color: '#00bbcc'
      },
      blueColor: 'blue'
    }
  },
  computed: {
    computeText: function() {
      return this.text + ' ' + this.child.text + ' form computed'
    },
    getText: {
      get() {
        return this.text + ' form get '
      }
    }
  },
  methods: {
    numAdd(...args) {
      // console.log(args)
      this.num ++
    },
    addList() {
      this.list.push(this.text)
      // console.log(this.list)
    }
  },
  beforeCreated() {
    // console.log('beforeCreated')
  },
  created() {
    // console.log('created')
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    // console.log('mounted')
  },
  updated() {
    // console.log('updated')
  },
  watch: {
    // text: function(newVal, old) {
    //   console.log(newVal,old)
    // },
    // 'child.text': function(newVal, old) {
    //   console.log('child.text => ' + newVal)
    // },
    // list: function(newVal,oldVal) {
    //     console.log(newVal,oldVal)
    // }
  }
})
```
## Class Vue
**vue/index.js**
```javascript
import _ from 'lodash'
import Observer from './observer'
import Watcher from './watcher'
import Compiler from './compiler'
class Vue {
  constructor(options) {
    this.$options = options
    this.props = options.props
    this.data = options.data || {}
    this.watch = options.watch || {}
    this.computed = options.computed || {}
    this.methods = options.methods || {}
    this.beforeCreated = options.beforeCreated || {}
    this.created = options.created || function() {}
    this.beforeMount = options.beforeMount || function() {}
    this.beforeUpdate = options.beforeUpdate || function() {}
    this.mounted = options.mounted || function() {}
    this.updated = options.updated || function() {}
    this.$el = options.el
    this._init()
  }
  _init(options) {
    const vm = this
    this.initProxy(vm) // 代理vue实例，_renderProxy 
    this.initLifecycle(vm) // 初始化一些生命周期相关的属性，以及为parent,child（非抽象组件）等属性赋值
    this.initEvents(vm) // 初始化存放事件对象，父组件:hook钩子处理
    this.initRender(vm) // vNode、$slots、￥scopedSlots、$createElement函数等初始化，$attrs、$listeners代理
    this.initInjections(vm) // resolve injections before data/props
    this.beforeCreated() // 第一个钩子
    this.initState(vm)
    this.initProvide(vm) // resolve provide after data/props
    this.created()
    if (vm.$el) vm.$mount(vm.$el)
  }
  expectKey(key) { //判断this上的key是否有重复了
    const f = Object.keys(this).includes(key)
    if (f) {
      throw Error(`The property or method {key} already define`)
    }
  }
  initProxy(vm) {
    // vm._renderProxy = vm
  }
  initLifecycle(vm) {
    // vm._watcher = null
    // vm._inactive = null
    // vm._directInactive = false
  }
  initEvents(vm) {}
  initRender(vm) {
    vm.$vnode = null
    vm._isMounted = false
    // vm.$createElement = createElement
  }
  initInjections(vm) {}
  initState(vm) {
    if (this.props) this.initProps(vm, this.props)
    this.initMethods(vm, this.methods)
    this.initData(vm)
    this.initComputed(vm, this.computed)
    this.initWatch(vm, this.watch)
  }
  initProvide(vm) {}
  initProps(vm, props) {}
  initMethods(vm, methods) {
    Object.keys(methods).forEach(key => {
      this.expectKey(key)
      Object.defineProperty(vm, key, {
        get: () => methods[key]
      })
    })
  }
  initData(vm) { //代理data
    let data = vm.data
    data = vm._data = typeof data === 'function' ?
      vm.data() :
      data || {}
    Object.keys(data).forEach(key => { //将data上的key代理到this身上，即 this._data[key] === this[key]
      this.expectKey(key)
      Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: true,
        get: () => data[key],
        set: (newVal) => {
          data[key] = newVal
        }
      })
    })
    new Observer(vm)
  }
  initComputed(vm, computed) {
    Object.keys(computed).forEach(key => {
      this.expectKey(key)
      const get = typeof computed[key] === 'function' ? computed[key] : computed[key].get
      Object.defineProperty(vm, key, {
        get
      })
    })
  }
  initWatch(vm, watch = {}) {
    for (const key in watch) {
      const handler = watch[key]
      this.createWatcher(vm, key, handler)
    }
  }
  createWatcher(vm, expOrFn, handler) {
    if (typeof handler === 'string') {
      handler = vm[handler]
    }
    if (typeof handler !== 'function') console.error(`{key} of watch should be function`)
    if (typeof handler === 'function') {
      new Watcher(vm, expOrFn, handler)
    }
  }
  $mount(el) {
    // if (!this.$options.render) this.$options.render = createEmptyVNode
    this.beforeMount()
    // let updateComponent = function() {
    //   vm._update(vm._render(), hydrating);
    // };
    // new Watcher(vm, updateComponent, noop, {
    //   before: function before() {
    //     if (vm._isMounted && !vm._isDestroyed) {
    //       callHook(vm, 'beforeUpdate');
    //     }
    //   }
    // }, true /* isRenderWatcher */ );
    if (this.$vnode == null) {
      this._isMounted = true
      new Compiler(el, this)
      this.mounted()
    }
    return this
  }
  _update(vnode) {
    const vm = this
    // const prevVnode = vm._vnode
    // vm._vnode = _.cloneDeep(vnode)
    // if (!prevVnode) {
    //   vm.$el = vm.__patch__(vm.$el, vnode)
    // } else {
    //   vm.$el = vm.__patch__(prevVnode, vnode)
    // }
  }
  _render() {
    const vm = this
    // const { render } = vm.$options
    // let vnode
    // try {
    //   vnode = render.call(vm._renderProxy, vm.$createElement)
    // } catch (e) {
    //   vnode = vm._vnode
    // }
    // if (Array.isArray(vnode) && vnode.length === 1) {
    //   vnode = vnode[0]
    // }
    // if (!(vnode instanceof VNode)) {
    //   vnode = createEmptyVNode()
    // }
    // return vnode
  }
}

export default Vue
```
vue中的$mount是new了一个watcher，通过改变_isMounted执行updateComponent函数，先_render返回vNode，_update接收vNode作__patch__(diff算法)，__patch__内部实现了节点的更新替换。vNode和diff算法暂不做深入了，直接以new Compiler方式去实现节点挂载和更新  

## Class Compiler
**vue/compiler.js**
```javascript
import {CompileUtil} from './compileHelper'
export default class Compiler {
  constructor(el, vm) {
    this.$el = el instanceof HTMLDivElement ? el : document.querySelector(el)   // 拿dom
    this.$vm = vm  // 拿vue实例
    this._init()
  }
  _init() {
    if (!this.$el) return
    this.$fragment = this.createFragment(this.$el)   // 创建碎片
    // console.log(this.$fragment)
    this.compileElement(this.$fragment)     //---解析碎片
    this.$el.appendChild(this.$fragment)   //挂载
  }
  createFragment(el) {
    let fragment = document.createDocumentFragment(),
      childNode
    while (childNode = el.firstChild) { //循环拿到所有节点
      // console.log(childNode)
      fragment.appendChild(childNode)
    }
    return fragment
  }
  compileElement(el) {    // 节点编译函数
    // console.log(el.childNodes)
    Array.from(el.childNodes, node => {
			const text = node.textContent
			const	reg = /\{\{((?:.|\r?\n)+?)\}\}/g
      // console.log(node,text)
      if (node.childNodes && node.childNodes.length) {
				this.compileElement(node)      //递归编译所有节点
			}
      if (this.isTextNode(node) && reg.test(text)) {
				this.compileText(node)       //编译文本节点中的模板
			}
		})
  }
  isElementNode(node) {   // 判断元素节点
		return node.nodeType === 1
	}
  isTextNode(node) {   // 判断文本节点
		return node.nodeType === 3
	}
  compileText(node) {  // 文本节点编译
    CompileUtil.text(node,this.$vm, node.textContent)   // 渲染到节点
  }
}
```
目前的complier我们拿到了文本节点及其内容，我们需要将一个工具函数将双花括号内的表达式与vm结合起来，然后编译到文本节点中去 ↓  
**vue/compilerHelper.js**
```javascript
import Watcher from './watcher'
import _ from 'lodash'
export const CompileUtil = {
	text(node, vm, exp) {   //编译文本
		this._bind(node, vm, exp, 'text')
	},
	_bind(node, vm, exp, dir) {
		const updaterFn = Updater[`${dir}Updater`]     //根据指令来的是什么的更新？
		updaterFn && updaterFn(node, vm, exp)   //存在并更新到fragment上去
    // new Watcher(vm, 'data', (val, oldVal) => {
    //   updaterFn(node, vm, exp)
    // })
	}
}

export const Updater = {
	textUpdater: (node, vm, exp) => {  
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;  // 设置自定义模版
    const text = _.template(exp)(vm)
		node['textContent'] = text
	}
}
```
上面几个简单的函数帮助我们将模版中的内容编译成功，但是尚且不能做到vm中的值改变后重新编译。  
注释中直接对data作Watcher，data改变就去执行updaterFn明显不可取。所以我们还需要拿到表达式中对应在data中的key，对这些key作Watcher，相应的key的值变化，执行相对于的updaterFn  ↓  
**vue/compilerHelper.js**
```javascript
_bind(node, vm, exp, dir) => {
const updaterFn = Updater[`${dir}Updater`]     //根据指令来的是什么的更新？
updaterFn && updaterFn(node, vm, exp)   //存在并更新到fragment上去
  // new Watcher(vm, '_data', (val, oldVal) => {
  //   updaterFn(node, vm, exp)
  // })
const temp = dir === 'text'? true: false
const variable = this._keyOfExp(exp, temp)    //获取表达式里的变量，添加订阅者，变化后自动更新
if(!variable || !variable in vm) return
  // console.log(variable)
variable.forEach(key => {
    new Watcher(vm, key, () => {
      updaterFn(node, vm, exp)
    })
  })
},
_keyOfExp(exp, temp = false) {  //从一个表达式(string)里拿变量(vm的属性)
 const variaArr = [exp].reduce((result,item) => {
    let variaStr = ''
    if(temp) {  // 来自模板引擎，也许多个{{}}情况
      item.match(/\{\{((?:.|\r?\n)+?)\}\}/g).forEach(v => {
        variaStr += /^(?:\{\{)((?:\s|\S)*)(?:\}\})$/.exec(v)[1]
      })
    } else {
      variaStr = item
    }
    if( /JSON\.(?:stringify|parse)\(([a-zA-Z_\$]\w*)\)/g.test(variaStr) ) {
      result.push(RegExp.$1)
    }
    if( /eval\((['"])([\s\S]*)\1\)/g.test(variaStr) ) {
      variaStr = RegExp.$2
    }
    variaStr.replace(/\s/g,'').split(/[\+\-\*\/\|\&]/).forEach(str => {
      const exp = str.match(/^\w+(?:\.\w*)*$/g)
      if(exp) result.push(...exp)
    })
    return result
  },[])
  return [...new Set(variaArr)]
}
```
处理了数据变化视图响应之后，我们来处理其他  
**完善 vue/compiler.js**  
```javascript
import {CompileUtil} from './compileHelper'
export default class Compiler {
  constructor(el, vm) {
    this.$el = el instanceof HTMLDivElement ? el : document.querySelector(el)   // 拿dom
    this.$vm = vm  // 拿vue实例
    this._init()
  }
  _init() {
    if (!this.$el) return
    this.$fragment = this.createFragment(this.$el)   // 创建碎片
    // console.log(this.$fragment)
    this.compileElement(this.$fragment)     //---解析碎片
    this.$el.appendChild(this.$fragment)   //挂载
  }
  createFragment(el) {
    let fragment = document.createDocumentFragment(),
      childNode
    while (childNode = el.firstChild) { //循环拿到所有节点
      // console.log(childNode)
      fragment.appendChild(childNode)
    }
    return fragment
  }
  compileElement(el) {    // 节点编译函数
    // console.log(el.childNodes)
    Array.from(el.childNodes, node => {
			const text = node.textContent
			const	reg = /\{\{((?:.|\r?\n)+?)\}\}/g
      // console.log(node,text)
      if (node.childNodes && node.childNodes.length) {
				this.compileElement(node)      //递归编译所有节点
			}
      if (this.isTextNode(node) && reg.test(text)) {
				this.compileText(node)       //编译文本节点中的模板
			}
      if (this.isElementNode(node)) {     //编译节点
				this.compileNode(node)
			}
		})
  }
  compileText(node) {  // 文本节点编译
    CompileUtil.text(node,this.$vm, node.textContent)   // 渲染到节点
  }
  compileNode(node) {
		Array.from(node.attributes, attr => {
			// console.dir(attr)
			if (this.isDirective(attr.name)) {     //指令的编译
        // console.dir(attr)
				const exp = attr.value,			  //获取节点的属性              
					[dirFont,dirValue] = [RegExp.$1, RegExp.$2]   //获取指令前缀和值
          // console.log([dirFont,dirValue])
				if ( /(v-on:)|@/.test(dirFont) ) {     //是否是事件指令
					// console.log(dirFont,dirValue,exp)
					CompileUtil.eventHandler(node, this.$vm, dirValue, exp)   //处理绑定事件
				} else {
          // console.log(dirValue,exp)
					CompileUtil[dirValue] && CompileUtil[dirValue](node, this.$vm, exp)   //根据获取的指令，执行指令编译
				}
			}
		})
	}
  isElementNode(node) {   // 判断元素节点
		return node.nodeType === 1
	}
  isTextNode(node) {   // 判断文本节点
		return node.nodeType === 3
	}
  isDirective(attr) {  // 判断指令
		return/^((?:v-(?:\w+:)?)|:|@)(\w+)/.test(attr)
	}
}
```
以上，我们完成了：
* 对节点和文本的complie
* 对指令的判断  
* 对事件的处理

**完善 vue/compilerHelper.js**  
```javascript
import Watcher from './watcher'
import _ from 'lodash'
export const CompileUtil = {
  text(node, vm, exp) { //编译文本
    this._bind(node, vm, exp, 'text')
  },
  eventHandler(node, vm, eventType, exp) {
    node.addEventListener(eventType, function(e) {
      // with(vm) {
      // 	eval(exp)        //执行事件里的函数
      // }
      _with(exp, vm, /^\$event$/, () => {
        const o = {}
        for (let i in e) {
          try {
            o[i] = JSON.stringify(e[i])
          } catch (err) {}
        }
        return JSON.stringify(o)
      }, (expOrFn, $1) => {
        if (/^this\.(\w+)$/.test(expOrFn) && $1 in vm.methods) {
          expOrFn += '()'
        }
        return expOrFn
      })
    })
  },
  model(node, vm, exp) {
    if (node.nodeName == 'INPUT') {
      this._bind(node, vm, exp, 'model')
      node.addEventListener('input', (e) => {
        const val = e.target.value
        vm[exp] = val
      })
    }
  },
  class(node, vm, exp) {
    this._bind(node, vm, exp, 'class')
  },
  style(node, vm, exp) {
    this._bind(node, vm, exp, 'style')
  },
  _bind(node, vm, exp, dir) {
    const updaterFn = Updater[`${dir}Updater`] //根据指令来的是什么的更新？
    updaterFn && updaterFn(node, vm, exp) //存在并更新到fragment上去
    // new Watcher(vm, '_data', (val, oldVal) => {
    //   updaterFn(node, vm, exp)
    // })
    const variable = this._keyOfExp(exp, dir) //获取表达式里的变量，添加订阅者，变化后自动更新
    if (!variable || !variable in vm) return
    // console.log(variable)
    variable.forEach(key => {
      new Watcher(vm, key, () => {
        updaterFn(node, vm, exp)
      })
    })
  },
  _keyOfExp(exp, temp = 'text') { //从一个表达式(string)里拿变量(vm的属性) 
    const variaArr = [exp].reduce((result, item) => {
      let variaStr = ''
      if (temp === 'text') { // 来自模板引擎，也许多个{{}}情况
        item.match(/\{\{((?:.|\r?\n)+?)\}\}/g).forEach(v => {
          const mv = /^(?:\{\{)((?:\s|\S)*)(?:\}\})$/.exec(v)[1] + '+'
          variaStr += mv
        })
      } else if (temp === 'class') {
        variaStr = item.replace(/^\[([\s\S]+?)\]$/, '$1')
      } else {
        variaStr = item
      }
      if (/JSON\.(?:stringify|parse)\(([a-zA-Z_\$]\w*)\)/g.test(variaStr)) {
        result.push(RegExp.$1)
      }
      if (/eval\((['"])([\s\S]*)\1\)/g.test(variaStr)) {
        variaStr = RegExp.$2
      }
      variaStr.replace(/[\s\r\n]/g, '').split(/[\+\-\*\/\|\&,\?]/).forEach(str => {
        const nExp = str.match(/^\w+(?:\.\w*)*$/g)
        if (nExp) result.push(...nExp)
      })
      return result
    }, [])
    return [...new Set(variaArr)]
  }
}

let classI = 0,
  proClass

export const Updater = {
  textUpdater(node, vm, exp) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const text = _.template(exp)(vm)
    node['textContent'] = text
  },
  modelUpdater(node, vm, exp) {
    const value = vm[exp]
    node.value = typeof value == 'undefined' ? '' : value;
  },
  classUpdater(node, vm, exp) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const nExp = `{{${exp}}}`
    const classNames = _.template(nExp)(vm).split(',') 
    !classI && (proClass = [...node.classList])
    node.className = [...proClass, ...classNames].join(' ')
    classI++
  },
  styleUpdater(node, vm, exp) {
    const value = _with(exp,vm)
    node.style = Object.keys(value).reduce((sty,key) => {
      const style = `${key}:${value[key]};`
      sty += style
      return sty
    },'')
  }
}

function _with(exp, vm, extraRule, extraFn, otherFn) {
  let expOrFn, rule = /([a-zA-Z\$]+\w*)/g
  if(/^{[\s\S]+?}$/.test(exp)) {
    rule = /\:\s*([a-zA-Z\$]+\w*)/g
    exp = exp.replace(/\s/g,'')
  }
  expOrFn =  exp.replace(rule, (a, b) => {
    let nb, i = a.indexOf(b)
    const f = extraRule instanceof RegExp && extraRule.test(b)
    if (!f) nb = `this.${b}`
    else {
      nb = typeof extraFn === 'function' && extraFn(b)
    }
    a = a.split(b)
    a.splice(i,0,nb)
    return a.join('')
  })
  if(typeof otherFn === 'function') expOrFn = otherFn(expOrFn, RegExp.$1)
  return new Function('return ' + expOrFn).call(vm)
}
``` 
到此为止，实现了↓
* 模板解析  
* 事件绑定
* v-model
* :style
* :class
---
**[~gayhub](https://github.com/Mackkkk/webEffect/tree/master/src/view/vuerealization)**
