// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(data: API.LoginParams, options?: { [key: string]: any }) {
  return request<RequestResponseType<API.LoginResult>>('/api/login', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
