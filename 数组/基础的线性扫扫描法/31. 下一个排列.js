// 直接模拟，线性扫描法
// 注意：有一个边界条件：如果没有找到靠右侧的【较小数】则直接返回翻转之后的数组
var nextPermutation = function(nums) {
  // 1. 找到尽量靠右的【较小数】
  let i = nums.length - 2; // 从倒数第二个数开始逐个比较找较小数
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  //  如果找到了【较小数】
  if (i >= 0) {
    // 2. 定义一个指针，从后面开始找 比【较小数】大的【较大数】
    let j = nums.length - 1; 
    while (j >= 0 && nums[i] >= nums[j]) j--;
    // 此时 nums[j] 为比【较小数】大的【较大数】，需要将它们交换
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 3. 反转【较小数】i 之后的所有元素
  let left = i + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};