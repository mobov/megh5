<style lang='scss'>
  @import "~@mobov/scss-helper/import";
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
      <v-btn :color="lockBtnState.color" small @click="handleLock">{{lockBtnState.text}}</v-btn>
      <!--<v-switch v-model="ActiveNode.locked" label="锁定"></v-switch>-->
      <v-btn color="error" small @click="handleDelete">删除</v-btn>
    </MFlex>
    <div class="comp-setting-main m-hr-b m-p-md">
      <component :key="field"
                 :field="field"
                 fieldPath="props"
                 v-model="ActiveNode.nodeData.props[field]"
                 :nodeConfig="uiModule.nodeConfig[field]"
                 :nodeUid="ActiveNode.uid"
                 v-for="(data, field) in ActiveNode.nodeData.props"
                 :is="settingItem(field)"></component>
      <component :key="field"
                 :field="field"
                 fieldPath="style"
                 v-model="ActiveNode.nodeData.style[field]"
                 :nodeConfig="uiModule.nodeConfig[field]"
                 :nodeUid="ActiveNode.uid"
                 v-for="(data, field) in ActiveNode.nodeData.style"
                 :is="settingItem(field)"></component>
    </div>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { StateScreen, MutationSetPageNode, MutationDelActiveUid, MutationSetUiModule } from '@/store'
import { deepCopy } from '@mobov/es-helper'
import { uiMode, UiNode, UiModule } from '@megh5/ui/types/core/constants'

@Component
export default class CompSetting extends Vue {
  @State UiModules!: UiModule []

  @Getter ActiveNode!: UiNode

  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Mutation DEL_PAGE_NODE!: MutationDelActiveUid

  get uiModule (): UiModule {
    return this.UiModules.find(item => item.name === this.ActiveNode.name) as UiModule
  }

  get lockBtnState () {
    return this.ActiveNode.locked ? {
      color: 'error',
      text: '解锁'
    } : {
      color: 'success',
      text: '锁定'
    }
  }

  settingItem (name: string): any {
    // @ts-ignore
    return require(`@/components/setting/${this.uiModule!.nodeConfig[name]!.type}.vue`).default
  }

  handleDelete () {
    this.DEL_PAGE_NODE(this.ActiveNode.uid)
  }

  handleLock () {
    this.SET_PAGE_NODE({
      uid: this.ActiveNode.uid,
      locked: !this.ActiveNode.locked
    })
  }
}
</script>
