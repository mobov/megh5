import Vue from 'vue'
import App from './App.vue'
import Megmore from '@megmore/vui'

Vue.use(Megmore)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
