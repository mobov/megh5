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
      <MView rightSize="500px"
             fillHeader="left"
             :rightIndex="5">
        <MAppBar slot="header"
                 size="100%"
                 color="default"
                 variety="flat"
                 :elevation="0">
          <MFlexFiller/>
          <MButton icon="menu"
                   @click="showRight = !showRight"
                   color="default"
                   variety="flat"
                   :elevation="0"
                   shape="circle"></MButton>
        </MAppBar>
        <SidePanel class="m-elevation-2" v-if="showRight" slot="right"></SidePanel>
        <MFlex full justify="center" align="center" style="height: 100%">
          <Previewer mode="preview"/>
        </MFlex>
      </MView>
    </MApp>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { MutationSetProject } from '@/store'
import Previewer from '@/components/previewer.vue'
import Menu from '@/components/menu.vue'
import PreviewData from './pageMock'
import SidePanel from '@/components/side-panel.vue'

@Component({
  components: { SidePanel, Previewer, Menu }
})
export default class App extends Vue {
  @Mutation SET_PROJECT!: MutationSetProject

  showRight = true

  created () {
    this.SET_PROJECT(PreviewData)
  }
}
</script>
