<style lang='scss'>
  .editor-item-move {
    display: flex;
    align-items: center;
    .editor-item-size__input {
      width: 500px;
    }
  }
</style>
<template>
  <div class="editor-item-radio">
    <div class="editor-item-label">{{label}}</div>
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
  import { SET_PAGE_NODE } from 'src/store'

  @Component
  export default class SettingSize extends Vue {
    @Mutation SET_PAGE_NODE!: SET_PAGE_NODE

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
