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
import { getUrlParam } from '@megmore/es-helper'
import { StateScreen, MutationSetPageNode } from 'src/store'
import { PropTypeLink } from '@megh5/ui/types/core/constants'

@Component()
export default class SettingUrlParam extends Vue {
  @Mutation SET_PAGE_NODE: MutationSetPageNode

  @Prop({ type: String })
  label!: string

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  nodePath!: string

  @Prop({
    type: String,
    default: ''
  })
  value!: string

  get viewValue () {
    return getUrlParam(this.value) || this.value
  }

  handleValueChange (value) {
    this.SET_PAGE_NODE({
      path: this.nodePath,
      nodeData: {
        props: {
          [this.field]: value
        }
      }
    })
  }
}
</script>
