<template>
  <MApp>
    <MView right-size="300px">
      <MAppBar slot="header"
               size="100%"
               color="default"
               font-color="white"
               variety="flat"
               :elevation="2">
        <MFlexFiller />
        <MButton icon="menu" color="default" variety="flat" :elevation="0" shape="circle" />
      </MAppBar>
      <div slot="right">
        <div>按钮</div>
      </div>
      <Previewer v-model="PreviewData"></Previewer>
    </MView>
  </MApp>
</template>
<script lang="tsx">
import Vue from 'vue'
import Previewer from '@/components/previewer.vue'
import BUTTON_BG from './assets/btn.png'

const PreviewData = {
  name: 'testproject',
  version: '0.0.1',
  dependencies: [{
    '@megmore/es-helper': '^0.0.24'
  }, {
    '@megmore/scss-helper': '^0.0.4'
  }, {
    '@megmore/vui': '^0.0.2',
    'imports': ['HView', 'HButton']
  }],
  VNode: {
    tag: 'h-view',
    rootNode: true,
    data: {
    },
    children: [{
      tag: 'h-button',
      data: {
        style: {
          color: 'white',
          width: '200px',
          height: '50px',
          left: 0,
          top: 0
        },
        props: {
          bgSrc: BUTTON_BG
        },
        domProps: {
          innerHTML: '哈哈哈'
        }
      },
      children: []
    }, {
      tag: 'h-button',
      data: {
        style: {
          color: 'white',
          width: '100px',
          height: '50px',
          left: 0,
          top: 0
        },
        props: {
          bgSrc: BUTTON_BG
        },
        domProps: {
          innerHTML: '哈哈哈'
        }
      },
      children: []
    }]
  }
}
export default Vue.extend({
  name: 'App',
  components: {
    Previewer
  },
  data () {
    return {
      PreviewData
    }
  }
})
</script>
