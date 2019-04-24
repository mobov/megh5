<style lang="scss">

</style>
<template>
  <MAppBar class="header-bar"
           size="100%"
           color="default"
           variety="flat"
           :elevation="0">
    <v-btn-toggle v-model="tool" mandatory>
      <v-btn flat value="select">
        <v-icon :style="{transform: 'rotate(270deg)'}">near_me</v-icon>
      </v-btn>
      <v-btn flat value="draw">
        <v-icon>add</v-icon>
      </v-btn>
    </v-btn-toggle>
    <MFlexFiller/>
    <MButton color="primary" size="sm" :style="{width: '80px'}" @click="handleSave" class="m-mr-sm">
      保存
    </MButton>
    <MButton color="primary" size="sm" :style="{width: '80px'}" class="m-mr-sm">
      导入
      <input @change="handleImport" style="cursor:pointer;opacity: 0;width: 100%;height: 100%;position: absolute;left: 0;top:0;z-index: 2" type="file" id="file" name="file" />
    </MButton>
    <MButton color="primary" size="sm" :style="{width: '80px'}" @click="handleExport">
      导出
    </MButton>
  </MAppBar>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { INIT_PROJECT, SET_ACTIVE_TOOL } from '@/store'
import { ProjectData } from '@megh5/ui/types/core/constants'
import { ActiveTools } from '@/constants'
import { importProject, exportProject, templateProject } from '@/project'

@Component
export default class HeaderBar extends Vue {
  @State Project!: ProjectData

  @State activeUid!: string

  @State activeTool!: ActiveTools

  @Mutation INIT_PROJECT!: INIT_PROJECT

  @Mutation SET_ACTIVE_TOOL!: SET_ACTIVE_TOOL

  get tool (): ActiveTools {
    return this.activeTool
  }

  set tool (val: ActiveTools) {
    console.log(val)
    this.SET_ACTIVE_TOOL(val)
  }

  async handleImport (e: any) {
    const result = await importProject(e.target.files[0])

    this.INIT_PROJECT(result)
  }

  handleExport () {
    exportProject(this.Project)
  }

  handleSave () {
    // @ts-ignore
    this.$app.$refs.timeline.handleShot()
  }

  bindToolListener (e: KeyboardEvent) {
    //可以判断是不是mac，如果是mac,ctrl变为花键
  }

  bindSaveListener (e: KeyboardEvent) {
    //可以判断是不是mac，如果是mac,ctrl变为花键
    if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
      e.preventDefault()
      this.handleSave()
    }
  }

  created () {
    // bind save
    document.addEventListener('keydown', this.bindSaveListener)
    document.addEventListener('keydown', this.bindToolListener)
  }

  beforeDestroy () {
    document.removeEventListener('keydown', this.bindSaveListener)
    document.removeEventListener('keydown', this.bindToolListener)
  }
}
</script>
