import { terser } from 'rollup-plugin-terser'
import multiInput from 'rollup-plugin-multi-input'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: ['src/scripts/lazyScripts.js', 'src/scripts/criticalScripts.js'],
  output: {
    dir:'dist/assets/',
    format: 'esm',
  },
  plugins: [
    multiInput(),
    terser(),
    nodeResolve(),
  ],
}
