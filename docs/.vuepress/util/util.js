var util = {
  random: function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  },
  randomColor: function() {
    // 生成非纯白随机色
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
  },
  randomSpeed: function() {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random() * 2
  }
}

export default util
