/*
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
*/

/**
 * @param {string} s
 * @return {number}
 */

// 利用滑动窗口的思想，不断将当前元素加入到 map 中，根据map的数据结构特点，可以判断是否有重复元素
/**
    思路：
      滑动窗口不断向前，当前元素不在set中，就加入set，然后更新最大长度,i++继续下一轮循环
      set中有和滑动窗口里一样的元素，不断让左指针j++，并且删除窗口之外的元素 直到滑动窗口内没有重复的元素。
      时间复杂度是 O(n)
   */
var lengthOfLongestSubstring = function (s) {
  const set = new Set();
  let left = 0,
    right = 0; // 滑动窗口的左右边界
  let maxLength = 0; // 无重复子串的最大长度
  if (s.length === 0) return 0;

  for (right; right < s.length; right++) {
    if (!set.has(s[right])) {
      // 滑动到的元素不在set中，就加入set
      set.add(s[right]);
      maxLength = Math.max(maxLength, set.size); // 更新最大长度
    } else {
      // set 中有重复元素时，不断让左指针向前移动
      // 并删除窗口之外的元素 直到滑动窗口内没有重复的元素
      while (set.has(s[right])) {
        set.delete(s[left]);
        left++;
      }
      set.add(s[right]); // set里没有滑动窗口重复元素时，放心将上面的元素加入到set中
    }
  }
  return maxLength;
};
