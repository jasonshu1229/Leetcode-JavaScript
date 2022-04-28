/*
给你一个数组 nums 。数组「动态和」的计算公式为：runningSum[i] = sum(nums[0]…nums[i]) 。
请返回 nums 的动态和。

输入：nums = [1,2,3,4]
输出：[1,3,6,10]
解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。
*/

// 暴力法 时间复杂度 O(n ^ 2)
var runningSum = function(nums) {
  let len = nums.length;
  let prefixSum = [];
  for (let i = 0; i < len; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      sum += nums[j];
    }
    prefixSum[i] = sum;
  }
  return prefixSum;
};

var runningSum = function(nums) {
  // 前缀和的求解属于中间值推导消除重复计算属于【动态规划】
  let len = nums.length;
  let prefixSum = [];
  prefixSum[0] = nums[0];
  for (let i = 1; i < len; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }
  return prefixSum;
};