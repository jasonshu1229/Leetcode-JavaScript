/*
给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  // 先排序，再双指针
  // 若两个值不相等，则数字小的指针，往右移动一位。若有一方遍历结束，代表另一方的剩余值都是唯一的存在，都不会有交集的。
  let l = 0,
    r = 0;
  let res = [];
  num1 = nums1.sort((a, b) => a - b);
  num2 = nums2.sort((a, b) => a - b);

  while (l < nums1.length && r < nums2.length) {
    if (nums1[l] === nums2[r]) {
      res.push(nums1[l]);
      l++, r++;
    } else {
      nums1[l] < nums2[r] ? l++ : r++;
    }
  }

  return res;
};
