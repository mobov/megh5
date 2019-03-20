<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  .menu {
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
import { State, Mutation, Getter } from 'vuex-class'
import { ProjectData } from '@/constants'
import { StateUiModules, GetterPageData, MutationAddPageNode } from '@/store'

@Component
export default class Menu extends Vue {
  @State activeUid!: string

  @State Project!: ProjectData

  @Getter PageData!: GetterPageData

  @State UiModules!: StateUiModules

  @Mutation ADD_PAGE_NODE!: MutationAddPageNode

  get MenuLists () {
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
