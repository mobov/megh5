import { Vue } from 'vue-property-decorator';
export default class HModal extends Vue {
    value: boolean;
    height: string | number;
    width: string | number;
    fontSize: string | number;
    readonly classes: any;
    beforeEnter(): void;
    afterLeave(): void;
    handleMaskClick(): void;
    mounted(): void;
}
