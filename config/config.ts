// https://umijs.org/config/
import 'dotenv/config';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const CompressionPlugin = require('compression-webpack-plugin');

const { REACT_APP_ENV } = process.env;

const reg = /^(REACT_APP_)/;

const define = Object.keys(process.env)
  .filter((key) => reg.test(key))
  .reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  devServer: {
    port: 9530,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  define: {
    'process.env': define,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'font-size-base': '12px',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  chainWebpack(memo) {
    memo.plugin('CompressionPlugin').use(
      new CompressionPlugin({
        filename: '[path][base].gz', // 目标资源名称
        algorithm: 'gzip',
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 处理所有匹配此 {RegExp} 的资源
        threshold: 10240, // 只处理比这个值大的资源。按字节计算
        minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
      }),
    );
  },
});
