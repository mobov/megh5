export default {
  'name': 'megh5-project',
  'version': '0.0.1',
  'private': true,
  'scripts': {
    'serve': 'cross-env  ENV=development vue-cli-service serve',
    'build:production': 'cross-env  ENV=production vue-cli-service build',
    'build:debug': 'cross-env  ENV=debug vue-cli-service build',
    'i18n': 'onemt-i18n --config=./config/i18n.js'
  },
  'dependencies': {
    "@megmore/es-helper": "^0.0.31",
    "@megmore/scss-helper": "^0.0.4",
    "fastclick": "^1.0.6",
    "vue-class-component": "^7.0.1",
    "vue-property-decorator": "^7.3.0",
    "vue": "^2.5.16",
    "vue-i18n": "^7.8.0"
  },
  'devDependencies': {
    "@vue/cli-plugin-babel": "^3.4.0",
    "@vue/cli-plugin-eslint": "^3.4.0",
    "@vue/cli-plugin-typescript": "^3.4.0",
    "@vue/cli-service": "^3.4.0",
    "@vue/eslint-config-standard": "^4.0.0",
    "@vue/eslint-config-typescript": "^4.0.0",
    "babel-eslint": "^10.0.1",
    "cross-env": "^5.1.6",
    "eslint": "^5.8.0",
    "eslint-plugin-vue": "^5.0.0",
    "fibers": "^3.1.1",
    "sass": "^1.16.0",
    "sass-loader": "^7.1.0",
    "typescript": "~3.2.2",
    "vue-template-compiler": "^2.6.7"
  },
  'eslintConfig': {
    'root': true,
    'env': {
      'node': true
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/airbnb'
    ],
    'rules': {},
    'parserOptions': {
      'parser': 'babel-eslint'
    }
  },
  'postcss': {
    'plugins': {
      'autoprefixer': {}
    }
  },
  'browserslist': [
    '> 1%',
    'last 2 versions',
    'not ie <= 8'
  ]
}
