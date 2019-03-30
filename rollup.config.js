import path from 'path';
const pkg = require(path.resolve(process.cwd(), 'package.json'));
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: path.resolve(process.cwd(), './src/index.ts'),
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.unpkg,
      name: pkg.name,
      format: 'umd'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      typescript: ttypescript,
      useTsconfigDeclarationDir: true
    }),
    commonjs(),
    resolve()
  ]
};

