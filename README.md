Author：Gorit   
Date：2022年3月16日    
Refer: [Refactor axios using TypeScript](https://coding.imooc.com/class/330.html)  

# ts-axios  
> use TypeScript implement axios,so called ts-axios  

# 😄new features   
- Added interface extensions
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

# update log  
- use mixed-type object to extend axios's interface 2022/3/19
- finish base axios function whitch including handleing params and body params. handle exceptions 2022/3/18
- implement buildURL function, and handle params process 2022/3/17
- init project on 2022/3/16