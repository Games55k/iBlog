---
title: LeetCode:3.无重复字符的最长子串
published: 2026-03-14
description: '给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串的长度。'
image: ''
tags: [LeetCode]
category: 'Code'
draft: false 
lang: ''
---

题目链接：[无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

思路：考虑到需要的是无重复字符的子串，那么说明区间[l, r]内每个字符只能存在一次，于是可以用哈希表从头到尾去记录区间[l, r]每一个字符，如果当前字符（也就是下标 r 处）出现超过一次，那么说明前面肯定出现过，那么只需要减少下标 l 处的字符，同时把 l 往后移，直到下标 r 处的字符数量等于 1，这也就是滑动窗口的思想。

C++ 代码实现：
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

Go 代码实现：
```go
func lengthOfLongestSubstring(s string) int {
    cnt := [128]int{}
    ans, left := 0, 0
    for right, c := range(s) {
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
