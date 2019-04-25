import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
import '@mobov/vui/lib/style.css'
import Mobov from '@mobov/vui'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import './ui'

Vue.use(Mobov)

Vue.use(Vuetify, {
    theme: {
      primary: '#512da8', // #E53935
    }
  }
)

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
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
