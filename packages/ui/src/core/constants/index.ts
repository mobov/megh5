import { VNodeData } from 'vue'

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

export interface UiNodeData extends VNodeData {
  props: {
    // 基础参数
    float?: boolean
    floatIndex?: number
    x?: number | string
    y?: number | string
    height?: number | string
    width?: number | string
    // 组件拓展参数
    bgSrc?: string
    text?: string
    logo?: string,
    termsText?: string,
    termsLink?: string,
    policyText?: string,
    policyLink?: string,
    copyright?: string
  }
}

export interface UiNode {
  name: string
  path: string
  nodeData: UiNodeData
  children?: UiNode []
}

export interface UiNodeProps {
  float?: boolean
  height?: string | number
  width?: string | number
  x?: string | number
  y?: string | number
  block?: boolean
  fontSize?: string | number
  bgSrc?: string
  bgActiveSrc?: string
  text?: string
}

export interface UiModule extends UiNode {
  title: string
  cover: string
  uiConfig: {
    disabled?: boolean
    moveMode: uiMode
    sizeMode: uiMode
  }
}

export interface ProjectData {
  name: string
  version: string
  dependencies: any
  mainPath: string,
  UiNodes: UiNode []
}

