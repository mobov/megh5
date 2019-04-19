<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  $--tree-item-border-color-normal: #03a9f4;
  $--tree-item-border-color-locked: #ff5252;
  .tree-item {
    --tree-item-border-color: transparent;
    cursor: pointer;
    width: 100%;
    display: flex;
    border: 1px solid var(--tree-item-border-color);
    .tree-item-header {
      width: inherit;
      cursor: pointer;
    }
    .tree-item-main {
      width: inherit;
    }
    .comp-list__sort-handler {
      cursor: move;
    }
    &.--active {
      --tree-item-border-color: #{$--tree-item-border-color-normal};
      &.--locked {
        --tree-item-border-color: #{$--tree-item-border-color-locked};
      }
    }
  }
  .tree-item-thumb {
    max-width: 100%;
    height: 60px;
    /*transform: scale(.8);*/

    img {
      max-width: 100%;
      max-height: 80px;
    }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { MFlex } from '@mobov/vui'
import { State, Mutation, Getter } from 'vuex-class'
import { GetModule, SET_PAGE_NODE, Previewer, SET_ACTIVE_UID } from '@/store'
import { UiModule, UiNode } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@mobov/es-helper'
import { compiler } from '@/utils'
import domtoimage from 'dom-to-image'

const thumbRatio: number = 5

const ClearAttrMaps: string[] = [
  'x', 'y',
  'left', 'right', 'bottom', 'right', 'margin-left', 'margin-right', 'margin-bottom', 'margin-right'
]

function shotFilter (node: HTMLElement) {
  let result = true
  if (node.tagName === 'link') {
    result = false
  }
  if (node.classList && node.classList.contains('comp-suit-handler')) {
    result = false
  }

  return result
}

@Component({
  components: { MFlex }
})
export default class ProjectTreeItem extends Vue {
  @State Previewer!: Previewer

  @State activeUid!: string

  @Prop({ type: Object, default: () => {} })
  value!: UiNode

  @Mutation SET_PAGE_NODE!: SET_PAGE_NODE

  @Getter GetModule!: GetModule

  @Mutation SET_ACTIVE_UID!: SET_ACTIVE_UID

  get uiModule (): UiModule {
    return this.GetModule(this.value.name)
  }

  get isActive (): boolean {
    return this.value.uid === this.activeUid
  }

  get classes () {
    const { isActive } = this

    const classes = {
      [`--active`]: isActive,
      [`--locked`]: this.value.locked
    }

    return classes
  }

  snapshot: string = ''

  async handleShot () {
    console.log(this.Previewer.$el)
    if (this.Previewer.ready) {
      let $target: HTMLElement = null
      if (this.value.name === 'h-app') {
        $target = this.Previewer.$el

      } else {
        $target = this.Previewer.$el.querySelector(`.uid-${this.value.uid}`)
        this.snapshot = await domtoimage.toPng($target, {
          filter: shotFilter
        })
      }
    }
  }

  handleActive () {
    this.SET_ACTIVE_UID(this.value.uid)
  }

  render () {
    const { uiModule, snapshot, classes } = this
    this.handleShot ()
    /* <MFlexFiller />
		<MIcon class="comp-list__sort-handler" name="menu" />
		 */
    /*
            <div class="tree-item-thumb">
          <img src={snapshot} />
        </div>

    */
    // <MIcon class="comp-list__sort-handler" name="menu" />
    return (
      <MFlex staticClass={`tree-item ${classes}`}
             class={classes}
             onClick={this.handleActive}
             direction="column" justify="center" align="center">
        <MFlex class="tree-item-header m-hr-b m-p-md" align="center">
          {uiModule.title}

        </MFlex>
      </MFlex>
    )
  }

}
</script>