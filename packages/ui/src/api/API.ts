import {ENDPOINTS} from '@/api/endpoints';
import axios, {AxiosRequestConfig} from 'axios';

export class API {

  private readonly config: AxiosRequestConfig = {
    baseURL: ENDPOINTS.BASE_PATH,
  };

  public async invoke<T>(request: AxiosRequestConfig) {
    const result = await axios.request<T>({
      ...this.config,
      ...request,
    });
    return result.data;
  }
}

export const api = new API();
