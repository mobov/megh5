<style lang="scss">
  .side-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    >*:nth-child(1) {
      flex-grow: 1
    }
  }
  .side-panel-nav__item {
    width: 100px;
  }
</style>
<template>
  <div class="side-panel">
    <MAppBar class="side-panel-nav" :elevation="0" color="primary">
      <MButton class="side-panel-nav__item m-mr-md" :elevation="0" color="primary" @click="handleNav('menu')">
        组件
      </MButton>
      <MButton class="side-panel-nav__item m-mr-md" :elevation="0" color="primary" @click="handleNav('setting')">
        配置
      </MButton>
    </MAppBar>
    <SettingTree />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from 'vue-property-decorator'
import Menu from '@/components/menu.vue'
import SettingTree from '@/components/setting-tree.vue'

type navType = 'menu' | 'setting'

@Component({
  components: { Menu, SettingTree }
})
export default class SidePanel extends Vue {
  handleNav (index: navType) {
    if (index === 'menu') {

    }
  }
}
</script>
