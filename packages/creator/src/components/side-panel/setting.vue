<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .setting {
    width: 100%;
    height: 100%;
    @include scroller();
    @include slim-scroll-bar();
    .setting-header {
      width: inherit;
      cursor: pointer;
      height: 50px;
      font-size: 16px;
    }
    .setting-main {
      width: inherit;
    }
    .project-setting__sort-handler {
      cursor: move;
    }
  }
</style>
<template>
  <div class="setting">
    <MFlex v-m-ripple class="setting-header m-hr-b m-p-md" align="center">
      项目设置
      <MFlexFiller />
    </MFlex>
    <div class="setting-main m-hr-b m-p-md">
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
      <v-text-field
        v-model="Project.version"
        label="全局变量"
        required
      ></v-text-field>
    </div>
  </div>
</template>
<script lang="tsx">
  import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
  import { State, Getter, Mutation } from 'vuex-class'
  import { SET_PAGE_NODE, DEL_ACTIVE_UID, SET_PROJECT_DATA } from '@/store'
  import { deepCopy } from '@mobov/es-helper'
  import { uiMode, UiNode, UiModule, ProjectData } from '@megh5/ui/types/core/constants'

  @Component
  export default class ProjectSetting extends Vue {
    @State Project!: ProjectData

    @Mutation SET_PROJECT_DATA!: SET_PROJECT_DATA

    // handleValueChange (field: string, value: any) {
    //   value = isNaN(Number(value)) ? value : Number(value)
    //
    //   this.SET_PROJECT_DATA({
    //     [field]: value
    //   })
    // }
  }
</script>
