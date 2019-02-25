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
      border-radius: 32px;
      box-shadow: 0 0 0 14px #090a0d, 0 0 0 17px #9fa3a8, 0 0 34px 17px rgba(0,0,0,0.2);
      margin: 0;
      max-width: 320px;
      min-width: 320px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .previewer-screen-main {
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
import Vue from 'vue'
import Element from '@/components/element'
import { HView, HButton, HFooter } from '@megh5/ui'
import { deepCopy } from '@megmore/es-helper'

function compiler (h, VNode) {
  const result = []
  VNode.forEach(node => {
    node.rootNode
      ? result.push(h(node.tag, node.data, node.children ? compiler(h, node.children) : []))
      : result.push(h(
        'Element', {},
        [h(node.tag, node.data, node.children ? compiler(h, node.children) : [])]
      ))
  })
  return result
}

export default Vue.extend({
  name: 'Previewer',
  components: { Element, HView, HButton, HFooter },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    RContent (h) {
      return compiler(h, [deepCopy(this.value.VNode)])
    }
  },
  render (h) {
    const { RContent } = this
    return (
      <div class="previewer">
        <div class="previewer-mobile">
          <figure class="previewer-screen">
            <div class="previewer-screen-main">
              {RContent(h)}
            </div>
          </figure>
        </div>
      </div>
    )
  }
})
</script>
