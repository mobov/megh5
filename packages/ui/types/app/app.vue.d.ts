import { Vue } from 'vue-property-decorator';
export default class HApp extends Vue {
    height: string | number;
    width: string | number;
    bgImg: string;
    readonly styles: any;
    mounted(): void;
}
