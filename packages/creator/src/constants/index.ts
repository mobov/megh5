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
  editor = 1,
  setting = 2
}

export enum ActiveTools {
  select = 'select',
  draw = 'draw'
}

export type settingType = 'text' | 'image' | 'url' | 'size' | 'urlParam' | 'i18n' | 'link' | 'color'
