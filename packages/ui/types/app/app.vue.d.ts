import { Vue } from 'vue-property-decorator';
export default class HApp extends Vue {
    height: string | number;
    width: string | number;
    bgImg: string;
    bgSize: string;
    readonly styles: any;
    mounted(): void;
}
