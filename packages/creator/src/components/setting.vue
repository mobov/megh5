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
import { getUiConfig } from '@/ui'
import { ProjectData } from '@/constants'
import { UiNode } from '@megh5/ui/types/core/constants'
import Element from './element.vue'
import { deepCopy } from '@megmore/es-helper'
import { merge } from 'lodash'

const uiConfig = getUiConfig()

@Component
export default class Setting extends Vue {
  @Prop({ type: Object, default: () => {} })
  value!: ProjectData

  RMenuItem () {
    const result = []
    uiConfig.forEach(list => {
      console.log(list)
      result.push(
        <div class="menu-item" v-m-ripple>
          {list.title}
        </div>
      )
    })
    return result
  }

  render () {
    const { RMenuItem, screenStyles } = this
    console.log(uiConfig)

    return (
      <div class="setting">
        {RMenuItem()}
      </div>
    )
  }
}
</script>
