<style>
  .h-view {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: stretch;
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
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import { genSize, genColor } from '../core'

@Component
export default class HView extends Vue {
  @Prop({ type: String, default: '100%' })
  minHeight: string | number

  @Prop({ type: [String, Number], default: '12px' })
  fontSize: string | number

  @Prop({ type: String })
  fontColor: string

  @Prop({ type: String })
  bgColor: string

  @Prop({ type: String })
  bgSrc: string

  get styles (): any {
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
</script>
