import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { SERVER_URL } from './../service/api.service';

const httpClient = (url, opts = {}) => {
  if (!opts.headers) {
    opts.headers = new Headers({ Accept: 'application/json' });
  }

  const token = localStorage.getItem('token');
  if (token) {
    opts.headers.set('Authorization', `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, opts);
};

export default simpleRestProvider(SERVER_URL, httpClient);
