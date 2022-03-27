import { ResolvedFn, RejectedFn, AxiosInterceptorManager } from '../types';

export interface Interceptor<T> {
    resolved: ResolvedFn<T>,
    rejected?: RejectedFn
}

export default class InterceptorManager<T> implements AxiosInterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>;

    constructor() {
        this.interceptors = [];
    }
    
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        });
        return this.interceptors.length - 1;
    }

    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }

    /**
     * use callback to get each interceptor
     * @param callback 
     */
    forEach(callback: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                callback(interceptor);
            }
        })
    }
}