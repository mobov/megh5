<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .vc-sketch {
    box-shadow: var(--m-elevation-2) !important;
  }
</style>
<template>
  <div class="setting-color m-pb-md">
    <div class="setting-label">{{label}}</div>
    <sketch :value="value" @input="handleValueChange"></sketch>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'
import { Sketch } from 'vue-color'

@Component({
  // @ts-ignore
  components: { Sketch }
})
export default class SettingColor extends Vue {
  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  fieldPath!: 'props' | 'style'

  @Prop({ type: String })
  nodeUid!: string

  @Prop({
    type: String,
    default: ''
  })
  value!: string

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

  get label () {
    return this.nodeConfig.text
  }

  handleValueChange (value: any) {
    const result = `rgba(${value.rgba.r}, ${value.rgba.g}, ${value.rgba.b}, ${value.rgba.a})`
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        [this.fieldPath]: {
          [this.field]: result
        }
      }
    })
  }
}
</script>
