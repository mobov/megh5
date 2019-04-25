/* eslint-disable */
export default {
  "name": "megh5-project",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "serve": "cross-env  ENV=development vue-cli-service serve",
    "build:production": "cross-env  ENV=production vue-cli-service build",
    "build:debug": "cross-env  ENV=debug vue-cli-service build",
    "i18n": "onemt-i18n --config=./config/i18n.js"
  },
  "dependencies": {
    "@megh5/ui": "^0.2.8",
    "@mobov/es-helper": "^1.0.10",
    "@mobov/scss-helper": "^0.0.5",
    "core-js": "^2.6.5",
    "fastclick": "^1.0.6",
    "vue": "^2.6.6",
    "vue-class-component": "^7.0.1",
    "vue-i18n": "^7.8.0",
    "vue-property-decorator": "^7.3.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.5.0",
    "@vue/cli-service": "^3.5.0",
    "cross-env": "^5.2.0",
    "fibers": "^3.1.1",
    "sass": "^1.17.2",
    "sass-loader": "^7.1.0",
    "vue-template-compiler": "^2.5.21"
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
