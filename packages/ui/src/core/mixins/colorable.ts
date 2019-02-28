import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class colorable extends Vue {
  @Prop({ type: String,  default: '#ffffff' })
  fontColor!: string

  @Prop({ type: String, default: '#000000' })
  bgColor!: string
}
