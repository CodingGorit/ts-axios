import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index';
import { buildURL } from '../utils/url';
import { flattenHeaders } from '../utils/headers';
import transform from './transform';

import xhr from './xhr';

// ts-axios return Promise
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config);
    processConfig(config);
    return xhr(config).then((res) => {
        return trasnfromResponseData(res);
    });
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config);
    // config.headers = transformHeaders(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL(config: AxiosRequestConfig): string {
    const {url, params} = config;
    // type assert
    return buildURL(url!, params);
}


function trasnfromResponseData (res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}