<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
  .setting-image {
    cursor: pointer;
  }
  .setting-image-main {
    position: relative;
    height: 150px;
    width: 100%;
    display: flex;
  }
  .setting-image-uploader {
    height: 150px;
    width: 250px;
  }
  .setting-image-backer {
    opacity: 0;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    height: 150px;
    width: 250px;
    cursor: pointer;
  }
</style>
<template>
  <div class="setting-image m-pb-md">
    <div class="setting-label">{{label}}</div>
    <div class="setting-image-main">
      <div class="setting-image-uploader">
        <v-img :src="value"
               contain
               height="150px"
               width="250px"
               class="m-elevation-2 grey lighten-2"/>
        <input class="setting-image-backer"
               @change="handleValueChange"
               type="file">
      </div>

      <v-btn color="error" small @click="handleDelete">清除</v-btn>
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

  get _value () {
    return this.value
  }

  set _value (val: any) {
    // console.log(val)
    // val = isNaN(Number(val)) ? val : Number(val)
    // this.$emit('input', val)
  }

  get label () {
    return this.nodeConfig.text
  }

  handleValueChange (e: any) {
    const file = e.target.files[0]
    let reader: any = new FileReader()

    const onLoad = () => {
      this.$emit('input', reader.result)
      reader.removeEventListener('load', onLoad)
      reader = null
    }

    reader.addEventListener('load', onLoad, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  handleDelete () {
    this.$emit('input', '')
  }
}
</script>
