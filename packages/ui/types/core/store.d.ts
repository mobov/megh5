import { Vue } from 'vue-property-decorator';
declare class HAppStore extends Vue {
    $app: Vue;
    SET_APP(val: Vue): void;
}
declare const _default: HAppStore;
export default _default;
