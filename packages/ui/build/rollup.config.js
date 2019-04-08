import { merge }  from 'lodash'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import packages from '../package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue']
const external = Object.keys(packages.dependencies)
const name = 'Megh5UI'

const baseConfig = {
  input: 'src/index.ts',
  output: {
    name,
  },
  plugins: [
    postcss({ extensions: ['.scss'], extract: `lib/style.css` }),
    typescript({
      importHelpers: true,
      // objectHashIgnoreUnknownHack: true,
      /// rollupCommonJSResolveHack: true,
      tsconfig: 'tsconfig.json',
      clean: true,
      // rootDir: './src',
      // declarationDir: './types/',
      useTsconfigDeclarationDir: true,
      extensions
    }),
    vue(),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [
        '@babel/preset-env',
        '@vue/babel-preset-jsx',
        // '@babel/preset-typescript',
        // 'es2015-rollup',
      ],
      extensions,
      exclude: 'node_modules/**'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions
    }),
    commonjs({
      extensions
    })
  ]
}

export default [
  merge(baseConfig, {
    output: [{
      file: `lib/index.esm.js`,
      format: 'esm',
      exports: 'named'
    },{
      file: `lib/index.cjs.js`,
      format: 'cjs',
      exports: 'named'
    }],
    external
  })
]
