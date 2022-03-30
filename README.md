Author：Gorit   
Date：2022年3月16日    
Refer: [Refactor axios using TypeScript](https://coding.imooc.com/class/330.html)  

# ts-axios  
> use TypeScript implement axios,so called ts-axios  

# 😄new features   
### base usage  
```TypeScript
axios.request(config)

axios.get(url[,config])

axios.delete(url[, config])

axios.head(url[, config])

axios.options(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])

// overide
axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'Hello'
    }
})

axios('/extend/post', {
    method: 'post',
    data: {
        msg: 'hello'
    }
})
```
### return value with generic

```TypeScript  
// For example, the same datastructure return value as the backend
interface ResponseData<T=any> {
    code: number,
    message: string,
    data: T
}

// the same pojo、vo、entity and so on
interface User {
    name: string,
    age: number
}

function getUser<T>() {
    return axios<ResponseData<T>>('/extend/user')
        .then(res => res.data)
        .catch(err => console.log(err));
}

async function test() {
    const user = await getUser<User>();
    if (user) {
        console.log(user.data.name);    
    }
}

test();
```  

### you can use interceptor and axios.create()
```typescript
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from '../../src/index';


const http = axios.create({
    headers: {
        "Content-Type": "application/json,charset=UTF-8"
    }
})

http.interceptors.request.use(function (config: AxiosRequestConfig) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

# branch version  
### main   
The most complete functionality
### v1.1   
just implement params process
### v1.2  
base on v1.1, here are implement features  
1. body params process
2. handle exception
### v1.3  
base on v1.2, here are implement features
1. ts-axios interface extension
2. response generic
3. implement request and response interceptor

### v1.4
base v1.3, here are implement features
1. rewrite config
2. implement request interceptors and response interceptors
3. static method of axios.create() and refine transform

# update log  
- implement transformRequest, transformReponse and axios.crate() 2022/3/30
- implement interceptors 2022/3/27
- use mixed-type object to extend axios's interface, response generic 2022/3/19
- finish base axios function whitch including handleing params and body params. handle exceptions 2022/3/18
- implement buildURL function, and handle params process 2022/3/17
- init project on 2022/3/16