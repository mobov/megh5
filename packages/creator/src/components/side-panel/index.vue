<style lang="scss">
  .side-panel {
    height: 100%;
  }
</style>
<template>
  <MView class="side-panel" fillHeader="none" headerSize="48px" rightSize="100px">
    <VTabs slot="header" :value="activePanel" @change="handleNav" color="primary" dark slider-color="success">
      <VTab ripple>组件库</VTab>
      <VTab ripple>配置</VTab>
      <VTab ripple>项目</VTab>
    </VTabs>
    <MFlex class="side-panel-main">
      <Library v-show="activePanel === 0" />
      <Editor v-show="activePanel === 1" />
      <Setting v-show="activePanel === 2" />
      <!--<Editor v-show="activePanel === 1 && !mainActive" />-->
      <!--<Setting v-show="activePanel === 1 && mainActive" />-->
    </MFlex>
    <Tree slot="right" class="m-elevation-2" />
  </MView>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import Library from './library/index.vue'
import Setting from './setting.vue'
import Editor from './editor/index.vue'
import Tree from '@/components/tree/index.vue'
import { SET_ACTIVE_PANEL } from '@/store'
import { ActivePanels } from '@/constants'
import { uiMode, UiNode, UiModule, ProjectData } from '@megh5/ui/types/core/constants'

@Component({
  components: { Library, Setting, Editor, Tree }
})
export default class SidePanel extends Vue {
  @State Project!: ProjectData

  @State activePanel!: ActivePanels

  @State activeUid!: string

  @Mutation SET_ACTIVE_PANEL!: SET_ACTIVE_PANEL

  @Watch('activeUid')
  handleCompActive () {
    this.SET_ACTIVE_PANEL(ActivePanels.editor)
  }

  get mainActive () {
    return this.Project.mainUid === this.activeUid
  }

  handleNav (index: number) {
    this.SET_ACTIVE_PANEL(index)
  }
}
</script>
