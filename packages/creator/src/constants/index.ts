import { UiNode } from '@megh5/ui/types/core/constants'

export enum TypeDirection {
  x = 'x',
  y = 'y',
  xy = 'xy',
  none = 'none'
}

export type typeDirection = 'x' | 'y' | 'xy' | 'none'

export enum ActivePanels {
  library = 0,
  setting = 1,
  tree = 2,
  editor = 3
}

export type settingType = 'text' | 'image' | 'url' | 'size' | 'urlParam' | 'i18n' | 'link' |  'color'
