import { isDate, isObject } from "./util";

/**
 * use regular expression to encode params
 * @param val 
 * @returns 
 */
function encode (val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']');   
}

/**
 * handle url params
 * @param url 
 * @param params 
 * @returns 
 */
export function buildURL (url: string, params?: any): string {
    if (!params) {
        return url;
    }

    const parts: string[] = [];

    Object.keys(params).forEach((key) => {
        const val = params[key];
        if (val === null || typeof val === 'undefined') {
            return;
        }
        let values: any[] = [];
        if (Array.isArray(val)) {
            key += '[]';
        } else {
            values = [val];
        }
        values.forEach((val) => {
            if (isDate(val)) {
                val = val.toISOString();
            } else if (isObject(val)) {
                val = JSON.stringify(val);
            }
            parts.push(`${encode(key)}=${encode(val)}`);
        })
    })

    let serializedParams = parts.join('&');

    if (serializedParams) {
        // ignore html hash #
        const marIndex = url.indexOf('#');
        if (marIndex !== -1) {
            url = url.slice(0, marIndex);
        }
        // http:/xxx.com?aaa=bbb&bbb=ccc
        url += (url.indexOf('?') === -1? '?' : '&') + serializedParams;
    }
    return url;
}
