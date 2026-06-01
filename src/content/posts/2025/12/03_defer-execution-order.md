---
title: "defer的执行顺序和常用场景"
date: "2025-12-03T00:00:00+08:00"
slug: "defer-execution-order"
draft: false
tags:
  - "Go"
---


defer 执行顺序与调用顺序相反，类似于栈的先进后出（LIFO），跟在 defer 后面的函数会被延迟执行，直到包含该 defer 语句的函数执行完毕，defer 后面的函数才会被延迟执行，不论包含该 defer 语句的函数是通过 return 正常结束，还是由于 panic 导致的异常退出。

常用场景：
- defer 语句常被用于处理成对的操作，如打开、关闭、链接、断开链接、加锁和释放锁。
- 通过 defer 机制，不论函数逻辑多复杂，都能保证在任何执行路径下，资源被释放。
- 释放资源的 defer 应该直接跟在请求资源的语句后。
