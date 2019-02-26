<style lang='scss'>
  @import "~@megmore/scss-helper/import";

  $--element-handler-color: #03a9f4;
  .element {
    position: absolute;
    cursor: move;
    user-select: none;
    z-index: 1;
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
    <div class="element-handler-t" @mousedown.stop="enableSizeT = true"></div>
    <div class="element-handler-b" @mousedown.stop="enableSizeB = true"></div>
    <div class="element-handler-l" @mousedown.stop="enableSizeL = true"></div>
    <div class="element-handler-r" @mousedown.stop="enableSizeR = true"></div>
    <div class="element-handler-tl" @mousedown.stop="enableSizeT = true; enableSizeL = true"></div>
    <div class="element-handler-tr" @mousedown.stop="enableSizeT = true; enableSizeR = true"></div>
    <div class="element-handler-bl" @mousedown.stop="enableSizeB = true; enableSizeL = true"></div>
    <div class="element-handler-br" @mousedown.stop="enableSizeB = true; enableSizeR = true"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

function getStyleVal (styleStr: string | number): number {
  let result = 0
  console.log(styleStr)
  if (typeof styleStr === 'number') {
    result = styleStr
  } else {
    if (styleStr.indexOf('px')) {
      result = Number(styleStr.substring(0, styleStr.length - 2))
    } else {
      result = 0
    }
  }
  return result
}

export default Vue.extend({
  name: 'Element',
  inject: ['Previewer'],
  data () {
    return {
      enableMove: false,
      enableSizeL: false,
      enableSizeR: false,
      enableSizeT: false,
      enableSizeB: false,
      moveX: 0,
      moveY: 0,
      sizeX: 0,
      sizeY: 0
    }
  },
  computed: {
    styles (): any {
      return {
        left: `${this.moveX}px`,
        top: `${this.moveY}px`,
        width: `${this.sizeX}px`,
        height: `${this.sizeY}px`
      }
    },
    compStyle (): any {
      const { $slots } = this as any
      return $slots!.default[0]!.data!.style || {}
    },
    heightLimit () {
      return this.Previewer.height - this.moveY
    },
    widthLimit () {
      return this.Previewer.width - this.moveX
    },
    topLimit () {
      return 0
    },
    bottomLimit () {
      return this.Previewer.height - this.sizeY
    },
    leftLimit () {
      return 0
    },
    leftSizeLimit () {
      return this.Previewer.width - this.moveX - this.sizeX
    },
    rightLimit () {
      return this.Previewer.width - this.sizeX
    }
  },
  methods: {
    init () {
      this.moveX = getStyleVal(this.compStyle.left)
      this.moveY = getStyleVal(this.compStyle.top)
      this.sizeX = getStyleVal(this.compStyle.width)
      this.sizeY = getStyleVal(this.compStyle.height)
      this.compStyle.left = 0
      this.compStyle.right = 0
      this.compStyle.width = '100%'
      this.compStyle.height = '100%'
    },
    handleMoveX (val: number) {
      const { leftLimit, rightLimit } = this
      const moveX = this.moveX + val

      if (moveX >= leftLimit && moveX <= rightLimit) {
        this.moveX = moveX
      } else if (moveX < leftLimit) {
        this.moveX = leftLimit
      } else if (moveX > rightLimit) {
        this.moveX = rightLimit
      }
    },
    handleMoveY (val: number) {
      const { topLimit, bottomLimit } = this
      const moveY = this.moveY + val

      if (moveY >= topLimit && moveY <= bottomLimit) {
        this.moveY = moveY
      } else if (moveY < topLimit) {
        this.moveY = topLimit
      } else if (moveY > bottomLimit) {
        this.moveY = bottomLimit
      }
    },
    handleSizeX (val: number, direction: 'L' | 'R') {
      const { leftLimit, widthLimit } = this
      const sizeX = direction === 'L' ? this.sizeX - val : this.sizeX + val

      if (direction === 'L') {
        const moveX = this.moveX + val
        if (moveX >= leftLimit) {
          this.sizeX = sizeX
          this.moveX = moveX
        }
      } else if (widthLimit >= sizeX) {
        this.sizeX = sizeX
      }
    },
    handleSizeY (val: number, direction: 'T' | 'B') {
      const { topLimit, heightLimit } = this
      const sizeY = direction === 'T' ? this.sizeY - val : this.sizeY + val

      if (direction === 'T') {
        const moveY = this.moveY + val
        if (moveY >= topLimit) {
          this.sizeY = sizeY
          this.moveY = moveY
        }
      } else if (heightLimit >= sizeY) {
        this.sizeY = sizeY
      }
    },
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
    },
    handleMouseUp () {
      this.enableMove = false
      this.enableSizeL = false
      this.enableSizeR = false
      this.enableSizeT = false
      this.enableSizeB = false
    }
  },
  created  () {
    this.init()
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
})
</script>
