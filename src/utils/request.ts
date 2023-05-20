import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, getLocale } from './localStorage';

export const request = async (config: AxiosRequestConfig) => {
  const locale = getLocale();
  if (locale) {
    config = { ...config, params: { ...config.params, locale } };
  }
  const accessToken = getAccessToken();
  if (accessToken) {
    config = { ...config, headers: { authorization: `Bearer ${accessToken}` } };
  }
  return await axios(config);
};
