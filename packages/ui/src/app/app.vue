<style lang="scss">
  .h-app {
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    position: relative;
    > *:first-child {
      flex-grow: 1;
    }
  }
</style>
<template>
  <div class="h-app" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'

@Component
export default class HApp extends Vue {

}
</script>
