import Vue  from 'vue'
import { HApp, HView, HButton, HFooter, HPromoCode } from '@megh5/ui'
import { registerUiConfig } from './'

const megh5UiConfig = require('@megh5/ui/megh5.config.json')

registerUiConfig(megh5UiConfig)

Vue.component(HApp.name, HApp)
Vue.component(HView.name, HView)
Vue.component(HButton.name, HButton)
Vue.component(HFooter.name, HFooter)
Vue.component(HPromoCode.name, HPromoCode)
