<template>
  <div id="app">
    <Previewer>
      <HView bgColor="purple">
        <HButton :bgSrc="BUTTON_BG"
                 :width="200"
                 fontColor="white"
                 :height="50"/>
        <HButton :bgSrc="BUTTON_BG"
                 :width="200"
                 fontColor="white"
                 :height="50"/>
      </HView>
    </Previewer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Previewer from '@/components/previewer.vue'
import { HView, HButton } from '@megh5/ui'
import BUTTON_BG from './assets/btn.png'

export default Vue.extend({
  name: 'App',
  components: {
    Previewer,
    HView,
    HButton
  },
  data () {
    return {
      BUTTON_BG
    }
  }
})
</script>
