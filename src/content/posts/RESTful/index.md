---
title: RESTful
published: 2026-04-12
description: 'RESTful 接口规范'
image: ''
tags: [规范]
category: 'Code'
draft: false
lang: ''
---

## RESTful 是什么
REST = Representational State Transfer

RESTful API = 符合 REST 风格的接口设计

核心思想：

- 把后台的数据或功能看成“资源”
- 每个资源都有一个 URL
- 对资源的操作尽量使用 HTTP 方法 表达
- 返回结果通常是 JSON

比如：

- GET /users/admin
- POST /users
- DELETE /users/admin

## 无状态思想

`REST 的一个重要约束是：服务端不保存客户端会话状态。`

每次请求都应该包含处理该请求所需的全部信息。

例如：

- 身份认证用 Authorization token
- 分页参数放在 query 中
- 条件过滤通过请求参数传递

不要依赖“上一次请求做了什么”。

## 常见接口设计规范

### 1. URL 命名规范

建议：
- 全部小写
- 单词之间用中划线 "-"
- 使用名词，不用动词
- 不要在 URL 中出现文件扩展名

示例：
- /user-profiles
- /order-items

### 2. 请求方法规范

**GET**  
用于查询，不应修改数据。
```js
GET /users/123
```

**POST**  
用于新增资源。

```js
POST /users
Content-Type: application/json
{
  "name": "Tom",
  "email": "tom@example.com"
}
```

**PUT**  
用于完整更新。通常是“把整个资源替换掉”。

```js
PUT /users/123
{
  "name": "Tom",
  "email": "new@example.com",
  "age": 20
}
```

**PATCH**  
用于部分更新。

```js
PATCH /users/123
{
  "email": "new@example.com"
}
```

**DELETE**  
用于删除资源。

```js
DELETE /users/123
```

### 3. 状态码规范

`2xx 成功`
- 200 OK：查询成功、更新成功
- 201 Created：创建成功
- 204 No Content：删除成功且无返回体

`4xx 客户端错误`
- 400 Bad Request：请求参数错误
- 401 Unauthorized：未认证
- 403 Forbidden：已认证但无权限
- 404 Not Found：资源不存在
- 409 Conflict：资源冲突
- 422 Unprocessable Entity：参数格式对，但业务校验失败

`5xx 服务端错误`
- 500 Internal Server Error：服务器内部错误
- 502 Bad Gateway
- 503 Service Unavailable

### 4.返回数据规范

通常返回 JSON，或者更 REST 一点，直接返回资源本身。

### 5. 查询、过滤、分页、排序

这些一般通过 query 参数 实现。
```js
GET /users?status=active&page=1&page_size=20&sort=-created_at
```

### 6. 版本控制

常见方式：

1.放 URL 中
```js
/api/v1/users
/api/v2/users
```
这是最常见、最直观的。

2.放请求头中
```js
Accept: application/vnd.company.v1+json
```
更 REST，但实现和使用都更复杂。

通常中小团队直接用 URL 版本号即可。

### 7. 幂等性

幂等性指：同样的请求调用一次和调用多次，结果一致。

一般理解：

- GET、PUT：幂等
- DELETE：通常设计为幂等
- POST：通常不幂等

例如：
- 连续执行多次 GET /users/1，结果一样
- 连续执行多次 PUT /users/1 更新为同一个内容，结果一样
- 连续执行多次 DELETE /users/1，第一次删除成功，后面可以返回 404 或 204，但资源状态应一致

## 总结

RESTful 接口规范的核心就是：
> 把数据抽象成资源，用 URL 定位资源，用 HTTP 方法表达操作，用状态码表达结果。
