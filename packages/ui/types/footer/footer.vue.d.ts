import { Vue } from 'vue-property-decorator';
import { PropTypeLink } from '../core/constants';
export default class HFooter extends Vue {
    height: string | number;
    bgImg: string;
    logo: string;
    termsLink: PropTypeLink;
    policyLink: PropTypeLink;
    copyright: string;
    readonly viewTermsText: string;
    readonly viewPolicyText: string;
    readonly viewCopyright: string;
    readonly styles: any;
}
