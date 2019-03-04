<template>
  <MApp>
    <MView rightSize="500px" fillHeader="left">
      <MAppBar slot="header"
               size="100%"
               color="default"
               variety="flat"
               :elevation="2">
        <MFlexFiller />
        <MButton icon="menu"
                 @click="showRight = !showRight"
                 color="default"
                 variety="flat"
                 :elevation="0"
                 shape="circle"></MButton>
      </MAppBar>
      <MFlex style="height: 100%" class="m-elevation-2" v-if="showRight" slot="right">
        <Menu></Menu>
      </MFlex>
      <MFlex full justify="center" align="center" style="height: 100%">
        <Previewer v-model="PreviewData"></Previewer>
      </MFlex>
    </MView>
  </MApp>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import Previewer from '@/components/previewer.vue'
import Menu from '@/components/menu.vue'
import PreviewData from './pageMock'

@Component({
  components: { Previewer, Menu }
})
export default class App extends Vue {
  PreviewData = PreviewData

  showRight = true
}
</script>
