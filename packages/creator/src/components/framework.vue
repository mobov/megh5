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
import { GetterPageData, MutationSetPageData } from '@/store'

@Component
export default class Menu extends Vue {
  @Getter PageData!: GetterPageData

  @Mutation SET_PAGE_DATA!: MutationSetPageData

  handleItemClick (name: string) {
    // console.log(name)
    // this.UPDATE_UI_NODES()
  }

  RMenuItem () {
    const { handleItemClick } = this
    const result = []

    return result
  }

  render () {
    const { RMenuItem } = this

    return (
      <div class="framework">
        {RMenuItem()}
      </div>
    )
  }
}
</script>
