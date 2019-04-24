<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  $--previewer-cursor-select: url('../../assets/select.png'), auto;
  $--previewer-cursor-draw: url('../../assets/draw.png'), auto;
  .previewer {
    padding: 2rem;
    .previewer-screen {
      height: 736px;
      width: 320px;
      border-radius: 12px;
      box-shadow: 0 0 0 14px #090a0d, 0 0 0 17px #9fa3a8, 0 0 34px 17px rgba(0,0,0,0.2);
      margin: 0;
      overflow: hidden;
      position: relative;
      z-index: 1;
      cursor: $--previewer-cursor-select;
      &.--on-select {
        cursor: $--previewer-cursor-select;
      }
      &.--on-draw {
        cursor: $--previewer-cursor-draw;
      }
    }
    .previewer-screen-main {
      font-size: 10px;
      height: inherit;
      width: inherit;
      max-width: inherit;
      min-width: inherit;
      @include scroller();
      @include no-scroll-bar();
    }

    a, iframe {
      pointer-events: none;
    }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import { State, Mutation, Getter } from 'vuex-class'
import { UiNodes, SET_ACTIVE_UID, StatePreviewer, INIT_PREVIEWER, Device } from '@/store'
import { ProjectData } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@mobov/es-helper'
import { compiler } from '@/utils'
import CompSuit from './comp-suit.vue'
import { ActiveTools } from '@/constants'

Vue.component('CompSuit', CompSuit)

@Component
export default class Previewer extends Vue {
  @Getter UiNodes!: UiNodes

  @Getter Device!: Device

  @State Project!: ProjectData

  @State Previewer!: StatePreviewer

  @State activeTool!: ActiveTools

  @Mutation SET_ACTIVE_UID !: SET_ACTIVE_UID

  @Mutation INIT_PREVIEWER !: INIT_PREVIEWER

  get screenStyles () {
    return {
      width: `${this.Device.width}px`,
      height: `${this.Device.height}px`
    }
  }

  get screenClasses () {
    return {
      [`--on-${this.activeTool}`]: true
    }
  }

  handleClick (e: MouseEvent) {
    e.stopPropagation()
  }

  render (h: CreateElement) {
    const { screenStyles, screenClasses, SET_ACTIVE_UID, Project, handleClick } = this

    return (
      <div class="previewer" onClick={() => { SET_ACTIVE_UID(Project.mainUid) }}>
        <div class="previewer-mobile">
          <figure staticClass="previewer-screen" style={screenStyles} class={screenClasses}>
            <div ref="$screen" class="previewer-screen-main" onClick={handleClick}>
              {compiler(h, deepCopy(this.UiNodes))}
            </div>
          </figure>
        </div>
      </div>
    )
  }

  mounted () {
    this.INIT_PREVIEWER(this.$el as HTMLElement)
  }
}
</script>
