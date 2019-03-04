export const unit = '100vw / 100';
/**
 *
 * @param options
 */
export function setPageSize(options) {
}
/**
 * 获取尺寸值
 * @param val
 */
export function getUnitVal(val) {
    if (val !== undefined) {
        if (typeof val === 'number') {
            // val = `calc( ${unit} * val )`
            val = `${val}px`;
        }
    }
    return val;
}
/**
 * 计算尺寸样式值
 * @param styles
 * @param property
 * @param val
 */
export function genSize(styles = {}, property, val) {
    if (val !== undefined) {
        val = getUnitVal(val);
        styles[property] = val;
    }
}
/**
 * 计算样式X坐标
 * @param styles
 * @param float
 * @param val
 */
export function genPosX(styles = {}, val, float = false) {
    if (val !== undefined) {
        if (float) {
            styles['left'] = getUnitVal(val);
        }
        else {
            styles['marginLeft'] = getUnitVal(val);
        }
    }
}
/**
 * 计算样式Y坐标
 * @param styles
 * @param float
 * @param val
 */
export function genPosY(styles = {}, val, float = false) {
    if (val !== undefined) {
        if (float) {
            styles['top'] = getUnitVal(val);
        }
        else {
            styles['marginTop'] = getUnitVal(val);
        }
    }
}
/**
 * 计算背景图片样式
 * @param styles
 * @param val
 */
export function genBgImg(styles = {}, val) {
    if (val !== undefined) {
        styles['backgroundImage'] = `url(${val})`;
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
//# sourceMappingURL=index.js.map