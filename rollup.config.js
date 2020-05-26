import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import { terser } from "rollup-plugin-terser";

const { PRODUCTION } = process.env;

export default {
  input: 'sources/index.js',
  output: {
    file: 'docs/speedDial.min.js',
    format: 'iife',
    name: 'SpeedDial',
    sourcemap: PRODUCTION ? false : true
  },
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    terser(),
    postcss({
      extract: 'speedDial.min.css'
    }),
    copy({
      targets: [
        { src: 'sources/index.html', dest: 'docs/' }
      ]
    }),
    (PRODUCTION && del({ targets: 'docs/*' })),
    (!PRODUCTION && serve({ open: true, contentBase: 'docs' })),
    (!PRODUCTION && livereload())
  ]
};