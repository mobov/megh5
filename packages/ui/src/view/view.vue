<style lang="scss">
  .h-view {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-start;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    >.h-view-main {
      display: flex;
      align-items: flex-start;
      position: relative;
      flex-direction: column;
    }
    &.--direction-x  {
      flex-direction: row;
      flex-wrap: wrap;
      >.h-view-main {
        flex-direction: row;
        flex-wrap: nowrap;
      }
    }
    &.--direction-y  {
      flex-direction: column;
      >.h-view-main {
        flex-direction: column;
      }
    }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'
import { positionType } from '../core/constants'
import { genBgImg, genSize, genPosX, genPosY, genPosition, genBgSize } from '../core/utils'

@Component
export default class HView extends Vue {
  @Prop({ type: String, default: 'relative' })
  position!: positionType

  @Prop({ type: String, default: 'y' })
  direction!: 'x' | 'y'

  @Prop({ type: [Number, String], default: 100 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: String, default: '' })
  bgImg!: string

  @Prop({ type: String, default: 'spread' })
  bgSize!: string

  get float (): boolean {
    return this.position !== 'relative'
  }

  get classes () {
    const { direction } = this

    return {
      [`--direction-${direction}`]: true
    }
  }

  get styles (): any {
    const { float, bgImg, height, width, x, y, position, bgSize} = this
    const styles = {}

    genBgSize(styles, bgSize)
    genPosition(styles, position)
    genBgImg(styles, bgImg)
    genSize(styles, 'min-height', height)
    genSize(styles, 'width', width)
    genPosX(styles, x, float)
    genPosY(styles, y, float)

    return styles
  }

  render () {
    const { styles, $slots, classes } = this

    return (
      <div staticClass="h-view"
        class={classes}
        style={styles}>
        <div staticClass="h-view-main">
          {$slots.default}
        </div>
      </div>
    )
  }
}
</script>
