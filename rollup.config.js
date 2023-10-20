import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import packageConfig from './package.json';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

const buildConfig = ({ format = 'cjs', browser = false } = {}) => {
  const year = new Date().getFullYear();
  const banner = `// network-connectivity v${packageConfig.version} Copyright (c) ${year} ${packageConfig.author.name}`;

  return {
    input: './src/index.ts',
    output: [
      {
        dir: `./lib/${format}`,
        format: `${format}`,
        banner,
      },
    ],
    external: [...Object.keys(packageConfig.peerDependencies || {})],
    plugins: [
      babel({
        presets: [['@babel/preset-env', '@babel/preset-react']],
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      nodeResolve({
        browser,
      }),
      commonjs(),
      json(),
      typescript(),
    ],
  };
};

export default async () => {
  return [buildConfig(), buildConfig({ format: 'esm', browser: 'true' })];
};
