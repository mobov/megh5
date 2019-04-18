<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
  /*.setting-move {*/
    /*display: flex;*/
    /*align-items: center;*/
    /*.setting-size__input {*/
      /*width: 500px;*/
    /*}*/
  /*}*/
</style>
<template>
  <div class="setting-radio">
    <div class="setting-label">{{label}}</div>
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
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'

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
