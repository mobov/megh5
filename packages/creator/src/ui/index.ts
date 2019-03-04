import { UiModule } from '@megh5/ui/types/core/constants'

const ConfigData: UiModule [] = []

export function registerUiConfig(uiComp: UiModule | UiModule []) {
  if (uiComp instanceof Array) {
    uiComp.forEach(item => {
      ConfigData.push(item)
    })
  } else {
    ConfigData.push(uiComp)
  }
}

export function getUiConfig() {
  return ConfigData
}
