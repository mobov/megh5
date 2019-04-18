<style lang="scss">
  html {
    font-size: 62.5%;
  }

  .h-app {
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    position: relative;
    .h-app-main {
      flex-grow: 1;
      position: relative;
    }
  }
</style>
<template>
  <div id="h-app" class="h-app" :style="styles">
    <div class="h-app-main">
      <slot></slot>
    </div>
    <slot name="footer" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import Store from '../core/store'
import { genSize, genColor, genBgImg } from '../core/utils'

@Component
export default class HApp extends Vue {
  @Prop({ type: [Number, String], default: '100%' })
  height!: string | number

  @Prop({ type: [Number, String], default: '100%' })
  width!: string | number

  @Prop({ type: String, default: '' })
  bgImg!: string

  get styles (): any {
    const { height, width, bgImg } = this
    const styles = {}

    genSize(styles, 'min-height', height)
    genSize(styles, 'width', width)
    genBgImg(styles, bgImg)

    return styles
  }

  mounted () {
    Store.SET_APP(this)
  }
}
</script>
