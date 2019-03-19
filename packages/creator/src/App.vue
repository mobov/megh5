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
          <v-btn color="primary"
                 @click="handleImport">导入</v-btn>
          <v-btn color="primary"
                 @click="handleExport">导出</v-btn>
        </MAppBar>
        <SidePanel class="m-elevation-2" slot="right"></SidePanel>
        <MFlex full justify="center" align="center" style="height: 100%">
          <Previewer @click.stop mode="preview"/>
        </MFlex>
      </MView>
    </MApp>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { MutationSetProject } from '@/store'
import { ProjectData } from '@megh5/ui/types/core/constants'
import Previewer from '@/components/previewer.vue'
import Menu from '@/components/menu.vue'
import SidePanel from '@/components/side-panel.vue'
import { importProject, exportProject, tempateProject } from '@/project'

@Component({
  components: { SidePanel, Previewer, Menu }
})
export default class App extends Vue {
  @State Project!: ProjectData
  @Mutation SET_PROJECT!: MutationSetProject

  created () {
    this.SET_PROJECT(tempateProject)
  }

  handleImport () {
    importProject()
  }

  handleExport () {
    exportProject(this.Project)
  }
}
</script>
