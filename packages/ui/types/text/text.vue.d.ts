import { Vue } from 'vue-property-decorator';
import { positionType } from '../core/constants';
export default class HText extends Vue {
    position: positionType;
    height: string | number;
    width: string | number;
    fontSize: string | number;
    x: string | number;
    y: string | number;
    ellipsis: number;
    text: string;
    readonly viewText: string;
    readonly float: boolean;
    readonly styles: any;
}
