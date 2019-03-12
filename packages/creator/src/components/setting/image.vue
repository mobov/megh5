<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-image {

  }
</style>
<template>
  <div class="setting-image m-pb-md">
    <div class="setting-label">{{label}}</div>
    <v-img :src="value"
           height="200px"
           width="300px"
      aspect-ratio="1"
      class="grey lighten-2"
    />
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'
import { PropTypeLink } from '@megh5/ui/types/core/constants'

@Component()
export default class SettingImage extends Vue {
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

  handleValueChange (field, value) {
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
