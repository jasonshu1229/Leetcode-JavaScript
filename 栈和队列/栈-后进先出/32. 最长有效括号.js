/*
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
*/

/**
 * @param {string} s
 * @return {number}
 */
 // 思路题解：https://leetcode-cn.com/problems/longest-valid-parentheses/solution/shou-hua-tu-jie-zhan-de-xiang-xi-si-lu-by-hyj8/
 var longestValidParentheses = function(s) {
  // 两种索引会入栈：
  //  1. 等待被匹配的左括号索引
  //  2. 充当「参照物」的右括号索引。因为当左括号匹配光时，栈需要留一个垫底的参照物，用于计算一段连续的有效长度
  // 因为求的是最大长度，所以应该存索引更有意义，而不是value
  let maxLen = 0;
  const stack = [];
  stack.push(-1); 
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i); // 左括号索引入栈
    } else { // 遍历到右括号
      stack.pop();
      if (stack.length) { 
        const curMaxLen = i - stack[stack.length - 1]; // 计算当前有效连续长度
        maxLen = Math.max(maxLen, curMaxLen); // 挑战最大值
      } else {
        stack.push(i); // // 栈空了，入栈当参照物
      }
    }
  }
  return maxLen;
};