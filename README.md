//几个注意点
##1.##修改全局回车
未修改前，eslint报回车问题，原因是系统回车的问题（CR和..
修改完成后，重新拉一下代码

##2.##相同粘贴文件报回车问题
解决：修改eslint忽略掉改文件（不建议，暂时没有更好的办法

##3.npm i 失败问题##
解决：删除pack-lock.json ,删除npm cache

部署看 -- https://juejin.cn/post/7077328550499450911#heading-5
// "build": "nest build --webpack --webpackPath=./webpack.config.js",



#### 1.查询以xx开头的

```sql

    return this.nodesRepository.createQueryBuilder("nodes").where("date like :month", { month:`${GetmonthNodesDto.month}_%` }).getMany()
```

以月份开头后面随意的字段



#### 2.jwt登录实现



### 问题

1. dto可以共用吗

   比如users和notes的delete_dto都是ids:[]

2. 注意：**在写 UPDATE 更新语句的时候，**一定要加上 WHERE 条件，一定要加上 WHERE 条件，一定要加上 WHERE 条件，重要的事情说3遍，血与泪的教训！！！

3. 踩坑

   除了delect之外其他接口放在他@Post(':id')后面，接口不可用

   解决：所以接口都放在他前面

   **问题二复现**

4. mysql数据库需要转换为utff-8,否则发送请求时候使用utf-8会报错

spec.ts文件需要放在src目录下，否则会报错 , 自动化测试载体

5. 生成静态文档文件
npm install swagger-ui-dist
main.ts文件需要修改