import { AxiosRequestConfig } from "./types";

const defaults: AxiosRequestConfig = {
    method: 'get',

    timeout: 0,

    headers: {
        common: {
            Accept: 'application/json, text/palin, "/"'
        }
    }
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