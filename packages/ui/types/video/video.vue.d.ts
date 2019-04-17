import './sdk/youtube';
import { Vue } from 'vue-property-decorator';
import { positionType } from '../core/constants';
declare type videoSource = 'youtube' | 'youku';
declare enum VideoSource {
    youtube = "youtube",
    youku = "youku"
}
export default class HVideo extends Vue {
    position: positionType;
    height: string | number;
    width: string | number;
    x: string | number;
    y: string | number;
    bgImg: string;
    autoPlay: boolean;
    source: videoSource;
    link: string;
    updateSize(): void;
    updateInstance(newVal: VideoSource, oldVal: VideoSource): void;
    private readonly float;
    private readonly styles;
    private readonly $video;
    readonly videoHref: string;
    private videoId;
    private instance;
    private init;
    mounted(): void;
}
export {};
