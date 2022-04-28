/*
给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

输入：nums = [4,3,2,7,8,2,3,1]
输出：[5,6]

输入：nums = [1,1]
输出：[2]
*/

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