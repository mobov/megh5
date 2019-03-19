/**
 * Created by nocoolyoyo on 2019/3/20.
 */
export default `
  import Vue from 'vue'
  import App from './App.vue'
  import i18n from './i18n'
  import FastClick from 'fastclick'

  FastClick.attach(document.body)
  document.addEventListener('touchstart', () => {})
  Vue.config.productionTip = false
  
  new Vue({
    i18n,
    render: h => h(App)
  }).$mount('#app')
`


