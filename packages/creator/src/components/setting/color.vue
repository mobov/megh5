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
  components: {
    Sketch
  }
})
export default class SettingColor extends Vue {
  @Mutation SET_PAGE_NODE: MutationSetPageNode

  @Prop({ type: String })
  label!: string

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  nodeUid!: string

  @Prop({
    type: String,
    default: ''
  })
  value!: string

  handleValueChange (value) {
    const result = `rgba(${value.rgba.r}, ${value.rgba.g}, ${value.rgba.b}, ${value.rgba.a})`
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        props: {
          [this.field]: result
        }
      }
    })
  }
}
</script>
