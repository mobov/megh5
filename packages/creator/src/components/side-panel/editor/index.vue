<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .editor {
    width: 100%;
    height: 100%;
    @include scroller();
    @include slim-scroll-bar();
    .editor-header {
      width: inherit;
      cursor: pointer;
      height: 50px;
      font-size: 16px;
    }
    .editor-main {
      width: inherit;
    }
    .comp-setting__sort-handler {
      cursor: move;
    }
  }
  .editor-item-label {
    color: #919191;
    margin-bottom: 10px;
  }
</style>
<template>
  <div class="editor">
    <MFlex v-m-ripple class="editor-header m-hr-b m-p-md" align="center">
      {{uiModule.title}}
      <MFlexFiller />
      <v-btn :color="lockBtnState.color" small @click="handleLock">{{lockBtnState.text}}</v-btn>
      <!--<v-switch v-model="ActiveNode.locked" label="锁定"></v-switch>-->
      <v-btn v-if="!disableDelete" color="error" small @click="handleDelete">删除</v-btn>
    </MFlex>
    <div class="editor-main m-hr-b m-p-md">
      <component :key="field"
                 :field="field"
                 fieldPath="props"
                 v-model="ActiveNode.nodeData.props[field]"
                 @input="handleChange('props', field, arguments[0])"
                 :nodeConfig="uiModule.nodeConfig[field]"
                 :nodeUid="ActiveNode.uid"
                 v-for="(data, field) in ActiveNode.nodeData.props"
                 :is="settingItem(field)"></component>
      <component :key="field"
                 :field="field"
                 fieldPath="style"
                 v-model="ActiveNode.nodeData.style[field]"
                 @input="handleChange('style', field, arguments[0])"
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
import { SET_LOCK, DEL_ACTIVE_UID, SET_UI_MODULE, SET_PAGE_NODE } from '@/store'
import { deepCopy } from '@mobov/es-helper'
import { uiMode, UiNode, UiModule } from '@megh5/ui/types/core/constants'

@Component
export default class Editor extends Vue {
  @State UiModules!: UiModule []

  @Getter ActiveNode!: UiNode

  @Mutation SET_LOCK!: SET_LOCK

  @Mutation DEL_PAGE_NODE!: DEL_ACTIVE_UID

  @Mutation SET_PAGE_NODE!: SET_PAGE_NODE

  get uiModule (): UiModule {
    return this.UiModules.find(item => item.name === this.ActiveNode.name) as UiModule
  }

  get disableDelete (): boolean {
    return this.ActiveNode.uiConfig.isRoot === true
  }
  get lockBtnState () {
    return this.ActiveNode.uiConfig.locked ? {
      color: 'error',
      text: '解锁'
    } : {
      color: 'success',
      text: '锁定'
    }
  }

  settingItem (name: string): any {
    // @ts-ignore
    return require(`@/components/side-panel/editor/item/${this.uiModule!.nodeConfig[name]!.type}.vue`).default
  }

  handleDelete () {
    this.DEL_PAGE_NODE(this.ActiveNode.uid)
  }

  handleLock () {
    this.SET_LOCK(this.ActiveNode.uid)
  }

  handleChange (fieldPath: 'props' | 'style', field: string, val: any) {
    this.SET_PAGE_NODE({
      uid: this.ActiveNode.uid,
      nodeData: {
        [fieldPath]: {
          [field]: val
        }
      }
    })
  }
}
</script>
