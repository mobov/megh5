<style scoped>
  .h-text {
    display: block;
  }
</style>
<template>
  <div class="h-text" :style="styles" @click="onClick">
    {{viewText}}
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { genSize, getI18nValue } from '../core/utils'

@Component
export default class HText extends Vue {
  @Prop({ type: Boolean, default: false })
  float: boolean

  @Prop({ type: [Number, String], default: 50 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 100 })
  fontSize!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: Number, default: 0 })
  ellipsis!: number

  @Prop({ type: String, default: '按钮' })
  text!: string

  get viewText () {
    return getI18nValue(this, this.text)
  }

  get styles (): any {
    const { height, width, fontSize } = this
    const styles = {}

    genSize(styles, 'width', width)
    genSize(styles, 'height', height)
    genSize(styles, 'fontSize', fontSize)

    return styles
  }
}
</script>
