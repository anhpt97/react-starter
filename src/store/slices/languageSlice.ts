import { createSlice } from '@reduxjs/toolkit';
import { en_US } from 'src/locales/en-US';
import { vi_VN } from 'src/locales/vi-VN';
import { getLocale, setLocale } from 'src/utils/localStorage';

const locale = getLocale() || navigator.language;

export enum Locale {
  EN_US = 'en-US',
  VI_VN = 'vi-VN',
}

const getMessage = (key: Locale | string) => {
  switch (key) {
    case Locale.EN_US:
      return en_US;
    case Locale.VI_VN:
      return vi_VN;
    default:
      return en_US;
  }
};

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    locale,
    messages: getMessage(locale),
  },
  reducers: {
    setLanguage: (state, action) => {
      state.messages = getMessage(action.payload);
      setLocale(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
