import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { parseHeaders } from "../headers/headers";
import { axiosErrorFactory } from "../headers/error";
import { isURLSameOrigin } from "../headers/url";
import cookie from '../headers/cookie';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null,
            url,
            method = 'get',
            headers,
            responseType,
            timeout,
            cancelToken,
            withCredentials,
            xsrfCookieName,
            xsrfHeaderName
        } = config;
        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        if (timeout) {
            request.timeout = timeout;
        }

        if (withCredentials) {
            request.withCredentials = withCredentials;
        }

        request.open(method.toUpperCase(), url!, true);

        request.onreadystatechange = function handleload() {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 0) {
                return;
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
            const responseData = responseType !== 'text' ? request.response : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response);
        }

        request.onerror = function handleError() {
            reject(axiosErrorFactory('Network Error', config, null, request));
        }

        request.ontimeout = function handleTimeout() {
            reject(axiosErrorFactory(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request));
        }

        if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName ) {
            const xsrfValue = cookie.read(xsrfCookieName);
            if (xsrfValue && xsrfHeaderName) {
                headers[xsrfHeaderName] = xsrfValue
            }
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            } else {
                // handle request body params that requestHeader contains "Content-Type"
                request.setRequestHeader(name, headers[name]);
            }
        })

        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort();
                reject(reason);
            })
        }

        request.send(data);

        function handleResponse(response: AxiosResponse) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            } else {
                reject(axiosErrorFactory(`Request fail with status code ${response.status}`, config, null, request, response));
            }
        }
    })
}