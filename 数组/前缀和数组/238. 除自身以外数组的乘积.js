/*
给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
请不要使用除法，且在 O(n) 时间复杂度内完成此题。

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
*/
// 求前缀乘积 类比前缀和
// 除自身以外数组的乘积 = 每个元素的左边乘积 * 每个元素右边的乘积
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