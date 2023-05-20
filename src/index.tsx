import 'antd/dist/reset.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Intl } from './Intl';
import { BASE_URL } from './constants/env';
import './index.css';
import { store } from './store/store';

axios.defaults.baseURL = BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Intl>
        <BrowserRouter>
          {/* <AuthProvider> */}
          <App />
          {/* </AuthProvider> */}
        </BrowserRouter>
      </Intl>
    </Provider>
  </React.StrictMode>
);
