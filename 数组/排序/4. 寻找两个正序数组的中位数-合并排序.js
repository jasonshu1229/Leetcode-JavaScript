/*
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
*/

/*
  思路：合并排序（前提是有序）
    如果两个数组里的元素个数和为奇数，则中位数，为中间的数；如果两个数组里的元素个数和为偶数，则中位数为 ((m + n / 2) + (m + n - 1 / 2) / 2)
  时间复杂度：O(m+n)
  空间复杂度：O(m+n)
*/
var findMedianSortedArrays = function(nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  let temp = new Array(m + n).fill(0); // 定义合并后数组的总长度的数组
  let i = 0, j = 0; // i,j 分别为两个数组里的指针，用于比较两个数组里面值的大小
  let k = 0; // temp 数组里面的指针，用于存放最小的值，然后更新
  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      temp[k++] = nums1[i++];
    } else {
      temp[k++] = nums2[j++];
    }
  }
  // 比较过后, num1, num2 数组还有剩余
  while (i < m) temp[k++] = nums1[i++];
  while (j < n) temp[k++] = nums2[j++];
  console.log(temp)
  // 求中位数
  if ((m + n) % 2 == 1) {
    return temp[Math.floor((m + n) / 2)];
  } else {
    return (temp[Math.floor((m + n) / 2)] + temp[Math.floor((m + n - 1) / 2)]) / 2;
  }
};