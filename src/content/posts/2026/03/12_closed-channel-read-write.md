---
title: "读写已关闭的Channel"
description: "读写已关闭的 Channel 会发生什么"
date: "2026-03-12T00:00:00+08:00"
slug: "closed-channel-read-write"
draft: false
tags:
  - "Go"
  - "Channel"
---


## 从一个已关闭的 Channel 仍能读出数据吗?

如果 Channel 是有缓冲，且返回的 ok 不为 false 时，依然能读出有效值。
```go
func main() {
	ch := make(chan int, 5)
	ch <- 18
	close(ch)
	x, ok := <- ch
	if ok {
		fmt.Println("received: ", x)
	}
	x, ok := <- ch
	if !ok {
		fmt.Println("channel closed, data invalid.")
	}
}
```
## 往一个关闭的Channel写入数据会发生什么?

往已关闭的 Channel 写入数据会直接 panic。
向已关闭的 Channel 发送数据时，runtime 会检测到 Channel 的 `closed` 标志位已经设置，立即抛出 "send on closed channel"的 panic。这个检查发生在发送操作的最开始阶段，甚至在获取 mutex 锁之前就会进行判断，所以不会有任何数据写入的尝试，直接就 panic了。
