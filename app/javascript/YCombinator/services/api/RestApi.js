/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const DEFAULT_API_CONFIG = {
  timeout: 300000,
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
        throw error;
      },
    );
  }
}
