---
title: LeetCode
published: 2025-10-24
description: '个人LeetCode刷题记录'
image: './cover.svg'
showImage: false
tags: [LeetCode]
category: 'Code'
---

> 用于记录个人 LeetCode 刷题集合  
> 目前已收录 7 题

:::::leetcode-list

::::leetcode{number="3" title="无重复字符的最长子串" difficulty="Mid" tags="滑动窗口"}
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

::::

::::leetcode{number="11" title="盛最多水的容器" difficulty="Mid" tags="双指针"}

题目链接：[盛最多水的容器](https://leetcode.cn/problems/container-with-most-water)

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**思路：**
把问题转换一下，其实就是求 $$(r - l) * min(height[l], height[r])$$ 的最大值，那么我们只需要双指针跑一遍，每次移动小的指针，如果我们移动的是大的那个指针，min 会减小，而且长度也在减小，所以乘积也会减小，是不合理的。

**代码实现：**

:::code-group
```go
func maxArea(height []int) int {
    ans, l, r := 0, 0, len(height) - 1
    for l < r {
        ans = max(ans, (r - l) * min(height[l], height[r]))
        if height[l] < height[r] {
            l++
        } else {
            r--
        }
    }
    return ans
}
```

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int ans = 0, l = 0, r = height.size() - 1;
        while (l < r) {
            ans = std::max(ans, (r - l) * std::min(height[l], height[r]));
            height[l] < height[r] ? l++ : r--;
        }
        return ans;
    }
};
```
:::

::::

::::leetcode{number="20" title="有效的括号" difficulty="Easy" tags="栈"}

题目链接：[有效的括号](https://leetcode.cn/problems/valid-parentheses)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。
- 每个右括号都有一个对应的相同类型的左括号。

**思路：**
维护一个栈，遇到左括号就放入，遇到右括号则看栈顶有没有对应类型的左括号。

**代码实现：**

:::code-group
```go
func isValid(s string) bool {
    mp := map[rune]rune{')':'(', ']':'[', '}':'{'}
    stk := []rune{}
    for _, c := range s {
        if mp[c] == 0 {
            stk = append(stk, c)
        } else {
            if len(stk) == 0 || stk[len(stk) - 1] != mp[c] {
                return false
            }
            stk = stk[:len(stk) - 1]
        }
    }
    return len(stk) == 0
}
```

```cpp
class Solution {
public:
    bool isValid(string s) {
        std::unordered_map<char, char> mp = {{')', '('}, {']', '['}, {'}', '{'}};
        std::stack<char> st;
        for (char c : s) {
            if (!mp.contains(c)) {
                st.push(c);
            } else {
                if (st.empty() || st.top() != mp[c]) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
};
```
:::

::::

::::leetcode{number="53" title="最大子数组和" difficulty="Mid" tags="前缀和 / 贪心"}

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

::::

::::leetcode{number="128" title="最长连续序列" difficulty="Mid" tags="哈希"}

题目链接：[最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence)

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

**思路：**
因为求的是最长连续的序列，序列不考虑顺序，那么我们可以考虑把数组里的数用哈希表存一下，然后我们去遍历整个哈希表，如果当前遍历的数是 x，那么看 x-1 在不在表里，如果在，就 continue，因为以 x-1 为起点一定比 x 优，如果 x-1 不在，设 y=x+1 一直往后看，直到不存在连续的，此时再更新一下答案，取 (ans, y - x) 的最大值，最后遍历完整个哈希表就得到了答案。

**代码实现：**

:::code-group
```go
func longestConsecutive(nums []int) int {
    mp := make(map[int]bool)
    for _, v := range nums {
        mp[v] = true
    }
    ans := 0
    for k := range mp {
        if mp[k - 1] {
            continue
        }
        x := k + 1
        for mp[x] {
            x++
        }
        ans = max(ans, x - k)
    }
    return ans
}
```

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        std::unordered_set<int> st(nums.begin(), nums.end());
        int ans = 0;
        for (auto &x : st) {
            if (st.contains(x - 1)) {
                continue;
            }
            int k = x + 1;
            while (st.contains(k)) {
                k++;
            }
            ans = std::max(ans, k - x);
        }
        return ans;
    }
};
```
:::

::::

::::leetcode{number="206" title="反转链表" difficulty="Easy" tags="链表"}

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

::::

::::leetcode{number="283" title="移动零" difficulty="Easy" tags="栈/双指针"}

题目链接：[移动零](https://leetcode.cn/problems/move-zeroes)

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

方法一：栈的思想

**思路：**
把nums数组当作一个栈，那么我们只需要遍历一次，每次遇到非 0 的数就加入到 nums 中，遍历完一次后，我们就已经把非 0 的数都移到了前面，剩下的就都是 0 的数，只需要覆盖一下就好了。

**代码实现：**

:::code-group
```go
func moveZeroes(nums []int)  {
    idx := 0
    for _, v := range nums {
        if v != 0 {
            nums[idx] = v
            idx++
        }
    }
    clear(nums[idx:])
}
```

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int idx = 0;
        for (auto &i : nums) {
            if (i) {
                nums[idx++] = i;
            }
        }
        fill(nums.begin() + idx, nums.end(), 0);
    }
};
```
:::

方法二：双指针

**思路：**
方法一在最坏情况下（即 nums 全为 0）需要遍历两次，那么我们有没有一次的方法呢，有的兄弟有的，直接上双指针。

要保持相对顺序不变，那么我们可以维护一个下标为 l 的最左边的 0，r 为当前遍历到的位置，只要这个数不是 0，那么我们就需要交换，这样才能保持相对位置不改变，交换过后那么 l 的下标也会前进一位，此时就是维护了一个 [l, r] 全为 0 的一个区间，如果前面几位没有碰到 0 呢，那么 l 和 r 会一起前进，直到碰到 0 或者到末尾结束。

**代码实现：**

:::code-group
```go
func moveZeroes(nums []int)  {
    l := 0
    for r, v := range nums {
        if v != 0 {
            nums[l], nums[r] = v, nums[l]
            l++
        }
    }
}
```

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int l = 0;
        for (int &r : nums) {
            if (r != 0) {
                std::swap(nums[l], r);
                l++;
            }
        }
    }
};
```
:::

::::

:::::
