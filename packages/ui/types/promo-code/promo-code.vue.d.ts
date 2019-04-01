import { Vue } from 'vue-property-decorator';
import { positionType } from '../core/constants';
export default class HPromoCode extends Vue {
    position: positionType;
    width: string | number;
    height: string | number;
    x: string | number;
    y: string | number;
    label: string;
    code: string;
    gift: string;
    bgImg: string;
    readonly viewLabel: string;
    readonly viewCode: string;
    readonly float: boolean;
    readonly styles: any;
}
