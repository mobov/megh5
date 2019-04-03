<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  $--element-active-color: #ffd0a3;
  $--element-handler-color: #03a9f4;
  .element {
    user-select: none;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    height: auto;
    width: auto;
    transform: translate3d(0,0,0);
    /*width: 100%;*/
    /*height: auto;*/
    /*overflow: hidden;*/
    /*a,*/
    /*.m-button {*/
      /*pointer-events: none;*/
    /*}*/
    > *:first-child {
      position: absolute;
      z-index: 1 !important;
      margin-left: 0 !important;
      margin-top: 0 !important;
      left: 0 !important;
      top: 0 !important;
      width: 100%;
      height: 100%;
    }
    &.--active {
      z-index: 99 !important;
      >.element-handler-t,
      >.element-handler-b,
      >.element-handler-l,
      >.element-handler-r {
        background-color: $--element-handler-color;
        position: absolute;
        z-index: 2;
      }
      >.element-handler-tl,
      >.element-handler-tr,
      >.element-handler-bl,
      >.element-handler-br {
        background-color: $--element-handler-color;
        position: absolute;
        z-index: 3;
      }

      >.element-handler-t,
      >.element-handler-b {
        height: 4px;
        width: 100%;
        left: 0;
        cursor: ns-resize;
      }

      >.element-handler-l,
      >.element-handler-r {
        width: 4px;
        height: 100%;
        top: 0;
        cursor: ew-resize;
      }

      >.element-handler-t {
        top: -2px;
      }

      >.element-handler-b {
        bottom: -2px;
      }

      >.element-handler-l {
        left: -2px;
      }

      >.element-handler-r {
        right: -2px;
      }

      >.element-handler-tl,
      >.element-handler-tr,
      >.element-handler-bl,
      >.element-handler-br {
        width: 10px;
        height: 10px;
        font-size: 1px;
        border-radius: 50%;
        border: 1px solid #fff;
        z-index: 3;
      }

      >.element-handler-tl {
        left: -5px;
        top: -5px;
        cursor: nw-resize;
      }

      >.element-handler-tr {
        right: -5px;
        top: -5px;
        cursor: ne-resize;
      }

      >.element-handler-bl {
        left: -5px;
        bottom: -5px;
        cursor: sw-resize;
      }

      >.element-handler-br {
        right: -5px;
        bottom: -5px;
        cursor: se-resize;
      }
    }
  }

  .element-axis {
    width: 1px;
    height: 100vh;
    position: absolute;
    background-color: $--element-handler-color;
  }

 /* .element-edit-box {
    box-sizing: border-box;
    position: absolute;
    z-index: 2;
    cursor: move;
    border: 3px solid  $--element-handler-color;
  }*/
</style>

<template>
  <div class="element" :style="styles" :class="{'--active': isActive}" @mousedown.stop="handleActive">
    <slot></slot>
    <div class="element-handler-t" style="cursor: pointer"></div>
    <div class="element-handler-b" style="cursor: pointer"></div>
    <div class="element-handler-l" style="cursor: pointer"></div>
    <div class="element-handler-r" style="cursor: pointer"></div>
    <div class="element-handler-t" v-if="enableSizeY"
         @mousedown.stop="isSizeT = true"></div>
    <div class="element-handler-b" v-if="enableSizeY"
         @mousedown.stop="isSizeB = true"></div>
    <div class="element-handler-l" v-if="enableSizeX"
         @mousedown.stop="isSizeL = true"></div>
    <div class="element-handler-r" v-if="enableSizeX"
         @mousedown.stop="isSizeR = true"></div>
    <div class="element-handler-tl"
         v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeT = true; isSizeL = true"></div>
    <div class="element-handler-tr"
         v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeT = true; isSizeR = true"></div>
    <div class="element-handler-bl"
         v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeB = true; isSizeL = true"></div>
    <div class="element-handler-br"
         v-if="enableSizeX && enableSizeY"
         @mousedown.stop="isSizeB = true; isSizeR = true"></div>
  </div>
</template>

<script lang="ts">
import { VNode, VueConstructor } from 'vue'
import { Vue, Component, Prop, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { MutationSetPageNode, MutationSetActiveUid } from '@/store'
import { NoCache } from '@/utils/decorators'
import { deepCopy } from '@mobov/es-helper'
import { getLayerIndex } from '@/utils/layer'
import { uiMode, UiNode, positionType, ProjectData } from '@megh5/ui/types/core/constants'
import MegH5, { Utils } from '@megh5/ui'
console.log(MegH5)
console.log(Utils)
const { genPosY, genSize, genPosX, genPosition } = Utils

@Component
export default class Element extends Vue {
  @Prop({ type: String, default: '0' })
  nodeUid!: string

  @Prop({ type: String, default: 'xy' })
  moveMode!: uiMode

  @Prop({ type: String, default: 'xy' })
  sizeMode!: uiMode

  @Prop({ type: Number, default: 15 })
  minHeight!: number

  @Prop({ type: Number, default: 15 })
  minWidth!: number

  @Prop({ type: String, default: 'relative' })
  position!: positionType

  @Prop({ type: [Number, String] })
  height!: number

  @Prop({ type: [Number, String] })
  width!: number

  @Prop({ type: [Number, String] })
  x!: number

  @Prop({ type: [Number, String] })
  y!: number

  @Prop({ type: Number })
  zIndex!: number

  @State activeUid!: string
  @Mutation SET_PAGE_NODE!: MutationSetPageNode
  @Mutation SET_ACTIVE_UID!: MutationSetActiveUid

  isMove = false
  isSizeL = false
  isSizeR = false
  isSizeT = false
  isSizeB = false

  moveX: number = this.x
  moveY: number = this.y
  sizeX: number = this.width
  sizeY: number = this.height

  get isActive (): boolean {
    return this.activeUid === this.nodeUid
  }

  get isMainChildren (): boolean {
    return this.parentNode.classList.contains('h-app-main')
  }
  get float (): boolean {
    return this.position !== 'relative'
  }

  get styles (): any {
    const { width, height, x, y, position, float, zIndex } = this
    const styles = {
      zIndex
    }

    genPosition(styles, position)
    genSize(styles, 'width', width)
    genSize(styles, 'height', height)
    genPosX(styles, x, float)
    genPosY(styles, y, float)

    return styles
  }

  get parentNode (): HTMLElement {
    return (this.$parent.$el || this.$parent) as HTMLElement
  }

  @NoCache
  get parentWidth () {
    return this.parentNode.clientWidth
  }

  @NoCache
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

  @NoCache
  get heightLimit (): number {
    return this.parentHeight - this.moveY
  }

  @NoCache
  get widthLimit (): number {
    return this.parentWidth - this.moveX
  }
  get topLimit (): number {
    return 0
  }
  get leftLimit (): number {
    return 0
  }

  @NoCache
  get rightLimit (): number {
    return this.parentWidth - this.sizeX
  }

  @NoCache
  get bottomLimit (): number {
    return this.parentHeight - this.sizeY
  }
  updateUi () {
    this.SET_PAGE_NODE({
      uid: this.nodeUid,
      nodeData: {
        props: {
          x: this.moveX,
          y: this.moveY,
          height: this.sizeY,
          width: this.sizeX
        },
        style: {}
      }
    })
  }
  handleActive () {
    this.isMove = true
    this.SET_ACTIVE_UID(this.nodeUid)
  }
  handleMoveX (val: number) {
    if (!this.enableMoveX) { return }
    const { leftLimit, rightLimit } = this
    let moveX = this.moveX + val
    if (this.float) {
      this.moveX = moveX
    } else {
      if (moveX >= leftLimit && moveX <= rightLimit) {
        this.moveX = moveX
      } else if (moveX < leftLimit) {
        this.moveX = leftLimit
      } else if (moveX > rightLimit) {
        this.moveX = rightLimit
      }
    }

    this.updateUi()
  }
  handleMoveY (val: number) {
    if (!this.enableMoveY) { return }
    const { isMainChildren, topLimit, bottomLimit } = this
    const moveY = this.moveY + val

    if (this.float) {
      this.moveY = moveY
    } else if (isMainChildren) {
      if (moveY < topLimit) {
        this.moveY = topLimit
      } else {
        this.moveY = moveY
      }
    } else {
      if (moveY >= topLimit && moveY <= bottomLimit) {
        this.moveY = moveY
      } else if (moveY < topLimit) {
        this.moveY = topLimit
      } else if (moveY > bottomLimit) {
        this.moveY = bottomLimit
      }
    }

    this.updateUi()
    // if (moveY >= topLimit && moveY <= bottomLimit) {
    //   this.moveY = moveY
    // } else if (moveY < topLimit) {
    //   this.moveY = topLimit
    // } else if (moveY > bottomLimit) {
    //   this.moveY = bottomLimit
    // }
  }
  handleSizeX (val: number, direction: 'L' | 'R') {
    const { leftLimit, widthLimit, minWidth } = this
    const sizeX = this.sizeX + (direction === 'L' ? -val : val)

    if (sizeX < minWidth) { return }

    if (direction === 'L') {
      const moveX = this.moveX + val
      if (moveX >= leftLimit) {
        this.sizeX = sizeX
        this.moveX = moveX
      }
    } else if (widthLimit >= sizeX) {
      this.sizeX = sizeX
    }
    this.updateUi()
  }
  handleSizeY (val: number, direction: 'T' | 'B') {
    const { topLimit, minHeight } = this
    const sizeY = this.sizeY + (direction === 'T' ? -val : val)

    if (sizeY < minHeight) { return }

    if (direction === 'T') {
      const moveY = this.moveY + val
      if (moveY >= topLimit) {
        this.sizeY = sizeY
        this.moveY = moveY
      }
    } else {
      this.sizeY = sizeY
    }
    this.updateUi()
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
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }
  beforeDestroy () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}
</script>
