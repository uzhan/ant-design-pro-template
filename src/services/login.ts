import request from '@/utils/request';

export async function fakeAccountLogin(data: any) {
  return request('/api/login/account', {
    method: 'POST',
    data,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
