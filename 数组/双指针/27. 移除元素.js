/*
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。

输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
*/

/** 双层for循环，一个遍历数组，一个更新数组
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    if (nums[i] === val) {
      // 发现需要移除的元素，将数组集体向前移动一位
      for (let j = i + 1; j < len; j++) {
        nums[j - 1] = nums[j];
      }
      i--; // 因为下标i以后的数值都向前移动了一位，为了避免循环漏掉当前元素，所以i也向前移动一位
      len--;
    }
  }

  return len;
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// 思路：双指针
// 左指针指向第一个元素，右指针不断遍历数组元素
// 如果右指针指向的元素不等于 val，它一定是输出数组的一个元素，我们就将右指针指向的元素复制到左指针位置，然后将左右指针同时右移；
// 如果右指针指向的元素等于 val，它不能在输出数组里，此时左指针不动，右指针右移一位。
var removeElement = function (nums, val) {
  let left = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[left++] = nums[i];
    }
  }

  return left;
};
