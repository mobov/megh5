<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
</style>
<template>
  <div class="setting-switch">
    <div class="setting-label">{{label}}</div>
    <v-switch
      :value="value"
      @change="handleValueChange"
    ></v-switch>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'

@Component
export default class SettingSwitch extends Vue {
  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  fieldPath!: 'props' | 'style'

  @Prop({ type: String })
  nodeUid!: string

  @Prop({
    type: Boolean,
    default: false
  })
  value!: boolean

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

  get label () {
    return this.nodeConfig.text
  }

  handleValueChange (value: string) {
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        [this.fieldPath]: {
          [this.field]: value
        }
      }
    })
  }
}
</script>
