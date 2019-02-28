<style scoped>
  .h-button {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<template>
  <div class="h-button"
       :style="styles"
       @click="onClick">
    {{text}}
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { genSize, genColor } from '../core'

@Component
export default class HButton extends Vue {
  @Prop({ type: Boolean })
  block: boolean

  @Prop({ type: [String, Number], default: '12px' })
  fontSize: string | number

  @Prop({ type: String, default: '' })
  bgSrc: string

  @Prop({ type: String, default: '' })
  bgSrcActive: string

  @Prop({ type: String, default: '按钮' })
  text!: string

  get styles (): any {
    const { fontSize, bgSrc } = this
    console.log(this.bgSrc)
    const styles: any = {
      backgroundImage: `url(${bgSrc})`
    }

    genSize(styles, 'fontSize', fontSize)

    return styles
  }
  @Emit('click')
  onClick (e: Event) { }
}
</script>
