<style lang="scss" scoped>
  .h-video {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
<template>
  <div class="h-video" :style="styles">
    <div class="h-video-box" ref="box">
      <!--<div v-if="source === 'youtube'" v-once :id="videoId"></div>-->
      <iframe v-if="source !== 'youtube'"
              :height="height"
              :width="width"
              :src="videoHref"
              frameborder="0" allowfullscreen>
      </iframe>
    </div>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import './sdk/youtube'
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins, Watch } from 'vue-property-decorator'
import { genSize, genPosition, genPosX, genPosY, genBgImg, getUnitVal, uuid } from '../core/utils'
import { positionType } from '../core/constants'

type videoSource = 'youtube' | 'youku'

enum VideoSource {
  youtube = 'youtube',
  youku = 'youku'
}

const VideoHrefs = {
  youtube: '',
  youku: 'http://player.youku.com/embed/'
}

@Component
export default class HVideo extends Vue {
  @Prop({ type: String, default: 'relative' })
  position!: positionType

  @Prop({ type: [Number, String], default: 50 })
  height!: string | number

  @Prop({ type: [Number, String], default: 100 })
  width!: string | number

  @Prop({ type: [Number, String], default: 0 })
  x!: string | number

  @Prop({ type: [Number, String], default: 0 })
  y!: string | number

  @Prop({ type: String, default: '' })
  bgImg!: string

  @Prop({ type: Boolean, default: false })
  autoPlay!: boolean

  @Prop({ type: String, default: 'youtube' })
  source!: videoSource

  @Prop({ type: String, default: 'XNDEzNzc1MzUwNA==' })
  link!: string

  @Watch('height')
  @Watch('width')
  updateSize () {
    const { $video, source, height, width } = this
    if (source === VideoSource.youtube) {
      $video.setAttribute('height', height as string)
      $video.setAttribute('width', width as string)
    }
  }

  @Watch('source')
  updateInstance (newVal: VideoSource, oldVal: VideoSource) {
    const { $video, source } = this
    if (oldVal === VideoSource.youtube) {
      this.instance.destroy()
    }

    this.init()
  }
  //
  // @Watch('link')

  private get float (): boolean {
    return this.position !== 'relative'
  }

  private get styles (): any {
    const { height, width, position, x, y, float, bgImg } = this
    const styles = {}

    genPosition(styles, position)
    genSize(styles, 'width', width)
    genSize(styles, 'height', height)
    genPosX(styles, x, float)
    genPosY(styles, y, float)
    genBgImg(styles, bgImg)

    return styles
  }

  private get $video (): HTMLFrameElement {
    return (this.$refs.box as HTMLElement)!.children[0] as HTMLFrameElement
  }

  get videoHref () {
    return `${VideoHrefs[this.source]}${this.link}`
  }

  private videoId: string = ''

  private instance: any = null

  private init () {
    const { source, height, width, autoPlay } = this

    this.videoId = uuid()

    if (source === VideoSource.youtube) {
      const $container = document.createElement('div')
      const YT = window.YT

      $container.setAttribute('id', this.videoId)
      // @ts-ignore
      this.$refs.box.appendChild($container)

      const initYTPlayer = () => {
        this.instance = new YT.Player($container, {
          width,
          height,
          videoId: this.link,
          showinfo: 0,
          rel: 0
        })

        if (autoPlay) {
          setTimeout(() => {
            this.instance.playVideo()
          }, 500)
        }
      }

      if (YT) {
        initYTPlayer()
      } else {
        window.onYouTubeIframeAPIReady = () => {
          initYTPlayer()
        }
      }
    } else {
      // if (autoPlay) {
      //   setTimeout(() => {
      //     this.$video.click()
      //   }, 500)
      // }
    }
  }

  mounted () {
    this.init()
  }
}
</script>
