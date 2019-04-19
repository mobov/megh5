<style lang='scss'>
</style>
<template>
  <div class="editor-item-radio">
    <div class="editor-item-label">{{label}}</div>
    <v-radio-group :column="false" v-model="_value">
      <v-radio v-for="selection in nodeConfig.extra"
               :key="selection.value"
               :value="selection.value"
               :label="selection.text"
      ></v-radio>
    </v-radio-group>

  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'

@Component
export default class SettingSize extends Vue {
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

  set _value (val: string) {
    this.$emit('input', val)
  }

  get label () {
    return this.nodeConfig.text
  }
}
</script>
