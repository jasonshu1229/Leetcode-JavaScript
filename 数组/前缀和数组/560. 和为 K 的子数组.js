/*
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

输入：nums = [1,1,1], k = 2
输出：2

输入：nums = [1,2,3], k = 3
输出：2
*/

/** 前缀和（超时了）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var subarraySum = function (nums, k) {
  let len = nums.length,
    res = 0; // 满足条件子数组的长度个数
  // 构建前缀和数组
  let presum = new Array(len + 1).fill(0);
  for (let i = 0; i < len; i++) {
    presum[i + 1] = presum[i] + nums[i];
  }

  // 1. 求前缀和数组 2. 求满足区间和的子数组长度
  for (let i = 0; i <= len; i++) {
    for (let j = i + 1; j <= len; j++) {
      // 满足条件的区间和
      if (presum[j] - presum[i] === k) {
        res++;
      }
    }
  }
  return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/*
  直接记录下有几个 presum[j] - k 和 presum[i]，直接更新结果，避免内层循环
  用哈希表，记录前缀和的同时，应该同时记录前缀和出现的次数，次数也和res有关，是长度
*/
var subarraySum = function (nums, k) {
  let map = new Map();
  let res = 0; // 满足条件子数组的长度个数
  let prefixSum = 0; // 前缀和
  map.set(0, 1); // 元素和作为键，值用来存储次数（边界条件下面说了原因）
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i]; // 记录当前元素的前缀和 presum[i]
    if (map.has(prefixSum - k)) {
      // 找到满足 presum[j] - presum[i] = k
      res = res + map.get(prefixSum - k);
    }
    // 上面的先计算是为了避免出现[1,2,3] k=0, 1-0=1 map[1]有值
    // 说明和为0的情况存在，其实不应该有值的。
    // 那会不会出现 prefixSum === prefixSum - k的情况，有 k = 0的情况下，看上面的条件就是为了避免这种情况出现

    // 将前缀和存入Map中，记录prefixSum出现的次数，第一次查询不到，可以设置次数为1
    // 同时记录的也是长度
    if (map.get(prefixSum)) {
      map.set(prefixSum, map.get(prefixSum) + 1);
    } else {
      map.set(prefixSum, 1);
    }
    // map.set(prefixSum, (map.get(prefixSum) || 0) + 1)
  }

  return res;
};
