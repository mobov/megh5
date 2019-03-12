<style>
  .h-view {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    position: relative;
    min-height: 100%;
    min-width: 100%;
  }
</style>
<template>
  <div class="h-view" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import { genBgImg, genSize, genPosX, genPosY } from '../core/utils'

@Component
export default class HView extends Vue {
  @Prop({ type: Boolean, default: false })
  float: boolean

  @Prop({ type: [Number, String], default: '100%' })
  height!: string | number

  @Prop({ type: [Number, String], default: '100%' })
  width!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: String, default: '' })
  bgImg: ImageData

  get styles (): any {
    const { bgSrc, height, width, x, y } = this
    const styles = {}

    genBgImg(styles, bgSrc)
    genSize(styles, 'height', height)
    genSize(styles, 'width', width)
    genPosX(styles, x)
    genPosY(styles, y)

    return styles
  }
}
</script>
