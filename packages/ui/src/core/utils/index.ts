
export const unit =  '100vw / 100'

interface screenSize {
  height: '100vh',
  width: '100vw'
}

/**
 *
 * @param options
 */
export function setPageSize (options: screenSize) {

}

/**
 * 获取尺寸值
 * @param val
 */
export function getUnitVal ( val: string | number | undefined) {
  if (val !== undefined) {
    if (typeof val === 'number' ) {
      // val = `calc( ${unit} * val )`
      val = `${val}px`
    }
  }
  return val
}

/**
 * 计算尺寸样式值
 * @param styles
 * @param property
 * @param val
 */
export function genSize (styles: any = {}, property: string, val: string | number | undefined) {
  if (val !== undefined) {
    val = getUnitVal(val)
    styles[property] = val
  }
}

/**
 * 计算样式X坐标
 * @param styles
 * @param float
 * @param val
 */
export function genPosX (styles: any = {}, val: string | number | undefined, float: boolean = false) {
  if (val !== undefined) {
   if (float) {
     styles['left'] = getUnitVal(val)
   } else {
     styles['marginLeft'] = getUnitVal(val)
   }
  }
}

/**
 * 计算样式Y坐标
 * @param styles
 * @param float
 * @param val
 */
export function genPosY (styles: any = {}, val: string | number | undefined, float: boolean = false) {
  if (val !== undefined) {
    if (float) {
      styles['top'] = getUnitVal(val)
    } else {
      styles['marginTop'] = getUnitVal(val)
    }
  }
}

/**
 * 计算背景图片样式
 * @param styles
 * @param val
 */
export function genBgImg (styles: any = {}, val: ImageData | string | undefined ) {
  if (val !== undefined && val !== '') {
    styles['backgroundImage'] = `url(${val})`
  } else {
    styles['backgroundImage'] = 'unset'
  }
}

/**
 * 获取计算颜色样式值
 * @param styles
 * @param property
 * @param val
 */
export function genColor (styles: any = {}, property: string, val: string | undefined): void {
  if (val !== undefined) {
    styles[property] = val
  }
}

/**
 * 获取翻译值
 * @param $vue
 * @param value
 */
export function getI18nValue ($vue, value) {
  if ($vue.$t) {
    return $vue.$t(value)
  } else {
    return value
  }
}
