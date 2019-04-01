<style lang="scss">
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
  <div class="h-app" :style="styles">
    <div class="h-app-main">
      <slot></slot>
    </div>
    <slot name="footer" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import { genSize, genColor, genBgImg } from '../core/utils'

@Component
export default class HApp extends Vue {
  @Prop({ type: [Number, String], default: '100%' })
  height!: string | number

  @Prop({ type: [Number, String], default: '100%' })
  width!: string | number

  @Prop({ type: String, default: 'transparent' })
  bgColor!: string

  @Prop({ type: String, default: '' })
  bgImg!: string

  get styles (): any {
    const { height, width, bgColor, bgImg } = this
    const styles = {}

    genSize(styles, 'min-height', height)
    genSize(styles, 'width', width)
    genColor(styles, 'background-color', bgColor)
    genBgImg(styles, bgImg)

    return styles
  }
}
</script>
