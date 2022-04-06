/*
  给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
  如果数组中不存在目标值 target，返回 [-1, -1]。
*/

/*
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

输入：nums = [], target = 0
输出：[-1,-1]
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // 方法一：先二分找到target，再寻找左右边界，是否有和target相同的元素
  // 思路：二分查找，然后向左向右尝试找相同的元素
  // 时间复杂度 O(n)
  let l = 0,
    r = nums.length - 1;
  let mid;

  while (l <= r) {
    // 二分查找 target
    mid = (l + r) >> 1;
    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else if (nums[mid] === target) {
      // 找到了跳出循环
      // 此时的 mid 就是 target
      break;
    }
  }

  if (l > r) return [-1, -1];

  let i = mid,
    j = mid;
  while (nums[i] === nums[i - 1]) i--; // 向左尝试找相同的元素
  while (nums[j] === nums[j + 1]) j++; // 同理
  return [i, j];
};
