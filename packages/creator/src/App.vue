<style>
  .app {
    user-select: none;
  }

  html {
    overflow-y: hidden !important;
  }
</style>
<template>
  <v-app>
    <MApp class="app">
      <MView rightSize="700px"
             headerSize="50px"
             fillHeader="left"
             :rightIndex="5">
        <MAppBar slot="header"
                 size="100%"
                 color="default"
                 variety="flat"
                 :elevation="0">
          <MFlexFiller/>
          <m-button color="primary" size="sm" :style="{width: '100px'}" class="m-mr-sm">
            导入
            <input @change="handleImport" style="cursor:pointer;opacity: 0;width: 100%;height: 100%;position: absolute;left: 0;top:0;z-index: 2" type="file" id="file" name="file" />
          </m-button>
          <m-button color="primary" size="sm" :style="{width: '100px'}" @click="handleExport">
            导出
          </m-button>
        </MAppBar>
        <SidePanel class="m-elevation-2" slot="right"></SidePanel>
        <MFlex full justify="center" align="center" @click="handleSetProject" style="height: 100%">
          <Previewer @click.stop mode="preview"/>
          <!--<h-video type="youtube"></h-video>-->
        </MFlex>
      </MView>
    </MApp>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { MutationSetProject, MutationSetActiveUid } from '@/store'
import { ProjectData } from '@megh5/ui/types/core/constants'
import Previewer from '@/components/previewer.vue'
import Menu from '@/components/menu.vue'
import SidePanel from '@/components/side-panel.vue'
import { importProject, exportProject, templateProject } from '@/project'

@Component({
  components: { SidePanel, Previewer, Menu }
})
export default class App extends Vue {
  @State Project!: ProjectData
  @Mutation SET_PROJECT!: MutationSetProject
  @Mutation SET_ACTIVE_UID!: MutationSetActiveUid

  created () {
    this.SET_PROJECT(templateProject)
  }

  async handleImport (e: any) {
    const result = await importProject(e.target.files[0])
    console.log(result)
    this.SET_PROJECT(result)
  }

  handleExport () {
    exportProject(this.Project)
  }

  handleSetProject () {
    this.SET_ACTIVE_UID(this.Project.mainUid)
  }
}
</script>
