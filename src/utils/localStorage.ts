import { Locale } from 'src/store/slices/languageSlice';

const LOCALE = 'locale';
export const getLocale = () => localStorage.getItem(LOCALE);
export const setLocale = (locale: Locale) =>
  localStorage.setItem(LOCALE, locale);

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const setAccessTokenAndRefreshToken = (options: {
  accessToken: string;
  refreshToken?: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN, options.accessToken);
  if (options.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, options.refreshToken);
  }
};
export const removeAccessTokenAndRefreshToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const ROW_LIMIT = 'rowLimit';
export const getRowLimit = () => localStorage.getItem(ROW_LIMIT);
export const setRowLimit = (limit: string) =>
  localStorage.setItem(ROW_LIMIT, limit);

const USER_COLUMNS = 'userColumns';
export const getUserColumns = () => {
  try {
    const userColumns = JSON.parse(localStorage.getItem(USER_COLUMNS));
    return Array.isArray(userColumns) ? userColumns : [];
  } catch (error) {
    return [];
  }
};
export const setUserColumns = (columns: any[]) =>
  localStorage.setItem(USER_COLUMNS, JSON.stringify(columns));
