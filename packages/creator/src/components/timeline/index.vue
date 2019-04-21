<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .timeline {
    width: 100%;
    height: 100%;
    @include scroller();
    @include no-scroll-bar();
  }
  .timeline-item-thumb {
    padding: 5px;
    cursor: pointer;
    transition: all ease .3s;
    opacity: .4;
    /*filter: blur(1px);*/
    img {
      width: 100%;
      height: auto;
    }
    &:hover {
      /*filter: blur(0);*/
      opacity: 1;
    }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Watch, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import { State, Mutation, Getter } from 'vuex-class'
import { PageData, StatePreviewer, ROLL_BACK } from '@/store'
import { UiNode } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@mobov/es-helper'
import { merge } from 'lodash'
import domtoimage from 'dom-to-image'

function shotFilter (node: Node | any): boolean {
  return (node.tagName !== 'link')
}

@Component
export default class Timeline extends Vue {
  @State Previewer!: StatePreviewer

  @State Previewer!: StatePreviewer

  @State timelineShot!: boolean

  @Getter PageData!: UiNode[]

  @Mutation ROLL_BACK!: ROLL_BACK

  ShotHistories: any[] = []

  @Watch('timelineShot')
  async handleShot () {
    if (this.Previewer.ready) {
      const shot = await domtoimage.toPng(this.Previewer.$el, {
        filter: shotFilter
      })
      const history = {
        data: deepCopy(this.PageData),
        shot
      }
      this.ShotHistories.unshift(history)
    }
  }

  handleRollBack (data: UiNode[]) {
    this.ROLL_BACK(data)
  }

  RThumbs () {
    return this.ShotHistories.map(history => {
      return (
        <div class="timeline-item-thumb" onClick={() => this.handleRollBack(history.data)}>
          <img alt="" src={history.shot}/>
        </div>
      )
    })
  }

  render () {
    return (
      <div class="timeline">
        <div class="timeline-scroller">
          {this.RThumbs()}
        </div>
      </div>
    )
  }
}
</script>
