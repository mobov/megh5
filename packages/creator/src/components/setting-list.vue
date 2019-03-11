<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  .setting-list {
    width: 100%;
    display: flex;
    .setting-list-header {
      width: inherit;
      cursor: pointer;
    }
    .setting-list-main {
      width: inherit;
    }
    .setting-list__sort-handler {
      cursor: move;
    }
  }

  .form-input {

  }
</style>
<template>
  <MFlex class="setting-list" direction="column" justify="stretch">
    <MFlex v-m-ripple class="setting-list-header m-hr-b m-p-md" align="center">
      {{value.name}}
      <MFlexFiller />
      <MIcon class="setting-list__sort-handler" name="menu" />
    </MFlex>
    <MFlex class="setting-list-main m-hr-b m-p-md">
      <!--<div :key="field" v-for="(data, field) in value.nodeData.props">-->
        <!--<MInput :label="field" :value="data"/>-->
      <!--</div>-->
      <v-flex :key="field" v-for="(data, field) in value.nodeData.props">
        <v-text-field
          :value="value.nodeData.props[field]"
          @change="handleValueChange(field, arguments[0])"
          :label="field"
          required
        ></v-text-field>
        <v-img
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
          class="grey lighten-2"
        />
      </v-flex>
    </MFlex>
  </MFlex>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from '@/store'
import { deepCopy } from '@megmore/es-helper'
import { getLayerIndex } from '@/utils/layer'
import { uiMode, UiNode, UiNodeProps } from '@megh5/ui/types/core/constants'

@Component()
export default class SettingList extends Vue {
  @Prop({ type: Object, default: () => {} })
  value!: UiNode

  @Mutation SET_PAGE_NODE: MutationSetPageNode

  handleValueChange (field, value) {
    value = isNaN(Number(value)) ? value : Number(value)

    this.SET_PAGE_NODE({
      path: this.value.path,
      nodeData: {
        props: {
          [field]: value
        }
      }
    })
  }
}
</script>
