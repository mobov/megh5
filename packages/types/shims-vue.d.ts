import Vue from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    marginTop: string | number
    marginBottom: string | number
    marginLeft: string | number
    marginRight: string | number
    float: boolean
    block: boolean
    height: string | number
    width: string | number
    fontSize: string | number
    fontColor: string
    bgColor: string
    bgSrc: string
    bgSrcActive: string
    text: string | number
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
