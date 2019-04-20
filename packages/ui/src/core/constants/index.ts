
import { VNodeData, VNodeChildren, VNode } from 'vue'

export enum Mode {
  light = 'light',
  night = 'night'
}

export type mode = 'light' | 'night'

export enum UiMode {
  x = 'x',
  y = 'y',
  xy = 'xy',
  none = 'none'
}

export type uiMode = 'x' | 'y' | 'xy' | 'none'

export interface PropTypeLink {
  text: string
  href: string
}

export interface KV {
  [field: string]: any
}

export type settingType = 'text' | 'image' | 'url' | 'size' | 'urlParam' | 'i18n' | 'link' | 'color'

export type positionType = 'relative' | 'absolute' | 'fixed'

export interface UiNodeProps {
  // 基础参数
  position?: positionType
  x?: number | string
  y?: number | string
  height?: number | string
  width?: number | string
  // 组件拓展参数
  bgImg?: string
  text?: string
  logo?: string,
  termsLink?: PropTypeLink,
  policyLink?: PropTypeLink,
  copyright?: string
  [field: string]: any
}

export interface UiNodeData extends VNodeData {
  style?: object;
  props?: UiNodeProps
}

export interface UiNodeConfig {
  disabled?: boolean
  isParent?: boolean
  locked?: boolean
  moveMode?: uiMode
  sizeMode?: uiMode
}

export interface UiNode {
  name: string
  uid: string
  pid: string
  locked: boolean
  uiConfig?: UiNodeConfig
  nodeData: UiNodeData
  children: Array<UiNode>
}

interface SettingTypeOpts {
   type: settingType
   text: string
   extra?: any
}

export interface UiModule extends UiNode {
  title: string
  cover: string
  nodeConfig: UiNodeProps
  uiConfig: UiNodeConfig
}

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
