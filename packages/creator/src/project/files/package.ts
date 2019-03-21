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
    '@megmore/es-helper': '^0.0.31',
    '@megmore/scss-helper': '^0.0.4',
    'fastclick': '^1.0.6',
    'onemt-lang-adaptor': '^0.1.0',
    'onemt-statist-report': '^0.1.7',
    'vue-class-component': '^7.0.1',
    'vue-property-decorator': '^7.3.0',
    'vue': '^2.5.16',
    'vue-i18n': '^7.8.0'
  },
  'devDependencies': {
    '@vue/cli-plugin-babel': '^3.2.0',
    '@vue/cli-plugin-eslint': '^3.2.0',
    '@vue/cli-plugin-unit-jest': '^3.2.0',
    '@vue/cli-service': '^3.2.0',
    '@vue/eslint-config-standard': '^4.0.0',
    'autoprefixer': '^8.6.2',
    'babel-plugin-import': '^1.8.0',
    'chai': '^4.1.2',
    'copy-webpack-plugin': '^4.5.2',
    'cross-env': '^5.1.6',
    'cssnano': '^3.10.0',
    'got': '8.3.1',
    'gulp': '^3.9.1',
    'gulp-smushit': '^1.2.0',
    'http-proxy-middleware': '^0.18.0',
    'node-sass': '^4.9.1',
    'onemt-i18n-to-json-cli': '^0.0.26',
    'postcss-aspect-ratio-mini': '^0.0.2',
    'postcss-cssnext': '^3.1.0',
    'postcss-import': '^11.1.0',
    'postcss-loader': '2.1.6',
    'postcss-px-to-viewport': '^0.0.3',
    'postcss-url': '^7.3.2',
    'postcss-write-svg': '^3.0.1',
    'sass-loader': '^7.0.1',
    'vue-template-compiler': '^2.5.16',
    'webpack-bundle-analyzer': '^3.0.3'
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
