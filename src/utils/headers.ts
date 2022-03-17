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
} 