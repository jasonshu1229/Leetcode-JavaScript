/*
  给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
  进阶：不要 使用任何内置的库函数，如  sqrt 。

  输入：num = 16
  输出：true

  输入：num = 14
  输出：false
*/

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  // 二分法
  let l = 0,
    r = num;
  while (l <= r) {
    let mid = (l + r) >> 1;
    let square = mid * mid;
    if (square < num) {
      l = mid + 1;
    } else if (square > num) {
      r = mid - 1;
    } else {
      return true;
    }
  }

  return false;
};
