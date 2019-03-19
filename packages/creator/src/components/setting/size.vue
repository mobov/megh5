<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-size {
    display: flex;
    align-items: flex-end;
    .setting-size__input {
      max-width: 50px;
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
      @input="handleValueChange"
      :label="label"
      required
    ></v-text-field>
    <v-slider
      :value="value"
      :min="min"
      :max="max"
      @input="handleValueChange"
      thumb-label
    ></v-slider>
    <!--<v-btn color="primary" small @click="handleFullSize">铺满</v-btn>-->
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'

@Component()
export default class SettingSize extends Vue {
  @Mutation SET_PAGE_NODE: MutationSetPageNode

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
    return this.nodeConfig.extra.min
  }
  get max () {
    return this.nodeConfig.extra.max
  }

  handleValueChange (value) {
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
