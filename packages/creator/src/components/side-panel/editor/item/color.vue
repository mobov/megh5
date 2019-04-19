<style lang='scss'>
  .vc-sketch {
    box-shadow: var(--m-elevation-2) !important;
  }
</style>
<template>
  <div class="editor-item-color m-pb-md">
    <div class="editor-item-label">{{label}}</div>
    <sketch v-model="_value"></sketch>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { Sketch } from 'vue-color'

@Component({
  // @ts-ignore
  components: { Sketch }
})
export default class SettingColor extends Vue {
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
    const result = `rgba(${val.rgba.r}, ${val.rgba.g}, ${val.rgba.b}, ${val.rgba.a})`
    this.$emit('input', result)
  }

  get label () {
    return this.nodeConfig.text
  }
}
</script>
