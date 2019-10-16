<template>
  <div id='gitalk-container'>

  </div>
</template>
<script>
  import 'gitalk/dist/gitalk.css'
  import Gitalk from 'gitalk'
  export default {
  	name: 'vTalk',
  	data() {
  		return {
  		}
  	},
  	methods: {},
  	mounted() {
      var gitalk = new Gitalk({
  				clientID: '9494cde758cacea4c23b',
  				clientSecret: '71bd64bc450fdd30f1adcf6904abf4c8f797ebd0',
  				repo: 'mackkkk.github.io.comments',
  				owner: 'mackkkk',
  				admin: ['mackkkk'],
  				id: window.location.pathname, 
  				distractionFreeMode: false, // Facebook-like distraction free mode
  			})
  		gitalk.render('gitalk-container')
  	},
  }
</script>
<style scoped lang='scss'>
</style>