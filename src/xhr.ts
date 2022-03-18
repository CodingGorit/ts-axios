import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types";
import { parseHeaders } from "./utils/headers";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve) => {
        const { data = null, 
                url, 
                method = 'get',
                headers,
                responseType } = config;
        const request = new XMLHttpRequest();
    
        if (responseType) {
            request.responseType = responseType;
        }

        request.open(method.toUpperCase(), url, true);
        
        request.onreadystatechange = function handleload () {
            if (request.readyState !== 4) {
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
            resolve(response);
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            } else {
                // handle request body params that requestHeader contains "Content-Type"
                request.setRequestHeader(name, headers[name]);
            }
        })
    
        request.send(data);
    })
}