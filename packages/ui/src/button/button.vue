<style>
  .h-button {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<template>
  <div class="h-button"
       :style="styles"
       @click="onClick">
    {{text}}
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { genBgImg, genSize, genPosX, genPosY } from '../core/utils'

@Component
export default class HButton extends Vue {
  @Prop({ type: Boolean, default: false })
  float: boolean

  @Prop({ type: [Number, String], default: 50 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: Boolean })
  block: boolean

  @Prop({ type: [String, Number], default: '12px' })
  fontSize: string | number

  @Prop({ type: String, default: '' })
  bgSrc: string

  @Prop({ type: String, default: '' })
  bgActiveSrc: string

  @Prop({ type: String, default: '按钮' })
  text!: string

  @Emit('click')
  onClick (e: Event) { }

  get styles (): any {
    const { height, width, x, y, float, bgSrc } = this
    const styles = {}

    genBgImg(styles, bgSrc)
    genSize(styles, 'height', height)
    genSize(styles, 'width', width)
    genPosX(styles, x, float)
    genPosY(styles, y, float)

    return styles
  }
}
</script>
