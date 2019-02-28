<style lang='scss'>
  @import "~@megmore/scss-helper/import";

  $--element-handler-color: #03a9f4;
  .element {
    user-select: none;
    z-index: 1;
    box-sizing: border-box;
  }

  .element-handler-t,
  .element-handler-b,
  .element-handler-l,
  .element-handler-r,
  .element-handler-tl,
  .element-handler-tr,
  .element-handler-bl,
  .element-handler-br {
    background-color: $--element-handler-color;
    position: absolute;
    z-index: 2;
  }

  .element-handler-t,
  .element-handler-b {
    height: 3px;
    width: 100%;
    left: 0;
    cursor: ns-resize;
  }

  .element-handler-l,
  .element-handler-r {
    width: 3px;
    height: 100%;
    top: 0;
    cursor: ew-resize;
  }

  .element-handler-t {
    top: 0;
  }

  .element-handler-b {
    bottom: 0
  }

  .element-handler-l {
    left: 0
  }

  .element-handler-r {
    right: 0
  }

  .element-handler-tl,
  .element-handler-tr,
  .element-handler-bl,
  .element-handler-br {
    width: 10px;
    height: 10px;
    font-size: 1px;
    border-radius: 50%;
    border: 1px solid #fff;
    z-index: 3;
  }

  .element-handler-tl {
    left: -3px;
    top: -3px;
    cursor: nw-resize;
  }

  .element-handler-tr {
    right: -3px;
    top: -3px;
    cursor: ne-resize;
  }

  .element-handler-bl {
    left: -3px;
    bottom: -3px;
    cursor: sw-resize;
  }

  .element-handler-br {
    right: -3px;
    bottom: -3px;
    cursor: se-resize;
  }
</style>

<template>
  <div class="element" :style="styles" @mousedown.stop="enableMove = true">
    <slot></slot>
    <div class="element-handler-t" v-if="canSizeY" @mousedown.stop="enableSizeT = true"></div>
    <div class="element-handler-b" v-if="canSizeY" @mousedown.stop="enableSizeB = true"></div>
    <div class="element-handler-l" v-if="canSizeX" @mousedown.stop="enableSizeL = true"></div>
    <div class="element-handler-r" v-if="canSizeX" @mousedown.stop="enableSizeR = true"></div>
    <div class="element-handler-tl" v-if="canSizeX && canSizeY" @mousedown.stop="enableSizeT = true; enableSizeL = true"></div>
    <div class="element-handler-tr" v-if="canSizeX && canSizeY" @mousedown.stop="enableSizeT = true; enableSizeR = true"></div>
    <div class="element-handler-bl" v-if="canSizeX && canSizeY" @mousedown.stop="enableSizeB = true; enableSizeL = true"></div>
    <div class="element-handler-br" v-if="canSizeX && canSizeY" @mousedown.stop="enableSizeB = true; enableSizeR = true"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Inject, Mixins } from 'vue-property-decorator'
import { PreviewerObject } from './previewer.vue'
import { getLayerIndex } from '@/utils/layer'

function getStyleVal (styleStr: string | number): number | string {
  let result: string | number = 0

  if (typeof styleStr === 'number') {
    result = styleStr
  } else {
    if (/px/.test(styleStr)) {
      result = Number(styleStr.substring(0, styleStr.length - 2))
    } else {
      result = styleStr
    }
  }
  return result
}

function toStyleVal (styleStr: string | number): string {
  let result = ''

  if (typeof styleStr === 'number') {
    result = `${styleStr}px`
  } else {
    result = styleStr
  }
  return result
}

type typeDirection = 'x' | 'y' | 'xy' | 'none'

@Component
export default class Element extends Vue {
  @Prop({ type: Boolean, default: false })
  float!: boolean

  @Prop({ type: String, default: 'xy' })
  moveMode!: typeDirection

  @Prop({ type: String, default: 'xy' })
  sizeMode!: typeDirection

  @Inject()
  Previewer: PreviewerObject = {
    height: 736,
    width: 320,
    scrollHeight: 736
  }

  enableMove = false
  enableSizeL = false
  enableSizeR = false
  enableSizeT = false
  enableSizeB = false
  zIndex = getLayerIndex()
  moveX: number | string = 0
  moveY: number | string = 0
  sizeX: number | string = 0
  sizeY: number | string = 0

  get styles (): any {
    const styleMove = this.float ? {
      left: toStyleVal(this.moveX),
      top: toStyleVal(this.moveY)
    } : {
      marginLeft: toStyleVal(this.moveX),
      marginTop: toStyleVal(this.moveY)
    }
    return {
      position: this.float ? 'absolute' : 'relative',
      cursor: this.moveMode === 'none' ? 'pointer' : 'move',
      // transform: `translate(${this.moveX}px, ${this.moveY}px)`,
      zIndex: this.zIndex,
      width: toStyleVal(this.sizeX),
      height: toStyleVal(this.sizeY),
      ...styleMove
    }
  }
  get compStyle (): any {
    const { $slots } = this as any
    return $slots!.default[0]!.data!.style || {}
  }
  get parentNode (): HTMLElement {
    return (this.$parent.$el || this.$parent) as HTMLElement
  }
  get parentWidth () {
    return this.parentNode.clientWidth
  }
  get parentHeight () {
    return this.parentNode.clientHeight
  }
  get canSizeX () {
    return this.sizeMode.indexOf('x') !== -1
  }
  get canSizeY () {
    return this.sizeMode.indexOf('y') !== -1
  }
  get canMoveX () {
    return this.moveMode.indexOf('x') !== -1
  }
  get canMoveY () {
    return this.moveMode.indexOf('y') !== -1
  }
  get heightLimit (): number {
    return this.Previewer.scrollHeight - (this.moveY as number)
  }
  get widthLimit (): number {
    return this.Previewer.width - (this.moveX as number)
  }
  get topLimit (): number {
    return 0
  }
  get bottomLimit (): number {
    return this.Previewer.scrollHeight - (this.sizeY as number)
  }
  get leftLimit (): number {
    return 0
  }
  get rightLimit (): number {
    return this.Previewer.width - (this.sizeX as number)
  }

  init () {
    console.log(this.$slots)
    this.moveX = getStyleVal(this.compStyle.left)
    this.moveY = getStyleVal(this.compStyle.top)
    this.sizeX = getStyleVal(this.compStyle.width)
    this.sizeY = getStyleVal(this.compStyle.height)
    this.compStyle.left = 0
    this.compStyle.top = 0
    this.compStyle.width = '100%'
    this.compStyle.height = '100%'
    // if (this.canSizeX) {
    //   this.moveX = getStyleVal(this.compStyle.left)
    //   this.compStyle.left = 0
    // }
    // if (this.canMoveY) {
    //   this.moveY = getStyleVal(this.compStyle.top)
    //   this.compStyle.top = 0
    // }
    // if (this.canSizeX) {
    //   this.sizeX = getStyleVal(this.compStyle.width)
    //   this.compStyle.width = '100%'
    // }
    // if (this.canSizeY) {
    //   this.sizeY = getStyleVal(this.compStyle.height)
    //   this.compStyle.height = '100%'
    // }
  }
  handleMoveX (val: number) {
    console.log(val)
    console.log(this.moveX)
    if (!this.canMoveX) { return }
    const { leftLimit, rightLimit } = this
    const moveX = this.moveX as number + val

    if (moveX >= leftLimit && moveX <= rightLimit) {
      this.moveX = moveX
    } else if (moveX < leftLimit) {
      this.moveX = leftLimit
    } else if (moveX > rightLimit) {
      this.moveX = rightLimit
    }
  }
  handleMoveY (val: number) {
    if (!this.canMoveY) { return }
    const { topLimit, bottomLimit } = this
    const moveY = this.moveY as number + val

    if (moveY >= topLimit && moveY <= bottomLimit) {
      this.moveY = moveY
    } else if (moveY < topLimit) {
      this.moveY = topLimit
    } else if (moveY > bottomLimit) {
      this.moveY = bottomLimit
    }
  }
  handleSizeX (val: number, direction: 'L' | 'R') {
    const { leftLimit, widthLimit } = this
    const sizeX = this.sizeX as number + (direction === 'L' ? -val : val)
    if (direction === 'L') {
      const moveX = this.moveX as number + val
      if (moveX >= leftLimit) {
        this.sizeX = sizeX
        this.moveX = moveX
        // if (this.float) { this.moveX = moveX }
      }
    } else if (widthLimit >= sizeX) {
      this.sizeX = sizeX
    }
  }
  handleSizeY (val: number, direction: 'T' | 'B') {
    const { topLimit, heightLimit } = this
    const sizeY = this.sizeY as number + (direction === 'T' ? -val : val)
    console.log(topLimit)
    console.log(heightLimit)
    if (direction === 'T') {
      const moveY = this.moveY as number + val
      if (moveY >= topLimit) {
        this.sizeY = sizeY
        this.moveY = moveY
        // if (this.float) { this.moveY = moveY }
      }
    } else if (heightLimit >= sizeY) {
      this.sizeY = sizeY
    }
  }
  handleMouseMove (e: MouseEvent) {
    if (this.enableMove) {
      this.handleMoveX(e.movementX)
      this.handleMoveY(e.movementY)
    } else {
      if (this.enableSizeL) {
        this.handleSizeX(e.movementX, 'L')
      } else if (this.enableSizeR) {
        this.handleSizeX(e.movementX, 'R')
      }
      if (this.enableSizeT) {
        this.handleSizeY(e.movementY, 'T')
      } else if (this.enableSizeB) {
        this.handleSizeY(e.movementY, 'B')
      }
    }
  }
  handleMouseUp () {
    this.enableMove = false
    this.enableSizeL = false
    this.enableSizeR = false
    this.enableSizeT = false
    this.enableSizeB = false
  }
  created () {
    this.init()
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }
  beforeDestroy () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}
</script>
