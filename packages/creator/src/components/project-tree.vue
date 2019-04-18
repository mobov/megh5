<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .comp-tree {
    width: 100%;
    height: 100%;
    @include scroller();
    @include slim-scroll-bar();
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import { State, Mutation, Getter } from 'vuex-class'
import { GetterPageData } from '@/store'
import { UiNode } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@mobov/es-helper'
import { merge } from 'lodash'
import ProjectTreeItem from './project-tree-item'

@Component({
  components: { ProjectTreeItem }
})
export default class ProjectTree extends Vue {
  @Getter PageData!: GetterPageData

  RContent (nodes: UiNode[]) {
    const { RContent } = this
    const result: VNode[] = []

    for (let node of nodes) {
      result.push(
        <ProjectTreeItem value={node} />
      )
      if (node.children) {
        result.push(
          ...RContent(node.children)
        )
      }
    }

    return result
  }

  render () {
    const { RContent, PageData } = this

    return (
      <div class="comp-tree">
        <div class="comp-tree-scroller">
          {RContent(PageData)}
        </div>
      </div>
    )
  }
}
</script>
