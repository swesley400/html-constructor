import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    postcss({
      modules: true,
      extract: false,
      minimize: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ]
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    terser()
  ],
  external: [
    'react', 
    'react-dom', 
    'styled-components',
    'html-react-parser',
    'node-html-parser',
    'react-dnd',
    'react-dnd-html5-backend'
  ]
};
