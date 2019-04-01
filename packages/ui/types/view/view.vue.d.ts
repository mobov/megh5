import { Vue } from 'vue-property-decorator';
import { positionType } from '../core/constants';
export default class HView extends Vue {
    position: positionType;
    direction: 'x' | 'y';
    height: string | number;
    width: string | number;
    x: string | number;
    y: string | number;
    bgImg: string;
    readonly float: boolean;
    readonly classes: {
        [x: string]: boolean;
    };
    readonly styles: any;
    render(): any;
}
