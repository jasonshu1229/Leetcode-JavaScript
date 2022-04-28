/*
给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 最多出现两次 ，返回删除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。 不需要考虑数组中超出新长度后面的元素。
*/

/*
  思路：让快慢指针都从第三个数开始遍历
    1. 如果快指针的元素和慢指针前面的前面的元素不相等的话，说明该元素只出现过一次，则需要把当前快指针上的元素赋值给慢指针，并更新慢指针
    2. 否则的话，继续更新快指针
*/
var removeDuplicates = function(nums) {
  // 快慢指针（画图）
  if (nums.length <= 2) return nums.length;
  // 快指针和慢指针都从第三个数，索引为2处开始
  let slow = 2, fast = 2;
  while (fast < nums.length) {
    if (nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast];
      slow++
    }
    fast++;
  }
  return slow;
}; 