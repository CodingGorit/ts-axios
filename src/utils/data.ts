import { isPlainObject } from "./util";

export function transformRequest (data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

/**
 * try JSON.parse(data) and gain format data
 * @param data
 * @returns 
 */
export function trasnfromResponse (data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            // do notiong
            // throw new Error('parse string error!!!!');
        }
    }
    return data;
}