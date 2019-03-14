<style lang='scss'>
  @import "~@megmore/scss-helper/import";
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
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import { State, Mutation, Getter } from 'vuex-class'
import Store, { StateProject, StateScreen, GetterPageData } from '@/store'
import { UiNode, UiModule } from '@megh5/ui/types/core/constants'
import Element from './element.vue'
import { deepCopy } from '@megmore/es-helper'
import { merge } from 'lodash'

function compiler (h: CreateElement, PNode: UiNode []): VNode[] {
  const result: VNode[] = []
  if (PNode !== undefined) {
    for (let node of PNode) {
      // props
      const nodeModule = deepCopy(Store.state.UiModules.find(item => item.name === node.name))

      node.nodeData = merge(nodeModule.nodeData, node.nodeData)

      if (nodeModule.uiConfig.disabled) {
        result.push(h(node.name, node.nodeData, node.children ? compiler(h, node.children) : []))
      } else {
        const elementData: VNodeData = {
          props: {
            nodeUid: node.uid,
            ...node.nodeData.props,
            ...nodeModule.uiConfig
          }
        }
        // slot
        if (node.nodeData.slot) {
          elementData.slot = node.nodeData.slot
          delete node.nodeData.slot
        }

        result.push(h(
          'Element',
          elementData,
          [h(node.name, node.nodeData, node.children ? compiler(h, node.children) : [])]
        ))
      }
    }
  }

  return result
}

@Component({
  components: { Element }
})
export default class Previewer extends Vue {
  @Getter PageData!: GetterPageData

  @State Screen!: StateScreen

  get screenStyles () {
    return {
      width: `${this.Screen.width}px`,
      height: `${this.Screen.height}px`
    }
  }

  RContent (h: CreateElement): VNode[] {
    return compiler(h, deepCopy(this.PageData))
  }
  //
  // mounted () {
  //   this.Screen.scrollHeight = (this.$refs.$screen as HTMLElement).scrollHeight
  // }

  render (h: CreateElement) {
    const { RContent, screenStyles } = this

    return (
      <div class="previewer">
        <div class="previewer-mobile">
          <figure class="previewer-screen" style={screenStyles}>
            <div ref="$screen" class="previewer-screen-main">
              {RContent(h)}
            </div>
          </figure>
        </div>
      </div>
    )
  }
}
</script>
