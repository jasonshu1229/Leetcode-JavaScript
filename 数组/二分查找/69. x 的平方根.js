/*
  给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
  由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
  注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

  输入：x = 8
  输出：2
  解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
*/

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  // 从 0~x 不断二分，
  let l = 0,
    r = x;

  while (l <= r) {
    let mid = (l + r) >> 1;
    if (mid * mid < x) {
      l = mid + 1;
    } else if (mid * mid > x) {
      r = mid - 1;
    } else {
      return mid;
    }
  }

  // r 最后一定会停在 mid*mid <= x 最大的那个 mid 位置
  // 因为 mid*mid = x 的 mid 如果存在的话，早就已经返回 mid 了，所以返回 r
  return r;
};

// 法一：二分法 法二：牛顿迭代法
