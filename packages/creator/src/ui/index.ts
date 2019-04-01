import Vue from 'vue'
// import { HApp, HView, HButton, HFooter, HPromoCode } from '@megh5/ui'
import MegH5 from '@megh5/ui'

import Store from '@/store'
const megh5UiConfig = require('@megh5/ui/megh5.config.json')

Store.commit('SET_UI_MODULE', megh5UiConfig)

Vue.use(MegH5)
