/*
给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现 两次 的整数，并以数组形式返回。
你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。

输入：nums = [4,3,2,7,8,2,3,1]
输出：[2,3]

输入：nums = [1]
输出：[]
*/

/*
  思路：先统计每个数字出现的次数放进 countArr ，再把出现次数为2的下标 i 找出来，则出现所有两次的整数就是 下标 + 1。
  时间复杂度：O(n)
  空间复杂度：O(n)
*/
var findDuplicates = function(nums) {
  if (!nums || nums.length < 2) return [];

  const maxLen = Math.max.apply(null, nums);
  let countArr = new Array(maxLen).fill(0);
  for (let item of nums) {
    let index = item - 1;
    countArr[index]++;
  }
  const res = [];
  for (let i = 0; i < countArr.length; i++) {
    if (countArr[i] == 2) res.push(i + 1);
    continue;
  }
  return res;
};

/*
  不开辟新数组，仅在原数组上记录重复数据的"技巧"（使用负数标记一个元素是否出现过）
  思路：
    1.遍历数组元素，如遇到4，则找到4-1=3的下标位置，把7变为-7。
    -7的含义：
      1.这个元素的值之前是7
      2.-7对应的索引3，索引3对应的元素的值 3+1=4 已经出现一次了(所以在遍历元素时，发现已经标为负数的元素，则证明已经出现过一次了，所以直接往res里假如就好)
    2.接着往下遍历

*/
var findDuplicates = function(nums) {
  if (!nums || nums.length < 2) return [];

  const res = new Array();
  for (let i = 0; i < nums.length; i++) {
    // nums[i] 很有可能已经是负数了，比如思路中的-7
    let index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) {
      res.push(Math.abs(nums[i]));
    } else {
      nums[index] = -nums[index];
    }
  }
  return res;
};

/*
* 技巧三：对原数组的元素进行 + n处理

解题思路：
1. 遍历每个元素，对每个元素对应的那个索引上的值 +n
2. 出现两次就意味着，找到预处理后的数组里的元素 > 2 * n的，返回 索引 + 1
*/
var findDuplicates = function(nums) {
  if (!nums || nums.length < 2) return [];

  const n = nums.length;
  for (let i = 0; i < n; i++) {
    // 获取当前元素对应的那个索引(% n 是因为第一次遍历时加了 n )
    let index = (nums[i] - 1) % n;
    // 对当前元素对应的那个索引上的值 + n
    nums[index] = nums[index] + n;
  }

  const res = [];
  // 出现两次就意味着，找到预处理后的数组里的元素 > 2 * n的
  for (let i = 0; i < n; i++) {
    if (nums[i] > 2 * n) res.push(i + 1);
  }
  return res;
};
