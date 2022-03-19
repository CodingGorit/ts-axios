import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index';
import { buildURL } from '../utils/url';
import { transformRequest, trasnfromResponse } from '../utils/data';
import { processHeaders } from '../utils/headers';

import xhr from './xhr';

// ts-axios return Promise
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config);
    return xhr(config).then((res) => {
        return trasnfromResponseData(res);
    });
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config);
    config.headers = transformHeaders(config);
    config.data = transformRequestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
    const {url, params} = config;
    // type assert
    return buildURL(url!, params);
}

function transformRequestData (config: AxiosRequestConfig): any {
    return transformRequest(config.data);
}

// handle headers trasnfrom body params that makes content-type use json
function transformHeaders (config: AxiosRequestConfig): any {
    const { headers, data } = config;
    return processHeaders(headers, data);
}

function trasnfromResponseData (res: AxiosResponse): AxiosResponse {
    res.data = trasnfromResponse(res.data);
    return res;
}