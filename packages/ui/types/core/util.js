/**
 * 计算尺寸样式值
 * @param styles
 * @param property
 * @param val
 */
export function genSize(styles = {}, property, val) {
    if (val !== undefined) {
        val = typeof val === 'number' ? `${val}px` : val;
        styles[property] = val;
    }
}
/**
 * 获取计算颜色样式值
 * @param styles
 * @param property
 * @param val
 */
export function genColor(styles = {}, property, val) {
    if (val !== undefined) {
        styles[property] = val;
    }
}
//# sourceMappingURL=util.js.map