<style lang='scss'>
  @import "~@megmore/scss-helper/import";
  .previewer {
    height: 736px;
    width: 414px;
    --device-aspect-ratio: 2.125;
    --device-padding: 2rem;
    padding: var(--device-padding);
    .previewer-screen {
      height: 736px;
      border-radius: 32px;
      box-shadow: 0 0 0 14px #090a0d, 0 0 0 17px #9fa3a8, 0 0 34px 17px rgba(0,0,0,0.2);
      margin: 0;
      max-width: 320px;
      min-width: 320px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .previewer-screen-main {
      height: inherit;
      width: inherit;
      max-width: inherit;
      min-width: inherit;
      @include scroller();
      @include no-scroll-bar();
    }
  }
</style>

<template>
  <div class="previewer">
    <div class="previewer-mobile">
      <figure class="previewer-screen">
        <div class="previewer-screen-main">
          <slot></slot>
        </div>
        <!--<svg class="docs-demo-device__md-bar" viewBox="0 0 1384.3 40.3">-->
          <!--<path class="st0" d="M1343 5l18.8 32.3c.8 1.3 2.7 1.3 3.5 0L1384 5c.8-1.3-.2-3-1.7-3h-37.6c-1.5 0-2.5 1.7-1.7 3z"></path>-->
          <!--<circle class="st0" cx="1299" cy="20.2" r="20"></circle>-->
          <!--<path class="st0" d="M1213 1.2h30c2.2 0 4 1.8 4 4v30c0 2.2-1.8 4-4 4h-30c-2.2 0-4-1.8-4-4v-30c0-2.3 1.8-4 4-4zM16 4.2h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path>-->
        <!--</svg>-->
      </figure>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Previewer',
  data () {
    return {
    }
  }
})
</script>
