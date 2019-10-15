<template>
  <div class="chebox-con">
    <p>
      <a-checkbox @change="onChange">ConcreteSubject</a-checkbox>
      <a-button size='small' type="primary" icon="plus" @click="addObserver">创建Observer</a-button>
    </p>
    <div ref='observersContainer'></div>
  </div>
</template>

<script>
  import Button from 'ant-design-vue/lib/button';
  import Checkbox from 'ant-design-vue/lib/checkbox';
  import 'ant-design-vue/dist/antd.css';
  class Observer {
    constructor (obj) {
      this.target = obj
      Sub.AddObserver(this)
    }
    Update (context) {
      if (this.target) this.target.getUpdate(context)
    }
  }
  class ObserverList {
    constructor () {
      this.list = []
    }
    Add (obj) {
      if (this.IndexOf(obj) === -1) return this.list.push(obj)
    }
    Empty () {
      this.list = []
    }
    Count () {
      return this.list.length
    }
    Get (i) {
      if (i > -1 && i < this.list.length) {
        return this.list[i]
      }
    }
    Insert (obj, i) {
      if (this.IndexOf(obj) === -1) this.list.splice(i, 0, obj)
    }
    Remove (obj, i) {
      if (i) this.list.splice(i, 1)
      else {
        i = this.IndexOf(obj)
        this.list.splice(i, 1)
      }
    }
    IndexOf (obj) {
      return this.list.findIndex((item) => item == obj)
    }
  }
  class Subject {
    constructor () {
      this.observerList = new ObserverList()
    }
    AddObserver (observer) {
      this.observerList.Add(observer)
    }
    RemoveObserver (observer) {
      this.observerList.Remove(observer)
    }
    Notify (context) {
      const observersCount = this.observerList.Count()
      for (let i = 0;i < observersCount;i++) {
        this.observerList.Get(i).Update(context)
      }
    }
  }
  const Sub = new Subject()
  export default {
    components: {
      aButton: Button,
      aCheckbox: Checkbox
    },
    data() {
      return {
        i: 0
      }
    },
    methods: {
      addObserver() {
        if(this.i > 1) return
        this.i++
        // 创建新的具体目标
        const check = document.createElement('input'),
        p = document.createElement('p'),
        label = `<label class='label' for="checkbox${this.i}"> Observer${this.i}</label>`
        check.type = check.dataset.type = 'checkbox'
        // 创建新的观察者并添加到容器
        new Observer(check)
        // 观察者通知更新接口实现
        check.getUpdate = function (val) {
          this.checked = val
        }
        p.innerHTML = label
        p.prepend(check)
        this.$refs.observersContainer.appendChild(p)
      },
      onChange(e) {
        Sub.Notify(e.target.checked)
      }
    },
    mounted () {
    },
  };
</script>

<style lang="less">
.chebox-con{
  background: #f8f8f8;
  padding: 10px;
  max-height: 120px;
  .label{
    padding: 0 8px;
    color: rgba(0, 0, 0, 0.65);
  }
  p{
    display: flex;
    align-items: center;
  }
  input[data-type='checkbox'] {
    position: relative;
    width: 16px;
    height: 16px;
    background-color: #fff;
    -webkit-appearance:none;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    outline: none;
    transition: all .2s linear;
    &:focus,&:hover{
      border: 1px solid #1890ff;
    }
    &::after{
      transform: rotate(45deg) scale(0);
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      content: ' ';
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
      width: 5.71428571px;
      height: 9.14285714px;
      opacity: 0;
      position: absolute;
      display: table;
      top: 1.14285714px;
      left: 4.57142857px;
    }
    &:checked{
      background-color: #1890ff;
      border-color: #1890ff;
      &::after{
        transform: rotate(45deg) scale(1);
        opacity: 1;
      }
    }
  }
}
</style>