<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .project-tree-item {
    cursor: pointer;
    width: 100%;
    display: flex;
    .project-tree-item-header {
      width: inherit;
      cursor: pointer;
    }
    .project-tree-item-main {
      width: inherit;
    }
    .comp-list__sort-handler {
      cursor: move;
    }
  }
  .project-tree-item-thumb {
    /*max-width: 80px;*/
    /*max-height: 80px;*/
    /*transform: scale(.8);*/

    img {
      width: 100%;
    }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { State, Mutation, Getter } from 'vuex-class'
import { GetterGetModule, MutationSetPageNode } from '@/store'
import { UiModule, UiNode } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@mobov/es-helper'
import { compiler } from '@/utils'
import domtoimage from 'dom-to-image'

const thumbRatio: number = 5

const ClearAttrMaps: string[] = [
  'x', 'y',
  'left', 'right', 'bottom', 'right', 'margin-left', 'margin-right', 'margin-bottom', 'margin-right'
]

@Component
export default class CompList extends Vue {
  @Prop({ type: Object, default: () => {} })
  value!: UiNode

  @Mutation SET_PAGE_NODE!: MutationSetPageNode

  @Getter GetModule!: GetterGetModule

  get uiModule () {
    return this.GetModule(this.value.name)
  }

  snapshot: string = ''

  async handleShot () {
    this.snapshot = await domtoimage.toPng(document.querySelector('.previewer'))
  }

  RThumb (h) {
    const { snapshot } = this

    return (
      <img src={snapshot} />
    )
  }
    /* return (
       h(this.value.name, nodeData)
    )*/

  render (h) {
    const { uiModule, RThumb } = this
    this.handleShot ()
    /* <MFlexFiller />
		<MIcon class="comp-list__sort-handler" name="menu" />
		 */

    return (
      <MFlex class="project-tree-item" direction="column" justify="center" align="center">
        <div class="project-tree-item-thumb">
          {RThumb(h)}
        </div>
        <MFlex class="project-tree-item-header m-hr-b m-p-md" align="center">
          {uiModule.title}
        </MFlex>
      </MFlex>
    )
  }

}
</script>
