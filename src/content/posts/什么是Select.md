---
title: 什么是Select
published: 2025-12-02
description: ''
image: ''
tags: [Go, Channel]
category: 'Code'
draft: false 
lang: ''
---

## 什么是select

select 是 Go 语言专门维 channel 操作设计的多路复用控制结构，核心作用是同时监听多个 channel 操作，当有多个 channel 都可能有数据收发时，select 能够选择其中一个可执行的 case 进行操作，而不是按顺序逐个尝试。比如同时监听数据输入、超时信号、取消信号等。

## select的执行机制是怎样的？

select 的执行机制是随机选择。如果多个 case 同时满足条件，Go 会随机选择一个执行，这避免了饥饿问题。如果没有 case 能执行就会执行 default，如果没有 default，当前 goroutine 会阻塞等待。
```go
select {
case data := <-ch1:
	//处理ch1的数据
case ch2 <- value:
	//向ch2发送数据
case <-timeout:
	//超时处理
default:
	//所有channel都不可用时执行
}
```

## select 的实现原理

Go 语言实现 select 时，定义了一个数据结构 scase 表示每个 `case` 语句（包括 `default`）。scase 结构包含 channel 指针、操作类型等信息。select 操作的整个过程通过 selectgo 函数在 runtime 层面实现。

Go 运行时会将所有 case `随机排序`，这是为了避免饥饿问题。然后执行`两轮扫描策略`：第一轮直接检查每个 channel 是否可读写，如果找到就绪的立即执行，如果都没就绪，第二轮就把当前 goroutine 加入到所有 channel 的发送或接受队列中，然后调用 gopark 进入睡眠状态，使当前 goroutine让出 CPU。

当某个 channel 变为可操作时，调度器会唤醒对应的 goroutine，此时需用从其他 channel 的等待队列中清理掉这个 goroutine，然后执行对应的 case 分支。

其核心原理是：case 随机化 + 双重循环检测

在默认的情况下，select 语句会在编译阶段经过如下过程的处理：
1. 将所有的 case 转换成包含 Channel 以及类型等信息的 scase 结构体
2. 调用运行时函数 selectgo 获取被选择的 scase 结构体索引，如果当前的 scase 是一个接受数据的操作，还会返回一个指示当前 case 是否是接收的布尔值
3. 通过 for 循环生成一组 if 语句，在语句中判断自己是不是被选中的 case。