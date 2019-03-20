<style lang="scss">
  $--size-side-panel-nav: 48px;
  .side-panel {
    height: 100%;
  }
  .side-panel-main {
    height: calc(100% - #{$--size-side-panel-nav});
  }
  .side-panel-nav {
    height: $--size-side-panel-nav;
    max-height: $--size-side-panel-nav;
  }

  .side-panel-nav__item {
    width: 100px;
  }
</style>
<template>
  <div class="side-panel" >
    <v-tabs :value="active" @change="handleNav" color="purple darken-3" dark slider-color="deep-orange">
      <v-tab ripple>组件库</v-tab>
      <v-tab ripple>配置</v-tab>
      <v-tab ripple>组件树</v-tab>
      <v-tab ripple>编辑器</v-tab>
    </v-tabs>
    <div class="side-panel-main">
      <Library v-show="active === 0" />
      <div v-show="active === 1" >
        <ProjectSetting v-if="mainActive" />
        <CompSetting v-else />
      </div>
      <CompTree v-show="active === 2" />
    </div>
  </div>
    <!--<MAppBar class="side-panel-nav" :elevation="0" color="primary">-->
      <!--<MButton class="side-panel-nav__item m-mr-md" :elevation="0" color="primary" @click="handleNav('library')">-->
        <!--组件库-->
      <!--</MButton>-->
      <!--<MButton class="side-panel-nav__item m-mr-md" :elevation="0" color="primary" @click="handleNav('setting')">-->
        <!--组件配置-->
      <!--</MButton>-->
      <!--<MButton class="side-panel-nav__item m-mr-md" :elevation="0" color="primary" @click="handleNav('editor')">-->
        <!--编辑器-->
      <!--</MButton>-->
    <!--</MAppBar>-->
    <!--<div class="side-panel-content">-->
      <!--<Library v-if="activePanel === 'library'" />-->
      <!--<SettingTree v-else-if="activePanel === 'setting'" />-->
    <!--</div>-->
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import Library from '@/components/menu.vue'
import CompSetting from '@/components/comp-setting.vue'
import ProjectSetting from '@/components/project-setting.vue'
import CompTree from '@/components/comp-tree.vue'
import { StateActivePanel, MutationSetActivePanel, ActivePanels } from '@/store'
import { uiMode, UiNode, UiModule, ProjectData } from '@megh5/ui/types/core/constants'

@Component({
  components: { Library, CompTree, CompSetting, ProjectSetting }
})
export default class SidePanel extends Vue {
  @State Project: ProjectData

  @State activePanel: StateActivePanel

  @State activeUid: string

  @Mutation SET_ACTIVE_PANEL: MutationSetActivePanel

  @Watch('activeUid')
  handleCompActive () {
    this.SET_ACTIVE_PANEL(ActivePanels['setting'])
  }

  get mainActive () {
    return this.Project.mainUid === this.activeUid
  }

  get active () {
    return ActivePanels[this.activePanel]
  }

  handleNav (index: number) {
    this.SET_ACTIVE_PANEL(ActivePanels[index])
  }
}
</script>
