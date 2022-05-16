/*
  二分法：由于矩阵matrix中每一行的元素都是升序排列的，因此可以对每一行都是用一次二分查找，判断 target 是否存在该行中，从而判断 target 是否出现过
*/
var searchMatrix = function(matrix, target) {
  for (const row of matrix) {
    const index = search(row, target);
    if (index >= 0) return true;
  }
  return false;
};

var search = function(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + right >> 1;
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}