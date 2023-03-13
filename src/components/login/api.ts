import { axiosInstance } from '@/api';

export const getIsValidToken = async (): Promise<boolean> => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/auth/login-check`,
    });
    return data.data.isLogin;
  } catch {
    return false;
  }
};
