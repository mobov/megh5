<style lang='scss'>
  @import "~@megmore/scss-helper/import";

  $--element-handler-color: #03a9f4;
  .element {
    user-select: none;
    z-index: 1;
    box-sizing: border-box;
    cursor: move;
    position: relative;
    a,
    .m-button {
      pointer-events: none;
    }
  }

  .element-axis {
    width: 1px;
    height: 100vh;
    position: absolute;
    background-color: $--element-handler-color;
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
  <div class="element" :style="styles"
       @mousedown.stop="isMove = true"
       @mouseover="isActive = true"
       @mouseout="isActive = false">
    <slot></slot>
    <!--<div class="element-axis"></div>-->
    <div class="element-handler-t" v-if="enableSizeY"
         @mousedown.stop="isSizeT = true"></div>
    <div class="element-handler-b" v-if="enableSizeY"
         @mousedown.stop="isSizeB = true"></div>
    <div class="element-handler-l" v-if="enableSizeX"
         @mousedown.stop="isSizeL = true"></div>
    <div class="element-handler-r" v-if="enableSizeX"
         @mousedown.stop="isSizeR = true"></div>
    <div class="element-handler-tl" v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeT = true; isSizeL = true"></div>
    <div class="element-handler-tr" v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeT = true; isSizeR = true"></div>
    <div class="element-handler-bl" v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeB = true; isSizeL = true"></div>
    <div class="element-handler-br" v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeB = true; isSizeR = true"></div>
  </div>
</template>

<script lang="ts">
import { VNode, VueConstructor } from 'vue'
import { Vue, Component, Prop, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { StateScreen } from '@/store'
import { deepCopy } from '@megmore/es-helper'
import { getLayerIndex } from '@/utils/layer'
import { uiMode } from '@megh5/ui/types/core/constants'
import MegH5 from '@megh5/ui'

const { genPosY, genSize, genPosX } = MegH5.Utils

@Component
export default class Element extends Vue {
  @Prop({ type: String, default: 'xy' })
  moveMode!: uiMode

  @Prop({ type: String, default: 'xy' })
  sizeMode!: uiMode

  @State Screen!: StateScreen

  isActive = false
  isMove = false
  isSizeL = false
  isSizeR = false
  isSizeT = false
  isSizeB = false
  zIndex = getLayerIndex()
  moveX: number = 0
  moveY: number = 0
  sizeX: number = 0
  sizeY: number = 0

  // get scrollHeight (): number {
  //   return (document.querySelector('.previewer-screen-main') as HTMLElement).scrollHeight
  // }

  get left (): string | number {
    const { enableMoveX, compProps, moveX } = this

    return enableMoveX ? moveX : compProps.x
  }
  get top (): string | number {
    const { enableMoveY, compProps, moveY } = this

    return enableMoveY ? moveY : compProps.y
  }
  get width (): string | number {
    const { enableSizeX, compProps, sizeX } = this

    return enableSizeX ? sizeX : compProps.width
  }
  get height (): string | number {
    const { enableSizeY, compProps, sizeY } = this

    return enableSizeY ? sizeY : compProps.height
  }
  get styles (): any {
    const { width, height, left, top } = this
    const styles = deepCopy(this.compStyles)

    if (this.moveMode === 'none') {
      styles.cursor = 'pointer'
    }

    genSize(styles, 'width', width)
    genSize(styles, 'height', height)
    genPosX(styles, left)
    genPosY(styles, top)

    return styles
  }
  get $comp (): VNode {
    const { $slots } = this as any
    return $slots!.default[0]
  }
  get compStyles (): any {
    return this.$comp.data!.style || {}
  }
  get compProps (): any {
    return this.$comp.data!.props || {}
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
  get enableSizeX () {
    return this.sizeMode.indexOf('x') !== -1
  }
  get enableSizeY () {
    return this.sizeMode.indexOf('y') !== -1
  }
  get enableMoveX () {
    return this.moveMode.indexOf('x') !== -1
  }
  get enableMoveY () {
    return this.moveMode.indexOf('y') !== -1
  }
  get heightLimit (): number {
    return this.scrollHeight - this.moveY
  }
  get widthLimit (): number {
    return this.Screen.width - this.moveX
  }
  get topLimit (): number {
    return 0
  }
  // get bottomLimit (): number {
  //   return this.scrollHeight - this.sizeY
  // }
  get leftLimit (): number {
    return 0
  }
  get rightLimit (): number {
    return this.Screen.width - this.sizeX
  }

  init () {
    this.moveX = this.compProps.x
    this.moveY = this.compProps.y
    this.sizeX = this.compProps.width
    this.sizeY = this.compProps.height

    if (!this.$comp.data.style) {
      this.$comp.data.style = {}
    }
    Object.assign(this.$comp.data.style, {
      height: '100%',
      width: '100%',
      marginLeft: 0,
      marginTop: 0
    })
  }
  handleMoveX (val: number) {
    if (!this.enableMoveX) { return }
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
    if (!this.enableMoveY) { return }
    const { topLimit, bottomLimit } = this
    const moveY = this.moveY as number + val

    if (moveY < topLimit) {
      this.moveY = topLimit
    } else {
      this.moveY = moveY
    }

    // if (moveY >= topLimit && moveY <= bottomLimit) {
    //   this.moveY = moveY
    // } else if (moveY < topLimit) {
    //   this.moveY = topLimit
    // } else if (moveY > bottomLimit) {
    //   this.moveY = bottomLimit
    // }
  }
  handleSizeX (val: number, direction: 'L' | 'R') {
    const { leftLimit, widthLimit } = this
    const sizeX = this.sizeX as number + (direction === 'L' ? -val : val)
    if (direction === 'L') {
      const moveX = this.moveX as number + val
      if (moveX >= leftLimit) {
        this.sizeX = sizeX
        this.moveX = moveX
      }
    } else if (widthLimit >= sizeX) {
      this.sizeX = sizeX
    }
  }
  handleSizeY (val: number, direction: 'T' | 'B') {
    const { topLimit, heightLimit } = this
    const sizeY = this.sizeY as number + (direction === 'T' ? -val : val)

    if (direction === 'T') {
      const moveY = this.moveY as number + val
      if (moveY >= topLimit) {
        this.sizeY = sizeY
        this.moveY = moveY
      }
    } else {
      this.sizeY = sizeY
    }
  }
  handleMouseMove (e: MouseEvent) {
    if (this.isMove) {
      this.handleMoveX(e.movementX)
      this.handleMoveY(e.movementY)
    } else {
      if (this.isSizeL) {
        this.handleSizeX(e.movementX, 'L')
      } else if (this.isSizeR) {
        this.handleSizeX(e.movementX, 'R')
      }
      if (this.isSizeT) {
        this.handleSizeY(e.movementY, 'T')
      } else if (this.isSizeB) {
        this.handleSizeY(e.movementY, 'B')
      }
    }
  }
  handleMouseUp () {
    this.isMove = false
    this.isSizeL = false
    this.isSizeR = false
    this.isSizeT = false
    this.isSizeB = false
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
