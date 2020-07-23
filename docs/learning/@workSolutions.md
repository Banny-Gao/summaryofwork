# Works Solution

## IE中打开谷歌
**需要降低Internet选项安全级别**
```javascript
function openChrome(url) {
  if (!window.ActiveXObject) return
  // ActiveObject仅在IE下可创建
  var objShell = new ActiveXObject("WScript.Shell")
  // 注意这里是/c，不可使用/k，否则资源不会释放
  var cmd = `cmd.exe /c start  C:/Users/lenovo/AppData/Local/Google/Chrome/Application/chrome.exe ${url}`
  objShell.Run(cmd, 0, true);
}
```

## 小程序textarea输入行数限制
```html
<textarea class='textarea' maxlength="-1" placeholder="请输入" name="reason" data-name="reason" data-linelimit="8"/>
```
```javascript
textInput(e) {
  const value = e.detail.value
  const {name, linelimit} = e.currentTarget.dataset
  if(!linelimit) return
  const $el =  wx.createSelectorQuery().selectAll('.textarea')
  let line = 0
  new Promise(resolve => {
    $el.boundingClientRect((rects) => {
      resolve(rects)
    }).exec()
  }).then(rects => {
    const {width} = rects.find(item => item.dataset.name === name)
    const n = value.split('').reduce((r,i) => {
      if(/\d/.test(i)) r+= 5.95
      else if(/[↵\n]/.test(i)) {
        line++
        r = 0
      }
      else if(/[a-zA-Z]/.test(i)) r+=7
      else r+=12.5
      return r
    }, 0)
    line+=Math.ceil(n/width)
    if(line > linelimit) {
        wx.showModal({
          showCancel: false,
          content: `输入不能超过${linelimit}行，超过部分将会被截取`
        })
    }
  })
}
```  

<vTalk />