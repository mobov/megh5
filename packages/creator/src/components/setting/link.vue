<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
  .setting-link {

  }
</style>
<template>
  <div class="setting-link">
    <v-text-field
      :value="value.text"
      @input="handleValueChange('text', arguments[0])"
      label="链接文案"
      required></v-text-field>
    <v-text-field
      :value="value.href"
      @input="handleValueChange('href', arguments[0])"
      label="链接地址"
      required></v-text-field>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'
import { PropTypeLink } from '@megh5/ui/types/core/constants'

@Component
export default class SettingLink extends Vue {
  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  nodeUid!: string

  @Prop({
    type: Object,
    default: () => ({
      text: '',
      href: ''
    })
  })
  value!: PropTypeLink

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

  handleValueChange (field: string, value: string) {
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        props: {
          [this.field]: {
            [field]: value
          }
        }
      }
    })
  }
}
</script>
