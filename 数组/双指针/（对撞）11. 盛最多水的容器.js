/*
  思路：
    最大的面积由 两个指针指向的数字中较小值 ∗ 指针之间的距离，故想到对撞指针
    1. 先从两个边界开始求水量，每次以小的 height 为起点，为了求最大水量，应该不断向内层找最大的 height[index]
*/
var maxArea = function(height) {
  let ans = 0; // 存储最大水量
  let left = 0, right = height.length - 1;
  while (left < right) {
    // 求水量
    let area = Math.min(height[left], height[right]) * (right - left);
    ans = Math.max(ans, area);
    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return ans;
};
// https://leetcode-cn.com/problems/container-with-most-water/
