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
import { PageData, StatePreviewer } from '@/store'
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

  ShotHistories: string[] = []

  async handleShot () {
    if (this.Previewer.ready) {
      const shot = await domtoimage.toPng(this.Previewer.$el, {
        filter: shotFilter
      })
      this.ShotHistories.unshift(shot)
    }
  }

  RThumbs () {
    return this.ShotHistories.map(shot => {
      return (
        <div class="timeline-item-thumb">
          <img alt="" src={shot}/>
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
  mounted () {

    setInterval(() => {
      this.handleShot()
    }, 10000)
  }
}
</script>
