<style lang="scss">
  .h-view {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: stretch;
    position: relative;
    flex-direction: column;
    &.--direction-x  {
      flex-direction: row;
    }
    &.--direction-y  {
      flex-direction: column;
    }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import { genBgImg, genSize, genPosX, genPosY, genColor } from '../core/utils'

@Component
export default class HView extends Vue {
  @Prop({ type: Boolean, default: false })
  float: boolean

  @Prop({ type: String, default: 'y' })
  direction: 'x' | 'y'

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

  get classes () {
    const { direction } = this

    return {
      [`--direction-${direction}`]: true
    }
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
    const { styles, $slots, classes } = this

    return (
      <div staticClass="h-view"
        class={classes}
        style={styles}>
        {$slots.default}
      </div>
    )
  }
}
</script>
