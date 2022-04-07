/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

输入：nums = []
输出：[]

输入：nums = [0]
输出：[]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/*
标签：数组遍历
  1. 首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，数字分别为 nums[L] 和 nums[R]，计算三个数的和 sum 判断是否满足为 0，满足则添加进结果
  2. 如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环
  如果 nums[i] == nums[i−1]，则说明该数字重复，会导致结果重复，所以应该跳过
  3. 当 sum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
  当 sum == 0 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R--
*/
// 题解：https://leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/
var threeSum = function(nums) {
  // 求和问题，先排序，再用双指针找索引
  if (nums.length < 3) return [];
  let res = [];
  nums.sort((a ,b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break; // 当前数字都 > 0,则三数之和必大于0
    if (nums[i] === nums[i - 1]) continue; // 去重 跳过 进入下一轮for循环
    let L = i + 1;
    let R = nums.length - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum === 0) {
        res.push([nums[i], nums[L], nums[R]]);
        // 继续向后遍历，L=L+1, R=R-1，有可能有重复值的情况
        while (L < R && nums[L] === nums[L + 1]) L++; // 去重 跳过
        while (L < R && nums[R] === nums[R + 1]) R--; // 同理
        // 即使没有重复的情况，也应该更新左右指针，继续下一个数的遍历 之和对比
        L++, R--;
      }
      if (sum < 0) L++;
      if (sum > 0) R--;
    }
  }
  return res;
};