import { Vue } from 'vue-property-decorator';
import { PropTypeLink, positionType } from '../core/constants';
export default class HFooter extends Vue {
    position: positionType;
    height: number;
    width: number;
    x: string | number;
    y: string | number;
    bgImg: string;
    logo: string;
    termsLink: PropTypeLink;
    policyLink: PropTypeLink;
    copyright: string;
    readonly viewTermsText: string;
    readonly viewPolicyText: string;
    readonly viewCopyright: string;
    readonly float: boolean;
    readonly styles: any;
}
