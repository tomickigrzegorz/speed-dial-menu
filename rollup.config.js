import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import cleanup from "rollup-plugin-cleanup";

import pkg from "./package.json";

const { PRODUCTION } = process.env;
const input = "sources/js/index.js";

const targets = {
  targets: {
    browsers: ["defaults", "not IE 11", "maintained node versions"],
  },
};

const targetsIE = {
  targets: {
    browsers: [">0.2%", "not dead", "not op_mini all"],
  },
};

const compressTarget = (type, console = true) => {
  return {
    mangle: type ? false : true,
    output: {
      beautify: type,
    },
    compress: { drop_console: console, drop_debugger: console },
  };
};

const pluginsConfig = (target) => [
  babel({
    babelHelpers: "bundled",
    presets: [
      [
        "@babel/preset-env",
        {
          // debug: true,
          // useBuiltIns: 'usage',
          useBuiltIns: "entry",
          corejs: 3,
          loose: true,
          ...target,
        },
      ],
    ],
  }),
  cleanup(),
];

export default [
  {
    input,
    plugins: pluginsConfig(targets),
    watch: false,
    output: {
      name: "SpeedDial",
      format: "iife",
      file: pkg.main,
      sourcemap: true,
      plugins: [terser(compressTarget(true))],
    },
  },
  {
    input,
    plugins: pluginsConfig(targets),
    watch: false,
    output: {
      name: "SpeedDial",
      format: "iife",
      sourcemap: false,
      file: "dist/js/speed-dial.min.js",
      plugins: [terser(compressTarget(false))],
    },
  },
  {
    input,
    plugins: pluginsConfig(targets),
    output: {
      name: "SpeedDial",
      format: "iife",
      sourcemap: true,
      file: "docs/speed-dial.min.js",
      plugins: [
        terser(compressTarget(true, false)),
        !PRODUCTION && serve({ open: true, contentBase: ["docs"] }),
        !PRODUCTION && livereload(),
      ],
    },
  },
  {
    input,
    plugins: pluginsConfig(targets),
    watch: false,
    output: [
      {
        name: "SpeedDial",
        format: "umd",
        sourcemap: true,
        file: "dist/js/speed-dial.umd.js",
        plugins: [terser(compressTarget(true))],
      },
      {
        name: "SpeedDial",
        format: "umd",
        sourcemap: false,
        file: "dist/js/speed-dial.umd.min.js",
        plugins: [terser(compressTarget(false))],
      },
    ],
  },
  {
    input,
    plugins: pluginsConfig(targets),
    watch: false,
    output: [
      {
        name: "SpeedDial",
        format: "es",
        sourcemap: true,
        file: "dist/js/speed-dial.esm.js",
        plugins: [terser(compressTarget(true))],
      },
      {
        name: "SpeedDial",
        format: "es",
        sourcemap: false,
        file: "dist/js/speed-dial.esm.min.js",
        plugins: [terser(compressTarget(false))],
      },
    ],
  },
  {
    input,
    plugins: pluginsConfig(targetsIE),
    watch: false,
    output: {
      name: "SpeedDial",
      format: "iife",
      sourcemap: false,
      file: "dist/js/speed-dial.ie.min.js",
      plugins: [terser(compressTarget(false))],
    },
  },
];
