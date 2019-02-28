<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  .previewer {
    height: 736px;
    width: 414px;
    --device-aspect-ratio: 2.125;
    --device-padding: 2rem;
    padding: var(--device-padding);
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
import { CreateElement, VNode } from 'vue'
import { ProjectNode } from '@/constants'
import Element from './element.vue'
import { HApp, HView, HButton, HFooter, HPromoCode } from '@megh5/ui'
import { deepCopy } from '@megmore/es-helper'

function compiler (h: CreateElement, PNode: ProjectNode []): VNode[] {
  const result: VNode[] = []
  if (PNode !== undefined) {
    for (let node of PNode) {
      result.push(h(
        'Element',
        { props: deepCopy(node.uiConfig) },
        [h(node.tag, node.data, node.children ? compiler(h, node.children) : [])]
      ))
    }
  }

  return result
}

export interface PreviewerObject {
  height: number,
  width: number,
  scrollHeight: number
}

@Component({
  components: { Element, HApp, HView, HButton, HFooter, HPromoCode }
})
export default class Previewer extends Vue {
  @Prop({ type: Object, default: () => {} })
  value!: any

  @Provide()
  Previewer: PreviewerObject = {
    height: 736,
    width: 320,
    scrollHeight: 736
  }

  get screenStyles (): any {
    return {
      width: `${this.Previewer.width}px`,
      height: `${this.Previewer.height}px`
    }
  }

  RContent (h: CreateElement): VNode[] {
    return compiler(h, deepCopy(this.value.ProjectNode))
  }

  mounted () {
    this.Previewer.scrollHeight = (this.$refs.$screen as any).scrollHeight
  }

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
