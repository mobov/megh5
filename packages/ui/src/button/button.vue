<style scoped>
  .button {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<template>
  <div class="button"
       :style="styles"
       @click="handleAction">
    {{text}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { genSize, genColor } from '../core'

export default Vue.extend({
  props: {
    marginTop: {
      type: String
    },
    marginBottom: {
      type: String
    },
    marginLeft: {
      type: String
    },
    marginRight: {
      type: String
    },
    float: {
      type: Boolean
    },
    block: {
      type: Boolean
    },
    height: {
      type: [String, Number],
      default: '20px'
    },
    width: {
      type: [String, Number],
      default: '20px'
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
    },
    bgSrcActive: {
      type: String
    },
    text: {
      type: [String, Number],
      default: '按钮'
    }
  },
  computed: {
    styles () {
      const { width, height, fontSize, bgSrc, marginTop, marginBottom, marginLeft, marginRight, fontColor, bgColor } = this
      const styles: any = {
        backgroundImage: `url(${bgSrc})`
      }

      genColor(styles, 'color', fontColor)
      genColor(styles, 'backgroundColor', bgColor)
      genSize(styles, 'width', width)
      genSize(styles, 'height', height)
      genSize(styles, 'fontSize', fontSize)
      genSize(styles, 'marginTop', marginTop)
      genSize(styles, 'marginBottom', marginBottom)
      genSize(styles, 'marginLeft', marginLeft)
      genSize(styles, 'marginRight', marginRight)

      return styles
    }
  },
  methods: {
    handleAction (e: Event) {
      this.$emit('click', e)
    }
  }
})
</script>
