<style>
  .h-view {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    position: relative;
    /*min-height: 100%;*/
    /*min-width: 100%;*/
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import { genBgImg, genSize, genPosX, genPosY, genColor } from '../core/utils'

@Component
export default class HView extends Vue {
  @Prop({ type: Boolean, default: false })
  float: boolean

  @Prop({ type: [Number, String], default: 100 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: String, default: '#000000' })
  fontColor: string

  @Prop({ type: String, default: 'transparent' })
  bgColor: string

  @Prop({ type: String, default: '' })
  bgImg: ImageData

  @Prop({ type: String, default: '' })
  bgImg: ImageData

  existSlot = false

  get viewHeight () {
    const { existSlot } = this
    // return existSlot ?
  }

  get viewWidth () {

  }

  get styles (): any {
    const { bgImg, height, width, x, y, fontColor, bgColor } = this
    const styles = {}

    genColor(styles, 'color', fontColor)
    genColor(styles, 'background-color', bgColor)
    genBgImg(styles, bgImg)
    genSize(styles, 'height', height)
    genSize(styles, 'width', width)
    genPosX(styles, x)
    genPosY(styles, y)

    return styles
  }

  render () {
    const { styles, $slots } = this

    this.existSlot = $slots.default !== undefined

    return (
      <div class="h-view"
           style={styles}>
        {$slots.default}
      </div>
    )
  }
}
</script>
