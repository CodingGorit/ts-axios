export type Method = 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
    url: string,
    method?: Method,
    data?: any,
    params?: any,
    headers?: any,
    responseType?: XMLHttpRequestResponseType,
    timeout?: number,
}

export interface AxiosResponse {
    data: any,
    status: number,
    statusText: string,
    config: AxiosRequestConfig,
    headers?: any,
    request: any,
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosError extends Error {
    config: AxiosRequestConfig,
    code?: string | number | null,
    request?: any,
    response?: AxiosResponse 
}