<!--弹窗-->
<style lang="scss" scoped>
  $btn_download_ratio: 565 / 168;
  $btn-width: 40vw;
  $logo-width: 100vw;
  $btn-height: (1/$btn_download_ratio)*$btn-width;
  .h-modal {
    height: 100%;
    width: 100%;

    z-index: 10099;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    transition: opacity .3s ease;
    will-change: auto;

    &.--append-to-root {
      position: fixed;
    }
    &.--append-to-parent {
      position: absolute;
    }
  }
  .modal-enter,
  .modal-leave-active {
    will-change: opacity;
    transition: opacity .3s ease;
    opacity: 0
  }
</style>

<template>
  <transition name="modal" @before-enter="beforeEnter"  @after-leave="afterLeave">
    <div class="h-modal" :class="classes" v-show="value"  @click="handleMaskClick">
     <slot>
      <div style="width:60%;height:300px;background:#fff"></div>
     </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import Store from '../core/store'

@Component
export default class HModal extends Vue {
  @Prop({ type: Boolean, default: false })
  value!: boolean

  @Prop({ type: String, default: 'root' })
  append!: 'root' | 'parent'

  get classes (): any {
    return {
      [`--append-to-${this.append}`]: true
    }
  }

  beforeEnter () {

  }

  afterLeave () {

  }

  handleMaskClick () {

  }

  mounted () {
    Store.$app.$el.appendChild(this.$el)
  }
}
</script>
