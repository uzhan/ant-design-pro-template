import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#2d66bd',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '后台管理系统',
  pwa: false,
  logo: '//assets.uphicoo.com/images/admin-template/xcx-logo.png',
  iconfontUrl: '',
};

export default Settings;
