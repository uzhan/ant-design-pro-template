// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/web/my/user/info', {
    prefix: process.env.REACT_APP_ADMIN_API,
    method: 'GET',
    ...(options || {}),
  });
}
