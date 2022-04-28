/*
给你一个整数数组 nums，请你将该数组升序排列。
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  // 归并排序
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = nums.slice(0, mid),
    right = nums.slice(mid, nums.length);

  // 遍历到最后都是数字，也是有序数组
  return merge(sortArray(left), sortArray(right));
};

var merge = function (left, right) {
  const res = [];

  while (left.length || right.length) {
    if (left.length && right.length) {
      res.push(left[0] < right[0] ? left.shift() : right.shift());
    } else if (left.length) {
      // 若比较完之后，两个数组哪个数组还有值，直接出队放在res的后面
      res.push(left.shift());
    } else if (right.length) {
      res.push(right.shift());
    }
  }

  return res;
};
