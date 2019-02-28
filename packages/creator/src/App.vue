<template>
  <MApp>
    <MView right-size="300px">
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
        <MList v-m-ripple style="width: 100%;height: 50px">
          呵呵
        </MList>
      </MFlex>
      <Previewer v-model="PreviewData"></Previewer>
    </MView>
  </MApp>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import Previewer from '@/components/previewer.vue'
import PreviewData from './pageMock'

@Component({
  components: { Previewer }
})
export default class App extends Vue {
  PreviewData = PreviewData

  showRight = true
}
</script>
