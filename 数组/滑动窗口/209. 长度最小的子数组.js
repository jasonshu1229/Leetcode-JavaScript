/*
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。

输入：target = 4, nums = [1,4,4]
输出：1
*/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  /*
    1.思路：左右指针是滑动窗口的两边，用滑动窗口循环数组，不断扩大窗口，如果窗口中的和大于
    target，就开始缩小窗口，然后更新最小滑动窗口
    2. 步骤：
      2.1 新建 sum，res(最小子数组的长度),左右指针 l, r
      2.2 不断比较 r 和 len 数组的长度
        2.2.1 如果 sum >= target 则需要更新最小子数组长度 res,
        2.2.2 并尝试不断缩小窗口 l 向右移动弄
        2.2.3 sum = sum - nums[l]
      2.3 如果 res > len 则返回0 ，否则返回 res
  */

  let len = nums.length;
  let resLength = len + 1; // 最大的窗口不会超过自身长度
  let l = 0,
    r = 0;
  let sum = 0; // 滑动窗口的和

  while (r < len) {
    sum = sum + nums[r];
    r++;
    while (sum >= target) {
      resLength = resLength < r - l ? resLength : r - l;
      sum = sum - nums[l];
      l++;
    }
  }
  return resLength > len ? 0 : resLength;
};
