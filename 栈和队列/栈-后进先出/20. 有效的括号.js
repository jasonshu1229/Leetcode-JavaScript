/*
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

输入：s = "()"
输出：true
*/

/**
 * @param {string} s
 * @return {boolean}
 */
/*
  思路：
    首先如果字符串能组成有效的括号，则长度一定是偶数，
    我们可以遍历字符串，遇到左括号则暂存，期待后面有右括号可以和它匹配，
    如果遇到右括号则检查是否能和最晚暂存的做括号匹配。这就和栈这种数据结构先进后出的特性相吻合了。
    所以我们可以准备一个栈存放括号对，遍历字符串的时候，如果遇到左括号入栈，
    遇到右括号则判断右括号是否能和栈顶元素匹配，在循环结束的时候还要判断栈是否为空，
    如果不为空，则不是有效括号匹配的字符串
*/
var isValid = function(s) {
  // 如果字符串能组成有效的括号，则长度一定是偶数
  if (s.length % 2 === 1) return false; 

  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '{' || c === '(' || c=== '[') {
      stack.push(c);
    } else {
      // 遇到右括号了，此时的c是右括号，应当从栈取出栈顶元素与之比较
      const t = stack[stack.length - 1];
      if (
        (c === '}' && t === '{') ||
        (c === ')' && t === '(') ||
        (c === ']' && t === '[')
      ) {
        stack.pop(); // 匹配的话，则出栈
      } else {
        return false;
      }
    }
  }
  // 循环完毕后，如果栈刚好清空，则说明左右括号是匹配的
  return stack.length === 0;
};

var isValid = function(s) {
  // 如果字符串能组成有效的括号，则长度一定是偶数
  if (s.length % 2 === 1) return false; 
  const stack = [];
  const pairs = new Map([ // 用栈存储括号对
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  for (let ch of s) {
    if (pairs.has(ch)) {
      // 当遍历左括号时，遇到右括号，则判断右括号是否和栈顶元素匹配
      if (!stack.length || stack[stack.length - 1] !== pairs.get(ch)) {
        return false;
      }
      // 匹配的话则出栈
      stack.pop();
    } else {
      stack.push(ch); // 遇到左括号入栈
    }
  }
  
  // 循环完毕后，如果栈刚好清空，则说明左右括号是匹配的
  return stack.length === 0;
};