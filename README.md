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

# update log  
- use mixed-type object to extend axios's interface, response generic 2022/3/19
- finish base axios function whitch including handleing params and body params. handle exceptions 2022/3/18
- implement buildURL function, and handle params process 2022/3/17
- init project on 2022/3/16