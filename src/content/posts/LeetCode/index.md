---
title: LeetCode
published: 2025-10-24
description: '个人LeetCode刷题记录'
image: './cover.svg'
showImage: false
tags: [LeetCode]
category: 'Code'
draft: false
lang: ''
---

> 用于记录个人 LeetCode 刷题集合  
> 目前已收录 3 题

:::leetcode-list
:::leetcode{number="3" title="无重复字符的最长子串" difficulty="Mid" tags="滑动窗口"}

题目链接：[无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。

**思路：**
考虑到需要的是无重复字符的子串，那么说明区间 `[l, r]` 内每个字符只能存在一次。于是可以用哈希表从头到尾记录区间 `[l, r]` 中每一个字符的出现次数。

如果当前字符（也就是下标 `r` 处）出现超过一次，那么说明前面肯定已经出现过，此时只需要不断减少下标 `l` 处字符的计数，同时把 `l` 往后移，直到下标 `r` 处字符的数量重新变为 `1`。这就是滑动窗口的思想。

**代码实现：**

:::code-group
```go
func lengthOfLongestSubstring(s string) int {
    cnt := [128]int{}
    ans, left := 0, 0
    for right, c := range s {
        cnt[c]++
        for cnt[c] > 1 {
            cnt[s[left]]--
            left++
        }
        ans = max(ans, right - left + 1)
    }
    return ans
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        std::map<char, int> mp;
        int ans = 0, l = 0;
        for (int r = 0; r < s.size(); r++) {
            mp[s[r]]++;
            while (mp[s[r]] > 1) {
                mp[s[l]]--;
                l++;
            }
            ans = std::max(ans, r - l + 1);
        }
        return ans;
    }
};
```
:::

:::leetcode{number="53" title="最大子数组和" difficulty="Mid" tags="前缀和 / 贪心"}

题目链接：[最大子数组和](https://leetcode.cn/problems/maximum-subarray)

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**思路：**
考虑到需要的是无重复字符的子串，那么说明区间 `[l, r]` 内每个字符只能存在一次。于是可以用哈希表从头到尾记录区间 `[l, r]` 中每一个字符的出现次数。

如果当前字符（也就是下标 `r` 处）出现超过一次，那么说明前面肯定已经出现过，此时只需要不断减少下标 `l` 处字符的计数，同时把 `l` 往后移，直到下标 `r` 处字符的数量重新变为 `1`。这就是滑动窗口的思想。

**代码实现：**

:::code-group
```go
func maxSubArray(nums []int) int {
    ans, sum, pre := math.MinInt, 0, 0;
    for _, v := range nums {
        sum += v
        ans = max(ans, sum - pre)
        pre = min(pre, sum)
    }
    return ans
}
```

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int ans = INT_MIN, sum = 0, pre = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            ans = std::max(sum - pre, ans);
            pre = std::min(pre, sum);
        }
        return ans;
    }
};
```
:::

:::leetcode{number="206" title="反转链表" difficulty="Easy" tags="链表"}

题目链接：[反转链表](https://leetcode.cn/problems/reverse-linked-list)

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

**思路：**
头插法。简单来说就是创建一个空列表，每次把当前节点插入到空列表的头部。

**代码实现：**

:::code-group
```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
    var pre, cur *ListNode = nil, head
    for cur != nil {
        next := cur.Next
        cur.Next = pre
        pre = cur
        cur = next
    }
    return pre
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* pre = nullptr;
        ListNode* cur = head;
        while (cur != nullptr) {
            ListNode* next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }
        return pre;
    }
};
```
:::