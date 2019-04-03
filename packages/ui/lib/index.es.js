import { Prop, Component, Vue, Emit } from 'vue-property-decorator';
import { isBase64, getUrlParam } from '@mobov/es-helper';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function loadAssets(data) {
  var result = data;

  if (!isBase64(result)) {
    // result = require(`@/assets/${result}`)
    result = require(result);
  }

  return result;
}

var loader = /*#__PURE__*/Object.freeze({
    loadAssets: loadAssets
});

var unit = '100vw / 100'; // interface screenSize {
//   height: '100vh',
//   width: '100vw'
// }
//
// /**
//  *
//  * @param options
//  */
// export function setPageSize (options: screenSize) {
//
// }

/**
 * 获取尺寸值
 * @param val
 */

function getUnitVal(val) {
  if (val !== undefined) {
    if (typeof val === 'number') {
      // val = `calc( ${unit} * val )`
      val = val + "px";
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

function genSize(styles, property, val) {
  if (styles === void 0) {
    styles = {};
  }

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

function genPosX(styles, val, float) {
  if (styles === void 0) {
    styles = {};
  }

  if (float === void 0) {
    float = false;
  }

  if (val !== undefined) {
    if (float) {
      styles['left'] = getUnitVal(val);
    } else {
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

function genPosY(styles, val, float) {
  if (styles === void 0) {
    styles = {};
  }

  if (float === void 0) {
    float = false;
  }

  if (val !== undefined) {
    if (float) {
      styles['top'] = getUnitVal(val);
    } else {
      styles['marginTop'] = getUnitVal(val);
    }
  }
}
/**
 * 计算背景图片样式
 * @param styles
 * @param val
 */

function genBgImg(styles, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined && val !== '') {
    styles['backgroundImage'] = "url(" + loadAssets(val) + ")";
  } else {
    styles['backgroundImage'] = 'unset';
  }
}
/**
 * 获取计算颜色样式值
 * @param styles
 * @param property
 * @param val
 */

function genColor(styles, property, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    styles[property] = val;
  }
}
/**
 * 计算浮动
 * @param styles
 * @param val
 */

function genPosition(styles, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    styles['position'] = val;
  }
}
/**
 * 计算文字溢出。。。
 * @param styles
 * @param val
 */

function genEllipsis(styles, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    if (val === 0) {
      Object.assign(styles, {
        'overflow': 'auto',
        'text-overflow': 'normal',
        'white-space': 'normal',
        'word-break': 'normal',
        'display': 'block'
      });
    } else if (val === 1) {
      Object.assign(styles, {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'word-break': 'normal',
        'display': '-webkit-box'
      });
    } else {
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
var tReg = /\$t{.+?}/g;
var pReg = /\$p{.+?}/g;
/**
 * 获取转换后的字符串值，$t{key}表示翻译值，$p{key}表示url值
 * @param $vue
 * @param value
 */

function getStrValue($vue, value) {
  var result = value;
  var tArrs = value.match(tReg);
  var pArrs = value.match(pReg);

  if (tArrs) {
    tArrs.forEach(function (item) {
      var param = item.substr(3, item.length - 4);

      if ($vue && $vue.$t) {
        result = result.replace(item, $vue.$t(param));
      } else {
        result = result.replace(item, param);
      }
    });
  }

  if (pArrs) {
    pArrs.forEach(function (item) {
      var param = item.substr(3, item.length - 4);
      result = result.replace(item, getUrlParam(param) || param);
    });
  }

  return result;
}

var index = /*#__PURE__*/Object.freeze({
    unit: unit,
    getUnitVal: getUnitVal,
    genSize: genSize,
    genPosX: genPosX,
    genPosY: genPosY,
    genBgImg: genBgImg,
    genColor: genColor,
    genPosition: genPosition,
    genEllipsis: genEllipsis,
    getStrValue: getStrValue
});

var HApp =
/** @class */
function (_super) {
  __extends(HApp, _super);

  function HApp() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HApp.prototype, "styles", {
    get: function get() {
      var _a = this,
          height = _a.height,
          width = _a.width,
          bgColor = _a.bgColor,
          bgImg = _a.bgImg;

      var styles = {};
      genSize(styles, 'min-height', height);
      genSize(styles, 'width', width);
      genColor(styles, 'background-color', bgColor);
      genBgImg(styles, bgImg);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: [Number, String],
    default: '100%'
  })], HApp.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: '100%'
  })], HApp.prototype, "width", void 0);

  __decorate([Prop({
    type: String,
    default: 'transparent'
  })], HApp.prototype, "bgColor", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HApp.prototype, "bgImg", void 0);

  HApp = __decorate([Component], HApp);
  return HApp;
}(Vue);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = HApp;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "h-app",
    style: _vm.styles
  }, [_c("div", {
    staticClass: "h-app-main"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("footer")], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-54dd5a72_0", {
    source: ".h-app {\n  min-height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  position: relative;\n}\n.h-app .h-app-main {\n    flex-grow: 1;\n    position: relative;\n}\n\n/*# sourceMappingURL=app.vue.map */",
    map: {
      "version": 3,
      "sources": ["D:\\Projects\\mobov\\packages\\megh5\\packages\\ui\\src\\app\\app.vue", "app.vue"],
      "names": [],
      "mappings": "AACA;EACA,gBAAA;EACA,WAAA;EACA,aAAA;EACA,oBAAA;EACA,sBAAA;EACA,kBAAA;AAAA;AANA;IAQA,YAAA;IACA,kBAAA;AAAA;;ACCA,kCAAkC",
      "file": "app.vue",
      "sourcesContent": ["<style lang=\"scss\">\r\n  .h-app {\r\n    min-height: 100%;\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: stretch;\r\n    flex-direction: column;\r\n    position: relative;\r\n    .h-app-main {\r\n      flex-grow: 1;\r\n      position: relative;\r\n    }\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-app\" :style=\"styles\">\r\n    <div class=\"h-app-main\">\r\n      <slot></slot>\r\n    </div>\r\n    <slot name=\"footer\" />\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'\r\nimport { genSize, genColor, genBgImg } from '../core/utils'\r\n\r\n@Component\r\nexport default class HApp extends Vue {\r\n  @Prop({ type: [Number, String], default: '100%' })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: '100%' })\r\n  width!: string | number\r\n\r\n  @Prop({ type: String, default: 'transparent' })\r\n  bgColor!: string\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  get styles (): any {\r\n    const { height, width, bgColor, bgImg } = this\r\n    const styles = {}\r\n\r\n    genSize(styles, 'min-height', height)\r\n    genSize(styles, 'width', width)\r\n    genColor(styles, 'background-color', bgColor)\r\n    genBgImg(styles, bgImg)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n", ".h-app {\n  min-height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  position: relative; }\n  .h-app .h-app-main {\n    flex-grow: 1;\n    position: relative; }\n\n/*# sourceMappingURL=app.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var HApp$1 = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

HApp$1.install = function (Vue) {
  Vue.component(HApp$1.name, HApp$1);
};

var HButton =
/** @class */
function (_super) {
  __extends(HButton, _super);

  function HButton() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  HButton.prototype.onClick = function (e) {};

  Object.defineProperty(HButton.prototype, "viewText", {
    get: function get() {
      return getStrValue(this, this.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HButton.prototype, "float", {
    get: function get() {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HButton.prototype, "styles", {
    get: function get() {
      var _a = this,
          height = _a.height,
          width = _a.width,
          x = _a.x,
          y = _a.y,
          bgImg = _a.bgImg,
          position = _a.position,
          float = _a.float;

      var styles = {};
      genPosition(styles, position);
      genBgImg(styles, bgImg);
      genSize(styles, 'height', height);
      genSize(styles, 'width', width);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HButton.prototype, "position", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 50
  })], HButton.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HButton.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HButton.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HButton.prototype, "y", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HButton.prototype, "bgImg", void 0);

  __decorate([Prop({
    type: String,
    default: '按钮'
  })], HButton.prototype, "text", void 0);

  __decorate([Emit('click')], HButton.prototype, "onClick", null);

  HButton = __decorate([Component], HButton);
  return HButton;
}(Vue);

/* script */
var __vue_script__$1 = HButton;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "h-button",
    style: _vm.styles,
    on: {
      click: _vm.onClick
    }
  }, [_vm._v("\n  " + _vm._s(_vm.text) + "\n")]);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-3e9ca97a_0", {
    source: "\n.h-button {\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n",
    map: {
      "version": 3,
      "sources": ["D:\\Projects\\mobov\\packages\\megh5\\packages\\ui\\src\\button\\button.vue"],
      "names": [],
      "mappings": ";AACA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AACA",
      "file": "button.vue",
      "sourcesContent": ["<style>\r\n  .h-button {\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-button\"\r\n       :style=\"styles\"\r\n       @click=\"onClick\">\r\n    {{text}}\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genBgImg, genSize, genPosX, genPosY, genPosition, getStrValue } from '../core/utils'\r\nimport { positionType } from '../core/constants'\r\n\r\n@Component\r\nexport default class HButton extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: [Number, String], default: 50 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  @Prop({ type: String, default: '按钮' })\r\n  text!: string\r\n\r\n  @Emit('click')\r\n  onClick (e: Event) { }\r\n\r\n  get viewText () {\r\n    return getStrValue(this, this.text)\r\n  }\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get styles (): any {\r\n    const { height, width, x, y, bgImg, position, float } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genBgImg(styles, bgImg)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'width', width)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

var HButton$1 = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, browser, undefined);

HButton$1.install = function (Vue) {
  Vue.component(HButton$1.name, HButton$1);
};

var HView =
/** @class */
function (_super) {
  __extends(HView, _super);

  function HView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HView.prototype, "float", {
    get: function get() {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HView.prototype, "classes", {
    get: function get() {
      var _a;

      var direction = this.direction;
      return _a = {}, _a["--direction-" + direction] = true, _a;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HView.prototype, "styles", {
    get: function get() {
      var _a = this,
          float = _a.float,
          bgImg = _a.bgImg,
          height = _a.height,
          width = _a.width,
          x = _a.x,
          y = _a.y,
          position = _a.position;

      var styles = {};
      genPosition(styles, position);
      genBgImg(styles, bgImg);
      genSize(styles, 'height', height);
      genSize(styles, 'width', width);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  HView.prototype.render = function () {
    var _a = this,
        styles = _a.styles,
        $slots = _a.$slots,
        classes = _a.classes;

    return h("div", {
      "staticClass": "h-view",
      "class": classes,
      "style": styles
    }, [$slots.default]);
  };

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HView.prototype, "position", void 0);

  __decorate([Prop({
    type: String,
    default: 'y'
  })], HView.prototype, "direction", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HView.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HView.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HView.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HView.prototype, "y", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HView.prototype, "bgImg", void 0);

  HView = __decorate([Component], HView);
  return HView;
}(Vue);

/* script */
var __vue_script__$2 = HView;
/* template */

/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-c93c1bba_0", {
    source: ".h-view {\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: stretch;\n  position: relative;\n  flex-direction: column;\n  overflow: hidden;\n}\n.h-view.--direction-x {\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n.h-view.--direction-y {\n    flex-direction: column;\n}\n\n/*# sourceMappingURL=view.vue.map */",
    map: {
      "version": 3,
      "sources": ["D:\\Projects\\mobov\\packages\\megh5\\packages\\ui\\src\\view\\view.vue", "view.vue"],
      "names": [],
      "mappings": "AACA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,sBAAA;EACA,gBAAA;AAAA;AARA;IAUA,mBAAA;IACA,eAAA;AAAA;AAXA;IAcA,sBAAA;AAAA;;ACAA,mCAAmC",
      "file": "view.vue",
      "sourcesContent": ["<style lang=\"scss\">\r\n  .h-view {\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    display: flex;\r\n    align-items: stretch;\r\n    position: relative;\r\n    flex-direction: column;\r\n    overflow: hidden;\r\n    &.--direction-x  {\r\n      flex-direction: row;\r\n      flex-wrap: wrap;\r\n    }\r\n    &.--direction-y  {\r\n      flex-direction: column;\r\n    }\r\n  }\r\n</style>\r\n<script lang=\"tsx\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'\r\nimport { positionType } from '../core/constants'\r\nimport { genBgImg, genSize, genPosX, genPosY, genPosition } from '../core/utils'\r\n\r\n@Component\r\nexport default class HView extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: String, default: 'y' })\r\n  direction!: 'x' | 'y'\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get classes () {\r\n    const { direction } = this\r\n\r\n    return {\r\n      [`--direction-${direction}`]: true\r\n    }\r\n  }\r\n\r\n  get styles (): any {\r\n    const { float, bgImg, height, width, x, y, position } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genBgImg(styles, bgImg)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'width', width)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n\r\n    return styles\r\n  }\r\n\r\n  render () {\r\n    const { styles, $slots, classes } = this\r\n\r\n    return (\r\n      <div staticClass=\"h-view\"\r\n        class={classes}\r\n        style={styles}>\r\n        {$slots.default}\r\n      </div>\r\n    )\r\n  }\r\n}\r\n</script>\r\n", ".h-view {\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: stretch;\n  position: relative;\n  flex-direction: column;\n  overflow: hidden; }\n  .h-view.--direction-x {\n    flex-direction: row;\n    flex-wrap: wrap; }\n  .h-view.--direction-y {\n    flex-direction: column; }\n\n/*# sourceMappingURL=view.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = undefined;
/* style inject SSR */

var HView$1 = normalizeComponent_1({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, browser, undefined);

HView$1.install = function (Vue) {
  Vue.component(HView$1.name, HView$1);
};

var HFooter =
/** @class */
function (_super) {
  __extends(HFooter, _super);

  function HFooter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HFooter.prototype, "viewTermsText", {
    get: function get() {
      return getStrValue(this, this.termsLink.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HFooter.prototype, "viewPolicyText", {
    get: function get() {
      return getStrValue(this, this.policyLink.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HFooter.prototype, "viewCopyright", {
    get: function get() {
      return getStrValue(this, this.copyright);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HFooter.prototype, "styles", {
    get: function get() {
      var _a = this,
          height = _a.height,
          bgImg = _a.bgImg;

      var styles = {};
      genBgImg(styles, bgImg);
      genSize(styles, 'height', height);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HFooter.prototype, "height", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HFooter.prototype, "bgImg", void 0);

  __decorate([Prop({
    type: String
  })], HFooter.prototype, "logo", void 0);

  __decorate([Prop({
    type: Object,
    default: function _default() {
      return {
        text: 'Terms Of Service',
        href: ''
      };
    }
  })], HFooter.prototype, "termsLink", void 0);

  __decorate([Prop({
    type: Object,
    default: function _default() {
      return {
        text: 'Privacy Policy',
        href: ''
      };
    }
  })], HFooter.prototype, "policyLink", void 0);

  __decorate([Prop({
    type: String,
    default: 'Copyright 2019 * Limited All right reserved'
  })], HFooter.prototype, "copyright", void 0);

  HFooter = __decorate([Component], HFooter);
  return HFooter;
}(Vue);

/* script */
var __vue_script__$3 = HFooter;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "h-footer",
    style: _vm.styles
  }, [_c("div", {
    staticClass: "h-footer-main"
  }, [_c("img", {
    staticClass: "h-footer__logo",
    attrs: {
      ondragstart: "return false",
      src: _vm.logo,
      alt: ""
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "h-footer__policy"
  }, [_c("a", {
    attrs: {
      href: _vm.termsLink.href
    }
  }, [_vm._v(_vm._s(_vm.viewTermsText))]), _vm._v(" / "), _c("a", {
    attrs: {
      href: _vm.policyLink.href
    }
  }, [_vm._v(_vm._s(_vm.viewPolicyText))])])]), _vm._v(" "), _c("div", {
    staticClass: "h-footer__copyright"
  }, [_vm._v("\n    " + _vm._s(_vm.viewCopyright) + "\n  ")])]);
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-03c91711_0", {
    source: ".h-footer {\n  width: 100%;\n  height: 100px;\n  background-color: black;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 2rem;\n  box-sizing: border-box;\n  font-size: 12px;\n}\n.h-footer .h-footer__logo {\n    user-select: none;\n    max-height: 50px;\n    max-width: 30%;\n}\n.h-footer .h-footer__copyright {\n    color: #916339;\n}\n.h-footer .h-footer-main {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    color: #cf9159;\n}\n.h-footer a {\n    text-decoration: none;\n    outline: none;\n    color: inherit;\n}\n\n/*# sourceMappingURL=footer.vue.map */",
    map: {
      "version": 3,
      "sources": ["D:\\Projects\\mobov\\packages\\megh5\\packages\\ui\\src\\footer\\footer.vue", "footer.vue"],
      "names": [],
      "mappings": "AAGA;EACA,WAAA;EACA,aAJA;EAKA,uBAAA;EACA,YAAA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;AAAA;AAVA;IAYA,iBAAA;IACA,gBAdA;IAeA,cAAA;AAAA;AAdA;IAiBA,cACA;AAAA;AAlBA;IAoBA,aAAA;IACA,mBAAA;IACA,8BAAA;IACA,cAAA;AAAA;AAvBA;IA0BA,qBAAA;IACA,aAAA;IACA,cAAA;AAAA;;ACJA,qCAAqC",
      "file": "footer.vue",
      "sourcesContent": ["<style lang=\"scss\">\r\n  $--footer-size: 100px;\r\n  $--footer-logo-size: 50px;\r\n  .h-footer {\r\n    width: 100%;\r\n    height: $--footer-size;\r\n    background-color: black;\r\n    color: white;\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    padding: 2rem;\r\n    box-sizing: border-box;\r\n    font-size: 12px;\r\n    .h-footer__logo {\r\n      user-select: none;\r\n      max-height: $--footer-logo-size;\r\n      max-width: 30%;\r\n    }\r\n    .h-footer__copyright {\r\n      color: #916339\r\n    }\r\n    .h-footer-main {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      color: #cf9159;\r\n    }\r\n    a {\r\n      text-decoration:none;\r\n      outline: none;\r\n      color: inherit;\r\n    }\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-footer\" :style=\"styles\">\r\n    <div class=\"h-footer-main\">\r\n      <img class=\"h-footer__logo\" ondragstart=\"return false\" :src=\"logo\" alt=\"\" />\r\n      <span class=\"h-footer__policy\">\r\n        <a :href=\"termsLink.href\">{{viewTermsText}}</a> / <a :href=\"policyLink.href\">{{viewPolicyText}}</a>\r\n      </span>\r\n    </div>\r\n    <div class=\"h-footer__copyright\">\r\n      {{viewCopyright}}\r\n    </div>\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genBgImg, genSize, getStrValue } from '../core/utils'\r\nimport { PropTypeLink } from '../core/constants'\r\n\r\n@Component\r\nexport default class HFooter extends Vue {\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  @Prop({ type: String })\r\n  logo!: string\r\n\r\n  @Prop({ type: Object, default: () => ({ text: 'Terms Of Service', href: '' }) })\r\n  termsLink!: PropTypeLink\r\n\r\n  @Prop({ type: Object, default: () => ({ text: 'Privacy Policy', href: '' }) })\r\n  policyLink!: PropTypeLink\r\n\r\n  @Prop({ type: String, default: 'Copyright 2019 * Limited All right reserved' })\r\n  copyright!: string\r\n\r\n  get viewTermsText () {\r\n    return getStrValue(this, this.termsLink.text)\r\n  }\r\n\r\n  get viewPolicyText () {\r\n    return getStrValue(this, this.policyLink.text)\r\n  }\r\n\r\n  get viewCopyright () {\r\n    return getStrValue(this, this.copyright)\r\n  }\r\n\r\n  get styles (): any {\r\n    const { height, bgImg } = this\r\n    const styles = {}\r\n\r\n    genBgImg(styles, bgImg)\r\n    genSize(styles, 'height', height)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n", ".h-footer {\n  width: 100%;\n  height: 100px;\n  background-color: black;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 2rem;\n  box-sizing: border-box;\n  font-size: 12px; }\n  .h-footer .h-footer__logo {\n    user-select: none;\n    max-height: 50px;\n    max-width: 30%; }\n  .h-footer .h-footer__copyright {\n    color: #916339; }\n  .h-footer .h-footer-main {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    color: #cf9159; }\n  .h-footer a {\n    text-decoration: none;\n    outline: none;\n    color: inherit; }\n\n/*# sourceMappingURL=footer.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject SSR */

var HFooter$1 = normalizeComponent_1({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, browser, undefined);

HFooter$1.install = function (Vue) {
  Vue.component(HFooter$1.name, HFooter$1);
};

var GIFT = 'data:image/png;base64,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';
var BG = 'data:image/png;base64,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';

var HPromoCode =
/** @class */
function (_super) {
  __extends(HPromoCode, _super);

  function HPromoCode() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HPromoCode.prototype, "viewLabel", {
    get: function get() {
      return getStrValue(this, this.label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HPromoCode.prototype, "viewCode", {
    get: function get() {
      return getStrValue(this, this.code);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HPromoCode.prototype, "float", {
    get: function get() {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HPromoCode.prototype, "styles", {
    get: function get() {
      var _a = this,
          bgImg = _a.bgImg,
          x = _a.x,
          y = _a.y,
          height = _a.height,
          width = _a.width,
          float = _a.float,
          position = _a.position;

      var styles = {};
      genPosition(styles, position);
      genBgImg(styles, bgImg);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      genSize(styles, 'height', height);
      genSize(styles, 'width', width);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HPromoCode.prototype, "position", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: '100%'
  })], HPromoCode.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HPromoCode.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HPromoCode.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HPromoCode.prototype, "y", void 0);

  __decorate([Prop({
    type: String,
    default: 'Code'
  })], HPromoCode.prototype, "label", void 0);

  __decorate([Prop({
    type: String,
    default: '10086'
  })], HPromoCode.prototype, "code", void 0);

  __decorate([Prop({
    type: String,
    default: GIFT
  })], HPromoCode.prototype, "gift", void 0);

  __decorate([Prop({
    type: String,
    default: BG
  })], HPromoCode.prototype, "bgImg", void 0);

  HPromoCode = __decorate([Component], HPromoCode);
  return HPromoCode;
}(Vue);

/* script */
var __vue_script__$4 = HPromoCode;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "h-promo-code",
    style: _vm.styles
  }, [_c("div", {
    staticClass: "h-promo-code-label"
  }, [_c("img", {
    staticClass: "h-promo-code__gift",
    attrs: {
      ondragstart: "return false",
      src: _vm.gift,
      alt: ""
    }
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.viewLabel))])]), _vm._v(" "), _c("div", {
    staticClass: "h-promo-code__codes"
  }, [_vm._v("\n    " + _vm._s(_vm.viewCode) + "\n  ")])]);
};

var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0ab5e631_0", {
    source: ".h-promo-code {\n  width: auto;\n  height: 100px;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 20px;\n  box-sizing: border-box;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n}\n.h-promo-code .h-promo-code__codes {\n    flex-grow: 1;\n    font-weight: 700;\n    font-size: 20px;\n    overflow-x: auto;\n    color: #ff5a00;\n    margin: 0 .5rem;\n}\n.h-promo-code .h-promo-code-label {\n    display: flex;\n    align-items: center;\n    color: #d6c29b;\n    font-size: 16px;\n}\n.h-promo-code .h-promo-code__gift {\n    height: 50px;\n    width: 50px;\n}\n\n/*# sourceMappingURL=promo-code.vue.map */",
    map: {
      "version": 3,
      "sources": ["D:\\Projects\\mobov\\packages\\megh5\\packages\\ui\\src\\promo-code\\promo-code.vue", "promo-code.vue"],
      "names": [],
      "mappings": "AAGA;EACA,WAAA;EACA,aAJA;EAKA,YAAA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;AAAA;AAXA;IAaA,YAAA;IACA,gBAAA;IACA,eAAA;IACA,gBAAA;IACA,cAAA;IACA,eAAA;AAAA;AAlBA;IAqBA,aAAA;IACA,mBAAA;IACA,cAAA;IACA,eAAA;AAAA;AAxBA;IA2BA,YAAA;IACA,WAAA;AAAA;;ACHA,yCAAyC",
      "file": "promo-code.vue",
      "sourcesContent": ["<style lang=\"scss\">\r\n  $--footer-size: 100px;\r\n  $--footer-logo-size: 50px;\r\n  .h-promo-code {\r\n    width: auto;\r\n    height: $--footer-size;\r\n    color: white;\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    padding: 20px;\r\n    box-sizing: border-box;\r\n    font-size: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    .h-promo-code__codes {\r\n      flex-grow: 1;\r\n      font-weight: 700;\r\n      font-size: 20px;\r\n      overflow-x: auto;\r\n      color: #ff5a00;\r\n      margin: 0 .5rem;\r\n    }\r\n    .h-promo-code-label {\r\n      display: flex;\r\n      align-items: center;\r\n      color: #d6c29b;\r\n      font-size: 16px;\r\n    }\r\n    .h-promo-code__gift {\r\n      height: 50px;\r\n      width: 50px;\r\n    }\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-promo-code\" :style=\"styles\">\r\n    <div class=\"h-promo-code-label\">\r\n      <img class=\"h-promo-code__gift\" ondragstart=\"return false\" :src=\"gift\" alt=\"\" />\r\n      <span>{{viewLabel}}</span>\r\n    </div>\r\n    <div class=\"h-promo-code__codes\">\r\n      {{viewCode}}\r\n    </div>\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genBgImg, genPosX, genPosY, genSize, getStrValue, genPosition } from '../core/utils'\r\nimport { positionType } from '../core/constants'\r\n\r\nconst GIFT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABdCAMAAAAbmCHyAAAClFBMVEUAAADNPSnqxl+MLxTxuJeFGxfovDnopVt6FRPZjG/64Jh0ERDTSTDerB725pZxEA6/Kh93EQ/45NScLxx6Ew56Eg7QNSXhrR/ovC7qwTLnvTn88JnbqiXkxWHlnobJmifzzbngrh3y2m7hUjXPRS23Phvv1GLltSCvaBfTdl7CfCeRGhJzFBTuxzuCVAi0cB/5457v2oHt2YhsFBPktoD11UN+FxbYQCvwzTzDdir88rD04HO1XSX887+nIBf77Je2ijRQCgp6GBioNiDMlB6LWwbdrnDAMSGjbg2cKB7VY0P78LC+cCd5FxfKhC10FhZuFRR+GBfsvzDIgCvOiC3NNCblsDDouS/DKiDuxTHIKyGBGhfYUze8QSzdRzCGGheRJxnVPyvSOyrhqC/AJx+SHhmKGxjLSS/OLiPSji20Jh3cny/Uky6MIBqBIRfCRy/XmC6vOx26QBlnFBLdWDm5KB7iUjX++MTXQi6bHRihMRinNh1tDBG5MCG2Ph7HPy3SSzOZMBnnWjnxyjLdQC2GJxX764ZiDxFaDxDTNSfOUDWTPxiaKRqcPhzKkhX88qr775eUNxvEixKeLB+2fxCdaxD887bNQiytMyV2Hxb/+9jYUTG/QhuiIhqocw/34360OynQmReVKxWtJBvet0DfrSLgqBeNNha+gw+SDAlMBgb55W7owDnWqC/bOirRmx+KWwtEBQXw1GH44V7z1FHjSjPFNCXYohnow0mmeR6TYQyEDAnIUia2HRjQey7DRyXy0ETEnkLEXTTOVyuzjDPJdyzw13LibU3oOSzYMSXKhCTntiC7jB53CAe7WEbgYEC0WiTNakqgTSqtUyOrYyDlfVx4TwqrGRbJqV3CchzZghFhPQP2UXknAAAATXRSTlMAHgsR+2sbLiP+LKGzOf431Lwann1SyMNM6J2Gfv79/Ozn3NPTqH1hU/3e2NNr+5pjQ/r08d/ax8PCvaAy8uzWs+/o4NPSzMe/vrSmfnD0m1UAAAzuSURBVGje7JS9auNAAISNAgoYrOIa/2PiwjYHzl9lYkKuuEAgnQsveZJ9gy13hZC3UKFFIBmBJGQkgWRXNhg3Vu3nuVV8yeWO/MmQ7qaWvh1mZrfwX4fpvC4Uvk4XEr0qFr5KYpvSTbtS+BoJQ0pZ4p30PzDRaByE71BNapp+DBrvwTvt5KR0SPDXmhSYnu8Dt/vWN0fdtgZDUDsg+BuNbDI69kH1DXuVsqRpEEXV3PaFew1uEs83fAMbYCC+GnoTQkI16ixrefdbf6LHlsX5tVes/9xAKMsyIShyK3lrhRvX87FhgdHIUjDo/2u9lmbeEUL8hNAt57JfkSDL6NiYbkcPILaN6vHf9EG6IpDKCDHOd0ZWN5d5iY0NI55OpzH2t8DCdjx46U8YqCmjhMMdB8kEudsTMU+xHcAb5XTDUGzFt2LFtvovm/H0JpGR4wQBx1PIHkb57lZDVdW5rk8muq6qClZUpfrn9Sm2VY8h5ESmGUiEQg3KYTVfu73bxWyvyV7p8DmemtcKGIu8dHXJ683WQ0nw1K7wuZaP73R9Pl+vV5nW61Sf/OhlT3S9U2vprchJsL66vGyaJgBjN2Lt7h4rlj45ootq4rrueGyazQDJKPDUVn9ICIGUmS2wxIv5aq3aCsa8nnJH/G3qY/q3i/P6/dXNDXOWfDO2wqP3E8T3YY0chFiYDT1OZ7MFD27OC/p+1nuEiwWh9D5dKJ7Xr641CCElEgvGnG7vDRqJTJJ4GYYsCVEIFH2y2O12p6ezu97R/t9uSSy9P8/ikCECNQ1movImsThYzRJQdB1HyAUhH6MZJgrebo3J7vT2rPR8jcuVj4IpVvqZ+UdBLoKiX4TX/WsScRwH8J5oGD3RA1HUakHUiKKH9WsURD8EkbvAm+uODpTsYd7pNGJ36Tzk2HBnsJm1lZW5bD2NahNqViJGBCvnbD33z/T+fr8aaUJv5p27ea/P5/u97x2TvwsfQbfZj+N3M48fT24eT8efxa/ezj47tHfVkiVLmpqalm1ct257g9Ybzc/Go5v2keVMC2AI98Y3D5HbYCqbvTqU5j/E4x/sU7ufZeND67ceQNa3tLT8D1+8ZFUlCxY0HSIn01V5j2Q8neaf5DP5D7e//srexjh+5NJp+sj4+fPF3SsPho6s+99Ndex9q6V50RaWtu/fsdSnpuJT2TFjbGxwIBr9NDc3OzcwNhgdlIxTxWJqdvopKUBqvGjZsGtZEyapGrxfVXcZlt4M3bwp+EvvkTY8T+5gCS6/1paMlMutra0Wi6UZWUTT3GyxtM4ghULh5WQmH0bu8xOL/k7b0T21vN8vIKSEP8fZOc4eDmeWz4RKpVIkQop+IbGwgC+XZwqKODxz49K1a3i4ZSYdr9++fVuYmy3QlMvHavmSHxEQv/COt7M8UXDIpQi0cMiFSNYTZ0xTNSUplVKDWurT8smJiUwmn897AolEt6p2syQS22r4beia+RExZ2N6mPDQadWIQnjdN+JOmaqqpkj01KeJcOWzXV7oeFVSxy9VIpSH7spd4NgpnEh7ZzrlY/KIbJoxVYMvGQbhaezhc16i/+GDdbygRASMALqQ89gYzweVP73TuDS3LBuYHfiSgUTzkDEALnxOhU7CdG8dX4qISoTqoZzHwbHuoyLTXRQXFSEmuyVDgq/pBuXtsKFz9mlDY5NO9X94NA4BOuFtjOejIYHqoog/iWIoFJNlifixlIS9ITGeI7zkDQa7E90JbIN4W88TRROFGt4bojpsEhfjzZRBaayeKo9MY0RQKY4EV//Di1pSARHKXbDxjNdCITYzFd1lypgdE1sDvqYSHnSFh+9lPFLH4/INJ8EohHdU+esgITOdrHvwaFsegR/TNDPKkdZ5yuuqTn1vw+4joKHAB2+jNy7hlapO0kt4vGT4kh5TYxWe57npmKrruqqhQiMea4ZJSZHyCPheMYngGHpHFMKDJsEgdPNvXoNPC2gNJkeM+IWK/87jsPGUV5OV9JLWFZcokcYR4DK5uJTnCX/S1DQd9xodQNCr1fI7Vh8MBALDNO88Fyq8zg4kxV4W8Ex3S9R3D/7Nw5eQmIZx7FxT901j50PkFcnsH16KUb6iu8DDRohuwneje/yfY8PHf5w+gzva6vP5+vFzeO3CWn7+yjfIN1JiDryN8kaRlOvpuXVrdHg4IPYGZOuI1Yq5P460W/v6BzjgJNzn548ePUfY7vCKefW8s6Ozs9M5Otoz6/FUeAnV6JiKxeLly3jhbAIg2GEzxtmq/KM+xOfrs6Jq3/4GvLOjw+l0jn573QWeh8+rb5wIGVVPD60Dsp+ESFZAA6R5hwNL4XO/tf1U+6kTVsTX34C/CJ2UePO6q6vK49cOUvX8+fMXOzvPdrT/bs/+XZsI4ziOKyIUHLT44x/QQVRwEBRBHHQQwcvlMCdHTy9emlwvTU8r9UKqqakS0FgdSocM1SmDW7dmUXEQwW6igv+O7+/zXHOnOQXR0Y9tlba+nm8/z/PEBIumjqHSzvCsZ1mm4CSHVzYFOfDT2zwrxlWth2HouMWMbprtFa3jf31cXCgmetG4kMuDk/cp70yhx0onYRU+1X/i6epxolt5PJkKf+SlmHgw0LozRTlGRs/yn9ps6RPlG5ZxeiK/HCoQvpHhB/CO6I7q3kh1ePSEt4pqz2X2XJ7hiJq+nvAP3zrO7OxgVlpzEj6jw4veaDSmp7+0i9o3XMuycngZXPlvUn4Qx/RedXRstjarax4d/7P0Al+0JCfG+EMhmUJ/+054Hkfgv72U3kMqkuLgU53fFI89zzv8Au3TzW94djZ+y/TcK8XLw4F8tkrgh65hbft8MOBFl6zwUKNOJrhh5PMknq2+qdfnp0f8rAOvL5w9LNNsOj/8NHrKG67B9EYu3xO9Gjspfw1+No6r6tgoPjJc10jbH/FzcyscGlMmV5ncNc73eqEDVaUcDj71XHsoepycevhOxGzQ2lA8NKnXV9hVPodv/oK3e+wsF4vpOfjC38Mm2td8IiudchoJX1p5TO96URYZ58/4Nifbtu1wpl6vN6bhp++EDrj2id0f8YJoXuullbZlcGz02m7O9BtDB5yGNM/48GE88sOw0g+YLPH5oHm+G/55m68wPzjZs2OMHw5F13xpnouo+CntD+IwtFsz6OnRhF9tzGV4V/nEHOcvLdkV4lfCmVK9NAc/3bhDWYkv59N/yrkjyfGAf5UMr3iCb6EXc/ihjU16M3x3fZ6L3nhgE/Fj4titp7cYL8EtxTcSnu51L/rflLxyKr7vC/++RObw5x+E2o+X+BUP4c1t3+UCmI9l+pLwhdW26ouTz/A55ZxBV7z9ppT4c0yv4iyp9J9GpiHXHp2YRc2TQmGljQ7vql3P4b1Wq1Uhw3eKr8/NlxK+l/idGQ6m8sHL/AEeXXimF53IGrm815Lxh8N3hcRPeE6TrfnbkWXhm265jC58Mrzwia4O14Ex/vCmjO93OsOZQokFqLQAjy68nUzPkw1ZQXSykOWxpXZLsnuc9wh6p7JekLACfKIT3T2t0IxUZGpe6ZrX9+p3fL/T6bdG/NUXlQp0BZwddxx4i1pYorggerH9Sg9/tXB1lbFV72pjxvkjovc7fc+DV4H3fWxwlaHigyCQZhaEt1brMvpV4bUuZyqf9z2/3/e9LP+u20181vFbywlvqWdL7LC7Wkp5g6h9yef7vt/3m81mlvdGPPGaTyPRqV78YjnK8lqnfvw8/gZ+M+VJhm8Rr3k9cpkdh+apOSqvoie8qXDtl/N4xnsEv5nl5aKxQN8XfvNuZDA7oWY3sKwM/8p04Qkb4wY5fGe5+Ujxd6+OeC6C8is073mb6xEuNj4l4Wd42VN1m9mavHLW0YVv3uXbU158dMV7EaUb4ge1mviv0nIsZN7U5hRzzj04ej7vJ3xN9tQ00EkUsLVK3+aJ8JGbx9M8Nm8fxOdd8wSb6rsf/Zp6gYAeiR+4z0f8Q23zAi7ii3n8+jq8NARPhEdtdYkn6W7YNXVny9Daz/IBPLq8ZnyWyy9L/Vn+DWjLh5diPH/LrgWLi2VKiMRfrNUSviB8hE8xa2vP1tbG+Il9y/3l9UfjfNf34cXvwdcWF2tlUlMJMnzAiui1NTLO7zowefzmYKn/QznvNz1G39joepubnt/bCl8uSoJtvwyPnvCqsptrFy/vPzCR8z+AE3sPHthz/PzsjZRvMr3m+SG2hM/6Qfk5MCmUhL95/PL+3QfP7dyVmnmL7D559pj6O4W7TabG73bRN7Y+bmn+Jb4ckSi4X9Bbe+ws8MSuHDh/kXNHr7DIxcHS0Gb4j/wEBF7phMndgO6PHTt78srRc7h/np3S1uTx8/IKpbfxkQxesoAcmeDUick9B6jiT+H8LZk8vfi2OuXUXvMsSeCDeyfG4L9fZHIPFQP/z7/IdxSpKsX9iZ2gAAAAAElFTkSuQmCC'\r\nconst BG = 'data:image/png;base64,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'\r\n\r\n@Component\r\nexport default class HPromoCode extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: [Number, String], default: '100%' })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: String, default: 'Code' })\r\n  label!: string\r\n\r\n  @Prop({ type: String, default: '10086' })\r\n  code!: string\r\n\r\n  @Prop({\r\n    type: String,\r\n    default: GIFT\r\n  })\r\n  gift!: string\r\n\r\n  @Prop({\r\n    type: String,\r\n    default: BG\r\n  })\r\n  bgImg!: string\r\n\r\n  get viewLabel () {\r\n    return getStrValue(this, this.label)\r\n  }\r\n\r\n  get viewCode () {\r\n    return getStrValue(this, this.code)\r\n  }\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get styles (): any {\r\n    const { bgImg, x, y, height, width, float, position } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genBgImg(styles, bgImg)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'width', width)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n", ".h-promo-code {\n  width: auto;\n  height: 100px;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 20px;\n  box-sizing: border-box;\n  font-size: 12px;\n  display: flex;\n  align-items: center; }\n  .h-promo-code .h-promo-code__codes {\n    flex-grow: 1;\n    font-weight: 700;\n    font-size: 20px;\n    overflow-x: auto;\n    color: #ff5a00;\n    margin: 0 .5rem; }\n  .h-promo-code .h-promo-code-label {\n    display: flex;\n    align-items: center;\n    color: #d6c29b;\n    font-size: 16px; }\n  .h-promo-code .h-promo-code__gift {\n    height: 50px;\n    width: 50px; }\n\n/*# sourceMappingURL=promo-code.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject SSR */

var HPromoCode$1 = normalizeComponent_1({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, browser, undefined);

HPromoCode$1.install = function (Vue) {
  Vue.component(HPromoCode$1.name, HPromoCode$1);
};

var HText =
/** @class */
function (_super) {
  __extends(HText, _super);

  function HText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HText.prototype, "viewText", {
    get: function get() {
      return getStrValue(this, this.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HText.prototype, "float", {
    get: function get() {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HText.prototype, "styles", {
    get: function get() {
      var _a = this,
          height = _a.height,
          width = _a.width,
          ellipsis = _a.ellipsis,
          fontSize = _a.fontSize,
          position = _a.position,
          x = _a.x,
          y = _a.y,
          float = _a.float;

      var styles = {};
      genPosition(styles, position);
      genEllipsis(styles, ellipsis);
      genSize(styles, 'width', width);
      genSize(styles, 'height', height);
      genSize(styles, 'fontSize', fontSize);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HText.prototype, "position", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 50
  })], HText.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HText.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 12
  })], HText.prototype, "fontSize", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HText.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HText.prototype, "y", void 0);

  __decorate([Prop({
    type: Number,
    default: 0
  })], HText.prototype, "ellipsis", void 0);

  __decorate([Prop({
    type: String,
    default: '内容'
  })], HText.prototype, "text", void 0);

  HText = __decorate([Component], HText);
  return HText;
}(Vue);

/* script */
var __vue_script__$5 = HText;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "h-text",
    style: _vm.styles
  }, [_vm._v("\n  " + _vm._s(_vm.viewText) + "\n")]);
};

var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-e2ae0278_0", {
    source: ".h-text[data-v-e2ae0278] {\n  background-repeat: no-repeat;\n}\n\n/*# sourceMappingURL=text.vue.map */",
    map: {
      "version": 3,
      "sources": ["D:\\Projects\\mobov\\packages\\megh5\\packages\\ui\\src\\text\\text.vue", "text.vue"],
      "names": [],
      "mappings": "AACA;EACA,4BAAA;AAAA;;ACCA,mCAAmC",
      "file": "text.vue",
      "sourcesContent": ["<style lang=\"scss\" scoped>\r\n  .h-text {\r\n    background-repeat: no-repeat;\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-text\" :style=\"styles\">\r\n    {{viewText}}\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genSize, genEllipsis, getStrValue, genPosition, genPosX, genPosY } from '../core/utils'\r\nimport { positionType } from '../core/constants'\r\n\r\n@Component\r\nexport default class HText extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: [Number, String], default: 50 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 12 })\r\n  fontSize!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: Number, default: 0 })\r\n  ellipsis!: number\r\n\r\n  @Prop({ type: String, default: '内容' })\r\n  text!: string\r\n\r\n  get viewText () {\r\n    return getStrValue(this, this.text)\r\n  }\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get styles (): any {\r\n    const { height, width, ellipsis, fontSize, position, x, y, float } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genEllipsis(styles, ellipsis)\r\n    genSize(styles, 'width', width)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'fontSize', fontSize)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n", ".h-text {\n  background-repeat: no-repeat; }\n\n/*# sourceMappingURL=text.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = "data-v-e2ae0278";
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject SSR */

var HText$1 = normalizeComponent_1({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, browser, undefined);

HText$1.install = function (Vue) {
  Vue.component(HText$1.name, HText$1);
};



var components = /*#__PURE__*/Object.freeze({
    HApp: HApp$1,
    HButton: HButton$1,
    HView: HView$1,
    HFooter: HFooter$1,
    HPromoCode: HPromoCode$1,
    HText: HText$1
});

var Mode;

(function (Mode) {
  Mode["light"] = "light";
  Mode["night"] = "night";
})(Mode || (Mode = {}));

var UiMode;

(function (UiMode) {
  UiMode["x"] = "x";
  UiMode["y"] = "y";
  UiMode["xy"] = "xy";
  UiMode["none"] = "none";
})(UiMode || (UiMode = {}));

var index$1 = /*#__PURE__*/Object.freeze({
    get Mode () { return Mode; },
    get UiMode () { return UiMode; }
});

var MegH5 = {
  installed: false,
  install: function install(Vue, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (MegH5.installed) {
      return;
    }

    MegH5.installed = true;
    var componentsList = opts.components || components;
    Object.values(componentsList).forEach(function (entry) {
      Vue.use(entry);
    });
  },
  version: '1.0.0'
};

export default MegH5;
export { index$1 as Constants, HApp$1 as HApp, HButton$1 as HButton, HFooter$1 as HFooter, HPromoCode$1 as HPromoCode, HText$1 as HText, HView$1 as HView, loader as Loader, index as Utils };
