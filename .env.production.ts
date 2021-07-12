export default {
  // 项目部署在非根目录需配置
  'process.env.REACT_APP_BASE_URL': '/',
  // 静态资源在非根目录或 cdn
  'process.env.REACT_APP_PUBLIC_PATH': '/',
  // 服务端接口地址
  'process.env.REACT_APP_BASE_API': 'https://mmapi.xxxx.com',
  // 公共文件上传接口
  'process.env.REACT_APP_UPLOAD_API': 'https://mmapi.xxxx.com/admin/files',
  // 用户中心接口版本号
  'process.env.REACT_APP_USER_VERSION': 'v1.3',
  // 用户中心接口地址
  'process.env.REACT_APP_USER_API': 'https://ucapi.xxxx.com',
};
