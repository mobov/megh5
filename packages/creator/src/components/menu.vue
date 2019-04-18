<style lang='scss'>
  @import "~@mobov/scss-helper/import";
  .menu {
    width: 100%;
    display: flex;
   .menu-item {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100px;
     /*width: calc(100% / 3);*/
     width: 100px;
     cursor: pointer;
     flex-wrap: wrap;
   }
  }
</style>
<script lang="tsx">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import { State, Mutation, Getter } from 'vuex-class'
import { ProjectData, UiNode, UiModule } from '@megh5/ui/types/core/constants'
import { StateUiModules, GetterPageData, MutationAddPageNode } from '@/store'

@Component
export default class Menu extends Vue {
  @State activeUid!: string

  @Getter ActiveNode!: UiNode

  @State Project!: ProjectData

  @Getter PageData!: GetterPageData

  @State UiModules!: StateUiModules

  @Mutation ADD_PAGE_NODE!: MutationAddPageNode

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

  RMenuItem () {
    const { handleItemClick } = this
    const result: any = []

    console.log(this.ActiveNode)
    this.MenuLists.forEach(list => {
      result.push(
        <div class="menu-item" v-m-ripple onClick={() => handleItemClick(list.name)}>
          {list.title}
        </div>
      )
    })
    return result
  }

  render () {
    const { RMenuItem } = this

    return (
      <div class="menu">
        {RMenuItem()}
      </div>
    )
  }
}
</script>
