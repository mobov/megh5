<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-text {

  }
</style>
<template>
  <div class="setting-text">
    <v-text-field
      :value="value"
      @input="handleValueChange"
      :label="label"
      required
    ></v-text-field>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'
import { PropTypeLink } from '@megh5/ui/types/core/constants'

@Component()
export default class SettingText extends Vue {
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
