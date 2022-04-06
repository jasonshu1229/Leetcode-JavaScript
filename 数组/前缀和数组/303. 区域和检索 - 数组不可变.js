/*
给定一个整数数组  nums，处理以下类型的多个查询:

计算索引 left 和 right （包含 left 和 right）之间的 nums 元素的 和 ，其中 left <= right
实现 NumArray 类：

NumArray(int[] nums) 使用数组 nums 初始化对象
int sumRange(int i, int j) 返回数组 nums 中索引 left 和 right 之间的元素的 总和 ，包含 left 和 right 两点（也就是 nums[left] + nums[left + 1] + ... + nums[right] )

输入：
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
[null, 1, -1, -3]

解释：
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
*/

/** 法一：暴力枚举法
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  // 暴力枚举法，时间复杂度 O(n)
  this.nums = nums;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let sum = 0;

  for (let i = left; i <= right; i++) {
    sum += this.nums[i];
  }

  return sum;
};

/** 法二：前缀和数组法
 * @param {number[]} nums
 */

/*
  preNums[5] 就是求 nums[0, 4]，或 nums[0, 5) 元素区间的和
*/
var NumArray = function (nums) {
  // 输入一个数组，构建前缀和数组进行预处理
  // 新建一个长度＋1的数组，因为需要假设 preNums[0];
  this.preNums = Nums = new Array(nums.length + 1).fill(0);
  // 计算 nums 的前缀和
  for (let i = 1; i < this.preNums.length; i++) {
    this.preNums[i] = this.preNums[i - 1] + nums[i - 1];
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  // 查询闭区间 [left, right]的元素累加和
  return this.preNums[right + 1] - this.preNums[left];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
