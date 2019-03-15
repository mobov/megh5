import { UiNode } from '@megh5/ui/types/core/constants'

export enum TypeDirection {
  x = 'x',
  y = 'y',
  xy = 'xy',
  none = 'none'
}

export type typeDirection = 'x' | 'y' | 'xy' | 'none'

export interface ProjectData {
  name: string
  version: string
  dependencies: any
  mainUid: string,
  UiNodes: UiNode [],
  Device: {
    width: number,
    height: number
  }
}

export type settingType = 'text' | 'image' | 'url' | 'size' | 'urlParam' | 'i18n' | 'link' |  'color'
