<style lang='scss'>
  @import "../../../../../node_modules/@mobov/scss-helper/import";
  .setting-size {
    display: inline-flex;
    align-items: flex-end;
    .setting-size__input {
      max-width: 150px;
      margin-right: 10px;
    }
  }
</style>
<template>
  <div class="setting-size">
    <v-text-field
      class="setting-size__input"
      :value="value"
      type="number"
      :min="min"
      :max="max"
      @input="handleValueChange"
      :label="label"
      required
    ></v-text-field>
    <!--<v-btn color="primary" small @click="handleFullSize">铺满</v-btn>-->
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'

@Component
export default class SettingSize extends Vue {
  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  fieldPath!: 'props' | 'style'

  @Prop({ type: String })
  nodeUid!: string

  @Prop({
    type: Number
  })
  value!: number

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

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

  handleValueChange (value: any) {
    value = isNaN(Number(value)) ? value : Number(value)

    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        [this.fieldPath]: {
          [this.field]: value
        }
      }
    })
  }

  handleFullSize () {

  }
}
</script>
