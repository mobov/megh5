import { getUrlParam } from '@megmore/es-helper';
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
    if (val !== undefined && val !== '') {
        styles['backgroundImage'] = `url(${val})`;
    }
    else {
        styles['backgroundImage'] = 'unset';
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
/**
 * 计算浮动
 * @param styles
 * @param val
 */
export function genFloat(styles = {}, val) {
    if (val !== undefined) {
        styles['position'] = val ? 'absolute' : 'relative';
    }
}
/**
 * 计算浮动
 * @param styles
 * @param val
 */
export function genPosition(styles = {}, val) {
    if (val !== undefined) {
        styles['position'] = val;
    }
}
/**
 * 计算文字溢出。。。
 * @param styles
 * @param val
 */
export function genEllipsis(styles = {}, val) {
    if (val !== undefined) {
        if (val === 0) {
            Object.assign(styles, {
                'overflow': 'auto',
                'text-overflow': 'normal',
                'white-space': 'normal',
                'word-break': 'normal',
                'display': 'block',
            });
        }
        else if (val === 1) {
            Object.assign(styles, {
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                'word-break': 'normal',
                'display': '-webkit-box',
            });
        }
        else {
            Object.assign(styles, {
                'word-break': 'break-all',
                'text-overflow': 'clip',
                'display': '-webkit-box',
                'overflow': 'hidden',
                'word-wrap': 'break-word',
                'white-space': 'normal !important',
                '-webkit-line-clamp': val,
                '-webkit-box-orient': 'vertical'
            });
        }
    }
}
const tReg = /\$t{.+?}/g;
const pReg = /\$p{.+?}/g;
/**
 * 获取转换后的字符串值，$t{key}表示翻译值，$p{key}表示url值
 * @param $vue
 * @param value
 */
export function getStrValue($vue, value) {
    let result = value;
    const tArrs = value.match(tReg);
    const pArrs = value.match(pReg);
    if (tArrs) {
        tArrs.forEach(item => {
            const param = item.substr(3, item.length - 4);
            if ($vue && $vue.$t) {
                result = result.replace(item, $vue.$t(param));
            }
            else {
                result = result.replace(item, param);
            }
        });
    }
    if (pArrs) {
        pArrs.forEach(item => {
            const param = item.substr(3, item.length - 4);
            result = result.replace(item, getUrlParam(param) || param);
        });
    }
    return result;
}
//# sourceMappingURL=index.js.map