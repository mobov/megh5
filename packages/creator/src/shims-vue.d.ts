import Vue from 'vue'

declare module 'vue/types/options' {
  interface CombinedVueInstance<V extends Vue> {
    Previewer?: any
  }
  interface ComponentOptions<V extends Vue> {
    // base
    width?: string | number
    height?: string | number
    styles?: any
    screenStyles?: any
    // element
    enableMove?: boolean
    enableSizeL?: boolean
    enableSizeR?: boolean
    enableSizeT?: boolean
    enableSizeB?: boolean
    moveX?: number
    moveY?: number
    sizeX?: number
    sizeY?: number
    compStyle?: any
    heightLimit?: number
    widthLimit?: number
    topLimit?: number
    bottomLimit?: number
    leftLimit?: number
    rightLimit?: number
  }
}
