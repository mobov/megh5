import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './ui'
import '@mobov/vui/lib/style.css'
import Mobov from '@mobov/vui'
Vue.use(Mobov)

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

// 全局禁止右键 菜单
// @ts-ignore
if (document.layers) {
  // @ts-ignore
  document.captureEvents(Event.MOUSEDOWN)
}
document.onmousedown = function (e: MouseEvent) {
  e = e || event
  if (e.button === 2) {
    const tag = e.srcElement || e.target
    // @ts-ignore
    if (tag.type === 'text' || tag.type === 'textarea') {
      // @ts-ignore
      document.oncontextmenu = new Function('return true')
    } else {
      // @ts-ignore
      document.oncontextmenu = new Function('return false')
    }
  }
}
// @ts-ignore
document.oncontextmenu = new Function('return false')

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
