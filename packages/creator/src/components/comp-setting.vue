<style lang='scss'>
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
      font-size: 16px;
    }
    .comp-setting-main {
      width: inherit;
    }
    .comp-setting__sort-handler {
      cursor: move;
    }
  }
  .setting-label {
    color: #919191;
    margin-bottom: 10px;
  }
  .setting-label {
    color: #919191;
    margin-bottom: 10px;
  }
</style>
<template>
  <div class="comp-setting">
    <MFlex v-m-ripple class="comp-setting-header m-hr-b m-p-md" align="center">
      {{uiModule.title}}
      <MFlexFiller />
    </MFlex>
    <div class="comp-setting-main m-hr-b m-p-md">
      <component :key="field"
                 :field="field"
                 :label="uiModule.nodeConfig[field].text"
                 :value="ActiveNode.nodeData.props[field]"
                 :nodePath="ActiveNode.path"
                 v-for="(data, field) in ActiveNode.nodeData.props"
                 :is="settingItem(field)"></component>
    </div>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode } from '@/store'
import { deepCopy } from '@megmore/es-helper'
import { uiMode, UiNode, UiModule } from '@megh5/ui/types/core/constants'

@Component()
export default class CompSetting extends Vue {
  @Mutation SET_PAGE_NODE: MutationSetPageNode
  @Getter ActiveNode: UiNode
  @State UiModules: UiModule []

  get label () {
    return this.uiModule.nodeConfig[name].type
  }
  get uiModule (): UiModule {
    return this.UiModules.find(item => item.name === this.ActiveNode.name)
  }

  settingItem (name) {
    return require(`@/components/setting/${this.uiModule.nodeConfig[name].type}.vue`).default
  }

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
