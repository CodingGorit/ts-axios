import { AxiosInstance } from './types';
import Axios from './core/axios';
import { extend } from './utils/util';

function createInstance(): AxiosInstance {

    const context = new Axios();

    const instance = Axios.prototype.request.bind(context);

    extend(instance, context);

    return instance as AxiosInstance;
}

const axios = createInstance();
// axios.request

// axios.get()

export default axios;