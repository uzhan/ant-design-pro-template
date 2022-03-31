import { message, notification } from 'antd';
import { stringify } from 'qs';
import { history } from 'umi';
import Cookies from 'js-cookie';
import type { RequestOptionsInit } from 'umi-request';

const loginPath = '/user/login';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: {
  response: Response;
  customizeError?: { code: string; message: string };
}) => {
  const { response, customizeError } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    return Promise.reject();
  } else if (customizeError) {
    // 登录过期或未登录不展示错误信息
    if (customizeError.code !== '110001')
      message.error(`${customizeError.code}: ${customizeError.message}`);
    return Promise.reject(customizeError.code);
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
    return Promise.reject();
  }
  return response;
};

// 请求前拦截
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const token = Cookies.get('token') || '';
  const authHeader = {
    Authorization: token,
    'Content-Type': 'application/json',
  };

  return {
    url,
    options: {
      ...options,
      interceptors: true,
      headers: authHeader,
    },
  };
};

// 响应后拦截
const responseInterceptors = async (response: Response): Promise<Response> => {
  if (response.status === 200) {
    const data = await response.clone().json();

    // 此处code码修改为你自己项目使用的code码即可！！
    if (data.code !== '000000') {
      if (data.code === '110001') {
        const { query = {}, pathname } = history.location;
        const { redirect } = query;
        if (window.location.pathname !== loginPath && !redirect) {
          Cookies.remove('token');
          history.replace({
            pathname: loginPath,
            search: stringify({
              redirect: pathname,
            }),
          });
        }
      }
      return Promise.reject({ customizeError: { code: data.code, message: data.message } });
    }

    return Promise.resolve(data);
  } else {
    return response;
  }
};

export default {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
  prefix: process.env.REACT_APP_BASE_API,
  paramsSerializer: (params: any) => stringify(params),
};
