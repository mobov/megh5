<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  @import "~@megmore/scss-helper/import";
  .comp-setting {
    width: 100%;
    height: 100%;
    @include scroller();
    @include slim-scroll-bar();
    .comp-setting-header {
      width: inherit;
      cursor: pointer;
      height: 50px;
    }
    .comp-setting-main {
      width: inherit;
    }
    .comp-setting__sort-handler {
      cursor: move;
    }
  }
</style>
<template>
  <div class="comp-setting">
    <MFlex v-m-ripple class="comp-setting-header m-hr-b m-p-md" align="center">
      {{ActiveNode.name}}
      <MFlexFiller />
    </MFlex>
    <div class="comp-setting-main m-hr-b m-p-md">
      <div :key="field" v-for="(data, field) in ActiveNode.nodeData.props">
        <v-text-field
          :value="ActiveNode.nodeData.props[field]"
          @input="handleValueChange(field, arguments[0])"
          :label="field"
          required
        ></v-text-field>
        <!--<v-img-->
          <!--:src="`https://picsum.photos/500/300`"-->
          <!--:lazy-src="`https://picsum.photos/10/6`"-->
          <!--aspect-ratio="1"-->
          <!--class="grey lighten-2"-->
        <!--/>-->
      </div>
    </div>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from '@/store'
import { deepCopy } from '@megmore/es-helper'
import { getLayerIndex } from '@/utils/layer'
import { uiMode, UiNode, UiNodeProps } from '@megh5/ui/types/core/constants'

@Component()
export default class CompSetting extends Vue {
  @Mutation SET_PAGE_NODE: MutationSetPageNode
  @Getter ActiveNode: UiNode

  handleValueChange (field, value) {
    value = isNaN(Number(value)) ? value : Number(value)

    this.SET_PAGE_NODE({
      path: this.ActiveNode.path,
      nodeData: {
        props: {
          [field]: value
        }
      }
    })
  }
}
</script>
