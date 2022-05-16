var numSubarrayProductLessThanK = function(nums, k) {
  // 双指针滑动窗口

  // 因为 nums[i] >= 1，所以 k 不能 <= 1
  if (k <= 1) return 0;
  let product = 1; // 定义乘积
  let count = 0, left = 0;
  // 右指针遍历数组
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    // 不满足条件，左指针向右移动，需要在乘积中，除去当前left的值
    while (product >= k) {
      product /= nums[left++];;
    }
    // 满足条件的数组有 right - left + 1 个
    count += right - left + 1;
  }
  return count;
};