import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ClientParams {
  baseUrl: string;
  headers?: Record<string, string>;
}

const createClient = ({ baseUrl, headers }: ClientParams) => {
  const axiosClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: headers || {},
  });

  const request = async <T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return axiosClient.request<T>(config);
  };

  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return axiosClient.get<T>(url, config);
  };

  const post = async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return axiosClient.post<T>(url, data, config);
  };

  const put = async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return axiosClient.put<T>(url, data, config);
  };

  const del = async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return axiosClient.delete<T>(url, config);
  };

  return {
    request,
    get,
    post,
    put,
    delete: del,
  };
};

export { createClient };
