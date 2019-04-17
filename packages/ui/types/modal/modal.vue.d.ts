import { Vue } from 'vue-property-decorator';
export default class HModal extends Vue {
    value: boolean;
    append: 'root' | 'parent';
    readonly classes: any;
    beforeEnter(): void;
    afterLeave(): void;
    handleMaskClick(): void;
    mounted(): void;
}
