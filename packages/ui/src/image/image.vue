<style lang="scss">
  $--footer-size: 100px;
  $--footer-logo-size: 50px;
  .h-image {
    width: auto;
    height: $--footer-size;
    color: white;
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 20px;
    box-sizing: border-box;
    font-size: 12px;
    display: flex;
    align-items: center;
    .h-promo-code__codes {
      flex-grow: 1;
      font-weight: 700;
      font-size: 20px;
      overflow-x: auto;
      color: #ff5a00;
      margin: 0 .5rem;
    }
    .h-promo-code-label {
      display: flex;
      align-items: center;
      color: #d6c29b;
      font-size: 16px;
    }
    .h-promo-code__gift {
      height: 50px;
      width: 50px;
    }
  }
</style>
<template>
  <div class="h-image" :style="styles">
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'

@Component
export default class HPromoCode extends Vue {
  @Prop({ type: String, default: '10086' })
  src: string
}
</script>
