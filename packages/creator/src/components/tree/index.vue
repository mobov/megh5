<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .tree {
    width: 100%;
    height: 100%;
    @include scroller();
    @include no-scroll-bar();
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
// @ts-ignore
import ProjectTreeItem from './tree-item.vue'
import { State, Mutation, Getter } from 'vuex-class'
import { PageData, StatePreviewer } from '@/store'
import { UiNode } from '@megh5/ui/types/core/constants'

@Component({
  components: { ProjectTreeItem }
})
export default class Tree extends Vue {
  @Getter PageData!: PageData

  @State Previewer!: StatePreviewer

  RItem (nodes: UiNode[]) {
    const result: VNode[] = []

    for (let node of nodes) {
      result.push(
        <ProjectTreeItem value={node} />
      )
      if (node.children) {
        result.push(
          ...this.RItem(node.children)
        )
      }
    }

    return result
  }

  render () {
    const { PageData } = this

    return (
      <div class="tree">
        <div class="tree-scroller">
          {this.Previewer.ready ?
            this.RItem(PageData) :
            undefined
          }
        </div>
      </div>
    )
  }
}
</script>
