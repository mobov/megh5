import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
//
// export default class HAppStore extends Vue {
//   root!: VueConstructor
//
//   public SET_ROOT (val: VueConstructor) {
//     this.root = val
//   }
// }

class HAppStore extends Vue {
  $app!: Vue

  SET_APP (val: Vue) {
    this.$app = val
  }
}

export default new HAppStore()

