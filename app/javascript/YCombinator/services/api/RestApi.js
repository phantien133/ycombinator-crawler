/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const DEFAULT_API_CONFIG = {
  timeout: 30000,
};

export default class RestApi {
  constructor(config) {
    this.axiosClient = axios.create({
      ...DEFAULT_API_CONFIG,
      ...config,
    });
    this._responseInterceptor();
  }

  get client() {
    return this.axiosClient;
  }

  _responseInterceptor() {
    this.client.interceptors.response.use(
      (res) => res, (error) => {
        const { response } = error;
        if (!response || response.status === 500) {
          throw new Error({ error_code: 'uncaught', message: 'server down' });
        }
        throw error.response.data;
      },
    );
  }
}
