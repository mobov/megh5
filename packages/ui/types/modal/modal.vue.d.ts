import { Vue } from 'vue-property-decorator';
export default class HModal extends Vue {
    value: boolean;
    readonly styles: any;
    zIndex: number;
    beforeEnter(): void;
    afterLeave(): void;
    handleMaskClick(): void;
    mounted(): void;
}
