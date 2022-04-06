/*
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
*/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// 直接合并法
// var merge = function (nums1, m, nums2, n) {
//   nums1.splice(m, nums1.length - m, ...nums2);
//   nums1.sort((a, b) => a - b);
// };

const arr1 = [1, 2, 3, 0, 0, 0];
const arr2 = [2, 5, 6];

var merge = function (nums1, m, nums2, n) {
  // 双指针
  // 由于第一个数组nums1较大，所以不用开新的数组，
  // 但是从前往后遍历依次存储在nums1中会使得nums1中的数据被覆盖
  // 所以需要从后往前遍历，取较大的数放在nums1的结尾，然后结尾指针向前移动一位。
  let k = m + n - 1;
  let i = m - 1,
    j = n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }

  while (j >= 0) nums1[k--] = nums2[j--];
};

merge(arr1, 3, arr2, 3);
console.log(arr1); // [ 1, 2, 2, 3, 5, 6 ]
