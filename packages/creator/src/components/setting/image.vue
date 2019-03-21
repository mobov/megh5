<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-image {
    cursor: pointer;
  }
  .setting-image-main {
    position: relative;
    height: 200px;
    width: 300px;
  }
  .setting-image-backer {
    opacity: 0;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    height: 200px;
    width: 300px;
    cursor: pointer;
  }
</style>
<template>
  <div class="setting-image m-pb-md">
    <div class="setting-label">{{label}}</div>
    <div class="setting-image-main">
      <v-img :src="value"
             contain
             height="200px"
             width="300px"
             class="m-elevation-2 grey lighten-2"/>
      <input class="setting-image-backer"
             @change="handleValueChange"
             type="file">
    </div>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'
import { PropTypeLink } from '@megh5/ui/types/core/constants'

@Component
export default class SettingImage extends Vue {
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

  handleValueChange (e: any) {
    const file = e.target.files[0]
    let reader: any = new FileReader()

    const onLoad = () => {
      this.SET_PAGE_NODE({
        uid: this.nodeUid,
        nodeData: {
          [this.fieldPath]: {
            [this.field]: reader.result
          }
        }
      })
      reader.removeEventListener('load', onLoad)
      reader = null
    }

    reader.addEventListener('load', onLoad, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }
}
</script>
