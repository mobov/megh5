import { Vue } from 'vue-property-decorator';
import { positionType } from '../core/constants';
export default class HButton extends Vue {
    position: positionType;
    height: string | number;
    width: string | number;
    x: string | number;
    y: string | number;
    bgImg: string;
    text: string;
    onClick(e: Event): void;
    readonly viewText: string;
    readonly float: boolean;
    readonly styles: any;
}
