---
title: "快速排序"
description: "基于分治的思想"
date: "2023-09-30T00:00:00+08:00"
slug: "quicksort"
draft: false
tags:
  - "算法"
---


## 核心思想：分而治之，选一个基准值（Pivot），把数组分成两边，小的放左边，大的放右边，然后继续递归直到有序。

朴素的基准是选第一个 or 最后一个 or 中间，算法容易退化直 $O(n^2)$ ，随机选择 $Pivot$ 能使划分在期望意义上是均匀的，保证算法的期望时间复杂度为 $O(n\log n)$ 。

以下是Go语言的实现版本
```go
func sortArray(nums []int) []int {
	var quickSort func(l, r int)

	quickSort = func(l, r int) {
		if l >= r {
			return
		}

		// 随机选择 pivot，并交换到区间起点
		pivotIdx := l + rand.Intn(r-l+1)
		nums[l], nums[pivotIdx] = nums[pivotIdx], nums[l]
		pivot := nums[l]

		i, j := l+1, r
		for i <= j {
			for i <= j && nums[i] < pivot {
				i++
			}
			for i <= j && nums[j] > pivot {
				j--
			}
			if i <= j {
				nums[i], nums[j] = nums[j], nums[i]
				i++
				j--
			}
		}

		// 把 pivot 放到最终位置
		nums[l], nums[j] = nums[j], nums[l]

		quickSort(l, j-1)
		quickSort(j+1, r)
	}

	quickSort(0, len(nums)-1)
	return nums
}
```
