<style lang='scss'>
  .editor-item-size {
    display: inline-flex;
    align-items: flex-end;
    .editor-item-size__input {
      max-width: 150px;
      margin-right: 10px;
    }
  }
</style>
<template>
  <div class="editor-item-size">
    <v-text-field
      class="editor-item-size__input"
      v-model="_value"
      type="number"
      :min="min"
      :max="max"
      :disabled="disabled"
      :label="label"
      required
    ></v-text-field>
    <!--<v-btn color="primary" small @click="handleFullSize">铺满</v-btn>-->
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'

@Component
export default class SettingSize extends Vue {
  @Prop({
    type: [Number, String]
  })
  value!: number

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

  get _value () {
    return this.value
  }

  set _value (val: number) {
    val = isNaN(Number(val)) ? val : Number(val)
    this.$emit('input', val)
  }

  get label () {
    return this.nodeConfig.text
  }
  get min () {
    let min = -9999
    if (this.nodeConfig.extra && this.nodeConfig.extra.min) {
      min = this.nodeConfig.extra.min
    }
    return min
  }
  get max () {
    let max = 9999
    if (this.nodeConfig.extra && this.nodeConfig.extra.max) {
      max = this.nodeConfig.extra.max
    }
    return max
  }

  get disabled () {
    return typeof this.value === 'string'
  }

  handleFullSize () {

  }
}
</script>
