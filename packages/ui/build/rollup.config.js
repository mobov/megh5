import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const buildType = process.env.MODULE

export default {
  input: 'src/index.ts',
  output: {
    file: `lib/index.${buildType}.js`,
    format: buildType,
    name: 'Megh5UI',
  },
  plugins: [
    typescript({
      objectHashIgnoreUnknownHack: true,
      rollupCommonJSResolveHack: true,
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
    babel({
      presets: ['@vue/babel-preset-jsx'],
      extensions: ['.js', '.ts', '.tsx']
    }),
    vue(),
    sass(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js', '.ts', '.tsx'],
    }),
    commonjs({extensions: ['.js', '.ts', '.tsx']})
  ]
}
