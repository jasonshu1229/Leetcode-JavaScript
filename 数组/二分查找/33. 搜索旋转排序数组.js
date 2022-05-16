/*
  思路：先找到 mid，判断 target 是否和 nums[mid]相等。
    如果相等，则直接返回 mid
    如果不相等，则通过 nums[left] 和 nums[mid]的比较，看 mid 哪一边的元素有序
      如果 nums[left] <= nums[mid]，则说明左边有序，再判断 target 是否在左区间有序范围内
      如果 nums[left] > nums[mid]，则说明右边有序，再判断 target 是否在右区间有序范围内
*/
var search = function(nums, target) {
  if (!nums || nums.length == 0) return -1;
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + right >> 1;
    if (nums[mid] === target) return mid;
    // 判断 mid 左右两边 哪边有序为有序数列
    if (nums[left] <= nums[mid]) { // 左边有序
      // 判断 target 是否在有序序列的区间内
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else { // 右边有序
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};