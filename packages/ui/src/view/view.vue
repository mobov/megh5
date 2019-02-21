<style scoped>
  .h-view {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }
</style>
<template>
  <div class="h-view" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { genSize, genColor } from '../core'

export default Vue.extend({
  name: 'HView',
  props: {
    minHeight: {
      type: [String, Number],
      default: '100vh'
    },
    fontSize: {
      type: [String, Number],
      default: '12px'
    },
    fontColor: {
      type: String
    },
    bgColor: {
      type: String
    },
    bgSrc: {
      type: String
    }
  },
  computed: {
    styles () {
      const { minHeight, fontSize, bgSrc, fontColor, bgColor } = this
      const styles: any = {
        backgroundImage: `url(${bgSrc})`
      }

      genColor(styles, 'color', fontColor)
      genColor(styles, 'backgroundColor', bgColor)
      genSize(styles, 'minHeight', minHeight)
      genSize(styles, 'fontSize', fontSize)

      return styles
    }
  }
})
</script>
