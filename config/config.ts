// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';
import defineDev from '../.env.development';
import definePro from '../.env.production';

const { NODE_ENV, REACT_APP_ENV } = process.env;
const define = NODE_ENV === 'development' ? defineDev : NODE_ENV === 'production' ? definePro : {};

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true, //是否启用 dva 的 热更新
  },
  history: {
    type: 'browser',
  },
  define,
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // 快速刷新功能 https://umijs.org/config#fastrefresh
  fastRefresh: {},
  esbuild: {},
});
