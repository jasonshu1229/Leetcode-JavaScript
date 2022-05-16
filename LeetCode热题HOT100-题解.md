# LeetCode热题HOT100-题解
<!-- GFM-TOC -->
- [LeetCode热题HOT100-题解](#leetcode热题hot100-题解)
  - [数组](#数组)
    - [1. 找到所有数组中消失的数字](#1-找到所有数组中消失的数字)
    - [2. 移动零](#2-移动零)
    - [3. 盛最多水的容器](#3-盛最多水的容器)
    - [4. 除自身以外数组的乘积](#4-除自身以外数组的乘积)
    - [5. 下一个排列](#5-下一个排列)
    - [6. 两数相加](#6-两数相加)
    - [7. 旋转图像](#7-旋转图像)
  - [位运算](#位运算)
    - [1. 只出现一次的数字](#1-只出现一次的数字)
  - [排序算法](#排序算法)
    - [1. 合并区间](#1-合并区间)
  - [二分查找](#二分查找)
    - [1. 在排序数组中查找元素的第一个和最后一个位置](#1-在排序数组中查找元素的第一个和最后一个位置)
    - [2. 搜索插入位置](#2-搜索插入位置)
    - [3. 搜索二维矩阵II](#3-搜索二维矩阵ii)
    - [4. 搜索旋转排序数组](#4-搜索旋转排序数组)
  - [回溯算法](#回溯算法)
    - [1. 括号生成](#1-括号生成)
    - [2. 全排列](#2-全排列)
    - [3. 组合](#3-组合)
    <!-- GFM-TOC -->

## 数组

### 1. 找到所有数组中消失的数字

448\. 找到所有数组中消失的数字 (简单)

[Leetcode](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/) / [力扣](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)

**技巧：** 元素作为数组索引

```js
var findDisappearedNumbers = function(nums) {
  if (!nums) return [];

  const res = [], n = nums.length;
  for (let i = 0; i < n; i++) {
    let index = (nums[i] - 1) % n;
    nums[index] = nums[index] + n;
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] <= n) res.push(i + 1);
  }
  return res;
};
```

### 2. 移动零

283\. 移动零 (简单)

[Leetcode](https://leetcode.cn/problems/move-zeroes/) / [力扣](https://leetcode.cn/problems/move-zeroes/)

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。<br>
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

**技巧：** 双指针 - 快慢指针

双指针，定义i,k指针，r指针不断从左向右移动遍历数组，遇到非0元素，就将nums[i]元素防止到nums[k]的位置，同时 k++ 向后移动一位，一直让 k 存储为0的元素 <br>

具体过程如下：<br>
  1. 定义两个指针 i,k，初始化 i = 0, k = 0
  2. i指针不断向后移动，遍历整个数组，如果nums[i] !== 0，则让 nums[i]的元素放置到 nums[k] 的位置，同时 k++ 向后移动一位
  3. 最后 k位置之后的元素就全部为了0了
时间复杂度 O(n)

```js
var moveZeroes = function(nums) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let temp = nums[i];
      nums[i] = nums[k]; // 用k来存储下标一直为0的元素，不断从左向右移动
      nums[k] = temp;
      k++;
    }
  }

  return nums;
};
```

### 3. 盛最多水的容器

11\. 盛最多水的容器 (中等)

[Leetcode](https://leetcode.cn/problems/container-with-most-water/) / [力扣](https://leetcode.cn/problems/container-with-most-water/)

**技巧：** 双指针 - 对撞指针

思路：
    最大的面积由 两个指针指向的数字中较小值 ∗ 指针之间的距离，故想到对撞指针<br>
 1. 先从两个边界开始求水量，每次以小的 height 为起点，为了求最大水量，应该不断向内层找最大的 height[index]

```js
var maxArea = function(height) {
  let ans = 0; // 存储最大水量
  let left = 0, right = height.length - 1;
  while (left < right) {
    // 求水量
    let area = Math.min(height[left], height[right]) * (right - left);
    ans = Math.max(ans, area);
    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return ans;
};
```

### 4. 除自身以外数组的乘积

238\. 除自身以外数组的乘积 (中等)

[Leetcode](https://leetcode.cn/problems/product-of-array-except-self/) / [力扣](https://leetcode.cn/problems/product-of-array-except-self/)

**技巧：** 前缀和/乘积

求前缀乘积 类比前缀和
> 除自身以外数组的乘积 = 每个元素的左边乘积 * 每个元素右边的乘积

```js
var productExceptSelf = function(nums) {
  const len = nums.length;  
  let leftProducts = [];
  leftProducts[0] = 1; // 第一个数左边的乘积为1
  // 求每个元素左边的乘积
  for (let i = 1; i < len; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
  }
  let rightProducts = [];
  rightProducts[len - 1] = 1
  for (let i = len - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }
  let res = [];
  // 左边乘积 * 右边乘积
  for (let i = 0; i < len; i++) {
    res[i] = leftProducts[i] * rightProducts[i];
  }
  return res;
};
```

### 5. 下一个排列

31\. 下一个排列 (中等)

[Leetcode](https://leetcode.cn/problems/next-permutation/) / [力扣](https://leetcode.cn/problems/next-permutation/)

**技巧：** 直接模拟，线性扫描法

注意：有一个边界条件：如果没有找到靠右侧的【较小数】则直接返回翻转之后的数组

```js
var nextPermutation = function(nums) {
  // 1. 找到尽量靠右的【较小数】
  let i = nums.length - 2; // 从倒数第二个数开始逐个比较找较小数
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  //  如果找到了【较小数】
  if (i >= 0) {
    // 2. 定义一个指针，从后面开始找 比【较小数】大的【较大数】
    let j = nums.length - 1; 
    while (j >= 0 && nums[i] >= nums[j]) j--;
    // 此时 nums[j] 为比【较小数】大的【较大数】，需要将它们交换
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 3. 反转【较小数】i 之后的所有元素
  let left = i + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};
```


### 6. 两数相加

2\. 两数相加 (中等)

[Leetcode](https://leetcode.cn/problems/add-two-numbers/) / [力扣](https://leetcode.cn/problems/add-two-numbers/)

**技巧：** 直接模拟法

注意进位

```js
var addTwoNumbers = function(l1, l2) {
  const l3 = new ListNode(null); // 新建一个空的链表 存储返回和的结果
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0; // 进位符中的 "十位数"

  while (p1 || p2) {
    const v1 = p1 ? p1.val : 0;
    const v2 = p2 ? p2.val : 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    p3.next = new ListNode(val % 10); // 从p3的头节点下一个节点开始赋值
    // 链表递归
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    p3 = p3.next; // p3一直有值
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return l3.next; // 头节点的下一个节点是存储的和
};
```

### 7. 旋转图像

48\. 旋转图像 (中等)

[Leetcode](https://leetcode.cn/problems/rotate-image/) / [力扣](https://leetcode.cn/problems/rotate-image/)

**技巧：** 直接模拟法

思路：<br>
通过直接模拟法找出规律：<br> 
对于矩阵中第row行的第col列元素，在旋转后，它出现在倒数第row列的第col行位置

matrix[row][col] = matrix[col][n - row - 1]

```js
var rotate = function(matrix) {
  // 使用辅助数组
  const n = matrix.length;
  const newMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      newMatrix[col][n - row - 1] = matrix[row][col];
    }
  }

  for (let row = 0; row < n; row++) {
    for (col = 0; col < n; col++) {
      matrix[row][col] = newMatrix[row][col];
    }
  }
};
```

## 位运算

### 1. 只出现一次的数字

136\. 只出现一次的数字 (中等)

[Leetcode](https://leetcode.cn/problems/single-number/) / [力扣](https://leetcode.cn/problems/single-number/)

异或规律总结：
1. a^a=0 任何数字和自己异或结果0
2. a^0=a 任何数字和0异或还是他自己
3. a^b^c = a^c^b 异或运算具有交换律

例子：
[4, 1, 2, 1, 2]<br>
  4^1^2^1^2<br>
= 1^1^2^2^4
= 0^2^2^4
= 2^2^4
= 0^4
= 4

```js
var singleNumber = function(nums) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res ^= nums[i];
  }
  return res;
};
```

## 排序算法

### 1. 合并区间

56\. 合并区间 (中等)

[Leetcode](https://leetcode.cn/problems/merge-intervals/) / [力扣](https://leetcode.cn/problems/merge-intervals/)

思路：<br>
先按照区间的左端点排序，那么在排完序的列表中，可以合并的区间一定是连续的。<br>
prev初始为第一个区间，cur 表示当前的区间。<br>
- 如遇到当前区间的左边界小于上一个区间的右边界，则说明有重合，应该取前一个区间的右边界和当前区间的右边界的最大值。<br>
- 如果不重合，则把 prev 前一个区间推入 res，更新 prev后，继续遍历。

```js
var merge = function(intervals) {
  if (intervals.length == 0) return [];
  
  let res = [];
  intervals.sort((a, b) => a[0] - b[0]); // 按照区间的左端点排序
  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const currLeft = intervals[i][0]; // 当前区间的左边界
    const currRight = intervals[i][1]; // 当前区间的右边界
    if (prev[1] < currLeft) {
      res.push(prev); // 区间不重合，将区间推入 res
      prev = intervals[i]; // 更新 prev
    } else {
      // 区间有重合，需要取前一个区间的右边界和当前区间的右边界的最大值
      prev[1] = Math.max(prev[1], currRight);
    }
  }
  res.push(prev);
  return res;
};
```

## 二分查找

### 1. 在排序数组中查找元素的第一个和最后一个位置

34\. 在排序数组中查找元素的第一个和最后一个位置 (中等)

[Leetcode](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/) / [力扣](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

先二分，再寻找左右边界，然后向左向右尝试找相同的元素
时间复杂度 O(n) 

```js
var searchRange = function(nums, target) {
  let l = 0, r = nums.length - 1;
  let mid;
  while (l <= r) { // 二分查找 target
    mid = l + r >> 1;
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else if (nums[mid] === target){
      // 找到了跳出循环
      // 此时的 mid 就是 target
      break;
    }
  }

  if (l > r) return [-1, -1];

  let i = mid, j = mid;
  while (nums[i] === nums[i - 1]) i--; // 向左尝试找相同的元素
  while (nums[j] === nums[j + 1]) j++; // 同理
  return [i, j];
};
```

### 2. 搜索插入位置

35\. 搜索插入位置 (简单)

[Leetcode](https://leetcode.cn/problems/search-insert-position/) / [力扣](https://leetcode.cn/problems/search-insert-position/)


```js
var searchInsert = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + right >> 1;
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  // 目标值不存在于数组中
  return right + 1;
};
```

### 3. 搜索二维矩阵II

240\. 搜索二维矩阵II (简单)

[Leetcode](https://leetcode.cn/problems/search-a-2d-matrix-ii/) / [力扣](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

**技巧：** 二分法：由于矩阵matrix中每一行的元素都是升序排列的，因此可以对每一行都是用一次二分查找，判断 target 是否存在该行中，从而判断 target 是否出现过

```js
var searchMatrix = function(matrix, target) {
  for (const row of matrix) {
    const index = search(row, target);
    if (index >= 0) return true;
  }
  return false;
};

var search = function(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + right >> 1;
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
```

### 4. 搜索旋转排序数组

33\. 搜索旋转排序数组 (中等)

[Leetcode](https://leetcode.cn/problems/search-in-rotated-sorted-array/) / [力扣](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

思路：<br>
先找到 mid，判断 target 是否和 nums[mid]相等。<br>
- 如果相等，则直接返回 mid
- 如果不相等，则通过 nums[left] 和 nums[mid]的比较，看 mid 哪一边的元素有序
  - 如果 nums[left] <= nums[mid]，则说明左边有序，再判断 target 是否在左区间有序范围内，进而根据**二分法**不断缩小区间范围
  - 如果 nums[left] > nums[mid]，则说明右边有序，再判断 target 是否在右区间有序范围内，进而根据**二分法**不断缩小区间范围

```js
var search = function(nums, target) {
  if (!nums || nums.length == 0) return -1;
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + right >> 1;
    if (nums[mid] === target) return mid;
    // 判断 mid 左右两边 哪边有序为有序数列
    if (nums[left] <= nums[mid]) { // 左边有序
      // 判断 target 是否在有序序列的区间内
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else { // 右边有序
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
```

## 回溯算法 

### 1. 括号生成

22\. 括号生成 (中等)

[Leetcode](https://leetcode.cn/problems/generate-parentheses/) / [力扣](https://leetcode.cn/problems/generate-parentheses/)

回溯 + 剪枝

思路：
    先将问题抽象成树形问题，自然是树形问题，自然可以优先使用DFS <br>
    1. 先找出所有的情况，比如有效的括号组合的长度应该是 2 * n <br>
    2. 再剪枝过滤掉不符合条件的可能（画图可知）<br><br>
  剪枝过滤的条件：<br>
    1. 左开括号数 open > n 时，例如n为2，2对括号，左开括号为3的枝都可以剪掉 <br>
    2. 右闭括号数 close > open 左开时，剪掉

```js
var generateParenthesis = function(n) {
  // 回溯：抽象成二叉树遍历问题
  const res = [];

  const dfs = (path, open, close) => {
    // 剪枝 从所有可能性的结果里，过滤掉不其中不符合的两中情况条件
    if (open > n || close > open) return;
    if (path.length == 2 * n) {
      // 返回的有效括号组合的长度应该是 2 * n
      res.push(path); 
      return;
    }
    dfs(path + '(', open + 1, close);
    dfs(path + ')', open, close + 1);
  };

  dfs('', 0, 0);
  return res;
};
```

### 2. 全排列

46\. 全排列 (中等)

[Leetcode](https://leetcode.cn/problems/permutations/) / [力扣](https://leetcode.cn/problems/permutations/)

思路
  1. 每一位都有3种选择：1、2、3。
  2. 每一次都做选择，展开出一棵空间树。
  3. 利用约束条件「不能重复选」，做剪枝，剪去不会产生正确解的选项（分支）。
  利用 hashMap，记录选过的数，下次遇到相同的数，跳过。
  这样就不会进入「不会得出解的分支」，不做无效的搜索。

为什么要回溯
  - 我们不是找到一个排列就完事，要找出所有满足条件的排列。
  - 当一个递归调用结束，结束的是当前的递归分支，还要去别的分支继续搜。
  - 所以，要撤销当前的选择，回到选择前的状态，再选下一个选项，即进入下一个分支。
  - 注意，往 map 存入的当前选择也要撤销，表示撤销这个选择。
  - 退回来，把路走全，才能在一棵空间树中，回溯出所有的解。

```js
var permute = function(nums) {
  // 回溯法 + 剪枝
  const res = new Array();
  const used = {};

  const dfs = (path) => {
    if (path.length === nums.length) { // 个数够了
      res.push(path.slice()); // 拷贝一份path，加入解集res，不能影响原path
      return;
    }
    for (const num of nums) { // 枚举出每个可选的选项
      if (used[num]) continue; // 使用过，则跳过
      path.push(num); // 选择当前的数假如 path
      used[num] = true; // 存入path后，应标记为使用过
      dfs(path); // 基于选了当前的数 递归
      path.pop(); // 每次递归结束，都应该回溯将当前元素从path中删除
      used[num] = false; // 撤销这个记录
    }
  }
  dfs([]);
  return res;
};
```

### 3. 组合

77\. 组合 (中等)

[Leetcode](https://leetcode.cn/problems/combinations/) / [力扣](https://leetcode.cn/problems/combinations/)

题意理解：题目中数字的顺序是任意的，需要保证结果不能重复

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2apaitfq3j21ls0rs0wm.jpg)

方法：回溯 + 剪枝<br>
剪枝策略：因为要求每个数字只能用一次，结果不能重复，所以只要保证“升序”，让子节点的数字比父节点的数字大即可（start初始值父节点，从[1, n]的左边界开始）


```js
var combine = function(n, k) {
  const res = [], combination = [];
  if (n <= 0 || k <= 0 || n < k) return res;
  const dfs = (start) => { // start 子节点开始遍历的数值，start初始值父节点，从[1, n]的左边界开始
    if (combination.length == k) {
      res.push(combination.slice());
      return; // 结束当前分支的递归，开始回溯
    }

    for (let i = start; i <= n; i++) {
      combination.push(i);
      dfs(i+ 1); // 让下次的子节点遍历的数值 + 1
      combination.pop(); // 回溯的过程，将当前的节点从combination中删除
    }
  };
  dfs(1);
  return res;
};
```