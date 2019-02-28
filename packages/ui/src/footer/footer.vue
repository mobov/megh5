<style lang="scss">
  $--footer-size: 100px;
  $--footer-logo-size: 50px;
  .h-footer {
    width: 100%;
    height: $--footer-size;
    background-color: black;
    color: white;
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 2rem;
    box-sizing: border-box;
    font-size: 12px;
    .h-footer__logo {
      user-select: none;
      max-height: $--footer-logo-size;
      max-width: 30%;
    }
    .h-footer__copyright {
      color: #916339
    }
    .h-footer-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #cf9159;
    }
    a  {
      text-decoration:none;
      outline: none;
      color: inherit;
    }
  }
</style>
<template>
  <div class="h-footer" :style="styles">
    <div class="h-footer-main">
      <img class="h-footer__logo" ondragstart="return false" :src="logo" alt="" />
      <span class="h-footer__policy">
        <a :href="termsLink">{{termsText}}</a> / <a :href="policyLink">{{policyText}}</a>
      </span>
    </div>
    <div class="h-footer__copyright">
      {{copyright}}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'

@Component
export default class HFooter extends Vue {
  @Prop({ type: String })
  logo: string

  @Prop({ type: String, default: 'Terms Of Service' })
  termsText: string

  @Prop({ type: String, default: '' })
  termsLink: string

  @Prop({ type: String, default: 'Privacy Policy' })
  policyText: string

  @Prop({ type: String, default: '' })
  policyLink: string

  @Prop({ type: String, default: 'Copyright 2019 * Limited All right reserved' })
  copyright: string

  get styles (): any {
    return {
      width: '100%'
    }
  }
}
</script>
