<style lang='scss'>
  .editor-item-text {

  }
</style>
<template>
  <div class="editor-item-text">
    <v-text-field
      v-model="_value"
      :label="label"
      required
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'

@Component
export default class SettingText extends Vue {
  @Prop({
    type: [String, Number],
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

  set _value (val: string) {
    this.$emit('input', val)
  }

  get label () {
    return this.nodeConfig.text
  }
}
</script>
