/*
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*
  思路：数组有序的话，那么数组元素最大值就在数组的两端，不是最左边，就是最右边，不可能在中间。那么就可以采用双指针法，一个指针指向起始位置，另一个指向重点位置

  注意：需要新建一个和原数组一样长度大小的数组
*/
var sortedSquares = function (nums) {
  let len = nums.length;
  let l = 0,
    r = len - 1;
  let res = new Array(len).fill(0),
    k = len - 1;

  while (l <= r) {
    let lValue = nums[l] * nums[l];
    let rValue = nums[r] * nums[r];
    if (lValue < rValue) {
      res[k--] = rValue;
      r--;
    } else {
      res[k--] = lValue;
      l++;
    }
  }
  return res;
};
