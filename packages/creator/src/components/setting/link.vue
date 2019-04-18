<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
  .setting-link {

  }
</style>
<template>
  <div class="setting-link">
    <v-text-field
      v-model="_value.text"
      label="链接文案"
      required></v-text-field>
    <v-text-field
      :value="_value.href"
      label="链接地址"
      required></v-text-field>
  </div>
  <!--@input="handleValueChange('href', arguments[0])"-->
  <!--@input="handleValueChange('text', arguments[0])"-->
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { PropTypeLink } from '@megh5/ui/types/core/constants'

@Component
export default class SettingLink extends Vue {
  @Prop({
    type: Object,
    default: () => ({
      text: '',
      href: ''
    })
  })
  value!: PropTypeLink

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
}
</script>
