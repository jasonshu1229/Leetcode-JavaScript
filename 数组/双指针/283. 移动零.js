/*
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

输入: nums = [0]
输出: [0]
*/

/** 双层 for 循环
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  /*
    遍历数组，定义索引 j 为数组的第一个位置，遇上非0元素，
    让j位置上的元素等于这个非0元素，遍历完数组之后，j 位置及 j 位置之后的元素全部设置为 0；
    
    时间复杂度 O(n)
  */
  let j = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }

  for (let i = j; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};

/** 双指针做法
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  /*
    双指针，定义i,k指针，r指针不断从左向右移动遍历数组，遇到非0元素，就将nums[i]元素防止到nums[k]的位置，同时 k++ 向后移动一位，一直让 k 存储为0的元素
    具体过程如下：
      1. 定义两个指针 i,k，初始化 i = 0, k = 0
      2. i指针不断向后移动，遍历整个数组，如果nums[i] !== 0，则让 nums[i]的元素放置到 nums[k] 的位置，同时 k++ 向后移动一位
      3. 最后 k位置之后的元素就全部为了0了
    时间复杂度 O(n)
  */
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let temp = nums[i];
      nums[i] = nums[k]; // 用k来存储下标一直为0的元素，不断从左向右移动
      nums[k] = temp;
      k++;
    }
  }

  return nums;
};
