import { isPlainObject } from "./util";

function normalizeHeaderName (headers: any, normalizeName: string): void {
    if (!headers) {
        return;
    }
    Object.keys(headers).forEach((name) => {
        if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
            headers[normalizeName] = headers[name];
            delete headers[name];
        }
    });
}

export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Ttpe');
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}

/**
 * @abstract handle string key-value to standar format key-value
 * 
 * */
export function parseHeaders (headers: string): any {
    let parsed = Object.create(null);
    if (!headers) {
        return parsed;
    }

    // string split by enter and wrap
    headers.split('\r\n').forEach((line) => {
        let [key, val] = line.split(":");
        key = key.trim().toLowerCase();
        if (!key) {
            return;
        }
        if (val) {
            val = val.trim();
        }
        parsed[key] = val;
    });
    return parsed;
}