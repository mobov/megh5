<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .library {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
   .library-item {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100px;
     /*width: calc(100% / 3);*/
     width: 100px;
     cursor: pointer;
   }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import { State, Mutation, Getter } from 'vuex-class'
import { ProjectData, UiNode, UiModule } from '@megh5/ui/types/core/constants'
import { PageData, ADD_PAGE_NODE } from '@/store'

@Component
export default class Library extends Vue {
  @State activeUid!: string

  @Getter ActiveNode!: UiNode

  @State Project!: ProjectData

  @Getter PageData!: PageData

  @State UiModules!: Array<UiModule>

  @Mutation ADD_PAGE_NODE!: ADD_PAGE_NODE

  get MenuLists (): UiModule [] {
    // @ts-ignore
    return this.UiModules.filter(item => !item.uiConfig.disabled)
  }
  handleItemClick (name: string) {
    this.ADD_PAGE_NODE({
      pid: this.activeUid,
      name
    })
  }

  RItem () {
    const { handleItemClick } = this
    const result: any = []

    this.MenuLists.forEach(list => {
      if (!list.uiConfig.isRoot) {
        result.push(
          <div class="library-item" v-m-ripple onClick={() => handleItemClick(list.name)}>
            {list.title}
          </div>
        )
      }
    })
    return result
  }

  render () {
    const { RItem } = this

    return (
      <div class="library">
        {RItem()}
      </div>
    )
  }
}
</script>
