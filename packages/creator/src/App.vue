<template>
  <div id="app">
    <Button :bgSrc="BUTTON_BG"
            :width="200"
            fontColor="white"
            :height="50"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Button } from '@megh5/ui'
import BUTTON_BG from './assets/btn.png'

export default Vue.extend({
  name: 'app',
  components: {
    Button
  },
  data () {
    return {
      BUTTON_BG
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
