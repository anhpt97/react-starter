// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL: string;
    }
  }
}
