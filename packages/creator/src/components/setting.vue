<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  .setting {
    width: 100%;
    display: flex;
   .menu-item {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100px;
     width: calc(100% / 3);
     cursor: pointer;
   }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'

import { ProjectData } from '@/constants'
import { UiNode } from '@megh5/ui/types/core/constants'
import Element from './element.vue'
import { deepCopy } from '@megmore/es-helper'
import { merge } from 'lodash'

@Component
export default class Setting extends Vue {
  RMenuItem () {
    const result: VNode[] = []

    return result
  }

  render () {
    const { RMenuItem } = this


    return (
      <div class="setting">
        {RMenuItem()}
      </div>
    )
  }
}
</script>
