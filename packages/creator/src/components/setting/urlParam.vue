<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-urlParam {

  }
</style>
<template>
  <div class="setting-urlParam">
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

@Component()
export default class SettingUrlParam extends Vue {
  @Mutation SET_PAGE_NODE: MutationSetPageNode

  @Prop({ type: String })
  field!: string

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

  handleValueChange (value) {
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        props: {
          [this.field]: value
        }
      }
    })
  }
}
</script>
