import HApp from './app.vue'

HApp.install = (Vue) => {
  Vue.component('HApp', HApp)
}

export default HApp
