/*
  给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
  说明：本题中，我们将空字符串定义为有效的回文串。

  输入: "A man, a plan, a canal: Panama"
  输出: true
  解释："amanaplanacanalpanama" 是回文串

  输入: "race a car"
  输出: false
  解释："raceacar" 不是回文串
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // 双指针
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    let strL = s.charAt(l).toLowerCase(),
      strR = s.charAt(r).toLowerCase();
    if (!isNumorEn(strL)) {
      l++;
    } else if (!isNumorEn(strR)) {
      r--;
    } else if (isNumorEn(strL) && isNumorEn(strR) && strL === strR) {
      l++, r--;
    } else {
      return false;
    }
  }
  return true;
};

var isNumorEn = function (str) {
  return (str >= "a" && str <= "z") || (str >= "0" && str <= "9");
};
