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

declare module 'vue/types/vue' {
  export interface RawComponentOptions<
    V extends Vue = Vue,
    Data = {} | undefined,
    Methods = {} | undefined,
    Computed = {} | undefined,
    Props = {} | undefined
    > {
    name?: string
    install?: (Vue: VueConstructor) => void
    data: Data
    methods: Methods
    computed: {
      [C in keyof Computed]: (this: V) => Computed[C]
    }
    props: Props
  }

  export interface VueConstructor<
    V extends Vue = Vue,
    Options = Record<string, any>
    > {
    version: string
    install?: (Vue: VueConstructor) => void
    options: Options
  }
}
