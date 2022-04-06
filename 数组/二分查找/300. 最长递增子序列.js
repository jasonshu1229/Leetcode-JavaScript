/*
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。


输入：nums = [3,5,6,2,5,4,19,5,6,7,12]
输出：6 子序列：[2,4,5,6,7,12]
*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*
  思路：
    新建一个最长上升子序列的tail数组，越小的数字越往前放，这样后面就会有更大更多的数字加入到 tail 数组。
    将nums中的数不断加入 tail ,当 nums 中的元素比 tail 的最后一个还要大时，可以放心 push进 tail。否则进行二分查找，让没有 tail 最后一个数大的那个数找到合适的位置，让后面有更多的数字与这个数形成上升子序列。
    注意：
      1. tail 中不能有重复数字
      2. nums[i]遇到比 tail[tail.length - 1] 数还小，应该二分查找，找到合适位置覆盖替换掉，而不是插入！！
*/
var lengthOfLIS = function (nums) {
  let len = nums.length;
  if (len <= 1) return len;

  let tail = [nums[0]]; // 存放最长上升子序列数组
  for (let i = 0; i < len; i += 1) {
    if (nums[i] > tail[tail.length - 1]) {
      // 当nums 中的元素比 tail 中的最后一个大时，大可push
      tail.push(nums[i]);
    } else {
      // 否则用二分查找法，将nums[i]放置在合适的位置
      let l = 0,
        r = tail.length - 1;
      // l !== r 不能有重复元素在 tail ，所以 l === r 是没意义的
      while (l < r) {
        let mid = (l + r) >> 1;
        if (tail[mid] < nums[i]) {
          l = mid + 1;
        } else {
          r = mid;
        }
      }
      tail[l] = nums[i];
    }
  }
  return tail.length;
};
