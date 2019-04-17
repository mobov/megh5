<style lang='scss'>
  @import "~@mobov/scss-helper/import";
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
import { GetterPageData, MutationSetActiveUid } from '@/store'
import { ProjectData } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@mobov/es-helper'
import { compiler } from '@/utils'

@Component
export default class Previewer extends Vue {
  @Getter PageData!: GetterPageData

  @State Project!: ProjectData

  @Mutation SET_ACTIVE_UID !: MutationSetActiveUid

  get screenStyles () {
    return {
      width: `${this.Project.Device.width}px`,
      height: `${this.Project.Device.height}px`
    }
  }

  handleClick (e: MouseEvent) {
    e.stopPropagation()
  }

  render (h: CreateElement) {
    const { screenStyles, SET_ACTIVE_UID, Project, handleClick } = this

    return (
      <div class="previewer" onClick={() => { SET_ACTIVE_UID(Project.mainUid) }}>
        <div class="previewer-mobile">
          <figure class="previewer-screen" style={screenStyles}>
            <div ref="$screen" class="previewer-screen-main" onClick={handleClick}>
              {compiler(h, deepCopy(this.PageData))}
            </div>
          </figure>
        </div>
      </div>
    )
  }
}
</script>
