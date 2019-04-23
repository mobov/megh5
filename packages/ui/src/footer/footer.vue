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
    a {
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
        <a :href="termsLink.href">{{viewTermsText}}</a> / <a :href="policyLink.href">{{viewPolicyText}}</a>
      </span>
    </div>
    <div class="h-footer__copyright">
      {{viewCopyright}}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { genBgImg, genSize, getStrValue, genPosition, genPosY, genPosX } from '../core/utils'
import { PropTypeLink, positionType } from '../core/constants'

@Component
export default class HFooter extends Vue {
  @Prop({ type: String, default: 'relative' })
  position!: positionType

  @Prop({ type: [Number, String], default: 100 })
  height!: number

  @Prop({ type: [Number, String], default: 350 })
  width!: number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: String, default: '' })
  bgImg!: string

  @Prop({ type: String })
  logo!: string

  @Prop({ type: Object, default: () => ({ text: 'Terms Of Service', href: '' }) })
  termsLink!: PropTypeLink

  @Prop({ type: Object, default: () => ({ text: 'Privacy Policy', href: '' }) })
  policyLink!: PropTypeLink

  @Prop({ type: String, default: 'Copyright 2019 * Limited All right reserved' })
  copyright!: string

  get viewTermsText () {
    return getStrValue(this, this.termsLink.text)
  }

  get viewPolicyText () {
    return getStrValue(this, this.policyLink.text)
  }

  get viewCopyright () {
    return getStrValue(this, this.copyright)
  }

  get float (): boolean {
    return this.position !== 'relative'
  }

  get styles (): any {
    const { height, width, position, bgImg, x, y, float } = this
    const styles = {}

    genPosition(styles, position)
    genPosX(styles, x, float)
    genPosY(styles, y, float)
    genBgImg(styles, bgImg)
    genSize(styles, 'height', height)
    genSize(styles, 'width', width)

    return styles
  }
}
</script>
