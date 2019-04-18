<!--弹窗-->
<style lang="scss" scoped>
  .h-modal {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    transition: opacity .3s ease;
    will-change: auto;
    position: absolute;
    /*&.--append-to-root {*/
      /*position: fixed;*/
    /*}*/
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
    <div class="h-modal" :style="styles" v-show="value"  @click="handleMaskClick">
     <slot>
     </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import Store from '../core/store'

let zIndex =  2000

function getZIndex (): number {
  return zIndex ++
}

@Component
export default class HModal extends Vue {
  @Prop({ type: Boolean, default: false })
  value!: boolean

  get styles (): any {
    const { zIndex } = this
    return {
      zIndex
    }
  }

  zIndex: number = getZIndex()

  beforeEnter () {
    this.zIndex = getZIndex()
  }

  afterLeave () {

  }

  handleMaskClick () {
    this.$emit('input', false)
  }

  // @Watch('appendToRoot')
  // mountEl () {
  //   if (this.isMounted) {
  //     // console.log(this.$el)
  //     // @ts-ignore
  //     this.$el.parentNode.removeChild(this.$el)
  //   }
  //   this.isMounted = true
  //   // console.log(this.$el)
  //   // console.log(Store.$app)
  //   if (this.appendToRoot) {
  //     Store.$app.$el.appendChild(this.$el)
  //   } else {
  //     this.$parent.$el.appendChild(this.$el)
  //   }
  // }

  mounted () {
    console.log(this)
    if (this.$parent.$parent.$el.id === 'h-app') {
      this.$parent!.$parent!.$el.appendChild(this.$el)
    }
  }
}
</script>
