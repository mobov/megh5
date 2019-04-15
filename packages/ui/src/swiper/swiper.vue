<style lang="scss" scoped>
  .h-text {
    background-repeat: no-repeat;
  }
</style>
<template>
  <div class="h-swiper" :style="styles">
    <swiper>

    </swiper>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { genSize, genEllipsis, getStrValue, genPosition, genPosX, genPosY } from '../core/utils'
import { positionType } from '../core/constants'

@Component
export default class HText extends Vue {
  @Prop({ type: String, default: 'relative' })
  position!: positionType

  @Prop({ type: [Number, String], default: 50 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 12 })
  fontSize!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: Number, default: 0 })
  ellipsis!: number

  @Prop({ type: String, default: '内容' })
  text!: string

  get viewText () {
    return getStrValue(this, this.text)
  }

  get float (): boolean {
    return this.position !== 'relative'
  }

  get styles (): any {
    const { height, width, ellipsis, fontSize, position, x, y, float } = this
    const styles = {}

    genPosition(styles, position)
    genEllipsis(styles, ellipsis)
    genSize(styles, 'width', width)
    genSize(styles, 'height', height)
    genSize(styles, 'fontSize', fontSize)
    genPosX(styles, x, float)
    genPosY(styles, y, float)

    return styles
  }
}
</script>
