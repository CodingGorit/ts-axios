import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>,
    response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => 
    AxiosPromise)
    rejected?: RejectedFn
}

export default class Axios {
    private defaults: AxiosRequestConfig;
    private interceptors: Interceptors;
    constructor(initConfig: AxiosRequestConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>(),
        }
    }
    /**
     * add Runtime check
     * @param url 
     * @param config 
     * @returns 
     */
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {};
            }
            config.url = url;
        } else {
            config = url;
        }

        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }];

        // request intercptor
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor);
        });

        // response interceptor
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor);
        });

        // Promise chain
        let promose = Promise.resolve(config);

        while (chain.length) {
            const { resolved, rejected } = chain.shift()!;
            promose = promose.then(resolved, rejected)
        }

        return promose;
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config);
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config);
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config);
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config);
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config);
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config);
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config);
    }


    private _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method,
            url
        }))
    }

    private _requestMethodWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}