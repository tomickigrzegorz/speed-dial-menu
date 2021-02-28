import serve from 'rollup-plugin-serve';
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const { PRODUCTION } = process.env;

const plugins = () => {
  return [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    PRODUCTION && terser(),
    !PRODUCTION && serve({ open: true, contentBase: 'docs' }),
    !PRODUCTION && livereload()
  ]
};

export default [
  {
    input: 'sources/js/index.js',
    output: {
      file: pkg.main,
      format: 'iife',
      name: 'SpeedDial'
    },
    plugins: plugins()
  },
  {
    input: 'sources/js/index.js',
    watch: false,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'SpeedDial'
    },
    plugins: plugins()
  }
];