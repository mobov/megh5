import * as tslib_1 from "tslib";
import { Vue, Component, Prop } from 'vue-property-decorator';
let colorable = class colorable extends Vue {
};
tslib_1.__decorate([
    Prop({ type: String, default: '#ffffff' })
], colorable.prototype, "fontColor", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '#000000' })
], colorable.prototype, "bgColor", void 0);
colorable = tslib_1.__decorate([
    Component
], colorable);
export default colorable;
//# sourceMappingURL=colorable.js.map