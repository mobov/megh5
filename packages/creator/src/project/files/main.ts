/* eslint-disable */

export default `
  import Vue from 'vue'
  import App from './App.vue'
  import FastClick from 'fastclick'
  import MegH5 from '@megh5/ui'

  Vue.use(MegH5)

  FastClick.attach(document.body)
  document.addEventListener('touchstart', () => {})
  Vue.config.productionTip = false
  
  new Vue({
    render: h => h(App)
  }).$mount('#app')
`
