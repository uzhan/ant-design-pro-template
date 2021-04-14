import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/users/info');
}

export async function updatePassword(data: any): Promise<any> {
  return request('/api/auth/modify-password', {
    method: 'UPDATE',
    data,
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
