import { api } from './../service/api.service';

export default {
  login: async ({ email, password }) => {
    const response = await api.post('/user/login', { email, password });
    const { token } = response.data;

    if (!token) {
			return Promise.reject();
		}

		localStorage.setItem('token', token);
		return Promise.resolve();
  },

  logout: ()=> {
    localStorage.removeItem('token');

    return localStorage.getItem('token') ?
      Promise.reject() :
      Promise.resolve();
  },

  checkError: ({ status }) => {
    if (`${status}`.indexOf('20') !== -1) {
      localStorage.removeItem('token');
      return Promise.reject();
    }

    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('token') ?
      Promise.resolve() :
      Promise.reject();
  },

  getPermissions: () => {
    return localStorage.getItem('token') ?
      Promise.resolve() :
      Promise.reject();
  }
}
