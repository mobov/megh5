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
import { genBgImg, genSize, genPosX, genPosY, genPosition, getStrValue } from '../core/utils'
import { positionType } from '../core/constants'

@Component
export default class HButton extends Vue {
  @Prop({ type: String, default: 'relative' })
  position!: positionType

  @Prop({ type: [Number, String], default: 50 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: String, default: '' })
  bgImg!: string

  @Prop({ type: String, default: '按钮' })
  text!: string

  @Emit('click')
  onClick (e: Event) { }

  get viewText () {
    return getStrValue(this, this.text)
  }

  get float (): boolean {
    return this.position !== 'relative'
  }

  get styles (): any {
    const { height, width, x, y, bgImg, position, float } = this
    const styles = {}

    genPosition(styles, position)
    genBgImg(styles, bgImg)
    genSize(styles, 'height', height)
    genSize(styles, 'width', width)
    genPosX(styles, x, float)
    genPosY(styles, y, float)

    return styles
  }
}
</script>
