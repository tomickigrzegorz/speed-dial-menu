import serve from 'rollup-plugin-serve';
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const { PRODUCTION } = process.env;

export default {
  input: 'sources/index.js',
  output: {
    file: pkg.main,
    format: 'iife',
    name: 'SpeedDial',
    sourcemap: !PRODUCTION
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    terser(),
    !PRODUCTION && serve({ open: true, contentBase: 'docs' }),
    !PRODUCTION && livereload()
  ]
};