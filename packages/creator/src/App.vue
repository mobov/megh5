<style>
  .app {
    user-select: none;
  }

  html {
    overflow-y: hidden !important;
  }
</style>
<template>
  <VApp>
    <MApp class="app">
      <MView rightSize="700px"
             headerSize="50px"
             leftSize="50px"
             fillHeader="none"
             :rightIndex="5">
        <MAppBar slot="header"
                 size="100%"
                 color="default"
                 variety="flat"
                 :elevation="0">
          <MFlexFiller/>
          <MButton color="primary" size="sm" :style="{width: '100px'}" class="m-mr-sm">
            导入
            <input @change="handleImport" style="cursor:pointer;opacity: 0;width: 100%;height: 100%;position: absolute;left: 0;top:0;z-index: 2" type="file" id="file" name="file" />
          </MButton>
          <MButton color="primary" size="sm" :style="{width: '100px'}" @click="handleExport">
            导出
          </MButton>
        </MAppBar>
        <Timeline class="m-elevation-3" slot="left"/>
        <SidePanel class="m-elevation-2" slot="right" />
        <MFlex full justify="center" align="center" style="height: 100%">
          <Previewer @click.stop mode="preview"/>
        </MFlex>
      </MView>
    </MApp>
  </VApp>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { SET_PROJECT, SET_ACTIVE_UID } from '@/store'
import { ProjectData } from '@megh5/ui/types/core/constants'
import Previewer from '@/components/previewer/index.vue'
import Timeline from '@/components/timeline/index.vue'
import SidePanel from '@/components/side-panel/index.vue'
import { importProject, exportProject, templateProject } from '@/project'

@Component({
  components: { SidePanel, Previewer, Timeline }
})
export default class App extends Vue {
  @State Project!: ProjectData
  @Mutation SET_PROJECT!: SET_PROJECT
  @Mutation SET_ACTIVE_UID!: SET_ACTIVE_UID

  created () {
    this.SET_PROJECT(templateProject)
  }

  async handleImport (e: any) {
    const result = await importProject(e.target.files[0])

    this.SET_PROJECT(result)
  }

  handleExport () {
    exportProject(this.Project)
  }

  // handleSetProject () {
  //   this.SET_ACTIVE_UID(this.Project.mainUid)
  // }
}
</script>
