<style lang='scss'>
  @import "../../../../../node_modules/@megmore/scss-helper/import";
  .setting-move {
    display: flex;
    align-items: center;
    .setting-size__input {
      width: 500px;
    }
  }
</style>
<template>
  <div class="setting-radio">
    <div class="setting-label">{{label}}</div>
    <v-radio-group :column="false" :value="value">
      <v-radio v-for="selection in nodeConfig.extra"
               :key="selection.value"
               :value="selection.value"
               @change="handleValueChange"
               :label="selection.text"
      ></v-radio>
    </v-radio-group>

  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from 'src/store'

@Component()
export default class SettingSize extends Vue {
  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Prop({ type: String })
  field!: string

  @Prop({ type: String })
  fieldPath!: 'props' | 'style'

  @Prop({ type: String })
  nodeUid!: string

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

  get label () {
    return this.nodeConfig.text
  }

  handleValueChange (value: string) {
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        [this.fieldPath]: {
          [this.field]: value
        }
      }
    })
  }
}
</script>
