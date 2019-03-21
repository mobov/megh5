<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  .project-setting {
    width: 100%;
    height: 100%;
    @include scroller();
    @include slim-scroll-bar();
    .project-setting-header {
      width: inherit;
      cursor: pointer;
      height: 50px;
      font-size: 16px;
    }
    .project-setting-main {
      width: inherit;
    }
    .project-setting__sort-handler {
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
  <div class="project-setting">
    <MFlex v-m-ripple class="project-setting-header m-hr-b m-p-md" align="center">
      项目设置
      <MFlexFiller />
    </MFlex>
    <div class="project-setting-main m-hr-b m-p-md">
      <v-text-field
        v-model="Project.name"
        label="名称"
        required
      ></v-text-field>
      <v-text-field
        v-model="Project.version"
        label="版本"
        required
      ></v-text-field>
    </div>
  </div>
</template>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import { MutationSetPageNode, MutationDelActiveUid, MutationSetProjectData } from '@/store'
import { deepCopy } from '@megmore/es-helper'
import { uiMode, UiNode, UiModule, ProjectData } from '@megh5/ui/types/core/constants'

@Component
export default class ProjectSetting extends Vue {
  @State Project!: ProjectData

  @Mutation SET_PROJECT_DATA!: MutationSetProjectData

  // handleValueChange (field: string, value: any) {
  //   value = isNaN(Number(value)) ? value : Number(value)
  //
  //   this.SET_PROJECT_DATA({
  //     [field]: value
  //   })
  // }
}
</script>
