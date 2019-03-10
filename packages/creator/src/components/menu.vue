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
import { StateProject, StateUiModules, GetterPageData, MutationSetPageData } from '@/store'

@Component
export default class Menu extends Vue {
  @State Project!: StateProject

  @Getter PageData!: GetterPageData

  @State UiModules!: StateUiModules

  @Mutation SET_PAGE_DATA!: MutationSetPageData

  handleItemClick (name: string) {
    console.log(this.Project)
    console.log(this.PageData)
    console.log(this.UiModules)
    this.SET_PAGE_DATA([])
  }

  RMenuItem () {
    const { handleItemClick } = this
    const result: any = []

    this.UiModules.forEach(list => {
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
