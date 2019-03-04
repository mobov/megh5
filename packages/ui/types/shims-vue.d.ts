import Vue from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue> {
    version: string
    install?: (Vue: VueConstructor) => void
  }
}
