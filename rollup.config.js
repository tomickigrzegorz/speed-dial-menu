import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import compiler from '@ampproject/rollup-plugin-closure-compiler';

const { PRODUCTION } = process.env;

export default {
  input: 'sources/index.js',
  output: {
    file: 'docs/speedDial.min.js',
    format: 'iife',
    name: 'SpeedDial'
  },
  plugins: [
    compiler({
      languageIn: 'ECMASCRIPT6',
      language_out: 'ECMASCRIPT5',
      compilation_level: 'ADVANCED',
      externs: './sources/externs/externs.js'
    }),
    postcss({
      extract: 'speedDial.min.css'
    }),
    copy({
      targets: [
        { src: 'sources/index.html', dest: 'docs/' }
      ]
    }),
    (!PRODUCTION && serve({ open: true, contentBase: 'docs' })),
    (!PRODUCTION && livereload())
  ]
};