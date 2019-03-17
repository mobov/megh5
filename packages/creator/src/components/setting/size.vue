<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-size {
    display: flex;
    align-items: center;
    .setting-size__input {
      width: 500px;
    }
  }
</style>
<template>
  <div class="setting-size">
    <v-text-field
      class="setting-size__input"
      :value="value"
      @input="handleValueChange"
      :label="label"
      required
    ></v-text-field>
    <v-btn color="primary" small @click="handleFullSize">铺满</v-btn>
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
  nodeUid!: string

  @Prop({
    type: [String, Number],
    default: ''
  })
  value!: number| string

  @Prop({
    type: Object,
    default: {}
  })
  nodeConfig!: any

  get label () {
    return this.nodeConfig.text
  }

  handleValueChange (value) {
    value = isNaN(Number(value)) ? value : Number(value)

    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        props: {
          [this.field]: value
        }
      }
    })
  }

  handleFullSize () {

  }
}
</script>
