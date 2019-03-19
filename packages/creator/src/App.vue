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
                 @click="handleDownload">下载</v-btn>
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
import PreviewData from './pageMock'
import SidePanel from '@/components/side-panel.vue'
import * as JSZip from 'jszip'

@Component({
  components: { SidePanel, Previewer, Menu }
})
export default class App extends Vue {
  @State Project!: ProjectData
  @Mutation SET_PROJECT!: MutationSetProject

  created () {
    this.SET_PROJECT(PreviewData)
  }

  async handleDownload () {
    const zip = new JSZip()
    zip.file('megh5.json', JSON.stringify(this.Project, null, 2))

    const content = await zip.generateAsync({ type: 'blob' })
    const a: HTMLElement = document.createElement('a')
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    a.href = URL.createObjectURL(content)
    // 设置文件名，目前只有Chrome和FireFox支持此属性
    a.download = `${this.Project.name}.zip`
    a.click()
  }
}
</script>
