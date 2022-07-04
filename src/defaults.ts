import { AxiosRequestConfig } from "./types";
import { transformRequest } from "./headers/data";
import { processHeaders } from "./headers/headers";

const defaults: AxiosRequestConfig = {
    method: 'get',

    timeout: 0,

    headers: {
        common: {
            Accept: 'application/json, text/palin, "/"'
        }
    },

    xsrfCookieName: 'XSRF-TOKEN',

    xsrfHeaderName: 'X-XSRF-TOKEN',

    transformRequest: [
        function(data: any, headers: any): any {
            processHeaders(headers, data);
            return transformRequest(data);
        }
    ],
    transformResponse: [
        function(data: any): any {
            return transformRequest(data);
        }
    ]
}

const methodsNoData = ['delete', 'get', 'head', 'options'];

methodsNoData.forEach(method => {
    defaults.headers[method] = {}
});

const methodWithData = ['post', 'put', 'patch'];

methodWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'applcation/x-www-form-urlencoded'
    }
})


export default defaults;