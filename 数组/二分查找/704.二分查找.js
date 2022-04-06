/*
  给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
  写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
*/

/*
  示例1：
  输入: nums = [-1,0,3,5,9,12], target = 9
  输出: 4
  解释: 9 出现在 nums 中并且下标为 4
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  // 定义 target 在左闭右闭区间里，[left, right]
  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (nums[middle] > target) {
      right = middle - 1; // target 在左区间，所以[left, middle -1]
    } else if (nums[middle] < target) {
      left = middle + 1; // target 在由区间，所以[middle + 1, right]
    } else {
      return middle;
    }
  }

  return -1;
};
