<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
</style>
<template>
  <div class="setting-switch">
    <div class="setting-label">{{label}}</div>
    <v-switch v-model="_value"></v-switch>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'

@Component
export default class SettingSwitch extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  value!: boolean

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

  get _value () {
    return this.value
  }

  set _value (val) {
    this.$emit('input', val)
  }

  get label () {
    return this.nodeConfig.text
  }
}
</script>
