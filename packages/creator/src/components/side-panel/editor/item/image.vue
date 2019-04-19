<style lang='scss'>
  .editor-item-image {
    cursor: pointer;
  }
  .editor-item-image-main {
    position: relative;
    height: 150px;
    width: 100%;
    display: flex;
  }
  .editor-item-image-uploader {
    height: 150px;
    width: 250px;
  }
  .editor-item-image-backer {
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
  <div class="editor-item-image m-pb-md">
    <div class="editor-item-label">{{label}}</div>
    <div class="editor-item-image-main">
      <div class="editor-item-image-uploader">
        <v-img :src="value"
               contain
               height="150px"
               width="250px"
               class="m-elevation-2 grey lighten-2"/>
        <input class="editor-item-image-backer"
               @change="handleValueChange"
               type="file">
      </div>

      <v-btn color="error" small @click="handleDelete">清除</v-btn>
    </div>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'

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
