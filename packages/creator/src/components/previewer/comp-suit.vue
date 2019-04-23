<script lang="tsx">
import { VNode, VueConstructor, CreateElement } from 'vue'
import { Vue, Component, Prop, Emit, Inject, Mixins, Watch } from 'vue-property-decorator'
import { State, Mutation, Getter } from 'vuex-class'
import { SET_PAGE_NODE, SET_ACTIVE_UID } from '@/store'
import { NoCache } from '@/utils/decorators'
import { compiler } from '@/utils'
import { uiMode, UiNode, UiNodeProps, positionType, ProjectData } from '@megh5/ui/types/core/constants'

const SuitsHandlerDirections: string[] = [
  '↖', '↑', '↗',
  '←', '→',
  '↙', '↓', '↘'
]

@Component
export default class CompSuit extends Vue {
  @Prop()
  node!: UiNode

  @Prop({ type: String, default: 'xy' })
  moveMode!: uiMode

  @Prop({ type: String, default: 'xy' })
  sizeMode!: uiMode

  @Prop({ type: Number, default: 15 })
  minHeight!: number

  @Prop({ type: Number, default: 15 })
  minWidth!: number

  @State activeUid!: string

  @Getter ActiveNode!: UiNode
  @Mutation SET_PAGE_NODE!: SET_PAGE_NODE
  @Mutation SET_ACTIVE_UID!: SET_ACTIVE_UID

  isMove = false
  isSizeL = false
  isSizeR = false
  isSizeT = false
  isSizeB = false

  moveX: number = this.nodeProps!.x as number
  moveY: number = this.nodeProps!.y as number
  sizeX: number = this.nodeProps!.width as number
  sizeY: number = this.nodeProps!.height as number

  get nodeUid (): string {
    return this.node.uid
  }

  get nodeProps () {
    return this!.node!.nodeData!.props
  }

  get isActive (): boolean {
    return this.activeUid === this.nodeUid
  }

  get isLocked (): boolean {
    return this.ActiveNode.uiConfig.locked
  }

  get isMainChildren (): boolean {
    return this.parentNode.classList.contains('h-app-main')
  }

  get isHanding (): boolean {
    return this.isMove ||
    this.isSizeL ||
    this.isSizeR ||
    this.isSizeT ||
    this.isSizeB
  }

  get classes (): any {
    return {
      'comp-suit': true,
      '--active': this.isActive,
      '--isHanding': this.isHanding,
      '--isLocked': this.isLocked,
      [`--size-${this.sizeMode}`]: true
    }
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

  @Watch('nodeProps.height')
  updateSizeY(value: number) {
    this.sizeY = value
  }

  @Watch('nodeProps.width')
  updateSizeX(value: number) {
    this.sizeX = value
  }

  @Watch('nodeProps.x')
  updateMoveX(value: number) {
    this.moveX = value
  }

  @Watch('nodeProps.y')
  updateMoveY(value: number) {
    this.moveY = value
  }

  updateUi () {
    if (this.isLocked) { return }
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

  handleHandler (direction: string) {
    if (this.isLocked) { return }
    if (direction.indexOf('←') !== -1) {
      this.isSizeL = true
    }
    if (direction.indexOf('→') !== -1) {
      this.isSizeR = true
    }
    if (direction.indexOf('↑') !== -1) {
      this.isSizeT = true
    }
    if (direction.indexOf('↓') !== -1) {
      this.isSizeB = true
    }
  }

  handleActive () {
    this.SET_ACTIVE_UID(this.nodeUid)
    if (this.isLocked) { return }
    this.isMove = true
  }
  handleMoveX (val: number) {
    if (this.isLocked) { return }
    if (!this.enableMoveX) { return }
    const { leftLimit, rightLimit } = this
    let moveX = this.moveX + val
    if (moveX >= leftLimit && moveX <= rightLimit) {
      this.moveX = moveX
    } else if (moveX < leftLimit) {
      this.moveX = leftLimit
    } else if (moveX > rightLimit) {
      this.moveX = rightLimit
    }

    this.updateUi()
  }
  handleMoveY (val: number) {
    if (this.isLocked) { return }
    if (!this.enableMoveY) { return }
    const { isMainChildren, topLimit, bottomLimit } = this
    const moveY = this.moveY + val

    if (isMainChildren) {
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
  handleSizeX (val: number, direction: '←' | '→') {
    if (this.isLocked) { return }
    const { leftLimit, widthLimit, minWidth } = this
    const sizeX = this.sizeX + (direction === '←' ? -val : val)

    if (sizeX < minWidth) { return }

    if (direction === '←') {
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
  handleSizeY (val: number, direction: '↑' | '↓') {
    if (this.isLocked) { return }
    const { topLimit, minHeight } = this
    const sizeY = this.sizeY + (direction === '↑' ? -val : val)

    if (sizeY < minHeight) { return }

    if (direction === '↑') {
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
  handleMouseDown (e: MouseEvent): void {
    e.stopPropagation()
    // @ts-ignore
    const className = e.target.className

    switch (true) {
      case className.indexOf('↖') !== -1: this.isSizeT = true; this.isSizeL = true; break
      case className.indexOf('↑') !== -1: this.isSizeT = true; break
      case className.indexOf('↗') !== -1: this.isSizeT = true; this.isSizeR = true; break
      case className.indexOf('→') !== -1: this.isSizeR = true; break
      case className.indexOf('↘') !== -1: this.isSizeR = true; this.isSizeB = true; break
      case className.indexOf('↓') !== -1: this.isSizeB = true; break
      case className.indexOf('↙') !== -1: this.isSizeB = true; this.isSizeL = true; break
      case className.indexOf('←') !== -1: this.isSizeL = true; break
    }

    if (
      !this.isSizeT &&
      !this.isSizeL &&
      !this.isSizeR &&
      !this.isSizeB
    ) {
      this.handleActive()
    }
  }
  handleMouseMove (e: MouseEvent): void {
    if (this.isLocked) { return }
    if (this.isMove) {
      this.handleMoveX(e.movementX)
      this.handleMoveY(e.movementY)
    } else {
      if (this.isSizeL) {
        this.handleSizeX(e.movementX, '←')
      } else if (this.isSizeR) {
        this.handleSizeX(e.movementX, '→')
      }
      if (this.isSizeT) {
        this.handleSizeY(e.movementY, '↑')
      } else if (this.isSizeB) {
        this.handleSizeY(e.movementY, '↓')
      }
    }
  }
  handleMouseUp (e: MouseEvent): void {
    if (this.isLocked) { return }
    this.isMove = false
    this.isSizeL = false
    this.isSizeR = false
    this.isSizeT = false
    this.isSizeB = false
  }

  mountSuits () {
    SuitsHandlerDirections.forEach(direction => {
      const $dom = document.createElement('div')
      $dom.classList.add('comp-suit-handler')
      $dom.classList.add(`--${direction}`)
      this.$el.appendChild($dom)
    })
  }

  addSuitListeners () {
    document.addEventListener('mousemove', this.handleMouseMove as EventListener)
    document.addEventListener('mouseup', this.handleMouseUp as EventListener)
    this.$el.addEventListener('mousedown', this.handleMouseDown as EventListener)
  }

  removeSuitListeners () {
    document.removeEventListener('mousemove', this.handleMouseMove as EventListener)
    document.removeEventListener('mouseup', this.handleMouseUp as EventListener)
    this.$el.removeEventListener('mousedown', this.handleMouseDown as EventListener)
  }

  render (h: CreateElement) {
    this.node.nodeData.class = this.node.nodeData.class ? {
      [`uid-${this.node.uid}`]: true,
      ...this.node.nodeData.class,
      ...this.classes
    } : {
      [`uid-${this.node.uid}`]: true,
      ...this.classes
    }

    // this.node.nodeData.attrs = this.node.nodeData.attrs ? this.node.nodeData.attrs : {
    //   [`data-uid-${this.node.uid}`]: true
    // }


    return h(
      this.node.name,
      this.node.nodeData,
      this.node.children ? compiler(h, this.node.children) : []
    )
  }

  mounted () {
    this.mountSuits()
    this.addSuitListeners()
  }

  beforeDestroy () {
    this.removeSuitListeners()
  }
}
</script>
<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  // $--element-active-color: #ffd0a3;
  $--comp-suit-handler-color-normal: #03a9f4;
  $--comp-suit-handler-color-locked: #ff5252;
  $--comp-suit-handler-pos-fix: 0;
  $--comp-suit-handler-size: 3px;
  $--comp-suit-handler-corner-size: 10px;
  // $--comp-suit-select-border-size: 2px;

  .comp-suit {
    --comp-suit-handler-color: #{$--comp-suit-handler-color-normal};
    --comp-suit-handler-scale: .5;
    user-select: none;
    box-sizing: border-box;
    /*position: relative;*/
    transform: translate3d(0, 0, 0);
    &.--active {
      z-index: 99;
      >.comp-suit-handler {
        background-color: var(--comp-suit-handler-color);
        /*transition: transform ease .3s;*/
        position: absolute;
      }
      >.--↑,
      >.--→,
      >.--↓,
      >.--← {
        z-index: 100;
      }
      >.--↖,
      >.--↗,
      >.--↘,
      >.--↙ {
        z-index: 101;
        width: $--comp-suit-handler-corner-size;
        height: $--comp-suit-handler-corner-size;
        background-color: transparent;
        /*font-size: 1px;*/
        /*border-radius: 20%;*/
        border: $--comp-suit-handler-size solid var(--comp-suit-handler-color);
        /*transform: scale(var(--comp-suit-handler-scale));*/
      }

      >.--↑,
      >.--↓ {
        height: $--comp-suit-handler-size;
        width: 100%;
        left: 0;
        cursor: ns-resize;
        /*transform: scaleY(var(--comp-suit-handler-scale));*/
      }

      >.--→,
      >.--← {
        width: $--comp-suit-handler-size;
        height: 100%;
        top: 0;
        cursor: ew-resize;
        /*transform: scaleX(var(--comp-suit-handler-scale));*/
      }

      >.--↑ {
        top: 0;
        /*transform-origin: top;*/
      }

      >.--↓ {
        bottom: 0;
        /*transform-origin: bottom;*/
      }

      >.--← {
        left: 0;
        /*transform-origin: left;*/
      }

      >.--→ {
        right: 0;
        /*transform-origin: right;*/
      }

      >.--↖ {
        left: $--comp-suit-handler-pos-fix;
        top: $--comp-suit-handler-pos-fix;
        cursor: nw-resize;
        /*transform-origin: top left;*/
      }

      >.--↗ {
        right: $--comp-suit-handler-pos-fix;
        top: $--comp-suit-handler-pos-fix;
        cursor: ne-resize;
        /*transform-origin: top right;*/
      }

      >.--↙ {
        left: $--comp-suit-handler-pos-fix;
        bottom: $--comp-suit-handler-pos-fix;
        cursor: sw-resize;
        /*transform-origin: bottom left;*/
      }

      >.--↘ {
        right: $--comp-suit-handler-pos-fix;
        bottom: $--comp-suit-handler-pos-fix;
        cursor: se-resize;
        /*transform-origin: bottom right;*/
      }
    }
    &.--isLocked {
      --comp-suit-handler-color: #{$--comp-suit-handler-color-locked};
    }
    &.--isHanding {
      --comp-suit-handler-scale: 1
    }
    &.--size-none,
    &.--size-x,
    &.--size-y {
      >.--↖,
      >.--↗,
      >.--↘,
      >.--↙ {
        display: none;
      }
    }
    &.--size-none {
      >.--↑,
      >.--→,
      >.--↓,
      >.--←  {
        cursor: unset;
      }
    }
    &.--size-x {
      >.--→,
      >.--←  {
        cursor: unset;
      }
    }
    &.--size-y {
      >.--↑,
      >.--↓  {
        cursor: unset;
      }
    }
  }

  .previewer {
    &:hover {
      .comp-suit {
        --comp-suit-handler-scale: 1
      }
    }
  }

  .comp-suit-axis {
    width: 1px;
    height: 100vh;
    position: absolute;
    background-color: var(--comp-suit-handler-color);
  }

  /* .comp-suit-edit-box {
		 box-sizing: border-box;
		 position: absolute;
		 z-index: 2;
		 cursor: move;
		 border: 3px solid  var(--comp-suit-handler-color);
	 }*/
</style>
